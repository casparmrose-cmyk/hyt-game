# Deploying HYT to Production

HYT uses a hybrid deployment approach:
- **Frontend**: Vercel (free tier)
- **Backend**: Railway (free tier) - for real-time Socket.io support

## Prerequisites

1. GitHub account
2. Vercel account (free): https://vercel.com/signup
3. Railway account (free): https://railway.app

## Step 1: Push to GitHub

First, initialize a git repository and push your code:

```bash
cd "/Users/cr/Desktop/HYT Game"
git init
git add .
git commit -m "Initial commit - HYT game"
```

Then create a new repository on GitHub and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/hyt-game.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Railway

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `hyt-game` repository
5. Railway will auto-detect the backend

**Set Environment Variables** in Railway:
- `JWT_SECRET` = `your-super-secret-jwt-key-change-this`
- `FRONTEND_URL` = `https://your-app.vercel.app` (get this from Step 3)
- `PORT` = `3000` (Railway sets this automatically, but confirm)

6. Click "Deploy"
7. Once deployed, copy your Railway backend URL (e.g., `https://hyt-backend-production.up.railway.app`)

## Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your `hyt-game` repository
4. Vercel will auto-detect the configuration from `vercel.json`

**Set Environment Variables** in Vercel:
- `VITE_API_URL` = `https://your-railway-backend.up.railway.app/api`

5. Click "Deploy"
6. Once deployed, copy your Vercel URL (e.g., `https://hyt-game.vercel.app`)

## Step 4: Update Backend Environment

Go back to Railway and update the `FRONTEND_URL` variable with your Vercel URL:
- `FRONTEND_URL` = `https://hyt-game.vercel.app`

Redeploy the backend for changes to take effect.

## Step 5: Test Your Deployment

Visit your Vercel URL and test:
1. Sign up for an account
2. Create a game room
3. Share the link with friends
4. Play together in real-time

## Your Live URLs

After deployment, you'll have:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-backend.railway.app`

Share the frontend URL with anyone to play!

## Updating Your Deployment

Whenever you make changes:

```bash
git add .
git commit -m "Your changes"
git push
```

Both Vercel and Railway will automatically redeploy.

## Cost

Both services are **FREE** for this project:
- Vercel: Free tier (unlimited bandwidth for hobby projects)
- Railway: $5/month free credit (enough for light usage)

## Troubleshooting

**CORS errors**: Make sure `FRONTEND_URL` in Railway matches your Vercel URL exactly

**Socket.io not connecting**: Check that backend URL in Vercel environment variables is correct

**Database issues**: Railway's filesystem is ephemeral, but sql.js persists to disk and should work fine for development. For production, consider upgrading to Railway's PostgreSQL addon.

## Alternative: Deploy Everything to Railway

If you prefer to keep everything in one place:

1. Deploy to Railway as a monorepo
2. Set up two services: frontend and backend
3. Use Railway's static site serving for the frontend

This keeps all parts in one place but is slightly more complex to set up.
