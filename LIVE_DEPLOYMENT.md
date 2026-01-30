# 🎉 HYT is Live!

## ✅ What's Been Deployed

### Frontend (Vercel)
- **GitHub Repository**: https://github.com/casparmrose-cmyk/hyt-game
- **Vercel Project**: hyt-game
- **Status**: Deployed ✅

### Backend (Railway)
- **Status**: Ready to deploy ⏳

## 🚀 Final Steps to Complete Deployment

### Step 1: Deploy Backend to Railway (5 minutes)

Railway requires authentication, so let's do this now:

```bash
# Login to Railway
railway login

# This will open your browser - log in or create account (free)
```

After logging in, deploy the backend:

```bash
cd "/Users/cr/Desktop/HYT Game/backend"

# Initialize Railway project
railway init

# Set environment variables
railway variables set JWT_SECRET="hyt-super-secret-jwt-key-$(openssl rand -hex 32)"
railway variables set PORT=3000

# Deploy!
railway up
```

### Step 2: Get Your Backend URL

After deployment completes:

```bash
railway status
```

Copy the URL (something like `https://hyt-backend-production.up.railway.app`)

### Step 3: Update Frontend Environment Variable

Update Vercel with your Railway backend URL:

```bash
cd "/Users/cr/Desktop/HYT Game"

# Replace YOUR_RAILWAY_URL with the URL from Step 2
vercel env add VITE_API_URL production
# When prompted, paste: https://YOUR_RAILWAY_URL/api
```

Redeploy the frontend:

```bash
vercel --prod
```

### Step 4: Update Backend CORS

Set the frontend URL in Railway:

```bash
cd "/Users/cr/Desktop/HYT Game/backend"

# Replace with your actual Vercel URL
railway variables set FRONTEND_URL="https://hyt-game.vercel.app"
```

## 🎯 Your Live URLs

After completing all steps:

**Frontend**: https://hyt-game.vercel.app
**Backend**: https://your-railway-app.up.railway.app

## 📱 Share Your Game

Send this link to anyone:
**https://hyt-game.vercel.app**

They can:
- Create an account
- Start a game
- Invite friends
- Play together in real-time!

---

## Alternative: Quick Railway Setup (Browser)

If you prefer using the web interface:

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select `hyt-game` repository
4. Select the `backend` folder
5. Add environment variables:
   - `JWT_SECRET` = (random string)
   - `PORT` = `3000`
   - `FRONTEND_URL` = `https://hyt-game.vercel.app`
6. Deploy!

Then update Vercel's `VITE_API_URL` environment variable with your Railway URL.

---

Need help? All commands are in this file!
