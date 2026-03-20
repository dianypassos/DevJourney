import { miniProjectPhase16 } from '../miniprojects.js';
export const phase16 = {
  id: 'phase-16',
  title: 'Design de Sistemas',
  phase: 16,
  color: '#ec4899',
  icon: '🏗️',
  description: 'Como projetar sistemas que escalam para milhões de usuários. Load balancers, cache, filas, microsserviços e os trade-offs que separam arquitetos de desenvolvedores — o tema central de entrevistas sênior.',
  checklist: [
    'Estimar requisitos de sistema (usuários, storage, QPS)',
    'Explicar a diferença entre escalar vertical e horizontalmente',
    'Desenhar um sistema com load balancer e múltiplas instâncias',
    'Escolher entre cache read-through e cache-aside corretamente',
    'Explicar trade-offs de consistência vs disponibilidade (CAP theorem)',
    'Projetar um sistema de mensageria com filas (pub/sub)',
    'Identificar single points of failure em uma arquitetura',
  ],
  modules: [
    {
      id: 'mod-16-1',
      title: 'Fundamentos: Escalabilidade e Trade-offs',
      duration: '50 min',
      xp: 240,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Design de sistemas não é sobre a solução perfeita — é sobre trade-offs conscientes. Todo sistema é uma série de decisões onde você ganha algo e perde outra coisa. Um engenheiro sênior sabe articular exatamente o que está trocando em cada decisão. Antes de aprender as peças (load balancers, cache, filas), é preciso entender a linguagem que descreve os trade-offs entre elas.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── ESCALABILIDADE VERTICAL vs HORIZONTAL ────────────\n\n// Vertical (Scale Up): servidor maior\n// + Simples: sem mudança de código\n// + Sem problemas de rede entre instâncias\n// - Limite físico: não existe hardware infinito\n// - Single point of failure: um servidor, um ponto de falha\n// - Custo exponencial: 2x CPU pode custar 4x mais\n// Quando usar: banco de dados (mais fácil de escalar vertical que horizontal)\n\n// Horizontal (Scale Out): mais servidores\n// + Sem limite teórico: adicione servidores conforme necessário\n// + Alta disponibilidade: um servidor cai, outros continuam\n// + Custo linear: 2x servidores = 2x custo\n// - Complexidade: load balancer, sessões distribuídas, dados distribuídos\n// - Latência de rede entre instâncias\n// Quando usar: servidores de aplicação stateless\n\n// ── LATÊNCIA vs THROUGHPUT ────────────────────────────\n// Latência: tempo para completar UMA operação\n//   Ex: uma query leva 50ms\n// Throughput: quantas operações por unidade de tempo\n//   Ex: servidor processa 1.000 req/s\n\n// São independentes — você pode ter:\n// Alta latência + alto throughput: batch processing (cada job demora, mas muitos rodam)\n// Baixa latência + baixo throughput: um único servidor pequeno respondendo rápido\n// Idealmente: baixa latência E alto throughput (precisa de design cuidadoso)\n\nconst exemplos = {\n  "Cache Redis":    { latencia: "< 1ms",  throughput: "100k+ ops/s" },\n  "PostgreSQL":     { latencia: "1-10ms", throughput: "10k+ queries/s" },\n  "API Node.js":    { latencia: "10-50ms",throughput: "10k+ req/s" },\n  "Escrita em HDD": { latencia: "10ms",   throughput: "200 MB/s" },\n  "Escrita em SSD": { latencia: "0.1ms",  throughput: "3000 MB/s" },\n};\nconsole.log("Ordem de grandeza importa:", exemplos);',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── TEOREMA CAP ──────────────────────────────────────\n// Em um sistema distribuído, você só pode garantir 2 dos 3:\n//\n// C — Consistency (Consistência)\n//     Todo nó vê os mesmos dados ao mesmo tempo\n//     Ler sempre retorna o dado mais recente\n//\n// A — Availability (Disponibilidade)\n//     Todo request recebe uma resposta (não necessariamente mais recente)\n//     Sistema continua operando mesmo com falhas\n//\n// P — Partition Tolerance (Tolerância a Partição)\n//     Sistema continua funcionando mesmo com perda de mensagens entre nós\n//     Em redes reais, partições SEMPRE podem acontecer → P é obrigatório\n//\n// Na prática: escolha entre CP ou AP\n\nconst exemplosBancos = {\n  "PostgreSQL (single node)": {\n    tipo: "CA",\n    trade: "Sem partição — só funciona com 1 nó ou rede confiável",\n  },\n  "MongoDB (com replica set)": {\n    tipo: "CP por padrão",\n    trade: "Priorizá consistência: operações falham durante partição de rede",\n  },\n  "DynamoDB (eventual consistency)": {\n    tipo: "AP",\n    trade: "Sempre disponível, mas pode retornar dado ligeiramente desatualizado",\n  },\n  "Cassandra": {\n    tipo: "AP",\n    trade: "Tunable: você escolhe nível de consistência por operação",\n  },\n};\n\n// Consistência eventual: dado propagado com delay, mas eventualmente consistente\n// Ex: Instagram — você posta uma foto, seu seguidor em outro continente\n//     pode levar alguns segundos para ver. Isso é aceitável.\n// Ex: saldo bancário — não é aceitável. Precisa de consistência forte.\n\nconsole.log("CAP: em redes reais, P sempre acontece. Escolha C ou A.");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── SLA, SLO e SLI ──────────────────────────────────\n// A linguagem que times de engenharia usam para definir confiabilidade\n\n// SLI (Service Level Indicator): métrica que você mede\n//   Ex: "99.2% das requisições retornam em < 200ms"\n//   Ex: "taxa de erros 5xx: 0.1%"\n//   Ex: "uptime: 99.95%"\n\n// SLO (Service Level Objective): meta interna para o SLI\n//   Ex: "99% das requisições devem completar em < 300ms"\n//   É mais rigoroso que o SLA — buffer de segurança\n\n// SLA (Service Level Agreement): contrato com o cliente\n//   Ex: AWS S3 garante 99.99% de durabilidade\n//   Violação = crédito monetário para o cliente\n\n// Nines de disponibilidade:\nconst disponibilidade = [\n  { nivel: "99%",     downtime_ano: "3.65 dias",   downtime_mes: "7.2h"    },\n  { nivel: "99.9%",   downtime_ano: "8.77 horas",  downtime_mes: "43.8min" },\n  { nivel: "99.99%",  downtime_ano: "52.6 minutos",downtime_mes: "4.4min"  },\n  { nivel: "99.999%", downtime_ano: "5.26 minutos",downtime_mes: "26.3s"   },\n];\n\ndisponibilidade.forEach(d => {\n  console.log(`${d.nivel}: ${d.downtime_ano}/ano (${d.downtime_mes}/mês)`);\n});\n\n// Error Budget: quanto downtime resta no período\n// SLO = 99.9% → Error budget = 0.1% × 720h/mês = 43.8min/mês\n// Se você já usou 40min este mês, cuidado com deploys arriscados!',
          },
          {
            type: 'highlight',
            content: '🧭 Princípio de design: comece simples, escale conforme necessário. Um monolito com PostgreSQL e Redis aguenta muito mais do que você imagina — provavelmente até 1-5 milhões de usuários com boa otimização. Microsserviços e sistemas distribuídos têm overhead real de complexidade operacional. "Prematurely distributed is the root of all evil."',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── STATELESS vs STATEFUL ────────────────────────────\n\n// Stateful: servidor guarda estado da sessão em memória\n// Problema: se você tem 3 servidores, usuário DEVE ir sempre ao mesmo\n//           Load balancer precisa de "sticky sessions"\nconst svrStateful = {\n  sessoes: new Map(),  // dados na memória do servidor\n  handleRequest: (userId) => {\n    return svrStateful.sessoes.get(userId); // só funciona no servidor correto\n  },\n};\n\n// Stateless: servidor não guarda estado — tudo no cliente ou banco\n// + Qualquer servidor pode atender qualquer request\n// + Escala horizontalmente sem complicações\n// + Servidor pode reiniciar sem perda de dado do usuário\nconst svrStateless = {\n  handleRequest: async (jwtToken) => {\n    const userId = verificarJWT(jwtToken);  // estado no token\n    return await redis.get(`session:${userId}`); // estado externo (Redis)\n  },\n};\n\n// ── REGRA PRÁTICA ─────────────────────────────────────\n// Servidores de aplicação: SEMPRE stateless\n// Estado vai para: banco de dados, Redis, ou cliente (JWT/cookie)\n// Isso permite escala horizontal sem sticky sessions\n\nconsole.log("Stateless = qualquer servidor atende qualquer request = escala livre");\n\n// Back-of-the-envelope estimation (estimativas rápidas em entrevistas)\nconst estimativas = {\n  "Twitter-scale DAU":  "300M usuários/dia",\n  "Tweets por segundo": "6000 tweets/s (pico: 150k)",\n  "1 tweet (texto)":    "280 bytes",\n  "1 foto comprimida":  "~300 KB",\n  "1 vídeo 1min HD":    "~50 MB",\n  "Memória Redis 1M chaves": "~100 MB (com overhead)",\n  "PostgreSQL 1M rows simples": "~100 MB em disco",\n};\nconsole.log(estimativas);',
          },
        ],
        exercise: {
          title: 'Calcular requisitos de sistema',
          description: 'Implemente calcularRequisitos(sistema) que estima os requisitos de infraestrutura baseado nos parâmetros de uso. Use back-of-the-envelope estimation: calcule QPS (queries por segundo), armazenamento necessário em 5 anos, e bandwidth necessária.',
                    solutionHint: 'QPS = usuarios_ativos / periodo_segundos. Storage = eventos_por_dia * tamanho_medio * dias_retencao. Bandwidth = QPS * tamanho_resposta_medio.',
starterCode: `function calcularRequisitos(sistema) {
  /*
  sistema = {
    nome: "TikTok Clone",
    usuariosDiarios: 10_000_000,   // DAU
    videosEnviadosDia: 1_000_000,  // uploads por dia
    visualizacoesPorVideo: 100,    // views médias por video
    tamanhoVideoMB: 50,            // tamanho médio
    retencionAnos: 5,              // quanto tempo guardar
    percentualLeitura: 95,         // % reads vs writes
  }
  */
  
  const segundosDia = 86_400;
  const bytesPorMB = 1_048_576;
  const bytesPorGB = bytesPorMB * 1024;
  const bytesPorTB = bytesPorGB * 1024;
  
  // QPS total de leituras
  const totalVisualizacoesDia = sistema.videosEnviadosDia * sistema.visualizacoesPorVideo;
  const qpsLeitura = Math.round(totalVisualizacoesDia / segundosDia);
  const qpsEscrita = Math.round(sistema.videosEnviadosDia / segundosDia);
  const qpsPico    = qpsLeitura * 3; // regra geral: pico = 3x médio
  
  // Armazenamento em 5 anos
  const videosTotal = sistema.videosEnviadosDia * 365 * sistema.retencionAnos;
  const armazTotalTB = (videosTotal * sistema.tamanhoVideoMB * bytesPorMB) / bytesPorTB;
  const armazComReplicasTB = armazTotalTB * 3; // 3 réplicas para durabilidade
  
  // Bandwidth de upload e download
  const uploadMBs    = (sistema.videosEnviadosDia * sistema.tamanhoVideoMB) / segundosDia;
  const downloadMBs  = (totalVisualizacoesDia * sistema.tamanhoVideoMB) / segundosDia;
  
  return {
    qpsLeituraMedia:  qpsLeitura,
    qpsEscritaMedia:  qpsEscrita,
    qpsPicoEstimado:  qpsPico,
    armazTotalTB:     Math.round(armazTotalTB),
    armazComReplicasTB: Math.round(armazComReplicasTB),
    uploadMBs:        Math.round(uploadMBs),
    downloadMBs:      Math.round(downloadMBs),
    recomendacoes: [
      qpsLeitura > 10_000  ? "CDN obrigatório para servir vídeos" : "CDN recomendado",
      armazTotalTB > 1000  ? "Object storage distribuído (S3-like)" : "Storage local viável",
      qpsPico > 50_000     ? "Cache agressivo + múltiplas regiões" : "Cache simples suficiente",
    ],
  };
}

const tiktokClone = {
  nome: "TikTok Clone",
  usuariosDiarios: 10_000_000,
  videosEnviadosDia: 1_000_000,
  visualizacoesPorVideo: 100,
  tamanhoVideoMB: 50,
  retencionAnos: 5,
  percentualLeitura: 95,
};

const req = calcularRequisitos(tiktokClone);
console.log("QPS leitura:", req.qpsLeituraMedia.toLocaleString());
console.log("QPS escrita:", req.qpsEscritaMedia.toLocaleString());
console.log("QPS pico estimado:", req.qpsPicoEstimado.toLocaleString());
console.log("Armazenamento 5 anos:", req.armazTotalTB, "TB");
console.log("Com 3 réplicas:", req.armazComReplicasTB, "TB");
console.log("Download bandwidth:", req.downloadMBs, "MB/s");
req.recomendacoes.forEach(r => console.log("→", r));
`,
          solutionHint: 'totalVisualizacoesDia = videosEnviadosDia × visualizacoesPorVideo | qpsLeitura = totalVisualizacoesDia / 86400 | armazTB = (videos × tamanhoMB × bytes) / bytesPorTB',
          validate: (output, code) => {
            return output.includes('QPS leitura:') &&
              output.includes('QPS escrita:') &&
              output.includes('Armazenamento 5 anos:') &&
              output.includes('→');
          },
          validateMessage: 'Calcule QPS de leitura e escrita, armazenamento total e mostre recomendações.',
        },
        quiz: [
          {
            question: 'Qual a principal vantagem de escalabilidade horizontal sobre vertical?',
            options: [
              'É sempre mais barata',
              'Sem limite físico e sem single point of failure — adicione servidores conforme demanda',
              'É mais simples de implementar',
              'Resolve problemas de latência',
            ],
            correct: 1,
            explanation: 'Vertical tem teto (maior servidor do mundo ainda tem limite) e SPOF (cai, tudo cai). Horizontal: N servidores = N vezes o throughput, e um servidor caindo não derruba o sistema.',
          },
          {
            question: 'No teorema CAP, por que P (Partition Tolerance) é obrigatório em sistemas reais?',
            options: [
              'Porque é a mais importante',
              'Partições de rede acontecem inevitavelmente em sistemas distribuídos — você não pode ignorá-las',
              'Por requisito legal',
              'Porque C e A são opostos',
            ],
            correct: 1,
            explanation: 'Redes não são confiáveis. Cabos cortam, roteadores travam, datacenters perdem conectividade. Se seu sistema não tolera partições, ele simplesmente para quando a rede falha. A escolha real é entre C e A durante uma partição.',
          },
          {
            question: 'O que é consistência eventual?',
            options: [
              'Dados nunca são consistentes',
              'Dados ficam inconsistentes temporariamente entre nós, mas convergem para o mesmo valor após algum tempo',
              'Apenas leituras são consistentes',
              'Consistência garantida após 1 segundo',
            ],
            correct: 1,
            explanation: 'Eventual consistency: você escreve no nó A, o nó B pode retornar o valor antigo por alguns milissegundos/segundos, mas eventualmente propaga. Aceitável para: likes, views, feeds. Inaceitável para: saldos, estoque.',
          },
          {
            question: 'Por que servidores de aplicação devem ser stateless?',
            options: [
              'Por segurança',
              'Qualquer instância pode atender qualquer request — escala horizontal livre, sem sticky sessions',
              'Stateless é mais rápido',
              'Reduz uso de memória',
            ],
            correct: 1,
            explanation: 'Servidor stateful: usuário DEVE ir ao mesmo servidor (sticky session). Se ele reinicia, dados perdidos. Stateless: JWT no cliente, sessão no Redis externo. Load balancer distribui livremente. Servidor reinicia sem impacto.',
          },
          {
            question: 'O que é um Error Budget?',
            options: [
              'Orçamento para corrigir bugs',
              'Quantidade de downtime permitida no período antes de violar o SLO — usado para decidir se é seguro fazer deploys arriscados',
              'Número máximo de erros 500 permitidos',
              'Tempo máximo de resposta',
            ],
            correct: 1,
            explanation: 'SLO 99.9% → error budget = 0.1% = 43.8min/mês. Se você já usou 40min em deploys com problemas, tem apenas 3.8min restantes. Times usam isso para decidir: "não é hora de fazer mudanças arriscadas."',
          },
        ],
      },
    },
    {
      id: 'mod-16-2',
      title: 'Load Balancers e Alta Disponibilidade',
      duration: '50 min',
      xp: 230,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Load balancer é o primeiro componente que aparece em qualquer diagrama de sistema com mais de um servidor. Ele distribui tráfego, esconde falhas e possibilita deploys sem downtime. Entender como funciona — e os algoritmos de distribuição — é a base para projetar sistemas disponíveis.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── ALGORITMOS DE LOAD BALANCING ────────────────────\n\n// Round Robin: distribui em sequência circular\n// + Simples, distribuição uniforme para requests idênticos\n// - Ignora diferença de capacidade entre servidores\nclass RoundRobin {\n  #servidores; #atual = 0;\n  constructor(servidores) { this.#servidores = servidores; }\n  proximo() {\n    const svr = this.#servidores[this.#atual];\n    this.#atual = (this.#atual + 1) % this.#servidores.length;\n    return svr;\n  }\n}\n\n// Weighted Round Robin: servidores mais potentes recebem mais\n// Ex: servidor A (4 CPUs) recebe 2x mais que servidor B (2 CPUs)\nclass WeightedRoundRobin {\n  #pool;\n  constructor(servidores) {\n    // Expande: [{svr: "A", peso: 3}, {svr: "B", peso: 1}]\n    // vira:    ["A", "A", "A", "B"]\n    this.#pool = servidores.flatMap(s => Array(s.peso).fill(s.svr));\n    this.#idx  = 0;\n  }\n  proximo() { return this.#pool[this.#idx++ % this.#pool.length]; }\n}\n\n// Least Connections: vai para o servidor com menos conexões ativas\n// + Melhor para requests com duração variável (uploads longos)\n// - Precisa rastrear estado de cada servidor\nclass LeastConnections {\n  #servidores;\n  constructor(servidores) {\n    this.#servidores = servidores.map(s => ({ ...s, conexoes: 0 }));\n  }\n  proximo() {\n    const svr = this.#servidores.reduce((a, b) => a.conexoes <= b.conexoes ? a : b);\n    svr.conexoes++;\n    return svr;\n  }\n  liberar(svr) { svr.conexoes = Math.max(0, svr.conexoes - 1); }\n}\n\n// IP Hash: mesmo IP sempre vai ao mesmo servidor\n// + "Sticky session" sem cookie — consistência por cliente\n// - Distribuição desigual se muitos clientes têm mesmo IP (NAT)\nconst ipHash = (ip, n) => ip.split(".").reduce((acc, oct) => acc + parseInt(oct), 0) % n;\nconsole.log("IP 192.168.1.1 → servidor:", ipHash("192.168.1.1", 3));',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── L4 vs L7 LOAD BALANCER ───────────────────────────\n\n// L4 (Camada de Transporte — TCP/UDP)\n// Opera em nível de conexão TCP\n// + Ultra rápido: não inspeciona conteúdo\n// + Menor latência e overhead\n// - Não entende HTTP: não pode rotear por URL, header ou cookie\n// Exemplos: AWS NLB, HAProxy em modo TCP\n// Usar quando: streaming, jogos, banco de dados\n\n// L7 (Camada de Aplicação — HTTP/HTTPS)\n// Inspeciona e roteia baseado em conteúdo HTTP\n// + Roteamento por URL: /api/* → servidores de API, /static/* → CDN\n// + Roteamento por header: Mobile-App: true → cluster mobile\n// + SSL termination: decifra TLS uma vez, HTTP internamente\n// + Health checks inteligentes (verifica /health endpoint)\n// + Rate limiting, autenticação, compressão\n// - Ligeiramente mais lento que L4\n// Exemplos: AWS ALB, Nginx, Envoy\n// Usar quando: aplicações web e APIs (a maioria dos casos)\n\nconst nginxConfig = `\n# L7 LB com roteamento por path\nupstream api_servers {\n    least_conn;  # algoritmo: least connections\n    server api1:3000 weight=3;  # 3x mais tráfego\n    server api2:3000 weight=1;\n    server api3:3000 backup;    # só usa se os outros caírem\n\n    keepalive 32;  # pool de conexões persistentes\n}\n\nserver {\n    listen 80;\n    location /api/ { proxy_pass http://api_servers; }\n    location /static/ { proxy_pass http://cdn_servers; }\n}\n`;\nconsole.log("Nginx como L7 LB com roteamento por path");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── ALTA DISPONIBILIDADE: PADRÕES ───────────────────\n\n// ACTIVE-ACTIVE: múltiplos nós ativos, todos recebem tráfego\n//   + Melhor uso de recursos (todos trabalham)\n//   + Failover instantâneo (outros já estão ativos)\n//   - Mais complexo: sincronização de estado entre nós\n//   Uso: servidores web stateless, APIs\n\n// ACTIVE-PASSIVE: um nó ativo, outro(s) em standby\n//   + Simples: passivo não processa, só monitora\n//   - Subutilização: passivo desperdiça recursos\n//   - Failover tem latência (passivo precisa "acordar")\n//   Uso: banco de dados primário, sistemas críticos que não escalam facilmente\n\n// DEPLOY SEM DOWNTIME com Load Balancer:\n// 1. Blue-Green: dois ambientes idênticos, troca o LB\nconst blueGreen = {\n  blue:  { versao: "v1.0", ativo: false },\n  green: { versao: "v2.0", ativo: true  },\n  trocar() {\n    [this.blue.ativo, this.green.ativo] = [this.green.ativo, this.blue.ativo];\n    console.log("Tráfego agora vai para:", this.blue.ativo ? "blue (v1.0)" : "green (v2.0)");\n  },\n};\n\n// 2. Rolling Update: atualiza instâncias uma por uma\n// LB retira instância → atualiza → verifica saúde → reinsere → próxima\n\n// 3. Canary Release: envia % do tráfego para nova versão\n// 5% → nova versão | 95% → versão atual\n// Monitora métricas | Se ok, aumenta gradualmente\nconst canary = { percentualNovo: 5, percentualAtual: 95 };\nconsole.log("Canary: 5% tráfego para nova versão, monitore métricas");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── HEALTH CHECKS: COMO O LB DETECTA FALHAS ─────────\n\n// Sem health check: LB continua enviando tráfego para servidor caído\n// Com health check: LB remove servidor doente automaticamente\n\n// Express: rota /health\nconst healthCheck = async (req, res) => {\n  const checks = {\n    uptime: process.uptime(),\n    timestamp: Date.now(),\n    memoria: process.memoryUsage(),\n  };\n\n  // Verifica dependências críticas\n  try {\n    await db.query("SELECT 1");        // banco responde?\n    checks.database = "healthy";\n  } catch {\n    checks.database = "unhealthy";\n    return res.status(503).json({ status: "unhealthy", checks });\n  }\n\n  try {\n    await redis.ping();                // redis responde?\n    checks.cache = "healthy";\n  } catch {\n    checks.cache = "degraded";        // degradado, não fatal\n  }\n\n  res.json({ status: "healthy", checks });\n};\n\n// Configuração no docker-compose\n// healthcheck:\n//   test: ["CMD", "wget", "--spider", "http://localhost:3000/health"]\n//   interval: 10s   # verifica a cada 10s\n//   timeout: 5s     # falha se não responder em 5s\n//   retries: 3      # tenta 3x antes de marcar como unhealthy\n//   start_period: 30s  # aguarda 30s para dar tempo de iniciar\n\nconsole.log("Health check expõe estado real do serviço, não só se o processo existe");',
          },
          {
            type: 'highlight',
            content: '⚡ Circuit Breaker: padrão crítico para sistemas distribuídos. Quando o serviço B está falhando muito, o serviço A "abre o circuito" e para de tentar — retorna erro imediato em vez de esperar timeout. Após um período, testa novamente. Evita que falha em cascata derrube todo o sistema. Implementação: Netflix Hystrix, Resilience4j, ou manualmente com contagem de erros.',
          },
        ,
                  {
                    type: 'common_error',
                    title: 'Escalar verticalmente (scale up) antes de tentar escalar horizontalmente',
                    wrong: `// Abordagem scale-up: máquina cada vez maior
// Servidor atual: 8 cores, 32GB RAM — lento
// Solução tentada:
//   → 32 cores, 128GB RAM  (+$$$)
//   → 64 cores, 256GB RAM  (++$$$)
//   → Limite físico atingido
//   → Single point of failure!`,
                    wrongLabel: 'Scale-up tem limite físico, custo exponencial e cria ponto único de falha.',
                    right: `// Abordagem scale-out: múltiplas instâncias menores
// Servidor atual: 1x 8 cores — lento
// Solução:
//   → 3x 4 cores atrás de um load balancer
//   → 10x 2 cores (mais barato, sem SPOF)
//   → Auto-scaling: sobe/desce conforme demanda
//   → Se um cai, os outros absorvem`,
                    rightLabel: 'Scale-out: mais instâncias pequenas atrás de load balancer — resiliente e barato.',
                    explanation: 'Scale-up é fácil de implementar mas tem teto físico e cria Single Point of Failure. Scale-out é mais complexo (precisa de estado distribuído, sessões, etc.) mas é ilimitado, mais barato e resiliente a falhas. A maioria dos sistemas maduros usa scale-out.',
                  }],
        exercise: {
          title: 'Implementar load balancer com health check',
          description: 'Implemente LoadBalancer com algoritmos round-robin e least-connections, health check periódico que remove servidores doentes, e métricas de distribuição.',
                    solutionHint: 'Round-robin: distribui sequencialmente entre instâncias saudáveis. Health check: remove instâncias com falha do pool. Sticky session para estado de sessão.',
starterCode: `class LoadBalancer {
  #servidores;
  #algoritmo;
  #rrIndex = 0;
  #metricas = { totalRequests: 0, porServidor: {} };

  constructor(servidores, algoritmo = "round-robin") {
    this.#algoritmo = algoritmo;
    this.#servidores = servidores.map(s => ({
      ...s,
      conexoesAtivas: 0,
      saudavel: true,
      errosConsecutivos: 0,
    }));
    this.#servidores.forEach(s => {
      this.#metricas.porServidor[s.id] = 0;
    });
  }

  // Retorna o próximo servidor saudável baseado no algoritmo
  proximoServidor() {
    const saudaveis = this.#servidores.filter(s => s.saudavel);
    if (saudaveis.length === 0) throw new Error("Nenhum servidor disponível");

    let escolhido;
    if (this.#algoritmo === "round-robin") {
      escolhido = saudaveis[this.#rrIndex % saudaveis.length];
      this.#rrIndex++;
    } else if (this.#algoritmo === "least-connections") {
      escolhido = saudaveis.reduce((a, b) =>
        a.conexoesAtivas <= b.conexoesAtivas ? a : b
      );
    }

    escolhido.conexoesAtivas++;
    this.#metricas.totalRequests++;
    this.#metricas.porServidor[escolhido.id]++;
    return escolhido;
  }

  // Libera conexão após request completar
  liberarConexao(servidor) {
    servidor.conexoesAtivas = Math.max(0, servidor.conexoesAtivas - 1);
  }

  // Simula health check: chama fn de verificação para cada servidor
  async verificarSaude(fnHealthCheck) {
    for (const svr of this.#servidores) {
      try {
        const saudavel = await fnHealthCheck(svr);
        if (saudavel) {
          svr.errosConsecutivos = 0;
          svr.saudavel = true;
        } else {
          svr.errosConsecutivos++;
          if (svr.errosConsecutivos >= 3) svr.saudavel = false;
        }
      } catch {
        svr.errosConsecutivos++;
        if (svr.errosConsecutivos >= 3) svr.saudavel = false;
      }
    }
  }

  // Retorna métricas de distribuição
  obterMetricas() {
    const total = this.#metricas.totalRequests;
    const distribuicao = {};
    for (const [id, count] of Object.entries(this.#metricas.porServidor)) {
      distribuicao[id] = {
        requests: count,
        percentual: total > 0 ? ((count / total) * 100).toFixed(1) + "%" : "0%",
      };
    }
    return { total, distribuicao, saudaveis: this.#servidores.filter(s => s.saudavel).length };
  }
}

// Teste
async function main() {
  const lb = new LoadBalancer(
    [{ id: "svr-1" }, { id: "svr-2" }, { id: "svr-3" }],
    "round-robin"
  );

  // Simula 9 requests
  for (let i = 0; i < 9; i++) {
    const svr = lb.proximoServidor();
    lb.liberarConexao(svr);
  }

  const metricas = lb.obterMetricas();
  console.log("Total requests:", metricas.total);
  console.log("Servidores saudáveis:", metricas.saudaveis);
  Object.entries(metricas.distribuicao).forEach(([id, m]) => {
    console.log(\`  \${id}: \${m.requests} requests (\${m.percentual})\`);
  });

  // Simula servidor doente
  let checkCount = 0;
  await lb.verificarSaude(async (svr) => {
    checkCount++;
    return svr.id !== "svr-2"; // svr-2 "falha"
  });
  // Verifica 3 vezes para acumular erros
  await lb.verificarSaude(async (svr) => svr.id !== "svr-2");
  await lb.verificarSaude(async (svr) => svr.id !== "svr-2");

  const metricasApos = lb.obterMetricas();
  console.log("Após falha do svr-2, saudáveis:", metricasApos.saudaveis);
}

main();
`,
          solutionHint: 'O código já está estruturado. Implemente a lógica de algoritmos no proximoServidor() e verifique os resultados do health check.',
          validate: (output, code) => {
            return output.includes('Total requests: 9') &&
              output.includes('Servidores saudáveis: 3') &&
              output.includes('33.3%') &&
              output.includes('Após falha do svr-2, saudáveis: 2');
          },
          validateMessage: 'Mostre 9 requests distribuídos em 33.3% cada, e 2 saudáveis após falha.',
        },
        quiz: [
          {
            question: 'Quando usar Least Connections em vez de Round Robin?',
            options: [
              'Sempre — é mais eficiente',
              'Quando requests têm duração variável — evita sobrecarregar um servidor com muitas conexões longas',
              'Para requests mais rápidas',
              'Quando os servidores têm capacidades diferentes',
            ],
            correct: 1,
            explanation: 'Round Robin assume que todos os requests têm a mesma duração — falso para uploads, queries pesadas, WebSockets. Least Connections envia ao servidor com menos trabalho atual, independente de quanto tempo cada trabalho leva.',
          },
          {
            question: 'Qual a vantagem do Blue-Green deployment sobre Rolling Update?',
            options: [
              'Blue-Green é mais barato',
              'Rollback instantâneo: basta trocar o LB de volta para o ambiente anterior sem re-deploy',
              'Blue-Green não requer downtime',
              'Blue-Green usa menos servidores',
            ],
            correct: 1,
            explanation: 'Blue-Green: dois ambientes completos. Rollback = mudar o LB de green de volta para blue — segundos. Rolling: cada instância atualizada uma a uma. Rollback = re-deploiar toda a versão anterior — minutos. Desvantagem do Blue-Green: custo dobrado de infraestrutura.',
          },
          {
            question: 'O que é SSL Termination no load balancer?',
            options: [
              'Cancelar conexões SSL antigas',
              'LB decifra TLS uma vez e passa HTTP simples aos servidores internos — reduz overhead criptográfico dos servidores',
              'Certificado compartilhado entre servidores',
              'Renovação automática de certificados',
            ],
            correct: 1,
            explanation: 'Sem SSL termination: cada servidor precisa decifrar TLS (CPU intensivo). Com: LB decifra uma vez, tráfego interno é HTTP — mais simples e rápido. Seguro porque a rede interna (VPC) é confiável. Certificado fica apenas no LB.',
          },
          {
            question: 'O que é Circuit Breaker em sistemas distribuídos?',
            options: [
              'Mecanismo que desliga o servidor quando sobrecarregado',
              'Padrão que para de chamar um serviço falhando — retorna erro imediato em vez de esperar timeout — prevenindo cascata de falhas',
              'Proteção contra DDoS',
              'Alternativa ao load balancer',
            ],
            correct: 1,
            explanation: 'Sem circuit breaker: serviço A chama B que está lento (30s timeout), threads ficam bloqueadas, A também fica lento, C que chama A também trava — cascata. Com circuit breaker: após N falhas, A retorna erro imediato, preserva threads, sistema se recupera mais rápido.',
          },
          {
            question: 'Por que o health check deve verificar dependências (banco, cache) e não só o processo?',
            options: [
              'Por convenção',
              'Processo pode estar rodando mas inutilizável — sem banco, requests falham de qualquer forma',
              'Para logging mais detalhado',
              'É necessário para HTTPS',
            ],
            correct: 1,
            explanation: 'LB remove servidores "doentes". Se o processo está up mas o banco está inacessível, o servidor vai falhar em toda request — mas o LB não vai remover se só verificar o processo. Health check deve simular o que o usuário vai fazer.',
          },
        ],
      },
    },
    {
      id: 'mod-16-3',
      title: 'Cache: Estratégias e Padrões',
      duration: '50 min',
      xp: 240,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Cache aparece em toda entrevista de system design porque é a otimização de maior impacto com menor esforço. Um dado que leva 50ms para buscar no banco leva 0.1ms no Redis — 500x mais rápido. Mas cache traz complexidade: invalidação, consistência e falhas em cascata (cache stampede). Saber quando e como usar é habilidade crítica.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── ONDE COLOCAR CACHE (camadas) ─────────────────────\n//\n// Usuário\n//   → Browser Cache (Cache-Control, ETag)\n//      → CDN Cache (Cloudflare, CloudFront)\n//         → LB Cache (Nginx)\n//            → Aplicação Local (in-process, Map/LRU)\n//               → Cache Distribuído (Redis, Memcached)\n//                  → Banco de Dados (query cache, índices)\n//                     → Disco (OS page cache)\n\n// Cada camada tem latência menor e capacidade menor\n// Browser: 0ms (local), CDN: <5ms, Redis: <1ms, Banco: 5-50ms\n\n// ── ESTRATÉGIAS DE CACHE ──────────────────────────────\n\n// 1. CACHE-ASIDE (Lazy Loading) — o mais comum\n// App verifica cache primeiro; se miss, busca do banco e popula\nasync function getUsuario(id) {\n  const chave = `usuario:${id}`;\n  const cached = await redis.get(chave);\n  if (cached) return JSON.parse(cached);      // cache HIT\n\n  const usuario = await db.findById(id);      // cache MISS\n  await redis.setex(chave, 3600, JSON.stringify(usuario));\n  return usuario;\n}\n\n// + Resiliente: se cache cair, app vai ao banco diretamente\n// + Popula só o que é usado\n// - Dados podem ficar desatualizados (stale) até o TTL expirar\n// - 3 viagens na primeira request (miss + banco + set)\n\n// 2. WRITE-THROUGH — escreve no cache E no banco juntos\nasync function salvarUsuario(usuario) {\n  await db.save(usuario);\n  await redis.setex(`usuario:${usuario.id}`, 3600, JSON.stringify(usuario));\n  // Cache sempre atualizado, mas escrever em dois lugares tem custo\n}\n// + Cache sempre consistente com o banco\n// - Escrita mais lenta (espera banco E cache)\n// - Cache tem dados que podem nunca ser lidos (write-heavy workload)\n\nconsole.log("Cache-Aside: padrão para a maioria dos casos de leitura");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// 3. WRITE-BEHIND (Write-Back) — escreve no cache, banco depois\nasync function salvarPedidoRapido(pedido) {\n  await redis.setex(`pedido:${pedido.id}`, 60, JSON.stringify(pedido));\n  await filaEscrita.enqueue(pedido);   // banco atualizado de forma assíncrona\n  return { sucesso: true };             // responde imediatamente!\n}\n// + Escritas ultra rápidas (só cache)\n// - Risco de perda de dados se cache cair antes de persistir\n// Usar em: contadores de views, sessões temporárias, dados de alta velocidade\n\n// 4. READ-THROUGH — cache fica na frente do banco, app não sabe\n// Cache busca do banco automaticamente quando miss\n// App só fala com o cache (como um ORM transparente)\n// Implementado em: Redis (com scripts Lua), AWS ElastiCache\n\n// ── EVICTION POLICIES ─────────────────────────────────\n// O que remover quando o cache está cheio\n\n// LRU (Least Recently Used) — padrão Redis\n// Remove o dado menos usado RECENTEMENTE\n// Ótimo para: objetos acessados com frequência têm mais chance de ficar\nconst lruCache = {\n  // Linked list + Map para O(1) em get e put\n  capacidade: 3,\n  // A cada GET, move para o topo. A cada SET cheio, remove do fundo.\n};\n\n// LFU (Least Frequently Used)\n// Remove o dado menos FREQUENTEMENTE usado (contador de acessos)\n// Melhor que LRU para workloads com picos temporários\n\n// FIFO: primeiro a entrar, primeiro a sair\n// TTL: remove automaticamente após expirar (Redis default)\n\n// Random: remove aleatoriamente (simples, razoável na prática)\n\nconsole.log("LRU é adequado para 90% dos casos. Configure maxmemory no Redis.");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── CACHE STAMPEDE (Thundering Herd) ─────────────────\n// Problema: cache expira → 10.000 requests simultâneos → todos vão ao banco\n// Banco fica sobrecarregado → requests lentos → mais timeout → mais retry\n\n// Solução 1: Mutex Lock — apenas uma requisição busca do banco\nasync function getComLock(chave, fnBuscar) {\n  const cached = await redis.get(chave);\n  if (cached) return JSON.parse(cached);\n\n  const lockChave = `lock:${chave}`;\n  const lockId = crypto.randomUUID();\n\n  // Tenta adquirir lock (NX = só seta se não existir)\n  const adquiriu = await redis.set(lockChave, lockId, "NX", "EX", 10);\n\n  if (adquiriu) {\n    // Este request busca do banco\n    const dados = await fnBuscar();\n    await redis.setex(chave, 3600, JSON.stringify(dados));\n    await redis.del(lockChave);\n    return dados;\n  } else {\n    // Outros requests esperam\n    await new Promise(r => setTimeout(r, 100));\n    return getComLock(chave, fnBuscar); // tenta de novo\n  }\n}\n\n// Solução 2: Probabilistic Early Expiration\n// Alguns requests re-calculam ligeiramente antes de expirar\n// Distribui a recarga ao longo do tempo\nfunction deveRecarregar(expiracaoMs, betaFator = 1) {\n  const tempoRestante = expiracaoMs - Date.now();\n  const threshold = betaFator * Math.log(Math.random()) * -1 * 1000;\n  return tempoRestante < threshold;\n}\n\n// Solução 3: Stale-While-Revalidate\n// Retorna dado expirado imediatamente, atualiza em background\nconst cacheItem = { dados: null, expira: 0, atualizando: false };\nasync function getStaleWhileRevalidate(fnBuscar) {\n  if (cacheItem.dados && !cacheItem.atualizando) {\n    if (Date.now() > cacheItem.expira) {\n      cacheItem.atualizando = true;\n      fnBuscar().then(d => {\n        cacheItem.dados = d;\n        cacheItem.expira = Date.now() + 3600_000;\n        cacheItem.atualizando = false;\n      });\n    }\n    return cacheItem.dados; // retorna stale imediatamente!\n  }\n  cacheItem.dados = await fnBuscar();\n  cacheItem.expira = Date.now() + 3600_000;\n  return cacheItem.dados;\n}',
          },
          {
            type: 'highlight',
            content: '🗑️ "There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton. Invalidação de cache é difícil porque você precisa saber quando o dado subjacente mudou. Estratégia pragmática: TTL curto o suficiente para não incomodar o usuário + invalidação explícita nas escritas. TTL de 5-60 minutos resolve 90% dos casos.',
          },
        ],
        exercise: {
          title: 'Implementar LRU Cache',
          description: 'Implemente LRUCache(capacidade) com get(chave) e put(chave, valor) em O(1). Use Map (mantém ordem de inserção no JS) para simular a lista ligada do LRU. Quando cheio, remova o menos recentemente usado.',
                    solutionHint: 'Map preserva ordem de inserção. Ao acessar: delete e re-insert (move para o final). Ao inserir além da capacidade: delete o primeiro (Map.keys().next().value).',
starterCode: `class LRUCache {
  #capacidade;
  #cache; // Map mantém ordem de inserção — usaremos isso para LRU

  constructor(capacidade) {
    this.#capacidade = capacidade;
    this.#cache = new Map();
  }

  get(chave) {
    if (!this.#cache.has(chave)) return -1;

    // Move para o fim (mais recentemente usado)
    // Delete + re-insert move para o final do Map
    const valor = this.#cache.get(chave);
    this.#cache.delete(chave);
    this.#cache.set(chave, valor);
    return valor;
  }

  put(chave, valor) {
    if (this.#cache.has(chave)) {
      this.#cache.delete(chave);
    } else if (this.#cache.size >= this.#capacidade) {
      // Remove o menos recentemente usado (primeiro do Map)
      const primeiraChave = this.#cache.keys().next().value;
      this.#cache.delete(primeiraChave);
    }
    this.#cache.set(chave, valor);
  }

  get tamanho() { return this.#cache.size; }

  // Retorna estado atual (mais recente por último)
  estado() { return [...this.#cache.entries()]; }
}

// Testes
const cache = new LRUCache(3);

cache.put("a", 1);
cache.put("b", 2);
cache.put("c", 3);
console.log("Estado inicial:", cache.estado().map(([k,v]) => k).join(","));
// a,b,c

cache.get("a"); // acessa "a" → move para o fim
console.log("Após get(a):", cache.estado().map(([k,v]) => k).join(","));
// b,c,a

cache.put("d", 4); // capacidade cheia, remove "b" (LRU)
console.log("Após put(d) — b removido:", cache.estado().map(([k,v]) => k).join(","));
// c,a,d

console.log("get(b):", cache.get("b")); // -1, foi removido
console.log("get(a):", cache.get("a")); // 1, ainda existe
console.log("Tamanho:", cache.tamanho); // 3
`,
          solutionHint: 'Map em JS mantém ordem de inserção. Delete + re-insert move para o final. keys().next().value é o primeiro (menos recente).',
          validate: (output, code) => {
            return output.includes('Estado inicial: a,b,c') &&
              output.includes('Após get(a): b,c,a') &&
              output.includes('c,a,d') &&
              output.includes('get(b): -1') &&
              output.includes('get(a): 1') &&
              output.includes('Tamanho: 3');
          },
          validateMessage: 'LRU deve evitar "b", retornar -1 para get(b), 1 para get(a), tamanho 3.',
        },
        quiz: [
          {
            question: 'Qual a diferença entre Cache-Aside e Write-Through?',
            options: [
              'São equivalentes',
              'Cache-Aside: app gerencia o cache manualmente (lazy). Write-Through: toda escrita atualiza cache E banco sincronamente',
              'Write-Through é para leituras',
              'Cache-Aside é mais consistente',
            ],
            correct: 1,
            explanation: 'Cache-Aside popula no miss de leitura — cache pode ter dados stale. Write-Through atualiza cache na escrita — sempre consistente mas escritas mais lentas (espera banco + cache).',
          },
          {
            question: 'O que é cache stampede?',
            options: [
              'Cache com muitos dados',
              'Múltiplos requests simultâneos tentando popular o mesmo cache após expiração — sobrecarregam o banco',
              'Cache com TTL muito curto',
              'Cache fora de sincronia com o banco',
            ],
            correct: 1,
            explanation: 'Cache expira → 10.000 threads leem ao mesmo tempo → todas vão ao banco (cache miss) → banco sobrecarregado → cascade failure. Soluções: mutex lock (só um recalcula), stale-while-revalidate, ou probabilistic early expiration.',
          },
          {
            question: 'Quando usar Write-Behind (Write-Back) cache?',
            options: [
              'Para dados críticos como pagamentos',
              'Para operações de alta frequência onde pequena perda de dados é aceitável — contadores, analytics',
              'Para dados que mudam raramente',
              'Para banco de dados SQL',
            ],
            correct: 1,
            explanation: 'Write-Behind escreve só no cache e persiste no banco de forma assíncrona — muito rápido, mas se o cache cair antes de persistir, dados perdidos. Ideal para: contadores de visualizações, logs de analytics, onde perder algumas entradas é aceitável.',
          },
          {
            question: 'Por que LRU é a política de eviction padrão para a maioria dos caches?',
            options: [
              'É a mais simples de implementar',
              'Reflete o princípio de localidade temporal: dados acessados recentemente têm alta probabilidade de serem acessados novamente em breve',
              'Usa menos memória',
              'É mais rápida que LFU',
            ],
            correct: 1,
            explanation: 'Princípio de localidade: programas tendem a acessar os mesmos dados que acessaram recentemente. LRU aproveita isso mantendo os dados "quentes" no cache. Funciona bem para workloads típicos de aplicações web.',
          },
          {
            question: 'O que é stale-while-revalidate?',
            options: [
              'Deletar cache expirado imediatamente',
              'Retornar dado possivelmente expirado imediatamente + atualizar em background — latência sempre baixa',
              'Invalidar cache ao escrever no banco',
              'Cache com TTL variável',
            ],
            correct: 1,
            explanation: 'Stale-while-revalidate: retorna o dado que tem (mesmo expirado) imediatamente ao usuário — zero latência extra. Em background, busca a versão atualizada para a próxima request. Troca: usuário pode ver dado ligeiramente desatualizado. Válido para: preços, feeds, dashboards.',
          },
        ],
      },
    },
    {
      id: 'mod-16-4',
      title: 'Banco de Dados: Escalando e Escolhendo',
      duration: '50 min',
      xp: 240,
      content: {
        sections: [
          {
            type: 'text',
            content: 'O banco de dados é o gargalo mais comum em sistemas que crescem. Escalar leituras é relativamente simples (réplicas). Escalar escritas é difícil (sharding). Saber quando cada técnica se aplica — e seus trade-offs — é o que diferencia quem projeta sistemas de quem apenas os usa.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── REPLICAÇÃO ────────────────────────────────────────\n// Cópias do banco em múltiplos servidores\n\n// MASTER-SLAVE (Primary-Replica)\n// Escritas → apenas o master\n// Leituras → réplicas (qualquer uma)\n// Replicação: assíncrona (lag) ou síncrona (mais lenta)\n//\n//  [App]──writes──▶[Master]──replicação assíncrona──▶[Réplica 1]\n//        ──reads──▶[Réplica 1]                       ▶[Réplica 2]\n//        ──reads──▶[Réplica 2]\n\nconst dbConfig = {\n  write: { host: "master.db.internal", pool: 5  },\n  read:  [\n    { host: "replica1.db.internal", pool: 20 },\n    { host: "replica2.db.internal", pool: 20 },\n  ],\n};\n\n// Round-robin entre réplicas para leituras\nlet replicaIndex = 0;\nconst getReplicaConnection = () => {\n  const replica = dbConfig.read[replicaIndex % dbConfig.read.length];\n  replicaIndex++;\n  return replica;\n};\n\n// IMPORTANTE: Replication Lag\n// Escrita no master → propagação assíncrona → réplica pode ter lag de ms a segundos\n// Se usuário escreve e lê imediatamente → pode não ver sua própria escrita!\n// Solução: read-your-own-writes — envie leituras pós-escrita ao master por 1-2s\n\n// MASTER-MASTER\n// Qualquer nó aceita escritas\n// + Alta disponibilidade para escritas\n// - Conflitos de escrita simultânea são complexos de resolver\n// Usar para: sistemas geo-distribuídos (Write local, replica global)\nconsole.log("Regra: escrita → master. Leitura → réplica.");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── SHARDING (Particionamento Horizontal) ────────────\n// Divide os dados entre múltiplos servidores de banco\n// Cada shard tem um subconjunto dos dados\n// Necessário quando: banco não cabe em um servidor + escala vertical esgotada\n\n// 1. RANGE SHARDING\n// Shard 1: IDs 1 - 1.000.000\n// Shard 2: IDs 1.000.001 - 2.000.000\n// Shard 3: IDs 2.000.001+\n// + Consultas de intervalo eficientes\n// - Hot spots: usuários recentes vão todos ao shard mais novo\nconst rangeShard = (userId, shardSize = 1_000_000) => {\n  return Math.floor(userId / shardSize);\n};\n\n// 2. HASH SHARDING\n// shard = hash(user_id) % num_shards\n// + Distribuição uniforme dos dados\n// - Consultas de intervalo ineficientes (dados espalhados)\n// - Resharding difícil: mudar num_shards requer migrar quase todos os dados\nconst hashShard = (userId, numShards) => userId % numShards;\nconsole.log("User 12345 → Shard:", hashShard(12345, 4)); // 1\nconsole.log("User 99999 → Shard:", hashShard(99999, 4)); // 3\n\n// 3. CONSISTENT HASHING — solução para resharding\n// Adicionar/remover shards redistribui apenas ~1/N dos dados\n// Usado por: Cassandra, DynamoDB, Redis Cluster\nclass ConsistentHash {\n  #anel = new Map();\n  #replicas = 3; // virtualNodes\n\n  adicionarNo(no) {\n    for (let i = 0; i < this.#replicas; i++) {\n      const hash = this.#hash(`${no}:${i}`);\n      this.#anel.set(hash, no);\n    }\n  }\n\n  getNo(chave) {\n    if (this.#anel.size === 0) return null;\n    const hash = this.#hash(chave);\n    const hashesOrdenados = [...this.#anel.keys()].sort((a, b) => a - b);\n    // Encontra o primeiro nó no sentido horário\n    const idx = hashesOrdenados.find(h => h >= hash) ?? hashesOrdenados[0];\n    return this.#anel.get(idx);\n  }\n\n  #hash(str) {\n    return [...str].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0) >>> 0;\n  }\n}\n\nconst ch = new ConsistentHash();\n["shard-1","shard-2","shard-3"].forEach(n => ch.adicionarNo(n));\nconsole.log("user:42 →", ch.getNo("user:42"));\nconsole.log("post:99 →", ch.getNo("post:99"));',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── SQL vs NoSQL: A DECISÃO REAL ─────────────────────\n\n// ❌ Mito: "NoSQL é mais escalável que SQL"\n// Realidade: PostgreSQL com sharding escala tanto quanto MongoDB\n//            A escolha é sobre modelo de dados, não sobre escala\n\n// Use SQL (PostgreSQL) quando:\n// ✅ Dados têm relações complexas (users, orders, products, reviews)\n// ✅ Precisa de transações ACID entre tabelas\n// ✅ Queries analíticas complexas (JOINs, agregações)\n// ✅ Schema estável e bem definido\n// ✅ Qualquer dúvida — PostgreSQL funciona para 90% dos casos\n\n// Use NoSQL quando existe necessidade REAL:\n// MongoDB/DynamoDB → documentos com schema muito variável\n//   Ex: catálogo com tipos radicalmente diferentes de produtos\n//   Não use: quando você faz $lookup (JOIN) frequentemente\n// Redis → cache, sessões, filas, leaderboards, dados em memória\n// Cassandra → writes de alta velocidade, séries temporais, geo-distribuído\n//   Ex: IoT com 1M de eventos/segundo, logs de alto volume\n//   Não use: se precisar de queries flexíveis ou JOINs\n// Elasticsearch → busca full-text, queries complexas de texto\n//   Não use como banco principal — use para busca, sincronizado com SQL\n\n// ── CONNECTION POOLING ────────────────────────────────\n// Cada conexão ao banco custa ~5MB e tempo de handshake\n// Pool reutiliza conexões entre requests\nconst poolConfig = {\n  max: 20,          // máximo de conexões simultâneas\n  idleTimeoutMillis: 30_000,  // remove conexão ociosa após 30s\n  connectionTimeoutMillis: 2_000,  // timeout se não conseguir conexão\n};\n// Regra: pool size ≈ (núcleos CPU do banco × 2) + discos spindles\n// Para banco com 4 CPUs: pool de ~10-20 conexões por servidor de app\nconsole.log("Pool evita overhead de handshake por request");',
          },
          {
            type: 'highlight',
            content: '📊 Database per Service: em microsserviços, cada serviço tem seu próprio banco — sem compartilhamento. Vantagem: serviços independentes, escalam separadamente, podem usar bancos diferentes. Desvantagem: queries que antes eram um JOIN agora precisam de duas chamadas de API e join na aplicação. Isso é um trade-off consciente — não uma melhoria automática.',
          },
        ],
        exercise: {
          title: 'Simular sharding com consistent hashing',
          description: 'Complete a classe ShardManager que usa consistent hashing para distribuir usuários entre shards, suporta adição de novo shard (com mínimo de redistribuição), e retorna estatísticas de distribuição.',
          starterCode: `class ShardManager {\n  #shards = new Map();   // id → { no, dados: Map }\n  #anel  = [];           // [{hash, shardId}] ordenado\n\n  constructor(numShards) {\n    for (let i = 0; i < numShards; i++) {\n      this.adicionarShard(\`shard-\${i}\`);\n    }\n  }\n\n  #hash(chave) {\n    return [...String(chave)].reduce(\n      (h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0\n    ) >>> 0;\n  }\n\n  adicionarShard(id) {\n    const virtualNodes = 3;\n    const novoShard = { id, dados: new Map() };\n    this.#shards.set(id, novoShard);\n\n    for (let v = 0; v < virtualNodes; v++) {\n      const hash = this.#hash(\`\${id}:vnode\${v}\`);\n      this.#anel.push({ hash, shardId: id });\n    }\n    this.#anel.sort((a, b) => a.hash - b.hash);\n  }\n\n  getShardId(chave) {\n    if (this.#anel.length === 0) return null;\n    const hash = this.#hash(chave);\n    // Encontra o primeiro nó no anel ≥ hash (clockwise)\n    const no = this.#anel.find(n => n.hash >= hash) ?? this.#anel[0];\n    return no.shardId;\n  }\n\n  set(chave, valor) {\n    const shardId = this.getShardId(chave);\n    this.#shards.get(shardId).dados.set(chave, valor);\n  }\n\n  get(chave) {\n    const shardId = this.getShardId(chave);\n    return this.#shards.get(shardId)?.dados.get(chave);\n  }\n\n  estatisticas() {\n    const stats = {};\n    for (const [id, shard] of this.#shards) {\n      stats[id] = shard.dados.size;\n    }\n    const total    = Object.values(stats).reduce((a, b) => a + b, 0);\n    const max      = Math.max(...Object.values(stats));\n    const min      = Math.min(...Object.values(stats));\n    const desbalanceamento = total > 0\n      ? (((max - min) / (total / this.#shards.size)) * 100).toFixed(1) + "%"\n      : "0%";\n    return { distribuicao: stats, total, desbalanceamento };\n  }\n}\n\n// Testes\nconst sm = new ShardManager(3);\n\n// Insere 300 usuários\nfor (let i = 1; i <= 300; i++) {\n  sm.set(\`user:\${i}\`, { id: i, nome: \`User \${i}\` });\n}\n\nconst stats = sm.estatisticas();\nconsole.log("Distribuição:", JSON.stringify(stats.distribuicao));\nconsole.log("Total:", stats.total);\nconsole.log("Desbalanceamento:", stats.desbalanceamento);\n\n// Verifica recuperação de dados\nconsole.log("Recuperar user:42:", sm.get("user:42")?.id);\nconsole.log("Recuperar user:200:", sm.get("user:200")?.id);\n`,
          solutionHint: 'O código já está completo. Execute e verifique que: todos os 300 usuários são distribuídos, o desbalanceamento é < 50%, e a recuperação retorna os IDs corretos.',
          validate: (output, code) => {
            return output.includes('Total: 300') &&
              output.includes('Recuperar user:42: 42') &&
              output.includes('Recuperar user:200: 200');
          },
          validateMessage: 'Total deve ser 300, user:42 deve retornar id 42, user:200 deve retornar id 200.',
        },
        quiz: [
          {
            question: 'O que é replication lag e como causa problemas?',
            options: [
              'Lentidão na criação de índices',
              'Delay entre escrita no master e propagação para réplicas — usuário pode não ver sua própria escrita ao ler de réplica',
              'Timeout de conexão ao banco',
              'Cache desatualizado',
            ],
            correct: 1,
            explanation: 'Usuário faz POST (escrita no master) e imediatamente GET (lido de réplica com lag) — vê estado anterior. Solução: read-your-own-writes (leia do master por 1-2s após escrever) ou sticky reads (sempre mesma réplica para o usuário).',
          },
          {
            question: 'Por que consistent hashing é melhor que hash simples para sharding?',
            options: [
              'Consistent hashing é mais rápido',
              'Ao adicionar/remover um shard, apenas ~1/N dos dados precisam ser redistribuídos em vez de quase todos',
              'Consistent hashing não tem hot spots',
              'Consistent hashing funciona sem configuração',
            ],
            correct: 1,
            explanation: 'Hash simples (id % N shards): mudar de 4 para 5 shards redistribui ~80% dos dados. Consistent hashing: adicionar 1 shard move apenas ~1/5 dos dados — o shard novo "rouba" dados apenas dos seus vizinhos no anel.',
          },
          {
            question: 'Quando o pattern "Database per Service" em microsserviços é vantajoso?',
            options: [
              'Sempre — é melhor que banco compartilhado',
              'Quando serviços têm necessidades de dados muito diferentes e independência de deploy é prioritária',
              'Quando há poucos serviços',
              'Para simplificar queries',
            ],
            correct: 1,
            explanation: 'Database per service: cada serviço é dono de seus dados e pode evoluir o schema independentemente. Preço: JOINs entre serviços viram chamadas de API — mais complexidade na aplicação. Compensador quando a independência de deploy justifica o custo.',
          },
          {
            question: 'Qual o problema principal do range sharding?',
            options: [
              'Não funciona com SQL',
              'Hot spots: dados recentes (IDs maiores) vão todos para o mesmo shard — distribuição desigual',
              'Não suporta shards adicionais',
              'Queries de intervalo são lentas',
            ],
            correct: 1,
            explanation: 'Range sharding por timestamp/ID: todos os novos dados vão para o último shard. Esse shard fica sobrecarregado enquanto os outros ficam ociosos. Hash sharding distribui uniformemente, mas perde eficiência em range queries.',
          },
          {
            question: 'O que é connection pooling e por que é essencial?',
            options: [
              'Backup de conexões do banco',
              'Reutilização de conexões TCP ao banco — cada handshake custa tempo e memória, pool evita criar/destruir para cada request',
              'Balanceamento de carga entre bancos',
              'Replicação de conexões',
            ],
            correct: 1,
            explanation: 'Abrir conexão ao PostgreSQL: ~5ms + ~5MB memória. Com 1000 req/s sem pool: 1000 conexões novas/s — impossível. Com pool de 20 conexões: as 20 são reutilizadas. Requests esperam vez na fila em vez de abrir nova conexão.',
          },
        ],
      },
    },
    {
      id: 'mod-16-5',
      title: 'Filas de Mensagens e Processamento Assíncrono',
      duration: '50 min',
      xp: 240,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Filas de mensagens resolvem dois problemas fundamentais: desacoplamento (serviço A não precisa saber que B existe) e absorção de picos (fila guarda trabalho enquanto workers processam no ritmo deles). São o componente que transforma operações síncronas bloqueantes em fluxos assíncronos escaláveis.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── MESSAGE QUEUE vs PUB/SUB ─────────────────────────\n\n// MESSAGE QUEUE (Point-to-Point)\n// Produtor envia mensagem → Fila → UM consumidor processa\n// Mensagem é deletada após processamento\n// Ex: fila de emails a enviar, jobs de processamento de imagem\n//\n// [Produtor] ──push──▶ [Fila] ──pull──▶ [Consumer 1]\n//                               └──────▶ [Consumer 2]  (apenas um)\n\n// PUB/SUB (Publish-Subscribe)\n// Publisher envia para um tópico → TODOS os subscribers recebem\n// Usado para broadcast de eventos\n// Ex: "pedido criado" → notifica estoque, email, analytics, ERP\n//\n// [Publisher] ──▶ [Tópico: pedido-criado]\n//                 ├──▶ [Subscriber: Estoque]\n//                 ├──▶ [Subscriber: Email]\n//                 └──▶ [Subscriber: Analytics]\n\n// ── CASOS DE USO ──────────────────────────────────────\nconst casosDeUso = {\n  messageQueue: [\n    "Envio de emails (um worker por email)",\n    "Processamento de imagens/vídeos (pesado, assíncrono)",\n    "Pagamentos (um processamento por transação)",\n    "Jobs de exportação de relatórios",\n  ],\n  pubSub: [\n    "Evento de pedido criado → múltiplos serviços reagem",\n    "Notificações push para múltiplos dispositivos",\n    "Sincronização de cache distribuído",\n    "Audit log (todos os eventos vão para o log service)",\n  ],\n};\n\nconsole.log("Queue: trabalho que um worker faz.");\nconsole.log("PubSub: evento que múltiplos sistemas precisam saber.");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── KAFKA vs RABBITMQ vs SQS ─────────────────────────\n\n// KAFKA — Log distribuído de eventos\n// Mensagens persistidas no disco (por dias/semanas)\n// Consumidores mantêm seu próprio "cursor" (offset) — podem reler\n// Altíssimo throughput: 1M+ msgs/s\n// Não deleta após consumo → múltiplos grupos de consumidores independentes\n// Complexo de operar, mas insuperável para alto volume\n// Usar para: event sourcing, stream processing, auditoria, dados de analytics\n\n// RABBITMQ — Message Broker tradicional\n// Protocolo AMQP, rico em funcionalidades de roteamento\n// Exchanges: direct, fanout, topic, headers\n// Dead Letter Queues nativas\n// Mais fácil de operar que Kafka\n// Usar para: task queues, workflows complexos, menor escala\n\n// AWS SQS / AZURE Service Bus / Google Pub/Sub\n// Managed service: sem infraestrutura para gerenciar\n// Usar para: integração em cloud, sem querer gerenciar servidores\n\n// ── GARANTIAS DE ENTREGA ──────────────────────────────\n// AT MOST ONCE: melhor esforço — pode perder mensagens\n//   Usar: métricas de uso, eventos não críticos\n// AT LEAST ONCE: entrega garantida, mas pode duplicar\n//   Consumidor deve ser IDEMPOTENTE (mesmo resultado se receber 2x)\n//   Usar: a maioria dos casos — proteja com idempotency key\n// EXACTLY ONCE: entrega exatamente uma vez — muito caro, raro\n//   Usar: pagamentos, operações financeiras críticas\n\n// Idempotência para at-least-once:\nasync function processarPedido(mensagem) {\n  const { pedidoId, idempotencyKey } = mensagem;\n  // Verifica se já processou (Redis ou banco)\n  if (await redis.get(`processado:${idempotencyKey}`)) {\n    console.log("Mensagem duplicada ignorada:", idempotencyKey);\n    return;\n  }\n  await processarNegocio(pedidoId);\n  await redis.setex(`processado:${idempotencyKey}`, 86400, "1");\n}\nconsole.log("Idempotência: processar 2x = mesmo efeito que processar 1x");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── DEAD LETTER QUEUE (DLQ) ──────────────────────────\n// Mensagens que falharam N vezes → movidas para DLQ\n// Permite análise de falhas sem bloquear a fila principal\n\nasync function processarComDLQ(mensagem, fila, filaErros) {\n  const MAX_TENTATIVAS = 3;\n\n  if (mensagem.tentativas >= MAX_TENTATIVAS) {\n    console.error("Movendo para DLQ:", mensagem.id);\n    await filaErros.enqueue({\n      mensagemOriginal: mensagem,\n      motivo: mensagem.ultimoErro,\n      dataFalha: new Date(),\n    });\n    return;\n  }\n\n  try {\n    await processarNegocio(mensagem);\n    await fila.ack(mensagem); // confirma processamento\n  } catch (erro) {\n    mensagem.tentativas = (mensagem.tentativas || 0) + 1;\n    mensagem.ultimoErro = erro.message;\n    const backoff = Math.pow(2, mensagem.tentativas) * 1000; // 2s, 4s, 8s\n    await fila.nack(mensagem, { delay: backoff }); // recoloca com delay\n    console.log(`Tentativa ${mensagem.tentativas} falhou, retry em ${backoff}ms`);\n  }\n}\n\n// ── PADRÕES AVANÇADOS ─────────────────────────────────\n\n// SAGA: transações distribuídas via mensagens\n// Cada serviço faz sua parte e publica evento\n// Se falhar: eventos de compensação desfazem o trabalho anterior\n// Ex: criar pedido → reservar estoque → cobrar cartão → enviar email\n//     Se cobrar falhar: publicar "estoque-liberado", "pedido-cancelado"\n\n// OUTBOX PATTERN: garante at-least-once sem 2 fases\n// Em vez de chamar a fila diretamente (pode falhar entre BD e fila):\n// 1. Salva mensagem na tabela "outbox" na mesma transação do BD\n// 2. Worker lê a outbox e publica na fila\n// Garante que se o BD commitou, a mensagem SERÁ publicada\n\nconsole.log("Outbox + Saga = transações distribuídas sem 2PC");',
          },
          {
            type: 'highlight',
            content: '🔄 Quando usar filas: processamento longo (encoding de vídeo, envio de emails em massa), picos de carga (Black Friday: fila absorve spike, workers processam no ritmo), desacoplamento (order-service não precisa conhecer email-service), e retry automático com backoff. Quando NÃO usar: quando você precisa da resposta imediatamente (login, busca, checkout em tempo real).',
          },
        ],
        exercise: {
          title: 'Implementar sistema de filas com dead letter queue',
          description: 'Implemente FilaMensagens com enqueue, dequeue, ack/nack, retry com backoff exponencial e DLQ automático após 3 falhas.',
          starterCode: `class FilaMensagens {
  #fila = [];
  #dlq  = [];
  #processando = new Map(); // id → { mensagem, timeout }

  enqueue(payload) {
    const msg = {
      id: crypto.randomUUID(),
      payload,
      tentativas: 0,
      criadaEm: Date.now(),
    };
    this.#fila.push(msg);
    return msg.id;
  }

  dequeue() {
    return this.#fila.shift() ?? null;
  }

  // Confirma processamento bem-sucedido
  ack(mensagemId) {
    this.#processando.delete(mensagemId);
  }

  // Rejeita: recoloca na fila com backoff ou manda para DLQ
  nack(mensagem, maxTentativas = 3) {
    this.#processando.delete(mensagem.id);
    mensagem.tentativas++;

    if (mensagem.tentativas >= maxTentativas) {
      this.#dlq.push({ ...mensagem, falhouEm: Date.now() });
      return { destino: "dlq", tentativas: mensagem.tentativas };
    }

    // Backoff exponencial: 1s, 2s, 4s
    const delayMs = Math.pow(2, mensagem.tentativas - 1) * 1000;
    // Em produção, usaria setTimeout. Aqui apenas registramos o delay.
    mensagem.proximaTentativaEm = Date.now() + delayMs;
    this.#fila.push(mensagem);
    return { destino: "fila", delay: delayMs, tentativas: mensagem.tentativas };
  }

  get tamanhoFila() { return this.#fila.length; }
  get tamanhoDLQ()  { return this.#dlq.length;  }
  get dlq()         { return [...this.#dlq];     }
}

// Testes
const fila = new FilaMensagens();

// Produz 3 mensagens
["email:ana@dev.com", "email:bruno@dev.com", "email:carlos@dev.com"]
  .forEach(p => fila.enqueue(p));

console.log("Fila inicial:", fila.tamanhoFila);

// Processa com falha simulada
async function processarMensagens() {
  // Mensagem 1: sucesso
  let msg = fila.dequeue();
  console.log("Processando:", msg.payload);
  fila.ack(msg.id);
  console.log("Ack — sucesso");

  // Mensagem 2: falha 3x → vai para DLQ
  msg = fila.dequeue();
  console.log("Processando (vai falhar):", msg.payload);
  let resultado;
  resultado = fila.nack(msg);
  console.log(\`Nack 1 → \${resultado.destino} (delay: \${resultado.delay}ms)\`);

  msg = fila.dequeue(); // retorna da fila (mesma msg com tentativa++)
  resultado = fila.nack(msg);
  console.log(\`Nack 2 → \${resultado.destino}\`);

  msg = fila.dequeue();
  resultado = fila.nack(msg);
  console.log(\`Nack 3 → \${resultado.destino}\`);

  // Mensagem 3: sucesso
  msg = fila.dequeue();
  fila.ack(msg.id);

  console.log("\\nFila restante:", fila.tamanhoFila);
  console.log("DLQ:", fila.tamanhoDLQ);
  console.log("Mensagem na DLQ:", fila.dlq[0]?.payload);
}

processarMensagens();
`,
          solutionHint: 'O código já está implementado. Execute e verifique que após 3 nacks a mensagem vai para DLQ.',
          validate: (output, code) => {
            return output.includes('Nack 1 → fila') &&
              output.includes('Nack 3 → dlq') &&
              output.includes('DLQ: 1') &&
              output.includes('email:bruno@dev.com');
          },
          validateMessage: 'Nack 1 deve ir para fila, Nack 3 para DLQ, DLQ deve ter 1 mensagem.',
        },
        quiz: [
          {
            question: 'Qual a diferença entre Message Queue e Pub/Sub?',
            options: [
              'São a mesma coisa',
              'Queue: um consumidor processa cada mensagem. Pub/Sub: todos os subscribers recebem cada mensagem',
              'Queue é mais rápida',
              'Pub/Sub não persiste mensagens',
            ],
            correct: 1,
            explanation: 'Queue (point-to-point): tarefa vai para exatamente um worker. Ideal para: jobs. Pub/Sub (broadcast): evento vai para todos os interessados. Ideal para: "pedido criado" → estoque, email, analytics reagem independentemente.',
          },
          {
            question: 'O que significa "at-least-once delivery"?',
            options: [
              'A mensagem pode ser perdida',
              'A mensagem é entregue pelo menos uma vez, possivelmente duplicada — consumidor deve ser idempotente',
              'A mensagem é entregue exatamente uma vez',
              'A mensagem expira após uma tentativa',
            ],
            correct: 1,
            explanation: 'At-least-once: a fila garante que você vai receber, mas pode receber duas vezes (se o ack falhar após processamento). Solução: consumidor usa idempotency key para ignorar duplicatas com segurança.',
          },
          {
            question: 'O que é Dead Letter Queue (DLQ)?',
            options: [
              'Fila de alta prioridade',
              'Fila que recebe mensagens que falharam N vezes — permite análise sem bloquear a fila principal',
              'Fila para mensagens expiradas',
              'Backup da fila principal',
            ],
            correct: 1,
            explanation: 'Sem DLQ: mensagem que nunca processa fica travando a fila. Com DLQ: após 3 tentativas, vai para DLQ. Equipe analisa por que falhou, corrige o código e re-processa manualmente.',
          },
          {
            question: 'Qual a vantagem do Outbox Pattern?',
            options: [
              'Mensagens mais rápidas',
              'Garante que evento é publicado se e somente se a transação do banco commitou — sem risco de inconsistência',
              'Simplifica o código',
              'Elimina a necessidade de fila',
            ],
            correct: 1,
            explanation: 'Problema: salvar no banco (sucesso) + publicar na fila (falha) = estado inconsistente. Outbox: salva evento na tabela "outbox" na mesma transação. Worker lê outbox e publica na fila. Se banco commitou, evento SERÁ publicado.',
          },
          {
            question: 'Quando Kafka é preferível ao RabbitMQ?',
            options: [
              'Sempre — Kafka é mais moderno',
              'Kafka é melhor para alto volume (1M+ msgs/s), replay de eventos e múltiplos grupos de consumidores independentes',
              'Kafka é mais fácil de configurar',
              'Para mensagens prioritárias',
            ],
            correct: 1,
            explanation: 'Kafka: log persistente, consumidores controlam seu offset, mensagens não são deletadas — podem ser relidas. RabbitMQ: mensagem deletada após ack, roteamento mais rico. Kafka brilha em: event sourcing, stream processing, analytics em tempo real.',
          },
        ],
      },
    },
    {
      id: 'mod-16-6',
      title: 'Microsserviços vs Monolito',
      duration: '50 min',
      xp: 230,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Microsserviços são a arquitetura mais hype da última década — e a mais mal aplicada. A maioria das startups que adota microsserviços prematuramente não escala tecnicamente, escala em complexidade operacional até que a equipe não consegue mais se mover rápido. Entender quando monolito é a resposta certa é sinal de maturidade de engenharia.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── MONOLITO: MAIS PODEROSO DO QUE VOCÊ PENSA ────────\n\n// Monolito NÃO é sinônimo de "código bagunçado"\n// Monolito MODULAR: código bem organizado em módulos, um deploy\n\n// Vantagens do monolito:\n// ✅ Deploy simples: um artefato, um servidor\n// ✅ Transações simples: tudo no mesmo banco\n// ✅ Testes fáceis: sem mocking de serviços externos\n// ✅ Debugging fácil: call stack local, sem distributed tracing\n// ✅ Latência de chamada interna: nanossegundos vs milissegundos\n// ✅ Desenvolvimento rápido: sem overhead de API contracts entre serviços\n\n// "Monolito bem estruturado aguenta:\n//  - Stack Overflow: monolito em .NET por anos com milhões de usuários\n//  - Shopify: monolito Ruby on Rails + sharding horizontal\n//  - Basecamp: monolito, poucos devs, produto sólido\n//  - GitHub: começou como monolito, escala gradual"\n\n// Estrutura de monolito modular:\nconst estrutura = {\n  "src/": {\n    "modules/": {\n      "usuarios/": ["controller.js","service.js","repository.js","types.js"],\n      "pedidos/":  ["controller.js","service.js","repository.js","types.js"],\n      "estoque/":  ["controller.js","service.js","repository.js","types.js"],\n    },\n    "shared/": ["db.js","redis.js","logger.js","auth.js"],\n    "app.js":    "Express app setup",\n  },\n};\n// Módulos bem separados → extração futura para microsserviço é viável\nconsole.log("Monolito modular: base sólida para crescer");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── QUANDO MICROSSERVIÇOS FAZEM SENTIDO ──────────────\n\n// Não são a resposta para equipes pequenas!\n// Amazon, Netflix, Uber adotaram DEPOIS de escala real\n\n// Sinais de que é hora de considerar:\n// ❗ Times diferentes precisam deployar partes diferentes do sistema\n//    independentemente sem coordenar\n// ❗ Partes do sistema têm requisitos de escala radicalmente diferentes\n//    (video encoding precisa de 100x mais CPU que o cadastro de usuário)\n// ❗ Partes do sistema usam linguagens/tecnologias diferentes por necessidade\n//    (ML em Python, API em Node, processamento em Go)\n// ❗ Organização de mais de ~100 engenheiros — "você tem o Spotify?"\n\n// Regra de Conway:\n// "A estrutura de software tende a espelhar a estrutura de comunicação\n//  da organização que a constrói"\n// Times separados → sistemas separados faz sentido\n// Time único → microsserviços criam overhead desnecessário\n\n// ── MICROSSERVIÇOS: COMPLEXIDADE REAL ────────────────\nconst overheadMicrosservicos = {\n  "Service Discovery":     "Como serviço A encontra o endereço do serviço B?",\n  "Distributed Tracing":  "Como debugar uma request que passa por 8 serviços?",\n  "Data Consistency":     "Como manter dados consistentes sem transação global?",\n  "Network Failures":     "Qualquer chamada pode falhar — circuit breakers obrigatórios",\n  "Versioning de API":    "Contrato entre serviços muda → todos os clientes precisam atualizar",\n  "Testing":              "Testes de integração precisam subir N serviços",\n  "Deployment":           "Orquestração com Kubernetes, service mesh com Istio",\n  "Observability":        "Logs, métricas, tracing distribuído em cada serviço",\n};\n\nconsole.log("Overhead real:", Object.keys(overheadMicrosservicos).length, "problemas novos");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── API GATEWAY ──────────────────────────────────────\n// Ponto único de entrada para todos os microsserviços\n// Clientes falam com o gateway, não com serviços diretamente\n\n// Responsabilidades do API Gateway:\n// ✅ Roteamento: /users/* → user-service, /orders/* → order-service\n// ✅ Autenticação: verifica JWT antes de encaminhar\n// ✅ Rate Limiting: proteção global contra abuso\n// ✅ SSL Termination\n// ✅ Load Balancing entre instâncias de cada serviço\n// ✅ Logging centralizado de todas as requisições\n// ✅ Request/Response transformation\n// ✅ Circuit Breaking\n\n// Implementações: Kong, AWS API Gateway, Nginx, Envoy, Traefik\n\n// ── SERVICE DISCOVERY ─────────────────────────────────\n// Como serviço A descobre o endereço do serviço B?\n\n// Client-side discovery: cada serviço consulta o registry\n// Server-side discovery: load balancer consulta o registry\n\n// Ferramentas: Consul, Kubernetes DNS, AWS Cloud Map\n// No Kubernetes: serviços têm DNS interno automático\n// order-service pode chamar http://user-service/api/users\n// sem conhecer o IP — Kubernetes resolve automaticamente\n\n// ── COMUNICAÇÃO: SÍNCRONA vs ASSÍNCRONA ──────────────\nconst comparacao = {\n  sincrona: {\n    protocolo: "HTTP/gRPC",\n    quando: "Precisa da resposta imediatamente — consulta de saldo, auth",\n    risco:  "Cascata de falhas: B lento → A lento → usuário lento",\n  },\n  assincrona: {\n    protocolo: "Kafka/RabbitMQ",\n    quando: "Não precisa esperar — notificação email, update de analytics",\n    vantagem: "A não é afetado se B estiver lento ou fora do ar",\n  },\n};\nconsole.log("Regra: síncrono quando precisa da resposta. Assíncrono quando pode.",comparacao);',
          },
          {
            type: 'highlight',
            content: '🎯 Strangler Fig Pattern: a forma segura de migrar monolito para microsserviços. Não reescreve tudo de uma vez. Coloca um proxy (API gateway) na frente do monolito. Migra uma funcionalidade por vez para um novo serviço, redirecionando o tráfego no gateway. O monolito "murcha" gradualmente enquanto os microsserviços crescem. Tempo médio: 2-3 anos para migração completa em sistemas grandes.',
          },
        ,
                  {
                    type: 'common_error',
                    title: 'Cache sem política de invalidação — dados stale em produção',
                    wrong: `// Cache sem TTL ou invalidação
const cache = new Map();

async function getPerfil(userId) {
  if (cache.has(userId)) {
    return cache.get(userId); // Retorna dados eternamente!
  }
  const dados = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
  cache.set(userId, dados);
  return dados;
}
// Usuário muda o nome — cache nunca expira — bug!`,
                    wrongLabel: 'Cache sem TTL ou invalidação serve dados desatualizados para sempre.',
                    right: `// Cache com TTL e invalidação ativa
const TTL = 5 * 60 * 1000; // 5 minutos
const cache = new Map();

async function getPerfil(userId) {
  const cached = cache.get(userId);
  if (cached && Date.now() - cached.ts < TTL) {
    return cached.data;
  }
  const dados = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
  cache.set(userId, { data: dados, ts: Date.now() });
  return dados;
}

// Ao salvar: invalide o cache!
async function atualizarPerfil(userId, novosDados) {
  await db.query("UPDATE users SET ...", [novosDados, userId]);
  cache.delete(userId); // Invalida imediatamente
}`,
                    rightLabel: 'Cache precisa de TTL (expiração) E invalidação na escrita (cache-aside pattern).',
                    explanation: 'Todo cache precisa de uma estratégia de invalidação — a parte mais difícil da computação. TTL define quanto tempo os dados podem ficar stale. Invalidação na escrita garante consistência imediata. Sem isso, você trouxe um bug difícil de reproduzir para produção.',
                  }],
        exercise: {
          title: 'Modelar decomposição de microsserviços',
          description: 'Implemente ServiceRegistry que registra serviços, descobre endereços e implementa roteamento básico de API Gateway. Simule uma requisição passando por autenticação e encaminhamento para o serviço correto.',
          starterCode: `class ServiceRegistry {\n  #servicos = new Map();\n\n  // Registra uma instância de serviço\n  registrar(nome, instancia) {\n    if (!this.#servicos.has(nome)) {\n      this.#servicos.set(nome, []);\n    }\n    this.#servicos.get(nome).push({ ...instancia, saudavel: true, requisicoes: 0 });\n  }\n\n  // Descobre uma instância saudável (round-robin simples)\n  descobrir(nome) {\n    const instancias = this.#servicos.get(nome)?.filter(i => i.saudavel);\n    if (!instancias?.length) throw new Error(\`Serviço \${nome} não encontrado\`);\n    const idx = instancias.reduce(\n      (min, inst, i, arr) => inst.requisicoes < arr[min].requisicoes ? i : min, 0\n    );\n    instancias[idx].requisicoes++;\n    return instancias[idx];\n  }\n\n  listar() {\n    const resultado = {};\n    for (const [nome, instancias] of this.#servicos) {\n      resultado[nome] = instancias.map(i => ({ url: i.url, requisicoes: i.requisicoes }));\n    }\n    return resultado;\n  }\n}\n\nclass APIGateway {\n  #registry;\n  #rotas;\n  #totalRequisicoes = 0;\n\n  constructor(registry) {\n    this.#registry = registry;\n    this.#rotas = [\n      { prefixo: "/api/usuarios",  servico: "user-service"  },\n      { prefixo: "/api/pedidos",   servico: "order-service" },\n      { prefixo: "/api/produtos",  servico: "product-service" },\n    ];\n  }\n\n  async rotear(requisicao) {\n    this.#totalRequisicoes++;\n    const { metodo, path, headers } = requisicao;\n\n    // 1. Autenticação: verifica Bearer token (simulado)\n    if (!headers.authorization?.startsWith("Bearer ")) {\n      return { status: 401, body: { erro: "Não autenticado" } };\n    }\n\n    // 2. Encontra o serviço pela rota\n    const rota = this.#rotas.find(r => path.startsWith(r.prefixo));\n    if (!rota) return { status: 404, body: { erro: "Rota não encontrada" } };\n\n    // 3. Descobre uma instância do serviço\n    try {\n      const instancia = this.#registry.descobrir(rota.servico);\n      return {\n        status: 200,\n        body: { mensagem: \`Encaminhado para \${instancia.url}\${path}\` },\n        servico: rota.servico,\n        instancia: instancia.url,\n      };\n    } catch (e) {\n      return { status: 503, body: { erro: e.message } };\n    }\n  }\n\n  get metricas() {\n    return { totalRequisicoes: this.#totalRequisicoes, servicos: this.#registry.listar() };\n  }\n}\n\n// Teste\nconst registry = new ServiceRegistry();\nregistry.registrar("user-service",    { url: "http://user-1:3001" });\nregistry.registrar("user-service",    { url: "http://user-2:3001" });\nregistry.registrar("order-service",   { url: "http://order-1:3002" });\nregistry.registrar("product-service", { url: "http://product-1:3003" });\n\nconst gateway = new APIGateway(registry);\n\nasync function main() {\n  const r1 = await gateway.rotear({\n    metodo: "GET", path: "/api/usuarios/42",\n    headers: { authorization: "Bearer token-valido" },\n  });\n  console.log("Request 1:", r1.status, "|", r1.body.mensagem);\n\n  const r2 = await gateway.rotear({\n    metodo: "POST", path: "/api/pedidos",\n    headers: { authorization: "Bearer token-valido" },\n  });\n  console.log("Request 2:", r2.status, "|", r2.body.mensagem);\n\n  const r3 = await gateway.rotear({\n    metodo: "GET", path: "/api/usuarios/99",\n    headers: {},  // sem auth\n  });\n  console.log("Sem auth:", r3.status);\n\n  const r4 = await gateway.rotear({\n    metodo: "GET", path: "/api/pagamentos/1",\n    headers: { authorization: "Bearer token" },\n  });\n  console.log("Rota inexistente:", r4.status);\n\n  const { metricas } = gateway;\n  console.log("Total requests:", metricas.totalRequisicoes);\n}\n\nmain();\n`,
          solutionHint: 'O código está completo. Execute e verifique que autenticação, roteamento, 401 e 404 funcionam corretamente.',
          validate: (output, code) => {
            return output.includes('Request 1: 200') &&
              output.includes('Request 2: 200') &&
              output.includes('Sem auth: 401') &&
              output.includes('Rota inexistente: 404') &&
              output.includes('Total requests: 4');
          },
          validateMessage: 'Requisições 1 e 2 retornam 200, sem auth retorna 401, rota inexistente retorna 404.',
        },
        quiz: [
          {
            question: 'Qual o principal motivo para evitar microsserviços em startups iniciais?',
            options: [
              'Microsserviços são mais lentos',
              'Overhead operacional é enorme para times pequenos — service discovery, distributed tracing, deployment complexity',
              'Microsserviços não escalam',
              'É mais caro em termos de cloud',
            ],
            correct: 1,
            explanation: 'Monolito: um deploy, debugging local, transações simples. Microsserviços: service mesh, distributed tracing, versioning de API, falhas de rede entre serviços, coordenação de deploys. Time de 5 pessoas paga o custo operacional sem ter o benefício de escala.',
          },
          {
            question: 'O que é a Lei de Conway?',
            options: [
              'Lei de segurança em sistemas distribuídos',
              'Sistemas tendem a espelhar a estrutura de comunicação da organização — times separados criam sistemas separados',
              'Princípio de escalabilidade',
              'Regra de nomenclatura de microsserviços',
            ],
            correct: 1,
            explanation: '"Organizations which design systems are constrained to produce designs which are copies of their communication structures." Uma empresa com times de Pagamentos, Usuários e Pedidos naturalmente vai para microsserviços. Time único vai para monolito modular.',
          },
          {
            question: 'O que é o Strangler Fig Pattern?',
            options: [
              'Padrão para deletar microsserviços',
              'Migração gradual: proxy encaminha funcionalidades uma a uma para novos serviços enquanto o monolito diminui',
              'Padrão de autenticação entre serviços',
              'Estratégia de cache em microsserviços',
            ],
            correct: 1,
            explanation: 'Não reescreve tudo de uma vez (muito arriscado). Coloca API gateway na frente. Migra uma funcionalidade: escreve novo serviço, redireciona tráfego no gateway, remove do monolito. Processo gradual de anos — seguro e incremental.',
          },
          {
            question: 'Qual a função principal de um API Gateway?',
            options: [
              'Banco de dados para microsserviços',
              'Ponto único de entrada: roteamento, autenticação, rate limiting, logging — clientes não falam diretamente com serviços internos',
              'Load balancer de banco de dados',
              'Gerenciamento de containers',
            ],
            correct: 1,
            explanation: 'API Gateway centraliza cross-cutting concerns: auth (uma vez no gateway, não em cada serviço), rate limiting, SSL termination, logging de todas as requests. Clientes têm um único endpoint em vez de conhecer cada serviço.',
          },
          {
            question: 'Quando preferir comunicação assíncrona entre microsserviços?',
            options: [
              'Sempre — é mais resiliente',
              'Quando o serviço chamador não precisa da resposta imediatamente — decoupling, tolerância a falhas do serviço chamado',
              'Apenas para operações de banco',
              'Quando o serviço está lento',
            ],
            correct: 1,
            explanation: 'Síncrono: "preciso criar o pedido, retornar o ID e prosseguir". Assíncrono: "pedido criado, publico evento, email e estoque reagem quando puderem". Benefício: order-service não para se email-service estiver fora do ar.',
          },
        ],
      },
    },
    {
      id: 'mod-16-7',
      title: 'Estudo de Caso: Projetando Sistemas Reais',
      duration: '60 min',
      xp: 280,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Em entrevistas técnicas sênior — Google, Meta, Amazon, startups de série B+ — você receberá: "Projete o Twitter" ou "Projete o sistema de notificações do WhatsApp". Não existe resposta única certa, mas existe um framework que demonstra pensamento de engenheiro. Os próximos 60 minutos ensinam esse framework com dois exemplos completos.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── FRAMEWORK DE ENTREVISTA DE SYSTEM DESIGN ─────────\n// Passo 1: CLARIFY (5 min) — entenda o problema\n// Passo 2: ESTIMATE (5 min) — calcule escala\n// Passo 3: API DESIGN (5 min) — defina as interfaces\n// Passo 4: HIGH-LEVEL DESIGN (15 min) — diagrama de componentes\n// Passo 5: DEEP DIVE (20 min) — detalhe os componentes críticos\n// Passo 6: TRADE-OFFS (5 min) — reconheça as limitações\n\n// ── CASO 1: URL SHORTENER (TinyURL) ──────────────────\n\n// Passo 1: Clarify\nconst requisitos = {\n  funcionais: [\n    "POST /shorten?url=https://... → retorna short URL (ex: tinyurl.com/abc123)",\n    "GET /:shortCode → redireciona para URL original (301 ou 302)",\n    "Links expiram após 1 ano por padrão",\n  ],\n  naoFuncionais: [\n    "Alta disponibilidade: 99.99%",\n    "Redirecionamentos em < 10ms",\n    "Escala: 100M URLs criadas/mês, 10B redirecionamentos/mês",\n  ],\n};\n\n// Passo 2: Estimate\nconst estimativas = {\n  URLsPorSegundo:     Math.round(100_000_000 / (30 * 86400)),     // ~38 writes/s\n  redirectsPorSegundo: Math.round(10_000_000_000 / (30 * 86400)), // ~3858 reads/s\n  ratioReadWrite:     "100:1 (leitura intensiva)",\n  armazenamento: {\n    porURL: "500 bytes (URL + metadata)",\n    porAno: "100M × 12 meses × 500B ≈ 600 GB/ano",\n    em5Anos: "~3 TB (totalmente cabe em SSD único, mas replicamos)",\n  },\n};\n\nconsole.log("Writes/s:", estimativas.URLsPorSegundo);\nconsole.log("Reads/s:", estimativas.redirectsPorSegundo);\nconsole.log("Armazenamento 5 anos:", estimativas.armazenamento.em5Anos);',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── URL SHORTENER: ARQUITETURA ───────────────────────\n\n// Passo 3: API\n// POST /api/v1/urls\n//   Body: { url: "https://...", expiresIn?: number }\n//   Response 201: { shortUrl: "tinyurl.com/abc123", expiresAt }\n// GET /:code\n//   Response 301: Location: https://...\n//   (301 = permanente, browser cacheia → menos carga)\n//   (302 = temporário, não cacheia → mais controle)\n\n// Passo 4: High-Level Design\n// [Browser] → [LB] → [Web Servers] → [Cache Redis]\n//                                    ↓ (cache miss)\n//                                    [DB PostgreSQL]\n//              ↓ (criar URL)\n//              [Short Code Generator] → [DB]\n\n// Passo 5: Deep Dive — Geração do Short Code\nfunction gerarShortCode(id, alfabeto = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") {\n  // Base-62 encoding do ID auto-incrementado\n  // ID 1 → "1", ID 62 → "10", ID 3844 → "100"\n  // 7 chars = 62^7 = 3.5 trilhões de URLs (suficiente)\n  let code = "";\n  while (id > 0) {\n    code = alfabeto[id % 62] + code;\n    id = Math.floor(id / 62);\n  }\n  return code.padStart(7, "0");\n}\n\nconsole.log("ID 1:   →", gerarShortCode(1));\nconsole.log("ID 1000 →", gerarShortCode(1000));\nconsole.log("ID 99M  →", gerarShortCode(99_000_000));\n\n// Por que não UUID aleatório?\n// Colisão: random de 7 chars tem ~0.1% chance de colisão com 1M de URLs\n// Sequential ID + base62: sem colisão, mais curto, previsível\n// Problema: IDs sequenciais são enumeráveis\n// Solução: use ID com offset ou bitwise shuffle para não ser óbvio\n\n// Cache strategy para redirecionamentos:\n// LRU cache de 20% das URLs mais acessadas = 80% dos redirects (Pareto)\n// GET /:code → Redis.get(code) → 200M redirects/dia do cache = ~0 load no DB',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── CASO 2: SISTEMA DE NOTIFICAÇÕES ─────────────────\n// "Projete o sistema de notificações do Instagram"\n\n// Passo 1: Clarify\n// Push: mobile (APNs/FCM), web (Web Push)\n// Email: transacional e marketing\n// In-app: badge de notificação no sino\n// Volume: 100M usuários, 1B notificações/dia\n\n// Passo 2: Estimate\nconst estNotif = {\n  notifPorSegundo: Math.round(1_000_000_000 / 86400), // ~11.574/s\n  pico:            "3x médio ≈ 35.000 notif/s",\n  tamanhoPorNotif: "250 bytes",\n  armazDia:        "1B × 250B = 250 GB/dia",\n};\n\n// Passo 4: High-Level\n// [Evento: novo like] → [Kafka: notif-events]\n//                        ↓\n//              [Notification Service]\n//              ├── [Push Worker] → [APNs/FCM]\n//              ├── [Email Worker] → [SendGrid/SES]\n//              └── [In-App Worker] → [Redis: notifs:userId]\n\n// Passo 5: Deep Dive — Fan-out no like\n// Usuário A com 50M seguidores curte foto → 50M notificações?\n// Solução: fan-out assíncrono com limite de processamento\nclass NotificationFanout {\n  async processar(evento) {\n    const { tipo, atoreId, alvoId, dados } = evento;\n    // Busca destinatários (paginado para grandes volumes)\n    const seguidores = await this.buscarSeguidoresEmLotes(atoreId, 1000);\n    // Filtra usuários que ativaram notificação para este tipo\n    const destinatarios = seguidores.filter(s => s.preferencias[tipo]);\n    // Publica em lotes na fila de cada canal\n    await this.publicarEmLotes(destinatarios, { tipo, atoreId, dados }, 100);\n  }\n  // Em vez de 50M inserts síncronos: processa em lotes de 1000, assincronamente\n}\n\n// Passo 6: Trade-offs\nconst tradeoffs = [\n  "Fan-out write (pré-computa) vs Fan-out read (calcula ao abrir app)",\n  "Celebridades com 50M seguidores: write-time fan-out é inviável → mistura dos dois",\n  "Delivery garantida (at-least-once) → usuário pode ver notif duplicada (aceitável)",\n];\nconsole.log("Trade-offs identificados:", tradeoffs.length);',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── RATE LIMITER DISTRIBUÍDO ─────────────────────────\n// "Projete um rate limiter para uma API"\n\n// Algoritmos principais:\n\n// 1. TOKEN BUCKET\n// Balde com N tokens. Cada request consome 1 token.\n// Tokens reabastecidos a X/segundo. Permite bursts.\nclass TokenBucket {\n  #tokens; #max; #reabastecimento; #ultimoAbastecimento;\n  constructor(max, reabastecimentoPorSegundo) {\n    this.#max = max;\n    this.#tokens = max;\n    this.#reabastecimento = reabastecimentoPorSegundo;\n    this.#ultimoAbastecimento = Date.now();\n  }\n  permiteRequest() {\n    const agora = Date.now();\n    const segundosPassados = (agora - this.#ultimoAbastecimento) / 1000;\n    this.#tokens = Math.min(this.#max, this.#tokens + segundosPassados * this.#reabastecimento);\n    this.#ultimoAbastecimento = agora;\n    if (this.#tokens >= 1) { this.#tokens -= 1; return true; }\n    return false;\n  }\n}\n\n// 2. SLIDING WINDOW LOG\n// Registra timestamp de cada request. Conta requests na janela.\n// Exato mas usa memória proporcional ao número de requests.\n\n// 3. SLIDING WINDOW COUNTER (prática com Redis)\n// Chave: "rate:{userId}:{minuto_atual}" com TTL 2 minutos\n// INCR + EXPIRE em Lua script para atomicidade\nconst luaScript = `\n  local current = redis.call("INCR", KEYS[1])\n  if current == 1 then\n    redis.call("EXPIRE", KEYS[1], ARGV[1])\n  end\n  return current\n`;\n// Se retorno > limite → rejeita com 429\n\n// Distribuído: Redis centralizado garante contagem correta entre servidores\nconst bucket = new TokenBucket(10, 2); // 10 tokens, 2/segundo\nfor (let i = 1; i <= 15; i++) {\n  console.log(`Request ${i}: ${bucket.permiteRequest() ? "✅ permitido" : "❌ negado"}`);\n}',
          },
          {
            type: 'highlight',
            content: '🎓 Como se preparar para entrevistas de system design: (1) Pratique o framework até ficar automático — Clarify → Estimate → API → Design → Deep Dive → Trade-offs. (2) Estude 5-10 sistemas canônicos: URL shortener, Twitter feed, WhatsApp, Uber, YouTube. (3) Leia os eng blogs: Netflix Tech Blog, Uber Engineering, Airbnb Engineering. (4) Use draw.io ou excalidraw para desenhar diagramas rapidamente. (5) Verbalize seu raciocínio — o entrevistador quer ver como você pensa, não só a resposta final.',
          },
        ],
        exercise: {
          title: 'Projetar um sistema de feed de notícias',
          description: 'Implemente FeedSystem que suporta: usuário segue outros (follow/unfollow), usuário posta (post), e busca feed (getFeed). Use fan-out on write para usuários normais. Calcule métricas do sistema.',
          starterCode: `class FeedSystem {\n  #usuarios = new Map();  // userId → { seguidores, seguindo, posts }\n  #feeds    = new Map();  // userId → [{ postId, autorId, conteudo, timestamp }]\n  #posts    = new Map();  // postId → { autorId, conteudo, timestamp }\n  #nextPostId = 1;\n\n  // Registra um usuário\n  registrar(userId) {\n    if (!this.#usuarios.has(userId)) {\n      this.#usuarios.set(userId, { seguidores: new Set(), seguindo: new Set(), posts: [] });\n      this.#feeds.set(userId, []);\n    }\n  }\n\n  // Seguir um usuário\n  follow(seguidorId, alvoId) {\n    const seguidor = this.#usuarios.get(seguidorId);\n    const alvo     = this.#usuarios.get(alvoId);\n    if (!seguidor || !alvo) return false;\n    seguidor.seguindo.add(alvoId);\n    alvo.seguidores.add(seguidorId);\n    return true;\n  }\n\n  // Criar post — fan-out on write para seguidores\n  post(autorId, conteudo) {\n    const autor = this.#usuarios.get(autorId);\n    if (!autor) return null;\n\n    const postId = this.#nextPostId++;\n    const novoPost = { postId, autorId, conteudo, timestamp: Date.now() };\n    this.#posts.set(postId, novoPost);\n    autor.posts.push(postId);\n\n    // FAN-OUT: distribui o post para o feed de cada seguidor\n    // (Limitado a 1000 seguidores para simular — em produção seria assíncrono)\n    const seguidores = [...autor.seguidores].slice(0, 1000);\n    for (const seguidorId of seguidores) {\n      const feed = this.#feeds.get(seguidorId);\n      if (feed) {\n        feed.unshift(novoPost);         // mais recente primeiro\n        if (feed.length > 500) feed.pop(); // mantém max 500 no feed\n      }\n    }\n    // Próprio feed do autor também recebe\n    this.#feeds.get(autorId)?.unshift(novoPost);\n\n    return postId;\n  }\n\n  // Buscar feed paginado\n  getFeed(userId, pagina = 0, tamanho = 10) {\n    const feed = this.#feeds.get(userId) || [];\n    return feed.slice(pagina * tamanho, (pagina + 1) * tamanho);\n  }\n\n  metricas() {\n    let totalPosts = 0, totalSeguidores = 0;\n    for (const u of this.#usuarios.values()) {\n      totalPosts += u.posts.length;\n      totalSeguidores += u.seguidores.size;\n    }\n    return {\n      usuarios: this.#usuarios.size,\n      totalPosts,\n      mediaSeguidores: (totalSeguidores / (this.#usuarios.size || 1)).toFixed(1),\n    };\n  }\n}\n\n// Teste\nconst feed = new FeedSystem();\n["u1","u2","u3","u4"].forEach(u => feed.registrar(u));\n\n// u2, u3, u4 seguem u1\nfeed.follow("u2", "u1");\nfeed.follow("u3", "u1");\nfeed.follow("u4", "u1");\nfeed.follow("u1", "u2"); // u1 segue u2 também\n\n// u1 posta 3 posts\nfeed.post("u1", "Primeiro post!");\nfeed.post("u1", "Segundo post!");\nfeed.post("u2", "Post do u2");\n\n// u2 vê posts de u1 no feed\nconst feedU2 = feed.getFeed("u2");\nconsole.log("Feed de u2 (deve ter posts de u1):");\nfeedU2.forEach(p => console.log(\` - [\${p.autorId}] \${p.conteudo}\`));\n\n// u3 vê posts de u1\nconst feedU3 = feed.getFeed("u3");\nconsole.log("\\nFeed de u3 (deve ter posts de u1 mas não u2):");\nfeedU3.forEach(p => console.log(\` - [\${p.autorId}] \${p.conteudo}\`));\n\nconst m = feed.metricas();\nconsole.log("\\nMétricas:", \`\${m.usuarios} usuários, \${m.totalPosts} posts, média \${m.mediaSeguidores} seguidores\`);\n`,
          solutionHint: 'O código já está completo. O fan-out acontece no método post() — distribui para cada seguidor imediatamente.',
          validate: (output, code) => {
            return output.includes('[u1] Primeiro post!') &&
              output.includes('[u1] Segundo post!') &&
              output.includes('Feed de u3') &&
              output.includes('4 usuários');
          },
          validateMessage: 'Feed de u2 deve ter posts de u1, u3 deve ter posts de u1, métricas devem mostrar 4 usuários.',
        },
        quiz: [
          {
            question: 'Qual o primeiro passo ao receber uma pergunta de system design em entrevista?',
            options: [
              'Começar a desenhar o diagrama imediatamente',
              'Clarificar requisitos funcionais e não-funcionais antes de qualquer design',
              'Escolher as tecnologias',
              'Calcular a escala',
            ],
            correct: 1,
            explanation: 'Clarificar primeiro: "Quantos usuários? Quais funcionalidades são prioritárias? Precisamos de consistência forte ou eventual?" Soluções para sistemas com 1k vs 1M vs 1B usuários são completamente diferentes. Entrevistar (clarify) demonstra maturidade.',
          },
          {
            question: 'O que é fan-out on write vs fan-out on read em feeds de redes sociais?',
            options: [
              'São implementações equivalentes',
              'Write: distribui post para todos os feeds dos seguidores imediatamente. Read: calcula feed do usuário no momento em que ele abre o app',
              'Write é para celulares, Read para desktop',
              'Write é para posts pequenos, Read para grandes',
            ],
            correct: 1,
            explanation: 'Fan-out write: leitura rápida (feed pré-computado), mas escrita cara para celebridades (50M seguidores = 50M inserts). Fan-out read: escrita simples, mas leitura lenta (busca posts de todos que você segue). Instagram usa híbrido: write para usuários normais, read para celebridades.',
          },
          {
            question: 'Por que usar código sequencial (Base62) em vez de UUID aleatório para short URLs?',
            options: [
              'UUID é mais longo',
              'Sequencial é mais curto e sem colisões — mas é enumerável. UUID é mais longo mas não previsível',
              'Base62 é mais seguro',
              'UUID é mais lento de gerar',
            ],
            correct: 1,
            explanation: 'Base62 de ID 1000 = "g8" (2 chars). UUID aleatório = 8 chars para mesma probabilidade de colisão. Trade-off: sequencial é enumerável (atacante pode tentar todos os IDs). Mitigação: adicionar salt ou offset aleatório ao ID antes do encoding.',
          },
          {
            question: 'Token Bucket vs Sliding Window para rate limiting: qual a diferença principal?',
            options: [
              'Token Bucket é mais simples',
              'Token Bucket permite bursts de tráfego. Sliding Window é mais preciso mas não permite burst',
              'Sliding Window é distribuído',
              'Token Bucket requer Redis',
            ],
            correct: 1,
            explanation: 'Token Bucket com 100 tokens: usuário pode usar todos os 100 imediatamente (burst), depois é limitado a X/segundo. Sliding Window: distribui uniformemente — sem burst mas sem surpresas. APIs de produção (GitHub, Twitter) usam Token Bucket.',
          },
          {
            question: 'O que significa "301 vs 302" na resposta de um URL shortener?',
            options: [
              '301 é mais rápido',
              '301 (permanente): browser cacheia redirect, menos carga no servidor mas sem analytics. 302 (temporário): browser não cacheia, cada acesso passa pelo seu servidor',
              '302 é para HTTPS',
              '301 requer autenticação',
            ],
            correct: 1,
            explanation: '301: browser cacheia, próxima vez vai direto para a URL original sem passar pelo seu servidor — ótimo para performance, péssimo para analytics (não conta o acesso). 302: cada acesso passa pelo servidor — você conta cliques, pode mudar o destino a qualquer momento. Bit.ly usa 301 para performance, serviços de analytics usam 302.',
          },
        ],
      },
    },
  {
    id: 'mp-phase-16',
    title: '🛠️ Mini-Projeto: Rate Limiter e Circuit Breaker',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase16,
    content: {
      sections: [{ type: 'text', content: 'Construa algo real aplicando o que aprendeu nesta fase.' }]
    }
  }  ],
};
