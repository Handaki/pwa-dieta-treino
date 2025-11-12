'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowLeft, Settings as SettingsIcon, Save } from 'lucide-react'
import { UserProfile, WorkoutPlan } from '../page'

interface SettingsScreenProps {
  userProfile: UserProfile
  workoutPlan: WorkoutPlan
  onSave: (profile: UserProfile, plan: WorkoutPlan) => void
  onBack: () => void
}

export function SettingsScreen({ userProfile, workoutPlan, onSave, onBack }: SettingsScreenProps) {
  const [profile, setProfile] = useState<UserProfile>(userProfile)
  const [plan, setPlan] = useState<WorkoutPlan>(workoutPlan)

  const handleSave = () => {
    onSave(profile, plan)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F14] via-[#1a1f2e] to-[#0B0F14] pb-24">
      <div className="bg-[#1a1f2e] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button onClick={onBack} variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Configurações</h1>
              <p className="text-sm text-gray-400">Personalize seu treino</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Training Days */}
        <Card className="bg-[#1a1f2e] border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Dias de Treino</h2>
          </div>

          <div>
            <Label className="text-white mb-3 block">Quantos dias por semana?</Label>
            <RadioGroup
              value={profile.daysPerWeek.toString()}
              onValueChange={(value) => setProfile({ ...profile, daysPerWeek: parseInt(value) })}
              className="grid grid-cols-4 gap-3"
            >
              {[3, 4, 5, 6].map((days) => (
                <div key={days} className="flex items-center justify-center bg-[#0B0F14] p-4 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-colors cursor-pointer">
                  <RadioGroupItem value={days.toString()} id={`settings-days-${days}`} className="sr-only" />
                  <Label htmlFor={`settings-days-${days}`} className="text-white cursor-pointer text-center w-full font-semibold">
                    {days}x
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </Card>

        {/* Training Focus */}
        <Card className="bg-[#1a1f2e] border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Foco do Treino</h2>
          
          <div className="space-y-4">
            <div>
              <Label className="text-white mb-3 block">Objetivo Principal</Label>
              <RadioGroup
                value={profile.goal}
                onValueChange={(value) => setProfile({ ...profile, goal: value as any })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 bg-[#0B0F14] p-4 rounded-lg border border-gray-700">
                  <RadioGroupItem value="muscle-gain" id="settings-muscle-gain" />
                  <Label htmlFor="settings-muscle-gain" className="text-white cursor-pointer flex-1">
                    Ganhar Massa Muscular
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-[#0B0F14] p-4 rounded-lg border border-gray-700">
                  <RadioGroupItem value="weight-loss" id="settings-weight-loss" />
                  <Label htmlFor="settings-weight-loss" className="text-white cursor-pointer flex-1">
                    Perder Peso
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-[#0B0F14] p-4 rounded-lg border border-gray-700">
                  <RadioGroupItem value="strength" id="settings-strength" />
                  <Label htmlFor="settings-strength" className="text-white cursor-pointer flex-1">
                    Ganhar Força
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-[#0B0F14] p-4 rounded-lg border border-gray-700">
                  <RadioGroupItem value="endurance" id="settings-endurance" />
                  <Label htmlFor="settings-endurance" className="text-white cursor-pointer flex-1">
                    Melhorar Resistência
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-white mb-3 block">Tipo de Divisão</Label>
              <RadioGroup
                value={plan.type}
                onValueChange={(value) => setPlan({ ...plan, type: value as any })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 bg-[#0B0F14] p-4 rounded-lg border border-gray-700">
                  <RadioGroupItem value="ABC" id="settings-abc" />
                  <Label htmlFor="settings-abc" className="text-white cursor-pointer flex-1">
                    <div className="font-semibold">ABC</div>
                    <div className="text-sm text-gray-400">Peito/Costas/Pernas</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-[#0B0F14] p-4 rounded-lg border border-gray-700">
                  <RadioGroupItem value="Upper-Lower" id="settings-upper-lower" />
                  <Label htmlFor="settings-upper-lower" className="text-white cursor-pointer flex-1">
                    <div className="font-semibold">Superior/Inferior</div>
                    <div className="text-sm text-gray-400">Membros superiores e inferiores</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-[#0B0F14] p-4 rounded-lg border border-gray-700">
                  <RadioGroupItem value="Full-Body" id="settings-full-body" />
                  <Label htmlFor="settings-full-body" className="text-white cursor-pointer flex-1">
                    <div className="font-semibold">Full Body</div>
                    <div className="text-sm text-gray-400">Corpo inteiro em cada treino</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </Card>

        {/* Session Duration */}
        <Card className="bg-[#1a1f2e] border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Duração da Sessão</h2>
          
          <RadioGroup
            value={profile.sessionTime.toString()}
            onValueChange={(value) => setProfile({ ...profile, sessionTime: parseInt(value) })}
            className="grid grid-cols-3 gap-3"
          >
            {[45, 60, 90].map((time) => (
              <div key={time} className="flex items-center justify-center bg-[#0B0F14] p-4 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-colors cursor-pointer">
                <RadioGroupItem value={time.toString()} id={`settings-time-${time}`} className="sr-only" />
                <Label htmlFor={`settings-time-${time}`} className="text-white cursor-pointer text-center w-full font-semibold">
                  {time} min
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Card>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-6 text-lg"
        >
          <Save className="w-5 h-5 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  )
}
