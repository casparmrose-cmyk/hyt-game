# ⚠️ Fix "Failed to Fetch" Error

The frontend is live but the backend isn't deployed yet. Here's how to fix it:

## Quick Fix (2 Minutes)

### Option 1: Run the Automated Script

```bash
cd "/Users/cr/Desktop/HYT Game"
./deploy-backend-now.sh
```

This will:
1. Login to Railway (opens browser)
2. Deploy your backend
3. Show you the backend URL

Then follow the instructions it prints to update Vercel.

---

### Option 2: Manual Steps

#### Step 1: Deploy Backend to Railway

```bash
cd "/Users/cr/Desktop/HYT Game/backend"

# Login (opens browser)
railway login

# Create project
railway init --name hyt-backend

# Set environment variables
railway variables set JWT_SECRET="$(openssl rand -hex 32)"
railway variables set PORT=3000
railway variables set FRONTEND_URL="https://hyt-game.vercel.app"

# Deploy!
railway up
```

#### Step 2: Get Backend URL

```bash
railway status
```

Copy the URL shown (like `https://hyt-backend-production.up.railway.app`)

#### Step 3: Update Vercel

```bash
cd "/Users/cr/Desktop/HYT Game"

# Add backend URL to Vercel
vercel env add VITE_API_URL production
```

When prompted, paste: `https://YOUR_RAILWAY_URL/api`

#### Step 4: Redeploy Frontend

```bash
vercel --prod
```

---

## ✅ After Completion

Your app will work at: **https://hyt-game.vercel.app**

Both frontend and backend will be connected and running!

---

## Need Help?

If Railway deployment fails, you can also use the web interface:

1. Go to https://railway.app/new
2. "Deploy from GitHub repo"
3. Choose `hyt-game`
4. Select the `backend` folder
5. Add environment variables in the web UI
6. Deploy

Then follow steps 3-4 above to update Vercel.
