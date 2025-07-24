# GitHub Setup Instructions

## Connect to GitHub Repository

### Step 1: Create a New Repository on GitHub
1. Go to [GitHub.com](https://github.com) and sign in with your account (`batelzeek36`)
2. Click the "+" icon in the top right corner and select "New repository"
3. Repository settings:
   - **Repository name**: `mystical-ritual` (or your preferred name)
   - **Description**: "Mystical Ritual v1.2.0 - A spiritual intention-setting app with Supabase integration"
   - **Visibility**: Public (recommended for Vercel deployment)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

### Step 2: Connect Your Local Repository
After creating the GitHub repository, run these commands in your terminal:

```bash
# Add the GitHub repository as remote origin
git remote add origin https://github.com/batelzeek36/mystical-ritual.git

# Push your code to GitHub
git push -u origin main
```

### Step 3: Verify Upload
- Visit your GitHub repository URL
- Confirm all files are uploaded correctly
- Check that the README.md displays properly

## Alternative: Using GitHub CLI (if installed)
If you have GitHub CLI installed, you can create and push in one step:

```bash
# Create repository and push (requires GitHub CLI)
gh repo create mystical-ritual --public --source=. --remote=origin --push
```

## Next Steps
Once your code is on GitHub, proceed to the Vercel deployment instructions in `VERCEL_SETUP.md`.