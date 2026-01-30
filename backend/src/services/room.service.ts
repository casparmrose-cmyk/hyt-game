import { randomUUID } from 'crypto';
import { dbHelpers } from '../db/schema.js';
import type {
  Room,
  Player,
  Question,
  PlayerAnswer,
  AggregateResult,
  RoomStatus,
  GameSummary,
  PlayerCluster
} from '@hyt/shared';

export class RoomService {
  static createRoom(hostId: string, questionCount: 10 | 20 | 30): Room {
    const roomId = randomUUID();
    const createdAt = Date.now();

    // Get random questions
    const questions = dbHelpers
      .prepare('SELECT id FROM questions ORDER BY RANDOM() LIMIT ?')
      .all(questionCount) as Array<{ id: string }>;

    const questionIds = questions.map(q => q.id);

    dbHelpers.prepare(`
      INSERT INTO rooms (id, host_id, question_count, status, current_question_index, question_ids, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      roomId,
      hostId,
      questionCount,
      'lobby',
      0,
      JSON.stringify(questionIds),
      createdAt
    );

    // Add host as player
    dbHelpers.prepare(`
      INSERT INTO room_players (room_id, user_id, name, is_host, is_ready, has_revealed_consent, joined_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(roomId, hostId, this.getUserName(hostId), 1, 0, 0, createdAt);

    return this.getRoom(roomId)!;
  }

  static getRoom(roomId: string): Room | null {
    const row = dbHelpers.prepare(`
      SELECT id, host_id, question_count, status, current_question_index, question_ids, created_at, started_at
      FROM rooms WHERE id = ?
    `).get(roomId) as any;

    if (!row) return null;

    const players = this.getRoomPlayers(roomId);

    return {
      id: row.id,
      hostId: row.host_id,
      players,
      questionCount: row.question_count,
      status: row.status as RoomStatus,
      currentQuestionIndex: row.current_question_index,
      questionIds: JSON.parse(row.question_ids),
      createdAt: new Date(row.created_at),
      startedAt: row.started_at ? new Date(row.started_at) : undefined
    };
  }

  static getRoomPlayers(roomId: string): Player[] {
    const rows = dbHelpers.prepare(`
      SELECT user_id, name, is_host, is_ready, has_revealed_consent
      FROM room_players WHERE room_id = ?
    `).all(roomId) as any[];

    return rows.map(row => ({
      id: randomUUID(),
      userId: row.user_id,
      name: row.name,
      isHost: row.is_host === 1,
      isReady: row.is_ready === 1,
      hasRevealedConsent: row.has_revealed_consent === 1
    }));
  }

  static joinRoom(roomId: string, userId: string): void {
    const room = this.getRoom(roomId);
    if (!room) throw new Error('Room not found');
    if (room.status !== 'lobby') throw new Error('Game already started');

    const existing = dbHelpers.prepare(
      'SELECT 1 FROM room_players WHERE room_id = ? AND user_id = ?'
    ).get(roomId, userId);

    if (existing) return;

    dbHelpers.prepare(`
      INSERT INTO room_players (room_id, user_id, name, is_host, is_ready, has_revealed_consent, joined_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(roomId, userId, this.getUserName(userId), 0, 0, 0, Date.now());
  }

  static leaveRoom(roomId: string, userId: string): void {
    dbHelpers.prepare('DELETE FROM room_players WHERE room_id = ? AND user_id = ?')
      .run(roomId, userId);
  }

  static startGame(roomId: string): void {
    dbHelpers.prepare(`
      UPDATE rooms SET status = ?, started_at = ? WHERE id = ?
    `).run('in_progress', Date.now(), roomId);
  }

  static setPlayerReady(roomId: string, userId: string, isReady: boolean): void {
    dbHelpers.prepare(`
      UPDATE room_players SET is_ready = ? WHERE room_id = ? AND user_id = ?
    `).run(isReady ? 1 : 0, roomId, userId);
  }

  static submitAnswer(roomId: string, userId: string, questionId: string, answerId: string, confidence?: number): void {
    const answerId_generated = randomUUID();

    dbHelpers.prepare(`
      INSERT INTO answers (id, room_id, player_id, question_id, answer_id, confidence, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(answerId_generated, roomId, userId, questionId, answerId, confidence || null, Date.now());
  }

  static getAnswersForQuestion(roomId: string, questionId: string): PlayerAnswer[] {
    const rows = dbHelpers.prepare(`
      SELECT player_id, question_id, answer_id, confidence, timestamp
      FROM answers WHERE room_id = ? AND question_id = ?
    `).all(roomId, questionId) as any[];

    return rows.map(row => ({
      playerId: row.player_id,
      questionId: row.question_id,
      answerId: row.answer_id,
      confidence: row.confidence,
      timestamp: new Date(row.timestamp)
    }));
  }

  static getAggregateResult(roomId: string, questionId: string): AggregateResult {
    const answers = this.getAnswersForQuestion(roomId, questionId);
    const distribution: Record<string, number> = {};

    answers.forEach(answer => {
      distribution[answer.answerId] = (distribution[answer.answerId] || 0) + 1;
    });

    const question = this.getQuestion(questionId);

    return {
      questionId,
      distribution,
      insight: question?.insight
    };
  }

  static nextQuestion(roomId: string): void {
    const room = this.getRoom(roomId);
    if (!room) return;

    const nextIndex = room.currentQuestionIndex + 1;

    if (nextIndex >= room.questionIds.length) {
      dbHelpers.prepare('UPDATE rooms SET status = ? WHERE id = ?').run('ended', roomId);
    } else {
      dbHelpers.prepare('UPDATE rooms SET current_question_index = ? WHERE id = ?')
        .run(nextIndex, roomId);
    }
  }

  static setRevealConsent(roomId: string, userId: string, consent: boolean): void {
    dbHelpers.prepare(`
      UPDATE room_players SET has_revealed_consent = ? WHERE room_id = ? AND user_id = ?
    `).run(consent ? 1 : 0, roomId, userId);
  }

  static checkAllConsented(roomId: string): boolean {
    const result = dbHelpers.prepare(`
      SELECT COUNT(*) as total, SUM(has_revealed_consent) as consented
      FROM room_players WHERE room_id = ?
    `).get(roomId) as any;

    return result.total === result.consented;
  }

  static getQuestion(questionId: string): Question | null {
    const row = dbHelpers.prepare(`
      SELECT id, type, category, text, options, insight
      FROM questions WHERE id = ?
    `).get(questionId) as any;

    if (!row) return null;

    return {
      id: row.id,
      type: row.type,
      category: row.category,
      text: row.text,
      options: JSON.parse(row.options),
      insight: row.insight
    };
  }

  static getGameSummary(roomId: string): GameSummary {
    const room = this.getRoom(roomId);
    if (!room) throw new Error('Room not found');

    const allAnswers = dbHelpers.prepare(`
      SELECT player_id, question_id, answer_id
      FROM answers WHERE room_id = ?
    `).all(roomId) as any[];

    // Simple clustering based on answer patterns
    const playerVectors: Record<string, number[]> = {};
    room.players.forEach(player => {
      playerVectors[player.userId] = [];
    });

    room.questionIds.forEach((qId, idx) => {
      const questionAnswers = allAnswers.filter(a => a.question_id === qId);
      questionAnswers.forEach(a => {
        if (!playerVectors[a.player_id]) playerVectors[a.player_id] = [];
        playerVectors[a.player_id][idx] = this.hashAnswerId(a.answer_id);
      });
    });

    // Basic k-means clustering (simplified)
    const clusters = this.clusterPlayers(playerVectors, room.players);

    return {
      clusters,
      totalQuestions: room.questionIds.length
    };
  }

  private static clusterPlayers(vectors: Record<string, number[]>, players: Player[]): PlayerCluster[] {
    // Simplified clustering - group players with similar answer patterns
    const playerIds = Object.keys(vectors);
    if (playerIds.length <= 3) {
      return [{
        label: 'The Group',
        description: 'You all think remarkably alike on these questions.',
        playerIds
      }];
    }

    // For now, create 2-3 random clusters with playful labels
    const clusterLabels = [
      { label: 'The Pragmatists', description: 'Clear-headed, practical thinkers who value outcomes.' },
      { label: 'The Idealists', description: 'Led by principles and long-term vision.' },
      { label: 'The Wildcards', description: 'Unpredictable, context-driven decision makers.' }
    ];

    const numClusters = Math.min(3, Math.max(2, Math.floor(playerIds.length / 2)));
    const clusters: PlayerCluster[] = [];

    for (let i = 0; i < numClusters; i++) {
      clusters.push({
        ...clusterLabels[i],
        playerIds: []
      });
    }

    // Distribute players
    playerIds.forEach((id, idx) => {
      clusters[idx % numClusters].playerIds.push(id);
    });

    return clusters.filter(c => c.playerIds.length > 0);
  }

  private static hashAnswerId(answerId: string): number {
    let hash = 0;
    for (let i = 0; i < answerId.length; i++) {
      hash = ((hash << 5) - hash) + answerId.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private static getUserName(userId: string): string {
    const row = dbHelpers.prepare('SELECT name FROM users WHERE id = ?').get(userId) as any;
    return row?.name || 'Unknown';
  }
}
