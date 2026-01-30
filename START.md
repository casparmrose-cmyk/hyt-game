# Starting HYT

## Quick Start

To start both the backend and frontend development servers:

```bash
npm run dev
```

This will start:
- **Backend** on [http://localhost:3000](http://localhost:3000)
- **Frontend** on [http://localhost:5173](http://localhost:5173)

## Manual Start

If you prefer to start them separately:

### Backend
```bash
cd backend
npm run dev
```

### Frontend
```bash
cd frontend
npm run dev
```

## First Time Setup

The database will be automatically initialized on first run with:
- User authentication tables
- Room and player tracking
- 70+ pre-seeded questions across 7 categories

## Using HYT

1. Open [http://localhost:5173](http://localhost:5173) in your browser
2. Create an account (email + password)
3. Start a new game or join an existing room
4. Share the room link with friends
5. Start answering questions together

## Build for Production

```bash
npm run build
```

This will create optimized production builds in:
- `backend/dist/`
- `frontend/dist/`

## Environment Variables

Make sure your `.env` files are configured:
- `backend/.env` - JWT secret, port, frontend URL
- `frontend/.env` - API URL

## Troubleshooting

**Database issues**: Delete `backend/hyt.db` and restart - it will be recreated automatically.

**Port conflicts**: Check if ports 3000 or 5173 are already in use.

**Connection errors**: Ensure backend is running before frontend connects.
