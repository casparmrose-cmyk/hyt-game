#!/bin/bash

# HYT Backend Deployment to Railway
# Run this script to deploy your backend

set -e

cd "/Users/cr/Desktop/HYT Game/backend"

echo "🚂 Deploying HYT Backend to Railway"
echo "===================================="
echo ""

# Check if railway is logged in
if ! railway whoami > /dev/null 2>&1; then
    echo "📝 Step 1: Login to Railway"
    echo "This will open your browser..."
    echo ""
    railway login
    echo ""
fi

echo "✅ Logged in!"
echo ""

echo "📦 Step 2: Initialize Railway project"
railway init --name hyt-backend

echo ""
echo "🔐 Step 3: Setting environment variables"
JWT_SECRET=$(openssl rand -hex 32)
railway variables set JWT_SECRET="$JWT_SECRET"
railway variables set PORT=3000
railway variables set FRONTEND_URL="https://hyt-game.vercel.app"

echo ""
echo "🚀 Step 4: Deploying backend..."
railway up --detach

echo ""
echo "⏳ Waiting for deployment..."
sleep 10

echo ""
echo "✅ Getting your backend URL..."
BACKEND_URL=$(railway status --json 2>/dev/null | grep -o '"url":"[^"]*"' | cut -d'"' -f4 || echo "")

if [ -z "$BACKEND_URL" ]; then
    echo ""
    echo "⚠️  Couldn't automatically get URL. Run this to see it:"
    echo "   railway status"
else
    echo ""
    echo "🎉 Backend deployed successfully!"
    echo ""
    echo "Backend URL: $BACKEND_URL"
    echo ""
    echo "📋 Next step: Update Vercel with this backend URL"
    echo ""
    echo "Run these commands:"
    echo ""
    echo "cd '/Users/cr/Desktop/HYT Game'"
    echo "vercel env add VITE_API_URL production"
    echo "# When prompted, enter: ${BACKEND_URL}/api"
    echo "vercel --prod"
    echo ""
fi
