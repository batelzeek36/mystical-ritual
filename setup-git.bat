@echo off
echo 🔮 Mystical Ritual - Git Setup Script
echo =====================================
echo.

echo Initializing Git repository...
git init

echo.
echo Adding all files to staging...
git add .

echo.
echo Creating initial commit...
git commit -m "🔮 Initial commit - Mystical Ritual v1.2.0 with Supabase integration

✨ Features:
- Magic link authentication
- Cross-device sync with Supabase
- Enhanced mystical flame animations (160+ particles)
- Toast notifications and enhanced UX
- Version management system (v1.0.0, v1.1.0, v1.2.0)
- Complete cloud storage integration
- Row Level Security for user data"

echo.
echo Setting main branch...
git branch -M main

echo.
echo ✨ Git repository initialized successfully!
echo.
echo Next steps:
echo 1. Create a new repository on GitHub
echo 2. Run: git remote add origin https://github.com/YOUR_USERNAME/mystical-ritual-app.git
echo 3. Run: git push -u origin main
echo 4. Follow the DEPLOYMENT.md guide for full deployment
echo.
echo May your code manifest in the cloud! 🌟
pause