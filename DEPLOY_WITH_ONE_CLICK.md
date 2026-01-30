# 🚀 One-Click Backend Deployment

## Deploy Backend to Railway (1 Minute)

### Option 1: Deploy Button (Easiest)

Click this button to deploy to Railway with one click:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/casparmrose-cmyk/hyt-game&plugins=&envs=JWT_SECRET,FRONTEND_URL&JWT_SECRETDesc=Random+secret+for+JWT+tokens&FRONTEND_URLDesc=Your+Vercel+frontend+URL&JWT_SECRETDefault=hyt-secret-change-me&FRONTEND_URLDefault=https://hyt-game.vercel.app)

**Steps:**
1. Click the button above
2. Login/signup to Railway (free)
3. Set environment variables:
   - `JWT_SECRET`: Any random string (e.g., `hyt-super-secret-$(openssl rand -hex 16)`)
   - `FRONTEND_URL`: `https://hyt-game.vercel.app`
4. Click "Deploy"
5. Wait ~2 minutes for deployment
6. Copy the URL shown (like `https://yourapp.up.railway.app`)

### Option 2: Railway Web Dashboard

1. Go to: https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select: `casparmrose-cmyk/hyt-game`
4. Railway will detect the backend automatically
5. Add environment variables:
   - `JWT_SECRET` = `hyt-secret-$(openssl rand -hex 16)`
   - `FRONTEND_URL` = `https://hyt-game.vercel.app`
   - `PORT` = `3000`
6. Click "Deploy"

---

## After Backend Deploys

### Update Frontend with Backend URL

Once you have the Railway URL:

```bash
cd "/Users/cr/Desktop/HYT Game"

# Add backend URL to Vercel
vercel env add VITE_API_URL production
# When prompted, enter: https://YOUR-RAILWAY-URL/api

# Redeploy
vercel --prod
```

---

## ✅ Done!

Your app is now fully live at:
**https://hyt-game.vercel.app**

Share it with anyone!
