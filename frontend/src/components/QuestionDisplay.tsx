import type { Question } from '@hyt/shared';

interface QuestionDisplayProps {
  question: Question;
  selectedAnswer: string | null;
  hasSubmitted: boolean;
  onSelectAnswer: (answerId: string) => void;
  onSubmit: () => void;
}

export function QuestionDisplay({
  question,
  selectedAnswer,
  hasSubmitted,
  onSelectAnswer,
  onSubmit
}: QuestionDisplayProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="card mb-6">
        <h2 className="text-3xl font-serif text-center mb-8 leading-relaxed">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelectAnswer(option.id)}
              disabled={hasSubmitted}
              className={`answer-option ${
                selectedAnswer === option.id ? 'selected' : ''
              } ${hasSubmitted ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              <span className="font-serif text-lg mr-3">{option.label}.</span>
              {option.value}
            </button>
          ))}
        </div>
      </div>

      {!hasSubmitted ? (
        <button
          onClick={onSubmit}
          disabled={!selectedAnswer}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedAnswer ? 'Submit Answer' : 'Select an answer'}
        </button>
      ) : (
        <div className="text-center py-4 opacity-70">
          Waiting for other players...
        </div>
      )}
    </div>
  );
}
