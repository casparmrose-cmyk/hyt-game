import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './db/schema.js';
import { seedQuestions } from './db/seed-questions.js';
import authRoutes from './routes/auth.routes.js';
import roomRoutes from './routes/room.routes.js';
import { setupGameSocket } from './socket/game.socket.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Initialize database and start server
async function startServer() {
  await initializeDatabase();
  seedQuestions();

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/rooms', roomRoutes);

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Socket.io
  setupGameSocket(io);

  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
