import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const { login, register, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      navigate('/');
    } catch {
      // Error handled in store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-serif mb-4 tracking-wide">HYT</h1>
          <p className="text-club-white opacity-80">How You Think</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
            minLength={6}
          />

          {error && (
            <div className="text-clay-orange text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? 'Loading...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              clearError();
            }}
            className="text-club-white opacity-70 hover:opacity-100 transition-opacity"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}
