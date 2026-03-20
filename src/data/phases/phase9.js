import { miniProjectPhase9 } from '../miniprojects.js';
export const phase9 = {
  id: 'phase-13',
  title: 'Fullstack e Deploy',
  phase: 9,
  color: '#b794f4',
  icon: '🚀',
  description: 'Integre frontend e backend, entenda CORS, variáveis de ambiente e deploy profissional.',
  checklist: [
    'Conectar um frontend React a uma API Express',
    'Gerenciar variáveis de ambiente com .env',
    'Fazer deploy de um projeto Node.js (Render, Railway ou similar)',
    'Fazer deploy de um frontend React (Vercel ou Netlify)',
    'Entender CORS e como configurar corretamente',
    'Usar variáveis de ambiente diferentes para dev e produção',
  ],
  modules: [
  {
          id: 'mod-13-1',
          title: 'Integrando Frontend e Backend',
          duration: '50 min',
          xp: 250,
          content: {
            sections: [
              { type: 'text', content: 'Em um projeto fullstack, o frontend (React) consome a API do backend (Node.js). CORS, variáveis de ambiente e o fluxo de autenticação são os principais pontos de integração.' },
              { type: 'code', lang: 'javascript', content: '// ── CORS — Cross-Origin Resource Sharing ────\n// Backend: permitir que o frontend acesse a API\nconst cors = require("cors");\n\napp.use(cors({\n  origin: process.env.FRONTEND_URL || "http://localhost:5173",\n  credentials: true,    // permite cookies\n  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],\n  allowedHeaders: ["Content-Type", "Authorization"],\n}));\n\n// ── VARIÁVEIS DE AMBIENTE ─────────────────────\n// .env (NUNCA no git)\n// FRONTEND_URL=http://localhost:5173\n// DATABASE_URL=postgresql://...\n// JWT_SECRET=minha-chave-super-secreta\n// PORT=3000\n\n// ── FRONTEND — serviço de API centralizado ───\n// src/services/api.js\nconst API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";\n\nconst api = {\n  async get(path) {\n    const token = localStorage.getItem("token");\n    const res = await fetch(`${API_URL}${path}`, {\n      headers: { "Authorization": `Bearer ${token}` },\n    });\n    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n    return res.json();\n  },\n  \n  async post(path, body) {\n    const token = localStorage.getItem("token");\n    const res = await fetch(`${API_URL}${path}`, {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        "Authorization": `Bearer ${token}`,\n      },\n      body: JSON.stringify(body),\n    });\n    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n    return res.json();\n  },\n};\n\nexport default api;' },
              { type: 'code', lang: 'javascript', content: '// ── DEPLOY BÁSICO ────────────────────────────\n// Frontend → Vercel\n// 1. push para GitHub\n// 2. Vercel detecta e faz build automaticamente\n// 3. Configure env vars: VITE_API_URL=https://api.seuapp.com\n\n// Backend → Railway ou Render\n// 1. Conecte o repositório\n// 2. Configure: DATABASE_URL, JWT_SECRET, etc.\n// 3. Railway provisiona PostgreSQL grátis\n\n// Banco → Supabase ou Railway PostgreSQL\n// URL no formato: postgresql://user:pass@host:5432/dbname\n\n// ── DOCKER BASICS ─────────────────────────────\n// Dockerfile para Node.js\n/*\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "src/index.js"]\n*/\n\n// docker-compose.yml — desenvolvimento local\n/*\nservices:\n  api:\n    build: .\n    ports: ["3000:3000"]\n    environment:\n      DATABASE_URL: postgresql://postgres:senha@db:5432/app\n    depends_on: [db]\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: senha\n      POSTGRES_DB: app\n    volumes: [pgdata:/var/lib/postgresql/data]\n*/\n\nconsole.log("Stack de deploy: Vercel (frontend) + Railway (backend+db)");' },
              { type: 'highlight', content: '🌐 Stack de deploy gratuita para portfólio: Vercel (frontend React), Railway (backend Node + PostgreSQL), Supabase (alternativa ao Railway). Todos têm tier gratuito suficiente para projetos pessoais.' },
            ],
            exercise: {
              title: 'Configurando integração',
              description: 'Crie um serviço de API (objeto) em JavaScript que: centraliza a URL base, adiciona o token de autenticação automaticamente, tem métodos get/post/put/delete, e trata erros globalmente com mensagens adequadas.',
                            solutionHint: 'Frontend: baseURL da API em variável de ambiente. CORS no backend: origine do frontend. Autenticação: Authorization header com "Bearer " + token.',
starterCode: 'const API_BASE = "http://localhost:3000/api";\n\nconst api = {\n  // Método get(path) — retorna os dados\n  async get(path) {\n    const token = localStorage.getItem?.("token") ?? "demo-token";\n    // implemente\n  },\n  \n  // Método post(path, body)\n  async post(path, body) {\n    // implemente\n  },\n  \n  // Método delete(path)\n  async delete(path) {\n    // implemente\n  },\n};\n\n// Teste a estrutura (sem fetch real)\nconsole.log("Métodos disponíveis:", Object.keys(api).join(", "));\nconsole.log("URL base:", API_BASE);\nconsole.log("Token seria lido do localStorage");\nconsole.log("Serviço de API criado!");\n',
              solutionHint: 'headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }',
              validate: (output, code) => output.includes('get') && output.includes('post') && output.includes('delete'),
              validateMessage: 'Exiba os 3 métodos: get, post, delete.'
            },
            quiz: [
              { question: 'O que é CORS?', options: ['Um protocolo de segurança', 'Política do browser que bloqueia requests entre origens diferentes, a menos que o servidor permita', 'Um tipo de autenticação', 'Um header de compressão'], correct: 1, explanation: 'CORS: o browser bloqueia fetch de http://localhost:5173 para http://localhost:3000 por serem origens diferentes. O servidor precisa explicitamente permitir.' },
              { question: 'Como o frontend deve armazenar o token JWT?', options: ['localStorage — mais simples', 'cookie httpOnly — mais seguro (não acessível via JS)', 'sessionStorage', 'Não importa'], correct: 1, explanation: 'Cookie httpOnly é mais seguro — JavaScript não consegue acessar, prevenindo XSS. localStorage é vulnerável a XSS. Cookie: seguro mas precisa CSRF protection.' },
              { question: 'O que é uma variável de ambiente VITE_?', options: ['Variável do Node.js', 'Variável exposta ao código frontend pelo Vite (começa com VITE_)', 'Configuração de build', 'Variável de CSS'], correct: 1, explanation: 'Vite expõe ao frontend apenas variáveis que começam com VITE_. Acesso via import.meta.env.VITE_NOME. NUNCA coloque secrets aqui.' },
              { question: 'Por que usar Docker em desenvolvimento?', options: ['Para fazer deploy', 'Ambiente consistente — "funciona na minha máquina" igual ao de todos', 'É obrigatório', 'Para acelerar o código'], correct: 1, explanation: 'Docker garante que todos do time usam as mesmas versões de Node, PostgreSQL, Redis, etc. Elimina "funciona na minha máquina".' },
              { question: 'Qual plataforma é ideal para deploy gratuito de frontend React?', options: ['AWS EC2', 'Vercel ou Netlify', 'GitHub Pages apenas', 'Heroku'], correct: 1, explanation: 'Vercel (criadores do Next.js) e Netlify: deploy automático via GitHub, HTTPS, CDN global, tier gratuito generoso. Padrão para portfólios.' },
            ]
          }
        },
  {
          id: 'mod-13-2',
          title: 'Variáveis de Ambiente e Segredos',
          duration: '35 min',
          xp: 220,
          content: {
            sections: [
              { type: 'text', content: 'Variáveis de ambiente separam configuração de código. Senhas, chaves de API e URLs de banco nunca devem estar hardcoded no código — elas mudam entre ambientes (dev, staging, produção) e não podem vazar no Git.' },
              { type: 'code', lang: 'javascript', content: '// ── O PROBLEMA SEM ENV VARS ─────────────────\n// ❌ NUNCA faça isso:\nconst db = new Client({\n  connectionString: "postgresql://admin:senha123@prod.db.com:5432/app",\n});\nconst stripe = new Stripe("sk_live_SUA_CHAVE_AQUI");\n\n// ✅ A forma correta:\nconst db = new Client({\n  connectionString: process.env.DATABASE_URL,\n});\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY);\n\n// ── ARQUIVO .env (raiz do projeto) ────────────\n// DATABASE_URL=postgresql://localhost:5432/app_dev\n// JWT_SECRET=dev-secret-mude-em-producao\n// STRIPE_SECRET_KEY=sk_test_...\n// PORT=3000\n// NODE_ENV=development\n\n// ── CARREGANDO COM dotenv ─────────────────────\n// npm install dotenv\n// No início do index.js (ANTES de tudo):\nimport "dotenv/config";         // ESM\n// ou:\nrequire("dotenv").config();     // CommonJS\n\n// ── VALIDAÇÃO DE ENV VARS ─────────────────────\n// Falhe rápido se var obrigatória estiver faltando\nconst requiredEnvs = ["DATABASE_URL", "JWT_SECRET", "PORT"];\nfor (const key of requiredEnvs) {\n  if (!process.env[key]) {\n    throw new Error(`Variável de ambiente obrigatória faltando: ${key}`);\n  }\n}\nconsole.log("✅ Todas as variáveis de ambiente presentes");' },
              { type: 'code', lang: 'javascript', content: '// ── AMBIENTES: dev vs staging vs produção ────\n// .env               → desenvolvimento local (no .gitignore)\n// .env.example       → template no git (sem valores reais)\n// .env.test          → para testes automatizados\n\n// .env.example (ESTE vai no git, como documentação):\n// DATABASE_URL=postgresql://localhost:5432/nome_do_banco\n// JWT_SECRET=coloque-aqui-uma-string-aleatoria-longa\n// PORT=3000\n// STRIPE_SECRET_KEY=sk_test_sua_chave_aqui\n\n// ── CONFIGURAÇÃO TIPADA (melhor prática) ──────\n// src/config.js\nconst config = {\n  db: {\n    url:       process.env.DATABASE_URL,\n    poolSize:  Number(process.env.DB_POOL_SIZE) || 10,\n  },\n  jwt: {\n    secret:    process.env.JWT_SECRET,\n    expiresIn: process.env.JWT_EXPIRES_IN || "15m",\n  },\n  server: {\n    port:      Number(process.env.PORT) || 3000,\n    env:       process.env.NODE_ENV || "development",\n    isDev:     process.env.NODE_ENV !== "production",\n  },\n};\n\nexport default config;\n// Uso: import config from "./config.js"\n// config.jwt.secret — nunca process.env direto espalhado' },
              { type: 'highlight', content: '🔒 Regras de ouro: (1) .env sempre no .gitignore — sem exceção. (2) Mantenha um .env.example atualizado no git. (3) Em produção, configure vars na plataforma (Railway, Vercel), não em arquivo. (4) Use nomes descritivos: DATABASE_URL, não DB.' },
            ],
            exercise: {
              title: 'Validação de variáveis de ambiente',
              description: 'Implemente a função `validarEnvs(envObj, required)` que verifica se todas as variáveis obrigatórias estão presentes e não-vazias. Retorne um objeto `{ valido, faltando[] }`.',
                            solutionHint: 'Leia process.env.VARIAVEL. Se undefined, lance Error descritivo. Valide no startup da app, não quando for usar. Liste todas as vars obrigatórias.',
starterCode: `function validarEnvs(envObj, required) {
      // Verifique quais variáveis estão faltando ou vazias
      const faltando = required.filter(key => {
        // retorne true se a key estiver ausente OU vazia ('')
        return ______;
      });
  
      return {
        valido: ______,
        faltando,
      };
    }

    // Testes
    const envDev = {
      DATABASE_URL: 'postgresql://localhost:5432/dev',
      JWT_SECRET: 'dev-secret-abc',
      PORT: '3000',
    };

    const envIncompleto = {
      DATABASE_URL: 'postgresql://localhost:5432/dev',
      JWT_SECRET: '',        // vazia — deve falhar
      // PORT ausente        — deve falhar
    };

    const required = ['DATABASE_URL', 'JWT_SECRET', 'PORT'];

    const r1 = validarEnvs(envDev, required);
    console.log('Dev válido:', r1.valido);
    console.log('Faltando:', r1.faltando.length);

    const r2 = validarEnvs(envIncompleto, required);
    console.log('Incompleto válido:', r2.valido);
    console.log('Faltando:', r2.faltando.join(', '));`,
              solutionHint: '!envObj[key] ou envObj[key] === undefined || envObj[key] === "" | valido: faltando.length === 0',
              validate: (output, code) => {
                return output.includes('Dev válido: true') &&
                  output.includes('Faltando: 0') &&
                  output.includes('Incompleto válido: false') &&
                  (output.includes('JWT_SECRET') && output.includes('PORT'));
              },
              validateMessage: 'O env dev deve ser válido (0 faltando) e o incompleto deve falhar listando JWT_SECRET e PORT.',
            },
            quiz: [
              { question: 'Por que colocar .env no .gitignore?', options: ['Para economizar espaço', 'Para não expor senhas, chaves de API e credenciais no repositório público', 'É uma convenção apenas', 'Para deixar o git mais rápido'], correct: 1, explanation: 'Credenciais no git são permanentes — mesmo que você delete depois, ficam no histórico. É um dos maiores vetores de vazamento de dados.' },
              { question: 'Qual o propósito do arquivo .env.example?', options: ['Configuração de produção', 'Template documentando quais variáveis existem, sem valores reais — vai no git', 'Backup do .env', 'Usado em testes'], correct: 1, explanation: '.env.example mostra para outros devs quais variáveis configurar, sem expor valores sensíveis. É como uma "receita" do .env real.' },
              { question: 'Onde configurar variáveis de ambiente em produção (Vercel/Railway)?', options: ['Arquivo .env no servidor', 'Na interface da plataforma (dashboard), nunca em arquivo', 'No código diretamente', 'Em variáveis globais JavaScript'], correct: 1, explanation: 'Plataformas como Vercel, Railway e Heroku têm interface para configurar env vars com segurança — criptografadas, não em arquivo no filesystem.' },
              { question: 'O que deve acontecer se uma variável obrigatória estiver faltando ao iniciar o servidor?', options: ['Ignorar e continuar', 'Falhar imediatamente com mensagem clara de qual variável falta', 'Usar valor padrão sempre', 'Logar um warning'], correct: 1, explanation: 'Fail fast: é muito melhor falhar ao iniciar com mensagem clara do que ter erros crypticos em runtime quando o código tentar usar a variável undefined.' },
              { question: 'Como acessar variáveis de ambiente no frontend com Vite?', options: ['process.env.NOME', 'import.meta.env.VITE_NOME', 'window.env.NOME', 'env.NOME'], correct: 1, explanation: 'Vite usa import.meta.env. Apenas variáveis com prefixo VITE_ são expostas ao bundle — as outras ficam apenas no servidor de build.' },
            ]
          }
        },
  {
          id: 'mod-13-3',
          title: 'CI/CD e Deploy Automatizado',
          duration: '45 min',
          xp: 260,
          content: {
            sections: [
              { type: 'text', content: 'CI/CD (Continuous Integration / Continuous Deployment) automatiza o ciclo de testar, validar e publicar código. Em vez de "deployar na mão" — rodar scripts, copiar arquivos, rezar — o CI/CD faz tudo automaticamente a cada push.' },
              { type: 'code', lang: 'yaml', content: '# ── GITHUB ACTIONS — CI/CD gratuito ─────────\n# .github/workflows/ci.yml\n\nname: CI\n\non:\n  push:\n    branches: [main, develop]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    \n    steps:\n      - uses: actions/checkout@v4\n      \n      - name: Setup Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: "20"\n          cache: "npm"\n      \n      - name: Instalar dependências\n        run: npm ci\n      \n      - name: Verificar lint\n        run: npm run lint\n      \n      - name: Rodar testes\n        run: npm test\n      \n      - name: Build de produção\n        run: npm run build\n        env:\n          VITE_API_URL: ${{ secrets.VITE_API_URL }}' },
              { type: 'code', lang: 'yaml', content: '# ── DEPLOY AUTOMÁTICO PARA RAILWAY ──────────\n# .github/workflows/deploy.yml\n\nname: Deploy\n\non:\n  push:\n    branches: [main]  # só deploya quando chega na main\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    needs: [test]     # só deploya se os testes passaram!\n    \n    steps:\n      - uses: actions/checkout@v4\n      \n      - name: Deploy para Railway\n        uses: railwayapp/deploy-action@v1\n        with:\n          railway-token: ${{ secrets.RAILWAY_TOKEN }}\n          service: backend\n\n# ── SECRETS NO GITHUB ────────────────────────\n# Settings → Secrets and Variables → Actions\n# Adicione: RAILWAY_TOKEN, VITE_API_URL, etc.\n# No workflow: ${{ secrets.NOME_DO_SECRET }}\n# NUNCA coloque tokens diretamente no YAML!' },
              { type: 'code', lang: 'javascript', content: '// ── ESTRATÉGIA DE BRANCHES PARA CI/CD ───────\n//\n// main ──────────────────── PRODUÇÃO\n//   ↑ (PR aprovado + CI verde)\n// develop ───────────────── STAGING\n//   ↑ (PR de feature)\n// feature/xxx ─────────── desenvolvimento\n//\n// Fluxo completo:\n// 1. Cria feature/minha-feature a partir de develop\n// 2. Desenvolve, commita\n// 3. Abre PR: feature → develop\n// 4. CI roda: lint + testes + build\n// 5. Code review do time\n// 6. Merge em develop → deploy automático no staging\n// 7. QA valida no staging\n// 8. PR: develop → main → deploy automático em produção\n\n// ── package.json — scripts que o CI usa ──────\nconst scripts = {\n  "dev":     "vite",\n  "build":   "vite build",\n  "lint":    "eslint src --ext .js,.jsx --max-warnings 0",\n  "test":    "vitest run",\n  "test:ci": "vitest run --reporter=verbose",\n};\n\nconsole.log("CI/CD: cada push na main = deploy automático em produção");' },
              { type: 'highlight', content: '🚀 Pipeline mínimo para um projeto sério: (1) lint — garante estilo consistente, (2) testes — garante que nada quebrou, (3) build — garante que compila, (4) deploy — só executa se os 3 anteriores passaram. Esse fluxo elimina a classe inteira de "funcionava na minha máquina".' },
            ],
            exercise: {
              title: 'Simulando um pipeline CI',
              description: 'Implemente a função `executarPipeline(etapas)` que recebe um array de etapas, executa cada uma em ordem e para imediatamente se alguma falhar. Cada etapa é `{ nome, fn }` onde `fn()` retorna `true` (sucesso) ou `false` (falha).',
                            solutionHint: 'Pipeline: install -> lint -> test -> build -> deploy. Cada etapa valida a anterior. Se teste falha, não faz deploy. Use exit code não-zero para sinalizar falha.',
starterCode: `function executarPipeline(etapas) {
      const resultados = [];
  
      for (const etapa of etapas) {
        const sucesso = etapa.fn();
        resultados.push({ nome: etapa.nome, sucesso });
    
        if (!sucesso) {
          console.log(\`❌ Pipeline falhou em: \${etapa.nome}\`);
          console.log(\`   Etapas executadas: \${resultados.length}/\${etapas.length}\`);
          // Retorne um objeto com: ok, falhou, resultados
          return ______;
        }
    
        console.log(\`✅ \${etapa.nome}\`);
      }
  
      console.log(\`🚀 Pipeline completo! \${etapas.length} etapas com sucesso.\`);
      return ______;
    }

    // Pipeline 1: tudo passa
    const pipeline1 = [
      { nome: 'lint',   fn: () => true },
      { nome: 'testes', fn: () => true },
      { nome: 'build',  fn: () => true },
      { nome: 'deploy', fn: () => true },
    ];

    // Pipeline 2: testes falham (deploy não deve rodar)
    const pipeline2 = [
      { nome: 'lint',   fn: () => true },
      { nome: 'testes', fn: () => false },  // falha aqui
      { nome: 'build',  fn: () => true },
      { nome: 'deploy', fn: () => true },   // nunca deve executar
    ];

    const r1 = executarPipeline(pipeline1);
    console.log('Pipeline 1 ok:', r1.ok);

    console.log('---');
    const r2 = executarPipeline(pipeline2);
    console.log('Pipeline 2 ok:', r2.ok);
    console.log('Falhou em:', r2.falhou);`,
              solutionHint: 'return { ok: false, falhou: etapa.nome, resultados } | return { ok: true, falhou: null, resultados }',
              validate: (output, code) => {
                return output.includes('🚀 Pipeline completo') &&
                  output.includes('❌ Pipeline falhou em: testes') &&
                  output.includes('Pipeline 1 ok: true') &&
                  output.includes('Pipeline 2 ok: false') &&
                  output.includes('Falhou em: testes') &&
                  !output.includes('deploy') || output.indexOf('deploy') < output.indexOf('Pipeline 2 ok');
              },
              validateMessage: 'Pipeline 1 deve completar com sucesso. Pipeline 2 deve parar em "testes" e não rodar deploy.',
            },
            quiz: [
              { question: 'O que é Continuous Integration (CI)?', options: ['Deploy automático', 'Prática de integrar código frequentemente com validação automática (testes, lint, build)', 'Um serviço da AWS', 'Versionamento de código'], correct: 1, explanation: 'CI: devs integram código várias vezes ao dia. A cada integração, um pipeline roda automaticamente para detectar problemas cedo — não só no deploy.' },
              { question: 'Por que o job de deploy deve depender (needs) do job de testes?', options: ['Por convenção', 'Para garantir que só deploya código que passou em todos os testes', 'Para economizar tempo', 'Requisito do GitHub Actions'], correct: 1, explanation: 'Se você deploya antes de testar, um bug pode ir para produção. O deploy deve ser o último passo e só rodar se todos os anteriores passaram.' },
              { question: 'Onde ficam as chaves secretas (tokens) usadas em workflows do GitHub Actions?', options: ['Diretamente no YAML', 'Settings → Secrets and Variables → Actions', 'No .env do repositório', 'Em variáveis globais do GitHub'], correct: 1, explanation: 'GitHub Secrets: criptografados, não aparecem em logs, acessados via ${{ secrets.NOME }}. NUNCA coloque tokens no YAML — ficam visíveis no repositório.' },
              { question: 'O que faz `npm ci` vs `npm install`?', options: ['São idênticos', 'npm ci: instala exatamente do package-lock.json, mais rápido e deterministico — ideal para CI', 'npm ci é mais lento', 'npm install não funciona em CI'], correct: 1, explanation: 'npm ci: lê o package-lock.json exato, não atualiza versões, apaga node_modules antes. Garante reprodutibilidade — todos têm as mesmas versões.' },
              { question: 'O que é uma estratégia de branches com main + develop?', options: ['Ter duas cópias do código', 'main=produção estável, develop=integração de features — PR vai para develop, depois promote para main', 'Backup do código', 'Branches para cada desenvolvedor'], correct: 1, explanation: 'Git flow básico: feature → develop (staging/QA) → main (produção). Separa código validado (main) de código em integração (develop).' },
            ]
          }
        },

  ,{
    id: 'mod-13-4',
    title: 'Debugging: DevTools e Estratégias Reais',
    duration: '45 min',
    xp: 180,
    content: {
      sections: [
        { type: 'text', content: 'Debugging é a habilidade que mais separa devs iniciantes de experientes. Um iniciante passa 2 horas com console.log. Um dev experiente acha o bug em 5 minutos com DevTools. O erro não é ter bugs — é não saber onde procurar.' },
        { type: 'code', lang: 'javascript', content: '// DEVTOOLS: as 4 abas essenciais\n//\n// 1. CONSOLE: além do console.log\nconsole.table(arrayDeObjetos);   // visualiza arrays legível\nconsole.dir(elemento);           // inspeciona propriedades do DOM\nconsole.time(\'fetch\'); /* código */ console.timeEnd(\'fetch\'); // mede tempo\n\n// 2. SOURCES: breakpoints reais\n// Clique no número da linha → breakpoint azul\n// Quando o código chega lá, pausa e você vê o estado exato\n// Hover em variáveis para ver o valor atual\n// F10 = próxima linha, F11 = entra na função, Shift+F11 = sai\n\n// 3. NETWORK: inspecionar requisições\n// Filtre por XHR/Fetch para ver só chamadas de API\n// Status vermelho = erro (4xx, 5xx)\n// Clique na req → Preview mostra o JSON formatado\n\n// 4. debugger statement: breakpoint via código\nfunction bugada(dados) {\n  debugger; // pausa AQUI quando DevTools está aberto\n  return processar(dados);\n}\nconsole.log(\"breakpoint > console.log para debugging.\");' },
        { type: 'code', lang: 'javascript', content: '// LENDO ERROS: a habilidade mais ignorada\n//\n// TypeError: Cannot read properties of undefined (reading \'nome\')\n//            ↑ tipo do erro    ↑ o que falhou\n//\n// Stack trace (leia de cima para baixo):\n// at renderPerfil (Perfil.jsx:42)  ← seu código — comece aqui!\n// at processarUsuario (utils.js:18)\n// at App.jsx:95\n// at react-dom (node_modules/...)  ← ignore as linhas de node_modules\n\n// CAUSAS COMUNS:\n// TypeError: Cannot read property X of undefined\n//   → objeto ainda não carregou (dados.usuario?.nome)\n// ReferenceError: X is not defined\n//   → variável não declarada ou fora de escopo\n// SyntaxError: Unexpected token <\n//   → JSON.parse recebeu HTML (API retornou 404/500 como HTML)\n\n// DEBUGGING ESTRATÉGICO:\n// 1. Reproduza: qual input causa o bug?\n// 2. Isole: comente metade do código — bug persiste?\n// 3. Leia o erro COMPLETO até o final\n// 4. A primeira linha com SEU código no stack é onde procurar\nconsole.log(\"Leia o stack trace de cima para baixo, ignore node_modules.\");' },
        { type: 'common_error', title: 'Usar console.log em todo lugar em vez de breakpoints', wrong: 'function calcular(itens) {\n  console.log(\"itens:\", itens);\n  const sub = itens.reduce((s,i) => s+i.preco, 0);\n  console.log(\"sub:\", sub);\n  const desc = calcularDesconto(sub);\n  console.log(\"desc:\", desc);\n  return sub - desc;\n}\n// 30 console.logs espalhados — difícil de limpar depois', wrongLabel: 'console.log demais polui o código e é lento de remover.', right: 'function calcular(itens) {\n  debugger; // pausa aqui com DevTools aberto\n  const sub = itens.reduce((s,i) => s+i.preco, 0);\n  const desc = calcularDesconto(sub);\n  return sub - desc;\n}\n// Com breakpoint você vê TUDO em tempo real, sem modificar o código', rightLabel: 'debugger + DevTools: veja todo o estado sem poluir o código.', explanation: 'console.log é útil para logging permanente em produção. Para debugging em desenvolvimento, breakpoints são superiores: você vê todas as variáveis, o call stack completo — tudo sem tocar no código.' },
      ],
      exercise: {
        title: 'Identificar bugs por análise de stack trace',
        description: 'Para cada erro abaixo, identifique o tipo, onde está o problema e como corrigir. Implemente debugarErro(erro) retornando { tipo, onde, causa, fix }.',
        starterCode: `const erros = [
  { id: 1, msg: "TypeError: Cannot read properties of undefined (reading 'nome')", stack: ["at renderPerfil (Perfil.jsx:42)", "at App.jsx:95"] },
  { id: 2, msg: "ReferenceError: fetchDados is not defined", stack: ["at Dashboard.jsx:67"] },
  { id: 3, msg: "SyntaxError: Unexpected token '<'", stack: ["at JSON.parse (<anonymous>)"] },
];
function debugarErro(erro) {
  const tipo = erro.msg.split(':')[0];
  const onde = erro.stack[0];
  const causas = {
    TypeError: 'Objeto é null/undefined antes de acessar propriedade',
    ReferenceError: 'Variável não declarada ou fora de escopo',
    SyntaxError: 'JSON.parse recebeu HTML em vez de JSON (API retornou 404/500)',
  };
  const fixes = {
    TypeError: 'Usar optional chaining: objeto?.prop ou verificar se existe antes',
    ReferenceError: 'Declarar a variável ou importar a função corretamente',
    SyntaxError: 'Verificar se a API está retornando JSON válido (inspecionar Network tab)',
  };
  return { tipo, onde, causa: causas[tipo] || '?', fix: fixes[tipo] || '?' };
}
erros.forEach(e => {
  const a = debugarErro(e);
  console.log('Erro ' + e.id + ': ' + a.tipo);
  console.log('  Onde:', a.onde);
  console.log('  Causa:', a.causa);
});`,
        validate: (output, code) => {
          return code.includes('debugarErro') && output.includes('TypeError') && output.includes('ReferenceError') && output.includes('SyntaxError') && output.includes('Onde:');
        },
        validateMessage: 'Analise os 3 erros. Cada um deve ter tipo, onde e causa preenchidos.',
      },
      quiz: [
        { question: 'Qual a vantagem de breakpoints sobre console.log?', options: ['Não há diferença', 'Breakpoint pausa a execução e mostra todo o estado sem modificar o código', 'console.log é mais preciso', 'Breakpoints só funcionam em Node.js'], correct: 1, explanation: 'Breakpoints: pausam onde o bug acontece, mostram todas as variáveis em escopo, call stack completo, permitem executar expressões no contexto — sem adicionar uma linha de código.' },
        { question: 'Ao ler um stack trace, por onde começar?', options: ['Pela última linha', 'Pela primeira linha que contém SEU código (não node_modules)', 'Pelo número de linhas', 'Pela mensagem no final'], correct: 1, explanation: 'Ignore as linhas de node_modules/react/etc. A primeira linha com o caminho do SEU arquivo é onde o bug se manifestou.' },
        { question: 'O que significa "SyntaxError: Unexpected token" no JSON.parse?', options: ['O JavaScript tem erro de sintaxe', 'A string não é JSON válido — a API provavelmente retornou HTML (página de erro) em vez de JSON', 'O token de autenticação expirou', 'Há um erro de tipos'], correct: 1, explanation: 'Quando a API retorna 404 ou 500, o servidor frequentemente retorna HTML. JSON.parse não consegue parsear HTML e lança esse erro. Inspecione a aba Network para ver o que a API realmente retornou.' },
      ],
    },
  }
  ,{
    id: 'mod-13-5',
    title: 'Estado Global com Zustand',
    duration: '40 min',
    xp: 170,
    content: {
      sections: [
        { type: 'text', content: 'Context API funciona para estado simples. Em apps reais — carrinho, autenticação, dados em tempo real — Context gera re-renders desnecessários e código complexo. Zustand resolve isso em 3 linhas, sem Provider, sem boilerplate.' },
        { type: 'code', lang: 'javascript', content: '// ZUSTAND: store em 5 linhas\nimport { create } from \'zustand\';\n\nconst useCarrinho = create((set, get) => ({\n  itens: [],\n  total: 0,\n  adicionar: (p) => set(s => ({ itens: [...s.itens, p], total: s.total + p.preco })),\n  remover: (id) => set(s => {\n    const novos = s.itens.filter(i => i.id !== id);\n    return { itens: novos, total: novos.reduce((a, i) => a + i.preco, 0) };\n  }),\n  limpar: () => set({ itens: [], total: 0 }),\n}));\n\n// Sem Provider! Sem context wrapping! Só importe e use:\nfunction TotalCarrinho() {\n  // Seletor: só re-renderiza quando total muda\n  const total = useCarrinho(s => s.total);\n  return <span>Total: R${total.toFixed(2)}</span>;\n}\nfunction BotaoAdicionar({ produto }) {\n  const adicionar = useCarrinho(s => s.adicionar);\n  return <button onClick={() => adicionar(produto)}>Adicionar</button>;\n}\nconsole.log(\"Zustand: create() define estado + actions em um objeto.\");' },
        { type: 'code', lang: 'javascript', content: '// PERSISTÊNCIA AUTOMÁTICA (localStorage)\nimport { create } from \'zustand\';\nimport { persist } from \'zustand/middleware\';\n\nconst useAuth = create(\n  persist(\n    (set) => ({\n      usuario: null,\n      token: null,\n      login:  (u, t) => set({ usuario: u, token: t }),\n      logout: ()     => set({ usuario: null, token: null }),\n    }),\n    { name: \'auth-storage\' } // salva no localStorage automaticamente\n  )\n);\n\n// QUANDO USAR CADA UM:\n// Context API → tema, locale, dados que raramente mudam\n// Zustand     → carrinho, filtros, estado dinâmico, dados em tempo real\n//\n// Diferença principal: Context re-renderiza TODOS os consumidores\n// Zustand com seletor: só o componente que usa aquele dado específico\nconsole.log(\"persist middleware: localStorage em uma linha.\");' },
        { type: 'common_error', title: 'Context API para estado que muda frequentemente', wrong: 'const ContadorCtx = createContext();\nfunction Provider({ children }) {\n  const [count, setCount] = useState(0);\n  return (\n    <ContadorCtx.Provider value={{ count, setCount }}>\n      {children} // TODOS os filhos re-renderizam a cada incremento!\n    </ContadorCtx.Provider>\n  );\n}', wrongLabel: 'Context re-renderiza todos os consumidores — péssimo para estado que muda muito.', right: 'const useContador = create(set => ({\n  count: 0,\n  inc: () => set(s => ({ count: s.count + 1 })),\n}));\n// Só o componente que usa count re-renderiza\nfunction Contador() {\n  const { count, inc } = useContador();\n  return <button onClick={inc}>{count}</button>;\n}', rightLabel: 'Zustand: só re-renderiza o componente que assina o dado que mudou.', explanation: 'Context não tem granularidade de seletor — qualquer mudança re-renderiza todos. Zustand com seletores garante que o componente só re-renderiza quando EXATAMENTE o dado que ele usa muda.' },
      ],
      exercise: {
        title: 'Implementar padrão Zustand manualmente',
        description: 'Implemente criarStore(fn) que simula o padrão Zustand: recebe uma função que retorna o estado inicial com actions, e retorna um objeto com getState(), subscribe() e todas as actions.',
        starterCode: `function criarStore(fn) {
  let estado;
  const listeners = new Set();
  function set(upd) {
    const novo = typeof upd === 'function' ? upd(estado) : upd;
    estado = { ...estado, ...novo };
    listeners.forEach(l => l(estado));
  }
  function get() { return estado; }
  const actions = fn(set, get);
  estado = { ...actions };
  return { getState: () => estado, subscribe: (l) => { listeners.add(l); return () => listeners.delete(l); }, ...actions };
}
const useTarefas = criarStore((set, get) => ({
  tarefas: [],
  adicionar: (t) => set(s => ({ tarefas: [...s.tarefas, { id: Date.now(), texto: t, done: false }] })),
  concluir:  (id) => set(s => ({ tarefas: s.tarefas.map(t => t.id === id ? {...t, done: true} : t) })),
  remover:   (id) => set(s => ({ tarefas: s.tarefas.filter(t => t.id !== id) })),
  pendentes: ()   => get().tarefas.filter(t => !t.done).length,
}));
useTarefas.adicionar('Aprender Zustand');
useTarefas.adicionar('Construir projeto');
useTarefas.adicionar('Fazer deploy');
const id1 = useTarefas.getState().tarefas[0].id;
useTarefas.concluir(id1);
console.log('Total:', useTarefas.getState().tarefas.length);   // 3
console.log('Pendentes:', useTarefas.pendentes());              // 2
console.log('Concluída:', useTarefas.getState().tarefas[0].done); // true
useTarefas.remover(id1);
console.log('Após remover:', useTarefas.getState().tarefas.length); // 2`,
        validate: (output, code) => {
          return code.includes('criarStore') && output.includes('Total: 3') && output.includes('Pendentes: 2') && output.includes('Concluída: true') && output.includes('Após remover: 2');
        },
        validateMessage: 'Total: 3, Pendentes: 2, Concluída: true, Após remover: 2.',
      },
      quiz: [
        { question: 'Por que Zustand é preferível a Context para estado frequente?', options: ['É mais antigo', 'Seletores granulares: só o componente que usa o dado específico re-renderiza', 'Context foi deprecated', 'Zustand tem mais features'], correct: 1, explanation: 'Context re-renderiza TODOS os consumidores quando qualquer valor muda. Zustand com seletor (state => state.total) garante que só quem usa total re-renderiza quando total muda.' },
        { question: 'O que é um seletor no Zustand?', options: ['Uma query SQL', 'A função que define qual parte do estado o componente assina: useStore(state => state.count)', 'Um filtro de componentes', 'O nome da action'], correct: 1, explanation: 'Seletor: useStore(state => state.count). Diz ao Zustand: "este componente só quer saber quando count muda". Sem seletor: qualquer mudança no store causa re-render.' },
        { question: 'Quando usar Context vs Zustand?', options: ['Sempre Zustand', 'Context para dados estáticos (tema, locale). Zustand para estado dinâmico (carrinho, filtros)', 'Sempre Context', 'Depende do time'], correct: 1, explanation: 'Context: ótima para dados que raramente mudam (tema dark/light, idioma, usuário logado). Zustand: estado que muda com interações do usuário ou dados em tempo real.' },
      ],
    },
  }
,{
    id: 'mod-13-6',
    title: 'Bundle Analysis e Performance de Build',
    duration: '35 min',
    xp: 175,
    content: {
      sections: [
        { type: 'text', content: 'Bundle pesado = app lenta = usuários que saem. Análise de bundle é a habilidade de abrir o "raio-X" do seu JavaScript gerado, identificar o que está inflando o tamanho, e corrigir com tree shaking, code splitting ou substituição de dependências. Um bundle de 2MB pode virar 400kb com 2h de trabalho — diferença de 3s para 0.6s no carregamento.' },
        { type: 'code', lang: 'javascript', content: '// ── ANALISANDO O BUNDLE COM VITE ─────────────────────\n// npm install --save-dev rollup-plugin-visualizer\n\n// vite.config.js\nimport { defineConfig } from \'vite\';\nimport { visualizer } from \'rollup-plugin-visualizer\';\n\nexport default defineConfig({\n  plugins: [\n    visualizer({\n      open: true,          // abre no browser após build\n      filename: \'bundle-analysis.html\',\n      gzipSize: true,      // mostra tamanho comprimido\n      brotliSize: true,\n    }),\n  ],\n});\n// npm run build → abre mapa visual interativo\n\n// ── O QUE PROCURAR ────────────────────────────────────\n// 1. Bibliotecas gigantes importadas inteiras:\n//    moment.js (67kb gz) → use date-fns (tree-shakeable) ou Intl\n//    lodash (72kb gz)    → import individual: import debounce from \'lodash/debounce\'\n//    @mui/material       → importe só o componente: import Button from \'@mui/material/Button\'\n\n// 2. Duplicatas — mesma lib em versões diferentes\n//    npm ls react → deve ter apenas 1 versão\n\n// 3. Código que deveria ser lazy-loaded\n//    Página de admin carregada junto com home pública\n\n// ── TAMANHOS DE REFERÊNCIA (gzip) ─────────────────────\n// react + react-dom: ~45kb   ← ok, inevitável\n// TanStack Query:   ~13kb   ← ótimo\n// date-fns (full):  ~75kb   ← use só o que precisa\n// Lodash (full):    ~72kb   ← NUNCA importe o full\n// zod:              ~11kb   ← ótimo\n// chart.js:         ~60kb   ← pesado, avalie recharts (~60kb) ou victory (~110kb)' },
        { type: 'code', lang: 'javascript', content: '// ── CODE SPLITTING COM REACT.LAZY ───────────────────\nimport { lazy, Suspense } from \'react\';\n\n// Antes: tudo no bundle principal\n// import Admin from \'./pages/Admin\';\n// import Relatorios from \'./pages/Relatorios\';\n\n// Depois: carregado só quando o usuário navegar\nconst Admin     = lazy(() => import(\'./pages/Admin\'));\nconst Relatorios = lazy(() => import(\'./pages/Relatorios\'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<div>Carregando...</div>}>\n      <Routes>\n        <Route path="/" element={<Home />} />\n        <Route path="/admin" element={<Admin />} />        {/* chunk separado */}\n        <Route path="/relatorios" element={<Relatorios />} /> {/* chunk separado */}\n      </Routes>\n    </Suspense>\n  );\n}\n\n// ── IMPORT DINÂMICO CONDICIONAL ───────────────────────\n// Biblioteca pesada só em feature específica\nasync function exportarPDF(dados) {\n  const { jsPDF } = await import(\'jspdf\'); // carrega só quando usar\n  const doc = new jsPDF();\n  doc.text(\'Relatório\', 10, 10);\n  return doc.output(\'blob\');\n}\n\n// ── TREE SHAKING: import correto ──────────────────────\n// ❌ Importa TODA a biblioteca\nimport _ from \'lodash\';\nconst result = _.debounce(fn, 300);\n\n// ✅ Importa só a função (tree-shakeable)\nimport debounce from \'lodash/debounce\';\nconst result = debounce(fn, 300);\n\n// Ou melhor: use a versão ES modules\nimport { debounce } from \'lodash-es\'; // suporta tree shaking' },
        { type: 'highlight', content: '📊 Meta realistas de bundle: First Load JS < 150kb (gzip) para páginas críticas. Páginas subsequentes: lazy-loaded. Use o Lighthouse para medir: "Total Blocking Time" e "Largest Contentful Paint" são as métricas que mais impactam conversão. A cada 100ms a mais de carregamento, ~1% de conversão é perdida.' },
        {
          type: 'common_error',
          title: 'Importar biblioteca inteira quando só usa 1 função',
          wrong: 'import _ from \'lodash\';              // 72kb gzip — tudo\nimport * as dateFns from \'date-fns\'; // 75kb gzip — tudo\nimport moment from \'moment\';          // 67kb gzip + locales',
          wrongLabel: 'Importar o namespace inteiro inclui tudo no bundle — mesmo o que não usa.',
          right: 'import debounce from \'lodash/debounce\'; // ~2kb\nimport { format } from \'date-fns\';       // só format, ~3kb\n// Ou: use APIs nativas\nconst fmt = new Intl.DateTimeFormat(\'pt-BR\'); // 0kb extra',
          rightLabel: 'Import específico = tree shaking = só o código que você usa vai pro bundle.',
          explanation: 'Bundlers (Vite/webpack) só conseguem eliminar código morto (tree shaking) quando o módulo usa ES modules e você importa nomeadamente. Importações default do tipo "import _ from" carregam tudo.',
        },
      ],
      exercise: {
        title: 'Simular análise de bundle e otimizações',
        description: 'Implemente analyzeDeps(imports) que recebe uma lista de imports e retorna: tamanho total estimado, lista de problemas encontrados (import full de lodash/moment/etc), e sugestões de otimização. Use um mapa de tamanhos conhecidos.',
        solutionHint: 'Map de {nome: {size, treeshakeable, alternativa}}. Para cada import, verifique se é import default de lib pesada. Some tamanhos. Gere lista de sugestões.',
        starterCode: 'const BUNDLE_SIZES = {\n  \'lodash\':      { size: 72, treeshakeable: false, alt: \'lodash/funcao ou lodash-es\' },\n  \'moment\':      { size: 67, treeshakeable: false, alt: \'date-fns ou Intl\' },\n  \'date-fns\':    { size: 75, treeshakeable: true,  alt: null },\n  \'react\':       { size: 45, treeshakeable: false, alt: null },\n  \'axios\':       { size: 12, treeshakeable: false, alt: \'fetch nativo\' },\n  \'zod\':         { size: 11, treeshakeable: true,  alt: null },\n  \'react-dom\':   { size: 42, treeshakeable: false, alt: null },\n  \'@mui/material\':{size:300, treeshakeable: true,  alt: \'import individual: @mui/material/Button\' },\n  \'chart.js\':    { size: 60, treeshakeable: false, alt: \'recharts (menor e treeshakeable)\' },\n};\n\nfunction analyzeDeps(imports) {\n  let totalSize = 0;\n  const problemas = [];\n  const sugestoes = [];\n\n  for (const imp of imports) {\n    const info = BUNDLE_SIZES[imp];\n    if (!info) { console.log(\'Desconhecido:\', imp); continue; }\n    totalSize += info.size;\n    if (!info.treeshakeable && info.size > 20) {\n      problemas.push(imp + \' (\' + info.size + \'kb) — nao e tree-shakeable\');\n    }\n    if (info.alt) {\n      sugestoes.push(\'Troque \' + imp + \' por \' + info.alt);\n    }\n  }\n\n  return {\n    totalKb: totalSize,\n    status: totalSize < 150 ? \'OK\' : totalSize < 300 ? \'ATENCAO\' : \'CRITICO\',\n    problemas,\n    sugestoes,\n  };\n}\n\n// Testes\nconst resultado = analyzeDeps([\'react\', \'react-dom\', \'lodash\', \'moment\', \'zod\', \'axios\']);\nconsole.log(\'Total:\', resultado.totalKb + \'kb\');\nconsole.log(\'Status:\', resultado.status);\nconsole.log(\'Problemas:\', resultado.problemas.length);\nconsole.log(\'Sugestoes:\', resultado.sugestoes.length);\nconsole.log(resultado.sugestoes[0]);\n',
        validate: (output) => output.includes('Total:') && output.includes('CRITICO') && output.includes('Sugestoes:') && parseInt(output.match(/Total: (\d+)/)?.[1]) > 200,
        validateMessage: 'Exiba Total em kb (>200), Status CRITICO, número de problemas e sugestões.',
      },
      quiz: [
        { question: 'O que é tree shaking?', options: ['Remover arquivos não usados do projeto', 'Processo do bundler de eliminar código exportado mas nunca importado do bundle final', 'Técnica de lazy loading', 'Compressão de imagens'], correct: 1, explanation: 'Tree shaking analisa o grafo de imports ES modules e remove exports que nunca foram importados. Funciona com import nomeado (import { x } from lib) mas não com import default de CommonJS.' },
        { question: 'O que faz React.lazy()?', options: ['Renderiza componente mais devagar', 'Cria um componente que só carrega o código quando é renderizado pela primeira vez — chunk separado', 'Memoiza o componente', 'Adia updates de estado'], correct: 1, explanation: 'React.lazy(() => import(path)) cria um componente lazy. Ao ser renderizado pela primeira vez, o browser faz download do chunk. Até lá, o código não existe no bundle principal.' },
        { question: 'Qual o maior problema de "import _ from lodash"?', options: ['Sintaxe incorreta', 'Carrega os 72kb da lib inteira mesmo que você use apenas 1 função de 2kb', 'Não funciona com TypeScript', 'É mais lento que import nomeado'], correct: 1, explanation: 'Import default de lodash (CommonJS) não permite tree shaking — o bundler inclui tudo. Solução: import debounce from "lodash/debounce" ou usar lodash-es com import nomeado.' },
        { question: 'Como medir o impacto real do bundle no usuário?', options: ['Contar linhas de código', 'Lighthouse: mede LCP, TBT, e mostra oportunidades de redução de bundle com impacto em segundos', 'npm ls para listar dependências', 'console.time no carregamento'], correct: 1, explanation: 'Lighthouse quantifica: "Reduzir JavaScript não utilizado pode economizar 2.1s". Isso converte análise técnica em impacto de negócio — útil para justificar trabalho de performance.' },
        { question: 'Quando usar import dinâmico (dynamic import)?', options: ['Sempre, para melhor performance', 'Para features raramente usadas, páginas internas e bibliotecas pesadas que não são necessárias no carregamento inicial', 'Apenas em Node.js', 'Quando o módulo tem erros'], correct: 1, explanation: 'Dynamic import quebra o bundle em chunks. Use para: rotas de admin, funcionalidades por feature flag, libs pesadas (jspdf, xlsx) usadas em ações específicas. O carregamento inicial fica mais rápido.' },
      ],
    },
  }

  ,{
    id: 'mp-phase-13',
    title: '🛠️ Mini-Projeto: Deploy com CI/CD',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase9,
    content: {
      sections: [{ type: 'text', content: 'Construa algo real aplicando o que aprendeu nesta fase.' }]
    }
  }
  ]
};
