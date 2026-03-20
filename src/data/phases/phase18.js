import { miniProjectPhase18 } from '../miniprojects.js';
export const phase18 = {
  id: 'phase-9',
  title: 'Next.js — Fullstack com React',
  phase: 11,
  color: '#0ea5e9',
  icon: '▲',
  description: 'SSR, SSG, ISR, Server Components, App Router, Server Actions — Next.js mudou o que significa ser fullstack nos últimos anos. Quem sabe só React sem Next.js está incompleto para o mercado atual.',
  checklist: [
    'Explicar a diferença entre CSR, SSR, SSG e ISR com casos de uso reais',
    'Criar rotas com o App Router (pastas e page.tsx)',
    'Entender Server Components vs Client Components e quando usar cada um',
    'Usar Server Actions para mutações sem criar endpoints de API',
    'Buscar dados com fetch no servidor (sem useEffect)',
    'Implementar loading.tsx, error.tsx e not-found.tsx',
    'Configurar layouts aninhados com layout.tsx',
    'Usar next/image e next/font para otimização automática',
    'Entender Route Handlers (equivalente de Express no Next.js)',
    'Fazer deploy no Vercel e entender Edge vs Node.js runtime',
  ],
  modules: [
    {
      id: 'mod-8-1',
      title: 'Por que Next.js mudou o fullstack',
      duration: '35 min',
      xp: 160,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Em 2019, construir uma app fullstack significava: React no frontend + Node.js/Express no backend, dois repositórios, dois deploys, CORS configurado, estado gerenciado entre os dois. Next.js mudou isso. Com o App Router, você escreve código que roda no servidor e no cliente no mesmo arquivo, no mesmo projeto, com o mesmo deploy.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── AS 4 ESTRATÉGIAS DE RENDERIZAÇÃO ────────────────\n\n// 1. CSR — Client-Side Rendering (React puro)\n//    Servidor envia HTML vazio + bundle JS\n//    Browser baixa JS → executa → renderiza\n//    Problema: SEO ruim, loading lento, FOUC (Flash of Unstyled Content)\n\n// 2. SSR — Server-Side Rendering\n//    Servidor renderiza HTML completo a cada request\n//    Browser recebe HTML pronto → mostra imediatamente\n//    Depois: JS "hidrata" o HTML (torna interativo)\n//    Bom para: páginas com dados em tempo real, SEO crítico\n\n// 3. SSG — Static Site Generation\n//    HTML gerado em BUILD TIME, não em runtime\n//    Arquivo estático servido por CDN → ultra rápido\n//    Bom para: blog, docs, landing pages (conteúdo que não muda)\n\n// 4. ISR — Incremental Static Regeneration\n//    Híbrido: SSG que re-gera automaticamente após X segundos\n//    CDN serve o cache, re-gera em background\n//    Bom para: e-commerce, notícias (dados mudam mas não por request)\n\n// No App Router do Next.js 13+, cada fetch decide a estratégia:\n\n// SSG (padrão — resultado cacheado forever):\nconst data = await fetch(\'https://api.exemplo.com/posts\');\n\n// SSR (no-store — fresh a cada request):\nconst data2 = await fetch(\'https://api.exemplo.com/posts\', {\n  cache: \'no-store\'\n});\n\n// ISR (revalidate a cada 60 segundos):\nconst data3 = await fetch(\'https://api.exemplo.com/posts\', {\n  next: { revalidate: 60 }\n});\n\nconsole.log(\'Mesma API, estratégias diferentes, mesmo código\');',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── PAGES ROUTER vs APP ROUTER ──────────────────────\n// Next.js 12 e anterior: Pages Router (/pages)\n// Next.js 13+: App Router (/app) — o futuro\n\n// PAGES ROUTER (legado, ainda funciona):\n// pages/\n//   index.tsx          → rota /\n//   blog/[slug].tsx    → rota /blog/:slug\n//   api/users.ts       → API endpoint\n\n// APP ROUTER (moderno — use este):\n// app/\n//   page.tsx           → rota /\n//   layout.tsx         → layout compartilhado\n//   loading.tsx        → UI de loading automático\n//   error.tsx          → UI de erro automático\n//   not-found.tsx      → página 404\n//   blog/\n//     page.tsx         → rota /blog\n//     [slug]/\n//       page.tsx       → rota /blog/:slug\n//   api/\n//     users/\n//       route.ts       → API endpoint GET/POST /api/users\n\n// Diferença principal: App Router usa React Server Components por padrão\n// Todo componente em /app é um Server Component, a menos que tenha:\n\'use client\'; // declara explicitamente que é Client Component\n\nconsole.log(\'App Router: server por padrão, client quando precisa\');',
          },
          {
            type: 'highlight',
            content: '⚡ Por que isso importa para o mercado: A maioria das empresas que usam React estão migrando para Next.js ou já migraram. Saber React é o pré-requisito — mas o trabalho no mercado de 2024 em diante é majoritariamente Next.js. Vercel, startups e grandes empresas (Vercel, Twitch, TikTok, GitHub) rodam Next.js em produção.',
          },
          {
            type: 'common_error',
            title: 'Usar useEffect para buscar dados em vez de Server Components',
            wrong: '// Jeito antigo (ainda funciona, mas é subótimo no App Router)\n\'use client\';\nimport { useState, useEffect } from \'react\';\n\nexport default function Posts() {\n  const [posts, setPosts] = useState([]);\n  useEffect(() => {\n    fetch(\'/api/posts\').then(r => r.json()).then(setPosts);\n  }, []);\n  // Loading state, error state, hydration mismatch...\n  return <div>{posts.map(p => <div key={p.id}>{p.title}</div>)}</div>;\n}',
            wrongLabel: 'useEffect no client: loading states manuais, SEO ruim, waterfall de requests.',
            right: '// Jeito moderno: Server Component busca direto no servidor\n// SEM useEffect, SEM useState, SEM loading manual\nexport default async function Posts() {\n  const posts = await fetch(\'https://api.exemplo.com/posts\').then(r => r.json());\n  // HTML já vem com os dados do servidor — sem loading, SEO perfeito\n  return <div>{posts.map(p => <div key={p.id}>{p.title}</div>)}</div>;\n}',
            rightLabel: 'Server Component: async/await direto, dados no HTML inicial, zero JavaScript no cliente.',
            explanation: 'Server Components rodam exclusivamente no servidor. O resultado é HTML puro enviado ao cliente — sem bundle JS para esses componentes, sem loading state, dados disponíveis imediatamente para SEO.',
          },
        ],
        exercise: {
          title: 'Identificar estratégia de renderização ideal',
          description: 'Para cada cenário abaixo, identifique a estratégia correta (CSR, SSR, SSG ou ISR) e o motivo. Imprima: "Cenário X: [ESTRATÉGIA] — motivo"',
                    solutionHint: 'SSG: conteúdo estático. SSR: dados dinâmicos por request. ISR: revalidação periódica. CSR: interação pura do cliente sem SEO.',
starterCode: `const cenarios = [
  { id: 1, descricao: 'Dashboard de analytics com dados em tempo real por usuário logado' },
  { id: 2, descricao: 'Blog com 500 posts que atualizam raramente' },
  { id: 3, descricao: 'Página de produto de e-commerce com estoque que muda a cada hora' },
  { id: 4, descricao: 'Feed de redes sociais personalizado por usuário' },
  { id: 5, descricao: 'Documentação técnica estática de uma biblioteca' },
  { id: 6, descricao: 'Página de notícias com artigos que atualizam a cada 5 minutos' },
];

// Implemente a função identificarEstrategia(cenario)
// Retorne: { estrategia: 'SSG'|'SSR'|'ISR'|'CSR', motivo: '...' }
function identificarEstrategia(cenario) {
  const desc = cenario.descricao.toLowerCase();
  // Analise as palavras-chave:
  // 'tempo real', 'por usuário', 'personalizado' → SSR ou CSR
  // 'raramente', 'estático', 'documentação' → SSG
  // 'a cada X', 'atualiza periodicamente' → ISR
  // 'dashboard', 'interativo', 'autenticado' → CSR ou SSR
}

cenarios.forEach(c => {
  const resultado = identificarEstrategia(c);
  console.log(\`Cenário \${c.id}: \${resultado.estrategia} — \${resultado.motivo}\`);
});`,
          validate: (output, code) => {
            const o = output.toLowerCase();
            return (
              code.includes('identificarEstrategia') &&
              (o.includes('ssg') || o.includes('static')) &&
              (o.includes('ssr') || o.includes('server')) &&
              (o.includes('isr') || o.includes('incremental')) &&
              output.includes('Cenário') &&
              (output.match(/Cenário \d/g) || []).length >= 5
            );
          },
          validateMessage: 'Identifique a estratégia para cada cenário (SSG, SSR, ISR, CSR). Todos os 6 cenários devem ter resposta com motivo.',
        },
        quiz: [
          { question: 'Qual a principal vantagem do SSG sobre SSR?', options: ['SSG suporta mais usuários simultâneos', 'SSG gera HTML em build time e serve via CDN — ultra rápido e sem carga no servidor por request', 'SSG é mais seguro que SSR', 'SSG permite dados dinâmicos por usuário'], correct: 1, explanation: 'SSG: HTML gerado uma vez no build e distribuído em CDN. Qualquer usuário no mundo serve do ponto mais próximo, sem processar no servidor. Latência de milissegundos vs centenas de ms do SSR.' },
          { question: 'O que é ISR (Incremental Static Regeneration)?', options: ['Renderização incremental no browser', 'Páginas estáticas que se regeneram automaticamente após um intervalo definido', 'Streaming de HTML do servidor', 'Cache do Service Worker'], correct: 1, explanation: 'ISR: a página é gerada como SSG (estático), mas com um tempo de revalidação (ex: 60s). Após esse tempo, na próxima visita, o Next.js re-gera a página em background e atualiza o cache. O usuário sempre vê um resultado rápido do CDN.' },
          { question: 'No App Router, qual é o comportamento padrão de um componente?', options: ['Client Component (roda no browser)', 'Server Component (roda no servidor, sem JS no cliente)', 'Depende do nome do arquivo', 'Depende do diretório'], correct: 1, explanation: 'No App Router, todo componente é Server Component por padrão. Para usar hooks (useState, useEffect) ou APIs do browser, você precisa declarar "use client" no topo do arquivo.' },
        ],
      },
    },

    {
      id: 'mod-8-2',
      title: 'App Router: Rotas, Layouts e Convenções',
      duration: '50 min',
      xp: 200,
      content: {
        sections: [
          {
            type: 'text',
            content: 'O App Router usa o sistema de arquivos como roteador. A estrutura de pastas é a estrutura de URLs. Arquivos com nomes especiais (page.tsx, layout.tsx, loading.tsx) têm comportamentos automáticos que eliminam boilerplate que você escreveria manualmente.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── ESTRUTURA DE PASTAS = ESTRUTURA DE ROTAS ─────────\n//\n// app/\n// ├── layout.tsx          → Root layout (wraps everything)\n// ├── page.tsx            → /\n// ├── loading.tsx         → Loading UI para /\n// ├── error.tsx           → Error boundary para /\n// ├── not-found.tsx       → 404 para /\n// │\n// ├── blog/\n// │   ├── page.tsx        → /blog\n// │   ├── [slug]/\n// │   │   └── page.tsx    → /blog/meu-post\n// │   └── [...slugs]/\n// │       └── page.tsx    → /blog/a/b/c (catch-all)\n// │\n// ├── (auth)/             → Route group: não afeta a URL!\n// │   ├── login/\n// │   │   └── page.tsx    → /login\n// │   └── cadastro/\n// │       └── page.tsx    → /cadastro\n// │\n// ├── dashboard/\n// │   ├── layout.tsx      → Layout só para /dashboard/*\n// │   ├── page.tsx        → /dashboard\n// │   └── settings/\n// │       └── page.tsx    → /dashboard/settings\n// │\n// └── api/\n//     └── users/\n//         └── route.ts    → GET/POST /api/users\n\nconsole.log(\'Estrutura de pastas = estrutura de URLs\');',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── LAYOUTS ANINHADOS ────────────────────────────────\n// app/layout.tsx — Root Layout (obrigatório)\nexport default function RootLayout({ children }) {\n  return (\n    <html lang="pt-BR">\n      <body>\n        <Header />\n        {children}  {/* todas as páginas renderizam aqui */}\n        <Footer />\n      </body>\n    </html>\n  );\n}\n\n// app/dashboard/layout.tsx — Layout aninhado\n// Só renderiza para /dashboard/* sem re-renderizar o RootLayout\nexport default function DashboardLayout({ children }) {\n  return (\n    <div className="dashboard-wrapper">\n      <Sidebar />  {/* persistente entre navegações no dashboard */}\n      <main>{children}</main>\n    </div>\n  );\n}\n\n// ── ARQUIVOS ESPECIAIS ────────────────────────────────\n// loading.tsx — Suspense automático\nexport default function Loading() {\n  return <Skeleton />; // mostra enquanto page.tsx carrega\n}\n\n// error.tsx — Error Boundary automático\n\'use client\'; // error.tsx DEVE ser Client Component\nexport default function Error({ error, reset }) {\n  return (\n    <div>\n      <p>Algo deu errado: {error.message}</p>\n      <button onClick={reset}>Tentar novamente</button>\n    </div>\n  );\n}\n\n// not-found.tsx — 404 customizado\nexport default function NotFound() {\n  return <h1>Página não encontrada</h1>;\n}\n\nconsole.log(\'loading + error + not-found = UX profissional sem boilerplate\');',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── METADATA E SEO ───────────────────────────────────\n// app/blog/[slug]/page.tsx\n\n// Metadata estático\nexport const metadata = {\n  title: \'Meu Blog\',\n  description: \'Posts sobre tecnologia\',\n  openGraph: {\n    images: [\'/og-image.png\'],\n  },\n};\n\n// Metadata dinâmico (por post)\nexport async function generateMetadata({ params }) {\n  const post = await fetch(`https://api.exemplo.com/posts/${params.slug}`)\n    .then(r => r.json());\n\n  return {\n    title: post.title,\n    description: post.excerpt,\n    openGraph: {\n      title: post.title,\n      images: [post.coverImage],\n    },\n  };\n}\n\nexport default async function BlogPost({ params }) {\n  const post = await fetch(`https://api.exemplo.com/posts/${params.slug}`)\n    .then(r => r.json());\n\n  return (\n    <article>\n      <h1>{post.title}</h1>\n      <p>{post.content}</p>\n    </article>\n  );\n}\n\n// ── GERANDO ROTAS ESTÁTICAS (SSG) ────────────────────\n// Pré-gera as páginas de todos os posts em build time\nexport async function generateStaticParams() {\n  const posts = await fetch(\'https://api.exemplo.com/posts\').then(r => r.json());\n  return posts.map(post => ({ slug: post.slug }));\n}\n\nconsole.log(\'generateMetadata + generateStaticParams = SEO perfeito\');',
          },
          {
            type: 'common_error',
            title: 'Misturar Server e Client Components incorretamente',
            wrong: '// Server Component importando Client Component com estado → OK\n// Mas o inverso NÃO funciona:\n\'use client\';\nimport ServidorComponente from \'./ServidorComponente\'; // ❌\n// Client Components NÃO podem importar Server Components\n// (pois Server Components não têm representação no browser)\n\n// Outro erro: usar hooks em Server Component\nexport default async function Pagina() {\n  const [count, setCount] = useState(0); // ❌ ERRO!\n  // useState/useEffect só em Client Components\n}',
            wrongLabel: 'Server Components não têm hooks. Client Components não podem importar Server Components.',
            right: '// ✅ Server Component pode importar Client Component\nimport BotaoInterativo from \'./BotaoInterativo\'; // tem "use client"\n\nexport default async function Pagina() {\n  const dados = await buscarDados(); // async direto no Server Component\n  return (\n    <div>\n      <p>{dados.titulo}</p>\n      <BotaoInterativo />  {/* Client Component dentro de Server Component */}\n    </div>\n  );\n}\n// Regra: a "ilha de interatividade" (Client) fica o mais baixo possível na árvore',
            rightLabel: 'Server Components wrappam Client Components — não o contrário. Minimize o JS no cliente.',
            explanation: 'A fronteira Server/Client é unidirecional: Server Components podem renderizar Client Components como filhos, mas não o contrário. O objetivo é ter o mínimo de JS no cliente — só os componentes interativos precisam de "use client".',
          },
        ],
        exercise: {
          title: 'Mapear estrutura de pastas para URLs',
          description: 'Dado um array de estruturas de arquivo do App Router, implemente resolverRota(arquivo) que retorna a URL correspondente. Considere: page.tsx define rota, [param] é dinâmico, (grupo) não afeta URL, layout/loading/error não são rotas.',
                    solutionHint: 'app/sobre/page.tsx vira /sobre. app/[id]/page.tsx vira /qualquer-valor. app/(grupo)/page.tsx — grupo não aparece na URL. layout.tsx envolve os filhos.',
starterCode: `// Regras do App Router:
// - page.tsx em app/foo/page.tsx → /foo
// - [param] em app/blog/[slug]/page.tsx → /blog/:slug
// - (grupo) em app/(auth)/login/page.tsx → /login (grupo ignorado)
// - layout.tsx, loading.tsx, error.tsx → não são rotas (retorne null)
// - route.ts → é API endpoint, retorne a URL com prefixo [API]

function resolverRota(caminhoArquivo) {
  // Implemente a lógica de resolução
  // Retorne a URL como string ou null se não for uma rota de página
}

const arquivos = [
  'app/page.tsx',
  'app/blog/page.tsx',
  'app/blog/[slug]/page.tsx',
  'app/(auth)/login/page.tsx',
  'app/dashboard/settings/page.tsx',
  'app/layout.tsx',
  'app/loading.tsx',
  'app/api/users/route.ts',
  'app/blog/[...slugs]/page.tsx',
];

arquivos.forEach(f => {
  const rota = resolverRota(f);
  if (rota !== null) console.log(\`\${f} → \${rota}\`);
});`,
          validate: (output, code) => {
            const o = output;
            return (
              code.includes('resolverRota') &&
              o.includes('→ /') &&
              o.includes('/blog/') &&
              o.includes(':slug') &&
              !o.includes('(auth)') &&
              o.includes('[API]') &&
              (o.match(/→/g) || []).length >= 6
            );
          },
          validateMessage: 'resolverRota deve: retornar / para app/page.tsx, /blog/:slug para [slug], remover (auth) do path, retornar [API]/api/users para route.ts, null para layout/loading.',
        },
        quiz: [
          { question: 'O que são Route Groups (parênteses) no App Router?', options: ['Rotas que requerem autenticação', 'Pastas que organizam código sem afetar a URL — (auth)/login → /login', 'Agrupamento de API routes', 'Rotas com parâmetros opcionais'], correct: 1, explanation: 'Route Groups com parênteses: (marketing), (auth), (dashboard) organizam o código em grupos lógicos sem aparecer na URL. Útil para aplicar layouts diferentes a grupos de rotas sem afetar os caminhos.' },
          { question: 'Como funciona o arquivo loading.tsx no App Router?', options: ['Substitui o React.lazy', 'Automaticamente envolve a page.tsx em um Suspense boundary — mostra enquanto os dados carregam', 'Só funciona com SSR', 'Precisa ser importado explicitamente'], correct: 1, explanation: 'O Next.js automaticamente envolve a page.tsx em um React Suspense usando o loading.tsx como fallback. Quando a page.tsx é um Server Component assíncrono, o loading.tsx é mostrado instantaneamente enquanto os dados são buscados.' },
          { question: 'Qual a diferença entre [slug] e [...slugs] em rotas dinâmicas?', options: ['Não há diferença', '[slug] captura um segmento, [...slugs] captura múltiplos segmentos (catch-all)', '[...slugs] é mais lento', '[slug] só funciona com strings'], correct: 1, explanation: '[slug] captura exatamente um segmento: /blog/meu-post → params.slug = "meu-post". [...slugs] captura zero ou mais: /blog/2024/01/post → params.slugs = ["2024", "01", "post"]. Útil para URLs hierárquicas.' },
        ],
      },
    },

    {
      id: 'mod-8-3',
      title: 'Server Components vs Client Components na Prática',
      duration: '55 min',
      xp: 220,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Server Components são a mudança mais importante do React nos últimos anos — e também a mais mal entendida. Eles rodam exclusivamente no servidor, têm acesso direto a banco de dados e sistema de arquivos, e produzem zero JavaScript para o cliente. Client Components são os componentes React que você já conhece.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── SERVER COMPONENT — o que pode fazer ─────────────\n// app/dashboard/page.tsx\nimport { db } from \'@/lib/db\'; // acesso direto ao banco!\nimport { cookies } from \'next/headers\'; // acesso a cookies do servidor\nimport { redirect } from \'next/navigation\';\n\nexport default async function Dashboard() {\n  // 1. Acesso direto ao banco — sem API intermediária!\n  const user = await db.user.findFirst({ where: { id: getCurrentUserId() } });\n\n  // 2. Redirecionar no servidor\n  if (!user) redirect(\'/login\');\n\n  // 3. Múltiplas queries em paralelo\n  const [posts, stats] = await Promise.all([\n    db.post.findMany({ where: { userId: user.id } }),\n    db.analytics.getStats(user.id),\n  ]);\n\n  // 4. Zero JavaScript enviado ao cliente para esses dados\n  return (\n    <div>\n      <h1>Olá, {user.name}</h1>\n      <Stats data={stats} />      {/* Server Component */}\n      <PostList posts={posts} />  {/* Server Component */}\n      <NewPostButton />           {/* Client Component — só esse tem JS */}\n    </div>\n  );\n}\n\n// ── SERVER COMPONENT — o que NÃO pode fazer ──────────\n// ❌ useState, useEffect, useContext\n// ❌ Event handlers (onClick, onChange)\n// ❌ APIs do browser (window, document, localStorage)\n// ❌ Hooks customizados que usam os acima\nconsole.log(\'Server Component: poder de servidor + zero JS no cliente\');',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── CLIENT COMPONENT — quando usar ──────────────────\n\'use client\';\n// Use quando precisar de:\n// - useState, useReducer\n// - useEffect, useLayoutEffect\n// - Event handlers (onClick, onChange, onSubmit)\n// - APIs do browser (window, localStorage, navigator)\n// - Hooks customizados com state\n\nimport { useState } from \'react\';\n\nexport default function SearchBar({ onSearch }) {\n  const [query, setQuery] = useState(\'\');\n\n  return (\n    <input\n      value={query}\n      onChange={e => setQuery(e.target.value)}\n      onKeyDown={e => e.key === \'Enter\' && onSearch(query)}\n      placeholder="Buscar..."\n    />\n  );\n}\n\n// ── PASSANDO DADOS DE SERVER PARA CLIENT ──────────────\n// Server Component busca dados e passa como props para Client Component\n// app/products/page.tsx (Server)\nexport default async function Products() {\n  const products = await db.product.findMany(); // servidor\n  return <ProductGrid initialProducts={products} />;\n  //      ↑ Client Component recebe dados do servidor como prop\n}\n\n// components/ProductGrid.tsx (Client)\n\'use client\';\nexport function ProductGrid({ initialProducts }) {\n  const [products, setProducts] = useState(initialProducts);\n  const [filter, setFilter] = useState(\'\');\n  // interatividade local com dados do servidor\n}\n\nconsole.log(\'Client Component: interatividade. Server Component: dados.\');',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── CONTEXTO NO APP ROUTER ───────────────────────────\n// Server Components NÃO suportam Context API diretamente\n// Solução: Context Provider deve ser Client Component\n\n\'use client\';\nimport { createContext, useContext, useState } from \'react\';\n\nconst ThemeContext = createContext(null);\n\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState(\'dark\');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n// Importante: children pode ser Server Components!\n// O Provider é Client, mas os filhos passados via children\n// ainda rodam no servidor se não tiverem "use client"\n\n// app/layout.tsx (Server Component)\nimport { ThemeProvider } from \'@/components/ThemeProvider\';\nexport default function RootLayout({ children }) {\n  return (\n    <html>\n      <body>\n        <ThemeProvider>  {/* Client Component */}\n          {children}      {/* Pode ser Server Component! */}\n        </ThemeProvider>\n      </body>\n    </html>\n  );\n}\n\nconsole.log(\'Context Provider como Client Component que wrappa Server Components\');',
          },
          {
            type: 'common_error',
            title: 'Adicionar "use client" desnecessariamente em tudo',
            wrong: '// Desenvolvedor com medo de erros adiciona em tudo:\n\'use client\';\n\nexport default async function ProductPage({ params }) {\n  // Este componente não tem interatividade!\n  // async function não funciona em Client Components\n  const product = await fetch(`/api/products/${params.id}`);\n  return <div>{product.name}</div>;\n}',
            wrongLabel: '"use client" desnecessário: perde os benefícios do servidor e async não funciona.',
            right: '// Server Component por padrão — sem "use client"\nexport default async function ProductPage({ params }) {\n  // Busca direto no servidor, sem API intermediária\n  const product = await db.product.findUnique({ where: { id: params.id } });\n  return (\n    <div>\n      <h1>{product.name}</h1>\n      <AddToCartButton productId={product.id} />  {/* só esse é Client */}\n    </div>\n  );\n}',
            rightLabel: 'Sem "use client" = Server Component por padrão. Apenas componentes com interatividade precisam.',
            explanation: 'A regra de ouro: comece sem "use client". Só adicione quando o componente precisar de state, effects ou event handlers. Quanto menos Client Components, menos JavaScript no cliente, melhor performance.',
          },
        ],
        exercise: {
          title: 'Classificar componentes como Server ou Client',
          description: 'Analise o código de cada componente e classifique como "Server" ou "Client". Implemente classificarComponente(codigo) que retorna o tipo correto e o motivo principal.',
                    solutionHint: 'Server Component: sem hooks, sem eventos, pode ser async, acessa banco diretamente. Client Component: precisa de "use client", tem useState/useEffect/event handlers.',
starterCode: `const componentes = [
  {
    id: 'A',
    codigo: \`
      export default async function UserProfile({ userId }) {
        const user = await db.users.findById(userId);
        return <div><h1>{user.name}</h1><p>{user.bio}</p></div>;
      }
    \`
  },
  {
    id: 'B',
    codigo: \`
      'use client';
      import { useState } from 'react';
      export default function Counter() {
        const [count, setCount] = useState(0);
        return <button onClick={() => setCount(c => c+1)}>{count}</button>;
      }
    \`
  },
  {
    id: 'C',
    codigo: \`
      export default function ProductCard({ product }) {
        return <div><img src={product.image} /><p>{product.price}</p></div>;
      }
    \`
  },
  {
    id: 'D',
    codigo: \`
      import { useRouter } from 'next/navigation';
      export default function BackButton() {
        const router = useRouter();
        return <button onClick={() => router.back()}>Voltar</button>;
      }
    \`
  },
  {
    id: 'E',
    codigo: \`
      import { cookies } from 'next/headers';
      export default async function AuthCheck() {
        const token = cookies().get('auth-token');
        if (!token) return <p>Não autenticado</p>;
        return <p>Autenticado</p>;
      }
    \`
  },
];

function classificarComponente(codigo) {
  // Analise o código e retorne { tipo: 'Server' | 'Client', motivo: '...' }
  // Dicas: 'use client', useState, useEffect, onClick → Client
  //        async function, db., cookies(), headers() → Server
  //        sem hooks e sem 'use client' → Server (padrão)
}

componentes.forEach(c => {
  const { tipo, motivo } = classificarComponente(c.codigo);
  console.log(\`Componente \${c.id}: \${tipo} — \${motivo}\`);
});`,
          validate: (output, code) => {
            const o = output;
            return (
              code.includes('classificarComponente') &&
              o.includes('Server') &&
              o.includes('Client') &&
              o.includes('Componente A') &&
              o.includes('Componente B') &&
              o.includes('Componente D') &&
              // A deve ser Server, B deve ser Client, D deve ser Client
              (o.includes('A: Server') || o.includes('A — Server')) &&
              (o.includes('B: Client') || o.includes('B — Client'))
            );
          },
          validateMessage: 'A=Server (async/db), B=Client (useState), C=Server (sem hooks), D=Client (useRouter), E=Server (cookies do servidor).',
        },
        quiz: [
          { question: 'Qual das opções é EXCLUSIVA de Server Components?', options: ['useState', 'Acesso direto ao banco de dados sem API intermediária', 'onClick handlers', 'useContext'], correct: 1, explanation: 'Server Components têm acesso direto a banco de dados, sistema de arquivos, variáveis de ambiente secretas, e APIs do servidor — sem expor ao cliente. Client Components nunca devem ter secrets ou conexões de banco diretas.' },
          { question: 'Por que Client Components geram mais JavaScript no bundle?', options: ['Porque são maiores em código', 'Porque o código do Client Component é enviado ao browser e executado — Server Components não enviam código JS', 'Porque fazem mais requests', 'Não há diferença no bundle'], correct: 1, explanation: 'Server Components produzem apenas HTML. O código JavaScript do Server Component nunca vai para o cliente. Client Components são incluídos no bundle JS enviado ao browser. Minimizar Client Components = bundle menor = app mais rápida.' },
          { question: 'Como passar dados de um Server Component para um Client Component?', options: ['Via Context API', 'Via props — Server Component busca dados e passa como props para o Client Component filho', 'Via localStorage', 'Via fetch no Client Component'], correct: 1, explanation: 'O padrão: Server Component busca dados (async/await), passa como props para Client Component. O Client Component recebe os dados prontos e adiciona interatividade. Evita a necessidade de fetch no cliente.' },
        ],
      },
    },

    {
      id: 'mod-8-4',
      title: 'Server Actions: Mutações sem API',
      duration: '50 min',
      xp: 220,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Server Actions são funções assíncronas que rodam no servidor mas são chamadas do cliente — como se fossem funções locais. Elas eliminam a necessidade de criar endpoints de API para a maioria das mutações: criar, atualizar, deletar dados com uma única função.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── SERVER ACTION: a forma mais simples ──────────────\n// app/posts/new/page.tsx\n\n// Definindo uma Server Action:\nasync function criarPost(formData) {\n  \'use server\'; // esta função roda no servidor!\n\n  const titulo = formData.get(\'titulo\');\n  const conteudo = formData.get(\'conteudo\');\n\n  // Acesso direto ao banco — sem fetch, sem API\n  await db.post.create({\n    data: {\n      titulo,\n      conteudo,\n      userId: getCurrentUserId(),\n    },\n  });\n\n  revalidatePath(\'/posts\'); // atualiza o cache da página\n  redirect(\'/posts\');       // redireciona após criar\n}\n\n// Usando em um formulário — SEM JavaScript no cliente!\nexport default function NovoPost() {\n  return (\n    <form action={criarPost}>\n      <input name="titulo" placeholder="Título" />\n      <textarea name="conteudo" placeholder="Conteúdo" />\n      <button type="submit">Publicar</button>\n    </form>\n  );\n  // O formulário funciona mesmo com JavaScript desabilitado!\n  // Progressive Enhancement nativo\n}\n\nconsole.log(\'Server Action: função no servidor chamada como se fosse local\');',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── SERVER ACTIONS EM CLIENT COMPONENTS ─────────────\n// Para interatividade mais complexa (feedback, loading, etc)\n\'use client\';\nimport { useTransition } from \'react\';\nimport { deletarPost } from \'@/app/actions\'; // Server Action separada\n\nexport function DeleteButton({ postId }) {\n  const [isPending, startTransition] = useTransition();\n\n  const handleDelete = () => {\n    startTransition(async () => {\n      await deletarPost(postId);\n    });\n  };\n\n  return (\n    <button onClick={handleDelete} disabled={isPending}>\n      {isPending ? \'Deletando...\' : \'Deletar\'}\n    </button>\n  );\n}\n\n// app/actions.ts — arquivo dedicado para Server Actions\n\'use server\';\nimport { db } from \'@/lib/db\';\nimport { revalidatePath } from \'next/cache\';\n\nexport async function deletarPost(postId) {\n  await db.post.delete({ where: { id: postId } });\n  revalidatePath(\'/posts\');\n}\n\nexport async function curtirPost(postId) {\n  await db.like.create({ data: { postId, userId: getCurrentUserId() } });\n  revalidatePath(`/posts/${postId}`);\n}\n\nconsole.log(\'Server Actions no actions.ts: reutilizáveis em qualquer lugar\');',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── VALIDAÇÃO E TRATAMENTO DE ERROS ─────────────────\n\'use server\';\nimport { z } from \'zod\';\nimport { redirect } from \'next/navigation\';\n\nconst PostSchema = z.object({\n  titulo:   z.string().min(3).max(200),\n  conteudo: z.string().min(10),\n});\n\nexport async function criarPost(prevState, formData) {\n  // Validação com Zod\n  const dados = PostSchema.safeParse({\n    titulo:   formData.get(\'titulo\'),\n    conteudo: formData.get(\'conteudo\'),\n  });\n\n  if (!dados.success) {\n    // Retorna erros para o cliente (useFormState)\n    return {\n      errors: dados.error.flatten().fieldErrors,\n      message: \'Dados inválidos\',\n    };\n  }\n\n  try {\n    await db.post.create({ data: dados.data });\n  } catch (e) {\n    return { message: \'Erro ao criar post. Tente novamente.\' };\n  }\n\n  revalidatePath(\'/posts\');\n  redirect(\'/posts\');\n}\n\n// No Client Component com feedback:\n\'use client\';\nimport { useFormState } from \'react-dom\';\nimport { criarPost } from \'@/app/actions\';\n\nexport function NovoPostForm() {\n  const [state, action] = useFormState(criarPost, null);\n  return (\n    <form action={action}>\n      <input name="titulo" />\n      {state?.errors?.titulo && <p className="error">{state.errors.titulo}</p>}\n      <button type="submit">Publicar</button>\n      {state?.message && <p>{state.message}</p>}\n    </form>\n  );\n}\nconsole.log(\'useFormState + Server Action = formulário com feedback sem API\');',
          },
          {
            type: 'common_error',
            title: 'Expor dados sensíveis em Server Actions chamadas pelo cliente',
            wrong: '\'use server\';\n\nexport async function getAdminData(userId) {\n  // PROBLEMA: Server Action é acessível via rede como endpoint!\n  // Qualquer pessoa pode chamar esta função sem autenticação\n  return db.adminData.findAll(); // expõe dados de todos!\n}',
            wrongLabel: 'Server Actions são endpoints de rede — qualquer cliente pode chamá-las.',
            right: '\'use server\';\nimport { getServerSession } from \'next-auth\';\n\nexport async function getAdminData() {\n  // Sempre valide autorização dentro da Server Action\n  const session = await getServerSession();\n  if (!session?.user?.role !== \'admin\') {\n    throw new Error(\'Não autorizado\');\n  }\n  // Só chega aqui se for admin\n  return db.adminData.findMany({ where: { userId: session.user.id } });\n}',
            rightLabel: 'Sempre valide sessão e permissões dentro da Server Action — ela é um endpoint de rede.',
            explanation: 'Server Actions são compiladas como endpoints POST. O Next.js gera uma URL interna para cada uma. Qualquer pessoa pode fazer um POST para essa URL. Trate-as como você trataria um endpoint de API: valide autenticação e autorização sempre.',
          },
        ],
        exercise: {
          title: 'Implementar CRUD com Server Actions',
          description: 'Simule Server Actions para um sistema de tarefas. Implemente: adicionarTarefa(formData), toggleTarefa(id), deletarTarefa(id). Cada action deve validar o input, atualizar o estado e retornar o estado atualizado.',
                    solutionHint: 'Marque com "use server". Chame de formulários com action={fn} ou de Client Components. Após mutação, revalide com revalidatePath("/caminho").',
starterCode: `// Simulação de banco de dados
let tarefas = [
  { id: 1, titulo: 'Aprender Next.js', feita: false },
  { id: 2, titulo: 'Estudar Server Actions', feita: false },
];
let nextId = 3;

// Simulação de validação
function validar(dados) {
  if (!dados.titulo || dados.titulo.trim().length < 3) {
    return { erro: 'Título deve ter pelo menos 3 caracteres' };
  }
  return null;
}

// 1. adicionarTarefa(formData): valida e adiciona nova tarefa
//    formData é um objeto com { get(campo) } como FormData real
//    Retorne { sucesso: true, tarefas } ou { erro: '...' }
function adicionarTarefa(formData) {
  const titulo = formData.get('titulo');
  // valide e adicione
}

// 2. toggleTarefa(id): inverte o status feita/não feita
//    Retorne { sucesso: true, tarefas } ou { erro: 'Não encontrada' }
function toggleTarefa(id) {
}

// 3. deletarTarefa(id): remove a tarefa
//    Retorne { sucesso: true, tarefas }
function deletarTarefa(id) {
}

// Testes
const fakeFormData = (titulo) => ({ get: (k) => k === 'titulo' ? titulo : null });

console.log('--- Adicionar ---');
console.log(adicionarTarefa(fakeFormData('Fazer deploy na Vercel')));
console.log(adicionarTarefa(fakeFormData('AB'))); // deve falhar

console.log('--- Toggle ---');
console.log(toggleTarefa(1));
console.log(toggleTarefa(99)); // deve falhar

console.log('--- Deletar ---');
console.log(deletarTarefa(2));
console.log('Tarefas restantes:', tarefas.length);`,
          validate: (output, code) => {
            const o = output.toLowerCase();
            return (
              code.includes('adicionarTarefa') &&
              code.includes('toggleTarefa') &&
              code.includes('deletarTarefa') &&
              code.includes('validar') &&
              o.includes('sucesso') &&
              o.includes('erro') &&
              o.includes('tarefas restantes: 2')
            );
          },
          validateMessage: 'Implemente as 3 actions com validação. Adicionar com título curto deve retornar erro. toggleTarefa(99) deve retornar erro. Após deletar tarefa 2, restam 2 tarefas.',
        },
        quiz: [
          { question: 'O que é "use server" em uma função?', options: ['Marca a função para rodar apenas durante SSR', 'Declara que a função é uma Server Action — roda no servidor quando chamada do cliente', 'Equivalente ao "use strict"', 'Indica que a função usa APIs do Node.js'], correct: 1, explanation: '"use server" transforma a função em um endpoint POST automático. O Next.js serializa os argumentos, envia ao servidor, executa a função, e retorna o resultado serializado. Parece uma função local mas executa no servidor.' },
          { question: 'O que faz revalidatePath() em uma Server Action?', options: ['Revalida tokens de autenticação', 'Invalida o cache de uma rota — próxima visita busca dados frescos do servidor', 'Verifica se a rota existe', 'Recarrega a página no cliente'], correct: 1, explanation: 'Next.js cacheia agressivamente dados de Server Components. revalidatePath(\'/posts\') marca o cache de /posts como stale — na próxima visita (ou imediatamente), os dados são rebuscados do servidor/banco.' },
          { question: 'Server Actions são seguras por padrão?', options: ['Sim, só podem ser chamadas de Server Components', 'Não — são endpoints de rede. Sempre valide autenticação e autorização dentro delas', 'Sim, o Next.js adiciona CSRF protection automático', 'Depende do modo de deploy'], correct: 1, explanation: 'Server Actions são compiladas como endpoints POST acessíveis via rede. O Next.js adiciona proteção básica (CSRF token automático), mas a autorização — verificar quem pode chamar a action — é responsabilidade do desenvolvedor.' },
        ],
      },
    },

    {
      id: 'mod-8-5',
      title: 'Data Fetching, Cache e Route Handlers',
      duration: '45 min',
      xp: 200,
      content: {
        sections: [
          {
            type: 'text',
            content: 'O sistema de cache do Next.js 13+ é poderoso e automático — mas precisa ser entendido para não causar surpresas em produção. Route Handlers substituem o Express para APIs internas. Juntos, eles definem como dados fluem na sua aplicação.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── ROUTE HANDLERS: API ENDPOINTS NO APP ROUTER ─────\n// app/api/users/route.ts\nimport { NextResponse } from \'next/server\';\n\n// GET /api/users\nexport async function GET(request) {\n  const { searchParams } = new URL(request.url);\n  const page = searchParams.get(\'page\') || \'1\';\n\n  const users = await db.user.findMany({\n    skip: (parseInt(page) - 1) * 10,\n    take: 10,\n  });\n\n  return NextResponse.json(users);\n}\n\n// POST /api/users\nexport async function POST(request) {\n  const body = await request.json();\n\n  const user = await db.user.create({ data: body });\n\n  return NextResponse.json(user, { status: 201 });\n}\n\n// app/api/users/[id]/route.ts\nexport async function GET(request, { params }) {\n  const user = await db.user.findUnique({ where: { id: params.id } });\n  if (!user) return NextResponse.json({ error: \'Not found\' }, { status: 404 });\n  return NextResponse.json(user);\n}\n\nexport async function DELETE(request, { params }) {\n  await db.user.delete({ where: { id: params.id } });\n  return new Response(null, { status: 204 });\n}\n\nconsole.log(\'Route Handlers = Express dentro do Next.js\');',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── SISTEMA DE CACHE DO NEXT.JS ──────────────────────\n// 4 camadas de cache (do mais próximo ao mais distante):\n\n// 1. Router Cache — no browser\n//    Prefetch de links → páginas visitadas ficam em memória\n//    Dura: 30s (páginas dinâmicas) / 5min (estáticas)\n\n// 2. Full Route Cache — no servidor\n//    Páginas completamente estáticas cacheadas no filesystem\n//    Dura: até próximo deploy ou revalidação\n\n// 3. Data Cache — no servidor\n//    Resultados de fetch() cacheados\n//    Dura: até revalidação ou next deploy\n\n// 4. Request Memoization\n//    Mesmo fetch() chamado múltiplas vezes no mesmo request\n//    é executado apenas 1 vez (deduplicação automática)\n\n// ── CONTROLE DE CACHE POR FETCH ──────────────────────\n// Cache forever (SSG)\nfetch(url);\n\n// Sem cache (SSR)\nfetch(url, { cache: \'no-store\' });\n\n// Revalidar a cada 1 hora (ISR)\nfetch(url, { next: { revalidate: 3600 } });\n\n// Tag para revalidação manual\nfetch(url, { next: { tags: [\'posts\'] } });\n// Depois: revalidateTag(\'posts\') invalida todos os fetchs com essa tag\n\n// ── REVALIDAÇÃO ON-DEMAND ─────────────────────────────\n// Útil quando CMS ou webhook dispara uma atualização\n// app/api/revalidate/route.ts\nexport async function POST(request) {\n  const { tag, path } = await request.json();\n  if (tag)  revalidateTag(tag);\n  if (path) revalidatePath(path);\n  return NextResponse.json({ revalidated: true });\n}\nconsole.log(\'Cache inteligente: SSG por padrão, revalida quando necessário\');',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── NEXT/IMAGE E NEXT/FONT ───────────────────────────\nimport Image from \'next/image\';\nimport { Inter } from \'next/font/google\';\n\n// next/image: otimização automática\n// - Redimensiona para o tamanho correto\n// - Converte para WebP/AVIF automaticamente\n// - Lazy loading por padrão\n// - Previne Cumulative Layout Shift (CLS)\n\nexport default function Hero() {\n  return (\n    <Image\n      src="/hero.jpg"\n      alt="Hero"\n      width={1200}\n      height={600}\n      priority  // carrega imediatamente (above the fold)\n      quality={85}\n    />\n  );\n}\n\n// next/font: carrega fontes sem layout shift\n// Zero flash de fonte, auto-hospeda no servidor\nconst inter = Inter({\n  subsets: [\'latin\'],\n  variable: \'--font-inter\',\n});\n\n// app/layout.tsx\nexport default function RootLayout({ children }) {\n  return (\n    <html className={inter.variable}>\n      <body>{children}</body>\n    </html>\n  );\n}\n\n// ── NEXT/LINK E PREFETCH ─────────────────────────────\nimport Link from \'next/link\';\n// Prefetch automático quando o link entra no viewport\n// → navegação instantânea\n\nfunction Nav() {\n  return (\n    <nav>\n      <Link href="/blog">Blog</Link>       {/* prefetch automático */}\n      <Link href="/about" prefetch={false}>Sobre</Link> {/* desabilita */}\n    </nav>\n  );\n}\nconsole.log(\'next/image + next/font + next/link = Core Web Vitals otimizados\');',
          },
          {
            type: 'common_error',
            title: 'Fazer fetch client-side de dados que poderiam vir do servidor',
            wrong: '\'use client\';\nimport { useState, useEffect } from \'react\';\n\nexport default function UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch(`/api/users/${userId}`)\n      .then(r => r.json())\n      .then(data => { setUser(data); setLoading(false); });\n  }, [userId]);\n\n  if (loading) return <Spinner />;\n  return <div>{user?.name}</div>;\n}',
            wrongLabel: 'Fetch no cliente: loading state, request adicional, dados chegam depois do HTML, SEO vazio.',
            right: '// Server Component — sem "use client", sem useEffect, sem loading\nexport default async function UserProfile({ userId }) {\n  const user = await db.user.findUnique({ where: { id: userId } });\n  // Dados disponíveis na renderização — HTML já contém os dados\n  return <div>{user.name}</div>;\n}',
            rightLabel: 'Server Component: dados chegam com o HTML, SEO perfeito, zero loading state, sem JS extra.',
            explanation: 'Se os dados não dependem de interação do usuário (não mudam após carregar), busque-os no servidor. Fetch no cliente cria waterfall desnecessário: HTML chega vazio → JS carrega → fetch → renderiza.',
          },
        ],
        exercise: {
          title: 'Implementar cache e revalidação',
          description: 'Simule o sistema de cache do Next.js. Implemente cacheFetch(url, options) que: (1) cacheia respostas, (2) respeita revalidate em segundos, (3) suporta tags para invalidação. Implemente também revalidateTag(tag) que invalida entradas por tag.',
                    solutionHint: 'fetch com { cache: "force-cache" } = cache permanente. { next: { revalidate: 60 } } = ISR de 60s. revalidatePath() invalida manualmente após mutação.',
starterCode: `// Simulação do sistema de cache do Next.js
const cache = new Map(); // url → { data, timestamp, tags }

// Simula uma API que retorna dados
function mockFetch(url) {
  const timestamp = Date.now();
  if (url.includes('users')) return { users: ['Ana', 'Bruno'], timestamp };
  if (url.includes('posts')) return { posts: ['Post 1', 'Post 2'], timestamp };
  return { data: 'generic', timestamp };
}

// 1. cacheFetch(url, options)
//    options: { cache: 'no-store' | 'force-cache', next: { revalidate, tags } }
//    - 'no-store': nunca cacheia
//    - 'force-cache' ou default: usa cache se válido
//    - revalidate: número de segundos antes de revalidar
//    - tags: array de strings para invalidação por tag
//    Retorne os dados (do cache se válido, ou busca novos)
function cacheFetch(url, options = {}) {
}

// 2. revalidateTag(tag) — invalida todas as entradas com essa tag
function revalidateTag(tag) {
}

// Testes
console.log('--- Teste 1: Cache normal ---');
const r1 = cacheFetch('https://api.exemplo.com/users', { next: { tags: ['users'] } });
const r2 = cacheFetch('https://api.exemplo.com/users', { next: { tags: ['users'] } });
console.log('Mesmo timestamp (cache hit):', r1.timestamp === r2.timestamp);

console.log('--- Teste 2: no-store ---');
const r3 = cacheFetch('https://api.exemplo.com/posts', { cache: 'no-store' });
const r4 = cacheFetch('https://api.exemplo.com/posts', { cache: 'no-store' });
console.log('Timestamps diferentes (sem cache):', r3.timestamp !== r4.timestamp);

console.log('--- Teste 3: revalidateTag ---');
revalidateTag('users');
const r5 = cacheFetch('https://api.exemplo.com/users', { next: { tags: ['users'] } });
console.log('Novo timestamp após revalidate:', r1.timestamp !== r5.timestamp);`,
          validate: (output, code) => {
            const o = output.toLowerCase();
            return (
              code.includes('cacheFetch') &&
              code.includes('revalidateTag') &&
              code.includes('cache') &&
              o.includes('true') &&
              (output.match(/true/g) || []).length >= 3
            );
          },
          validateMessage: 'cacheFetch com mesma URL deve retornar o mesmo timestamp (cache hit). no-store deve retornar timestamps diferentes. Após revalidateTag, novo fetch deve ter timestamp diferente.',
        },
        quiz: [
          { question: 'Quando usar Route Handlers vs Server Actions?', options: ['Route Handlers para tudo, Server Actions são experimentais', 'Route Handlers para APIs externas (mobile app, terceiros), Server Actions para mutações do próprio frontend', 'Server Actions para GET, Route Handlers para POST', 'São equivalentes, use qualquer um'], correct: 1, explanation: 'Route Handlers criam endpoints REST acessíveis por qualquer cliente (app mobile, outros serviços). Server Actions são otimizadas para formulários e mutações do próprio Next.js — sem precisar de endpoint de API.' },
          { question: 'O que acontece quando você chama fetch() duas vezes com a mesma URL no mesmo Server Component?', options: ['Duas requests são feitas ao servidor externo', 'O Next.js deduplica automaticamente — apenas uma request é feita (Request Memoization)', 'A segunda é ignorada', 'Causa um erro de concorrência'], correct: 1, explanation: 'Request Memoization: o Next.js automaticamente deduplica fetch() calls com a mesma URL durante o mesmo render tree. Se um layout e uma page fazem fetch da mesma URL, apenas 1 request real acontece.' },
          { question: 'Como forçar uma página do App Router a ser sempre SSR (sem cache)?', options: ['export const dynamic = "force-dynamic"', 'Adicionar "use server" na page.tsx', 'Usar getServerSideProps', 'Não é possível no App Router'], correct: 0, explanation: 'export const dynamic = "force-dynamic" força a página a ser renderizada dinamicamente a cada request, sem cache. Equivalente ao getServerSideProps do Pages Router. Alternativamente, usar fetch com cache: "no-store" tem o mesmo efeito.' },
        ],
      },
    },

    {
      id: 'mod-8-7',
      title: 'Internacionalização (i18n) com next-intl',
      duration: '40 min',
      xp: 190,
      content: {
        sections: [
          { type: 'text', content: 'Internacionalização (i18n) é a capacidade de adaptar um produto para diferentes idiomas e regiões. next-intl é a biblioteca padrão para Next.js — usada em startups brasileiras que vendem para o mundo e em grandes SaaS internacionais. Mesmo que seu primeiro emprego seja num produto só em português, saber i18n aparece em vagas pleno e sênior com frequência crescente.' },
          { type: 'code', lang: 'javascript', content: '// ── SETUP: next-intl no App Router ───────────────────\n// npm install next-intl\n\n// messages/pt.json\n{\n  "app": { "nome": "Meu App" },\n  "nav": {\n    "inicio": "Início",\n    "sobre": "Sobre",\n    "contato": "Contato"\n  },\n  "produto": {\n    "titulo": "{nome}",\n    "preco": "{preco, number, ::currency/BRL}",\n    "estoque": "{quantidade, plural, =0 {Sem estoque} one {# unidade} other {# unidades}}"\n  },\n  "erros": {\n    "obrigatorio": "{campo} é obrigatório",\n    "emailInvalido": "E-mail inválido"\n  }\n}\n\n// messages/en.json\n{\n  "app": { "nome": "My App" },\n  "nav": {\n    "inicio": "Home",\n    "sobre": "About",\n    "contato": "Contact"\n  },\n  "produto": {\n    "titulo": "{nome}",\n    "preco": "{preco, number, ::currency/USD}",\n    "estoque": "{quantidade, plural, =0 {Out of stock} one {# unit} other {# units}}"\n  }\n}' },
          { type: 'code', lang: 'javascript', content: '// ── USO NOS COMPONENTES ──────────────────────────────\nimport { useTranslations, useFormatter } from \'next-intl\';\n\n// Componente Server (sem \'use client\')\nexport default function ProdutoCard({ produto }) {\n  const t = useTranslations(\'produto\');\n  const format = useFormatter();\n\n  return (\n    <div>\n      <h2>{t(\'titulo\', { nome: produto.nome })}</h2>\n\n      {/* Formatação de moeda adaptada ao locale */}\n      <p>{t(\'preco\', { preco: produto.preco })}</p>\n\n      {/* Pluralização automática */}\n      <span>{t(\'estoque\', { quantidade: produto.estoque })}</span>\n\n      {/* Formatação de data pelo locale */}\n      <time>{format.dateTime(produto.criadoEm, { dateStyle: \'medium\' })}</time>\n\n      {/* Formatação de número relativo */}\n      <span>{format.relativeTime(produto.atualizadoEm)}</span>\n    </div>\n  );\n}\n\n// Componente Client\n\'use client\';\nimport { useTranslations } from \'next-intl\';\nexport function NavBar() {\n  const t = useTranslations(\'nav\');\n  return (\n    <nav>\n      <a href="/">{t(\'inicio\')}</a>\n      <a href="/sobre">{t(\'sobre\')}</a>\n    </nav>\n  );\n}' },
          { type: 'code', lang: 'javascript', content: '// ── ROTEAMENTO POR LOCALE ────────────────────────────\n// Estrutura de pastas:\n// app/\n//   [locale]/           <- wrapper de locale\n//     layout.tsx\n//     page.tsx\n//     produtos/\n//       page.tsx\n\n// middleware.ts — redireciona para o locale correto\nimport createMiddleware from \'next-intl/middleware\';\nexport default createMiddleware({\n  locales: [\'pt\', \'en\', \'es\'],\n  defaultLocale: \'pt\',\n  localeDetection: true,  // detecta pelo Accept-Language header\n});\nexport const config = { matcher: [\'/((?!api|_next|.*\\\\..*).*)\'] };\n\n// app/[locale]/layout.tsx\nimport { NextIntlClientProvider } from \'next-intl\';\nimport { getMessages } from \'next-intl/server\';\nexport default async function LocaleLayout({ children, params }) {\n  const messages = await getMessages();\n  return (\n    <NextIntlClientProvider messages={messages}>\n      {children}\n    </NextIntlClientProvider>\n  );\n}\n\n// URLs geradas automaticamente:\n// /pt/produtos/1  -> locale pt\n// /en/produtos/1  -> locale en\n// /              -> redireciona para /pt (defaultLocale)' },
          { type: 'highlight', content: '🌍 Dica de mercado: mesmo em produtos 100% em português, use i18n desde o início. Refatorar uma app de 100 componentes para i18n depois custa semanas. Com next-intl, o overhead inicial é de 30 minutos — e quando o produto crescer para outros países, a fundação já está lá.' },
          {
            type: 'common_error',
            title: 'Hardcodar strings de UI em vez de usar chaves de tradução',
            wrong: 'export function Botao() {\n  return <button>Salvar alterações</button>;\n  // ❌ Impossível traduzir sem alterar o componente\n}',
            wrongLabel: 'Strings hardcodadas tornam a tradução impossível sem refatoração massiva.',
            right: 'export function Botao() {\n  const t = useTranslations(\'acoes\');\n  return <button>{t(\'salvar\')}</button>;\n  // ✅ messages/pt.json: { "acoes": { "salvar": "Salvar alterações" } }\n  // ✅ messages/en.json: { "acoes": { "salvar": "Save changes" } }\n}',
            rightLabel: 'Chaves de tradução tornam o componente agnóstico de idioma desde o início.',
            explanation: 'A regra é simples: qualquer string visível ao usuário vai num arquivo de mensagens. Strings internas (logs, IDs, nomes de eventos) ficam no código.',
          },
        ],
        exercise: {
          title: 'Simular um sistema de traduções',
          description: 'Implemente uma função t(chave, vars) que busca uma tradução em um dicionário JSON, substitui variáveis no formato {nome}, e trata pluralização simples: {quantidade, plural, =0 {zero} one {# item} other {# itens}}.',
          solutionHint: 'Acesse o dicionário por chave.aninhada com split(.). Para variáveis, use replace com regex /{(\w+)}/g. Para plural, parse o padrão e escolha o caso correto.',
          starterCode: 'const messages = {\n  pt: {\n    nav: { inicio: \'Início\', sobre: \'Sobre\' },\n    produto: {\n      preco: \'Preço: R$ {valor}\',\n      estoque: \'{qtd, plural, =0 {Sem estoque} one {# unidade} other {# unidades}}\'\n    },\n    erro: { campo: \'{campo} é obrigatório\' }\n  }\n};\n\nfunction t(locale, chave, vars = {}) {\n  // 1. Navega até o valor pelo caminho (ex: \'produto.preco\')\n  const partes = chave.split(\'.\');\n  let valor = messages[locale];\n  for (const parte of partes) {\n    valor = valor?.[parte];\n    if (valor === undefined) return chave; // fallback para a chave\n  }\n\n  // 2. Trata pluralização: {qtd, plural, =0 {...} one {...} other {...}}\n  valor = valor.replace(/\\{(\\w+), plural, ([^}]+)\\}/g, (_, varName, casos) => {\n    const n = vars[varName] ?? 0;\n    const mapCasos = {};\n    casos.replace(/=?(\\w+) \\{([^}]+)\\}/g, (__, caso, texto) => {\n      mapCasos[caso] = texto;\n    });\n    const chaveCase = n === 0 ? \'=0\' : n === 1 ? \'one\' : \'other\';\n    const texto = mapCasos[chaveCase] || mapCasos.other || String(n);\n    return texto.replace(\'#\', String(n));\n  });\n\n  // 3. Substitui variáveis simples {nome}\n  valor = valor.replace(/\\{(\\w+)\\}/g, (_, varName) => String(vars[varName] ?? \'\' ));\n\n  return valor;\n}\n\n// Testes\nconsole.log(t(\'pt\', \'nav.inicio\'));                          // Início\nconsole.log(t(\'pt\', \'produto.preco\', { valor: \'29,90\' }));  // Preço: R$ 29,90\nconsole.log(t(\'pt\', \'produto.estoque\', { qtd: 0 }));        // Sem estoque\nconsole.log(t(\'pt\', \'produto.estoque\', { qtd: 1 }));        // 1 unidade\nconsole.log(t(\'pt\', \'produto.estoque\', { qtd: 5 }));        // 5 unidades\nconsole.log(t(\'pt\', \'erro.campo\', { campo: \'Email\' }));    // Email é obrigatório\n',
          validate: (output) => output.includes('Início') && output.includes('Sem estoque') && output.includes('1 unidade') && output.includes('5 unidades'),
          validateMessage: 'Exiba: Início, Sem estoque, 1 unidade, 5 unidades e Email é obrigatório.',
        },
        quiz: [
          { question: 'O que é internacionalização (i18n)?', options: ['Fazer o site funcionar em países diferentes', 'Adaptar um produto para diferentes idiomas, formatos de data, moeda e cultura', 'Traduzir textos automaticamente com IA', 'Usar CDN global'], correct: 1, explanation: 'i18n (18 letras entre i e n) é o processo de preparar o código para ser adaptado a diferentes locales — idioma, moeda, formatos de data, pluralização e direção de texto (LTR/RTL).' },
          { question: 'Por que usar chaves de tradução em vez de strings hardcodadas?', options: ['Chaves são mais rápidas', 'Permitem trocar o idioma sem alterar componentes — o componente é agnóstico de idioma', 'São obrigatórias pelo Next.js', 'Melhoram o SEO automaticamente'], correct: 1, explanation: 'Com chaves, o componente só sabe "quero o texto de salvar" — não qual idioma. A troca de idioma acontece na camada de mensagens, sem tocar nos componentes.' },
          { question: 'O que é pluralização em i18n?', options: ['Suporte a múltiplos idiomas ao mesmo tempo', 'Escolher a forma correta da palavra conforme a quantidade (0 itens, 1 item, 5 itens)', 'Traduzir para mais de 2 idiomas', 'Usar plural em inglês como padrão'], correct: 1, explanation: 'Idiomas têm regras diferentes: inglês tem singular/plural (1 item, 2 items). Russo tem 4 formas. Árabe tem 6. Bibliotecas i18n lidam com isso automaticamente pelo locale.' },
          { question: 'O que o middleware de i18n faz no Next.js?', options: ['Traduz as páginas automaticamente', 'Detecta o locale do usuário e redireciona para a URL correta (/pt/..., /en/...)', 'Carrega os arquivos de tradução', 'Valida que todas as chaves estão traduzidas'], correct: 1, explanation: 'O middleware intercepta todas as requisições, detecta o locale (pelo Accept-Language header ou preferência salva) e redireciona para a versão correta da URL.' },
          { question: 'Qual a diferença entre i18n e l10n?', options: ['São sinônimos', 'i18n = preparar o código para suportar locales; l10n = adaptar o conteúdo para um locale específico', 'l10n é para idiomas asiáticos', 'i18n é só para texto, l10n é para layout'], correct: 1, explanation: 'i18n (internacionalização) é o trabalho de engenharia — estruturar o código. l10n (localização) é o trabalho de tradução e adaptação cultural para cada mercado específico.' },
        ],
      },
    },
    {
      id: 'mod-8-6',
      title: 'Autenticação, Middleware e Deploy no Vercel',
      duration: '50 min',
      xp: 220,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Autenticação em Next.js tem um padrão moderno com NextAuth.js (Auth.js) que integra nativamente com o App Router. Middleware permite proteger rotas antes mesmo de renderizar qualquer componente. E o Vercel foi construído para Next.js — deploy em segundos com zero configuração.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── MIDDLEWARE: intercepta requests antes da renderização\n// middleware.ts (na raiz do projeto, não em /app)\nimport { NextResponse } from \'next/server\';\nimport { getToken } from \'next-auth/jwt\';\n\nexport async function middleware(request) {\n  const { pathname } = request.nextUrl;\n\n  // Rotas públicas — não precisam de auth\n  const publicRoutes = [\'/\', \'/login\', \'/cadastro\', \'/blog\'];\n  if (publicRoutes.some(r => pathname.startsWith(r))) {\n    return NextResponse.next();\n  }\n\n  // Verificar token JWT do NextAuth\n  const token = await getToken({ req: request });\n\n  if (!token) {\n    // Redireciona para login preservando a URL original\n    const loginUrl = new URL(\'/login\', request.url);\n    loginUrl.searchParams.set(\'callbackUrl\', pathname);\n    return NextResponse.redirect(loginUrl);\n  }\n\n  // Proteção de rota de admin\n  if (pathname.startsWith(\'/admin\') && token.role !== \'admin\') {\n    return NextResponse.redirect(new URL(\'/403\', request.url));\n  }\n\n  return NextResponse.next();\n}\n\n// Aplica o middleware apenas para estas rotas\nexport const config = {\n  matcher: [\n    \'/((?!api|_next/static|_next/image|favicon.ico).*)\',\n  ],\n};\nconsole.log(\'Middleware: proteção de rotas antes de qualquer render\');',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── NEXTAUTH.JS v5 (AUTH.JS) ─────────────────────────\n// app/api/auth/[...nextauth]/route.ts\nimport NextAuth from \'next-auth\';\nimport GitHub from \'next-auth/providers/github\';\nimport Google from \'next-auth/providers/google\';\nimport Credentials from \'next-auth/providers/credentials\';\nimport { db } from \'@/lib/db\';\nimport bcrypt from \'bcrypt\';\n\nexport const { handlers, auth, signIn, signOut } = NextAuth({\n  providers: [\n    GitHub({\n      clientId: process.env.GITHUB_ID,\n      clientSecret: process.env.GITHUB_SECRET,\n    }),\n    Google({\n      clientId: process.env.GOOGLE_ID,\n      clientSecret: process.env.GOOGLE_SECRET,\n    }),\n    Credentials({\n      async authorize(credentials) {\n        const user = await db.user.findUnique({\n          where: { email: credentials.email },\n        });\n        if (!user) return null;\n        const valid = await bcrypt.compare(credentials.password, user.passwordHash);\n        if (!valid) return null;\n        return { id: user.id, email: user.email, role: user.role };\n      },\n    }),\n  ],\n  callbacks: {\n    jwt({ token, user }) {\n      if (user) token.role = user.role; // adiciona role ao JWT\n      return token;\n    },\n    session({ session, token }) {\n      session.user.role = token.role; // expõe role na session\n      return session;\n    },\n  },\n});\n\nexport const { GET, POST } = handlers;\nconsole.log(\'NextAuth: Google + GitHub + Credentials em poucas linhas\');',
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── DEPLOY NO VERCEL ─────────────────────────────────\n# 1. Push para GitHub\ngit add . && git commit -m "feat: initial next.js app"\ngit push origin main\n\n# 2. Importar no Vercel (UI ou CLI)\nnpx vercel\n# → seleciona framework: Next.js (detectado automaticamente)\n# → configura variáveis de ambiente\n# → deploy em ~60 segundos\n\n# 3. Variáveis de ambiente no Vercel:\n# NEXTAUTH_URL=https://meusite.vercel.app\n# NEXTAUTH_SECRET=string-aleatoria-32-chars\n# DATABASE_URL=postgres://...\n# GITHUB_ID=...\n# GITHUB_SECRET=...\n\n# ── VERCEL EDGE RUNTIME vs NODE.JS RUNTIME ───────────\n# Node.js Runtime (padrão):\n#   - Funcionalidades completas do Node.js\n#   - Cold start: ~200ms\n#   - Limite: 1MB de código, 512MB RAM\n\n# Edge Runtime:\n#   - V8 isolates — mais leve e rápido\n#   - Cold start: <1ms\n#   - Limitado: sem fs, sem alguns módulos Node.js\n#   - Ideal para: middleware, redirecionamentos, A/B testing\n\n# Para usar Edge em um Route Handler:\nexport const runtime = \'edge\';\nexport async function GET(request) {\n  return new Response(JSON.stringify({ ok: true }));\n}\n\necho "Vercel + Next.js: deploy de produção em 60 segundos"',
          },
          {
            type: 'common_error',
            title: 'Verificar autenticação em cada page.tsx em vez de usar middleware',
            wrong: '// Repetindo verificação de auth em cada página\nexport default async function Dashboard() {\n  const session = await getServerSession();\n  if (!session) redirect(\'/login\'); // repetido em 20 páginas!\n  return <DashboardContent />;\n}\n\nexport default async function Settings() {\n  const session = await getServerSession();\n  if (!session) redirect(\'/login\'); // mesmo código, 20 vezes\n  return <SettingsContent />;\n}',
            wrongLabel: 'Verificação duplicada em cada page: difícil manter, fácil esquecer em uma rota nova.',
            right: '// middleware.ts: proteção centralizada para todas as rotas\nexport async function middleware(request) {\n  const session = await getToken({ req: request });\n  if (!session && request.nextUrl.pathname.startsWith(\'/app\')) {\n    return NextResponse.redirect(new URL(\'/login\', request.url));\n  }\n}\n// Todas as rotas /app/* protegidas automaticamente\n// Nenhuma page.tsx precisa verificar auth individualmente',
            rightLabel: 'Middleware centraliza proteção de rotas — uma vez, para todas as rotas do padrão.',
            explanation: 'Middleware roda antes de qualquer Server Component renderizar. É o lugar correto para verificação de autenticação global. As pages.tsx podem assumir que o usuário está autenticado se chegaram até lá.',
          },
        ],
        exercise: {
          title: 'Implementar middleware de proteção de rotas',
          description: 'Implemente simularMiddleware(request, config) que verifica autenticação e autorização. Retorne: "NEXT" (acesso permitido), "REDIRECT:/login" (não autenticado), ou "REDIRECT:/403" (sem permissão).',
                    solutionHint: 'middleware.ts na raiz. Exporte config.matcher para definir rotas. Use NextResponse.redirect() para redirecionar. Leia cookies com request.cookies.get().',
starterCode: `// Configuração de rotas e permissões
const rotasPublicas = ['/', '/login', '/cadastro', '/blog'];
const rotasAdmin = ['/admin', '/admin/users', '/admin/settings'];

// Usuários simulados e seus tokens
const tokens = {
  'token-user':  { userId: 1, role: 'user',  email: 'user@test.com' },
  'token-admin': { userId: 2, role: 'admin', email: 'admin@test.com' },
};

// Implementar simularMiddleware(request, config)
// request = { pathname, authToken } 
//   authToken: o token do usuário (ou null se não logado)
// Retorne:
//   'NEXT' → acesso permitido
//   'REDIRECT:/login?callbackUrl=PATH' → não autenticado
//   'REDIRECT:/403' → autenticado mas sem permissão
function simularMiddleware(request) {
  const { pathname, authToken } = request;
  
  // 1. Rota pública? → NEXT
  // 2. Não autenticado? → REDIRECT:/login
  // 3. Rota admin + não é admin? → REDIRECT:/403
  // 4. Caso contrário → NEXT
}

// Testes
const casos = [
  { pathname: '/',                authToken: null,          esperado: 'NEXT' },
  { pathname: '/dashboard',       authToken: null,          esperado: 'REDIRECT:/login' },
  { pathname: '/dashboard',       authToken: 'token-user',  esperado: 'NEXT' },
  { pathname: '/admin',           authToken: 'token-user',  esperado: 'REDIRECT:/403' },
  { pathname: '/admin',           authToken: 'token-admin', esperado: 'NEXT' },
  { pathname: '/admin/settings',  authToken: 'token-user',  esperado: 'REDIRECT:/403' },
];

let acertos = 0;
casos.forEach(({ pathname, authToken, esperado }) => {
  const resultado = simularMiddleware({ pathname, authToken });
  const ok = resultado === esperado || resultado.startsWith(esperado);
  if (ok) acertos++;
  console.log(\`\${ok ? '✅' : '❌'} \${pathname} [\${authToken || 'anon'}] → \${resultado}\`);
});
console.log(\`\\n\${acertos}/\${casos.length} casos corretos\`);`,
          validate: (output, code) => {
            const o = output;
            return (
              code.includes('simularMiddleware') &&
              code.includes('rotasPublicas') &&
              code.includes('rotasAdmin') &&
              o.includes('✅') &&
              parseInt((output.match(/(\d+)\/6 casos/) || ['','0'])[1]) >= 5
            );
          },
          validateMessage: 'Implemente simularMiddleware com as 3 verificações. Deve acertar pelo menos 5/6 casos.',
        },
        quiz: [
          { question: 'Qual a principal vantagem de usar Middleware para autenticação?', options: ['Middleware é mais rápido que Server Components', 'Protege rotas antes de qualquer renderização — uma vez, centralizado, sem repetição em cada página', 'Middleware roda no Edge e é mais barato', 'Middleware tem acesso ao banco de dados'], correct: 1, explanation: 'Middleware roda antes de qualquer Server Component. Se a request não passa no middleware, nenhum componente é renderizado — nem o layout. Uma única função protege todas as rotas que correspondem ao matcher.' },
          { question: 'O que é o Edge Runtime na Vercel?', options: ['Servidor dedicado para Edge cases', 'V8 isolates distribuídos globalmente — cold start <1ms mas sem APIs completas do Node.js', 'CDN para arquivos estáticos', 'Runtime para código legado'], correct: 1, explanation: 'Edge Runtime usa V8 isolates (mesma tecnologia do Chrome) rodando na rede de edge da Vercel — próximo ao usuário geograficamente. Cold start quase instantâneo, mas sem acesso a fs, crypto nativo ou alguns módulos Node.js.' },
          { question: 'NextAuth.js (Auth.js) gerencia autenticação no Next.js. O que o callback jwt faz?', options: ['Gera o token JWT', 'Permite adicionar campos customizados ao JWT — como role, permissions, userId', 'Valida a assinatura do token', 'Define o tempo de expiração'], correct: 1, explanation: 'O callback jwt é chamado quando o token é criado/atualizado. Você pode adicionar campos do banco de dados ao token: jwt({ token, user }) { if (user) token.role = user.role; return token; }. Isso evita queries ao banco em cada request.' },
        ],
      },
    },
  {
    id: 'mp-phase-8',
    title: '🛠️ Mini-Projeto: Blog com App Router',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase18,
    content: {
      sections: [{ type: 'text', content: 'Construa algo real aplicando o que aprendeu nesta fase.' }]
    }
  }  ],
};
