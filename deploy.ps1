Write-Host "🚀 [TRS] Deployment Started - Potential Chainsaw"

# Step 1: Sync latest from Git
Write-Host "`n📡 Pulling latest changes from GitHub..."
git pull origin main

# Step 2: Install and build
Write-Host "`n🔧 Installing NPM dependencies..."
npm install

Write-Host "`n🏗️ Building project for production..."
npm run build

# Step 3: Deploy to Netlify
Write-Host "`n🌐 Deploying to Netlify..."
netlify deploy --prod --dir=build

# Step 4: Deploy to Firebase
Write-Host "`n🔥 Deploying to Firebase Hosting + Firestore..."
firebase deploy --only hosting,firestore

# Optional Logging Block (can be redirected to a file or console)
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Write-Host "`n✅ Deployment Complete at $timestamp"
Write-Host "📝 Log Summary:"
Write-Host "$timestamp | Git Pull, Build, Deploy to Netlify + Firebase completed."

# Future: Append to deployment log file
# Add-Content -Path "./deploy.log" -Value "$timestamp | Deployment successful."

