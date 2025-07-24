# Changelog

All notable changes to the Mystical Ritual app will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-07-24

### Added
- **Supabase Integration**: Full cloud sync with authentication and database storage
- **Magic Link Authentication**: Email-only login system for seamless access
- **Cross-Device Sync**: Intentions and releases now sync across all your devices
- **Toast Notifications**: Beautiful feedback system for user actions
- **Row Level Security**: Secure data isolation for each user
- **Enhanced UX**: Improved user experience with loading states and error handling
- **Cloud Storage**: Replace localStorage with Supabase database for persistence
- **Authentication Modal**: Mystical-themed login interface
- **User Status Display**: Shows current authentication state in the header

### Changed
- Updated version management system to include v1.2.0
- Enhanced CallItInPanel with Supabase integration
- Enhanced BurnItPanel with cloud storage for releases
- Improved error handling and user feedback
- Updated UI to show authentication status and sync capabilities

### Technical
- Added `@supabase/supabase-js` dependency
- Created Supabase client configuration
- Implemented intention service for database operations
- Added TypeScript environment variable definitions
- Created reusable Toast and AuthModal components

## [1.1.0] - 2025-07-24

### Added
- **Enhanced Mystical Flame Animation**: Beautiful particle-based fire effects
- **160+ Individual Particles**: Each with unique properties and physics
- **Realistic Fire Behavior**: Particles with size, color, movement, and timing variations
- **Cinematic Burn Effects**: Enhanced visual feedback for release rituals
- **Improved Animation Performance**: Optimized particle system

### Changed
- Replaced blob-like flame animation with sophisticated particle system
- Enhanced burn animation with individual glowing particles
- Improved mystical atmosphere with better visual effects
- Updated version management to support v1.1.0

### Fixed
- Resolved user feedback about strange-looking flame animation
- Improved magical feel of the burn ritual experience

## [1.0.0] - 2025-07-24

### Added
- **Initial Release**: Mystical manifestation ritual web application
- **Call It In Panel**: East-facing manifestation interface for desires
- **Burn It Panel**: West-facing release interface for letting go
- **Mystical Styling**: Beautiful gradient backgrounds and magical fonts
- **Local Storage**: Persistence for user intentions and desires
- **Responsive Design**: Works on desktop and mobile devices
- **Animated UI**: Smooth transitions and mystical sparkle effects
- **Version Management System**: Support for multiple app versions

### Features
- Desire card system with seal/unseal functionality
- Burn animation for release rituals
- Navigation between Call It In and Burn It modes
- Mystical background elements and animations
- Cinzel font family for mystical typography
- Custom CSS animations and effects

### Technical
- Built with Vite + React + TypeScript
- Styled with TailwindCSS
- Animated with Framer Motion
- Modular component architecture
- Version-based app structure