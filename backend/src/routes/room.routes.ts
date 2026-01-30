import express from 'express';
import { RoomService } from '../services/room.service.js';
import { authenticateToken, type AuthRequest } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', authenticateToken, (req: AuthRequest, res) => {
  try {
    const { questionCount } = req.body;

    if (![10, 20, 30].includes(questionCount)) {
      return res.status(400).json({ error: 'Invalid question count' });
    }

    const room = RoomService.createRoom(req.userId!, questionCount);
    res.json(room);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:roomId', authenticateToken, (req: AuthRequest, res) => {
  try {
    const { roomId } = req.params;
    const room = RoomService.getRoom(roomId);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(room);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:roomId/question/:questionId', authenticateToken, (req: AuthRequest, res) => {
  try {
    const { questionId } = req.params;
    const question = RoomService.getQuestion(questionId);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(question);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:roomId/summary', authenticateToken, (req: AuthRequest, res) => {
  try {
    const { roomId } = req.params;
    const summary = RoomService.getGameSummary(roomId);
    res.json(summary);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
