import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { dbHelpers } from '../db/schema.js';
import type { User, AuthResponse } from '../types.js';

const JWT_SECRET = process.env.JWT_SECRET || 'hyt-secret-key-change-in-production';
const SALT_ROUNDS = 10;

export class AuthService {
  static async register(email: string, password: string, name: string): Promise<AuthResponse> {
    console.log('[REGISTER] Attempting registration for email:', email);

    const existingUser = dbHelpers
      .prepare('SELECT id FROM users WHERE email = ?')
      .get(email);

    if (existingUser) {
      console.log('[REGISTER] Email already exists:', email);
      throw new Error('Email already registered');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = randomUUID();
    const createdAt = Date.now();

    console.log('[REGISTER] Creating user:', { userId, email, name });
    dbHelpers.prepare(
      'INSERT INTO users (id, email, password_hash, name, created_at) VALUES (?, ?, ?, ?, ?)'
    ).run(userId, email, passwordHash, name, createdAt);
    console.log('[REGISTER] User created successfully');

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
    console.log('[LOGIN] Attempting login for email:', email);

    const row = dbHelpers
      .prepare('SELECT id, email, password_hash, name, created_at FROM users WHERE email = ?')
      .get(email) as any;

    console.log('[LOGIN] User found:', !!row);

    if (!row) {
      console.log('[LOGIN] No user found with email:', email);
      throw new Error('Invalid credentials');
    }

    console.log('[LOGIN] Comparing password for user:', row.email);
    const isValid = await bcrypt.compare(password, row.password_hash);
    console.log('[LOGIN] Password valid:', isValid);

    if (!isValid) {
      console.log('[LOGIN] Invalid password for user:', email);
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
