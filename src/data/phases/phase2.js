import { miniProjectPhase2 } from '../miniprojects.js';
export const phase2 = {
  id: 'phase-2',
  title: 'Lógica de Programação com JavaScript',
  phase: 2,
  color: '#22d97e',
  icon: '🧩',
  description: 'Os fundamentos que toda linguagem usa: variáveis, condições, loops, funções, erros, arrays, objetos. Você vai sair daqui escrevendo código real.',
  checklist: [
    'Declarar variáveis com const e let e saber quando usar cada uma',
    'Usar === em vez de == e explicar a diferença',
    'Escrever condicionais com if/else e operador ternário',
    'Usar for, while e for...of para iterar sobre arrays',
    'Criar funções com parâmetros e retorno de valor',
    'Usar .map(), .filter() e .reduce() em arrays',
    'Criar e acessar propriedades de objetos e usar desestruturação',
    'Tratar erros com try/catch',
    'Explicar a diferença entre null e undefined',
  ],
  modules: [
  {
              id: 'mod-2-1',
              title: 'Variáveis e Tipos de Dados',
              duration: '35 min',
              xp: 80,
              content: {
                sections: [
                  {
                    type: 'text',
                    content: 'Variáveis são caixas etiquetadas onde armazenamos valores. Em JavaScript moderno usamos const (o valor não muda) e let (o valor pode mudar). A regra de ouro: comece sempre com const; só mude para let quando souber que vai reatribuir. Nunca use var — é legado com comportamentos confusos e escopo problemático.'
                  },
                  {
                    type: 'code',
                    lang: 'javascript',
                    content: '// Os tipos primitivos do JavaScript\nconst nome = "Ana Silva";     // string — qualquer texto\nconst idade = 28;             // number — inteiros e decimais\nconst altura = 1.72;          // number (não existe "float" separado em JS)\nconst ativo = true;           // boolean — true ou false\nconst semValor = null;        // null — ausência INTENCIONAL de valor\nlet indefinido;               // undefined — ainda não foi atribuído\n\n// typeof revela o tipo de qualquer valor\nconsole.log(typeof nome);         // "string"\nconsole.log(typeof idade);        // "number"\nconsole.log(typeof ativo);        // "boolean"\nconsole.log(typeof semValor);     // "object" ← bug histórico do JS!\nconsole.log(typeof indefinido);   // "undefined"\nconsole.log(typeof {});           // "object"\nconsole.log(typeof []);           // "object" (arrays são objetos!)\nconsole.log(typeof function(){}); // "function"\n\n// Template literals — interpolação de variáveis (use sempre no lugar de +)\nconst apresentacao = `Olá! Sou ${nome}, tenho ${idade} anos.`;\nconsole.log(apresentacao);\n// → "Olá! Sou Ana Silva, tenho 28 anos."'
                  },
                  {
                    type: 'highlight',
                    content: '✅ Regra prática: use const por padrão. Só troque para let quando o valor vai mudar (contador em loop, acumulador, variável que recebe novo dado). Se você usar let em tudo, está perdendo uma oportunidade de comunicar intenção: const diz "esse valor não vai mudar" ao próximo desenvolvedor.'
                  },
                  {
                    type: 'code',
                    lang: 'javascript',
                    content: '// Conversão entre tipos — armadilhas comuns\nconst valorTexto = "42";\nconst valorNumero = Number(valorTexto);   // "42" → 42\nconst deVolta = String(valorNumero);     // 42 → "42"\nconst verdadeiro = Boolean(1);           // 1 → true\n\n// CUIDADO: o operador + com strings faz concatenação, não soma!\nconsole.log("5" + 3);          // "53" — concatenação!\nconsole.log(Number("5") + 3);  // 8  — soma correta\nconsole.log(+"5" + 3);         // 8  — atalho: + na frente converte\n\n// Valores "falsy" — se comportam como false em condicionais\n// false, 0, -0, 0n, "", null, undefined, NaN\nconsole.log(Boolean(0));         // false\nconsole.log(Boolean(""));        // false\nconsole.log(Boolean(null));      // false\nconsole.log(Boolean(undefined)); // false\nconsole.log(Boolean(NaN));       // false\n// Tudo mais é "truthy": Boolean(1) = true, Boolean("a") = true, Boolean([]) = true!\n\n// Verificações seguras\nconsole.log(Number.isNaN(NaN));        // true  (use isso, não: isNaN("abc"))\nconsole.log(Number.isFinite(1/0));     // false (Infinity não é finito)\nconsole.log(Number.isInteger(3.14));   // false\nconsole.log(Number.isInteger(42));     // true'
                  },
                  {
                    type: 'text',
                    content: 'Strings têm métodos poderosos que você vai usar todo dia. Vale a pena conhecê-los: .trim() remove espaços nas bordas, .split() divide por um separador, .includes() verifica se contém um texto, .replace() substitui texto, .toLowerCase() / .toUpperCase() mudam a capitalização, .slice() recorta um pedaço, .padStart() / .padEnd() preenchem com caracteres.'
                  },
                  {
                    type: 'code',
                    lang: 'javascript',
                    content: '// Métodos de string mais usados no dia a dia\nconst email = "  Ana.Silva@EXEMPLO.com  ";\n\nconst emailLimpo = email.trim().toLowerCase();\nconsole.log(emailLimpo);  // "ana.silva@exemplo.com"\n\n// split e join — separar e reunir\nconst csv = "nome,email,idade";\nconst colunas = csv.split(",");\nconsole.log(colunas);  // ["nome", "email", "idade"]\nconsole.log(colunas.join(" | ")); // "nome | email | idade"\n\n// slice — recortar partes\nconst cpf = "12345678901";\nconst cpfFormatado = `${cpf.slice(0,3)}.${cpf.slice(3,6)}.${cpf.slice(6,9)}-${cpf.slice(9)}`;\nconsole.log(cpfFormatado); // "123.456.789-01"\n\n// includes, startsWith, endsWith\nconst url = "https://api.exemplo.com/users";\nconsole.log(url.startsWith("https"));    // true\nconsole.log(url.includes("/users"));     // true\nconsole.log(url.endsWith(".json"));      // false\n\n// replace e replaceAll\nconst texto = "O gato e o gato são gatos";\nconsole.log(texto.replaceAll("gato", "cão")); // "O cão e o cão são cãos"\n\n// padStart — muito útil para formatação\nconst hora = 9;\nconsole.log(String(hora).padStart(2, "0")); // "09" (relógio digital)'
                  },
                  {
                    type: 'highlight',
                    content: '🎯 Diferença crucial: null vs undefined. null é "sem valor de propósito" — você atribui null intencionalmente. undefined é "ainda não existe" — JS coloca automaticamente em variáveis não inicializadas, parâmetros não passados, propriedades inexistentes. Na prática: use null quando você quer dizer "vazio por escolha". Nunca atribua undefined manualmente.'
                  }
                ],
                exercise: {
                  title: 'Formatando dados de um cadastro',
                  description: 'Dado o objeto de cadastro abaixo com dados "sujos" (espaços, capitalização errada), limpe e formate os dados: email em minúsculas sem espaços, nome capitalizado, CPF no formato 000.000.000-00, e verifique se o telefone tem 11 dígitos.',
                                    solutionHint: 'String.padStart(n, char) adiciona caracteres à esquerda. .toUpperCase() converte para maiúsculas. Para CPF: separe os grupos e junte com pontos e hífen.',
starterCode: 'const cadastro = {\n  nome: "  ana SILVA  ",\n  email: "  ANA.SILVA@GMAIL.COM  ",\n  cpf: "12345678901",\n  telefone: "11987654321"\n};\n\n// Limpe e formate cada campo\nconst nomeFormatado = // capitalizar primeira letra de cada palavra\nconst emailFormatado = // minúsculas, sem espaços\nconst cpfFormatado = // formato: 123.456.789-01\nconst telefoneValido = // true se tiver exatamente 11 dígitos\n\nconsole.log(nomeFormatado);\nconsole.log(emailFormatado);\nconsole.log(cpfFormatado);\nconsole.log("Telefone válido:", telefoneValido);\n',
                  solutionHint: 'nome.trim().split(" ").map(p=>p[0].toUpperCase()+p.slice(1).toLowerCase()).join(" ") | cpf.slice(0,3)+"."+...',
                  validate: (output, code) => {
                  return output.includes('Ana Silva') &&
                  output.includes('ana.silva@gmail.com') &&
                  output.includes('123.456.789-01') &&
                  output.includes('true') &&
                  code.includes('trim()') &&
                  (code.includes('toLowerCase()') || code.includes('toLocaleLowerCase()')) &&
                  code.includes('slice(');
                },
                  validateMessage: 'Exiba: Ana Silva, ana.silva@gmail.com, 123.456.789-01, true. Use trim(), toLowerCase() e slice().'
                },
                quiz: [
                  { question: 'Qual a diferença entre const e let?', options: ['Não há diferença prática', 'const não pode ser reatribuída; let pode', 'let é mais rápido em performance', 'const só aceita números'], correct: 1, explanation: 'const: o binding não pode ser reatribuído (mas objetos/arrays podem ser mutados). let: pode reatribuir. Ambos têm escopo de bloco — muito diferente do var.' },
                  { question: 'O que retorna typeof null?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correct: 2, explanation: 'typeof null retorna "object" — é um bug histórico do JavaScript mantido por compatibilidade desde 1995. null não é um objeto, mas não dá para consertar sem quebrar a web.' },
                  { question: 'O que acontece com "5" + 3 em JavaScript?', options: ['8', '"53"', 'Erro de tipo', '53'], correct: 1, explanation: 'O operador + com string faz concatenação, não soma. "5" + 3 = "53". Para somar: Number("5") + 3 = 8, ou +"5" + 3 = 8.' },
                  { question: 'Quais valores são falsy em JavaScript?', options: ['Apenas false e 0', 'false, 0, "", null, undefined, NaN e -0', 'null e undefined apenas', 'Qualquer número negativo'], correct: 1, explanation: 'Falsy: false, 0, -0, 0n (BigInt zero), "", null, undefined, NaN. Tudo mais é truthy — incluindo [], {}, "false" e -1.' },
                  { question: 'Para que servem template literals com backticks?', options: ['Só para strings multilinhas', 'Interpolação de expressões com ${} em strings', 'São strings mais rápidas', 'Substituem todas as aspas'], correct: 1, explanation: 'Template literals usam `` e permitem ${expressão} para interpolação. Também suportam múltiplas linhas sem \\n. São a forma moderna — evite concatenar com +.' },
                ]
              }
            },
  {
              id: 'mod-2-2',
              title: 'Condicionais e Operadores',
              duration: '35 min',
              xp: 85,
              content: {
                sections: [
                  {
                    type: 'text',
                    content: 'Condicionais permitem que o código tome decisões baseado em dados. Sem condicionais, todo programa seria uma sequência linear sem nenhuma inteligência. É a base da lógica de qualquer software real — de um simples formulário a um algoritmo de recomendação.'
                  },
                  {
                    type: 'code',
                    lang: 'javascript',
                    content: '// if / else if / else — a forma mais básica\nconst hora = new Date().getHours();\n\nif (hora < 12) {\n  console.log("Bom dia! ☀️");\n} else if (hora < 18) {\n  console.log("Boa tarde! 🌤️");\n} else {\n  console.log("Boa noite! 🌙");\n}\n\n// ── OPERADORES DE COMPARAÇÃO ──────────────────────────\nconsole.log(5 === "5");   // false — === compara valor E tipo\nconsole.log(5 == "5");    // true  — == converte tipo antes (EVITE!)\nconsole.log(5 !== "5");   // true  — !==: diferente estrito\nconsole.log(10 > 5);      // true\nconsole.log(10 >= 10);    // true\nconsole.log(3 < 3);       // false\nconsole.log(3 <= 3);      // true\n\n// Regra de ouro: use === e !== SEMPRE\n// == faz coerção de tipo e cria bugs sutis:\nconsole.log(0 == false);    // true  com ==\nconsole.log(0 === false);   // false com ===\nconsole.log("" == false);   // true  com ==\nconsole.log(null == undefined); // true com ==\n\n// ── OPERADORES LÓGICOS ────────────────────────────────\nconsole.log(true && false);  // false — AND: ambos precisam ser true\nconsole.log(true || false);  // true  — OR: pelo menos um precisa ser true\nconsole.log(!true);          // false — NOT: inverte\n\n// Short-circuit evaluation — muito útil!\nconst usuario = null;\nconsole.log(usuario && usuario.nome); // null — para antes de acessar .nome\nconst nome = usuario || "Visitante";  // "Visitante" — fallback'
                  },
                  {
                    type: 'code',
                    lang: 'javascript',
                    content: '// ── FORMAS MODERNAS DE CONDICIONAIS ─────────────────\n\n// Operador ternário — if/else em uma linha\nconst idade = 20;\nconst status = idade >= 18 ? "adulto" : "menor de idade";\nconsole.log(status); // "adulto"\n\n// Cuidado: ternários aninhados viram pesadelo de leitura\n// RUIM: const x = a ? b ? "b1" : "b2" : "a2";\n// BOM: use if/else para lógica complexa\n\n// Nullish coalescing (??) — padrão só para null/undefined\nconst config = null;\nconst tema = config ?? "dark";          // "dark" — config é null\nconst tamanho = 0 ?? 16;               // 0 — ?? não trata 0 como falsy!\nconst tamanhoOr = 0 || 16;             // 16 — || trata 0 como falsy\n// Diferença crucial: ?? só ativa para null/undefined, || ativa para qualquer falsy\n\n// Optional chaining (?.) — acessa propriedade sem explodir\nconst user = null;\nconsole.log(user?.nome);                // undefined — sem TypeError\nconsole.log(user?.endereco?.cidade);    // undefined — encadeado\nconsole.log(user?.getNome?.());         // undefined — função também\n\n// switch — para múltiplos casos exatos\nconst plano = "pro";\nswitch (plano) {\n  case "free":\n    console.log("5 projetos");\n    break; // SEMPRE coloque break!\n  case "pro":\n    console.log("50 projetos");\n    break;\n  case "enterprise":\n    console.log("Ilimitado");\n    break;\n  default:\n    console.log("Plano inválido");\n}'
                  },
                  {
                    type: 'highlight',
                    content: '🎯 Quando usar cada um: if/else para lógica complexa e múltiplas condições. Ternário para atribuição simples baseada em uma condição. ?? para valor padrão quando pode ser null/undefined. ?. para acessar propriedades de objeto que pode ser null. switch para múltiplos valores de uma única variável.'
                  },
                  {
                    type: 'text',
                    content: 'Guard clauses (cláusulas de guarda) são um padrão importante para código limpo: em vez de aninhar if dentro de if, você verifica as condições inválidas primeiro e retorna cedo. Isso reduz a indentação, torna o "caminho feliz" óbvio e evita o "arrow antipattern".'
                  },
                  {
                    type: 'code',
                    lang: 'javascript',
                    content: '// Guard clauses — padrão profissional\n\n// RUIM: pyramid of doom (aninhamento profundo)\nfunction processarPedido(usuario, pedido) {\n  if (usuario) {\n    if (usuario.ativo) {\n      if (pedido) {\n        if (pedido.itens.length > 0) {\n          // lógica principal aqui — enterrada em 4 níveis!\n          return "Pedido processado";\n        }\n      }\n    }\n  }\n  return "Erro";\n}\n\n// BOM: guard clauses — falha cedo, caminho feliz fica claro\nfunction processarPedido(usuario, pedido) {\n  if (!usuario) return "Usuário não encontrado";\n  if (!usuario.ativo) return "Usuário inativo";\n  if (!pedido) return "Pedido inválido";\n  if (pedido.itens.length === 0) return "Carrinho vazio";\n\n  // chegou aqui: tudo válido — lógica principal no nível 1\n  return "Pedido processado";\n}\n\nconsole.log(processarPedido(null, null));             // "Usuário não encontrado"\nconsole.log(processarPedido({ativo: false}, {}));     // "Usuário inativo"\nconsole.log(processarPedido({ativo: true}, {itens:[{nome:"Notebook"}]})); // "Pedido processado"'
                  }
                ,
                  {
                    type: 'common_error',
                    title: 'Usar == em vez de === para comparar tipos',
                    wrong: `// Comparação fraca — ignora o tipo
if (idade == "18") {
  console.log("maior de idade");
}
// "18" == 18 retorna TRUE — perigoso!`,
                    wrongLabel: '== converte tipos automaticamente antes de comparar.',
                    right: `// Comparação estrita — tipo + valor
if (idade === 18) {
  console.log("maior de idade");
}
// "18" === 18 retorna FALSE — correto!`,
                    rightLabel: '=== exige que tipo E valor sejam iguais.',
                    explanation: 'Sempre use === e !== em JavaScript. O operador == faz coerção de tipo silenciosa, causando bugs sutis. Ex: 0 == false é true, "" == false é true, null == undefined é true.',
                  }],
                exercise: {
                  title: 'Sistema de classificação de usuário',
                  description: 'Implemente a função classificarUsuario que recebe um objeto usuario com: ativo (boolean), plano ("free"|"pro"|"enterprise"), diasDeUso (number), projetos (number). Retorne uma string descrevendo o status: usuários inativos retornam mensagem de inatividade; use guard clauses para validar; depois classifique por plano e engajamento.',
                  solutionHint: 'Use if/else if com os operadores && para combinar condições. Comece pelo caso mais restritivo (premium && ativo) e vá para o mais geral.',
                  starterCode: 'function classificarUsuario(usuario) {\n  // Guard clauses primeiro\n  if (!usuario) return "Dados inválidos";\n  if (!usuario.ativo) return "Conta inativa";\n  \n  // Classifique baseado no plano e uso\n  // free + < 7 dias: "Iniciante"\n  // free + >= 7 dias: "Usuário regular free"\n  // pro + < 5 projetos: "Pro subutilizado"\n  // pro + >= 5 projetos: "Pro ativo"\n  // enterprise: "Conta enterprise"\n\n}\n\n// Teste todos os casos\nconsole.log(classificarUsuario(null));\nconsole.log(classificarUsuario({ ativo: false }));\nconsole.log(classificarUsuario({ ativo: true, plano: "free", diasDeUso: 3, projetos: 1 }));\nconsole.log(classificarUsuario({ ativo: true, plano: "free", diasDeUso: 10, projetos: 2 }));\nconsole.log(classificarUsuario({ ativo: true, plano: "pro", diasDeUso: 30, projetos: 8 }));\nconsole.log(classificarUsuario({ ativo: true, plano: "enterprise", diasDeUso: 100, projetos: 50 }));\n',
                  solutionHint: 'Use switch(usuario.plano) após as guard clauses. Dentro de cada case, use if para checar diasDeUso ou projetos.',
                  validate: (output, code) => {
                  const lines = output.toLowerCase();
                  return lines.includes('inválid') &&
                    lines.includes('inat') &&
                    lines.includes('inicia') &&
                    (code.includes('if ') || code.includes('if(')) &&
                    code.includes('return') &&
                    !code.includes('console.log("Iniciante")') &&
                    !code.includes("console.log('Iniciante')");
                },
                  validateMessage: 'A função deve usar if/return para classificar cada caso. Não use console.log hardcoded.'
                },
                quiz: [
                  { question: 'Por que usar === em vez de ==?', options: ['=== é mais rápido', '=== compara valor e tipo; == converte tipos automaticamente e gera bugs sutis', 'São idênticos em prática', '== só funciona com strings'], correct: 1, explanation: '0 == false → true (perigoso!). 0 === false → false (correto). O == faz coerção de tipo que é difícil de prever. Use === sempre — sem exceções.' },
                  { question: 'Qual a diferença entre ?? e ||?', options: ['São idênticos', '?? só ativa para null/undefined; || ativa para qualquer valor falsy', '|| é mais moderno', '?? é mais lento'], correct: 1, explanation: 'const x = 0 ?? 10 → 0 (0 não é null/undefined). const x = 0 || 10 → 10 (0 é falsy). Use ?? para defaults quando o valor pode legitimamente ser 0 ou false.' },
                  { question: 'O que é optional chaining (?.)  ?', options: ['Define propriedades opcionais', 'Acessa propriedades sem lançar erro se o objeto for null/undefined', 'É uma forma de ternário', 'Verifica se a propriedade existe'], correct: 1, explanation: 'user?.nome retorna undefined se user for null ou undefined, em vez de lançar TypeError. Essencial ao trabalhar com dados de API que podem estar ausentes.' },
                  { question: 'O que é uma guard clause?', options: ['Uma cláusula de segurança no contrato', 'Verificar condições inválidas no início da função e retornar cedo', 'Um tipo especial de if/else', 'Uma função de validação'], correct: 1, explanation: 'Guard clauses eliminam o aninhamento. Em vez de if(válido) { ... }, você faz if(!válido) return "erro". O código principal fica no nível 1 de indentação — muito mais legível.' },
                  { question: 'Quando usar switch em vez de if/else if?', options: ['Sempre', 'Quando compara múltiplos valores possíveis de uma única variável', 'Apenas com strings', 'Quando tem mais de 10 condições'], correct: 1, explanation: 'switch é mais legível quando você tem muitos casos do mesmo tipo (if plano === "A"... else if plano === "B"...). Para condições complexas ou ranges, if/else é melhor.' },
                ]
              }
            },
  {
              id: 'mod-2-3',
              title: 'Loops e Iteração',
              duration: '35 min',
              xp: 90,
              content: {
                sections: [
                  {
                    type: 'text',
                    content: 'Loops permitem executar um bloco de código repetidamente. Sem loops, você teria que escrever console.log 100 vezes para imprimir 100 itens. Com um loop, escreve uma vez e o computador repete. Dominar iteração é essencial — você vai usar isso todos os dias para processar listas, validar dados e automatizar tarefas.'
                  },
                  {
                    type: 'code',
                    lang: 'javascript',
                    content: '// ── FOR CLÁSSICO — quando você sabe quantas repetições ─\nfor (let i = 0; i < 5; i++) {\n  console.log(`Iteração ${i}`);\n}  // 0, 1, 2, 3, 4\n\n// Contando de trás para frente\nfor (let i = 10; i >= 0; i -= 2) {\n  console.log(i); // 10, 8, 6, 4, 2, 0\n}\n\n// ── WHILE — quando depende de uma condição ─────────────\nlet tentativas = 0;\nlet sucesso = false;\n\nwhile (!sucesso && tentativas < 3) {\n  tentativas++;\n  sucesso = Math.random() > 0.7; // 30% de chance de sucesso\n  console.log(`Tentativa ${tentativas}: ${sucesso ? "sucesso" : "falhou"}`);\n}\n\n// ── DO...WHILE — executa pelo menos uma vez ────────────\nlet entrada;\ndo {\n  entrada = "123"; // simula input do usuário\n  console.log("Recebeu:", entrada);\n} while (entrada.length < 8); // valida depois\n// Útil para: pedir input até ser válido\n\n// ── BREAK E CONTINUE ──────────────────────────────────\nconst numeros = [1, 5, 3, 8, 2, 9, 4];\n\nfor (let i = 0; i < numeros.length; i++) {\n  if (numeros[i] % 2 === 0) continue; // pula pares\n  if (numeros[i] > 7) break;          // para ao encontrar > 7\n  console.log(numeros[i]);            // exibe: 1, 5, 3\n}'
                  },
                  {
                    type: 'code',
                    lang: 'javascript',
                    content: '// ── ITERANDO ARRAYS — formas modernas (prefira essas) ─\nconst produtos = [\n  { nome: "Notebook", preco: 4500 },\n  { nome: "Mouse", preco: 150 },\n  { nome: "Monitor", preco: 1200 },\n];\n\n// for...of — mais legível, prefira para arrays\nfor (const produto of produtos) {\n  console.log(`${produto.nome}: R$ ${produto.preco}`);\n}\n\n// com índice usando entries()\nfor (const [indice, produto] of produtos.entries()) {\n  console.log(`${indice + 1}. ${produto.nome}`);\n}\n\n// forEach — quando não precisa de break/continue\nprodutos.forEach((produto, i) => {\n  console.log(`${i}: ${produto.nome}`);\n});\n\n// ── ITERANDO OBJETOS ──────────────────────────────────\nconst usuario = { nome: "Ana", nivel: 5, xp: 1200 };\n\n// for...in — para chaves de objeto\nfor (const chave in usuario) {\n  console.log(`${chave}: ${usuario[chave]}`);\n}\n\n// Formas modernas (prefira estas)\nObject.keys(usuario).forEach(k => console.log(k));\nObject.values(usuario).forEach(v => console.log(v));\nObject.entries(usuario).forEach(([k, v]) => {\n  console.log(`${k} = ${v}`);\n});\n\n// ── LOOPS ANINHADOS ───────────────────────────────────\nconst matriz = [[1,2,3], [4,5,6], [7,8,9]];\nfor (const linha of matriz) {\n  for (const valor of linha) {\n    process.stdout.write(valor + " ");\n  }\n  console.log();\n}'
                  },
                  {
                    type: 'highlight',
                    content: '⚠️ O loop infinito é o bug mais clássico de iniciante. Acontece quando a condição nunca se torna false. Exemplo: while (true) { } ou while (n > 0) { n++ } — n nunca fica <= 0. Se o programa travar, provavelmente é loop infinito. Use Ctrl+C no terminal para matar o processo.'
                  },
                  {
                    type: 'text',
                    content: 'Qual loop usar? For clássico quando você precisa do índice ou controle fino. For...of quando itera sobre array e quer legibilidade. While quando a condição de parada é dinâmica. forEach quando quer compacto e não precisa de break. Em código moderno, você vai usar muito mais os métodos funcionais (map, filter, reduce) do próximo módulo do que loops explícitos.'
                  }
                ],
                exercise: {
                  title: 'FizzBuzz + análise de dados',
                  description: 'Parte 1: imprima números de 1 a 30 com as regras FizzBuzz (múltiplo de 3 → "Fizz", múltiplo de 5 → "Buzz", ambos → "FizzBuzz"). Parte 2: dado o array de vendas, calcule o total usando um loop e encontre o maior valor.',
                                    solutionHint: 'Use o operador % (módulo) para verificar divisibilidade. Para múltiplo de 3 e 5: verifique ambos antes de verificar cada um separado.',
starterCode: '// Parte 1: FizzBuzz de 1 a 30\nfor (let i = 1; i <= 30; i++) {\n  // Dica: verifique FizzBuzz ANTES de verificar Fizz ou Buzz separadamente\n  // Use o operador % (módulo/resto): 15 % 3 === 0 significa múltiplo de 3\n}\n\n// Parte 2: análise de vendas\nconst vendas = [1500, 3200, 800, 4100, 2750, 990, 5600, 1800];\nlet totalVendas = 0;\nlet maiorVenda = 0;\n\nfor (const venda of vendas) {\n  // some totais e acompanhe o maior\n}\n\nconsole.log("Total:", totalVendas);\nconsole.log("Maior venda:", maiorVenda);\n',
                  solutionHint: 'FizzBuzz: if(i%15===0) else if(i%3===0) else if(i%5===0) else. Vendas: totalVendas += venda; if(venda > maiorVenda) maiorVenda = venda',
                  validate: (output, code) => {
                  return output.includes('FizzBuzz') &&
                      output.includes('Fizz') &&
                      output.includes('Buzz') &&
                      output.includes('Total:') &&
                      output.includes('Maior venda:') &&
                      (code.includes('for ') || code.includes('while ') || code.includes('for(')) &&
                      code.includes('%') &&
                      !code.includes("console.log('FizzBuzz')") &&
                      !code.includes('console.log("FizzBuzz")');
                },
                  validateMessage: 'Use um loop com % para FizzBuzz. Não imprima FizzBuzz diretamente no console.log.'
                },
                quiz: [
                  { question: 'Qual a diferença entre for...of e for...in?', options: ['São idênticos', 'for...of itera sobre valores; for...in itera sobre chaves/propriedades', 'for...in é mais rápido', 'for...of só funciona com arrays'], correct: 1, explanation: 'for...of: para iteráveis (arrays, strings, Maps, Sets) — dá o valor. for...in: para propriedades enumeráveis de objetos — dá a chave. Evite for...in em arrays.' },
                  { question: 'O que o operador % (módulo) retorna?', options: ['O quociente da divisão', 'O resto da divisão inteira', 'A porcentagem', 'O valor absoluto'], correct: 1, explanation: '10 % 3 = 1 (10 ÷ 3 = 3, resto 1). Usado para: par/ímpar (n%2===0), divisibilidade (n%15===0), índice circular (i%array.length).' },
                  { question: 'Como parar um loop antes de terminar?', options: ['stop', 'exit', 'break', 'return'], correct: 2, explanation: 'break encerra o loop imediatamente. continue pula a iteração atual e vai para a próxima. return sai da função inteira (não só do loop).' },
                  { question: 'Qual loop garante execução de pelo menos uma vez?', options: ['for', 'while', 'do...while', 'for...of'], correct: 2, explanation: 'do...while executa o bloco ANTES de verificar a condição. Útil para: solicitar input até ser válido, tentar conexão pelo menos uma vez.' },
                  { question: 'Por que prefere-se for...of a for clássico para arrays?', options: ['for...of é mais rápido', 'Mais legível: você se concentra no elemento, não no índice', 'for clássico tem bugs', 'for...of funciona com objetos também'], correct: 1, explanation: 'for...of elimina o ruído do i=0, i<arr.length, i++ e o arr[i]. Você declara diretamente "para cada elemento". Mais legível = menos bugs.' },
                ]
              }
            },
  {
              id: 'mod-2-4',
              title: 'Funções e Escopo',
              duration: '45 min',
              xp: 100,
              content: {
                sections: [
                  {
                    type: 'text',
                    content: 'Funções são o bloco de construção mais importante da programação. Elas encapsulam lógica reutilizável, dão nome a operações e permitem que você trabalhe em partes do programa isoladamente. O princípio DRY (Don\'t Repeat Yourself) diz: se você copiou e colou código, transforme em função.'
                  },
                  {
                    type: 'code',
                    lang: 'javascript',
                    content: '// ── 3 FORMAS DE DECLARAR FUNÇÕES ─────────────────────\n\n// 1. Function declaration — hoisted (pode chamar antes de declarar)\nfunction saudar(nome) {\n  return `Olá, ${nome}!`;\n}\nconsole.log(saudar("Ana")); // "Olá, Ana!"\n\n// 2. Function expression — não hoisted\nconst calcularIMC = function(peso, altura) {\n  return peso / (altura * altura);\n};\n\n// 3. Arrow function — forma moderna, compacta\nconst dobrar = x => x * 2;              // 1 param, 1 expressão: sem {} e sem return\nconst soma = (a, b) => a + b;           // 2+ params: precisa de ()\nconst criarPerfil = (nome, nivel = 1) => ({ // retorna objeto: envolva em ()\n  nome,\n  nivel,\n  criadoEm: new Date().toISOString()\n});\n\nconsole.log(dobrar(5));                 // 10\nconsole.log(criarPerfil("Ana", 3));     // { nome: "Ana", nivel: 3, ... }\n\n// Parâmetros com valores padrão\nfunction criar(nome, nivel = 1, ativo = true, tags = []) {\n  return { nome, nivel, ativo, tags };\n}\nconsole.log(criar("Ana"));              // { nome: "Ana", nivel: 1, ativo: true, tags: [] }\nconsole.log(criar("João", 5, false, ["admin"]));'
                  },
                  {
                    type: 'code',
                    lang: 'javascript',
                    content: '// ── ESCOPO — onde variáveis existem ──────────────────\n\nconst global = "existo em qualquer lugar";\n\nfunction exemplo() {\n  const local = "existo só dentro desta função";\n  console.log(global); // ✅ acessa variável global\n  console.log(local);  // ✅ acessa variável local\n\n  if (true) {\n    const bloco = "existo só dentro deste if";\n    let tambem = "também sou de bloco";\n    var vazado = "var não tem escopo de bloco!";\n    console.log(bloco);  // ✅\n  }\n  // console.log(bloco);  // ❌ ReferenceError — fora do bloco\n  console.log(vazado);   // ✅ var "vaza" do bloco — péssimo!\n}\n\n// console.log(local); // ❌ ReferenceError — fora da função\n\n// ── CLOSURES — a "memória" de funções ─────────────────\n// Uma função lembra o escopo onde foi criada, mesmo após a execução terminar\n\nfunction criarContador(inicio = 0) {\n  let count = inicio; // esta variável "sobrevive" dentro da closure\n\n  return {\n    incrementar: () => ++count,\n    decrementar: () => --count,\n    resetar: () => { count = inicio; },\n    valor: () => count,\n  };\n}\n\nconst contador = criarContador(10);\nconsole.log(contador.incrementar()); // 11\nconsole.log(contador.incrementar()); // 12\nconsole.log(contador.decrementar()); // 11\nconsole.log(contador.resetar());     // undefined\nconsole.log(contador.valor());       // 10\n\n// Closures são a base de: hooks do React, módulos, funções de fábrica'
                  },
                  {
                    type: 'text',
                    content: 'Funções de primeira classe significam que em JavaScript funções são valores — podem ser guardadas em variáveis, passadas como argumento (callbacks) e retornadas por outras funções (higher-order functions). Esse conceito é fundamental para entender arrays funcionais, React hooks, event listeners e praticamente qualquer código JavaScript moderno.'
                  },
                  {
                    type: 'code',
                    lang: 'javascript',
                    content: '// ── FUNÇÕES COMO VALORES (FIRST-CLASS FUNCTIONS) ────\n\n// 1. Guardadas em variável (você já viu isso)\nconst saudar = nome => `Olá, ${nome}!`;\n\n// 2. Passadas como argumento — CALLBACKS\nfunction executarDepois(ms, callback) {\n  console.log(`Esperando ${ms}ms...`);\n  // setTimeout chama callback após ms milissegundos\n  setTimeout(callback, ms);\n}\nexecutarDepois(1000, () => console.log("1 segundo depois!"));\n\n// 3. Higher-order functions — recebem ou retornam funções\nfunction multiplicarPor(fator) {\n  return (numero) => numero * fator; // retorna uma função!\n}\n\nconst triplicar = multiplicarPor(3);\nconst quadruplicar = multiplicarPor(4);\n\nconsole.log(triplicar(5));    // 15\nconsole.log(quadruplicar(5)); // 20\n\n// Exemplo real: aplicar desconto\nfunction criarDesconto(percentual) {\n  return (preco) => preco * (1 - percentual / 100);\n}\n\nconst desconto10 = criarDesconto(10);\nconst desconto30 = criarDesconto(30);\n\nconst precos = [100, 250, 80, 320];\nconsole.log(precos.map(desconto10)); // [90, 225, 72, 288]\nconsole.log(precos.map(desconto30)); // [70, 175, 56, 224]'
                  },
                  {
                    type: 'highlight',
                    content: '🔑 Uma boa função: (1) faz UMA única coisa. (2) tem nome que descreve essa coisa — verbo + substantivo: calcularTotal, validarEmail, buscarUsuario. (3) tem no máximo 20 linhas. (4) parâmetros com nomes claros. (5) não produz efeitos colaterais inesperados. Se precisar de um comentário para explicar o que a função faz, o nome está errado.'
                  }
                ,
                  {
                    type: 'common_error',
                    title: 'Usar else if desnecessário depois de return',
                    wrong: `function classificar(nota) {
  if (nota >= 7) {
    return "Aprovado";
  } else if (nota >= 5) {
    return "Recuperação";
  } else {
    return "Reprovado";
  }
}`,
                    wrongLabel: 'O else if é desnecessário — o return já sai da função.',
                    right: `function classificar(nota) {
  if (nota >= 7) return "Aprovado";
  if (nota >= 5) return "Recuperação";
  return "Reprovado"; // guard clause
}`,
                    rightLabel: 'Guard clauses: retorne cedo e elimine else desnecessários.',
                    explanation: 'Quando um if termina com return, o else nunca é necessário. Guard clauses reduzem indentação, tornam o código mais linear e fácil de ler.',
                  }],
                exercise: {
                  title: 'Funções de utilidade reutilizáveis',
                  description: 'Implemente 3 funções: (1) capitalizarNome(texto) — primeira letra de cada palavra em maiúsculo; (2) criarValidador(minimo, maximo) — retorna uma FUNÇÃO que verifica se um número está no intervalo; (3) pipeline(...fns) — recebe funções e retorna uma função que as aplica em sequência.',
                  solutionHint: 'Cada função deve ter uma responsabilidade. Use return para devolver o valor calculado. Lembre de tratar casos edge: array vazio, string vazia.',
                  starterCode: '// 1. Capitalizar cada palavra\nfunction capitalizarNome(texto) {\n  // "ana silva" → "Ana Silva"\n}\n\n// 2. Fábrica de validadores (retorna uma função!)\nfunction criarValidador(minimo, maximo) {\n  return function(valor) {\n    // retorne true se minimo <= valor <= maximo\n  };\n}\n\n// 3. Pipeline — aplica funções em sequência (desafio!)\nfunction pipeline(...fns) {\n  return function(valor) {\n    // aplique cada fn ao resultado da anterior\n    // fns.reduce((v, fn) => fn(v), valor)\n  };\n}\n\n// Testes\nconsole.log(capitalizarNome("ana paula silva"));\n\nconst validarIdade = criarValidador(0, 120);\nconsole.log(validarIdade(25));    // true\nconsole.log(validarIdade(-1));    // false\nconsole.log(validarIdade(150));   // false\n\nconst processarTexto = pipeline(\n  t => t.trim(),\n  t => t.toLowerCase(),\n  t => t.replace(/\\s+/g, "-")\n);\nconsole.log(processarTexto("  Olá Mundo  ")); // "olá-mundo"\n',
                  solutionHint: 'capitalize: split(" ").map(p=>p[0].toUpperCase()+p.slice(1).toLowerCase()).join(" ") | criarValidador: return v => v >= min && v <= max | pipeline: fns.reduce((v,fn)=>fn(v), valor)',
                  validate: (output, code) => {
                  const lines = output.toLowerCase();
                  return lines.includes('inválid') &&
                    lines.includes('inat') &&
                    lines.includes('inicia') &&
                    // Deve usar if/else ou condicionais, não só console.log hardcoded
                    (code.includes('if ') || code.includes('if(')) &&
                    code.includes('return') &&
                    // Não pode ser hardcoded
                    !code.includes('console.log("Iniciante")') &&
                    !code.includes("console.log('Iniciante')");
                },
                  validateMessage: 'A função deve usar if/return (guard clauses) para classificar corretamente cada caso.'
                },
                quiz: [
                  { question: 'O que é hoisting de funções?', options: ['Mover a função para outro arquivo', 'Function declarations são movidas para o topo do escopo, permitindo chamá-las antes da declaração', 'Arrow functions são automaticamente exportadas', 'Funções executadas ao carregar'], correct: 1, explanation: 'Hoisting: function declarations são completamente "içadas" para o topo. Você pode chamar a função antes de declará-la no código. Arrow functions e function expressions não são hoisted.' },
                  { question: 'O que é uma closure?', options: ['Uma função que não retorna valor', 'Uma função que lembra e acessa variáveis do escopo onde foi criada, mesmo após o escopo encerrar', 'Um loop infinito', 'Uma função sem parâmetros'], correct: 1, explanation: 'Closures são a base de muitos padrões: módulos, funções de fábrica, hooks do React, event handlers. A função "captura" variáveis do escopo externo.' },
                  { question: 'O que é uma higher-order function?', options: ['Função com muitos parâmetros', 'Função que recebe função como argumento e/ou retorna uma função', 'Função assíncrona', 'Função global'], correct: 1, explanation: 'Higher-order functions tratam funções como valores. Exemplos: map, filter, reduce (recebem callbacks), setTimeout (recebe callback), criarDesconto (retorna função).' },
                  { question: 'Por que variáveis com var "vazam" do bloco?', options: ['Var é mais rápido', 'Var tem escopo de função, não de bloco — ignora {}de if/for', 'É um bug do navegador', 'Var é global sempre'], correct: 1, explanation: 'var tem escopo de função. let e const têm escopo de bloco. Por isso if(true){ var x=1 } é acessível fora do if, mas if(true){ let y=1 } não é. Use let e const.' },
                  { question: 'O que é o princípio DRY?', options: ['Deixe o código sem comentários', 'Don\'t Repeat Yourself — não duplique lógica', 'Use funções pequenas sempre', 'Escreva código legível'], correct: 1, explanation: 'DRY: se você copiou código, há um problema. Extraia para uma função. Duplicação significa que ao corrigir um bug, você precisa corrigir em dois lugares — e vai esquecer um.' },
                ]
              }
            },
  {
          id: 'mod-2-5',
          title: 'Tratamento de Erros',
          duration: '35 min',
          xp: 95,
          content: {
            sections: [
              {
                type: 'text',
                content: 'Erros são inevitáveis. Código profissional não evita erros — ele os antecipa e os trata com elegância. try/catch/finally é o mecanismo central do JavaScript para lidar com exceções sem travar o programa.',
              },
              {
                type: 'code',
                lang: 'javascript',
                content:
                  '// ── TRY / CATCH / FINALLY ────────────────────\ntry {\n  // Código que pode lançar erro\n  const dados = JSON.parse(textoInvalido); // lança SyntaxError\n  console.log(dados);\n} catch (erro) {\n  // Executado quando ocorre um erro\n  console.error("Erro ao parsear JSON:", erro.message);\n} finally {\n  // SEMPRE executa — com ou sem erro\n  console.log("Processamento finalizado");\n}\n\n// ── TIPOS DE ERRO NATIVOS ─────────────────────\ntry {\n  null.propriedade;          // TypeError\n} catch (e) {\n  console.log(e instanceof TypeError); // true\n  console.log(e.name);    // "TypeError"\n  console.log(e.message); // "Cannot read properties of null"\n  console.log(e.stack);   // stack trace completo\n}\n\n// ReferenceError — variável não declarada\n// SyntaxError — código malformado (JSON.parse, eval)\n// RangeError — valor fora de intervalo (new Array(-1))\n// URIError — URI malformada\n\n// ── LANÇAR ERROS CUSTOMIZADOS ─────────────────\nfunction dividir(a, b) {\n  if (b === 0) throw new Error("Divisão por zero não é permitida");\n  if (typeof a !== "number") throw new TypeError(`"a" deve ser number, recebeu ${typeof a}`);\n  return a / b;\n}\n\nconsole.log(dividir(10, 2)); // 5\n// dividir(10, 0);           // Error: Divisão por zero',
              },
              {
                type: 'code',
                lang: 'javascript',
                content:
                  '// ── CLASSES DE ERRO CUSTOMIZADAS ─────────────\nclass ErroValidacao extends Error {\n  constructor(campo, mensagem) {\n    super(mensagem);                    // passa mensagem para Error\n    this.name = "ErroValidacao";        // sobrescreve o nome\n    this.campo = campo;                 // dado extra\n    this.timestamp = new Date();        // quando ocorreu\n  }\n}\n\nclass ErroAPI extends Error {\n  constructor(statusCode, mensagem) {\n    super(mensagem);\n    this.name = "ErroAPI";\n    this.statusCode = statusCode;\n  }\n}\n\n// Usando as classes customizadas\nfunction validarEmail(email) {\n  if (!email.includes("@")) {\n    throw new ErroValidacao("email", `"${email}" não é um email válido`);\n  }\n  return true;\n}\n\ntry {\n  validarEmail("nao-e-email");\n} catch (e) {\n  if (e instanceof ErroValidacao) {\n    console.log(`Campo inválido: ${e.campo} — ${e.message}`);\n  } else {\n    throw e; // relança erros desconhecidos\n  }\n}\n\n// ── PADRÃO: NEVER SWALLOW ERRORS ─────────────\n// ❌ Errado — silencia o erro, torna debugging impossível\ntry {\n  operacaoPerigosa();\n} catch (e) {}\n\n// ✅ Certo — ao menos loga, ou relança\ntry {\n  operacaoPerigosa();\n} catch (e) {\n  console.error("[operacaoPerigosa] falhou:", e);\n  throw e; // ou: notificarMonitoramento(e)\n}',
              },
              {
                type: 'highlight',
                content:
                  '🧱 Erros em async/await: try/catch funciona normalmente dentro de funções async. Mas Promise não capturada gera "UnhandledPromiseRejection" — uma das causas mais comuns de crash em Node.js. Sempre trate erros em funções async.',
              },
              {
                type: 'code',
                lang: 'javascript',
                content:
                  '// ── ERROS EM ASYNC/AWAIT ─────────────────────\nasync function buscarDados(url) {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new ErroAPI(res.status, `Falha HTTP: ${res.status}`);\n    return await res.json();\n  } catch (e) {\n    if (e instanceof ErroAPI) {\n      // Erro de status HTTP — tratável\n      if (e.statusCode === 404) return null;\n      if (e.statusCode >= 500) throw e; // propaga erro de servidor\n    }\n    // Erro de rede (TypeError: fetch failed)\n    console.error("Sem conexão:", e.message);\n    return null;\n  }\n}\n\n// ── UTILITY: resultado sem exceção ────────────\n// Padrão Go-style para evitar try/catch verboso\nasync function tentar(promise) {\n  try {\n    const dados = await promise;\n    return [null, dados];\n  } catch (erro) {\n    return [erro, null];\n  }\n}\n\nconst [erro, usuario] = await tentar(buscarUsuario(id));\nif (erro) {\n  console.log("Falhou:", erro.message);\n} else {\n  console.log("Usuário:", usuario.nome);\n}',
              },
            ],
            exercise: {
              title: 'Validador com erros customizados',
              description:
                'Crie uma função validarFormulario({ nome, email, idade }) que lança ErroValidacao (com campo e mensagem) para: nome vazio ou < 2 chars, email sem "@", idade < 0 ou > 120. Se tudo ok, retorna true. Teste com dados inválidos e válidos dentro de try/catch.',
                            solutionHint: 'Crie um array de erros vazio e faça push dos problemas encontrados. Retorne { valido: erros.length === 0, erros }.',
starterCode:
                'class ErroValidacao extends Error {\n  constructor(campo, mensagem) {\n    super(mensagem);\n    this.name = "ErroValidacao";\n    this.campo = campo;\n  }\n}\n\nfunction validarFormulario({ nome, email, idade }) {\n  // Valide nome: deve ter ao menos 2 caracteres\n  \n  // Valide email: deve conter "@"\n  \n  // Valide idade: deve ser entre 0 e 120\n  \n  return true;\n}\n\n// Teste 1: dados inválidos\ntry {\n  validarFormulario({ nome: "A", email: "nao-email", idade: 25 });\n} catch (e) {\n  console.log(`Erro no campo "${e.campo}": ${e.message}`);\n}\n\n// Teste 2: dados válidos\ntry {\n  const ok = validarFormulario({ nome: "Ana", email: "ana@dev.com", idade: 28 });\n  console.log("Válido:", ok);\n} catch (e) {\n  console.log("Não deveria cair aqui");\n}\n',
              solutionHint:
                'if (nome.length < 2) throw new ErroValidacao("nome", "Nome muito curto")',
              validate: (output, code) => {
                  return (
                  output.includes('nome') &&
                  output.includes('Erro') &&
                  output.includes('válid') &&
                  code.includes('throw') &&
                  (code.includes('try') || code.includes('catch')) &&
                  (code.includes('class ') || code.includes('extends Error') || code.includes('new Error'))
                  );
                },
              validateMessage: 'Use throw, try/catch, e crie classes de erro customizadas com extends Error.',
            },
            quiz: [
              {
                question: 'O que o bloco finally garante?',
                options: [
                  'Executa apenas se não houver erro',
                  'Executa apenas se houver erro',
                  'Sempre executa, independente de erro',
                  'Cancela o erro',
                ],
                correct: 2,
                explanation:
                  'finally sempre executa — com ou sem erro, e mesmo se houver return no try/catch. Ideal para limpeza: fechar conexões, ocultar loaders.',
              },
              {
                question: 'O que é uma "UnhandledPromiseRejection"?',
                options: [
                  'Erro de sintaxe em Promise',
                  'Uma Promise rejeitada sem .catch() ou try/catch ao redor do await',
                  'Erro ao criar uma Promise',
                  'Promise que demora muito',
                ],
                correct: 1,
                explanation:
                  'Se você faz await sem try/catch ou .then sem .catch, erros viram "unhandled rejections" — em Node.js isso pode encerrar o processo.',
              },
              {
                question: 'Por que criar classes de erro customizadas?',
                options: [
                  'É apenas estético',
                  'Permitem instanceof para tratar tipos de erro diferentes com lógica diferente',
                  'São mais rápidas',
                  'Substituem o try/catch',
                ],
                correct: 1,
                explanation:
                  'instanceof ErroValidacao vs instanceof ErroAPI permite lógica diferente por tipo de falha. Você também pode adicionar campos extras (statusCode, campo, etc.).',
              },
              {
                question: 'O que acontece se um catch relançar o erro com "throw e"?',
                options: [
                  'O erro é ignorado',
                  'O programa para imediatamente',
                  'O erro sobe para o próximo try/catch na pilha de chamadas',
                  'Cria um novo erro',
                ],
                correct: 2,
                explanation:
                  'throw e dentro de catch propaga o erro para o try/catch do chamador. Padrão útil: trate apenas erros que você conhece, relance os demais.',
              },
              {
                question: 'Qual é o tipo de erro lançado por JSON.parse("inválido")?',
                options: ['TypeError', 'ReferenceError', 'SyntaxError', 'RangeError'],
                correct: 2,
                explanation:
                  'JSON.parse lança SyntaxError quando o texto não é JSON válido. É um dos erros mais comuns em APIs — sempre envolva JSON.parse em try/catch.',
              },
            ],
          },
        },
  {
          id: 'mod-2-6',
          title: 'Callbacks e Higher-Order Functions',
          duration: '40 min',
          xp: 105,
          content: {
            sections: [
              {
                type: 'text',
                content:
                  'JavaScript trata funções como valores — você pode guardar uma função numa variável, passá-la como argumento e retorná-la de outra função. Isso se chama "funções de primeira classe". Higher-Order Functions (HOF) são funções que recebem ou retornam outras funções. É o coração do JavaScript funcional e o modelo mental por trás de callbacks, eventos e toda a API de arrays.',
              },
              {
                type: 'code',
                lang: 'javascript',
                content:
                  '// ── FUNÇÕES COMO VALORES ─────────────────────\nconst saudar = (nome) => `Olá, ${nome}!`;\nconst executar = (fn, argumento) => fn(argumento); // HOF: recebe função\n\nconsole.log(executar(saudar, "Ana"));  // "Olá, Ana!"\nconsole.log(executar(String.toUpperCase, "teste")); // não funciona assim!\n\n// ── CALLBACKS ────────────────────────────────\n// Callback = função passada como argumento para ser chamada depois\nfunction processarDados(dados, callback) {\n  const resultado = dados.map(x => x * 2); // processa\n  callback(resultado);                      // chama o callback com o resultado\n}\n\nprocessarDados([1, 2, 3], (resultado) => {\n  console.log("Processado:", resultado); // [2, 4, 6]\n});\n\n// setTimeout é o exemplo mais clássico de callback\nsetTimeout(function() {\n  console.log("Executou após 1 segundo");\n}, 1000);\n\n// addEventListener usa callback\ndocument.getElementById("btn")?.addEventListener("click", function(evento) {\n  console.log("Clicado!", evento.target);\n});',
              },
              {
                type: 'code',
                lang: 'javascript',
                content:
                  '// ── CRIAR SUAS PRÓPRIAS HOFs ─────────────────\n// HOF que retorna função (factory / closure)\nfunction criarMultiplicador(fator) {\n  return (numero) => numero * fator; // retorna uma função!\n}\n\nconst dobrar = criarMultiplicador(2);\nconst triplicar = criarMultiplicador(3);\nconst porCento = criarMultiplicador(0.01);\n\nconsole.log(dobrar(5));     // 10\nconsole.log(triplicar(5));  // 15\nconsole.log(porCento(350)); // 3.5\n\n// HOF que recebe E retorna função — composição\nfunction compor(...fns) {\n  return (valor) => fns.reduceRight((acc, fn) => fn(acc), valor);\n}\n\nconst pipeline = compor(\n  (x) => x * 2,       // 3. dobra\n  (x) => x + 10,      // 2. soma 10\n  (x) => x ** 2,      // 1. eleva ao quadrado\n);\n\nconsole.log(pipeline(3)); // 3²=9, 9+10=19, 19*2=38\n\n// ── MEMOIZAÇÃO — HOF que cacheia resultados ───\nfunction memoizar(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const chave = JSON.stringify(args);\n    if (cache.has(chave)) {\n      console.log("(do cache)");\n      return cache.get(chave);\n    }\n    const resultado = fn.apply(this, args);\n    cache.set(chave, resultado);\n    return resultado;\n  };\n}\n\nconst fibMemo = memoizar(function fib(n) {\n  if (n <= 1) return n;\n  return fibMemo(n - 1) + fibMemo(n - 2);\n});\n\nconsole.log(fibMemo(40)); // rápido graças ao cache',
              },
              {
                type: 'code',
                lang: 'javascript',
                content:
                  '// ── CALLBACK HELL → PROMISES ─────────────────\n// O problema clássico: callbacks aninhados ficam ilegíveis\nbuscarUsuario(id, function(usuario) {\n  buscarPedidos(usuario.id, function(pedidos) {\n    buscarPagamento(pedidos[0].id, function(pagamento) {\n      console.log(pagamento); // 3 níveis de indentação — ruim\n    });\n  });\n});\n\n// Com Promises (muito melhor)\nbuscarUsuario(id)\n  .then(usuario => buscarPedidos(usuario.id))\n  .then(pedidos => buscarPagamento(pedidos[0].id))\n  .then(pagamento => console.log(pagamento))\n  .catch(err => console.error(err));\n\n// Com async/await (melhor ainda)\nasync function fluxoCompleto(id) {\n  const usuario = await buscarUsuario(id);\n  const pedidos = await buscarPedidos(usuario.id);\n  const pagamento = await buscarPagamento(pedidos[0].id);\n  return pagamento;\n}\n\n// ── CURRYING ─────────────────────────────────\n// Transformar f(a,b,c) em f(a)(b)(c)\nconst somar = (a) => (b) => a + b;\nconst somarCinco = somar(5);\nconsole.log(somarCinco(3));  // 8\nconsole.log(somarCinco(10)); // 15\n\n// Útil para criar funções parcialmente aplicadas\nconst filtrarPorTipo = (tipo) => (item) => item.tipo === tipo;\nconst apenasAtivos = filtrarPorTipo("ativo");\nconsole.log(usuarios.filter(apenasAtivos));',
              },
              {
                type: 'highlight',
                content:
                  '🔗 Callbacks são a base de todo o JavaScript assíncrono. Quando você passa uma função para setTimeout, addEventListener, fetch.then ou Array.map — você está usando callbacks. Dominar esse padrão é pré-requisito para entender React (onde você passa funções como props o tempo todo).',
              },
            ,
                  {
                    type: 'common_error',
                    title: 'Modificar array enquanto itera sobre ele',
                    wrong: `const nums = [1, 2, 3, 4, 5];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) {
    nums.splice(i, 1); // Remove o elemento
  }
}
// Resultado: [1, 3, 5] — mas pulou elementos!`,
                    wrongLabel: 'splice() muda os índices enquanto o loop avança — pula elementos.',
                    right: `const nums = [1, 2, 3, 4, 5];
const impares = nums.filter(n => n % 2 !== 0);
// Ou: crie um novo array, nunca mute o original
console.log(impares); // [1, 3, 5] — correto!`,
                    rightLabel: 'Nunca mute um array enquanto itera. Use filter() para criar um novo.',
                    explanation: 'Mutação durante iteração é uma fonte clássica de bugs. A solução moderna: use filter(), map() ou reduce() para criar novos arrays imutáveis.',
                  }],
            exercise: {
              title: 'Pipeline de transformação funcional',
              description:
                'Implemente: (1) criarFiltro(campo, valor) — HOF que retorna função que filtra objetos onde obj[campo] === valor; (2) criarOrdenador(campo) — HOF que retorna função de comparação para sort; (3) use as duas HOFs para filtrar e ordenar uma lista de produtos.',
                            solutionHint: '.map() transforma, .filter() filtra, .reduce() agrega. Encadeie: arr.filter(...).map(...).reduce(...)',
starterCode:
                'const produtos = [\n  { nome: "Notebook", categoria: "tech", preco: 3500 },\n  { nome: "Mouse",    categoria: "tech", preco: 150  },\n  { nome: "Cadeira",  categoria: "movel", preco: 1200 },\n  { nome: "Teclado",  categoria: "tech", preco: 280  },\n  { nome: "Mesa",     categoria: "movel", preco: 800  },\n];\n\n// 1. HOF: retorna função que filtra por campo === valor\nfunction criarFiltro(campo, valor) {\n  // retorne uma função (item) => boolean\n}\n\n// 2. HOF: retorna função de comparação por campo numérico (crescente)\nfunction criarOrdenador(campo) {\n  // retorne uma função (a, b) => number\n}\n\n// Use as HOFs:\nconst apenastech = criarFiltro("categoria", "tech");\nconst porPreco = criarOrdenador("preco");\n\nconst resultado = produtos\n  .filter(apenastech)\n  .sort(porPreco);\n\nresultado.forEach(p => console.log(`${p.nome}: R$${p.preco}`));\n',
              solutionHint:
                'criarFiltro: return (item) => item[campo] === valor | criarOrdenador: return (a, b) => a[campo] - b[campo]',
              validate: (output, code) => {
                  return (
                  output.includes('Mouse: R$150') &&
                  output.includes('Teclado') &&
                  /\.map\s*\(/.test(code) &&
                  /\.filter\s*\(/.test(code) &&
                  code.includes('function') || code.includes('=>') &&
                  !code.includes('for (') && !code.includes('for('));
                },
              validateMessage: 'Use .map() e .filter() (funções de ordem superior). Não use for loops manuais.',
            },
            quiz: [
              {
                question: 'O que é uma Higher-Order Function?',
                options: [
                  'Função com mais de 5 linhas',
                  'Função que recebe e/ou retorna outra função',
                  'Função que usa recursão',
                  'Função declarada no escopo global',
                ],
                correct: 1,
                explanation:
                  'HOF é qualquer função que trata funções como valores — recebendo como argumento ou retornando como resultado. map, filter, reduce são todos HOFs.',
              },
              {
                question: 'O que é "callback hell"?',
                options: [
                  'Callbacks com muitos parâmetros',
                  'Callbacks aninhados em múltiplos níveis, tornando o código ilegível',
                  'Erro causado por callback',
                  'Callback chamado mais de uma vez',
                ],
                correct: 1,
                explanation:
                  'Callback hell é a pirâmide de indentação causada por callbacks aninhados. Promises e async/await foram criados exatamente para resolver isso.',
              },
              {
                question: 'O que é currying?',
                options: [
                  'Otimização de loops',
                  'Transformar uma função de N args em N funções de 1 arg cada',
                  'Compor funções em sequência',
                  'Memorizar resultados de funções',
                ],
                correct: 1,
                explanation:
                  'Currying transforma f(a,b) em f(a)(b). Permite aplicação parcial: criarSomador(5) retorna função que soma 5 a qualquer número.',
              },
              {
                question: 'Para que serve memoização?',
                options: [
                  'Guardar funções em variáveis',
                  'Cachear resultados de funções puras para evitar recalcular com os mesmos inputs',
                  'Converter callbacks em Promises',
                  'Criar cópias de funções',
                ],
                correct: 1,
                explanation:
                  'Memoização cacheia o resultado de chamadas anteriores. useMemo no React é memoização aplicada a componentes — evita recalcular valores caros.',
              },
              {
                question: 'Por que funções de primeira classe são importantes no JavaScript?',
                options: [
                  'Tornam o código mais lento',
                  'Permitem passar comportamento como dado — base de callbacks, eventos e programação funcional',
                  'É apenas uma convensão de nomenclatura',
                  'Só funciona em Node.js',
                ],
                correct: 1,
                explanation:
                  'Funções de primeira classe são o que torna possível: callbacks de eventos, .map/.filter, middleware em Express, HOCs em React. É um dos recursos mais poderosos do JS.',
              },
            ],
          },
        },
  {
          id: 'mod-2-7',
          title: 'Arrays e Métodos Funcionais',
          duration: '45 min',
          xp: 110,
          content: {
            sections: [
              {
                type: 'text',
                content: 'Arrays são listas ordenadas — a estrutura de dados mais usada no desenvolvimento web. APIs retornam arrays de dados. Listas de produtos, usuários, mensagens são arrays. Dominar os métodos funcionais de array (map, filter, reduce e amigos) é um dos maiores saltos de qualidade de código que você vai dar.'
              },
              {
                type: 'code',
                lang: 'javascript',
                content: '// ── OPERAÇÕES BÁSICAS ───────────────────────────────\nconst frutas = ["maçã", "banana", "laranja"];\n\n// Acessar e verificar\nconsole.log(frutas[0]);           // "maçã" (índice começa em 0)\nconsole.log(frutas.at(-1));       // "laranja" (último elemento — moderno)\nconsole.log(frutas.length);       // 3\nconsole.log(frutas.includes("banana")); // true\nconsole.log(frutas.indexOf("laranja")); // 2 (-1 se não encontrar)\n\n// Adicionar e remover\nfrutas.push("uva");               // adiciona no fim → ["maçã","banana","laranja","uva"]\nfrutas.unshift("abacaxi");        // adiciona no início\nfrutas.pop();                     // remove do fim\nfrutas.shift();                   // remove do início\nfrutas.splice(1, 1, "kiwi");      // remove 1 a partir do índice 1 e insere "kiwi"\n\n// Criar cópias (importante — evitar mutação acidental)\nconst copia = [...frutas];         // spread — cópia rasa\nconst slice = frutas.slice(1, 3);  // novo array com índices 1 e 2\n\n// Ordenar (cuidado: sort muta o original!)\nconst numeros = [3, 1, 4, 1, 5, 9, 2, 6];\nconst ordenados = [...numeros].sort((a, b) => a - b); // crescente\nconst decrescente = [...numeros].sort((a, b) => b - a);\nconsole.log(ordenados); // [1, 1, 2, 3, 4, 5, 6, 9]\n\n// Concatenar\nconst a = [1, 2, 3];\nconst b = [4, 5, 6];\nconst junto = [...a, ...b]; // [1,2,3,4,5,6] — prefer spread ao .concat()'
              },
              {
                type: 'code',
                lang: 'javascript',
                content: '// ── MÉTODOS FUNCIONAIS — o coração do JavaScript moderno\nconst produtos = [\n  { id: 1, nome: "Notebook", preco: 4500, categoria: "tech", ativo: true },\n  { id: 2, nome: "Mouse", preco: 150, categoria: "tech", ativo: true },\n  { id: 3, nome: "Cadeira", preco: 1200, categoria: "movel", ativo: false },\n  { id: 4, nome: "Monitor", preco: 1800, categoria: "tech", ativo: true },\n  { id: 5, nome: "Mesa", preco: 800, categoria: "movel", ativo: true },\n];\n\n// map — transforma cada elemento, retorna novo array do mesmo tamanho\nconst nomes = produtos.map(p => p.nome);\nconst comDesconto = produtos.map(p => ({ ...p, preco: p.preco * 0.9 }));\nconsole.log(nomes);        // ["Notebook","Mouse","Cadeira","Monitor","Mesa"]\n\n// filter — filtra, retorna novo array com elementos que passaram\nconst ativos = produtos.filter(p => p.ativo);\nconst tech = produtos.filter(p => p.categoria === "tech" && p.ativo);\nconsole.log(ativos.length);  // 4\n\n// find — retorna o PRIMEIRO que passar (não um array)\nconst cadeira = produtos.find(p => p.nome === "Cadeira");\nconst caro = produtos.find(p => p.preco > 2000);\nconsole.log(caro?.nome); // "Notebook"\n\n// reduce — transforma o array em qualquer coisa (número, objeto, outro array)\nconst totalPreco = produtos.reduce((soma, p) => soma + p.preco, 0);\nconsole.log(totalPreco); // 8450\n\n// Agrupar por categoria com reduce\nconst porCategoria = produtos.reduce((grupos, p) => {\n  const cat = p.categoria;\n  if (!grupos[cat]) grupos[cat] = [];\n  grupos[cat].push(p.nome);\n  return grupos;\n}, {});\nconsole.log(porCategoria);\n// { tech: ["Notebook","Mouse","Monitor"], movel: ["Cadeira","Mesa"] }'
              },
              {
                type: 'highlight',
                content: '🚀 Encadeamento (chaining): você pode combinar filter().map().reduce() em um pipeline. Exemplo: produtos.filter(p => p.ativo).map(p => p.preco).reduce((s,p) => s+p, 0) — total de produtos ativos. Cada método recebe o resultado do anterior. Isso é programação funcional no dia a dia.'
              },
              {
                type: 'code',
                lang: 'javascript',
                content: '// ── OUTROS MÉTODOS ESSENCIAIS ────────────────────────\nconst notas = [7, 8, 5, 9, 6, 10, 4, 8];\n\n// some — pelo menos um passa?\nconsole.log(notas.some(n => n >= 9));    // true\n\n// every — todos passam?\nconsole.log(notas.every(n => n >= 5));   // false (4 não passa)\n\n// flat — achata arrays aninhados\nconst matriz = [[1,2],[3,4],[5,6]];\nconsole.log(matriz.flat()); // [1,2,3,4,5,6]\n\n// flatMap — map + flat em um passo\nconst frases = ["olá mundo", "tudo bem"];\nconst palavras = frases.flatMap(f => f.split(" "));\nconsole.log(palavras); // ["olá","mundo","tudo","bem"]\n\n// Array.from — criar array a partir de qualquer iterável\nconsole.log(Array.from("abc"));          // ["a","b","c"]\nconsole.log(Array.from({length: 5}, (_,i) => i*2)); // [0,2,4,6,8]\n\n// Eliminar duplicatas com Set\nconst comDuplicatas = [1,2,2,3,3,3,4];\nconst unicos = [...new Set(comDuplicatas)];\nconsole.log(unicos); // [1,2,3,4]\n\n// Ordenar objetos por campo\nconst ordenadosPorPreco = [...produtos].sort((a,b) => a.preco - b.preco);\nconst ordenadosPorNome = [...produtos].sort((a,b) => a.nome.localeCompare(b.nome));\nconsole.log(ordenadosPorPreco.map(p => p.nome));'
              }
            ],
            exercise: {
              title: 'Pipeline de análise de dados',
              description: 'Dado o array de pedidos, use métodos funcionais para: (1) filtrar pedidos pagos com valor > 100, (2) calcular o total desses pedidos, (3) agrupar por cliente (objeto com nome do cliente como chave e total gasto), (4) encontrar o cliente que mais gastou.',
              starterCode: 'const pedidos = [\n  { id: 1, cliente: "Ana", valor: 250, status: "pago" },\n  { id: 2, cliente: "Bruno", valor: 80, status: "pendente" },\n  { id: 3, cliente: "Ana", valor: 180, status: "pago" },\n  { id: 4, cliente: "Carlos", valor: 420, status: "pago" },\n  { id: 5, cliente: "Bruno", valor: 310, status: "pago" },\n  { id: 6, cliente: "Ana", valor: 50, status: "pago" },\n  { id: 7, cliente: "Carlos", valor: 95, status: "cancelado" },\n];\n\n// 1. Pedidos pagos com valor > 100\nconst elegíveis = ;\n\n// 2. Total desses pedidos\nconst totalElegíveis = ;\n\n// 3. Gastos por cliente (ex: { Ana: 430, Carlos: 420, Bruno: 310 })\nconst gastosPorCliente = ;\n\n// 4. Cliente que mais gastou\nconst melhorCliente = ;\n\nconsole.log("Total elegíveis:", totalElegíveis);\nconsole.log("Por cliente:", gastosPorCliente);\nconsole.log("Maior gastador:", melhorCliente);\n',
              solutionHint: 'filter(p=>p.status==="pago"&&p.valor>100) | reduce((s,p)=>s+p.valor,0) | reduce((obj,p)=>{obj[p.cliente]=(obj[p.cliente]||0)+p.valor;return obj},{})',
              validate: (output, code) => {
                  return output.includes('1160') &&
                  (output.includes('Ana') || output.includes('Carlos')) &&
                  /\.filter\s*\(/.test(code) &&
                  /\.reduce\s*\(/.test(code) &&
                  !code.includes('for (') && !code.includes('for(') &&
                  !code.includes('let total = 0');
                },
              validateMessage: 'Use .filter() para selecionar pagos >100 e .reduce() para somar. Sem loops manuais.'
            },
            quiz: [
              { question: 'Qual a diferença entre map e forEach?', options: ['São idênticos', 'map retorna um novo array; forEach retorna undefined e é usado apenas pelos efeitos colaterais', 'forEach é mais rápido', 'map muta o array original'], correct: 1, explanation: 'map: transforma → retorna novo array. forEach: itera para efeito colateral (ex: logar, atualizar DOM) → retorna undefined. Para transformação, use sempre map.' },
              { question: 'O que filter retorna quando nenhum elemento passa?', options: ['null', 'undefined', 'Array vazio []', 'false'], correct: 2, explanation: 'filter sempre retorna um array. Se nada passar, retorna []. Por isso é seguro chamar .length no resultado sem verificar null.' },
              { question: 'O que é o segundo argumento do reduce?', options: ['Uma função de comparação', 'O valor inicial do acumulador', 'O índice atual', 'Um callback alternativo'], correct: 1, explanation: 'reduce((acumulador, atual) => ..., valorInicial). O valorInicial é o que o acumulador começa. Sem ele, reduce usa o primeiro elemento — o que pode causar bugs com arrays vazios.' },
              { question: 'Por que usar [...array] antes de .sort()?', options: ['É mais rápido', '.sort() muta o array original — o spread cria uma cópia primeiro', 'spread é obrigatório com sort', 'Para evitar TypeError'], correct: 1, explanation: 'sort() muta o array em que é chamado. Se você não quer alterar o original (imutabilidade), crie uma cópia: [...arr].sort(). Isso é especialmente importante em React.' },
              { question: 'Como remover duplicatas de um array com uma linha?', options: ['array.unique()', '[...new Set(array)]', 'array.filter((v,i,a) => a.indexOf(v)===i)', 'array.dedupe()'], correct: 1, explanation: 'Set armazena só valores únicos. Converter o array para Set remove duplicatas. Spread [...] converte de volta para array. Simples e eficiente.' },
            ]
          }
        },
  {
          id: 'mod-2-8',
          title: 'Objetos e Desestruturação',
          duration: '40 min',
          xp: 110,
          content: {
            sections: [
              {
                type: 'text',
                content: 'Objetos são coleções de pares chave-valor. Em JavaScript, objetos são a estrutura de dados mais ubíqua — praticamente tudo é um objeto. APIs retornam objetos JSON, componentes React recebem props como objetos, banco de dados retorna registros como objetos. Dominar objetos e desestruturação é pré-requisito para qualquer código moderno.'
              },
              {
                type: 'code',
                lang: 'javascript',
                content: '// ── CRIAR E MANIPULAR OBJETOS ────────────────────────\nconst usuario = {\n  id: 1,\n  nome: "Ana Silva",\n  email: "ana@exemplo.com",\n  nivel: 5,\n  endereco: {\n    cidade: "São Paulo",\n    estado: "SP",\n    cep: "01310-100"\n  },\n  tags: ["react", "typescript", "node"],\n  // método dentro do objeto\n  saudar() {\n    return `Olá, sou ${this.nome} de ${this.endereco.cidade}`;\n  }\n};\n\n// Acessar propriedades\nconsole.log(usuario.nome);              // dot notation — preferida\nconsole.log(usuario["email"]);          // bracket notation — para chaves dinâmicas\nconsole.log(usuario.endereco.cidade);  // aninhado\nconsole.log(usuario.saudar());         // chama o método\n\n// Verificar existência\nconsole.log("email" in usuario);       // true\nconsole.log("telefone" in usuario);    // false\nconsole.log(usuario.telefone);         // undefined (não lança erro)\n\n// Adicionar, modificar, remover\nusuario.nivel = 6;                     // modifica\nusuario.ultimoLogin = new Date();      // adiciona nova propriedade\ndelete usuario.ultimoLogin;            // remove\n\n// Verificar se é objeto\nconsole.log(typeof usuario === "object" && usuario !== null); // true'
              },
              {
                type: 'code',
                lang: 'javascript',
                content: '// ── DESESTRUTURAÇÃO — a sintaxe mais usada em código moderno\n\n// Básico\nconst { nome, email, nivel } = usuario;\nconsole.log(nome); // "Ana Silva"\n\n// Renomeando\nconst { nome: nomeCompleto, nivel: xp } = usuario;\nconsole.log(nomeCompleto); // "Ana Silva"\n\n// Com valor padrão\nconst { tema = "dark", idioma = "pt-BR" } = usuario; // usa default se undefined\n\n// Aninhado\nconst { endereco: { cidade, estado } } = usuario;\nconsole.log(`${cidade}-${estado}`); // "São Paulo-SP"\n\n// Em parâmetros de função — muito usado em React!\nfunction exibirPerfil({ nome, email, nivel = 1, tags = [] }) {\n  console.log(`${nome} (${email}) — Nível ${nivel}`);\n  console.log("Skills:", tags.join(", "));\n}\nexibirPerfil(usuario);\n\n// Desestruturação de array\nconst [primeiro, segundo, ...restante] = [10, 20, 30, 40, 50];\nconsole.log(primeiro);   // 10\nconsole.log(segundo);    // 20\nconsole.log(restante);   // [30, 40, 50]\n\n// Swap de variáveis com desestruturação\nlet a = 1, b = 2;\n[a, b] = [b, a];\nconsole.log(a, b); // 2 1'
              },
              {
                type: 'code',
                lang: 'javascript',
                content: '// ── OPERAÇÕES COM OBJETOS ────────────────────────────\n\n// Spread — copiar e mesclar\nconst config = { tema: "dark", idioma: "pt", tamanhoFonte: 14 };\nconst configCustom = { ...config, tema: "light", autoSave: true };\n// { tema: "light", idioma: "pt", tamanhoFonte: 14, autoSave: true }\n// propriedades duplicadas: a última vence\n\n// Atualizar objeto imutavelmente (padrão React)\nconst usuario2 = { ...usuario, nivel: 7, email: "novo@email.com" };\n// usuario original não muda — usuario2 é um novo objeto com as atualizações\n\n// Object.keys / values / entries\nconsole.log(Object.keys(config));    // ["tema","idioma","tamanhoFonte"]\nconsole.log(Object.values(config));  // ["dark","pt",14]\nconsole.log(Object.entries(config)); // [["tema","dark"],["idioma","pt"],["tamanhoFonte",14]]\n\n// Transformar com entries + fromEntries\nconst precos = { notebook: 4500, mouse: 150, monitor: 1800 };\nconst comDesconto = Object.fromEntries(\n  Object.entries(precos).map(([item, preco]) => [item, preco * 0.9])\n);\nconsole.log(comDesconto); // { notebook: 4050, mouse: 135, monitor: 1620 }\n\n// Object.assign — copiar propriedades\nconst destino = {};\nObject.assign(destino, { a: 1 }, { b: 2 }, { a: 99 });\nconsole.log(destino); // { a: 99, b: 2 } — último vence\n\n// Verificar objetos vazios\nconsole.log(Object.keys({}).length === 0); // true — objeto vazio'
              },
              {
                type: 'highlight',
                content: '⚡ Desestruturação é a sintaxe mais encontrada em código React moderno. Props são objetos desestruturados nos parâmetros: function Botao({ children, onClick, disabled = false }) {}. Respostas de API são desestruturadas: const { data, error, loading } = useFetch(url). Aprenda bem — você vai usar isso todo dia.'
              }
            ,
                  {
                    type: 'common_error',
                    title: 'Confundir escopo de variável dentro de função',
                    wrong: `let resultado = 0;

function somar(a, b) {
  resultado = a + b; // Muta variável externa!
}

somar(3, 4);
console.log(resultado); // 7
somar(10, 5);
console.log(resultado); // 15 — efeito colateral!`,
                    wrongLabel: 'Mutar variável externa cria efeito colateral — função impura.',
                    right: `function somar(a, b) {
  return a + b; // Retorna o valor — sem efeito colateral
}

const resultado = somar(3, 4);
console.log(resultado); // 7`,
                    rightLabel: 'Funções puras: recebem input, retornam output, sem mutar nada externo.',
                    explanation: 'Funções que dependem ou modificam estado externo são difíceis de testar e dão bugs imprevisíveis. Prefira funções puras: mesmos inputs → sempre mesmo output.',
                  }],
            exercise: {
              title: 'Transformação de dados de API real',
              description: 'Dado o objeto respostaAPI simulando uma resposta de API de usuários, use desestruturação para extrair os dados necessários e construa um objeto "perfil" limpo com: nomeCompleto (firstName + lastName), email, totalProjetos, plano, e ultimoAcesso formatado (só a data, sem hora).',
              starterCode: 'const respostaAPI = {\n  userId: 42,\n  username: "ana_dev",\n  personalInfo: {\n    firstName: "Ana",\n    lastName: "Silva",\n    email: "ana@dev.com",\n    createdAt: "2023-03-15T14:30:00Z"\n  },\n  subscription: {\n    plan: "pro",\n    expiresAt: "2025-12-31"\n  },\n  projetos: ["portfolio", "blog", "ecommerce", "dashboard", "api-rest"],\n  lastAccess: "2024-11-20T09:15:00Z"\n};\n\n// Use desestruturação para extrair os dados\n// Depois crie o objeto perfil:\nconst perfil = {\n  // nomeCompleto: "Ana Silva"\n  // email: "ana@dev.com"\n  // totalProjetos: 5\n  // plano: "pro"\n  // ultimoAcesso: "2024-11-20" (só a data)\n};\n\nconsole.log(perfil.nomeCompleto);\nconsole.log(perfil.totalProjetos);\nconsole.log(perfil.ultimoAcesso);\n',
              solutionHint: 'const { personalInfo: { firstName, lastName, email }, projetos, lastAccess, subscription: { plan } } = respostaAPI;',
              validate: (output, code) => {
                  return output.includes('Ana Silva') &&
                  output.includes('5') &&
                  output.includes('2024') &&
                  (code.includes('const {') || code.includes('let {') || code.includes('const [')) &&
                  (code.includes('...') || code.includes('Object.entries') || code.includes('Object.keys'));
                },
              validateMessage: 'Use desestruturação ({ nome, idade } = obj) e spread (...) ou Object.entries/keys.'
            },
            quiz: [
              { question: 'O que faz const { nome } = usuario?', options: ['Cria uma cópia do objeto', 'Extrai a propriedade nome do objeto para uma variável local', 'Remove nome do objeto', 'Verifica se nome existe'], correct: 1, explanation: 'Desestruturação extrai propriedades de objetos (e elementos de arrays) em variáveis separadas. const { nome } = obj é equivalente a const nome = obj.nome.' },
              { question: 'Como definir um valor padrão na desestruturação?', options: ['const { nivel || 1 } = obj', 'const { nivel = 1 } = obj', 'const { nivel: 1 } = obj', 'const nivel = obj.nivel ?? 1'], correct: 1, explanation: 'Sintaxe: const { prop = default } = objeto. O padrão só é usado quando a propriedade é undefined. null NÃO ativa o padrão — use ?? para isso.' },
              { question: 'O que faz { ...obj1, ...obj2 }?', options: ['Concatena arrays', 'Cria novo objeto com propriedades de ambos (último vence em duplicatas)', 'Compara os objetos', 'Converte para array'], correct: 1, explanation: 'Object spread cria novo objeto mesclando propriedades. Propriedades duplicadas: a do objeto mais à direita vence. Muito usado para atualização imutável em React.' },
              { question: 'O que retorna Object.entries(obj)?', options: ['Array de chaves', 'Array de valores', 'Array de pares [chave, valor]', 'Um novo objeto'], correct: 2, explanation: 'Object.entries() → [[k1,v1],[k2,v2],...]. Útil para: transformar com map, iterar com for...of, converter com Object.fromEntries.' },
              { question: 'Como acessar uma propriedade com nome dinâmico?', options: ['obj.chave', 'obj->chave', 'obj[variavel]', 'obj{variavel}'], correct: 2, explanation: 'Bracket notation obj[variavel] permite acesso dinâmico onde variavel contém o nome da propriedade. Ex: const campo = "email"; obj[campo] = obj.email.' },
            ]
          }
        }  ,{
    id: 'mp-phase-2',
    title: '🏗️ Mini-Projeto: Validador de Formulário',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase2,
    content: {
      sections: [
        {
          type: 'text',
          content: 'Chegou a hora de colocar tudo em prática! Neste mini-projeto guiado você vai construir algo real — não apenas um console.log, mas um resultado utilizável que pode entrar no seu portfólio.'
        }
      ]
    }
  }
  ],
  checklist: [
    'Entendo a diferença entre const, let e var — e por que uso const por padrão',
    'Consigo escrever condicionais com if/else e operador ternário',
    'Sei criar e usar loops for, while e for...of',
    'Consigo declarar funções (declaration, expression e arrow) e entendo escopo',
    'Sei manipular arrays com map(), filter(), reduce(), find() e forEach()',
    'Consigo criar objetos, acessar propriedades e usar desestruturação',
    'Entendo o que é truthy/falsy e como usar operadores lógicos && e ||',
    'Completei o mini-projeto Validador de Formulário',
  ],
};
