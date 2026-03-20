# 🚀 DevJourney — Do Zero ao Mercado de Trabalho

Plataforma de aprendizado de desenvolvimento web fullstack com trilha estruturada, exercícios com validação real, quiz adaptativo, IA tutora e acompanhamento de progresso gamificado.

## ✨ Funcionalidades

- **18 Fases** de aprendizado — Fundamentos → Design de Sistemas → Segurança Web
- **118 módulos** com teoria, exercícios de código executável e quiz com shuffle
- **Astra** — tutora de IA contextual (Groq + Llama 3.1), gratuita e sem cartão
- **Mini-projetos guiados** com preview ao vivo (HTML/CSS/JS)
- **Checklist de autoavaliação** ao fim de cada fase
- **Sistema de XP e níveis** com 19 badges desbloqueáveis
- **Streak diário** com notificações push configuráveis
- **Busca global** de módulos com acentuação normalizada
- **Flashcards** curados por fase para revisão espaçada
- **Seção de carreira** com Q&A de entrevistas nível júnior e pleno
- **Modo claro/escuro**
- **Testes automatizados** com Vitest + Testing Library

## 🛠 Stack

| Camada | Tecnologia |
|--------|-----------|
| UI | React 18 + Vite 5 |
| Roteamento | React Router v6 |
| Ícones | Lucide React |
| Syntax Highlight | highlight.js |
| IA | Groq API (Llama 3.1) — proxy server-side |
| Testes | Vitest + Testing Library |
| Estado | useState / Context API / localStorage |

## 🚀 Rodando localmente

```bash
# 1. Clone e instale
git clone <url>
cd devjourney_fixed
npm install

# 2. Configure variáveis de ambiente
cp .env.example .env
# Edite .env e adicione sua chave Groq

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

## 🔑 Configuração da IA (Astra)

A tutora Astra usa a API da **Groq**, que é **gratuita** (sem cartão de crédito).

1. Acesse [console.groq.com](https://console.groq.com) e crie uma conta
2. Vá em **API Keys** → **Create API key**
3. Copie a chave e cole no `.env`:

```env
GROQ_API_KEY=gsk_sua_chave_aqui
```

4. Reinicie o servidor com `npm run dev`

> **Segurança:** a chave nunca é exposta no browser. O Vite intercepta as chamadas em `/api/chat` e as repassa para a Groq server-side.

**Limites do free tier:** 30 req/min, 1 milhão de tokens/dia — mais que suficiente para uso educacional.

## 🌐 Deploy (Vercel)

1. Push para GitHub
2. Importe no [vercel.com](https://vercel.com)
3. Em **Settings → Environment Variables**, adicione `GROQ_API_KEY`
4. Deploy automático!

## 🧪 Testes

```bash
npm test              # roda todos os testes
npm run test:watch    # modo watch
npm run test:coverage # cobertura de código
```

## 📁 Estrutura

```
src/
├── components/
│   ├── chat/         # ChatWidget (Astra)
│   ├── editor/       # CodeEditor + StepByStepCode
│   ├── exercise/     # Exercise com diagnóstico de erros
│   ├── layout/       # Sidebar, TopBar, ModuleSearch
│   ├── miniproject/  # MiniProject com preview ao vivo
│   └── roadmap/      # PhaseChecklist
├── contexts/         # AstraContext, ThemeContext
├── data/
│   ├── phases/       # Conteúdo das 18 fases
│   ├── flashcards.js
│   ├── miniprojects.js
│   └── roadmap.js
├── hooks/
│   ├── useProgress.ts
│   └── useStreak.ts
└── pages/            # Dashboard, Roadmap, Lesson, ...
api/
└── chat.js           # Proxy Groq para Vercel
```
