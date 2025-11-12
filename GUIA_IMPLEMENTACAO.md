# 🛠️ Guia de Implementação - Correções FitPro

Este documento contém soluções prontas para implementar as correções identificadas.

---

## 1️⃣ Corrigir TypeScript Config

**Arquivo:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "forceConsistentCasingInFileNames": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 2️⃣ Corrigir Layout.tsx - apple-touch-icon

**Arquivo:** `src/app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'FitPro - Seu Personal Trainer Digital',
  description: 'App completo de dieta e treino com design premium e UX impecável',
  manifest: '/manifest.json',
  themeColor: '#F97316',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'FitPro'
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon-192.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FitPro" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#F97316" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-inter bg-[#0B0F14] text-[#E6EBF2] overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
```

---

## 3️⃣ Criar Schemas com Zod

**Arquivo:** `src/lib/schemas.ts`

```typescript
import { z } from 'zod'

// Schema para Exercícios
export const ExerciseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  sets: z.number().int().min(1).max(20),
  reps: z.string(),
  weight: z.number().min(0).max(500),
  rest: z.number().min(0).max(600),
  completed: z.boolean(),
  videoUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  tips: z.array(z.string()),
  alternatives: z.array(z.string()).default([]),
  muscleGroup: z.string()
})

export type Exercise = z.infer<typeof ExerciseSchema>

// Schema para Dia de Treino
export const DayWorkoutSchema = z.object({
  day: z.string(),
  name: z.string(),
  exercises: z.array(ExerciseSchema),
  isRestDay: z.boolean()
})

export type DayWorkout = z.infer<typeof DayWorkoutSchema>

// Schema para Plano de Treino
export const WorkoutPlanSchema = z.object({
  type: z.enum(['ABC', 'ABCD', 'Upper-Lower', 'Full-Body', 'Custom']),
  focus: z.string().optional(),
  schedule: z.array(DayWorkoutSchema)
})

export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>

// Schema para Perfil do Usuário
export const UserProfileSchema = z.object({
  name: z.string().min(2).max(100),
  age: z.number().int().min(13).max(120),
  gender: z.enum(['male', 'female', 'other']),
  goal: z.enum(['muscle-gain', 'weight-loss', 'strength', 'endurance']),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  daysPerWeek: z.number().int().min(1).max(7),
  sessionTime: z.number().int().min(15).max(180),
  equipment: z.array(z.string()),
  injuries: z.array(z.string()),
  preferences: z.array(z.string())
})

export type UserProfile = z.infer<typeof UserProfileSchema>

// Função helper para validação segura
export function validateJSON<T>(json: string, schema: z.ZodSchema): T | null {
  try {
    const parsed = JSON.parse(json)
    return schema.parse(parsed) as T
  } catch (error) {
    console.error('Erro ao validar JSON:', error)
    return null
  }
}
```

---

## 4️⃣ Hook para localStorage com SSR Safety

**Arquivo:** `src/hooks/useLocalStorage.ts`

```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'
import { z } from 'zod'

interface UseLocalStorageOptions {
  syncData?: boolean
  onError?: (error: Error) => void
}

export function useLocalStorage<T>(
  key: string,
  schema: z.ZodSchema,
  defaultValue?: T,
  options?: UseLocalStorageOptions
) {
  const [value, setValue] = useState<T | null>(defaultValue ?? null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Inicializar do localStorage
  useEffect(() => {
    try {
      // Verificar se está no client
      if (typeof window === 'undefined') {
        setIsLoading(false)
        return
      }

      const storedValue = localStorage.getItem(key)
      
      if (storedValue) {
        const parsed = JSON.parse(storedValue)
        const validated = schema.parse(parsed)
        setValue(validated as T)
      } else if (defaultValue !== undefined) {
        setValue(defaultValue)
      }
    } catch (err) {
      const error = new Error(`Erro ao carregar ${key}: ${err}`)
      setError(error)
      options?.onError?.(error)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [key, schema, defaultValue, options])

  // Salvar no localStorage
  const setStoredValue = useCallback(
    (val: T | ((prev: T | null) => T)) => {
      try {
        if (typeof window === 'undefined') {
          console.warn('localStorage não disponível no servidor')
          return
        }

        const newValue = typeof val === 'function' ? val(value) : val
        
        // Validar antes de salvar
        schema.parse(newValue)
        
        setValue(newValue)
        localStorage.setItem(key, JSON.stringify(newValue))
      } catch (err) {
        const error = new Error(`Erro ao salvar ${key}: ${err}`)
        setError(error)
        options?.onError?.(error)
        console.error(error)
      }
    },
    [key, schema, value, options]
  )

  // Limpar localStorage
  const remove = useCallback(() => {
    try {
      if (typeof window === 'undefined') return
      
      localStorage.removeItem(key)
      setValue(null)
    } catch (err) {
      const error = new Error(`Erro ao remover ${key}: ${err}`)
      setError(error)
      options?.onError?.(error)
    }
  }, [key, options])

  return {
    value,
    setStoredValue,
    remove,
    isLoading,
    error
  }
}
```

---

## 5️⃣ Context API para Gerenciamento de Estado

**Arquivo:** `src/app/context/FitProContext.tsx`

```typescript
'use client'

import React, { createContext, useContext, useCallback } from 'react'
import type { UserProfile, WorkoutPlan, Screen } from '../page'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  UserProfileSchema,
  WorkoutPlanSchema,
  validateJSON
} from '@/lib/schemas'

interface FitProContextType {
  // State
  userProfile: UserProfile | null
  workoutPlan: WorkoutPlan | null
  isPremium: boolean
  currentWorkoutDay: number

  // Loading/Errors
  isLoading: boolean
  error: Error | null

  // Actions
  setUserProfile: (profile: UserProfile) => void
  setWorkoutPlan: (plan: WorkoutPlan) => void
  setPremium: (isPremium: boolean) => void
  setCurrentWorkoutDay: (day: number) => void
  clearData: () => void
}

const FitProContext = createContext<FitProContextType | undefined>(undefined)

export function FitProProvider({ children }: { children: React.ReactNode }) {
  const {
    value: userProfile,
    setStoredValue: setUserProfile,
    isLoading: profileLoading,
    error: profileError
  } = useLocalStorage<UserProfile | null>(
    'fitpro-profile',
    UserProfileSchema.nullable(),
    null
  )

  const {
    value: workoutPlan,
    setStoredValue: setWorkoutPlan,
    isLoading: planLoading,
    error: planError
  } = useLocalStorage<WorkoutPlan | null>(
    'fitpro-plan',
    WorkoutPlanSchema.nullable(),
    null
  )

  const {
    value: isPremium,
    setStoredValue: setPremiumRaw
  } = useLocalStorage<boolean>(
    'fitpro-premium',
    z.boolean(),
    false
  )

  const {
    value: currentWorkoutDay,
    setStoredValue: setCurrentWorkoutDay
  } = useLocalStorage<number>(
    'fitpro-current-day',
    z.number().int().min(0).max(6),
    0
  )

  const setPremium = useCallback((value: boolean) => {
    setPremiumRaw(value)
  }, [setPremiumRaw])

  const clearData = useCallback(() => {
    setUserProfile(null)
    setWorkoutPlan(null)
    setPremiumRaw(false)
    setCurrentWorkoutDay(0)
  }, [setUserProfile, setWorkoutPlan, setPremiumRaw, setCurrentWorkoutDay])

  const value: FitProContextType = {
    userProfile,
    workoutPlan,
    isPremium: isPremium ?? false,
    currentWorkoutDay: currentWorkoutDay ?? 0,
    isLoading: profileLoading || planLoading,
    error: profileError || planError,
    setUserProfile,
    setWorkoutPlan,
    setPremium,
    setCurrentWorkoutDay,
    clearData
  }

  return (
    <FitProContext.Provider value={value}>
      {children}
    </FitProContext.Provider>
  )
}

export function useFitPro() {
  const context = useContext(FitProContext)
  if (!context) {
    throw new Error('useFitPro must be used within FitProProvider')
  }
  return context
}
```

**Arquivo:** `src/app/page.tsx` (atualizado)

```typescript
'use client'

import { FitProProvider } from './context/FitProContext'
import FitAppContent from './FitAppContent'

export default function FitApp() {
  return (
    <FitProProvider>
      <FitAppContent />
    </FitProProvider>
  )
}
```

---

## 6️⃣ Error Boundary

**Arquivo:** `src/app/components/ErrorBoundary.tsx`

```typescript
'use client'

import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log para serviço de erro (Sentry, LogRocket, etc)
    console.error('Error capturado:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Algo deu errado</h1>
            <p className="text-gray-400 mb-4">
              {this.state.error?.message || 'Erro desconhecido'}
            </p>
            <Button
              onClick={this.handleReset}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

---

## 7️⃣ Atualizar BottomNav com Acessibilidade

**Arquivo:** `src/app/components/BottomNav.tsx`

```tsx
'use client'

import { Home, Calendar, TrendingUp, HelpCircle, Settings, Utensils } from 'lucide-react'
import { Screen } from '../page'

interface BottomNavProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard' as Screen, icon: Home, label: 'Início' },
    { id: 'workout' as Screen, icon: Calendar, label: 'Treino' },
    { id: 'diet' as Screen, icon: Utensils, label: 'Dieta' },
    { id: 'history' as Screen, icon: TrendingUp, label: 'Progresso' },
    { id: 'settings' as Screen, icon: Settings, label: 'Config' }
  ]

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-[#1a1f2e] border-t border-gray-800 z-50"
      aria-label="Navegação principal"
    >
      <div className="max-w-4xl mx-auto px-2">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentScreen === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                  isActive
                    ? 'text-orange-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
              >
                <Icon 
                  className="w-6 h-6 mb-1" 
                  aria-hidden="true"
                  focusable="false"
                />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
```

---

## 8️⃣ Criar manifest.json

**Arquivo:** `public/manifest.json`

```json
{
  "name": "FitPro - Seu Personal Trainer Digital",
  "short_name": "FitPro",
  "description": "App completo de dieta e treino com design premium e UX impecável",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#0B0F14",
  "theme_color": "#F97316",
  "dir": "ltr",
  "lang": "pt-BR",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-192-maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshot-1.png",
      "sizes": "540x720",
      "type": "image/png",
      "form_factor": "narrow"
    },
    {
      "src": "/screenshot-2.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    }
  ],
  "categories": ["fitness", "health"],
  "shortcuts": [
    {
      "name": "Iniciar Treino",
      "short_name": "Treino",
      "description": "Comece um treino rápido",
      "url": "/?screen=workout",
      "icons": [
        {
          "src": "/icon-workout-96.png",
          "sizes": "96x96",
          "type": "image/png"
        }
      ]
    },
    {
      "name": "Plano de Dieta",
      "short_name": "Dieta",
      "description": "Verifique seu plano de dieta",
      "url": "/?screen=diet",
      "icons": [
        {
          "src": "/icon-diet-96.png",
          "sizes": "96x96",
          "type": "image/png"
        }
      ]
    }
  ],
  "prefer_related_applications": false
}
```

---

## 9️⃣ .env.example

**Arquivo:** `.env.example`

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_ENV=development
```

---

## 🔟 Checklist de Implementação

- [ ] Adicionar `forceConsistentCasingInFileNames` em `tsconfig.json`
- [ ] Mover `apple-touch-icon` para `<head>` em `layout.tsx`
- [ ] Criar `src/lib/schemas.ts` com validações Zod
- [ ] Criar `src/hooks/useLocalStorage.ts` com SSR safety
- [ ] Criar `src/app/context/FitProContext.tsx`
- [ ] Criar `src/app/components/ErrorBoundary.tsx`
- [ ] Atualizar `BottomNav.tsx` com acessibilidade
- [ ] Criar `public/manifest.json`
- [ ] Criar `.env.example`
- [ ] Testar em múltiplos browsers (Chrome, Firefox, Safari)
- [ ] Testar PWA em iOS e Android
- [ ] Executar Lighthouse audit

---

*Guia de implementação - Versão 1.0*
