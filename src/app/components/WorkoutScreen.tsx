'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, Play, CheckCircle2, AlertCircle, Info, RefreshCw } from 'lucide-react'
import { DayWorkout, Exercise } from '../page'

interface WorkoutScreenProps {
  workout?: DayWorkout
  onBack: () => void
  onPainReport: () => void
}

export function WorkoutScreen({ workout, onBack, onPainReport }: WorkoutScreenProps) {
  const [exercises, setExercises] = useState<Exercise[]>(workout?.exercises || [])
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [showVideoDialog, setShowVideoDialog] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<Exercise | null>(null)

  const toggleComplete = (id: string) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ))
  }

  const completedCount = exercises.filter(ex => ex.completed).length
  const progress = exercises.length > 0 ? (completedCount / exercises.length) * 100 : 0

  const alternativeExercises: Exercise[] = [
    {
      id: 'alt-1',
      name: 'Agachamento no Smith',
      sets: 4,
      reps: '8-12',
      weight: 0,
      rest: 120,
      completed: false,
      muscleGroup: 'Pernas',
      tips: ['Mesma execução, mais estabilidade', 'Ideal para iniciantes'],
      alternatives: []
    },
    {
      id: 'alt-2',
      name: 'Leg Press 45°',
      sets: 4,
      reps: '10-15',
      weight: 0,
      rest: 120,
      completed: false,
      muscleGroup: 'Pernas',
      tips: ['Menos carga na lombar', 'Ótimo para volume'],
      alternatives: []
    },
    {
      id: 'alt-3',
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

  const replaceExercise = (oldId: string, newExercise: Exercise) => {
    setExercises(exercises.map(ex => 
      ex.id === oldId ? { ...newExercise, id: oldId, completed: ex.completed } : ex
    ))
    setShowAlternatives(false)
    setSelectedExercise(null)
  }

  const handleVideoClick = (exercise: Exercise) => {
    setCurrentVideo(exercise)
    setShowVideoDialog(true)
  }

  if (!workout) return null

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
              <h1 className="text-xl font-bold text-white">{workout.name}</h1>
              <div className="text-sm text-gray-400">
                {completedCount} de {exercises.length} exercícios
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Motivational Message */}
        {progress > 0 && progress < 100 && (
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 p-4 mb-6">
            <p className="text-white text-center font-semibold">
              {progress < 30 && "Ótimo começo! Continue assim! 💪"}
              {progress >= 30 && progress < 70 && "Você está arrasando! Falta pouco! 🔥"}
              {progress >= 70 && "Quase lá! Termine forte! 🚀"}
            </p>
          </Card>
        )}

        {progress === 100 && (
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20 p-6 mb-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Treino Completo! 🎉</h3>
            <p className="text-gray-300">
              Parabéns! Você completou todos os exercícios. Continue assim e os resultados virão!
            </p>
          </Card>
        )}

        {/* Exercises */}
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <Card
              key={exercise.id}
              className={`p-6 transition-all ${
                exercise.completed
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-[#1a1f2e] border-gray-700'
              }`}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={exercise.completed}
                  onCheckedChange={() => toggleComplete(exercise.id)}
                  className="mt-1"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Exercício {index + 1}</div>
                      <h3 className="text-xl font-bold text-white">{exercise.name}</h3>
                      <div className="text-sm text-gray-400 mt-1">{exercise.muscleGroup}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedExercise(exercise)
                        setShowAlternatives(true)
                      }}
                      className="text-orange-500 hover:text-orange-400"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Trocar
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-[#0B0F14] p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Séries</div>
                      <div className="text-lg font-bold text-white">{exercise.sets}</div>
                    </div>
                    <div className="bg-[#0B0F14] p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Repetições</div>
                      <div className="text-lg font-bold text-white">{exercise.reps}</div>
                    </div>
                    <div className="bg-[#0B0F14] p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Descanso</div>
                      <div className="text-lg font-bold text-white">{exercise.rest}s</div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-semibold text-blue-400">Dicas de Execução</span>
                    </div>
                    <ul className="space-y-1">
                      {exercise.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Video Button */}
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-white hover:bg-gray-800"
                    onClick={() => handleVideoClick(exercise)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Ver Vídeo Demonstrativo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pain Report Button */}
        <Card className="bg-red-500/10 border-red-500/20 p-4 mt-6">
          <Button
            onClick={onPainReport}
            variant="ghost"
            className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            Sentiu alguma dor? Clique aqui
          </Button>
        </Card>
      </div>

      {/* Alternatives Dialog */}
      <Dialog open={showAlternatives} onOpenChange={setShowAlternatives}>
        <DialogContent className="bg-[#1a1f2e] border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Trocar Exercício</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3 mt-4">
            <p className="text-sm text-gray-400 mb-4">
              Selecione um exercício alternativo para substituir "{selectedExercise?.name}"
            </p>
            
            {alternativeExercises.map((alt) => (
              <Card
                key={alt.id}
                className="bg-[#0B0F14] border-gray-700 p-4 hover:border-orange-500/50 transition-colors cursor-pointer"
                onClick={() => selectedExercise && replaceExercise(selectedExercise.id, alt)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{alt.name}</h4>
                    <div className="text-sm text-gray-400">
                      {alt.sets} séries • {alt.reps} reps • {alt.muscleGroup}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{alt.tips[0]}</div>
                  </div>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    Selecionar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="bg-[#1a1f2e] border-gray-700 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>{currentVideo?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {/* Video Placeholder */}
            <div className="aspect-video bg-[#0B0F14] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Vídeo demonstrativo em breve</p>
                <p className="text-sm text-gray-500 mt-2">
                  Por enquanto, siga as dicas de execução abaixo
                </p>
              </div>
            </div>

            {/* Tips */}
            {currentVideo && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-blue-400">Dicas de Execução</span>
                </div>
                <ul className="space-y-2">
                  {currentVideo.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
