# Vercel Deployment Instructions

## Prerequisites
- GitHub repository set up (see `GITHUB_SETUP.md`)
- Supabase project configured with your environment variables

## Step 1: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in/sign up
2. Click "New Project"
3. Import your GitHub repository (`batelzeek36/mystical-ritual`)
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

### Option B: Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from your project directory
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: mystical-ritual
# - Directory: ./
# - Override settings? No
```

## Step 2: Configure Environment Variables
In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add these variables (copy from your `.env.local`):

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important**: 
- Use the exact variable names with `VITE_` prefix
- Copy values from your local `.env.local` file
- Add variables for all environments (Production, Preview, Development)

## Step 3: Redeploy
After adding environment variables:
1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Select **Redeploy**
4. Check "Use existing Build Cache" and click **Redeploy**

## Step 4: Configure Custom Domain (Optional)
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

## Step 5: Verify Deployment
1. Visit your Vercel app URL (e.g., `mystical-ritual.vercel.app`)
2. Test key features:
   - ✅ App loads without errors
   - ✅ Version switcher works (v1.0.0, v1.1.0, v1.2.0)
   - ✅ Magic link authentication
   - ✅ Intention creation and burning
   - ✅ Cross-device sync
   - ✅ Mystical flame animations

## Automatic Deployments
Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches and pull requests

## Troubleshooting

### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

### Runtime Errors
- Check browser console for errors
- Verify Supabase connection
- Check environment variable values

### Supabase Connection Issues
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Check Supabase project settings
- Ensure RLS policies are configured correctly

## Performance Optimization
Your app is already optimized with:
- ✅ Vite build optimization
- ✅ Code splitting by version
- ✅ Efficient React components
- ✅ Optimized animations
- ✅ Proper TypeScript configuration

## Monitoring
- Use Vercel Analytics for performance insights
- Monitor Supabase dashboard for database usage
- Check Vercel Functions logs if using serverless functions

## Support
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Supabase Documentation: [supabase.com/docs](https://supabase.com/docs)