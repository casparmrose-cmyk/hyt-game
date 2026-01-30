import { io, Socket } from 'socket.io-client';
import {
  SocketEvent,
  type Room,
  type Question,
  type AggregateResult,
  type GameSummary,
  type JoinRoomPayload,
  type SubmitAnswerPayload,
  type ConsentRevealPayload
} from '@hyt/shared';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class SocketService {
  private socket: Socket | null = null;

  connect(token: string) {
    if (this.socket?.connected) return;

    this.socket = io(SOCKET_URL, {
      auth: { token }
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  // Emit events
  joinRoom(payload: JoinRoomPayload) {
    this.socket?.emit(SocketEvent.JOIN_ROOM, payload);
  }

  leaveRoom(roomId: string) {
    this.socket?.emit(SocketEvent.LEAVE_ROOM, roomId);
  }

  setPlayerReady(roomId: string) {
    this.socket?.emit(SocketEvent.PLAYER_READY, roomId);
  }

  startGame(roomId: string) {
    this.socket?.emit(SocketEvent.START_GAME, roomId);
  }

  submitAnswer(payload: SubmitAnswerPayload) {
    this.socket?.emit(SocketEvent.SUBMIT_ANSWER, payload);
  }

  consentReveal(payload: ConsentRevealPayload) {
    this.socket?.emit(SocketEvent.CONSENT_REVEAL, payload);
  }

  nextQuestion(roomId: string) {
    this.socket?.emit(SocketEvent.NEXT_QUESTION, roomId);
  }

  // Listen to events
  onPlayerJoined(callback: (room: Room) => void) {
    this.socket?.on(SocketEvent.PLAYER_JOINED, callback);
  }

  onPlayerLeft(callback: (room: Room) => void) {
    this.socket?.on(SocketEvent.PLAYER_LEFT, callback);
  }

  onPlayerReady(callback: (room: Room) => void) {
    this.socket?.on(SocketEvent.PLAYER_READY, callback);
  }

  onGameStart(callback: (room: Room) => void) {
    this.socket?.on(SocketEvent.START_GAME, callback);
  }

  onQuestionStart(callback: (data: { question: Question; questionNumber: number; totalQuestions: number; timerMs: number }) => void) {
    this.socket?.on(SocketEvent.QUESTION_START, callback);
  }

  onAllAnswersIn(callback: (data: { questionId: string }) => void) {
    this.socket?.on(SocketEvent.ALL_ANSWERS_IN, callback);
  }

  onShowReveal(callback: (data: AggregateResult) => void) {
    this.socket?.on(SocketEvent.SHOW_REVEAL, callback);
  }

  onRevealUnlocked(callback: (data: { roomId: string }) => void) {
    this.socket?.on(SocketEvent.REVEAL_UNLOCKED, callback);
  }

  onGameEnd(callback: (summary: GameSummary) => void) {
    this.socket?.on(SocketEvent.GAME_END, callback);
  }

  onError(callback: (error: { message: string }) => void) {
    this.socket?.on(SocketEvent.ERROR, callback);
  }

  // Remove listeners
  off(event: SocketEvent) {
    this.socket?.off(event);
  }

  offAll() {
    if (!this.socket) return;

    Object.values(SocketEvent).forEach(event => {
      this.socket?.off(event);
    });
  }
}

export const socket = new SocketService();
