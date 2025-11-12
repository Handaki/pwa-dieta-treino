'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dumbbell, Target, TrendingUp, Award, CheckCircle2, Zap } from 'lucide-react'

interface LandingPageProps {
  onStartQuiz: () => void
}

export function LandingPage({ onStartQuiz }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F14] via-[#1a1f2e] to-[#0B0F14]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
              <Zap className="w-4 h-4" />
              Seu Personal Trainer Digital
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Transforme Seu Corpo
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                Com Inteligência
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Treinos personalizados, acompanhamento em tempo real e suporte completo para iniciantes. 
              Tudo que você precisa para começar sua jornada fitness.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={onStartQuiz}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
              >
                <Dumbbell className="w-5 h-5 mr-2" />
                Começar Agora Grátis
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-orange-500/50 text-white hover:bg-orange-500/10 px-8 py-6 text-lg rounded-xl"
              >
                Ver Como Funciona
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Cancele quando quiser</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Por Que Escolher o FitPro?
          </h2>
          <p className="text-xl text-gray-400">
            Tecnologia de ponta para resultados reais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-[#1a1f2e] to-[#0B0F14] border-orange-500/20 p-8 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Treinos Personalizados</h3>
            <p className="text-gray-400 leading-relaxed">
              Quiz inteligente que entende seu nível, objetivos e limitações para criar o treino perfeito para você.
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1f2e] to-[#0B0F14] border-orange-500/20 p-8 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Acompanhamento Completo</h3>
            <p className="text-gray-400 leading-relaxed">
              Veja sua evolução, gasto calórico, histórico de treinos e receba insights para melhorar continuamente.
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1f2e] to-[#0B0F14] border-orange-500/20 p-8 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <Award className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Suporte Especializado</h3>
            <p className="text-gray-400 leading-relaxed">
              Identificação de dores, dicas de execução, vídeos demonstrativos e orientações para prevenir lesões.
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1f2e] to-[#0B0F14] border-orange-500/20 p-8 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <Dumbbell className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Flexibilidade Total</h3>
            <p className="text-gray-400 leading-relaxed">
              Troque exercícios conforme equipamentos disponíveis, ajuste dias de treino e personalize seu plano.
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1f2e] to-[#0B0F14] border-orange-500/20 p-8 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Sistema de Checklist</h3>
            <p className="text-gray-400 leading-relaxed">
              Marque exercícios completos, acompanhe seu progresso diário e mantenha a motivação em alta.
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1f2e] to-[#0B0F14] border-orange-500/20 p-8 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Motivação Constante</h3>
            <p className="text-gray-400 leading-relaxed">
              Comentários motivacionais, celebração de conquistas e dicas para manter você sempre engajado.
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-gradient-to-r from-orange-500 to-pink-500 p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pronto Para Começar Sua Transformação?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Faça o quiz gratuito agora e descubra o treino ideal para você. 
            Sem compromisso, sem cartão de crédito.
          </p>
          <Button 
            onClick={onStartQuiz}
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Dumbbell className="w-5 h-5 mr-2" />
            Fazer Quiz Gratuito
          </Button>
        </Card>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © 2024 FitPro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
