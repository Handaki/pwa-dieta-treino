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
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a1f2e] border-t border-gray-800 z-50">
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
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
