import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';

export function GameEnd() {
  const navigate = useNavigate();
  const { gameSummary } = useGameStore();

  if (!gameSummary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl opacity-70">Loading summary...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-hyt">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif mb-4">Game Complete</h1>
        <p className="opacity-70">{gameSummary.totalQuestions} questions answered</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6 mb-12">
        <h2 className="text-2xl font-serif text-center mb-8">How You Think</h2>

        {gameSummary.clusters.map((cluster, idx) => (
          <div key={idx} className="card">
            <h3 className="text-2xl font-serif mb-3 text-clay-orange">
              {cluster.label}
            </h3>
            <p className="opacity-90 mb-4">{cluster.description}</p>
            <div className="text-sm opacity-70">
              {cluster.playerIds.length} {cluster.playerIds.length === 1 ? 'player' : 'players'}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button onClick={() => navigate('/')} className="btn-primary">
          Play Again
        </button>
      </div>
    </div>
  );
}
