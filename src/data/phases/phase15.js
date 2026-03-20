import { miniProjectPhase15 } from '../miniprojects.js';
export const phase15 = {
  id: 'phase-11',
  title: 'Redes e HTTP',
  phase: 14,
  color: '#8b5cf6',
  icon: '🌐',
  description: 'Do bit na rede ao HTTPS no browser. TCP/IP, DNS, HTTP/1.1 vs HTTP/2 vs HTTP/3, headers, autenticação, WebSockets e performance — o que acontece em cada requisição que você faz.',
  checklist: [
    'Explicar o que acontece desde digitar uma URL até a página carregar',
    'Usar corretamente os verbos HTTP (GET, POST, PUT, PATCH, DELETE)',
    'Distinguir status codes: 2xx, 3xx, 4xx e 5xx com exemplos',
    'Diferenciar 401 (não autenticado) de 403 (sem permissão)',
    'Entender o que são headers HTTP e para que servem',
    'Explicar o que é HTTPS e como o TLS protege os dados',
    'Entender CORS e como configurar corretamente em uma API',
  ],
  modules: [
    {
      id: 'mod-10-1',
      title: 'Como a Internet Funciona: DNS e TCP/IP',
      duration: '45 min',
      xp: 200,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Quando você digita "github.com" e aperta Enter, uma cadeia de eventos precisa acontecer antes de qualquer byte do site chegar ao seu browser. Entender esse fluxo — DNS, TCP, roteamento — é o que permite diagnosticar problemas de rede, otimizar performance e entender por que algumas coisas demoram mais que outras.',
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── O QUE ACONTECE AO ACESSAR github.com ─────────────\n#\n# 1. RESOLUÇÃO DNS\n#    Browser pergunta: "qual é o IP de github.com?"\n#    Cache local → SO → Resolver do ISP → Root DNS → TLD (.com) → Authoritative DNS\n#    Resposta: 140.82.114.3\n#    Tempo típico: 10-100ms (sem cache) | <1ms (com cache)\n#\n# 2. HANDSHAKE TCP (3-way)\n#    Client → Server: SYN          (oi, quero conectar)\n#    Server → Client: SYN-ACK      (ok, pode conectar)\n#    Client → Server: ACK          (entendido, conectado)\n#    Tempo: 1 RTT (Round Trip Time)\n#\n# 3. HANDSHAKE TLS (para HTTPS)\n#    + 1-2 RTTs a mais para troca de chaves e certificado\n#    TLS 1.3: reduzido para 1 RTT (às vezes 0-RTT)\n#\n# 4. REQUISIÇÃO HTTP\n#    GET / HTTP/1.1\n#    Host: github.com\n#    ...\n#\n# 5. RESPOSTA + DOWNLOAD\n#    HTTP/1.1 200 OK\n#    ...\n\n# Diagnóstico com ferramentas reais\ncurl -w "\\nDNS: %{time_namelookup}s\\nConexão TCP: %{time_connect}s\\nTLS: %{time_appconnect}s\\nTotal: %{time_total}s\\n" \\\n     -o /dev/null -s https://github.com\n\n# Traceroute: mostra cada roteador no caminho\ntraceroute github.com\n# ou no Windows:\ntracert github.com\n\n# dig: consulta DNS detalhada\ndig github.com\ndig github.com MX        # registros de email\ndig @8.8.8.8 github.com  # consulta via DNS do Google',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── MODELO OSI vs TCP/IP ─────────────────────────────\n// OSI (conceitual, 7 camadas)      TCP/IP (prático, 4 camadas)\n// 7. Aplicação  ┐                  4. Aplicação    (HTTP, DNS, SMTP, SSH)\n// 6. Apresentação├─────────────────\n// 5. Sessão    ┘                   3. Transporte   (TCP, UDP)\n// 4. Transporte ─────────────────── \n// 3. Rede       ─────────────────── 2. Internet     (IP, ICMP)\n// 2. Enlace    ┐                   1. Acesso à Rede (Ethernet, WiFi)\n// 1. Física   ┘\n\n// ── TCP vs UDP ───────────────────────────────────────\n// TCP (Transmission Control Protocol)\n//   ✅ Confiável: garante entrega e ordem dos pacotes\n//   ✅ Controle de fluxo e congestionamento\n//   ❌ Overhead: handshake + ACKs\n//   Usado em: HTTP, HTTPS, banco de dados, SSH\n\n// UDP (User Datagram Protocol)\n//   ✅ Rápido: sem handshake, sem confirmação\n//   ❌ Sem garantia de entrega ou ordem\n//   Usado em: streaming de vídeo, jogos online, DNS, VoIP\n//   HTTP/3 usa UDP por baixo (com QUIC para confiabilidade)\n\n// ── ENDEREÇAMENTO IP ────────────────────────────────\n// IPv4: 4 bytes → 0.0.0.0 até 255.255.255.255 (~4 bilhões)\n// IPv6: 16 bytes → 2001:0db8:85a3::8a2e:0370:7334 (~340 undecilhões)\n\n// Endereços especiais:\n// 127.0.0.1 / ::1    → loopback (localhost)\n// 10.0.0.0/8         → rede privada classe A\n// 192.168.0.0/16     → rede privada (home/escritório)\n// 0.0.0.0            → todas as interfaces (bind servers)\n\n// ── PORTAS ──────────────────────────────────────────\nconst portasPadrao = {\n  80:   "HTTP",\n  443:  "HTTPS",\n  22:   "SSH",\n  5432: "PostgreSQL",\n  3306: "MySQL",\n  6379: "Redis",\n  27017:"MongoDB",\n  25:   "SMTP (email)\",\n  53:   "DNS",\n  3000: "convenção Node.js dev",\n};\nconsole.log("Porta HTTP:", portasPadrao[80]);',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── LATÊNCIA: O INIMIGO INVISÍVEL ───────────────────\n// Latência = tempo de ida e volta (RTT - Round Trip Time)\n// Velocidade da luz no fibra óptica: ~200.000 km/s\n\n// Distâncias típicas (RTT):\n// São Paulo → São Paulo (datacenter local): 1-5ms\n// São Paulo → USA (us-east-1):             ~120ms\n// São Paulo → Europa (eu-west-1):          ~200ms\n// São Paulo → Ásia (ap-southeast-1):       ~300ms\n\n// Impacto no carregamento de página:\n// 1 request HTTP/1.1 sequencial = 1 RTT por recurso\n// Página com 20 recursos: 20 × 120ms = 2.4 segundos só de latência!\n// HTTP/2 multiplexing: todos os 20 em paralelo = ~120ms total\n\n// Por que CDN importa:\n// Sem CDN: browser faz request para servidor nos USA (120ms RTT)\n// Com CDN: request vai para edge em São Paulo (1ms RTT)\n// Diferença: 119ms a menos por recurso estático\n\n// ── DNS LOOKUP CACHING ──────────────────────────────\n// TTL do DNS controla por quanto tempo o resultado é cacheado\n// TTL alto (86400s = 1 dia): menos lookups, mudança de IP demora a propagar\n// TTL baixo (60s): lookups frequentes, mas mudança de IP propaga rápido\n//   → útil antes de migrar servidores\n\nconsole.log("Regra: 1ms de latência economizada = performance melhorada");',
          },
          {
            type: 'highlight',
            content: '🔍 Ferramentas para diagnosticar problemas de rede que todo dev sênior usa: `dig` (DNS), `curl -v` (HTTP detalhado), `traceroute` (roteamento), `netstat -an` (conexões ativas), `ping` (latência básica). No browser: Network tab do DevTools mostra cada fase do request: DNS → TCP → TLS → TTFB → Download.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── SIMULANDO LATÊNCIA EM DESENVOLVIMENTO ────────────\n// Por que simular? Sua API responde em 1ms localmente\n// Em produção com usuário em outra região: 200ms+\n// Problemas de UX que só aparecem com latência real!\n\n// Node.js: middleware de latência artificial\nconst simularLatencia = (ms) => (req, res, next) => {\n  setTimeout(next, ms);\n};\n\n// app.use(simularLatencia(200)); // simula 200ms de rede\n\n// No Chrome DevTools: Network → Throttling → Slow 3G\n// Simula conexão lenta para testar loading states\n\n// ── WEBSOCKETS: COMUNICAÇÃO BIDIRECIONAL ──────────────\n// HTTP: cliente sempre inicia a requisição\n// WebSocket: após handshake inicial, servidor TAMBÉM pode enviar\n\n// Casos de uso: chat, notificações em tempo real,\n//               colaboração ao vivo, dados de bolsa, jogos\n\nconst ws = new WebSocket("wss://api.exemplo.com/ws");\n\nws.onopen    = ()  => ws.send(JSON.stringify({ type: "subscribe", canal: "precos" }));\nws.onmessage = (e) => console.log("Recebido:", JSON.parse(e.data));\nws.onerror   = (e) => console.error("Erro WS:", e);\nws.onclose   = ()  => console.log("Conexão encerrada");\n\n// No servidor (Node.js com ws library)\n// wss.on("connection", ws => {\n//   ws.on("message", dados => { ... });\n//   ws.send(JSON.stringify({ type: "pong" }));\n// });',
          },
        ],
        exercise: {
          title: 'Analisar tempo de requisição por fase',
          description: 'Implemente analisarRequisicao(metricas) que recebe os tempos de cada fase de uma requisição HTTP e retorna: diagnóstico de cada fase (rápido/normal/lento), o gargalo principal, e sugestões de otimização.',
                    solutionHint: 'DNS + TCP handshake + TLS handshake + request + response = tempo total. Cache DNS elimina o primeiro. Keep-alive elimina TCP em requisições subsequentes.',
starterCode: `function analisarRequisicao(metricas) {
  // metricas = { dns, tcp, tls, ttfb, download } em millisegundos
  // TTFB = Time To First Byte (tempo até o primeiro byte da resposta)
  
  const limites = {
    dns:      { rapido: 5,   normal: 50,  lento: 200 },
    tcp:      { rapido: 10,  normal: 100, lento: 300 },
    tls:      { rapido: 20,  normal: 150, lento: 400 },
    ttfb:     { rapido: 100, normal: 500, lento: 2000 },
    download: { rapido: 50,  normal: 500, lento: 3000 },
  };
  
  const diagnostico = {};
  let gargalo = null;
  let maiorTempo = 0;
  
  for (const [fase, tempo] of Object.entries(metricas)) {
    const lim = limites[fase];
    if (!lim) continue;
    
    // Classifique: 'rápido', 'normal' ou 'lento'
    // Identifique o gargalo (fase mais lenta proporcionalmente)
  }
  
  const sugestoes = {
    dns:      "Use CDN ou reduza TTL apenas para migrações",
    tcp:      "Servidor mais próximo do usuário (CDN, edge)",
    tls:      "Atualize para TLS 1.3 (1-RTT) e use OCSP stapling",
    ttfb:     "Otimize queries de banco, adicione cache Redis",
    download: "Comprima responses (gzip/brotli), use CDN para assets",
  };
  
  return {
    diagnostico,
    gargalo,
    sugestao: sugestoes[gargalo] || "Performance adequada",
    total: Object.values(metricas).reduce((a, b) => a + b, 0),
  };
}

// Testes
const req1 = analisarRequisicao({ dns: 2, tcp: 15, tls: 45, ttfb: 1800, download: 120 });
console.log("Gargalo:", req1.gargalo);       // ttfb
console.log("Sugestão:", req1.sugestao);
console.log("Total:", req1.total, "ms");

const req2 = analisarRequisicao({ dns: 180, tcp: 20, tls: 50, ttfb: 200, download: 80 });
console.log("Gargalo:", req2.gargalo);       // dns
`,
          solutionHint: 'Para cada fase: se tempo <= rapido → "rápido"; se <= normal → "normal"; senão → "lento". Gargalo = fase com maior ratio tempo/lento.',
          validate: (output, code) => {
            return output.includes('Gargalo: ttfb') &&
              output.includes('Gargalo: dns') &&
              output.includes('Total:') &&
              output.includes('Sugestão:');
          },
          validateMessage: 'Identifique "ttfb" e "dns" como gargalos, mostre sugestão e total.',
        },
        quiz: [
          {
            question: 'O que é o handshake TCP de 3 vias?',
            options: [
              'Protocolo de autenticação',
              'SYN → SYN-ACK → ACK: estabelece conexão confiável antes de qualquer dado ser enviado',
              'Troca de certificados TLS',
              'Verificação de DNS',
            ],
            correct: 1,
            explanation: 'TCP 3-way handshake: cliente envia SYN, servidor responde SYN-ACK, cliente confirma com ACK. Custa 1 RTT antes de qualquer dado. Por isso HTTP/2 e keep-alive reutilizam conexões TCP.',
          },
          {
            question: 'Por que UDP é usado em streaming de vídeo em vez de TCP?',
            options: [
              'UDP é mais seguro',
              'UDP não retransmite pacotes perdidos — prefere exibir frame ruim a pausar esperando retransmissão',
              'UDP consome menos bateria',
              'TCP não suporta vídeo',
            ],
            correct: 1,
            explanation: 'Em vídeo ao vivo, um frame perdido é melhor ignorado do que re-solicitado (causaria pausa). UDP prioriza velocidade sobre confiabilidade. Já para download de arquivo, TCP garante que todos os bytes chegam corretamente.',
          },
          {
            question: 'O que é TTFB (Time To First Byte)?',
            options: [
              'Tempo total de download',
              'Tempo desde a requisição até o primeiro byte da resposta chegar — inclui processamento do servidor',
              'Tempo de resolução DNS',
              'Tempo de handshake TLS',
            ],
            correct: 1,
            explanation: 'TTFB = tempo de rede + tempo de processamento do servidor. TTFB alto indica servidor lento (queries pesadas, sem cache). Ideal: < 200ms. > 1s é um problema sério de backend.',
          },
          {
            question: 'O que faz um CDN (Content Delivery Network)?',
            options: [
              'Comprime arquivos antes de enviar',
              'Distribui cópias do conteúdo em servidores ao redor do mundo — usuário é servido pelo servidor mais próximo',
              'Aumenta a largura de banda do servidor',
              'Gerencia certificados TLS',
            ],
            correct: 1,
            explanation: 'CDN reduz latência colocando conteúdo próximo do usuário. Cloudflare, AWS CloudFront, Fastly têm nós em dezenas de cidades. Usuário em SP acessa servidor em SP (1ms) em vez de USA (120ms).',
          },
          {
            question: 'Por que o TTL do DNS importa antes de uma migração de servidor?',
            options: [
              'TTL alto acelera a propagação',
              'TTL baixo (ex: 60s) faz DNS expirar rápido — mudança de IP propaga em minutos. TTL alto = horas de downtime possível',
              'TTL não afeta migrações',
              'TTL controla apenas cache do browser',
            ],
            correct: 1,
            explanation: 'Semanas antes de migrar: reduza TTL para 60s. Após migrar e confirmar estabilidade: aumente de volta. Com TTL de 24h, usuários podem ficar apontando para o IP antigo por um dia inteiro.',
          },
        ],
      },
    },
    {
      id: 'mod-10-2',
      title: 'HTTP em Profundidade: Métodos, Headers e Status',
      duration: '50 min',
      xp: 210,
      content: {
        sections: [
          {
            type: 'text',
            content: 'HTTP é o protocolo sobre o qual a web funciona. Conhecer a fundo métodos, status codes e headers não é opcional para um desenvolvedor fullstack sênior — é a diferença entre uma API que funciona e uma API que funciona corretamente, de forma segura e cacheable.',
          },
          {
            type: 'code',
            lang: 'http',
            content: '# ── ANATOMIA DE UMA REQUISIÇÃO HTTP ─────────────────\nPOST /api/usuarios HTTP/1.1\nHost: api.exemplo.com\nContent-Type: application/json\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...\nAccept: application/json\nAccept-Encoding: gzip, deflate, br\nAccept-Language: pt-BR,pt;q=0.9,en;q=0.8\nUser-Agent: Mozilla/5.0 (X11; Linux x86_64)...\nX-Request-ID: 550e8400-e29b-41d4-a716-446655440000\nConnection: keep-alive\n                                    ← linha em branco obrigatória\n{"nome": "Ana", "email": "ana@dev.com"}\n\n# ── ANATOMIA DE UMA RESPOSTA HTTP ────────────────────\nHTTP/1.1 201 Created\nContent-Type: application/json; charset=utf-8\nLocation: /api/usuarios/42\nX-Request-ID: 550e8400-e29b-41d4-a716-446655440000\nCache-Control: no-store\nX-RateLimit-Limit: 100\nX-RateLimit-Remaining: 87\nX-RateLimit-Reset: 1704067200\nStrict-Transport-Security: max-age=31536000; includeSubDomains\nX-Content-Type-Options: nosniff\n\n{"id": 42, "nome": "Ana", "email": "ana@dev.com", "createdAt": "2024-01-01T00:00:00Z"}',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── MÉTODOS HTTP E SEMÂNTICA ─────────────────────────\n// A semântica importa — não é apenas convenção\n\n// GET: buscar recurso — SEGURO + IDEMPOTENTE\n//   Seguro: não altera estado do servidor\n//   Idempotente: N chamadas = mesmo efeito que 1\n//   Pode ser cacheado, bookmarkado, pré-carregado\nGET /api/usuarios/42\nGET /api/posts?pagina=1&limite=20\n\n// POST: criar recurso — NEM seguro NEM idempotente\n//   Cada chamada cria um recurso novo\n//   Não cacheável por padrão\nPOST /api/usuarios     // cria novo usuário\nPOST /api/auth/login   // ação que não é CRUD puro\n\n// PUT: substituição completa — idempotente\n//   Substitui o recurso inteiro\n//   Body deve ter TODOS os campos\nPUT /api/usuarios/42   // substitui o usuário 42 completamente\n\n// PATCH: atualização parcial — pode ser idempotente\n//   Apenas os campos enviados são atualizados\nPATCH /api/usuarios/42 // { "nome": "Ana Silva" } — só atualiza nome\n\n// DELETE: remover — idempotente\n//   Deletar o que já foi deletado → 404 ou 204 (ambos ok)\nDELETE /api/usuarios/42\n\n// HEAD: como GET, mas sem body — útil para verificar existência/metadados\nHEAD /api/usuarios/42  // → apenas headers, sem body\n\n// OPTIONS: descobre métodos suportados — usado pelo CORS preflight\nOPTIONS /api/usuarios  // → Access-Control-Allow-Methods: GET, POST, ...\n\nconsole.log("Semântica correta = cacheamento, proxies e logs funcionam melhor");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── STATUS CODES: A LINGUAGEM DO HTTP ───────────────\n\nconst statusCodes = {\n  // 1xx — Informativo\n  100: "Continue — cliente pode continuar enviando o body",\n  101: "Switching Protocols — upgrade para WebSocket",\n\n  // 2xx — Sucesso\n  200: "OK — requisição bem-sucedida (GET, PUT, PATCH)",\n  201: "Created — recurso criado (POST); inclua Location header",\n  202: "Accepted — processamento assíncrono iniciado (jobs)",\n  204: "No Content — sucesso sem body (DELETE, PUT sem retorno)",\n\n  // 3xx — Redirecionamento\n  301: "Moved Permanently — nova URL permanente (SEO muda link)",\n  302: "Found — redirecionamento temporário",\n  304: "Not Modified — use cache, conteúdo não mudou (ETag/If-None-Match)",\n  307: "Temporary Redirect — mantém método HTTP (POST continua POST)",\n  308: "Permanent Redirect — mantém método HTTP",\n\n  // 4xx — Erro do cliente\n  400: "Bad Request — dados inválidos (validação falhou)",\n  401: "Unauthorized — não autenticado (sem token ou token inválido)",\n  403: "Forbidden — autenticado mas sem permissão (token válido, acesso negado)",\n  404: "Not Found — recurso não existe",\n  405: "Method Not Allowed — método não suportado nessa rota",\n  409: "Conflict — conflito de estado (email duplicado, versão desatualizada)",\n  410: "Gone — recurso deletado permanentemente",\n  422: "Unprocessable Entity — body válido mas falha na regra de negócio",\n  429: "Too Many Requests — rate limit excedido",\n\n  // 5xx — Erro do servidor\n  500: "Internal Server Error — erro não tratado no servidor",\n  502: "Bad Gateway — proxy não conseguiu conectar ao upstream",\n  503: "Service Unavailable — servidor sobrecarregado ou em manutenção",\n  504: "Gateway Timeout — upstream não respondeu a tempo",\n};\n\n// 401 vs 403: erro mais comum\n// 401 = "quem é você?" → faça login\n// 403 = "eu sei quem você é, mas não pode" → peça acesso\nconsole.log("401:", statusCodes[401]);\nconsole.log("403:", statusCodes[403]);',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── HEADERS MAIS IMPORTANTES ─────────────────────────\n\n// ── Autenticação ────────────────────────────────────\n// Authorization: Bearer <JWT>\n// Authorization: Basic <base64(user:pass)>\n// API-Key: <chave>           (custom header para APIs)\n\n// ── Content Negotiation ────────────────────────────\n// Content-Type: application/json       (o que estou enviando)\n// Accept: application/json             (o que aceito receber)\n// Accept-Encoding: gzip, br, deflate   (compressão aceita)\n// Accept-Language: pt-BR,en;q=0.8     (idioma preferido)\n\n// ── Caching ─────────────────────────────────────────\n// Cache-Control: max-age=3600          (cachear por 1h)\n// Cache-Control: no-store              (nunca cachear)\n// Cache-Control: no-cache              (cacheia mas revalida)\n// Cache-Control: public                (CDN pode cachear)\n// Cache-Control: private               (apenas browser, não CDN)\n// ETag: "abc123"                       (hash do conteúdo)\n// Last-Modified: Wed, 01 Jan 2025      (quando mudou)\n// If-None-Match: "abc123"              (conditional GET → 304)\n\n// ── CORS ────────────────────────────────────────────\n// Access-Control-Allow-Origin: https://meusite.com\n// Access-Control-Allow-Methods: GET, POST, PUT, DELETE\n// Access-Control-Allow-Headers: Content-Type, Authorization\n// Access-Control-Max-Age: 86400        (tempo de cache do preflight)\n\n// ── Segurança ───────────────────────────────────────\n// Strict-Transport-Security: max-age=31536000  (HSTS: force HTTPS)\n// X-Content-Type-Options: nosniff              (previne MIME sniffing)\n// X-Frame-Options: DENY                        (previne clickjacking)\n// Content-Security-Policy: default-src \'self\'  (previne XSS)\n// X-Request-ID: uuid                           (rastreabilidade)\n\nconsole.log("Headers corretos fazem a diferença em segurança e performance");',
          },
          {
            type: 'highlight',
            content: '🎯 Os 3 erros de status code mais comuns em APIs: (1) retornar 200 com { error: "..." } no body — use 4xx/5xx corretamente. (2) usar 401 quando deveria ser 403. (3) retornar 500 para erros de validação — use 400 ou 422. Status code correto permite que clients, proxies e ferramentas de monitoramento funcionem sem parsing do body.',
          },
        ,
                  {
                    type: 'common_error',
                    title: 'Confundir 401 Unauthorized com 403 Forbidden',
                    wrong: `// Retornando 401 para usuário sem permissão
app.get("/admin", (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({ erro: "Sem permissão" });
  }
  // ...
});
// Usuário está logado mas não tem a role — 401 é errado!`,
                    wrongLabel: '401 = "Quem é você?" (não autenticado). Não é o erro certo aqui.',
                    right: `// 401 = não autenticado. 403 = autenticado mas sem permissão
app.get("/admin", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ erro: "Faça login" });     // Não sabe quem é
  }
  if (!req.user.isAdmin) {
    return res.status(403).json({ erro: "Sem permissão" });  // Sabe, mas não pode
  }
  // ...
});`,
                    rightLabel: '401 = não autenticado (precisa logar). 403 = autenticado mas sem acesso.',
                    explanation: '401 Unauthorized: o servidor não sabe quem você é — precisa de credenciais. 403 Forbidden: o servidor sabe quem você é, mas você não tem permissão. Usar o código errado confunde clientes e ferramentas de monitoramento.',
                  }],
        exercise: {
          title: 'Construtor de resposta HTTP semântica',
          description: 'Implemente criarResposta(situacao) que retorna { status, headers, body } corretos para cada situação. Cubra: criação bem-sucedida, recurso não encontrado, não autenticado, sem permissão, validação falhou, rate limit excedido, erro interno.',
                    solutionHint: '200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable, 500 Internal Error.',
starterCode: `function criarResposta(situacao, dados = {}) {
  // Retorne { status: number, headers: object, body: object }
  // Use status codes e headers semanticamente corretos
  
  switch (situacao) {
    case "usuario-criado":
      // 201, Location header, body com o usuário
      return {
        status: ___,
        headers: {
          "Content-Type": "application/json",
          Location: \`/api/usuarios/\${dados.id}\`,
        },
        body: dados,
      };
    
    case "nao-encontrado":
      // 404, body com mensagem de erro
      return {
        status: ___,
        headers: { "Content-Type": "application/json" },
        body: { erro: "Recurso não encontrado", codigo: "NOT_FOUND" },
      };
    
    case "nao-autenticado":
      // 401, WWW-Authenticate header
      return {
        status: ___,
        headers: {
          "Content-Type": "application/json",
          "WWW-Authenticate": "Bearer",
        },
        body: { erro: "Token inválido ou ausente", codigo: "UNAUTHORIZED" },
      };
    
    case "sem-permissao":
      // 403
      return { status: ___, headers: { "Content-Type": "application/json" }, body: { erro: "Acesso negado" } };
    
    case "validacao-falhou":
      // 422, body com array de erros
      return {
        status: ___,
        headers: { "Content-Type": "application/json" },
        body: { erro: "Dados inválidos", erros: dados.erros || [] },
      };
    
    case "rate-limit":
      // 429, headers Retry-After e X-RateLimit-*
      return {
        status: ___,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
          "X-RateLimit-Limit": "100",
          "X-RateLimit-Remaining": "0",
        },
        body: { erro: "Limite de requisições excedido" },
      };
    
    case "erro-interno":
      // 500, não expor detalhes ao cliente
      return {
        status: ___,
        headers: { "Content-Type": "application/json" },
        body: { erro: "Erro interno do servidor", codigo: "INTERNAL_ERROR" },
      };
    
    default:
      return { status: 200, headers: {}, body: dados };
  }
}

// Testes
const r1 = criarResposta("usuario-criado", { id: 42, nome: "Ana" });
console.log("Criado:", r1.status, r1.headers.Location);

const r2 = criarResposta("nao-encontrado");
console.log("Não encontrado:", r2.status);

const r3 = criarResposta("nao-autenticado");
console.log("Não autenticado:", r3.status, r3.headers["WWW-Authenticate"]);

const r4 = criarResposta("sem-permissao");
console.log("Sem permissão:", r4.status);

const r5 = criarResposta("rate-limit");
console.log("Rate limit:", r5.status, r5.headers["Retry-After"]);

const r6 = criarResposta("erro-interno");
console.log("Erro interno:", r6.status);
`,
          solutionHint: 'usuario-criado: 201 | nao-encontrado: 404 | nao-autenticado: 401 | sem-permissao: 403 | validacao-falhou: 422 | rate-limit: 429 | erro-interno: 500',
          validate: (output, code) => {
            return output.includes('Criado: 201') &&
              output.includes('Não encontrado: 404') &&
              output.includes('Não autenticado: 401') &&
              output.includes('Sem permissão: 403') &&
              output.includes('Rate limit: 429') &&
              output.includes('Erro interno: 500');
          },
          validateMessage: 'Retorne os 6 status codes corretos: 201, 404, 401, 403, 429 e 500.',
        },
        quiz: [
          {
            question: 'Qual a diferença entre 401 e 403?',
            options: [
              'São equivalentes',
              '401: não autenticado (quem é você?); 403: autenticado mas sem permissão (acesso negado)',
              '403 é mais grave que 401',
              '401 é para APIs, 403 para sites',
            ],
            correct: 1,
            explanation: '401 Unauthorized: o servidor não sabe quem você é — token ausente, expirado ou inválido. Ação: faça login. 403 Forbidden: o servidor sabe quem você é mas você não tem permissão. Ação: peça acesso.',
          },
          {
            question: 'O que é idempotência em HTTP?',
            options: [
              'A requisição é segura',
              'Executar a mesma requisição N vezes tem o mesmo efeito que executar uma vez',
              'A requisição pode ser cacheada',
              'A requisição não tem body',
            ],
            correct: 1,
            explanation: 'GET, PUT, DELETE são idempotentes: DELETE /usuarios/42 repetido não muda o estado após a primeira execução. POST não é idempotente — cada chamada pode criar um novo recurso. Idempotência permite retentativas seguras.',
          },
          {
            question: 'Quando usar 204 em vez de 200?',
            options: [
              'Nunca, 200 sempre é correto',
              '204 No Content: operação bem-sucedida mas sem body para retornar (DELETE, operações sem dados)',
              '204 indica erro silencioso',
              '204 é usado para redirecionamentos',
            ],
            correct: 1,
            explanation: '204 evita parsing desnecessário de body vazio. Comum em: DELETE (recurso removido, sem o que retornar), PUT sem retornar o recurso atualizado, ações que só confirmam sucesso.',
          },
          {
            question: 'O que faz o header ETag + If-None-Match?',
            options: [
              'Autentica a requisição',
              'Permite cache condicional: se conteúdo não mudou (ETag igual), servidor retorna 304 sem body',
              'Comprime o response',
              'Redireciona para versão atualizada',
            ],
            correct: 1,
            explanation: 'Server envia ETag: "abc123". Browser cacheia e na próxima request envia If-None-Match: "abc123". Se conteúdo não mudou → 304 Not Modified (sem body = muito mais rápido). Se mudou → 200 com novo conteúdo e novo ETag.',
          },
          {
            question: 'Por que retornar 422 em vez de 400 para erro de regra de negócio?',
            options: [
              'São equivalentes, use qualquer um',
              '400: request malformada (JSON inválido, campo ausente); 422: request válida mas falha em regra de negócio (email já existe, saldo insuficiente)',
              '422 é mais moderno',
              '400 é apenas para erros de autenticação',
            ],
            correct: 1,
            explanation: '400 Bad Request: o problema é com a estrutura da requisição. 422 Unprocessable Entity: a estrutura é válida mas não pode ser processada (email já cadastrado, CPF inválido). Distinção útil para o cliente saber como tratar o erro.',
          },
        ],
      },
    },
    {
      id: 'mod-10-3',
      title: 'HTTPS, TLS e Segurança de Transporte',
      duration: '45 min',
      xp: 210,
      content: {
        sections: [
          {
            type: 'text',
            content: 'HTTPS não é "HTTP mais seguro" como um add-on — é HTTP sobre TLS (Transport Layer Security), que resolve três problemas críticos: confidencialidade (ninguém intercepta), integridade (ninguém altera) e autenticidade (você está falando com quem pensa). Entender TLS é essencial para configurar servidores corretamente e diagnosticar erros de certificado.',
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── TLS HANDSHAKE (TLS 1.3 simplificado) ─────────────\n#\n# 1. CLIENT HELLO\n#    "Suporto TLS 1.3, aqui estão os cipher suites que aceito\n#     e minha chave pública Diffie-Hellman"\n#\n# 2. SERVER HELLO + CERTIFICATE\n#    "Vamos usar TLS 1.3 com AES-256-GCM\n#     Aqui está meu certificado (assinado pela CA)\n#     e minha chave pública DH"\n#\n# 3. DERIVAÇÃO DE CHAVES (ambos calculam a mesma chave secreta)\n#    Ninguém mais consegue calcular — matemática de curva elíptica\n#\n# 4. FINISHED + DADOS\n#    Todos os dados a partir daqui são encriptados\n#    Custo total: 1 RTT (TLS 1.3) vs 2 RTTs (TLS 1.2)\n\n# ── CERTIFICADOS DIGITAIS ────────────────────────────\n# Certificado = documento assinado por uma CA confiável que diz:\n# "Eu, CA Raiz, confirmo que este servidor é realmente github.com"\n\n# Hierarquia de confiança:\n# Root CA (DigiCert, Let\'s Encrypt, Sectigo)\n#   └── Intermediate CA\n#         └── Certificado do servidor (github.com)\n\n# Verificar certificado de um domínio\nopenssl s_client -connect github.com:443 -servername github.com\n\n# Ver detalhes do certificado\ncurl -vI https://github.com 2>&1 | grep -A 5 "SSL connection"\n\n# Verificar data de expiração\necho | openssl s_client -connect github.com:443 2>/dev/null \\\n  | openssl x509 -noout -dates',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── LET\'S ENCRYPT: CERTIFICADO GRÁTIS ────────────────\n// Antes de 2016: certificados custavam centenas de dólares/ano\n// Let\'s Encrypt: grátis, automático, respeitado por todos os browsers\n\n// Com Certbot (automação)\n// sudo certbot --nginx -d meusite.com -d www.meusite.com\n// → Gera, configura no Nginx e agenda renovação automática\n\n// Com Caddy (HTTPS automático sem configuração)\n// Caddyfile:\n// meusite.com {\n//   reverse_proxy localhost:3000\n// }\n// Caddy obtém e renova certificado automaticamente!\n\n// ── CONFIGURAÇÃO NGINX COM TLS ────────────────────────\nconst nginxConfig = `\nserver {\n    listen 80;\n    server_name meusite.com www.meusite.com;\n    return 301 https://$host$request_uri;  # redireciona HTTP → HTTPS\n}\n\nserver {\n    listen 443 ssl http2;\n    server_name meusite.com www.meusite.com;\n\n    ssl_certificate     /etc/letsencrypt/live/meusite.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/meusite.com/privkey.pem;\n\n    # Apenas TLS 1.2 e 1.3 (sem versões antigas inseguras)\n    ssl_protocols TLSv1.2 TLSv1.3;\n    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;\n    ssl_prefer_server_ciphers off;\n\n    # HSTS: força HTTPS por 1 ano\n    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";\n    add_header X-Content-Type-Options nosniff;\n    add_header X-Frame-Options DENY;\n\n    location / {\n        proxy_pass http://localhost:3000;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n    }\n}\n`;\nconsole.log("Nginx configurado para HTTPS com TLS 1.3");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── ATAQUES E PROTEÇÕES ──────────────────────────────\n\n// MAN-IN-THE-MIDDLE (MITM)\n// Atacante se posiciona entre cliente e servidor\n// Sem TLS: lê e altera todo o tráfego\n// Com TLS: impossível sem o certificado privado do servidor\n// Com HSTS: browser rejeita qualquer conexão não-HTTPS\n\n// CERTIFICATE PINNING\n// App mobile "pina" o certificado esperado\n// Mesmo com CA comprometida, não aceita outro certificado\n// Desvantagem: renovação de cert quebra o app se não atualizar\n\n// PROBLEMAS COMUNS DE CERTIFICADO ────────────────────\nconst errosCertificado = {\n  "ERR_CERT_AUTHORITY_INVALID": {\n    causa: "CA não reconhecida — certificado auto-assinado ou CA privada",\n    solucao: "Em dev: --insecure (curl) ou NODE_TLS_REJECT_UNAUTHORIZED=0. Em prod: use Lets Encrypt",\n  },\n  "ERR_CERT_DATE_INVALID": {\n    causa: "Certificado expirado ou ainda não válido",\n    solucao: "Renove o certificado (certbot renew). Configure renovação automática",\n  },\n  "ERR_CERT_COMMON_NAME_INVALID": {\n    causa: "Certificado não é válido para este domínio",\n    solucao: "Inclua todos os domínios ao gerar: --domains meusite.com,www.meusite.com",\n  },\n  "DEPTH_ZERO_SELF_SIGNED_CERT": {\n    causa: "Certificado auto-assinado sem CA",\n    solucao: "Em dev com Node.js: adicione ao environment de testes. Em prod: nunca use self-signed",\n  },\n};\n\n// Node.js com HTTPS próprio (sem Nginx)\nconst https = require("https");\nconst fs = require("fs");\n\nconst options = {\n  key:  fs.readFileSync("/etc/letsencrypt/live/meusite.com/privkey.pem"),\n  cert: fs.readFileSync("/etc/letsencrypt/live/meusite.com/fullchain.pem"),\n  // Apenas TLS 1.3\n  minVersion: "TLSv1.3",\n};\n\nhttps.createServer(options, app).listen(443);\nconsole.log("Servidor HTTPS rodando na porta 443");',
          },
          {
            type: 'highlight',
            content: '🔒 HSTS (HTTP Strict Transport Security) é uma das proteções mais importantes: após o browser ver o header uma vez, ele recusa qualquer conexão HTTP por max-age segundos — mesmo que o usuário tente acessar via http://. Com "preload", você pode submeter o domínio para a lista HSTS pré-carregada nos browsers, protegendo até o primeiro acesso.',
          },
        ],
        exercise: {
          title: 'Validar configuração TLS',
          description: 'Implemente validarConfigTLS(config) que analisa uma configuração TLS/HTTPS e retorna problemas encontrados e nível de segurança (A, B, C ou F). Verifique: versões de protocolo, cipher suites, headers de segurança, HSTS, e certificado.',
                    solutionHint: 'TLS 1.3 é o mínimo aceitável. Certificado expirado = inválido. HSTS força HTTPS. Cipher suites com SHA-1 são inseguros. Perfect Forward Secrecy é obrigatório.',
starterCode: `function validarConfigTLS(config) {
  /*
  config = {
    protocolos: ["TLSv1.2", "TLSv1.3"],  // protocolos habilitados
    ciphers: ["AES256-GCM-SHA384"],        // cipher suites
    headers: {                             // security headers presentes
      "Strict-Transport-Security": "max-age=31536000",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    },
    certExpiracaoDias: 90,                 // dias até expirar
    redirecionaHTTP: true,                 // redireciona 80→443
  }
  */
  
  const problemas = [];
  const avisos = [];
  
  // 1. Verificar protocolos inseguros
  const inseguros = ["SSLv2", "SSLv3", "TLSv1", "TLSv1.1"];
  const protocolosInseguros = (config.protocolos || []).filter(p => inseguros.includes(p));
  if (protocolosInseguros.length > 0) {
    problemas.push(\`Protocolos inseguros habilitados: \${protocolosInseguros.join(", ")}\`);
  }
  
  // 2. Verificar se TLS 1.3 está habilitado (recomendado)
  if (!(config.protocolos || []).includes("TLSv1.3")) {
    avisos.push("TLS 1.3 não habilitado — considere ativar para melhor performance e segurança");
  }
  
  // 3. Verificar HSTS
  // Implemente: se não tem HSTS → problema, se tem mas max-age < 1 ano → aviso
  
  // 4. Verificar X-Content-Type-Options e X-Frame-Options
  // Implemente: se ausentes → avisos
  
  // 5. Verificar certificado
  // Se expira em < 30 dias → problema
  // Se expira em < 90 dias → aviso
  
  // 6. Verificar redirecionamento HTTP→HTTPS
  if (!config.redirecionaHTTP) {
    problemas.push("HTTP não é redirecionado para HTTPS — usuários podem acessar sem criptografia");
  }
  
  // Calcular nota
  let nota;
  if (problemas.length === 0 && avisos.length === 0) nota = "A+";
  else if (problemas.length === 0 && avisos.length <= 1) nota = "A";
  else if (problemas.length === 0) nota = "B";
  else if (problemas.length <= 2) nota = "C";
  else nota = "F";
  
  return { nota, problemas, avisos };
}

// Testes
const configRuim = {
  protocolos: ["TLSv1", "TLSv1.1", "TLSv1.2"],
  headers: {},
  certExpiracaoDias: 10,
  redirecionaHTTP: false,
};

const configBoa = {
  protocolos: ["TLSv1.2", "TLSv1.3"],
  headers: {
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
  },
  certExpiracaoDias: 85,
  redirecionaHTTP: true,
};

const r1 = validarConfigTLS(configRuim);
console.log("Config ruim — Nota:", r1.nota, "| Problemas:", r1.problemas.length);

const r2 = validarConfigTLS(configBoa);
console.log("Config boa — Nota:", r2.nota, "| Problemas:", r2.problemas.length);
`,
          solutionHint: 'HSTS: se ausente → problemas.push; se max-age < 31536000 → avisos.push | cert < 30 dias → problemas | cert < 90 dias → avisos',
          validate: (output, code) => {
            return output.includes('Config ruim — Nota:') &&
              output.includes('Config boa — Nota:') &&
              (output.includes('Nota: F') || output.includes('Nota: C')) &&
              (output.includes('Nota: A') || output.includes('Nota: B'));
          },
          validateMessage: 'Config ruim deve ter nota F ou C, config boa deve ter nota A ou B.',
        },
        quiz: [
          {
            question: 'O que TLS garante que HTTP puro não garante?',
            options: [
              'Apenas velocidade',
              'Confidencialidade (encriptação), integridade (sem alteração) e autenticidade (identidade do servidor)',
              'Apenas autenticação do usuário',
              'Apenas compressão do tráfego',
            ],
            correct: 1,
            explanation: 'TLS resolve 3 problemas: (1) Confidencialidade: sniffers não leem o tráfego. (2) Integridade: MITM não altera os dados sem que a outra parte detecte. (3) Autenticidade: o certificado prova que você está com o servidor correto.',
          },
          {
            question: 'O que é Certificate Authority (CA)?',
            options: [
              'O servidor que emite tokens JWT',
              'Entidade confiável que assina certificados digitais — browsers confiam em CAs raiz pré-instaladas',
              'Protocolo de troca de chaves',
              'O algoritmo de criptografia usado',
            ],
            correct: 1,
            explanation: 'CA raiz (DigiCert, Let\'s Encrypt) são pré-instaladas no SO/browser. Quando um servidor apresenta certificado assinado por uma CA conhecida, o browser confia. Certificado auto-assinado = browser alerta porque nenhuma CA validou.',
          },
          {
            question: 'Por que TLS 1.3 é preferível ao TLS 1.2?',
            options: [
              'TLS 1.3 usa chaves maiores',
              'TLS 1.3 faz handshake em 1 RTT (vs 2 no TLS 1.2) e remove cipher suites inseguros legados',
              'TLS 1.3 é obrigatório por lei',
              'TLS 1.2 não é mais suportado',
            ],
            correct: 1,
            explanation: 'TLS 1.3: handshake em 1 RTT (TLS 1.2 exige 2), 0-RTT para sessões retomadas, removeu algoritmos fracos (RSA key exchange, SHA-1, RC4). Performance melhor e superfície de ataque menor.',
          },
          {
            question: 'O que é HSTS e por que é importante?',
            options: [
              'Um tipo de certificado',
              'Header que instrui o browser a usar HTTPS obrigatoriamente por um período — mesmo que o usuário tente HTTP',
              'Um protocolo de handshake',
              'Uma ferramenta de scan de vulnerabilidades',
            ],
            correct: 1,
            explanation: 'Strict-Transport-Security: max-age=31536000 faz o browser recusar qualquer conexão HTTP por 1 ano após a primeira visita HTTPS. Previne downgrade attacks onde atacante força HTTP. "preload" protege desde o primeiro acesso.',
          },
          {
            question: 'O que acontece se um certificado TLS expira?',
            options: [
              'O site funciona com aviso amarelo',
              'Browsers exibem erro de segurança e bloqueiam acesso — usuários não conseguem acessar o site',
              'O certificado é renovado automaticamente sempre',
              'Apenas HTTP para de funcionar',
            ],
            correct: 1,
            explanation: 'Certificado expirado = browser bloqueia com erro grave (NET::ERR_CERT_DATE_INVALID). Usuários técnicos podem ignorar, mas a maioria abandona. Configure renovação automática: certbot renew via cron, ou use Caddy/Traefik que renovam automaticamente.',
          },
        ],
      },
    },
    {
      id: 'mod-10-4',
      title: 'HTTP/2 e HTTP/3: Contexto e Evolução',
      duration: '40 min',
      xp: 200,
      content: {
        sections: [
          {
            type: 'text',
            content: 'HTTP/1.1 foi projetado em 1997. A web de hoje — com centenas de recursos por página — expôs seus limites fundamentais. HTTP/2 e HTTP/3 reescreveram o protocolo para o mundo moderno, com multiplexing, server push e transporte sobre UDP. Entender as diferenças explica por que algumas otimizações que faziam sentido em 1997 são anti-padrões hoje.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── HTTP/1.1: OS PROBLEMAS ────────────────────────────\n\n// PROBLEMA 1: Head-of-Line Blocking\n// Uma conexão TCP = uma requisição por vez\n// Request 1: HTML (200ms)\n// Request 2: CSS (espera request 1 terminar) + 150ms = 350ms total\n// Request 3: JS  (espera request 2 terminar) + 180ms = 530ms total\n\n// "Solução" em HTTP/1.1: abrir múltiplas conexões TCP (6 por domínio)\n// Problema: cada conexão tem overhead de TCP handshake + TLS\n\n// PROBLEMA 2: Header repetição\n// Cada request envia headers completos — User-Agent, Cookie, Accept...\n// Mesmos headers enviados 50x para uma página com 50 assets\n// Overhead: 500-800 bytes por request\n\n// PROBLEMA 3: Text-based protocol\n// Cada byte do header é ASCII — menos eficiente que binário\n\n// "Hacks" comuns em HTTP/1.1 (agora são anti-padrões com HTTP/2):\nconst antiPadroesHTTP1 = [\n  "Domain sharding: múltiplos subdomínios para mais conexões paralelas",\n  "CSS/JS bundling: um arquivo enorme em vez de muitos pequenos",\n  "Image sprites: uma imagem com várias imagens para menos requests",\n  "Inline CSS/JS: eliminar requests extras",\n];\n// Com HTTP/2, esses hacks podem PIORAR a performance!\nconsole.log("Anti-padrões HTTP/1.1 que são ruins com HTTP/2:", antiPadroesHTTP1.length);',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── HTTP/2: AS SOLUÇÕES ──────────────────────────────\n\n// 1. MULTIPLEXING — múltiplas streams em uma conexão TCP\n//    Stream 1: HTML\n//    Stream 2: CSS     ← todas em paralelo!\n//    Stream 3: JS      ← na MESMA conexão TCP\n//    Stream 4: imagem\n//    Resultado: 1 conexão TCP, N requests simultâneos\n\n// 2. HEADER COMPRESSION (HPACK)\n//    Headers são comprimidos e armazenados em tabela\n//    Requests subsequentes enviam apenas as diferenças\n//    Economia: ~80% no tamanho dos headers\n\n// 3. BINARY PROTOCOL\n//    Frames binários em vez de texto ASCII\n//    Mais eficiente de parsear, menos erros\n\n// 4. SERVER PUSH (depreciado na prática)\n//    Servidor envia recursos proativamente sem o cliente pedir\n//    Ex: browser pede index.html, servidor já envia style.css\n//    Na prática: difícil de acertar o timing, substituído por <link rel=preload>\n\n// 5. STREAM PRIORITIZATION\n//    Atribui prioridade a streams — CSS antes de imagens\n\n// Habilitar HTTP/2 no Node.js\nconst http2 = require("http2");\nconst fs = require("fs");\n\nconst server = http2.createSecureServer({\n  key:  fs.readFileSync("server.key"),\n  cert: fs.readFileSync("server.crt"),\n});\n\nserver.on("stream", (stream, headers) => {\n  stream.respond({ ":status": 200, "content-type": "text/html" });\n  stream.end("<h1>HTTP/2!</h1>");\n});\n\nserver.listen(443);\nconsole.log("HTTP/2 requer HTTPS — sem exceção em browsers modernos");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── HTTP/3 E QUIC ────────────────────────────────────\n\n// HTTP/2 resolve Head-of-Line Blocking na camada HTTP\n// MAS ainda tem HoL Blocking na camada TCP!\n// Um pacote perdido bloqueia TODAS as streams\n\n// HTTP/3: troca TCP por QUIC (Quick UDP Internet Connections)\n// QUIC = confiabilidade do TCP + velocidade do UDP\n//        + TLS 1.3 integrado\n//        + Connection migration (WiFi → 4G sem reconectar)\n\n// Comparação de handshake:\n// HTTP/1.1 sobre TLS 1.2: TCP(1RTT) + TLS(2RTT) = 3 RTTs antes do 1° byte\n// HTTP/2  sobre TLS 1.3:  TCP(1RTT) + TLS(1RTT) = 2 RTTs\n// HTTP/3  sobre QUIC:     QUIC+TLS combinados   = 1 RTT (ou 0-RTT!)\n\n// Verificar qual HTTP está sendo usado:\nconst exemplos = [\n  "curl -I --http1.1 https://github.com",\n  "curl -I --http2   https://github.com",\n  "curl -I --http3   https://github.com",\n  // No browser: DevTools → Network → Protocol column\n];\n\n// ── QUANDO USAR CADA UM ──────────────────────────────\n// HTTP/1.1: legado, ainda necessário como fallback\n// HTTP/2:   padrão atual, suportado por 97%+ dos browsers\n//           Habilitar no Nginx: listen 443 ssl http2;\n// HTTP/3:   crescimento rápido, ~30% do tráfego web em 2024\n//           Cloudflare, Google, Facebook já usam extensivamente\n//           Mais impactante em redes com alta perda de pacotes (mobile)\n\n// QUIC na prática com Node.js (experimental)\n// const { createQuicSocket } = require("net"); // Node 18+\n\nconsole.log("HTTP/3 é UDP + confiabilidade + TLS em uma única camada");',
          },
          {
            type: 'highlight',
            content: '⚡ Impacto real de HTTP/2 vs HTTP/1.1: uma página com 50 recursos estáticos pode carregar 2-3x mais rápido só habilitando HTTP/2 no servidor, sem mudar nenhum código. A única exigência é HTTPS — mais um motivo para nunca servir HTTP puro em produção.',
          },
        ,
                  {
                    type: 'common_error',
                    title: 'Usar GET para operações que modificam dados',
                    wrong: `// Deletar via GET — comum em apps antigos
GET /api/usuarios/delete?id=42
GET /api/emails/send?para=fulano&msg=oi

// Navegadores, proxies e bots
// podem pré-carregar links GET — desastre!`,
                    wrongLabel: 'GET deve ser idempotente e seguro — nunca deve modificar dados.',
                    right: `// Verbos corretos para cada operação
GET    /api/usuarios/42     // Lê o usuário
DELETE /api/usuarios/42     // Remove o usuário
POST   /api/emails          // Envia email (corpo no body)
PUT    /api/usuarios/42     // Atualiza completamente
PATCH  /api/usuarios/42     // Atualiza parcialmente`,
                    rightLabel: 'REST: cada verbo tem semântica própria. GET lê, POST cria, PUT/PATCH atualiza, DELETE remove.',
                    explanation: 'GET deve ser seguro (sem efeitos colaterais) e idempotente (múltiplas chamadas = mesmo resultado). Bots, pre-fetchers e caches assumem isso. Usar GET para delete/send é uma vulnerabilidade clássica (CSRF via img src).',
                  }],
        exercise: {
          title: 'Comparar estratégias de carregamento HTTP',
          description: 'Implemente simularCarregamento(recursos, protocolo) que simula o tempo de carregamento de uma lista de recursos sob HTTP/1.1 (máximo 6 conexões paralelas) e HTTP/2 (todos em paralelo). Calcule o tempo total e a melhoria percentual.',
          starterCode: `function simularCarregamento(recursos, protocolo) {
  // recursos = [{ nome, tamanhoKB, tempoMs }]
  // protocolo = "HTTP/1.1" ou "HTTP/2"
  
  if (protocolo === "HTTP/1.1") {
    // HTTP/1.1: máximo 6 conexões paralelas por domínio
    // Agrupe em lotes de 6, cada lote espera o anterior terminar
    const MAX_CONEXOES = 6;
    let tempoTotal = 0;
    
    // Processe em lotes de MAX_CONEXOES
    for (let i = 0; i < recursos.length; i += MAX_CONEXOES) {
      const lote = recursos.slice(i, i + MAX_CONEXOES);
      // Tempo do lote = o mais lento do lote (paralelos entre si)
      const tempoLote = Math.max(...lote.map(r => r.tempoMs));
      tempoTotal += tempoLote;
    }
    
    return {
      protocolo,
      recursos: recursos.length,
      tempoTotal,
      lotes: Math.ceil(recursos.length / MAX_CONEXOES),
    };
  }
  
  if (protocolo === "HTTP/2") {
    // HTTP/2: todos em paralelo na mesma conexão (multiplexing)
    // Tempo total = o mais lento de todos
    // Implemente aqui
  }
  
  return null;
}

// Recursos de uma página típica
const recursos = [
  { nome: "index.html",   tamanhoKB: 15,  tempoMs: 80  },
  { nome: "main.css",     tamanhoKB: 45,  tempoMs: 120 },
  { nome: "app.js",       tamanhoKB: 380, tempoMs: 450 },
  { nome: "vendor.js",    tamanhoKB: 220, tempoMs: 280 },
  { nome: "logo.png",     tamanhoKB: 35,  tempoMs: 90  },
  { nome: "hero.webp",    tamanhoKB: 180, tempoMs: 220 },
  { nome: "font-1.woff2", tamanhoKB: 28,  tempoMs: 75  },
  { nome: "font-2.woff2", tamanhoKB: 32,  tempoMs: 85  },
  { nome: "icons.svg",    tamanhoKB: 12,  tempoMs: 50  },
  { nome: "analytics.js", tamanhoKB: 95,  tempoMs: 150 },
];

const http1 = simularCarregamento(recursos, "HTTP/1.1");
const http2 = simularCarregamento(recursos, "HTTP/2");

console.log(\`HTTP/1.1: \${http1.tempoTotal}ms (em \${http1.lotes} lotes)\`);
console.log(\`HTTP/2:   \${http2.tempoTotal}ms (todos em paralelo)\`);
console.log(\`Melhoria: \${Math.round((1 - http2.tempoTotal / http1.tempoTotal) * 100)}% mais rápido\`);
`,
          solutionHint: 'HTTP/2: tempoTotal = Math.max(...recursos.map(r => r.tempoMs)) — apenas o mais lento importa quando todos rodam em paralelo',
          validate: (output, code) => {
            return output.includes('HTTP/1.1:') &&
              output.includes('HTTP/2:') &&
              output.includes('Melhoria:') &&
              output.includes('mais rápido');
          },
          validateMessage: 'Mostre tempo do HTTP/1.1, HTTP/2 e a melhoria percentual.',
        },
        quiz: [
          {
            question: 'O que é Head-of-Line Blocking no HTTP/1.1?',
            options: [
              'O header mais importante bloqueia os outros',
              'Uma conexão TCP processa uma requisição por vez — a próxima espera a anterior terminar',
              'O DNS bloqueia novas conexões',
              'Limite de tamanho do header',
            ],
            correct: 1,
            explanation: 'HTTP/1.1 é serial em uma conexão: se o request 1 demora, o request 2 espera — mesmo que sejam independentes. Workaround: abrir múltiplas conexões (até 6 por domínio). HTTP/2 multiplexing elimina isso.',
          },
          {
            question: 'Por que CSS/JS bundling em um único arquivo é anti-padrão com HTTP/2?',
            options: [
              'Bundle ainda é necessário',
              'Com multiplexing, muitos arquivos pequenos são tão rápidos quanto um grande — e caching granular é mais eficiente',
              'HTTP/2 não suporta JavaScript',
              'Bundle aumenta o tamanho total',
            ],
            correct: 1,
            explanation: 'HTTP/1.1: menos arquivos = menos requisições = mais rápido. HTTP/2: 100 arquivos em paralelo na mesma conexão. Com arquivos separados: mudar 1 componente invalida apenas aquele bundle, não o bundle inteiro.',
          },
          {
            question: 'O que diferencia HTTP/3 do HTTP/2?',
            options: [
              'HTTP/3 tem mais headers',
              'HTTP/3 usa QUIC (sobre UDP) em vez de TCP — elimina HoL blocking da camada de transporte',
              'HTTP/3 não usa TLS',
              'HTTP/3 é mais lento mas mais seguro',
            ],
            correct: 1,
            explanation: 'HTTP/2 resolve HoL na camada HTTP mas TCP ainda bloqueia em perda de pacote. QUIC (HTTP/3) implementa streams independentes no próprio protocolo de transporte — uma stream bloqueada não afeta as outras.',
          },
          {
            question: 'Por que HTTP/2 exige HTTPS na prática?',
            options: [
              'É um requisito técnico do protocolo',
              'Browsers implementaram HTTP/2 apenas sobre TLS — decisão de política, não técnica',
              'HTTP/2 só funciona com certificados Let\'s Encrypt',
              'HTTP/2 cleartext não existe',
            ],
            correct: 1,
            explanation: 'O spec HTTP/2 permite HTTP/2 sobre texto claro (h2c), mas nenhum browser implementou. Google, Mozilla e Apple decidiram que HTTP/2 só seria suportado com TLS — incentivando adoção de HTTPS.',
          },
          {
            question: 'O que é HPACK no contexto do HTTP/2?',
            options: [
              'Um algoritmo de compressão de imagens',
              'Compressão de headers HTTP/2 — tabela compartilhada elimina headers repetidos entre requests',
              'O protocolo de handshake do HTTP/2',
              'Uma forma de bundle de arquivos',
            ],
            correct: 1,
            explanation: 'HPACK: cliente e servidor mantêm uma tabela de headers vistos. Em vez de enviar User-Agent completo em cada request, enviam um índice. Reduz overhead de headers em ~80% em requests sequenciais.',
          },
        ],
      },
    },
    {
      id: 'mod-10-5',
      title: 'REST, GraphQL e Design de APIs',
      duration: '50 min',
      xp: 220,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Uma API bem projetada é tão importante quanto o código que a implementa — ela é o contrato entre o backend e qualquer cliente. REST é o padrão dominante, GraphQL resolve problemas específicos de REST, e gRPC existe para comunicação entre serviços internos. Saber quando usar cada um é habilidade de sênior.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── REST: BOAS PRÁTICAS ──────────────────────────────\n\n// Recursos como substantivos (nunca verbos na URL)\n// ❌ Ruim\nGET /getUsuarios\nPOST /criarUsuario\nDELETE /deletarUsuario/42\n\n// ✅ Bom — URL é o recurso, método HTTP é a ação\nGET    /api/v1/usuarios          // listar\nPOST   /api/v1/usuarios          // criar\nGET    /api/v1/usuarios/42       // buscar um\nPUT    /api/v1/usuarios/42       // substituir\nPATCH  /api/v1/usuarios/42       // atualizar parcialmente\nDELETE /api/v1/usuarios/42       // deletar\n\n// Relacionamentos\nGET    /api/v1/usuarios/42/posts         // posts do usuário 42\nPOST   /api/v1/usuarios/42/posts         // criar post para usuário 42\nDELETE /api/v1/usuarios/42/posts/7       // deletar post 7 do usuário 42\n\n// Filtros, paginação e ordenação via query params\nGET /api/v1/posts?status=publicado&autor=42&page=2&limit=20&sort=-createdAt\n//                                                          ↑ - = descendente\n\n// Versionamento na URL (mais comum) ou header\nGET /api/v1/usuarios    // versão 1 (URL)\nGET /api/v2/usuarios    // versão 2 (URL — breaking changes)\n// ou via header: API-Version: 2\n\nconsole.log("URL = substantivo. HTTP Method = verbo. Status code = resultado.");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── PAGINAÇÃO: OFFSET vs CURSOR ─────────────────────\n\n// Offset (simples, mas lento para páginas grandes)\nGET /api/posts?page=100&limit=20   // pula 2000 registros\n// PROBLEMA: ORDER BY + OFFSET lê 2020 linhas para retornar 20\n\n// Cursor-based (eficiente, mas mais complexo)\nGET /api/posts?limit=20                      // primeira página\nGET /api/posts?after=eyJpZCI6MTAwfQ&limit=20 // próxima página\n// cursor = last_id codificado em base64\n// SOLUÇÃO: WHERE id > last_id — usa índice diretamente\n\n// Resposta com metadata de paginação\nconst respostaPaginada = {\n  dados: [/* array de posts */],\n  paginacao: {\n    total: 1543,\n    pagina: 5,\n    porPagina: 20,\n    // Cursor-based:\n    proximo: "eyJpZCI6MTIwfQ==",  // opaque cursor\n    anterior: "eyJpZCI6MTAxfQ==",\n    temProximo: true,\n    temAnterior: true,\n  },\n};\n\n// ── TRATAMENTO DE ERROS PADRONIZADO ──────────────────\n// Formato RFC 7807 (Problem Details for HTTP APIs)\nconst erroRFC7807 = {\n  type:     "https://api.exemplo.com/errors/validation",\n  title:    "Erro de Validação",\n  status:   422,\n  detail:   "Um ou mais campos falharam na validação",\n  instance: "/api/v1/usuarios/42",    // qual request causou\n  erros: [                            // extensão customizada\n    { campo: "email", mensagem: "Email já cadastrado" },\n    { campo: "senha",  mensagem: "Mínimo de 8 caracteres" },\n  ],\n};\nconsole.log("Erro RFC 7807:", erroRFC7807.type);',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── GRAPHQL: QUANDO FAZ SENTIDO ─────────────────────\n\n// Problema do REST que GraphQL resolve:\n// Overfetching: GET /usuarios/42 retorna 20 campos, você precisa de 3\n// Underfetching: exibir página precisa de 3 requests diferentes\n\n// REST para uma tela de perfil:\n// GET /usuarios/42               → dados do usuário\n// GET /usuarios/42/posts?limit=5 → posts recentes\n// GET /usuarios/42/seguidores    → seguidores\n// = 3 requests para montar 1 tela\n\n// GraphQL para a mesma tela — 1 request:\nconst query = `\n  query PerfilUsuario($id: ID!) {\n    usuario(id: $id) {\n      nome           # apenas o que precisa\n      avatar\n      bio\n      posts(limit: 5) {\n        titulo\n        createdAt\n      }\n      _contagemSeguidores  # aggregation inline\n    }\n  }\n`;\n\n// Quando GraphQL vale:\n// ✅ Mobile app com bandwidth limitada (só busca campos necessários)\n// ✅ Frontend evolui rapidamente sem deploys de backend\n// ✅ Múltiplos clientes (mobile, web, parceiros) com necessidades diferentes\n// ✅ BFF (Backend for Frontend) que agrega múltiplos microserviços\n\n// Quando REST é melhor:\n// ✅ API pública simples (REST é mais familiar)\n// ✅ Cacheable (HTTP cache funciona nativamente com REST)\n// ✅ Time pequeno sem necessidade de flexibilidade\n// ✅ Ops simples de CRUD sem queries complexas\n\nconsole.log("GraphQL não substitui REST — resolve problemas específicos");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── gRPC: COMUNICAÇÃO ENTRE MICROSSERVIÇOS ──────────\n// Protocol Buffers (binário) + HTTP/2\n// Tipagem forte via .proto, geração automática de código\n// 5-10x mais rápido que REST+JSON para comunicação interna\n\n// usuario.proto\n/*\nsyntax = "proto3";\npackage usuario;\n\nservice UsuarioService {\n  rpc BuscarUsuario (BuscarRequest) returns (Usuario);\n  rpc ListarUsuarios (ListarRequest) returns (stream Usuario); // streaming!\n}\n\nmessage BuscarRequest { string id = 1; }\nmessage Usuario {\n  string id = 1;\n  string nome = 2;\n  string email = 3;\n  int64 createdAt = 4;\n}\n*/\n\n// Quando usar gRPC:\n// ✅ Comunicação interna entre microsserviços\n// ✅ Streaming bidirecional (vídeo, real-time)\n// ✅ Múltiplas linguagens (código gerado automaticamente)\n// ❌ APIs públicas (necessita cliente especial)\n// ❌ Browsers (suporte limitado — use gRPC-Web)\n\n// RESUMO de quando usar cada um:\nconst decisao = {\n  "API pública ou B2B":          "REST",\n  "App com cliente variado":     "GraphQL",\n  "Microsserviços internos":     "gRPC",\n  "Real-time bidirecional":      "WebSockets",\n  "Server-Sent Events (só ida)": "SSE (EventSource)",\n};\n\nconsole.log(decisao);',
          },
          {
            type: 'highlight',
            content: '📐 Princípios de design de API que sobrevivem ao tempo: (1) URLs são substantivos, métodos são verbos. (2) Retorne sempre o mesmo formato de erro. (3) Versione a API desde o primeiro dia — mudar sem versão quebra clientes. (4) Documente com OpenAPI/Swagger. (5) Use pagination em qualquer endpoint que pode retornar mais de 20 itens. (6) Idempotency-Key para operações críticas como pagamentos.',
          },
        ],
        exercise: {
          title: 'Projetar uma API REST completa',
          description: 'Implemente um roteador REST simples que registra rotas e valida se uma requisição está bem formada. Cubra: URL com recurso correto (sem verbos), método adequado para a operação, e resposta com status code semântico.',
                    solutionHint: 'Recursos como substantivos (/usuarios, /posts). Verbos HTTP para ações. Versione com /v1/. Retorne erros com mensagem e código consistentes.',
starterCode: `class APIRouter {
  constructor() {
    this.rotas = new Map(); // "METHOD /path" → handler info
  }
  
  // Registra uma rota
  rota(metodo, path, descricao) {
    const chave = \`\${metodo.toUpperCase()} \${path}\`;
    this.rotas.set(chave, { metodo, path, descricao });
    return this; // permite chaining
  }
  
  // Valida se a rota segue boas práticas REST
  validarRota(metodo, path) {
    const problemas = [];
    
    // 1. URL não deve conter verbos
    const verbosProibidos = ["get", "create", "update", "delete", "fetch",
                             "buscar", "criar", "atualizar", "deletar"];
    const segmentos = path.toLowerCase().split("/");
    for (const verbo of verbosProibidos) {
      if (segmentos.includes(verbo)) {
        problemas.push(\`URL contém verbo "\${verbo}" — use substantivos\`);
      }
    }
    
    // 2. Verificar combinações corretas método + operação implícita
    // GET não deve estar em path que parece criação (/novo, /create)
    // DELETE em path sem ID pode ser perigoso
    if (metodo === "DELETE" && !path.includes(":") && !path.includes("{")) {
      problemas.push("DELETE sem ID de recurso — pode deletar tudo acidentalmente");
    }
    
    // 3. Implemente: POST não deveria ter ID na URL (criação)
    // PATH /recursos/:id é para PUT/PATCH/DELETE/GET
    // POST /recursos/:id é incomum — adicione aviso
    
    return { valida: problemas.length === 0, problemas };
  }
  
  // Simula uma requisição e retorna o status correto
  simularRequisicao(metodo, path, body = null) {
    const chave = \`\${metodo.toUpperCase()} \${path}\`;
    const rota = this.rotas.get(chave);
    
    if (!rota) return { status: 404, body: { erro: "Rota não encontrada" } };
    
    // Status codes baseados no método
    const statusPorMetodo = {
      GET:    { sucesso: 200 },
      POST:   { sucesso: 201, requerBody: true },
      PUT:    { sucesso: 200, requerBody: true },
      PATCH:  { sucesso: 200, requerBody: true },
      DELETE: { sucesso: 204 },
    };
    
    const config = statusPorMetodo[metodo.toUpperCase()];
    if (config?.requerBody && !body) {
      return { status: 400, body: { erro: "Body obrigatório para este método" } };
    }
    
    return { status: config?.sucesso || 200, body: { mensagem: "Operação bem-sucedida" } };
  }
}

// Construindo a API
const api = new APIRouter();

api
  .rota("GET",    "/api/v1/posts",         "listar posts")
  .rota("POST",   "/api/v1/posts",         "criar post")
  .rota("GET",    "/api/v1/posts/:id",     "buscar post")
  .rota("PATCH",  "/api/v1/posts/:id",     "atualizar post")
  .rota("DELETE", "/api/v1/posts/:id",     "deletar post");

// Testes de validação
const v1 = api.validarRota("GET", "/api/v1/getPosts");
console.log("URL com verbo:", v1.valida, "|", v1.problemas[0]);

const v2 = api.validarRota("DELETE", "/api/v1/posts");
console.log("DELETE sem ID:", v2.valida, "|", v2.problemas[0]);

const v3 = api.validarRota("GET", "/api/v1/posts/:id");
console.log("Rota válida:", v3.valida);

// Testes de requisição
const r1 = api.simularRequisicao("POST", "/api/v1/posts");
console.log("POST sem body:", r1.status); // 400

const r2 = api.simularRequisicao("POST", "/api/v1/posts", { titulo: "Teste" });
console.log("POST com body:", r2.status); // 201

const r3 = api.simularRequisicao("DELETE", "/api/v1/posts/:id");
console.log("DELETE:", r3.status); // 204
`,
          solutionHint: 'POST com ID: if (metodo === "POST" && path.includes(":")) problemas.push("POST com ID é incomum — POST cria, use PUT/PATCH para atualizar por ID")',
          validate: (output, code) => {
            return output.includes('URL com verbo: false') &&
              output.includes('DELETE sem ID: false') &&
              output.includes('Rota válida: true') &&
              output.includes('POST sem body: 400') &&
              output.includes('POST com body: 201') &&
              output.includes('DELETE: 204');
          },
          validateMessage: 'Valide rotas ruins (false), rota boa (true) e status 400, 201, 204.',
        },
        quiz: [
          {
            question: 'Qual o problema do "overfetching" no REST?',
            options: [
              'Muitas requisições simultâneas',
              'A API retorna mais dados do que o cliente precisa — desperdiça bandwidth e processamento',
              'Cache ineficiente',
              'Muitos endpoints disponíveis',
            ],
            correct: 1,
            explanation: 'REST retorna o recurso completo — GET /usuarios/42 traz 20 campos mesmo que você precise só de nome e avatar. GraphQL resolve: você especifica exatamente os campos que quer, o servidor retorna só esses.',
          },
          {
            question: 'Por que versionar a API desde o início (/v1/)?',
            options: [
              'É apenas convenção',
              'Breaking changes são inevitáveis — /v2/ permite coexistência com clientes usando /v1/ durante a migração',
              'Versão melhora performance',
              'Necessário para autenticação',
            ],
            correct: 1,
            explanation: 'Sem versionamento, qualquer breaking change (renomear campo, mudar tipo) quebra todos os clientes imediatamente. Com /v1/ e /v2/ coexistindo, você migra clientes gradualmente. Retrofit doloroso depois — faça desde o primeiro endpoint.',
          },
          {
            question: 'Quando gRPC é preferível ao REST?',
            options: [
              'Para APIs públicas',
              'Para comunicação interna entre microsserviços onde performance e tipagem forte são críticos',
              'Para apps mobile',
              'Para APIs GraphQL',
            ],
            correct: 1,
            explanation: 'gRPC com Protocol Buffers: binário (menor que JSON), HTTP/2 nativo, código gerado automaticamente de .proto. Latência e throughput muito superiores ao REST+JSON. Desvantagem: clientes precisam do cliente gRPC gerado.',
          },
          {
            question: 'O que é cursor-based pagination e por que é melhor que offset?',
            options: [
              'Cursor é mais fácil de implementar',
              'Cursor usa o último ID como ponto de partida — WHERE id > cursor usa índice. OFFSET lê e descarta N registros',
              'Cursor funciona apenas com MongoDB',
              'Offset não é suportado em REST',
            ],
            correct: 1,
            explanation: 'OFFSET 1000 LIMIT 20: banco lê 1020 linhas e descarta as primeiras 1000 — fica mais lento a cada página. Cursor WHERE id > 1000 LIMIT 20: index scan direto para o ponto certo — O(log n) independente da página.',
          },
          {
            question: 'O que é idempotency key em APIs de pagamento?',
            options: [
              'A chave secreta do gateway de pagamento',
              'UUID único por tentativa que o servidor usa para deduplificar — se a request for repetida, retorna o resultado original sem cobrar duas vezes',
              'O token de autenticação',
              'O hash do valor da transação',
            ],
            correct: 1,
            explanation: 'POST não é idempotente — se falhar na rede, você não sabe se o pagamento processou. Idempotency-Key: f47ac10b-58cc é enviado na request. Se repetida com a mesma key, o servidor retorna o resultado da primeira vez sem criar novo pagamento.',
          },
        ],
      },
    },
    {
      id: 'mod-10-6',
      title: 'CORS, Cookies e Autenticação na Web',
      duration: '50 min',
      xp: 220,
      content: {
        sections: [
          {
            type: 'text',
            content: 'CORS, cookies e autenticação são os temas que mais confundem desenvolvedores fullstack — e os que geram mais bugs em produção. Entender o modelo de segurança do browser (Same-Origin Policy), como cookies realmente funcionam, e as diferenças entre JWT em cookie vs localStorage clarifica decisões de arquitetura que afetam segurança.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── SAME-ORIGIN POLICY ───────────────────────────────\n// Browser bloqueia requests JavaScript entre origens diferentes\n// Origem = protocolo + domínio + porta\n\n// mesma origem:\nhttps://meusite.com/pag-a  → https://meusite.com/api/dados    ✅\n\n// origens diferentes (cross-origin):\nhttps://meusite.com        → https://api.meusite.com          ❌ subdomain diferente\nhttps://meusite.com        → http://meusite.com               ❌ protocolo diferente\nhttps://meusite.com:443    → https://meusite.com:3000         ❌ porta diferente\nhttps://meusite.com        → https://outrosite.com            ❌ domínio diferente\n\n// ── CORS: PERMISSÃO DO SERVIDOR ──────────────────────\n// O servidor diz ao browser: "pode aceitar requests desta origem"\n\n// CORS Simples (sem preflight):\n// Métodos: GET, HEAD, POST\n// Headers: Content-Type: text/plain, multipart/form-data, application/x-www-form-urlencoded\n\n// CORS Preflight (OPTIONS antes do request real):\n// Qualquer outro método (PUT, DELETE, PATCH)\n// Qualquer outro Content-Type (application/json!)\n// Headers customizados (Authorization)\n\n// Exemplo de preflight para POST com JSON:\n// Browser → Servidor:\nOPTIONS /api/usuarios HTTP/1.1\nOrigin: https://meusite.com\nAccess-Control-Request-Method: POST\nAccess-Control-Request-Headers: Content-Type, Authorization\n\n// Servidor → Browser (deve responder):\nHTTP/1.1 204 No Content\nAccess-Control-Allow-Origin: https://meusite.com\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH\nAccess-Control-Allow-Headers: Content-Type, Authorization\nAccess-Control-Max-Age: 86400    // cacheia preflight por 1 dia\nAccess-Control-Allow-Credentials: true  // permite cookies',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── CORS NO EXPRESS ──────────────────────────────────\nconst cors = require("cors");\n\n// ❌ Nunca em produção — permite qualquer origem!\napp.use(cors());\n// ou Access-Control-Allow-Origin: *\n// Com *, credenciais (cookies) NÃO funcionam\n\n// ✅ Configuração correta\nconst origensPermitidas = [\n  "https://meusite.com",\n  "https://www.meusite.com",\n  process.env.NODE_ENV === "development" ? "http://localhost:5173" : null,\n].filter(Boolean);\n\napp.use(cors({\n  origin: (origin, callback) => {\n    // Permite requests sem origin (curl, Postman, server-to-server)\n    if (!origin) return callback(null, true);\n    if (origensPermitidas.includes(origin)) return callback(null, true);\n    callback(new Error(`Origem não permitida: ${origin}`));\n  },\n  credentials: true,              // permite cookies cross-origin\n  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],\n  allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],\n  exposedHeaders: ["X-Total-Count"], // headers que JS pode ler\n  maxAge: 86400,                  // cacheia preflight 24h\n}));\n\nconsole.log("CORS configurado apenas para origens conhecidas");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── COOKIES: ANATOMIA E ATRIBUTOS ───────────────────\n// Set-Cookie: nome=valor; atributos\n\nres.cookie("sessionId", "abc123", {\n  httpOnly: true,        // JS não acessa — previne XSS roubando cookie\n  secure: true,          // apenas HTTPS — nunca enviar em HTTP\n  sameSite: "strict",    // não envia em requests cross-site — previne CSRF\n  // sameSite: "lax"     // envia em navegação top-level (links)\n  // sameSite: "none"    // envia sempre (precisa de secure: true)\n  maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 dias em ms\n  path: "/",             // disponível para todo o site\n  domain: ".meusite.com", // compartilhado entre subdomínios\n});\n\n// Cookie de sessão (sem maxAge) → apaga ao fechar o browser\n// Cookie persistente (com maxAge) → dura até expirar\n\n// ── JWT: COOKIE httpOnly vs localStorage ─────────────\n\n// localStorage:\n// ❌ Vulnerável a XSS — script malicioso lê com localStorage.getItem()\n// ✅ Fácil de usar, funciona cross-origin sem configuração\n// ✅ Sem problema de CSRF\n// Use quando: single page app sem preocupação de XSS extrema\n\n// Cookie httpOnly:\n// ✅ Invisível para JavaScript — XSS não consegue roubar\n// ❌ Vulnerável a CSRF (mitigado com sameSite + CSRF token)\n// ❌ Precisa de CORS configurado com credentials: true\n// Use quando: segurança máxima, apps financeiras/sensíveis\n\n// ── CSRF: CROSS-SITE REQUEST FORGERY ─────────────────\n// Atacante cria página que faz request para sua API\n// Se usuário está logado (cookie), browser envia cookie automaticamente!\n\n// Proteção 1: SameSite=Strict (mais fácil)\n// Proteção 2: CSRF token (double submit cookie)\nconst csrfToken = crypto.randomUUID();\nres.cookie("csrf", csrfToken, { httpOnly: false }); // JS precisa ler\n// No frontend: adiciona X-CSRF-Token: <token> em todo request mutante\n// No backend: verifica se header bate com cookie\nconsole.log("SameSite=Strict é proteção CSRF automática");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── FLUXO COMPLETO DE AUTENTICAÇÃO ──────────────────\n\n// 1. Login\napp.post("/auth/login", async (req, res) => {\n  const { email, senha } = req.body;\n  const usuario = await db.usuario.findUnique({ where: { email } });\n  \n  // Sempre mesma mensagem — não vaza se email existe\n  if (!usuario || !await bcrypt.compare(senha, usuario.senhaHash)) {\n    return res.status(401).json({ erro: "Credenciais inválidas" });\n  }\n  \n  const accessToken  = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET,  { expiresIn: "15m" });\n  const refreshToken = jwt.sign({ id: usuario.id }, process.env.JWT_REFRESH,  { expiresIn: "7d"  });\n  \n  // Refresh token em cookie httpOnly (nunca exposto ao JS)\n  res.cookie("refreshToken", refreshToken, {\n    httpOnly: true, secure: true, sameSite: "strict",\n    maxAge: 7 * 24 * 60 * 60 * 1000,\n  });\n  \n  // Access token no body (JS armazena em memória, não localStorage!)\n  res.json({ accessToken, usuario: { id: usuario.id, nome: usuario.nome } });\n});\n\n// 2. Renovar access token com refresh token\napp.post("/auth/refresh", (req, res) => {\n  const { refreshToken } = req.cookies; // vem do cookie httpOnly\n  if (!refreshToken) return res.sendStatus(401);\n  \n  try {\n    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH);\n    const novoAccessToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET, { expiresIn: "15m" });\n    res.json({ accessToken: novoAccessToken });\n  } catch {\n    res.clearCookie("refreshToken");\n    res.sendStatus(401);\n  }\n});\n\n// 3. Logout\napp.post("/auth/logout", (req, res) => {\n  res.clearCookie("refreshToken");\n  // Em produção: invalidar refresh token no banco (blocklist)\n  res.sendStatus(204);\n});',
          },
          {
            type: 'highlight',
            content: '🔐 O padrão mais seguro: access token de vida curta (15min) em memória JavaScript + refresh token de vida longa (7d) em cookie httpOnly. Atacante XSS rouba o access token mas expira em 15min. Atacante CSRF não consegue ler o cookie httpOnly para usar o refresh token. Revogar sessão: invalide o refresh token no banco.',
          },
        ],
        exercise: {
          title: 'Implementar CORS e autenticação seguros',
          description: 'Implemente verificarSegurancaAuth(config) que avalia uma configuração de autenticação e CORS, identificando vulnerabilidades e calculando uma pontuação de segurança de 0 a 100.',
          starterCode: `function verificarSegurancaAuth(config) {
  /*
  config = {
    cors: {
      origem: "*" | "https://meusite.com" | ["lista"],
      credentials: true | false,
    },
    jwt: {
      armazenamento: "localStorage" | "cookie" | "memoria",
      expiracaoMinutos: 15 | 1440,
      cookieHttpOnly: true | false,
      cookieSecure: true | false,
      cookieSameSite: "strict" | "lax" | "none",
    },
    https: true | false,
    csrfProtecao: true | false,
  }
  */
  
  const vulnerabilidades = [];
  const avisos = [];
  let pontuacao = 100;
  
  // CORS
  if (config.cors.origem === "*" && config.cors.credentials) {
    vulnerabilidades.push("CORS: Access-Control-Allow-Origin: * com credentials não funciona e é inseguro");
    pontuacao -= 20;
  }
  if (config.cors.origem === "*") {
    avisos.push("CORS aberto para qualquer origem — restrinja para origens conhecidas em produção");
    pontuacao -= 10;
  }
  
  // JWT armazenamento
  if (config.jwt.armazenamento === "localStorage") {
    vulnerabilidades.push("JWT em localStorage: vulnerável a XSS — qualquer script lê o token");
    pontuacao -= 25;
  }
  
  // Cookie httpOnly
  if (config.jwt.armazenamento === "cookie" && !config.jwt.cookieHttpOnly) {
    vulnerabilidades.push("Cookie sem httpOnly: JavaScript pode ler o token — vulnerável a XSS");
    pontuacao -= 20;
  }
  
  // Implemente as outras verificações:
  // - Cookie sem Secure em produção (HTTPS requerido)
  // - SameSite none sem proteção CSRF
  // - Expiração muito longa (> 24h para access token)
  // - HTTP sem HTTPS
  
  const nivel = pontuacao >= 90 ? "Excelente" :
                pontuacao >= 70 ? "Bom" :
                pontuacao >= 50 ? "Médio" :
                pontuacao >= 30 ? "Ruim" : "Crítico";
  
  return { pontuacao: Math.max(0, pontuacao), nivel, vulnerabilidades, avisos };
}

// Testes
const configInsegura = {
  cors: { origem: "*", credentials: true },
  jwt: { armazenamento: "localStorage", expiracaoMinutos: 1440, cookieHttpOnly: false, cookieSecure: false, cookieSameSite: "none" },
  https: false,
  csrfProtecao: false,
};

const configSegura = {
  cors: { origem: "https://meusite.com", credentials: true },
  jwt: { armazenamento: "cookie", expiracaoMinutos: 15, cookieHttpOnly: true, cookieSecure: true, cookieSameSite: "strict" },
  https: true,
  csrfProtecao: true,
};

const r1 = verificarSegurancaAuth(configInsegura);
console.log(\`Insegura: \${r1.pontuacao}/100 (\${r1.nivel}) — \${r1.vulnerabilidades.length} vulnerabilidades\`);

const r2 = verificarSegurancaAuth(configSegura);
console.log(\`Segura:   \${r2.pontuacao}/100 (\${r2.nivel}) — \${r2.vulnerabilidades.length} vulnerabilidades\`);
`,
          solutionHint: 'https: false → pontuacao -= 20, vulnerabilidades.push | expiracaoMinutos > 60 para access token → avisos.push | sameSite: "none" sem csrfProtecao → vulnerabilidades.push',
          validate: (output, code) => {
            const inseguraMatch = output.match(/Insegura: (\d+)\/100/);
            const seguraMatch   = output.match(/Segura:\s+(\d+)\/100/);
            if (!inseguraMatch || !seguraMatch) return false;
            const insegura = parseInt(inseguraMatch[1]);
            const segura   = parseInt(seguraMatch[1]);
            return insegura < 50 && segura >= 70;
          },
          validateMessage: 'Config insegura deve ter pontuação < 50 e config segura >= 70.',
        },
        quiz: [
          {
            question: 'Por que o browser bloqueia requests cross-origin por padrão?',
            options: [
              'Para melhorar performance',
              'Same-Origin Policy protege usuários — impede que site malicioso leia dados de outro site usando sessão do usuário',
              'Para economizar bandwidth',
              'É uma limitação técnica do HTTP',
            ],
            correct: 1,
            explanation: 'Sem SOP: um site malicioso poderia fazer fetch para sua conta bancária e ler o saldo (você está logado, cookie é enviado automaticamente). SOP garante que apenas código da mesma origem pode ler responses.',
          },
          {
            question: 'Por que "Access-Control-Allow-Origin: *" não funciona com credentials?',
            options: [
              'É um bug do browser',
              'Por design de segurança — cookies enviados para * seriam vazados para qualquer site malicioso que fizesse um request',
              'Limitação de performance',
              'Apenas em HTTP/2',
            ],
            correct: 1,
            explanation: 'Se * + credentials fossem permitidos, qualquer site poderia fazer requests autenticados usando seu cookie. Browsers forçam: para credenciais, você deve especificar a origem exata — não "*".',
          },
          {
            question: 'O que é um ataque CSRF?',
            options: [
              'Injeção de script malicioso',
              'Site malicioso induz o browser do usuário logado a fazer request não autorizado — browser envia cookie automaticamente',
              'Interceptação de tráfego HTTPS',
              'Brute force de senha',
            ],
            correct: 1,
            explanation: 'CSRF: você está logado em banco.com. Visita site-malicioso.com que tem <img src="banco.com/transferir?para=atacante&valor=1000">. Seu browser faz o GET e envia o cookie de sessão automaticamente. SameSite=Strict previne isso.',
          },
          {
            question: 'Qual a vantagem de armazenar JWT em memória JavaScript em vez de localStorage?',
            options: [
              'Mais rápido de acessar',
              'XSS não persiste entre page loads — atacante precisaria de XSS ativo quando o token está na memória',
              'Funciona offline',
              'Não expira automaticamente',
            ],
            correct: 1,
            explanation: 'Token em memória (variável JS): ao fechar a aba, some. XSS precisaria ser executado enquanto a aba está aberta e o token em memória. localStorage persiste para sempre — XSS pode exfiltrar depois. Desvantagem: F5 perde a sessão (resolvido com refresh token em cookie httpOnly).',
          },
          {
            question: 'Por que usar access token de curta duração (15min) + refresh token de longa duração (7d)?',
            options: [
              'Por convenção apenas',
              'Access token comprometido expira em 15min. Refresh token em cookie httpOnly não é acessível por XSS e pode ser revogado individualmente no banco',
              'Para reduzir carga no servidor',
              'Porque JWT não pode ser mais longo',
            ],
            correct: 1,
            explanation: 'Access token: curto porque não pode ser revogado (stateless). Se roubado, dura pouco. Refresh token: longa duração mas armazenado de forma segura (httpOnly) e pode ser invalidado no banco (logout, suspeita de comprometimento).',
          },
        ],
      },
    },
  {
    id: 'mp-phase-10',
    title: '🛠️ Mini-Projeto: Analisador de Requisicoes HTTP',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase15,
    content: {
      sections: [{ type: 'text', content: 'Construa algo real aplicando o que aprendeu nesta fase.' }]
    }
  }  ],
};
