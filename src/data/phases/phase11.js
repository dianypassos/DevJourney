import { miniProjectPhase11 } from '../miniprojects.js';
export const phase11 = {
  id: 'phase-18',
  title: 'Inglês para Devs',
  phase: 18,
  color: '#f59e0b',
  icon: '🇺🇸',
  description: 'Inglês técnico para ler documentação, colaborar em projetos open source, comunicar bugs e brilhar em entrevistas internacionais.',
  checklist: [
    'Ler documentação técnica em inglês sem precisar traduzir tudo',
    'Entender mensagens de erro em inglês e saber o que pesquisar',
    'Escrever commits e comentários de código em inglês',
    'Participar (mesmo que passivamente) de uma thread no GitHub/Stack Overflow',
    'Nomear variáveis e funções em inglês com semântica correta',
  ],
  modules: [
    {
      id: 'mod-18-1',
      title: 'Vocabulário Técnico Essencial',
      duration: '35 min',
      xp: 100,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Todo dev precisa de inglês — não inglês perfeito, mas inglês funcional. 90% da documentação, Stack Overflow, GitHub Issues e tutoriais de ponta estão em inglês. Dominar o vocabulário técnico é o primeiro passo: você já conhece muitas palavras sem saber.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── TERMOS DO DIA A DIA ─────────────────────────\n// Você já usa estes termos em português "aportuguesado"\n// Aqui estão com a pronúncia e uso correto em inglês:\n\n// bug        → "bag"  — erro no código\n// debug      → "dee-bag" — encontrar e corrigir erros\n// deploy     → "dee-ploy" — publicar em produção\n// build      → "bild" — compilar/construir o projeto\n// commit     → "co-mit" — salvar mudanças no git\n// merge      → "merj" — unir branches\n// refactor   → "ree-fac-ter" — melhorar o código sem mudar comportamento\n// scope      → "scowp" — escopo / abrangência\n// stack      → "stak" — conjunto de tecnologias\n// deprecated → "dep-re-cay-ted" — obsoleto, não usar mais\n// legacy     → "leg-a-see" — código antigo/herdado\n// codebase   → "cod-base" — todo o código do projeto\n// boilerplate → "boy-ler-plate" — código repetitivo padrão\n// snippet    → "snip-it" — trecho pequeno de código\n// scaffold   → "scaf-fold" — estrutura base gerada automaticamente\n\nconsole.log("Vocabulary matters!");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── VERBOS DE AÇÃO (os mais usados) ────────────\n// implement  → "im-ple-ment"  — implementar\n// fetch      → "fetch"        — buscar dados\n// render     → "ren-der"      — renderizar\n// trigger    → "trig-er"      — disparar/acionar\n// handle     → "han-del"      — lidar com / tratar\n// override   → "o-ver-ride"   — sobrescrever\n// inherit    → "in-her-it"    — herdar\n// instantiate → "in-stan-she-ate" — instanciar\n// iterate    → "it-er-ate"    — iterar\n// serialize  → "see-rial-ize" — serializar\n// parse      → "pars"         — analisar/converter\n// validate   → "val-i-date"   — validar\n// authenticate → "au-then-ti-cate" — autenticar\n// authorize  → "au-thor-ize"  — autorizar\n// provision  → "pro-vi-zhon"  — provisionar\n\n// ── ERROS COMUNS DE PRONÚNCIA ────────────────\n// cache   → "cash" (NÃO "ka-she")\n// queue   → "kyoo" (NÃO "kwe-we")\n// schema  → "skee-ma" (NÃO "she-ma")\n// facade  → "fa-sahd" (NÃO "fa-cade")\n// daemon  → "dee-mon" (NÃO "day-mon")\n// width   → "width" (NÃO "with")\nconsole.log("Pronunciation matters in meetings!");',
          },
          {
            type: 'highlight',
            content: '🎯 Dica de ouro: não tente traduzir mentalmente. Leia documentação em inglês todos os dias — mesmo sem entender tudo. Seu cérebro vai construindo padrões naturalmente. O MDN (developer.mozilla.org) é o melhor lugar para praticar.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── LENDO MENSAGENS DE ERRO ─────────────────────\n// Erros em inglês parecem assustadores. Tradução linha a linha:\n\n// "TypeError: Cannot read properties of undefined (reading \'map\')"  \n// → Tipo de erro: Não consigo ler propriedades de "undefined" (tentando ler \'map\')\n// → Significa: a variável está undefined e você tentou chamar .map() nela\n\n// "ReferenceError: userName is not defined"\n// → Erro de referência: "userName" não foi definida\n// → Significa: você usou a variável antes de declarar, ou escreveu o nome errado\n\n// "SyntaxError: Unexpected token \';\' "\n// → Erro de sintaxe: token inesperado \';\'\n// → Significa: ponto e vírgula fora de lugar\n\n// "Warning: Each child in a list should have a unique \'key\' prop"\n// → Aviso: cada filho em uma lista deve ter uma prop \'key\' única\n// → Significa: esqueceu o key={} no .map()\n\n// "404 Not Found" → "não encontrado"\n// "500 Internal Server Error" → "erro interno do servidor"\n// "401 Unauthorized" → "não autenticado"\n// "403 Forbidden" → "proibido (autenticado mas sem permissão)"\nconsole.log("Read errors calmly, translate mentally.");',
          },
        ],
        exercise: {
          title: 'Tradutor de termos técnicos',
          description: 'Implemente a função traduzirTermo(termo) que recebe um termo em inglês e retorna sua tradução/explicação em português. Cubra pelo menos 8 termos: "bug", "deploy", "refactor", "deprecated", "scope", "fetch", "render", "handle".',
                    solutionHint: 'Mapeie termos como scope creep, stakeholder, bottleneck, edge case, refactor. Para cada termo: definicao clara, contexto de uso e traducao natural.',
starterCode: 'function traduzirTermo(termo) {\n  const dicionario = {\n    // Adicione os 8 termos aqui\n    // "bug": "erro no código",\n    // ...\n  };\n  \n  const termoPadronizado = termo.toLowerCase().trim();\n  return dicionario[termoPadronizado] || `Termo "${termo}" não encontrado no dicionário`;\n}\n\n// Testes\nconst termos = ["bug", "deploy", "refactor", "deprecated", "scope", "fetch", "render", "handle"];\ntermos.forEach(t => {\n  const trad = traduzirTermo(t);\n  console.log(`${t} → ${trad}`);\n});\n\n// Teste de termo desconhecido\nconsole.log(traduzirTermo("blockchain"));\n',
          solutionHint: 'const dicionario = { "bug": "erro no código", "deploy": "publicar em produção", ... }',
          validate: (output, code) => {
            const lines = output.split('\n').filter(l => l.includes('→'));
            return lines.length >= 8 && output.includes('não encontrado');
          },
          validateMessage: 'Traduza os 8 termos e mostre mensagem para termo desconhecido.',
        },
        quiz: [
          { question: 'O que significa "deprecated" em inglês técnico?', options: ['Deletado permanentemente', 'Obsoleto — ainda funciona mas não deve ser usado em código novo', 'Com bug conhecido', 'Privado/interno'], correct: 1, explanation: '"Deprecated" significa que a funcionalidade ainda existe mas foi descontinuada. Será removida em versões futuras. Sempre migre ao ver este aviso.' },
          { question: 'Como se pronuncia corretamente "cache"?', options: ['"ka-she"', '"ca-che"', '"cash"', '"kay-sh"'], correct: 2, explanation: 'Cache se pronuncia "cash" (como dinheiro em inglês). Pronunciar "ka-she" em inglês soa estranho para falantes nativos.' },
          { question: 'O que significa a mensagem "Cannot read properties of undefined"?', options: ['Variável tem valor null', 'Você tentou acessar propriedade de uma variável que é undefined', 'Propriedade é privada', 'Erro de permissão do sistema'], correct: 1, explanation: 'Undefined significa que a variável não foi definida ou não tem valor. Tentar acessar .map, .length etc em undefined lança este TypeError.' },
          { question: 'O que é "boilerplate code"?', options: ['Código com muitos bugs', 'Código repetitivo e padrão necessário em todo projeto', 'Código legado', 'Código de testes'], correct: 1, explanation: 'Boilerplate é o código estrutural repetitivo — imports, configurações, estrutura de pastas. Frameworks como Next.js reduzem boilerplate.' },
          { question: 'Qual a diferença entre "authenticate" e "authorize"?', options: ['São sinônimos', 'Authenticate: verificar quem é o usuário; Authorize: verificar o que ele pode fazer', 'Authorize é mais seguro', 'Authenticate é só para OAuth'], correct: 1, explanation: 'Authentication (authn): "quem é você?" — login, JWT. Authorization (authz): "o que você pode fazer?" — permissões, roles. Conceitos distintos e fundamentais em segurança.' },
        ],
      },
    },
    {
      id: 'mod-18-2',
      title: 'Lendo Documentação Técnica',
      duration: '40 min',
      xp: 110,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Documentação oficial é a fonte mais confiável de informação. Saber navegar e interpretar docs em inglês é uma habilidade que separa devs medianos de devs excelentes. Toda doc segue uma estrutura previsível — uma vez que você aprende a padrão, qualquer doc fica legível.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── ESTRUTURA TÍPICA DE UMA DOC ──────────────────\n// Overview / Introduction → visão geral do que é\n// Getting Started / Quick Start → como começar\n// Installation → como instalar\n// API Reference → referência completa de todas as funções\n// Examples / Recipes → exemplos práticos\n// Configuration → opções de configuração\n// Migration Guide → como atualizar de versão anterior\n// Changelog → histórico de mudanças\n// Contributing → como contribuir com o projeto\n\n// ── FRASES COMUNS EM DOCS ─────────────────────────\n// "Returns" / "returns" → retorna (o que a função devolve)\n// "Accepts" / "takes" → aceita / recebe (parâmetros)\n// "Throws" → lança (erros/exceções)\n// "Deprecated in v2.0" → descontinuado na versão 2.0\n// "Optional" → opcional (parâmetro não obrigatório)\n// "Defaults to X" → valor padrão é X\n// "Note:" / "Warning:" / "Caution:" → atenção a este ponto\n// "See also" → veja também (links relacionados)\n// "Since v3.2" → disponível desde a versão 3.2\n// "Readonly" → somente leitura',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── EXEMPLO REAL: LENDO UMA ASSINATURA DE FUNÇÃO ──\n// Documentação do Array.prototype.reduce() no MDN:\n//\n// "reduce(callbackFn, initialValue)\n//  Executes a user-supplied \"reducer\" callback function on each element\n//  of the array, in order, passing in the return value from the\n//  calculation on the preceding element. The final result of running\n//  the reducer across all elements of the array is a single value."\n//\n// Tradução mental:\n// "Executa uma função callback \'reducer\' em cada elemento do array,\n//  em ordem, passando o valor retornado do cálculo do elemento anterior.\n//  O resultado final de executar o reducer em todos os elementos\n//  é um único valor."\n//\n// Parameters:\n// callbackFn → function(accumulator, currentValue, currentIndex, array)\n//   accumulator → Required. O valor acumulado da chamada anterior\n//   currentValue → Required. O elemento atual\n//   currentIndex → Optional. O índice do elemento atual\n//   array → Optional. O array original\n// initialValue → Optional. Defaults to first element if not provided.\n//\n// Returns: The value that results from running the reducer.\n\nconst soma = [1, 2, 3, 4].reduce((acc, cur) => acc + cur, 0);\nconsole.log(soma); // 10',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── PADRÕES DE TYPE SIGNATURES ──────────────────\n// TypeScript e muitas docs usam notação de tipos\n// Saber ler essas notações é essencial:\n\n// string → texto\n// number → número\n// boolean → verdadeiro/falso\n// T[] ou Array<T> → array de T\n// T | null → T ou null\n// T | undefined → T ou undefined\n// (arg: Type) => ReturnType → função que recebe arg e retorna ReturnType\n// Record<K, V> → objeto com chaves K e valores V\n// Partial<T> → T com todas as propriedades opcionais\n// Required<T> → T com todas as propriedades obrigatórias\n// Promise<T> → Promise que resolve com T\n\n// EXEMPLO: assinatura do fetch\n// fetch(input: string | URL | Request, init?: RequestInit): Promise<Response>\n// → recebe uma URL (obrigatório) e opções (opcional)\n// → retorna uma Promise que resolve com Response\n\n// EXEMPLO: useState do React\n// function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]\n// → recebe estado inicial (valor ou função)\n// → retorna tupla: [estadoAtual, funçãoParaAtualizar]',
          },
          {
            type: 'highlight',
            content: '📚 Docs para praticar hoje: MDN Web Docs (developer.mozilla.org) para JS/HTML/CSS — escrita clara, exemplos bons. React docs (react.dev) — excelente inglês técnico. Node.js docs (nodejs.org/en/docs). Comece pela seção "Getting Started" de qualquer lib que você usar.',
          },
        ],
        exercise: {
          title: 'Interpretar assinatura de função',
          description: 'Leia a assinatura abaixo (estilo TypeScript como aparece em documentações) e implemente a função correspondente. Assinatura: `filtrarPorCriterio<T>(array: T[], predicado: (item: T) => boolean, limite?: number): T[]` — filtra um array usando o predicado e retorna no máximo "limite" itens (padrão: sem limite).',
                    solutionHint: 'function name(param: Type): ReturnType. ? = opcional. Array<T> equivale a T[]. Promise<T> = funcao assincrona. Generics <T> = tipo flexivel.',
starterCode: '// Implemente baseado na assinatura:\n// filtrarPorCriterio<T>(array: T[], predicado: (item: T) => boolean, limite?: number): T[]\n//\n// array    → o array a filtrar\n// predicado → função que retorna true para itens que devem ficar\n// limite   → opcional, máximo de itens no resultado (default: sem limite)\n// retorna  → novo array com os itens filtrados (respeitando o limite)\n\nfunction filtrarPorCriterio(array, predicado, limite) {\n  // Sua implementação aqui\n}\n\n// Testes\nconst numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// Sem limite\nconst pares = filtrarPorCriterio(numeros, n => n % 2 === 0);\nconsole.log("Pares:", pares); // [2, 4, 6, 8, 10]\n\n// Com limite de 3\nconst primeiros3Pares = filtrarPorCriterio(numeros, n => n % 2 === 0, 3);\nconsole.log("Primeiros 3 pares:", primeiros3Pares); // [2, 4, 6]\n\n// Com objetos\nconst usuarios = [\n  { nome: "Ana", ativo: true },\n  { nome: "Bruno", ativo: false },\n  { nome: "Carlos", ativo: true },\n];\nconst ativos = filtrarPorCriterio(usuarios, u => u.ativo);\nconsole.log("Ativos:", ativos.map(u => u.nome).join(", "));\n',
          solutionHint: 'const resultado = array.filter(predicado); return limite ? resultado.slice(0, limite) : resultado;',
          validate: (output, code) => {
            return output.includes('[2, 4, 6, 8, 10]') &&
              output.includes('[2, 4, 6]') &&
              output.includes('Ana') &&
              output.includes('Carlos') &&
              !output.includes('Bruno');
          },
          validateMessage: 'Filtre pares (sem limite), pares com limite 3, e usuários ativos.',
        },
        quiz: [
          { question: 'O que significa "defaults to" em documentação?', options: ['O valor foi deletado', 'O valor padrão quando o parâmetro não é passado', 'O valor mínimo permitido', 'O valor máximo'], correct: 1, explanation: '"Defaults to X" = se você não passar esse parâmetro, o valor usado será X. Ex: "timeout defaults to 5000" → se não passar timeout, usa 5000ms.' },
          { question: 'O que significa "?" em uma assinatura TypeScript como "limite?: number"?', options: ['Limite é um número desconhecido', 'Limite é opcional — pode ser omitido', 'Limite pode ser qualquer tipo', 'Límite está deprecado'], correct: 1, explanation: 'O "?" após o nome do parâmetro indica que ele é opcional. Se omitido, será undefined (ou usará o valor padrão especificado).' },
          { question: 'Em docs do MDN, o que a seção "Syntax" contém?', options: ['Exemplos de código', 'A assinatura formal da função com todos os parâmetros', 'Histórico de versões', 'Bugs conhecidos'], correct: 1, explanation: 'A seção Syntax mostra a assinatura completa da função — nome, parâmetros (obrigatórios e opcionais) e valor de retorno. É o primeiro lugar a olhar.' },
          { question: 'O que significa "throws" em documentação de função?', options: ['A função lança um foguete', 'A função pode lançar uma exceção (erro) nessa situação', 'A função descarta o resultado', 'A função executa de forma assíncrona'], correct: 1, explanation: '"Throws TypeError if..." significa que a função vai lançar esse erro nessa condição. Você precisa envolver com try/catch se esse caso for possível.' },
          { question: 'O que é um "Changelog"?', options: ['Log de erros do sistema', 'Documento com histórico de mudanças entre versões', 'Arquivo de configuração', 'Branch de mudanças pendentes'], correct: 1, explanation: 'Changelog documenta o que mudou em cada versão: novas features, bugfixes, breaking changes. Sempre leia o changelog ao atualizar dependências.' },
        ],
      },
    },
    {
      id: 'mod-18-3',
      title: 'Inglês em Pull Requests e Issues',
      duration: '35 min',
      xp: 105,
      content: {
        sections: [
          {
            type: 'text',
            content: 'GitHub é o LinkedIn dos desenvolvedores — e é 100% em inglês. Saber escrever Issues claras e Pull Requests profissionais abre portas para contribuir em projetos open source, trabalhar em times internacionais e ser levado a sério como desenvolvedor.',
          },
          {
            type: 'code',
            lang: 'markdown',
            content: '# ── ANATOMIA DE UM BOM BUG REPORT ──────────────\n\n## Title (título)\n# ❌ Ruim: "botão não funciona"\n# ✅ Bom: "Submit button throws TypeError when form has empty optional fields"\n#         → Botão Submit lança TypeError quando formulário tem campos opcionais vazios\n\n## Description template:\n**Describe the bug**\nA clear description of what the bug is.\n→ "Ao tentar submeter o formulário com o campo \'phone\' vazio,\n   um TypeError é lançado no console e o formulário não é submetido."\n\n**To Reproduce** (como reproduzir)\nSteps to reproduce the behavior:\n1. Go to \'/checkout\'\n2. Fill all fields except \'phone\'\n3. Click Submit\n4. See error in console\n\n**Expected behavior** (comportamento esperado)\n"The form should submit successfully since phone is optional."\n\n**Actual behavior** (comportamento atual)\n"TypeError: Cannot read properties of undefined (reading \'replace\')"\n\n**Environment** (ambiente)\n- OS: Windows 11\n- Browser: Chrome 120\n- App version: 2.3.1',
          },
          {
            type: 'code',
            lang: 'markdown',
            content: '# ── PULL REQUEST DESCRIPTION ────────────────────\n\n## Title\n# ❌ Ruim: "fix bug" / "changes" / "update"\n# ✅ Bom: "fix: handle empty phone field in checkout form validation"\n#   Prefixos convencionais:\n#   feat: → nova funcionalidade\n#   fix:  → correção de bug\n#   docs: → mudança em documentação\n#   refactor: → refatoração sem mudança de comportamento\n#   test: → adição/correção de testes\n#   chore: → tarefas de manutenção\n\n## PR Body template:\n## Summary\nBriefly describe what this PR does and why.\n→ "Fixes the TypeError thrown when the phone field is empty during\n   checkout. The phone field is optional, but the validation function\n   was calling .replace() without checking for undefined first."\n\n## Changes\n- Added null check before calling `phone.replace()` in `validateForm()`\n- Added unit tests for empty optional fields\n- Updated error message to be more descriptive\n\n## Testing\n- [ ] Unit tests pass\n- [ ] Tested manually on Chrome/Firefox\n- [ ] No console errors\n\n## Related Issues\nCloses #142\nRelated to #138',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── FRASES ÚTEIS PARA COMENTÁRIOS ──────────────\n\n// Em code review (revisão de código):\n// "LGTM" → Looks Good To Me (aprovado!)\n// "nit:" → nitpick — detalhe pequeno, não bloqueante\n//   Ex: "nit: consider renaming this to `userEmail` for clarity"\n// "Could you..." → pode fazer? (tom educado)\n//   Ex: "Could you add a comment explaining why this timeout is needed?"\n// "I think..." → sugestão não obrigatória\n//   Ex: "I think this could be simplified with Optional Chaining."\n// "This might cause..." → possível problema\n//   Ex: "This might cause a race condition if called concurrently."\n// "Blocking:" → mudança obrigatória antes de merge\n// "Consider:" → sugestão para pensar\n\n// Pedindo ajuda em Issues:\n// "I\'m new to this project and..." → "Sou novo neste projeto e..."\n// "I\'ve been stuck on this for X hours" → "Estou travado nisso há X horas"\n// "Any guidance would be appreciated" → "Qualquer orientação seria bem-vinda"\n// "Happy to provide more details" → "Posso fornecer mais detalhes se necessário"\n// "Thanks in advance" → "Obrigado antecipadamente"\n\nconsole.log("Communication is a developer skill too.");',
          },
          {
            type: 'highlight',
            content: '🌍 Conventional Commits é o padrão da indústria para mensagens de commit: "tipo(escopo): descrição". Ex: "feat(auth): add Google OAuth login", "fix(api): handle 429 rate limit response". Use isso e seu histórico git vira documentação automática.',
          },
        ],
        exercise: {
          title: 'Formatar mensagens de commit',
          description: 'Implemente formatarCommit(tipo, escopo, descricao, breaking) que retorna uma mensagem de commit no formato Conventional Commits. Regras: "tipo(escopo): descrição" em minúsculas, se breaking=true adiciona "!" antes dos ":", descrição começa com letra minúscula, máximo 72 caracteres no total.',
                    solutionHint: 'Conventional Commits: tipo(escopo): descricao. Tipos: feat, fix, docs, chore, refactor, test. Imperativo: "add feature" nao "added feature".',
starterCode: 'function formatarCommit(tipo, escopo, descricao, breaking = false) {\n  // Formato: "tipo(escopo): descrição"\n  // Se breaking: "tipo(escopo)!: descrição"\n  // Tudo em minúsculas\n  // Máximo 72 caracteres\n  // Retorna a mensagem formatada\n}\n\n// Testes\nconsole.log(formatarCommit("feat", "auth", "add Google OAuth login"));\n// → "feat(auth): add google oauth login"\n\nconsole.log(formatarCommit("fix", "api", "handle 429 rate limit response"));\n// → "fix(api): handle 429 rate limit response"\n\nconsole.log(formatarCommit("feat", "auth", "remove password authentication", true));\n// → "feat(auth)!: remove password authentication"\n\n// Teste de limite de 72 chars\nconst longa = formatarCommit("refactor", "components", "rename all component files to use PascalCase naming convention throughout");\nconsole.log("Tamanho:", longa.length, longa.length <= 72 ? "(ok)" : "(muito longo!)");\n',
          solutionHint: 'const exc = breaking ? "!" : ""; const msg = `${tipo}(${escopo})${exc}: ${descricao.toLowerCase()}`; return msg.slice(0, 72);',
          validate: (output, code) => {
            return output.includes('feat(auth): add google oauth login') &&
              output.includes('feat(auth)!: remove password authentication') &&
              output.includes('(ok)');
          },
          validateMessage: 'Gere commits formatados corretamente, com breaking change e limite de 72 chars.',
        },
        quiz: [
          { question: 'O que significa "LGTM" em code review?', options: ['"Let\'s Get This Merged"', '"Looks Good To Me" — aprovado', '"Last Git Tag Merged"', '"Linting Goes Through Modules"'], correct: 1, explanation: 'LGTM = "Looks Good To Me" — aprovação informal em code reviews. Você vai ver muito isso em projetos open source no GitHub.' },
          { question: 'O que é um "breaking change"?', options: ['Um bug crítico em produção', 'Uma mudança que quebra compatibilidade com versão anterior da API', 'Um commit que falha no CI', 'Uma mudança sem testes'], correct: 1, explanation: 'Breaking change: mudança que quebra código existente que usa a versão anterior. Ex: renomear uma função, mudar sua assinatura, remover um endpoint. Deve ser comunicado com "!" no Conventional Commits e no CHANGELOG.' },
          { question: 'Qual a diferença entre "feat:" e "fix:" no Conventional Commits?', options: ['São idênticos', 'feat: nova funcionalidade; fix: correção de bug existente', 'feat: é para frontend, fix: para backend', 'fix: é mais urgente que feat:'], correct: 1, explanation: 'feat: adiciona nova capacidade ao software. fix: corrige comportamento incorreto existente. A distinção importa: gera MINOR version bump (feat) vs PATCH (fix) no SemVer.' },
          { question: 'O que deve conter um bom bug report?', options: ['Apenas a descrição do problema', 'Passos para reproduzir, comportamento esperado, comportamento atual e ambiente', 'Apenas o stack trace do erro', 'Apenas o código que causou o bug'], correct: 1, explanation: 'Um bom bug report tem: passos para reproduzir, o que você esperava, o que aconteceu, e o ambiente (OS, versão, browser). Sem isso, maintainers não conseguem ajudar.' },
          { question: 'O que é "nit:" em um comentário de code review?', options: ['Erro crítico que precisa ser corrigido', 'Nitpick — detalhe pequeno e opcional, não bloqueia o merge', 'Nota interna para o time', 'Necessidade de novos testes'], correct: 1, explanation: '"nit:" (nitpick) sinaliza que é uma sugestão menor — formatação, nome de variável, etc. Não é obrigatório atender antes de mergear. Ajuda a separar o que é crítico do que é preferência.' },
        ],
      },
    },
    {
      id: 'mod-18-4',
      title: 'Inglês em Entrevistas Técnicas',
      duration: '45 min',
      xp: 130,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Entrevistas técnicas em inglês parecem intimidadoras, mas seguem scripts previsíveis. A maioria das empresas internacionais não espera inglês perfeito — espera que você se comunique de forma funcional e clara. Preparar as frases-chave elimina 80% do nervosismo.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── FRASES PARA ENTREVISTAS DE CÓDIGO ──────────\n\n// Antes de começar a resolver:\n// "Let me make sure I understand the problem correctly."\n// → "Deixa eu garantir que entendi o problema corretamente."\n//\n// "Could you give me an example input and expected output?"\n// → "Pode me dar um exemplo de entrada e saída esperada?"\n//\n// "Are there any constraints I should be aware of?"\n// → "Há alguma restrição que devo considerar?"\n//\n// "What\'s the expected size of the input? Should I optimize for time or space?"\n// → "Qual o tamanho esperado da entrada? Devo otimizar por tempo ou espaço?"\n\n// Enquanto resolve:\n// "I\'m thinking of approaching this with..."\n// → "Estou pensando em abordar isso com..."\n//\n// "The brute force solution would be O(n²), but let me think of something better."\n// → "A solução de força bruta seria O(n²), mas deixa eu pensar em algo melhor."\n//\n// "Let me walk you through my thought process."\n// → "Deixa eu explicar meu raciocínio."\n//\n// "I think there might be an edge case here..."\n// → "Acho que pode haver um caso extremo aqui..."\n\nconsole.log("Think out loud during interviews!");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── PERGUNTAS COMPORTAMENTAIS (STAR METHOD) ────\n// Situation → Task → Action → Result\n// Situação → Tarefa → Ação → Resultado\n\n// Pergunta comum: "Tell me about a time you solved a difficult bug."\n// → "Me conte sobre uma vez que você resolveu um bug difícil."\n//\n// Resposta no formato STAR:\n// S: "In my last project, we had a production bug causing random 500 errors."\n//    → "No meu último projeto, tínhamos um bug em produção causando erros 500 aleatórios."\n// T: "I was responsible for finding and fixing the root cause within 24 hours."\n//    → "Era minha responsabilidade encontrar e corrigir a causa raiz em 24h."\n// A: "I added detailed logging, reproduced the issue locally, and discovered\n//    a race condition in our async payment handler."\n//    → "Adicionei logs detalhados, reproduzi o problema localmente e descobri\n//    uma race condition no handler assíncrono de pagamentos."\n// R: "The fix reduced error rate from 2% to 0%, and I documented it to\n//    prevent similar issues."\n//    → "O fix reduziu a taxa de erros de 2% para 0%, e documentei para\n//    evitar problemas similares."\n\n// Frases úteis:\n// "In my experience..." → "Na minha experiência..."\n// "One challenge I faced was..." → "Um desafio que enfrentei foi..."\n// "I learned that..." → "Aprendi que..."\n// "Going forward, I would..." → "Daqui para frente, eu..."\nconsole.log("STAR: Situation, Task, Action, Result");',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── VOCABULÁRIO DE BIG O E ALGORITMOS ──────────\n// Essencial para entrevistas técnicas:\n\n// "This runs in O(n) time" → "Isso roda em tempo O(n)"\n// "The space complexity is O(1)" → "A complexidade de espaço é O(1)"\n// "We can optimize this to O(n log n)" → "Podemos otimizar para O(n log n)"\n// "This is a greedy approach" → "Esta é uma abordagem gulosa"\n// "I\'d use dynamic programming here" → "Eu usaria programação dinâmica aqui"\n// "We can use a hash map to get O(1) lookup" → "Podemos usar hash map para busca O(1)"\n// "This is a two-pointer technique" → "Esta é a técnica de dois ponteiros"\n// "We can use a sliding window" → "Podemos usar janela deslizante"\n// "The edge cases are: empty input, single element, duplicates"\n//   → "Os casos extremos são: entrada vazia, elemento único, duplicatas"\n\n// Ao finalizar:\n// "Does this solution make sense?"\n// → "Esta solução faz sentido?"\n// "Would you like me to optimize further?"\n// → "Quer que eu otimize mais?"\n// "I could also test this with..."\n// → "Eu também poderia testar com..."\nconsole.log("Complexity matters in technical interviews.");',
          },
          {
            type: 'highlight',
            content: '🎙️ Recurso gratuito para praticar: o site interviewing.io tem entrevistas mock anônimas. O canal "TechLead" e "Clément Mihailescu" no YouTube mostram entrevistas reais comentadas. LeetCode tem um modo "Interview Simulation" com timer. Praticar em voz alta — mesmo sozinho — faz enorme diferença.',
          },
        ],
        exercise: {
          title: 'Descrever complexidade em inglês',
          description: 'Implemente descreverComplexidade(funcao, nome) que executa a função com arrays de tamanhos [10, 100, 1000] e infere se é O(1), O(n), O(n²) ou O(n log n) baseado no padrão de crescimento. Retorna uma string em inglês descrevendo a complexidade.',
                    solutionHint: 'O(1) = constant time. O(n) = linear. O(log n) = logarithmic. O(n2) = quadratic. "This algorithm runs in O(n log n) time and O(1) space complexity."',
starterCode: 'function medirTempo(fn, n) {\n  const arr = Array.from({length: n}, (_, i) => i);\n  const inicio = performance.now();\n  fn(arr);\n  return performance.now() - inicio;\n}\n\nfunction descreverComplexidade(funcao, nome) {\n  const tamanhos = [100, 1000, 10000];\n  const tempos = tamanhos.map(n => medirTempo(funcao, n));\n  \n  // Ratio entre t(n) e t(n*10)\n  const ratio1 = tempos[1] / tempos[0]; // 1000/100 = fator 10\n  const ratio2 = tempos[2] / tempos[1]; // 10000/1000 = fator 10\n  const avgRatio = (ratio1 + ratio2) / 2;\n  \n  let complexidade;\n  if (avgRatio < 2) complexidade = "O(1) — constant time";\n  else if (avgRatio < 15) complexidade = "O(n) — linear time";\n  else if (avgRatio < 50) complexidade = "O(n log n) — linearithmic time";\n  else complexidade = "O(n²) — quadratic time";\n  \n  return `${nome}: ${complexidade}`;\n}\n\n// Testes com funções de diferentes complexidades\nconst linear = arr => arr.reduce((a, b) => a + b, 0);\nconst quadratica = arr => {\n  let count = 0;\n  for (let i = 0; i < arr.length; i++)\n    for (let j = 0; j < arr.length; j++) count++;\n  return count;\n};\n\nconsole.log(descreverComplexidade(linear, "sum"));\nconsole.log(descreverComplexidade(quadratica, "nested loop"));\n',
          solutionHint: 'O código já está estruturado — implemente as comparações de ratio para inferir a complexidade',
          validate: (output, code) => {
            return output.toLowerCase().includes('linear') &&
              output.toLowerCase().includes('quadratic');
          },
          validateMessage: 'Identifique "linear" para sum e "quadratic" para nested loop.',
        },
        quiz: [
          { question: 'Como perguntar por mais tempo durante uma entrevista técnica?', options: ['"I need more time"', '"Could I have a moment to think through this?"', '"Wait"', '"Give me time"'], correct: 1, explanation: '"Could I have a moment to think through this?" é educado e profissional. Adicionar "I want to make sure I approach this correctly" demonstra cuidado. Nunca fique em silêncio absoluto — pense em voz alta.', },
          { question: 'O que é o método STAR em entrevistas?', options: ['Stack, Type, Array, Result', 'Situation, Task, Action, Result — estrutura para respostas comportamentais', 'Software, Testing, Architecture, Release', 'Start, Try, Assess, Repeat'], correct: 1, explanation: 'STAR é o framework para responder "me conte sobre uma vez que..." — descreva a Situação, a Tarefa que era sua, a Ação que tomou, e o Resultado. Respostas sem estrutura soam vagas.' },
          { question: 'Como se diz "complexidade de tempo constante" em inglês técnico?', options: ['"time zero complexity"', '"O(1) — constant time complexity"', '"flat time complexity"', '"single time complexity"'], correct: 1, explanation: '"O(1) constant time" — o algoritmo toma o mesmo tempo independente do tamanho da entrada. Ao contrário: O(n) linear, O(n²) quadratic, O(log n) logarithmic.' },
          { question: 'O que dizer quando não souber a resposta em uma entrevista?', options: ['Inventar uma resposta', '"That\'s outside my expertise, but my approach would be to..."', '"I don\'t know"', 'Mudar de assunto'], correct: 1, explanation: 'Honestidade + raciocínio vale mais que mentira. "I haven\'t worked with X directly, but based on my understanding of Y, I would approach it by..." mostra maturidade e capacidade de raciocinar sob incerteza.' },
          { question: 'O que significa "edge case" em algoritmos?', options: ['Caso de uso principal', 'Caso extremo ou limite que pode quebrar a solução — entrada vazia, overflow, duplicatas', 'Bug no código', 'Teste de performance'], correct: 1, explanation: 'Edge cases são entradas extremas: array vazio, null, número negativo, string muito longa, duplicatas. Identificá-los antes de codificar mostra senioridade em entrevistas.' },
        ],
      },
    },
  {
    id: 'mp-phase-18',
    title: '🛠️ Mini-Projeto: Documentacao em Ingles',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase11,
    content: {
      sections: [{ type: 'text', content: 'Construa algo real aplicando o que aprendeu nesta fase.' }]
    }
  }  ],
};
