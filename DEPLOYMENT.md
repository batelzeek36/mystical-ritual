# 🚀 Deployment Guide - Mystical Ritual v1.2.0

This guide will help you deploy your Mystical Ritual app to production with Supabase integration.

## 📋 Prerequisites

- [x] Git installed and configured
- [x] GitHub account
- [x] Supabase project created
- [x] Vercel or Netlify account

## 🔧 Step 1: Initialize Git Repository

Open a new terminal/command prompt and run these commands:

```bash
# Initialize Git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "🔮 Initial commit - Mystical Ritual v1.2.0 with Supabase integration

✨ Features:
- Magic link authentication
- Cross-device sync with Supabase
- Enhanced mystical flame animations (160+ particles)
- Toast notifications and enhanced UX
- Version management system (v1.0.0, v1.1.0, v1.2.0)
- Complete cloud storage integration
- Row Level Security for user data"

# Set main branch
git branch -M main
```

## 🌐 Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `mystical-ritual-app`
3. Keep it public or private (your choice)
4. **Don't** initialize with README (we already have one)

## 🔗 Step 3: Connect to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/mystical-ritual-app.git

# Push to GitHub
git push -u origin main
```

## 🗄️ Step 4: Set Up Supabase Database

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Open your project
3. Go to **SQL Editor**
4. Run this SQL to create the intentions table:

```sql
-- Create the intentions table
CREATE TABLE intentions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('manifest', 'release')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE intentions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see their own intentions
CREATE POLICY "Users can only see their own intentions" ON intentions
  FOR ALL USING (auth.uid() = user_id);
```

5. Go to **Authentication > Settings**
6. Make sure **Enable email confirmations** is turned OFF (for magic links to work smoothly)

## 🚀 Step 5: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard
1. Go to [Vercel](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect it's a Vite project
5. Add environment variables:
   - `VITE_SUPABASE_URL` = Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon key
6. Click **Deploy**

### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: mystical-ritual-app
# - Directory: ./
# - Override settings? No

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Redeploy with environment variables
vercel --prod
```

## 🌐 Alternative: Deploy to Netlify

1. Go to [Netlify](https://netlify.com)
2. Click **"New site from Git"**
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables in **Site settings > Environment variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Deploy site**

## 🔑 Step 6: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Click **Settings** (gear icon)
3. Go to **API** section
4. Copy:
   - **Project URL** → Use as `VITE_SUPABASE_URL`
   - **anon public** key → Use as `VITE_SUPABASE_ANON_KEY`

## ✅ Step 7: Test Your Deployment

1. Visit your deployed URL
2. Test the authentication:
   - Click "Sign In to Sync"
   - Enter your email
   - Check your email for the magic link
   - Click the magic link to sign in
3. Test creating intentions:
   - Create a manifestation intention
   - Create a release intention
4. Test cross-device sync:
   - Open the app on another device/browser
   - Sign in with the same email
   - Verify your intentions are synced

## 🔧 Troubleshooting

### Authentication Issues
- Make sure your Supabase URL and keys are correct
- Check that email confirmations are disabled in Supabase Auth settings
- Verify the magic link redirects to your deployed domain

### Build Issues
- Ensure all environment variables are set correctly
- Check that the build command is `npm run build`
- Verify the publish directory is `dist`

### Database Issues
- Make sure the `intentions` table exists
- Verify Row Level Security is enabled
- Check that the policy allows users to access their own data

## 📱 Custom Domain (Optional)

### For Vercel:
1. Go to your project dashboard
2. Click **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

### For Netlify:
1. Go to **Site settings > Domain management**
2. Click **Add custom domain**
3. Follow DNS configuration instructions

## 🎉 You're Live!

Your Mystical Ritual app is now live with:
- ✨ Magic link authentication
- 🔄 Cross-device sync
- 🔥 Beautiful mystical flame animations
- 📱 Responsive design
- 🔒 Secure user data with RLS

Share your mystical creation with the world! 🌟

---

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Test Supabase connection in the Supabase dashboard
4. Check deployment logs in Vercel/Netlify dashboard

May your manifestations come to fruition! 🔮✨