'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Dumbbell, TrendingUp, Flame, Trophy, ArrowRight } from 'lucide-react'
import { UserProfile, WorkoutPlan, Screen } from '../page'

interface DashboardScreenProps {
  userProfile: UserProfile
  workoutPlan: WorkoutPlan
  onStartWorkout: () => void
  onNavigate: (screen: Screen) => void
}

export function DashboardScreen({ userProfile, workoutPlan, onStartWorkout, onNavigate }: DashboardScreenProps) {
  const today = new Date().getDay()
  const todayWorkout = workoutPlan.schedule[today === 0 ? 6 : today - 1]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F14] via-[#1a1f2e] to-[#0B0F14] pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Olá, {userProfile.name}! 💪
          </h1>
          <p className="text-gray-400">
            Pronto para treinar hoje?
          </p>
        </div>

        {/* Today's Workout */}
        <Card className="bg-gradient-to-br from-orange-500 to-pink-500 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-white/80 text-sm mb-1">Treino de Hoje</div>
              <h2 className="text-2xl font-bold text-white">{todayWorkout.name}</h2>
            </div>
            <Calendar className="w-8 h-8 text-white" />
          </div>
          
          {!todayWorkout.isRestDay ? (
            <>
              <div className="text-white/90 mb-4">
                {todayWorkout.exercises.length} exercícios • {userProfile.sessionTime} minutos
              </div>
              <Button
                onClick={onStartWorkout}
                className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold"
              >
                Iniciar Treino
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          ) : (
            <div className="text-white/90">
              Dia de descanso - Aproveite para recuperar! 🧘‍♂️
            </div>
          )}
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-[#1a1f2e] border-gray-700 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">1,240</div>
                <div className="text-sm text-gray-400">Calorias/semana</div>
              </div>
            </div>
          </Card>

          <Card className="bg-[#1a1f2e] border-gray-700 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-gray-400">Treinos completos</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Weekly Schedule */}
        <Card className="bg-[#1a1f2e] border-gray-700 p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Semana de Treinos</h3>
          <div className="space-y-3">
            {workoutPlan.schedule.map((day, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  day.isRestDay ? 'bg-gray-800/50' : 'bg-orange-500/10 border border-orange-500/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    day.isRestDay ? 'bg-gray-700' : 'bg-orange-500'
                  }`}>
                    {day.isRestDay ? (
                      <Calendar className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Dumbbell className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{day.day}</div>
                    <div className="text-sm text-gray-400">{day.name}</div>
                  </div>
                </div>
                {!day.isRestDay && (
                  <div className="text-sm text-gray-400">
                    {day.exercises.length} exercícios
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Motivational Message */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Continue assim! 🎉</h4>
              <p className="text-gray-300 text-sm">
                Você está mantendo uma ótima consistência. Cada treino te aproxima mais dos seus objetivos!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
