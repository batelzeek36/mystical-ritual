// Version Management System
export interface AppVersion {
  id: string
  name: string
  description: string
  component: React.ComponentType
  createdAt: string
  isActive: boolean
}

// Import all versions
import V1App from './v1/App'
import V110App from './v1.1.0/App'
import V120App from './v1.2.0/App'

export const versions: AppVersion[] = [
  {
    id: 'v1.0.0',
    name: 'Mystical Ritual v1.0.0',
    description: 'Original mystical manifestation app with Call It In and Burn It panels',
    component: V1App,
    createdAt: '2025-07-24',
    isActive: false
  },
  {
    id: 'v1.1.0',
    name: 'Mystical Ritual v1.1.0',
    description: 'Enhanced with beautiful animated mystical flames and cinematic burn effects',
    component: V110App,
    createdAt: '2025-07-24',
    isActive: false
  },
  {
    id: 'v1.2.0',
    name: 'Mystical Ritual v1.2.0',
    description: 'Cloud sync with Supabase authentication, magic link login, and cross-device intention storage',
    component: V120App,
    createdAt: '2025-07-24',
    isActive: true
  }
  // Future versions will be added here
  // {
  //   id: 'v2.0.0',
  //   name: 'Mystical Ritual v2.0.0',
  //   description: 'Enhanced version with new features',
  //   component: V2App,
  //   createdAt: '2025-XX-XX',
  //   isActive: false
  // }
]

export const getActiveVersion = (): AppVersion => {
  return versions.find(v => v.isActive) || versions[0]
}

export const getVersionById = (id: string): AppVersion | undefined => {
  return versions.find(v => v.id === id)
}

export const getAllVersions = (): AppVersion[] => {
  return versions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}