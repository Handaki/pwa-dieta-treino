'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, TrendingUp, Flame, Trophy, Calendar } from 'lucide-react'

interface HistoryScreenProps {
  onBack: () => void
}

export function HistoryScreen({ onBack }: HistoryScreenProps) {
  const weeklyData = [
    { day: 'Seg', completed: true, calories: 320 },
    { day: 'Ter', completed: false, calories: 0 },
    { day: 'Qua', completed: true, calories: 280 },
    { day: 'Qui', completed: true, calories: 340 },
    { day: 'Sex', completed: true, calories: 310 },
    { day: 'Sáb', completed: false, calories: 0 },
    { day: 'Dom', completed: false, calories: 0 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F14] via-[#1a1f2e] to-[#0B0F14] pb-24">
      <div className="bg-[#1a1f2e] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button onClick={onBack} variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-white">Seu Progresso</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-[#1a1f2e] border-gray-700 p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-gray-400">Treinos</div>
          </Card>
          <Card className="bg-[#1a1f2e] border-gray-700 p-4 text-center">
            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">3.8k</div>
            <div className="text-xs text-gray-400">Calorias</div>
          </Card>
          <Card className="bg-[#1a1f2e] border-gray-700 p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">85%</div>
            <div className="text-xs text-gray-400">Consistência</div>
          </Card>
        </div>

        {/* Weekly Progress */}
        <Card className="bg-[#1a1f2e] border-gray-700 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Esta Semana</h3>
          <div className="grid grid-cols-7 gap-2">
            {weeklyData.map((day, index) => (
              <div key={index} className="text-center">
                <div className={`w-full aspect-square rounded-lg mb-2 flex items-center justify-center ${
                  day.completed ? 'bg-green-500' : 'bg-gray-800'
                }`}>
                  {day.completed && <Calendar className="w-4 h-4 text-white" />}
                </div>
                <div className="text-xs text-gray-400">{day.day}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Workouts */}
        <Card className="bg-[#1a1f2e] border-gray-700 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Treinos Recentes</h3>
          <div className="space-y-3">
            {[
              { date: 'Hoje', name: 'Treino A - Peito e Tríceps', duration: '45 min', calories: 320 },
              { date: 'Ontem', name: 'Treino C - Pernas', duration: '60 min', calories: 380 },
              { date: '2 dias atrás', name: 'Treino B - Costas', duration: '50 min', calories: 340 }
            ].map((workout, index) => (
              <div key={index} className="bg-[#0B0F14] p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-white">{workout.name}</div>
                    <div className="text-sm text-gray-400">{workout.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-orange-500">{workout.calories} kcal</div>
                    <div className="text-xs text-gray-400">{workout.duration}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Insights */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 p-6">
          <h3 className="text-lg font-bold text-white mb-3">💡 Insights</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Você está 15% mais consistente que no mês passado!</li>
            <li>• Seu treino favorito é Treino A (Peito e Tríceps)</li>
            <li>• Melhor horário: manhã (9h-11h)</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
