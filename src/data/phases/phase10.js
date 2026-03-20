import { miniProjectPhase10 } from '../miniprojects.js';
export const phase10 = {
  id: 'phase-14',
  title: 'Engenharia de Software',
  phase: 14,
  color: '#fc8181',
  icon: '🏗️',
  description: 'Clean Code, testes, SOLID, padrões de projeto e as práticas que separam devs mediocres dos excelentes.',
  checklist: [
    'Escrever testes unitários com Jest',
    'Entender o que é TDD (Test-Driven Development)',
    'Aplicar os princípios SOLID básicos (especialmente S e D)',
    'Identificar e refatorar código duplicado',
    'Escrever código legível (nomes descritivos, funções pequenas)',
    'Usar linter e formatter (ESLint + Prettier) no projeto',
  ],
  modules: [
  {
          id: 'mod-14-1',
          title: 'Clean Code: Nomes, Funções e Estrutura',
          duration: '60 min',
          xp: 300,
          content: {
            sections: [
              { type: 'text', content: 'Clean Code é escrever código para humanos, não máquinas. Robert C. Martin (Uncle Bob) sistematizou os princípios. SOLID são 5 princípios de design orientado a objetos que tornam código manutenível.' },
              { type: 'code', lang: 'javascript', content: '// ── CLEAN CODE NA PRÁTICA ────────────────────\n\n// ❌ Código ruim — nome sem significado, magic numbers\nfunction calc(x, y, t) {\n  if (t === 1) return x * y * 0.07;\n  if (t === 2) return x * y * 0.12;\n}\n\n// ✅ Clean Code — nomes claros, constantes nomeadas\nconst TAXA_SERVICO_BASICO = 0.07;\nconst TAXA_SERVICO_PREMIUM = 0.12;\n\nfunction calcularTaxaServico(quantidade, precoUnitario, tipoServico) {\n  const subtotal = quantidade * precoUnitario;\n  const taxas = {\n    basico: TAXA_SERVICO_BASICO,\n    premium: TAXA_SERVICO_PREMIUM,\n  };\n  return subtotal * (taxas[tipoServico] ?? 0);\n}\n\n// ❌ Função que faz tudo — viola SRP\nfunction processarPedido(pedido) {\n  // valida o pedido\n  // calcula o total\n  // debita do estoque\n  // envia email\n  // registra no banco\n  // gera nota fiscal\n}\n\n// ✅ Funções com responsabilidade única\nconst validarPedido = (pedido) => { /* valida */ };\nconst calcularTotal = (itens) => { /* calcula */ };\nconst debitarEstoque = (itens) => { /* debita */ };\nconst notificarCliente = (email, pedido) => { /* envia email */ };\n\nasync function processarPedido(pedido) {\n  validarPedido(pedido);\n  const total = calcularTotal(pedido.itens);\n  await Promise.all([\n    debitarEstoque(pedido.itens),\n    notificarCliente(pedido.email, { ...pedido, total }),\n  ]);\n}' },
              { type: 'code', lang: 'javascript', content: '// ── PADRÕES DE PROJETO ESSENCIAIS ────────────\n\n// Factory — cria objetos sem expor a criação\nclass NotificacaoFactory {\n  static criar(tipo, dados) {\n    const tipos = {\n      email: EmailNotificacao,\n      sms: SmsNotificacao,\n      push: PushNotificacao,\n    };\n    const Classe = tipos[tipo];\n    if (!Classe) throw new Error(`Tipo desconhecido: ${tipo}`);\n    return new Classe(dados);\n  }\n}\n\n// Observer — publicar/subscrever eventos\nclass EventBus {\n  #listeners = new Map();\n  \n  on(evento, callback) {\n    if (!this.#listeners.has(evento)) {\n      this.#listeners.set(evento, new Set());\n    }\n    this.#listeners.get(evento).add(callback);\n    return () => this.off(evento, callback); // retorna unsubscribe\n  }\n  \n  off(evento, callback) {\n    this.#listeners.get(evento)?.delete(callback);\n  }\n  \n  emit(evento, dados) {\n    this.#listeners.get(evento)?.forEach(cb => cb(dados));\n  }\n}\n\nconst bus = new EventBus();\nconst cancelar = bus.on("pedido.criado", (pedido) => console.log(pedido));\n\n// Repository — abstrai acesso ao banco\nclass UsuarioRepository {\n  constructor(db) { this.db = db; }\n  buscarPorId(id) { return this.db.usuario.findUnique({ where: { id } }); }\n  buscarPorEmail(email) { return this.db.usuario.findUnique({ where: { email } }); }\n  criar(dados) { return this.db.usuario.create({ data: dados }); }\n  atualizar(id, dados) { return this.db.usuario.update({ where: { id }, data: dados }); }\n}' },
              { type: 'highlight', content: '📖 Os 5 princípios SOLID: S — Single Responsibility, O — Open/Closed (aberto para extensão, fechado para modificação), L — Liskov Substitution, I — Interface Segregation, D — Dependency Inversion.' },
            ],
            exercise: {
              title: 'Refatorando para Clean Code',
              description: 'Refatore a função abaixo aplicando: nomes descritivos, extração de constantes, separação de responsabilidades (pelo menos 3 funções menores), e elimine os comentários substituindo por nomes que se explicam.',
                            solutionHint: 'Funções: máximo 20 linhas, uma responsabilidade. Nomes: verbos para funções (calcular, buscar), substantivos para variáveis. Extraia funções com nomes que substituam comentários.',
starterCode: '// ❌ Código para refatorar\nfunction f(u, p) {\n  // valida\n  if (!u || !u.includes("@")) return false;\n  if (!p || p.length < 8) return false;\n  \n  // checa se existe no db simulado\n  const db = [{ e: "ana@dev.com", p: "minhasenha123" }];\n  const found = db.find(x => x.e === u);\n  if (found) return false; // ja existe\n  \n  // cria\n  const newUser = { id: Date.now(), e: u, p: p + "_hashed" };\n  db.push(newUser);\n  console.log("ok", newUser.id);\n  return true;\n}\n\n// ✅ Refatore abaixo:\n// Extraia: validarEmail, validarSenha, emailJaCadastrado, criarUsuario\n// Depois reescreva a função principal chamando as menores\n\nconst SENHA_MIN_CARACTERES = 8;\n\nfunction validarEmail(email) {\n  // implemente\n}\n\nfunction validarSenha(senha) {\n  // implemente\n}\n\n// Continue a refatoração...\n\nconsole.log("Refatoração demonstrada!");\n',
              solutionHint: 'Cada função faz 1 coisa. Use nomes como: validarEmail, emailJaCadastrado, hashSenha, registrarUsuario',
              validate: (output, code) => output.includes('Refatoração'),
              validateMessage: 'Execute o console.log de confirmação.'
            },
            quiz: [
              { question: 'O que é Clean Code?', options: ['Código sem comentários', 'Código sem bugs', 'Código legível, expressivo e fácil de manter', 'Código curto'], correct: 2, explanation: 'Clean Code é código que outro desenvolvedor consegue ler e entender sem esforço. Nome claro, responsabilidade única, sem magic numbers.' },
              { question: 'O que viola o princípio SRP (Single Responsibility)?', options: ['Função com 1 responsabilidade', 'Classe que gerencia banco E envia emails E valida dados', 'Módulo com muitas funções', 'Função longa mas coesa'], correct: 1, explanation: 'SRP: cada classe/função deve ter 1 razão para mudar. Uma classe que faz muitas coisas tem muitas razões para mudar — se qualquer parte muda, afeta tudo.' },
              { question: 'O que é o padrão Repository?', options: ['Padrão para criar objetos', 'Abstração que isola o acesso ao banco de dados da lógica de negócio', 'Gerenciamento de estado', 'Padrão de observer'], correct: 1, explanation: 'Repository abstrai as queries do banco. A lógica de negócio chama repository.buscarPorEmail() sem saber se é Prisma, MongoDB ou array em memória.' },
              { question: 'O que é o princípio DIP (Dependency Inversion)?', options: ['Inverter condicionais', 'Depender de abstrações (interfaces), não de implementações concretas', 'Inverter a herança', 'Passar dependências como parâmetro apenas'], correct: 1, explanation: 'DIP: módulos de alto nível não devem depender de baixo nível — ambos de abstrações. Facilita trocar implementações sem alterar código que as usa.' },
              { question: 'Quando usar comentários no código?', options: ['Nunca', 'Para explicar o POR QUE (intenção), não o QUE (já visível no código)', 'Para documentar toda função', 'Para compensar nomes ruins'], correct: 1, explanation: 'Bons nomes eliminam a maioria dos comentários. Comente: decisões não óbvias, hacks temporários, algoritmos complexos com referências. Nunca: "i++ // incrementa i".' },
            ]
          }
        },
  {
          id: 'mod-14-2',
          title: 'Testes: Conceitos, TDD e Pirâmide',
          duration: '60 min',
          xp: 300,
          content: {
            sections: [
              { type: 'text', content: 'Testes são código que verifica código. Empresas profissionais esperam que você saiba escrever testes. Testes unitários testam funções isoladas. Testes de integração testam módulos juntos. E2E testa o fluxo completo.' },
              { type: 'code', lang: 'javascript', content: '// ── VITEST / JEST — Testes Unitários ─────────\nimport { describe, it, expect, vi } from "vitest";\n\n// Função a ser testada\nfunction calcularDesconto(preco, percentual) {\n  if (percentual < 0 || percentual > 100) {\n    throw new Error("Percentual deve estar entre 0 e 100");\n  }\n  return preco * (1 - percentual / 100);\n}\n\n// Testes\ndescribe("calcularDesconto", () => {\n  it("deve aplicar 10% de desconto corretamente", () => {\n    expect(calcularDesconto(100, 10)).toBe(90);\n  });\n  \n  it("deve aplicar 50% de desconto corretamente", () => {\n    expect(calcularDesconto(200, 50)).toBe(100);\n  });\n  \n  it("deve retornar o preço original com 0%", () => {\n    expect(calcularDesconto(150, 0)).toBe(150);\n  });\n  \n  it("deve lançar erro com percentual negativo", () => {\n    expect(() => calcularDesconto(100, -5)).toThrow("Percentual deve estar entre 0 e 100");\n  });\n  \n  it("deve lançar erro com percentual acima de 100", () => {\n    expect(() => calcularDesconto(100, 110)).toThrow();\n  });\n});' },
              { type: 'code', lang: 'javascript', content: '// ── MOCKS E SPIES ─────────────────────────────\ndescribe("ServicoEmail", () => {\n  it("deve chamar o enviador com os dados corretos", async () => {\n    // Mock da dependência externa\n    const mockEnviar = vi.fn().mockResolvedValue({ id: "msg-123" });\n    const servico = new ServicoEmail({ enviar: mockEnviar });\n    \n    await servico.enviarBoasVindas("ana@email.com", "Ana");\n    \n    expect(mockEnviar).toHaveBeenCalledTimes(1);\n    expect(mockEnviar).toHaveBeenCalledWith({\n      para: "ana@email.com",\n      assunto: expect.stringContaining("Bem-vinda"),\n      corpo: expect.stringContaining("Ana"),\n    });\n  });\n});\n\n// ── REACT TESTING LIBRARY ─────────────────────\nimport { render, screen, fireEvent, waitFor } from "@testing-library/react";\nimport userEvent from "@testing-library/user-event";\n\ndescribe("BotaoContador", () => {\n  it("deve incrementar ao clicar", async () => {\n    const user = userEvent.setup();\n    render(<BotaoContador />);\n    \n    const botao = screen.getByRole("button", { name: /incrementar/i });\n    expect(screen.getByText("0")).toBeInTheDocument();\n    \n    await user.click(botao);\n    expect(screen.getByText("1")).toBeInTheDocument();\n    \n    await user.click(botao);\n    await user.click(botao);\n    expect(screen.getByText("3")).toBeInTheDocument();\n  });\n});' },
              { type: 'highlight', content: '🧪 TDD (Test-Driven Development): escreva o teste antes da implementação. Red (teste falha) → Green (implementa o mínimo para passar) → Refactor (limpa o código). Muda como você pensa sobre o design.' },
            ],
            exercise: {
              title: 'Escrevendo testes unitários',
              description: 'Escreva funções de teste (sem framework — apenas console.assert) para testar a função formatarMoeda(valor, moeda) que deve: retornar "R$ 1.234,56" para (1234.56, "BRL"), lançar erro para valor negativo, retornar "$ 1,234.56" para (1234.56, "USD").',
                            solutionHint: 'describe() agrupa testes. it()/test() define um caso. expect(valor).toBe(esperado). beforeEach() para setup. Mock com jest.fn() para dependências.',
starterCode: '// Função a ser testada\nfunction formatarMoeda(valor, moeda = "BRL") {\n  if (valor < 0) throw new Error("Valor não pode ser negativo");\n  \n  const formatadores = {\n    BRL: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }),\n    USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),\n  };\n  \n  const formatador = formatadores[moeda];\n  if (!formatador) throw new Error(`Moeda não suportada: ${moeda}`);\n  \n  return formatador.format(valor);\n}\n\n// Escreva os testes usando console.assert\nfunction testar(descricao, fn) {\n  try {\n    fn();\n    console.log(`✅ ${descricao}`);\n  } catch (e) {\n    console.log(`❌ ${descricao}: ${e.message}`);\n  }\n}\n\n// Teste 1: BRL correto\ntestar("Formata BRL corretamente", () => {\n  // use console.assert ou throw new Error\n});\n\n// Teste 2: lança erro para negativo\ntestar("Lança erro para valor negativo", () => {\n  // tente chamar com valor negativo e verifique que lança\n});\n\n// Teste 3: USD correto\ntestar("Formata USD corretamente", () => {\n  // implemente\n});\n',
              solutionHint: 'const result = formatarMoeda(1234.56, "BRL"); if (!result.includes("1.234")) throw new Error("Falhou")',
              validate: (output, code) => output.includes('✅') && !output.includes('❌'),
              validateMessage: 'Todos os testes devem passar (✅ sem ❌).'
            },
            quiz: [
              { question: 'O que é TDD?', options: ['TypeScript Driven Development', 'Escrever testes ANTES da implementação', 'Uma ferramenta de testes', 'Testes de integração'], correct: 1, explanation: 'TDD: Red (teste falha, código não existe) → Green (implementa o mínimo) → Refactor (melhora). Muda o design do código para melhor.' },
              { question: 'O que é um mock em testes?', options: ['Dado de teste inválido', 'Substituto controlado de uma dependência real', 'Um tipo de assertion', 'Teste manual'], correct: 1, explanation: 'Mock substitui dependências reais (banco, API, email) com versões controladas. Torna testes unitários rápidos e determinísticos.' },
              { question: 'Qual a diferença entre teste unitário e de integração?', options: ['São idênticos', 'Unitário: testa função isolada; Integração: testa módulos interagindo (ex: rota + banco)', 'Integração usa mock', 'Unitário testa a UI'], correct: 1, explanation: 'Unitário: função pura isolada, muito rápido. Integração: Controller + Service + Banco (real ou em memória), mais lento, mais confiança.' },
              { question: 'Para que serve React Testing Library?', options: ['Testar performance', 'Testar componentes React como o usuário os usa (por texto, role, label)', 'Substituir o React', 'Mockar APIs'], correct: 1, explanation: 'RTL incentiva testar pelo comportamento visível ao usuário, não pela implementação. getByRole, getByText, not getByClassName.' },
              { question: 'O que é cobertura de código (code coverage)?', options: ['Quantidade de testes', 'Porcentagem do código executada pelos testes', 'Qualidade dos testes', 'Número de assertions'], correct: 1, explanation: 'Coverage mede quais linhas/branches foram exercidas pelos testes. 80%+ é um bom target. 100% não garante qualidade — foque em lógica crítica.' },
            ]
          }
        },
  {
      id: 'mod-10-1b',
      title: 'Testes com Vitest e Testing Library',
      duration: '60 min',
      xp: 240,
      content: {
        sections: [
          {
            type: 'text',
            content:
              'Testes automatizados existem em 3 níveis: unitários (uma função isolada), integração (módulos trabalhando juntos) e E2E (fluxo completo do usuário no browser). A pirâmide de testes recomenda: muitos unitários, alguns de integração, poucos E2E. Vitest é o framework padrão em projetos Vite/React.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content:
              '// ── VITEST: TESTES UNITÁRIOS ─────────────────\n// Arquivo: src/utils/formatadores.test.js\nimport { describe, it, expect, beforeEach, vi } from "vitest";\nimport { formatarMoeda, formatarData, calcularDesconto } from "./formatadores";\n\n// describe: agrupa testes relacionados\ndescribe("formatarMoeda", () => {\n  it("formata número positivo corretamente", () => {\n    expect(formatarMoeda(1234.5)).toBe("R$ 1.234,50");\n  });\n  \n  it("lida com zero", () => {\n    expect(formatarMoeda(0)).toBe("R$ 0,00");\n  });\n  \n  it("lida com valor negativo", () => {\n    expect(formatarMoeda(-50)).toBe("-R$ 50,00");\n  });\n});\n\ndescribe("calcularDesconto", () => {\n  it("aplica 10% de desconto corretamente", () => {\n    expect(calcularDesconto(100, 10)).toBe(90);\n  });\n  \n  it("lança erro se desconto for negativo", () => {\n    // expect.toThrow verifica que a função lança erro\n    expect(() => calcularDesconto(100, -5))\n      .toThrow("Desconto não pode ser negativo");\n  });\n  \n  it("retorna zero se desconto for 100%", () => {\n    expect(calcularDesconto(200, 100)).toBe(0);\n  });\n});\n\n// Matchers úteis:\n// expect(x).toBe(y)          — igualdade estrita (===)\n// expect(x).toEqual(y)       — igualdade profunda (objetos/arrays)\n// expect(x).toBeNull()\n// expect(x).toBeTruthy()\n// expect(arr).toContain(item)\n// expect(fn).toThrow("msg")\n// expect(num).toBeGreaterThan(n)',
          },
          {
            type: 'code',
            lang: 'javascript',
            content:
              '// ── MOCKING: ISOLAR DEPENDÊNCIAS ─────────────\n// Arquivo: src/services/usuarios.test.js\nimport { describe, it, expect, vi, beforeEach } from "vitest";\nimport { buscarUsuario, salvarUsuario } from "./usuarios";\n\n// Mock do módulo de API — substitui fetch real\nvi.mock("../api/cliente", () => ({\n  get: vi.fn(),\n  post: vi.fn(),\n}));\n\nimport { get, post } from "../api/cliente";\n\ndescribe("buscarUsuario", () => {\n  beforeEach(() => {\n    vi.clearAllMocks(); // limpa chamadas anteriores\n  });\n  \n  it("retorna usuário quando API responde com sucesso", async () => {\n    // Configura o mock para retornar dados específicos\n    get.mockResolvedValue({ id: 1, nome: "Ana", email: "ana@dev.com" });\n    \n    const usuario = await buscarUsuario(1);\n    \n    expect(get).toHaveBeenCalledWith("/usuarios/1");\n    expect(get).toHaveBeenCalledTimes(1);\n    expect(usuario.nome).toBe("Ana");\n  });\n  \n  it("lança erro quando usuário não existe (404)", async () => {\n    get.mockRejectedValue(new Error("404: Não encontrado"));\n    \n    await expect(buscarUsuario(999)).rejects.toThrow("404");\n  });\n});\n\n// ── SPY: VERIFICAR SE FUNÇÃO FOI CHAMADA ──────\nit("loga o resultado após salvar", async () => {\n  const consoleSpy = vi.spyOn(console, "log");\n  post.mockResolvedValue({ id: 2, nome: "Bruno" });\n  \n  await salvarUsuario({ nome: "Bruno" });\n  \n  expect(consoleSpy).toHaveBeenCalledWith(\n    expect.stringContaining("Usuário salvo")\n  );\n});',
          },
          {
            type: 'code',
            lang: 'javascript',
            content:
              '// ── TESTING LIBRARY: TESTES DE COMPONENTES ───\n// Arquivo: src/components/Botao.test.jsx\nimport { render, screen, fireEvent } from "@testing-library/react";\nimport userEvent from "@testing-library/user-event";\nimport { Botao } from "./Botao";\n\ndescribe("Botao", () => {\n  it("renderiza com o texto correto", () => {\n    render(<Botao>Salvar</Botao>);\n    \n    // getByRole é o seletor preferido — como o usuário encontra\n    const botao = screen.getByRole("button", { name: "Salvar" });\n    expect(botao).toBeInTheDocument();\n  });\n  \n  it("chama onClick quando clicado", async () => {\n    const handleClick = vi.fn();\n    render(<Botao onClick={handleClick}>Clique</Botao>);\n    \n    // userEvent simula interação real (mais fiel que fireEvent)\n    await userEvent.click(screen.getByRole("button"));\n    \n    expect(handleClick).toHaveBeenCalledTimes(1);\n  });\n  \n  it("não chama onClick quando desabilitado", async () => {\n    const handleClick = vi.fn();\n    render(<Botao onClick={handleClick} disabled>Clique</Botao>);\n    \n    await userEvent.click(screen.getByRole("button"));\n    expect(handleClick).not.toHaveBeenCalled();\n  });\n  \n  it("aplica classe de variante corretamente", () => {\n    render(<Botao variante="perigo">Deletar</Botao>);\n    const botao = screen.getByRole("button");\n    expect(botao).toHaveClass("btn-perigo");\n  });\n});\n\n// Seletores preferidos (em ordem de preferência):\n// getByRole    — acessível e robusto\n// getByLabelText — para inputs com label\n// getByText    — texto visível\n// getByTestId  — último recurso (data-testid="...")',
          },
          {
            type: 'highlight',
            content:
              '🎯 Filosofia do Testing Library: "Quanto mais seus testes se parecerem com a forma como o usuário usa o software, mais confiança eles dão." Evite testar detalhes de implementação (nomes de classes internas, estado do componente) — teste comportamento visível.',
          },
        ],
        exercise: {
          title: 'Escrever testes unitários reais',
          description:
            'Implemente e teste a função validarSenha(senha) que retorna { valida: boolean, erros: string[] }. Regras: mínimo 8 chars, ao menos 1 maiúscula, ao menos 1 número, ao menos 1 caractere especial (!@#$%). Escreva pelo menos 5 casos de teste cobrindo: senha válida, senha curta, sem maiúscula, sem número, sem especial.',
                    solutionHint: 'Teste o comportamento, não a implementação. Caso feliz + casos de erro + edge cases. Mock dependências externas. Cada teste deve ser independente dos outros.',
starterCode:
            '// Implementação\nfunction validarSenha(senha) {\n  const erros = [];\n  \n  if (senha.length < 8)\n    erros.push("Mínimo 8 caracteres");\n  \n  if (!/[A-Z]/.test(senha))\n    erros.push("Precisa de ao menos 1 letra maiúscula");\n  \n  // Complete as outras regras:\n  // - ao menos 1 número ([0-9])\n  // - ao menos 1 especial ([!@#$%])\n  \n  return { valida: erros.length === 0, erros };\n}\n\n// Testes manuais (simulando um framework de testes)\nfunction testar(descricao, fn) {\n  try {\n    fn();\n    console.log(`✅ ${descricao}`);\n  } catch (e) {\n    console.log(`❌ ${descricao}: ${e.message}`);\n  }\n}\n\nfunction esperar(valor) {\n  return {\n    toBe: (esperado) => {\n      if (valor !== esperado)\n        throw new Error(`Esperava ${esperado}, recebeu ${valor}`);\n    },\n    toContain: (item) => {\n      if (!valor.includes(item))\n        throw new Error(`"${valor}" não contém "${item}"`);\n    },\n    toBeTruthy: () => { if (!valor) throw new Error(`Esperava truthy, recebeu ${valor}`); },\n    toBeFalsy:  () => { if (valor)  throw new Error(`Esperava falsy, recebeu ${valor}`); },\n  };\n}\n\n// Escreva pelo menos 5 testes:\ntestar("aceita senha válida", () => {\n  const { valida } = validarSenha("Senha@123");\n  esperar(valida).toBe(true);\n});\n\ntestar("rejeita senha curta", () => {\n  const { valida, erros } = validarSenha("Ab@1");\n  esperar(valida).toBe(false);\n  esperar(erros[0]).toContain("8 caracteres");\n});\n\n// Escreva mais 3 testes aqui...\n',
          solutionHint: '/[0-9]/.test(senha) para número | /[!@#$%]/.test(senha) para especial',
          validate: (output, code) => {
            const aprovados = (output.match(/✅/g) || []).length;
            const reprovados = (output.match(/❌/g) || []).length;
            return aprovados >= 4 && reprovados === 0;
          },
          validateMessage: 'Ao menos 4 testes devem passar (✅) e nenhum falhar (❌).',
        },
        quiz: [
          {
            question: 'Qual a diferença entre testes unitários e de integração?',
            options: [
              'Unitários são mais rápidos, integração mais lentos',
              'Unitários testam uma unidade isolada; integração testa como módulos funcionam juntos',
              'Integração usa browser real',
              'Não há diferença prática',
            ],
            correct: 1,
            explanation:
              'Unitários: uma função/componente em isolamento com dependências mockadas. Integração: múltiplos módulos reais interagindo (ex: componente + hook + serviço). E2E: fluxo completo no browser.',
          },
          {
            question: 'O que é um mock em testes?',
            options: [
              'Um teste que falha propositalmente',
              'Uma substituição fake de uma dependência real para controlar o comportamento',
              'Uma cópia do banco de dados de produção',
              'Um tipo de assertion',
            ],
            correct: 1,
            explanation:
              'Mock substitui dependências reais (APIs, banco, relógio) por versões controladas. Você define o que o mock retorna e verifica se foi chamado corretamente.',
          },
          {
            question: 'Por que Testing Library incentiva getByRole em vez de getByClassName?',
            options: [
              'getByRole é mais rápido',
              'Testa como o usuário percebe a UI — se a role mudar, o teste falha por bom motivo',
              'É mais fácil de escrever',
              'Evita CSS complexo',
            ],
            correct: 1,
            explanation:
              'getByRole("button") reflete como leitores de tela veem a UI. Se você mudar a classe mas quebrar a acessibilidade, o teste detecta. Se você mudar a classe mantendo o comportamento, o teste passa.',
          },
          {
            question: 'O que é beforeEach nos testes?',
            options: [
              'Executa o teste antes do describe',
              'Função que roda antes de cada teste do bloco — usada para reset e setup',
              'Importa dependências automaticamente',
              'Define o timeout de cada teste',
            ],
            correct: 1,
            explanation:
              'beforeEach roda antes de cada it/test. Garante estado limpo entre testes. vi.clearAllMocks() em beforeEach evita que mocks de um teste contaminem o próximo.',
          },
          {
            question: 'O que é TDD (Test-Driven Development)?',
            options: [
              'Escrever testes depois de implementar',
              'Escrever o teste primeiro (que falha), depois o código mínimo para passar, depois refatorar',
              'Testar apenas em produção',
              'Escrever documentação de testes',
            ],
            correct: 1,
            explanation:
              'TDD: Red (escreve teste que falha) → Green (escreve código mínimo para passar) → Refactor (melhora sem quebrar o teste). Força design pensado e cobertura natural.',
          },
        ],
      },
    },
  ,{
    id: 'mod-14-3',
    title: 'SOLID na Prática: Exemplos Reais',
    duration: '55 min',
    xp: 210,
    content: {
      sections: [
        { type: 'text', content: 'SOLID são 5 princípios de design. Cada um resolve uma dor específica. A diferença entre código que funciona e código fácil de manter está em quantos você aplicou.' },
        { type: 'code', lang: 'javascript', content: '// S — Single Responsibility: uma razão para mudar\n// ERRADO:\nclass UserServiceRuim {\ncriar(d) {} // cria + envia email + valida\nenviarEmail(e) {} // lógica de email aqui!\n}\n// CORRETO:\nclass UserService {\nconstructor(emailSvc, repo) { this.emailSvc=emailSvc; this.repo=repo; }\nasync criar(dados) { const u=await this.repo.create(dados); await this.emailSvc.enviar(u.email); return u; }\n}\n// O — Open/Closed: adicionar sem modificar\nconst descontos = { vip: v=>v*0.20, premium: v=>v*0.10 };\nconst calcDesc = (tipo,v) => descontos[tipo]?.(v) ?? 0;\n// Adicionar novo tipo: só nova entrada no mapa, sem tocar no resto!\n// D — Dependency Inversion: injete dependências\nclass UserService2 {\nconstructor(repo) { this.repo=repo; } // qualquer repo serve\ncriar(d) { return this.repo.create(d); } // testável com mock!\n}\nconsole.log(\"SOLID: S=responsabilidade única, O=extensível, D=injetável.\");' },
        { type: 'common_error', title: 'SOLID em código simples', wrong: '// Funções utilitárias simples não precisam de SOLID\nclass StringUtils {\nstatic capitalizar(s) { return s[0].toUpperCase()+s.slice(1); }\n}\n// "Aplicar SRP": separar em 3 classes\n// Resultado: absurdo', wrongLabel: 'SOLID é para quando a complexidade justifica.', right: '// StringUtils está correto — todos têm a mesma razão para mudar\n// SOLID importa quando:\n// Mudar email exige mexer em UserService (viola S)\n// Adicionar desconto exige modificar código (viola O)\n// Testes precisam de banco real (viola D)', rightLabel: 'SOLID é diagnóstico de dores reais, não checklist universal.', explanation: 'Aplique SOLID quando sentir a dor: N lugares para 1 mudança (S), adicionar feature = modificar existente (O), sem mock no teste (D).' },
      ],
      exercise: {
        title: 'Refatorar violações SOLID',
        description: 'Pedido viola SRP (email dentro) e OCP (desconto hardcoded). Refatore em Pedido + DescontoService + EmailService. Total vip+R$3000 = R$2400.',
        starterCode: `class Pedido {
  constructor(itens, user) { this.itens=itens; this.user=user; }
  confirmar() {
    const sub = this.itens.reduce((s,i)=>s+i.preco, 0);
    let desc = 0;
    if (this.user.tipo==='vip')     desc=sub*0.20; // viola OCP
    if (this.user.tipo==='premium') desc=sub*0.10;
    console.log('Email para:', this.user.email);    // viola SRP
    console.log('Total:', sub-desc);
    return sub-desc;
  }
}
// TODO: refatore em Pedido, DescontoService, EmailService
// const descontoSvc = { calcular: (tipo, v) => ... };
// const emailSvc    = { notificar: (email, total) => ... };
// const p = new Pedido([{preco:3000}], {email:'a@a.com', tipo:'vip'});
// p.confirmar(descontoSvc, emailSvc); // deve imprimir Total: 2400`,
        validate: (output, code) => (code.includes('descontoSvc')||code.includes('DescontoService')||code.includes('calcular')) && (code.includes('emailSvc')||code.includes('EmailService')||code.includes('notificar')) && output.includes('2400'),
        validateMessage: 'Separe em 2+ responsabilidades distintas. Total deve ser 2400.',
      },
      quiz: [
        { question: 'O que é Open/Closed?', options: ['Código não muda', 'Adicionar features criando novo código, sem modificar o existente', 'Métodos públicos fixos', 'Herança preferida'], correct: 1, explanation: 'Para novo desconto: nova entrada no mapa — não modifique a função existente. Evita quebrar comportamentos testados.' },
        { question: 'Por que injetar dependências?', options: ['Menos memória', 'Testável com mocks e fácil de trocar implementações', 'Performance', 'Convenção'], correct: 1, explanation: 'Se UserService instancia Prisma internamente, não testa sem banco. Com injeção: passe mock nos testes.' },
        { question: 'SOLID só em POO?', options: ['Sim', 'Não — funciona em módulos e funções JavaScript', 'Só S e D', 'Outros paradigmas têm outros princípios'], correct: 1, explanation: 'SRP em módulos, OCP com HOFs, DI passando parâmetros. Os conceitos transcendem o paradigma.' },
      ],
    },
  }
  ,{
    id: 'mod-14-4',
    title: 'Testes na Prática: Unitários, Mocks e Estratégia',
    duration: '60 min',
    xp: 230,
    content: {
      sections: [
        { type: 'text', content: 'Pirâmide de testes: muitos unitários (rápidos, isolados), alguns de integração (partes juntas), poucos E2E (sistema inteiro). Saber qual usar é o que diferencia quem escreve testes de quem escreve testes úteis.' },
        { type: 'code', lang: 'javascript', content: '// VITEST: testes unitários modernos\nimport { describe, it, expect, vi, beforeEach } from \'vitest\';\ndescribe(\'calcularFrete\', () => {\nit(\'grátis acima de R$200\', () => expect(calcularFrete(250,\'SP\')).toBe(0));\nit(\'R$15 para SP\',        () => expect(calcularFrete(100,\'SP\')).toBe(15));\nit(\'erro para negativo\',  () => expect(() => calcularFrete(-1,\'SP\')).toThrow());\n});\n// MOCKS: isolar dependências\nconst mockRepo  = { findByEmail: vi.fn(), create: vi.fn() };\nconst mockEmail = { enviar: vi.fn() };\nconst svc = new UserService(mockRepo, mockEmail);\nbeforeEach(() => vi.clearAllMocks());\nit(\'cria e envia email\', async () => {\nmockRepo.findByEmail.mockResolvedValue(null);\nmockRepo.create.mockResolvedValue({ id:1, email:\'a@b.com\' });\nconst u = await svc.criar({ email:\'a@b.com\' });\nexpect(u.id).toBe(1);\nexpect(mockEmail.enviar).toHaveBeenCalledWith(\'a@b.com\');\n});\nconsole.log(\"vi.fn() = mock sem banco. beforeEach = limpar entre testes.\");' },
        { type: 'highlight', content: 'Pirâmide de testes: Unitários 70% (ms, isolados), Integração 20% (API+banco de teste), E2E 10% (Playwright). Pirâmide invertida = suite lenta e instável.' },
        { type: 'common_error', title: 'Testar implementação em vez de comportamento', wrong: 'it(\'chama bcrypt com 12\', async () => {\nconst spy = vi.spyOn(bcrypt, \'hash\');\nawait svc.criar({ senha:\'123\' });\nexpect(spy).toHaveBeenCalledWith(\'123\', 12); // implementação!\n});\n// Mudar para rounds=14 quebra o teste sem quebrar o sistema', wrongLabel: 'Testar internals cria testes frágeis com refatorações válidas.', right: 'it(\'não armazena senha em texto puro\', async () => {\nawait svc.criar({ email:\'a@a.com\', senha:\'abc\' });\nconst u = await repo.findByEmail(\'a@a.com\');\nexpect(u.senhaHash).not.toBe(\'abc\');\n// Não importa se usa bcrypt, argon2 ou scrypt\n});', rightLabel: 'Teste comportamento: "senha não é texto puro".', explanation: 'Refatorar não deve quebrar testes se o comportamento externo não mudou.' },
      ],
      exercise: {
        title: 'Escrever suite de testes completa',
        description: 'Use o framework simplificado para escrever pelo menos 8 testes cobrindo 3 funções. Caso feliz, erro e edge case para cada.',
        starterCode: `const r=[];
function describe(n,fn) { console.log('\n'+n); fn(); }
function it(d,fn) {
  try { fn(); r.push(true); console.log('  ✅',d); }
  catch(e) { r.push(false); console.log('  ❌',d,'-',e.message); }
}
const expect = v => ({
  toBe: e => { if(v!==e) throw new Error(v+' !== '+e); },
  toContain: s => { if(!String(v).includes(String(s))) throw new Error('missing '+s); },
  not: { toBe: e => { if(v===e) throw new Error(v+' === '+e+' (should differ)'); } },
});
const expectFn = fn => ({ toThrow: () => {
  try { fn(); throw new Error('nao lancou'); }
  catch(e) { if(e.message==='nao lancou') throw e; }
}});
function imc(kg,m) {
  if(kg<=0||m<=0) throw new Error('Invalido');
  const v=kg/(m*m); if(v<18.5)return 'Abaixo'; if(v<25)return 'Normal'; return 'Sobrepeso';
}
function palavras(txt) {
  if(typeof txt!=='string') throw new Error('String esperada');
  return txt.trim().split(/\s+/).filter(Boolean).length;
}
function fib(n) {
  if(n<0) throw new Error('n>=0');
  if(n<=1) return n;
  let a=0,b=1; for(let i=2;i<=n;i++) [a,b]=[b,a+b]; return b;
}
describe('imc', () => {
  it('Normal para 70kg 1.75m', () => expect(imc(70,1.75)).toBe('Normal'));
  // + 2 testes
});
describe('palavras', () => {
  it('3 palavras', () => expect(palavras('a b c')).toBe(3));
  // + 2 testes
});
describe('fib', () => {
  it('fib(0)=0', () => expect(fib(0)).toBe(0));
  it('fib(7)=13', () => expect(fib(7)).toBe(13));
  // + 1 teste
});
const ok=r.filter(Boolean).length;
console.log('\nResultado:', ok+'/'+r.length, 'testes passaram');`,
        validate: (output, code) => {
          const ok = (output.match(/✅/g)||[]).length;
          return code.includes("describe('imc'") && code.includes("describe('palavras'") && ok >= 6;
        },
        validateMessage: 'Pelo menos 8 testes, 6 devem passar (✅).',
      },
      quiz: [
        { question: 'O que é a pirâmide de testes?', options: ['Metodologia ágil', 'Muitos unitários, alguns integração, poucos E2E', 'Hierarquia de arquivos', 'Tipo de relatório'], correct: 1, explanation: 'Unitários: ms, isolados, muitos. Integração: partes reais juntas. E2E: lentos, frágeis, poucos.' },
        { question: 'Por que vi.fn()?', options: ['Performance', 'Isolar banco e email — testes rápidos e determinísticos', 'Dados aleatórios', 'Erros'], correct: 1, explanation: 'Mocks substituem dependências reais. Sem mock: precisam de banco/internet. Com mock: ms.' },
        { question: 'Unitário vs Integração?', options: ['Vitest vs Jest', 'Unitário isola com mocks. Integração testa partes reais juntas', 'São iguais', 'Unitário menor'], correct: 1, explanation: 'Unitário: isola tudo. Integração: API+banco de teste real.' },
      ],
    },
  }
  ,{
    id: 'mod-14-5',
    title: 'MSW: Mocking de API em Testes e Desenvolvimento',
    duration: '40 min',
    xp: 185,
    content: {
      sections: [
        { type: 'text', content: 'MSW (Mock Service Worker) intercepta requisições HTTP no nível de rede — transparente para o código da aplicação. É o padrão do mercado para testar componentes que fazem fetch sem depender de um servidor real. Funciona em testes (com Node.js) e em desenvolvimento (no browser via Service Worker). Elimina a necessidade de mocks frágeis de fetch e axios.' },
        { type: 'code', lang: 'javascript', content: '// ── SETUP ─────────────────────────────────────────────\n// npm install msw --save-dev\n\n// src/mocks/handlers.js — define as rotas interceptadas\nimport { http, HttpResponse } from \'msw\';\n\nexport const handlers = [\n  // GET /api/usuarios\n  http.get(\'/api/usuarios\', () => {\n    return HttpResponse.json([\n      { id: 1, nome: \'Ana Silva\', email: \'ana@dev.com\' },\n      { id: 2, nome: \'Bruno Costa\', email: \'bruno@dev.com\' },\n    ]);\n  }),\n\n  // GET /api/usuarios/:id\n  http.get(\'/api/usuarios/:id\', ({ params }) => {\n    const { id } = params;\n    if (id === \'999\') {\n      return HttpResponse.json({ erro: \'Usuário não encontrado\' }, { status: 404 });\n    }\n    return HttpResponse.json({ id: Number(id), nome: \'Ana Silva\', email: \'ana@dev.com\' });\n  }),\n\n  // POST /api/usuarios\n  http.post(\'/api/usuarios\', async ({ request }) => {\n    const body = await request.json();\n    return HttpResponse.json(\n      { id: Math.random(), ...body, criadoEm: new Date().toISOString() },\n      { status: 201 }\n    );\n  }),\n\n  // Simular erro de rede\n  http.get(\'/api/instavel\', () => {\n    return HttpResponse.error(); // simula falha de rede\n  }),\n];' },
        { type: 'code', lang: 'javascript', content: '// ── USO EM TESTES (Vitest + Testing Library) ─────────\nimport { setupServer } from \'msw/node\';\nimport { render, screen, waitFor } from \'@testing-library/react\';\nimport { handlers } from \'./mocks/handlers\';\nimport ListaUsuarios from \'./ListaUsuarios\';\n\n// Cria o servidor de mock — compartilhado entre todos os testes\nconst server = setupServer(...handlers);\n\nbeforeAll(() => server.listen());     // inicia antes dos testes\nafterEach(() => server.resetHandlers()); // reseta sobrescritas\nafterAll(() => server.close());       // fecha após todos\n\ntest(\'exibe lista de usuarios\', async () => {\n  render(<ListaUsuarios />);\n  // Espera o loading terminar\n  expect(await screen.findByText(\'Ana Silva\')).toBeInTheDocument();\n  expect(screen.getByText(\'Bruno Costa\')).toBeInTheDocument();\n});\n\ntest(\'exibe erro quando API falha\', async () => {\n  // Sobrescreve o handler só para este teste\n  server.use(\n    http.get(\'/api/usuarios\', () => {\n      return HttpResponse.json({ erro: \'Servidor fora do ar\' }, { status: 500 });\n    })\n  );\n  render(<ListaUsuarios />);\n  expect(await screen.findByText(\'Erro ao carregar usuários\')).toBeInTheDocument();\n});' },
        { type: 'highlight', content: '🔑 Por que MSW em vez de vi.mock do fetch? Porque MSW testa o código real — o mesmo fetch() que roda em produção. vi.mock substitui o módulo e pode mascarar bugs de integração. MSW intercepta na rede: se você trocar fetch por axios ou TanStack Query, os testes continuam funcionando sem alterar os mocks.' },
        {
          type: 'common_error',
          title: 'Mockar fetch diretamente em vez de usar MSW',
          wrong: 'vi.mock(\'node-fetch\', () => ({\n  default: vi.fn().mockResolvedValue({\n    ok: true,\n    json: () => Promise.resolve({ nome: \'Ana\' }),\n  }),\n}));\n// ❌ Frágil: se mudar para axios, o mock quebra\n// ❌ Não testa headers, status codes, ou lógica de retry',
          wrongLabel: 'Mocks de fetch são acoplados à implementação — mudar a lib de HTTP quebra todos os testes.',
          right: '// ✅ MSW: independente de implementação\nhttp.get(\'/api/usuario\', () => {\n  return HttpResponse.json({ nome: \'Ana\' });\n});\n// Funciona com fetch, axios, ky, TanStack Query, SWR...',
          rightLabel: 'MSW intercepta na rede — agnóstico da lib HTTP usada no código.',
          explanation: 'MSW opera no nível do Service Worker (browser) ou do módulo http/https do Node.js. O código da aplicação não sabe que está sendo interceptado — é a mesma requisição real.',
        },
      ],
      exercise: {
        title: 'Simular um servidor MSW em JavaScript puro',
        description: 'Implemente uma classe MockServer que registra handlers com get(path, fn) e post(path, fn), e processa requisições com request(method, path, body). Suporte params de rota (/usuarios/:id) e retorne o response do handler correspondente.',
        solutionHint: 'Guarde handlers num Map. Para match de rota com params, compare segmentos e extraia :id. request() encontra o handler e chama a função com { params, body }.',
        starterCode: 'class MockServer {\n  #handlers = [];\n\n  #registrar(method, path, fn) {\n    this.#handlers.push({ method: method.toUpperCase(), path, fn });\n  }\n\n  get(path, fn)  { this.#registrar(\'GET\',  path, fn); return this; }\n  post(path, fn) { this.#registrar(\'POST\', path, fn); return this; }\n\n  #matchRota(pattern, path) {\n    const partsP = pattern.split(\'/\');\n    const partsU = path.split(\'/\');\n    if (partsP.length !== partsU.length) return null;\n    const params = {};\n    for (let i = 0; i < partsP.length; i++) {\n      if (partsP[i].startsWith(\':\')) {\n        params[partsP[i].slice(1)] = partsU[i];\n      } else if (partsP[i] !== partsU[i]) {\n        return null;\n      }\n    }\n    return params;\n  }\n\n  request(method, path, body = null) {\n    for (const handler of this.#handlers) {\n      if (handler.method !== method.toUpperCase()) continue;\n      const params = this.#matchRota(handler.path, path);\n      if (params !== null) {\n        return handler.fn({ params, body });\n      }\n    }\n    return { status: 404, body: { erro: \'Rota nao encontrada\' } };\n  }\n}\n\n// Setup\nconst server = new MockServer();\nserver\n  .get(\'/api/usuarios\', () => ({\n    status: 200,\n    body: [{ id: 1, nome: \'Ana\' }, { id: 2, nome: \'Bruno\' }],\n  }))\n  .get(\'/api/usuarios/:id\', ({ params }) => {\n    if (params.id === \'999\') return { status: 404, body: { erro: \'Nao encontrado\' } };\n    return { status: 200, body: { id: Number(params.id), nome: \'Ana\' } };\n  })\n  .post(\'/api/usuarios\', ({ body }) => ({\n    status: 201,\n    body: { id: 3, ...body },\n  }));\n\n// Testes\nconst r1 = server.request(\'GET\', \'/api/usuarios\');\nconsole.log(r1.status, r1.body.length);  // 200 2\n\nconst r2 = server.request(\'GET\', \'/api/usuarios/1\');\nconsole.log(r2.status, r2.body.nome);    // 200 Ana\n\nconst r3 = server.request(\'GET\', \'/api/usuarios/999\');\nconsole.log(r3.status);                  // 404\n\nconst r4 = server.request(\'POST\', \'/api/usuarios\', { nome: \'Carlos\' });\nconsole.log(r4.status, r4.body.nome);    // 201 Carlos\n',
        validate: (output) => output.includes('200 2') && output.includes('200 Ana') && output.includes('404') && output.includes('201 Carlos'),
        validateMessage: 'Exiba: 200 2, 200 Ana, 404, e 201 Carlos.',
      },
      quiz: [
        { question: 'Como o MSW intercepta requisições em testes Node.js?', options: ['Substitui o módulo fetch', 'Intercepta no nível do módulo http/https do Node — transparente para o código', 'Usa um proxy HTTP real', 'Reescreve as URLs'], correct: 1, explanation: 'Em Node.js, MSW usa setupServer() que intercepta no módulo http nativo. Em browser, usa um Service Worker real. Em ambos os casos, o código da aplicação não precisa mudar.' },
        { question: 'Por que server.resetHandlers() é chamado no afterEach?', options: ['Para limpar o servidor entre arquivos de teste', 'Para remover sobrescritas de handlers feitas em testes individuais, restaurando os defaults', 'Para reiniciar o servidor HTTP', 'Para limpar o cache de requisições'], correct: 1, explanation: 'server.use() dentro de um teste adiciona um handler temporário. resetHandlers() no afterEach remove essas sobrescritas, garantindo que cada teste comece com os handlers padrão.' },
        { question: 'Qual a vantagem de MSW sobre vi.mock do fetch?', options: ['MSW é mais rápido', 'MSW é agnóstico da lib HTTP — funciona com fetch, axios, TanStack Query sem alterar os mocks', 'MSW gera mocks automaticamente', 'MSW funciona apenas em browser'], correct: 1, explanation: 'MSW intercepta na rede, não no código. Se você migrar de fetch para axios, os handlers continuam funcionando. Com vi.mock, cada lib HTTP precisaria de um mock diferente.' },
        { question: 'Como simular um erro 500 num teste específico com MSW?', options: ['Lançar um throw no handler padrão', 'Usar server.use() dentro do teste com um handler que retorna status 500', 'Alterar o handler padrão permanentemente', 'Não é possível simular erros com MSW'], correct: 1, explanation: 'server.use() adiciona um handler temporário que tem prioridade sobre os padrões. Depois do teste, resetHandlers() remove a sobrescrita.' },
        { question: 'O que HttpResponse.error() simula?', options: ['Um status 500 do servidor', 'Uma falha de rede — como quando o servidor está inacessível (sem resposta HTTP)', 'Um timeout de requisição', 'Um erro 400 de validação'], correct: 1, explanation: 'HttpResponse.error() simula falha de rede (como ECONNREFUSED), não um erro HTTP. O fetch lança um TypeError em vez de retornar uma Response. Útil para testar comportamento offline.' },
      ],
    },
  }
,{
    id: 'mod-14-6',
    title: 'Storybook: Documentando e Testando Componentes',
    duration: '40 min',
    xp: 185,
    content: {
      sections: [
        { type: 'text', content: 'Storybook e uma ferramenta para desenvolver componentes UI em isolamento — sem precisar da aplicacao inteira rodando. Cada "story" e um estado especifico de um componente: Button com variante primary, com variante disabled, com texto longo. Times com design system usam Storybook como catalogo visual e documentacao viva. Recrutadores que abrem um repositorio com Storybook configurado veem imediatamente que o dev entende componentizacao profissional.' },
        { type: 'code', lang: 'javascript', content: '// ── SETUP (React + Vite) ─────────────────────────────\n// npx storybook@latest init\n// Cria automaticamente: .storybook/main.js, .storybook/preview.js\n// e stories de exemplo\n\n// ── ESTRUTURA DE UMA STORY ────────────────────────────\n// src/components/Button/Button.stories.jsx\nimport Button from \'./Button\';\n\n// Meta: configuracao do componente no Storybook\nexport default {\n  title: \'UI/Button\',        // categoria/nome no sidebar\n  component: Button,\n  parameters: {\n    layout: \'centered\',      // centraliza no canvas\n    docs: {\n      description: {\n        component: \'Botao principal da aplicacao. Use variant para controlar o estilo.\',\n      },\n    },\n  },\n  // ArgTypes define controles interativos no painel\n  argTypes: {\n    variant:  { control: \'select\', options: [\'primary\', \'outline\', \'ghost\', \'destructive\'] },\n    size:     { control: \'select\', options: [\'sm\', \'md\', \'lg\'] },\n    disabled: { control: \'boolean\' },\n    onClick:  { action: \'clicked\' },  // loga no painel Actions\n  },\n};\n\n// Cada export e uma story — um estado especifico do componente\nexport const Primary = {\n  args: { variant: \'primary\', children: \'Salvar alteracoes\' },\n};\n\nexport const Outline = {\n  args: { variant: \'outline\', children: \'Cancelar\' },\n};\n\nexport const Destructive = {\n  args: { variant: \'destructive\', children: \'Deletar conta\' },\n};\n\nexport const Disabled = {\n  args: { variant: \'primary\', children: \'Processando...\', disabled: true },\n};\n\nexport const LongLabel = {\n  args: { variant: \'primary\', children: \'Confirmar e finalizar pedido com entrega expressa\' },\n  parameters: { docs: { description: { story: \'Teste com texto longo para verificar overflow.\' } } },\n};' },
        { type: 'code', lang: 'javascript', content: '// ── STORIES PARA COMPONENTE COMPLEXO (Card com estados) ─\n// src/components/ProductCard/ProductCard.stories.jsx\nimport ProductCard from \'./ProductCard\';\n\nexport default {\n  title: \'Commerce/ProductCard\',\n  component: ProductCard,\n  decorators: [\n    // Decorator: wrapa todas as stories com um contexto\n    (Story) => (\n      <div style={{ maxWidth: 320, padding: 16 }}>\n        <Story />\n      </div>\n    ),\n  ],\n};\n\nexport const Default = {\n  args: {\n    nome: \'Notebook Dell XPS 15\',\n    preco: 4999.90,\n    imagem: \'/placeholder.jpg\',\n    estoque: 5,\n    favorito: false,\n  },\n};\n\nexport const SemEstoque = {\n  args: { ...Default.args, estoque: 0 },\n  name: \'Sem estoque\',  // nome customizado no sidebar\n};\n\nexport const Favoritado = {\n  args: { ...Default.args, favorito: true },\n};\n\nexport const NomeLogoLongo = {\n  args: { ...Default.args, nome: \'Notebook Gamer Alienware m18 R2 Intel Core i9 RTX 4090 64GB\' },\n};\n\n// ── PLAY FUNCTION: testes de interacao no browser ─────\nexport const AdicionarAoCarrinho = {\n  args: Default.args,\n  play: async ({ canvasElement, args }) => {\n    const { within, userEvent, expect } = await import(\'@storybook/test\');\n    const canvas = within(canvasElement);\n    const btn = canvas.getByRole(\'button\', { name: /adicionar ao carrinho/i });\n    await userEvent.click(btn);\n    // Verifica que o callback foi chamado\n    await expect(args.onAddToCart).toHaveBeenCalledOnce();\n  },\n};' },
        { type: 'highlight', content: 'Storybook como documentacao viva: ao inves de um Notion desatualizado, o Storybook e a unica documentacao de componentes que nao fica desatualizada — ela roda o codigo real. Times com design system (Nubank, iFood, grandes SaaS) usam Storybook como a "verdade" sobre como cada componente se comporta em cada estado. npx storybook dev para rodar; npx storybook build para gerar site estatico publicavel.' },
        {
          type: 'common_error',
          title: 'Nao testar estados de erro e loading nos componentes',
          wrong: '// So uma story para o "estado feliz"\nexport const Default = {\n  args: { usuario: { nome: "Ana", avatar: "/foto.jpg" } }\n};\n// O que acontece quando o avatar nao carrega?\n// E quando o nome e muito longo?\n// E quando usuario e null (loading)?',
          wrongLabel: 'Stories so para o happy path nao revelam bugs de estados de borda.',
          right: 'export const Default = { args: { usuario: { nome: "Ana", avatar: "/foto.jpg" } } };\nexport const Loading = { args: { usuario: null } };\nexport const SemAvatar = { args: { usuario: { nome: "Ana", avatar: null } } };\nexport const NomeMuitoLongo = { args: { usuario: { nome: "Ana Carolina Rodrigues Silva Mendonca" } } };\nexport const ErroDeCarregamento = { args: { usuario: undefined, erro: "Falha ao carregar" } };',
          rightLabel: 'Stories para cada estado relevante revelam bugs visuais antes de chegarem em producao.',
          explanation: 'A regra e: para cada prop que pode variar (loading, erro, vazio, texto longo, sem imagem), crie uma story. Storybook roda todos esses estados em paralelo — voce ve instantaneamente se algo quebra visualmente.',
        },
      ],
      exercise: {
        title: 'Implementar um sistema de stories em JavaScript puro',
        description: 'Implemente uma classe StorybookLite que: registra stories com add(name, componentFn, args), roda uma story especifica com run(name), e lista todas as stories com list(). Cada story e uma funcao que recebe args e retorna uma string representando o componente renderizado.',
        solutionHint: 'Guarde stories num Map. add() salva { fn, args }. run() chama fn(args) e retorna resultado. list() retorna Array.from(map.keys()).',
        starterCode: 'class StorybookLite {\n  #stories = new Map();\n\n  add(name, componentFn, args = {}) {\n    this.#stories.set(name, { fn: componentFn, args });\n    return this; // permite encadeamento\n  }\n\n  run(name) {\n    const story = this.#stories.get(name);\n    if (!story) throw new Error(`Story "${name}" nao encontrada`);\n    const result = story.fn(story.args);\n    console.log(`[Story: ${name}]`);\n    console.log(result);\n    return result;\n  }\n\n  runAll() {\n    for (const name of this.#stories.keys()) {\n      this.run(name);\n      console.log(\'---\');\n    }\n  }\n\n  list() {\n    return Array.from(this.#stories.keys());\n  }\n}\n\n// Componente simulado\nfunction Button({ variant = \'primary\', label, disabled = false }) {\n  const estado = disabled ? \'[DISABLED]\' : \'[ACTIVE]\';\n  return `<Button variant="${variant}" ${estado}>${label}</Button>`;\n}\n\n// Registrando stories\nconst sb = new StorybookLite();\nsb\n  .add(\'Primary\',     Button, { variant: \'primary\',     label: \'Salvar\'   })\n  .add(\'Outline\',     Button, { variant: \'outline\',     label: \'Cancelar\'  })\n  .add(\'Destructive\', Button, { variant: \'destructive\', label: \'Deletar\'   })\n  .add(\'Disabled\',    Button, { variant: \'primary\',     label: \'Aguarde...\', disabled: true });\n\n// Listando e rodando\nconsole.log(\'Stories registradas:\', sb.list());\nconsole.log(\'\');\nsb.runAll();\n',
        validate: (output) => output.includes('Stories registradas:') && output.includes('Primary') && output.includes('DISABLED') && output.includes('Story: Destructive'),
        validateMessage: 'Liste as stories, rode todas e mostre [Story: Destructive] e [DISABLED] no output.',
      },
      quiz: [
        { question: 'Para que serve o Storybook?', options: ['Gerenciar o estado global da aplicacao', 'Desenvolver, documentar e testar componentes UI em isolamento, sem precisar da aplicacao inteira', 'Substituir o Jest para testes unitarios', 'Gerar codigo de componentes automaticamente'], correct: 1, explanation: 'Storybook cria um ambiente isolado onde cada componente e desenvolvido e exibido em todos os seus estados possiveis. Funciona como catalogo visual e documentacao viva do design system.' },
        { question: 'O que e uma "story" no Storybook?', options: ['Uma historia sobre como o componente foi criado', 'Um estado especifico de um componente — Primary button, Disabled button, Loading state', 'Um teste automatizado do componente', 'Uma pagina completa da aplicacao'], correct: 1, explanation: 'Cada story representa um estado concreto do componente. Button com variant="primary", Button disabled, Button com texto longo — cada um e uma story separada. Juntos formam o catalogo do componente.' },
        { question: 'Qual a vantagem do Storybook sobre documentacao em Notion/Confluence?', options: ['O Storybook e mais bonito', 'O Storybook roda o codigo real — nunca fica desatualizado. Documentacao em texto fica stale em dias.', 'O Storybook tem IA integrada', 'O Storybook e mais rapido de escrever'], correct: 1, explanation: 'Storybook e documentacao executavel. Quando o componente muda, a story muda junto — e obrigatorio para o codigo funcionar. Documentacao em Notion nao tem essa garantia.' },
        { question: 'O que e uma "play function" no Storybook?', options: ['Uma animacao no canvas do Storybook', 'Codigo que simula interacoes do usuario (clicks, typing) e verifica o resultado — teste de interacao no browser', 'Uma funcao para tocar sons no componente', 'Um modo de apresentacao automatica das stories'], correct: 1, explanation: 'Play functions usam @storybook/test (baseado em Testing Library e Vitest) para simular interacoes reais no browser. Clica no botao, verifica se o modal abre, verifica o texto resultante — tudo visual.' },
        { question: 'Quais estados de um componente devem ter stories?', options: ['Apenas o estado padrao (happy path)', 'Todos os estados relevantes: default, loading, erro, vazio, com texto longo, disabled, com dados reais', 'Apenas os estados que tem bugs conhecidos', 'Um story por prop do componente'], correct: 1, explanation: 'Regra: para cada prop que muda o visual ou comportamento, crie uma story. Loading, erro, vazio, texto longo, sem imagem, disabled — cada um pode revelar um bug visual que so aparece naquele estado especifico.' },
      ],
    },
  }

  ,{
    id: 'mp-phase-14',
    title: '🛠️ Mini-Projeto: Analisador de Requisicoes',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase10,
    content: {
      sections: [{ type: 'text', content: 'Construa algo real aplicando o que aprendeu nesta fase.' }]
    }
  }
  ]
};
