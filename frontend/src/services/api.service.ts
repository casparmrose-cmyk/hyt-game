import type { AuthResponse, Room, Question, GameSummary } from '@hyt/shared';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('hyt_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('hyt_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('hyt_token');
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const result = await this.fetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    this.setToken(result.token);
    return result;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const result = await this.fetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(result.token);
    return result;
  }

  logout() {
    this.clearToken();
  }

  async createRoom(questionCount: 10 | 20 | 30): Promise<Room> {
    return this.fetch<Room>('/rooms/create', {
      method: 'POST',
      body: JSON.stringify({ questionCount }),
    });
  }

  async getRoom(roomId: string): Promise<Room> {
    return this.fetch<Room>(`/rooms/${roomId}`);
  }

  async getQuestion(roomId: string, questionId: string): Promise<Question> {
    return this.fetch<Question>(`/rooms/${roomId}/question/${questionId}`);
  }

  async getGameSummary(roomId: string): Promise<GameSummary> {
    return this.fetch<GameSummary>(`/rooms/${roomId}/summary`);
  }
}

export const api = new ApiService();
