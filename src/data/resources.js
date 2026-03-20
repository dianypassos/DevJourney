// Recursos de estudo por fase — links para documentação, cursos, vídeos e ferramentas
// type: 'doc' | 'course' | 'video' | 'practice' | 'tool' | 'community'
// free: boolean, ptBR: boolean

export const RESOURCES = {

  // ── FASE 1: Fundamentos da Computação ──────────────────────────────────────
  'phase-1': [
    { title: 'CS50 — Introduction to Computer Science (Harvard)', url: 'https://cs50.harvard.edu/x/', type: 'course', free: true, ptBR: false, desc: 'O melhor curso introdutório do mundo. Gratuito, certificado incluído.' },
    { title: 'The Missing Semester of Your CS Education (MIT)', url: 'https://missing.csail.mit.edu/', type: 'course', free: true, ptBR: false, desc: 'O que nenhuma faculdade ensina: terminal, Git, Vim, SSH, scripts.' },
    { title: 'Curso em Vídeo — Algoritmos', url: 'https://www.cursoemvideo.com/curso/curso-de-algoritmo/', type: 'course', free: true, ptBR: true, desc: 'Introdução a lógica e algoritmos em português com o prof. Gustavo Guanabara.' },
    { title: 'Explainshell — entenda qualquer comando', url: 'https://explainshell.com/', type: 'practice', free: true, ptBR: false, desc: 'Cole um comando de terminal e veja o que cada parte faz.' },
    { title: 'MDN — Como a web funciona', url: 'https://developer.mozilla.org/pt-BR/docs/Learn/Getting_started_with_the_web/How_the_Web_works', type: 'doc', free: true, ptBR: true, desc: 'Explicação clara de DNS, HTTP e como um browser carrega uma página.' },
    { title: 'Roadmap.sh — Developer Roadmaps', url: 'https://roadmap.sh/', type: 'doc', free: true, ptBR: false, desc: 'Mapas visuais de trilhas de aprendizado para frontend, backend, fullstack e mais.' },
  ],

  // ── FASE 2: Lógica de Programação com JavaScript ────────────────────────────
  'phase-2': [
    { title: 'JavaScript.info — The Modern JavaScript Tutorial', url: 'https://javascript.info/', type: 'doc', free: true, ptBR: false, desc: 'A melhor documentação de JS com exercícios integrados. Referência absoluta — favorita.' },
    { title: 'Eloquent JavaScript (livro completo gratuito)', url: 'https://eloquentjavascript.net/', type: 'doc', free: true, ptBR: false, desc: 'Livro gratuito online. Profundo, bem escrito, cobre fundamentos e DOM.' },
    { title: 'freeCodeCamp — JavaScript Algorithms & Data Structures', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', type: 'course', free: true, ptBR: false, desc: 'Certificação gratuita com centenas de exercícios interativos.' },
    { title: 'Exercism — JavaScript Track', url: 'https://exercism.org/tracks/javascript', type: 'practice', free: true, ptBR: false, desc: 'Exercícios com mentoria da comunidade. Excelente para fixar conceitos com feedback real.' },
    { title: 'MDN — JavaScript Reference', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference', type: 'doc', free: true, ptBR: true, desc: 'Referência completa de todos os métodos, objetos e operadores do JS.' },
    { title: 'JSRobot — aprenda JS jogando', url: 'https://lab.reaal.me/jsrobot/', type: 'practice', free: true, ptBR: false, desc: 'Jogo onde você escreve JavaScript para controlar um robô. Ótimo para iniciantes.' },
  ],

  // ── FASE 3: Git e GitHub ────────────────────────────────────────────────────
  'phase-3': [
    { title: 'Learn Git Branching (visual interativo)', url: 'https://learngitbranching.js.org/?locale=pt_BR', type: 'practice', free: true, ptBR: true, desc: 'A melhor ferramenta visual para entender branches, merge e rebase. Comece aqui.' },
    { title: 'Pro Git Book (livro oficial gratuito)', url: 'https://git-scm.com/book/pt-br/v2', type: 'doc', free: true, ptBR: true, desc: 'O livro oficial do Git disponível em português. Referência completa.' },
    { title: 'GitHub Skills — cursos interativos oficiais', url: 'https://skills.github.com/', type: 'course', free: true, ptBR: false, desc: 'Cursos interativos que você faz direto no GitHub. Introduction to GitHub é o ponto de partida.' },
    { title: 'Conventional Commits — especificação', url: 'https://www.conventionalcommits.org/pt-br/v1.0.0/', type: 'doc', free: true, ptBR: true, desc: 'O padrão de mensagens de commit usado por times profissionais. Leitura rápida e obrigatória.' },
    { title: 'Oh My Git! — jogo de Git', url: 'https://ohmygit.org/', type: 'practice', free: true, ptBR: false, desc: 'Jogo de código aberto para aprender Git de forma visual. Perfeito para iniciantes.' },
    { title: 'GitLens — extensão VSCode', url: 'https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens', type: 'tool', free: true, ptBR: false, desc: 'A melhor extensão de Git para VSCode: blame inline, histórico visual, comparações entre branches.' },
  ],

  // ── FASE 4: HTML e CSS ──────────────────────────────────────────────────────
  'phase-4': [
    { title: 'CSS Tricks — Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', type: 'doc', free: true, ptBR: false, desc: 'O guia visual definitivo de Flexbox. Deixe salvo nos favoritos.' },
    { title: 'CSS Tricks — Complete Guide to Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', type: 'doc', free: true, ptBR: false, desc: 'O guia visual definitivo de CSS Grid. Referência indispensável.' },
    { title: 'Flexbox Froggy — jogo de Flexbox', url: 'https://flexboxfroggy.com/#pt-br', type: 'practice', free: true, ptBR: true, desc: 'Aprenda Flexbox jogando. 24 níveis do básico ao avançado.' },
    { title: 'Grid Garden — jogo de CSS Grid', url: 'https://cssgridgarden.com/#pt-br', type: 'practice', free: true, ptBR: true, desc: 'Aprenda CSS Grid jogando. 28 níveis com explicações claras.' },
    { title: 'web.dev — Learn CSS (Google)', url: 'https://web.dev/learn/css', type: 'course', free: true, ptBR: false, desc: 'Curso de CSS estruturado pelo Google. Cobre box model, cascade, layout, animações.' },
    { title: 'Can I Use — compatibilidade de CSS/HTML', url: 'https://caniuse.com/', type: 'tool', free: true, ptBR: false, desc: 'Verifique se uma propriedade CSS ou API HTML é suportada nos browsers que você precisa.' },
    { title: 'Coolors — gerador de paletas', url: 'https://coolors.co/', type: 'tool', free: true, ptBR: false, desc: 'Gere e explore paletas de cores para seus projetos. Integra com CSS custom properties.' },
  ],

  // ── FASE 5: JavaScript Avançado ────────────────────────────────────────────
  'phase-5': [
    { title: 'You Don\'t Know JS (série completa gratuita)', url: 'https://github.com/getify/You-Dont-Know-JS', type: 'doc', free: true, ptBR: false, desc: 'A série de livros mais profunda sobre JS. Scope & Closures e this & Object Prototypes são essenciais.' },
    { title: 'Jake Archibald — In The Loop (Event Loop)', url: 'https://www.youtube.com/watch?v=cCOL7MC4Pl0', type: 'video', free: true, ptBR: false, desc: 'A melhor explicação visual do Event Loop já feita. Obrigatório para entender async JS.' },
    { title: 'JavaScript.info — Promises e async/await', url: 'https://javascript.info/async', type: 'doc', free: true, ptBR: false, desc: 'Capítulo completo de async: callbacks, promises, async/await, error handling.' },
    { title: 'javascript30 — 30 projetos em 30 dias', url: 'https://javascript30.com/', type: 'course', free: true, ptBR: false, desc: '30 projetos com JavaScript puro, sem frameworks. Excelente para fixar DOM e eventos.' },
    { title: 'Lydia Hallie — JS Visualized (artigos)', url: 'https://dev.to/lydiahallie', type: 'doc', free: true, ptBR: false, desc: 'Série de artigos com animações lindas explicando prototypes, closures, event loop e generators.' },
    { title: 'TypeScript Error Translator (extensão VSCode)', url: 'https://marketplace.visualstudio.com/items?itemName=mattpocock.ts-error-translator', type: 'tool', free: true, ptBR: false, desc: 'Traduz erros confusos do TypeScript para linguagem humana. Indispensável ao começar TS.' },
  ],

  // ── FASE 6: React ───────────────────────────────────────────────────────────
  'phase-6': [
    { title: 'React — Documentação Oficial (react.dev)', url: 'https://react.dev/', type: 'doc', free: true, ptBR: false, desc: 'A nova documentação oficial com Thinking in React, hooks e exemplos interativos. A melhor fonte.' },
    { title: 'React — Tutorial: Tic-Tac-Toe oficial', url: 'https://react.dev/learn/tutorial-tic-tac-toe', type: 'course', free: true, ptBR: false, desc: 'Tutorial oficial passo a passo. O melhor ponto de partida para quem nunca usou React.' },
    { title: 'useHooks — catálogo de custom hooks', url: 'https://usehooks.com/', type: 'doc', free: true, ptBR: false, desc: 'Coleção de hooks prontos e bem documentados. Ótimo para aprender padrões de hooks.' },
    { title: 'TanStack Query — Documentação', url: 'https://tanstack.com/query/latest/docs/framework/react/overview', type: 'doc', free: true, ptBR: false, desc: 'Documentação oficial do TanStack Query com guias, exemplos e API reference.' },
    { title: 'React DevTools — extensão oficial', url: 'https://react.dev/learn/react-developer-tools', type: 'tool', free: true, ptBR: false, desc: 'Inspecione componentes, estado, props e profile de performance no DevTools do browser.' },
    { title: 'shadcn/ui — Documentação', url: 'https://ui.shadcn.com/', type: 'doc', free: true, ptBR: false, desc: 'Documentação dos componentes shadcn/ui com exemplos de uso, instalação e customização.' },
    { title: 'Reactiflux — comunidade Discord', url: 'https://www.reactiflux.com/', type: 'community', free: true, ptBR: false, desc: 'O maior Discord de React do mundo. Canal #help-desk para tirar dúvidas com a comunidade.' },
  ],

  // ── FASE 7: TypeScript ──────────────────────────────────────────────────────
  'phase-7': [
    { title: 'TypeScript Handbook — documentação oficial', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', type: 'doc', free: true, ptBR: false, desc: 'O guia fundamental. Leia do início ao fim — é curto, denso e suficiente para 90% do uso.' },
    { title: 'Total TypeScript — tutoriais gratuitos', url: 'https://www.totaltypescript.com/tutorials', type: 'course', free: true, ptBR: false, desc: 'Tutoriais interativos de Matt Pocock, o maior especialista de TS. Começa no básico, vai até generics avançados.' },
    { title: 'TypeScript Playground — experimente online', url: 'https://www.typescriptlang.org/play', type: 'practice', free: true, ptBR: false, desc: 'Ambiente online para experimentar TypeScript com type checking em tempo real. Sem instalar nada.' },
    { title: 'Type Challenges — desafios de tipos', url: 'https://github.com/type-challenges/type-challenges', type: 'practice', free: true, ptBR: false, desc: 'Desafios do básico ao insano para fixar generics, utility types e type gymnastics.' },
    { title: 'TypeScript Error Translator (extensão VSCode)', url: 'https://marketplace.visualstudio.com/items?itemName=mattpocock.ts-error-translator', type: 'tool', free: true, ptBR: false, desc: 'Traduz erros confusos do compilador TS para linguagem humana. Reduz frustração por 50%.' },
    { title: 'ts-reset — correções para tipos da stdlib', url: 'https://github.com/total-typescript/ts-reset', type: 'tool', free: true, ptBR: false, desc: 'Biblioteca que corrige comportamentos estranhos dos tipos padrão do TS (como .filter(Boolean)).' },
  ],

  // ── FASE 8 (ID=phase-8): Next.js ───────────────────────────────────────────
  'phase-8': [
    { title: 'Next.js — Documentação Oficial', url: 'https://nextjs.org/docs', type: 'doc', free: true, ptBR: false, desc: 'Documentação oficial com guias de App Router, Server Components, Server Actions e deploy.' },
    { title: 'Next.js — Learn (tutorial oficial interativo)', url: 'https://nextjs.org/learn', type: 'course', free: true, ptBR: false, desc: 'Tutorial oficial passo a passo que constrói um dashboard completo com App Router, banco de dados e auth.' },
    { title: 'Vercel — Documentação', url: 'https://vercel.com/docs', type: 'doc', free: true, ptBR: false, desc: 'Deploy de Next.js em segundos. Leia sobre Edge Functions, ISR e variáveis de ambiente.' },
    { title: 'Neon — PostgreSQL serverless gratuito', url: 'https://neon.tech/', type: 'tool', free: true, ptBR: false, desc: 'Banco PostgreSQL serverless com free tier generoso. Stack padrão com Next.js + Prisma + Vercel.' },
    { title: 'next-intl — i18n para Next.js', url: 'https://next-intl-docs.vercel.app/', type: 'doc', free: true, ptBR: false, desc: 'Documentação da biblioteca de internacionalização mais usada no App Router.' },
    { title: 'NextAuth.js — autenticação para Next.js', url: 'https://next-auth.js.org/getting-started/introduction', type: 'doc', free: true, ptBR: false, desc: 'A solução de autenticação padrão para Next.js: Google, GitHub OAuth, credentials e JWT.' },
  ],

  // ── FASE 9 (ID=phase-9): Backend com Node.js ───────────────────────────────
  'phase-9': [
    { title: 'Node.js — Documentação Oficial', url: 'https://nodejs.org/en/docs/', type: 'doc', free: true, ptBR: false, desc: 'Referência completa das APIs nativas do Node.js: fs, http, stream, process, crypto.' },
    { title: 'Node.js Best Practices (GitHub)', url: 'https://github.com/goldbergyoni/nodebestpractices', type: 'doc', free: true, ptBR: false, desc: 'O maior repositório de boas práticas Node.js com mais de 90k stars. Essencial para produção.' },
    { title: 'Prisma — Documentação', url: 'https://www.prisma.io/docs/', type: 'doc', free: true, ptBR: false, desc: 'Documentação oficial do Prisma ORM: schema, migrations, relations e querying.' },
    { title: 'JWT.io — debugger de tokens', url: 'https://jwt.io/', type: 'practice', free: true, ptBR: false, desc: 'Cole um JWT e veja header, payload e verifique a assinatura online. Ótimo para debugar auth.' },
    { title: 'Railway — deploy de backends Node.js', url: 'https://docs.railway.app/', type: 'doc', free: true, ptBR: false, desc: 'Deploy de APIs Node.js com PostgreSQL, Redis e variáveis de ambiente. Free tier disponível.' },
    { title: 'Bruno — cliente de API (alternativa ao Postman)', url: 'https://www.usebruno.com/', type: 'tool', free: true, ptBR: false, desc: 'Cliente HTTP open-source que salva as collections em arquivos Git. Melhor alternativa ao Postman.' },
    { title: 'Zod — documentação', url: 'https://zod.dev/', type: 'doc', free: true, ptBR: false, desc: 'Documentação da biblioteca de validação de schemas mais usada com TypeScript + Node.js.' },
  ],

  // ── FASE 10 (ID=phase-10): Redes e HTTP ────────────────────────────────────
  'phase-10': [
    { title: 'MDN — HTTP Docs', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP', type: 'doc', free: true, ptBR: true, desc: 'Referência completa de HTTP: métodos, headers, status codes, CORS, cookies, cache.' },
    { title: 'HTTP/3 explicado (Daniel Stenberg)', url: 'https://http3-explained.haxx.se/', type: 'doc', free: true, ptBR: false, desc: 'O livro definitivo sobre HTTP/3 e QUIC, pelo criador do curl. Gratuito online.' },
    { title: 'web.dev — Performance e Core Web Vitals', url: 'https://web.dev/learn/performance/', type: 'course', free: true, ptBR: false, desc: 'Guias do Google sobre performance web: LCP, CLS, INP, cache, compressão e HTTP/2.' },
    { title: 'SSL Labs — teste seu servidor HTTPS', url: 'https://www.ssllabs.com/ssltest/', type: 'practice', free: true, ptBR: false, desc: 'Analisa a configuração TLS do seu domínio e dá nota A+ a F com problemas detalhados.' },
    { title: 'HTTP Toolkit — inspecionar requests', url: 'https://httptoolkit.com/', type: 'tool', free: true, ptBR: false, desc: 'Intercepta e inspeciona todas as requests HTTP do sistema. Como Wireshark para HTTP.' },
    { title: 'curl — documentação completa', url: 'https://curl.se/docs/', type: 'doc', free: true, ptBR: false, desc: 'A ferramenta CLI mais poderosa para testar APIs. Aprenda -X, -H, -d, -v, --cert.' },
  ],

  // ── FASE 11 (ID=phase-11): Segurança Web ───────────────────────────────────
  'phase-11': [
    { title: 'OWASP Top 10 — documentação oficial', url: 'https://owasp.org/www-project-top-ten/', type: 'doc', free: true, ptBR: false, desc: 'Os 10 riscos mais críticos em aplicações web. Leitura obrigatória para qualquer dev.' },
    { title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', type: 'course', free: true, ptBR: false, desc: 'O melhor curso gratuito de segurança web. Labs interativos de SQL injection, XSS, CSRF e mais. Dos criadores do Burp Suite.' },
    { title: 'HackTheBox — prática de segurança', url: 'https://www.hackthebox.com/', type: 'practice', free: true, ptBR: false, desc: 'Plataforma gamificada para praticar ethical hacking em ambientes controlados.' },
    { title: 'OWASP Cheat Sheet Series', url: 'https://cheatsheetseries.owasp.org/', type: 'doc', free: true, ptBR: false, desc: 'Cheat sheets de implementação segura para autenticação, JWT, SQL, XSS e dezenas de outros tópicos.' },
    { title: 'Have I Been Pwned — checar vazamentos', url: 'https://haveibeenpwned.com/', type: 'tool', free: true, ptBR: false, desc: 'Verifique se um email ou senha apareceu em vazamentos de dados. API disponível para integrar em projetos.' },
    { title: 'Snyk — análise de vulnerabilidades', url: 'https://snyk.io/', type: 'tool', free: true, ptBR: false, desc: 'Detecta vulnerabilidades nas dependências npm do seu projeto. Free tier generoso. Integra com GitHub.' },
  ],

  // ── FASE 12 (ID=phase-12): Banco de Dados com Profundidade ─────────────────
  'phase-12': [
    { title: 'PostgreSQL — Documentação Oficial', url: 'https://www.postgresql.org/docs/', type: 'doc', free: true, ptBR: false, desc: 'Documentação mais completa de qualquer banco de dados. Leia: índices, EXPLAIN, transações.' },
    { title: 'Use The Index, Luke! — guia de índices', url: 'https://use-the-index-luke.com/', type: 'doc', free: true, ptBR: false, desc: 'O guia definitivo sobre índices de banco de dados. Explica B-Trees e query planning com clareza cirúrgica.' },
    { title: 'Neon — PostgreSQL serverless para praticar', url: 'https://neon.tech/', type: 'practice', free: true, ptBR: false, desc: 'PostgreSQL serverless com free tier. Perfeito para praticar SQL avançado sem instalar nada.' },
    { title: 'DB Fiddle — SQL no browser', url: 'https://www.db-fiddle.com/', type: 'practice', free: true, ptBR: false, desc: 'Teste queries SQL no browser com PostgreSQL, MySQL ou SQLite. Compartilhe queries com URL.' },
    { title: 'Redis — documentação oficial', url: 'https://redis.io/docs/', type: 'doc', free: true, ptBR: false, desc: 'Documentação oficial do Redis com tutoriais por caso de uso: cache, sessões, filas, pub/sub.' },
    { title: 'Prisma — Documentação de migrations', url: 'https://www.prisma.io/docs/orm/prisma-migrate', type: 'doc', free: true, ptBR: false, desc: 'Guia de migrations do Prisma: criar, aplicar, reverter e customizar migrations em produção.' },
  ],

  // ── FASE 13 (ID=phase-13): Fullstack e Deploy ──────────────────────────────
  'phase-13': [
    { title: 'The Twelve-Factor App', url: 'https://12factor.net/pt_br/', type: 'doc', free: true, ptBR: true, desc: 'Metodologia para construir apps modernas, escaláveis e de fácil manutenção. Leitura obrigatória.' },
    { title: 'GitHub Actions — Documentação', url: 'https://docs.github.com/pt/actions', type: 'doc', free: true, ptBR: true, desc: 'CI/CD nativo do GitHub. Gratuito para repositórios públicos. Guias de deploy para Vercel, Railway e AWS.' },
    { title: 'Vercel — Documentação', url: 'https://vercel.com/docs', type: 'doc', free: true, ptBR: false, desc: 'Deploy de projetos Next.js e React em segundos. Leia sobre Preview Deployments e Environment Variables.' },
    { title: 'Railway — Getting Started', url: 'https://docs.railway.app/', type: 'doc', free: true, ptBR: false, desc: 'Deploy de backends Node.js com banco de dados provisionado em minutos.' },
    { title: 'Sentry — monitoramento de erros', url: 'https://docs.sentry.io/platforms/javascript/', type: 'doc', free: true, ptBR: false, desc: 'Documentação do Sentry para capturar erros em produção com stack trace e contexto completo.' },
    { title: 'Zustand — documentação', url: 'https://docs.pmnd.rs/zustand/getting-started/introduction', type: 'doc', free: true, ptBR: false, desc: 'Documentação do Zustand: setup, slices, persistência e integração com DevTools.' },
  ],

  // ── FASE 14 (ID=phase-14): Engenharia de Software ──────────────────────────
  'phase-14': [
    { title: 'Refactoring.guru — Padrões de Projeto', url: 'https://refactoring.guru/pt-br/design-patterns', type: 'doc', free: true, ptBR: true, desc: 'Catálogo visual de design patterns com exemplos em código. SOLID, Factory, Observer, Strategy e mais.' },
    { title: 'Vitest — Documentação Oficial', url: 'https://vitest.dev/guide/', type: 'doc', free: true, ptBR: false, desc: 'Documentação oficial do Vitest: setup, mocking, coverage e integração com Testing Library.' },
    { title: 'Testing Library — Documentação', url: 'https://testing-library.com/docs/react-testing-library/intro/', type: 'doc', free: true, ptBR: false, desc: 'A biblioteca padrão para testar componentes React. Guia de queries, eventos e async.' },
    { title: 'Kent C. Dodds — Testing JavaScript', url: 'https://testingjavascript.com/', type: 'course', free: false, ptBR: false, desc: 'O curso mais completo sobre testes em JavaScript e React. Do criador do Testing Library.' },
    { title: 'MSW — Mock Service Worker docs', url: 'https://mswjs.io/docs/', type: 'doc', free: true, ptBR: false, desc: 'Documentação oficial do MSW para interceptar requests em testes e desenvolvimento.' },
    { title: 'Clean Code (Robert C. Martin)', url: 'https://www.amazon.com.br/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882', type: 'doc', free: false, ptBR: false, desc: 'O livro clássico sobre código limpo. Capítulos de naming, funções e comentários são obrigatórios.' },
  ],

  // ── FASE 15 (ID=phase-15): Docker e Containers ─────────────────────────────
  'phase-15': [
    { title: 'Docker — Documentação Oficial', url: 'https://docs.docker.com/', type: 'doc', free: true, ptBR: false, desc: 'Documentação completa: Dockerfile reference, Docker Compose, networking e volumes.' },
    { title: 'Play with Docker — laboratório online', url: 'https://labs.play-with-docker.com/', type: 'practice', free: true, ptBR: false, desc: 'Terminal Docker no browser sem instalar nada. 4 horas de ambiente gratuito por sessão.' },
    { title: 'Docker — Getting Started (tutorial oficial)', url: 'https://docs.docker.com/get-started/', type: 'course', free: true, ptBR: false, desc: 'Tutorial oficial do zero: container, image, compose, deploy. Bem estruturado e prático.' },
    { title: 'awesome-compose — exemplos oficiais', url: 'https://github.com/docker/awesome-compose', type: 'doc', free: true, ptBR: false, desc: 'Exemplos de docker-compose para dezenas de stacks: React+Node, Next.js+PostgreSQL, Django+Redis.' },
    { title: 'Dive — inspecionar camadas de imagem', url: 'https://github.com/wagoodman/dive', type: 'tool', free: true, ptBR: false, desc: 'CLI para visualizar cada camada de uma imagem Docker e identificar o que está aumentando o tamanho.' },
    { title: 'Composerize — converter docker run para compose', url: 'https://www.composerize.com/', type: 'tool', free: true, ptBR: false, desc: 'Cole um comando docker run e receba o equivalente em docker-compose.yml. Economiza tempo.' },
  ],

  // ── FASE 16 (ID=phase-16): Design de Sistemas ──────────────────────────────
  'phase-16': [
    { title: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer', type: 'doc', free: true, ptBR: false, desc: 'O repositório mais completo sobre system design com +250k stars. Cobre todos os componentes com diagramas.' },
    { title: 'ByteByteGo — newsletter e vídeos', url: 'https://bytebytego.com/', type: 'course', free: false, ptBR: false, desc: 'O melhor conteúdo visual sobre system design. Newsletter gratuita com um vídeo por semana.' },
    { title: 'Martin Fowler — Architecture Patterns', url: 'https://martinfowler.com/architecture/', type: 'doc', free: true, ptBR: false, desc: 'Artigos aprofundados sobre microsserviços, CQRS, event sourcing, strangler fig e mais.' },
    { title: 'High Scalability Blog', url: 'http://highscalability.com/', type: 'doc', free: true, ptBR: false, desc: 'Como Twitter, Netflix, Amazon e Discord construíram seus sistemas reais. Casos de uso concretos.' },
    { title: 'Excalidraw — diagramas de arquitetura', url: 'https://excalidraw.com/', type: 'tool', free: true, ptBR: false, desc: 'Ferramenta gratuita para desenhar diagramas de arquitetura rapidamente. Padrão em entrevistas de system design.' },
    { title: 'Designing Data-Intensive Applications (Kleppmann)', url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/', type: 'doc', free: false, ptBR: false, desc: 'O livro definitivo sobre sistemas distribuídos. Obrigatório para sênior. Leia os capítulos de replicação e consistência.' },
  ],

  // ── FASE 17 (ID=phase-17): Algoritmos e Estruturas de Dados ────────────────
  'phase-17': [
    { title: 'NeetCode — Roadmap de 150 problemas', url: 'https://neetcode.io/roadmap', type: 'course', free: true, ptBR: false, desc: 'O melhor roteiro curado de problemas LeetCode, organizado por padrão. Com soluções em vídeo explicadas.' },
    { title: 'LeetCode — plataforma de prática', url: 'https://leetcode.com/', type: 'practice', free: true, ptBR: false, desc: 'A plataforma padrão para entrevistas técnicas. Comece pelos Easy com tag Array e Hash Table.' },
    { title: 'Visualgo — visualizador de algoritmos', url: 'https://visualgo.net/pt', type: 'practice', free: true, ptBR: true, desc: 'Visualiza a execução de algoritmos passo a passo. Essencial para entender sorting e árvores.' },
    { title: 'Big-O Cheat Sheet', url: 'https://www.bigocheatsheet.com/', type: 'doc', free: true, ptBR: false, desc: 'Tabela de complexidade de todos os algoritmos e estruturas de dados. Deixe salvo e aberto durante os estudos.' },
    { title: 'The Algorithms — JavaScript (GitHub)', url: 'https://github.com/TheAlgorithms/JavaScript', type: 'doc', free: true, ptBR: false, desc: 'Implementações de referência de todos os algoritmos clássicos em JavaScript. Bom para comparar com as suas.' },
    { title: 'Exercism — JavaScript Track', url: 'https://exercism.org/tracks/javascript', type: 'practice', free: true, ptBR: false, desc: 'Problemas com feedback de mentores. Ótimo complemento ao LeetCode para fixar os padrões.' },
  ],

  // ── FASE 18 (ID=phase-18): Inglês para Devs ────────────────────────────────
  'phase-18': [
    { title: 'Fireship — YouTube (inglês técnico rápido)', url: 'https://www.youtube.com/@Fireship', type: 'video', free: true, ptBR: false, desc: 'Vídeos técnicos de 100 segundos em inglês claro e denso. Ótimos para shadowing e vocabulário.' },
    { title: 'MDN Web Docs — leitura técnica diária', url: 'https://developer.mozilla.org/en-US/', type: 'doc', free: true, ptBR: false, desc: 'Leia uma página de documentação por dia. É a melhor prática de inglês técnico possível.' },
    { title: 'Dev.to — artigos da comunidade', url: 'https://dev.to/', type: 'doc', free: true, ptBR: false, desc: 'Artigos técnicos escritos por devs de todo mundo em inglês acessível. Escreva também — exposição à língua funciona nos dois sentidos.' },
    { title: 'Anki — flashcards de vocabulário', url: 'https://apps.ankiweb.net/', type: 'practice', free: true, ptBR: false, desc: 'Spaced repetition para vocabulário técnico. Busque decks de "programming english" ou "software engineering vocabulary".' },
    { title: 'Duolingo — base de gramática', url: 'https://www.duolingo.com/', type: 'course', free: true, ptBR: true, desc: '10 min por dia para construir base gramatical com consistência. Use como complemento, não como único recurso.' },
    { title: 'Deepl — tradutor de documentação técnica', url: 'https://www.deepl.com/', type: 'tool', free: true, ptBR: false, desc: 'O melhor tradutor para inglês técnico. Use para entender documentação difícil — mas sempre tente ler sem traduzir primeiro.' },
  ],

};

// Helper: pega recursos de uma fase
export function getResources(phaseId) {
  return RESOURCES[phaseId] || [];
}

export const RESOURCE_TYPE_LABELS = {
  doc:       'Documentação',
  course:    'Curso',
  video:     'Vídeo',
  practice:  'Prática',
  tool:      'Ferramenta',
  community: 'Comunidade',
};

export const RESOURCE_TYPE_ICONS = {
  doc:       '📄',
  course:    '🎓',
  video:     '▶️',
  practice:  '🛠️',
  tool:      '⚙️',
  community: '💬',
};
