import { useEffect, useState } from 'react';
import type { Room } from '@hyt/shared';
import { useGameStore } from '../store/useGameStore';
import { useAuthStore } from '../store/useAuthStore';
import { socket } from '../services/socket.service';
import { QuestionDisplay } from './QuestionDisplay';
import { RevealDisplay } from './RevealDisplay';

interface QuestionFlowProps {
  room: Room;
}

export function QuestionFlow({ room }: QuestionFlowProps) {
  const { user } = useAuthStore();
  const {
    currentQuestion,
    questionNumber,
    totalQuestions,
    timerMs,
    selectedAnswer,
    aggregateResult,
    setSelectedAnswer
  } = useGameStore();

  const [timeLeft, setTimeLeft] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isHost = user?.id === room.hostId;

  useEffect(() => {
    if (timerMs) {
      setTimeLeft(timerMs);
      setHasSubmitted(false);
      setSelectedAnswer(null);
    }
  }, [timerMs, currentQuestion]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 100));
    }, 100);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleSelectAnswer = (answerId: string) => {
    if (hasSubmitted || aggregateResult) return;
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !currentQuestion || hasSubmitted) return;

    socket.submitAnswer({
      roomId: room.id,
      questionId: currentQuestion.id,
      answerId: selectedAnswer
    });

    setHasSubmitted(true);
  };

  const handleNextQuestion = () => {
    socket.nextQuestion(room.id);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl opacity-70">Loading question...</div>
        </div>
      </div>
    );
  }

  const progressPercent = (timeLeft / timerMs) * 100;

  return (
    <div className="container-hyt">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm opacity-70">
            Question {questionNumber} of {totalQuestions}
          </div>
          <div className="text-sm opacity-70">{Math.ceil(timeLeft / 1000)}s</div>
        </div>
        <div className="w-full h-2 bg-tennis-green-light rounded-full overflow-hidden">
          <div
            className="h-full bg-clay-orange transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {!aggregateResult ? (
        <QuestionDisplay
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          hasSubmitted={hasSubmitted}
          onSelectAnswer={handleSelectAnswer}
          onSubmit={handleSubmit}
        />
      ) : (
        <RevealDisplay
          question={currentQuestion}
          aggregateResult={aggregateResult}
          isHost={isHost}
          onNext={handleNextQuestion}
        />
      )}
    </div>
  );
}
