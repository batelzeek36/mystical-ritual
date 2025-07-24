# 🔮 Mystical Ritual - Manifestation & Release App

A beautiful, mystical web application for manifesting desires and releasing what no longer serves you. Built with React, TypeScript, and enhanced with Supabase for cloud sync and authentication.

## ✨ Features

### v1.2.0 - Cloud Sync & Authentication
- **Magic Link Authentication**: Secure email-only login system
- **Cross-Device Sync**: Your intentions sync across all devices
- **Cloud Storage**: Powered by Supabase for reliable data persistence
- **Toast Notifications**: Beautiful feedback for all user actions
- **Enhanced UX**: Loading states, error handling, and user status display

### v1.1.0 - Enhanced Mystical Flames
- **Particle-Based Fire Animation**: 160+ individual glowing particles
- **Realistic Fire Physics**: Each particle has unique properties and behavior
- **Cinematic Burn Effects**: Beautiful visual feedback for release rituals

### v1.0.0 - Core Features
- **Call It In Panel**: East-facing manifestation interface for desires
- **Burn It Panel**: West-facing release interface for letting go
- **Mystical Styling**: Beautiful gradients and magical typography
- **Version Management**: Switch between different app versions
- **Responsive Design**: Works perfectly on desktop and mobile

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for v1.2.0 features)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd mystical-ritual
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up Supabase Database**

Create a table called `intentions` in your Supabase project:

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

5. **Start the development server**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the app in action! 🎉

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit - Mystical Ritual v1.2.0"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables in Vercel dashboard:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Deploy! 🚀

### Deploy to Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
- Go to [netlify.com](https://netlify.com)
- Drag and drop the `dist` folder
- Or connect your GitHub repository
- Add environment variables in Netlify dashboard

## 🔧 Development

### Project Structure
```
src/
├── components/          # Shared components
│   ├── AuthModal.tsx   # Authentication modal
│   ├── Toast.tsx       # Toast notifications
│   └── ...
├── lib/
│   └── supabase.ts     # Supabase client and services
├── versions/           # Version management system
│   ├── v1.0.0/        # Original version
│   ├── v1.1.0/        # Enhanced flames version
│   ├── v1.2.0/        # Supabase integration version
│   └── index.ts       # Version registry
└── ...
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Version Management
The app includes a sophisticated version management system that allows you to:
- Switch between different app versions
- Compare features across versions
- Maintain backward compatibility

Access the version switcher in the bottom-right corner of the app.

## 🔮 Usage Guide

### Manifestation (Call It In)
1. Face East (symbolically) 🌅
2. Write your desires and intentions
3. Seal them to send to the universe
4. Watch them sync across all your devices (when signed in)

### Release (Burn It)
1. Face West (symbolically) 🔥
2. Write what you want to release
3. Burn it away with mystical flames
4. Let the transformation begin

### Authentication
- Click "Sign In to Sync" to access cloud features
- Enter your email for a magic link
- No passwords needed - just pure magic! ✨

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS with custom mystical theme
- **Animations**: Framer Motion
- **Backend**: Supabase (Auth + Database)
- **Deployment**: Vercel/Netlify ready

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your mystical improvements
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Acknowledgments

- Built with love and mystical energy ✨
- Inspired by the power of intention and release
- Powered by the amazing Supabase platform

---

*May your manifestations come to fruition and your releases bring you peace* 🔮✨