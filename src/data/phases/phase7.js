import { miniProjectPhase7 } from '../miniprojects.js';
export const phase7 = {
  id: 'phase-8',
  title: 'TypeScript',
  phase: 8,
  color: '#3178c6',
  icon: '🔷',
  description: 'TypeScript é obrigatório no mercado. Tipagem estática que previne bugs, melhora o autocomplete e torna o código autodocumentado.',
  checklist: [
    'Tipar variáveis, parâmetros e retornos de funções',
    'Criar interfaces e types para objetos',
    'Usar generics em funções e interfaces',
    'Entender a diferença entre interface e type',
    'Nunca usar any — preferir unknown ou tipos específicos',
    'Usar TypeScript com React (props tipadas, useState com tipo)',
    'Entender union types e type narrowing',
  ],
  modules: [
  {
          id: 'mod-7-1',
          title: 'TypeScript: Por que e Como',
          duration: '40 min',
          xp: 180,
          content: {
            sections: [
              { type: 'text', content: 'TypeScript é um superset de JavaScript que adiciona tipagem estática. O TypeScript é compilado para JavaScript — no final é JS rodando. Em 2024, praticamente todas as empresas que usam React exigem TypeScript.' },
              { type: 'highlight', content: '📊 Pesquisa Stack Overflow 2024: TypeScript é a 5ª linguagem mais amada. Em vagas React, +80% pedem TypeScript. Não aprender TS limita muito suas oportunidades.' },
              { type: 'code', lang: 'typescript', content: '// ── TIPOS BÁSICOS ────────────────────────────\nlet nome: string = "Ana";\nlet idade: number = 28;\nlet ativo: boolean = true;\nlet nada: null = null;\nlet indefinido: undefined = undefined;\n\n// Arrays\nlet numeros: number[] = [1, 2, 3];\nlet strings: Array<string> = ["a", "b"];\n\n// Tuple — array com tipos fixos por posição\nlet ponto: [number, number] = [10, 20];\nlet entrada: [string, number] = ["nome", 42];\n\n// Union types — pode ser um OU outro\nlet id: number | string = 42;\nid = "uuid-abc"; // também válido\n\n// Literal types — apenas esses valores\nlet direcao: "norte" | "sul" | "leste" | "oeste" = "norte";\nlet statusCode: 200 | 400 | 404 | 500 = 200;\n\n// any — EVITE (desativa verificação de tipos)\nlet qualquer: any = "perigoso";\nqualquer = 42; // permitido, mas perde os benefícios\n\n// unknown — any seguro\nlet input: unknown = obterEntrada();\nif (typeof input === "string") {\n  console.log(input.toUpperCase()); // TS sabe que é string aqui\n}' },
              { type: 'code', lang: 'typescript', content: '// ── INTERFACES E TYPES ───────────────────────\ninterface Usuario {\n  id: number;\n  nome: string;\n  email: string;\n  avatar?: string;         // opcional\n  readonly createdAt: Date; // somente leitura\n}\n\n// Type alias — mais flexível\ntype ID = number | string;\ntype Coordenada = { x: number; y: number };\ntype Callback = (erro: Error | null, dados?: unknown) => void;\n\n// Extender interfaces\ninterface Admin extends Usuario {\n  permissoes: string[];\n  nivel: "super" | "moderador";\n}\n\n// Intersection types\ntype AdminCompleto = Usuario & { permissoes: string[] };\n\n// Funções tipadas\nfunction somar(a: number, b: number): number {\n  return a + b;\n}\n\nconst formatarNome = (u: Usuario): string =>\n  `${u.nome} <${u.email}>`;\n\n// Funções com parâmetros opcionais e padrão\nfunction criar(nome: string, nivel: number = 1, ativo?: boolean): Usuario {\n  return { id: Date.now(), nome, email: "", createdAt: new Date() };\n}' },
              { type: 'code', lang: 'typescript', content: '// ── GENERICS ─────────────────────────────────\n// Funções reutilizáveis com tipos flexíveis\nfunction primeiro<T>(array: T[]): T | undefined {\n  return array[0];\n}\n\nconst n = primeiro([1, 2, 3]);       // T inferido como number\nconst s = primeiro(["a", "b"]);     // T inferido como string\n\n// Generic com restrição\nfunction obterPropriedade<T, K extends keyof T>(obj: T, chave: K): T[K] {\n  return obj[chave];\n}\n\nconst nome = obterPropriedade({ nome: "Ana", idade: 28 }, "nome"); // string\n\n// Interface genérica\ninterface Resposta<T> {\n  dados: T;\n  status: number;\n  mensagem: string;\n}\n\ntype RespostaUsuario = Resposta<Usuario>;\ntype RespostaLista = Resposta<Usuario[]>;' },
              { type: 'highlight', content: '🎯 Interface vs Type: prefira interface para objetos (pode ser extendida mais facilmente). Use type para unions, intersections e tipos primitivos. Na prática, as diferenças são mínimas no dia a dia.' },
            ,
                  {
                    type: 'common_error',
                    title: 'Usar any em vez de tipar corretamente',
                    wrong: `function processar(dados: any) {
  return dados.nome.toUpperCase(); // Sem autocompletar
  // TypeScript não avisa se nome não existir
}

processar({ email: "x" }); // Runtime error!`,
                    wrongLabel: 'any desativa TODA a verificação de tipos — TypeScript vira JavaScript.',
                    right: `interface Usuario {
  nome: string;
  email: string;
}

function processar(dados: Usuario) {
  return dados.nome.toUpperCase(); // TS garante que existe!
}`,
                    rightLabel: 'Interface ou type define exatamente o shape — erros são pegos em build.',
                    explanation: 'any é o escape hatch que destrói os benefícios do TypeScript. Se você não sabe o tipo, use unknown (mais seguro) ou defina uma interface. Se estiver usando any "provisoriamente", ele raramente sai.',
                  }],
            exercise: {
              title: 'Tipando um sistema de tarefas',
              description: 'Crie as interfaces e tipos para um sistema de tarefas: Task (id, titulo, descricao?, status, prioridade, criadoEm, responsavel?), Status como union de strings, Prioridade como union. Crie uma função criarTarefa com os parâmetros corretos.',
                            solutionHint: 'Defina interface Tarefa { id: number; titulo: string; concluida: boolean }. Use Tarefa[] para arrays. Funções: (tarefa: Tarefa): void.',
starterCode: '// Em TypeScript definiríamos:\n// type Status = "pendente" | "em_progresso" | "concluido"\n// type Prioridade = "baixa" | "media" | "alta" | "critica"\n// interface Task { id: string; titulo: string; status: Status; prioridade: Prioridade; criadoEm: Date }\n// O exercício abaixo implementa a mesma lógica em JavaScript puro:\n\nconst STATUS_VALIDOS = ["pendente", "em_progresso", "concluido"];\nconst PRIORIDADES_VALIDAS = ["baixa", "media", "alta", "critica"];\n\n// Mesma assinatura do TS, mas sem anotações de tipo\nfunction criarTarefa(titulo, status, prioridade, descricao, responsavel) {\n  if (!STATUS_VALIDOS.includes(status || "pendente")) throw new Error("Status inválido");\n  if (!PRIORIDADES_VALIDAS.includes(prioridade || "media")) throw new Error("Prioridade inválida");\n  return {\n    id: Math.random().toString(36).slice(2),\n    titulo,\n    status: status || "pendente",\n    prioridade: prioridade || "media",\n    criadoEm: new Date(),\n    descricao: descricao || null,\n    responsavel: responsavel || null,\n  };\n}\n\n// Teste\nconst tarefa = criarTarefa("Implementar login");\nconsole.log(tarefa.titulo);\nconsole.log(tarefa.status);\nconsole.log(tarefa.criadoEm instanceof Date);\n',
              solutionHint: 'type Status = "pendente" | "em_progresso" | "concluido" | interface Task { id: string; titulo: string; status: Status; ... }',
              validate: (output, code) => output.includes('Implementar login') && output.includes('pendente') && output.includes('true'),
              validateMessage: 'Exiba: titulo, status "pendente" e true para instanceof Date.'
            },
            quiz: [
              { question: 'O que é TypeScript em relação ao JavaScript?', options: ['Uma linguagem completamente nova', 'Um superset do JS que adiciona tipagem estática e compila para JS', 'Uma versão mais rápida do JS', 'Um framework JavaScript'], correct: 1, explanation: 'TS é JS + tipos. Todo JS válido é TS válido. O compilador tsc converte .ts para .js. Tipos existem apenas em desenvolvimento.' },
              { question: 'Qual a diferença entre any e unknown?', options: ['São idênticos', 'any desativa verificação de tipos; unknown requer verificação antes de usar', 'unknown é mais rápido', 'any é mais seguro'], correct: 1, explanation: 'any: pode fazer qualquer coisa (perigoso). unknown: tipo seguro do any — você precisa verificar o tipo antes de usar.' },
              { question: 'O que são generics?', options: ['Componentes sem props', 'Tipos parametrizados que funcionam com múltiplos tipos mantendo type safety', 'Tipos padrão do TS', 'Alias de tipos simples'], correct: 1, explanation: 'Generics permitem criar funções, classes e interfaces que funcionam com diferentes tipos. Array<T>, Promise<T> são exemplos built-in.' },
              { question: 'O que o ? significa em uma propriedade de interface?', options: ['A propriedade pode ser null', 'A propriedade é opcional (pode não existir)', 'A propriedade é somente leitura', 'A propriedade pode ser qualquer tipo'], correct: 1, explanation: 'avatar?: string significa que a propriedade pode não existir (undefined). Sem ?, é obrigatória.' },
              { question: 'O que é keyof?', options: ['Operador para chaves de Map', 'Union type de todas as chaves de um tipo/interface', 'Método de Object', 'Tipo de função'], correct: 1, explanation: 'keyof T retorna uma union com todas as chaves de T. keyof { nome: string, idade: number } = "nome" | "idade".' },
            ]
          }
        },
  {
          id: 'mod-7-2',
          title: 'TypeScript com React',
          duration: '45 min',
          xp: 200,
          content: {
            sections: [
              { type: 'text', content: 'TypeScript e React juntos é o padrão do mercado. Props tipadas documentam o componente automaticamente, o autocomplete fica perfeito e você elimina uma classe inteira de bugs em tempo de compilação.' },
              { type: 'code', lang: 'typescript', content: '// ── PROPS TIPADAS ────────────────────────────\nimport { ReactNode, MouseEvent } from "react";\n\ninterface BotaoProps {\n  children: ReactNode;           // qualquer conteúdo React\n  variante?: "primario" | "perigo" | "ghost";\n  tamanho?: "sm" | "md" | "lg";\n  disabled?: boolean;\n  carregando?: boolean;\n  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;\n  className?: string;\n}\n\nfunction Botao({\n  children,\n  variante = "primario",\n  tamanho = "md",\n  disabled = false,\n  carregando = false,\n  onClick,\n  className = "",\n}: BotaoProps) {\n  return (\n    <button\n      className={`btn btn-${variante} btn-${tamanho} ${className}`}\n      disabled={disabled || carregando}\n      onClick={onClick}\n    >\n      {carregando ? "Carregando..." : children}\n    </button>\n  );\n}' },
              { type: 'code', lang: 'typescript', content: '// ── HOOKS COM TYPESCRIPT ─────────────────────\nimport { useState, useEffect, useCallback } from "react";\n\ninterface Usuario {\n  id: number;\n  nome: string;\n  email: string;\n}\n\n// useState com tipo explícito\nconst [usuario, setUsuario] = useState<Usuario | null>(null);\nconst [lista, setLista] = useState<Usuario[]>([]);\n\n// useRef tipado\nimport { useRef } from "react";\nconst inputRef = useRef<HTMLInputElement>(null);\nconst focar = () => inputRef.current?.focus();\n\n// Custom hook tipado\ninterface UseFetchReturn<T> {\n  data: T | null;\n  loading: boolean;\n  error: string | null;\n  refetch: () => void;\n}\n\nfunction useFetch<T>(url: string): UseFetchReturn<T> {\n  const [data, setData] = useState<T | null>(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState<string | null>(null);\n  \n  const buscar = useCallback(async () => {\n    setLoading(true);\n    try {\n      const r = await fetch(url);\n      setData(await r.json() as T);\n    } catch (e) {\n      setError(e instanceof Error ? e.message : "Erro desconhecido");\n    } finally {\n      setLoading(false);\n    }\n  }, [url]);\n  \n  useEffect(() => { buscar(); }, [buscar]);\n  \n  return { data, loading, error, refetch: buscar };\n}' },
              { type: 'highlight', content: '🔥 tsconfig.json com "strict": true é obrigatório em projetos profissionais. Ativa: noImplicitAny, strictNullChecks, strictFunctionTypes. Começa estrito — relaxar depois é fácil, ao contrário é difícil.' },
            ],
            exercise: {
              title: 'Componente tipado com generics',
              description: 'Crie um componente genérico Lista<T> que recebe: items (T[]), renderItem (função (item: T) => ReactNode), keyExtractor ((item: T) => string), e title opcional. Demonstre usando com User[] e Product[].',
                            solutionHint: 'interface Props<T> { items: T[]; renderItem: (item: T) => ReactNode }. O componente recebe o tipo: function Lista<T extends { id: number }>(props: Props<T>).',
starterCode: '// Em TypeScript teríamos interfaces:\n// interface User { id: string; nome: string; }\n// interface Product { sku: string; nome: string; preco: number; }\n// function Lista<T>({ items, renderItem, keyExtractor, title }: ListaProps<T>) { ... }\n// Em JavaScript puro, a lógica é a mesma sem as anotações de tipo:\n\n// Dados de exemplo (equivale a User[] e Product[] do TypeScript)\nconst users = [\n  { id: "1", nome: "Ana" },\n  { id: "2", nome: "Bruno" },\n];\n\nconst products = [\n  { sku: "A1", nome: "Notebook", preco: 3500 },\n];\n\n// Função genérica Lista — recebe os itens, função de render e extrator de chave\nfunction Lista({ items, renderItem, keyExtractor, title }) {\n  if (title) console.log("=== " + title + " ===");\n  items.forEach(item => {\n    const key = keyExtractor(item);\n    const rendered = renderItem(item);\n    console.log(key + ": " + rendered);\n  });\n}\n\n// Simule o comportamento\nconst userKeys = users.map(u => u.id);\nconst productKeys = products.map(p => p.sku);\n\nLista({ items: users, renderItem: u => u.nome, keyExtractor: u => u.id, title: "Usuários" });\nLista({ items: products, renderItem: p => p.nome + " R$" + p.preco, keyExtractor: p => p.sku });\n\nconsole.log("User keys:", userKeys);\nconsole.log("Product keys:", productKeys);\nconsole.log("Componente genérico funciona para ambos!");\n',
              solutionHint: 'function Lista<T>({ items, renderItem, keyExtractor, title }: ListaProps<T>) { ... }',
              validate: (output, code) => output.includes('1') && output.includes('A1') && output.includes('genérico'),
              validateMessage: 'Exiba as keys e confirme que o componente é genérico.'
            },
            quiz: [
              { question: 'Como tipar useState que pode ser null inicialmente?', options: ['useState(null)', 'useState<Tipo | null>(null)', 'useState<Tipo>(null)', 'useState?: Tipo'], correct: 1, explanation: 'useState<Usuario | null>(null) — o generic diz que pode ser Usuario ou null. TS vai exigir verificação antes de usar propriedades.' },
              { question: 'O que é ReactNode?', options: ['O tipo do componente App', 'Qualquer coisa que React pode renderizar (JSX, string, number, null, array)', 'O retorno de useRef', 'Tipo de eventos'], correct: 1, explanation: 'ReactNode é o tipo mais amplo para children — aceita JSX, string, number, null, undefined, boolean, arrays.' },
              { question: 'Como tipar o evento onClick de um botão?', options: ['(e: Event) => void', '(e: MouseEvent<HTMLButtonElement>) => void', '(e: Click) => void', '() => void apenas'], correct: 1, explanation: 'MouseEvent<HTMLButtonElement> é o tipo correto. O generic especifica qual elemento disparou o evento.' },
              { question: 'O que faz tsconfig "strict": true?', options: ['Só deixa código perfeito compilar', 'Ativa várias verificações rígidas: noImplicitAny, strictNullChecks, etc.', 'Impede o uso de any', 'Apenas verifica tipos de retorno'], correct: 1, explanation: '"strict" ativa um conjunto de flags rigorosas. O mais importante: strictNullChecks (null/undefined são tipos distintos) e noImplicitAny.' },
              { question: 'Como criar um tipo para props de componente sem interface?', options: ['Props = () => JSX', 'type Props = { nome: string }', 'props: string', 'Não é possível com type'], correct: 1, explanation: 'type Props = { ... } é tão válido quanto interface. Convenção: muitos usam interface para Props, mas ambos funcionam igual para objetos.' },
            ]
          }
        }
  ,{
    id: 'mod-7-3',
    title: 'Utility Types: Partial, Pick, Omit e Record',
    duration: '45 min',
    xp: 190,
    content: {
      sections: [
        { type: 'text', content: 'TypeScript tem tipos utilitários built-in que transformam tipos existentes. São atalhos que você usa todo dia — muito mais limpos que reescrever interfaces manualmente.' },
        { type: 'code', lang: 'typescript', content: 'interface Usuario { id: number; nome: string; email: string; senha: string; }\n// Partial: todos opcionais (para updates)\ntype UsuarioUpdate = Partial<Omit<Usuario, \'id\'>>;\n// Pick: selecionar campos\ntype UsuarioPublico = Pick<Usuario, \'id\' | \'nome\'>;\n// Omit: excluir campos\ntype UsuarioSemSenha = Omit<Usuario, \'senha\'>;\n// Record: objeto tipado\ntype StatusMap = Record<\'ativo\' | \'inativo\', string>;\nconst labels: StatusMap = { ativo: \'Conta ativa\', inativo: \'Inativa\' };\n// ReturnType + Awaited: inferir tipos sem duplicar interfaces\nasync function getUser(id: number) { return { id, nome: \'Ana\' }; }\ntype User = Awaited<ReturnType<typeof getUser>>;\nconsole.log(\"Utility Types: uma fonte de verdade, tipos derivados automáticos.\");' },
        { type: 'common_error', title: 'Reescrever interfaces manualmente', wrong: 'interface Usuario { id:number; nome:string; email:string; }\ninterface UsuarioUpdate { nome?:string; email?:string; }  // duplicado!\ninterface UsuarioPublico { id:number; nome:string; }        // duplicado!', wrongLabel: 'Interfaces duplicadas ficam dessincronizadas quando a base muda.', right: 'interface Usuario { id:number; nome:string; email:string; }\ntype UsuarioUpdate  = Partial<Omit<Usuario, \'id\'>>;\ntype UsuarioPublico = Pick<Usuario, \'id\'|\'nome\'>;', rightLabel: 'Utility Types derivam de uma fonte de verdade única.', explanation: 'Com Utility Types, há uma fonte de verdade e os tipos derivados se atualizam automaticamente.' },
      ],
      exercise: {
        title: 'Criar tipos derivados',
        description: 'Dado Produto, crie ProdutoResumo (id, nome, preco via Pick), ProdutoUpdate (todos opcionais exceto id), ProdutoCatalogo (sem custo e fornecedorId via Omit), NivelEstoque como Record.',
                solutionHint: 'Pick<T, "campo"> seleciona campos. Omit<T, "campo"> exclui campos. Partial<T> torna todos opcionais. Record<K, V> cria objeto tipado com chaves e valores.',
starterCode: `// Em TypeScript teríamos:
// interface Produto { id:number; nome:string; preco:number; custo:number; fornecedorId:number; categoria:string; }
// type ProdutoResumo   = Pick<Produto, 'id'|'nome'|'preco'>
// type ProdutoUpdate   = { id: number } & Partial<Omit<Produto, 'id'>>
// type ProdutoCatalogo = Omit<Produto, 'custo'|'fornecedorId'>
// JavaScript puro equivalente — mesma lógica sem anotações:

// "Produto" como objeto JS — shape idêntico ao da interface TS
const criarProduto = (id, nome, preco, custo, fornecedorId, categoria) =>
  ({ id, nome, preco, custo, fornecedorId, categoria });

// "Pick" em JS — seleciona campos manualmente
function pick(obj, campos) {
  return campos.reduce((acc, k) => { acc[k] = obj[k]; return acc; }, {});
}

// "Omit" em JS — exclui campos
function omit(obj, campos) {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !campos.includes(k)));
}

// Usando as funções utilitárias
const p = criarProduto(1, 'Caneta', 2.5, 0.8, 42, 'papelaria');

const resumo = pick(p, ['id', 'nome', 'preco']);      // equivale a ProdutoResumo
const catalogo = omit(p, ['custo', 'fornecedorId']);   // equivale a ProdutoCatalogo
const update = { id: 1, nome: 'Nova Caneta' };          // equivale a ProdutoUpdate

const NivelEstoque = { critico: 'Urgente', baixo: 'Avaliar', normal: 'OK', alto: 'Cheio' };

console.log('resumo:', resumo.nome);
console.log('update:', update.id === 1);
console.log('msg:', NivelEstoque['critico']);
`,
        validate: (output, code) => code.includes('Pick<') && code.includes('Omit<') && code.includes('Record<') && output.includes('Caneta') && output.includes('Urgente'),
        validateMessage: 'Use Pick, Omit, Partial e Record. resumo: Caneta, msg: Urgente.',
      },
      quiz: [
        { question: 'O que Partial<T> faz?', options: ['Remove null', 'Torna todos os campos de T opcionais', 'Seleciona campos', 'Cria cópia readonly'], correct: 1, explanation: 'Partial<T> transforma todos os campos em opcionais (?). Útil para tipos de update.' },
        { question: 'Diferença entre Pick e Omit?', options: ['São iguais', 'Pick seleciona campos a INCLUIR; Omit seleciona os a EXCLUIR', 'Pick para interfaces', 'Pick cria campos'], correct: 1, explanation: 'Pick<T, "a"|"b"> = só esses campos. Omit<T, "a"|"b"> = tudo exceto esses.' },
        { question: 'Por que ReturnType é útil?', options: ['Performance', 'Infere tipo de retorno sem declarar interface separada', 'Força tipo específico', 'Verifica parâmetros'], correct: 1, explanation: 'ReturnType infere o tipo de retorno. Se a função mudar, o tipo derivado se atualiza.' },
      ],
    },
  }
  ,{
    id: 'mod-7-4',
    title: 'Generics: Tipos Reutilizáveis',
    duration: '50 min',
    xp: 200,
    content: {
      sections: [
        { type: 'text', content: 'Generics permitem escrever funções e tipos que funcionam com qualquer tipo mantendo segurança. É o que diferencia código TypeScript iniciante de código sênior.' },
        { type: 'code', lang: 'typescript', content: '// Sem generics: duplicar ou usar any\nfunction primeiro<T>(arr: T[]): T | undefined { return arr[0]; }\nconst n = primeiro([1,2,3]);       // TypeScript infere: number\nconst s = primeiro([\'a\',\'b\']);    // TypeScript infere: string\n\n// Constraints: T deve ter id: number\nfunction maiorId<T extends { id: number }>(items: T[]): T | undefined {\nreturn items.reduce((max, i) => i.id > max.id ? i : max);\n}\n\n// Generic em interface\ninterface ApiResponse<T> { data: T; status: number; message: string; }\ntype RespostaUser = ApiResponse<{ id:number; nome:string }>;\n\n// Generic hook\nfunction useLocalStorage<T>(key: string, init: T) {\nconst [v, setV] = useState<T>(() => {\nconst item = localStorage.getItem(key);\nreturn item ? JSON.parse(item) as T : init;\n});\nreturn [v, (val: T) => { setV(val); localStorage.setItem(key, JSON.stringify(val)); }] as const;\n}\nconsole.log(\"Generics: escreva uma vez, use com qualquer tipo.\");' },
        { type: 'common_error', title: 'Usar any quando generics resolvem', wrong: 'function map(items: any[], fn: (i: any) => any): any[] { return items.map(fn); }\n// Perde autocomplete e verificação de tipo', wrongLabel: 'any desliga o TypeScript.', right: 'function map<T, R>(items: T[], fn: (i: T) => R): R[] { return items.map(fn); }\nconst nums  = map([1,2,3], n => n*2);          // R: number[]\nconst names = map([{nome:\'Ana\'}], u => u.nome); // R: string[]', rightLabel: 'Generics mantêm segurança: TypeScript infere T e R em cada chamada.', explanation: 'any desabilita verificação. Generics mantêm a segurança com flexibilidade.' },
      ],
      exercise: {
        title: 'Utilitários genéricos',
        description: 'Implemente agruparPor<T>(items, getKey), paginar<T>(items, pagina, porPagina) → {dados, total, totalPaginas} e memo<T, R>(fn) que cacheia resultados.',
                solutionHint: 'function fn<T>(arr: T[]): T. Para constraints: <T extends { id: number }>. Para cache: Map<string, R> com JSON.stringify(args) como chave.',
starterCode: `// Em TypeScript: function agruparPor<T>(items: T[], getKey: (i:T) => string): Record<string, T[]>
// Em TypeScript: function paginar<T>(items: T[], pagina: number, porPagina: number): { dados: T[]; total: number; totalPaginas: number }
// Em TypeScript: function memo<T, R>(fn: (arg: T) => R): (arg: T) => R
// JavaScript puro — mesma lógica sem anotações de tipo:

function agruparPor(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = [...(acc[key] || []), item];
    return acc;
  }, {});
}

function paginar(items, pagina, porPagina) {
  const inicio = (pagina - 1) * porPagina;
  const dados = items.slice(inicio, inicio + porPagina);
  return { dados, total: items.length, totalPaginas: Math.ceil(items.length / porPagina) };
}

function memo(fn) {
  const cache = new Map();
  return (arg) => {
    const key = JSON.stringify(arg);
    if (cache.has(key)) return cache.get(key);
    const result = fn(arg);
    cache.set(key, result);
    return result;
  };
}

const produtos = [
  { nome: 'Caneta', categoria: 'papelaria' },
  { nome: 'Lápis', categoria: 'papelaria' },
  { nome: 'Mouse', categoria: 'informatica' },
];
console.log(JSON.stringify(agruparPor(produtos, p => p.categoria)));

const numeros = Array.from({ length: 20 }, (_, i) => i + 1);
const pagina1 = paginar(numeros, 1, 5);
console.log(pagina1.dados.join(','));
console.log('Total páginas:', pagina1.totalPaginas);

const dobro = memo(n => n * 2);
console.log(dobro(10));
console.log(dobro(10));
`,
        validate: (output, code) => code.includes('agruparPor') && code.includes('memo') && code.includes('cache') && output.includes('elet: 2') && output.includes('totalPaginas: 4') && output.includes('7'),
        validateMessage: 'elet: 2, totalPaginas: 4, "calc" aparece 1 vez, memo(3,4)=7.',
      },
      quiz: [
        { question: 'O que <T extends { id: number }> faz?', options: ['Cria id', 'Restringe T a tipos com id: number (constraint)', 'Valor padrão', 'Converte T'], correct: 1, explanation: 'extends em generics é constraint: T pode ser qualquer tipo desde que tenha id: number.' },
        { question: 'Diferença entre any e unknown?', options: ['Iguais', 'any desabilita verificação; unknown requer type guard antes de usar', 'unknown mais rápido', 'any só em generics'], correct: 1, explanation: 'unknown é o "any seguro" — você deve verificar o tipo antes de usar.' },
        { question: 'O que é infer?', options: ['Importar tipos', 'Capturar tipo dentro de conditional type', 'TS adivinhar tipo', 'Converter em runtime'], correct: 1, explanation: 'infer captura tipos em conditional types: T extends Promise<infer U> ? U : T.' },
      ],
    },
  }
  ,{
    id: 'mod-7-5',
    title: 'TypeScript no Mundo Real: tsconfig e Type Guards',
    duration: '40 min',
    xp: 170,
    content: {
      sections: [
        { type: 'text', content: 'Configurar o tsconfig corretamente é o que a maioria dos tutoriais pula. strict: true é a config mais importante. Type narrowing e Discriminated Unions são as skills mais usadas no dia a dia.' },
        { type: 'code', lang: 'json', content: '// tsconfig.json essencial\n{\n"compilerOptions": {\n"target": "ES2022", "module": "ESNext", "moduleResolution": "bundler",\n"strict": true,                  // MAIS IMPORTANTE: habilita tudo\n"noUnusedLocals": true,\n"noUnusedParameters": true,\n"noUncheckedIndexedAccess": true, // array[i] pode ser undefined\n"baseUrl": ".", "paths": { "@/*": ["./src/*"] }\n}\n}' },
        { type: 'code', lang: 'typescript', content: '// TYPE NARROWING\nfunction processar(v: string | number | null) {\nif (v === null) return;          // elimina null\nif (typeof v === \'string\') return v.toUpperCase(); // TS sabe: string\nreturn v.toFixed(2);              // TS sabe: number\n}\n\n// DISCRIMINATED UNIONS: padrão em estado/Redux\ntype Evento =\n| { tipo: \'carregando\' }\n| { tipo: \'sucesso\'; dados: string[] }\n| { tipo: \'erro\'; mensagem: string };\n\nfunction render(e: Evento) {\nswitch (e.tipo) {\ncase \'carregando\': return \'Aguarde\';\ncase \'sucesso\'   : return e.dados.length + \' itens\';\ncase \'erro\'      : return \'Erro: \' + e.mensagem;\n}\n}\n// TYPE GUARD\nfunction ehAdmin(u: User): u is AdminUser {\nreturn u.role === \'admin\';\n}\nconsole.log(\"Discriminated unions + type guards = TS de nível senior.\");' },
        { type: 'common_error', title: 'strict: false', wrong: '// tsconfig: "strict": false\nfunction getNome(u: {nome:string}|null): string {\nreturn u.nome; // aceita sem verificar null!\n// TypeError em runtime', wrongLabel: 'strict: false = TypeScript sem dentes. NullPointerException em produção.', right: '// strict: true\nfunction getNome(u: {nome:string}|null): string {\nif (!u) return \'Desconhecido\'; // obrigado a tratar\nreturn u.nome;\n}\n// const nome = user?.nome ?? \'Desconhecido\';', rightLabel: 'strict: true força tratar null/undefined — elimina categoria de bugs.', explanation: 'strictNullChecks é a feature mais valiosa do TypeScript. Força você a tratar null/undefined explicitamente.' },
      ],
      exercise: {
        title: 'Discriminated Union e type guards',
        description: 'Crie Notificacao como union com tipos email, sms e push. Implemente processarNotificacao com switch e ehUrgente como type guard.',
        starterCode: `// Em TypeScript teríamos union types discriminados:
// type Notificacao =
//   | { tipo: 'email'; dest: string; assunto: string }
//   | { tipo: 'sms';   tel: string;  msg: string }
//   | { tipo: 'push';  dev: string;  titulo: string; badge?: number };
// function processarNotificacao(n: Notificacao): string { ... }
// JavaScript puro — mesma lógica, validação em runtime:

function processarNotificacao(n) {
  switch (n.tipo) {
    case 'email': return 'Email→' + n.dest + ':' + n.assunto;
    case 'sms':   return 'SMS→' + n.tel;
    case 'push':  return 'Push→' + n.dev + ':' + n.titulo + (n.badge ? ' [' + n.badge + ']' : '');
    default: throw new Error('Tipo desconhecido: ' + n.tipo);
  }
}

const notificacoes = [
  { tipo: 'email', dest: 'ana@dev.com', assunto: 'Deploy feito!' },
  { tipo: 'sms',   tel: '+5511999',     msg: 'Código: 1234' },
  { tipo: 'push',  dev: 'iphone-abc',   titulo: 'Nova mensagem', badge: 3 },
];

notificacoes.forEach(n => console.log(processarNotificacao(n)));
`,
        validate: (output, code) => code.includes("tipo: 'email'") && code.includes('switch') && code.includes('n is ') && output.includes('urgente:'),
        validateMessage: 'Union com 3 tipos, switch em processarNotificacao, type guard com "n is".',
      },
      quiz: [
        { question: 'O que é strictNullChecks?', options: ['Verifica null em runtime', 'Força tratamento de null/undefined em compilação', 'Proíbe null', 'Erro em runtime'], correct: 1, explanation: 'Sem strictNullChecks: null aparece silenciosamente. Com ela: você deve declarar "string | null" e tratar.' },
        { question: 'O que é Discriminated Union?', options: ['Union incompatível', 'Union com campo literal identificador, permitindo narrowing automático', 'Union sem undefined', 'Union de funções'], correct: 1, explanation: 'Discriminated Union: todas as variantes têm campo comum (tipo: "email"|"sms"|"push"). Switch nesse campo → TS sabe qual variante tratar.' },
        { question: 'noUncheckedIndexedAccess faz o quê?', options: ['Proíbe índice', 'array[i] retorna T|undefined, forçando verificação de existência', 'Erro em arrays vazios', 'Desabilita string key'], correct: 1, explanation: 'array[0] passa a retornar T|undefined. Força verificar if (item !== undefined).' },
      ],
    },
  }
,{
    id: 'mp-phase-7',
    title: '🏗️ Mini-Projeto: Módulo TypeScript Type-Safe',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase7,
    content: {
      sections: [{ type: 'text', content: 'Construa algo real aplicando o que aprendeu nesta fase.' }]
    }
  }
  ]
};
