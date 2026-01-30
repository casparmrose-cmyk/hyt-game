import type { Question, AggregateResult } from '@hyt/shared';

interface RevealDisplayProps {
  question: Question;
  aggregateResult: AggregateResult;
  isHost: boolean;
  onNext: () => void;
}

export function RevealDisplay({
  question,
  aggregateResult,
  isHost,
  onNext
}: RevealDisplayProps) {
  const totalVotes = Object.values(aggregateResult.distribution).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card mb-6">
        <h2 className="text-2xl font-serif text-center mb-8 opacity-80">
          {question.text}
        </h2>

        <div className="space-y-4 mb-8">
          {question.options.map((option) => {
            const votes = aggregateResult.distribution[option.id] || 0;
            const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

            return (
              <div key={option.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">
                    <span className="font-serif text-lg mr-3">{option.label}.</span>
                    {option.value}
                  </div>
                  <div className="text-sm opacity-70">
                    {votes} {votes === 1 ? 'vote' : 'votes'}
                  </div>
                </div>
                <div className="w-full h-3 bg-club-white bg-opacity-20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-clay-orange transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {aggregateResult.insight && (
          <div className="border-t border-club-white border-opacity-20 pt-6">
            <p className="text-center italic opacity-80">{aggregateResult.insight}</p>
          </div>
        )}
      </div>

      {isHost ? (
        <button onClick={onNext} className="btn-primary w-full">
          Next Question
        </button>
      ) : (
        <div className="text-center py-4 opacity-70">
          Waiting for host to continue...
        </div>
      )}
    </div>
  );
}
