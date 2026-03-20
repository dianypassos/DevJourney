import { miniProjectPhase12 } from '../miniprojects.js';
export const phase12 = {
  id: 'phase-6',
  title: 'Algoritmos e Estruturas de Dados',
  phase: 6,
  color: '#f97316',
  icon: '🧠',
  description: 'O conhecimento que separa desenvolvedores de engenheiros. Estruturas de dados, complexidade, busca, ordenação e resolução de problemas — o que toda empresa séria avalia em entrevistas. Mesmo sendo a fase 17, os tópicos de Big O, busca binária e hash tables aparecem em entrevistas técnicas de nível júnior — considere estudar pelo menos os 3 primeiros módulos antes de começar a procurar emprego.',
  checklist: [
    'Explicar O(n), O(log n) e O(n²) com exemplos reais',
    'Implementar busca linear e busca binária',
    'Usar Map e Set para otimizar lookups de O(n) para O(1)',
    'Implementar uma pilha (stack) e uma fila (queue)',
    'Resolver problemas de array com dois ponteiros (two pointers)',
    'Explicar por que evitar loops aninhados em dados grandes',
    'Implementar Bubble Sort e Selection Sort e comparar performance',
  ],
  modules: [
    {
      id: 'mod-17-1',
      title: 'Complexidade: Big O Notation',
      duration: '45 min',
      xp: 200,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Big O Notation é a linguagem que engenheiros usam para descrever a eficiência de algoritmos. Ela responde: "como o tempo de execução cresce à medida que a entrada cresce?" — independente de hardware, linguagem ou otimizações do compilador. É o primeiro assunto de toda entrevista técnica em empresa séria.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── AS COMPLEXIDADES MAIS COMUNS ─────────────────\n\n// O(1) — Constante: não importa o tamanho, mesmo tempo\nfunction primeiroDo(array) {\n  return array[0]; // acesso direto por índice\n}\nconst mapa = new Map();\nmapa.get("chave"); // lookup em Map/objeto é O(1)\n\n// O(log n) — Logarítmico: divide o problema pela metade a cada passo\n// Ex: busca binária em array ordenado\n// 1.000.000 elementos → apenas ~20 comparações\nfunction buscaBinaria(arr, alvo) {\n  let esq = 0, dir = arr.length - 1;\n  while (esq <= dir) {\n    const meio = Math.floor((esq + dir) / 2);\n    if (arr[meio] === alvo) return meio;\n    if (arr[meio] < alvo) esq = meio + 1;\n    else dir = meio - 1;\n  }\n  return -1;\n}\n\n// O(n) — Linear: cresce proporcionalmente ao input\nfunction encontrar(array, alvo) {\n  for (const item of array) { // visita cada elemento uma vez\n    if (item === alvo) return true;\n  }\n  return false;\n}\n\n// O(n log n) — Linearítmico: típico de algoritmos de ordenação eficientes\n// MergeSort, HeapSort, o .sort() nativo do JS\n\n// O(n²) — Quadrático: loop dentro de loop\nfunction temDuplicatas(arr) {\n  for (let i = 0; i < arr.length; i++) {       // n\n    for (let j = i + 1; j < arr.length; j++) { // n\n      if (arr[i] === arr[j]) return true;\n    }\n  }\n  return false;\n}\n// n=1000 → ~500.000 operações. n=10.000 → ~50.000.000!\n\n// O(2ⁿ) — Exponencial: duplica a cada elemento adicionado\n// Ex: recursão ingênua de Fibonacci — evite!\nfunction fibLento(n) {\n  if (n <= 1) return n;\n  return fibLento(n - 1) + fibLento(n - 2); // recalcula tudo do zero\n}',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── REGRAS DO BIG O ──────────────────────────────\n\n// REGRA 1: Ignore constantes — O(2n) = O(n)\nfunction duasPassagens(arr) {\n  let soma = 0;\n  for (const x of arr) soma += x;    // O(n)\n  for (const x of arr) soma += x*2;  // O(n)\n  return soma; // Total: O(2n) → simplifica para O(n)\n}\n\n// REGRA 2: Ignore termos menores — O(n² + n) = O(n²)\nfunction exemploMisto(arr) {\n  // O(n²) — duplo loop\n  for (let i = 0; i < arr.length; i++)\n    for (let j = 0; j < arr.length; j++)\n      console.log(arr[i], arr[j]);\n  // O(n) — loop simples\n  for (const x of arr) console.log(x);\n  // Complexidade total: O(n² + n) → O(n²)\n}\n\n// REGRA 3: Inputs diferentes = variáveis diferentes\nfunction comparar(arrA, arrB) {\n  for (const a of arrA)         // O(a)\n    for (const b of arrB)       // O(b)\n      if (a === b) console.log(a);\n  // NÃO é O(n²) — é O(a × b)\n}\n\n// ── COMPLEXIDADE DE ESPAÇO ────────────────────────\n// Big O também se aplica à memória usada\n\n// O(1) espaço — variáveis simples, independente do input\nfunction somarArray(arr) {\n  let total = 0;          // só esta variável\n  for (const x of arr) total += x;\n  return total;\n}\n\n// O(n) espaço — cria estrutura proporcional ao input\nfunction dobrarTodos(arr) {\n  return arr.map(x => x * 2); // novo array de tamanho n\n}\n\nconsole.log("Complexidade importa em sistemas reais!");\nconsole.log("n=1000, O(n²):", 1000*1000, "operações");\nconsole.log("n=1000, O(n log n):", Math.round(1000*Math.log2(1000)), "operações");',
          },
          {
            type: 'highlight',
            content: '🎯 Como memorizar: O(1) → acesso direto (Map, objeto, array por índice). O(log n) → divide pela metade (busca binária). O(n) → percorre uma vez (for loop simples). O(n log n) → ordenação eficiente (mergesort). O(n²) → loop dentro de loop. Se você vê dois loops aninhados, pense: isso é O(n²)?',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── COMPARAÇÃO PRÁTICA: O(n²) vs O(n) ───────────\n// Problema: verificar se array tem duplicatas\n\n// Solução ingênua — O(n²)\nfunction temDuplicatasLento(arr) {\n  for (let i = 0; i < arr.length; i++)\n    for (let j = i + 1; j < arr.length; j++)\n      if (arr[i] === arr[j]) return true;\n  return false;\n}\n\n// Solução eficiente — O(n) usando Set\nfunction temDuplicatasRapido(arr) {\n  const vistos = new Set();\n  for (const item of arr) {\n    if (vistos.has(item)) return true; // O(1) lookup!\n    vistos.add(item);\n  }\n  return false;\n}\n\n// Teste de performance\nconst grandeArray = Array.from({length: 10000}, (_, i) => i);\n\nconst t1 = performance.now();\ntemDuplicatasLento([...grandeArray, 9999]);\nconsole.log("O(n²):", Math.round(performance.now() - t1), "ms");\n\nconst t2 = performance.now();\ntemDuplicatasRapido([...grandeArray, 9999]);\nconsole.log("O(n):", Math.round(performance.now() - t2), "ms");',
          },
          {
            type: 'text',
            content: 'A diferença entre O(n²) e O(n) pode parecer teórica, mas em sistemas reais ela é a diferença entre uma API que responde em 5ms ou em 30 segundos. Um array de 100.000 usuários: O(n) faz 100.000 operações; O(n²) faz 10.000.000.000. É por isso que engenheiros seniores pensam em Big O antes de escrever qualquer loop.',
          },
        ],
        exercise: {
          title: 'Analisar e otimizar complexidade',
          description: 'Dado o array de transações abaixo, implemente encontrarPar(transacoes, alvo) que retorna o par de valores que soma exatamente o alvo. Versão 1: O(n²) com dois loops. Versão 2: O(n) usando um Map. Compare os tempos e mostre o par encontrado.',
                    solutionHint: 'Dois loops aninhados = O(n2). Substituir busca linear por Set ou Map = O(1). Memorizar subproblemas = programacao dinamica.',
starterCode: 'const transacoes = [15, 8, 42, 3, 27, 19, 61, 4, 35, 88, 12, 50];\nconst alvo = 46;\n\n// Versão O(n²) — força bruta\nfunction encontrarParLento(arr, alvo) {\n  // Use dois loops aninhados\n  // Retorne [a, b] onde a + b === alvo, ou null\n}\n\n// Versão O(n) — com Map\nfunction encontrarParRapido(arr, alvo) {\n  // Para cada número x, verifique se (alvo - x) já foi visto\n  // Use um Map para guardar os números já visitados\n  // Retorne [x, alvo-x] ou null\n}\n\n// Teste\nconst r1 = encontrarParLento(transacoes, alvo);\nconsole.log("O(n²) resultado:", r1);\n\nconst r2 = encontrarParRapido(transacoes, alvo);\nconsole.log("O(n) resultado:", r2);\n\n// Verifique que ambos somam o alvo\nif (r1) console.log("Soma O(n²):", r1[0] + r1[1]);\nif (r2) console.log("Soma O(n):", r2[0] + r2[1]);\n',
          solutionHint: 'O(n): const mapa = new Map(); for x: complemento = alvo-x; if mapa.has(complemento) return [complemento, x]; mapa.set(x, true)',
          validate: (output, code) => {
            return output.includes('46') && output.includes('resultado:') &&
              (output.includes('[19, 27]') || output.includes('[27, 19]') ||
               output.includes('19') && output.includes('27'));
          },
          validateMessage: 'Encontre o par que soma 46 (19 e 27) em ambas as versões.',
        },
        quiz: [
          { question: 'Qual a complexidade de acessar um elemento por índice em um array?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], correct: 2, explanation: 'Acesso por índice em array é O(1) — o computador calcula diretamente o endereço de memória: base + índice × tamanho. Não importa o tamanho do array.' },
          { question: 'Por que busca binária é O(log n)?', options: ['Porque usa logaritmos matemáticos', 'Porque divide o espaço de busca pela metade a cada passo', 'Porque só funciona com números', 'Porque é recursiva'], correct: 1, explanation: 'A cada comparação, metade dos elementos é eliminada. Um array de 1.000.000 elementos precisa de no máximo log₂(1.000.000) ≈ 20 comparações. Por isso é tão poderosa.' },
          { question: 'Dois loops sequenciais (não aninhados) têm qual complexidade?', options: ['O(n²)', 'O(2n) = O(n)', 'O(n + n) = diferente de O(n)', 'Depende do conteúdo dos loops'], correct: 1, explanation: 'Loops sequenciais se somam: O(n) + O(n) = O(2n). Pelo princípio de ignorar constantes, simplifica para O(n). Loops ANINHADOS se multiplicam: O(n × n) = O(n²).' },
          { question: 'Qual estrutura de dados oferece busca em O(1)?', options: ['Array ordenado', 'Árvore binária de busca', 'Map / Set / Objeto (hash table)', 'Lista ligada'], correct: 2, explanation: 'Map, Set e objetos JS usam hash tables por baixo. A função hash converte a chave em um índice, permitindo acesso direto O(1) — amortizado, com possíveis colisões.' },
          { question: 'O algoritmo de sort nativo do JavaScript tem qual complexidade?', options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(log n)'], correct: 2, explanation: 'O V8 (engine do Chrome/Node) usa TimSort — uma combinação de MergeSort e InsertionSort que garante O(n log n) no pior caso. É o melhor possível para ordenação por comparação.' },
        ],
      },
    },
    {
      id: 'mod-17-2',
      title: 'Arrays e Strings na Prática',
      duration: '50 min',
      xp: 210,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Arrays e strings são as estruturas mais cobradas em entrevistas — não porque sejam simples, mas porque permitem testar algoritmos sem overhead de implementação de estruturas complexas. Dominar os padrões de dois ponteiros, janela deslizante e prefixos cobre 60% dos problemas de entrevista de nível júnior/pleno.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── PADRÃO: DOIS PONTEIROS (Two Pointers) ─────────\n// Útil para arrays ordenados ou problemas com pares\n// Complexidade: O(n) em vez de O(n²)\n\n// Problema: verificar se string é palíndromo\nfunction isPalindromo(s) {\n  let esq = 0, dir = s.length - 1;\n  while (esq < dir) {\n    if (s[esq] !== s[dir]) return false;\n    esq++;\n    dir--;\n  }\n  return true;\n}\nconsole.log(isPalindromo("arara"));   // true\nconsole.log(isPalindromo("banana"));  // false\n\n// Problema: inverter array in-place (sem criar novo array)\nfunction inverterArray(arr) {\n  let esq = 0, dir = arr.length - 1;\n  while (esq < dir) {\n    [arr[esq], arr[dir]] = [arr[dir], arr[esq]]; // troca\n    esq++;\n    dir--;\n  }\n  return arr;\n}\nconsole.log(inverterArray([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]\n\n// Problema: par que soma alvo em array ORDENADO\nfunction parSomaOrdenado(arr, alvo) {\n  let esq = 0, dir = arr.length - 1;\n  while (esq < dir) {\n    const soma = arr[esq] + arr[dir];\n    if (soma === alvo) return [arr[esq], arr[dir]];\n    if (soma < alvo) esq++;  // precisa de número maior\n    else dir--;               // precisa de número menor\n  }\n  return null;\n}\nconsole.log(parSomaOrdenado([1, 3, 5, 8, 11, 15], 14)); // [3, 11]',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── PADRÃO: JANELA DESLIZANTE (Sliding Window) ────\n// Útil para subarray/substring contíguo com alguma propriedade\n// Evita recalcular do zero a cada posição\n\n// Problema: maior soma de subarray de tamanho k\nfunction maiorSomaSubarray(arr, k) {\n  if (arr.length < k) return null;\n  \n  // Calcula soma da primeira janela\n  let somaAtual = 0;\n  for (let i = 0; i < k; i++) somaAtual += arr[i];\n  let maiorSoma = somaAtual;\n  \n  // Desliza a janela: remove o primeiro, adiciona o próximo\n  for (let i = k; i < arr.length; i++) {\n    somaAtual += arr[i] - arr[i - k]; // O(1) em vez de recalcular O(k)\n    maiorSoma = Math.max(maiorSoma, somaAtual);\n  }\n  return maiorSoma;\n}\nconsole.log(maiorSomaSubarray([2, 1, 5, 1, 3, 2], 3)); // 9 (5+1+3)\n\n// Problema: menor substring contendo todos os caracteres alvo\nfunction menorSubstringComCaracteres(s, alvo) {\n  const necessarios = {};\n  for (const c of alvo) necessarios[c] = (necessarios[c] || 0) + 1;\n  \n  let esq = 0, satisfeitos = 0, totalNecessario = Object.keys(necessarios).length;\n  let minLen = Infinity, minEsq = 0;\n  const janela = {};\n  \n  for (let dir = 0; dir < s.length; dir++) {\n    const c = s[dir];\n    janela[c] = (janela[c] || 0) + 1;\n    if (necessarios[c] && janela[c] === necessarios[c]) satisfeitos++;\n    \n    while (satisfeitos === totalNecessario) {\n      if (dir - esq + 1 < minLen) { minLen = dir - esq + 1; minEsq = esq; }\n      janela[s[esq]]--;\n      if (necessarios[s[esq]] && janela[s[esq]] < necessarios[s[esq]]) satisfeitos--;\n      esq++;\n    }\n  }\n  return minLen === Infinity ? "" : s.slice(minEsq, minEsq + minLen);\n}\nconsole.log(menorSubstringComCaracteres("ADOBECODEBANC", "ABC")); // "BANC"',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── PADRÃO: PREFIXO/SUFIXO ────────────────────────\n// Pré-computa resultados parciais para consultas O(1)\n\n// Prefix Sum: soma acumulada para consultas de intervalo\nclass PrefixSum {\n  constructor(arr) {\n    this.prefix = [0];\n    for (const x of arr) {\n      this.prefix.push(this.prefix.at(-1) + x);\n    }\n  }\n  // Soma de arr[i..j] em O(1)\n  somaIntervalo(i, j) {\n    return this.prefix[j + 1] - this.prefix[i];\n  }\n}\n\nconst ps = new PrefixSum([1, 2, 3, 4, 5]);\nconsole.log(ps.somaIntervalo(1, 3)); // 2+3+4 = 9\nconsole.log(ps.somaIntervalo(0, 4)); // 1+2+3+4+5 = 15\n\n// Produto exceto si mesmo — clássico de entrevista\n// Sem usar divisão: prefixo da esquerda × sufixo da direita\nfunction produtoExcetoProprio(nums) {\n  const n = nums.length;\n  const resultado = new Array(n).fill(1);\n  \n  let prefixo = 1;\n  for (let i = 0; i < n; i++) {\n    resultado[i] = prefixo;\n    prefixo *= nums[i];\n  }\n  \n  let sufixo = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    resultado[i] *= sufixo;\n    sufixo *= nums[i];\n  }\n  return resultado;\n}\nconsole.log(produtoExcetoProprio([1, 2, 3, 4])); // [24, 12, 8, 6]',
          },
          {
            type: 'highlight',
            content: '💡 Os 3 padrões que cobrem a maioria dos problemas de array em entrevistas: Dois Ponteiros (para pares em arrays ordenados ou palíndromos), Janela Deslizante (para subarray/substring contíguo), e Prefix Sum (para consultas de intervalo repetidas). Reconhecer o padrão é metade da solução.',
          },
        ,
                  {
                    type: 'common_error',
                    title: 'Loop aninhado O(n²) quando existe solução O(n)',
                    wrong: `// Encontrar dois números que somam um alvo
function twoSum(nums, alvo) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === alvo) return [i, j];
    }
  }
}
// O(n²) — lento com arrays grandes`,
                    wrongLabel: 'Dois loops aninhados = O(n²): 10.000 elementos → 100.000.000 operações.',
                    right: `// Mesma solução com Hash Map
function twoSum(nums, alvo) {
  const mapa = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complemento = alvo - nums[i];
    if (mapa.has(complemento)) return [mapa.get(complemento), i];
    mapa.set(nums[i], i);
  }
}
// O(n) — um único loop com lookup O(1)`,
                    rightLabel: 'Hash Map transforma O(n²) em O(n): troca espaço por velocidade.',
                    explanation: 'Sempre que ver um loop aninhado buscando pares, pense em Hash Map. O padrão: itere uma vez, guarde o que já viu no Map, e cheque se o complemento existe em O(1).',
                  }],
        exercise: {
          title: 'Maior lucro com ações',
          description: 'Dado um array de preços de ações onde precos[i] é o preço no dia i, encontre o maior lucro possível comprando em um dia e vendendo em um dia posterior. Se não for possível ter lucro, retorne 0. Implemente em O(n) usando o padrão de mínimo visto até agora.',
                    solutionHint: 'Itere uma vez. Mantenha o preco minimo visto ate agora. Para cada dia: lucro = preco_atual - minimo. Atualize o maximo lucro. O(n) tempo e O(1) espaco.',
starterCode: 'function maiorLucro(precos) {\n  // Mantenha o menor preço visto até agora\n  // Para cada preço, calcule o lucro se vendesse hoje\n  // Guarde o maior lucro encontrado\n  // Retorne 0 se não houver lucro possível\n}\n\n// Testes\nconsole.log(maiorLucro([7, 1, 5, 3, 6, 4])); // 5 (compra em 1, vende em 6)\nconsole.log(maiorLucro([7, 6, 4, 3, 1]));     // 0 (preços só caem)\nconsole.log(maiorLucro([1, 2]));              // 1\nconsole.log(maiorLucro([2, 4, 1, 7]));        // 6 (compra em 1, vende em 7)\n',
          solutionHint: 'let minPreco = Infinity, maxLucro = 0; for p of precos: maxLucro = Math.max(maxLucro, p - minPreco); minPreco = Math.min(minPreco, p)',
          validate: (output, code) => {
                  return output.includes('46') && output.includes('resultado:') &&
              (output.includes('[19, 27]') || output.includes('19') && output.includes('27')) &&
              (code.includes('for ') || code.includes('while ') || code.includes('.reduce(')) &&
              !code.includes('console.log(46)') &&
              !code.includes("console.log('46')");
                },
          validateMessage: 'Implemente o algoritmo corretamente com loops. Não imprima os resultados hardcoded.',
        },
        quiz: [
          { question: 'Quando usar o padrão de dois ponteiros?', options: ['Sempre que houver um array', 'Para encontrar pares ou verificar propriedades simétricas em arrays ordenados ou strings', 'Apenas para arrays de números', 'Quando não há outra solução'], correct: 1, explanation: 'Dois ponteiros funciona melhor quando: array está ordenado (par com soma alvo), problema envolve dois extremos (palíndromo, container com mais água), ou você quer evitar O(n²) de dois loops aninhados.' },
          { question: 'O que é o padrão de Janela Deslizante?', options: ['Mover um array dentro de outro', 'Manter uma subarray de tamanho variável ou fixo e atualizar incrementalmente sem recalcular do zero', 'Dividir o array em janelas iguais', 'Um algoritmo de busca'], correct: 1, explanation: 'Janela deslizante mantém um "pedaço" do array entre dois ponteiros. Quando a janela avança, você remove o elemento da esquerda e adiciona o da direita — O(1) em vez de recalcular toda a janela.' },
          { question: 'Para que serve um Prefix Sum?', options: ['Para ordenar arrays', 'Para calcular soma de qualquer intervalo [i,j] em O(1) após O(n) de pré-processamento', 'Para encontrar duplicatas', 'Para inverter arrays'], correct: 1, explanation: 'Prefix Sum pré-computa somas acumuladas. Depois, soma de qualquer intervalo [i,j] é prefix[j+1] - prefix[i] — O(1). Útil quando há muitas consultas de intervalo no mesmo array.' },
          { question: 'Qual a complexidade de encontrar um elemento em um array NÃO ordenado?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 2, explanation: 'Sem ordenação, não há atalho — você precisa verificar cada elemento. É O(n) no pior caso. Se o array estivesse ordenado, busca binária seria O(log n).' },
          { question: 'Por que usar Set em vez de Array para verificar "já vi esse elemento"?', options: ['Set é mais fácil de usar', 'Set tem .has() em O(1) enquanto Array.includes() é O(n)', 'Set usa menos memória', 'Set preserva a ordem'], correct: 1, explanation: 'Array.includes() percorre cada elemento até encontrar — O(n). Set usa hash table internamente — .has() é O(1). Para verificações frequentes de existência, Set transforma O(n²) em O(n).' },
        ],
      },
    },
    {
      id: 'mod-17-3',
      title: 'Hash Tables: Map e Set',
      duration: '45 min',
      xp: 220,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Hash tables são a estrutura de dados mais poderosa para trading de memória por velocidade. Map e Set do JavaScript são implementações de hash table. Entender como funcionam por dentro — e quando usá-las — transforma algoritmos O(n²) em O(n). Aparecem em mais da metade dos problemas de entrevista.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── COMO HASH TABLES FUNCIONAM POR DENTRO ─────────\n// 1. Você passa uma chave (qualquer valor)\n// 2. Uma função hash converte essa chave em um índice\n// 3. O valor é armazenado nesse índice de um array interno\n// 4. Na busca, mesma função hash → mesmo índice → O(1)\n\n// Simulação simplificada de uma hash table:\nclass HashTableSimples {\n  constructor(tamanho = 53) {\n    this.tabela = new Array(tamanho);\n  }\n  \n  #hash(chave) {\n    // Converte string em índice numérico\n    let total = 0;\n    const PRIMO = 31; // primos reduzem colisões\n    for (let i = 0; i < Math.min(chave.length, 100); i++) {\n      total = (total * PRIMO + chave.charCodeAt(i)) % this.tabela.length;\n    }\n    return total;\n  }\n  \n  set(chave, valor) {\n    const idx = this.#hash(chave);\n    if (!this.tabela[idx]) this.tabela[idx] = [];\n    this.tabela[idx].push([chave, valor]); // colisão: lista ligada\n  }\n  \n  get(chave) {\n    const idx = this.#hash(chave);\n    const bucket = this.tabela[idx];\n    if (!bucket) return undefined;\n    return bucket.find(([k]) => k === chave)?.[1];\n  }\n}\n\nconst ht = new HashTableSimples();\nht.set("nome", "Ana");\nht.set("idade", 28);\nconsole.log(ht.get("nome"));  // "Ana"\nconsole.log(ht.get("idade")); // 28',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── MAP vs OBJETO vs SET — quando usar cada ─────────\n\n// Objeto: chaves são sempre strings/symbols\nconst obj = { nome: "Ana", idade: 28 };\nobj[42] = "resposta";    // chave vira string "42"\nobj[{ id: 1 }] = "x";   // chave vira "[object Object]" — BUG!\n\n// Map: chaves podem ser QUALQUER tipo\nconst map = new Map();\nmap.set("string", 1);     // string\nmap.set(42, "número");    // número\nmap.set({id: 1}, "obj"); // objeto como chave!\nmap.set(true, "bool");    // boolean\nconsole.log(map.size);    // 4 — .size é nativo\nfor (const [k, v] of map) console.log(k, "→", v); // iteração simples\n\n// Set: coleção de valores únicos\nconst set = new Set([1, 2, 2, 3, 3, 3]);\nconsole.log([...set]); // [1, 2, 3] — duplicatas removidas automaticamente\nset.add(4);\nset.delete(1);\nconsole.log(set.has(2)); // true — O(1)!\n\n// ── PADRÕES CLÁSSICOS COM MAP ─────────────────────\n\n// Contar frequência de elementos\nfunction contarFrequencia(arr) {\n  const freq = new Map();\n  for (const item of arr) {\n    freq.set(item, (freq.get(item) || 0) + 1);\n  }\n  return freq;\n}\n\nconst freq = contarFrequencia([1, 2, 2, 3, 3, 3, 1]);\nconsole.log(freq.get(3)); // 3\nconsole.log(freq.get(1)); // 2\n\n// Agrupar por propriedade\nfunction agruparPor(arr, chave) {\n  return arr.reduce((grupos, item) => {\n    const k = item[chave];\n    if (!grupos.has(k)) grupos.set(k, []);\n    grupos.get(k).push(item);\n    return grupos;\n  }, new Map());\n}\n\nconst devs = [\n  { nome: "Ana", lang: "JS" }, { nome: "Bruno", lang: "Python" },\n  { nome: "Carlos", lang: "JS" }, { nome: "Diana", lang: "Python" },\n];\nconst porLing = agruparPor(devs, "lang");\nconsole.log(porLing.get("JS").map(d => d.nome)); // ["Ana", "Carlos"]',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── PROBLEMAS CLÁSSICOS RESOLVIDOS COM MAP/SET ────\n\n// 1. Anagramas: mesmas letras, ordens diferentes\nfunction saoAnagramas(s1, s2) {\n  if (s1.length !== s2.length) return false;\n  const contagem = new Map();\n  for (const c of s1) contagem.set(c, (contagem.get(c) || 0) + 1);\n  for (const c of s2) {\n    if (!contagem.get(c)) return false;\n    contagem.set(c, contagem.get(c) - 1);\n  }\n  return true;\n}\nconsole.log(saoAnagramas("listen", "silent")); // true\nconsole.log(saoAnagramas("hello", "world"));   // false\n\n// 2. Primeiro caractere único\nfunction primeiroUnico(s) {\n  const freq = new Map();\n  for (const c of s) freq.set(c, (freq.get(c) || 0) + 1);\n  for (let i = 0; i < s.length; i++) {\n    if (freq.get(s[i]) === 1) return i;\n  }\n  return -1;\n}\nconsole.log(primeiroUnico("loveleetcode")); // 2 (o "v")\n\n// 3. Sequência consecutiva mais longa — O(n) com Set\nfunction sequenciaConsecutiva(nums) {\n  const conjunto = new Set(nums);\n  let melhor = 0;\n  for (const num of conjunto) {\n    // Só começa a contar do início de uma sequência\n    if (!conjunto.has(num - 1)) {\n      let atual = num, tamanho = 1;\n      while (conjunto.has(atual + 1)) { atual++; tamanho++; }\n      melhor = Math.max(melhor, tamanho);\n    }\n  }\n  return melhor;\n}\nconsole.log(sequenciaConsecutiva([100, 4, 200, 1, 3, 2])); // 4 (1,2,3,4)',
          },
          {
            type: 'highlight',
            content: '🏆 Regra de ouro para entrevistas: sempre que você vir dois loops aninhados que estão "procurando" algo, pergunte-se: posso substituir o loop interno por um Map/Set? Na maioria das vezes a resposta é sim, e a complexidade cai de O(n²) para O(n).',
          },
        ],
        exercise: {
          title: 'Dois arrays com elementos comuns',
          description: 'Implemente intersecao(arr1, arr2) que retorna um array com os elementos que aparecem em ambos os arrays (sem duplicatas). Depois implemente diferencaSimetrica(arr1, arr2) que retorna elementos que estão em um OU no outro, mas não em ambos. Use Set para garantir O(n + m).',
                    solutionHint: 'Converta o primeiro array em Set (O(n)). Para cada item do segundo, verifique no Set (O(1)). Total O(n+m) em vez de O(n*m) com loops aninhados.',
starterCode: 'function intersecao(arr1, arr2) {\n  // Elementos presentes em AMBOS os arrays (sem duplicatas)\n  // Use Set para O(n + m)\n}\n\nfunction diferencaSimetrica(arr1, arr2) {\n  // Elementos em arr1 OU arr2, mas NÃO em ambos\n  // Use Set para O(n + m)\n}\n\n// Testes\nconsole.log(intersecao([1, 2, 3, 4], [3, 4, 5, 6]));\n// [3, 4]\n\nconsole.log(intersecao([1, 2, 2, 3], [2, 2, 4]));\n// [2] — sem duplicatas\n\nconsole.log(diferencaSimetrica([1, 2, 3], [2, 3, 4]));\n// [1, 4]\n\nconsole.log(diferencaSimetrica([1, 2, 3], [4, 5, 6]));\n// [1, 2, 3, 4, 5, 6]\n',
          solutionHint: 'intersecao: Set(arr1) → filter se Set(arr2).has(x) | diferenca: elementos de arr1 não em arr2, mais elementos de arr2 não em arr1',
          validate: (output, code) => {
            return output.includes('3') && output.includes('4') &&
              output.includes('[1, 4]') || (output.includes('1') && output.includes('4') && !output.includes('2, 3'));
          },
          validateMessage: 'Intersecção deve retornar [3, 4] e diferença simétrica [1, 4].',
        },
        quiz: [
          { question: 'Por que Map tem melhor performance que Objeto para muitas inserções/buscas?', options: ['Map é mais moderno', 'Map é otimizado especificamente para operações de chave-valor com qualquer tipo de chave', 'Map usa menos memória', 'Não há diferença de performance'], correct: 1, explanation: 'Map é otimizado para adição/remoção frequente de pares chave-valor. Objetos têm overhead de prototipagem e conversão de chaves para string. Para contagem e agrupamento, Map é a escolha certa.' },
          { question: 'O que é uma colisão em uma hash table?', options: ['Quando dois valores são iguais', 'Quando duas chaves diferentes geram o mesmo índice pela função hash', 'Quando o Map está cheio', 'Um erro de JavaScript'], correct: 1, explanation: 'Colisão ocorre quando hash(chave1) === hash(chave2) para chaves diferentes. É resolvida com encadeamento (lista ligada no bucket) ou endereçamento aberto. Boas funções hash minimizam colisões.' },
          { question: 'Qual a complexidade de Set.has() e Map.get()?', options: ['O(n)', 'O(log n)', 'O(1) amortizado', 'O(n log n)'], correct: 2, explanation: 'O(1) amortizado — a função hash calcula diretamente o índice. "Amortizado" porque colisões raras podem causar O(n) no pior caso, mas na prática é constante com boa função hash.' },
          { question: 'Quando usar Set em vez de Array para uma coleção?', options: ['Sempre', 'Quando você precisa de valores únicos e consultas rápidas de existência', 'Quando a ordem importa', 'Quando você precisa de índices'], correct: 1, explanation: 'Set: valores únicos, .has() O(1), sem índice. Array: valores duplicados permitidos, .includes() O(n), acesso por índice O(1). Se você verifica existência com frequência, Set é muito mais eficiente.' },
          { question: 'Como verificar se duas strings são anagramas em O(n)?', options: ['Ordenar as duas e comparar — O(n log n)', 'Usar um Map para contar frequência de cada letra de uma e decrementar com a outra', 'Comparar letra por letra', 'Converter para Set e comparar'], correct: 1, explanation: 'Map de frequência: conta cada letra da primeira string, depois decrementa para cada letra da segunda. Se todas as contagens chegam a zero, são anagramas — O(n) em tempo e espaço.' },
        ],
      },
    },
    {
      id: 'mod-17-4',
      title: 'Pilhas, Filas e Listas Ligadas',
      duration: '50 min',
      xp: 230,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Pilhas, filas e listas ligadas são as estruturas de dados lineares fundamentais. Pilhas e filas aparecem diretamente em sistemas: o call stack do JavaScript é uma pilha, BFS usa fila, undo/redo é uma pilha. Listas ligadas aparecem em implementações de outras estruturas e em problemas de entrevista com ponteiros.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── PILHA (Stack) — LIFO: Last In, First Out ─────────\n// Analogia: pilha de pratos — você pega de cima\n// O próprio call stack do JS é uma pilha!\n\nclass Pilha {\n  #dados = [];\n  \n  push(item) { this.#dados.push(item); }      // O(1)\n  pop() { return this.#dados.pop(); }          // O(1)\n  peek() { return this.#dados.at(-1); }        // O(1) — vê sem remover\n  isEmpty() { return this.#dados.length === 0; }\n  get size() { return this.#dados.length; }\n}\n\n// USO REAL: verificar parênteses balanceados\nfunction parentesesBalanceados(s) {\n  const pilha = new Pilha();\n  const pares = { ")": "(", "]": "[", "}": "{" };\n  \n  for (const c of s) {\n    if ("([{".includes(c)) pilha.push(c);\n    else if (")]}" .includes(c)) {\n      if (pilha.isEmpty() || pilha.pop() !== pares[c]) return false;\n    }\n  }\n  return pilha.isEmpty();\n}\nconsole.log(parentesesBalanceados("({[]})"));   // true\nconsole.log(parentesesBalanceados("({[})"));    // false\nconsole.log(parentesesBalanceados("()[]{}")); // true\n\n// USO REAL: avaliação de expressão reversa polonesa\nfunction calcularRPN(tokens) {\n  const pilha = new Pilha();\n  const ops = { "+": (a,b)=>a+b, "-": (a,b)=>a-b, "*": (a,b)=>a*b, "/": (a,b)=>Math.trunc(a/b) };\n  for (const t of tokens) {\n    if (ops[t]) { const b = pilha.pop(), a = pilha.pop(); pilha.push(ops[t](a, b)); }\n    else pilha.push(Number(t));\n  }\n  return pilha.pop();\n}\nconsole.log(calcularRPN(["2","1","+","3","*"])); // (2+1)*3 = 9',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── FILA (Queue) — FIFO: First In, First Out ─────────\n// Analogia: fila de banco — o primeiro que entrou sai primeiro\n// Usada em BFS, processamento de tarefas, sistemas de mensageria\n\nclass Fila {\n  #dados = [];\n  #inicio = 0; // índice do primeiro elemento — evita shift() O(n)\n  \n  enqueue(item) { this.#dados.push(item); }         // O(1)\n  dequeue() {\n    if (this.isEmpty()) return undefined;\n    const item = this.#dados[this.#inicio++];\n    // Limpa memória quando metade do array é lixo\n    if (this.#inicio > this.#dados.length / 2) {\n      this.#dados = this.#dados.slice(this.#inicio);\n      this.#inicio = 0;\n    }\n    return item;                                     // O(1) amortizado\n  }\n  peek() { return this.#dados[this.#inicio]; }       // O(1)\n  isEmpty() { return this.#inicio >= this.#dados.length; }\n  get size() { return this.#dados.length - this.#inicio; }\n}\n\n// ⚠️ Por que não usar array.shift()?\n// shift() é O(n) — move todos os elementos para preencher o buraco\n// Em uma fila com muitas operações, isso mata a performance!\n\nconst fila = new Fila();\nfila.enqueue("Ana");   // [Ana]\nfila.enqueue("Bruno"); // [Ana, Bruno]\nfila.enqueue("Carol"); // [Ana, Bruno, Carol]\nconsole.log(fila.dequeue()); // "Ana"\nconsole.log(fila.peek());    // "Bruno"\nconsole.log(fila.size);      // 2',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── LISTA LIGADA (Linked List) ────────────────────────\n// Nós conectados por ponteiros — sem índices, sem array contíguo\n// Inserção/remoção no início: O(1) (vs O(n) em array)\n// Acesso por posição: O(n) (vs O(1) em array)\n\nclass No {\n  constructor(valor) {\n    this.valor = valor;\n    this.proximo = null;\n  }\n}\n\nclass ListaLigada {\n  #cabeca = null;\n  #tamanho = 0;\n  \n  inserirNoInicio(valor) {           // O(1)!\n    const novo = new No(valor);\n    novo.proximo = this.#cabeca;\n    this.#cabeca = novo;\n    this.#tamanho++;\n  }\n  \n  inserirNoFim(valor) {              // O(n)\n    const novo = new No(valor);\n    if (!this.#cabeca) { this.#cabeca = novo; this.#tamanho++; return; }\n    let atual = this.#cabeca;\n    while (atual.proximo) atual = atual.proximo;\n    atual.proximo = novo;\n    this.#tamanho++;\n  }\n  \n  removerDoInicio() {                // O(1)!\n    if (!this.#cabeca) return null;\n    const valor = this.#cabeca.valor;\n    this.#cabeca = this.#cabeca.proximo;\n    this.#tamanho--;\n    return valor;\n  }\n  \n  inverter() {                       // O(n) — clássico de entrevista!\n    let anterior = null, atual = this.#cabeca;\n    while (atual) {\n      const proximo = atual.proximo;\n      atual.proximo = anterior;      // inverte o ponteiro\n      anterior = atual;\n      atual = proximo;\n    }\n    this.#cabeca = anterior;\n  }\n  \n  paraArray() {\n    const resultado = [];\n    let atual = this.#cabeca;\n    while (atual) { resultado.push(atual.valor); atual = atual.proximo; }\n    return resultado;\n  }\n}\n\nconst lista = new ListaLigada();\nlista.inserirNoFim(1); lista.inserirNoFim(2); lista.inserirNoFim(3);\nconsole.log(lista.paraArray()); // [1, 2, 3]\nlista.inverter();\nconsole.log(lista.paraArray()); // [3, 2, 1]',
          },
          {
            type: 'highlight',
            content: '📊 Array vs Lista Ligada: Array tem acesso O(1) por índice mas inserção/remoção no meio é O(n). Lista Ligada tem inserção/remoção no início O(1) mas acesso por posição é O(n). Na prática: use array para a maioria dos casos — a localidade de memória (cache) o torna mais rápido que lista ligada mesmo em inserções frequentes.',
          },
        ],
        exercise: {
          title: 'Implementar fila usando duas pilhas',
          description: 'Implemente uma Fila usando APENAS duas Pilhas (sem usar array diretamente para a fila). Operações: enqueue(x), dequeue(), peek(), isEmpty(). A ideia: pilha1 recebe novos itens; quando dequeue é chamado e pilha2 está vazia, transfira tudo da pilha1 para a pilha2.',
                    solutionHint: 'enqueue: push na pilha1. dequeue: se pilha2 vazia, transfira todos de pilha1 para pilha2 (inverte a ordem), entao pop de pilha2.',
starterCode: 'class Pilha {\n  #dados = [];\n  push(x) { this.#dados.push(x); }\n  pop() { return this.#dados.pop(); }\n  peek() { return this.#dados.at(-1); }\n  isEmpty() { return this.#dados.length === 0; }\n}\n\nclass FilaComDuasPilhas {\n  #entrada = new Pilha(); // recebe novos elementos\n  #saida = new Pilha();   // fornece elementos para dequeue\n  \n  enqueue(x) {\n    // Adicione à pilha de entrada\n  }\n  \n  dequeue() {\n    // Se saida estiver vazia, transfira tudo de entrada para saida\n    // Então faça pop de saida\n  }\n  \n  peek() {\n    // Mesmo princípio do dequeue, mas sem remover\n  }\n  \n  isEmpty() {\n    // Vazia quando ambas as pilhas estão vazias\n  }\n}\n\n// Testes\nconst fila = new FilaComDuasPilhas();\nfila.enqueue(1);\nfila.enqueue(2);\nfila.enqueue(3);\nconsole.log(fila.dequeue()); // 1 (FIFO!)\nconsole.log(fila.peek());    // 2\nfila.enqueue(4);\nconsole.log(fila.dequeue()); // 2\nconsole.log(fila.dequeue()); // 3\nconsole.log(fila.dequeue()); // 4\nconsole.log(fila.isEmpty()); // true\n',
          solutionHint: 'dequeue: if saida.isEmpty() → while !entrada.isEmpty(): saida.push(entrada.pop()). Então saida.pop()',
          validate: (output, code) => {
            const lines = output.trim().split('\n').map(l => l.trim());
            return lines[0] === '1' && lines[1] === '2' &&
              lines[2] === '2' && lines[3] === '3' &&
              lines[4] === '4' && lines[5] === 'true';
          },
          validateMessage: 'Saída deve ser: 1, 2, 2, 3, 4, true (comportamento FIFO correto).',
        },
        quiz: [
          { question: 'Qual estrutura usa LIFO (Last In, First Out)?', options: ['Fila', 'Array', 'Pilha', 'Árvore'], correct: 2, explanation: 'Pilha: o último elemento inserido é o primeiro a sair. O call stack do JavaScript é uma pilha — quando você chama uma função, ela vai para o topo; quando retorna, é removida do topo.' },
          { question: 'Por que usar índice de início em vez de shift() para implementar uma fila?', options: ['shift() não existe em arrays', 'shift() é O(n) — move todos os elementos; índice de início é O(1) amortizado', 'Por convenção', 'shift() modifica o array original'], correct: 1, explanation: 'shift() remove o primeiro elemento e desloca todos os outros — O(n). Manter um ponteiro para o início da fila e incrementá-lo é O(1). Em filas com muitas operações, a diferença é enorme.' },
          { question: 'Qual a vantagem da lista ligada sobre o array para inserção no início?', options: ['Lista ligada tem acesso O(1) por índice', 'Lista ligada insere no início em O(1); array precisa deslocar todos os elementos O(n)', 'Lista ligada usa menos memória', 'Não há vantagem'], correct: 1, explanation: 'Inserir no início de um array é O(n) — todos os elementos precisam ser deslocados. Em lista ligada, basta criar um novo nó e apontar para o antigo cabeça — O(1).' },
          { question: 'O que é o call stack do JavaScript?', options: ['Uma array de funções pendentes', 'Uma pilha que rastreia em qual função o código está executando no momento', 'A memória heap do JavaScript', 'O event loop'], correct: 1, explanation: 'Call stack é uma pilha de frames de execução. Quando você chama uma função, ela é empilhada. Quando retorna, é desempilhada. Stack overflow ocorre quando a pilha fica grande demais (recursão infinita).' },
          { question: 'Uma fila implementada com duas pilhas tem qual complexidade para dequeue?', options: ['O(n) sempre', 'O(1) amortizado — cada elemento é movido no máximo duas vezes no total', 'O(n²)', 'O(log n)'], correct: 1, explanation: 'Amortizado O(1): cada elemento entra em pilha1 (O(1)), é transferido para pilha2 uma única vez (O(1) por elemento), e removido de pilha2 (O(1)). O custo de transferência é diluído ao longo de muitas operações.' },
        ],
      },
    },
    {
      id: 'mod-17-5',
      title: 'Árvores e Árvore Binária de Busca',
      duration: '55 min',
      xp: 250,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Árvores são estruturas hierárquicas com um nó raiz e filhos. Estão em todo lugar: o DOM HTML é uma árvore, o sistema de arquivos é uma árvore, compiladores constroem ASTs (Abstract Syntax Trees), bancos de dados usam B-Trees para índices. A Árvore Binária de Busca (BST) é o primeiro passo para entender todas as outras.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── TERMINOLOGIA ─────────────────────────────────────\n// Raiz (root): nó sem pai — topo da árvore\n// Folha (leaf): nó sem filhos\n// Altura: distância máxima da raiz até uma folha\n// Profundidade: distância de um nó até a raiz\n// Subárvore: qualquer nó e seus descendentes\n\n// ── ÁRVORE BINÁRIA DE BUSCA (BST) ────────────────────\n// Propriedade: esquerda < raiz < direita (em todos os níveis)\n// Busca, inserção, remoção: O(log n) em árvore balanceada\n\nclass NoArvore {\n  constructor(valor) {\n    this.valor = valor;\n    this.esquerda = null;\n    this.direita = null;\n  }\n}\n\nclass BST {\n  #raiz = null;\n  \n  inserir(valor) {\n    this.#raiz = this.#inserirRec(this.#raiz, valor);\n  }\n  \n  #inserirRec(no, valor) {\n    if (!no) return new NoArvore(valor);        // encontrou posição vazia\n    if (valor < no.valor) no.esquerda = this.#inserirRec(no.esquerda, valor);\n    else if (valor > no.valor) no.direita = this.#inserirRec(no.direita, valor);\n    return no; // valor duplicado: ignora\n  }\n  \n  buscar(valor) {\n    let atual = this.#raiz;\n    while (atual) {\n      if (valor === atual.valor) return true;\n      atual = valor < atual.valor ? atual.esquerda : atual.direita;\n    }\n    return false;\n  }\n  \n  // In-order traversal: visita ESQ → RAIZ → DIR\n  // Em BST, retorna valores em ordem crescente!\n  emOrdem() {\n    const resultado = [];\n    const percorrer = (no) => {\n      if (!no) return;\n      percorrer(no.esquerda);\n      resultado.push(no.valor);\n      percorrer(no.direita);\n    };\n    percorrer(this.#raiz);\n    return resultado;\n  }\n}\n\nconst bst = new BST();\n[5, 3, 7, 1, 4, 6, 8].forEach(v => bst.inserir(v));\nconsole.log(bst.emOrdem()); // [1, 3, 4, 5, 6, 7, 8] — ordenado!\nconsole.log(bst.buscar(4)); // true\nconsole.log(bst.buscar(9)); // false',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── OS 3 TIPOS DE TRAVERSAL ──────────────────────────\n//        5\n//       / \\\n//      3   7\n//     / \\ / \\\n//    1  4 6  8\n\nfunction inOrder(no, resultado = []) {    // ESQ → RAIZ → DIR\n  if (!no) return resultado;              // Resultado: [1,3,4,5,6,7,8]\n  inOrder(no.esquerda, resultado);\n  resultado.push(no.valor);\n  inOrder(no.direita, resultado);\n  return resultado;\n}\n\nfunction preOrder(no, resultado = []) {   // RAIZ → ESQ → DIR\n  if (!no) return resultado;              // Resultado: [5,3,1,4,7,6,8]\n  resultado.push(no.valor);\n  preOrder(no.esquerda, resultado);\n  preOrder(no.direita, resultado);\n  return resultado;\n}\n\nfunction postOrder(no, resultado = []) {  // ESQ → DIR → RAIZ\n  if (!no) return resultado;              // Resultado: [1,4,3,6,8,7,5]\n  postOrder(no.esquerda, resultado);\n  postOrder(no.direita, resultado);\n  resultado.push(no.valor);\n  return resultado;\n}\n\n// BFS — Busca em Largura (Level Order): usa FILA\n// Visita nível por nível: [5, 3, 7, 1, 4, 6, 8]\nfunction bfs(raiz) {\n  if (!raiz) return [];\n  const fila = [raiz], resultado = [];\n  while (fila.length) {\n    const no = fila.shift();\n    resultado.push(no.valor);\n    if (no.esquerda) fila.push(no.esquerda);\n    if (no.direita)  fila.push(no.direita);\n  }\n  return resultado;\n}\n\n// Altura de uma árvore — recursão elegante\nfunction altura(no) {\n  if (!no) return -1;\n  return 1 + Math.max(altura(no.esquerda), altura(no.direita));\n}',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── PROBLEMAS CLÁSSICOS COM ÁRVORES ─────────────────\n\n// 1. Verificar se árvore é BST válida\nfunction ehBSTValida(no, min = -Infinity, max = Infinity) {\n  if (!no) return true;\n  if (no.valor <= min || no.valor >= max) return false;\n  return ehBSTValida(no.esquerda, min, no.valor) &&\n         ehBSTValida(no.direita, no.valor, max);\n}\n\n// 2. Menor ancestral comum (LCA) em BST\nfunction menorAncestralComum(raiz, p, q) {\n  if (!raiz) return null;\n  // Em BST: se ambos menores → vai para esquerda\n  if (p < raiz.valor && q < raiz.valor) return menorAncestralComum(raiz.esquerda, p, q);\n  // Se ambos maiores → vai para direita\n  if (p > raiz.valor && q > raiz.valor) return menorAncestralComum(raiz.direita, p, q);\n  // Senão, a raiz atual É o ancestral comum\n  return raiz.valor;\n}\n\n// 3. Converter array ordenado em BST balanceada\nfunction arrayParaBST(nums) {\n  if (!nums.length) return null;\n  const meio = Math.floor(nums.length / 2);\n  const no = new NoArvore(nums[meio]);\n  no.esquerda = arrayParaBST(nums.slice(0, meio));\n  no.direita  = arrayParaBST(nums.slice(meio + 1));\n  return no;\n}\n\n// Teste\nconst raizBalanceada = arrayParaBST([1, 2, 3, 4, 5, 6, 7]);\nconsole.log("Altura:", altura(raizBalanceada)); // 2 — perfeitamente balanceada!',
          },
          {
            type: 'highlight',
            content: '🌳 Por que árvores importam para fullstack? O DOM que o browser manipula é uma árvore — entender traversal explica como React reconcilia o Virtual DOM. Bancos de dados usam B-Trees para índices — entender árvores explica por que adicionar índice em colunas de busca acelera queries dramaticamente.',
          },
        ],
        exercise: {
          title: 'Validar e calcular propriedades de árvore',
          description: 'Dado um objeto representando uma árvore binária, implemente: (1) contarNos(raiz) — conta total de nós, (2) somaFolhas(raiz) — soma apenas os valores das folhas, (3) ehSimetrica(raiz) — verifica se a árvore é espelho de si mesma.',
          starterCode: '// Estrutura de nó\nconst raiz = {\n  valor: 1,\n  esquerda: {\n    valor: 2,\n    esquerda: { valor: 3, esquerda: null, direita: null },\n    direita:  { valor: 4, esquerda: null, direita: null },\n  },\n  direita: {\n    valor: 2,\n    esquerda: { valor: 4, esquerda: null, direita: null },\n    direita:  { valor: 3, esquerda: null, direita: null },\n  },\n};\n\nfunction contarNos(no) {\n  // Caso base: no nulo retorna 0\n  // Recursão: 1 + contar esquerda + contar direita\n}\n\nfunction somaFolhas(no) {\n  // Folha: no sem filhos\n  // Recursão: percorra toda a árvore somando apenas folhas\n}\n\nfunction ehSimetrica(raiz) {\n  // Helper: verifica se dois nós são espelhos um do outro\n  // Dois nós são espelho se: valores iguais E\n  //   esq.esquerda espelha dir.direita E\n  //   esq.direita  espelha dir.esquerda\n  function espelho(esq, dir) {\n    // Implemente aqui\n  }\n  return !raiz || espelho(raiz.esquerda, raiz.direita);\n}\n\nconsole.log("Nós:", contarNos(raiz));        // 7\nconsole.log("Soma folhas:", somaFolhas(raiz)); // 3+4+4+3 = 14\nconsole.log("Simétrica:", ehSimetrica(raiz)); // true\n',
          solutionHint: 'contarNos: if !no return 0; return 1 + contarNos(esq) + contarNos(dir) | espelho: if !e && !d return true; if !e || !d return false; e.valor===d.valor && espelho(e.esq,d.dir) && espelho(e.dir,d.esq)',
          validate: (output, code) => {
            return output.includes('Nós: 7') &&
              output.includes('Soma folhas: 14') &&
              output.includes('Simétrica: true');
          },
          validateMessage: 'Exiba: Nós: 7, Soma folhas: 14, Simétrica: true.',
        },
        quiz: [
          { question: 'Qual propriedade define uma Árvore Binária de Busca?', options: ['Cada nó tem exatamente 2 filhos', 'Para cada nó: todos os valores à esquerda são menores, todos à direita são maiores', 'A árvore é sempre balanceada', 'Os valores são únicos'], correct: 1, explanation: 'BST: nó.esquerda < nó.valor < nó.direita, para todos os nós. Essa propriedade permite busca O(log n) — a cada comparação, você elimina metade da árvore.' },
          { question: 'In-order traversal de uma BST retorna os valores em qual ordem?', options: ['Ordem de inserção', 'Ordem decrescente', 'Ordem crescente', 'Aleatória'], correct: 2, explanation: 'In-order (ESQ → RAIZ → DIR) em uma BST sempre retorna valores em ordem crescente. É por isso que BST pode ser usada como estrutura de ordenação dinâmica.' },
          { question: 'Qual traversal usa uma fila (BFS)?', options: ['In-order', 'Pre-order', 'Post-order', 'Level-order (BFS)'], correct: 3, explanation: 'BFS (Breadth-First Search / Level-order) visita nível por nível usando uma fila. DFS (in/pre/post-order) usa recursão (que usa a pilha de chamadas implicitamente).' },
          { question: 'Por que banco de dados usa B-Tree para índices?', options: ['B-Tree usa menos espaço', 'B-Tree mantém dados ordenados e permite busca O(log n), mesmo com inserções e remoções frequentes', 'B-Tree é mais simples de implementar', 'B-Tree funciona só com números'], correct: 1, explanation: 'B-Tree é uma BST balanceada generalizada. Índices de banco precisam de busca rápida E inserção/remoção eficiente. B-Tree garante O(log n) para todas as operações, mesmo após muitas modificações.' },
          { question: 'O que é uma árvore degenerada?', options: ['Árvore com valores duplicados', 'Árvore onde cada nó tem apenas um filho — efetivamente uma lista ligada, O(n) em vez de O(log n)', 'Árvore com altura 0', 'Árvore com mais de 2 filhos por nó'], correct: 1, explanation: 'Inserir valores em ordem crescente numa BST cria uma árvore degenerada: cada nó só tem filho direito. A busca vira O(n). Árvores auto-balanceadas (AVL, Red-Black) evitam isso.' },
        ],
      },
    },
    {
      id: 'mod-17-6',
      title: 'Recursão e Programação Dinâmica',
      duration: '60 min',
      xp: 270,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Recursão é uma função que chama a si mesma para resolver um problema menor. Programação Dinâmica (DP) é recursão com memória — evita recalcular o mesmo subproblema duas vezes. DP aparece em problemas de otimização do mundo real: cálculo de rotas, previsão de preços, compressão de dados, alinhamento de sequências de DNA.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── ANATOMIA DE UMA RECURSÃO ─────────────────────────\n// Toda recursão precisa de:\n// 1. CASO BASE — condição de parada (sem isso: stack overflow)\n// 2. CASO RECURSIVO — problema menor que converge para o caso base\n\n// Exemplo clássico: Fibonacci\n// F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)\n\n// Versão ingênua — O(2ⁿ): LENTA\nfunction fibLento(n) {\n  if (n <= 1) return n;                  // caso base\n  return fibLento(n-1) + fibLento(n-2); // recalcula tudo!\n  // fibLento(5) chama fibLento(4) e fibLento(3)\n  // fibLento(4) chama fibLento(3) e fibLento(2)\n  // fibLento(3) é calculado DUAS vezes — e o problema piora exponencialmente\n}\n\n// Memoização (Top-Down DP) — O(n): RÁPIDA\nfunction fibMemo(n, memo = new Map()) {\n  if (n <= 1) return n;\n  if (memo.has(n)) return memo.get(n);  // resultado já calculado!\n  const resultado = fibMemo(n-1, memo) + fibMemo(n-2, memo);\n  memo.set(n, resultado);               // guarda para reuso\n  return resultado;\n}\n\n// Tabulação (Bottom-Up DP) — O(n), O(1) espaço: ÓTIMA\nfunction fibDP(n) {\n  if (n <= 1) return n;\n  let anterior = 0, atual = 1;\n  for (let i = 2; i <= n; i++) {\n    [anterior, atual] = [atual, anterior + atual];\n  }\n  return atual;\n}\n\nconsole.log(fibDP(10));  // 55\nconsole.log(fibDP(50));  // 12586269025 — instantâneo!',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── PROBLEMAS CLÁSSICOS DE DP ────────────────────────\n\n// 1. Problema da Mochila (Knapsack)\n// n itens com peso e valor, mochila com capacidade máxima\n// Maximize o valor sem exceder o peso\nfunction knapsack(itens, capacidade) {\n  const n = itens.length;\n  // dp[i][c] = máximo valor com os primeiros i itens e capacidade c\n  const dp = Array.from({length: n+1}, () => new Array(capacidade+1).fill(0));\n  \n  for (let i = 1; i <= n; i++) {\n    const { peso, valor } = itens[i-1];\n    for (let c = 0; c <= capacidade; c++) {\n      dp[i][c] = dp[i-1][c]; // não pega o item\n      if (c >= peso) {        // pode pegar o item?\n        dp[i][c] = Math.max(dp[i][c], dp[i-1][c-peso] + valor);\n      }\n    }\n  }\n  return dp[n][capacidade];\n}\n\nconst itens = [{peso:1,valor:1},{peso:3,valor:4},{peso:4,valor:5},{peso:5,valor:7}];\nconsole.log(knapsack(itens, 7)); // 9 (itens 2 e 4: peso 3+4=7, valor 4+5=9)\n\n// 2. Maior Subsequência Comum (LCS)\n// Clássico em diff de arquivos e comparação de DNA\nfunction lcs(s1, s2) {\n  const m = s1.length, n = s2.length;\n  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));\n  \n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (s1[i-1] === s2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;\n      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n    }\n  }\n  return dp[m][n];\n}\nconsole.log(lcs("ABCBDAB", "BDCABA")); // 4 (BCBA ou BDAB)',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── QUANDO USAR DP — OS 2 SINAIS ─────────────────────\n// 1. SUBPROBLEMAS SOBREPOSTOS: o mesmo subproblema aparece múltiplas vezes\n// 2. SUBESTRUTURA ÓTIMA: a solução ótima contém soluções ótimas de subproblemas\n\n// Troco mínimo (Coin Change) — problema clássico de DP\n// Dado array de moedas e um valor, ache o mínimo de moedas para formar o valor\nfunction trocoMinimo(moedas, valor) {\n  // dp[i] = mínimo de moedas para formar o valor i\n  const dp = new Array(valor + 1).fill(Infinity);\n  dp[0] = 0; // caso base: 0 moedas para formar 0\n  \n  for (let i = 1; i <= valor; i++) {\n    for (const moeda of moedas) {\n      if (moeda <= i && dp[i - moeda] + 1 < dp[i]) {\n        dp[i] = dp[i - moeda] + 1;\n      }\n    }\n  }\n  return dp[valor] === Infinity ? -1 : dp[valor];\n}\n\nconsole.log(trocoMinimo([1, 5, 10, 25], 41)); // 4 (25+10+5+1)\nconsole.log(trocoMinimo([2], 3));              // -1 (impossível)\nconsole.log(trocoMinimo([1, 2, 5], 11));      // 3 (5+5+1)\n\n// ── BACKTRACKING — quando DP não se aplica ───────────\n// Explore todas as possibilidades, abandone caminhos inválidos\nfunction permutacoes(nums) {\n  const resultado = [];\n  function backtrack(atual, restantes) {\n    if (!restantes.length) { resultado.push([...atual]); return; }\n    for (let i = 0; i < restantes.length; i++) {\n      atual.push(restantes[i]);\n      backtrack(atual, [...restantes.slice(0,i), ...restantes.slice(i+1)]);\n      atual.pop(); // desfaz a escolha\n    }\n  }\n  backtrack([], nums);\n  return resultado;\n}\nconsole.log(permutacoes([1,2,3]).length); // 6 permutações',
          },
          {
            type: 'highlight',
            content: '🧩 Como identificar um problema de DP: se você se pega pensando "e se eu soubesse a resposta para um problema menor?" — é DP. Os passos: (1) defina o subproblema, (2) encontre a recorrência, (3) identifique o caso base, (4) implemente top-down (memo) ou bottom-up (tabela). Bottom-up geralmente é mais eficiente em memória.',
          },
        ,
                  {
                    type: 'common_error',
                    title: 'Usar Array para lookup quando Set/Map é O(1)',
                    wrong: `// Verificar duplicatas
const vistos = [];

for (const item of dados) {
  if (vistos.includes(item)) { // O(n) a cada checagem!
    console.log("duplicata:", item);
  }
  vistos.push(item);
}
// Total: O(n²) por causa do includes()`,
                    wrongLabel: 'Array.includes() percorre todos os elementos: O(n) por chamada.',
                    right: `// Mesma lógica com Set
const vistos = new Set();

for (const item of dados) {
  if (vistos.has(item)) { // O(1) sempre!
    console.log("duplicata:", item);
  }
  vistos.add(item);
}
// Total: O(n) — muito mais rápido`,
                    rightLabel: 'Set.has() e Map.get() são O(1): não importa quantos elementos existam.',
                    explanation: 'Regra prática: se precisa checar existência repetidamente, use Set. Se precisa associar chave → valor, use Map. Arrays são para acesso por índice e iteração sequencial — não para busca.',
                  }],
        exercise: {
          title: 'Formas de subir escada',
          description: 'Você está subindo uma escada com n degraus. A cada passo, você pode subir 1 ou 2 degraus. Quantas formas distintas existem de chegar ao topo? Implemente usando: (1) recursão pura — mostre por que é lenta, (2) memoização — O(n), (3) DP iterativa — O(n) tempo, O(1) espaço. Teste com n=1,2,5,10,45.',
          starterCode: '// Versão recursiva pura — O(2ⁿ)\nfunction escadaLenta(n) {\n  if (n <= 1) return 1;\n  if (n === 2) return 2;\n  return escadaLenta(n-1) + escadaLenta(n-2);\n}\n\n// Versão com memoização — O(n)\nfunction escadaMemo(n, memo = {}) {\n  // Implemente usando um objeto memo\n}\n\n// Versão DP iterativa — O(n) tempo, O(1) espaço\nfunction escadaDP(n) {\n  // Use apenas duas variáveis (sem array)\n  // Similar ao Fibonacci iterativo\n}\n\n// Testes\n[1, 2, 5, 10, 45].forEach(n => {\n  console.log(`n=${n}: ${escadaDP(n)}`);\n});\n\n// Bônus: valide que as 3 versões concordam para n=1..10\nconst concordam = [1,2,3,4,5,6,7,8,9,10].every(n =>\n  escadaLenta(n) === escadaMemo(n) && escadaMemo(n) === escadaDP(n)\n);\nconsole.log("Todas concordam:", concordam);\n',
          solutionHint: 'escadaDP: if n<=2 return n; let a=1,b=2; for i=3..n: [a,b]=[b,a+b]; return b',
          validate: (output, code) => {
                  return output.includes('3') && output.includes('4') &&
              (output.includes('[1, 4]') || (output.includes('1') && output.includes('4'))) &&
              (code.includes('new Map') || code.includes('new Set') || code.includes('Map()') || code.includes('Set()'));
                },
          validateMessage: 'Use Map ou Set para resolver em O(n). Não use nested for loops.',
        },
        quiz: [
          { question: 'Qual a diferença entre memoização e tabulação em DP?', options: ['São a mesma coisa', 'Memoização é top-down (recursivo + cache); tabulação é bottom-up (iterativo, constrói do menor para o maior)', 'Tabulação é mais fácil', 'Memoização usa mais memória sempre'], correct: 1, explanation: 'Top-down (memo): resolve recursivamente, guarda resultados. Começa do problema grande, vai para o menor. Bottom-up (tabela): começa pelos casos base, constrói a resposta iterativamente. Bottom-up geralmente tem menos overhead de chamadas de função.' },
          { question: 'Qual o sinal de que um problema tem subproblemas sobrepostos?', options: ['O problema é muito difícil', 'A mesma chamada recursiva com os mesmos parâmetros aparece múltiplas vezes na árvore de recursão', 'O input é um array', 'A solução é O(n²)'], correct: 1, explanation: 'Subproblemas sobrepostos: fib(5) chama fib(4) e fib(3); fib(4) também chama fib(3) — fib(3) é calculado duas vezes. Memoização resolve isso: na segunda chamada, retorna o valor já calculado.' },
          { question: 'Por que backtracking é diferente de DP?', options: ['Backtracking é mais lento sempre', 'Backtracking explora todas as possibilidades e desfaz escolhas ruins; DP armazena resultados de subproblemas — backtracking não tem subproblemas sobrepostos', 'DP usa recursão, backtracking não', 'Não há diferença'], correct: 1, explanation: 'DP funciona quando há subestrutura ótima e subproblemas sobrepostos. Backtracking é para problemas de busca/enumeração (permutações, sudoku, n-rainhas) onde você testa possibilidades e volta atrás quando encontra beco sem saída.' },
          { question: 'Qual a complexidade do Fibonacci com memoização?', options: ['O(2ⁿ)', 'O(n²)', 'O(n) tempo e O(n) espaço', 'O(1)'], correct: 2, explanation: 'Com memoização: cada valor de 0 a n é calculado exatamente uma vez — O(n) tempo. O mapa de memoização armazena n valores — O(n) espaço. A versão iterativa (tabela) é O(n) tempo e O(1) espaço.' },
          { question: 'O problema do troco mínimo (coin change) usa DP por quê?', options: ['Porque envolve dinheiro', 'Porque tem subestrutura ótima: a solução ótima para valor V usa a solução ótima para V-moeda', 'Porque é difícil', 'Porque usa array'], correct: 1, explanation: 'Subestrutura ótima: trocoMinimo(11) = 1 + trocoMinimo(6) = 1 + 1 + trocoMinimo(1) = 3 moedas. A solução ótima para 11 contém a solução ótima para 6. Isso é subestrutura ótima — DP se aplica.' },
        ],
      },
    },
    {
      id: 'mod-17-7',
      title: 'Ordenação e Busca',
      duration: '50 min',
      xp: 240,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Ordenação e busca são os algoritmos mais estudados em ciência da computação — e com razão. Dados ordenados permitem busca binária O(log n). Entender os algoritmos de ordenação ensina padrões de design (dividir e conquistar, in-place vs out-of-place) que aparecem em problemas muito mais complexos.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── BUBBLE SORT — O(n²) — entender, não usar ────────\n// Compara pares adjacentes e troca se fora de ordem\n// Útil para aprender o conceito, inaceitável em produção\nfunction bubbleSort(arr) {\n  const a = [...arr];\n  for (let i = 0; i < a.length; i++) {\n    let trocou = false;\n    for (let j = 0; j < a.length - i - 1; j++) {\n      if (a[j] > a[j+1]) {\n        [a[j], a[j+1]] = [a[j+1], a[j]];\n        trocou = true;\n      }\n    }\n    if (!trocou) break; // já ordenado — otimização\n  }\n  return a;\n}\n\n// ── MERGE SORT — O(n log n) — dividir e conquistar ───\n// Divide recursivamente até arrays de 1 elemento, então merge\n// Estável (preserva ordem relativa de iguais), O(n) espaço extra\nfunction mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const meio = Math.floor(arr.length / 2);\n  const esq = mergeSort(arr.slice(0, meio));\n  const dir = mergeSort(arr.slice(meio));\n  return merge(esq, dir);\n}\n\nfunction merge(esq, dir) {\n  const resultado = [];\n  let i = 0, j = 0;\n  while (i < esq.length && j < dir.length) {\n    if (esq[i] <= dir[j]) resultado.push(esq[i++]);\n    else resultado.push(dir[j++]);\n  }\n  return [...resultado, ...esq.slice(i), ...dir.slice(j)];\n}\n\nconsole.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));\n// [3, 9, 10, 27, 38, 43, 82]',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── QUICK SORT — O(n log n) médio, O(n²) pior caso ──\n// Escolhe um pivô, particiona: menores à esquerda, maiores à direita\n// In-place, O(log n) espaço na pilha — preferido na prática\nfunction quickSort(arr, esq = 0, dir = arr.length - 1) {\n  if (esq >= dir) return arr;\n  const pivoIdx = particionar(arr, esq, dir);\n  quickSort(arr, esq, pivoIdx - 1);\n  quickSort(arr, pivoIdx + 1, dir);\n  return arr;\n}\n\nfunction particionar(arr, esq, dir) {\n  const pivo = arr[dir]; // último elemento como pivô\n  let i = esq - 1;\n  for (let j = esq; j < dir; j++) {\n    if (arr[j] <= pivo) {\n      i++;\n      [arr[i], arr[j]] = [arr[j], arr[i]];\n    }\n  }\n  [arr[i+1], arr[dir]] = [arr[dir], arr[i+1]];\n  return i + 1;\n}\n\n// ── BUSCA BINÁRIA — O(log n) ──────────────────────────\n// REQUER array ordenado. A cada passo elimina metade.\nfunction buscaBinaria(arr, alvo) {\n  let esq = 0, dir = arr.length - 1;\n  while (esq <= dir) {\n    const meio = Math.floor((esq + dir) / 2);\n    if (arr[meio] === alvo) return meio;      // encontrou!\n    if (arr[meio] < alvo)  esq = meio + 1;   // vai para direita\n    else                   dir = meio - 1;   // vai para esquerda\n  }\n  return -1; // não encontrado\n}\n\nconst ordenado = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];\nconsole.log(buscaBinaria(ordenado, 7));  // 3 (índice)\nconsole.log(buscaBinaria(ordenado, 10)); // -1 (não existe)',
          },
          {
            type: 'code',
            lang: 'javascript',
            content: '// ── QUANDO USAR CADA ALGORITMO ───────────────────────\n\n// Array pequeno (< 10 elementos) → Insertion Sort\n// Dados quase ordenados → Insertion Sort ou Bubble Sort\n// Precisa de estabilidade → Merge Sort\n// Performance geral (não precisa de estabilidade) → Quick Sort\n// Dados muito grandes em disco → Merge Sort (bom para I/O)\n// JavaScript .sort() → TimSort (Merge + Insertion, O(n log n) garantido)\n\n// ── COMPARAÇÃO DE PERFORMANCE REAL ───────────────────\nconst TAMANHO = 10000;\nconst aleatorio = Array.from({length: TAMANHO}, () => Math.random() * 10000 | 0);\n\nconst t1 = performance.now();\nmergeSort([...aleatorio]);\nconsole.log("MergeSort:", Math.round(performance.now() - t1), "ms");\n\nconst t2 = performance.now();\n[...aleatorio].sort((a, b) => a - b);\nconsole.log("Native sort (TimSort):", Math.round(performance.now() - t2), "ms");\n\n// ── BUSCA BINÁRIA AVANÇADA: LIMITE INFERIOR ───────────\n// Encontra a PRIMEIRA posição onde poderia inserir alvo\nfunction limitInferior(arr, alvo) {\n  let esq = 0, dir = arr.length;\n  while (esq < dir) {\n    const meio = Math.floor((esq + dir) / 2);\n    if (arr[meio] < alvo) esq = meio + 1;\n    else dir = meio;\n  }\n  return esq;\n}\n\nconst arr = [1, 3, 3, 5, 7];\nconsole.log(limitInferior(arr, 3)); // 1 — primeira ocorrência de 3\nconsole.log(limitInferior(arr, 4)); // 3 — onde 4 seria inserido',
          },
          {
            type: 'highlight',
            content: '⚡ Na prática: use sempre o .sort() nativo do JavaScript — ele é implementado em C++ com TimSort e é mais rápido que qualquer implementação JS. Estude os algoritmos para entender os padrões (dividir e conquistar, two pointers, particionamento) — esses padrões reaparecem em outros problemas.',
          },
        ],
        exercise: {
          title: 'Busca binária em rotação',
          description: 'Um array ordenado foi rotacionado: [4,5,6,7,0,1,2]. Implemente buscarEmRotacionado(arr, alvo) que encontra o índice do alvo em O(log n) — sem ordenar o array. Dica: metade do array sempre está ordenada. Use isso para decidir para qual lado ir.',
          starterCode: 'function buscarEmRotacionado(arr, alvo) {\n  let esq = 0, dir = arr.length - 1;\n  \n  while (esq <= dir) {\n    const meio = Math.floor((esq + dir) / 2);\n    \n    if (arr[meio] === alvo) return meio;\n    \n    // Descubra qual metade está ordenada\n    // Se arr[esq] <= arr[meio]: metade esquerda está ordenada\n    //   Se alvo está nela: vá para esquerda\n    //   Senão: vá para direita\n    // Senão: metade direita está ordenada\n    //   Se alvo está nela: vá para direita\n    //   Senão: vá para esquerda\n  }\n  \n  return -1;\n}\n\n// Testes\nconsole.log(buscarEmRotacionado([4,5,6,7,0,1,2], 0)); // 4\nconsole.log(buscarEmRotacionado([4,5,6,7,0,1,2], 3)); // -1\nconsole.log(buscarEmRotacionado([1], 0));              // -1\nconsole.log(buscarEmRotacionado([1], 1));              // 0\nconsole.log(buscarEmRotacionado([3,1], 1));            // 1\n',
          solutionHint: 'if arr[esq]<=arr[meio]: esquerda ordenada. if alvo>=arr[esq] && alvo<arr[meio]: dir=meio-1; else esq=meio+1',
          validate: (output, code) => {
            const lines = output.trim().split('\n').map(l => l.trim());
            return lines[0] === '4' && lines[1] === '-1' &&
              lines[2] === '-1' && lines[3] === '0' && lines[4] === '1';
          },
          validateMessage: 'Retorne: 4, -1, -1, 0, 1 para os 5 casos de teste.',
        },
        quiz: [
          { question: 'Por que Merge Sort é O(n log n)?', options: ['Porque usa recursão', 'Divide o array log(n) vezes e cada divisão faz O(n) trabalho de merge', 'Porque é mais rápido que O(n²)', 'Porque usa mais memória'], correct: 1, explanation: 'Merge Sort divide recursivamente — profundidade log(n). Em cada nível, o merge percorre todos os elementos — O(n). Total: O(n) × O(log n) = O(n log n). Isso é inevitável para ordenação por comparação.' },
          { question: 'Qual a diferença entre algoritmo estável e instável de ordenação?', options: ['Estável é mais rápido', 'Estável preserva a ordem relativa de elementos iguais; instável não garante isso', 'Instável usa mais memória', 'Não há diferença prática'], correct: 1, explanation: 'Estabilidade importa quando você ordena objetos por múltiplos critérios. Ex: ordenar por nome, depois por departamento. Se o algoritmo é estável, dentro do mesmo departamento os nomes permanecem na ordem anterior.' },
          { question: 'Por que busca binária requer array ordenado?', options: ['Por convenção', 'Porque depende de eliminar metade dos elementos a cada passo — só funciona se você sabe que o alvo está numa das metades', 'Porque é recursiva', 'Por limitação de memória'], correct: 1, explanation: 'Busca binária decide ir para esquerda ou direita baseada na comparação com o meio. Em array não ordenado, você não sabe de que lado o alvo está — a decisão seria incorreta.' },
          { question: 'Qual o pior caso do Quick Sort e por quê?', options: ['O(n log n) sempre', 'O(n²) quando o pivô é sempre o menor ou maior elemento — ex: array já ordenado', 'O(n) com pivô aleatório', 'O(log n) sempre'], correct: 1, explanation: 'Se o pivô é sempre o extremo, a partição é completamente desequilibrada — n-1 elementos de um lado, 0 do outro. Isso se repete n vezes: O(n²). Solução: pivô aleatório ou "mediana de três".' },
          { question: 'O que é dividir e conquistar?', options: ['Dividir o time de desenvolvimento', 'Quebrar um problema em subproblemas menores, resolver cada um, combinar os resultados', 'Um algoritmo específico', 'Programação paralela'], correct: 1, explanation: 'Dividir e conquistar: (1) Divide o problema em subproblemas menores, (2) Resolve cada subproblema recursivamente, (3) Combina as soluções. Merge Sort, Quick Sort, busca binária e muitos outros seguem esse padrão.' },
        ],
      },
    },{
    id: 'mod-17-8',
    title: 'Como se Sair Bem em Entrevistas Técnicas de Algoritmos',
    duration: '45 min',
    xp: 220,
    content: {
      sections: [
        { type: 'text', content: 'Saber resolver o problema não é suficiente — entrevistadores avaliam como você pensa em voz alta. Empresas como Nubank, iFood, Mercado Livre, e todas as big techs usam o formato de coding interview: 45 minutos, um problema, você e o entrevistador. Quem domina o ritual tem vantagem enorme independente do nível técnico.' },
        { type: 'code', lang: 'javascript', content: '// ── O RITUAL DOS 5 PASSOS ─────────────────────────────\n// Cada passo tem um objetivo e falas esperadas\n\n// PASSO 1: CLARIFICAR (2-3 min)\n// Nunca comece a codar imediatamente. Pergunte antes:\n// "O array pode ter números negativos?"\n// "O input pode ser vazio ou null?"\n// "Preciso considerar duplicatas?"\n// "Qual o tamanho esperado do input? (impacta complexidade)"\n// "Posso usar estruturas auxiliares de memoria?"\n\n// PASSO 2: EXEMPLOS (2 min)\n// Crie 2-3 exemplos manualmente, incluindo edge cases:\n// Input normal: [2,7,11,15], target=9 -> [0,1]\n// Array vazio: [] -> []\n// Um elemento: [5], target=5 -> sem par\n\n// PASSO 3: FORCA BRUTA PRIMEIRO (1 min)\n// Sempre mencione a solucao O(n²) antes de otimizar:\n// "A solucao mais simples seria dois loops aninhados, O(n²)."\n// "Posso otimizar isso para O(n) usando um Map."\n// Isso mostra que voce conhece trade-offs\n\n// PASSO 4: OTIMIZAR E CODAR (20-25 min)\n// Explique enquanto escreve:\n// "Vou usar um Map para guardar os complementos ja vistos..."\nfunction doisNumeros(nums, target) {\n  const vistos = new Map(); // valor -> indice\n  for (let i = 0; i < nums.length; i++) {\n    const complemento = target - nums[i];\n    if (vistos.has(complemento)) {\n      return [vistos.get(complemento), i];\n    }\n    vistos.set(nums[i], i);\n  }\n  return [];\n}\n\n// PASSO 5: ANALISAR (2 min)\n// "Complexidade de tempo: O(n) - um pass no array"\n// "Complexidade de espaco: O(n) - o Map pode ter n entradas"\n// "Edge cases que cobri: array vazio retorna [], sem par valido retorna []"' },
        { type: 'code', lang: 'javascript', content: '// ── FRASES QUE IMPRESSIONAM ──────────────────────────\n\n// Ao comecar:\n// "Deixa eu verificar: [repetir o problema com suas palavras]."\n// "Antes de comecar, quero garantir que entendi os constraints."\n\n// Ao pensar:\n// "Hmm, minha primeira ideia e usar [X], mas isso seria O(n²)."\n// "Se eu usar um Set aqui, consigo reduzir para O(1) por lookup."\n// "Estou pensando em dois ponteiros — funciona porque o array e ordenado."\n\n// Ao codar:\n// "Vou nomear essa variavel [nome descritivo] para ficar claro."\n// "Preciso tratar o caso em que [edge case] — vou adicionar essa verificacao."\n\n// Ao terminar:\n// "Deixa eu rodar pelo meu exemplo manualmente: [tracing]."\n// "Complexidade de tempo O(n), espaco O(1) porque [razao]."\n// "Uma melhoria possivel seria [X], mas priorizei legibilidade aqui."\n\n// Quando travar:\n// "Estou pensando em voz alta — uma opcao seria [X], outra seria [Y]."\n// "Posso comecar com uma solucao subotima e otimizar depois?"\n// "Qual aspecto voce quer que eu foque primeiro?"\n// Silencio prolongado = sinal ruim. Falar sobre o que voce NAO sabe = sinal otimo.' },
        { type: 'code', lang: 'javascript', content: '// ── PATTERNS MAIS COBRADOS — RECONHECIMENTO RAPIDO ──\n\n// 1. TWO POINTERS — arrays ordenados, palindromes\n// Sinal: "encontre par/subarray com condicao"\nfunction temParSomandoTarget(arr, target) {\n  let esq = 0, dir = arr.length - 1;\n  while (esq < dir) {\n    const soma = arr[esq] + arr[dir];\n    if (soma === target) return true;\n    soma < target ? esq++ : dir--;\n  }\n  return false;\n}\n\n// 2. SLIDING WINDOW — substrings/subarrays contiguos\n// Sinal: "maior/menor subarray com propriedade X"\nfunction maiorSomaSub(arr, k) {\n  let soma = arr.slice(0, k).reduce((a, b) => a + b, 0);\n  let max = soma;\n  for (let i = k; i < arr.length; i++) {\n    soma += arr[i] - arr[i - k];\n    max = Math.max(max, soma);\n  }\n  return max;\n}\n\n// 3. HASH MAP — frequencia, pares, grupos\n// Sinal: "encontre X que aparece Y vezes" ou "verifique se existe"\n\n// 4. BFS/DFS — arvores, grafos, matrizes\n// Sinal: "menor caminho", "todos os caminhos", "componentes conectados"\n\n// 5. DYNAMIC PROGRAMMING — subproblemas otimos\n// Sinal: "maximo/minimo", "quantas formas", "pode chegar em X"\n\nconsole.log(temParSomandoTarget([1,2,4,6,8,10], 10)); // true\nconsole.log(maiorSomaSub([2,3,4,1,5], 3));            // 10 (3+4+1 nao, 4+1+5=10)' },
        { type: 'highlight', content: '📊 Dados reais do mercado BR 2024: Nubank, iFood, Mercado Livre e PagSeguro usam LeetCode-style interviews. Vagas internacionais remotas (Toptal, Turing, companies hiring from LATAM) quase sempre incluem algoritmos. Vagas de produto BR (fintechs menores, agências) raramente pedem algoritmos — focam em projetos e system design. Saiba para qual tipo de empresa você está aplicando antes de dedicar semanas a LeetCode.' },
        {
          type: 'common_error',
          title: 'Comecar a codar imediatamente sem clarificar',
          wrong: '// Entrevistador: "dado um array de inteiros, encontre dois numeros que somem target"\n// Dev: [começa a codar imediatamente]\nfunction doisNumeros(nums, target) {\n  // 10 minutos depois: "hmm, e se tiver duplicatas?"\n  // "e se o array for vazio?"\n  // Reescreve tudo. Tempo perdido. Nervosismo.',
          wrongLabel: 'Codar sem clarificar leva a reescritas, bugs em edge cases, e transmite falta de maturidade.',
          right: '// "Posso fazer algumas perguntas antes de comecar?"\n// "O array pode ter negativos? Duplicatas? Qual o tamanho maximo?"\n// "O que retorno se nao houver par valido?"\n// [So entao comeca a codar — com confianca, sem surpresas]',
          rightLabel: '2-3 minutos de clarificacao economizam 15 minutos de reescrita e mostram pensamento sistematico.',
          explanation: 'Entrevistadores avaliam processo, nao so resultado. Clarificar antes mostra que voce pensa antes de agir — qualidade essencial em codigo de producao.',
        },
      ],
      exercise: {
        title: 'Resolver e explicar: Two Sum com tracing manual',
        description: 'Implemente doisNumeros(nums, target) retornando os indices dos dois numeros que somam o target. Depois implemente traceDoisNumeros(nums, target) que faz o mesmo mas imprime cada passo como voce explicaria numa entrevista: o estado atual do Map, o complemento procurado, e quando encontra o par.',
        solutionHint: 'doisNumeros: Map de valor->indice, para cada elemento calcula complemento = target - nums[i], verifica se esta no Map. traceDoisNumeros: adiciona console.log antes de cada decisao.',
        starterCode: 'function doisNumeros(nums, target) {\n  const vistos = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complemento = target - nums[i];\n    if (vistos.has(complemento)) {\n      return [vistos.get(complemento), i];\n    }\n    vistos.set(nums[i], i);\n  }\n  return [];\n}\n\nfunction traceDoisNumeros(nums, target) {\n  console.log(\'Problema: encontrar dois indices que somam\', target);\n  console.log(\'Input:\', nums);\n  const vistos = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complemento = target - nums[i];\n    console.log(\'\\ni =\', i, \'| nums[i] =\', nums[i], \'| complemento =\', complemento);\n    if (vistos.has(complemento)) {\n      console.log(\'ENCONTRADO! complemento\', complemento, \'estava no Map no indice\', vistos.get(complemento));\n      return [vistos.get(complemento), i];\n    }\n    vistos.set(nums[i], i);\n    console.log(\'Map atual:\', JSON.stringify([...vistos]));\n  }\n  console.log(\'Sem par encontrado\');\n  return [];\n}\n\n// Testes doisNumeros\nconsole.log(doisNumeros([2,7,11,15], 9));  // [0,1]\nconsole.log(doisNumeros([3,2,4], 6));       // [1,2]\nconsole.log(doisNumeros([1,2,3], 10));      // []\n\n// Trace explicado\nconsole.log(\'\\n=== TRACE ===\');\ntraceDoisNumeros([2,7,11], 9);\n',
        validate: (output) => output.includes('[0,1]') && output.includes('[1,2]') && output.includes('ENCONTRADO'),
        validateMessage: 'Exiba: [0,1], [1,2], e a palavra ENCONTRADO no trace.',
      },
      quiz: [
        { question: 'Por que clarificar constraints antes de codar e importante?', options: ['Para ganhar tempo', 'Mostra pensamento sistematico, evita reescritas e garante que a solucao cobre edge cases relevantes', 'E obrigatorio em todas as empresas', 'Para impressionar o entrevistador com perguntas'], correct: 1, explanation: 'Clarificar antes e como planejar antes de construir. Descubrir mid-coding que o array pode ter negativos e como descobrir mid-obra que precisa de uma janela extra — caro e estressante.' },
        { question: 'Qual o proposito de mencionar a solucao O(n²) antes de otimizar?', options: ['Mostrar que voce sabe a solucao ruim', 'Demonstrar que voce entende trade-offs e esta progredindo — de correto para eficiente', 'E uma obrigacao em todas as entrevistas', 'Preencher tempo na entrevista'], correct: 1, explanation: 'Entrevistadores querem ver o raciocinio de otimizacao. "Minha primeira ideia e O(n²), mas posso melhorar para O(n) usando um Map" mostra evolucao consciente — mais valioso que ir direto para a solucao otima.' },
        { question: 'O que fazer quando travar no meio de uma entrevista?', options: ['Ficar em silencio e pensar', 'Verbalizar o que voce sabe e o que esta tentando descobrir — "Estou pensando em X, a dificuldade e Y"', 'Pedir para pular a pergunta', 'Comecar de novo do zero'], correct: 1, explanation: 'Silencio prolongado e ruim. Verbalizar o processo — mesmo incompleto — mostra como voce pensa. Entrevistadores frequentemente dao dicas quando entendem onde voce travou.' },
        { question: 'Para qual sinal de reconhecimento o padrao Two Pointers se aplica?', options: ['Subarrays contiguos', 'Arrays ordenados, encontrar par com condicao, palindromes', 'Frequencia de elementos', 'Menor caminho num grafo'], correct: 1, explanation: 'Two Pointers funciona quando voce pode eliminar possibilidades movendo ponteiros em direcoes opostas. Requer array ordenado na maioria dos casos. Sinal classico: "encontre par que soma X em array ordenado".' },
        { question: 'Como analisar complexidade ao final de uma solucao?', options: ['Contar o numero de variaveis', 'Identificar os loops aninhados (tempo) e estruturas que crescem com o input (espaco), justificando cada um', 'Dizer O(n) para qualquer solucao com um loop', 'Usar sempre O(log n) para impressionar'], correct: 1, explanation: 'Tempo: conte quantos elementos cada loop processa e quantas vezes. Espaco: identifique estruturas que crescem com n (Map, array auxiliar). Justifique: "O Map pode ter no maximo n entradas, logo O(n) de espaco".' },
      ],
    },
  }

,{
    id: 'mp-phase-17',
    title: '🏗️ Mini-Projeto: Visualizador de Sorting',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase12,
    content: {
      sections: [{ type: 'text', content: 'Construa um visualizador animado de algoritmos de ordenação e veja Bubble Sort e Selection Sort em ação.' }]
    }
  }
  ],
};
