Write-Host "🚀 TRS Deployment Started..."

# Sync from Git
git pull origin main

# Build the project
Write-Host "🔧 Installing dependencies..."
npm install
npm run build

# Deploy to Netlify
Write-Host "🌐 Deploying to Netlify..."
netlify deploy --prod

# Deploy to Firebase Hosting (and Firestore rules if needed)
Write-Host "🔥 Deploying to Firebase..."
firebase deploy --only hosting,firestore

Write-Host "✅ Deployment Complete."
