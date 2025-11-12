'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, Play, CheckCircle2, AlertCircle, Info, RefreshCw, Sparkles } from 'lucide-react'
import { DayWorkout, Exercise } from '../page'

interface WorkoutScreenProps {
  workout?: DayWorkout
  onBack: () => void
  onPainReport: () => void
  onUpdateWorkout?: (workout: DayWorkout) => void
}

const motivationalMessages = [
  { range: [0, 20], messages: [
    "Ótimo começo! Cada série te aproxima do seu objetivo! 💪",
    "Você está no caminho certo! Continue assim! 🔥",
    "Primeiro passo dado! Vamos com tudo! 🚀"
  ]},
  { range: [20, 50], messages: [
    "Você está arrasando! Foco total! 💥",
    "Metade do caminho! Não desista agora! 🎯",
    "Seu corpo está agradecendo! Continue! 💪"
  ]},
  { range: [50, 80], messages: [
    "Quase lá! Você é mais forte do que pensa! 🔥",
    "Falta pouco! Termine forte! 💪",
    "Seu futuro eu está orgulhoso! Continue! 🚀"
  ]},
  { range: [80, 99], messages: [
    "Última reta! Você consegue! 🎯",
    "Quase no topo! Não pare agora! 💥",
    "Você está quase lá! Termine com força! 🔥"
  ]}
]

const completionMessages = [
  "Treino Completo! Você é incrível! 🎉",
  "Parabéns! Mais um dia de vitória! 🏆",
  "Missão cumprida! Você está evoluindo! 🚀",
  "Sensacional! Continue assim! 💪",
  "Você arrasou hoje! Orgulhe-se! ⭐"
]

export function WorkoutScreen({ workout, onBack, onPainReport, onUpdateWorkout }: WorkoutScreenProps) {
  const [exercises, setExercises] = useState<Exercise[]>(workout?.exercises || [])
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [showVideoDialog, setShowVideoDialog] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<Exercise | null>(null)
  const [motivationalMessage, setMotivationalMessage] = useState('')

  useEffect(() => {
    if (workout) {
      setExercises(workout.exercises)
    }
  }, [workout])

  useEffect(() => {
    // Update workout when exercises change
    if (workout && onUpdateWorkout) {
      onUpdateWorkout({ ...workout, exercises })
    }
  }, [exercises])

  useEffect(() => {
    // Update motivational message based on progress
    const progress = exercises.length > 0 ? (completedCount / exercises.length) * 100 : 0
    const messageGroup = motivationalMessages.find(m => progress >= m.range[0] && progress < m.range[1])
    if (messageGroup) {
      const randomMessage = messageGroup.messages[Math.floor(Math.random() * messageGroup.messages.length)]
      setMotivationalMessage(randomMessage)
    }
  }, [exercises])

  const toggleComplete = (id: string) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ))
  }

  const completedCount = exercises.filter(ex => ex.completed).length
  const progress = exercises.length > 0 ? (completedCount / exercises.length) * 100 : 0

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

  if (workout.isRestDay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0F14] via-[#1a1f2e] to-[#0B0F14] flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-[#1a1f2e] border-gray-700 p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Dia de Descanso</h2>
          <p className="text-gray-300 mb-6">
            O descanso é tão importante quanto o treino! Seu corpo precisa se recuperar para crescer mais forte.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-400 mb-3">Dicas para o dia de descanso:</h3>
            <ul className="text-left text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Mantenha-se hidratado (2-3 litros de água)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Faça alongamentos leves ou yoga</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Durma bem (7-9 horas)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Mantenha uma alimentação balanceada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Caminhada leve se quiser se movimentar</span>
              </li>
            </ul>
          </div>
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
          >
            Voltar ao Dashboard
          </Button>
        </Card>
      </div>
    )
  }

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
        {progress > 0 && progress < 100 && motivationalMessage && (
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 p-4 mb-6">
            <p className="text-white text-center font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              {motivationalMessage}
            </p>
          </Card>
        )}

        {progress === 100 && (
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20 p-6 mb-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              {completionMessages[Math.floor(Math.random() * completionMessages.length)]}
            </h3>
            <p className="text-gray-300">
              Continue assim e os resultados virão! Seu corpo está mais forte a cada treino.
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
        <DialogContent className="bg-[#1a1f2e] border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Trocar Exercício</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3 mt-4">
            <p className="text-sm text-gray-400 mb-4">
              Selecione um exercício alternativo para substituir <span className="text-orange-500 font-semibold">"{selectedExercise?.name}"</span>
            </p>
            
            {selectedExercise?.alternatives && selectedExercise.alternatives.length > 0 ? (
              selectedExercise.alternatives.map((alt) => (
                <Card
                  key={alt.id}
                  className="bg-[#0B0F14] border-gray-700 p-4 hover:border-orange-500/50 transition-all cursor-pointer group"
                  onClick={() => selectedExercise && replaceExercise(selectedExercise.id, alt)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-2 group-hover:text-orange-500 transition-colors">
                        {alt.name}
                      </h4>
                      <div className="text-sm text-gray-400 mb-2">
                        {alt.sets} séries • {alt.reps} reps • {alt.rest}s descanso
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="text-orange-500 font-semibold">Grupo:</span> {alt.muscleGroup}
                      </div>
                      {alt.tips.length > 0 && (
                        <div className="mt-2 text-xs text-gray-400 bg-blue-500/5 border border-blue-500/10 rounded p-2">
                          💡 {alt.tips[0]}
                        </div>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shrink-0"
                    >
                      Selecionar
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-2">Nenhuma alternativa disponível para este exercício.</p>
                <p className="text-sm text-gray-500">
                  Continue com o exercício atual ou consulte seu instrutor.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="bg-[#1a1f2e] border-gray-700 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{currentVideo?.name}</DialogTitle>
            <p className="text-sm text-gray-400">{currentVideo?.muscleGroup}</p>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {/* Video Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-[#0B0F14] to-[#1a1f2e] rounded-lg flex items-center justify-center border border-gray-700">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-10 h-10 text-white" />
                </div>
                <p className="text-gray-300 font-semibold mb-2">Vídeo demonstrativo em breve</p>
                <p className="text-sm text-gray-500">
                  Por enquanto, siga as dicas de execução abaixo
                </p>
              </div>
            </div>

            {/* Exercise Info */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#0B0F14] p-3 rounded-lg text-center">
                <div className="text-xs text-gray-400 mb-1">Séries</div>
                <div className="text-lg font-bold text-white">{currentVideo?.sets}</div>
              </div>
              <div className="bg-[#0B0F14] p-3 rounded-lg text-center">
                <div className="text-xs text-gray-400 mb-1">Repetições</div>
                <div className="text-lg font-bold text-white">{currentVideo?.reps}</div>
              </div>
              <div className="bg-[#0B0F14] p-3 rounded-lg text-center">
                <div className="text-xs text-gray-400 mb-1">Descanso</div>
                <div className="text-lg font-bold text-white">{currentVideo?.rest}s</div>
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
                      <span className="text-blue-400 mt-1 font-bold">•</span>
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
