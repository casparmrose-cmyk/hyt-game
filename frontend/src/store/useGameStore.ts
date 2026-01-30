import { create } from 'zustand';
import type { Room, Question, AggregateResult, GameSummary } from '@hyt/shared';

interface GameState {
  room: Room | null;
  currentQuestion: Question | null;
  questionNumber: number;
  totalQuestions: number;
  timerMs: number;
  selectedAnswer: string | null;
  aggregateResult: AggregateResult | null;
  gameSummary: GameSummary | null;
  hasConsented: boolean;
  revealUnlocked: boolean;

  setRoom: (room: Room) => void;
  setCurrentQuestion: (question: Question, questionNumber: number, totalQuestions: number, timerMs: number) => void;
  setSelectedAnswer: (answerId: string | null) => void;
  setAggregateResult: (result: AggregateResult) => void;
  setGameSummary: (summary: GameSummary) => void;
  setHasConsented: (consented: boolean) => void;
  setRevealUnlocked: (unlocked: boolean) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  room: null,
  currentQuestion: null,
  questionNumber: 0,
  totalQuestions: 0,
  timerMs: 0,
  selectedAnswer: null,
  aggregateResult: null,
  gameSummary: null,
  hasConsented: false,
  revealUnlocked: false,

  setRoom: (room) => set({ room }),

  setCurrentQuestion: (question, questionNumber, totalQuestions, timerMs) =>
    set({
      currentQuestion: question,
      questionNumber,
      totalQuestions,
      timerMs,
      selectedAnswer: null,
      aggregateResult: null,
    }),

  setSelectedAnswer: (answerId) => set({ selectedAnswer: answerId }),

  setAggregateResult: (result) => set({ aggregateResult: result }),

  setGameSummary: (summary) => set({ gameSummary: summary }),

  setHasConsented: (consented) => set({ hasConsented: consented }),

  setRevealUnlocked: (unlocked) => set({ revealUnlocked: unlocked }),

  resetGame: () =>
    set({
      room: null,
      currentQuestion: null,
      questionNumber: 0,
      totalQuestions: 0,
      timerMs: 0,
      selectedAnswer: null,
      aggregateResult: null,
      gameSummary: null,
      hasConsented: false,
      revealUnlocked: false,
    }),
}));
