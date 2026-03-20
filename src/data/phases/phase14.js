import { miniProjectPhase14 } from '../miniprojects.js';
export const phase14 = {
  id: 'phase-15',
  title: 'Docker e Containers',
  phase: 15,
  color: '#2496ed',
  icon: '🐳',
  description: 'De zero a produção com containers. Docker, docker-compose, imagens otimizadas e deploy containerizado — o padrão da indústria para ambientes reproduzíveis.',
  checklist: [
    'Criar um Dockerfile funcional para uma aplicação Node.js',
    'Usar multi-stage build para reduzir o tamanho da imagem',
    'Rodar container sem privilégios de root',
    'Usar volumes para persistir dados do banco',
    'Configurar serviços com docker-compose',
    'Entender a diferença entre imagem e container',
    'Usar variáveis de ambiente seguras no container',
  ],
  modules: [
    {
      id: 'mod-15-1',
      title: 'O que são Containers e por que usar',
      duration: '35 min',
      xp: 180,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Containers resolvem o problema mais antigo do desenvolvimento: "funciona na minha máquina". Um container empacota o código junto com todas as dependências — Node.js, bibliotecas, configurações de sistema — em uma unidade portátil que roda identicamente em qualquer lugar. Docker é a plataforma que popularizou containers.',
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── CONTAINER vs MÁQUINA VIRTUAL ────────────────────\n#\n# Máquina Virtual (VM):\n#   Hardware físico\n#   └── Hypervisor (VMware, VirtualBox)\n#       ├── VM 1: SO completo (2GB) + app\n#       ├── VM 2: SO completo (2GB) + app\n#       └── VM 3: SO completo (2GB) + app\n#\n# Container:\n#   Hardware físico\n#   └── SO do host (Linux)\n#       └── Docker Engine\n#           ├── Container 1: apenas o app + dependências (50MB)\n#           ├── Container 2: apenas o app + dependências (80MB)\n#           └── Container 3: apenas o app + dependências (30MB)\n#\n# Containers compartilham o kernel do SO host\n# → muito mais leves, iniciam em segundos, não gigabytes\n\n# ── CONCEITOS FUNDAMENTAIS ───────────────────────────\n# Imagem: snapshot read-only com tudo para rodar o app\n#         Pense: "receita de bolo"\n# Container: instância em execução de uma imagem\n#            Pense: "bolo sendo assado"\n# Registry: repositório de imagens (Docker Hub, GitHub Container Registry)\n# Dockerfile: arquivo de instruções para construir uma imagem\n# docker-compose: ferramenta para orquestrar múltiplos containers\n\n# Primeiro contato\ndocker --version\ndocker run hello-world          # baixa e roda o container de teste\ndocker run -it ubuntu bash       # container Ubuntu interativo\ndocker run -d -p 80:80 nginx     # Nginx em background, porta 80',
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── COMANDOS ESSENCIAIS ──────────────────────────────\n\n# Imagens\ndocker images                           # lista imagens locais\ndocker pull node:20-alpine              # baixa imagem sem rodar\ndocker rmi node:20-alpine               # remove imagem\ndocker image prune                      # remove imagens não usadas\n\n# Containers\ndocker ps                               # containers em execução\ndocker ps -a                            # todos os containers (incluindo parados)\ndocker run nginx                        # cria e inicia um container\ndocker run -d nginx                     # em background (detached)\ndocker run -d -p 8080:80 nginx          # mapeia porta host:container\ndocker run -d --name meu-nginx nginx    # com nome personalizado\ndocker run -d -v $(pwd):/app node       # monta volume\n\ndocker stop meu-nginx                   # para graciosamente (SIGTERM)\ndocker kill meu-nginx                   # força parada (SIGKILL)\ndocker start meu-nginx                  # reinicia container parado\ndocker restart meu-nginx                # stop + start\ndocker rm meu-nginx                     # remove container parado\ndocker rm -f meu-nginx                  # força remoção mesmo em execução\n\n# Inspecionar\ndocker logs meu-nginx                   # ver logs\ndocker logs -f meu-nginx                # seguir logs em tempo real\ndocker exec -it meu-nginx bash          # abrir shell no container\ndocker inspect meu-nginx                # JSON com todos os detalhes\ndocker stats                            # uso de CPU/memória em tempo real',
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── VOLUMES: PERSISTÊNCIA DE DADOS ──────────────────\n# Containers são efêmeros — dados dentro deles somem ao parar\n# Volumes resolvem isso\n\n# Volume nomeado (gerenciado pelo Docker)\ndocker volume create pgdata\ndocker run -d \\\n  --name postgres \\\n  -e POSTGRES_PASSWORD=senha123 \\\n  -v pgdata:/var/lib/postgresql/data \\\n  postgres:16\n\n# Bind mount (pasta do host montada no container)\n# Excelente para desenvolvimento — edita no host, reflete no container\ndocker run -d \\\n  --name minha-api \\\n  -p 3000:3000 \\\n  -v $(pwd)/src:/app/src \\\n  minha-imagem\n\n# Listar e gerenciar volumes\ndocker volume ls\ndocker volume inspect pgdata\ndocker volume rm pgdata\ndocker volume prune          # remove volumes não usados\n\n# ── REDES ────────────────────────────────────────────\n# Containers na mesma rede se comunicam pelo nome\ndocker network create minha-rede\n\ndocker run -d --name postgres --network minha-rede postgres:16\ndocker run -d --name api --network minha-rede \\\n  -e DATABASE_URL=postgresql://postgres:senha@postgres:5432/app \\\n  minha-api\n# "postgres" no DATABASE_URL é o nome do container — funciona!\n\ndocker network ls\ndocker network inspect minha-rede',
          },
          {
            type: 'highlight',
            content: '🎯 O fluxo completo: (1) Escreve Dockerfile, (2) docker build cria a imagem, (3) docker run cria e inicia o container, (4) docker push envia para o registry. Em produção: o servidor baixa a imagem do registry e roda. Nunca mais "precisa instalar Node na máquina do servidor".',
          },
        ],
        exercise: {
          title: 'Mapear comandos Docker',
          description: 'Implemente a função dockerCmd(operacao, opcoes) que retorna o comando Docker correto para cada situação. Cubra: iniciar container com nome e porta, ver logs em tempo real, executar shell em container rodando, parar e remover container, e listar todos os containers.',
                    solutionHint: 'docker build -t nome:tag . | docker run -p hostPort:containerPort nome | docker ps (containers rodando) | docker stop id | docker rm id',
starterCode: 'function dockerCmd(operacao, opcoes = {}) {\n  const { nome, imagem, portaHost, portaContainer, seguir } = opcoes;\n  \n  switch (operacao) {\n    case "iniciar":\n      // docker run -d --name <nome> -p <portaHost>:<portaContainer> <imagem>\n      return ___;\n    \n    case "logs":\n      // Se seguir=true: docker logs -f <nome>\n      // Se seguir=false: docker logs <nome>\n      return ___;\n    \n    case "shell":\n      // docker exec -it <nome> bash\n      return ___;\n    \n    case "parar":\n      // docker stop <nome>\n      return ___;\n    \n    case "remover":\n      // docker rm -f <nome>\n      return ___;\n    \n    case "listar-todos":\n      // docker ps -a\n      return ___;\n    \n    default:\n      return "Operação desconhecida";\n  }\n}\n\n// Testes\nconsole.log(dockerCmd("iniciar", { nome: "minha-api", imagem: "node:20", portaHost: 3000, portaContainer: 3000 }));\nconsole.log(dockerCmd("logs", { nome: "minha-api", seguir: true }));\nconsole.log(dockerCmd("shell", { nome: "minha-api" }));\nconsole.log(dockerCmd("parar", { nome: "minha-api" }));\nconsole.log(dockerCmd("remover", { nome: "minha-api" }));\nconsole.log(dockerCmd("listar-todos"));\n',
          solutionHint: 'iniciar: `docker run -d --name ${nome} -p ${portaHost}:${portaContainer} ${imagem}` | logs: `docker logs ${seguir ? "-f " : ""}${nome}`',
          validate: (output, code) => {
            return output.includes('docker run -d --name minha-api') &&
              output.includes('docker logs -f minha-api') &&
              output.includes('docker exec -it minha-api bash') &&
              output.includes('docker stop minha-api') &&
              output.includes('docker ps -a');
          },
          validateMessage: 'Gere todos os 6 comandos Docker corretamente.',
        },
        quiz: [
          { question: 'Qual a principal diferença entre container e máquina virtual?', options: ['Containers são mais seguros', 'Containers compartilham o kernel do SO host — são mais leves e iniciam mais rápido que VMs com SO completo', 'VMs são mais modernas', 'Não há diferença prática'], correct: 1, explanation: 'VMs emulam hardware completo com SO próprio (GBs). Containers compartilham o kernel Linux do host e isolam apenas o processo e suas dependências (MBs). Isso torna containers muito mais rápidos de iniciar e eficientes.' },
          { question: 'Qual a diferença entre imagem Docker e container?', options: ['São sinônimos', 'Imagem é um template read-only; container é uma instância em execução da imagem', 'Container é mais pesado que imagem', 'Imagens só existem no Docker Hub'], correct: 1, explanation: 'Imagem: snapshot imutável com tudo necessário (como uma classe em OOP). Container: processo em execução baseado na imagem (como uma instância da classe). Você pode ter N containers da mesma imagem.' },
          { question: 'Para que servem volumes Docker?', options: ['Para acelerar o container', 'Para persistir dados além do ciclo de vida do container', 'Para compartilhar CPU entre containers', 'Para fazer backup automático'], correct: 1, explanation: 'Containers são efêmeros — dados escritos dentro somem quando o container é removido. Volumes montam uma pasta persistente: dados do PostgreSQL, uploads de usuários, etc. sobrevivem ao restart/remoção.' },
          { question: 'O que faz "docker run -p 8080:80"?', options: ['Limita o container a 80% da CPU', 'Mapeia porta 8080 do host para porta 80 dentro do container', 'Cria dois containers', 'Define prioridade de rede'], correct: 1, explanation: 'Formato: host:container. Requisições na porta 8080 do seu computador são redirecionadas para a porta 80 dentro do container. Sem -p, o container fica inacessível de fora.' },
          { question: 'Como containers na mesma rede Docker se comunicam?', options: ['Pelo endereço IP (muda a cada restart)', 'Pelo nome do container como hostname', 'Apenas pela porta localhost', 'Via arquivos compartilhados'], correct: 1, explanation: 'Docker DNS: containers na mesma rede usam o nome do container como hostname. DATABASE_URL=postgresql://postgres:5432/app — "postgres" resolve para o IP do container chamado "postgres".' },
        ],
      },
    },
    {
      id: 'mod-15-2',
      title: 'Dockerfile: Construindo Imagens',
      duration: '50 min',
      xp: 210,
      content: {
        sections: [
          {
            type: 'text',
            content: 'O Dockerfile é o código que define como sua imagem é construída — é infraestrutura como código. Cada instrução cria uma camada imutável. Entender o sistema de camadas é fundamental para criar imagens pequenas, seguras e que fazem bom uso do cache do build.',
          },
          {
            type: 'code',
            lang: 'dockerfile',
            content: '# ── DOCKERFILE BÁSICO PARA NODE.JS ──────────────────\n# Cada instrução = uma camada na imagem\n\nFROM node:20-alpine          # camada base: Alpine Linux + Node 20\n                             # alpine = imagem mínima (~5MB vs ~900MB do ubuntu)\n\nWORKDIR /app                 # define diretório de trabalho dentro do container\n\n# COPIE package*.json ANTES do código-fonte\n# Por quê? Cache de camadas: se o código mudar mas o package.json não,\n# Docker reutiliza a camada de npm install — muito mais rápido!\nCOPY package*.json ./\nRUN npm ci --only=production # ci = instalação determinística (usa package-lock)\n\n# Agora copia o código (camada que muda com frequência)\nCOPY . .\n\n# Variáveis disponíveis em tempo de build\nARG NODE_ENV=production\nENV NODE_ENV=$NODE_ENV\nENV PORT=3000\n\n# Documenta qual porta o app usa (não expõe automaticamente)\nEXPOSE 3000\n\n# Cria usuário não-root para segurança\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nUSER appuser\n\n# Processo principal do container\nCMD ["node", "src/index.js"]',
          },
          {
            type: 'code',
            lang: 'dockerfile',
            content: '# ── MULTI-STAGE BUILD — imagem de produção otimizada ─\n# Stage 1 (builder): instala tudo e compila\n# Stage 2 (runner): apenas o necessário para executar\n# Resultado: imagem final sem devDependencies, sem compiladores\n\n# ── Stage 1: Build ────────────────────────────────────\nFROM node:20-alpine AS builder\n\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci                   # instala TUDO incluindo devDependencies\n\nCOPY . .\nRUN npm run build            # TypeScript → JavaScript, Vite → dist/\n\n# ── Stage 2: Runner (imagem final) ────────────────────\nFROM node:20-alpine AS runner\n\nWORKDIR /app\n\n# Copia apenas o necessário do stage anterior\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY package*.json ./\n\n# Segurança: usuário não-root\nRUN addgroup -S app && adduser -S app -G app\nUSER app\n\nENV NODE_ENV=production\nEXPOSE 3000\nCMD ["node", "dist/index.js"]\n\n# Resultado: imagem sem TypeScript compiler, sem source maps, sem devDeps\n# Tamanho típico: 150MB → 50MB',
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── CONSTRUINDO E PUBLICANDO IMAGENS ─────────────────\n\n# Build básico\ndocker build -t minha-api:1.0 .\n#             ^tag             ^contexto (pasta atual)\n\n# Build com argumento\ndocker build --build-arg NODE_ENV=staging -t minha-api:staging .\n\n# Build multi-platform (para deploy em ARM, ex: AWS Graviton)\ndocker buildx build --platform linux/amd64,linux/arm64 -t minha-api:latest .\n\n# Ver camadas e tamanhos\ndocker history minha-api:1.0\ndocker image inspect minha-api:1.0\n\n# Publicar no Docker Hub\ndocker login\ndocker tag minha-api:1.0 usuario/minha-api:1.0\ndocker push usuario/minha-api:1.0\n\n# Publicar no GitHub Container Registry\ndocker tag minha-api:1.0 ghcr.io/usuario/minha-api:1.0\ndocker push ghcr.io/usuario/minha-api:1.0\n\n# ── .dockerignore — o que NÃO copiar ─────────────────\n# (crie na raiz do projeto, similar ao .gitignore)\ncat > .dockerignore << EOF\nnode_modules\n.git\n.env\n.env.*\ndist\n*.log\nREADME.md\n.github\ncoverage\nEOF\n# sem .dockerignore: node_modules (500MB) entraria no contexto de build!',
          },
          {
            type: 'code',
            lang: 'dockerfile',
            content: '# ── HEALTHCHECK — monitoramento do container ─────────\nFROM node:20-alpine\n\nWORKDIR /app\nCOPY --chown=node:node package*.json ./\nRUN npm ci --only=production\nCOPY --chown=node:node . .\n\nUSER node\nEXPOSE 3000\n\n# Verifica se o app está saudável a cada 30s\nHEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\\n  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1\n\nCMD ["node", "src/index.js"]\n\n# No Express, adicione a rota de health:\n# app.get("/health", (req, res) => res.json({ status: "ok", uptime: process.uptime() }))\n\n# ── MELHORES PRÁTICAS ─────────────────────────────────\n# 1. Use imagens Alpine (pequenas e seguras)\n# 2. Multi-stage para produção\n# 3. Copie package.json ANTES do código (cache de camadas)\n# 4. Use npm ci, não npm install (determinístico)\n# 5. Execute como usuário não-root\n# 6. Adicione .dockerignore\n# 7. Adicione HEALTHCHECK\n# 8. Um processo por container\n# 9. Use variáveis ENV para configuração\n# 10. Pin versões das imagens base (node:20.10-alpine, não node:latest)',
          },
          {
            type: 'highlight',
            content: '📦 Sistema de camadas: o Docker reutiliza camadas que não mudaram. Por isso a ordem importa: coloque o que muda menos (package.json, npm install) antes do que muda mais (código-fonte). Se você reorganizar: COPY package.json → RUN npm install → COPY . . cada build que só muda o código reutiliza a camada de npm install — de minutos para segundos.',
          },
        ,
                  {
                    type: 'common_error',
                    title: 'Rodar o container como root',
                    wrong: `# Dockerfile sem especificar usuário
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]
# Processo roda como root dentro do container!`,
                    wrongLabel: 'Root no container: se houver exploit, o atacante tem controle total.',
                    right: `FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Cria usuário sem privilégios
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["node", "server.js"]`,
                    rightLabel: 'USER não-root: princípio do menor privilégio — limite o dano possível.',
                    explanation: 'Containers que rodam como root são um risco de segurança. Se um atacante explorar a aplicação, ele herda os privilégios do processo. Sempre crie um usuário dedicado com USER no Dockerfile.',
                  }],
        exercise: {
          title: 'Analisar e otimizar Dockerfile',
          description: 'O Dockerfile abaixo tem 5 problemas de boas práticas. Implemente analisarDockerfile(linhas) que identifica cada problema e retorna um array de sugestões de melhoria.',
                    solutionHint: 'Multi-stage: builder para compilar, imagem final só com o necessário. .dockerignore exclui node_modules. Copie package.json antes do código para aproveitar o cache de layers.',
starterCode: 'const dockerfileProblematico = [\n  "FROM node:latest",                    // problema 1\n  "WORKDIR /app",\n  "COPY . .",                            // problema 2\n  "RUN npm install",                     // problema 3\n  "RUN npm run build",\n  "ENV NODE_ENV production",\n  "EXPOSE 3000",\n  // sem usuário não-root                 // problema 4\n  // sem .dockerignore mencionado         // problema 5\n  "CMD node src/index.js",               // CMD sem array\n];\n\nfunction analisarDockerfile(linhas) {\n  const problemas = [];\n  \n  // Verifique cada linha por anti-patterns:\n  // 1. "FROM node:latest" → versão não fixada\n  // 2. "COPY . ." antes do npm install → cache-busting desnecessário\n  //    (detecte: COPY . . aparece antes de RUN npm)\n  // 3. "RUN npm install" → usar npm ci\n  // 4. Sem linha USER → rodando como root\n  // 5. CMD sem array ["node", "..."] → forma exec preferida\n  \n  const temUser = linhas.some(l => l.startsWith("USER "));\n  if (!temUser) problemas.push("Sem USER: container roda como root — vulnerabilidade de segurança");\n  \n  // Implemente as outras 4 verificações\n  \n  return problemas;\n}\n\nconst problemas = analisarDockerfile(dockerfileProblematico);\nproblemas.forEach((p, i) => console.log(`${i+1}. ${p}`));\nconsole.log(`\\nTotal de problemas: ${problemas.length}`);\n',
          solutionHint: 'latest: linhas.some(l => l.includes(":latest")) | COPY antes do npm: índice de COPY . . < índice de RUN npm | npm install vs npm ci | CMD sem colchetes',
          validate: (output, code) => {
            const n = parseInt(output.match(/Total de problemas: (\d+)/)?.[1] || '0');
            return n >= 4 && output.includes('Total de problemas:');
          },
          validateMessage: 'Identifique pelo menos 4 dos 5 problemas no Dockerfile.',
        },
        quiz: [
          { question: 'Por que copiar package.json ANTES de copiar o código no Dockerfile?', options: ['Por convenção de estilo', 'Para aproveitar o cache de camadas: se o código mudar mas o package.json não, Docker reutiliza a camada do npm install', 'Porque o Docker exige essa ordem', 'Para reduzir o tamanho da imagem'], correct: 1, explanation: 'Camadas são reutilizadas se nenhuma instrução anterior mudou. COPY package.json → RUN npm install formam uma camada "estável". COPY . . (código) fica depois e invalida apenas a camada do código — npm install não roda de novo.' },
          { question: 'O que é um Multi-Stage Build?', options: ['Build em múltiplas máquinas', 'Dockerfile com vários estágios FROM — o final usa apenas o necessário, sem ferramentas de build', 'Build para múltiplas plataformas', 'Build com múltiplos processos'], correct: 1, explanation: 'Multi-stage: stage 1 (builder) tem TypeScript, testes, todas as devDependencies. Stage 2 (runner) copia apenas o código compilado e prodDependencies. Imagem final é muito menor e sem ferramentas de desenvolvimento.' },
          { question: 'Por que usar npm ci em vez de npm install no Dockerfile?', options: ['npm ci é mais rápido', 'npm ci instala exatamente o que está no package-lock.json — determinístico, sem surpresas em produção', 'npm ci usa menos memória', 'npm install não funciona em containers'], correct: 1, explanation: 'npm install pode atualizar o package-lock.json e instalar versões diferentes. npm ci sempre instala exatamente as versões do lock file — garante que produção tem exatamente o que foi testado.' },
          { question: 'O que faz USER no Dockerfile?', options: ['Define o usuário que acessa o Docker Hub', 'Define o usuário que executa os processos no container — evitar root aumenta segurança', 'Configura permissões de volume', 'Não tem efeito prático'], correct: 1, explanation: 'Por padrão, processos no container rodam como root. Se um atacante explorar uma vulnerabilidade, teria acesso root ao container. Com USER node (não-root), o dano é limitado.' },
          { question: 'Qual a diferença entre CMD ["node", "app.js"] e CMD node app.js?', options: ['São idênticos', 'Forma exec (array): processo é PID 1, recebe sinais. Forma shell: node é filho do shell, sinais podem não ser propagados', 'A forma shell é mais rápida', 'A forma array não funciona com argumentos'], correct: 1, explanation: 'CMD exec (array): node roda como PID 1 — recebe SIGTERM diretamente, graceful shutdown funciona. CMD shell: /bin/sh roda como PID 1 e node como filho — SIGTERM vai para o shell, não para o Node. Sempre use a forma array.' },
        ],
      },
    },
    {
      id: 'mod-15-3',
      title: 'Docker Compose: Múltiplos Serviços',
      duration: '55 min',
      xp: 230,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Aplicações reais têm múltiplos serviços: API, banco de dados, cache, fila de mensagens. Docker Compose orquestra todos com um único arquivo YAML e um único comando. É a ferramenta padrão para desenvolvimento local e pequenos deploys — substitui completamente o problema de "instalar PostgreSQL na máquina".',
          },
          {
            type: 'code',
            lang: 'yaml',
            content: '# ── docker-compose.yml — stack fullstack completa ────\nversion: "3.9"\n\nservices:\n  # ── PostgreSQL ──────────────────────────────────────\n  db:\n    image: postgres:16-alpine\n    container_name: app_postgres\n    restart: unless-stopped\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_USER: postgres\n      POSTGRES_PASSWORD: ${DB_PASSWORD:-senha123} # usa .env ou default\n    volumes:\n      - pgdata:/var/lib/postgresql/data     # dados persistentes\n      - ./init.sql:/docker-entrypoint-initdb.d/init.sql # seed inicial\n    ports:\n      - "5432:5432"   # expõe para o host (útil para pgAdmin local)\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U postgres"]\n      interval: 5s\n      timeout: 5s\n      retries: 5\n\n  # ── Redis ────────────────────────────────────────────\n  redis:\n    image: redis:7-alpine\n    container_name: app_redis\n    restart: unless-stopped\n    ports:\n      - "6379:6379"\n    healthcheck:\n      test: ["CMD", "redis-cli", "ping"]\n      interval: 5s\n      retries: 3\n\n  # ── API Backend ──────────────────────────────────────\n  api:\n    build:\n      context: ./backend\n      dockerfile: Dockerfile\n      target: development          # usa stage "development" do Dockerfile\n    container_name: app_api\n    restart: unless-stopped\n    ports:\n      - "3000:3000"\n    environment:\n      DATABASE_URL: postgresql://postgres:${DB_PASSWORD:-senha123}@db:5432/myapp\n      REDIS_URL: redis://redis:6379\n      JWT_SECRET: ${JWT_SECRET}\n      NODE_ENV: development\n    volumes:\n      - ./backend/src:/app/src     # hot reload em dev\n    depends_on:\n      db:\n        condition: service_healthy # espera o db estar saudável\n      redis:\n        condition: service_healthy\n\n  # ── Frontend ─────────────────────────────────────────\n  web:\n    build:\n      context: ./frontend\n    ports:\n      - "5173:5173"\n    environment:\n      VITE_API_URL: http://localhost:3000\n    volumes:\n      - ./frontend/src:/app/src    # hot reload\n    depends_on:\n      - api\n\nvolumes:\n  pgdata:                          # volume nomeado — persiste entre restarts',
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── COMANDOS COMPOSE ─────────────────────────────────\n\n# Iniciar tudo\ndocker compose up             # em foreground (ver logs)\ndocker compose up -d          # em background (detached)\ndocker compose up --build     # reconstrói imagens antes de subir\ndocker compose up api         # sobe apenas o serviço "api"\n\n# Parar\ndocker compose stop           # para sem remover\ndocker compose down           # para e remove containers\ndocker compose down -v        # também remove volumes (APAGA DADOS!)\n\n# Logs\ndocker compose logs           # todos os serviços\ndocker compose logs -f api    # seguir logs apenas da api\n\n# Executar comandos\ndocker compose exec api bash          # shell na api\ndocker compose exec db psql -U postgres # psql no banco\ndocker compose run --rm api npm test  # roda teste e remove container\n\n# Status\ndocker compose ps             # status de cada serviço\ndocker compose top            # processos rodando\n\n# Rebuild\ndocker compose build api      # reconstrói apenas a api\ndocker compose pull           # atualiza todas as imagens\n\n# ── MÚLTIPLOS ARQUIVOS (override) ────────────────────\n# docker-compose.yml           → base (compartilhada)\n# docker-compose.override.yml → dev (hot reload, portas expostas)\n# docker-compose.prod.yml     → prod (sem portas, réplicas)\n\ndocker compose -f docker-compose.yml -f docker-compose.prod.yml up -d',
          },
          {
            type: 'code',
            lang: 'yaml',
            content: '# ── COMPOSE PARA PRODUÇÃO ────────────────────────────\n# docker-compose.prod.yml\n\nversion: "3.9"\n\nservices:\n  api:\n    image: ghcr.io/usuario/minha-api:${VERSION:-latest}  # imagem do registry\n    restart: always\n    deploy:\n      replicas: 2                # 2 instâncias da API\n      resources:\n        limits:\n          cpus: "0.5"            # max 50% de um core\n          memory: 512M           # max 512MB\n        reservations:\n          memory: 128M\n    environment:\n      NODE_ENV: production\n      DATABASE_URL: ${DATABASE_URL}  # do .env de produção\n    logging:\n      driver: "json-file"\n      options:\n        max-size: "10m"          # rotação de log: máximo 10MB por arquivo\n        max-file: "3"            # mantém 3 arquivos\n\n  nginx:\n    image: nginx:alpine\n    ports:\n      - "80:80"\n      - "443:443"\n    volumes:\n      - ./nginx.conf:/etc/nginx/nginx.conf:ro\n      - ./ssl:/etc/nginx/ssl:ro\n    depends_on:\n      - api\n    # nginx como proxy reverso + SSL termination',
          },
          {
            type: 'highlight',
            content: '⚡ Fluxo de desenvolvimento com Compose: (1) git clone, (2) cp .env.example .env, (3) docker compose up — pronto. Qualquer dev do time tem o ambiente completo em 3 comandos, sem instalar PostgreSQL, Redis ou qualquer outra dependência na máquina. Isso é o que "reproducible environment" significa na prática.',
          },
        ],
        exercise: {
          title: 'Gerar configuração docker-compose',
          description: 'Implemente gerarCompose(servicos) que recebe um array de serviços e gera a estrutura de configuração docker-compose como objeto JavaScript. Cada serviço tem: nome, imagem, portas, variáveis de ambiente e dependências.',
                    solutionHint: 'services: define cada container. ports: "host:container". volumes: "./local:/container" para persistência. depends_on: ordem de inicialização. environment: variáveis.',
starterCode: 'function gerarCompose(servicos) {\n  // Gere um objeto com estrutura docker-compose válida:\n  // { version: "3.9", services: { [nome]: { image, ports, environment, depends_on } }, volumes: {} }\n  \n  const compose = {\n    version: "3.9",\n    services: {},\n    volumes: {},\n  };\n  \n  for (const servico of servicos) {\n    // Monte a configuração de cada serviço\n    // Se o serviço tem volumes, adicione à seção volumes do compose\n  }\n  \n  return compose;\n}\n\n// Teste\nconst meuStack = gerarCompose([\n  {\n    nome: "db",\n    imagem: "postgres:16-alpine",\n    portas: ["5432:5432"],\n    env: { POSTGRES_DB: "app", POSTGRES_PASSWORD: "senha" },\n    volume: "pgdata:/var/lib/postgresql/data",\n  },\n  {\n    nome: "api",\n    imagem: "minha-api:latest",\n    portas: ["3000:3000"],\n    env: { DATABASE_URL: "postgresql://postgres:senha@db:5432/app" },\n    dependeDe: ["db"],\n  },\n]);\n\nconsole.log("Serviços:", Object.keys(meuStack.services).join(", "));\nconsole.log("DB image:", meuStack.services.db.image);\nconsole.log("API depends_on:", meuStack.services.api.depends_on.join(", "));\nconsole.log("Volumes:", Object.keys(meuStack.volumes).join(", "));\n',
          solutionHint: 'Para cada serviço: compose.services[s.nome] = { image: s.imagem, ports: s.portas, environment: s.env, depends_on: s.dependeDe }; se tem volume: extraia nome e adicione em compose.volumes',
          validate: (output, code) => {
            return output.includes('Serviços: db, api') &&
              output.includes('DB image: postgres:16-alpine') &&
              output.includes('API depends_on: db') &&
              output.includes('Volumes: pgdata');
          },
          validateMessage: 'Gere a config com serviços db e api, depends_on correto e volume pgdata.',
        },
        quiz: [
          { question: 'O que faz "depends_on" com condition: service_healthy?', options: ['Para o serviço dependente', 'Aguarda o healthcheck do serviço dependido passar antes de iniciar', 'Verifica versão do serviço', 'Configura reinicialização automática'], correct: 1, explanation: 'depends_on: db com condition: service_healthy faz a API esperar o PostgreSQL estar realmente pronto (healthcheck passando) — não apenas iniciado. Sem isso, a API pode tentar conectar antes do banco aceitar conexões.' },
          { question: 'O que acontece com dados do PostgreSQL ao rodar "docker compose down -v"?', options: ['Dados são preservados no volume', 'Dados são permanentemente deletados — o volume é removido', 'Dados são exportados para backup', 'Os dados ficam no container parado'], correct: 1, explanation: '-v remove os volumes nomeados junto com os containers. docker compose down sem -v preserva os volumes (e os dados). Use -v apenas quando quiser um ambiente limpo do zero.' },
          { question: 'Como a API no docker-compose se conecta ao banco pelo nome "db"?', options: ['Via configuração manual de IP', 'Docker Compose cria uma rede interna onde serviços se comunicam pelo nome do serviço', 'Via arquivo /etc/hosts do container', 'Via variável de ambiente automática'], correct: 1, explanation: 'Compose cria automaticamente uma rede bridge onde todos os serviços se comunicam. O nome do serviço (db, redis) funciona como hostname DNS — Docker resolve para o IP interno do container.' },
          { question: 'Para que serve "restart: unless-stopped"?', options: ['Reinicia a cada mudança de código', 'Reinicia automaticamente em crash, mas não reinicia se o dev parou manualmente', 'Reinicia a cada 30 minutos', 'Impede reinicialização automática'], correct: 1, explanation: '"unless-stopped": reinicia em crash ou reboot do servidor, mas não reinicia se você executou docker compose stop explicitamente. Ideal para produção. "always": reinicia sempre, mesmo após docker stop.' },
          { question: 'O que é o arquivo docker-compose.override.yml?', options: ['Um arquivo de backup', 'Automaticamente mesclado com docker-compose.yml — usado para configurações locais de desenvolvimento sem modificar o arquivo base', 'Um arquivo obrigatório', 'Substitui completamente o docker-compose.yml'], correct: 1, explanation: 'Override é automaticamente aplicado por cima do base: database com porta exposta para localhost (dev), sem porta em prod. Permite ter configurações diferentes sem duplicar o arquivo inteiro.' },
        ],
      },
    },
    {
      id: 'mod-15-4',
      title: 'Docker em Desenvolvimento: Hot Reload e Debug',
      duration: '45 min',
      xp: 200,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Usar Docker em desenvolvimento resolve o "funciona na minha máquina" mas introduz um atrito: salvar um arquivo e ver a mudança imediatamente. Bind mounts + nodemon/Vite resolvem isso — você edita no host, o container vê as mudanças e reinicia automaticamente. Configurar isso corretamente é o que determina se a equipe vai abraçar ou rejeitar Docker no dia a dia.',
          },
          {
            type: 'code',
            lang: 'dockerfile',
            content: '# ── DOCKERFILE MULTI-STAGE: dev + prod ───────────────\n\n# ── Stage de desenvolvimento ──────────────────────────\nFROM node:20-alpine AS development\n\nWORKDIR /app\n\n# Instala todas as dependências (incluindo dev: nodemon, ts-node)\nCOPY package*.json ./\nRUN npm ci\n\n# NÃO copia o código — vai vir via bind mount\n# Isso garante que o Dockerfile é válido mesmo em dev\nCOPY . .\n\nEXPOSE 3000 9229   # 9229 = porta de debug do Node\n\n# nodemon: reinicia ao detectar mudanças\n# --inspect=0.0.0.0: debug acessível de fora do container\nCMD ["npx", "nodemon", "--inspect=0.0.0.0:9229", "src/index.js"]\n\n# ── Stage de produção ─────────────────────────────────\nFROM node:20-alpine AS production\n\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\n\nRUN addgroup -S app && adduser -S app -G app\nUSER app\nEXPOSE 3000\nCMD ["node", "src/index.js"]',
          },
          {
            type: 'code',
            lang: 'yaml',
            content: '# ── docker-compose.dev.yml — hot reload configurado ──\nversion: "3.9"\n\nservices:\n  api:\n    build:\n      context: .\n      target: development          # usa o stage "development"\n    ports:\n      - "3000:3000"\n      - "9229:9229"                # porta de debug\n    volumes:\n      # Bind mount: src do host → /app/src no container\n      # Mudanças no host são vistas imediatamente no container\n      - ./src:/app/src\n      - ./package.json:/app/package.json\n      # Volume anônimo para node_modules do container\n      # Evita que o node_modules do host sobrescreva o do container\n      - /app/node_modules\n    environment:\n      NODE_ENV: development\n      DATABASE_URL: postgresql://postgres:senha@db:5432/app\n    command: npx nodemon --watch src --ext js,ts,json src/index.js\n\n  # Frontend com Vite\n  web:\n    build:\n      context: ./frontend\n      target: development\n    ports:\n      - "5173:5173"\n    volumes:\n      - ./frontend/src:/app/src\n      - /app/node_modules\n    environment:\n      - CHOKIDAR_USEPOLLING=true   # necessário em alguns sistemas (WSL2, Mac)\n    command: npm run dev -- --host  # --host expõe além do localhost',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── CONFIGURANDO DEBUG DO NODE.JS EM CONTAINER ───────\n\n// No VS Code, .vscode/launch.json:\n/*\n{\n  "version": "0.2.0",\n  "configurations": [\n    {\n      "name": "Docker: Attach",\n      "type": "node",\n      "request": "attach",\n      "port": 9229,\n      "address": "localhost",\n      "localRoot": "${workspaceFolder}/src",\n      "remoteRoot": "/app/src",\n      "restart": true,\n      "sourceMaps": true\n    }\n  ]\n}\n*/\n\n// Depois: docker compose up, F5 no VS Code → debug conectado!\n// Breakpoints, watch, call stack — tudo funcionando no container\n\n// ── VARIÁVEIS DE AMBIENTE EM DESENVOLVIMENTO ──────────\n// .env.development (não commitar)\nconst exemplo = `\nNODE_ENV=development\nPORT=3000\nDATABASE_URL=postgresql://postgres:senha@localhost:5432/app\nREDIS_URL=redis://localhost:6379\nJWT_SECRET=dev-secret-nao-usar-em-prod\n`;\n\n// docker-compose passa automaticamente:\n// env_file:\n//   - .env.development\n\n// ── SCRIPT package.json para dev com docker ──────────\nconst scripts = {\n  "dev": "docker compose up",\n  "dev:build": "docker compose up --build",\n  "dev:down": "docker compose down",\n  "dev:logs": "docker compose logs -f api",\n  "dev:shell": "docker compose exec api sh",\n  "dev:db": "docker compose exec db psql -U postgres app",\n  "test": "docker compose run --rm api npm test",\n  "migrate": "docker compose run --rm api npx prisma migrate dev",\n};\n\nconsole.log("Scripts de desenvolvimento configurados!");',
          },
          {
            type: 'highlight',
            content: '🔧 Problema comum no Mac/Windows com bind mounts: o sistema de arquivos notifica mudanças de forma diferente, causando hot reload lento ou ausente. Solução: adicione CHOKIDAR_USEPOLLING=true para o Vite e --legacy-watch para o nodemon. Em WSL2 no Windows, mantenha os arquivos dentro do filesystem do WSL2 (/home/usuario/...) — nunca em /mnt/c/... — para performance adequada.',
          },
        ,
                  {
                    type: 'common_error',
                    title: 'COPY . . antes do npm install — invalida cache desnecessariamente',
                    wrong: `# Ordem errada — rebuilda node_modules sempre
FROM node:20
WORKDIR /app
COPY . .          # Copia TUDO, incluindo código-fonte
RUN npm install    # Reinstala tudo se qualquer arquivo mudar
CMD ["node", "server.js"]`,
                    wrongLabel: 'Qualquer mudança no código invalida o cache e reinstala todas as dependências.',
                    right: `# Ordem correta — aproveita cache do Docker
FROM node:20
WORKDIR /app
COPY package*.json ./   # 1. Só o manifesto
RUN npm ci              # 2. Instala — fica em cache!
COPY . .               # 3. Código-fonte por último
CMD ["node", "server.js"]`,
                    rightLabel: 'npm install fica em cache enquanto package.json não mudar — build muito mais rápido.',
                    explanation: 'O Docker reconstrói apenas as camadas que mudaram. Copiando package.json primeiro, o npm install fica cacheado e só roda quando as dependências mudam — não a cada mudança de código.',
                  }],
        exercise: {
          title: 'Configurar ambiente de desenvolvimento',
          description: 'Implemente configurarDevEnv(projeto) que valida e gera a configuração completa para desenvolvimento com Docker: verifica se os arquivos necessários existem, gera o comando de inicialização correto, e retorna um checklist de configuração.',
          starterCode: 'function configurarDevEnv(projeto) {\n  // projeto = { nome, temFrontend, temBanco, temRedis, porta }\n  const checklist = [];\n  const comandos = [];\n  const avisos = [];\n  \n  // 1. Arquivos obrigatórios\n  const arquivosNecessarios = ["Dockerfile", "docker-compose.yml", ".env.example"];\n  if (projeto.temFrontend) arquivosNecessarios.push("frontend/Dockerfile");\n  \n  arquivosNecessarios.forEach(f => {\n    checklist.push({ arquivo: f, status: "necessário" });\n  });\n  \n  // 2. Gere os serviços que precisam subir\n  const servicos = [];\n  if (projeto.temBanco) servicos.push("db");\n  if (projeto.temRedis) servicos.push("redis");\n  servicos.push("api");\n  if (projeto.temFrontend) servicos.push("web");\n  \n  // 3. Gere o comando docker compose\n  // docker compose up -d <serviços>\n  \n  // 4. Gere avisos importantes\n  // - lembrar de copiar .env.example para .env\n  // - adicionar node_modules ao .dockerignore\n  \n  return {\n    checklist,\n    comandoInicio: /* implemente */,\n    comandosUteis: {\n      logs: /* implemente */,\n      shell: `docker compose exec api sh`,\n      parar: `docker compose down`,\n    },\n    avisos,\n  };\n}\n\nconst config = configurarDevEnv({\n  nome: "meu-app",\n  temFrontend: true,\n  temBanco: true,\n  temRedis: false,\n  porta: 3000,\n});\n\nconsole.log("Arquivos necessários:", config.checklist.length);\nconsole.log("Comando de início:", config.comandoInicio);\nconsole.log("Ver logs:", config.comandosUteis.logs);\nconsole.log("Avisos:", config.avisos.length);\n',
          solutionHint: 'comandoInicio: `docker compose up -d ${servicos.join(" ")}` | logs: "docker compose logs -f" | avisos: ["Copie .env.example para .env", "Adicione node_modules ao .dockerignore"]',
          validate: (output, code) => {
            return output.includes('Arquivos necessários:') &&
              output.includes('docker compose up') &&
              output.includes('docker compose logs') &&
              output.includes('Avisos:');
          },
          validateMessage: 'Gere checklist de arquivos, comando de início com compose, logs e avisos.',
        },
        quiz: [
          { question: 'Por que usar "- /app/node_modules" como volume anônimo?', options: ['Para apagar o node_modules', 'Para evitar que o node_modules do host (vazio ou diferente) sobrescreva o do container', 'Para economizar espaço', 'Por convenção do Docker'], correct: 1, explanation: 'Bind mount de . → /app traz tudo do host, incluindo node_modules vazio (ou inexistente). O volume anônimo /app/node_modules "protege" o node_modules que npm ci instalou dentro do container — ele não é sobrescrito pelo bind mount.' },
          { question: 'Para que serve a porta 9229 no container de desenvolvimento?', options: ['Porta alternativa da API', 'Porta do debugger do Node.js — permite conectar VS Code ou Chrome DevTools ao processo dentro do container', 'Porta do banco de dados', 'Porta do hot reload'], correct: 1, explanation: '--inspect=0.0.0.0:9229 ativa o debugger protocol do V8 e o expõe em todas as interfaces (necessário para ser acessível de fora do container). Mapear -p 9229:9229 permite que o VS Code se conecte.' },
          { question: 'Quando é necessário CHOKIDAR_USEPOLLING=true?', options: ['Sempre', 'Em sistemas onde eventos de filesystem não funcionam corretamente (Mac com Vite, Windows WSL2)', 'Apenas em produção', 'Quando o projeto é grande'], correct: 1, explanation: 'Ferramentas de hot reload (Vite, nodemon) usam eventos do filesystem (inotify). Em containers no Mac (Docker Desktop) e Windows (WSL2), esses eventos às vezes não chegam — polling verifica ativamente a cada X ms.' },
          { question: 'Qual a diferença entre "docker compose run" e "docker compose exec"?', options: ['São idênticos', 'run cria um novo container temporário; exec executa em um container já em execução', 'exec é mais rápido', 'run não suporta comandos'], correct: 1, explanation: 'exec: conecta a um container em execução (docker compose exec api bash). run: cria um novo container do zero para rodar o comando e sai (docker compose run --rm api npm test). --rm remove o container após terminar.' },
          { question: 'Por que colocar arquivos do projeto dentro do WSL2 e não em /mnt/c/?', options: ['Por segurança', '/mnt/c é o filesystem NTFS do Windows — I/O cross-filesystem é muito lento. Dentro do WSL2 (/home/...) usa ext4 que é nativo e rápido', 'Por limitação do Docker', 'Por convenção'], correct: 1, explanation: 'Docker Desktop no Windows usa WSL2. Acessar /mnt/c/... requer tradução de filesystem (NTFS ↔ ext4) — muito lento para node_modules com milhares de arquivos. /home/usuario/... usa ext4 nativo — performance igual ao Linux.' },
        ],
      },
    },
    {
      id: 'mod-15-5',
      title: 'Docker em Produção e CI/CD',
      duration: '55 min',
      xp: 240,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Em produção, containers garantem que o código que passou nos testes é exatamente o código que roda no servidor — a mesma imagem, bit a bit. Integrar build de imagem Docker no CI/CD fecha o ciclo: commit → testes → imagem → deploy automático.',
          },
          {
            type: 'code',
            lang: 'yaml',
            content: '# ── GitHub Actions: CI/CD com Docker ─────────────────\n# .github/workflows/deploy.yml\n\nname: Build, Test e Deploy\n\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\nenv:\n  REGISTRY: ghcr.io\n  IMAGE_NAME: ${{ github.repository }}   # usuario/repo\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    services:\n      # Sobe banco de dados real para os testes de integração!\n      postgres:\n        image: postgres:16-alpine\n        env:\n          POSTGRES_DB: test\n          POSTGRES_PASSWORD: senha\n        options: >-\n          --health-cmd pg_isready\n          --health-interval 10s\n          --health-retries 5\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: "npm"\n      - run: npm ci\n      - run: npm test\n        env:\n          DATABASE_URL: postgresql://postgres:senha@localhost:5432/test\n\n  build-and-push:\n    needs: test                          # só roda se test passar\n    runs-on: ubuntu-latest\n    if: github.ref == \'refs/heads/main\'  # apenas na main\n    permissions:\n      contents: read\n      packages: write                    # permissão para o GHCR\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Login no GitHub Container Registry\n        uses: docker/login-action@v3\n        with:\n          registry: ${{ env.REGISTRY }}\n          username: ${{ github.actor }}\n          password: ${{ secrets.GITHUB_TOKEN }}\n\n      - name: Extrair metadata (tags, labels)\n        id: meta\n        uses: docker/metadata-action@v5\n        with:\n          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}\n          tags: |\n            type=sha,prefix=sha-        # ghcr.io/user/app:sha-abc1234\n            type=raw,value=latest       # ghcr.io/user/app:latest\n\n      - name: Build e Push\n        uses: docker/build-push-action@v5\n        with:\n          context: .\n          push: true\n          tags: ${{ steps.meta.outputs.tags }}\n          cache-from: type=gha          # cache do GitHub Actions\n          cache-to: type=gha,mode=max',
          },
          {
            type: 'code',
            lang: 'yaml',
            content: '# ── Deploy no servidor com a nova imagem ─────────────\n  deploy:\n    needs: build-and-push\n    runs-on: ubuntu-latest\n    steps:\n      - name: Deploy via SSH\n        uses: appleboy/ssh-action@v1\n        with:\n          host: ${{ secrets.SERVER_HOST }}\n          username: ${{ secrets.SERVER_USER }}\n          key: ${{ secrets.SSH_PRIVATE_KEY }}\n          script: |\n            # Baixa a nova imagem\n            docker pull ghcr.io/${{ github.repository }}:latest\n            \n            # Para o container atual\n            docker stop app_api || true\n            docker rm app_api || true\n            \n            # Sobe com a nova imagem\n            docker run -d \\\n              --name app_api \\\n              --restart unless-stopped \\\n              --network app-network \\\n              -p 3000:3000 \\\n              -e DATABASE_URL=$DATABASE_URL \\\n              -e JWT_SECRET=$JWT_SECRET \\\n              ghcr.io/${{ github.repository }}:latest\n            \n            # Verifica saúde\n            sleep 5\n            docker inspect --format=\'{{.State.Health.Status}}\' app_api',
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── SEGURANÇA EM CONTAINERS DE PRODUÇÃO ─────────────\n\n# 1. Scan de vulnerabilidades na imagem\ndocker scout cves minha-api:latest\nnpm audit --audit-level=high          # vulnerabilidades nas dependências\n\n# 2. Imagem minimal reduz superfície de ataque\n# Distroless: sem shell, sem package manager, sem utilitários\n# FROM gcr.io/distroless/nodejs20-debian12 AS runner\n# Sem bash, sem apt, sem curl — um atacante não tem ferramentas\n\n# 3. Secrets: nunca em variáveis de ambiente de imagem\n# ❌ Errado: ARG JWT_SECRET → fica no histórico da imagem!\n# ✅ Certo: variáveis de runtime via docker run -e ou docker secret\n\n# 4. Limitar recursos\ndocker run -d \\\n  --name api \\\n  --memory="512m" \\\n  --cpus="0.5" \\\n  --pids-limit=100 \\\n  --read-only \\\n  --tmpfs /tmp \\\n  minha-api\n\n# 5. Não compartilhar PID namespace com o host\n# docker run --pid=host  ← nunca faça isso em produção!\n\n# ── MONITORAMENTO ─────────────────────────────────────\n# Verificar saúde de todos os containers\ndocker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"\n\n# Logs estruturados (JSON) para agregação\n# No Node.js, use pino ou winston em modo JSON:\n# logger.info({ event: "request", path: "/api/users", ms: 45 })\n# docker logs api 2>&1 | jq .  ← parseia JSON dos logs\n\n# Limpeza periódica\ndocker system prune -f              # remove containers/imagens não usados\ndocker system prune -af             # inclui imagens não referenciadas',
          },
          {
            type: 'highlight',
            content: '🚀 O pipeline completo de produção: developer faz push → GitHub Actions roda testes (com banco real em container!) → se passou: build da imagem Docker com tag do commit SHA → push para GHCR → SSH no servidor → docker pull + docker run. O servidor nunca precisou ter Node instalado — apenas Docker. E você sabe exatamente qual versão está rodando pelo SHA do commit.',
          },
        ],
        exercise: {
          title: 'Simular pipeline de deploy',
          description: 'Implemente executarPipeline(commits) que simula um pipeline CI/CD. Para cada commit: (1) roda testes (falha aleatoriamente com 20% de chance), (2) se passou: constrói imagem com tag do SHA, (3) faz push para registry, (4) deploya no servidor. Mostre o status de cada etapa e retorne estatísticas.',
          starterCode: 'async function executarPipeline(commits) {\n  const delay = ms => new Promise(r => setTimeout(r, ms));\n  const resultados = [];\n  \n  for (const commit of commits) {\n    console.log(`\\n🔄 Pipeline para commit ${commit.sha.slice(0,7)}: "${commit.mensagem}"`);\n    const resultado = { sha: commit.sha, etapas: {}, sucesso: false };\n    \n    // Etapa 1: Testes\n    await delay(50);\n    const testesPassaram = Math.random() > 0.2; // 80% de sucesso\n    resultado.etapas.testes = testesPassaram ? "✅ passou" : "❌ falhou";\n    console.log(`  Testes: ${resultado.etapas.testes}`);\n    \n    if (!testesPassaram) {\n      resultados.push(resultado);\n      continue; // para o pipeline neste commit\n    }\n    \n    // Etapa 2: Build da imagem\n    // tag = ghcr.io/usuario/app:sha-<primeiros 7 chars do SHA>\n    \n    // Etapa 3: Push para registry\n    \n    // Etapa 4: Deploy (apenas se for branch main)\n    // commit.branch === "main"\n    \n    resultado.sucesso = true;\n    resultados.push(resultado);\n  }\n  \n  // Retorne estatísticas\n  return {\n    total: resultados.length,\n    sucesso: resultados.filter(r => r.sucesso).length,\n    falha: resultados.filter(r => !r.sucesso).length,\n    deployados: resultados.filter(r => r.etapas.deploy).length,\n  };\n}\n\n// Teste\nconst commits = [\n  { sha: "abc1234def", mensagem: "feat: add user auth", branch: "main" },\n  { sha: "def5678abc", mensagem: "fix: cors error", branch: "feature/fix" },\n  { sha: "ghi9012jkl", mensagem: "chore: update deps", branch: "main" },\n];\n\nexecutarPipeline(commits).then(stats => {\n  console.log("\\n📊 Estatísticas:");\n  console.log(`Total: ${stats.total}`);\n  console.log(`Sucesso: ${stats.sucesso}`);\n  console.log(`Falha: ${stats.falha}`);\n  console.log(`Deployados: ${stats.deployados}`);\n});\n',
          solutionHint: 'tag = `ghcr.io/usuario/app:sha-${commit.sha.slice(0,7)}` | push: resultado.etapas.push = "✅ ghcr.io/..." | deploy: apenas se commit.branch === "main"',
          validate: (output, code) => {
            return output.includes('Pipeline para commit') &&
              output.includes('Testes:') &&
              output.includes('Total:') &&
              output.includes('Deployados:');
          },
          validateMessage: 'Execute o pipeline mostrando cada etapa e retorne as estatísticas finais.',
        },
        quiz: [
          { question: 'Por que usar a tag SHA do commit em vez de "latest" na imagem?', options: ['SHA é mais curto', 'SHA é imutável — você sabe exatamente qual código está em produção e pode fazer rollback para qualquer versão anterior', 'latest não funciona em produção', 'SHA é mais seguro'], correct: 1, explanation: '"latest" muda a cada build — você não sabe qual código está rodando. SHA-tag é imutável: sha-abc1234 sempre é aquele commit específico. Rollback = trocar para sha-anterior. Rastreabilidade total.' },
          { question: 'Por que nunca usar ARG para secrets no Dockerfile?', options: ['ARG é muito lento', 'ARGs ficam armazenados no histórico da imagem — qualquer um com acesso à imagem pode ver os secrets com "docker history"', 'ARG não funciona com secrets', 'É apenas uma convenção'], correct: 1, explanation: 'docker history mostra todas as camadas e os valores de ARG usados. Secrets como JWT_SECRET, DB_PASSWORD colocados via ARG ficam visíveis para qualquer pessoa com acesso à imagem. Use variáveis de runtime (-e ou --env-file).' },
          { question: 'O que significa "cache-from: type=gha" no build action?', options: ['Usa cache do GitHub Artifacts', 'Usa o cache do GitHub Actions para reutilizar camadas Docker entre builds — drasticamente mais rápido', 'Desativa o cache', 'Limita o uso de CPU'], correct: 1, explanation: 'GitHub Actions Cache armazena as camadas Docker entre execuções. Um build que só mudou o código-fonte reutiliza a camada de npm install do cache — de 3 minutos para 30 segundos.' },
          { question: 'Por que rodar o banco de dados como "service" no GitHub Actions?', options: ['Para testar a configuração do banco', 'Para testes de integração com banco real — mais confiável que mocks que podem não reproduzir comportamento real', 'Para testar o Dockerfile', 'É obrigatório pelo GitHub Actions'], correct: 1, explanation: 'Services em GHA sobem containers durante o job. Testes de integração contra banco real detectam problemas que mocks não detectariam: queries lentas, problemas de transação, tipos de dado incorretos.' },
          { question: 'O que é uma imagem "distroless"?', options: ['Uma imagem sem Docker', 'Uma imagem sem sistema operacional completo — sem shell, sem package manager, apenas runtime e app', 'Uma imagem comprimida', 'Uma imagem sem variáveis de ambiente'], correct: 1, explanation: 'Distroless (Google): contém apenas o runtime necessário (Node.js) e o app. Sem bash, sem apt, sem curl — reduz drasticamente a superfície de ataque. Um atacante que comprometer o processo não tem ferramentas para se mover lateralmente.' },
        ],
      },
    },
  {
    id: 'mp-phase-15',
    title: '🛠️ Mini-Projeto: App Dockerizado',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase14,
    content: {
      sections: [{ type: 'text', content: 'Construa algo real aplicando o que aprendeu nesta fase.' }]
    }
  }  ],
};
