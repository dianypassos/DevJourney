import { miniProjectPhase8 } from '../miniprojects.js';
export const phase8 = {
  id: 'phase-10',
  title: 'Backend com Node.js',
  phase: 8,
  color: '#68d391',
  icon: '🖧',
  description: 'Crie APIs REST profissionais com Node.js, Express e bancos de dados.',
  checklist: [
    'Criar um servidor Express com rotas GET, POST, PUT e DELETE',
    'Usar middleware (body-parser, cors, autenticação)',
    'Tratar erros em async routes com try/catch e next(err)',
    'Validar dados de entrada antes de processar',
    'Implementar autenticação básica com JWT',
    'Entender a diferença entre 200, 201, 400, 401, 403 e 404',
    'Organizar código em controllers, services e routers',
  ],
  modules: [
  {
          id: 'mod-9-1',
          title: 'Node.js e Express',
          duration: '50 min',
          xp: 200,
          content: {
            sections: [
              { type: 'text', content: 'Node.js é um runtime JavaScript no servidor. Express é o framework HTTP mais popular — minimalista e extensível. Juntos formam a base da maioria das APIs JavaScript/TypeScript no mercado.' },
              { type: 'code', lang: 'javascript', content: '// ── ESTRUTURA DE PROJETO EXPRESS ─────────────\n// src/\n//   index.js          — entry point\n//   routes/           — rotas agrupadas\n//   controllers/      — lógica de cada endpoint\n//   middlewares/      — funções intermediárias\n//   services/         — lógica de negócio\n//   models/           — acesso ao banco\n\n// index.js\nconst express = require("express");\nconst cors = require("cors");\nconst helmet = require("helmet");\n\nconst app = express();\n\n// Middlewares globais\napp.use(helmet());           // headers de segurança\napp.use(cors());             // permite requests cross-origin\napp.use(express.json());     // parseia body JSON\napp.use(express.urlencoded({ extended: true })); // parseia form data\n\n// Logging (desenvolvimento)\napp.use((req, res, next) => {\n  console.log(`${req.method} ${req.path}`);\n  next();\n});\n\n// Rotas\napp.use("/api/usuarios", require("./routes/usuarios"));\napp.use("/api/produtos", require("./routes/produtos"));\n\n// Handler de 404\napp.use((req, res) => res.status(404).json({ erro: "Rota não encontrada" }));\n\n// Handler de erros\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(err.status || 500).json({ erro: err.message });\n});\n\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));' },
              { type: 'code', lang: 'javascript', content: '// routes/usuarios.js\nconst router = require("express").Router();\nconst { listar, buscar, criar, atualizar, deletar } = require("../controllers/usuarios");\nconst { autenticar, validar } = require("../middlewares");\nconst { usuarioSchema } = require("../validators");\n\n// CRUD completo — padrão REST\nrouter.get("/", listar);                      // GET /api/usuarios\nrouter.get("/:id", buscar);                   // GET /api/usuarios/:id\nrouter.post("/", validar(usuarioSchema), criar); // POST /api/usuarios\nrouter.put("/:id", autenticar, atualizar);    // PUT /api/usuarios/:id\nrouter.delete("/:id", autenticar, deletar);   // DELETE /api/usuarios/:id\n\nmodule.exports = router;\n\n// controllers/usuarios.js\nasync function listar(req, res, next) {\n  try {\n    const { pagina = 1, limite = 20, busca } = req.query;\n    const usuarios = await UsuarioService.listar({ pagina, limite, busca });\n    res.json({ dados: usuarios, pagina, limite });\n  } catch (erro) {\n    next(erro); // passa para o error handler\n  }\n}\n\nasync function criar(req, res, next) {\n  try {\n    const usuario = await UsuarioService.criar(req.body);\n    res.status(201).json(usuario);\n  } catch (erro) {\n    if (erro.code === "P2002") { // violação de unique no Prisma\n      return res.status(409).json({ erro: "Email já cadastrado" });\n    }\n    next(erro);\n  }\n}' },
              { type: 'highlight', content: '🏗️ Sempre separe: routes (mapeamento de endpoints), controllers (lida com req/res), services (lógica de negócio), models (banco de dados). Isso é a arquitetura em camadas — padrão em empresas.' },
            ,
                  {
                    type: 'common_error',
                    title: 'Não usar async/await corretamente em rotas Express',
                    wrong: `app.get("/usuarios", async (req, res) => {
  const usuarios = await db.query("SELECT * FROM users");
  res.json(usuarios);
  // Se db.query() rejeitar: UnhandledPromiseRejection!
  // O Express não captura erros de Promises automaticamente
});`,
                    wrongLabel: 'Erros em async route handlers não são capturados pelo Express por padrão.',
                    right: `app.get("/usuarios", async (req, res, next) => {
  try {
    const usuarios = await db.query("SELECT * FROM users");
    res.json(usuarios);
  } catch (err) {
    next(err); // Passa para o error handler do Express
  }
});`,
                    rightLabel: 'Sempre use try/catch em async routes e passe erros para next(err).',
                    explanation: 'Antes do Express 5, erros em async functions não chegavam ao error handler global. A solução: try/catch + next(err), ou usar um wrapper como express-async-errors que faz isso automaticamente.',
                  }],
            exercise: {
              title: 'Estrutura de uma API REST',
              description: 'Documente (em comentários e console.logs) os endpoints REST completos para um recurso "Produto" com CRUD. Para cada endpoint, especifique: método HTTP, URL, body/params esperados, e status de resposta.',
                            solutionHint: 'Express: app.get/post/put/delete(rota, handler). handler recebe (req, res). res.json(dados) responde JSON. res.status(404).json({erro}) para erros.',
starterCode: '// API REST para Produtos\n// Documente cada endpoint:\n\n// 1. Listar todos os produtos (com paginação)\nconsole.log("GET /api/produtos?pagina=1&limite=20 → 200 OK");\n\n// 2. Buscar produto por ID\n\n// 3. Criar novo produto\n\n// 4. Atualizar produto\n\n// 5. Deletar produto\n\n// 6. Buscar produtos por categoria\n\nconsole.log("\\nStatus codes usados:");\nconsole.log("200 OK, 201 Created, 400 Bad Request, 404 Not Found, 409 Conflict, 500 Server Error");\n',
              solutionHint: 'GET /id → 200|404, POST → 201|400, PUT /id → 200|404, DELETE /id → 204|404',
              validate: (output, code) => output.includes('200') && output.includes('201') && output.includes('404'),
              validateMessage: 'Exiba os status codes 200, 201 e 404.'
            },
            quiz: [
              { question: 'O que é um middleware no Express?', options: ['Uma rota especial', 'Função com (req, res, next) que processa a requisição antes de chegar à rota final', 'O arquivo principal', 'Um banco de dados em memória'], correct: 1, explanation: 'Middleware tem acesso a req, res e next(). Pode modificar a requisição, verificar autenticação, fazer logging, etc.' },
              { question: 'Qual status HTTP para recurso criado com sucesso?', options: ['200', '201', '204', '202'], correct: 1, explanation: '201 Created é retornado para POST bem-sucedido que criou um recurso. 200 é para operações de leitura ou atualizações.' },
              { question: 'Por que usar next(erro) no catch do controller?', options: ['Para criar um novo erro', 'Para passar o erro ao error handler centralizado do Express', 'Para reiniciar a requisição', 'Para logar no console'], correct: 1, explanation: 'next(err) passa o erro para o middleware de tratamento de erros (4 parâmetros: err, req, res, next). Centraliza o tratamento.' },
              { question: 'O que faz helmet() no Express?', options: ['Adiciona autenticação', 'Define headers HTTP de segurança (CSP, HSTS, etc.)', 'Comprime as respostas', 'Parseia o body'], correct: 1, explanation: 'Helmet define headers de segurança como Content-Security-Policy, X-Frame-Options, Strict-Transport-Security. Deve estar em todo projeto.' },
              { question: 'Qual a diferença entre PUT e PATCH?', options: ['São idênticos', 'PUT substitui o recurso inteiro; PATCH atualiza parcialmente', 'PATCH cria, PUT atualiza', 'PUT é mais seguro'], correct: 1, explanation: 'PUT: envia o recurso completo (substitui). PATCH: envia apenas os campos a atualizar. PATCH é mais eficiente para atualizações parciais.' },
            ]
          }
        },
  {
          id: 'mod-9-2',
          title: 'Bancos de Dados e ORM',
          duration: '55 min',
          xp: 220,
          content: {
            sections: [
              { type: 'text', content: 'Aplicações precisam persistir dados. SQL (PostgreSQL, MySQL) para dados estruturados com relacionamentos. NoSQL (MongoDB) para dados flexíveis e hierárquicos. ORMs como Prisma abstraem o SQL.' },
              { type: 'code', lang: 'javascript', content: '// ── PRISMA (ORM moderno para Node.js) ──────────\n// schema.prisma\n/*\ngenerator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nmodel Usuario {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  nome      String\n  senha     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  posts     Post[]\n}\n\nmodel Post {\n  id        Int      @id @default(autoincrement())\n  titulo    String\n  conteudo  String?\n  publicado Boolean  @default(false)\n  autor     Usuario  @relation(fields: [autorId], references: [id])\n  autorId   Int\n}\n*/\n\n// Uso do Prisma Client\nconst { PrismaClient } = require("@prisma/client");\nconst prisma = new PrismaClient();\n\n// Buscar com relações\nconst usuario = await prisma.usuario.findUnique({\n  where: { email: "ana@email.com" },\n  include: { posts: { where: { publicado: true } } },\n});\n\n// Criar\nconst novoPost = await prisma.post.create({\n  data: {\n    titulo: "Meu Post",\n    conteudo: "Conteúdo...",\n    autor: { connect: { id: 1 } },\n  },\n});\n\n// Transação\nconst [user, _] = await prisma.$transaction([\n  prisma.usuario.update({ where: { id: 1 }, data: { nome: "Novo" } }),\n  prisma.post.updateMany({ where: { autorId: 1 }, data: { publicado: true } }),\n]);' },
              { type: 'code', lang: 'javascript', content: '// ── SQL DIRETO (importante conhecer) ───────────\nconst { Pool } = require("pg");\nconst pool = new Pool({ connectionString: process.env.DATABASE_URL });\n\n// Nunca concatene strings! Use parameterized queries\nasync function buscarUsuario(email) {\n  // ✅ Seguro — parâmetro separado\n  const { rows } = await pool.query(\n    "SELECT * FROM usuarios WHERE email = $1",\n    [email]\n  );\n  return rows[0];\n}\n\n// ❌ NUNCA FAÇA ISSO — SQL Injection\n// await pool.query(`SELECT * FROM usuarios WHERE email = \'${email}\'`);\n\n// Migrações — controle de versão do banco\n// npx prisma migrate dev --name add-usuario-table\n// Cria arquivo migrations/xxx_add-usuario-table.sql\n// Versionado no Git — toda a equipe tem o mesmo schema' },
              { type: 'highlight', content: '🔐 SQL Injection é o ataque #1 em aplicações web. NUNCA concatene input do usuário em queries SQL. Sempre use prepared statements (parâmetros $1, $2) ou um ORM que faz isso automaticamente.' },
            ],
            exercise: {
              title: 'Schema de banco de dados',
              description: 'Projete (em comentários) o schema de banco para um blog com: usuários, posts e comentários. Defina: tabelas, colunas (tipos), relacionamentos (1:N, N:N), e índices que fariam sentido para performance.',
                            solutionHint: 'Defina tabelas com colunas e tipos. PRIMARY KEY identifica unicamente. FOREIGN KEY referencia outra tabela. INDEX melhora performance de queries de busca.',
starterCode: '// Schema de banco para Blog\n\n// Tabela: usuarios\n// Colunas: id (PK), email (unique), nome, senha_hash, created_at\n// Índice: email (buscas frequentes)\n\n// Tabela: posts\n// Colunas: ?\n// Relacionamentos: ?\n// Índices: ?\n\n// Tabela: comentarios\n// Colunas: ?\n// Relacionamentos: ?\n\n// Relacionamento N:N (se houver): posts e tags\n// Tabela pivot: ?\n\nconsole.log("Schema projetado!");\nconsole.log("Relacionamentos: usuario 1:N posts, post 1:N comentarios, post N:N tags");\n',
              solutionHint: 'posts: id, titulo, conteudo, publicado, autor_id(FK), created_at | comentarios: id, texto, post_id(FK), autor_id(FK)',
              validate: (output, code) => output.includes('1:N') && output.includes('N:N'),
              validateMessage: 'Exiba os tipos de relacionamentos 1:N e N:N.'
            },
            quiz: [
              { question: 'O que é SQL Injection?', options: ['Inserção de dados no banco', 'Ataque onde SQL malicioso é injetado via input do usuário', 'Erro de sintaxe SQL', 'Consulta muito longa'], correct: 1, explanation: "SQL Injection: atacante insere SQL como input. Ex: email = ' OR 1=1 --. Use sempre prepared statements ou ORM." },
              { question: 'Qual a vantagem do Prisma sobre SQL direto?', options: ['É mais rápido', 'Type safety, migrations, autocomplete e menos código boilerplate', 'Só funciona com PostgreSQL', 'Não precisa de banco'], correct: 1, explanation: 'Prisma: schema declarativo, client tipado (TS), migrations automáticas, consultas encadeadas. Mais seguro e produtivo que SQL manual.' },
              { question: 'O que é uma transação no banco de dados?', options: ['Uma consulta simples', 'Conjunto de operações que executam como um bloco — ou tudo ou nada', 'Uma stored procedure', 'Um índice especial'], correct: 1, explanation: 'Transação garante atomicidade: se qualquer operação falhar, todas são revertidas. Crucial para operações financeiras e dados relacionados.' },
              { question: 'Quando usar PostgreSQL vs MongoDB?', options: ['MongoDB sempre é melhor', 'PostgreSQL para dados estruturados com relações; MongoDB para dados flexíveis/hierárquicos', 'PostgreSQL é legado', 'Depende apenas do tamanho dos dados'], correct: 1, explanation: 'Postgres: relacional, ACID, joins, forte para dados estruturados. MongoDB: documentos JSON flexíveis, bom para hierarquias e dados que mudam de forma.' },
              { question: 'O que são migrações de banco?', options: ['Mover o banco para outro servidor', 'Arquivos versionados que controlam mudanças no schema ao longo do tempo', 'Backup automático', 'Sincronização em tempo real'], correct: 1, explanation: 'Migrations: arquivos SQL/código que descrevem mudanças incrementais no schema. Permitem que toda equipe tenha o mesmo banco e revertam mudanças.' },
            ]
          }
        },

  {
          id: 'mod-9-3',
          title: 'Prisma: Schema, Migrations e Relacionamentos',
          duration: '55 min',
          xp: 220,
          content: {
            sections: [
              { type: 'text', content: 'Prisma é o ORM padrão do ecossistema TypeScript/Node.js. Diferente de ORMs antigos, Prisma tem um schema declarativo, um client gerado automaticamente com tipos corretos, e um sistema de migrations que versionam o banco como o Git versiona o código.' },
              { type: 'code', lang: 'javascript', content: '// prisma/schema.prisma — fonte de verdade do banco\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\ngenerator client {\n  provider = "prisma-client-js"\n}\nmodel Usuario {\n  id        Int       @id @default(autoincrement())\n  email     String    @unique\n  nome      String\n  senha     String\n  criadoEm  DateTime  @default(now())\n  posts     Post[]    // relação 1:N\n}\nmodel Post {\n  id        Int      @id @default(autoincrement())\n  titulo    String\n  conteudo  String\n  publicado Boolean  @default(false)\n  autorId   Int\n  autor     Usuario  @relation(fields: [autorId], references: [id], onDelete: Cascade)\n  tags      Tag[]    @relation("PostTags") // relação N:N\n}\nmodel Tag {\n  id    Int    @id @default(autoincrement())\n  nome  String @unique\n  posts Post[] @relation("PostTags")\n}\n// onDelete: Cascade = se usuário deletado, posts também deletados\nconsole.log("Schema Prisma: declare modelos, Prisma gera o SQL.");' },
              { type: 'code', lang: 'javascript', content: '// MIGRATIONS: versionamento do banco\n// npx prisma migrate dev --name add_usuario  → cria migration\n// npx prisma migrate deploy                  → aplica em produção\n// npx prisma migrate reset                   → reseta (só dev!)\n\n// QUERIES COMUNS COM PRISMA CLIENT\nimport { PrismaClient } from "@prisma/client";\nconst prisma = new PrismaClient();\n\n// CREATE\nconst usuario = await prisma.usuario.create({\n  data: { email: "ana@dev.com", nome: "Ana", senha: hashSenha },\n});\n\n// READ com include (eager loading — evita N+1!)\nconst posts = await prisma.post.findMany({\n  where: { publicado: true },\n  include: { autor: { select: { nome: true, email: true } }, tags: true },\n  orderBy: { criadoEm: "desc" },\n  take: 10,\n  skip: (pagina - 1) * 10,\n});\n\n// UPDATE\nawait prisma.post.update({\n  where: { id: postId },\n  data: { publicado: true },\n});\n\n// DELETE\nawait prisma.usuario.delete({ where: { id: userId } });\n// Com onDelete: Cascade, os posts são deletados automaticamente\nconsole.log("include vs select: traga só o que precisa, evite N+1.");' },
              { type: 'code', lang: 'javascript', content: '// TRANSAÇÕES: múltiplas operações ou todas ou nenhuma\nconst resultado = await prisma.$transaction(async (tx) => {\n  const usuario = await tx.usuario.create({\n    data: { email: "bob@dev.com", nome: "Bob", senha: hash },\n  });\n  const perfil = await tx.perfil.create({\n    data: { bio: "Dev fullstack", usuarioId: usuario.id },\n  });\n  return { usuario, perfil };\n});\n// Se perfil.create falhar, usuario.create é desfeito automaticamente\n\n// PROBLEMA N+1: o erro mais comum com ORMs\n// ERRADO: 1 query para posts + N queries para autores\nconst posts = await prisma.post.findMany();\nfor (const post of posts) {\n  const autor = await prisma.usuario.findUnique({ where: { id: post.autorId } }); // N queries!\n}\n// CORRETO: 1 query com JOIN via include\nconst posts2 = await prisma.post.findMany({\n  include: { autor: true }, // 1 query com JOIN\n});\nconsole.log("$transaction: todas as ops ou nenhuma. include: evita N+1.");' },
              { type: 'common_error', title: 'Esquecer de rodar migrations em produção', wrong: '// Fez migrate dev localmente, subiu para produção\n// O banco de produção ainda não tem as colunas novas!\n// App crasha: "column email_verificado does not exist"\n\n// CI/CD sem migration:\n// git push → deploy → crash', wrongLabel: 'Esquecer prisma migrate deploy em produção causa crash imediato.', right: '// package.json\n{\n  "scripts": {\n    "build": "prisma generate && next build",\n    "start": "prisma migrate deploy && node server.js"\n  }\n}\n// OU no GitHub Actions:\n// - run: npx prisma migrate deploy\n// antes do deploy da aplicação', rightLabel: 'Execute migrate deploy antes de subir a nova versão da app.', explanation: 'migrate dev = desenvolvimento (recria o banco se necessário). migrate deploy = produção (aplica apenas as novas migrations, nunca destrói dados).' },
            ],
            exercise: {
              title: 'Modelar e consultar com Prisma',
              description: 'Implemente as funções de um sistema de blog usando o mock de Prisma fornecido. Crie usuário, busque posts com autor incluído, e implemente paginação.',
              solutionHint: 'prisma.post.findMany aceita include para trazer relações, take/skip para paginação, e where para filtros. Para criar relacionamentos, passe o id no campo de foreign key.',
                            solutionHint: 'prisma.post.findMany aceita include para trazer relacoes, take/skip para paginacao, e where para filtros. Promise.all para dados e contagem em paralelo.',
starterCode: `// Mock do Prisma para o exercício (simula o comportamento real)
const db = {
  usuarios: [
    { id: 1, nome: 'Ana', email: 'ana@dev.com' },
    { id: 2, nome: 'Bob', email: 'bob@dev.com' },
  ],
  posts: [
    { id: 1, titulo: 'Aprendendo Prisma', autorId: 1, publicado: true },
    { id: 2, titulo: 'Next.js e Server Actions', autorId: 1, publicado: true },
    { id: 3, titulo: 'Draft privado', autorId: 2, publicado: false },
    { id: 4, titulo: 'TypeScript avançado', autorId: 2, publicado: true },
    { id: 5, titulo: 'Docker na prática', autorId: 1, publicado: true },
  ],
};

const prisma = {
  post: {
    findMany: ({ where = {}, include = {}, take, skip = 0 } = {}) => {
      let result = [...db.posts];
      if (where.publicado !== undefined) result = result.filter(p => p.publicado === where.publicado);
      if (skip) result = result.slice(skip);
      if (take) result = result.slice(0, take);
      if (include.autor) result = result.map(p => ({ ...p, autor: db.usuarios.find(u => u.id === p.autorId) }));
      return Promise.resolve(result);
    },
    count: ({ where = {} } = {}) => {
      let result = [...db.posts];
      if (where.publicado !== undefined) result = result.filter(p => p.publicado === where.publicado);
      return Promise.resolve(result.length);
    },
  },
  usuario: {
    create: ({ data }) => {
      const novo = { id: db.usuarios.length + 1, ...data };
      db.usuarios.push(novo);
      return Promise.resolve(novo);
    },
  },
};

// Implemente as funções abaixo:
async function listarPostsPublicados(pagina = 1, porPagina = 2) {
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { publicado: true },
      include: { autor: true },
      take: porPagina,
      skip: (pagina - 1) * porPagina,
    }),
    prisma.post.count({ where: { publicado: true } }),
  ]);
  return { posts, total, totalPaginas: Math.ceil(total / porPagina) };
}

async function criarUsuario(nome, email) {
  return prisma.usuario.create({ data: { nome, email } });
}

// Testes:
async function testar() {
  const pagina1 = await listarPostsPublicados(1, 2);
  console.log('Posts pag 1:', pagina1.posts.length);        // 2
  console.log('Total:', pagina1.total);                      // 4
  console.log('TotalPaginas:', pagina1.totalPaginas);        // 2
  console.log('Tem autor:', !!pagina1.posts[0].autor);       // true

  const novo = await criarUsuario('Carol', 'carol@dev.com');
  console.log('Novo usuario:', novo.nome);                   // Carol
}
testar();`,
              validate: (output, code) => {
                return code.includes('listarPostsPublicados') &&
                  code.includes('include') &&
                  output.includes('Posts pag 1: 2') &&
                  output.includes('Total: 4') &&
                  output.includes('Tem autor: true') &&
                  output.includes('Carol');
              },
              validateMessage: 'Posts pag 1: 2, Total: 4, TotalPaginas: 2, Tem autor: true, Novo usuario: Carol.',
            },
            quiz: [
              { question: 'O que é uma migration no Prisma?', options: ['Um tipo de query', 'Um arquivo SQL versionado que descreve mudanças no schema do banco', 'Uma função de importação', 'Um tipo de índice'], correct: 1, explanation: 'Migration = arquivo gerado por "prisma migrate dev" que registra as mudanças de schema (nova tabela, coluna, índice). Fica no git, rastreável, aplicável em produção com "migrate deploy".' },
              { question: 'O que é o problema N+1?', options: ['Erro de índice em array', '1 query para lista + N queries individuais para cada item. Resolve com include', 'Overflow de número', 'N conexões abertas'], correct: 1, explanation: 'N+1: buscar 100 posts → 1 query, depois buscar autor de cada post → 100 queries = 101 queries. Com include: 1 query com JOIN. Prisma alerta sobre N+1 em desenvolvimento.' },
              { question: 'Qual a diferença entre migrate dev e migrate deploy?', options: ['São iguais', 'dev: desenvolvimento, pode resetar banco. deploy: produção, apenas aplica novas migrations, nunca destrói dados', 'deploy é mais rápido', 'dev é para TypeScript'], correct: 1, explanation: 'migrate dev: interativo, recria se necessário (perigoso em produção!). migrate deploy: só aplica migrations pendentes, nunca destrói dados — o comando certo para CI/CD.' },
            ],
          },
        }
  ,{
    id: 'mod-9-4',
    title: 'Autenticação com JWT e Middleware',
    duration: '55 min',
    xp: 220,
    content: {
      sections: [
        { type: 'text', content: 'Autenticação é o tópico mais perguntado em entrevistas de backend. Vamos implementar do zero: cadastro com senha hasheada, login com JWT, e middleware que protege rotas automaticamente.' },
        { type: 'code', lang: 'javascript', content: '// CADASTRO\napp.post(\'/auth/cadastro\', async (req, res) => {\nconst { email, senha, nome } = req.body;\nconst existe = await db.usuario.findUnique({ where: { email } });\nif (existe) return res.status(409).json({ erro: \'Email já cadastrado\' });\nconst hash = await bcrypt.hash(senha, 12);\nconst u = await db.usuario.create({ data: { email, nome, senhaHash: hash } });\nres.status(201).json({ id: u.id, email: u.email }); // nunca retorne senhaHash!\n});\n// LOGIN\napp.post(\'/auth/login\', async (req, res) => {\nconst { email, senha } = req.body;\nconst u = await db.usuario.findUnique({ where: { email } });\nif (!u || !await bcrypt.compare(senha, u.senhaHash))\nreturn res.status(401).json({ erro: \'Credenciais inválidas\' }); // genérico!\nconst token = jwt.sign({ userId: u.id, role: u.role }, process.env.JWT_SECRET, { expiresIn: \'24h\' });\nres.json({ token, usuario: { id: u.id, nome: u.nome } });\n});\nconsole.log(\"bcrypt.compare + JWT + mensagem genérica.\");' },
        { type: 'code', lang: 'javascript', content: '// MIDDLEWARE DE AUTENTICAÇÃO E AUTORIZAÇÃO\nfunction requireAuth(req, res, next) {\nconst h = req.headers.authorization;\nif (!h?.startsWith(\'Bearer \')) return res.status(401).json({ erro: \'Token não fornecido\' });\ntry { req.user = jwt.verify(h.split(\' \')[1], process.env.JWT_SECRET); next(); }\ncatch { res.status(401).json({ erro: \'Token inválido\' }); }\n}\nfunction requireRole(...roles) {\nreturn (req, res, next) => {\nif (!roles.includes(req.user?.role)) return res.status(403).json({ erro: \'Sem permissão\' });\nnext();\n};\n}\napp.get(\'/api/perfil\', requireAuth, async (req, res) => {\nconst u = await db.usuario.findUnique({ where: { id: req.user.userId } });\nres.json({ id: u.id, nome: u.nome });\n});\napp.delete(\'/api/admin/users/:id\', requireAuth, requireRole(\'admin\'), deleteUser);\nconsole.log(\"requireAuth em uma linha protege qualquer rota.\");' },
        { type: 'common_error', title: 'Verificar autenticação em cada rota', wrong: 'app.get(\'/perfil\', async (req, res) => {\nconst token = req.headers.authorization?.split(\' \')[1];\nif (!token) return res.status(401).json({ erro: \'Sem token\' });\n// duplicado em CADA rota\n});', wrongLabel: 'Duplicado em cada rota: fácil de esquecer em rota nova.', right: 'function requireAuth(req, res, next) {\nconst token = req.headers.authorization?.split(\' \')[1];\nif (!token) return res.status(401).json({ erro: \'Sem token\' });\nreq.user = jwt.verify(token, SECRET);\nnext();\n}\napp.get(\'/perfil\', requireAuth, handler);', rightLabel: 'Middleware centralizado: escreva uma vez, aplique em qualquer rota.', explanation: 'Middleware é o padrão para lógica cross-cutting no Express.' },
      ],
      exercise: {
        title: 'Implementar middleware de autenticação completo',
        description: 'Implemente hashSenha, verificarSenha, gerarToken, verificarToken, requireAuth e requireRole usando as simulações fornecidas.',
        starterCode: `const bcryptSim = {
  hash: (s, r) => Promise.resolve('hashed_' + r + '_' + s),
  compare: (s, h) => Promise.resolve(h === 'hashed_12_' + s),
};
const jwtSim = {
  sign: (p, sec) => Buffer.from(JSON.stringify({...p, exp: Date.now()+86400000})).toString('base64'),
  verify: (t) => { const p = JSON.parse(Buffer.from(t,'base64').toString()); if(p.exp<Date.now()) throw new Error('Expirado'); return p; }
};
async function hashSenha(s)         { return bcryptSim.hash(s, 12); }
async function verificarSenha(s, h) { return bcryptSim.compare(s, h); }
function gerarToken(userId, role)   { return jwtSim.sign({ userId, role }, 'secret'); }
function verificarToken(t)          { try { return jwtSim.verify(t); } catch { return null; } }
function requireAuth(req, res, next) {
  const token = req.headers?.authorization?.split(' ')[1];
  if (!token) { res.statusCode = 401; res.body = { erro: 'Sem token' }; return; }
  const p = verificarToken(token);
  if (!p) { res.statusCode = 401; return; }
  req.user = p; next();
}
function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) { res.statusCode = 403; return; }
    next();
  };
}
async function testar() {
  const h = await hashSenha('abc');
  console.log('hash ok:', h.startsWith('hashed_'));
  console.log('senha correta:', await verificarSenha('abc', h));
  const t = gerarToken(42, 'admin');
  const p = verificarToken(t);
  console.log('userId:', p?.userId === 42);
  let ok = false;
  const res = { statusCode: 0 };
  requireAuth({ headers: { authorization: 'Bearer ' + t } }, res, () => { ok = true; });
  console.log('auth passou:', ok);
  requireAuth({ headers: {} }, res, () => {});
  console.log('sem token 401:', res.statusCode === 401);
}
testar();`,
        validate: (output, code) => code.includes('requireAuth') && output.includes('hash ok: true') && output.includes('auth passou: true') && output.includes('401: true'),
        validateMessage: 'hash ok: true, auth passou: true, sem token 401: true.',
      },
      quiz: [
        { question: 'Por que bcrypt em vez de SHA256?', options: ['Mais moderno', 'bcrypt é lento por design (400ms) — força bruta inviável', 'SHA256 é inseguro', 'bcrypt comprime'], correct: 1, explanation: 'SHA256: nanosegundos, GPU testa bilhões/s. bcrypt rounds=12: ~400ms. Para usuário: ok. Para atacante: anos.' },
        { question: 'O que é middleware no Express?', options: ['Biblioteca externa', 'Função (req,res,next) que processa antes do handler final', 'Config central', 'Tipo de banco'], correct: 1, explanation: 'Middleware tem assinatura (req, res, next). Pode modificar req/res ou chamar next() para continuar.' },
        { question: 'Por que mensagem de erro de login genérica?', options: ['Economizar chars', 'Mensagem específica revela quais emails existem (user enumeration)', 'Limitação HTTP', 'Simplicidade'], correct: 1, explanation: '"Email não cadastrado" confirma ao atacante que o email existe. Use sempre "credenciais inválidas".' },
      ],
    },
  }
  ,{
    id: 'mod-9-5',
    title: 'Upload, Paginação e Estrutura de Projeto',
    duration: '50 min',
    xp: 210,
    content: {
      sections: [
        { type: 'text', content: 'Três tópicos que todo backend real usa: upload de arquivos com validação, paginação (nunca retorne todos os registros), e estrutura routes→controllers→services que escala.' },
        { type: 'code', lang: 'javascript', content: '// UPLOAD COM MULTER\nconst upload = multer({\nlimits: { fileSize: 5*1024*1024 },\nfileFilter: (req, file, cb) => {\nconst ok = [\'image/jpeg\',\'image/png\'].includes(file.mimetype);\ncb(ok ? null : new Error(\'Apenas imagens\'), ok);\n},\nstorage: multer.diskStorage({\ndestination: \'uploads/\',\nfilename: (req, file, cb) => {\nconst ext = require(\'path\').extname(file.originalname);\ncb(null, Date.now() + \'-\' + Math.random().toString(36).slice(2) + ext);\n// Nunca use o nome original — risco de path traversal!\n},\n}),\n});\napp.post(\'/api/avatar\', requireAuth, upload.single(\'img\'), (req, res) =>\nres.json({ url: `/uploads/${req.file.filename}` })\n);\n// PAGINAÇÃO\napp.get(\'/api/posts\', async (req, res) => {\nconst pagina = Math.max(1, +req.query.page || 1);\nconst limite = Math.min(100, +req.query.limit || 20);\nconst [posts, total] = await Promise.all([\ndb.post.findMany({ skip: (pagina-1)*limite, take: limite }),\ndb.post.count(),\n]);\nres.json({ dados: posts, total, pagina, totalPaginas: Math.ceil(total/limite) });\n});\nconsole.log(\"Upload: nome aleatório. Paginação: Promise.all para dados+count.\");' },
        { type: 'common_error', title: 'Toda lógica diretamente nas rotas', wrong: 'app.post(\'/api/posts\', auth, async (req, res) => {\n// 150 linhas: validação, lógica, queries, emails...\n// Impossível de testar\n});', wrongLabel: 'Toda lógica na rota: intestável, difícil de manter.', right: 'app.post(\'/api/posts\', auth, validar, async (req, res) => {\nconst post = await postsService.criar(req.body, req.user.id);\nres.status(201).json(post);\n});\n// service: lógica testável sem Express\nasync function criar(dados, autorId) { /* só lógica */ }', rightLabel: 'Routes delegam para services testáveis sem o Express.', explanation: 'Services sem req/res: testáveis com mocks, reutilizáveis em cron jobs e CLIs.' },
      ],
      exercise: {
        title: 'Paginação genérica',
        description: 'Implemente paginar(dados, pagina, porPagina) → {dados, total, totalPaginas, temProxima, temAnterior} e filtrarEPaginar(dados, filtro, pag).',
                solutionHint: 'offset = (pagina - 1) * porPagina. Limite com Math.min(100, porPagina). totalPaginas = Math.ceil(total / porPagina). temProxima = pagina < totalPaginas.',
starterCode: `function paginar(dados, pagina=1, porPagina=10) {
  porPagina = Math.min(100, Math.max(1, porPagina));
  pagina    = Math.max(1, pagina);
  const inicio = (pagina-1)*porPagina;
  const total  = dados.length;
  const tp     = Math.ceil(total/porPagina);
  return { dados: dados.slice(inicio, inicio+porPagina), total, pagina, porPagina, totalPaginas: tp, temProxima: pagina<tp, temAnterior: pagina>1 };
}
function filtrarEPaginar(dados, filtro={}, pag={}) {
  const f = dados.filter(i => Object.entries(filtro).every(([k,v]) => i[k]===v));
  return paginar(f, pag.pagina, pag.porPagina);
}
const items = Array.from({length:47}, (_,i) => ({ id:i+1, cat:i%3===0?'a':'b' }));
const p1 = paginar(items, 1, 10);
console.log('pagina 1:', p1.dados.length, 'total:', p1.total, 'totalPaginas:', p1.totalPaginas);
const p5 = paginar(items, 5, 10);
console.log('pagina 5 temProxima:', p5.temProxima, 'temAnterior:', p5.temAnterior);
const fa = filtrarEPaginar(items, { cat:'a' }, { pagina:1, porPagina:5 });
console.log('cat a:', fa.total);`,
        validate: (output, code) => code.includes('paginar') && code.includes('filtrarEPaginar') && output.includes('total: 47') && output.includes('totalPaginas: 5'),
        validateMessage: 'total: 47, totalPaginas: 5. filtrarEPaginar filtra antes de paginar.',
      },
      quiz: [
        { question: 'Por que não usar nome original do arquivo?', options: ['Pode ter acentos', 'Path traversal: "../server.js" pode sobrescrever arquivos do servidor', 'Multer não aceita', 'Conflito'], correct: 1, explanation: 'Path traversal: usuario envia arquivo "../index.html" e sobrescreve arquivos críticos. Sempre gere nome aleatório.' },
        { question: 'Por que Promise.all para dados + count?', options: ['Sem motivo', 'Paralelo: tempo = max(q1,q2). Sequencial: q1+q2 — quase o dobro', 'Mais legível', 'Evitar race conditions'], correct: 1, explanation: 'Queries independentes em paralelo são quase 2x mais rápidas.' },
        { question: 'Responsabilidade de um Service?', options: ['Configurar rotas', 'Lógica de negócio sem req/res — testável isoladamente', 'Conexão com banco', 'Renderizar HTML'], correct: 1, explanation: 'Services sem req/res: testáveis com mocks, reutilizáveis em qualquer contexto.' },
      ],
    },
  }
,{
    id: 'mod-9-5b',
    title: 'OpenAPI/Swagger: Documentando sua API',
    duration: '35 min',
    xp: 165,
    content: {
      sections: [
        { type: 'text', content: 'API sem documentacao e API que ninguem consegue usar. OpenAPI e o padrao da industria para descrever APIs REST: gera documentacao interativa (Swagger UI), clientes TypeScript automaticos e testes de contrato. Em times com frontend e backend separados, a spec OpenAPI e o contrato que evita o classico "o campo se chama user_id ou userId?".' },
        { type: 'code', lang: 'javascript', content: '// ── SWAGGER COM EXPRESS ──────────────────────────────\n// npm install swagger-jsdoc swagger-ui-express\n\nimport swaggerJsdoc from \'swagger-jsdoc\';\nimport swaggerUi from \'swagger-ui-express\';\n\nconst swaggerConfig = {\n  definition: {\n    openapi: \'3.0.0\',\n    info: {\n      title: \'API de Produtos\',\n      version: \'1.0.0\',\n      description: \'API REST para gerenciamento de produtos e pedidos\',\n    },\n    servers: [{ url: \'http://localhost:3000\', description: \'Development\' }],\n    components: {\n      securitySchemes: {\n        bearerAuth: { type: \'http\', scheme: \'bearer\', bearerFormat: \'JWT\' },\n      },\n      schemas: {\n        Produto: {\n          type: \'object\',\n          required: [\'nome\', \'preco\'],\n          properties: {\n            id:    { type: \'integer\', example: 1 },\n            nome:  { type: \'string\',  example: \'Notebook Dell XPS\' },\n            preco: { type: \'number\',  example: 4999.90 },\n          },\n        },\n        Erro: {\n          type: \'object\',\n          properties: { mensagem: { type: \'string\' } },\n        },\n      },\n    },\n  },\n  apis: [\'./src/routes/*.js\'],\n};\n\nconst spec = swaggerJsdoc(swaggerConfig);\napp.use(\'/docs\', swaggerUi.serve, swaggerUi.setup(spec));\n// Acesse: http://localhost:3000/docs' },
        { type: 'code', lang: 'javascript', content: '// ── ANOTACOES JSDoc NAS ROTAS ────────────────────────\n\n/**\n * @openapi\n * /api/produtos:\n *   get:\n *     summary: Listar produtos\n *     tags: [Produtos]\n *     parameters:\n *       - in: query\n *         name: pagina\n *         schema: { type: integer, default: 1 }\n *     responses:\n *       200:\n *         description: Lista de produtos\n *         content:\n *           application/json:\n *             schema:\n *               type: object\n *               properties:\n *                 dados:\n *                   type: array\n *                   items: { $ref: \'#/components/schemas/Produto\' }\n *       401:\n *         description: Nao autenticado\n */\nrouter.get(\'/produtos\', autenticar, async (req, res) => {\n  // implementacao\n});\n\n/**\n * @openapi\n * /api/produtos/{id}:\n *   get:\n *     summary: Buscar produto por ID\n *     security: [{ bearerAuth: [] }]\n *     parameters:\n *       - in: path\n *         name: id\n *         required: true\n *         schema: { type: integer }\n *     responses:\n *       200: { description: Produto encontrado }\n *       404: { description: Nao encontrado }\n */\nrouter.get(\'/produtos/:id\', autenticar, async (req, res) => {\n  // implementacao\n});' },
        { type: 'highlight', content: 'OpenAPI como contrato de time: a spec e discutida e aprovada antes de qualquer implementacao (design-first). Frontend gera o cliente TypeScript automaticamente com openapi-typescript — nao depende do backend estar pronto. Quando o backend fica pronto, os tipos ja estao corretos. Elimina bugs de integracao tipo "o campo se chama user_id ou userId?".' },
        {
          type: 'common_error',
          title: 'Documentar a API manualmente em Notion ou Confluence',
          wrong: '// Notion: "GET /api/produtos\\n// Retorna: lista de produtos\\n// Query: pagina, limite"\n// Fica desatualizado em 1 semana\n// Nao e testavel pelo browser\n// Frontend nao gera tipos automaticamente',
          wrongLabel: 'Documentacao manual fica desatualizada assim que o codigo muda — ninguem confia nela.',
          right: '// OpenAPI gerado das anotacoes JSDoc\n// Sempre atualizado: vive junto do codigo\n// Swagger UI: testavel no browser\n// openapi-typescript: gera tipos TS automaticamente',
          rightLabel: 'Documentacao gerada do codigo: sempre sincronizada, testavel, com tipos TypeScript automaticos.',
          explanation: 'Code-first (anotacoes no codigo) vs Design-first (spec escrita primeiro). Ambos geram OpenAPI. A vantagem do code-first e que a spec nao fica desatualizada — esta no mesmo PR que o codigo.',
        },
      ],
      exercise: {
        title: 'Gerar spec OpenAPI simplificada',
        description: 'Implemente buildOpenAPISpec(info, routes) que recebe definicoes de rotas e gera um objeto OpenAPI 3.0 com paths, parameters (de path e query) e requestBody quando houver body.',
        solutionHint: 'Construa { openapi, info, paths }. Para cada rota, paths[route.path][method] = operation. Params de path (/:id) viram { in: path, required: true }. Body vira requestBody.',
        starterCode: 'function buildOpenAPISpec(info, routes) {\n  const paths = {};\n  for (const route of routes) {\n    if (!paths[route.path]) paths[route.path] = {};\n    const operation = { summary: route.summary, parameters: [], responses: {} };\n    // Params de path\n    const pathParams = (route.path.match(/:(\\w+)/g) || []).map(p => ({\n      in: \'path\', name: p.slice(1), required: true, schema: { type: \'string\' },\n    }));\n    operation.parameters.push(...pathParams);\n    // Query params\n    if (route.query) {\n      for (const [name, schema] of Object.entries(route.query)) {\n        operation.parameters.push({ in: \'query\', name, schema, required: false });\n      }\n    }\n    // Body\n    if (route.body) {\n      operation.requestBody = { required: true, content: { \'application/json\': { schema: route.body } } };\n    }\n    // Responses\n    for (const [status, desc] of Object.entries(route.responses)) {\n      operation.responses[status] = { description: desc };\n    }\n    paths[route.path][route.method.toLowerCase()] = operation;\n  }\n  return { openapi: \'3.0.0\', info, paths };\n}\n\nconst spec = buildOpenAPISpec(\n  { title: \'API Produtos\', version: \'1.0.0\' },\n  [\n    { method: \'GET\', path: \'/api/produtos\', summary: \'Listar\',\n      query: { pagina: { type: \'integer\' } },\n      responses: { 200: \'Lista\', 401: \'Nao autenticado\' } },\n    { method: \'GET\', path: \'/api/produtos/:id\', summary: \'Buscar\',\n      responses: { 200: \'Produto\', 404: \'Nao encontrado\' } },\n    { method: \'POST\', path: \'/api/produtos\', summary: \'Criar\',\n      body: { type: \'object\', properties: { nome: { type: \'string\' } } },\n      responses: { 201: \'Criado\', 400: \'Invalido\' } },\n  ]\n);\n\nconsole.log(\'OpenAPI:\', spec.openapi);\nconsole.log(\'Rotas:\', Object.keys(spec.paths).length);\nconsole.log(\'Params query:\', spec.paths[\'/api/produtos\'].get.parameters.length);\nconsole.log(\'Body em POST:\', !!spec.paths[\'/api/produtos\'].post.requestBody);\nconsole.log(\'Path param:\', spec.paths[\'/api/produtos/:id\'].get.parameters[0].in);\n',
        validate: (output) => output.includes('3.0.0') && output.includes('Rotas: 3') && output.includes('path'),
        validateMessage: 'Exiba OpenAPI 3.0.0, 3 rotas, e parametro de path em /api/produtos/:id.',
      },
      quiz: [
        { question: 'O que e OpenAPI?', options: ['Uma biblioteca JavaScript', 'Especificacao padrao para descrever APIs REST — legivel por humanos e maquinas, gera documentacao e clientes', 'Um framework de backend', 'Uma alternativa ao REST'], correct: 1, explanation: 'OpenAPI e uma especificacao (YAML/JSON) que descreve endpoints, parametros, schemas e responses. Ferramentas leem essa spec e geram: Swagger UI, clientes TypeScript, testes de contrato.' },
        { question: 'Por que documentacao gerada do codigo e melhor que manual?', options: ['E mais bonita', 'Fica sincronizada com o codigo — quando o endpoint muda, a doc muda junto no mesmo PR', 'Gera mais trafego', 'E mais rapida'], correct: 1, explanation: 'Documentacao manual no Notion fica desatualizada em dias. Com anotacoes JSDoc, a doc e gerada automaticamente no build — se a rota mudar, a doc muda no mesmo commit.' },
        { question: 'O que e design-first em API development?', options: ['Focar no visual da documentacao', 'Escrever a spec OpenAPI antes de implementar — contrato discutido e aprovado antes do codigo existir', 'Usar Figma para APIs', 'Priorizar performance antes de features'], correct: 1, explanation: 'Design-first: equipe discute e aprova a spec antes de qualquer implementacao. Resultado: menos retrabalho e cliente gerado antes do backend estar pronto.' },
        { question: 'Como o OpenAPI ajuda times com frontend e backend separados?', options: ['Permite compartilhar codigo', 'A spec e o contrato: frontend gera tipos TypeScript automaticamente e nao depende do backend estar pronto', 'Acelera o deploy', 'Facilita o code review'], correct: 1, explanation: 'openapi-typescript gera tipos TS da spec. Frontend desenvolve contra esses tipos antes do backend existir. Elimina bugs tipo "o campo se chama user_id ou userId?".' },
        { question: 'O que faz swagger-ui-express?', options: ['Valida requests automaticamente', 'Serve uma interface web interativa para testar os endpoints documentados com OpenAPI', 'Gera o codigo do servidor', 'Autentica requests'], correct: 1, explanation: 'swagger-ui-express serve o Swagger UI em /docs — interface web onde qualquer dev pode ver e testar todos os endpoints sem precisar do Postman ou de documentacao externa.' },
      ],
    },
  }
  ,{
    id: 'mod-9-6',
    title: 'WebSockets e Comunicação em Tempo Real',
    duration: '45 min',
    xp: 190,
    content: {
      sections: [
        { type: 'text', content: 'HTTP é request-response — o servidor só fala quando perguntado. WebSocket é uma conexão persistente bidirecional: chat, notificações, dados ao vivo, colaboração em tempo real.' },
        { type: 'code', lang: 'javascript', content: '// SOCKET.IO\nconst io = new Server(httpServer, { cors: { origin: process.env.FRONTEND } });\nio.use((socket, next) => {\ntry { socket.user = jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET); next(); }\ncatch { next(new Error(\'Não autorizado\')); }\n});\nio.on(\'connection\', (socket) => {\nsocket.on(\'entrar:sala\', id => {\nsocket.join(id);\nsocket.to(id).emit(\'usuario:entrou\', { userId: socket.user.userId });\n});\nsocket.on(\'msg:enviar\', async ({ salaId, texto }) => {\nconst m = await db.msg.create({ data: { texto, autorId: socket.user.userId, salaId } });\nio.to(salaId).emit(\'msg:nova\', m); // só para quem está na sala!\n});\n});\nconsole.log(\"io.to(sala): só para membros da sala — nunca io.emit().\");' },
        { type: 'common_error', title: 'Emitir para todos em vez de filtrar por sala', wrong: 'socket.on(\'msg\', dados => {\nio.emit(\'msg:nova\', dados); // TODOS os clientes!\n// Usuário A vê mensagens de B e C\n});', wrongLabel: 'io.emit() envia para TODOS — leak de dados.', right: 'socket.on(\'msg\', ({ salaId, texto }) => {\nio.to(salaId).emit(\'msg:nova\', { texto });\n// socket.to(sala): todos exceto remetente\n// io.to(sala): todos na sala\n// socket.emit: apenas este cliente\n});', rightLabel: 'Sempre use o escopo mais restrito necessário.', explanation: 'io.emit=todos, io.to(sala)=sala, socket.to(sala)=sala exceto remetente.' },
      ],
      exercise: {
        title: 'Gerenciador de salas WebSocket',
        description: 'Implemente entrarSala, sairSala, emitirParaSala (retorna nº destinatários) e emitirParaUsuario.',
        starterCode: `const salas={}, sockets={}, msgs=[];
let nxt=1;
function criarSocket(uid) { const id='s'+nxt++; sockets[id]={uid,salas:new Set()}; return id; }
function entrarSala(sid, sala) {
  if (!salas[sala]) salas[sala] = new Set();
  salas[sala].add(sid); sockets[sid].salas.add(sala);
}
function sairSala(sid, sala) { salas[sala]?.delete(sid); sockets[sid]?.salas.delete(sala); }
function emitirParaSala(sala, ev, d) {
  const dest = salas[sala] || new Set();
  dest.forEach(s => msgs.push({para:s,ev,d}));
  return dest.size;
}
function emitirParaUsuario(uid, ev, d) {
  let n=0;
  Object.entries(sockets).forEach(([s,{uid:u}]) => { if(u===uid) { msgs.push({para:s,ev,d}); n++; } });
  return n;
}
const s1=criarSocket('u1'), s2=criarSocket('u2'), s3=criarSocket('u3');
entrarSala(s1,'g'); entrarSala(s2,'g'); entrarSala(s3,'p'); entrarSala(s1,'p');
console.log('geral:', emitirParaSala('g','msg',{}));    // 2
console.log('priv:', emitirParaSala('p','msg',{}));     // 2
sairSala(s1,'g');
console.log('apos sair:', emitirParaSala('g','msg',{}));// 1
console.log('u1:', emitirParaUsuario('u1','notif',{})); // 1
console.log('total:', msgs.length);                     // 6`,
        validate: (output, code) => code.includes('entrarSala') && output.includes('geral: 2') && output.includes('apos sair: 1') && output.includes('total: 6'),
        validateMessage: 'geral: 2, apos sair: 1, u1: 1, total: 6.',
      },
      quiz: [
        { question: 'HTTP vs WebSocket?', options: ['WS mais seguro', 'HTTP: request-response e fecha. WS: conexão persistente bidirecional', 'WS só em HTTPS', 'HTTP suporta mais dados'], correct: 1, explanation: 'HTTP: abre, usa, fecha. WS: conexão fica aberta, ambos os lados enviam a qualquer momento.' },
        { question: 'Por que autenticar no middleware de WS?', options: ['Performance', 'Sem auth, qualquer um conecta e vê dados de outros usuários', 'Convenção', 'Identificar cliente'], correct: 1, explanation: 'io.use no handshake garante que apenas usuários válidos chegam aos event handlers.' },
        { question: 'io.emit vs io.to(sala).emit?', options: ['Iguais', 'io.emit → todos. io.to(sala) → apenas membros dessa sala', 'to(sala) mais rápido', 'io.emit só para servidor'], correct: 1, explanation: 'io.emit=todos, io.to(sala)=sala, socket.to(sala)=sala exceto remetente.' },
      ],
    },
  }
,{
    id: 'mod-9-7',
    title: 'Logging, Sentry e Monitoramento em Produção',
    duration: '40 min',
    xp: 190,
    content: {
      sections: [
        { type: 'text', content: 'Produção sem monitoramento é voar às cegas. Sem logging estruturado, você descobre o bug quando o usuário reclama. Sem Sentry, você não sabe o stack trace. Sem alertas, você dorme enquanto o servidor cai. Essas três ferramentas — pino/winston, Sentry e métricas básicas — são o mínimo para qualquer aplicação séria.' },
        { type: 'code', lang: 'javascript', content: '// ── LOGGING ESTRUTURADO COM PINO ─────────────────────\n// npm install pino pino-pretty\n\nimport pino from \'pino\';\n\nconst logger = pino({\n  level: process.env.LOG_LEVEL || \'info\',\n  // Em produção: JSON puro (para agregação)\n  // Em dev: pino-pretty (legível no terminal)\n  transport: process.env.NODE_ENV !== \'production\'\n    ? { target: \'pino-pretty\', options: { colorize: true } }\n    : undefined,\n});\n\n// ── Log levels (do menos ao mais severo) ──────────────\n// trace → debug → info → warn → error → fatal\n\nlogger.info(\'Servidor iniciado na porta 3000\');\nlogger.info({ userId: 123, action: \'login\' }, \'Usuário autenticado\');\nlogger.warn({ tentativas: 3 }, \'Muitas tentativas de login\');\nlogger.error({ err: new Error(\'DB timeout\'), query: \'SELECT *\' }, \'Falha na query\');\nlogger.fatal(\'Processo encerrando — erro crítico\');\n\n// ── Child logger para contexto adicional ──────────────\nconst reqLogger = logger.child({ requestId: \'abc-123\', userId: 456 });\nreqLogger.info(\'Processando pedido\');  // inclui requestId e userId automaticamente\nreqLogger.info(\'Pedido finalizado\');    // idem\n\n// ── Middleware Express para logar todas as requests ───\nexport function logMiddleware(req, res, next) {\n  const start = Date.now();\n  const reqLog = logger.child({ requestId: crypto.randomUUID(), method: req.method, url: req.url });\n  req.log = reqLog;\n  reqLog.info(\'request recebida\');\n  res.on(\'finish\', () => {\n    const ms = Date.now() - start;\n    const level = res.statusCode >= 500 ? \'error\' : res.statusCode >= 400 ? \'warn\' : \'info\';\n    reqLog[level]({ status: res.statusCode, ms }, \'request finalizada\');\n  });\n  next();\n}' },
        { type: 'code', lang: 'javascript', content: '// ── SENTRY: ERROR TRACKING EM PRODUÇÃO ───────────────\n// npm install @sentry/node @sentry/profiling-node\n\nimport * as Sentry from \'@sentry/node\';\n\n// Inicialize ANTES de qualquer outro código\nSentry.init({\n  dsn: process.env.SENTRY_DSN,\n  environment: process.env.NODE_ENV,\n  // Amostra 100% em dev, 20% em produção (performance)\n  tracesSampleRate: process.env.NODE_ENV === \'production\' ? 0.2 : 1.0,\n  // Nunca logue dados sensíveis\n  beforeSend(event) {\n    // Remove senha e token de qualquer evento\n    if (event.request?.data) {\n      delete event.request.data.senha;\n      delete event.request.data.password;\n      delete event.request.headers?.authorization;\n    }\n    return event;\n  },\n});\n\n// ── Capturar erros manualmente ────────────────────────\ntry {\n  await processarPagamento(pedido);\n} catch (err) {\n  // Adiciona contexto antes de enviar ao Sentry\n  Sentry.withScope(scope => {\n    scope.setTag(\'modulo\', \'pagamentos\');\n    scope.setUser({ id: pedido.userId, email: pedido.email });\n    scope.setExtra(\'pedido\', { id: pedido.id, valor: pedido.valor });\n    Sentry.captureException(err);\n  });\n  throw err; // re-throw para o caller tratar\n}\n\n// ── Alertas: o que monitorar ──────────────────────────\n// 1. Error rate > 1% das requests → alerta imediato\n// 2. P95 latência > 2s → investigar\n// 3. Memory usage > 80% → possível memory leak\n// 4. DB connection pool esgotando → escalar ou otimizar queries\n// 5. Disco > 90% → limpar logs antigos ou aumentar storage' },
        { type: 'highlight', content: '🚨 O que NUNCA logar: senhas, tokens JWT completos, números de cartão, CPF/dados pessoais completos, segredos de API. Logs chegam em Datadog, Cloudwatch, Sentry — times de infra e às vezes terceiros têm acesso. Se precisar debugar autenticação, logue apenas os primeiros 8 chars do token ou um hash.' },
        {
          type: 'common_error',
          title: 'Usar console.log em produção em vez de logger estruturado',
          wrong: 'app.post(\'/login\', async (req, res) => {\n  console.log(\'tentativa de login:\', req.body); // ❌ loga a SENHA\n  console.log(\'usuário:\', usuario);              // ❌ sem contexto de request\n  // Em produção: output não estruturado, sem nível, sem correlação\n});',
          wrongLabel: 'console.log não tem níveis, não tem contexto, e pode vazar dados sensíveis.',
          right: 'app.post(\'/login\', async (req, res) => {\n  req.log.info({ email: req.body.email }, \'tentativa de login\'); // sem senha\n  req.log.info({ userId: usuario.id }, \'login bem-sucedido\');\n  // JSON estruturado, nível info, requestId automático, sem dados sensíveis\n});',
          rightLabel: 'Logger estruturado com child logger por request — correlacionável, filtrável, seguro.',
          explanation: 'Em produção, logs são aggregados no Datadog, CloudWatch ou Loki. JSON estruturado permite filtrar por requestId, userId ou level. console.log produz texto livre — impossível de filtrar em escala.',
        },
      ],
      exercise: {
        title: 'Implementar sistema de logging com níveis e contexto',
        description: 'Crie uma classe Logger que: suporta níveis (debug, info, warn, error, fatal), imprime JSON estruturado com timestamp, nível e mensagem, aceita objetos de contexto adicionais, e tem um método child(context) que cria logger filho que inclui o contexto em todos os logs.',
        solutionHint: 'LEVELS = {debug:0, info:1, warn:2, error:3, fatal:4}. Log só se level >= currentLevel. child() retorna new Logger com baseContext merged. Sempre inclua timestamp ISO.',
        starterCode: 'const LEVELS = { debug: 0, info: 1, warn: 2, error: 3, fatal: 4 };\n\nclass Logger {\n  #level;\n  #context;\n\n  constructor(level = \'info\', context = {}) {\n    this.#level = LEVELS[level] ?? 1;\n    this.#context = context;\n  }\n\n  #log(levelName, obj, msg) {\n    if (LEVELS[levelName] < this.#level) return;\n    const entry = {\n      timestamp: new Date().toISOString(),\n      level: levelName,\n      ...this.#context,\n      ...(typeof obj === \'string\' ? { msg: obj } : { ...obj, msg }),\n    };\n    console.log(JSON.stringify(entry));\n  }\n\n  debug(obj, msg) { this.#log(\'debug\', obj, msg); }\n  info(obj, msg)  { this.#log(\'info\',  obj, msg); }\n  warn(obj, msg)  { this.#log(\'warn\',  obj, msg); }\n  error(obj, msg) { this.#log(\'error\', obj, msg); }\n  fatal(obj, msg) { this.#log(\'fatal\', obj, msg); }\n\n  child(context) {\n    return new Logger(\n      Object.keys(LEVELS).find(k => LEVELS[k] === this.#level) || \'info\',\n      { ...this.#context, ...context }\n    );\n  }\n}\n\n// Testes\nconst logger = new Logger(\'info\');\nlogger.debug(\'isso nao aparece\'); // abaixo do nivel\nlogger.info(\'servidor iniciado\');\nlogger.info({ userId: 42 }, \'usuario autenticado\');\nlogger.warn({ tentativas: 3 }, \'muitas tentativas de login\');\nlogger.error({ err: \'DB timeout\' }, \'falha na query\');\n\n// Child logger herda contexto\nconst reqLogger = logger.child({ requestId: \'abc-123\' });\nreqLogger.info(\'processando pedido\'); // inclui requestId\nreqLogger.info({ status: 200 }, \'resposta enviada\'); // inclui requestId + status\n',
        validate: (output) => {
          try {
            const lines = output.trim().split('\n').filter(l => l.startsWith('{'));
            return lines.length >= 4 &&
              lines.every(l => { const p = JSON.parse(l); return p.timestamp && p.level && p.msg; }) &&
              lines.some(l => JSON.parse(l).requestId === 'abc-123');
          } catch { return false; }
        },
        validateMessage: 'Todos os logs devem ser JSON válido com timestamp, level e msg. O child logger deve incluir requestId: "abc-123".',
      },
      quiz: [
        { question: 'Por que usar logging estruturado (JSON) em vez de console.log?', options: ['JSON é mais rápido que string', 'Permite filtrar, agregar e correlacionar logs por campos específicos em sistemas de observabilidade', 'É o padrão do Node.js', 'Consome menos memória'], correct: 1, explanation: 'JSON estruturado permite: filtrar todos os logs de um requestId específico, criar alertas quando error rate > X%, correlacionar logs de diferentes serviços. console.log produz texto livre — inútil em escala.' },
        { question: 'O que é um child logger?', options: ['Um logger mais simples', 'Logger derivado que herda o nível e contexto do pai e adiciona contexto próprio a todos os logs', 'Um logger para componentes filhos no React', 'Logger com menos níveis'], correct: 1, explanation: 'Child logger resolve o problema de repetir contexto. reqLogger = logger.child({ requestId }) faz com que todos os logs dessa request incluam o requestId automaticamente, sem passar manualmente.' },
        { question: 'O que o Sentry faz que o logging não faz?', options: ['Loga mais rápido', 'Captura stack traces completos, agrupa erros similares, alerta em tempo real e mostra contexto (usuário, breadcrumbs, release)', 'Substitui o logging', 'Só funciona no frontend'], correct: 1, explanation: 'Logging registra o que aconteceu. Sentry captura erros não tratados com contexto completo: stack trace, estado da aplicação, versão do release, usuário afetado, e permite ver se o erro é novo ou regressão.' },
        { question: 'Qual dado NUNCA deve aparecer em logs?', options: ['IDs de usuário', 'Senhas, tokens completos, números de cartão e dados pessoais sensíveis', 'Status codes HTTP', 'Timestamps'], correct: 1, explanation: 'Logs chegam a sistemas de terceiros (Datadog, Sentry) e são acessados por times de infra. Senha em log = senha exposta. Use apenas identificadores (userId, email mascarado) nunca credenciais.' },
        { question: 'O que é log level e para que serve?', options: ['A cor do log no terminal', 'Hierarquia de severidade que permite filtrar noise em produção e ver detalhes em desenvolvimento', 'O tamanho do arquivo de log', 'A frequência de escrita'], correct: 1, explanation: 'Em produção: level=warn (só warn/error/fatal). Em dev: level=debug (tudo). Isso evita gigabytes de logs desnecessários em produção e mantém verbosidade útil no desenvolvimento.' },
      ],
    },
  }

,{
    id: 'mp-phase-9',
    title: '🏗️ Mini-Projeto: Simulador de API REST',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase8,
    content: {
      sections: [{ type: 'text', content: 'Construa algo real aplicando o que aprendeu nesta fase.' }]
    }
  }
  ]
};
