import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Room } from '@hyt/shared';
import { useAuthStore } from '../store/useAuthStore';
import { socket } from '../services/socket.service';

interface LobbyProps {
  room: Room;
}

export function Lobby({ room }: LobbyProps) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const isHost = user?.id === room.hostId;
  const shareUrl = `${window.location.origin}/room/${room.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartGame = () => {
    socket.startGame(room.id);
  };

  const handleLeave = () => {
    socket.leaveRoom(room.id);
    navigate('/');
  };

  return (
    <div className="container-hyt">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-serif mb-4">Game Lobby</h1>
        <p className="opacity-70">{room.questionCount} questions</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="card">
          <h2 className="text-xl font-serif mb-4">Share Link</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="input-field flex-1"
            />
            <button onClick={handleCopyLink} className="btn-secondary">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-serif mb-4">
            Players ({room.players.length})
          </h2>
          <div className="space-y-2">
            {room.players.map((player) => (
              <div
                key={player.id}
                className="flex justify-between items-center bg-club-white text-tennis-green px-4 py-3 rounded-lg"
              >
                <span className="font-medium">
                  {player.name}
                  {player.isHost && (
                    <span className="ml-2 text-xs bg-clay-orange text-club-white px-2 py-1 rounded">
                      Host
                    </span>
                  )}
                </span>
                {player.isReady && (
                  <span className="text-sm text-tennis-green-light">Ready</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          {isHost ? (
            <button
              onClick={handleStartGame}
              disabled={room.players.length < 2}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {room.players.length < 2 ? 'Waiting for players...' : 'Start Game'}
            </button>
          ) : (
            <div className="flex-1 text-center py-3 opacity-70">
              Waiting for host to start...
            </div>
          )}

          <button onClick={handleLeave} className="btn-secondary">
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}
