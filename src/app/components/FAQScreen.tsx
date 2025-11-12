'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowLeft, HelpCircle } from 'lucide-react'

interface FAQScreenProps {
  onBack: () => void
}

export function FAQScreen({ onBack }: FAQScreenProps) {
  const faqs = [
    {
      category: 'Execução',
      questions: [
        {
          q: 'Quanto tempo devo descansar entre séries?',
          a: 'Para hipertrofia: 60-90 segundos. Para força: 2-5 minutos. Para resistência: 30-60 segundos. O app já indica o tempo ideal para cada exercício.'
        },
        {
          q: 'Como devo respirar durante os exercícios?',
          a: 'Regra geral: expire na fase concêntrica (esforço) e inspire na fase excêntrica (retorno). Exemplo: no supino, expire ao empurrar a barra e inspire ao descer.'
        },
        {
          q: 'Qual a posição correta dos ombros?',
          a: 'Mantenha as escápulas retraídas (ombros para trás) e deprimidas (para baixo) na maioria dos exercícios. Isso protege a articulação e melhora a ativação muscular.'
        }
      ]
    },
    {
      category: 'Hidratação',
      questions: [
        {
          q: 'Quanta água devo beber durante o treino?',
          a: 'Beba 150-250ml a cada 15-20 minutos de treino. Em treinos intensos ou clima quente, aumente para 250-350ml. Mantenha-se sempre hidratado!'
        },
        {
          q: 'Posso beber água gelada durante o treino?',
          a: 'Sim! Água gelada pode até melhorar a performance em treinos intensos, ajudando a regular a temperatura corporal.'
        }
      ]
    },
    {
      category: 'Suplementação',
      questions: [
        {
          q: 'Preciso tomar suplementos?',
          a: 'Não é obrigatório. Uma alimentação balanceada supre a maioria das necessidades. Suplementos são complementos, não substitutos.'
        },
        {
          q: 'Whey Protein é recomendado para mim?',
          a: 'Se seu objetivo é ganho de massa muscular e você tem dificuldade em atingir a meta de proteína diária (1.6-2.2g/kg), whey pode ajudar. Consulte um nutricionista.'
        },
        {
          q: 'Quando devo tomar creatina?',
          a: 'A creatina pode ser tomada a qualquer hora do dia. O importante é a consistência diária (3-5g/dia). Muitos preferem pós-treino junto com carboidratos.'
        },
        {
          q: 'Cafeína ajuda no treino?',
          a: 'Sim! 3-6mg/kg de peso corporal, 30-60 minutos antes do treino, pode melhorar performance e foco. Evite se você é sensível ou treina à noite.'
        }
      ]
    },
    {
      category: 'Recuperação',
      questions: [
        {
          q: 'Quantas horas devo dormir?',
          a: '7-9 horas por noite é ideal para recuperação muscular e hormonal. O sono é quando o corpo se recupera e cresce!'
        },
        {
          q: 'Devo treinar com dor muscular?',
          a: 'Dor muscular leve (DOMS) é normal. Você pode treinar outros grupos musculares. Se a dor for intensa ou articular, descanse e consulte um profissional.'
        }
      ]
    },
    {
      category: 'Progressão',
      questions: [
        {
          q: 'Quando devo aumentar a carga?',
          a: 'Quando conseguir completar todas as séries e repetições com boa forma por 2 treinos consecutivos, aumente 2-5% da carga.'
        },
        {
          q: 'Posso treinar todos os dias?',
          a: 'Não é recomendado. Músculos precisam de 48-72h para recuperação. Siga o plano do app que já inclui dias de descanso estratégicos.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F14] via-[#1a1f2e] to-[#0B0F14] pb-24">
      <div className="bg-[#1a1f2e] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button onClick={onBack} variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Dúvidas Frequentes</h1>
              <p className="text-sm text-gray-400">Tudo que você precisa saber</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {faqs.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="bg-[#1a1f2e] border-gray-700 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">{category.category}</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {category.questions.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${categoryIndex}-${index}`}
                  className="bg-[#0B0F14] border-gray-800 rounded-lg px-4"
                >
                  <AccordionTrigger className="text-white hover:text-orange-500 text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        ))}

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border-orange-500/20 p-6 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Não encontrou sua dúvida?</h3>
          <p className="text-gray-300 mb-4">Entre em contato com nosso suporte especializado</p>
          <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
            Falar com Suporte
          </Button>
        </Card>
      </div>
    </div>
  )
}
