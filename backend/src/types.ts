export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export enum QuestionType {
  SPECTRUM = 'spectrum',
  TRADE_OFF = 'trade_off',
  RANKING = 'ranking',
  SCENARIO = 'scenario',
  PREDICTION = 'prediction',
  CONFIDENCE = 'confidence'
}

export enum QuestionCategory {
  CONFESSIONS = 'confessions',
  FRIENDSHIP = 'friendship',
  VALUES = 'values',
  MIND_TRICKS = 'mind_tricks',
  MORAL_DILEMMAS = 'moral_dilemmas',
  LIFESTYLE = 'lifestyle',
  IMAGINATION = 'imagination'
}

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  category: QuestionCategory;
  text: string;
  options: QuestionOption[];
  insight?: string;
}

export interface PlayerAnswer {
  playerId: string;
  questionId: string;
  answerId: string;
  confidence?: number;
  timestamp: Date;
}

export interface Player {
  id: string;
  userId: string;
  name: string;
  isHost: boolean;
  isReady: boolean;
  hasRevealedConsent: boolean;
}

export enum RoomStatus {
  LOBBY = 'lobby',
  IN_PROGRESS = 'in_progress',
  REVEAL = 'reveal',
  ENDED = 'ended'
}

export interface Room {
  id: string;
  hostId: string;
  players: Player[];
  questionCount: 10 | 20 | 30;
  status: RoomStatus;
  currentQuestionIndex: number;
  questionIds: string[];
  createdAt: Date;
  startedAt?: Date;
}

export interface AggregateResult {
  questionId: string;
  distribution: Record<string, number>;
  insight?: string;
}

export interface PlayerCluster {
  label: string;
  description: string;
  playerIds: string[];
}

export interface GameSummary {
  clusters: PlayerCluster[];
  totalQuestions: number;
}

// Socket events
export enum SocketEvent {
  // Connection
  JOIN_ROOM = 'join_room',
  LEAVE_ROOM = 'leave_room',

  // Lobby
  PLAYER_JOINED = 'player_joined',
  PLAYER_LEFT = 'player_left',
  PLAYER_READY = 'player_ready',
  START_GAME = 'start_game',

  // Game flow
  QUESTION_START = 'question_start',
  SUBMIT_ANSWER = 'submit_answer',
  ALL_ANSWERS_IN = 'all_answers_in',
  SHOW_REVEAL = 'show_reveal',
  NEXT_QUESTION = 'next_question',

  // Privacy
  CONSENT_REVEAL = 'consent_reveal',
  REVEAL_UNLOCKED = 'reveal_unlocked',

  // End
  GAME_END = 'game_end',

  // Errors
  ERROR = 'error'
}

export interface JoinRoomPayload {
  roomId: string;
  playerName: string;
}

export interface SubmitAnswerPayload {
  roomId: string;
  questionId: string;
  answerId: string;
  confidence?: number;
}

export interface ConsentRevealPayload {
  roomId: string;
  consent: boolean;
}
