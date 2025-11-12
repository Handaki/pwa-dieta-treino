# 🗺️ ROADMAP DE IMPLEMENTAÇÃO - FitPro

Guia passo a passo para implementar todas as correções e melhorias.

---

## FASE 1: CORREÇÕES CRÍTICAS ⏱️ (4 horas)

### Sprint: Semana 1 (Segunda a Quarta)

#### 1.1 - Corrigir TypeScript Config
**Tempo:** 15 min | **Prioridade:** 🔴 CRÍTICO

```powershell
# Editar: tsconfig.json
# Adicionar linha no compilerOptions:
"forceConsistentCasingInFileNames": true
```

**Checklist:**
- [ ] Abrir `tsconfig.json`
- [ ] Adicionar `"forceConsistentCasingInFileNames": true`
- [ ] Executar `npm run build` e verificar se passa
- [ ] Commit: "fix: enable forceConsistentCasingInFileNames in tsconfig"

---

#### 1.2 - Corrigir Layout.tsx (apple-touch-icon)
**Tempo:** 20 min | **Prioridade:** 🔴 CRÍTICO

**Mudanças:**
- Mover `<link rel="apple-touch-icon" href="/icon-192.png" />` do `<body>` para `<head>`
- Adicionar `<meta name="theme-color" content="#F97316" />`
- Adicionar `<meta name="mobile-web-app-capable" content="yes" />`

**Checklist:**
- [ ] Editar `src/app/layout.tsx`
- [ ] Mover tags do body para head
- [ ] Testar em iOS Safari
- [ ] Commit: "fix: move apple-touch-icon to head and add PWA metas"

---

#### 1.3 - Implementar useLocalStorage Hook
**Tempo:** 1 hora | **Prioridade:** 🔴 CRÍTICO

**Arquivo a criar:** `src/hooks/useLocalStorage.ts`

```bash
# Comando para criar:
# (Copiar código de GUIA_IMPLEMENTACAO.md seção 4️⃣)
```

**Checklist:**
- [ ] Criar arquivo `src/hooks/useLocalStorage.ts`
- [ ] Implementar SSR safety check (`typeof window`)
- [ ] Implementar Zod validation
- [ ] Adicionar error handling com try-catch
- [ ] Testar com localStorage.setItem/getItem
- [ ] Commit: "feat: add useLocalStorage hook with SSR safety"

---

#### 1.4 - Criar Schemas Zod
**Tempo:** 1.5 horas | **Prioridade:** 🔴 CRÍTICO

**Arquivo a criar:** `src/lib/schemas.ts`

```bash
# Incluir:
# - ExerciseSchema
# - DayWorkoutSchema
# - WorkoutPlanSchema
# - UserProfileSchema
# - validateJSON helper function
```

**Checklist:**
- [ ] Criar arquivo `src/lib/schemas.ts`
- [ ] Implementar todos os schemas
- [ ] Adicionar tipos inferred com `z.infer`
- [ ] Testar validação com dados inválidos
- [ ] Documentar cada schema
- [ ] Commit: "feat: add Zod schemas for data validation"

---

#### 1.5 - Atualizar page.tsx com SSR Safety
**Tempo:** 45 min | **Prioridade:** 🔴 CRÍTICO

**Mudanças:**
- Substituir `localStorage.getItem()` direto por `useLocalStorage` hook
- Remover `JSON.parse()` sem try-catch
- Adicionar validação com schemas

```typescript
// ❌ Antes
const savedProfile = localStorage.getItem('fitpro-profile')
setUserProfile(JSON.parse(savedProfile))

// ✅ Depois
const {
  value: userProfile,
  setStoredValue: setUserProfile,
  isLoading
} = useLocalStorage<UserProfile | null>(
  'fitpro-profile',
  UserProfileSchema.nullable(),
  null
)
```

**Checklist:**
- [ ] Importar `useLocalStorage` hook
- [ ] Importar schemas
- [ ] Substituir estado localStorage direto
- [ ] Testar carregamento de dados
- [ ] Testar com localStorage vazio
- [ ] Commit: "refactor: use useLocalStorage hook in page.tsx"

---

## FASE 2: MELHORIAS ESSENCIAIS ⏱️ (12 horas)

### Sprint: Semana 2 (Segunda a Sexta)

#### 2.1 - Criar Context API
**Tempo:** 2 horas | **Prioridade:** 🟠 ALTO

**Arquivo a criar:** `src/app/context/FitProContext.tsx`

**Checklist:**
- [ ] Criar arquivo com contexto
- [ ] Implementar Provider com hooks
- [ ] Criar custom hook `useFitPro()`
- [ ] Testar acesso a contexto
- [ ] Documentar uso
- [ ] Commit: "feat: add FitProContext for global state management"

---

#### 2.2 - Atualizar page.tsx com Context
**Tempo:** 1.5 horas | **Prioridade:** 🟠 ALTO

**Mudanças:**
- Envolver app com `<FitProProvider>`
- Usar `useFitPro()` em componentes
- Remover estado local desnecessário

**Checklist:**
- [ ] Refatorar `page.tsx` para usar contexto
- [ ] Testar navegação entre telas
- [ ] Testar persistência de dados
- [ ] Verificar sem memory leaks
- [ ] Commit: "refactor: integrate FitProContext in app"

---

#### 2.3 - Criar Error Boundary
**Tempo:** 1 hora | **Prioridade:** 🟠 ALTO

**Arquivo a criar:** `src/app/components/ErrorBoundary.tsx`

**Checklist:**
- [ ] Criar componente Error Boundary
- [ ] Implementar fallback UI
- [ ] Adicionar logging (console.error)
- [ ] Integrar em `layout.tsx`
- [ ] Testar com componente que quebra
- [ ] Commit: "feat: add ErrorBoundary for error handling"

---

#### 2.4 - Melhorar Acessibilidade (BottomNav)
**Tempo:** 1 hora | **Prioridade:** 🟠 ALTO

**Mudanças em:** `src/app/components/BottomNav.tsx`

```typescript
// Adicionar:
// - aria-label em botões
// - aria-current="page" em link ativo
// - aria-hidden="true" em ícones
// - role="navigation"
```

**Checklist:**
- [ ] Adicionar `aria-label` em botões
- [ ] Adicionar `aria-current` para link ativo
- [ ] Adicionar `aria-hidden` em ícones
- [ ] Adicionar `role="navigation"` na nav
- [ ] Testar com screen reader
- [ ] Commit: "a11y: improve accessibility in BottomNav"

---

#### 2.5 - Adicionar Loading States
**Tempo:** 1 hora | **Prioridade:** 🟠 ALTO

**Mudanças:**
- Usar `isLoading` do hook `useLocalStorage`
- Criar componente `LoadingScreen`
- Mostrar spinner enquanto carrega

**Checklist:**
- [ ] Criar `src/app/components/LoadingScreen.tsx`
- [ ] Mostrar durante carregamento
- [ ] Testar estado de loading
- [ ] Commit: "feat: add loading states for data fetching"

---

#### 2.6 - Integração Completa e Testes
**Tempo:** 4 horas | **Prioridade:** 🟠 ALTO

**Checklist:**
- [ ] Testar em Chrome Desktop
- [ ] Testar em Firefox Desktop
- [ ] Testar em Chrome Mobile (DevTools)
- [ ] Testar em Safari Mobile (se possível)
- [ ] Testar localStorage funciona
- [ ] Testar Error Boundary (forçar erro)
- [ ] Testar acessibilidade com TabIndex
- [ ] Executar `npm run build` com sucesso
- [ ] Verificar bundle size
- [ ] Commit: "test: comprehensive testing of Phase 2"

---

## FASE 3: OTIMIZAÇÕES ⏱️ (20 horas)

### Sprint: Semana 3-4

#### 3.1 - Configurar Lazy Loading
**Tempo:** 2 horas | **Prioridade:** 🟡 MÉDIO

```typescript
// Exemplo:
const DashboardScreen = dynamic(() =>
  import('./components/DashboardScreen').then(mod => ({
    default: mod.DashboardScreen
  })),
  { loading: () => <LoadingScreen /> }
)
```

**Checklist:**
- [ ] Aplicar dynamic import em telas principais
- [ ] Testar se carrega ao navegar
- [ ] Verificar bundle size reduzido
- [ ] Commit: "perf: add dynamic imports for lazy loading"

---

#### 3.2 - Criar Testes Unitários
**Tempo:** 6 horas | **Prioridade:** 🟡 MÉDIO

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**Testes a criar:**
- `useLocalStorage.test.ts` (5 testes)
- `FitProContext.test.tsx` (4 testes)
- `ErrorBoundary.test.tsx` (3 testes)
- `BottomNav.test.tsx` (4 testes)

**Checklist:**
- [ ] Setup Jest config
- [ ] Escrever 16+ testes
- [ ] Coverage > 70%
- [ ] CI integration (opcional)
- [ ] Commit: "test: add unit tests for core components"

---

#### 3.3 - Criar manifest.json
**Tempo:** 1 hora | **Prioridade:** 🟡 MÉDIO

**Arquivo:** `public/manifest.json`

**Checklist:**
- [ ] Criar manifest.json com icons
- [ ] Verificar em DevTools > Application
- [ ] Testar "Instalar app"
- [ ] Commit: "feat: add manifest.json for PWA support"

---

#### 3.4 - Integração Supabase
**Tempo:** 4 horas | **Prioridade:** 🟡 MÉDIO

**Arquivo a criar:** `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

**Checklist:**
- [ ] Configurar variáveis .env
- [ ] Criar cliente Supabase
- [ ] Setup auth (básico)
- [ ] Testar conexão
- [ ] Commit: "feat: setup Supabase client"

---

#### 3.5 - Integração OpenAI
**Tempo:** 4 horas | **Prioridade:** 🟡 MÉDIO

**Arquivo a criar:** `src/lib/openai.ts`

```typescript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateWorkoutPlan(profile: UserProfile) {
  // Implementar lógica
}
```

**Checklist:**
- [ ] Configurar OPENAI_API_KEY
- [ ] Criar função para gerar planos
- [ ] Testar com dados reais
- [ ] Commit: "feat: add OpenAI integration for plan generation"

---

#### 3.6 - Otimização de Performance
**Tempo:** 2 horas | **Prioridade:** 🟡 MÉDIO

**Checklist:**
- [ ] Executar Lighthouse audit
- [ ] Otimizar imagens
- [ ] Implementar code splitting
- [ ] Verificar bundle size
- [ ] Commit: "perf: optimize bundle size and performance"

---

#### 3.7 - Documentação Final
**Tempo:** 1 hora | **Prioridade:** 🟡 MÉDIO**

**Checklist:**
- [ ] Atualizar README.md
- [ ] Documentar env vars
- [ ] Criar contributing.md
- [ ] Adicionar screenshots
- [ ] Commit: "docs: complete project documentation"

---

## 📋 CHECKLIST MASTER

### Pré-Requisitos
- [ ] Repository clonado
- [ ] Node.js 18+ instalado
- [ ] npm/yarn configurado
- [ ] VS Code aberto

### Fase 1 (Semana 1)
- [ ] Task 1.1: tsconfig.json
- [ ] Task 1.2: layout.tsx
- [ ] Task 1.3: useLocalStorage hook
- [ ] Task 1.4: Zod schemas
- [ ] Task 1.5: page.tsx atualizado
- [ ] Build passa sem erros
- [ ] Testes manuais OK

### Fase 2 (Semana 2)
- [ ] Task 2.1: FitProContext
- [ ] Task 2.2: Integração Context
- [ ] Task 2.3: ErrorBoundary
- [ ] Task 2.4: Acessibilidade
- [ ] Task 2.5: Loading states
- [ ] Task 2.6: Testes completos
- [ ] All browsers tested
- [ ] PWA testado

### Fase 3 (Semana 3-4)
- [ ] Task 3.1: Lazy loading
- [ ] Task 3.2: Testes unitários
- [ ] Task 3.3: manifest.json
- [ ] Task 3.4: Supabase
- [ ] Task 3.5: OpenAI
- [ ] Task 3.6: Performance
- [ ] Task 3.7: Docs
- [ ] Production ready ✅

---

## 🚀 COMO EXECUTAR

### Pré-requisitos
```powershell
# Verificar Node
node --version  # v18+

# Instalar deps
npm install

# Verificar erros
npm run lint
npm run build
```

### Fase 1
```powershell
# 1. Fazer edições conforme guia
# 2. Test
npm run build

# 3. Commit
git add .
git commit -m "Phase 1: Critical fixes"

# 4. Verificar erros
npm run lint
```

### Fase 2
```powershell
# 1. Implementar mudanças
# 2. Test
npm run dev
# (Navegar na app, testar funcionalidades)

# 3. Build test
npm run build

# 4. Commit
git add .
git commit -m "Phase 2: Essential improvements"
```

### Fase 3
```powershell
# 1. Implementar otimizações
# 2. Test
npm run dev

# 3. Build & lighthouse
npm run build
npm start  # em outro terminal
# Abrir Chrome DevTools > Lighthouse

# 4. Commit & Deploy
git add .
git commit -m "Phase 3: Optimizations"
git push origin main
```

---

## 📊 MÉTRICAS DE PROGRESSO

### Tracking
```
Semana 1: ██░░░░░░░ 20% (Fase 1)
Semana 2: █████░░░░ 50% (Fase 1 + 2)
Semana 3: █████████░ 90% (Fase 1 + 2 + 3)
Semana 4: ██████████ 100% (Completo)
```

### KPIs
- Build Errors: 3 → 0 ✅
- TypeScript errors: X → 0
- Test coverage: 0% → 70%+
- Lighthouse score: ? → 90+
- Bundle size: ? → <200KB

---

## 🆘 TROUBLESHOOTING

### Build falha com "localStorage is not defined"
```typescript
// Solução: Usar useLocalStorage hook ao invés de acesso direto
if (typeof window !== 'undefined') {
  localStorage.getItem(...)
}
```

### Erro: "Cannot find module @/lib/schemas"
```bash
# Verificar tsconfig.json paths:
"@/*": ["./src/*"]  # Deve estar lá

# Limpar cache
rm -rf .next
npm run build
```

### Error Boundary não mostra erro
```typescript
// Error Boundary só pega erros em render
// Para erros em event handlers, use try-catch normal
button.onClick(() => {
  try {
    handleClick()
  } catch (error) {
    // Mostrar toast/modal
  }
})
```

---

## 📞 REFERÊNCIAS RÁPIDAS

| Tópico | Arquivo | Linha |
|--------|---------|-------|
| Schemas Zod | GUIA_IMPLEMENTACAO.md | Seção 3 |
| useLocalStorage | GUIA_IMPLEMENTACAO.md | Seção 4 |
| Context API | GUIA_IMPLEMENTACAO.md | Seção 5 |
| Error Boundary | GUIA_IMPLEMENTACAO.md | Seção 6 |
| Acessibilidade | GUIA_IMPLEMENTACAO.md | Seção 7 |
| manifest.json | GUIA_IMPLEMENTACAO.md | Seção 8 |

---

## ✅ CONCLUSÃO

Seguindo este roadmap, você terá:

1. ✅ **Semana 1:** Erros críticos corrigidos, app estável
2. ✅ **Semana 2:** State management profissional, erro handling
3. ✅ **Semana 3-4:** Testes completos, PWA otimizado, prod-ready

**Tempo total esperado:** 36 horas (~1 dev + 1 mês)

---

*Última atualização: 12 de Novembro de 2025*
