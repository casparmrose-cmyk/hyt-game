import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { dbHelpers } from '../db/schema.js';
import type { User, AuthResponse } from '@hyt/shared';

const JWT_SECRET = process.env.JWT_SECRET || 'hyt-secret-key-change-in-production';
const SALT_ROUNDS = 10;

export class AuthService {
  static async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const existingUser = dbHelpers
      .prepare('SELECT id FROM users WHERE email = ?')
      .get(email);

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = randomUUID();
    const createdAt = Date.now();

    dbHelpers.prepare(
      'INSERT INTO users (id, email, password_hash, name, created_at) VALUES (?, ?, ?, ?, ?)'
    ).run(userId, email, passwordHash, name, createdAt);

    const user: User = {
      id: userId,
      email,
      name,
      createdAt: new Date(createdAt)
    };

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });

    return { user, token };
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    const row = dbHelpers
      .prepare('SELECT id, email, password_hash, name, created_at FROM users WHERE email = ?')
      .get(email) as any;

    if (!row) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, row.password_hash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const user: User = {
      id: row.id,
      email: row.email,
      name: row.name,
      createdAt: new Date(row.created_at)
    };

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' });

    return { user, token };
  }

  static verifyToken(token: string): { userId: string } {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
      throw new Error('Invalid token');
    }
  }

  static getUserById(userId: string): User | null {
    const row = dbHelpers
      .prepare('SELECT id, email, name, created_at FROM users WHERE id = ?')
      .get(userId) as any;

    if (!row) return null;

    return {
      id: row.id,
      email: row.email,
      name: row.name,
      createdAt: new Date(row.created_at)
    };
  }
}
