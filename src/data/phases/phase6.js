import { miniProjectPhase6 } from '../miniprojects.js';
export const phase6 = {
  id: 'phase-7',
  title: 'React',
  phase: 6,
  color: '#61dafb',
  icon: '⚛️',
  description: 'A biblioteca mais popular para UIs. Componentes, estado, hooks e o ecossistema React.',
  checklist: [
    'Criar componentes funcionais e passar props entre eles',
    'Gerenciar estado local com useState',
    'Usar useEffect para buscar dados e gerenciar side effects',
    'Nunca mutar estado diretamente (sempre criar novo array/objeto)',
    'Criar listas com .map() e usar key corretamente',
    'Usar Context API para compartilhar estado entre componentes',
    'Implementar formulários controlados',
    'Explicar quando um componente re-renderiza',
  ],
  modules: [
    {
      id: 'mod-6-1',
      title: 'Componentes e Props',
      duration: '40 min',
      xp: 150,
      content: {
        sections: [
          { type: 'text', content: 'React é uma biblioteca JavaScript para construir UIs compostas de componentes reutilizáveis. Componentes são funções que recebem dados (props) e retornam JSX — uma sintaxe que parece HTML mas é JavaScript.' },
          { type: 'code', lang: 'jsx', content: '// Componente funcional básico\nfunction Botao({ children, variante = "primario", onClick, disabled = false }) {\n  const estilos = {\n    primario: "bg-purple-600 text-white",\n    secundario: "border border-gray-300 text-gray-700",\n    perigo: "bg-red-500 text-white",\n  };\n  \n  return (\n    <button\n      className={`px-4 py-2 rounded ${estilos[variante]} ${disabled ? "opacity-50" : ""}`}\n      onClick={onClick}\n      disabled={disabled}\n      type="button"\n    >\n      {children}\n    </button>\n  );\n}\n\n// Usando o componente\nfunction App() {\n  return (\n    <div>\n      <Botao onClick={() => console.log("clicou!")}>Salvar</Botao>\n      <Botao variante="perigo">Deletar</Botao>\n      <Botao variante="secundario" disabled>Desabilitado</Botao>\n    </div>\n  );\n}' },
          { type: 'code', lang: 'jsx', content: '// Props especiais\nfunction Card({ titulo, children, className = "" }) {\n  return (\n    <div className={`card ${className}`}>\n      <h2>{titulo}</h2>\n      <div className="card-body">{children}</div>\n    </div>\n  );\n}\n\n// Renderização condicional\nfunction Status({ carregando, erro, dados }) {\n  if (carregando) return <div>Carregando...</div>;\n  if (erro) return <div className="erro">Erro: {erro}</div>;\n  if (!dados) return null;\n  \n  return <div>{dados.nome}</div>;\n}\n\n// Listas com key\nfunction ListaProdutos({ produtos }) {\n  return (\n    <ul>\n      {produtos.map(produto => (\n        <li key={produto.id}>\n          {produto.nome} — R$ {produto.preco.toFixed(2)}\n        </li>\n      ))}\n    </ul>\n  );\n}' },
          { type: 'highlight', content: '🔑 A prop key em listas é obrigatória. Sem ela, React não sabe qual item foi adicionado/removido/reordenado. Use um ID único — nunca o índice do array (exceto em listas estáticas).' },
        ,
                  {
                    type: 'common_error',
                    title: 'Mutar o estado diretamente em vez de usar setState',
                    wrong: `const [lista, setLista] = useState([1, 2, 3]);

function adicionar(item) {
  lista.push(item);    // Muta diretamente!
  setLista(lista);     // React não detecta mudança
}`,
                    wrongLabel: 'Mutar o array original — React não re-renderiza porque é o mesmo objeto.',
                    right: `const [lista, setLista] = useState([1, 2, 3]);

function adicionar(item) {
  setLista([...lista, item]); // Novo array!
  // ou: setLista(prev => [...prev, item]);
}`,
                    rightLabel: 'Sempre crie um NOVO array/objeto — nunca mute o estado existente.',
                    explanation: 'React usa referência para detectar mudanças. Se você muta o array original e passa a mesma referência, o React acha que nada mudou e não re-renderiza. Sempre crie novos arrays com spread (...) ou métodos como filter(), map().',
                  }],
        exercise: {
          title: 'Componente de Card de Perfil',
          description: 'Escreva um componente ProfileCard que recebe: nome, cargo, empresa, skills (array), e avatarUrl. Exiba as skills como badges. Se não houver avatarUrl, use um placeholder com as iniciais do nome.',
                    solutionHint: 'Componente recebe props via parâmetro. Desestruture: function Card({ nome, foto }). Renderização condicional: {foto && <img src={foto} />}.',
starterCode: 'function ProfileCard({ nome, cargo, empresa, skills = [], avatarUrl }) {\n  const iniciais = nome\n    .split(" ")\n    .map(p => p[0])\n    .slice(0, 2)\n    .join("");\n  \n  return (\n    <div className="profile-card">\n      {/* Avatar ou iniciais */}\n      \n      {/* Nome e cargo */}\n      \n      {/* Skills como badges */}\n      \n    </div>\n  );\n}\n\nconsole.log("Componente criado!");\nconst props = {\n  nome: "Ana Silva",\n  cargo: "Frontend Dev",\n  empresa: "TechCorp",\n  skills: ["React", "TypeScript", "CSS"],\n};\nconsole.log("Iniciais:", props.nome.split(" ").map(p=>p[0]).slice(0,2).join(""));\nconsole.log("Skills:", props.skills.join(", "));\n',
          solutionHint: 'avatarUrl ? <img src={avatarUrl}/> : <div>{iniciais}</div> | skills.map(s => <span key={s}>{s}</span>)',
          validate: (output, code) => output.includes('AS') && output.includes('React'),
          validateMessage: 'Exiba as iniciais "AS" e as skills.'
        },
        quiz: [
          { question: 'Por que não modificar props no componente filho?', options: ['É permitido mas lento', 'Props são somente leitura — para dados mutáveis use state', 'Não há restrição', 'Só em class components'], correct: 1, explanation: 'Props fluem do pai para o filho (one-way data flow). O filho não deve modificá-las — isso quebraria a previsibilidade do React.' },
          { question: 'O que é JSX?', options: ['Uma linguagem separada', 'Açúcar sintático que compila para React.createElement()', 'HTML dentro de JS', 'Um template engine'], correct: 1, explanation: 'JSX compila para React.createElement(type, props, ...children). É apenas sintaxe — não é HTML real.' },
          { question: 'Por que key em listas não deve ser o índice do array?', options: ['É lento', 'Se itens forem reordenados/removidos, React pode atualizar o elemento errado', 'React não aceita números', 'É convenção apenas'], correct: 1, explanation: 'O índice muda quando o array muda. React usa a key para identificar qual elemento no DOM corresponde a qual dado — use IDs únicos.' },
          { question: 'Como renderizar condicionalmente no JSX?', options: ['if/else dentro do JSX', '{condição && <Componente/>} ou ternário', 'Somente ternário', 'Apenas fora do return'], correct: 1, explanation: 'No JSX: {condição && <El/>} (short-circuit) ou {cond ? <A/> : <B/>} (ternário). if/else vai fora do return ou em variáveis.' },
          { question: 'O que é "children" prop?', options: ['Array de componentes filhos', 'O conteúdo passado entre as tags do componente', 'Prop obrigatória', 'Lista de props'], correct: 1, explanation: '<Card>Conteúdo aqui</Card> — "Conteúdo aqui" é o children. Permite criar componentes wrapper/container flexíveis.' },
        ]
      }
    },
    {
      id: 'mod-6-2',
      title: 'useState e useEffect',
      duration: '50 min',
      xp: 180,
      content: {
        sections: [
          { type: 'text', content: 'Hooks são funções que adicionam capacidades aos componentes funcionais. useState gerencia estado local. useEffect sincroniza com efeitos colaterais. São os dois hooks mais usados — domine-os.' },
          { type: 'code', lang: 'jsx', content: '// useState\nimport { useState } from "react";\n\nfunction Contador() {\n  const [count, setCount] = useState(0); // [valor, setter]\n  \n  return (\n    <div>\n      <p>Contagem: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>+</button>\n      <button onClick={() => setCount(c => c - 1)}>-</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}\n\n// Estado complexo\nfunction Formulario() {\n  const [form, setForm] = useState({ nome: "", email: "", senha: "" });\n  \n  const atualizar = (campo) => (e) =>\n    setForm(f => ({ ...f, [campo]: e.target.value }));\n  \n  return (\n    <form>\n      <input value={form.nome} onChange={atualizar("nome")} />\n      <input value={form.email} onChange={atualizar("email")} />\n    </form>\n  );\n}' },
          { type: 'code', lang: 'jsx', content: '// useEffect\nimport { useState, useEffect } from "react";\n\nfunction PerfilUsuario({ userId }) {\n  const [usuario, setUsuario] = useState(null);\n  const [carregando, setCarregando] = useState(true);\n  \n  useEffect(() => {\n    setCarregando(true);\n    \n    fetch(`/api/usuarios/${userId}`)\n      .then(r => r.json())\n      .then(dados => {\n        setUsuario(dados);\n        setCarregando(false);\n      });\n      \n    // Função de limpeza (cleanup)\n    return () => {\n      // Cancela requisição se componente desmontar\n    };\n  }, [userId]); // Re-executa quando userId muda\n  \n  if (carregando) return <div>Carregando...</div>;\n  return <div>{usuario?.nome}</div>;\n}' },
          { type: 'highlight', content: '⚡ Regra de ouro do useState: nunca mute o estado diretamente. setArray([...array, novoItem]) em vez de array.push(). setObj({...obj, campo: valor}) em vez de obj.campo = valor. React só re-renderiza quando a referência muda.' },
        ,
                  {
                    type: 'common_error',
                    title: 'Usar useEffect sem dependency array — loop infinito',
                    wrong: `function Componente() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetch("/api/dados")
      .then(r => r.json())
      .then(d => setDados(d)); // Atualiza estado
  }); // Sem [] — roda após CADA render!
}`,
                    wrongLabel: 'Sem []: roda depois de todo render → setDados → novo render → loop infinito.',
                    right: `function Componente() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetch("/api/dados")
      .then(r => r.json())
      .then(d => setDados(d));
  }, []); // [] = roda só uma vez na montagem
}`,
                    rightLabel: '[] vazio = equivalente ao componentDidMount — roda só uma vez.',
                    explanation: 'useEffect(() => {...}) sem array roda após CADA render. useEffect(() => {...}, []) roda uma vez. useEffect(() => {...}, [x]) roda quando x muda. Omitir [] acidentalmente é o bug de loop infinito mais comum em React.',
                  }],
        exercise: {
          title: 'Hook customizado useFetch',
          description: 'Crie um custom hook useFetch(url) que retorna { dados, carregando, erro }. Ele deve fazer o fetch quando a url muda, gerenciar os 3 estados, e cancelar requisições em andamento quando o componente desmontar.',
                    solutionHint: 'useState para data/loading/error. useEffect para disparar o fetch. Retorne { data, loading, error }. Array vazio [] no useEffect = roda uma vez.',
starterCode: 'function useFetch(url) {\n  const [dados, setDados] = React.useState(null);\n  const [carregando, setCarregando] = React.useState(true);\n  const [erro, setErro] = React.useState(null);\n  \n  React.useEffect(() => {\n    // Implemente aqui:\n    // 1. Resete os estados ao iniciar\n    // 2. Faça o fetch\n    // 3. Trate sucesso e erro\n    // 4. Retorne função de cleanup\n  }, [url]);\n  \n  return { dados, carregando, erro };\n}\n\n// Teste simulado\nconst { dados, carregando, erro } = useFetch("https://api.exemplo.com/dados");\nconsole.log("carregando:", carregando);\nconsole.log("dados:", dados);\nconsole.log("erro:", erro);\n',
          solutionHint: 'let cancelado = false; fetch(url).then(r => r.json()).then(d => { if (!cancelado) setDados(d) }); return () => { cancelado = true }',
          validate: (output, code) => {
                  return output.includes('6') && output.includes('11') &&
              (code.includes('useState') || code.includes('useReducer')) &&
              code.includes('return') &&
              !code.includes('console.log(6)') &&
              !code.includes("console.log('6')");
          },
          validateMessage: 'Use useState ou useReducer. Não retorne os valores diretamente.',
        },
      quiz: [
          { question: 'Para que serve a função retornada pelo useEffect (cleanup)?', options: ['Para retornar dados do efeito', 'Para cancelar side effects antes de desmontar ou antes de reexecutar o efeito', 'Para atualizar o estado', 'É opcional e não tem função prática'], correct: 1, explanation: 'Cleanup executa antes do componente desmontar E antes de cada re-execução do efeito. Use para: cancelar fetch, limpar timers, remover event listeners.' },
          { question: 'O que é um custom hook?', options: ['Um hook do React que foi customizado', 'Uma função que começa com "use" e pode chamar outros hooks', 'Um hook que aceita mais de 2 parâmetros', 'Um hook para uso em class components'], correct: 1, explanation: 'Custom hooks são funções com prefixo "use" que encapsulam lógica reutilizável com hooks. useFetch, useLocalStorage, useDebounce são exemplos comuns.' },
          { question: 'Como compartilhar estado entre componentes não-relacionados?', options: ['Copiar o useState em cada componente', 'Levantar o estado para o ancestral comum ou usar Context/estado global', 'Props diretas', 'localStorage'], correct: 1, explanation: 'State lifting: mova o estado para o ancestral comum mais próximo e passe via props. Para compartilhamento mais amplo: Context API ou Zustand/Redux.' },
      ]
      }
    },
    {
      id: 'mod-6-3',
      title: 'Context, useReducer e Boas Práticas',
      duration: '50 min',
      xp: 200,
      content: {
        sections: [
          { type: 'text', content: 'Context API resolve o problema de prop drilling — passar props por vários níveis de componentes que não as usam. useReducer é uma alternativa ao useState para estado complexo com múltiplas ações.' },
          { type: 'code', lang: 'jsx', content: '// Context API\nimport { createContext, useContext, useState } from "react";\n\n// 1. Criar o contexto\nconst TemaContext = createContext(null);\n\n// 2. Criar o Provider\nexport function TemaProvider({ children }) {\n  const [tema, setTema] = useState("light");\n  \n  const alternarTema = () =>\n    setTema(t => t === "light" ? "dark" : "light");\n  \n  return (\n    <TemaContext.Provider value={{ tema, alternarTema }}>\n      {children}\n    </TemaContext.Provider>\n  );\n}\n\n// 3. Hook customizado para consumir\nexport function useTema() {\n  const ctx = useContext(TemaContext);\n  if (!ctx) throw new Error("useTema deve estar dentro de TemaProvider");\n  return ctx;\n}\n\n// 4. Uso em qualquer componente da árvore\nfunction BotaoTema() {\n  const { tema, alternarTema } = useTema();\n  return <button onClick={alternarTema}>Tema: {tema}</button>;\n}' },
          { type: 'code', lang: 'jsx', content: '// useReducer — para estado com múltiplas ações\nimport { useReducer } from "react";\n\nconst estadoInicial = {\n  itens: [],\n  total: 0,\n  carregando: false,\n};\n\nfunction carrinhoReducer(estado, acao) {\n  switch (acao.type) {\n    case "ADICIONAR":\n      return {\n        ...estado,\n        itens: [...estado.itens, acao.payload],\n        total: estado.total + acao.payload.preco,\n      };\n    case "REMOVER":\n      const item = estado.itens.find(i => i.id === acao.id);\n      return {\n        ...estado,\n        itens: estado.itens.filter(i => i.id !== acao.id),\n        total: estado.total - (item?.preco ?? 0),\n      };\n    case "LIMPAR":\n      return estadoInicial;\n    default:\n      return estado;\n  }\n}\n\nfunction Carrinho() {\n  const [estado, dispatch] = useReducer(carrinhoReducer, estadoInicial);\n  \n  const adicionar = (produto) =>\n    dispatch({ type: "ADICIONAR", payload: produto });\n  \n  return (\n    <div>\n      <p>Itens: {estado.itens.length} | Total: R$ {estado.total}</p>\n    </div>\n  );\n}' },
          { type: 'highlight', content: '🏗️ Quando usar o quê: useState para estado local simples; useReducer para estado complexo com múltiplas ações; Context para estado compartilhado entre muitos componentes; Zustand/Redux para apps grandes.' },
        ],
        exercise: {
          title: 'Reducer de autenticação',
          description: 'Implemente um reducer de autenticação com estados: { usuario: null, carregando: false, erro: null } e actions: LOGIN_INICIADO, LOGIN_SUCESSO (payload: usuario), LOGIN_ERRO (payload: mensagem), LOGOUT.',
                    solutionHint: 'useReducer recebe (state, action) e retorna novo estado. Use switch em action.type. Estado inicial com usuario: null e logado: false.',
starterCode: 'const estadoInicial = { usuario: null, carregando: false, erro: null };\n\nfunction authReducer(estado, acao) {\n  switch (acao.type) {\n    case "LOGIN_INICIADO":\n      \n    case "LOGIN_SUCESSO":\n      \n    case "LOGIN_ERRO":\n      \n    case "LOGOUT":\n      \n    default:\n      return estado;\n  }\n}\n\nlet estado = estadoInicial;\nestado = authReducer(estado, { type: "LOGIN_INICIADO" });\nconsole.log("Carregando:", estado.carregando);\n\nestado = authReducer(estado, { type: "LOGIN_SUCESSO", payload: { nome: "Ana" } });\nconsole.log("Usuário:", estado.usuario?.nome);\n\nestado = authReducer(estado, { type: "LOGOUT" });\nconsole.log("Após logout:", estado.usuario);\n',
          solutionHint: 'return { ...estado, carregando: true, erro: null } para LOGIN_INICIADO',
          validate: (output, code) => output.includes('true') && output.includes('Ana') && output.includes('null'),
          validateMessage: 'Exiba: true (carregando), Ana (nome), null (após logout).'
        },
        quiz: [
          { question: 'O que é prop drilling?', options: ['Um padrão de design', 'Passar props por múltiplos níveis de componentes desnecessariamente', 'Técnica de otimização', 'Erro de React'], correct: 1, explanation: 'Prop drilling é quando props precisam ser passadas por muitos componentes intermediários que não as usam. Context API resolve isso.' },
          { question: 'Quando usar useReducer em vez de useState?', options: ['Sempre', 'Para estado com múltiplas ações inter-relacionadas ou lógica complexa', 'Apenas em componentes de página', 'Quando useState é lento'], correct: 1, explanation: 'useReducer centraliza lógica de atualização de estado complexo. Ideal: carrinhos, formulários com validação, máquinas de estado.' },
          { question: 'Um reducer deve ser uma função pura?', options: ['Não, pode ter efeitos colaterais', 'Sim — mesmo input sempre gera mesmo output, sem side effects', 'Apenas em produção', 'Depende do caso'], correct: 1, explanation: 'Reducer puro: não modifica o estado existente, não faz chamadas de rede/API, retorna novo objeto. Isso facilita testes e debug.' },
          { question: 'O que acontece se usar Context sem o Provider acima na árvore?', options: ['Usa o valor padrão do createContext', 'Erro em tempo de execução', 'Ignora o contexto', 'Cria Provider automaticamente'], correct: 0, explanation: 'useContext retorna o valor padrão do createContext(defaultValue). Por isso é bom colocar null como padrão e verificar no hook customizado.' },
          { question: 'Qual a alternativa popular ao Context+useReducer para estado global?', options: ['Redux apenas', 'Zustand, Jotai, Recoil, Redux Toolkit', 'localStorage', 'sessionStorage'], correct: 1, explanation: 'Para apps maiores: Zustand (simples e moderno), Redux Toolkit (empresarial), Jotai/Recoil (atômico). Context é ótimo para estado simples/médio.' },
        ]
      }
    },

    {
  id: 'mod-6-4',
  title: 'Regras dos Hooks e Armadilhas',
  duration: '50 min',
  xp: 200,
  content: {
    sections: [
      {
        type: 'text',
        content:
          'Hooks têm regras estritas que, se violadas, causam bugs difíceis de diagnosticar. useEffect tem armadilhas específicas que geram memory leaks e loops infinitos. Entender como o React detecta mudanças e quando re-renderiza é essencial para escrever componentes corretos.',
      },
      {
        type: 'code',
        lang: 'jsx',
        content:
          '// ── REGRAS DOS HOOKS ─────────────────────────\n// REGRA 1: Chame hooks apenas no nível superior\n// ❌ Errado — hook dentro de condição\nfunction ComponenteErrado({ admin }) {\n  if (admin) {\n    const [dados, setDados] = useState([]); // ERRADO!\n  }\n}\n\n// ✅ Certo — hook sempre chamado, condição dentro\nfunction ComponenteCerto({ admin }) {\n  const [dados, setDados] = useState([]);\n  if (!admin) return null; // condição depois dos hooks\n}\n\n// REGRA 2: Chame hooks apenas em componentes React ou custom hooks\n// ❌ Errado — hook em função comum\nfunction utilidade() {\n  const [x, setX] = useState(0); // ERRADO! Não é componente nem hook\n}\n\n// ✅ Certo — extrair para custom hook (prefixo "use")\nfunction useContador(inicial = 0) {\n  const [count, setCount] = useState(inicial);\n  const incrementar = () => setCount(c => c + 1);\n  const resetar = () => setCount(inicial);\n  return { count, incrementar, resetar };\n}\n\n// Por que essas regras?\n// React identifica os hooks pela ORDEM em que são chamados.\n// Se você pula um hook em um render, a ordem muda e o React\n// associa o estado errado com o hook errado.',
      },
      {
        type: 'code',
        lang: 'jsx',
        content:
          '// ── USEEFFECT: ARRAY DE DEPENDÊNCIAS ─────────\n// O segundo argumento controla QUANDO o efeito executa\n\n// Sem array: executa após TODO render (perigoso!)\nuseEffect(() => {\n  console.log("Executa em todo render");\n});\n\n// Array vazio: executa apenas uma vez (mount)\nuseEffect(() => {\n  console.log("Só na montagem — como componentDidMount");\n  return () => console.log("Limpeza na desmontagem");\n}, []);\n\n// Com dependências: executa quando a dep muda\nuseEffect(() => {\n  document.title = `Usuário: ${nome}`;\n}, [nome]); // só quando "nome" muda\n\n// ── ARMADILHA: OBJETO/ARRAY COMO DEPENDÊNCIA ─\n// ❌ Isso causa loop infinito!\nfunction ComponenteLoop() {\n  const opcoes = { limite: 10 }; // novo objeto a cada render!\n  \n  useEffect(() => {\n    buscarDados(opcoes);\n  }, [opcoes]); // opcoes é "diferente" em todo render → loop\n}\n\n// ✅ Correto: use useMemo ou mova para fora do componente\nconst OPCOES_FIXAS = { limite: 10 }; // fora do componente\n\nfunction ComponenteCorreto() {\n  useEffect(() => {\n    buscarDados(OPCOES_FIXAS);\n  }, []); // sem dependência que muda\n}',
      },
      {
        type: 'code',
        lang: 'jsx',
        content:
          '// ── ARMADILHA: STALE CLOSURE ─────────────────\n// "Closure velha" — função captura valor antigo\nfunction ContadorBugado() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    const id = setInterval(() => {\n      // ❌ "count" está travado em 0 (closure velha!)\n      setCount(count + 1); // sempre seta 0+1 = 1\n    }, 1000);\n    return () => clearInterval(id);\n  }, []); // array vazio captura "count" no valor inicial\n  \n  return <div>{count}</div>;\n}\n\n// ✅ Solução: função atualizadora (recebe estado atual)\nfunction ContadorCorreto() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    const id = setInterval(() => {\n      setCount(c => c + 1); // c é sempre o valor atual!\n    }, 1000);\n    return () => clearInterval(id);\n  }, []);\n  \n  return <div>{count}</div>;\n}\n\n// ── LIMPEZA DE EFEITOS (memory leaks) ─────────\nfunction ComponenteComFetch({ id }) {\n  const [dados, setDados] = useState(null);\n  \n  useEffect(() => {\n    let cancelado = false; // flag para evitar atualizar componente desmontado\n    \n    fetch(`/api/dados/${id}`)\n      .then(r => r.json())\n      .then(d => {\n        if (!cancelado) setDados(d); // só atualiza se ainda montado\n      });\n    \n    return () => { cancelado = true; }; // cleanup\n  }, [id]);\n  \n  return <div>{dados?.nome}</div>;\n}',
      },
      {
        type: 'highlight',
        content:
          '🔍 ESLint plugin react-hooks (incluso no Create React App e Vite) detecta automaticamente dependências faltantes no useEffect e violações das regras. Instale e não ignore os warnings — eles existem para evitar exatamente esses bugs.',
      },
    ],
    exercise: {
      title: 'Diagnosticar e corrigir hooks bugados',
      description:
        'O código abaixo tem 3 problemas: (1) stale closure no contador, (2) objeto como dependência causando loop, (3) falta de limpeza de evento. Corrija os 3 e demonstre que funcionam.',
            solutionHint: 'Hooks não podem estar dentro de if/for/funções. useEffect com [] roda só uma vez. Adicione as dependências corretas no array para evitar stale closures.',
starterCode:
        '// Versão com 3 bugs — identifique e corrija\n\n// Bug 1: stale closure\nfunction useContadorBugado() {\n  const [count, setCount] = React.useState(0);\n  \n  React.useEffect(() => {\n    const id = setInterval(() => {\n      setCount(count + 1); // BUG: stale closure\n    }, 1000);\n    return () => clearInterval(id);\n  }, []);\n  \n  return count;\n}\n\n// Bug 2: objeto como dependência\nfunction useDadosBugado(id) {\n  const config = { id, cache: true }; // BUG: novo objeto todo render\n  \n  React.useEffect(() => {\n    console.log("buscando", config);\n    // fetch...\n  }, [config]); // BUG: loop infinito\n}\n\n// Simule as correções — mostre que entendeu\nfunction contadorAtualizado(count) {\n  // Como deveria ser a função passada para setCount?\n  // Use "c => ..." em vez de "count + 1"\n  return /* sua resposta aqui */;\n}\n\nconsole.log(contadorAtualizado(5)); // deve retornar 6\nconsole.log(contadorAtualizado(10)); // deve retornar 11\n',
      solutionHint: 'setCount(c => c + 1) | mover config para fora do componente ou usar useMemo',
      validate: (output, code) => {
        return output.includes('6') && output.includes('11');
      },
      validateMessage: 'A função atualizadora deve retornar 6 (para input 5) e 11 (para input 10).',
    },
    quiz: [
      {
        question: 'Por que hooks não podem ser chamados dentro de ifs ou loops?',
        options: [
          'É apenas convenção de estilo',
          'React identifica hooks pela ordem de chamada — alterar essa ordem quebra o mapeamento estado↔hook',
          'Ifs tornam hooks mais lentos',
          'Hooks não aceitam condições como argumentos',
        ],
        correct: 1,
        explanation:
          'React mantém uma lista interna de hooks por componente, identificados pela posição. Se você pula um hook com if, todos os seguintes ficam deslocados e o React associa o estado errado.',
      },
      {
        question: 'O que causa um loop infinito com useEffect?',
        options: [
          'Usar async dentro do efeito',
          'Uma dependência que muda a cada render (como objeto/array criado inline)',
          'Ter múltiplos useEffects',
          'Usar setInterval sem clearInterval',
        ],
        correct: 1,
        explanation:
          'Se uma dependência muda a cada render (objeto {}, array [] literais), useEffect executa, atualiza estado, dispara render, dependência muda → loop. Solução: mover para fora do componente ou usar useMemo.',
      },
      {
        question: 'O que é uma "stale closure" no useEffect?',
        options: [
          'Um closure que usa muita memória',
          'Uma função que captura o valor de uma variável no momento da criação, não o atual',
          'Um efeito que não tem função de limpeza',
          'Uma closure dentro de um loop',
        ],
        correct: 1,
        explanation:
          'Stale closure: o efeito captura count=0 quando monta e "vê" sempre 0, mesmo quando count muda. Solução: setCount(c => c+1) — a função recebe o valor atual do React.',
      },
      {
        question: 'Por que retornar uma função de cleanup no useEffect?',
        options: [
          'É obrigatório sempre',
          'Para cancelar efeitos (eventos, timers, requests) quando o componente desmonta ou antes do próximo efeito',
          'Para salvar o estado anterior',
          'Para otimizar re-renders',
        ],
        correct: 1,
        explanation:
          'Cleanup evita memory leaks: se o componente desmontar com um setInterval ativo, ele continua rodando. Retornar clearInterval no cleanup cancela antes de desmontar.',
      },
      {
        question: 'Qual a diferença entre useEffect(() => {}, []) e useEffect(() => {})?',
        options: [
          'São idênticos',
          '[] executa apenas na montagem; sem array executa após todo render',
          '[] executa em todo render; sem array executa só na montagem',
          '[] nunca executa',
        ],
        correct: 1,
        explanation:
          'Array vazio []: efeito roda 1x após montar (sem dependências = sem motivo para repetir). Sem array: React não sabe quando parar — roda após todo render.',
      },
    ],
  },
    },
    {
      id: 'mod-6-5',
      title: 'useMemo, useCallback e Performance',
      duration: '45 min',
      xp: 190,
      content: {
        sections: [
          {
            type: 'text',
            content:
              'React re-renderiza um componente quando seu estado ou props mudam. Em apps grandes, re-renders desnecessários podem prejudicar a performance. useMemo, useCallback e React.memo são as ferramentas para otimizar — mas a regra de ouro é: meça antes de otimizar.',
          },
          {
            type: 'code',
            lang: 'jsx',
            content:
              '// ── COMO REACT DECIDE RE-RENDERIZAR ──────────\n// Por padrão: quando o COMPONENTE PAI re-renderiza,\n// TODOS os filhos também re-renderizam.\n\nfunction Pai() {\n  const [contador, setContador] = useState(0);\n  // Quando contador muda, Filho também re-renderiza\n  // mesmo que "texto" não tenha mudado!\n  return (\n    <>\n      <button onClick={() => setContador(c => c+1)}>+</button>\n      <Filho texto="fixo" />\n    </>\n  );\n}\n\n// ── REACT.MEMO: memoriza o componente ─────────\n// Só re-renderiza se as props mudarem (comparação rasa)\nconst Filho = React.memo(function Filho({ texto, onClick }) {\n  console.log("Filho renderizou");\n  return <div onClick={onClick}>{texto}</div>;\n});\n// Agora Filho só re-renderiza se "texto" ou "onClick" mudarem\n\n// ── useMemo: memoriza um VALOR calculado ──────\nfunction ListaFiltrada({ itens, busca }) {\n  // ❌ Sem memo: recalcula em todo render, mesmo quando "busca" não mudou\n  const filtrados = itens.filter(i => i.nome.includes(busca));\n  \n  // ✅ Com useMemo: só recalcula quando "itens" ou "busca" mudam\n  const filtradosMemo = useMemo(\n    () => itens.filter(i => i.nome.includes(busca)),\n    [itens, busca] // dependências\n  );\n  \n  return filtradosMemo.map(i => <div key={i.id}>{i.nome}</div>);\n}',
          },
          {
            type: 'code',
            lang: 'jsx',
            content:
              '// ── useCallback: memoriza uma FUNÇÃO ─────────\n// Problema: funções inline são "novas" a cada render\nfunction Pai() {\n  const [count, setCount] = useState(0);\n  \n  // ❌ Nova função a cada render → Filho (mesmo com memo) re-renderiza\n  const handleClick = () => console.log("clicou");\n  \n  // ✅ Mesma referência entre renders (se deps não mudarem)\n  const handleClickMemo = useCallback(() => {\n    console.log("clicou");\n  }, []); // sem dependências = nunca recria\n  \n  // ✅ Quando a callback usa estado, inclua nas deps\n  const handleAdd = useCallback((item) => {\n    setCount(c => c + 1); // forma funcional não precisa de count nas deps\n  }, []); // seguro sem count porque usa c => c+1\n  \n  return <Filho onClick={handleClickMemo} />; // Filho não re-renderiza\n}\n\n// ── QUANDO USAR CADA UM ────────────────────────\n// useMemo: cálculo custoso (sort de listas grandes, transform de dados)\n// useCallback: função passada como prop para componente com React.memo\n// React.memo: componente que recebe mesmas props com frequência\n\n// ── NUNCA OTIMIZE PREMATURAMENTE ──────────────\n// Use React DevTools Profiler para medir primeiro.\n// useMemo e useCallback têm CUSTO — criar o memo,\n// comparar deps, guardar em memória. Para operações simples,\n// o memo é mais lento do que simplesmente recalcular.',
          },
          {
            type: 'code',
            lang: 'jsx',
            content:
              '// ── CASO REAL: BUSCA COM DEBOUNCE ────────────\nimport { useState, useMemo, useCallback, useEffect } from "react";\n\nfunction useDebouce(valor, delay) {\n  const [debounced, setDebounced] = useState(valor);\n  \n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(valor), delay);\n    return () => clearTimeout(timer); // cancela se valor mudar antes do delay\n  }, [valor, delay]);\n  \n  return debounced;\n}\n\nfunction BuscaProdutos({ produtos }) {\n  const [busca, setBusca] = useState("");\n  const buscaDebounced = useDebouce(busca, 300); // espera 300ms\n  \n  // Só filtra quando buscaDebounced muda (não em cada keystroke)\n  const filtrados = useMemo(\n    () =>\n      produtos.filter(p =>\n        p.nome.toLowerCase().includes(buscaDebounced.toLowerCase())\n      ),\n    [produtos, buscaDebounced]\n  );\n  \n  return (\n    <div>\n      <input\n        value={busca}\n        onChange={e => setBusca(e.target.value)}\n        placeholder="Buscar..."\n      />\n      <p>{filtrados.length} resultados</p>\n      {filtrados.map(p => <div key={p.id}>{p.nome}</div>)}\n    </div>\n  );\n}',
          },
          {
            type: 'highlight',
            content:
              '⚡ Ordem de otimização correta: (1) Corrija o algoritmo — um algoritmo O(n) bem escrito bate qualquer memo. (2) Mova estado para mais perto de onde é usado. (3) Memoize com React.memo + useCallback/useMemo. (4) Só então considere virtualização (react-window) para listas enormes.',
          },
        ],
        exercise: {
          title: 'Implementar busca memoizada',
          description:
            'Implemente a função filtrarEOrdenar(produtos, busca, ordenarPor) que filtra por nome/categoria e ordena por "preco" ou "nome". Use memoização manual (objeto de cache) para evitar recalcular com os mesmos argumentos.',
          starterCode:
            'const cache = new Map();\n\nfunction filtrarEOrdenar(produtos, busca, ordenarPor) {\n  // Crie uma chave de cache combinando os argumentos\n  const chaveCache = `${busca}-${ordenarPor}`;\n  \n  // Verifique o cache antes de processar\n  \n  // Se não estiver no cache:\n  // 1. Filtre por busca (nome ou categoria contém a string)\n  // 2. Ordene por ordenarPor ("preco" ou "nome")\n  // 3. Salve no cache e retorne\n}\n\nconst produtos = [\n  { id: 1, nome: "Notebook", categoria: "tech", preco: 3500 },\n  { id: 2, nome: "Mesa",     categoria: "movel", preco: 800  },\n  { id: 3, nome: "Mouse",   categoria: "tech", preco: 150  },\n  { id: 4, nome: "Cadeira", categoria: "movel", preco: 1200 },\n];\n\n// Teste: segunda chamada com mesmos args deve usar cache\nconst r1 = filtrarEOrdenar(produtos, "tech", "preco");\nconsole.log("Resultado 1:", r1.map(p => p.nome).join(", "));\n\nconst r2 = filtrarEOrdenar(produtos, "tech", "preco"); // do cache\nconsole.log("Resultado 2 (cache):", r2.map(p => p.nome).join(", "));\n\nconsole.log("Mesmo resultado:", r1 === r2); // deve ser true (mesma referência)\n',
          solutionHint:
            'if (cache.has(chaveCache)) return cache.get(chaveCache) | cache.set(chaveCache, resultado)',
          validate: (output, code) => {
                  return output.includes('Mouse') &&
              output.includes('Notebook') &&
              (code.includes('Map') || code.includes('useMemo') || code.includes('useCallback')) &&
              code.includes('return');
                },
          validateMessage: 'Use Map, useMemo ou useCallback para otimizar. Implemente a lógica, não retorne hardcoded.',
        },
        quiz: [
          {
            question: 'Quando usar React.memo?',
            options: [
              'Em todos os componentes',
              'Em componentes filhos que recebem as mesmas props com frequência e têm render custoso',
              'Apenas em componentes de página',
              'Quando useState é lento',
            ],
            correct: 1,
            explanation:
              'React.memo evita re-render quando props não mudam. Só vale o custo se: o componente renderiza com frequência, as props são iguais na maioria das vezes, e o render é pesado.',
          },
          {
            question: 'Qual a diferença entre useMemo e useCallback?',
            options: [
              'São idênticos',
              'useMemo memoriza o resultado de uma função; useCallback memoriza a própria função',
              'useCallback é para arrays, useMemo para objetos',
              'useMemo é mais moderno',
            ],
            correct: 1,
            explanation:
              'useMemo(() => calcular(), [deps]) — salva o VALOR retornado. useCallback(() => fn, [deps]) — salva a REFERÊNCIA da função. useCallback(fn, deps) === useMemo(() => fn, deps).',
          },
          {
            question: 'Por que useMemo pode ser mais lento em algumas situações?',
            options: [
              'É sempre mais rápido',
              'Tem custo: alocar memória para o cache, comparar dependências em cada render',
              'Usa muita CPU',
              'Não funciona com arrays',
            ],
            correct: 1,
            explanation:
              'Para cálculos simples, o custo do memo (comparar deps, guardar resultado) supera o custo de recalcular. Meça antes — React DevTools Profiler mostra onde está o gargalo real.',
          },
          {
            question: 'Por que precisamos de useCallback ao passar funções para React.memo?',
            options: [
              'Não precisamos',
              'Sem useCallback, a função é recriada a cada render do pai, quebrando a comparação do React.memo',
              'useCallback evita erros de tipos',
              'React.memo não aceita funções sem useCallback',
            ],
            correct: 1,
            explanation:
              'React.memo compara props por referência. Uma função () => {} cria novo objeto a cada render — referência diferente. useCallback mantém a mesma referência entre renders.',
          },
          {
            question: 'O que é debounce e por que combina bem com useMemo?',
            options: [
              'Técnica para loops assíncronos',
              'Aguarda que o usuário pare de digitar antes de processar — reduz cálculos e requisições',
              'Técnica de scroll virtual',
              'Padrão de error boundary',
            ],
            correct: 1,
            explanation:
              'Debounce espera X ms sem mudança antes de executar. Com useMemo: o valor debounced muda menos que a busca raw → useMemo recalcula menos → componente re-renderiza menos.',
          },
        ],
      },
    },
  ,{
    id: 'mod-6-6',
    title: 'React Router: Navegação entre Páginas',
    duration: '45 min',
    xp: 185,
    content: {
      sections: [
        { type: 'text', content: 'React não tem sistema de rotas nativo. React Router é a biblioteca padrão para criar SPAs com múltiplas páginas, navegação com histórico e URLs compartilháveis.' },
        { type: 'code', lang: 'javascript', content: 'import { BrowserRouter, Routes, Route, Link, NavLink } from \'react-router-dom\';\nexport default function App() {\nreturn (\n<BrowserRouter>\n<nav>\n<Link to="/">Home</Link>\n<NavLink to="/sobre" style={({ isActive }) => isActive ? { fontWeight: \'bold\' } : {}}>Sobre</NavLink>\n</nav>\n<Routes>\n<Route path="/"              element={<Home />} />\n<Route path="/sobre"         element={<Sobre />} />\n<Route path="/usuarios/:id"  element={<Perfil />} />\n<Route path="*"              element={<NotFound />} />\n</Routes>\n</BrowserRouter>\n);\n}\nconsole.log(\"BrowserRouter + Routes + Route: a tríade do React Router.\");' },
        { type: 'code', lang: 'javascript', content: 'import { useParams, useSearchParams, useNavigate, Outlet } from \'react-router-dom\';\nfunction Perfil() {\nconst { id } = useParams(); // /usuarios/42 → id === "42"\nreturn <h1>Usuário {id}</h1>;\n}\nfunction Busca() {\nconst [p, setP] = useSearchParams();\nreturn <input value={p.get(\'q\')||\'\'} onChange={e=>setP({q:e.target.value})} />;\n}\nfunction Login() {\nconst navigate = useNavigate();\nreturn <button onClick={async()=>{ await login(); navigate(\'/dashboard\'); }}>Entrar</button>;\n}\n// Rotas aninhadas com Outlet:\nfunction Layout() { return <div><Sidebar/><main><Outlet/></main></div>; }\n// <Route path="/app" element={<Layout/>}>\n//   <Route path="home" element={<Home/>}/>  →  /app/home\n// </Route>\nconsole.log(\"useParams + useNavigate + Outlet: hooks essenciais.\");' },
        { type: 'common_error', title: 'Usar <a href> em vez de <Link>', wrong: 'function Menu() { return <a href="/sobre">Sobre</a>; }\n// Reload completo — React reinicia, estado perdido', wrongLabel: '<a href> faz reload completo, perde estado React.', right: 'import { Link } from \'react-router-dom\';\nfunction Menu() { return <Link to="/sobre">Sobre</Link>; }', rightLabel: '<Link to="..."> = SPA sem reload, estado preservado.', explanation: '<a href> faz requisição HTTP completa, reinicia o React do zero. <Link> usa History API — sem reload.' },
      ],
      exercise: {
        title: 'Implementar mini router',
        description: 'Implemente criarRouter(rotas) que suporte rotas exatas, dinâmicas (/path/:id) e wildcard (*).',
        starterCode: `function criarRouter(rotas) {
  let atual = '/';
  function combinar(pattern, path) {
    if (pattern === '*') return {};
    const pp = pattern.split('/').filter(Boolean);
    const pa = path.split('/').filter(Boolean);
    if (pp.length !== pa.length) return null;
    const params = {};
    for (let i=0; i<pp.length; i++) {
      if (pp[i].startsWith(':')) params[pp[i].slice(1)] = pa[i];
      else if (pp[i] !== pa[i]) return null;
    }
    return params;
  }
  return {
    navegar(p) { atual = p; },
    rotaAtual() {
      for (const r of rotas) {
        const p = combinar(r.path, atual);
        if (p !== null) return { componente: r.componente, params: p };
      }
      return null;
    },
  };
}
const router = criarRouter([
  { path: '/', componente: 'Home' },
  { path: '/usuarios/:id', componente: 'Perfil' },
  { path: '*', componente: 'NotFound' },
]);
router.navegar('/');
console.log(router.rotaAtual().componente);         // Home
router.navegar('/usuarios/42');
console.log(router.rotaAtual().componente);         // Perfil
console.log(router.rotaAtual().params.id);          // 42
router.navegar('/nao-existe');
console.log(router.rotaAtual().componente);         // NotFound`,
        validate: (output, code) => code.includes('criarRouter') && code.includes('combinar') && output.includes('Home') && output.includes('42') && output.includes('NotFound'),
        validateMessage: '/ → Home, /usuarios/42 → Perfil com params.id=42, /nao-existe → NotFound.',
      },
      quiz: [
        { question: 'Por que usar <Link> em vez de <a>?', options: ['Mais estilizável', 'Link navega sem reload via History API, preservando estado React', 'Mais rápido de digitar', 'Não há diferença'], correct: 1, explanation: '<a href> = HTTP completo → React reinicia. <Link to> = History API → sem reload → estado preservado.' },
        { question: 'O que é <Outlet />?', options: ['Portal', 'Slot onde rotas filhas renderizam no layout pai', 'Contexto', 'Loading'], correct: 1, explanation: 'Outlet é o placeholder no layout pai onde o conteúdo da rota filha aparece.' },
        { question: 'Como navegar programaticamente?', options: ['window.location.href', 'const navigate = useNavigate(); navigate("/path")', 'router.push()', '<Redirect/>'], correct: 1, explanation: 'useNavigate() retorna função navigate. Chame após ação assíncrona sem reload.' },
      ],
    },
  }
  ,{
    id: 'mod-6-7',
    title: 'Formulários: Controlled, Validação e React Hook Form',
    duration: '45 min',
    xp: 185,
    content: {
      sections: [
        { type: 'text', content: 'Formulários são 30% do trabalho de qualquer app de produto. React tem dois modelos: controlled (estado no React) e uncontrolled (estado no DOM). Para formulários complexos, React Hook Form elimina 70% do código boilerplate.' },
        { type: 'code', lang: 'javascript', content: '// FORMULÁRIO CONTROLLED (padrão React)\nfunction FormCadastro() {\n  const [nome, setNome] = useState(\'\');\n  const [email, setEmail] = useState(\'\');\n  const [erro, setErro] = useState(\'\');\n\n  function handleSubmit(e) {\n    e.preventDefault(); // SEMPRE a primeira linha!\n    if (!nome.trim()) { setErro(\'Nome obrigatório\'); return; }\n    if (!email.includes(\'@\')) { setErro(\'Email inválido\'); return; }\n    fetch(\'/api/usuarios\', { method: \'POST\', body: JSON.stringify({ nome, email }) });\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />\n      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />\n      {erro && <p>{erro}</p>}\n      <button type="submit">Cadastrar</button>\n    </form>\n  );\n}\nconsole.log(\"e.preventDefault() é OBRIGATÓRIO em todo handleSubmit.\");' },
        { type: 'code', lang: 'javascript', content: '// REACT HOOK FORM + ZOD: zero useState\nimport { useForm } from \'react-hook-form\';\nimport { z } from \'zod\';\nimport { zodResolver } from \'@hookform/resolvers/zod\';\n\nconst schema = z.object({\n  nome:  z.string().min(2, \'Mínimo 2 caracteres\'),\n  email: z.string().email(\'Email inválido\'),\n  senha: z.string().min(8, \'Mínimo 8 caracteres\'),\n  confirmarSenha: z.string(),\n}).refine(d => d.senha === d.confirmarSenha, {\n  message: \'Senhas não coincidem\', path: [\'confirmarSenha\'],\n});\n\nfunction FormCadastro() {\n  const { register, handleSubmit, formState: { errors, isSubmitting } } =\n    useForm({ resolver: zodResolver(schema) });\n\n  async function onSubmit(dados) {\n    await fetch(\'/api/usuarios\', { method: \'POST\', body: JSON.stringify(dados) });\n  }\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register(\'nome\')} placeholder="Nome" />\n      {errors.nome && <span>{errors.nome.message}</span>}\n      <input {...register(\'email\')} type="email" />\n      {errors.email && <span>{errors.email.message}</span>}\n      <button disabled={isSubmitting}>{isSubmitting ? \'Enviando...\' : \'Cadastrar\'}</button>\n    </form>\n  );\n}\nconsole.log(\"RHF: zero useState, validação automática, loading built-in.\");' },
        { type: 'common_error', title: 'Esquecer e.preventDefault() no handleSubmit', wrong: 'function handleSubmit() {\n  // Sem e.preventDefault()!\n  fetch(\'/api/login\', { method: \'POST\', body: dados });\n  // A página recarrega antes do fetch terminar!\n}', wrongLabel: 'Sem preventDefault() o browser recarrega a página — fetch nunca conclui.', right: 'function handleSubmit(e) {\n  e.preventDefault(); // SEMPRE a primeira linha\n  fetch(\'/api/login\', { method: \'POST\', body: dados });\n}', rightLabel: 'e.preventDefault() cancela o submit nativo e deixa o fetch rodar.', explanation: 'O comportamento padrão de um form HTML é enviar dados via GET/POST e recarregar a página. e.preventDefault() cancela isso, deixando você controlar o envio via fetch.' },
      ],
      exercise: {
        title: 'Implementar validação de formulário',
        description: 'Implemente validarFormulario(dados) que retorna { valido, erros }. Regras: nome (mínimo 2 chars), email (deve ter @ e .), senha (mínimo 8 chars e pelo menos 1 número), confirmarSenha (igual à senha).',
        starterCode: `function validarFormulario(dados) {
  const erros = {};
  if (!dados.nome || dados.nome.trim().length < 2)
    erros.nome = 'Nome precisa ter pelo menos 2 caracteres';
  if (!dados.email || !dados.email.includes('@') || !dados.email.includes('.'))
    erros.email = 'Email inválido';
  if (!dados.senha || dados.senha.length < 8)
    erros.senha = 'Senha precisa ter pelo menos 8 caracteres';
  else if (!/\d/.test(dados.senha))
    erros.senha = 'Senha precisa ter pelo menos 1 número';
  if (dados.senha !== dados.confirmarSenha)
    erros.confirmarSenha = 'Senhas não coincidem';
  return { valido: Object.keys(erros).length === 0, erros };
}
const ok = validarFormulario({ nome: 'Ana Silva', email: 'ana@email.com', senha: 'Senha123', confirmarSenha: 'Senha123' });
console.log('Válido:', ok.valido);
console.log('Erros ok:', Object.keys(ok.erros).length);
const fail = validarFormulario({ nome: 'A', email: 'invalido', senha: 'curta', confirmarSenha: 'x' });
console.log('Inválido:', !fail.valido);
console.log('Erros fail:', Object.keys(fail.erros).length);`,
        validate: (output, code) => {
          return code.includes('validarFormulario') && output.includes('Válido: true') && output.includes('Erros ok: 0') && output.includes('Inválido: true');
        },
        validateMessage: 'Formulário válido: valido=true, 0 erros. Inválido: valido=false, erros nos 4 campos.',
      },
      quiz: [
        { question: 'Qual a diferença entre controlled e uncontrolled forms?', options: ['Controlled usa CSS', 'Controlled: estado no React (useState). Uncontrolled: estado no DOM (ref). Controlled é o padrão recomendado', 'Uncontrolled é mais moderno', 'Não há diferença'], correct: 1, explanation: 'Controlled: cada input tem value e onChange — React é a fonte de verdade. Uncontrolled: você acessa o valor via ref apenas no submit. Controlled permite validação em tempo real e sincronização fácil.' },
        { question: 'Por que React Hook Form é preferível a múltiplos useState?', options: ['É mais popular', 'Elimina um useState por campo, centraliza validação e tem isSubmitting built-in', 'Funciona sem JavaScript', 'Tem suporte nativo a TypeScript'], correct: 1, explanation: 'useState por campo + handlers manuais + validação + loading = muito código. RHF: register() conecta qualquer input, handleSubmit valida antes de chamar onSubmit, tudo centralizado.' },
        { question: 'Por que chamar e.preventDefault() no onSubmit?', options: ['Por convenção', 'Para impedir o browser de recarregar a página e enviar dados via URL', 'Para evitar XSS', 'Para melhorar performance'], correct: 1, explanation: 'Forms HTML têm comportamento padrão: enviar dados e recarregar. Em uma SPA você quer interceptar e enviar via fetch. e.preventDefault() cancela o comportamento nativo.' },
      ],
    },
  }
  ,{
    id: 'mod-6-8',
    title: 'TanStack Query: Data Fetching Profissional',
    duration: '50 min',
    xp: 195,
    content: {
      sections: [
        { type: 'text', content: 'TanStack Query (antiga React Query) é o padrão de data fetching em aplicações React modernas. Resolve de forma elegante os problemas que todo dev enfrenta com useEffect+fetch: loading states, error handling, cache, refetch automático, otimistic updates e sincronização de dados. É listada em mais de 60% das vagas React pleno/sênior no Brasil.' },
        { type: 'code', lang: 'javascript', content: '// ── SETUP ─────────────────────────────────────────────\n// npm install @tanstack/react-query\n// Envolva o app com QueryClientProvider\n\nimport { QueryClient, QueryClientProvider } from \'@tanstack/react-query\';\n\nconst queryClient = new QueryClient({\n  defaultOptions: {\n    queries: {\n      staleTime: 5 * 60 * 1000,  // dados ficam frescos por 5 min\n      retry: 2,                   // tenta 2x em caso de erro\n    },\n  },\n});\n\nfunction App() {\n  return (\n    <QueryClientProvider client={queryClient}>\n      <MinhaAplicacao />\n    </QueryClientProvider>\n  );\n}' },
        { type: 'code', lang: 'javascript', content: '// ── useQuery: buscar dados ────────────────────────────\nimport { useQuery } from \'@tanstack/react-query\';\n\nconst API = \'https://api.exemplo.com\';\n\nfunction ListaProdutos({ categoria }) {\n  const { data, isLoading, isError, error, refetch } = useQuery({\n    queryKey: [\'produtos\', categoria],  // chave única — muda = refetch\n    queryFn: async () => {\n      const res = await fetch(API + \'/produtos?categoria=\' + categoria);\n      if (!res.ok) throw new Error(\'Falha na requisição\');\n      return res.json();\n    },\n    staleTime: 2 * 60 * 1000,  // 2 min sem refetch\n    select: (data) => data.items, // transforma antes de retornar\n  });\n\n  if (isLoading) return <Skeleton />;\n  if (isError)   return <Erro msg={error.message} onRetry={refetch} />;\n\n  return <ul>{data.map(p => <li key={p.id}>{p.nome}</li>)}</ul>;\n}\n\n// Por que é melhor que useEffect+fetch:\n// 1. Cache automático — mesma queryKey = dado reutilizado\n// 2. Refetch inteligente — ao voltar para a aba, ao reconectar\n// 3. Deduplication — múltiplos componentes com mesma query = 1 request\n// 4. Loading/error states prontos — sem boilerplate\n// 5. Stale-while-revalidate — mostra dado antigo enquanto atualiza' },
        { type: 'code', lang: 'javascript', content: '// ── useMutation: criar/atualizar/deletar ─────────────\nimport { useMutation, useQueryClient } from \'@tanstack/react-query\';\n\nfunction CriarProduto() {\n  const queryClient = useQueryClient();\n\n  const { mutate, isPending } = useMutation({\n    mutationFn: async (novoProduto) => {\n      const res = await fetch(API + \'/produtos\', {\n        method: \'POST\',\n        headers: { \'Content-Type\': \'application/json\' },\n        body: JSON.stringify(novoProduto),\n      });\n      if (!res.ok) throw new Error(\'Falha ao criar produto\');\n      return res.json();\n    },\n\n    // Optimistic Update: atualiza a UI antes da resposta do servidor\n    onMutate: async (novoProduto) => {\n      await queryClient.cancelQueries({ queryKey: [\'produtos\'] });\n      const snapshot = queryClient.getQueryData([\'produtos\']);\n      queryClient.setQueryData([\'produtos\'], old => [\n        ...(old ?? []),\n        { ...novoProduto, id: \'temp-\' + Date.now() },\n      ]);\n      return { snapshot }; // para rollback\n    },\n\n    onError: (err, vars, context) => {\n      // Rollback se der erro\n      queryClient.setQueryData([\'produtos\'], context.snapshot);\n    },\n\n    onSettled: () => {\n      // Invalida e refetch para sincronizar com o servidor\n      queryClient.invalidateQueries({ queryKey: [\'produtos\'] });\n    },\n  });\n\n  return (\n    <button onClick={() => mutate({ nome: \'Novo\', preco: 100 })} disabled={isPending}>\n      {isPending ? \'Criando...\' : \'Criar Produto\'}\n    </button>\n  );\n}' },
        { type: 'highlight', content: '🔑 A diferença entre júnior e pleno em data fetching: júnior usa useEffect+useState com loading/error manual e sem cache. Pleno usa TanStack Query, entende staleTime, invalidateQueries, optimistic updates e sabe quando NÃO usar (dados puramente locais, WebSockets simples, formulários). Em Next.js Server Components, data fetching é no servidor — TanStack Query fica no cliente para dados interativos.' },
        {
          type: 'common_error',
          title: 'Recriar com useEffect o que TanStack Query já resolve',
          wrong: 'function Produtos() {\n  const [dados, setDados] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [erro, setErro] = useState(null);\n\n  useEffect(() => {\n    setLoading(true);\n    fetch(\'/api/produtos\')\n      .then(r => r.json())\n      .then(setDados)\n      .catch(setErro)\n      .finally(() => setLoading(false));\n  }, []); // sem cache, sem refetch, sem deduplicação\n}',
          wrongLabel: 'Boilerplate repetido em todo componente, sem cache entre páginas, sem tratamento de race condition.',
          right: 'function Produtos() {\n  const { data, isLoading, error } = useQuery({\n    queryKey: [\'produtos\'],\n    queryFn: () => fetch(\'/api/produtos\').then(r => r.json()),\n  });\n  // Cache, refetch, deduplication, stale-while-revalidate: tudo incluso\n}',
          rightLabel: 'Menos código, mais funcionalidades: cache de 5min, refetch ao focar a aba, deduplicação automática.',
          explanation: 'TanStack Query não substitui o fetch — ela gerencia o ciclo de vida dos dados: quando buscar, quando usar cache, quando refazer, como lidar com erros e retry. É infraestrutura, não magia.',
        },
      ],
      exercise: {
        title: 'Simular o ciclo de vida do TanStack Query',
        description: 'Sem usar a lib real, implemente uma versão simplificada do useQuery: uma função createQueryCache() que retorna um objeto com get(key, fetchFn) que: cacheia resultado por 30s, retorna dado em cache se ainda fresco, chama fetchFn se stale, rastreia status (loading/success/error) e conta cache hits.',
        solutionHint: 'Map com { data, timestamp, status }. get(): se (Date.now() - timestamp) < staleTime retorna cache (hit). Senão chama fetchFn() e atualiza o Map.',
        starterCode: 'function createQueryCache(staleTimeMs = 30000) {\n  const cache = new Map(); // key -> { data, timestamp, status }\n  let cacheHits = 0;\n\n  async function get(key, fetchFn) {\n    const cached = cache.get(key);\n    const agora = Date.now();\n\n    // Verifica se o dado em cache ainda é fresco\n    if (cached && (agora - cached.timestamp) < staleTimeMs) {\n      cacheHits++;\n      console.log(\'[CACHE HIT]\', key, \'(\' + cacheHits + \'x)\');\n      return cached.data;\n    }\n\n    // Dado stale ou inexistente — busca novo\n    console.log(\'[FETCHING]\', key);\n    cache.set(key, { data: null, timestamp: 0, status: \'loading\' });\n\n    try {\n      const data = await fetchFn();\n      cache.set(key, { data, timestamp: Date.now(), status: \'success\' });\n      return data;\n    } catch (err) {\n      cache.set(key, { data: null, timestamp: 0, status: \'error\' });\n      throw err;\n    }\n  }\n\n  function invalidate(key) {\n    cache.delete(key);\n    console.log(\'[INVALIDATED]\', key);\n  }\n\n  function stats() {\n    return { entradas: cache.size, cacheHits };\n  }\n\n  return { get, invalidate, stats };\n}\n\n// Simulação de API\nlet chamadas = 0;\nconst fetchProdutos = async () => {\n  chamadas++;\n  return [{ id: 1, nome: \'Notebook\' }, { id: 2, nome: \'Mouse\' }];\n};\n\n// Testes\nasync function testar() {\n  const qc = createQueryCache(5000); // 5s stale\n\n  const r1 = await qc.get(\'produtos\', fetchProdutos);\n  const r2 = await qc.get(\'produtos\', fetchProdutos); // deve usar cache\n  const r3 = await qc.get(\'produtos\', fetchProdutos); // deve usar cache\n\n  console.log(\'Chamadas à API:\', chamadas); // deve ser 1\n  console.log(\'Itens retornados:\', r1.length); // 2\n  console.log(\'Stats:\', JSON.stringify(qc.stats())); // cacheHits: 2\n\n  qc.invalidate(\'produtos\');\n  const r4 = await qc.get(\'produtos\', fetchProdutos); // busca de novo\n  console.log(\'Após invalidação, chamadas:\', chamadas); // 2\n}\n\ntestar();\n',
        validate: (output) => output.includes('CACHE HIT') && output.includes('Chamadas à API: 1') && output.includes('Após invalidação, chamadas: 2'),
        validateMessage: 'Mostre: cache hit, apenas 1 chamada à API nas 3 primeiras buscas, e 2 chamadas após invalidação.',
      },
      quiz: [
        { question: 'O que é staleTime no TanStack Query?', options: ['Tempo máximo de loading', 'Tempo em que o dado é considerado fresco — sem refetch automático durante esse período', 'Tempo antes de descartar o cache completamente', 'Delay entre retries'], correct: 1, explanation: 'staleTime: 0 = sempre refetch (padrão). staleTime: Infinity = nunca refetch. 5*60*1000 = 5 minutos fresco. O dado persiste no cache mesmo depois de stale, mas é refetchado em background.' },
        { question: 'O que queryKey faz?', options: ['É o nome da variável de dados', 'Identifica unicamente a query — mudança de qualquer elemento dispara novo fetch', 'É a URL da API', 'É o nome do endpoint'], correct: 1, explanation: "queryKey: ['produtos', categoria] — se categoria mudar, nova busca. queryKey: ['produtos'] sempre usa o mesmo cache. Arrays permitem hierarquia: invalidateQueries(['produtos']) invalida todas as queries que começam com 'produtos'." },
        { question: 'Para que serve invalidateQueries?', options: ['Remove o QueryClientProvider', 'Marca queries como stale e dispara refetch — usado após mutações para sincronizar com o servidor', 'Cancela requisições em andamento', 'Limpa o estado global'], correct: 1, explanation: "Após criar/atualizar/deletar, invalide as queries relacionadas: queryClient.invalidateQueries({ queryKey: ['produtos'] }). Isso marca o dado como stale e dispara refetch nos componentes que o consomem." },
        { question: 'O que é um Optimistic Update?', options: ['Uma query que nunca falha', 'Atualizar a UI imediatamente com o resultado esperado, antes da resposta do servidor, e reverter se der erro', 'Um fetch com retry automático', 'Cache que expira otimisticamente'], correct: 1, explanation: 'Optimistic update = UI responsiva sem esperar o servidor. onMutate: atualiza cache local. onError: reverte. onSettled: sincroniza com servidor. Resultado: UX fluida mesmo com latência.' },
        { question: 'Quando NÃO usar TanStack Query?', options: ['Em projetos grandes', 'Para dados globais como tema e autenticação que não vêm de API', 'Quando há muitas queries', 'Em Next.js'], correct: 1, explanation: 'TanStack Query é para dados de servidor (server state). Para estado de UI e dados locais (tema, preferências, modal aberto), use useState, Zustand ou Context. Misturar os dois contextos gera complexidade desnecessária.' },
      ],
    },
  }
  ,{
    id: 'mod-6-9',
    title: 'Bibliotecas de Componentes: shadcn/ui e Radix',
    duration: '40 min',
    xp: 180,
    content: {
      sections: [
        { type: 'text', content: 'shadcn/ui é o kit de componentes mais adotado em 2024/25 — presente em mais de 40% dos projetos React novos. Diferente de Material UI ou Chakra, shadcn não é uma dependência: você copia os componentes para seu projeto e os possui. São construídos sobre Radix UI (acessibilidade garantida) e estilizados com Tailwind. Resultado: componentes profissionais, acessíveis, customizáveis sem lutar contra estilos de uma biblioteca.' },
        { type: 'code', lang: 'javascript', content: '// ── SHADCN/UI: como funciona ──────────────────────────\n// npx shadcn-ui@latest init  (configura o projeto)\n// npx shadcn-ui@latest add button dialog sheet\n\n// O comando COPIA os componentes para seu projeto:\n// src/components/ui/button.tsx\n// src/components/ui/dialog.tsx\n// src/components/ui/sheet.tsx\n\n// Você os usa normalmente:\nimport { Button } from \'@/components/ui/button\';\nimport { Dialog, DialogContent, DialogHeader, DialogTitle } from \'@/components/ui/dialog\';\nimport { Input } from \'@/components/ui/input\';\n\nfunction ModalCriarProduto({ aberto, onFechar }) {\n  return (\n    <Dialog open={aberto} onOpenChange={onFechar}>\n      <DialogContent>\n        <DialogHeader>\n          <DialogTitle>Novo Produto</DialogTitle>\n        </DialogHeader>\n        <div className="flex flex-col gap-4">\n          <Input placeholder="Nome do produto" />\n          <Input type="number" placeholder="Preço" />\n          <Button onClick={onFechar}>Criar Produto</Button>\n          <Button variant="outline" onClick={onFechar}>Cancelar</Button>\n        </div>\n      </DialogContent>\n    </Dialog>\n  );\n}' },
        { type: 'code', lang: 'javascript', content: '// ── RADIX UI: a camada de acessibilidade ─────────────\n// shadcn é construído sobre Radix — que resolve a11y automaticamente:\n// - Foco trapped em modais (Tab não sai do dialog)\n// - Escape fecha dialogs\n// - aria-* corretos em todos os componentes\n// - Keyboard navigation em menus, dropdowns, tabs\n// - Screen reader announcements\n\n// Você pode usar Radix diretamente quando precisar de mais controle:\nimport * as Select from \'@radix-ui/react-select\';\n\nfunction SelectIdioma({ value, onChange }) {\n  return (\n    <Select.Root value={value} onValueChange={onChange}>\n      <Select.Trigger className="flex items-center gap-2 px-3 py-2 border rounded">\n        <Select.Value placeholder="Selecione o idioma" />\n      </Select.Trigger>\n      <Select.Portal>\n        <Select.Content className="bg-white border rounded shadow-lg">\n          <Select.Item value="pt">Português</Select.Item>\n          <Select.Item value="en">English</Select.Item>\n          <Select.Item value="es">Español</Select.Item>\n        </Select.Content>\n      </Select.Portal>\n    </Select.Root>\n  );\n}\n// Resultado: Select completamente acessível (keyboard nav, aria, focus management)\n// sem uma linha de código de acessibilidade manual' },
        { type: 'code', lang: 'javascript', content: '// ── VARIANTS COM CLASS-VARIANCE-AUTHORITY (CVA) ──────\n// shadcn usa CVA para variantes de componentes — padrão do mercado\nimport { cva } from \'class-variance-authority\';\nimport { cn } from \'@/lib/utils\';\n\nconst buttonVariants = cva(\n  // classes base (sempre aplicadas)\n  \'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none\',\n  {\n    variants: {\n      variant: {\n        default:   \'bg-violet-600 text-white hover:bg-violet-700\',\n        outline:   \'border border-input bg-transparent hover:bg-accent\',\n        ghost:     \'hover:bg-accent hover:text-accent-foreground\',\n        destructive: \'bg-red-500 text-white hover:bg-red-600\',\n      },\n      size: {\n        sm:   \'h-8 px-3 text-xs\',\n        md:   \'h-10 px-4 text-sm\',\n        lg:   \'h-12 px-6 text-base\',\n        icon: \'h-10 w-10\',\n      },\n    },\n    defaultVariants: { variant: \'default\', size: \'md\' },\n  }\n);\n\nfunction Button({ variant, size, className, ...props }) {\n  return (\n    <button\n      className={cn(buttonVariants({ variant, size }), className)}\n      {...props}\n    />\n  );\n}\n// Uso:\n// <Button>Salvar</Button>\n// <Button variant="outline" size="sm">Cancelar</Button>\n// <Button variant="destructive">Deletar</Button>' },
        { type: 'highlight', content: '🔑 Quando usar shadcn vs construir do zero? Use shadcn para: inputs, selects, modais, tooltips, tabs, menus — componentes com estado complexo e requisitos de acessibilidade. Construa do zero para: cards, badges, tipografia, layout — componentes puramente visuais sem interação. A regra: se envolve keyboard navigation ou aria-*, pegue do shadcn.' },
        {
          type: 'common_error',
          title: 'Construir modal com div + useState em vez de usar Dialog do Radix',
          wrong: 'function Modal({ aberto, onFechar }) {\n  if (!aberto) return null;\n  return (\n    <div className="fixed inset-0 flex items-center justify-center">\n      <div className="bg-white p-6 rounded">\n        Conteúdo do modal\n        <button onClick={onFechar}>Fechar</button>\n      </div>\n    </div>\n  );\n}\n// ❌ Sem focus trap, sem Escape, sem aria-modal, sem screen reader support',
          wrongLabel: 'Modal customizado com div não tem acessibilidade — usuários de teclado e leitores de tela ficam presos.',
          right: 'import { Dialog, DialogContent } from \'@/components/ui/dialog\';\nfunction Modal({ aberto, onFechar }) {\n  return (\n    <Dialog open={aberto} onOpenChange={onFechar}>\n      <DialogContent>\n        Conteúdo do modal\n      </DialogContent>\n    </Dialog>\n  );\n}\n// ✅ Focus trapped, Escape fecha, aria-modal, anunciado por screen readers',
          rightLabel: 'Dialog do Radix/shadcn tem toda a acessibilidade implementada — foco, Escape, ARIA.',
          explanation: 'Implementar um modal acessível corretamente leva horas e requer conhecimento de focus management, inert attribute, aria-labelledby, aria-modal e portal rendering. shadcn resolve tudo isso.',
        },
      ],
      exercise: {
        title: 'Implementar sistema de variantes de componente',
        description: 'Implemente uma função cva(base, config) simplificada que: aceita classes base sempre aplicadas, aceita um objeto de variants com seus valores, e retorna uma função que recebe as variantes escolhidas e retorna a string final de classes concatenadas.',
        solutionHint: 'cva retorna uma funcao. Essa funcao recebe {variant, size} e concatena: base + classes da variant escolhida + classes do size escolhido. Usa defaultVariants para valores padrao.',
        starterCode: 'function cva(base, { variants, defaultVariants = {} } = {}) {\n  return function(opcoes = {}) {\n    const escolhas = { ...defaultVariants, ...opcoes };\n    const classes = [base];\n    for (const [chave, valor] of Object.entries(escolhas)) {\n      if (variants[chave] && variants[chave][valor]) {\n        classes.push(variants[chave][valor]);\n      }\n    }\n    return classes.filter(Boolean).join(\' \');\n  };\n}\n\n// Definindo variantes do Button\nconst buttonClasses = cva(\n  \'inline-flex items-center rounded font-medium transition-colors\',\n  {\n    variants: {\n      variant: {\n        default:     \'bg-violet-600 text-white hover:bg-violet-700\',\n        outline:     \'border border-gray-300 hover:bg-gray-50\',\n        destructive: \'bg-red-500 text-white hover:bg-red-600\',\n      },\n      size: {\n        sm: \'h-8 px-3 text-xs\',\n        md: \'h-10 px-4 text-sm\',\n        lg: \'h-12 px-6 text-base\',\n      },\n    },\n    defaultVariants: { variant: \'default\', size: \'md\' },\n  }\n);\n\n// Testes\nconsole.log(buttonClasses());                              // base + default + md\nconsole.log(buttonClasses({ variant: \'outline\' }));       // base + outline + md\nconsole.log(buttonClasses({ variant: \'destructive\', size: \'lg\' })); // base + destructive + lg\nconsole.log(buttonClasses({ size: \'sm\' }));               // base + default + sm\n\n// Verificacoes\nconst padrao = buttonClasses();\nconsole.log(\'tem base:\', padrao.includes(\'inline-flex\'));\nconsole.log(\'tem violet:\', padrao.includes(\'violet\'));\nconsole.log(\'tem md:\', padrao.includes(\'h-10\'));\n',
        validate: (output) => output.includes('tem base: true') && output.includes('tem violet: true') && output.includes('tem md: true'),
        validateMessage: 'Confirme: tem base: true, tem violet: true, tem md: true.',
      },
      quiz: [
        { question: 'Qual a principal diferença entre shadcn/ui e Material UI?', options: ['shadcn é mais bonito', 'shadcn copia os componentes para seu projeto — você os possui e customiza; MUI é uma dependência externa que você configura', 'shadcn só funciona com Next.js', 'MUI não tem suporte a TypeScript'], correct: 1, explanation: 'shadcn usa a abordagem "copy and paste" — npx shadcn add button copia o código para src/components/ui/button.tsx. Você tem controle total. MUI é uma dependência npm que você instala e configura via theme.' },
        { question: 'Por que usar Radix UI para componentes interativos?', options: ['É mais rápido que React', 'Resolve acessibilidade automaticamente: focus management, keyboard navigation, aria attributes, screen reader support', 'Tem mais componentes que shadcn', 'É necessário para usar Tailwind'], correct: 1, explanation: 'Acessibilidade em componentes interativos (modais, menus, selects) é complexa. Radix garante: focus trapped, Escape key, aria-modal, keyboard navigation — conforme especificação WAI-ARIA.' },
        { question: 'O que é CVA (class-variance-authority)?', options: ['Um linter para classes CSS', 'Uma biblioteca para definir variantes de componentes de forma tipada e composável', 'Um bundler de CSS', 'Uma alternativa ao Tailwind'], correct: 1, explanation: 'CVA organiza variantes de componentes (variant="outline", size="lg") em uma API declarativa. O resultado é uma função que recebe as opções e retorna a string de classes correta, com TypeScript autocomplete.' },
        { question: 'Quando DEVERIA construir um componente do zero em vez de usar shadcn?', options: ['Nunca — sempre use shadcn', 'Para componentes puramente visuais sem estado (cards, badges, tipografia) onde shadcn seria overhead desnecessário', 'Quando o projeto usa Tailwind', 'Quando há mais de 10 componentes'], correct: 1, explanation: 'shadcn/Radix brilha onde há estado e acessibilidade complexos. Para componentes estáticos sem interação (card, badge, divider), o overhead de Radix não vale — CSS puro ou Tailwind é suficiente.' },
        { question: 'O que acontece quando você roda npx shadcn add button?', options: ['Instala o pacote @shadcn/button no node_modules', 'Copia o arquivo button.tsx para src/components/ui/ — você passa a possuir o componente', 'Adiciona um CDN link ao index.html', 'Gera um componente personalizado com IA'], correct: 1, explanation: 'shadcn é diferente de uma lib tradicional: os componentes são copiados para seu projeto. Isso significa que você pode editar livremente, não depende de atualizações da lib, e não tem "versão quebrada" de terceiros.' },
      ],
    },
  }

  ,{
    id: 'mp-phase-6',
    title: '🏗️ Mini-Projeto: App de Finanças com React',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase6,
    content: {
      sections: [{ type: 'text', content: 'Construa algo real aplicando o que aprendeu nesta fase.' }]
    }
  }
  ]
};
