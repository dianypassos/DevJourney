import { miniProjectPhase13 } from '../miniprojects.js';
export const phase13 = {
  id: 'phase-12',
  title: 'Banco de Dados com Profundidade',
  phase: 13,
  color: '#06b6d4',
  icon: '🗄️',
  description: 'Do modelo relacional ao Redis. Modelagem, SQL avançado, índices, transações ACID, query planning e NoSQL — o que separa devs que usam banco dos que entendem banco.',
  checklist: [
    'Criar tabelas com chaves primárias e estrangeiras',
    'Escrever queries com JOIN entre duas ou mais tabelas',
    'Usar GROUP BY, HAVING e funções de agregação (COUNT, SUM, AVG)',
    'Explicar quando usar índices e como eles funcionam',
    'Evitar o problema N+1 com JOINs ou eager loading',
    'Normalizar um banco até a 3ª Forma Normal (3NF)',
    'Entender a diferença entre SQL e NoSQL e quando usar cada um',
  ],
  modules: [
    {
      id: 'mod-12-1',
      title: 'Modelagem Relacional e Normalização',
      duration: '55 min',
      xp: 230,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Modelagem relacional é a habilidade de transformar requisitos de negócio em tabelas, colunas e relacionamentos. Um schema bem modelado previne bugs, redundâncias e inconsistências que são quase impossíveis de corrigir depois que dados de produção acumulam. Normalização é o processo formal de eliminar redundâncias.',
          },
          {
            type: 'code',
            lang: 'sql',
            content: '-- ── TIPOS DE RELACIONAMENTO ────────────────────────\n\n-- 1:1 — Um usuário tem um perfil\nCREATE TABLE usuarios (\n  id          SERIAL PRIMARY KEY,\n  email       VARCHAR(255) UNIQUE NOT NULL,\n  senha_hash  TEXT NOT NULL,\n  created_at  TIMESTAMPTZ DEFAULT NOW()\n);\n\nCREATE TABLE perfis (\n  usuario_id  INT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,\n  nome        VARCHAR(100) NOT NULL,\n  bio         TEXT,\n  avatar_url  TEXT,\n  updated_at  TIMESTAMPTZ DEFAULT NOW()\n);\n-- usuario_id é PK e FK ao mesmo tempo — garante 1:1\n\n-- 1:N — Um usuário tem muitos posts\nCREATE TABLE posts (\n  id          SERIAL PRIMARY KEY,\n  autor_id    INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,\n  titulo      VARCHAR(255) NOT NULL,\n  slug        VARCHAR(255) UNIQUE NOT NULL,  -- URL amigável\n  conteudo    TEXT,\n  publicado   BOOLEAN DEFAULT FALSE,\n  created_at  TIMESTAMPTZ DEFAULT NOW(),\n  updated_at  TIMESTAMPTZ DEFAULT NOW()\n);\n\n-- N:N — Posts têm muitas tags; tags pertencem a muitos posts\nCREATE TABLE tags (\n  id    SERIAL PRIMARY KEY,\n  nome  VARCHAR(50) UNIQUE NOT NULL\n);\n\nCREATE TABLE posts_tags (  -- tabela de junção (pivot)\n  post_id  INT REFERENCES posts(id) ON DELETE CASCADE,\n  tag_id   INT REFERENCES tags(id)  ON DELETE CASCADE,\n  PRIMARY KEY (post_id, tag_id)  -- chave composta evita duplicatas\n);',
          },
          {
            type: 'code',
            lang: 'sql',
            content: '-- ── NORMALIZAÇÃO: AS 3 FORMAS NORMAIS ──────────────\n\n-- PROBLEMA: tabela desnormalizada (não normalizada)\nCREATE TABLE pedidos_ruim (\n  pedido_id     INT,\n  cliente_nome  VARCHAR(100),  -- ← redundante!\n  cliente_email VARCHAR(255),  -- ← redundante!\n  produto_nome  VARCHAR(100),  -- ← redundante!\n  produto_preco DECIMAL(10,2), -- ← redundante!\n  quantidade    INT,\n  total         DECIMAL(10,2)  -- ← calculado! não armazenar\n);\n-- Problema: se o email do cliente mudar, precisa atualizar N linhas\n-- Problema: total pode ficar inconsistente com quantidade × preco\n\n-- 1FN — Primeira Forma Normal: valores atômicos, sem grupos repetidos\n-- 2FN — Segunda Forma Normal: sem dependências parciais da PK\n-- 3FN — Terceira Forma Normal: sem dependências transitivas\n\n-- SOLUÇÃO: schema normalizado (3FN)\nCREATE TABLE clientes (\n  id     SERIAL PRIMARY KEY,\n  nome   VARCHAR(100) NOT NULL,\n  email  VARCHAR(255) UNIQUE NOT NULL\n);\n\nCREATE TABLE produtos (\n  id     SERIAL PRIMARY KEY,\n  nome   VARCHAR(100) NOT NULL,\n  preco  DECIMAL(10,2) NOT NULL CHECK (preco >= 0)\n);\n\nCREATE TABLE pedidos (\n  id          SERIAL PRIMARY KEY,\n  cliente_id  INT NOT NULL REFERENCES clientes(id),\n  criado_em   TIMESTAMPTZ DEFAULT NOW()\n);\n\nCREATE TABLE itens_pedido (\n  pedido_id   INT REFERENCES pedidos(id)  ON DELETE CASCADE,\n  produto_id  INT REFERENCES produtos(id) ON DELETE RESTRICT,\n  quantidade  INT NOT NULL CHECK (quantidade > 0),\n  preco_unit  DECIMAL(10,2) NOT NULL,  -- snapshot do preço no momento\n  PRIMARY KEY (pedido_id, produto_id)\n);\n-- total é CALCULADO: SELECT SUM(quantidade * preco_unit) — não armazenado',
          },
          {
            type: 'code',
            lang: 'sql',
            content: '-- ── TIPOS DE DADOS IMPORTANTES ─────────────────────\n\n-- Texto\nVARCHAR(n)  -- string de tamanho variável com limite\nTEXT        -- string sem limite (preferido no PostgreSQL)\nCHAR(n)     -- tamanho fixo (evite — usa espaço desnecessário)\n\n-- Números\nINT / INTEGER    -- inteiro 32-bit (-2B a 2B)\nBIGINT           -- inteiro 64-bit (para IDs de alto volume)\nSERIAL           -- inteiro auto-incrementado (INT + sequência)\nBIGSERIAL       -- BIGINT auto-incrementado\nDECIMAL(p, s)    -- precisão exata (use para dinheiro!)\nFLOAT / REAL     -- ponto flutuante (NÃO use para dinheiro — impreciso)\n\n-- Dinheiro: DECIMAL(15, 2) ou INTEGER (centavos) — nunca FLOAT!\n\n-- Tempo\nTIMESTAMPTZ   -- timestamp com timezone (sempre preferido)\nTIMESTAMP     -- sem timezone (evite — causa bugs de fuso horário)\nDATE          -- apenas data\nINTERVAL      -- duração (ex: \'3 days\', \'2 hours\')\n\n-- Outros\nBOOLEAN       -- true/false\nUUID          -- identificador único universal\nJSONB         -- JSON binário indexável (PostgreSQL) — muito útil!\nARRAY         -- arrays nativos no PostgreSQL\n\n-- UUID como PK (melhor que SERIAL para sistemas distribuídos)\nCREATE TABLE eventos (\n  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  tipo       VARCHAR(50) NOT NULL,\n  payload    JSONB,\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);\n\n-- JSONB permite queries dentro do JSON!\nSELECT * FROM eventos\nWHERE payload->>\'usuario_id\' = \'42\'  -- extrai campo do JSON\n  AND payload @> \'{"tipo": "compra"}\'; -- JSONB containment',
          },
          {
            type: 'highlight',
            content: '💡 Regras práticas de modelagem: (1) Nunca armazene valores calculados — calcule na query. (2) Use TIMESTAMPTZ, nunca TIMESTAMP. (3) Use DECIMAL para dinheiro, nunca FLOAT. (4) Coloque ON DELETE CASCADE apenas quando fizer sentido de negócio — às vezes você quer ON DELETE RESTRICT para impedir exclusão acidental. (5) UUID como PK é melhor que SERIAL para microsserviços e dados que precisam ser mesclados.',
          },
        ],
        exercise: {
          title: 'Modelar banco de dados de e-commerce',
          description: 'Projete o schema SQL para um e-commerce com: usuários, endereços (um usuário pode ter vários), produtos, categorias, pedidos e itens de pedido. Implemente como código JavaScript que constrói e valida as relações. Use objetos para simular as tabelas e verifique integridade referencial.',
                    solutionHint: 'Entidades: Usuario, Produto, Pedido, ItemPedido, Categoria. ItemPedido é a tabela de junção entre Pedido e Produto com quantidade e preco_unitario.',
starterCode: '// Simulação de schema relacional em JavaScript\n// Use objetos para representar "tabelas" e valide as relações\n\nconst db = {\n  usuarios: [\n    { id: 1, email: "ana@email.com", nome: "Ana" },\n    { id: 2, email: "bruno@email.com", nome: "Bruno" },\n  ],\n  enderecos: [\n    // Um usuário pode ter múltiplos endereços (1:N)\n    { id: 1, usuario_id: 1, rua: "Av. Paulista", cidade: "São Paulo", principal: true },\n    { id: 2, usuario_id: 1, rua: "Rua XV", cidade: "Curitiba", principal: false },\n  ],\n  categorias: [\n    { id: 1, nome: "Eletrônicos" },\n    { id: 2, nome: "Livros" },\n  ],\n  produtos: [\n    { id: 1, nome: "Notebook", preco: 3500.00, categoria_id: 1, estoque: 10 },\n    { id: 2, nome: "Clean Code", preco: 89.90, categoria_id: 2, estoque: 50 },\n  ],\n  pedidos: [],\n  itens_pedido: [],\n};\n\n// Implemente as funções abaixo:\n\nfunction criarPedido(usuario_id, itens) {\n  // itens: [{ produto_id, quantidade }]\n  // Valide: usuário existe, produtos existem, estoque suficiente\n  // Crie o pedido e os itens\n  // Retorne o pedido com total calculado\n}\n\nfunction obterPedidoComItens(pedido_id) {\n  // Faça um "JOIN" manual: pedido + itens + nomes dos produtos\n  // Retorne pedido com array de itens enriquecidos\n}\n\n// Teste\nconst pedido = criarPedido(1, [\n  { produto_id: 1, quantidade: 1 },\n  { produto_id: 2, quantidade: 2 },\n]);\nconsole.log("Pedido criado, ID:", pedido?.id);\nconsole.log("Total:", pedido?.total);\n\nconst detalhe = obterPedidoComItens(pedido?.id);\nconsole.log("Itens:", detalhe?.itens?.length);\nconsole.log("Produto 1:", detalhe?.itens?.[0]?.nome);\n',
          solutionHint: 'criarPedido: valide usuario_id em db.usuarios, cada produto_id em db.produtos, cheque estoque, calcule total = SUM(preco * quantidade)',
          validate: (output, code) => {
            return output.includes('Pedido criado, ID:') &&
              output.includes('Total:') &&
              output.includes('Itens: 2') &&
              (output.includes('Notebook') || output.includes('Clean Code'));
          },
          validateMessage: 'Crie o pedido com ID, mostre o total, 2 itens e o nome do primeiro produto.',
        },
        quiz: [
          { question: 'O que é normalização de banco de dados?', options: ['Padronizar o formato das datas', 'Processo de organizar tabelas para eliminar redundância e dependências indesejadas', 'Compressão dos dados', 'Ordenação das colunas'], correct: 1, explanation: 'Normalização elimina redundâncias: se o mesmo dado aparece em vários lugares, uma mudança precisa ser feita em N lugares — causando inconsistência. 3FN resolve a maioria dos problemas práticos.' },
          { question: 'Por que nunca usar FLOAT para armazenar valores monetários?', options: ['FLOAT é mais lento', 'FLOAT tem imprecisão de ponto flutuante — 0.1 + 0.2 ≠ 0.3 em binário', 'FLOAT usa mais espaço', 'Por convenção apenas'], correct: 1, explanation: 'FLOAT representa números em binário e não consegue representar exatamente todos os decimais. R$ 1.10 pode virar 1.0999999999... Use DECIMAL(15,2) ou armazene em centavos como INTEGER.' },
          { question: 'Qual a diferença entre ON DELETE CASCADE e ON DELETE RESTRICT?', options: ['São equivalentes', 'CASCADE: exclui registros filhos automaticamente; RESTRICT: impede exclusão se houver filhos', 'RESTRICT é mais rápido', 'CASCADE é mais seguro'], correct: 1, explanation: 'CASCADE: ao deletar usuário, deleta todos os posts dele. RESTRICT: impede deletar categoria se tiver produtos — protege contra exclusão acidental de dados órfãos.' },
          { question: 'Por que UUID é preferível a SERIAL (auto-increment) em sistemas distribuídos?', options: ['UUID é mais rápido', 'UUID é gerado localmente sem coordenação — pode ser criado em qualquer serviço sem conflito', 'SERIAL usa mais espaço', 'UUID é mais seguro'], correct: 1, explanation: 'SERIAL requer um contador central — em sistemas distribuídos, dois serviços podem gerar o mesmo ID. UUID é gerado localmente com probabilidade de colisão desprezível, sem coordenação.' },
          { question: 'O que é uma tabela pivot (junção)?', options: ['Uma tabela especial do banco', 'Tabela intermediária que implementa relacionamento N:N com duas chaves estrangeiras', 'Um índice composto', 'Uma view materializada'], correct: 1, explanation: 'N:N não existe diretamente em relacional. posts_tags é uma tabela pivot: cada linha representa uma associação (post_id, tag_id). A PK composta previne duplicatas da mesma associação.' },
        ],
      },
    },
    {
      id: 'mod-12-2',
      title: 'SQL Avançado: Joins, Agregações e Subqueries',
      duration: '60 min',
      xp: 250,
      content: {
        sections: [
          {
            type: 'text',
            content: 'SQL é uma linguagem declarativa — você descreve o que quer, não como obter. Dominar JOINs, agregações e subqueries é a diferença entre resolver um problema em uma query eficiente ou trazer todos os dados para o código e processar manualmente — o que escala pessimamente.',
          },
          {
            type: 'code',
            lang: 'sql',
            content: '-- ── JOINS ───────────────────────────────────────────\n-- INNER JOIN: apenas registros que têm correspondência nos dois lados\nSELECT\n  p.titulo,\n  u.nome   AS autor,\n  COUNT(c.id) AS total_comentarios\nFROM posts p\n  INNER JOIN usuarios u ON p.autor_id = u.id\n  LEFT  JOIN comentarios c ON c.post_id = p.id\nWHERE p.publicado = TRUE\nGROUP BY p.id, p.titulo, u.nome\nHAVING COUNT(c.id) >= 5\nORDER BY total_comentarios DESC\nLIMIT 10;\n\n-- LEFT JOIN: todos os posts, mesmo sem comentários\n-- RIGHT JOIN: todos os comentários, mesmo sem post (raro — prefira LEFT)\n-- FULL OUTER JOIN: todos de ambos os lados (menos comum)\n-- CROSS JOIN: produto cartesiano — N × M linhas (cuidado!)\n\n-- ── JOINS MÚLTIPLOS ──────────────────────────────────\n-- Posts com tags (N:N via tabela pivot)\nSELECT\n  p.titulo,\n  STRING_AGG(t.nome, \', \' ORDER BY t.nome) AS tags\nFROM posts p\n  LEFT JOIN posts_tags pt ON pt.post_id = p.id\n  LEFT JOIN tags t        ON t.id = pt.tag_id\nWHERE p.publicado = TRUE\nGROUP BY p.id, p.titulo;\n\n-- ── SELF JOIN — tabela se juntando consigo mesma ─────\n-- Ex: funcionários e seus gerentes (mesma tabela)\nSELECT\n  e.nome   AS funcionario,\n  g.nome   AS gerente\nFROM funcionarios e\n  LEFT JOIN funcionarios g ON g.id = e.gerente_id\nORDER BY gerente, funcionario;',
          },
          {
            type: 'code',
            lang: 'sql',
            content: '-- ── FUNÇÕES DE AGREGAÇÃO ────────────────────────────\nSELECT\n  DATE_TRUNC(\'month\', created_at) AS mes,\n  COUNT(*)                         AS total_pedidos,\n  COUNT(DISTINCT cliente_id)       AS clientes_unicos,\n  SUM(total)                       AS receita,\n  AVG(total)                       AS ticket_medio,\n  MIN(total)                       AS menor_pedido,\n  MAX(total)                       AS maior_pedido,\n  PERCENTILE_CONT(0.5)\n    WITHIN GROUP (ORDER BY total)  AS mediana\nFROM pedidos\nWHERE created_at >= NOW() - INTERVAL \'12 months\'\nGROUP BY DATE_TRUNC(\'month\', created_at)\nORDER BY mes;\n\n-- ── WINDOW FUNCTIONS ─────────────────────────────────\n-- Calculam sobre um conjunto de linhas SEM colapsar (diferente de GROUP BY)\nSELECT\n  nome,\n  departamento,\n  salario,\n  -- Rank dentro do departamento\n  RANK() OVER (PARTITION BY departamento ORDER BY salario DESC) AS rank_dept,\n  -- Média do departamento em cada linha\n  AVG(salario) OVER (PARTITION BY departamento) AS media_dept,\n  -- Percentual acumulado\n  salario / SUM(salario) OVER () * 100 AS pct_folha,\n  -- Linha anterior\n  LAG(salario)  OVER (PARTITION BY departamento ORDER BY salario) AS salario_anterior,\n  -- Linha seguinte\n  LEAD(salario) OVER (PARTITION BY departamento ORDER BY salario) AS proximo_salario\nFROM funcionarios;\n\n-- ROW_NUMBER: número único sequencial por janela\n-- RANK: igual ao ROW_NUMBER mas empata em caso de igualdade\n-- DENSE_RANK: RANK sem pular números após empate',
          },
          {
            type: 'code',
            lang: 'sql',
            content: '-- ── SUBQUERIES E CTEs ───────────────────────────────\n-- Subquery: query dentro de query\nSELECT nome, email\nFROM usuarios\nWHERE id IN (\n  SELECT DISTINCT autor_id\n  FROM posts\n  WHERE publicado = TRUE\n    AND created_at >= NOW() - INTERVAL \'30 days\'\n);\n\n-- CTE (Common Table Expression) — muito mais legível\n-- WITH nomeia um resultado temporário\nWITH\n  autores_ativos AS (\n    SELECT DISTINCT autor_id\n    FROM posts\n    WHERE publicado = TRUE\n      AND created_at >= NOW() - INTERVAL \'30 days\'\n  ),\n  stats_por_autor AS (\n    SELECT\n      autor_id,\n      COUNT(*)    AS total_posts,\n      SUM(views)  AS total_views\n    FROM posts\n    GROUP BY autor_id\n  )\nSELECT\n  u.nome,\n  u.email,\n  s.total_posts,\n  s.total_views\nFROM usuarios u\n  INNER JOIN autores_ativos aa ON aa.autor_id = u.id\n  INNER JOIN stats_por_autor  s  ON s.autor_id  = u.id\nORDER BY s.total_views DESC;\n\n-- CTE RECURSIVA — para estruturas hierárquicas\nWITH RECURSIVE hierarquia AS (\n  -- Caso base: CEO (sem gerente)\n  SELECT id, nome, gerente_id, 0 AS nivel\n  FROM funcionarios\n  WHERE gerente_id IS NULL\n  UNION ALL\n  -- Caso recursivo: subordinados\n  SELECT f.id, f.nome, f.gerente_id, h.nivel + 1\n  FROM funcionarios f\n    INNER JOIN hierarquia h ON h.id = f.gerente_id\n)\nSELECT REPEAT(\'  \', nivel) || nome AS arvore\nFROM hierarquia\nORDER BY nivel, nome;',
          },
          {
            type: 'highlight',
            content: '🚀 Window functions são uma das features mais poderosas do SQL e as menos conhecidas. Elas permitem calcular rankings, médias móveis, totais acumulados e comparações com linhas adjacentes — tudo em uma única query sem subqueries complexas. Dominá-las elimina código Python/JavaScript que processa dados que o banco poderia processar muito mais rápido.',
          },
        ,
                  {
                    type: 'common_error',
                    title: 'Armazenar múltiplos valores em uma coluna (1NF)',
                    wrong: `-- Violação da 1ª Forma Normal
CREATE TABLE pedidos (
  id        INT,
  cliente   VARCHAR(100),
  produtos  VARCHAR(500) -- "caneta,caderno,régua"
);
-- Como buscar pedidos com "caneta"? LIKE '%caneta%' — lento e frágil!`,
                    wrongLabel: 'Coluna com múltiplos valores impossibilita filtros eficientes e índices.',
                    right: `-- Forma correta: tabela de relacionamento
CREATE TABLE pedidos (id INT, cliente VARCHAR(100));
CREATE TABLE itens_pedido (
  pedido_id  INT REFERENCES pedidos(id),
  produto    VARCHAR(100)
);
-- SELECT * FROM pedidos p JOIN itens_pedido i ON p.id = i.pedido_id
-- WHERE i.produto = 'caneta' -- usa índice, O(log n)`,
                    rightLabel: '1NF: cada coluna deve ter um único valor atômico. Relacionamentos usam tabelas separadas.',
                    explanation: 'Armazenar listas em colunas de texto é um dos erros mais comuns de modelagem. Impossibilita JOINs, índices, integridade referencial e queries eficientes. Separe em uma tabela com chave estrangeira.',
                  }],
        exercise: {
          title: 'Relatório de vendas com SQL avançado',
          description: 'Usando os dados simulados abaixo, implemente em JavaScript funções que simulam queries SQL complexas: (1) topVendedores(n) — top N vendedores por receita total com ranking, (2) tendenciaMensal() — receita por mês com variação percentual em relação ao mês anterior, (3) clientesInativos(dias) — clientes sem compra nos últimos X dias.',
                    solutionHint: 'GROUP BY para agrupar. SUM(valor) para total. COUNT(*) para quantidade. HAVING filtra grupos (diferente de WHERE que filtra linhas). JOIN para unir tabelas.',
starterCode: 'const dados = {\n  clientes: [\n    { id: 1, nome: "Ana", email: "ana@email.com" },\n    { id: 2, nome: "Bruno", email: "bruno@email.com" },\n    { id: 3, nome: "Carlos", email: "carlos@email.com" },\n  ],\n  vendedores: [\n    { id: 1, nome: "João" },\n    { id: 2, nome: "Maria" },\n  ],\n  pedidos: [\n    { id: 1, cliente_id: 1, vendedor_id: 1, total: 1500, data: new Date("2024-01-15") },\n    { id: 2, cliente_id: 2, vendedor_id: 2, total: 2200, data: new Date("2024-01-20") },\n    { id: 3, cliente_id: 1, vendedor_id: 1, total: 800,  data: new Date("2024-02-05") },\n    { id: 4, cliente_id: 3, vendedor_id: 2, total: 3100, data: new Date("2024-02-18") },\n    { id: 5, cliente_id: 2, vendedor_id: 1, total: 950,  data: new Date("2024-03-10") },\n  ],\n};\n\nfunction topVendedores(n) {\n  // Agrupe pedidos por vendedor, some o total, ordene e pegue top N\n  // Retorne array com: { rank, nome, totalVendas, numeroPedidos }\n}\n\nfunction tendenciaMensal() {\n  // Agrupe por mês, some receita\n  // Calcule variação percentual vs mês anterior\n  // Retorne: [{ mes, receita, variacaoPct }]\n}\n\nfunction clientesInativos(dias) {\n  // Encontre clientes cuja última compra foi há mais de X dias\n  // Retorne: [{ nome, email, ultimaCompra, diasSemCompra }]\n}\n\n// Testes\nconsole.log("Top vendedores:", JSON.stringify(topVendedores(2)));\nconsole.log("Tendência:", JSON.stringify(tendenciaMensal()));\nconsole.log("Inativos 60 dias:", clientesInativos(60).map(c => c.nome).join(", "));\n',
          solutionHint: 'topVendedores: reduce por vendedor_id, join com vendedores, sort por total DESC, slice(0,n), map com rank | tendencia: agrupar por mes (data.toISOString().slice(0,7)), calcular variacao = (atual-anterior)/anterior*100',
          validate: (output, code) => {
            return output.includes('Top vendedores:') &&
              output.includes('Tendência:') &&
              output.includes('Inativos');
          },
          validateMessage: 'Exiba os top vendedores, a tendência mensal e os clientes inativos.',
        },
        quiz: [
          { question: 'Qual a diferença entre WHERE e HAVING?', options: ['São equivalentes', 'WHERE filtra linhas antes da agregação; HAVING filtra grupos após a agregação', 'HAVING é mais rápido', 'WHERE só funciona com números'], correct: 1, explanation: 'WHERE filtra linhas antes do GROUP BY — age sobre dados brutos. HAVING filtra grupos depois do GROUP BY — age sobre resultados de funções de agregação como COUNT(), SUM(). Ex: HAVING COUNT(*) > 5.' },
          { question: 'O que é uma CTE (WITH clause)?', options: ['Um tipo de índice', 'Um resultado temporário nomeado que pode ser referenciado na query principal — melhora legibilidade', 'Uma tabela permanente', 'Um procedimento armazenado'], correct: 1, explanation: 'CTE cria um "alias" para uma subquery. Benefícios: legibilidade (nome descritivo), reuso (pode ser referenciada múltiplas vezes), e CTEs recursivas para hierarquias. Compilador geralmente otimiza igual a subquery.' },
          { question: 'Qual a diferença entre RANK() e DENSE_RANK()?', options: ['São idênticas', 'RANK() pula números após empate (1,1,3); DENSE_RANK() não pula (1,1,2)', 'DENSE_RANK é mais lento', 'RANK() só funciona com números'], correct: 1, explanation: 'Se dois vendedores empatam em 1º lugar: RANK() dá 1,1,3 (pula o 2). DENSE_RANK() dá 1,1,2 (sem pular). ROW_NUMBER() sempre dá números únicos mesmo em empate — ordem arbitrária entre empatados.' },
          { question: 'Quando usar LEFT JOIN em vez de INNER JOIN?', options: ['Sempre usar LEFT JOIN', 'LEFT JOIN quando você quer TODOS os registros do lado esquerdo, mesmo sem correspondência direita', 'INNER JOIN é mais rápido sempre', 'São equivalentes com WHERE'], correct: 1, explanation: 'INNER JOIN: apenas registros com match nos dois lados — posts SEM comentários desaparecem. LEFT JOIN: todos os posts, com NULL nos campos de comentário quando não houver — perfeito para "listar tudo com contagem opcional".' },
          { question: 'O que faz STRING_AGG() no PostgreSQL?', options: ['Agrupa strings em uma tabela', 'Concatena valores de múltiplas linhas em uma única string com separador', 'Conta strings únicas', 'Converte array em string'], correct: 1, explanation: 'STRING_AGG(coluna, separador) é o equivalente SQL do Array.join() do JavaScript. Muito usado para agregar tags, categorias ou qualquer lista em uma query sem trazer múltiplas linhas para o código.' },
        ],
      },
    },
    {
      id: 'mod-12-3',
      title: 'Índices e Query Planning',
      duration: '55 min',
      xp: 260,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Índices são a ferramenta mais poderosa para otimização de banco de dados — e a mais mal compreendida. Um índice correto transforma uma query de 30 segundos em 5 milissegundos. Um índice errado ou desnecessário torna INSERT e UPDATE mais lentos. Entender quando e como criar índices é uma habilidade de sênior.',
          },
          {
            type: 'code',
            lang: 'sql',
            content: '-- ── COMO ÍNDICES FUNCIONAM ──────────────────────────\n-- Sem índice: Table Scan — lê TODAS as linhas (O(n))\n-- Com índice B-Tree: lê apenas o caminho necessário (O(log n))\n\n-- PostgreSQL cria índice automaticamente em:\n--   PRIMARY KEY, UNIQUE\n-- Você precisa criar manualmente em:\n--   colunas usadas em WHERE, JOIN ON, ORDER BY frequentes\n\n-- Índice simples\nCREATE INDEX idx_posts_autor ON posts (autor_id);\nCREATE INDEX idx_posts_publicado ON posts (publicado) WHERE publicado = TRUE;\n-- Índice parcial: só indexa posts publicados — menor, mais rápido!\n\n-- Índice composto (ordem IMPORTA!)\nCREATE INDEX idx_posts_autor_publicado ON posts (autor_id, publicado);\n-- Serve para: WHERE autor_id = 1\n--             WHERE autor_id = 1 AND publicado = TRUE\n-- NÃO serve para: WHERE publicado = TRUE (sem autor_id à esquerda)\n\n-- Índice para texto: full-text search\nCREATE INDEX idx_posts_titulo_fts\n  ON posts USING GIN (to_tsvector(\'portuguese\', titulo || \' \' || conteudo));\n-- Busca eficiente de palavras dentro de textos longos\n\n-- Índice para JSONB\nCREATE INDEX idx_eventos_tipo\n  ON eventos USING GIN (payload jsonb_path_ops);\n-- Permite: WHERE payload @> \'{"tipo": "compra"}\' em O(log n)',
          },
          {
            type: 'code',
            lang: 'sql',
            content: '-- ── EXPLAIN ANALYZE — entendendo o query plan ──────\n-- EXPLAIN: mostra o plano SEM executar\n-- EXPLAIN ANALYZE: executa E mostra o plano com tempos reais\n\nEXPLAIN ANALYZE\nSELECT p.titulo, u.nome\nFROM posts p\n  INNER JOIN usuarios u ON u.id = p.autor_id\nWHERE p.publicado = TRUE\nORDER BY p.created_at DESC\nLIMIT 20;\n\n-- Saída típica (leia de dentro para fora):\n-- Limit  (cost=0.43..1.23 rows=20 width=52) (actual time=0.089..0.134)\n--   -> Sort  (cost=0.43..12.93 rows=500) (actual time=0.087..0.107)\n--       -> Hash Join  (cost=8.27..15.77) (actual time=0.054..0.079)\n--           -> Seq Scan on posts (cost=0.00..5.00) -- ← TABLE SCAN! ruim\n--           -> Hash (cost=5.27..5.27)\n--               -> Seq Scan on usuarios\n\n-- O que procurar:\n-- "Seq Scan" com muitas linhas → pode precisar de índice\n-- "Index Scan" → está usando índice (bom!)\n-- "Bitmap Heap Scan" → índice + heap, aceitável\n-- "Hash Join" → join eficiente para grandes conjuntos\n-- "Nested Loop" → join eficiente para pequenos conjuntos\n-- "cost=X..Y" → custo estimado (X=primeiro resultado, Y=todos)\n-- "actual time=X..Y" → tempo real em ms\n-- "rows=N" → estimativa vs "actual rows=M" (divergência = stats desatualizadas)\n\n-- Atualizar estatísticas\nANALYZE posts;           -- atualiza stats de uma tabela\nVACUUM ANALYZE posts;    -- limpeza + stats',
          },
          {
            type: 'code',
            lang: 'sql',
            content: '-- ── PROBLEMAS COMUNS DE PERFORMANCE ─────────────────\n\n-- 1. SELECT * — nunca em produção!\n-- ❌ Ruim: traz todas as colunas, incluindo conteudo (TEXT longo)\nSELECT * FROM posts WHERE autor_id = 1;\n-- ✅ Bom: apenas o necessário\nSELECT id, titulo, publicado, created_at FROM posts WHERE autor_id = 1;\n\n-- 2. N+1 Problem — o bug de performance mais comum em ORMs\n-- ❌ Ruim: 1 query para posts + N queries para cada autor\n-- for (const post of posts) {\n--   post.autor = await buscarUsuario(post.autor_id); // N queries!\n-- }\n-- ✅ Bom: 1 query com JOIN\nSELECT p.*, u.nome AS autor_nome\nFROM posts p\n  INNER JOIN usuarios u ON u.id = p.autor_id;\n\n-- 3. Função em coluna indexada — quebra o índice!\n-- ❌ Ruim: TO_DATE() impede uso do índice em created_at\nSELECT * FROM posts WHERE DATE(created_at) = \'2024-01-15\';\n-- ✅ Bom: compara diretamente (índice usado)\nSELECT * FROM posts\nWHERE created_at >= \'2024-01-15\'::date\n  AND created_at <  \'2024-01-16\'::date;\n\n-- 4. LIKE com wildcard no início — não usa índice\n-- ❌ Ruim: \'%palavra\' não usa índice B-Tree\nSELECT * FROM posts WHERE titulo LIKE \'%javascript%\';\n-- ✅ Bom: use full-text search com GIN\nSELECT * FROM posts\nWHERE to_tsvector(\'portuguese\', titulo) @@ plainto_tsquery(\'javascript\');\n\n-- 5. Paginação com OFFSET — lento para páginas grandes!\n-- ❌ Ruim: OFFSET 10000 lê e descarta 10000 linhas\nSELECT * FROM posts ORDER BY id LIMIT 20 OFFSET 10000;\n-- ✅ Bom: cursor-based pagination\nSELECT * FROM posts WHERE id > 10000 ORDER BY id LIMIT 20;',
          },
          {
            type: 'highlight',
            content: '🔍 Workflow de otimização: (1) Identifique queries lentas com pg_stat_statements ou logs. (2) Rode EXPLAIN ANALYZE e procure Seq Scan em tabelas grandes. (3) Crie índice na coluna do WHERE/JOIN/ORDER BY. (4) Verifique se o plano mudou de Seq Scan para Index Scan. (5) Nunca crie índice sem medir — cada índice tem custo em INSERT/UPDATE.',
          },
        ],
        exercise: {
          title: 'Identificar e corrigir problemas de performance',
          description: 'Analise o conjunto de queries abaixo e para cada uma: (1) identifique o problema de performance, (2) implemente a versão corrigida em JavaScript. Simule como se fossem queries reais: sem SELECT *, resolvendo N+1, usando cursor pagination.',
                    solutionHint: 'Seq Scan = sem índice (lento). Index Scan = índice usado (rápido). N+1: use JOIN ou eager loading. Índice composto para queries com múltiplas condições no WHERE.',
starterCode: 'const posts = Array.from({length: 1000}, (_, i) => ({\n  id: i + 1,\n  titulo: `Post ${i + 1}`,\n  conteudo: "x".repeat(5000), // conteúdo longo\n  autor_id: (i % 10) + 1,\n  views: Math.floor(Math.random() * 10000),\n  publicado: i % 3 !== 0,\n  created_at: new Date(Date.now() - i * 86400000),\n}));\n\nconst usuarios = Array.from({length: 10}, (_, i) => ({\n  id: i + 1,\n  nome: `Autor ${i + 1}`,\n  email: `autor${i+1}@email.com`,\n}));\n\n// PROBLEMA 1: SELECT * trazendo conteúdo desnecessário\n// ❌ Ruim:\nfunction listarPostsRuim() {\n  return posts.filter(p => p.publicado); // retorna TUDO incluindo conteudo longo\n}\n\n// ✅ Corrija: retorne apenas id, titulo, autor_id, views, created_at\nfunction listarPostsBom() {\n  // implemente\n}\n\n// PROBLEMA 2: N+1 — busca autor separadamente para cada post\n// ❌ Ruim:\nfunction postsComAutoresRuim(ids) {\n  return ids.map(id => {\n    const post = posts.find(p => p.id === id);\n    const autor = usuarios.find(u => u.id === post.autor_id); // N queries!\n    return { ...post, autor_nome: autor.nome };\n  });\n}\n\n// ✅ Corrija: pré-carregue autores em um Map, depois faça o join\nfunction postsComAutoresBom(ids) {\n  // implemente\n}\n\n// PROBLEMA 3: OFFSET para paginação\n// ❌ Ruim: simula OFFSET (varre todos até a página)\nfunction paginarRuim(pagina, tamanho) {\n  const inicio = pagina * tamanho;\n  return posts.slice(inicio, inicio + tamanho); // simula OFFSET\n}\n\n// ✅ Corrija: cursor-based (usa o último ID visto)\nfunction paginarBom(ultimoId, tamanho) {\n  // retorne `tamanho` posts com id > ultimoId, ordenados por id\n}\n\n// Testes\nconst listaBoa = listarPostsBom();\nconsole.log("Sem conteudo:", !("conteudo" in listaBoa[0]));\n\nconst comAutores = postsComAutoresBom([1, 2, 3]);\nconsole.log("Com autor:", comAutores[0].autor_nome);\n\nconst pagina = paginarBom(0, 5);\nconsole.log("Cursor paginado, IDs:", pagina.map(p => p.id).join(","));\n\nconst proximaPagina = paginarBom(pagina.at(-1).id, 5);\nconsole.log("Próxima página, IDs:", proximaPagina.map(p => p.id).join(","));\n',
          solutionHint: 'listarPostsBom: map com ({ id, titulo, autor_id, views, created_at }) | postsComAutoresBom: const mapaAutores = new Map(usuarios.map(u => [u.id, u])), depois map com post + mapaAutores.get(post.autor_id) | paginarBom: filter id > ultimoId, slice(0, tamanho)',
          validate: (output, code) => {
            return output.includes('Sem conteudo: true') &&
              output.includes('Com autor: Autor') &&
              output.includes('Cursor paginado, IDs: 1,2,3,4,5') &&
              output.includes('Próxima página, IDs: 6,7,8,9,10');
          },
          validateMessage: 'Confirme: sem conteudo (true), autor preenchido, IDs 1-5 e depois 6-10.',
        },
        quiz: [
          { question: 'Por que "SELECT *" é problemático em produção?', options: ['Por convenção de estilo', 'Traz todas as colunas incluindo campos grandes (TEXT, BLOB), aumenta transferência e impede uso de index-only scans', 'É mais lento de escrever', 'Não funciona com JOINs'], correct: 1, explanation: 'SELECT * traz colunas desnecessárias (conteúdo de posts, imagens encodadas), aumenta uso de rede e memória, e impede index-only scan (onde o banco responde apenas com dados do índice sem acessar a tabela).' },
          { question: 'O que é o problema N+1?', options: ['Quando você tem N+1 tabelas', 'Uma query que busca N resultados, depois faz mais N queries individuais para cada resultado', 'Um erro de contagem SQL', 'Quando um índice tem N+1 colunas'], correct: 1, explanation: 'N+1: 1 query para listar 100 posts + 100 queries para buscar o autor de cada post = 101 queries. Solução: JOIN para trazer tudo em uma query, ou DataLoader para batching.' },
          { question: 'Por que aplicar função em coluna indexada quebra o índice?', options: ['Funções são muito lentas', 'O índice armazena o valor da coluna, não o resultado da função — o banco não consegue usar o índice para encontrar DATE(created_at)', 'Funções retornam NULL', 'O banco não suporta funções em índices'], correct: 1, explanation: 'Se o índice está em created_at, o banco pode fazer busca binária por created_at. Se você aplica DATE(created_at), o banco precisa calcular DATE() para cada linha antes de comparar — não pode usar o índice.' },
          { question: 'Por que OFFSET é lento para páginas grandes?', options: ['OFFSET usa muito memória', 'O banco precisa ler e descartar as primeiras N linhas — OFFSET 10000 LIMIT 20 lê 10020 linhas', 'OFFSET não funciona com índices', 'OFFSET bloqueia a tabela'], correct: 1, explanation: 'Cursor-based pagination usa WHERE id > ultimo_id — o banco usa o índice para ir direto às linhas certas. OFFSET sempre começa do início e descarta, ficando mais lento conforme a página aumenta.' },
          { question: 'Quando um índice composto (col1, col2) pode ser usado?', options: ['Apenas quando ambas as colunas estão no WHERE', 'Para queries em col1 ou (col1 AND col2) — o prefixo mais à esquerda deve estar presente', 'Apenas com ORDER BY', 'Para qualquer combinação das duas colunas'], correct: 1, explanation: 'Índice (autor_id, publicado) serve para: WHERE autor_id = 1, WHERE autor_id = 1 AND publicado = TRUE. Não serve para: WHERE publicado = TRUE (sem autor_id). A regra é: a coluna mais à esquerda deve estar presente.' },
        ],
      },
    },
    {
      id: 'mod-12-4',
      title: 'Transações ACID e Concorrência',
      duration: '50 min',
      xp: 260,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Transações são o mecanismo que garante que operações relacionadas acontecem de forma atômica — tudo ou nada. ACID (Atomicidade, Consistência, Isolamento, Durabilidade) é o conjunto de propriedades que torna bancos de dados confiáveis. Entender isolamento e locks é essencial para evitar bugs de concorrência em sistemas com múltiplos usuários.',
          },
          {
            type: 'code',
            lang: 'sql',
            content: '-- ── TRANSAÇÕES BÁSICAS ──────────────────────────────\n-- Sem transação: se a segunda query falhar, o dinheiro some!\n-- ❌ Perigoso\nUPDATE contas SET saldo = saldo - 100 WHERE id = 1; -- débito\nUPDATE contas SET saldo = saldo + 100 WHERE id = 2; -- crédito (pode falhar!)\n\n-- ✅ Com transação: ou as duas acontecem ou nenhuma\nBEGIN;\n  UPDATE contas SET saldo = saldo - 100 WHERE id = 1;\n  -- Verifica se saldo ficou negativo\n  DO $$ BEGIN\n    IF (SELECT saldo FROM contas WHERE id = 1) < 0 THEN\n      RAISE EXCEPTION \'Saldo insuficiente\';\n    END IF;\n  END $$;\n  UPDATE contas SET saldo = saldo + 100 WHERE id = 2;\nCOMMIT;\n-- Se qualquer erro ocorrer, ROLLBACK automático\n\n-- ── PROPRIEDADES ACID ────────────────────────────────\n-- ATOMICIDADE: tudo ou nada — não existe "meio executado"\n-- CONSISTÊNCIA: transação leva o banco de um estado válido a outro válido\n-- ISOLAMENTO: transações concorrentes não se veem mutuamente\n-- DURABILIDADE: após COMMIT, os dados persistem mesmo com crash\n\n-- ── SAVEPOINTS — pontos de retorno parcial ───────────\nBEGIN;\n  UPDATE produtos SET estoque = estoque - 1 WHERE id = 1;\n  SAVEPOINT antes_desconto;\n  \n  UPDATE pedidos SET desconto = 10 WHERE id = 99;\n  -- Algo deu errado com o desconto\n  ROLLBACK TO SAVEPOINT antes_desconto;\n  -- O estoque ainda foi decrementado, apenas o desconto foi revertido\n  \n  UPDATE pedidos SET desconto = 0 WHERE id = 99;\nCOMMIT;',
          },
          {
            type: 'code',
            lang: 'sql',
            content: '-- ── NÍVEIS DE ISOLAMENTO ────────────────────────────\n-- Trade-off: mais isolamento = mais bloqueio = menos concorrência\n\n-- READ UNCOMMITTED: vê dados não commitados de outras transações\n-- → "Dirty Read" — muito perigoso, evite\n\n-- READ COMMITTED (padrão PostgreSQL): só vê dados commitados\n-- → Previne: dirty reads\n-- → Permite: non-repeatable reads (mesma query dá resultados diferentes)\n\n-- REPEATABLE READ: a mesma query sempre retorna os mesmos dados\n-- → Previne: dirty reads, non-repeatable reads\n-- → Permite: phantom reads (novas linhas aparecem)\n\n-- SERIALIZABLE: máximo isolamento — transações parecem sequenciais\n-- → Previne: todos os anomalias, mas mais lento\n\n-- Configurar nível de isolamento\nBEGIN ISOLATION LEVEL SERIALIZABLE;\n  -- operações críticas aqui\nCOMMIT;\n\n-- ── LOCKING: LOCKS EXPLÍCITOS ────────────────────────\n-- FOR UPDATE: bloqueia as linhas para outras transações\nBEGIN;\n  -- "Reserva" as linhas — outras transações esperam\n  SELECT saldo FROM contas WHERE id = 1 FOR UPDATE;\n  UPDATE contas SET saldo = saldo - 100 WHERE id = 1;\nCOMMIT;\n\n-- FOR UPDATE NOWAIT: falha imediatamente se estiver bloqueado\nBEGIN;\n  SELECT * FROM produtos WHERE id = 1 FOR UPDATE NOWAIT;\n  -- Lança erro se outro processo já bloqueou\nCOMMIT;\n\n-- ── DEADLOCK ─────────────────────────────────────────\n-- Transação A: bloqueia conta 1, espera conta 2\n-- Transação B: bloqueia conta 2, espera conta 1\n-- → Deadlock! PostgreSQL detecta e mata uma das transações\n-- Prevenção: sempre acesse recursos na mesma ordem (menor ID primeiro)\nBEGIN;\n  -- Sempre bloqueia na ordem crescente de ID\n  SELECT * FROM contas WHERE id = LEAST(1, 2) FOR UPDATE;\n  SELECT * FROM contas WHERE id = GREATEST(1, 2) FOR UPDATE;\nCOMMIT;',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── TRANSAÇÕES NO PRISMA ─────────────────────────────\nconst { PrismaClient } = require("@prisma/client");\nconst prisma = new PrismaClient();\n\n// Transação interativa — controle total\nasync function transferir(deContaId, paraContaId, valor) {\n  return prisma.$transaction(async (tx) => {\n    // SELECT FOR UPDATE — bloqueia as linhas\n    const deConta = await tx.$queryRaw`\n      SELECT id, saldo FROM contas\n      WHERE id = ${deContaId}\n      FOR UPDATE\n    `;\n    \n    if (deConta[0].saldo < valor) {\n      throw new Error("Saldo insuficiente"); // ROLLBACK automático!\n    }\n    \n    await tx.conta.update({\n      where: { id: deContaId },\n      data: { saldo: { decrement: valor } },\n    });\n    \n    await tx.conta.update({\n      where: { id: paraContaId },\n      data: { saldo: { increment: valor } },\n    });\n    \n    // Se qualquer erro → ROLLBACK automático\n    return { sucesso: true, valor };\n  });\n}\n\n// Otimistic locking — sem bloqueio, detecta conflito na hora de salvar\nasync function atualizarEstoqueOtimista(produtoId, quantidade) {\n  const produto = await prisma.produto.findUnique({ where: { id: produtoId } });\n  \n  // Tenta atualizar apenas se a versão não mudou\n  const atualizado = await prisma.produto.updateMany({\n    where: {\n      id: produtoId,\n      versao: produto.versao, // se alguém mudou, versao é diferente\n    },\n    data: {\n      estoque: { decrement: quantidade },\n      versao: { increment: 1 },\n    },\n  });\n  \n  if (atualizado.count === 0) {\n    throw new Error("Conflito de concorrência — tente novamente");\n  }\n}',
          },
          {
            type: 'highlight',
            content: '⚡ Regra prática: use transações sempre que duas ou mais operações precisam acontecer juntas — transferências, pedidos com itens, decrementar estoque ao confirmar compra. O Prisma reverte automaticamente em caso de erro dentro de $transaction(). Para alta concorrência: prefira optimistic locking (versionamento) a locks pessimistas — menos bloqueio, mais throughput.',
          },
        ,
                  {
                    type: 'common_error',
                    title: 'O problema N+1: buscar dados em loop',
                    wrong: `-- Buscar posts e seus autores
const posts = await db.query('SELECT * FROM posts');
// Para cada post, busca o autor individualmente!
for (const post of posts) {
  post.autor = await db.query(
    'SELECT * FROM users WHERE id = ?', [post.user_id]
  );
}
// 1 query para posts + N queries para autores = N+1!`,
                    wrongLabel: '100 posts = 101 queries ao banco. N+1 é silencioso e destrói a performance.',
                    right: `-- Uma única query com JOIN
const posts = await db.query(\`
  SELECT p.*, u.nome, u.avatar
  FROM posts p
  JOIN users u ON p.user_id = u.id
\`);
// 1 única query — banco otimiza com índices`,
                    rightLabel: 'JOIN busca tudo em uma query: o banco usa índices e evita round-trips.',
                    explanation: 'O problema N+1 acontece quando você faz 1 query para listar recursos e N queries para buscar dados relacionados. Sempre prefira JOIN, ou use eager loading (include no ORM). Ferramentas como o ORM Prisma têm include para isso.',
                  }],
        exercise: {
          title: 'Sistema de reservas com controle de concorrência',
          description: 'Implemente reservarAssento(vooId, assentoId, usuarioId) que: verifica se o assento está disponível, marca como reservado, e retorna a reserva. Implemente também com controle de concorrência otimista usando campo "versao" — detecte conflito e lance erro adequado.',
          starterCode: '// Simulação de banco com "linhas" de dados\nconst banco = {\n  assentos: [\n    { id: 1, voo_id: 101, numero: "1A", disponivel: true, reserva_id: null, versao: 1 },\n    { id: 2, voo_id: 101, numero: "1B", disponivel: true, reserva_id: null, versao: 1 },\n    { id: 3, voo_id: 101, numero: "2A", disponivel: false, reserva_id: 999, versao: 3 },\n  ],\n  reservas: [],\n  proximoId: 1,\n};\n\n// Simula delay de rede/processamento\nconst delay = ms => new Promise(r => setTimeout(r, ms));\n\n// Versão SEM controle de concorrência (problemática)\nasync function reservarAssentoSemControle(vooId, assentoId, usuarioId) {\n  const assento = banco.assentos.find(a => a.id === assentoId && a.voo_id === vooId);\n  if (!assento) throw new Error("Assento não encontrado");\n  if (!assento.disponivel) throw new Error("Assento já reservado");\n  \n  await delay(10); // simula processamento — janela para race condition!\n  \n  const reserva = { id: banco.proximoId++, assento_id: assentoId, usuario_id: usuarioId };\n  banco.reservas.push(reserva);\n  assento.disponivel = false;\n  assento.reserva_id = reserva.id;\n  return reserva;\n}\n\n// ✅ Versão COM optimistic locking\nasync function reservarAssentoSeguro(vooId, assentoId, usuarioId) {\n  // 1. Leia o assento e sua versão atual\n  // 2. Verifique disponibilidade\n  // 3. Simule delay\n  // 4. Ao salvar: verifique se a versão não mudou\n  //    Se mudou → throw new Error("Conflito de concorrência")\n  //    Se não mudou → incremente versão e salve\n}\n\n// Testes\nasync function main() {\n  // Teste normal\n  const r1 = await reservarAssentoSeguro(101, 1, 1);\n  console.log("Reserva 1:", r1.id);\n  \n  // Teste: assento já reservado\n  try {\n    await reservarAssentoSeguro(101, 1, 2);\n  } catch(e) {\n    console.log("Erro esperado:", e.message);\n  }\n  \n  // Teste: assento indisponível\n  try {\n    await reservarAssentoSeguro(101, 3, 1);\n  } catch(e) {\n    console.log("Indisponível:", e.message);\n  }\n  \n  console.log("Total reservas:", banco.reservas.length);\n}\n\nmain();\n',
          solutionHint: 'Leia versaoAtual = assento.versao; await delay(10); if (assento.versao !== versaoAtual) throw new Error("Conflito"); assento.versao++; salve a reserva',
          validate: (output, code) => {
            return output.includes('Reserva 1:') &&
              output.includes('Erro esperado:') &&
              output.includes('Indisponível:') &&
              output.includes('Total reservas: 1');
          },
          validateMessage: 'Reserve o assento 1, capture o erro de duplicata e indisponível, mostre total de 1 reserva.',
        },
        quiz: [
          { question: 'O que significa Atomicidade em ACID?', options: ['O banco é rápido como átomo', 'Todas as operações da transação acontecem ou nenhuma acontece — sem estados intermediários', 'Cada operação é independente', 'Os dados são imutáveis'], correct: 1, explanation: 'Atomicidade: uma transação é uma unidade indivisível. Se debitar R$100 de uma conta funcionar mas creditar na outra falhar, o débito é revertido. Não existe "metade executado".' },
          { question: 'Qual a diferença entre Pessimistic e Optimistic Locking?', options: ['São equivalentes', 'Pessimistic: bloqueia o recurso antes de usar (FOR UPDATE); Optimistic: usa versionamento, detecta conflito só na hora de salvar', 'Pessimistic é mais rápido', 'Optimistic não funciona em produção'], correct: 1, explanation: 'Pessimistic (FOR UPDATE): bloqueia a linha — garante exclusividade mas reduz concorrência. Optimistic (versão): não bloqueia — se dois processos tentam salvar a mesma versão, o segundo falha. Melhor para baixa contenção.' },
          { question: 'O que é um deadlock?', options: ['Um banco travado permanentemente', 'Duas transações que se bloqueiam mutuamente — cada uma espera a outra liberar um recurso', 'Uma query infinita', 'Um índice corrompido'], correct: 1, explanation: 'A espera circular: A bloqueia recurso 1 e espera recurso 2; B bloqueia recurso 2 e espera recurso 1. PostgreSQL detecta e cancela uma delas com erro. Prevenção: acesse recursos sempre na mesma ordem.' },
          { question: 'Por que o nível SERIALIZABLE pode reduzir performance?', options: ['Usa mais CPU', 'Garante que transações parecem sequenciais — mais conflitos detectados = mais rollbacks e retentativas', 'Desativa índices', 'Não é suportado pelo PostgreSQL'], correct: 1, explanation: 'SERIALIZABLE garante que o resultado é idêntico a executar as transações uma por vez. Isso requer mais detecção de conflitos e pode causar mais aborts/retentativas — especialmente com alta concorrência.' },
          { question: 'O que acontece se uma exceção ocorrer dentro de uma transação?', options: ['Os dados até o erro são persistidos', 'ROLLBACK automático — todas as mudanças da transação são revertidas', 'Apenas a última operação é revertida', 'O banco trava'], correct: 1, explanation: 'Em caso de erro, o PostgreSQL reverte automaticamente todas as operações da transação — como se nada tivesse acontecido. Em Prisma, qualquer throw dentro de $transaction() causa rollback automático.' },
        ],
      },
    },
    {
      id: 'mod-12-5',
      title: 'NoSQL: Redis e MongoDB na Prática',
      duration: '55 min',
      xp: 250,
      content: {
        sections: [
          {
            type: 'text',
            content: 'NoSQL não é "banco sem SQL" — é banco com um modelo de dados diferente, otimizado para casos de uso específicos. Redis é o banco de dados mais rápido do mundo para dados em memória — usado como cache, fila e pub/sub. MongoDB é o banco de documentos mais popular. Saber quando usar cada um é mais importante que saber usar.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── REDIS — banco em memória, O(1) para tudo ─────────\n// Casos de uso: cache, sessões, filas, rate limiting, pub/sub, leaderboards\n\nconst redis = require("ioredis");\nconst client = new redis(process.env.REDIS_URL);\n\n// ── STRINGS — cache simples ────────────────────────\nawait client.set("usuario:42", JSON.stringify({ nome: "Ana", nivel: 5 }));\nawait client.setex("session:abc", 3600, JSON.stringify({ userId: 42 })); // TTL 1h\nconst usuario = JSON.parse(await client.get("usuario:42"));\n\n// Padrão Cache-Aside (Lazy Loading)\nasync function getUsuario(id) {\n  const chave = `usuario:${id}`;\n  const cached = await client.get(chave);\n  if (cached) return JSON.parse(cached); // cache hit!\n  \n  const usuario = await prisma.usuario.findUnique({ where: { id } });\n  await client.setex(chave, 300, JSON.stringify(usuario)); // cache 5min\n  return usuario;\n}\n\nasync function invalidarCache(id) {\n  await client.del(`usuario:${id}`); // invalida ao atualizar\n}\n\n// ── HASH — objeto no Redis ──────────────────────────\nawait client.hset("produto:1", {\n  nome: "Notebook", preco: "3500", estoque: "10"\n});\nconst preco = await client.hget("produto:1", "preco");\nawait client.hincrby("produto:1", "estoque", -1); // decrementa sem race condition!\n\n// ── SORTED SET — ranking/leaderboard ───────────────\nawait client.zadd("ranking:jogadores", 9500, "Ana");\nawait client.zadd("ranking:jogadores", 8200, "Bruno");\nawait client.zincrby("ranking:jogadores", 300, "Bruno"); // adiciona pontos\n\nconst top10 = await client.zrevrange("ranking:jogadores", 0, 9, "WITHSCORES");\nconst rankAna = await client.zrevrank("ranking:jogadores", "Ana"); // posição',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── REDIS COMO FILA ──────────────────────────────────\n// Producer: adiciona tarefas\nasync function enqueueEmail(dados) {\n  await client.lpush("fila:emails", JSON.stringify(dados));\n}\n\n// Consumer: processa tarefas (rodando em outro processo)\nasync function processarEmails() {\n  while (true) {\n    // BRPOP: bloqueia até ter item na fila (timeout 0 = espera para sempre)\n    const [fila, item] = await client.brpop("fila:emails", 0);\n    const dados = JSON.parse(item);\n    await enviarEmail(dados);\n    console.log("Email enviado para", dados.para);\n  }\n}\n\n// ── RATE LIMITING COM REDIS ───────────────────────────\nasync function checkRateLimit(ip) {\n  const chave = `rate:${ip}:${Math.floor(Date.now() / 60000)}`; // por minuto\n  const contagem = await client.incr(chave);\n  if (contagem === 1) await client.expire(chave, 60); // TTL 60s\n  return contagem <= 100; // máximo 100 req/min\n}\n\n// ── MONGODB — banco de documentos ─────────────────────\nconst { MongoClient } = require("mongodb");\nconst mongo = new MongoClient(process.env.MONGODB_URL);\nconst db = mongo.db("meu_app");\n\n// Documento: JSON flexível, sem schema rígido\nawait db.collection("usuarios").insertOne({\n  _id: ObjectId(), // MongoDB gera automaticamente\n  nome: "Ana",\n  email: "ana@email.com",\n  // Dados aninhados — sem JOIN!\n  endereco: { rua: "Av. Paulista", cidade: "São Paulo" },\n  // Arrays nativos\n  interesses: ["react", "typescript", "postgresql"],\n  metadata: { ultimoLogin: new Date(), dispositivos: 3 },\n});\n\n// Query com filtros\nconst devs = await db.collection("usuarios")\n  .find({ interesses: "react", "metadata.dispositivos": { $gte: 2 } })\n  .sort({ nome: 1 })\n  .limit(20)\n  .toArray();\n\n// Aggregation pipeline — equivalente ao SQL GROUP BY + JOIN\nconst estatisticas = await db.collection("pedidos").aggregate([\n  { $match: { status: "entregue" } },\n  { $group: {\n    _id: "$cliente_id",\n    total_gasto: { $sum: "$valor" },\n    qtd_pedidos: { $count: {} },\n  }},\n  { $sort: { total_gasto: -1 } },\n  { $limit: 10 },\n]).toArray();',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── QUANDO USAR CADA BANCO ────────────────────────────\n\n// PostgreSQL — use por padrão para dados transacionais\n// ✅ Dados estruturados com relações (usuários, pedidos, produtos)\n// ✅ Precisa de ACID e transações complexas\n// ✅ Relatórios e queries analíticas\n// ✅ Dados financeiros\n// ✅ Qualquer dúvida — PostgreSQL primeiro\n\n// Redis — cache e dados temporários/estruturados em memória\n// ✅ Cache de API responses (5min-1h)\n// ✅ Sessões de usuário\n// ✅ Rate limiting\n// ✅ Filas de tarefas (jobs assíncronos)\n// ✅ Leaderboards e rankings em tempo real\n// ✅ Pub/Sub para notificações\n// ❌ Dados que não podem ser perdidos (é em memória — pode perder com restart)\n\n// MongoDB — dados hierárquicos e flexíveis\n// ✅ Catálogos de produtos com atributos variáveis (cada produto tem campos diferentes)\n// ✅ Logs e eventos (estrutura imprevisível)\n// ✅ Dados que sempre são acessados juntos (usuario + endereco + preferencias)\n// ✅ Prototipagem rápida (sem schema = mais flexível)\n// ❌ Dados com muitas relações e joins\n// ❌ Transações complexas entre múltiplas coleções\n\n// Exemplo de stack real:\n// PostgreSQL: usuários, pedidos, produtos (dados core)\n// Redis: sessões, cache, filas\n// MongoDB: logs de auditoria, catálogo de produtos com atributos variáveis\n\nconsole.log("Regra: PostgreSQL por padrão. Redis para velocidade. MongoDB para flexibilidade.");',
          },
          {
            type: 'highlight',
            content: '🎯 O erro mais comum: usar MongoDB "porque é mais moderno" e depois sofrer para fazer joins que o PostgreSQL faz trivialmente. Use MongoDB quando a estrutura dos dados genuinamente varia muito entre documentos — um catálogo onde têro produto eletrônico tem "voltagem" e o livro tem "ISBN". Para o resto: PostgreSQL resolve com JSONB quando precisar de flexibilidade.',
          },
        ],
        exercise: {
          title: 'Implementar cache com Redis simulado',
          description: 'Implemente uma classe Cache que simula o comportamento do Redis em memória (usando Map + TTL): set(chave, valor, ttlSegundos), get(chave), del(chave), e incr(chave). Depois implemente getOuBuscar(chave, ttl, fn) — o padrão Cache-Aside completo.',
          starterCode: 'class Cache {\n  #dados = new Map(); // { valor, expiraEm }\n  \n  set(chave, valor, ttlSegundos = null) {\n    // Armazene valor com timestamp de expiração\n    // Se ttl for null, não expira\n  }\n  \n  get(chave) {\n    // Retorne null se não existir ou se expirou\n    // Se expirou, remova do Map\n  }\n  \n  del(chave) {\n    return this.#dados.delete(chave);\n  }\n  \n  incr(chave) {\n    // Incrementa o valor numérico (default 0→1)\n    // Retorna o novo valor\n  }\n  \n  // Cache-Aside pattern\n  async getOuBuscar(chave, ttlSegundos, fn) {\n    // 1. Tente o cache primeiro\n    // 2. Se miss: execute fn() para buscar o dado\n    // 3. Salve no cache com TTL\n    // 4. Retorne o dado\n  }\n}\n\n// Testes\nconst cache = new Cache();\n\n// Básico\ncache.set("nome", "Ana", 1); // TTL 1 segundo\nconsole.log("Hit:", cache.get("nome")); // "Ana"\n\n// TTL: espera e verifica expiração\nawait new Promise(r => setTimeout(r, 1100));\nconsole.log("Expirado:", cache.get("nome")); // null\n\n// Incremento (rate limiting)\ncache.incr("contador");\ncache.incr("contador");\ncache.incr("contador");\nconsole.log("Contador:", cache.get("contador")); // 3\n\n// Cache-Aside\nlet chamadas = 0;\nconst buscarUsuario = async () => { chamadas++; return { nome: "Bruno" }; };\n\nconst u1 = await cache.getOuBuscar("user:1", 60, buscarUsuario);\nconst u2 = await cache.getOuBuscar("user:1", 60, buscarUsuario); // do cache!\nconsole.log("Usuário:", u1.nome);\nconsole.log("Chamadas ao banco:", chamadas); // deve ser 1, não 2\n',
          solutionHint: 'set: #dados.set(chave, { valor, expiraEm: ttl ? Date.now() + ttl*1000 : null }) | get: const item = #dados.get(chave); if (!item) return null; if (item.expiraEm && Date.now() > item.expiraEm) { del; return null } return item.valor',
          validate: (output, code) => {
            return output.includes('Hit: Ana') &&
              output.includes('Expirado: null') &&
              output.includes('Contador: 3') &&
              output.includes('Usuário: Bruno') &&
              output.includes('Chamadas ao banco: 1');
          },
          validateMessage: 'Hit "Ana", expirado null, contador 3, usuário Bruno, e apenas 1 chamada ao banco.',
        },
        quiz: [
          { question: 'O que é o padrão Cache-Aside (Lazy Loading)?', options: ['Pré-carrega todos os dados no cache na inicialização', 'Busca do cache primeiro; se miss, busca do banco e popula o cache', 'Sempre busca do banco e atualiza o cache', 'Sincroniza banco e cache em tempo real'], correct: 1, explanation: 'Cache-Aside: tente o cache → miss → busca banco → popula cache → retorna. É o padrão mais comum por ser simples e eficiente. O cache só contém dados que foram realmente solicitados.' },
          { question: 'Por que Redis é muito mais rápido que PostgreSQL para operações simples?', options: ['Redis usa algoritmos melhores', 'Redis armazena dados em memória RAM — acesso em microssegundos vs I/O de disco em milissegundos', 'Redis não tem índices', 'Redis é escrito em C'], correct: 1, explanation: 'RAM é 100-1000x mais rápida que SSD para acesso aleatório. Redis opera inteiramente em memória — latência típica de 0.1-1ms vs 1-10ms do PostgreSQL com disco. Ideal para cache e dados temporários.' },
          { question: 'Quando MongoDB é uma boa escolha em vez de PostgreSQL?', options: ['Sempre que não quiser aprender SQL', 'Quando os dados têm estrutura genuinamente variável entre documentos e você acessa tudo junto', 'Quando precisar de transações', 'Quando tiver relações complexas'], correct: 1, explanation: 'MongoDB brilha quando: cada documento tem campos diferentes (catálogo com produtos de categorias distintas), dados são sempre acessados juntos (sem joins necessários), schema evolui frequentemente. Não é "melhor" — é diferente.' },
          { question: 'O que é TTL no contexto de cache?', options: ['Tamanho total do log', 'Time To Live — tempo em segundos após o qual o item expira automaticamente', 'Total de tuplas no banco', 'Transação com timeout'], correct: 1, explanation: 'TTL define por quanto tempo um item é válido no cache. Após o TTL, o item é removido automaticamente. Fundamental para consistência: sem TTL, o cache pode servir dados desatualizados indefinidamente.' },
          { question: 'Para que serve ZADD/ZREVRANGE no Redis?', options: ['Adicionar e listar itens de uma fila', 'Gerenciar um Sorted Set — coleção ordenada por score, ideal para rankings e leaderboards', 'Controlar versões de documentos', 'Fazer joins em memória'], correct: 1, explanation: 'Sorted Sets armazenam membros com um score numérico, mantendo-os sempre ordenados. ZADD adiciona/atualiza, ZREVRANGE lista do maior para menor score. Perfeito para rankings, pontuações e feeds ordenados por relevância.' },
        ],
      },
    },
  {
    id: 'mp-phase-12',
    title: '🛠️ Mini-Projeto: ORM de Tarefas',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase13,
    content: {
      sections: [{ type: 'text', content: 'Construa algo real aplicando o que aprendeu nesta fase.' }]
    }
  }  ],
};
