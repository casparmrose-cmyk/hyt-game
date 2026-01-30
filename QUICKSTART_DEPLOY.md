# 🚀 Quick Deploy Guide (5 Minutes)

Deploy HYT in 3 simple steps:

## 1️⃣ Push to GitHub (2 minutes)

```bash
cd "/Users/cr/Desktop/HYT Game"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "HYT - How You Think game"
```

Now create a repository on GitHub:
1. Go to https://github.com/new
2. Name it `hyt-game`
3. Click "Create repository"
4. Copy the commands and run them:

```bash
git remote add origin https://github.com/YOUR_USERNAME/hyt-game.git
git branch -M main
git push -u origin main
```

## 2️⃣ Deploy Backend to Railway (1 minute)

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose `hyt-game`
5. Select the `backend` folder
6. Railway will auto-deploy!

**Add environment variables:**
- Click on your deployment → Variables
- Add: `JWT_SECRET` = `change-this-to-a-random-string`
- Add: `FRONTEND_URL` = `*` (we'll update this after Vercel)

**Copy your Railway URL** (e.g., `hyt-production.up.railway.app`)

## 3️⃣ Deploy Frontend to Vercel (2 minutes)

1. Go to https://vercel.com/new
2. Import your `hyt-game` repository
3. Vercel auto-detects the config ✅

**Add environment variable:**
- `VITE_API_URL` = `https://YOUR-RAILWAY-URL.up.railway.app/api`
  (Use the Railway URL from step 2)

4. Click "Deploy"

**Done!** 🎉

## 4️⃣ Update Railway with Vercel URL

1. Go back to Railway
2. Update `FRONTEND_URL` to your Vercel URL (e.g., `https://hyt-game.vercel.app`)
3. Click "Redeploy"

## ✅ You're Live!

Share your Vercel URL with anyone:
**`https://your-app-name.vercel.app`**

They can:
- Create an account
- Start a game
- Invite friends with a shareable link
- Play together in real-time

---

## 🔄 Making Updates

Any time you make changes:

```bash
git add .
git commit -m "Your update"
git push
```

Both Railway and Vercel will automatically redeploy! 🚀

---

## 💡 Tips

**Free Limits:**
- Vercel: Unlimited for hobby projects
- Railway: $5/month free credit (plenty for testing)

**Custom Domain** (optional):
- In Vercel, go to Settings → Domains
- Add your custom domain (like `playhyt.com`)

**Troubleshooting:**
- Can't connect? Check that your environment variables match exactly
- CORS errors? Verify `FRONTEND_URL` in Railway matches your Vercel URL
- Still stuck? Check the Railway logs and Vercel function logs
