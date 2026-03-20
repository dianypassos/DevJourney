import { miniProjectPhase1 } from '../miniprojects.js';
export const phase1 = {
  id: 'phase-1',
  title: 'Fundamentos da Computação',
  phase: 1,
  color: '#7c6af7',
  icon: '🖥️',
  description: 'Entenda como computadores funcionam, o que é programação e as bases que todo dev precisa dominar antes de escrever a primeira linha real de código.',
  checklist: [
    'Explicar o que um computador faz quando executa um programa',
    'Entender a diferença entre código-fonte e executável',
    'Escrever e rodar meu primeiro programa em JavaScript',
    'Explicar o que é um algoritmo com minhas próprias palavras',
    'Entender por que a ordem das instruções importa',
  ],
  modules: [
    {
      id: 'mod-1-1',
      title: 'O que é Programação?',
      duration: '25 min',
      xp: 50,
      content: {
        sections: [
          { type: 'text', content: 'Programação é a habilidade de traduzir problemas do mundo real em instruções precisas que um computador executa. Um computador é extremamente rápido, mas completamente literalista — ele faz exatamente o que você mandar, nem mais nem menos. Seu papel como programador é decompor problemas complexos em passos pequenos e inequívocos. Essa habilidade de "pensar em algoritmos" — quebrar um problema em etapas — é mais valiosa do que memorizar sintaxe de linguagem. Sintaxe você consulta; raciocínio lógico é o que te torna produtivo.' },
          { type: 'highlight', content: '💡 Mito destruído: "Preciso ser bom em matemática para programar." A maioria do desenvolvimento web usa no máximo aritmética básica. O que você precisa é raciocínio lógico — e isso se aprende com prática deliberada.' },
          { type: 'text', content: 'Todo software que você usa foi escrito por pessoas usando linguagens de programação — "idiomas" criados para humanos se comunicarem com máquinas. JavaScript roda em browsers e servidores. Python domina ciência de dados e IA. Kotlin e Swift são para apps mobile. Java e C# para sistemas empresariais. Os conceitos fundamentais — variáveis, condições, loops, funções — são os mesmos em todas as linguagens. Aprenda-os bem em JavaScript e você vai ler Python ou Go sem dificuldade.' },
          { type: 'code', lang: 'javascript', content: '// Todo programa começa com alguma instrução. No JavaScript:\nconsole.log("Olá, Mundo!"); // exibe texto no console do devtools\n\n// O computador executa de cima para baixo, uma linha por vez\nconsole.log("Primeira instrução");  // executa 1°\nconsole.log("Segunda instrução");   // executa 2°\nconsole.log("Terceira instrução");  // executa 3°\n\n// console.log() é sua ferramenta #1 de debug:\n// ela revela o valor de qualquer expressão\nconsole.log(2 + 2);         // 4\nconsole.log("texto");       // texto\nconsole.log(10 > 5);        // true\nconsole.log([1, 2, 3]);     // [1, 2, 3]\nconsole.log({ nome: "Ana" }); // { nome: "Ana" }\n\n// Tente mudar os valores e executar!' },
          { type: 'text', content: 'O ciclo de vida de um dev no dia a dia: entender o problema → planejar a solução (às vezes no papel antes de abrir o editor) → escrever código → testar → encontrar bugs → corrigir → repetir. "Bug" é qualquer erro ou comportamento inesperado. "Debugar" é o processo de encontrá-lo e corrigi-lo. Um dev sênior não erra menos que um júnior — ele encontra e corrige erros muito mais rápido, e tem mais ferramentas para fazer isso.' },
          { type: 'highlight', content: '🔑 Você vai passar mais tempo lendo código do que escrevendo. Escreva pensando em quem vai ler depois — inclusive você daqui a 3 meses. Clareza é mais valiosa que esperteza.' }
        ],
        exercise: {
          title: 'Seu primeiro programa',
          description: 'Use console.log() para exibir pelo menos 3 informações: seu nome, a tecnologia que você mais quer aprender, e o que você quer construir como dev. Cada informação em uma linha separada.',
          starterCode: '// Exiba seu nome\n\n// Exiba a tecnologia que quer aprender\n\n// Exiba o que quer construir\n',
          solutionHint: 'console.log("Ana"); console.log("React"); console.log("Quero construir apps web");',
          validate: (output, code) => output.trim().split('\n').filter(l => l.trim()).length >= 3,
          validateMessage: 'Exiba pelo menos 3 linhas de informação.'
        },
        quiz: [
          { question: 'O que é programação?', options: ['Consertar hardware do computador', 'Traduzir problemas em instruções que um computador executa', 'Digitar documentos no Word', 'Criar designs gráficos'], correct: 1, explanation: 'Programação é a habilidade de decompor problemas em passos precisos e sequenciais que um computador pode executar.' },
          { question: 'O que é um bug?', options: ['Um vírus de computador', 'Um tipo de linguagem', 'Um erro ou comportamento inesperado no código', 'Um programa malicioso'], correct: 2, explanation: 'Bug é qualquer falha no código. O termo veio de 1947: uma mariposa real foi encontrada num relé de computador causando falha.' },
          { question: 'O que faz console.log()?', options: ['Salva um arquivo', 'Exibe um valor no console do navegador/terminal', 'Cria um elemento HTML', 'Conecta ao servidor'], correct: 1, explanation: 'console.log() imprime qualquer valor no console. É a ferramenta de debug mais usada — de júniores a seniores.' },
          { question: 'Em que ordem o JavaScript executa as instruções por padrão?', options: ['De baixo para cima', 'Em ordem aleatória', 'De cima para baixo, linha por linha', 'Só funções são executadas'], correct: 2, explanation: 'Código JS executa de cima para baixo sequencialmente por padrão. Isso muda com condicionais, loops, funções e código assíncrono.' },
          { question: 'O que é mais importante para se tornar um bom programador?', options: ['Saber avançada matemática', 'Memorizar a sintaxe da linguagem', 'Desenvolver raciocínio lógico para decompor problemas', 'Digitar rápido'], correct: 2, explanation: 'Raciocínio lógico é a base. Sintaxe você consulta na documentação; lógica é o que resolve problemas de verdade.' }
        ]
      }
    },
    {
      id: 'mod-1-2',
      title: 'Como Computadores Funcionam',
      duration: '25 min',
      xp: 60,
      content: {
        sections: [
          { type: 'text', content: 'Para escrever código eficiente, você precisa ter um modelo mental do ambiente onde ele roda. Um computador tem hardware (componentes físicos) e software (programas). Os componentes que mais impactam um dev são: CPU (processador) — executa suas instruções; RAM — memória de trabalho temporária e rápida; SSD/HD — armazenamento permanente; GPU — processa gráficos e operações paralelas. Cada componente tem uma função específica e um custo de performance diferente.' },
          { type: 'code', lang: 'javascript', preview: true, previewPhase: 'Fase 8 — Backend e APIs', content: '// Cada tipo de memória tem um análogo em código\n\n// SSD/HD — armazenamento permanente (persiste ao desligar)\n// Código equivalente: banco de dados, localStorage, arquivos\nconst preferencias = localStorage.getItem("tema"); // lê do "disco"\n\n// RAM — memória de trabalho (rápido, temporário)\n// Código equivalente: variáveis durante a execução\nconst carrinho = [{ id: 1, nome: "Notebook", preco: 3500 }]; // vive na RAM\n\n// CPU — processamento (executa cada instrução)\n// Código equivalente: qualquer cálculo ou operação\nconst total = carrinho.reduce((acc, item) => acc + item.preco, 0);\n\nconsole.log("Total:", total); // CPU calculou 3500\n\n// Rede — mais lento que RAM, mais rápido que HD (depende)\n// Código equivalente: fetch, requisições API\nconst dados = await fetch("/api/produtos"); // aguarda rede' },
          { type: 'highlight', content: '🧠 Hierarquia de velocidade: Registradores da CPU (nanosegundos) > Cache L1/L2 (nanossegundos) > RAM (decenas de nanosegundos) > SSD NVMe (microsegundos) > HD mecânico (milissegundos) > Rede (milissegundos a segundos). Essa diferença muda como você escreve código.' },
          { type: 'text', content: 'Quando você abre um programa: o executável sai do SSD (lento) e vai para a RAM (rápido) para a CPU processar. Por isso mais RAM = mais programas abertos sem lentidão. Para desenvolvimento, 16GB é o mínimo confortável hoje: VS Code + navegador com múltiplas abas + servidor Node + banco de dados consomem facilmente 8-12GB. Um SSD faz a diferença enorme: npm install, builds do Vite e inicialização de projetos que levam minutos num HD mecânico levam segundos num SSD.' },
          { type: 'text', content: 'O Sistema Operacional (Windows, macOS, Linux) é o software que orquestra tudo: aloca RAM entre processos, escalona uso da CPU, controla acesso ao disco e gerencia rede. Você interage com o SO pelo terminal. Linux domina servidores: +90% da internet roda Linux. Mesmo desenvolvendo em Windows ou Mac, você vai fazer deploy em Linux — entender comandos básicos de Linux é essencial. macOS é Unix-like (similar ao Linux) e por isso é popular entre devs.' },
          { type: 'highlight', content: '⚡ Setup recomendado para dev em 2025: 16GB RAM (8GB é sofrível), SSD NVMe (não HD mecânico), processador moderno multi-core. Não precisa ser caro — foque nessas três specs.' }
        ],
        exercise: {
          title: 'Calculando uso de memória',
          description: 'Crie um array de objetos representando programas abertos (cada um com nome e ramMB). Calcule o total de RAM usada. Exiba também quais programas usam mais de 300MB individualmente.',
          starterCode: 'const programasAbertos = [\n  { nome: "VS Code", ramMB: 512 },\n  { nome: "Chrome", ramMB: 1800 },\n  { nome: "Servidor Node", ramMB: 128 },\n  { nome: "Docker", ramMB: 400 },\n];\n\n// Calcule o total de RAM\n\n// Exiba: "Total: X MB"\n// Exiba os programas com mais de 300MB\n',
          solutionHint: 'Use .reduce() para somar e .filter() para os que passam de 300MB',
          validate: (output, code) => output.toLowerCase().includes('total') && /\d{3,}/.test(output),
          validateMessage: 'Exiba o total de RAM com a palavra "Total" e um número.'
        },
        quiz: [
          { question: 'Por que mais RAM ajuda no desenvolvimento?', options: ['Aumenta a velocidade de internet', 'Permite rodar mais programas simultaneamente sem usar swap (disco)', 'Melhora a qualidade do código', 'Aumenta espaço de armazenamento'], correct: 1, explanation: 'Quando RAM acaba, o SO usa o disco como RAM virtual (swap) — muito mais lento. Mais RAM = VS Code + Chrome + Node + banco simultâneos sem degradação.' },
          { question: 'O que acontece com dados na RAM ao desligar o computador?', options: ['São salvos automaticamente no SSD', 'São perdidos — RAM é memória volátil', 'Ficam em cache por 24h', 'São comprimidos no disco'], correct: 1, explanation: 'RAM é volátil: sem energia elétrica contínua, os dados somem. Por isso salvamos arquivos explicitamente — e por isso apps têm auto-save.' },
          { question: 'Por que SSD é essencial para desenvolvimento?', options: ['São mais baratos', '5-10x mais rápidos que HD, acelerando builds, installs e inicialização', 'Maior capacidade', 'Menor consumo elétrico'], correct: 1, explanation: 'npm install, webpack/vite build, git operations — tudo lê/escreve milhares de arquivos. SSD NVMe faz em segundos o que HD faz em minutos.' },
          { question: 'Qual SO domina servidores na internet?', options: ['Windows Server', 'macOS Server', 'Linux', 'FreeBSD'], correct: 2, explanation: 'Linux roda em +90% dos servidores — gratuito, estável, seguro, configurável. Aprender comandos Linux básicos é essencial independente do SO que você usa.' },
          { question: 'O que o Sistema Operacional gerencia?', options: ['Apenas a interface gráfica', 'CPU, RAM, disco, processos, rede e periféricos', 'Apenas arquivos', 'Somente programas instalados'], correct: 1, explanation: 'O SO é o intermediário entre hardware e software. Sem SO, cada programa precisaria gerenciar hardware diretamente — caos total.' }
        ]
      }
    },
    {
      id: 'mod-1-3',
      title: 'Por que Binário? O que Computadores Realmente Fazem',
      duration: '20 min',
      xp: 55,
      content: {
        sections: [
          { type: 'text', content: 'Computadores armazenam e processam tudo como sequências de 0s e 1s — o sistema binário. O motivo é físico: transistores, os bilhões de componentes minúsculos dentro de um chip, operam com dois estados elétricos (ligado/desligado). É a representação mais confiável em hardware. Texto, imagens, vídeos, código-fonte — tudo é binário no nível mais baixo. Entender isso não é apenas teoria: explica por que cores vão de 0-255, por que emojis às vezes quebram e por que arquivos têm tamanhos específicos.' },
          { type: 'code', lang: 'javascript', content: '// JavaScript tem conversores de base embutidos\n\n// Decimal → Binário\nconsole.log((42).toString(2));   // "101010"\nconsole.log((255).toString(2));  // "11111111" (1 byte cheio)\n\n// Decimal → Hexadecimal (base 16: 0-9 e a-f)\nconsole.log((255).toString(16)); // "ff"\nconsole.log((0).toString(16));   // "0"\n\n// Binário → Decimal\nconsole.log(parseInt("101010", 2));  // 42\nconsole.log(parseInt("11111111", 2)); // 255\n\n// Hexadecimal é compacto: 2 dígitos = 1 byte = 8 bits\n// Por isso cores CSS usam hex:\nconst corHex = "#3b82f6"; // azul do Tailwind\nconst r = parseInt(corHex.slice(1, 3), 16); // 59\nconst g = parseInt(corHex.slice(3, 5), 16); // 130\nconst b = parseInt(corHex.slice(5, 7), 16); // 246\nconsole.log(`RGB: ${r}, ${g}, ${b}`);\n// RGB: 59, 130, 246 — azul médio' },
          { type: 'highlight', content: '📏 Unidades: 1 bit = 0 ou 1 | 8 bits = 1 byte | 1.024 bytes = 1 KB | 1.024 KB = 1 MB | 1.024 MB = 1 GB. Um caractere ASCII = 1 byte. Um emoji = 4 bytes. Uma imagem PNG média = 500 KB. Um vídeo HD por segundo = ~2 MB.' },
          { type: 'text', content: 'Texto é armazenado como números. ASCII (1963) mapeou 128 caracteres para números 0-127 — suficiente para inglês. Mas não para acentos, caracteres chineses ou emojis. Unicode resolve isso definindo mais de 1,1 milhão de caracteres. UTF-8 é a codificação mais usada na web: usa 1 byte para ASCII, 2-4 bytes para outros caracteres. Se você já viu "Ã§" em vez de "ç", é uma página esperando UTF-8 mas recebendo outra codificação.' },
          { type: 'code', lang: 'javascript', content: '// Texto são números no fundo\nconsole.log("A".charCodeAt(0));   // 65\nconsole.log("a".charCodeAt(0));   // 97 (minúsculas começam no 97)\nconsole.log(" ".charCodeAt(0));   // 32 (espaço)\nconsole.log("0".charCodeAt(0));   // 48 — o caractere "0" ≠ número 0!\n\n// De código numérico para caractere\nconsole.log(String.fromCharCode(65));  // "A"\nconsole.log(String.fromCharCode(9829)); // "♥"\n\n// Emojis são 2 unidades no JS (surrogate pairs)\nconst foguete = "🚀";\nconsole.log(foguete.length);        // 2 (JS conta unidades UTF-16)\nconsole.log([...foguete].length);   // 1 (correto com spread)\n\n// Bit manipulation — raro mas existe em casos específicos\nconsole.log(5 & 3);   // AND: 101 & 011 = 001 → 1\nconsole.log(5 | 3);   // OR:  101 | 011 = 111 → 7\nconsole.log(1 << 3);  // shift left 3: 1 → 1000 → 8 (multiplica por 2³)' },
          { type: 'highlight', content: '🎨 Cores na web: RGB usa 3 bytes (vermelho, verde, azul), cada 0-255. #RRGGBB em hex. rgba(0,0,0,0.5) = preto 50% transparente. hsl(220, 90%, 56%) = azul médio saturado. Entender bytes explica todos esses números.' }
        ],
        exercise: {
          title: 'Conversões numéricas',
          description: 'Use JavaScript para: (1) converter 42 para binário, (2) converter 255 para hexadecimal, (3) converter o binário "1100100" para decimal, (4) extrair os valores R, G e B da cor "#e11d48".',
          starterCode: '// 1. Converta 42 para binário\n\n// 2. Converta 255 para hexadecimal\n\n// 3. Converta o binário "1100100" para decimal\n\n// 4. Extraia R, G, B da cor "#e11d48"\nconst cor = "#e11d48";\n',
          solutionHint: '(42).toString(2) | (255).toString(16) | parseInt("1100100", 2) | parseInt(cor.slice(1,3), 16)',
          validate: (output, code) => output.includes('101010') && (output.includes('ff') || output.includes('FF')) && output.includes('100'),
          validateMessage: 'Exiba: 101010 (42 em binário), ff (255 em hex) e 100 (1100100 em decimal).'
        },
        quiz: [
          { question: 'Por que computadores usam sistema binário?', options: ['Escolha arbitrária histórica', 'Transistores têm 2 estados elétricos naturais: ligado e desligado', 'É mais fácil calcular', 'Para economizar memória'], correct: 1, explanation: 'Transistores são a base do hardware. Eles operam com 2 estados elétricos, mapeando perfeitamente para 0 e 1. Outros sistemas seriam menos confiáveis.' },
          { question: 'Quantos bits formam 1 byte?', options: ['4', '8', '16', '32'], correct: 1, explanation: '1 byte = 8 bits, permitindo 256 combinações (0-255). É a unidade básica de memória e explica por que cores RGB vão de 0 a 255.' },
          { question: 'Por que cores CSS têm valores de 0 a 255?', options: ['Convenção arbitrária', 'Cada canal (R,G,B) usa 1 byte = 8 bits = 256 valores possíveis', 'Limitação do CSS1', 'Para facilitar cálculos de designers'], correct: 1, explanation: '3 bytes por cor = 24 bits = 16,7 milhões de cores possíveis. Esse limite vem diretamente de como hardware representa dados em binário.' },
          { question: 'O que é UTF-8?', options: ['Um sistema operacional', 'Codificação de texto que suporta todos os idiomas e emojis do mundo', 'Um formato de imagem', 'Uma versão do Unicode só para inglês'], correct: 1, explanation: 'UTF-8 usa 1-4 bytes por caractere. Compatível com ASCII. Suporta todos os +1M caracteres Unicode. Padrão da web desde ~2008.' },
          { question: 'Qual o valor decimal do binário 1010?', options: ['3', '8', '10', '12'], correct: 2, explanation: '1010 = 1×8 + 0×4 + 1×2 + 0×1 = 10. Cada posição da direita pesa o dobro da anterior: 1, 2, 4, 8, 16...' }
        ]
      }
    },
    {
      id: 'mod-1-4',
      title: 'Terminal e Linha de Comando',
      duration: '40 min',
      xp: 90,
      content: {
        sections: [
          { type: 'text', content: 'O terminal (CLI — Command Line Interface, shell, linha de comando) é a interface de texto para controlar o computador. Para um desenvolvedor, é tão indispensável quanto o editor de código. GUIs são convenientes para usuários finais. O terminal é a ferramenta de precisão de um dev: você instala dependências, inicia servidores, commita código, faz deploy, automatiza tarefas repetitivas e diagnostica problemas — tudo pelo terminal, com velocidade que nenhuma GUI consegue igualar.' },
          { type: 'highlight', content: '🖥️ Como abrir: Windows → PowerShell (ou instale WSL2 — recomendado, dá terminal Linux dentro do Windows). macOS → Terminal.app ou iTerm2. Linux → já tem. VS Code: Ctrl+` abre o terminal integrado em qualquer SO.' },
          { type: 'code', lang: 'bash', content: '# ─── NAVEGAÇÃO ──────────────────────────────────────────────\npwd                        # onde você está agora (Print Working Directory)\nls                         # lista arquivos (macOS/Linux)\nls -la                     # lista TUDO incluindo ocultos + permissões\ndir                        # lista arquivos (Windows CMD)\n\ncd projetos                # entra na pasta "projetos"\ncd ..                      # sobe uma pasta (pasta pai)\ncd ../outro                # sobe e entra em "outro"\ncd ~                       # vai para a home\ncd -                       # volta para o diretório anterior (muito útil!)\n\n# ─── CRIAÇÃO E MANIPULAÇÃO ──────────────────────────────────\nmkdir meu-projeto          # cria pasta\nmkdir -p pai/filho/neto    # cria pastas aninhadas de uma vez\ntouch index.html           # cria arquivo vazio (macOS/Linux)\n\ncp origem.txt destino.txt  # copia arquivo\ncp -r pasta/ copia/        # copia pasta (recursivo)\nmv antigo.txt novo.txt     # renomeia ou move arquivo\nrm arquivo.txt             # apaga arquivo (SEM LIXEIRA!)\nrm -rf pasta/              # apaga pasta e conteúdo (CUIDADO!)\n\n# ─── LEITURA E BUSCA ────────────────────────────────────────\ncat arquivo.txt            # exibe conteúdo inteiro\nhead -5 arquivo.txt        # exibe as primeiras 5 linhas\ntail -f server.log         # monitora fim de arquivo em tempo real (logs!)\ngrep "erro" app.log        # busca texto no arquivo\ngrep -r "useState" src/    # busca recursivamente na pasta src\n\n# ─── PRODUTIVIDADE ──────────────────────────────────────────\ncode .                     # abre VS Code na pasta atual\n↑ / ↓                      # navega pelo histórico de comandos\nTab                        # autocompleta nome de arquivo/pasta\nCtrl+C                     # cancela o comando em execução\nCtrl+R                     # busca no histórico (comece a digitar)\nCtrl+L                     # limpa o terminal' },
          { type: 'text', content: 'Anatomia de um comando: `programa [subcomando] [opções] [argumentos]`. Exemplo: `git commit -m "mensagem"` — git é o programa, commit é o subcomando, -m é a flag (opção abreviada) e "mensagem" é o argumento. Flags com - (um hífen) são abreviações de uma letra: -m, -v. Flags com -- (dois hífens) são por extenso: --message, --verbose. Ambas fazem a mesma coisa; as longas são mais legíveis em scripts.' },
          { type: 'code', lang: 'bash', content: '# ─── VARIÁVEIS DE AMBIENTE ──────────────────────────────────\n# Configurações do sistema acessíveis por qualquer programa\n# Uso mais crítico para devs: guardar segredos fora do código\n\necho $HOME             # /home/ana — pasta home\necho $PATH             # pastas onde o sistema busca programas\necho $NODE_ENV         # "development" | "production" | "test"\n\n# Definir temporariamente (só nesta sessão)\nexport PORTA=3000       # macOS/Linux\n$env:PORTA="3000"       # PowerShell\n\n# ─── ARQUIVO .env ────────────────────────────────────────────\n# Padrão em projetos Node.js — NUNCA suba para o Git!\n# Coloque no .gitignore\n\n# Conteúdo de um .env típico:\nDATABASE_URL=postgresql://localhost:5432/meubanco\nJWT_SECRET=uma-chave-longa-e-aleatoria\nPORT=3000\nNODE_ENV=development\nSTRIPE_SECRET_KEY=sk_test_xxxxx\n\n# No código você lê com: process.env.DATABASE_URL\n\n# ─── PIPES — COMPONDO COMANDOS ──────────────────────────────\n# | passa o output de um comando como input do próximo\nls -la | grep ".js"           # filtra só arquivos .js\ncat package.json | grep react  # linhas que contêm "react"\nhistory | grep npm            # todos os comandos npm que você rodou' },
          { type: 'highlight', content: '⚡ Tab é o atalho mais importante: completa ~95% do que você digita. Ctrl+R abre busca no histórico (comece a digitar qualquer parte do comando). ↑↑↑ repete comandos recentes. Esses 3 atalhos economizam horas por semana.' }
        ],
        exercise: {
          title: 'Explorando tipos de dados',
          description: 'Use typeof para descobrir o tipo de cada valor e console.log para exibir. Não precisa criar funções — só use as variáveis dadas e explore os operadores básicos.',
                    solutionHint: 'typeof retorna uma string com o nome do tipo. Para maiúsculas use .toUpperCase(). Template strings usam backtick e ${} para interpolação.',
starterCode: `// Estes valores já estão declarados para você:
const nome = 'Ana';
const idade = 25;
const altura = 1.68;
const ehEstudante = true;
const semValor = null;

// 1. Exiba o tipo de cada variável usando typeof:
console.log(typeof nome);       // ?
console.log(typeof idade);      // ?
console.log(typeof ehEstudante);// ?
console.log(typeof semValor);   // curiosidade: typeof null retorna 'object' (bug histórico do JS)

// 2. Faça operações simples e exiba os resultados:
console.log('Nome em maiúsculas:', nome.toUpperCase());
console.log('Idade em 10 anos:', idade + 10);
console.log('Altura em cm:', altura * 100);

// 3. Concatene nome e idade em uma frase:
console.log(nome + ' tem ' + idade + ' anos');
// Ou usando template string:
console.log(\`\${nome} tem \${idade} anos\`);`,
          solutionHint: 'typeof retorna uma string com o nome do tipo. Operações matemáticas com números funcionam normalmente. Template strings usam backtick e ${}.',
          validate: (output, code) => {
            return output.includes('string') &&
              output.includes('number') &&
              output.includes('boolean') &&
              output.includes('object') &&
              output.includes('ANA') &&
              output.includes('35') &&
              output.includes('168') &&
              (output.includes('Ana tem 25') || output.includes('25 anos'));
          },
          validateMessage: 'Use typeof para exibir os tipos, toUpperCase() para maiúsculas, operações matemáticas e uma frase com o nome e a idade.',
        },
        quiz: [
          { question: 'O que faz "cd .."?', options: ['Cria uma pasta chamada ".."', 'Sobe para a pasta pai do diretório atual', 'Deleta a pasta atual', 'Mostra o diretório atual'], correct: 1, explanation: 'cd (change directory) navega entre pastas. ".." é o símbolo universal para "pasta pai". "." é a pasta atual. "~" é a home.' },
          { question: 'O que faz "code ." no terminal?', options: ['Cria um arquivo .code', 'Abre a pasta atual no VS Code', 'Compila o código', 'Lista arquivos .js'], correct: 1, explanation: '"code" é o CLI do VS Code adicionado ao PATH na instalação. "." significa pasta atual. Equivalente a Arquivo→Abrir Pasta na GUI.' },
          { question: 'Para que serve o arquivo .env?', options: ['Configurações de editor', 'Guardar variáveis de ambiente sensíveis fora do código (senhas, chaves)', 'Arquivo de estilos', 'Configuração do Git'], correct: 1, explanation: '.env guarda segredos como chaves de API e senhas de banco. Deve estar no .gitignore — nunca suba para o GitHub.' },
          { question: 'Como cancelar um comando em execução?', options: ['Ctrl+Z', 'Ctrl+C', 'Ctrl+X', 'ESC'], correct: 1, explanation: 'Ctrl+C envia SIGINT ao processo. Para servidor Node rodando, Docker, npm install ou qualquer processo que trave o terminal.' },
          { question: 'O que é o PATH?', options: ['O caminho do arquivo atual', 'Lista de pastas onde o sistema procura programas quando você digita um comando', 'O histórico do terminal', 'O usuário logado'], correct: 1, explanation: 'PATH é uma variável de ambiente com pastas separadas por ":". Quando você digita "node", o sistema busca o executável "node" em cada pasta do PATH.' }
        ]
      }
    },
    {
      id: 'mod-1-5',
      title: 'Node.js, NPM e o Ecossistema JavaScript',
      duration: '35 min',
      xp: 100,
      content: {
        sections: [
          { type: 'text', content: 'JavaScript nasceu no browser em 1995. Em 2009, Ryan Dahl criou o Node.js — um runtime que roda JavaScript fora do browser, diretamente no servidor ou terminal. Isso foi revolucionário: uma linguagem para o frontend e o backend. Node.js usa o motor V8 do Chrome para executar JS com alta performance. É a base de todo o ecossistema de ferramentas moderno: React, Vite, Next.js, Express, Jest, TypeScript — tudo roda em Node. Mesmo que você nunca escreva backend, precisará do Node para usar qualquer ferramenta de desenvolvimento JavaScript.' },
          { type: 'code', lang: 'bash', content: '# ─── INSTALAÇÃO ─────────────────────────────────────────────\n# Use nvm (Node Version Manager) — permite trocar versões facilmente\n\n# macOS / Linux:\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash\nnvm install --lts          # instala a versão LTS (mais estável)\nnvm use --lts              # ativa a LTS\nnvm ls                     # lista versões instaladas\n\n# Windows: baixe nvm-windows em github.com/coreybutler/nvm-windows\n\n# Verificar instalação\nnode --version             # ex: v20.11.0\nnpm --version              # ex: 10.2.4\n\n# Rodar JavaScript sem browser\nnode meuarquivo.js         # executa um arquivo\nnode -e "console.log(2+2)" # executa uma linha\nnode                       # REPL interativo (Ctrl+D para sair)' },
          { type: 'text', content: 'NPM (Node Package Manager) é o maior repositório de código aberto do mundo — mais de 2 milhões de pacotes. Em vez de escrever tudo do zero, você instala código pronto e confiável de outros devs. O package.json é o "manifesto" do projeto: registra dependências, scripts de automação e metadados. É o primeiro arquivo criado em qualquer projeto JavaScript moderno. Sem entender o package.json, você vai ter dificuldade de seguir qualquer tutorial ou contribuir em qualquer projeto.' },
          { type: 'code', lang: 'bash', content: '# ─── INICIANDO UM PROJETO ───────────────────────────────────\nmkdir meu-projeto && cd meu-projeto\nnpm init -y                # cria package.json com valores padrão\n\n# ─── GERENCIANDO PACOTES ─────────────────────────────────────\nnpm install express        # instala pacote de produção (atalho: npm i)\nnpm install -D vitest      # instala devDependency\nnpm install -g typescript  # instala globalmente no sistema\nnpm uninstall express      # remove pacote\nnpm update                 # atualiza todos\nnpm outdated               # lista pacotes com versão nova\nnpm audit                  # verifica vulnerabilidades\nnpm audit fix              # corrige automaticamente o que puder\n\n# ─── ESTRUTURA GERADA ────────────────────────────────────────\n# meu-projeto/\n# ├── node_modules/      ← pacotes (NUNCA commitar no Git)\n# ├── package.json       ← manifesto do projeto (SIM, commitar)\n# ├── package-lock.json  ← versões travadas (SIM, commitar)\n# └── index.js           ← seu código\n\n# Ao clonar um projeto existente:\nnpm install               # reinstala tudo do package-lock.json\n# ou npm ci               # mais rápido e estrito (ideal em CI/CD)' },
          { type: 'code', lang: 'json', content: '// package.json — entendendo cada campo\n{\n  "name": "minha-api",\n  "version": "1.0.0",\n  "description": "API de exemplo",\n  "main": "src/index.js",\n\n  // Scripts: comandos que você roda com "npm run <nome>"\n  "scripts": {\n    "start": "node dist/index.js",           // produção\n    "dev": "tsx watch src/index.ts",         // desenvolvimento com hot reload\n    "build": "tsc",                          // compilar TypeScript\n    "test": "vitest",                        // rodar testes\n    "lint": "eslint src/ --fix"             // corrigir código\n  },\n\n  // Dependências que vão para produção\n  "dependencies": {\n    "express": "^4.18.2",   // ^ = aceita minor e patches (4.x.x), não major\n    "prisma": "^5.7.1",\n    "zod": "^3.22.4"\n  },\n\n  // Dependências só para desenvolvimento (não vão para produção)\n  "devDependencies": {\n    "typescript": "^5.3.2",\n    "vitest": "^1.0.4",\n    "@types/express": "^4.17.21"\n  }\n}\n\n// Rodando scripts:\n// npm start → node dist/index.js\n// npm run dev → tsx watch src/index.ts\n// npm test → vitest' },
          { type: 'highlight', content: '📦 node_modules pode ter centenas de MB. Sempre coloque no .gitignore. O package-lock.json garante que toda equipe instale exatamente as mesmas versões. SemVer: ^4.18.2 aceita 4.18.3, 4.19.0, mas não 5.0.0 (breaking change).' }
        ],
        exercise: {
          title: 'Meu primeiro algoritmo',
          description: 'Um algoritmo é uma sequência de passos para resolver um problema. Escreva um algoritmo simples: dados o nome e a nota de um aluno, exiba se ele foi aprovado (nota >= 6), em recuperação (nota >= 4) ou reprovado.',
                    solutionHint: 'Use if/else if/else. A condição de recuperação (nota >= 4) não precisa checar < 6 explicitamente — o else if já garante que o primeiro if não foi verdadeiro.',
starterCode: `// Dados do aluno — mude estes valores para testar
const nomeAluno = 'Carlos';
const nota = 5.5;

// Escreva a lógica abaixo:
// Se nota >= 6: exibir 'nomeAluno: Aprovado (nota)'
// Se nota >= 4 e < 6: exibir 'nomeAluno: Recuperação (nota)'
// Se nota < 4: exibir 'nomeAluno: Reprovado (nota)'

if (nota >= 6) {
  console.log(nomeAluno + ': Aprovado (' + nota + ')');
} else if (nota >= 4) {
  // complete aqui
} else {
  // complete aqui
}

// Teste com outras notas mudando o valor de 'nota' acima:
// 7.0 → Aprovado | 5.5 → Recuperação | 2.0 → Reprovado`,
          solutionHint: 'Use else if para o segundo caso. A condição de recuperação é nota >= 4 (o primeiro if já garante que nota < 6 nesse ponto).',
          validate: (output, code) => {
            return (
              code.includes('if') &&
              code.includes('else') &&
              (output.includes('Aprovado') || output.includes('Recuperação') || output.includes('Reprovado')) &&
              output.includes('Carlos')
            );
          },
          validateMessage: 'Use if/else if/else. Carlos com nota 5.5 deve exibir "Recuperação". Teste com nota 7 (Aprovado) e nota 2 (Reprovado).',
        },
        quiz: [
          { question: 'O que é o Node.js?', options: ['Um framework JavaScript', 'Um runtime que executa JavaScript fora do browser', 'Uma biblioteca de componentes UI', 'O mesmo que NPM'], correct: 1, explanation: 'Node.js usa o motor V8 do Chrome para rodar JS no servidor/terminal. Criado em 2009. Base de todo ecossistema de ferramentas JS.' },
          { question: 'Para que serve o package.json?', options: ['Armazena o código do projeto', 'Manifesto: define dependências, scripts e metadados do projeto', 'Configura o editor', 'Lista os arquivos'], correct: 1, explanation: 'package.json é o "documento de identidade" de um projeto JS. Sem ele, outros devs não saberão o que instalar nem como rodar.' },
          { question: 'Por que node_modules não vai para o Git?', options: ['Segurança', 'Tem centenas de MB e pode ser regenerado com npm install', 'Git não aceita esse nome', 'Apenas convenção'], correct: 1, explanation: 'node_modules pode ter 500MB+. O package-lock.json permite recriá-lo com "npm install". Commitá-lo causa conflitos enormes.' },
          { question: 'O que significa "^4.18.2" no package.json?', options: ['Exatamente 4.18.2', 'Aceita versões >=4.18.2 e <5.0.0 (minor e patches)', 'Qualquer versão 4.x.x', 'Versão mínima'], correct: 1, explanation: '^ (caret) aceita minor e patch mas não MAJOR. ^4.18.2 aceita 4.18.3, 4.19.0, mas não 5.0.0. Evita breaking changes automáticos.' },
          { question: 'Qual a diferença entre dependencies e devDependencies?', options: ['Não há', 'dependencies vão para produção; devDependencies ficam só no desenvolvimento', 'devDependencies são mais lentas', 'dependencies são obrigatórias'], correct: 1, explanation: 'dependencies: precisam rodar em prod (Express, Prisma). devDependencies: só para dev (TypeScript, ESLint, testes). npm install --production ignora devDeps.' }
        ]
      }
    }  ,{
    id: 'mp-phase-1',
    title: '🏗️ Mini-Projeto: Calculadora de IMC',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase1,
    content: {
      sections: [
        {
          type: 'text',
          content: 'Chegou a hora de colocar tudo em prática! Neste mini-projeto guiado você vai construir algo real — não apenas um console.log, mas um resultado utilizável que pode entrar no seu portfólio.'
        }
      ]
    }
  }
  ]
};
