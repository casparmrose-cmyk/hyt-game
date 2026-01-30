import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useGameStore } from '../store/useGameStore';
import { socket } from '../services/socket.service';
import { api } from '../services/api.service';
import { Lobby } from '../components/Lobby';
import { QuestionFlow } from '../components/QuestionFlow';
import { GameEnd } from '../components/GameEnd';
import { RoomStatus } from '@hyt/shared';

export function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { room, setRoom, setCurrentQuestion, setAggregateResult, setGameSummary, setRevealUnlocked, resetGame } = useGameStore();

  useEffect(() => {
    if (!roomId || !user) return;

    // Load room data
    api.getRoom(roomId)
      .then(setRoom)
      .catch(() => navigate('/'));

    // Join room via socket
    socket.joinRoom({ roomId, playerName: user.name });

    // Setup socket listeners
    socket.onPlayerJoined(setRoom);
    socket.onPlayerLeft(setRoom);
    socket.onPlayerReady(setRoom);
    socket.onGameStart(setRoom);

    socket.onQuestionStart(({ question, questionNumber, totalQuestions, timerMs }) => {
      setCurrentQuestion(question, questionNumber, totalQuestions, timerMs);
    });

    socket.onShowReveal(setAggregateResult);
    socket.onRevealUnlocked(({ roomId: unlockedRoomId }) => {
      if (unlockedRoomId === roomId) {
        setRevealUnlocked(true);
      }
    });

    socket.onGameEnd(setGameSummary);

    socket.onError((error) => {
      console.error('Socket error:', error);
    });

    return () => {
      socket.leaveRoom(roomId);
      socket.offAll();
      resetGame();
    };
  }, [roomId, user, navigate]);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl opacity-70">Loading room...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {room.status === RoomStatus.LOBBY && <Lobby room={room} />}
      {(room.status === RoomStatus.IN_PROGRESS || room.status === RoomStatus.REVEAL) && <QuestionFlow room={room} />}
      {room.status === RoomStatus.ENDED && <GameEnd />}
    </div>
  );
}
