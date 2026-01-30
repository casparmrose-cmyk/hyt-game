import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';

export interface AuthRequest extends Request {
  userId?: string;
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const { userId } = AuthService.verifyToken(token);
    req.userId = userId;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid token' });
  }
}
