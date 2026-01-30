#!/bin/bash

# HYT Deployment Setup Script
# This script helps you prepare HYT for deployment to Vercel and Railway

set -e

echo "🎮 HYT - Deployment Setup"
echo "=========================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Add all files
echo ""
echo "📝 Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "✅ No changes to commit (already committed)"
else
    echo "💾 Committing changes..."
    git commit -m "HYT - How You Think game - Ready for deployment"
    echo "✅ Changes committed"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "==========="
echo ""
echo "1. Create a GitHub repository:"
echo "   → Go to https://github.com/new"
echo "   → Name it 'hyt-game'"
echo "   → Don't initialize with README (we already have one)"
echo ""
echo "2. Push your code:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/hyt-game.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Follow QUICKSTART_DEPLOY.md for deployment steps"
echo ""
echo "📖 Open QUICKSTART_DEPLOY.md for full instructions"
