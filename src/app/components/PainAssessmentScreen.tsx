'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ArrowLeft, AlertTriangle, Heart, Info } from 'lucide-react'

interface PainAssessmentScreenProps {
  onBack: () => void
}

export function PainAssessmentScreen({ onBack }: PainAssessmentScreenProps) {
  const [step, setStep] = useState(1)
  const [painType, setPainType] = useState<'muscle' | 'joint' | null>(null)
  const [painLevel, setPainLevel] = useState<string>('')
  const [painLocation, setPainLocation] = useState<string>('')
  const [assessment, setAssessment] = useState<any>(null)

  const handleAssess = () => {
    // Simulate assessment
    if (painType === 'muscle' && parseInt(painLevel) <= 5) {
      setAssessment({
        type: 'muscle',
        severity: 'low',
        title: 'Dor Muscular Normal (DOMS)',
        description: 'Parece ser uma dor muscular comum após treino intenso.',
        recommendations: [
          'Continue treinando outros grupos musculares',
          'Faça alongamentos leves',
          'Aplique gelo se necessário',
          'Mantenha-se hidratado',
          'Descanse o músculo afetado por 24-48h'
        ],
        canContinue: true
      })
    } else if (painType === 'joint' || parseInt(painLevel) > 5) {
      setAssessment({
        type: 'injury',
        severity: 'high',
        title: 'Possível Lesão - Atenção Necessária',
        description: 'A dor que você descreveu pode indicar uma lesão.',
        recommendations: [
          '⚠️ PARE o treino imediatamente',
          'Aplique gelo na região (15-20 min)',
          'Mantenha o membro elevado',
          'Evite movimentos que causem dor',
          'Consulte um médico ou fisioterapeuta'
        ],
        recoveryPlan: {
          week1: 'Repouso total - sem treinar o grupo afetado',
          week2: 'Movimentos leves sem carga',
          week3: 'Retorno gradual com 50% da carga',
          week4: 'Progressão para 75% da carga'
        },
        canContinue: false
      })
    }
    setStep(3)
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
              <h1 className="text-2xl font-bold text-white">Avaliação de Dor</h1>
              <p className="text-sm text-gray-400">Vamos entender o que está acontecendo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {step === 1 && (
          <div className="space-y-6">
            <Card className="bg-red-500/10 border-red-500/20 p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-2">Importante!</h3>
                  <p className="text-gray-300 text-sm">
                    Se a dor for intensa, aguda ou acompanhada de inchaço significativo, 
                    procure um médico imediatamente. Esta avaliação é apenas orientativa.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-[#1a1f2e] border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Onde você sente dor?</h2>
              <RadioGroup value={painLocation} onValueChange={setPainLocation} className="space-y-3">
                {[
                  'Ombro',
                  'Cotovelo',
                  'Punho',
                  'Lombar',
                  'Joelho',
                  'Tornozelo',
                  'Peito',
                  'Costas',
                  'Pernas',
                  'Outro'
                ].map((location) => (
                  <div 
                    key={location} 
                    className={`flex items-center space-x-3 bg-[#0B0F14] p-4 rounded-lg border cursor-pointer transition-all ${
                      painLocation === location ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setPainLocation(location)}
                  >
                    <RadioGroupItem value={location} id={location} />
                    <Label htmlFor={location} className="text-white cursor-pointer flex-1">
                      {location}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <Button
                onClick={() => setStep(2)}
                disabled={!painLocation}
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:opacity-50"
              >
                Continuar
              </Button>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Card className="bg-[#1a1f2e] border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Tipo de Dor</h2>
              <RadioGroup value={painType || ''} onValueChange={(value) => setPainType(value as any)} className="space-y-3">
                {[
                  { value: 'muscle', title: 'Dor Muscular', desc: 'Sensação de queimação, fadiga muscular' },
                  { value: 'joint', title: 'Dor Articular', desc: 'Dor nas articulações, estalos, limitação de movimento' }
                ].map((option) => (
                  <div 
                    key={option.value}
                    className={`flex items-center space-x-3 bg-[#0B0F14] p-4 rounded-lg border cursor-pointer transition-all ${
                      painType === option.value ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setPainType(option.value as any)}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <div className="flex-1">
                      <div className="font-semibold text-white">{option.title}</div>
                      <div className="text-sm text-gray-400">{option.desc}</div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </Card>

            <Card className="bg-[#1a1f2e] border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Intensidade da Dor (0-10)</h2>
              <div className="grid grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                  <div 
                    key={level} 
                    className={`flex items-center justify-center bg-[#0B0F14] p-4 rounded-lg border cursor-pointer transition-all ${
                      painLevel === level.toString() ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setPainLevel(level.toString())}
                  >
                    <span className="text-white font-semibold">{level}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Leve</span>
                <span>Moderada</span>
                <span>Intensa</span>
              </div>
            </Card>

            <Button
              onClick={handleAssess}
              disabled={!painType || !painLevel}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:opacity-50"
            >
              Avaliar
            </Button>
          </div>
        )}

        {step === 3 && assessment && (
          <div className="space-y-6">
            <Card className={`p-6 ${
              assessment.severity === 'high'
                ? 'bg-red-500/10 border-red-500/20'
                : 'bg-green-500/10 border-green-500/20'
            }`}>
              <div className="flex items-start gap-4 mb-4">
                {assessment.severity === 'high' ? (
                  <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
                ) : (
                  <Heart className="w-8 h-8 text-green-500 flex-shrink-0" />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{assessment.title}</h2>
                  <p className="text-gray-300">{assessment.description}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-[#1a1f2e] border-gray-700 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recomendações</h3>
              <ul className="space-y-3">
                {assessment.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {assessment.recoveryPlan && (
              <Card className="bg-[#1a1f2e] border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Plano de Recuperação</h3>
                <div className="space-y-4">
                  {Object.entries(assessment.recoveryPlan).map(([week, plan]) => (
                    <div key={week} className="bg-[#0B0F14] p-4 rounded-lg">
                      <div className="font-semibold text-orange-500 mb-2">
                        {week === 'week1' && 'Semana 1'}
                        {week === 'week2' && 'Semana 2'}
                        {week === 'week3' && 'Semana 3'}
                        {week === 'week4' && 'Semana 4'}
                      </div>
                      <div className="text-gray-300 text-sm">{plan}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Button
              onClick={onBack}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              Voltar ao Treino
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
