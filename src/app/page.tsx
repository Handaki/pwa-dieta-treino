'use client'

import { useState, useEffect } from 'react'
import { LandingPage } from './components/LandingPage'
import { QuizScreen } from './components/QuizScreen'
import { PaymentScreen } from './components/PaymentScreen'
import { DashboardScreen } from './components/DashboardScreen'
import { WorkoutScreen } from './components/WorkoutScreen'
import { DietScreen } from './components/DietScreen'
import { HistoryScreen } from './components/HistoryScreen'
import { FAQScreen } from './components/FAQScreen'
import { SettingsScreen } from './components/SettingsScreen'
import { PainAssessmentScreen } from './components/PainAssessmentScreen'
import { BottomNav } from './components/BottomNav'

export type Screen = 
  | 'landing' 
  | 'quiz' 
  | 'payment' 
  | 'dashboard' 
  | 'workout'
  | 'diet'
  | 'history' 
  | 'faq' 
  | 'settings'
  | 'pain-assessment'

export interface UserProfile {
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  goal: 'muscle-gain' | 'weight-loss' | 'strength' | 'endurance'
  level: 'beginner' | 'intermediate' | 'advanced'
  daysPerWeek: number
  sessionTime: number
  equipment: string[]
  injuries: string[]
  preferences: string[]
}

export interface WorkoutPlan {
  type: 'ABC' | 'ABCD' | 'Upper-Lower' | 'Full-Body' | 'Custom'
  focus?: string
  schedule: DayWorkout[]
}

export interface DayWorkout {
  day: string
  name: string
  exercises: Exercise[]
  isRestDay: boolean
}

export interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  weight: number
  rest: number
  completed: boolean
  videoUrl?: string
  imageUrl?: string
  tips: string[]
  alternatives: Exercise[]
  muscleGroup: string
}

export default function FitApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [currentWorkoutDay, setCurrentWorkoutDay] = useState(0)

  useEffect(() => {
    // Check if user is logged in and has premium
    const savedProfile = localStorage.getItem('fitpro-profile')
    const savedPremium = localStorage.getItem('fitpro-premium')
    const savedPlan = localStorage.getItem('fitpro-plan')
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
    
    if (savedPremium === 'true') {
      setIsPremium(true)
      if (savedProfile) {
        setCurrentScreen('dashboard')
      }
    }

    if (savedPlan) {
      setWorkoutPlan(JSON.parse(savedPlan))
    }
  }, [])

  const handleQuizComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    localStorage.setItem('fitpro-profile', JSON.stringify(profile))
    setCurrentScreen('payment')
  }

  const handlePaymentComplete = (plan: string) => {
    setIsPremium(true)
    localStorage.setItem('fitpro-premium', 'true')
    
    // Generate workout plan based on user profile
    if (userProfile) {
      const generatedPlan = generateWorkoutPlan(userProfile)
      setWorkoutPlan(generatedPlan)
      localStorage.setItem('fitpro-plan', JSON.stringify(generatedPlan))
    }
    
    setCurrentScreen('dashboard')
  }

  const generateWorkoutPlan = (profile: UserProfile): WorkoutPlan => {
    // Simplified workout plan generation
    const daysPerWeek = profile.daysPerWeek
    
    if (daysPerWeek <= 3) {
      return generateFullBodyPlan(profile)
    } else if (daysPerWeek === 4) {
      return generateUpperLowerPlan(profile)
    } else {
      return generateABCPlan(profile)
    }
  }

  const generateFullBodyPlan = (profile: UserProfile): WorkoutPlan => {
    const exercises: Exercise[] = [
      {
        id: '1',
        name: 'Agachamento Livre',
        sets: 4,
        reps: '8-12',
        weight: 0,
        rest: 120,
        completed: false,
        muscleGroup: 'Pernas',
        tips: [
          'Mantenha o core contraído durante todo o movimento',
          'Desça até as coxas ficarem paralelas ao chão',
          'Joelhos alinhados com os pés'
        ],
        alternatives: []
      },
      {
        id: '2',
        name: 'Supino Reto',
        sets: 4,
        reps: '8-12',
        weight: 0,
        rest: 120,
        completed: false,
        muscleGroup: 'Peito',
        tips: [
          'Escápulas retraídas e deprimidas',
          'Barra na linha dos mamilos',
          'Cotovelos a 45 graus do corpo'
        ],
        alternatives: []
      },
      {
        id: '3',
        name: 'Remada Curvada',
        sets: 4,
        reps: '8-12',
        weight: 0,
        rest: 120,
        completed: false,
        muscleGroup: 'Costas',
        tips: [
          'Coluna neutra durante todo movimento',
          'Puxe com os cotovelos, não com as mãos',
          'Aperte as escápulas no topo'
        ],
        alternatives: []
      },
      {
        id: '4',
        name: 'Desenvolvimento com Halteres',
        sets: 3,
        reps: '10-12',
        weight: 0,
        rest: 90,
        completed: false,
        muscleGroup: 'Ombros',
        tips: [
          'Core estável e contraído',
          'Não hiperextenda a lombar',
          'Movimento controlado na descida'
        ],
        alternatives: []
      },
      {
        id: '5',
        name: 'Rosca Direta',
        sets: 3,
        reps: '10-15',
        weight: 0,
        rest: 60,
        completed: false,
        muscleGroup: 'Bíceps',
        tips: [
          'Cotovelos fixos ao lado do corpo',
          'Não balance o corpo',
          'Controle na fase excêntrica'
        ],
        alternatives: []
      },
      {
        id: '6',
        name: 'Tríceps na Polia',
        sets: 3,
        reps: '10-15',
        weight: 0,
        rest: 60,
        completed: false,
        muscleGroup: 'Tríceps',
        tips: [
          'Cotovelos fixos ao lado do corpo',
          'Extensão completa dos braços',
          'Movimento controlado'
        ],
        alternatives: []
      }
    ]

    return {
      type: 'Full-Body',
      schedule: [
        { day: 'Segunda', name: 'Treino Full Body A', exercises, isRestDay: false },
        { day: 'Terça', name: 'Descanso', exercises: [], isRestDay: true },
        { day: 'Quarta', name: 'Treino Full Body B', exercises, isRestDay: false },
        { day: 'Quinta', name: 'Descanso', exercises: [], isRestDay: true },
        { day: 'Sexta', name: 'Treino Full Body C', exercises, isRestDay: false },
        { day: 'Sábado', name: 'Descanso', exercises: [], isRestDay: true },
        { day: 'Domingo', name: 'Descanso Ativo', exercises: [], isRestDay: true }
      ]
    }
  }

  const generateUpperLowerPlan = (profile: UserProfile): WorkoutPlan => {
    return {
      type: 'Upper-Lower',
      schedule: [
        { day: 'Segunda', name: 'Treino Superior A', exercises: [], isRestDay: false },
        { day: 'Terça', name: 'Treino Inferior A', exercises: [], isRestDay: false },
        { day: 'Quarta', name: 'Descanso', exercises: [], isRestDay: true },
        { day: 'Quinta', name: 'Treino Superior B', exercises: [], isRestDay: false },
        { day: 'Sexta', name: 'Treino Inferior B', exercises: [], isRestDay: false },
        { day: 'Sábado', name: 'Descanso', exercises: [], isRestDay: true },
        { day: 'Domingo', name: 'Descanso Ativo', exercises: [], isRestDay: true }
      ]
    }
  }

  const generateABCPlan = (profile: UserProfile): WorkoutPlan => {
    return {
      type: 'ABC',
      schedule: [
        { day: 'Segunda', name: 'Treino A - Peito e Tríceps', exercises: [], isRestDay: false },
        { day: 'Terça', name: 'Treino B - Costas e Bíceps', exercises: [], isRestDay: false },
        { day: 'Quarta', name: 'Treino C - Pernas e Ombros', exercises: [], isRestDay: false },
        { day: 'Quinta', name: 'Treino A - Peito e Tríceps', exercises: [], isRestDay: false },
        { day: 'Sexta', name: 'Treino B - Costas e Bíceps', exercises: [], isRestDay: false },
        { day: 'Sábado', name: 'Descanso', exercises: [], isRestDay: true },
        { day: 'Domingo', name: 'Descanso Ativo', exercises: [], isRestDay: true }
      ]
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onStartQuiz={() => setCurrentScreen('quiz')} />
      
      case 'quiz':
        return <QuizScreen onComplete={handleQuizComplete} />
      
      case 'payment':
        return (
          <PaymentScreen 
            userProfile={userProfile!}
            onComplete={handlePaymentComplete}
          />
        )
      
      case 'dashboard':
        return (
          <DashboardScreen
            userProfile={userProfile!}
            workoutPlan={workoutPlan!}
            onStartWorkout={() => setCurrentScreen('workout')}
            onNavigate={setCurrentScreen}
          />
        )
      
      case 'workout':
        return (
          <WorkoutScreen
            workout={workoutPlan?.schedule[currentWorkoutDay]}
            onBack={() => setCurrentScreen('dashboard')}
            onPainReport={() => setCurrentScreen('pain-assessment')}
          />
        )
      
      case 'diet':
        return (
          <DietScreen
            userProfile={userProfile!}
            onBack={() => setCurrentScreen('dashboard')}
          />
        )
      
      case 'history':
        return (
          <HistoryScreen
            onBack={() => setCurrentScreen('dashboard')}
          />
        )
      
      case 'faq':
        return (
          <FAQScreen
            onBack={() => setCurrentScreen('dashboard')}
          />
        )
      
      case 'settings':
        return (
          <SettingsScreen
            userProfile={userProfile!}
            workoutPlan={workoutPlan!}
            onSave={(profile, plan) => {
              setUserProfile(profile)
              setWorkoutPlan(plan)
              localStorage.setItem('fitpro-profile', JSON.stringify(profile))
              localStorage.setItem('fitpro-plan', JSON.stringify(plan))
              setCurrentScreen('dashboard')
            }}
            onBack={() => setCurrentScreen('dashboard')}
          />
        )
      
      case 'pain-assessment':
        return (
          <PainAssessmentScreen
            onBack={() => setCurrentScreen('workout')}
          />
        )
      
      default:
        return <LandingPage onStartQuiz={() => setCurrentScreen('quiz')} />
    }
  }

  const showBottomNav = isPremium && !['landing', 'quiz', 'payment'].includes(currentScreen)

  return (
    <div className="font-inter min-h-screen bg-[#0B0F14]">
      {renderScreen()}
      {showBottomNav && (
        <BottomNav 
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />
      )}
    </div>
  )
}
