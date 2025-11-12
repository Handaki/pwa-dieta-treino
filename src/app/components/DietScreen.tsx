'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Apple, Coffee, Sun, Moon, Droplets, Info } from 'lucide-react'
import { UserProfile } from '../page'

interface DietScreenProps {
  userProfile: UserProfile
  onBack: () => void
}

interface Meal {
  id: string
  name: string
  time: string
  icon: any
  foods: FoodItem[]
  calories: number
  protein: number
  carbs: number
  fats: number
}

interface FoodItem {
  name: string
  amount: string
  calories: number
}

export function DietScreen({ userProfile, onBack }: DietScreenProps) {
  const [selectedDay, setSelectedDay] = useState(0)
  
  // Gerar plano de dieta baseado no objetivo do usuário
  const getDietPlan = (): Meal[] => {
    const isWeightLoss = userProfile.goal === 'weight-loss'
    const isMuscleGain = userProfile.goal === 'muscle-gain'
    
    return [
      {
        id: '1',
        name: 'Café da Manhã',
        time: '07:00 - 08:00',
        icon: Coffee,
        calories: isWeightLoss ? 350 : isMuscleGain ? 500 : 400,
        protein: isWeightLoss ? 25 : isMuscleGain ? 35 : 30,
        carbs: isWeightLoss ? 40 : isMuscleGain ? 60 : 50,
        fats: isWeightLoss ? 10 : isMuscleGain ? 15 : 12,
        foods: [
          { name: 'Ovos mexidos', amount: isWeightLoss ? '2 unidades' : '3 unidades', calories: isWeightLoss ? 140 : 210 },
          { name: 'Pão integral', amount: isWeightLoss ? '1 fatia' : '2 fatias', calories: isWeightLoss ? 70 : 140 },
          { name: 'Abacate', amount: '1/4 unidade', calories: 60 },
          { name: 'Café com leite', amount: '200ml', calories: isWeightLoss ? 80 : 90 }
        ]
      },
      {
        id: '2',
        name: 'Lanche da Manhã',
        time: '10:00 - 10:30',
        icon: Apple,
        calories: isWeightLoss ? 150 : isMuscleGain ? 250 : 200,
        protein: isWeightLoss ? 15 : isMuscleGain ? 25 : 20,
        carbs: isWeightLoss ? 20 : isMuscleGain ? 30 : 25,
        fats: isWeightLoss ? 5 : isMuscleGain ? 8 : 6,
        foods: [
          { name: 'Whey protein', amount: '1 scoop (30g)', calories: 120 },
          { name: 'Banana', amount: '1 unidade', calories: isWeightLoss ? 90 : 105 },
          { name: 'Pasta de amendoim', amount: isWeightLoss ? '1 colher chá' : '1 colher sopa', calories: isWeightLoss ? 30 : 95 }
        ]
      },
      {
        id: '3',
        name: 'Almoço',
        time: '12:00 - 13:00',
        icon: Sun,
        calories: isWeightLoss ? 500 : isMuscleGain ? 700 : 600,
        protein: isWeightLoss ? 40 : isMuscleGain ? 55 : 48,
        carbs: isWeightLoss ? 50 : isMuscleGain ? 80 : 65,
        fats: isWeightLoss ? 15 : isMuscleGain ? 20 : 18,
        foods: [
          { name: 'Peito de frango grelhado', amount: isWeightLoss ? '150g' : '200g', calories: isWeightLoss ? 240 : 320 },
          { name: 'Arroz integral', amount: isWeightLoss ? '3 colheres sopa' : '5 colheres sopa', calories: isWeightLoss ? 120 : 200 },
          { name: 'Feijão', amount: '2 conchas', calories: 140 },
          { name: 'Salada verde', amount: 'à vontade', calories: 30 },
          { name: 'Azeite', amount: '1 colher sopa', calories: isWeightLoss ? 90 : 120 }
        ]
      },
      {
        id: '4',
        name: 'Lanche da Tarde',
        time: '15:30 - 16:00',
        icon: Apple,
        calories: isWeightLoss ? 200 : isMuscleGain ? 300 : 250,
        protein: isWeightLoss ? 20 : isMuscleGain ? 30 : 25,
        carbs: isWeightLoss ? 25 : isMuscleGain ? 35 : 30,
        fats: isWeightLoss ? 8 : isMuscleGain ? 12 : 10,
        foods: [
          { name: 'Iogurte grego natural', amount: '150g', calories: 100 },
          { name: 'Granola', amount: isWeightLoss ? '2 colheres sopa' : '3 colheres sopa', calories: isWeightLoss ? 80 : 120 },
          { name: 'Frutas vermelhas', amount: '1 xícara', calories: 70 }
        ]
      },
      {
        id: '5',
        name: 'Jantar',
        time: '19:00 - 20:00',
        icon: Moon,
        calories: isWeightLoss ? 400 : isMuscleGain ? 600 : 500,
        protein: isWeightLoss ? 35 : isMuscleGain ? 50 : 42,
        carbs: isWeightLoss ? 35 : isMuscleGain ? 60 : 48,
        fats: isWeightLoss ? 12 : isMuscleGain ? 18 : 15,
        foods: [
          { name: 'Salmão grelhado', amount: isWeightLoss ? '120g' : '180g', calories: isWeightLoss ? 240 : 360 },
          { name: 'Batata doce', amount: isWeightLoss ? '100g' : '150g', calories: isWeightLoss ? 90 : 135 },
          { name: 'Brócolis', amount: '1 xícara', calories: 55 },
          { name: 'Salada', amount: 'à vontade', calories: 30 }
        ]
      }
    ]
  }

  const meals = getDietPlan()
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0)
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0)
  const totalFats = meals.reduce((sum, meal) => sum + meal.fats, 0)

  const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F14] via-[#1a1f2e] to-[#0B0F14] pb-24">
      {/* Header */}
      <div className="bg-[#1a1f2e] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">Plano Alimentar</h1>
              <div className="text-sm text-gray-400">
                Personalizado para {userProfile.goal === 'weight-loss' ? 'emagrecimento' : userProfile.goal === 'muscle-gain' ? 'ganho de massa' : 'seu objetivo'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Day Selector */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {weekDays.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  selectedDay === index
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                    : 'bg-[#1a1f2e] text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Summary */}
        <Card className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 border-orange-500/20 p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Resumo Diário</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#0B0F14] p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-500">{totalCalories}</div>
              <div className="text-sm text-gray-400">Calorias</div>
            </div>
            <div className="bg-[#0B0F14] p-4 rounded-lg">
              <div className="text-2xl font-bold text-pink-500">{totalProtein}g</div>
              <div className="text-sm text-gray-400">Proteínas</div>
            </div>
            <div className="bg-[#0B0F14] p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-500">{totalCarbs}g</div>
              <div className="text-sm text-gray-400">Carboidratos</div>
            </div>
            <div className="bg-[#0B0F14] p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-500">{totalFats}g</div>
              <div className="text-sm text-gray-400">Gorduras</div>
            </div>
          </div>
        </Card>

        {/* Hydration Reminder */}
        <Card className="bg-blue-500/10 border-blue-500/20 p-4 mb-6">
          <div className="flex items-center gap-3">
            <Droplets className="w-8 h-8 text-blue-400" />
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-1">Hidratação</h4>
              <p className="text-sm text-gray-300">
                Meta diária: {userProfile.gender === 'male' ? '3-4 litros' : '2-3 litros'} de água
              </p>
            </div>
          </div>
        </Card>

        {/* Meals */}
        <div className="space-y-4">
          {meals.map((meal) => {
            const Icon = meal.icon
            return (
              <Card key={meal.id} className="bg-[#1a1f2e] border-gray-700 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{meal.name}</h3>
                    <div className="text-sm text-gray-400">{meal.time}</div>
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    {meal.calories} kcal
                  </Badge>
                </div>

                {/* Macros */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-[#0B0F14] p-3 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Proteína</div>
                    <div className="text-lg font-bold text-pink-500">{meal.protein}g</div>
                  </div>
                  <div className="bg-[#0B0F14] p-3 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Carboidrato</div>
                    <div className="text-lg font-bold text-blue-500">{meal.carbs}g</div>
                  </div>
                  <div className="bg-[#0B0F14] p-3 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Gordura</div>
                    <div className="text-lg font-bold text-green-500">{meal.fats}g</div>
                  </div>
                </div>

                {/* Foods */}
                <div className="space-y-2">
                  {meal.foods.map((food, index) => (
                    <div key={index} className="flex items-center justify-between bg-[#0B0F14] p-3 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{food.name}</div>
                        <div className="text-sm text-gray-400">{food.amount}</div>
                      </div>
                      <div className="text-sm text-gray-400">{food.calories} kcal</div>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Tips */}
        <Card className="bg-purple-500/10 border-purple-500/20 p-6 mt-6">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white mb-2">Dicas Importantes</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Ajuste as porções de acordo com sua fome e saciedade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Faça refeições a cada 3-4 horas para manter o metabolismo ativo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Priorize alimentos naturais e minimize processados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Consulte um nutricionista para um plano personalizado</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
