import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { api } from '../services/api.service';

export function HomePage() {
  const [questionCount, setQuestionCount] = useState<10 | 20 | 30>(20);
  const [isCreating, setIsCreating] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleCreateRoom = async () => {
    setIsCreating(true);
    try {
      const room = await api.createRoom(questionCount);
      navigate(`/room/${room.id}`);
    } catch (error) {
      console.error('Failed to create room:', error);
    }
    setIsCreating(false);
  };

  const handleJoinRoom = () => {
    const input = joinRoomId.trim();
    if (!input) return;

    // Extract room ID from URL if they pasted a full link
    let roomId = input;
    if (input.includes('/room/')) {
      const match = input.match(/\/room\/([a-zA-Z0-9-]+)/);
      if (match) {
        roomId = match[1];
      }
    }

    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="container-hyt">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-serif mb-6 tracking-wide">HYT</h1>
          <p className="text-xl opacity-90 mb-2">How You Think</p>
          <p className="text-sm opacity-70 max-w-lg mx-auto">
            A social game that helps friends understand how each other see the world.
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          <div className="card">
            <h2 className="text-2xl font-serif mb-6 text-center">Start a Game</h2>

            <div className="mb-6">
              <label className="block text-sm opacity-80 mb-3">Game Length</label>
              <div className="grid grid-cols-3 gap-3">
                {([10, 20, 30] as const).map((count) => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`py-3 rounded-lg font-medium transition-all ${
                      questionCount === count
                        ? 'bg-clay-orange text-club-white'
                        : 'bg-club-white text-tennis-green hover:bg-clay-orange hover:text-club-white'
                    }`}
                  >
                    {count} questions
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCreateRoom}
              disabled={isCreating}
              className="btn-primary w-full"
            >
              {isCreating ? 'Creating...' : 'Create Room'}
            </button>
          </div>

          <div className="text-center text-sm opacity-70">or</div>

          <div className="card">
            <h2 className="text-2xl font-serif mb-6 text-center">Join a Game</h2>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Paste room ID or link here"
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value)}
                  className="input-field"
                  onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
                />
                <p className="text-xs opacity-60 mt-2">
                  You can paste the full link or just the room ID
                </p>
              </div>

              <button
                onClick={handleJoinRoom}
                disabled={!joinRoomId.trim()}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join Room
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="text-sm opacity-70 mb-2">Logged in as {user?.name}</div>
          <button onClick={logout} className="text-clay-orange hover:underline text-sm">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
