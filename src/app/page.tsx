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
    const daysPerWeek = profile.daysPerWeek
    
    if (daysPerWeek <= 3) {
      return generateFullBodyPlan(profile)
    } else if (daysPerWeek === 4) {
      return generateUpperLowerPlan(profile)
    } else if (daysPerWeek === 5) {
      return generateABCPlan(profile)
    } else {
      return generateABCDPlan(profile)
    }
  }

  const generateFullBodyPlan = (profile: UserProfile): WorkoutPlan => {
    const chestExercises: Exercise[] = [
      {
        id: 'chest-1',
        name: 'Supino Reto com Barra',
        sets: 4,
        reps: '8-12',
        weight: 0,
        rest: 120,
        completed: false,
        muscleGroup: 'Peito',
        tips: [
          'Escápulas retraídas e deprimidas durante todo movimento',
          'Barra na linha dos mamilos, não no pescoço',
          'Cotovelos a 45 graus do corpo, não 90 graus',
          'Desça controlado (2-3 segundos) e suba explosivo'
        ],
        alternatives: [
          {
            id: 'chest-alt-1',
            name: 'Supino com Halteres',
            sets: 4,
            reps: '8-12',
            weight: 0,
            rest: 120,
            completed: false,
            muscleGroup: 'Peito',
            tips: ['Maior amplitude de movimento', 'Trabalha estabilizadores'],
            alternatives: []
          },
          {
            id: 'chest-alt-2',
            name: 'Supino na Máquina',
            sets: 4,
            reps: '10-12',
            weight: 0,
            rest: 90,
            completed: false,
            muscleGroup: 'Peito',
            tips: ['Mais seguro para iniciantes', 'Foco no músculo alvo'],
            alternatives: []
          }
        ]
      },
      {
        id: 'chest-2',
        name: 'Supino Inclinado com Halteres',
        sets: 3,
        reps: '10-12',
        weight: 0,
        rest: 90,
        completed: false,
        muscleGroup: 'Peito Superior',
        tips: [
          'Banco a 30-45 graus (não mais que isso)',
          'Halteres descem na linha do peito superior',
          'Não arqueie demais a lombar',
          'Aperte o peito no topo do movimento'
        ],
        alternatives: [
          {
            id: 'chest-alt-3',
            name: 'Supino Inclinado com Barra',
            sets: 3,
            reps: '8-10',
            weight: 0,
            rest: 90,
            completed: false,
            muscleGroup: 'Peito Superior',
            tips: ['Mais carga possível', 'Ótimo para força'],
            alternatives: []
          }
        ]
      },
      {
        id: 'chest-3',
        name: 'Crucifixo Inclinado',
        sets: 3,
        reps: '12-15',
        weight: 0,
        rest: 60,
        completed: false,
        muscleGroup: 'Peito',
        tips: [
          'Cotovelos levemente flexionados (não travados)',
          'Movimento amplo, sinta o alongamento',
          'Não desça demais se sentir desconforto no ombro',
          'Aperte forte no topo'
        ],
        alternatives: [
          {
            id: 'chest-alt-4',
            name: 'Peck Deck (Voador)',
            sets: 3,
            reps: '12-15',
            weight: 0,
            rest: 60,
            completed: false,
            muscleGroup: 'Peito',
            tips: ['Isolamento máximo', 'Controle total do movimento'],
            alternatives: []
          }
        ]
      }
    ]

    const backExercises: Exercise[] = [
      {
        id: 'back-1',
        name: 'Remada Curvada com Barra',
        sets: 4,
        reps: '8-12',
        weight: 0,
        rest: 120,
        completed: false,
        muscleGroup: 'Costas',
        tips: [
          'Coluna neutra (não arredonde as costas)',
          'Puxe com os cotovelos, não com as mãos',
          'Aperte as escápulas no topo do movimento',
          'Joelhos levemente flexionados'
        ],
        alternatives: [
          {
            id: 'back-alt-1',
            name: 'Remada Cavalinho',
            sets: 4,
            reps: '10-12',
            weight: 0,
            rest: 120,
            completed: false,
            muscleGroup: 'Costas',
            tips: ['Menos carga na lombar', 'Ótimo para volume'],
            alternatives: []
          },
          {
            id: 'back-alt-2',
            name: 'Remada na Máquina',
            sets: 4,
            reps: '10-12',
            weight: 0,
            rest: 90,
            completed: false,
            muscleGroup: 'Costas',
            tips: ['Mais seguro', 'Foco no músculo'],
            alternatives: []
          }
        ]
      },
      {
        id: 'back-2',
        name: 'Puxada Frontal',
        sets: 4,
        reps: '10-12',
        weight: 0,
        rest: 90,
        completed: false,
        muscleGroup: 'Costas (Largura)',
        tips: [
          'Pegada um pouco mais larga que os ombros',
          'Puxe até a linha do peito, não atrás da nuca',
          'Peito para frente, ombros para trás',
          'Controle na subida (fase excêntrica)'
        ],
        alternatives: [
          {
            id: 'back-alt-3',
            name: 'Barra Fixa',
            sets: 4,
            reps: 'Máximo',
            weight: 0,
            rest: 120,
            completed: false,
            muscleGroup: 'Costas',
            tips: ['Exercício mais completo', 'Usa peso corporal'],
            alternatives: []
          }
        ]
      },
      {
        id: 'back-3',
        name: 'Remada Unilateral com Halter',
        sets: 3,
        reps: '10-12',
        weight: 0,
        rest: 60,
        completed: false,
        muscleGroup: 'Costas',
        tips: [
          'Apoie bem o joelho e mão no banco',
          'Puxe o halter até a linha da cintura',
          'Não gire o tronco',
          'Amplitude completa do movimento'
        ],
        alternatives: []
      }
    ]

    const legExercises: Exercise[] = [
      {
        id: 'leg-1',
        name: 'Agachamento Livre',
        sets: 4,
        reps: '8-12',
        weight: 0,
        rest: 180,
        completed: false,
        muscleGroup: 'Pernas (Quadríceps)',
        tips: [
          'Pés na largura dos ombros, pontas levemente para fora',
          'Desça até coxas paralelas ao chão (ou mais se tiver mobilidade)',
          'Joelhos alinhados com os pés (não deixe entrar)',
          'Core contraído, peito para cima',
          'Olhar para frente, não para baixo'
        ],
        alternatives: [
          {
            id: 'leg-alt-1',
            name: 'Agachamento no Smith',
            sets: 4,
            reps: '10-12',
            weight: 0,
            rest: 120,
            completed: false,
            muscleGroup: 'Pernas',
            tips: ['Mais estabilidade', 'Ideal para iniciantes'],
            alternatives: []
          },
          {
            id: 'leg-alt-2',
            name: 'Leg Press 45°',
            sets: 4,
            reps: '12-15',
            weight: 0,
            rest: 120,
            completed: false,
            muscleGroup: 'Pernas',
            tips: ['Menos carga na lombar', 'Ótimo para volume'],
            alternatives: []
          },
          {
            id: 'leg-alt-3',
            name: 'Agachamento Goblet',
            sets: 4,
            reps: '12-15',
            weight: 0,
            rest: 90,
            completed: false,
            muscleGroup: 'Pernas',
            tips: ['Ótimo para iniciantes', 'Trabalha mobilidade'],
            alternatives: []
          }
        ]
      },
      {
        id: 'leg-2',
        name: 'Leg Press 45°',
        sets: 4,
        reps: '12-15',
        weight: 0,
        rest: 120,
        completed: false,
        muscleGroup: 'Pernas',
        tips: [
          'Pés na largura dos ombros, meio da plataforma',
          'Desça até 90 graus (não deixe lombar sair do banco)',
          'Não trave os joelhos no topo',
          'Empurre pelos calcanhares'
        ],
        alternatives: [
          {
            id: 'leg-alt-4',
            name: 'Hack Machine',
            sets: 4,
            reps: '12-15',
            weight: 0,
            rest: 120,
            completed: false,
            muscleGroup: 'Pernas',
            tips: ['Foco em quadríceps', 'Movimento guiado'],
            alternatives: []
          }
        ]
      },
      {
        id: 'leg-3',
        name: 'Stiff (Levantamento Terra Romeno)',
        sets: 3,
        reps: '10-12',
        weight: 0,
        rest: 120,
        completed: false,
        muscleGroup: 'Posterior (Glúteos e Isquios)',
        tips: [
          'Joelhos levemente flexionados (não travados)',
          'Desça a barra próxima às pernas',
          'Sinta o alongamento nos isquiotibiais',
          'Não arredonde a lombar',
          'Empurre o quadril para frente na subida'
        ],
        alternatives: [
          {
            id: 'leg-alt-5',
            name: 'Mesa Flexora',
            sets: 3,
            reps: '12-15',
            weight: 0,
            rest: 90,
            completed: false,
            muscleGroup: 'Posterior',
            tips: ['Isolamento de isquiotibiais', 'Seguro para lombar'],
            alternatives: []
          }
        ]
      },
      {
        id: 'leg-4',
        name: 'Cadeira Extensora',
        sets: 3,
        reps: '12-15',
        weight: 0,
        rest: 60,
        completed: false,
        muscleGroup: 'Quadríceps',
        tips: [
          'Ajuste o banco para joelhos alinhados com o eixo',
          'Extensão completa (aperte no topo)',
          'Desça controlado',
          'Não use impulso'
        ],
        alternatives: []
      },
      {
        id: 'leg-5',
        name: 'Panturrilha em Pé',
        sets: 4,
        reps: '15-20',
        weight: 0,
        rest: 60,
        completed: false,
        muscleGroup: 'Panturrilha',
        tips: [
          'Amplitude completa (suba o máximo possível)',
          'Pausa de 1 segundo no topo',
          'Desça até sentir alongamento',
          'Não balance'
        ],
        alternatives: []
      }
    ]

    const shoulderExercises: Exercise[] = [
      {
        id: 'shoulder-1',
        name: 'Desenvolvimento com Halteres',
        sets: 4,
        reps: '8-12',
        weight: 0,
        rest: 120,
        completed: false,
        muscleGroup: 'Ombros (Deltoide Anterior e Médio)',
        tips: [
          'Costas retas, core contraído',
          'Não hiperextenda a lombar',
          'Halteres descem até linha das orelhas',
          'Movimento controlado na descida'
        ],
        alternatives: [
          {
            id: 'shoulder-alt-1',
            name: 'Desenvolvimento com Barra',
            sets: 4,
            reps: '8-10',
            weight: 0,
            rest: 120,
            completed: false,
            muscleGroup: 'Ombros',
            tips: ['Mais carga possível', 'Ótimo para força'],
            alternatives: []
          }
        ]
      },
      {
        id: 'shoulder-2',
        name: 'Elevação Lateral',
        sets: 4,
        reps: '12-15',
        weight: 0,
        rest: 60,
        completed: false,
        muscleGroup: 'Ombros (Deltoide Médio)',
        tips: [
          'Cotovelos levemente flexionados',
          'Eleve até altura dos ombros (não mais)',
          'Não balance o corpo',
          'Controle na descida'
        ],
        alternatives: [
          {
            id: 'shoulder-alt-2',
            name: 'Elevação Lateral na Polia',
            sets: 4,
            reps: '12-15',
            weight: 0,
            rest: 60,
            completed: false,
            muscleGroup: 'Ombros',
            tips: ['Tensão constante', 'Ótimo para hipertrofia'],
            alternatives: []
          }
        ]
      },
      {
        id: 'shoulder-3',
        name: 'Elevação Frontal',
        sets: 3,
        reps: '12-15',
        weight: 0,
        rest: 60,
        completed: false,
        muscleGroup: 'Ombros (Deltoide Anterior)',
        tips: [
          'Eleve até altura dos olhos',
          'Não use impulso',
          'Pode alternar os braços',
          'Core estável'
        ],
        alternatives: []
      },
      {
        id: 'shoulder-4',
        name: 'Crucifixo Inverso',
        sets: 3,
        reps: '12-15',
        weight: 0,
        rest: 60,
        completed: false,
        muscleGroup: 'Ombros (Deltoide Posterior)',
        tips: [
          'Incline o tronco a 90 graus',
          'Cotovelos levemente flexionados',
          'Abra os braços até linha dos ombros',
          'Aperte as escápulas'
        ],
        alternatives: [
          {
            id: 'shoulder-alt-3',
            name: 'Crucifixo Inverso na Máquina',
            sets: 3,
            reps: '12-15',
            weight: 0,
            rest: 60,
            completed: false,
            muscleGroup: 'Ombros Posterior',
            tips: ['Mais estável', 'Foco no músculo'],
            alternatives: []
          }
        ]
      }
    ]

    const armExercises: Exercise[] = [
      {
        id: 'arm-1',
        name: 'Rosca Direta com Barra',
        sets: 3,
        reps: '10-12',
        weight: 0,
        rest: 90,
        completed: false,
        muscleGroup: 'Bíceps',
        tips: [
          'Cotovelos fixos ao lado do corpo',
          'Não balance o corpo (sem impulso)',
          'Controle na descida (2-3 segundos)',
          'Aperte no topo'
        ],
        alternatives: [
          {
            id: 'arm-alt-1',
            name: 'Rosca com Halteres',
            sets: 3,
            reps: '10-12',
            weight: 0,
            rest: 90,
            completed: false,
            muscleGroup: 'Bíceps',
            tips: ['Pode alternar ou simultâneo', 'Maior amplitude'],
            alternatives: []
          }
        ]
      },
      {
        id: 'arm-2',
        name: 'Rosca Martelo',
        sets: 3,
        reps: '10-12',
        weight: 0,
        rest: 60,
        completed: false,
        muscleGroup: 'Bíceps e Antebraço',
        tips: [
          'Pegada neutra (palmas frente a frente)',
          'Trabalha braquial e braquiorradial',
          'Cotovelos fixos',
          'Movimento controlado'
        ],
        alternatives: []
      },
      {
        id: 'arm-3',
        name: 'Tríceps na Polia (Barra Reta)',
        sets: 3,
        reps: '12-15',
        weight: 0,
        rest: 60,
        completed: false,
        muscleGroup: 'Tríceps',
        tips: [
          'Cotovelos fixos ao lado do corpo',
          'Extensão completa dos braços',
          'Não deixe cotovelos abrirem',
          'Controle na subida'
        ],
        alternatives: [
          {
            id: 'arm-alt-2',
            name: 'Tríceps Testa (Skull Crusher)',
            sets: 3,
            reps: '10-12',
            weight: 0,
            rest: 90,
            completed: false,
            muscleGroup: 'Tríceps',
            tips: ['Ótimo para massa', 'Cuidado com cotovelos'],
            alternatives: []
          }
        ]
      },
      {
        id: 'arm-4',
        name: 'Tríceps Francês com Halter',
        sets: 3,
        reps: '10-12',
        weight: 0,
        rest: 60,
        completed: false,
        muscleGroup: 'Tríceps (Cabeça Longa)',
        tips: [
          'Cotovelos apontando para cima',
          'Desça o halter atrás da cabeça',
          'Extensão completa',
          'Não deixe cotovelos abrirem'
        ],
        alternatives: []
      }
    ]

    const schedule: DayWorkout[] = [
      {
        day: 'Segunda',
        name: 'Treino A - Peito e Tríceps',
        exercises: [...chestExercises, ...armExercises.filter(e => e.muscleGroup.includes('Tríceps'))],
        isRestDay: false
      },
      {
        day: 'Terça',
        name: 'Treino B - Costas e Bíceps',
        exercises: [...backExercises, ...armExercises.filter(e => e.muscleGroup.includes('Bíceps'))],
        isRestDay: false
      },
      {
        day: 'Quarta',
        name: 'Descanso Ativo',
        exercises: [],
        isRestDay: true
      },
      {
        day: 'Quinta',
        name: 'Treino C - Pernas',
        exercises: legExercises,
        isRestDay: false
      },
      {
        day: 'Sexta',
        name: 'Treino D - Ombros e Abdômen',
        exercises: shoulderExercises,
        isRestDay: false
      },
      {
        day: 'Sábado',
        name: 'Descanso',
        exercises: [],
        isRestDay: true
      },
      {
        day: 'Domingo',
        name: 'Descanso Total',
        exercises: [],
        isRestDay: true
      }
    ]

    return {
      type: 'Full-Body',
      schedule
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

  const generateABCDPlan = (profile: UserProfile): WorkoutPlan => {
    return {
      type: 'ABCD',
      schedule: [
        { day: 'Segunda', name: 'Treino A - Peito', exercises: [], isRestDay: false },
        { day: 'Terça', name: 'Treino B - Costas', exercises: [], isRestDay: false },
        { day: 'Quarta', name: 'Treino C - Pernas', exercises: [], isRestDay: false },
        { day: 'Quinta', name: 'Treino D - Ombros e Braços', exercises: [], isRestDay: false },
        { day: 'Sexta', name: 'Treino A - Peito', exercises: [], isRestDay: false },
        { day: 'Sábado', name: 'Treino B - Costas', exercises: [], isRestDay: false },
        { day: 'Domingo', name: 'Descanso', exercises: [], isRestDay: true }
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
            onUpdateWorkout={(updatedWorkout) => {
              if (workoutPlan) {
                const newSchedule = [...workoutPlan.schedule]
                newSchedule[currentWorkoutDay] = updatedWorkout
                const newPlan = { ...workoutPlan, schedule: newSchedule }
                setWorkoutPlan(newPlan)
                localStorage.setItem('fitpro-plan', JSON.stringify(newPlan))
              }
            }}
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
