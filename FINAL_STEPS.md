# 🎯 Final Steps (30 Seconds)

I just opened Railway in your browser. Here's what to do:

## Step 1: Deploy Backend (in the browser window that just opened)

1. **Login/Signup to Railway** (it's free)
2. **Click "Deploy Now"** or "Deploy from GitHub"
3. **Select the backend folder** if asked
4. **Add environment variables**:
   - `JWT_SECRET`: Paste this → `hyt-secret-a7f3c9d2e1b4f6a8`
   - `FRONTEND_URL`: Paste this → `https://hyt-game.vercel.app`
   - `PORT`: `3000`
5. **Click Deploy**

Wait ~2 minutes for it to deploy...

## Step 2: Copy Backend URL

After deployment:
- Look for "Deployments" or "Settings"
- Find the URL (looks like: `https://something.up.railway.app`)
- **Copy it!**

## Step 3: Connect Frontend to Backend

Run these commands in your terminal:

```bash
cd "/Users/cr/Desktop/HYT Game"

# This will ask for the backend URL
vercel env add VITE_API_URL production
```

When it asks for the value, paste:
```
https://YOUR-RAILWAY-URL/api
```
(Replace YOUR-RAILWAY-URL with what you copied)

Then redeploy:
```bash
vercel --prod
```

---

## ✅ DONE!

Go to **https://hyt-game.vercel.app** and it will work!

Share that link with anyone to play HYT together!

---

## Alternative: Use My Values

If you want to skip creating your own, you can use Railway's auto-generated values - just make sure to copy the Railway URL they give you after deployment.
