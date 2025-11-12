'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, ArrowRight, User, Target, Dumbbell, Calendar } from 'lucide-react'
import { UserProfile } from '../page'

interface QuizScreenProps {
  onComplete: (profile: UserProfile) => void
}

export function QuizScreen({ onComplete }: QuizScreenProps) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    equipment: [],
    injuries: [],
    preferences: []
  })

  const totalSteps = 6

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete(profile as UserProfile)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return profile.name && profile.age && profile.gender
      case 2:
        return profile.goal
      case 3:
        return profile.level
      case 4:
        return profile.daysPerWeek && profile.sessionTime
      case 5:
        return profile.equipment && profile.equipment.length > 0
      case 6:
        return true
      default:
        return false
    }
  }

  const toggleEquipment = (equipment: string) => {
    const current = profile.equipment || []
    const newEquipment = current.includes(equipment)
      ? current.filter((e) => e !== equipment)
      : [...current, equipment]
    setProfile({ ...profile, equipment: newEquipment })
  }

  const toggleInjury = (injury: string) => {
    const current = profile.injuries || []
    const newInjuries = current.includes(injury)
      ? current.filter((i) => i !== injury)
      : [...current, injury]
    setProfile({ ...profile, injuries: newInjuries })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F14] via-[#1a1f2e] to-[#0B0F14] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-[#1a1f2e] border-orange-500/20 p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Passo {step} de {totalSteps}</span>
            <span className="text-sm text-orange-500 font-semibold">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Informações Pessoais</h2>
                <p className="text-gray-400">Vamos conhecer você melhor</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={profile.name || ''}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="bg-[#0B0F14] border-gray-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="age" className="text-white">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Sua idade"
                  value={profile.age || ''}
                  onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                  className="bg-[#0B0F14] border-gray-700 text-white"
                />
              </div>

              <div>
                <Label className="text-white mb-3 block">Gênero</Label>
                <RadioGroup
                  value={profile.gender}
                  onValueChange={(value) => setProfile({ ...profile, gender: value as 'male' | 'female' | 'other' })}
                  className="space-y-3"
                >
                  {[
                    { value: 'male', label: 'Masculino' },
                    { value: 'female', label: 'Feminino' },
                    { value: 'other', label: 'Outro' }
                  ].map((option) => (
                    <div 
                      key={option.value}
                      className={`flex items-center space-x-3 bg-[#0B0F14] p-4 rounded-lg border cursor-pointer transition-all ${
                        profile.gender === option.value ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setProfile({ ...profile, gender: option.value as any })}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="text-white flex-1 cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Goal */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Seu Objetivo</h2>
                <p className="text-gray-400">O que você quer alcançar?</p>
              </div>
            </div>

            <RadioGroup
              value={profile.goal}
              onValueChange={(value) => setProfile({ ...profile, goal: value as any })}
              className="space-y-3"
            >
              {[
                { value: 'muscle-gain', title: 'Ganhar Massa Muscular', desc: 'Hipertrofia e definição' },
                { value: 'weight-loss', title: 'Perder Peso', desc: 'Emagrecimento saudável' },
                { value: 'strength', title: 'Ganhar Força', desc: 'Aumentar carga e potência' },
                { value: 'endurance', title: 'Melhorar Resistência', desc: 'Condicionamento físico' }
              ].map((option) => (
                <div 
                  key={option.value}
                  className={`flex items-center space-x-3 bg-[#0B0F14] p-6 rounded-lg border cursor-pointer transition-all ${
                    profile.goal === option.value ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setProfile({ ...profile, goal: option.value as any })}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div className="flex-1">
                    <div className="font-semibold text-white">{option.title}</div>
                    <div className="text-sm text-gray-400">{option.desc}</div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 3: Level */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Nível de Experiência</h2>
                <p className="text-gray-400">Qual sua experiência com treinos?</p>
              </div>
            </div>

            <RadioGroup
              value={profile.level}
              onValueChange={(value) => setProfile({ ...profile, level: value as any })}
              className="space-y-3"
            >
              {[
                { value: 'beginner', title: 'Iniciante', desc: 'Pouca ou nenhuma experiência' },
                { value: 'intermediate', title: 'Intermediário', desc: 'Treino há alguns meses' },
                { value: 'advanced', title: 'Avançado', desc: 'Treino há mais de 1 ano' }
              ].map((option) => (
                <div 
                  key={option.value}
                  className={`flex items-center space-x-3 bg-[#0B0F14] p-6 rounded-lg border cursor-pointer transition-all ${
                    profile.level === option.value ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setProfile({ ...profile, level: option.value as any })}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div className="flex-1">
                    <div className="font-semibold text-white">{option.title}</div>
                    <div className="text-sm text-gray-400">{option.desc}</div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 4: Schedule */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Disponibilidade</h2>
                <p className="text-gray-400">Quanto tempo você tem?</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-white mb-3 block">Dias por semana</Label>
                <div className="grid grid-cols-4 gap-3">
                  {[3, 4, 5, 6].map((days) => (
                    <div
                      key={days}
                      className={`flex items-center justify-center bg-[#0B0F14] p-4 rounded-lg border cursor-pointer transition-all ${
                        profile.daysPerWeek === days ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setProfile({ ...profile, daysPerWeek: days })}
                    >
                      <span className="text-white font-semibold">{days}x</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-white mb-3 block">Tempo por sessão (minutos)</Label>
                <div className="grid grid-cols-3 gap-3">
                  {[45, 60, 90].map((time) => (
                    <div
                      key={time}
                      className={`flex items-center justify-center bg-[#0B0F14] p-4 rounded-lg border cursor-pointer transition-all ${
                        profile.sessionTime === time ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setProfile({ ...profile, sessionTime: time })}
                    >
                      <span className="text-white font-semibold">{time}min</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Equipment */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Equipamentos Disponíveis</h2>
                <p className="text-gray-400">Selecione o que você tem acesso</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                'Halteres',
                'Barras',
                'Máquinas',
                'Cabos e Polias',
                'Banco',
                'Barra Fixa',
                'Paralelas',
                'Kettlebell',
                'Elásticos'
              ].map((equipment) => (
                <div 
                  key={equipment}
                  className={`flex items-center space-x-3 bg-[#0B0F14] p-4 rounded-lg border cursor-pointer transition-all ${
                    profile.equipment?.includes(equipment) ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => toggleEquipment(equipment)}
                >
                  <Checkbox
                    id={equipment}
                    checked={profile.equipment?.includes(equipment)}
                    onCheckedChange={() => toggleEquipment(equipment)}
                  />
                  <Label htmlFor={equipment} className="text-white flex-1 cursor-pointer">{equipment}</Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Injuries & Preferences */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Últimos Detalhes</h2>
                <p className="text-gray-400">Informações importantes</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-white mb-3 block">Lesões ou limitações? (opcional)</Label>
                <div className="space-y-3">
                  {[
                    'Joelho',
                    'Ombro',
                    'Lombar',
                    'Punho',
                    'Cotovelo',
                    'Nenhuma'
                  ].map((injury) => (
                    <div 
                      key={injury}
                      className={`flex items-center space-x-3 bg-[#0B0F14] p-4 rounded-lg border cursor-pointer transition-all ${
                        profile.injuries?.includes(injury) ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => toggleInjury(injury)}
                    >
                      <Checkbox
                        id={injury}
                        checked={profile.injuries?.includes(injury)}
                        onCheckedChange={() => toggleInjury(injury)}
                      />
                      <Label htmlFor={injury} className="text-white flex-1 cursor-pointer">{injury}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 border-gray-700 text-white hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === totalSteps ? 'Finalizar' : 'Próximo'}
            {step < totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  )
}
