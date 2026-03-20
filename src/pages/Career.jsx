import { useState } from 'react';
import './Career.css';

const SECTIONS = [
  {
    id: 'github',
    icon: '🐙',
    title: 'Construindo seu GitHub',
    color: 'var(--text-1)',
    tips: [
      {
        title: 'Perfil Profissional Completo',
        desc: 'Preencha tudo: foto real, bio focada em tech (máx 160 chars), localização, link do LinkedIn ou portfólio. Crie um README.md no repositório do seu próprio usuário (usuario/usuario) com apresentação, skills e projetos.',
        example: '# Olá, sou Ana Silva 👋\n\nFrontend Developer | React · TypeScript · Node.js\nSão Paulo, BR\n\n## 🚀 Projetos em Destaque\n- [E-commerce](link) — React + Node.js\n- [Dashboard](link) — TypeScript + Charts\n\n📫 ana@email.com'
      },
      {
        title: 'Commits Diários (jardim verde)',
        desc: 'O gráfico de contribuições é a prova visual de consistência. Faça pelo menos 1 commit por dia — pode ser documentação, refatoração, estudo. Recrutadores olham isso.',
        example: null
      },
      {
        title: 'README completo em cada projeto',
        desc: 'Sem README, o recrutador fecha o repositório. Inclua: o que é, print/gif, como instalar e rodar, tecnologias e decisões técnicas.',
        example: '## 🛒 E-commerce Full Stack\n\n![demo](demo.gif)\n\n### Stack\nReact · TypeScript · Node.js · PostgreSQL · JWT\n\n### Rodando localmente\n```bash\ngit clone ...\ncd backend && npm i && npm run dev\ncd frontend && npm i && npm run dev\n```\n\n### Decisões técnicas\n- JWT para auth stateless\n- PostgreSQL + Prisma para type-safe queries'
      },
      {
        title: '6 projetos pinados estrategicamente',
        desc: 'Pinar projetos é gratuito. Escolha: 1 projeto fullstack, 1 frontend complexo, 1 que mostra TypeScript, 1 com testes, e preencha com README impecável.',
        example: null
      }
    ]
  },
  {
    id: 'portfolio',
    icon: '🌐',
    title: 'Portfólio que Converte',
    color: 'var(--accent)',
    tips: [
      {
        title: 'Domínio próprio (vale o investimento)',
        desc: 'seunome.dev ou seunome.com custa ~R$50/ano. Hospede na Vercel (gratuito). A diferença de seunome.vercel.app para seunome.dev é enorme na percepção de profissionalismo.',
        example: null
      },
      {
        title: 'Estrutura obrigatória',
        desc: '5 seções essenciais: Hero (quem você é em 1 frase), Sobre (sua história, o que está buscando), Projetos (3-6 com links e descrição), Skills (tecnologias), Contato (email + LinkedIn + GitHub).',
        example: null
      },
      {
        title: 'Qualidade > Quantidade',
        desc: '3 projetos incríveis > 10 mediocres. Cada projeto precisa de: nome descritivo, o problema que resolve, stack utilizada, link do GitHub e link do deploy/demo. Adicione prints ou GIF.',
        example: null
      },
      {
        title: 'Deploy com Vercel/Netlify',
        desc: 'Todo projeto frontend deve ter um link live. "Veja em produção: https://..." impressiona muito mais que apenas o GitHub. Vercel e Netlify têm plano gratuito.',
        example: null
      }
    ]
  },
  {
    id: 'resume',
    icon: '📄',
    title: 'Currículo Efetivo',
    color: 'var(--orange)',
    tips: [
      {
        title: 'Formato correto para dev',
        desc: '1 página máximo. PDF, não Word. Seções: resumo técnico (2-3 linhas), skills (tecnologias separadas por categoria), projetos (com link e impacto), experiência (se houver), formação.',
        example: null
      },
      {
        title: 'Resumo técnico que chama atenção',
        desc: 'Escreva 2-3 linhas específicas: o que você sabe, o que quer, onde quer trabalhar. Evite clichês ("dinâmico", "proativo"). Seja específico com tecnologias.',
        example: 'Desenvolvedor Frontend com foco em React e TypeScript. Busco posição júnior para contribuir com UIs de alta performance. Experiência em projetos full-stack com Node.js e PostgreSQL.'
      },
      {
        title: 'Descreva projetos com impacto',
        desc: 'Para cada projeto: verbo de ação + tecnologia + resultado. Não descreva o que o projeto faz — descreva o que VOCÊ fez e o resultado.',
        example: 'Sistema de gestão de tarefas com React + TypeScript\n• Reduziu tempo de onboarding de 30min para 5min com UX intuitiva\n• Implementei auth JWT com refresh tokens e proteção de rotas\n• Coberto por 47 testes (Jest + RTL) com 85% de coverage'
      },
      {
        title: 'Ferramentas recomendadas',
        desc: 'Figma ou Canva para design moderno. Evite modelos coloridos demais — clareza é mais importante. Use fonte legível, espaço branco generoso.',
        example: null
      }
    ]
  },
  {
    id: 'interview',
    icon: '🎯',
    title: 'Entrevistas Técnicas',
    color: 'var(--green)',
    tips: [
      {
        title: 'Fases de uma entrevista típica',
        desc: 'A maioria tem 3 etapas: (1) triagem de RH — fit cultural, expectativas; (2) entrevista técnica — conceitos, live coding ou take-home; (3) entrevista com time — projeto, cultura, fit.',
        example: null
      },
      {
        title: 'Pergunta: "Fale sobre você"',
        desc: 'Use a estrutura: passado → presente → futuro. 2-3 minutos. Quem você é, como chegou ao dev, o que construiu, o que está buscando.',
        example: 'Comecei estudando por conta própria há 8 meses. Construí 5 projetos — o mais recente um e-commerce com React e Node.js. Busco uma primeira posição júnior onde posso crescer com um time experiente.'
      },
      {
        title: 'Pergunta: "Maior dificuldade"',
        desc: 'Use a estrutura STAR: Situação, Tarefa, Ação, Resultado. Escolha uma dificuldade real que você RESOLVEU — mostra maturidade e capacidade de aprendizado.',
        example: 'Situação: meu primeiro projeto fullstack tinha problemas de performance no carregamento.\nAção: pesquisei sobre lazy loading, code splitting e memoização.\nResultado: reduzi o bundle em 40% e o LCP de 4.2s para 1.8s.'
      },
      {
        title: 'Perguntas técnicas comuns — React',
        desc: 'Estude: diferença entre state e props, quando usar useCallback/useMemo, o que é o Virtual DOM, como funciona o reconciliation, quando usar Context vs Redux.',
        example: null
      },
      {
        title: 'Desafio técnico (take-home): como se sair bem',
        desc: 'Leia o briefing 3 vezes antes de codar. Entregue funcionando antes de polido. Adicione README com: como rodar, decisões técnicas e o que faria com mais tempo. Testes impressionam mesmo que básicos. Nunca entregue no prazo limite — entregue 1 dia antes.',
        example: '## Decisoes tecnicas\n- TanStack Query em vez de useEffect — cache automatico\n- Zod para validacao de formulario\n\n## Com mais tempo eu adicionaria\n- Testes E2E com Playwright\n- Code splitting por rota',
      },
      {
        title: 'Live coding: pense em voz alta',
        desc: 'O avaliador quer ver seu processo, nao so a solucao. Antes de codar: leia o problema em voz alta, pergunte sobre edge cases, diga sua abordagem. Enquanto coda: explique o que esta fazendo e por que. Se travar: "Estou pensando em X, mas tem a abordagem Y tambem..." — silencio prolongado e o pior sinal.',
        example: null,
      },
    ]
  },
  {
    id: 'linkedin',
    icon: '💼',
    title: 'LinkedIn que Aparece nas Buscas',
    color: '#0077b5',
    tips: [
      { title: 'Headline com palavras-chave', desc: 'Use: "Desenvolvedor Fullstack | React · Node.js · TypeScript | Aberto a oportunidades". Recrutas filtram por tecnologias — coloque as que você quer trabalhar.' },
      { title: 'Foto profissional (obrigatório)', desc: 'Foto informal ou sem foto = -40% de visualizações. Boa iluminação natural, fundo neutro. Use remove.bg para limpar o fundo.' },
      { title: 'About em 3 parágrafos', desc: 'Parágrafo 1: o que você faz e o diferencial. Parágrafo 2: stack com tempo de experiência. Parágrafo 3: o que busca. Termine com email.' },
      { title: 'Projetos como seção "Projetos"', desc: 'Adicione cada projeto com: nome, descrição destacando o problema resolvido, tecnologias usadas, link do deploy e GitHub. Projetos aparecem em buscas.' },
      { title: 'Palavras-chave estratégicas', desc: 'Recrutas buscam: "React developer", "Node.js", "TypeScript", "fullstack". Coloque essas palavras no headline, about e projetos.' },
      { title: 'Poste 1x por semana', desc: 'Perfis ativos aparecem mais em buscas. "Aprendi X hoje" ou "Finalizei o projeto Y — o desafio foi Z". Consistência > qualidade.' },
    ],
  },
  {
    id: 'negociacao',
    icon: '💰',
    title: 'Negociação Salarial',
    color: 'var(--green)',
    tips: [
      { title: 'Pesquise antes de qualquer conversa', desc: 'Fontes BR: Glassdoor, Revelo, Programathor, grupos de Slack de devs. Saber o range do mercado é o maior diferencial numa negociação.' },
      { title: 'Nunca dê o primeiro número', desc: 'Quando perguntarem pretensão, responda: "Qual o range para essa posição?" Quem fala primeiro âncora a negociação. Se forçado, dê o topo do range pesquisado.' },
      { title: 'O script que funciona', desc: '"Baseado na minha pesquisa de mercado, estou buscando entre R$ X e R$ Y. Isso é alcançável?" — abre espaço para negociar sem fechar em número fixo.' },
      { title: 'Negocie o pacote completo', desc: 'Quando o teto salarial está fixo, negocie: VR/VA, plano de saúde com dependentes, Gympass, home office, verba de cursos, equipamento, bônus. Um bom pacote vale R$ 15-25k/ano extras.' },
      { title: 'Para o primeiro emprego', desc: 'O primeiro emprego é sobre experiência na carteira, networking e aprendizado real — não salário. Aceite, entregue muito, e negocie fortemente no segundo.' },
      { title: 'Quando pedir aumento', desc: 'Timing: após entregar projeto relevante ou 6-12 meses. "Entrei fazendo X, hoje faço X, Y, Z. O mercado paga R$ [valor] para esse nível. Quero chegar lá até [data]." Documente entregas antes.' },
    ],
  },
  {
    id: 'vagas',
    icon: '🔍',
    title: 'Onde Procurar Vagas',
    color: 'var(--cyan)',
    tips: [
      {
        title: 'Plataformas principais no Brasil',
        desc: 'LinkedIn Jobs é obrigatório — configure alertas para "desenvolvedor junior React" e "desenvolvedor fullstack". Gupy é usado pela maioria das empresas BR médias e grandes. Trampos.co foca em startups e empresas de tecnologia. Revelo tem foco em tech com processo mais transparente.',
        example: null,
      },
      {
        title: 'Candidatura direta > agregadores',
        desc: 'Muitas vagas boas nunca aparecem em agregadores. Identifique 20-30 empresas onde você quer trabalhar, siga no LinkedIn e monitore a página de Carreiras delas diretamente. Nubank, iFood, Creditas, Hotmart, Totvs, Stefanini e consultorias como Thoughtworks sempre têm vagas junior.',
        example: null,
      },
      {
        title: 'Comunidades e grupos de WhatsApp/Discord',
        desc: 'As melhores vagas circulam em comunidades antes de virar postagem pública. Entre em: Dev BR no Discord, grupos de React Brasil, Node.js Brasil e Vue.js Brasil no Telegram/WhatsApp. Freqüente meetups locais — muitas contratações júnior acontecem por indicação.',
        example: null,
      },
      {
        title: 'É um jogo de números — normalize os "nãos"',
        desc: '50 a 100 candidaturas para 5 a 10 entrevistas para 1 ou 2 ofertas é absolutamente normal para primeira vaga. Silêncio das empresas não é fracasso pessoal — é o processo. Crie uma planilha para rastrear candidaturas: empresa, data, status, próximo passo. Trate como projeto.',
        example: '| Empresa | Data | Status | Próximo passo |\n|---------|------|--------|---------------|\n| Nubank | 15/01 | Triagem enviada | Aguardar 7 dias |\n| iFood | 16/01 | Entrevista RH agendada | 22/01 às 14h |\n| Startup X | 17/01 | Desafio técnico | Entregar em 5 dias |',
      },
      {
        title: 'Vagas remotas internacionais',
        desc: 'Com inglês intermediário e 1+ ano de experiência, vale explorar: Turing, Toptal, Remote.co e Torre. Salários em dólar para devs pleno ficam entre US$3k–8k/mês. O processo é mais rigoroso (teste técnico + entrevista em inglês) mas a diferença salarial compensa o investimento.',
        example: null,
      },
    ],
  }
];

const INTERVIEW_QA = [
  {
    category: 'JavaScript',
    color: '#f5d020',
    questions: [
      { q: 'Qual a diferença entre == e ===?', a: '=== compara valor E tipo (estrito). 5 === "5" é false. == faz coerção de tipo: 5 == "5" é true. Sempre use === para evitar bugs sutis.' },
      { q: 'O que é closure?', a: 'Uma função que "lembra" o escopo onde foi criada, mesmo após esse escopo ser encerrado. Ex: factory functions, módulos, callbacks com estado.' },
      { q: 'O que é o event loop?', a: 'JavaScript é single-threaded. O event loop verifica se a call stack está vazia e move callbacks da task queue (macrotask) ou microtask queue para a stack. Microtasks (Promises) têm prioridade sobre macrotasks (setTimeout).' },
      { q: 'Diferença entre var, let e const', a: 'var: escopo de função, hoisting com undefined. let: escopo de bloco, sem hoisting útil. const: escopo de bloco, não reatribuível (mas o conteúdo de objetos/arrays pode mudar). Use sempre const ou let.' },
      { q: 'O que é hoisting?', a: 'Declarações (var, function) são "movidas" para o topo do escopo pelo mecanismo JavaScript antes da execução. var é hoistada com valor undefined. function declarations são hoistadas completamente.' },
      { q: 'O que são Promises?', a: 'Objeto que representa uma operação assíncrona com 3 estados: pending, fulfilled (resolvida), rejected. Permite encadear com .then()/.catch() ou usar async/await.' },
    ]
  },
  {
    category: 'React',
    color: '#61dafb',
    questions: [
      { q: 'O que é o Virtual DOM?', a: 'Uma cópia leve do DOM real em memória. Quando o estado muda, React cria um novo Virtual DOM, compara com o anterior (diffing/reconciliation) e atualiza apenas as partes que mudaram no DOM real.' },
      { q: 'Quando usar useCallback?', a: 'Para memorizar uma função e evitar que seja recriada a cada render. Importante quando a função é passada como prop para um componente filho memo-izado, evitando re-renders desnecessários.' },
      { q: 'Qual a diferença entre useEffect e useLayoutEffect?', a: 'useEffect executa assincronamente após o browser pintar a tela. useLayoutEffect executa sincronamente após as mutações do DOM mas antes do paint. Use useLayoutEffect apenas para leituras/mutações do DOM que evitam flicker visual.' },
      { q: 'O que é prop drilling e como resolver?', a: 'Passar props por múltiplos níveis de componentes que não as usam. Soluções: Context API (para estado compartilhado médio), Zustand/Redux (app grande), composição de componentes.' },
      { q: 'O que é StrictMode?', a: 'Wrapper de desenvolvimento que ativa verificações extras: detecta side effects não intencionais, avisa sobre APIs deprecadas. Em React 18, renderiza componentes duas vezes em desenvolvimento para detectar bugs.' },
    ]
  },
  {
    category: 'HTML/CSS',
    color: '#f54747',
    questions: [
      { q: 'O que é acessibilidade na web?', a: 'Tornar sites usáveis para pessoas com deficiências (visual, motora, cognitiva). Práticas: HTML semântico, atributos aria, contraste de cores, navegação por teclado, alt em imagens.' },
      { q: 'Qual a diferença entre display flex e grid?', a: 'Flex: layout 1D — controla linha OU coluna. Grid: layout 2D — controla linhas E colunas simultaneamente. Use flex para componentes, grid para o layout macro da página.' },
      { q: 'O que é CSS specificity?', a: 'Hierarquia que determina qual regra CSS vence quando há conflito. Ordem: inline style > #id > .class/[attr]/:pseudo > elemento. Evite !important — é sinal de CSS mal estruturado.' },
      { q: 'O que é responsividade?', a: 'Design que se adapta a diferentes tamanhos de tela. Técnicas: media queries, CSS Grid com auto-fill/minmax, unidades relativas (%, vw, em, rem), mobile-first approach.' },
    ]
  },
  {
    category: 'Web Geral',
    color: '#7c6af7',
    questions: [
      { q: 'O que acontece quando você digita uma URL?', a: '1) DNS lookup (URL → IP). 2) TCP handshake. 3) TLS handshake (HTTPS). 4) Requisição HTTP GET. 5) Servidor responde com HTML. 6) Browser faz parsing, encontra CSS/JS, faz mais requisições. 7) Rendering pipeline: parse → style → layout → paint → composite.' },
      { q: 'O que é REST?', a: 'Estilo de arquitetura para APIs. Princípios: stateless, recursos identificados por URLs, operações via métodos HTTP (GET, POST, PUT/PATCH, DELETE), respostas em formato padronizado (JSON).' },
      { q: 'O que são HTTP status codes?', a: '2xx: sucesso (200 OK, 201 Created). 3xx: redirecionamento. 4xx: erro do cliente (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable). 5xx: erro do servidor (500 Internal Server Error).' },
      { q: 'O que é CORS?', a: 'Cross-Origin Resource Sharing. Mecanismo de segurança do browser que bloqueia requisições de um origin (domínio:porta) para outro. O servidor deve enviar headers Access-Control-Allow-Origin para permitir.' },
      { q: 'SQL vs NoSQL — quando usar cada um?', a: 'SQL (PostgreSQL, MySQL): dados relacionais, ACID, joins complexos, schema fixo. NoSQL (MongoDB, Redis): dados flexíveis/hierárquicos, escala horizontal, schema livre. A maioria das aplicações web vai bem com PostgreSQL.' },
    ]
  },
  {
    category: 'Pleno — JavaScript/TS',
    color: '#7c6af7',
    level: 'pleno',
    questions: [
      { q: 'O que é o Event Loop e como Promises se encaixam nele?', a: 'JS é single-threaded. O Event Loop monitora a Call Stack e as filas de tasks. Quando a stack esvazia, microtasks (Promises, queueMicrotask) têm prioridade sobre macrotasks (setTimeout, setInterval). Por isso Promise.resolve().then() executa antes de setTimeout(() => {}, 0).' },
      { q: 'Qual a diferença entre debounce e throttle?', a: 'Debounce: executa a função só após X ms sem novas chamadas — ideal para busca em campo de texto. Throttle: executa no máximo 1x a cada X ms independente de quantas chamadas chegam — ideal para scroll e resize. Debounce espera parar; throttle garante frequência máxima.' },
      { q: 'O que são Generics em TypeScript e quando usar?', a: 'Permitem criar funções e tipos reutilizáveis que funcionam com múltiplos tipos mantendo type safety. function identity<T>(arg: T): T. Use quando a função opera em tipos diferentes mas a lógica é a mesma — evita duplicação e any. Exemplo clássico: função de fetch tipada.' },
      { q: 'O que é o padrão Singleton e quando é problemático?', a: 'Garante que uma classe tenha só uma instância global. Útil para conexão de banco, config, logger. Problemático porque cria acoplamento global (dificulta testes), estado compartilhado entre testes pode vazar, e viola o princípio de injeção de dependência.' },
      { q: 'Explique o princípio de imutabilidade e por que importa em React.', a: 'Imutabilidade significa nunca modificar objetos/arrays diretamente — sempre criar novos. Em React, o diffing compara referências (===). Se você mutar estado diretamente, a referência não muda e React não detecta a mudança. Use spread operator, map, filter — nunca push/splice direto no estado.' },
      { q: 'O que é tree shaking e como habilitar?', a: 'Eliminação de código morto pelo bundler — remove exports importados mas nunca usados. Requer ES Modules (import/export, não require). Certifique-se que bibliotecas usam ESM e que você importa nomeadamente (import { debounce } from "lodash-es") em vez de import _ from "lodash".' },
    ],
  },
  {
    category: 'Pleno — React/Frontend',
    color: '#61dafb',
    level: 'pleno',
    questions: [
      { q: 'Como você abordaria um componente com muitos re-renders?', a: 'Primeiro: meça com React DevTools Profiler — não otimize no escuro. Causas comuns: (1) objeto/array criado inline no JSX como prop, (2) função recriada a cada render passada como prop, (3) Context causando re-render desnecessário. Soluções: React.memo, useMemo, useCallback, dividir Context, mover estado para baixo.' },
      { q: 'Quando usar TanStack Query em vez de useState + useEffect para fetch?', a: 'TanStack Query resolve o que useState+useEffect não resolve: cache entre componentes, deduplicação de requests, refetch automático, background refresh, pagination, optimistic updates, loading/error states consistentes. Use useState+useEffect só para estado local de UI (modais, forms). Use TanStack Query para qualquer dado do servidor.' },
      { q: 'Como funciona o sistema de cache do TanStack Query?', a: 'Cada query tem uma queryKey. Dados ficam em cache por staleTime (padrão 0 — sempre stale). Quando stale, refetch acontece no próximo uso. gcTime (padrão 5min) controla quanto tempo dados ficam em memória após sem observers. invalidateQueries força refetch. Permite cache compartilhado entre rotas.' },
      { q: 'O que é renderização condicional de Suspense e como usar?', a: 'Suspense permite que componentes "suspendam" enquanto aguardam dados ou código assíncrono. Com React.lazy: carregamento de componentes sob demanda. Com TanStack Query (useSuspenseQuery): data fetching declarativo sem loading states manuais. Coloque ErrorBoundary acima do Suspense para capturar erros.' },
      { q: 'Como você estruturaria estado em uma aplicação React complexa?', a: 'Regra: estado o mais perto possível de quem usa. Hierarquia: (1) useState local — estado de UI de um componente; (2) Context — estado compartilhado por uma árvore específica (tema, auth); (3) Zustand/Jotai — estado global de aplicação; (4) TanStack Query — estado do servidor. Nunca coloque dados do servidor em Redux/Zustand — isso é responsabilidade do TanStack Query.' },
      { q: 'Qual a diferença entre Server Components e Client Components no Next.js?', a: 'Server Components rodam só no servidor: sem useState/useEffect, acesso direto a banco/APIs, não enviam JS ao cliente — menores bundles. Client Components rodam no browser: interatividade, hooks, eventos. Regra: comece com Server Component. Adicione "use client" só quando precisar de interatividade. SC podem importar CC, mas não o contrário.' },
    ],
  },
  {
    category: 'Pleno — Backend/DB',
    color: '#68d391',
    level: 'pleno',
    questions: [
      { q: 'O que é N+1 problem e como resolver?', a: 'Fazer 1 query para buscar N registros e depois N queries adicionais para cada registro. Exemplo: buscar 100 posts e fazer 100 queries para buscar o autor de cada um = 101 queries. Resolver: (1) JOIN na query original; (2) eager loading com Prisma (include: { author: true }); (3) DataLoader para batch e cache.' },
      { q: 'Quando usar índice de banco de dados e quando não usar?', a: 'Use em: colunas de WHERE frequente, colunas de JOIN, colunas de ORDER BY com alta cardinalidade (email, CPF, timestamp). Não use em: colunas com poucos valores distintos (booleano, status com 3 opções), tabelas pequenas (<1000 linhas), colunas raramente consultadas. Índice acelera leitura mas degrada escrita — há custo.' },
      { q: 'Explique transações ACID e quando usar.', a: 'Atomicidade (tudo ou nada), Consistência (dados sempre válidos), Isolamento (transações independentes), Durabilidade (commitado persiste). Use transação quando múltiplas operações devem ser atômicas: transferência bancária (débito + crédito), criar pedido + baixar estoque. Com Prisma: prisma.$transaction([op1, op2]) ou callback interativo.' },
      { q: 'Qual a diferença entre autenticação e autorização?', a: 'Autenticação: verificar quem você é (login, JWT). Autorização: verificar o que você pode fazer (permissões, roles). JWT autentica — o payload pode conter roles para autorizar. Erros comuns: retornar 401 quando deveria ser 403 (autenticado mas sem permissão), guardar token em localStorage (vulnerável a XSS — use cookie httpOnly).' },
      { q: 'O que é rate limiting e como implementar?', a: 'Limitar o número de requests por IP/usuário num período para prevenir abuso e DDoS. Algoritmos: Fixed Window (mais simples), Sliding Window (mais preciso), Token Bucket (permite bursts). Implementação: express-rate-limit para Express, Redis para estado distribuído entre múltiplas instâncias. Retorne 429 Too Many Requests com Retry-After header.' },
      { q: 'Como você faria o deploy de uma API Node.js em produção?', a: 'Stack mínima: Railway ou Render (PaaS simples) para começar. Para mais controle: VPS (DigitalOcean/Linode) com PM2 para process management e Nginx como reverse proxy. CI/CD com GitHub Actions: test → build → deploy automático. Variáveis de ambiente nunca no código. Health check endpoint (/health). Logs estruturados com pino. Monitoramento de erros com Sentry.' },
    ],
  },
  {
    category: 'Pleno — System Design',
    color: '#f97316',
    level: 'pleno',
    questions: [
      { q: 'Como você escalaria uma API que está lenta sob carga?', a: 'Diagnóstico primeiro: APM (Datadog/New Relic) para identificar o gargalo real. Caminhos comuns: (1) query N+1 — resolver no ORM; (2) query sem índice — EXPLAIN ANALYZE + índice; (3) cálculo caro — cache com Redis; (4) CPU bound — horizontal scaling; (5) I/O bound — async, connection pooling. Nunca escale antes de medir.' },
      { q: 'O que é um cache e quais são as estratégias de invalidação?', a: 'Cache armazena resultados custosos para acesso rápido. Estratégias de invalidação: (1) TTL — expira por tempo (simples, pode servir stale); (2) Cache-aside — app gerencia: busca cache, miss busca DB e popula cache; (3) Write-through — atualiza cache ao escrever no DB; (4) Event-driven — invalida por evento de mudança. A invalidação é o problema difícil — prefira TTLs curtos.' },
      { q: 'Explique a diferença entre escalabilidade horizontal e vertical.', a: 'Vertical (scale up): máquina mais poderosa, mais CPU/RAM. Simples mas tem limite físico e single point of failure. Horizontal (scale out): mais instâncias menores atrás de um load balancer. Resiliente e teoricamente ilimitado mas requer stateless (sessão não pode ficar em uma máquina específica — use Redis para sessões).' },
      { q: 'Quando usar uma fila de mensagens em vez de chamada síncrona?', a: 'Use fila quando: (1) o processo pode ser assíncrono (enviar email, processar imagem, gerar relatório); (2) precisa de retry automático em falha; (3) o produtor não precisa esperar o consumidor; (4) o consumidor processa no próprio ritmo. Ferramentas: BullMQ (Redis-based, Node.js), SQS (AWS). Não use para operações que precisam de resposta imediata.' },
      { q: 'O que é um CDN e quando configurar?', a: 'Content Delivery Network: rede de servidores distribuídos geograficamente que servem conteúdo estático do ponto mais próximo do usuário. Configure para: imagens, CSS, JS, fontes — qualquer asset que não muda por usuário. Vercel e Netlify incluem CDN automático. CloudFront (AWS) e Cloudflare para controle avançado. Resultado: latência reduzida em 50-80% para assets.' },
    ],
  }
];

export default function Career() {
  const [activeSection, setActiveSection] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [openQ, setOpenQ] = useState(null);
  const [qaLevel, setQaLevel] = useState('junior');

  return (
    <div className="career-page page-container">
      <div className="career-header">
        <h1>Carreira & Mercado</h1>
        <p className="career-subtitle">
          Tudo que você precisa para sair do estudo e entrar no mercado: GitHub, portfólio, currículo e entrevistas.
        </p>
      </div>

      {/* Main tip sections */}
      <div className="career-sections">
        {SECTIONS.map(section => (
          <div key={section.id} className={'career-section card ' + (activeSection === section.id ? 'active' : '')} style={{ '--section-color': section.color }}>
            <div className="section-header" onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}>
              <div className="section-icon">{section.icon}</div>
              <div className="section-title-group">
                <h3 className="section-title" style={{ color: section.color }}>{section.title}</h3>
                <span className="section-count">{section.tips.length} dicas</span>
              </div>
              <div className={'section-chevron ' + (activeSection === section.id ? 'open' : '')}>▼</div>
            </div>

            {activeSection === section.id && (
              <div className="section-tips">
                {section.tips.map((tip, i) => (
                  <div key={i} className="tip-card">
                    <div className="tip-number">{i + 1}</div>
                    <div className="tip-body">
                      <div className="tip-title">{tip.title}</div>
                      <div className="tip-desc">{tip.desc}</div>
                      {tip.example && (
                        <pre className="tip-example">{tip.example}</pre>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interview Q&A */}
      <div className="career-interview-section">
        <div className="career-section-header">
          <h2>Perguntas Reais de Entrevistas</h2>
          <p>As perguntas mais frequentes em processos seletivos no Brasil. Selecione o nível e estude as respostas.</p>
        </div>

        <div className="qa-level-tabs">
          <button className={'qa-level-tab ' + (qaLevel === 'junior' ? 'active' : '')} onClick={() => { setQaLevel('junior'); setActiveCategory(null); }}>
            🎯 Júnior
          </button>
          <button className={'qa-level-tab ' + (qaLevel === 'pleno' ? 'active' : '')} onClick={() => { setQaLevel('pleno'); setActiveCategory(null); }}>
            ⚡ Pleno
          </button>
        </div>

        <div className="interview-categories">
          {INTERVIEW_QA.filter(cat => qaLevel === 'pleno' ? cat.level === 'pleno' : !cat.level).map(cat => (
            <button
              key={cat.category}
              className={'interview-cat-tab ' + (activeCategory === cat.category ? 'active' : '')}
              style={activeCategory === cat.category ? { borderColor: cat.color, color: cat.color } : {}}
              onClick={() => setActiveCategory(activeCategory === cat.category ? null : cat.category)}
            >
              {cat.category}
              <span className="cat-count">{cat.questions.length}</span>
            </button>
          ))}
        </div>

        {INTERVIEW_QA.filter(cat => qaLevel === 'pleno' ? cat.level === 'pleno' : !cat.level).map(cat => (
          activeCategory === cat.category && (
            <div key={cat.category} className="interview-qa-list">
              {cat.questions.map((item, i) => {
                const qKey = cat.category + '-' + i;
                return (
                  <div
                    key={i}
                    className={'qa-item ' + (openQ === qKey ? 'open' : '')}
                    style={{ '--qa-color': cat.color }}
                  >
                    <div className="qa-question" onClick={() => setOpenQ(openQ === qKey ? null : qKey)}>
                      <span className="qa-num">Q{i + 1}</span>
                      <span className="qa-q-text">{item.q}</span>
                      <span className="qa-chevron">{openQ === qKey ? '▲' : '▼'}</span>
                    </div>
                    {openQ === qKey && (
                      <div className="qa-answer">
                        <div className="qa-answer-label">Resposta</div>
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )
        ))}
      </div>

      {/* Market insights */}
      <div className="market-insights card">
        <h3>📊 Mercado Tech Brasil 2024-2025</h3>
        <div className="insights-grid">
          {[
            { label: 'TypeScript', value: '+85%', desc: 'das vagas React/Node exigem TS em 2024-25' },
            { label: 'Júnior BR', value: 'R$3k–8k', desc: 'CLT em empresas de produto. Remote-first pode pagar mais' },
            { label: 'Pleno BR', value: 'R$8k–18k', desc: 'com 2-4 anos de experiência real' },
            { label: 'Tempo médio', value: '6–12m', desc: 'para 1ª vaga após estudos intensivos (mercado 2024-25)' },
          ].map(ins => (
            <div key={ins.label} className="insight-card">
              <div className="insight-value">{ins.value}</div>
              <div className="insight-label">{ins.label}</div>
              <div className="insight-desc">{ins.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
