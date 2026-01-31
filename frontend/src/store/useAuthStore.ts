import { create } from 'zustand';
import type { User } from '@hyt/shared';
import { api } from '../services/api.service';
import { socket } from '../services/socket.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  initialize: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initialize: async () => {
    const token = localStorage.getItem('hyt_token');
    if (!token) return;

    try {
      const { user } = await api.me();
      socket.connect(token);
      set({ user, isAuthenticated: true });
    } catch {
      // Token invalid, clear it
      api.logout();
      set({ user: null, isAuthenticated: false });
    }
  },

  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await api.register(email, password, name);
      socket.connect(token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await api.login(email, password);
      socket.connect(token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    api.logout();
    socket.disconnect();
    set({ user: null, isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null }),
}));
