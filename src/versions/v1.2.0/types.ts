export type RitualMode = 'call-it-in' | 'burn-it'

export interface Desire {
  id: string
  text: string
  createdAt: Date
  isSealed: boolean
}

export interface Release {
  id: string
  text: string
  createdAt: Date
}

export interface User {
  id: string
  email: string
}