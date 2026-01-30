# HYT - How You Think

A social game that helps friends understand how each other see the world.

## 🚀 Deploy to Production

Want to share HYT with the world? See **[QUICKSTART_DEPLOY.md](./QUICKSTART_DEPLOY.md)** for a 5-minute deployment guide.

Your app will be live at a shareable URL like `https://hyt-game.vercel.app`!

## Project Structure

```
hyt-game/
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + Express + Socket.io backend
└── shared/            # Shared types and interfaces
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies for all workspaces:

```bash
npm install
```

2. Set up environment variables:

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

3. Start the development servers:

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:3000
- Frontend dev server on http://localhost:5173

### Production Build

```bash
npm run build
npm start
```

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand (state management)
- Socket.io Client

### Backend
- Node.js
- Express
- TypeScript
- Socket.io
- Better-SQLite3
- JWT Authentication
- Bcrypt

### Shared
- TypeScript type definitions

## Features

- Email/password authentication with persistent sessions
- Real-time multiplayer rooms via Socket.io
- 70+ thought-provoking questions across 7 categories
- Anonymous aggregate results with optional identity reveal
- Smart player clustering at game end
- Premium tennis club aesthetic
- Zero-lag performance with optimized database queries

## Game Flow

1. Create or join a room
2. Wait in lobby for players
3. Answer questions (60s each)
4. View anonymous aggregate results
5. See how you cluster with other players

## Branding

- Tennis Green (#1B4332, #2D6A4F)
- Club White (#F8F9FA)
- Clay Orange (#D97742)
- Fonts: Playfair Display (serif), Inter (sans)

## License

Private - All rights reserved
