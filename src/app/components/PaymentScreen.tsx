'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, Crown, Zap } from 'lucide-react'
import { UserProfile } from '../page'

interface PaymentScreenProps {
  userProfile: UserProfile
  onComplete: (plan: string) => void
}

export function PaymentScreen({ userProfile, onComplete }: PaymentScreenProps) {
  const plans = [
    {
      id: 'monthly',
      name: 'Mensal',
      price: 'R$ 49,90',
      period: '/mês',
      features: [
        'Treinos personalizados ilimitados',
        'Acompanhamento de progresso',
        'Troca de exercícios',
        'Dicas de execução',
        'Suporte a dores e lesões',
        'FAQ completo'
      ]
    },
    {
      id: 'quarterly',
      name: 'Trimestral',
      price: 'R$ 39,90',
      period: '/mês',
      popular: true,
      savings: 'Economize 20%',
      features: [
        'Tudo do plano Mensal',
        'Histórico completo de treinos',
        'Análise de gasto calórico',
        'Comentários motivacionais',
        'Sugestões de suplementos',
        'Prioridade no suporte'
      ]
    },
    {
      id: 'yearly',
      name: 'Anual',
      price: 'R$ 29,90',
      period: '/mês',
      savings: 'Economize 40%',
      features: [
        'Tudo do plano Trimestral',
        'Acesso vitalício a atualizações',
        'Planos de treino exclusivos',
        'Consultoria personalizada',
        'Comunidade VIP',
        'Garantia de 30 dias'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F14] via-[#1a1f2e] to-[#0B0F14] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Zap className="w-4 h-4" />
            Parabéns, {userProfile.name}!
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Seu Treino Está Pronto!
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Baseado no seu perfil, criamos um plano de treino {userProfile.daysPerWeek}x por semana 
            focado em {userProfile.goal === 'muscle-gain' ? 'ganho de massa muscular' : 
            userProfile.goal === 'weight-loss' ? 'perda de peso' : 
            userProfile.goal === 'strength' ? 'ganho de força' : 'resistência'}.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative p-8 ${
                plan.popular
                  ? 'bg-gradient-to-br from-orange-500/10 to-pink-500/10 border-orange-500'
                  : 'bg-[#1a1f2e] border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    Mais Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                {plan.savings && (
                  <div className="text-green-500 text-sm font-semibold mb-2">
                    {plan.savings}
                  </div>
                )}
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => onComplete(plan.id)}
                className={`w-full ${
                  plan.popular
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                } text-white`}
              >
                Escolher Plano
              </Button>
            </Card>
          ))}
        </div>

        {/* Guarantee */}
        <Card className="bg-[#1a1f2e] border-gray-700 p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-green-500 mb-2">
            <Check className="w-5 h-5" />
            <span className="font-semibold">Garantia de 30 dias</span>
          </div>
          <p className="text-gray-400 text-sm">
            Não gostou? Devolvemos 100% do seu dinheiro, sem perguntas.
          </p>
        </Card>
      </div>
    </div>
  )
}
