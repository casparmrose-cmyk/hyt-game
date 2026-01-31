import type { Server, Socket } from 'socket.io';
import { RoomService } from '../services/room.service.js';
import { AuthService } from '../services/auth.service.js';
import {
  SocketEvent,
  type JoinRoomPayload,
  type SubmitAnswerPayload,
  type ConsentRevealPayload
} from '../types.js';

const QUESTION_TIMER_MS = 60000; // 60 seconds per question

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

export function setupGameSocket(io: Server) {
  // Authentication middleware
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      const { userId } = AuthService.verifyToken(token);
      socket.userId = userId;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`User connected: ${socket.userId}`);

    // Join room
    socket.on(SocketEvent.JOIN_ROOM, ({ roomId, playerName }: JoinRoomPayload) => {
      try {
        console.log(`User ${socket.userId} joining room ${roomId}`);
        RoomService.joinRoom(roomId, socket.userId!);
        socket.join(roomId);

        const room = RoomService.getRoom(roomId);
        console.log(`Room ${roomId} now has ${room?.players.length} players`);
        io.to(roomId).emit(SocketEvent.PLAYER_JOINED, room);
      } catch (error: any) {
        console.error(`Error joining room: ${error.message}`);
        socket.emit(SocketEvent.ERROR, { message: error.message });
      }
    });

    // Leave room
    socket.on(SocketEvent.LEAVE_ROOM, (roomId: string) => {
      try {
        RoomService.leaveRoom(roomId, socket.userId!);
        socket.leave(roomId);

        const room = RoomService.getRoom(roomId);
        io.to(roomId).emit(SocketEvent.PLAYER_LEFT, room);
      } catch (error: any) {
        socket.emit(SocketEvent.ERROR, { message: error.message });
      }
    });

    // Player ready
    socket.on(SocketEvent.PLAYER_READY, (roomId: string) => {
      try {
        RoomService.setPlayerReady(roomId, socket.userId!, true);
        const room = RoomService.getRoom(roomId);
        io.to(roomId).emit(SocketEvent.PLAYER_READY, room);
      } catch (error: any) {
        socket.emit(SocketEvent.ERROR, { message: error.message });
      }
    });

    // Start game
    socket.on(SocketEvent.START_GAME, (roomId: string) => {
      try {
        const room = RoomService.getRoom(roomId);
        if (!room || room.hostId !== socket.userId) {
          throw new Error('Unauthorized');
        }

        RoomService.startGame(roomId);
        const updatedRoom = RoomService.getRoom(roomId);

        io.to(roomId).emit(SocketEvent.START_GAME, updatedRoom);

        // Start first question
        setTimeout(() => {
          startQuestion(io, roomId, 0);
        }, 2000);
      } catch (error: any) {
        socket.emit(SocketEvent.ERROR, { message: error.message });
      }
    });

    // Submit answer
    socket.on(SocketEvent.SUBMIT_ANSWER, ({ roomId, questionId, answerId, confidence }: SubmitAnswerPayload) => {
      try {
        RoomService.submitAnswer(roomId, socket.userId!, questionId, answerId, confidence);

        const room = RoomService.getRoom(roomId);
        const answers = RoomService.getAnswersForQuestion(roomId, questionId);

        // Check if all players have answered
        if (answers.length === room!.players.length) {
          io.to(roomId).emit(SocketEvent.ALL_ANSWERS_IN, { questionId });
          setTimeout(() => showReveal(io, roomId, questionId), 1000);
        }
      } catch (error: any) {
        socket.emit(SocketEvent.ERROR, { message: error.message });
      }
    });

    // Consent to reveal
    socket.on(SocketEvent.CONSENT_REVEAL, ({ roomId, consent }: ConsentRevealPayload) => {
      try {
        RoomService.setRevealConsent(roomId, socket.userId!, consent);

        if (RoomService.checkAllConsented(roomId)) {
          io.to(roomId).emit(SocketEvent.REVEAL_UNLOCKED, { roomId });
        }
      } catch (error: any) {
        socket.emit(SocketEvent.ERROR, { message: error.message });
      }
    });

    // Next question
    socket.on(SocketEvent.NEXT_QUESTION, (roomId: string) => {
      try {
        const room = RoomService.getRoom(roomId);
        if (!room || room.hostId !== socket.userId) {
          throw new Error('Unauthorized');
        }

        RoomService.nextQuestion(roomId);
        const updatedRoom = RoomService.getRoom(roomId);

        if (updatedRoom!.status === 'ended') {
          const summary = RoomService.getGameSummary(roomId);
          io.to(roomId).emit(SocketEvent.GAME_END, summary);
        } else {
          startQuestion(io, roomId, updatedRoom!.currentQuestionIndex);
        }
      } catch (error: any) {
        socket.emit(SocketEvent.ERROR, { message: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`);
    });
  });
}

function startQuestion(io: Server, roomId: string, questionIndex: number) {
  const room = RoomService.getRoom(roomId);
  if (!room) return;

  const questionId = room.questionIds[questionIndex];
  const question = RoomService.getQuestion(questionId);

  io.to(roomId).emit(SocketEvent.QUESTION_START, {
    question,
    questionNumber: questionIndex + 1,
    totalQuestions: room.questionCount,
    timerMs: QUESTION_TIMER_MS
  });

  // Auto-advance after timer
  setTimeout(() => {
    const answers = RoomService.getAnswersForQuestion(roomId, questionId);
    if (answers.length > 0) {
      io.to(roomId).emit(SocketEvent.ALL_ANSWERS_IN, { questionId });
      setTimeout(() => showReveal(io, roomId, questionId), 1000);
    }
  }, QUESTION_TIMER_MS);
}

function showReveal(io: Server, roomId: string, questionId: string) {
  const aggregate = RoomService.getAggregateResult(roomId, questionId);
  io.to(roomId).emit(SocketEvent.SHOW_REVEAL, aggregate);
}
