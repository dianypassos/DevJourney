import { miniProjectPhase5 } from '../miniprojects.js';
import { miniProjectPhase4 } from '../miniprojects.js';
export const phase4 = {
  id: 'phase-4',
  title: 'HTML e CSS',
  phase: 4,
  color: '#f54747',
  icon: '🎨',
  description: 'A estrutura e o visual da web. De páginas estáticas a layouts responsivos profissionais.',
  checklist: [
    'Estruturar uma página com tags semânticas (header, nav, main, footer)',
    'Explicar o box model (margin, border, padding, content)',
    'Usar seletores CSS por classe, id e elemento',
    'Criar layouts com Flexbox (centralizar, alinhar em linha/coluna)',
    'Criar grids com CSS Grid (colunas, áreas)',
    'Entender especificidade e cascata do CSS',
    'Fazer uma página responsiva com media queries',
    'Aplicar transições e animações CSS com performance de GPU (transform, opacity)',
  ],
  modules: [
  {
          id: 'mod-4-1',
          title: 'HTML Semântico',
          duration: '35 min',
          xp: 100,
          content: {
            sections: [
              { type: 'text', content: 'HTML é a linguagem de marcação que estrutura o conteúdo da web. Tags semânticas descrevem o significado do conteúdo — não apenas a aparência — o que melhora acessibilidade e SEO.' },
              { type: 'code', lang: 'html', content: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="Descrição da página para SEO">\n  <title>Título da Página | Site</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <header>\n    <nav aria-label="Navegação principal">\n      <a href="/" aria-current="page">Home</a>\n      <a href="/sobre">Sobre</a>\n    </nav>\n  </header>\n  \n  <main>\n    <section aria-labelledby="hero-titulo">\n      <h1 id="hero-titulo">Título Principal</h1>\n      <p>Apenas um h1 por página!</p>\n    </section>\n    \n    <article>\n      <h2>Post do Blog</h2>\n      <time datetime="2024-01-15">15 de Janeiro de 2024</time>\n      <p>Conteúdo independente e reutilizável.</p>\n    </article>\n    \n    <aside aria-label="Conteúdo relacionado">\n      <h2>Artigos Relacionados</h2>\n    </aside>\n  </main>\n  \n  <footer>\n    <address>\n      <a href="mailto:contato@site.com">contato@site.com</a>\n    </address>\n  </footer>\n</body>\n</html>' },
              { type: 'highlight', content: '♿ Acessibilidade não é opcional — é lei em muitos países e melhora UX para todos. Use: alt em imagens, aria-label em botões sem texto, tabindex para navegação por teclado, contraste adequado de cores.' },
              { type: 'code', lang: 'html', content: '<!-- Formulários acessíveis e corretos -->\n<form action="/contato" method="POST" novalidate>\n  <fieldset>\n    <legend>Informações de Contato</legend>\n    \n    <!-- label sempre associado ao input -->\n    <label for="nome">Nome completo *</label>\n    <input \n      type="text" \n      id="nome" \n      name="nome"\n      required \n      autocomplete="name"\n      aria-required="true"\n      placeholder="Ana Silva"\n    >\n    \n    <label for="email">E-mail *</label>\n    <input type="email" id="email" name="email" required>\n    \n    <!-- select com opções -->\n    <label for="assunto">Assunto</label>\n    <select id="assunto" name="assunto">\n      <option value="">Selecione...</option>\n      <option value="duvida">Dúvida</option>\n      <option value="suporte">Suporte</option>\n    </select>\n    \n    <button type="submit">Enviar mensagem</button>\n  </fieldset>\n</form>' },
            ,
                  {
                    type: 'common_error',
                    title: 'Usar <div> para tudo em vez de tags semânticas',
                    wrong: `<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
<div class="main">
  <div class="article">Conteúdo...</div>
</div>`,
                    wrongLabel: '<div> sem semântica é invisível para leitores de tela e SEO.',
                    right: `<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
<main>
  <article>Conteúdo...</article>
</main>`,
                    rightLabel: 'Tags semânticas comunicam significado para browsers e acessibilidade.',
                    explanation: 'Divitis (usar <div> para tudo) prejudica SEO, acessibilidade e manutenção. Use: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>.',
                  }],
            exercise: {
              title: 'Tags HTML semânticas corretas',
              description: 'Complete a função que retorna a tag HTML semântica mais adequada para cada situação. Inclua os sinais de < > na resposta.',
                            solutionHint: 'header/nav/main/footer são as 4 tags de estrutura. article para conteúdo independente, section para agrupamentos temáticos, aside para conteúdo lateral.',
starterCode: `function tagSemantica(situacao) {
      if (situacao === 'título principal da página') return '<h1>';
      if (situacao === 'cabeçalho do site com logo e nav') return ______;
      if (situacao === 'conteúdo principal da página')  return ______;
      if (situacao === 'artigo independente, ex: post')  return ______;
      if (situacao === 'rodapé com links e copyright')   return ______;
      if (situacao === 'menu de navegação principal')    return ______;
      return '<div>';
    }

    const situacoes = [
      'título principal da página',
      'cabeçalho do site com logo e nav',
      'conteúdo principal da página',
      'artigo independente, ex: post',
      'rodapé com links e copyright',
      'menu de navegação principal',
    ];

    situacoes.forEach(s => console.log(\`\${s}: \${tagSemantica(s)}\`));`,
              solutionHint: '<header> | <main> | <article> | <footer> | <nav>',
              validate: (output, code) => {
                  return output.includes('<header>') &&
                  output.includes('<main>') &&
                  output.includes('<nav>') &&
                  code.includes('<header') &&
                  code.includes('<main') &&
                  code.includes('<article') || code.includes('<section') &&
                  !code.includes('<div class="header"') &&
                  !code.includes("<div class='header'");
                },
              validateMessage: 'Use tags semânticas: <header>, <nav>, <main>, <article> ou <section>. Não use <div> para estrutura.'
            },
            quiz: [
              { question: 'Por que usar HTML semântico?', options: ['Torna o site mais rápido', 'Melhora acessibilidade, SEO e legibilidade do código', 'É obrigatório pelo W3C', 'Substitui o CSS'], correct: 1, explanation: 'Semântica ajuda leitores de tela (acessibilidade), motores de busca (SEO) e outros devs a entenderem o propósito de cada elemento.' },
              { question: 'Quantos elementos h1 deve ter uma página?', options: ['Tantos quanto necessário', 'Máximo 2', 'Exatamente 1', 'Nenhum, use h2'], correct: 2, explanation: 'Uma página deve ter apenas 1 h1 — o título principal. É importante para SEO e hierarquia de conteúdo.' },
              { question: 'Qual atributo deve toda imagem ter?', options: ['title', 'alt', 'src apenas', 'width e height'], correct: 1, explanation: 'alt descreve a imagem para leitores de tela e aparece quando a imagem não carrega. Imagens decorativas: alt="".' },
              { question: 'Qual a diferença entre article e section?', options: ['São idênticos', 'article: conteúdo independente; section: agrupa conteúdo relacionado', 'section é mais semântico', 'article é para notícias apenas'], correct: 1, explanation: 'article: faz sentido sozinho (post, produto, comentário). section: agrupa conteúdo tematicamente relacionado dentro de um contexto maior.' },
              { question: 'Para que serve o atributo for no label?', options: ['Criar um loop no HTML', 'Associar o label ao input pelo id', 'Definir estilo', 'Validar o formulário'], correct: 1, explanation: 'for="idDoInput" associa o label ao seu input. Clicar no label foca o input. Essencial para acessibilidade.' },
            ]
          }
        },
  {
          id: 'mod-4-2',
          title: 'CSS: Box Model e Seletores',
          duration: '35 min',
          xp: 100,
          content: {
            sections: [
              { type: 'text', content: 'O CSS controla a apresentação visual. Todo elemento HTML é uma "caixa" — o Box Model. Entender isso é fundamental para não ficar brigando com o CSS.' },
              { type: 'code', lang: 'css', content: '/* ── BOX MODEL ─────────────────────────────── */\n.caixa {\n  /* content: o conteúdo real */\n  width: 200px;\n  height: 100px;\n  \n  /* padding: espaço INTERNO (entre conteúdo e borda) */\n  padding: 16px;            /* todos os lados */\n  padding: 8px 16px;        /* vertical horizontal */\n  padding: 4px 8px 12px 16px; /* top right bottom left */\n  \n  /* border: a borda visível */\n  border: 2px solid #333;\n  border-radius: 8px;       /* arredondamento */\n  \n  /* margin: espaço EXTERNO (entre elementos) */\n  margin: 24px auto;        /* center horizontal! */\n  \n  /* box-sizing: inclui padding/border no width */\n  box-sizing: border-box;   /* SEMPRE use isso */\n}\n\n/* Reset global recomendado */\n*, *::before, *::after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}' },
              { type: 'code', lang: 'css', content: '/* ── SELETORES ─────────────────────────────── */\n/* Básicos */\np { }                   /* tipo */\n.btn { }                /* classe */\n#header { }             /* id (evite para estilo) */\n* { }                   /* universal */\n\n/* Combinadores */\n.nav a { }              /* descendente */\n.nav > a { }            /* filho direto */\n.titulo + p { }         /* adjacente */\n.titulo ~ p { }         /* irmãos seguintes */\n\n/* Pseudo-classes */\na:hover { }             /* ao passar o mouse */\na:focus { }             /* ao focar (teclado) */\n:nth-child(2n) { }      /* pares */\n:first-child { }        /* primeiro filho */\n:not(.ativo) { }        /* negação */\n\n/* Pseudo-elementos */\n.titulo::before { content: "→ "; }  /* insere antes */\n.texto::first-line { }              /* primeira linha */\n\n/* Especificidade (prioridade): id > class > type */\n/* Evite !important — sinal de CSS mal estruturado */\n\n/* Variáveis CSS */\n:root {\n  --cor-primaria: #7c6af7;\n  --fonte-body: "Inter", sans-serif;\n  --radius: 8px;\n}\n.btn { background: var(--cor-primaria); border-radius: var(--radius); }' },
              { type: 'highlight', content: '🎯 box-sizing: border-box é a regra mais importante do CSS moderno. Sem ela, adicionar padding aumenta o tamanho do elemento. Com ela, o tamanho declarado inclui tudo.' },
            ,
                  {
                    type: 'common_error',
                    title: 'Esquecer box-sizing: border-box',
                    wrong: `/* Sem box-sizing — padrão content-box */
.caixa {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
}
/* Largura real: 200 + 40 + 4 = 244px — surpresa! */`,
                    wrongLabel: 'content-box: padding e border são SOMADOS à width definida.',
                    right: `*, *::before, *::after {
  box-sizing: border-box; /* Reset global */
}
.caixa {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
}
/* Largura real: exatamente 200px — previsível! */`,
                    rightLabel: 'border-box: padding e border ficam DENTRO da width definida.',
                    explanation: 'Sempre aplique box-sizing: border-box globalmente no topo do CSS. É o comportamento que faz sentido intuitivo — a largura é a largura, sem surpresas.',
                  }],
            exercise: {
              title: 'Calculando especificidade CSS',
              description: 'Implemente a função que calcula a especificidade de um seletor CSS simples. Retorne o score como número: id=100, classe/atributo/pseudo-class=10, tipo=1.',
                            solutionHint: 'Inline=1000, #id=100, .classe=10, tag=1. Some os pontos de cada seletor. O maior ganha em caso de conflito.',
starterCode: `function calcEspecificidade(seletor) {
      // Conte os componentes do seletor e calcule o score
      // '#id' = 100 | '.classe' = 10 | 'p' = 1 | 'p.classe' = 11
      let score = 0;
  
      // Conte IDs (#)
      const ids = (seletor.match(/#[\\w-]+/g) || []).length;
      score += ids * 100;
  
      // Conte classes, atributos e pseudo-classes (. [ :)
      // Dica: remova pseudo-elementos (::) antes de contar pseudo-classes (:)
      const semPseudoEl = seletor.replace(/::[\\w-]+/g, '');
      const classes = (semPseudoEl.match(/\\.([\\w-]+)|\\[[^\\]]+\\]|:([\\w-]+)/g) || []).length;
      score += classes * 10;
  
      // Conte tipos (letras sem # ou . no início, exceto *)
      const tipos = ______;
      score += tipos;
  
      return score;
    }

    console.log(calcEspecificidade('p'));           // 1
    console.log(calcEspecificidade('.destaque'));   // 10
    console.log(calcEspecificidade('#intro'));      // 100
    console.log(calcEspecificidade('p.destaque'));  // 11
    console.log(calcEspecificidade('#id .classe p')); // 111`,
              solutionHint: '(seletor.match(/(?<![#.\\w])[a-z][\\w-]*/gi) || []).length — match tipos sem # ou . antes',
              validate: (output, code) => {
                  const lines = output.trim().split('\n').map(l => l.trim());
                return lines[0] === '1' && lines[1] === '10' &&
                  lines[2] === '2' &&
                  code.includes('border-box') &&
                  code.includes('box-sizing');
                },
              validateMessage: 'Calcule corretamente e inclua box-sizing: border-box na solução.'
            },
            quiz: [
              { question: 'O que faz box-sizing: border-box?', options: ['Adiciona borda em todos os elementos', 'Inclui padding e border no width/height declarado', 'Remove o padding padrão', 'Cria uma borda invisível'], correct: 1, explanation: 'Sem border-box: width 200px + padding 20px = 240px real. Com border-box: width 200px total (padding está incluído).' },
              { question: 'Como centralizar horizontalmente um bloco com margin?', options: ['margin: 0', 'margin: auto', 'margin: 0 auto', 'text-align: center'], correct: 2, explanation: 'margin: 0 auto (ou margin-left: auto + margin-right: auto) centraliza elementos de bloco que têm width definido.' },
              { question: 'Qual seletor tem maior especificidade?', options: ['.classe', '#id', 'p', 'p.classe'], correct: 1, explanation: 'Especificidade: inline > #id > .classe/atributo/pseudo-class > elemento. #id (0,1,0,0) > .classe (0,0,1,0) > p (0,0,0,1).' },
              { question: 'O que são variáveis CSS (Custom Properties)?', options: ['Variáveis JavaScript no CSS', 'Valores reutilizáveis definidos com -- e usados com var()', 'Propriedades do navegador', 'Animações dinâmicas'], correct: 1, explanation: '--minha-var: valor define a variável. var(--minha-var) a usa. Definidas em :root são globais.' },
              { question: 'O que faz :hover?', options: ['Aplica estilo permanente', 'Aplica estilo quando o mouse está sobre o elemento', 'Aplica ao primeiro filho', 'Aplica ao foco por teclado'], correct: 1, explanation: ':hover é ativado quando o cursor do mouse está sobre o elemento. Não funciona em touch (mobile).' },
            ]
          }
        },
  {
          id: 'mod-4-3',
          title: 'Flexbox e Grid',
          duration: '45 min',
          xp: 120,
          content: {
            sections: [
              { type: 'text', content: 'Flexbox e Grid resolveram o problema histórico de layouts no CSS. Flexbox é para layouts em uma dimensão (linha OU coluna). Grid é para layouts em duas dimensões (linhas E colunas).' },
              { type: 'code', lang: 'css', content: '/* ── FLEXBOX ───────────────────────────────── */\n.container {\n  display: flex;\n  \n  /* eixo principal (horizontal por padrão) */\n  flex-direction: row;          /* row | row-reverse | column | column-reverse */\n  justify-content: space-between; /* start|end|center|space-between|space-around */\n  \n  /* eixo cruzado (perpendicular) */\n  align-items: center;          /* start|end|center|stretch|baseline */\n  \n  /* quebra de linha */\n  flex-wrap: wrap;\n  gap: 16px;                    /* espaço entre itens */\n}\n\n/* Nos filhos */\n.item {\n  flex: 1;                      /* cresce para preencher espaço */\n  flex: 0 0 300px;              /* grow shrink basis — tamanho fixo */\n  align-self: flex-end;         /* override do align-items pai */\n  order: -1;                    /* reordena sem mudar HTML */\n}' },
              { type: 'code', lang: 'css', content: '/* ── CSS GRID ──────────────────────────────── */\n.grid {\n  display: grid;\n  \n  /* Definindo colunas */\n  grid-template-columns: repeat(3, 1fr);     /* 3 colunas iguais */\n  grid-template-columns: 200px 1fr 2fr;      /* mistas */\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* responsivo */\n  \n  /* Definindo linhas */\n  grid-template-rows: auto;  /* altura automática */\n  \n  gap: 24px;                 /* row-gap e column-gap */\n  row-gap: 16px;\n  column-gap: 24px;\n}\n\n/* Posicionamento de itens */\n.destaque {\n  grid-column: 1 / 3;    /* ocupa da coluna 1 até a 3 */\n  grid-column: span 2;   /* ocupa 2 colunas a partir da posição atual */\n  grid-row: 1 / 3;       /* ocupa 2 linhas */\n}\n\n/* Grid areas — layout declarativo */\n.layout {\n  display: grid;\n  grid-template-areas:\n    "header header header"\n    "sidebar main main"\n    "footer footer footer";\n  grid-template-columns: 260px 1fr 1fr;\n}\n.header { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.main { grid-area: main; }\n.footer { grid-area: footer; }' },
              { type: 'code', lang: 'css', content: '/* ── RESPONSIVIDADE ────────────────────────── */\n/* Mobile First: comece pelo mobile, expanda */\n\n.grid {\n  display: grid;\n  grid-template-columns: 1fr;     /* mobile: 1 coluna */\n  gap: 16px;\n}\n\n@media (min-width: 640px) {       /* tablet */\n  .grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n@media (min-width: 1024px) {      /* desktop */\n  .grid {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 24px;\n  }\n}\n\n/* Unidades responsivas úteis */\n/* vw/vh = porcentagem da viewport */\n/* clamp(min, ideal, max) — tamanho fluido */\nh1 {\n  font-size: clamp(1.5rem, 4vw, 3rem); /* nunca menor que 1.5rem, nunca maior que 3rem */\n}' },
              { type: 'highlight', content: '📱 Mobile First é o padrão atual. Projete primeiro para telas pequenas, depois expanda com min-width media queries. Isso resulta em CSS mais limpo e performance melhor em mobile.' },
            ,
                  {
                    type: 'common_error',
                    title: 'Aplicar flex no elemento filho em vez do pai',
                    wrong: `/* Tentando centralizar .filho */
.filho {
  display: flex;
  justify-content: center; /* Não funciona! */
  align-items: center;
}`,
                    wrongLabel: 'Flex/grid são propriedades do CONTAINER, não do filho.',
                    right: `/* Container controla o layout dos filhos */
.pai {
  display: flex;
  justify-content: center; /* Centraliza filhos */
  align-items: center;
  height: 100vh;
}`,
                    rightLabel: 'display: flex no pai — ele controla o posicionamento dos filhos.',
                    explanation: 'O erro mais comum com Flexbox: aplicar display: flex no filho querendo se posicionar. O pai é quem define o layout. O filho usa align-self ou flex para se ajustar dentro do pai.',
                  }],
            exercise: {
              title: 'Layout de cards responsivo',
              description: 'Escreva o CSS para um grid de cards que: em mobile mostra 1 card por linha, em tablet 2, em desktop 3. Cada card deve ter padding interno, border-radius e uma sombra suave.',
                            solutionHint: 'Use display: flex e flex-wrap: wrap no container. Para responsividade: media queries com max-width. Para gap entre cards: use a propriedade gap.',
starterCode: '/* CSS para grid de cards responsivo */\n\n/* Reset básico */\n* { box-sizing: border-box; margin: 0; padding: 0; }\n\n/* Container do grid */\n.cards-grid {\n  /* Mobile first: 1 coluna */\n  \n}\n\n/* Tablet: 2 colunas */\n@media (min-width: 640px) {\n  .cards-grid {\n    \n  }\n}\n\n/* Desktop: 3 colunas */\n@media (min-width: 1024px) {\n  .cards-grid {\n    \n  }\n}\n\n/* Estilo do card individual */\n.card {\n  /* padding, border-radius, sombra */\n  \n}\n\nconsole.log("CSS escrito!");\n',
              solutionHint: 'grid-template-columns: 1fr → repeat(2, 1fr) → repeat(3, 1fr) | box-shadow: 0 2px 8px rgba(0,0,0,.1)',
              validate: (output, code) => {
                  return (
              output.includes('320px → xs') &&
              output.includes('768px → md') &&
              output.includes('1280px → xl') &&
              (code.includes('flex') || code.includes('grid')) &&
              (code.includes('breakpoint') || code.includes('media') || code.includes('width')));
              },
              validateMessage: 'Use flex ou grid no layout e implemente os breakpoints corretamente.',
            },
          quiz: [
              { question: 'O que faz gap no Flexbox/Grid?', options: ['Cria margin nos filhos', 'Define o espaço entre os itens do container', 'Adiciona padding interno', 'Cria border entre itens'], correct: 1, explanation: 'gap (antes: grid-gap) define o espaço entre itens. Substitui margin nos filhos — muito mais limpo.' },
              { question: 'O que é Mobile First?', options: ['Criar apps mobile nativas', 'Projetar primeiro para mobile e expandir com media queries', 'Testar apenas em mobile', 'Usar apenas vw/vh'], correct: 1, explanation: 'Mobile First começa com CSS base para mobile, depois adiciona @media (min-width) para telas maiores. Melhor performance e prioridade.' },
              { question: 'O que faz align-items: center no Flexbox?', options: ['Centraliza o texto', 'Centraliza itens no eixo cruzado (vertical quando flex-direction: row)', 'Centraliza no eixo principal', 'Centraliza a caixa na tela'], correct: 1, explanation: 'align-items controla o eixo cruzado (perpendicular ao flex-direction). Com row: centraliza verticalmente.' },
          ]
          }
  },
  {
      id: 'mod-4-4',
      title: 'CSS Responsivo e Media Queries',
      duration: '40 min',
      xp: 120,
      content: {
        sections: [
          {
            type: 'text',
            content:
              'Responsividade é fazer o layout funcionar bem em qualquer tamanho de tela — do celular à TV. Em 2024, mais de 60% do tráfego web é mobile. Mobile-first é a abordagem moderna: você começa pelo menor tamanho e expande para telas maiores.',
          },
          {
            type: 'code',
            lang: 'css',
            content:
              '/* ── MEDIA QUERIES ──────────────────────────────\n   Sintaxe: @media (condição) { regras CSS }\n   A regra só se aplica quando a condição é verdadeira */\n\n/* Mobile-first: estilos base são para mobile */\n.container {\n  width: 100%;         /* mobile: largura total */\n  padding: 0 16px;\n  font-size: 14px;\n}\n\n/* Tablet: aplica a partir de 768px */\n@media (min-width: 768px) {\n  .container {\n    max-width: 720px;\n    margin: 0 auto;\n    font-size: 16px;\n  }\n}\n\n/* Desktop: aplica a partir de 1024px */\n@media (min-width: 1024px) {\n  .container {\n    max-width: 960px;\n    padding: 0 24px;\n  }\n}\n\n/* Large desktop */\n@media (min-width: 1280px) {\n  .container { max-width: 1200px; }\n}\n\n/* ── BREAKPOINTS COMUNS ─────────────────────────\n   sm:  640px  — celular grande\n   md:  768px  — tablet\n   lg:  1024px — laptop\n   xl:  1280px — desktop\n   2xl: 1536px — tela grande\n   (estes são os breakpoints do Tailwind CSS) */',
          },
          {
            type: 'code',
            lang: 'css',
            content:
              '/* ── GRID RESPONSIVO ──────────────────────────\n   Sem media query — CSS Grid se adapta sozinho */\n.galeria {\n  display: grid;\n  /* auto-fit: cria quantas colunas couberem\n     minmax(min, max): mínimo 250px, máximo 1fr */\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 24px;\n}\n/* Em 320px: 1 coluna | 768px: 2-3 col | 1200px: 4+ col */\n\n/* ── FLEXBOX RESPONSIVO ─────────────────────────\n   flex-wrap permite quebrar linha em telas pequenas */\n.cards {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.card {\n  flex: 1 1 300px; /* cresce, encolhe, base 300px */\n  /* Em tela pequena: 1 por linha\n     Em tela grande: vários por linha */\n}\n\n/* ── TIPOGRAFIA FLUIDA ───────────────────────────\n   clamp(min, ideal, max) — tamanho entre min e max */\nh1 {\n  font-size: clamp(1.5rem, 4vw, 3rem);\n  /* min: 24px | ideal: 4% da viewport | max: 48px */\n}\n\n.hero-text {\n  font-size: clamp(14px, 2.5vw, 20px);\n}\n\n/* ── IMAGENS RESPONSIVAS ────────────────────────*/\nimg {\n  max-width: 100%;  /* nunca ultrapassa o container */\n  height: auto;     /* mantém proporção */\n  display: block;   /* remove espaço inferior */\n}',
          },
          {
            type: 'code',
            lang: 'css',
            content:
              '/* ── PADRÕES PRÁTICOS ──────────────────────────*/\n\n/* Stack → Row: vertical no mobile, horizontal no desktop */\n.nav {\n  display: flex;\n  flex-direction: column; /* mobile: vertical */\n  gap: 8px;\n}\n\n@media (min-width: 768px) {\n  .nav {\n    flex-direction: row;  /* tablet+: horizontal */\n    align-items: center;\n  }\n}\n\n/* Mostrar/ocultar por breakpoint */\n.apenas-mobile {\n  display: block;\n}\n.apenas-desktop {\n  display: none;\n}\n\n@media (min-width: 768px) {\n  .apenas-mobile  { display: none; }\n  .apenas-desktop { display: block; }\n}\n\n/* ── VARIÁVEIS RESPONSIVAS ──────────────────────*/\n:root {\n  --espacamento: 16px;\n  --colunas: 1;\n}\n\n@media (min-width: 768px) {\n  :root {\n    --espacamento: 24px;\n    --colunas: 2;\n  }\n}\n\n@media (min-width: 1024px) {\n  :root {\n    --espacamento: 32px;\n    --colunas: 3;\n  }\n}\n\n.grid {\n  display: grid;\n  grid-template-columns: repeat(var(--colunas), 1fr);\n  gap: var(--espacamento);\n}',
          },
          {
            type: 'highlight',
            content:
              '📱 Sempre adicione <meta name="viewport" content="width=device-width, initial-scale=1.0"> no <head>. Sem isso, o navegador mobile simula uma tela de 980px e seu layout responsivo não funciona.',
          },
        ],
        exercise: {
          title: 'Calculadora de breakpoint',
          description:
            'Crie uma função getBreakpoint(largura) que retorna o nome do breakpoint CSS correspondente: "xs" (<640), "sm" (640-767), "md" (768-1023), "lg" (1024-1279), "xl" (1280-1535), "2xl" (>=1536). Teste com 5 larguras diferentes.',
          starterCode:
            'function getBreakpoint(largura) {\n  // Retorne: "xs", "sm", "md", "lg", "xl" ou "2xl"\n  // Baseado nos breakpoints do Tailwind CSS\n}\n\n// Testes\nconst telas = [320, 640, 768, 1024, 1280, 1536, 1920];\ntelas.forEach(w => {\n  console.log(`${w}px → ${getBreakpoint(w)}`);\n});\n',
          solutionHint: 'Use if/else com os valores: 640, 768, 1024, 1280, 1536',
          validate: (output, code) => {
            return (
              output.includes('320px → xs') &&
              output.includes('768px → md') &&
              output.includes('1280px → xl')
            );
          },
          validateMessage: 'Mapeie corretamente: 320→xs, 768→md, 1280→xl.',
        },
        quiz: [
          {
            question: 'O que significa "mobile-first" no CSS?',
            options: [
              'Criar versão mobile depois do desktop',
              'Escrever estilos base para mobile e usar min-width para expandir',
              'Usar apenas pixels como unidade',
              'Desativar estilos no desktop',
            ],
            correct: 1,
            explanation:
              'Mobile-first: estilos padrão são para mobile (menor tela). Media queries com min-width adicionam estilos progressivamente para telas maiores. O contrário (desktop-first) usa max-width.',
          },
          {
            question: 'O que faz grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))?',
            options: [
              'Cria exatamente 4 colunas',
              'Cria automaticamente o máximo de colunas com mínimo de 250px que couberem',
              'Cria colunas de tamanho fixo',
              'Apenas funciona com 2 colunas',
            ],
            correct: 1,
            explanation:
              'auto-fit preenche o espaço disponível. minmax(250px, 1fr) define min 250px, max proporcional. O grid cria quantas colunas couberem — layout responsivo sem media query.',
          },
          {
            question: 'Para que serve a função clamp() no CSS?',
            options: [
              'Travar a posição de elementos',
              'Definir valor entre mínimo e máximo com valor ideal',
              'Limitar overflow',
              'Clampar border-radius',
            ],
            correct: 1,
            explanation:
              'clamp(min, ideal, max) retorna o ideal quando possível, min quando menor, max quando maior. Ideal para tipografia fluida: clamp(14px, 2vw, 20px).',
          },
          {
            question: 'Sem a meta viewport, o que ocorre em celulares?',
            options: [
              'Nada, funciona normalmente',
              'O navegador simula tela de ~980px e o layout parece "pequeno demais"',
              'Media queries param de funcionar completamente',
              'O CSS é ignorado',
            ],
            correct: 1,
            explanation:
              'Sem viewport meta, o navegador mobile assume 980px de largura e diminui o zoom para caber. A página parece pequena e as media queries mobile não disparam.',
          },
          {
            question: 'Qual a diferença entre min-width e max-width em media queries?',
            options: [
              'São equivalentes',
              'min-width: aplica a partir desse tamanho (mobile-first); max-width: aplica até esse tamanho (desktop-first)',
              'max-width é mais moderno',
              'min-width só funciona com px',
            ],
            correct: 1,
            explanation:
              'min-width: estilos aplicam quando tela é MAIOR que o valor (mobile-first). max-width: estilos aplicam quando tela é MENOR (desktop-first). Prefira min-width.',
          },
        ],
      },
    },
  {
      id: 'mod-4-5',
      title: 'CSS Custom Properties e Temas',
      duration: '30 min',
      xp: 100,
      content: {
        sections: [
          {
            type: 'text',
            content:
              'CSS Custom Properties (variáveis CSS) são valores reutilizáveis definidos no CSS que podem ser alterados em tempo de execução — diferente de variáveis Sass que compilam estaticamente. São a base de sistemas de design e temas dinâmicos (dark mode).',
          },
          {
            type: 'code',
            lang: 'css',
            content:
              '/* ── DEFININDO VARIÁVEIS ────────────────────────\n   :root = seletor do elemento raiz (html)\n   Variáveis definidas aqui são globais */\n:root {\n  /* Cores */\n  --cor-primaria: #6366f1;\n  --cor-primaria-hover: #4f46e5;\n  --cor-texto: #1f2937;\n  --cor-fundo: #ffffff;\n  --cor-borda: #e5e7eb;\n  \n  /* Tipografia */\n  --fonte-base: "Inter", -apple-system, sans-serif;\n  --tamanho-base: 16px;\n  --linha-base: 1.5;\n  \n  /* Espaçamentos — escala 4px */\n  --espaco-1: 4px;\n  --espaco-2: 8px;\n  --espaco-3: 12px;\n  --espaco-4: 16px;\n  --espaco-6: 24px;\n  --espaco-8: 32px;\n  \n  /* Bordas */\n  --raio-sm: 4px;\n  --raio-md: 8px;\n  --raio-lg: 16px;\n  --raio-full: 9999px;\n  \n  /* Sombras */\n  --sombra-sm: 0 1px 3px rgba(0,0,0,0.12);\n  --sombra-md: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);\n  \n  /* Transições */\n  --transicao: 150ms ease;\n}\n\n/* Usando as variáveis */\n.botao {\n  background: var(--cor-primaria);\n  color: white;\n  padding: var(--espaco-2) var(--espaco-4);\n  border-radius: var(--raio-md);\n  font-family: var(--fonte-base);\n  transition: background var(--transicao);\n  box-shadow: var(--sombra-sm);\n}\n\n.botao:hover {\n  background: var(--cor-primaria-hover);\n}',
          },
          {
            type: 'code',
            lang: 'css',
            content:
              '/* ── DARK MODE COM CUSTOM PROPERTIES ───────────\n   Abordagem 1: usando prefers-color-scheme */\n:root {\n  --bg: #ffffff;\n  --bg-secundario: #f9fafb;\n  --texto: #111827;\n  --texto-secundario: #6b7280;\n  --borda: #e5e7eb;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --bg: #0f172a;\n    --bg-secundario: #1e293b;\n    --texto: #f1f5f9;\n    --texto-secundario: #94a3b8;\n    --borda: #334155;\n  }\n}\n\n/* Abordagem 2: usando atributo data-theme (toggle manual) */\n[data-theme="dark"] {\n  --bg: #0f172a;\n  --texto: #f1f5f9;\n  --borda: #334155;\n}\n\n/* Todos os componentes usam variáveis — mudam automaticamente! */\nbody {\n  background: var(--bg);\n  color: var(--texto);\n}\n\n.card {\n  background: var(--bg-secundario);\n  border: 1px solid var(--borda);\n  border-radius: var(--raio-md);\n  padding: var(--espaco-4);\n}\n\n/* JavaScript para toggle */\n// document.documentElement.setAttribute("data-theme", "dark");\n// document.documentElement.removeAttribute("data-theme");',
          },
          {
            type: 'highlight',
            content:
              '🎨 Design tokens são o conceito por trás das custom properties: nomes semânticos (--cor-perigo) em vez de valores literais (#ef4444). Trocar o tema inteiro de uma app vira apenas sobrescrever as variáveis no :root — sem tocar nos componentes.',
          },
        ],
        exercise: {
          title: 'Sistema de tokens CSS',
          description:
            'Crie uma função JS que gera uma string CSS com custom properties a partir de um objeto de tokens. Dado o objeto { cores: { primaria: "#6366f1", texto: "#111" }, espacamentos: { sm: "8px", md: "16px" } }, gere as variáveis --cor-primaria, --cor-texto, --espacamento-sm, --espacamento-md dentro de :root {}.',
                    solutionHint: 'Defina variáveis em :root { --cor-primaria: #value; }. Use com var(--cor-primaria). Para temas: sobrescreva as variáveis no seletor [data-theme="dark"].',
starterCode:
            'function gerarTokensCSS(tokens) {\n  let css = ":root {\\n";\n  \n  // Para cada categoria (cores, espacamentos...)\n  // Para cada chave dentro da categoria:\n  // Gere: "  --{categoria-sem-s}-{chave}: {valor};\\n"\n  // Ex: cores.primaria → "--cor-primaria"\n  // Ex: espacamentos.sm → "--espacamento-sm"\n  \n  css += "}";\n  return css;\n}\n\nconst tokens = {\n  cores: {\n    primaria: "#6366f1",\n    texto: "#111827",\n    fundo: "#ffffff"\n  },\n  espacamentos: {\n    sm: "8px",\n    md: "16px",\n    lg: "32px"\n  }\n};\n\nconst css = gerarTokensCSS(tokens);\nconsole.log(css);\n',
          solutionHint:
            'Use Object.entries(tokens) e Object.entries(valores). Categoria: remova o "s" final ou mapeie manualmente.',
          validate: (output, code) => {
            return (
              output.includes('--cor-primaria') &&
              output.includes('--espacamento-sm') &&
              output.includes('#6366f1') &&
              output.includes(':root')
            );
          },
          validateMessage: 'Gere --cor-primaria e --espacamento-sm dentro de :root {}.',
        },
        quiz: [
          {
            question: 'Qual a diferença entre variáveis CSS e variáveis Sass/SCSS?',
            options: [
              'São idênticas',
              'CSS custom properties existem em runtime e podem ser alteradas por JS; Sass compila estaticamente',
              'Sass é mais poderoso',
              'CSS custom properties só funcionam em Chrome',
            ],
            correct: 1,
            explanation:
              'CSS custom props (--var) são resolvidas pelo browser em runtime — você pode lê-las e alterá-las com JS. Sass $var é apenas um atalho de escrita que desaparece na compilação.',
          },
          {
            question: 'O que faz var(--cor, #000)?',
            options: [
              'Define --cor como #000',
              'Usa --cor, mas se não estiver definida usa #000 como fallback',
              'Converte --cor para hexadecimal',
              'Declara variável local',
            ],
            correct: 1,
            explanation:
              'var(--nome, fallback) usa o fallback se a variável não existir ou for invalid. Muito útil para compatibilidade e valores padrão.',
          },
          {
            question: 'Como detectar preferência de dark mode do sistema no CSS?',
            options: [
              '@media (dark-mode: true)',
              '@media (prefers-color-scheme: dark)',
              ':root[dark]',
              '.dark-mode class',
            ],
            correct: 1,
            explanation:
              '@media (prefers-color-scheme: dark) detecta o tema do sistema operacional. Em JS: window.matchMedia("(prefers-color-scheme: dark)").matches',
          },
          {
            question: 'Por que usar nomes semânticos como --cor-perigo em vez de --vermelho?',
            options: [
              'É apenas convenção',
              'Se mudar o design, --cor-perigo pode virar laranja sem quebrar o significado',
              'Nomes semânticos são mais rápidos',
              'CSS não aceita nomes de cores',
            ],
            correct: 1,
            explanation:
              'Tokens semânticos descrevem o propósito, não o valor. --cor-perigo pode ser vermelho hoje e laranja amanhã — os componentes que a usam não precisam mudar.',
          },
          {
            question: 'Onde definir custom properties para serem globais?',
            options: ['No body', 'No html', 'No :root', 'Em qualquer seletor'],
            correct: 2,
            explanation:
              ':root é o pseudo-seletor do elemento raiz (geralmente html) com maior especificidade. Custom properties herdam em cascata — definir em :root as torna acessíveis em qualquer elemento.',
          },
        ],
      },
    }  ,{
    id: 'mod-4-5b',
    title: 'Tailwind CSS: Utility-First na Prática',
    duration: '40 min',
    xp: 110,
    content: {
      sections: [
        { type: 'text', content: 'Tailwind CSS é o framework CSS mais adotado em 2024 — presente em mais de 60% das vagas React e Next.js no Brasil. A ideia é utility-first: em vez de classes semânticas (.btn, .card), você compõe o design com classes atômicas (p-4, flex, bg-blue-500). Parece verboso no início, mas elimina completamente o problema de naming e conflito de CSS em componentes.' },
        { type: 'code', lang: 'html', content: '<!-- ── COMPARAÇÃO: CSS tradicional vs Tailwind ──────────\n\n<!-- ❌ CSS tradicional: cria um arquivo .css, define classes, gerencia conflitos -->\n<!-- .card { padding: 1rem; border-radius: 0.5rem; background: #fff; } -->\n<div class="card">Conteúdo</div>\n\n<!-- ✅ Tailwind: o CSS está inline, sem arquivo separado, sem naming -->\n<div class="p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">\n  Conteúdo\n</div>\n\n<!-- ── ANATOMIA DAS CLASSES ──────────────────────────────\n   Espaçamento:  p-{n} m-{n} (1=4px, 2=8px, 4=16px, 8=32px)\n   Cores:        bg-{color}-{shade} text-{color}-{shade}\n   Tipografia:   text-{sm|base|lg|xl|2xl} font-{normal|medium|bold}\n   Layout:       flex grid items-{center|start} justify-{between|center}\n   Responsivo:   sm:flex md:hidden lg:text-xl (mobile-first)\n   Estado:       hover:bg-blue-600 focus:ring-2 active:scale-95\n   Dark mode:    dark:bg-gray-900 dark:text-white -->\n\n<!-- Exemplo real: botão -->\n<button class="\n  px-4 py-2\n  bg-violet-600 hover:bg-violet-700\n  text-white font-medium\n  rounded-lg\n  transition-colors duration-200\n  focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2\n  disabled:opacity-50 disabled:cursor-not-allowed\n">\n  Salvar alterações\n</button>' },
        { type: 'code', lang: 'javascript', content: '// ── TAILWIND COM REACT: o padrão do mercado ──────────\n// Setup: npx create-next-app@latest (já inclui Tailwind)\n// ou: npm install -D tailwindcss postcss autoprefixer\n\n// Componente React com Tailwind\nfunction Card({ titulo, descricao, tag, urgente }) {\n  return (\n    <div className="\n      p-6 rounded-2xl bg-gray-900 border border-gray-800\n      hover:border-violet-500 transition-colors duration-200\n      flex flex-col gap-3\n    ">\n      <div className="flex items-center justify-between">\n        <span className={`\n          px-2 py-0.5 rounded-full text-xs font-medium\n          ${urgente\n            ? \'bg-red-500/20 text-red-400\'\n            : \'bg-violet-500/20 text-violet-400\'\n          }\n        `}>\n          {tag}\n        </span>\n      </div>\n      <h3 className="text-lg font-semibold text-white">{titulo}</h3>\n      <p className="text-gray-400 text-sm leading-relaxed">{descricao}</p>\n    </div>\n  );\n}\n\n// ── cn() — helper para classes condicionais (padrão mercado) ─\n// npm install clsx tailwind-merge\nimport { clsx } from \'clsx\';\nimport { twMerge } from \'tailwind-merge\';\n\nfunction cn(...classes) { return twMerge(clsx(classes)); }\n\n// Uso:\n<div className={cn(\n  \'px-4 py-2 rounded\', // base\n  isActive && \'bg-violet-600\', // condicional\n  className, // override externo\n)} />' },
        { type: 'highlight', content: '⚡ Tailwind não gera CSS em runtime — usa PurgeCSS no build para incluir apenas as classes que você usa. O CSS final de produção tem 5-15kb. Em desenvolvimento, usa JIT (Just-In-Time) que gera classes sob demanda. Isso é muito mais eficiente que CSS Modules ou styled-components em termos de tamanho de bundle.' },
        {
          type: 'common_error',
          title: 'Concatenar classes Tailwind com template strings — classes conflitantes não se sobrescrevem',
          wrong: '// ❌ Se "className" passar "p-8", o p-4 base conflita\n// Tailwind não tem cascata — ambas ficam no HTML, a ordem no CSS decide\nfunction Botao({ className }) {\n  return <button className={\'p-4 bg-blue-600 \' + className}>...</button>;\n}\n<Botao className="p-8" /> // p-4 e p-8 ambos presentes!',
          wrongLabel: 'String concatenation não resolve conflitos de classes Tailwind — duas classes de padding ficam no elemento.',
          right: '// ✅ tailwind-merge resolve conflitos automaticamente\nimport { twMerge } from \'tailwind-merge\';\nfunction Botao({ className }) {\n  return <button className={twMerge(\'p-4 bg-blue-600\', className)}>...</button>;\n}\n<Botao className="p-8" /> // apenas p-8 fica',
          rightLabel: 'tailwind-merge detecta classes conflitantes e mantém apenas a última (a mais específica).',
          explanation: 'Classes Tailwind são geradas de forma independente no CSS. Se p-4 e p-8 coexistem, o browser aplica a que aparece por último no arquivo CSS gerado — imprevisível. tailwind-merge resolve isso antes de chegar ao HTML.',
        },
      ],
      exercise: {
        title: 'Construir um sistema de classes utilitárias',
        description: 'Implemente uma versão simplificada do Tailwind em JS: uma função tw() que recebe tokens (ex: "p-4", "text-lg", "bg-blue-500") e retorna um objeto de estilos CSS equivalentes. Mapeie: p-{1-8}→padding, m-{1-8}→margin, text-{sm,base,lg,xl}→fontSize, font-{normal,medium,bold}→fontWeight.',
        solutionHint: 'Divida cada classe por "-". p-4: propriedade=padding, valor=4*4px=16px. text-lg: fontSize=1.125rem. Retorne um objeto { padding: "16px", fontSize: "1.125rem" }.',
        starterCode: 'const SPACING = { 1: \'4px\', 2: \'8px\', 3: \'12px\', 4: \'16px\', 6: \'24px\', 8: \'32px\' };\nconst FONT_SIZE = { sm: \'0.875rem\', base: \'1rem\', lg: \'1.125rem\', xl: \'1.25rem\', \'2xl\': \'1.5rem\' };\nconst FONT_WEIGHT = { normal: 400, medium: 500, bold: 700 };\nconst COLORS = { blue: \'#3b82f6\', red: \'#ef4444\', green: \'#22c55e\', gray: \'#6b7280\', violet: \'#7c3aed\' };\n\nfunction tw(...tokens) {\n  const styles = {};\n  for (const token of tokens) {\n    if (!token) continue;\n    const parts = token.split(\'-\');\n    const [prefix, value, shade] = parts;\n    \n    if (prefix === \'p\')  styles.padding = SPACING[value] || value + \'px\';\n    if (prefix === \'m\')  styles.margin  = SPACING[value] || value + \'px\';\n    if (prefix === \'px\') { styles.paddingLeft = styles.paddingRight = SPACING[value]; }\n    if (prefix === \'py\') { styles.paddingTop  = styles.paddingBottom = SPACING[value]; }\n    if (prefix === \'text\' && FONT_SIZE[value]) styles.fontSize = FONT_SIZE[value];\n    if (prefix === \'font\') styles.fontWeight = FONT_WEIGHT[value];\n    if (prefix === \'bg\' && COLORS[value]) styles.backgroundColor = COLORS[value];\n    if (prefix === \'text\' && COLORS[value]) styles.color = COLORS[value];\n    if (prefix === \'rounded\') styles.borderRadius = value === \'lg\' ? \'8px\' : value === \'full\' ? \'9999px\' : \'4px\';\n    if (prefix === \'flex\') styles.display = \'flex\';\n    if (prefix === \'hidden\') styles.display = \'none\';\n  }\n  return styles;\n}\n\n// Testes\nconsole.log(JSON.stringify(tw(\'p-4\', \'text-lg\', \'font-bold\')));\nconsole.log(JSON.stringify(tw(\'bg-blue\', \'text-white\', \'rounded-lg\', \'px-4\')));\nconsole.log(JSON.stringify(tw(\'flex\', \'m-2\')));\n',
        validate: (output) => output.includes('"padding"') && output.includes('"fontSize"') && output.includes('"fontWeight"'),
        validateMessage: 'Exiba estilos com padding, fontSize e fontWeight nos objetos retornados.',
      },
      quiz: [
        { question: 'O que significa "utility-first" no Tailwind?', options: ['CSS utilitário para design systems', 'Compor estilos com classes atômicas de propósito único em vez de classes semânticas', 'Tailwind é mais rápido que CSS normal', 'Primeiro você escreve utilitários, depois componentes'], correct: 1, explanation: 'Utility-first: cada classe faz uma coisa só (p-4 = padding 16px, text-lg = font-size 1.125rem). A aparência é composta pela combinação de utilitários, não por classes de componente (.card, .btn).' },
        { question: 'O que o prefixo "sm:" faz em "sm:flex"?', options: ['Torna o elemento pequeno', 'Aplica display:flex apenas em telas >= 640px (mobile-first)', 'Remove em telas pequenas', 'É uma abreviação de "small font"'], correct: 1, explanation: 'Tailwind é mobile-first: sm: = >= 640px, md: = >= 768px, lg: = >= 1024px. sm:flex significa: em mobile = sem flex (regra padrão), em tablet+ = flex. O oposto do desktop-first.' },
        { question: 'Por que usar tailwind-merge?', options: ['Para instalar Tailwind mais rápido', 'Para resolver conflitos quando classes Tailwind da mesma propriedade coexistem no elemento', 'Para compilar Tailwind no browser', 'Para adicionar suporte a dark mode'], correct: 1, explanation: 'Se p-4 e p-8 ficam no mesmo elemento, o browser aplica o que vier por último no CSS compilado — imprevisível. twMerge detecta conflitos (ambos são padding) e mantém apenas o último passado.' },
        { question: 'Como o Tailwind garante bundle pequeno em produção?', options: ['Comprime as classes com gzip', 'Usa PurgeCSS/JIT para incluir apenas as classes que aparecem no código-fonte', 'Usa CSS variables internamente', 'Carrega classes sob demanda no browser'], correct: 1, explanation: 'Tailwind analisa seus arquivos HTML/JSX em build time e gera apenas o CSS das classes que você realmente usa. Em produção, o CSS costuma ter 5-15kb comprimido, independente do total de utilitários disponíveis.' },
        { question: 'Qual a forma correta de condicionais com Tailwind em React?', options: ['CSS ternário inline', 'Template literals simples', 'clsx + twMerge (biblioteca cn()) para composição segura de classes', 'Não é possível usar condicionais'], correct: 2, explanation: 'cn(classes, condicional && classe, override) é o padrão: clsx lida com condicionais/arrays, twMerge resolve conflitos. Simples concatenação string não resolve conflitos e fica difícil de ler com muitos condicionais.' },
      ],
    },
  }
  ,{
    id: 'mod-4-6',
    title: 'CSS Animations, Transitions e Transformações',
    duration: '40 min',
    xp: 115,
    content: {
      sections: [
        { type: 'text', content: 'Transições e animações são a diferença entre uma interface que parece morta e uma que parece viva. Com CSS puro você consegue 90% dos efeitos que os usuários esperam — sem JavaScript, sem bibliotecas, com performance de GPU.' },
        { type: 'code', lang: 'css', content: '/* ── TRANSITIONS: mudança suave entre estados ────────────\n   Sintaxe: transition: propriedade duração easing delay; */\n\n.botao {\n  background: #7c6af7;\n  transform: scale(1);\n  box-shadow: 0 2px 8px rgba(0,0,0,0.15);\n  /* Anima 3 propriedades com timings diferentes */\n  transition:\n    background 0.2s ease,\n    transform  0.15s ease,\n    box-shadow 0.2s ease;\n}\n\n.botao:hover {\n  background: #6354d4;\n  transform: scale(1.04);\n  box-shadow: 0 6px 20px rgba(124,106,247,0.4);\n}\n\n.botao:active {\n  transform: scale(0.97); /* feedback de clique */\n}\n\n/* ── EASINGS mais usados ──────────────────────────────────\n   ease          → devagar-rápido-devagar (padrão)\n   ease-in       → começa devagar (saída)\n   ease-out      → termina devagar (entrada - mais natural)\n   ease-in-out   → devagar nos dois extremos\n   linear        → velocidade constante (rodas, loaders)\n   cubic-bezier  → controle total: cubic-bezier(0.34,1.56,0.64,1) = bounce */\n\n/* Regra: use ease-out para coisas que entram na tela,\n          ease-in para coisas que saem,\n          ease para interações de hover. */' },
        { type: 'code', lang: 'css', content: '/* ── @KEYFRAMES: animações com múltiplos estados ─────────\n   Define o que acontece em cada % da animação */\n\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(12px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n\n@keyframes pulse {\n  0%, 100% { transform: scale(1);    opacity: 1; }\n  50%       { transform: scale(1.08); opacity: 0.8; }\n}\n\n@keyframes shimmer {\n  from { background-position: -200% 0; }\n  to   { background-position:  200% 0; }\n}\n\n/* ── Aplicando as animações ───────────────────────────────\n   animation: nome duração easing delay repetições direção fill-mode; */\n\n.card-entrada {\n  animation: fadeIn 0.4s ease-out both;\n  /* both = mantém o estado final após terminar */\n}\n\n.loader {\n  animation: spin 0.8s linear infinite;\n}\n\n.badge-novo {\n  animation: pulse 1.5s ease-in-out infinite;\n}\n\n/* Skeleton loading — simula conteúdo carregando */\n.skeleton {\n  background: linear-gradient(90deg, #1a1a26 25%, #2a2a3e 50%, #1a1a26 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n  border-radius: 4px;\n}' },
        { type: 'code', lang: 'css', content: '/* ── TRANSFORMS: mover, girar, escalar sem quebrar layout ─\n   transform não afeta outros elementos — perfeito para animações */\n\n.card:hover {\n  transform:\n    translateY(-4px)         /* sobe 4px */\n    scale(1.02)              /* 2% maior */\n    rotate(0deg);            /* sem rotação — mas pronto para animar */\n}\n\n/* Centralizar com transform (método clássico) */\n.modal {\n  position: fixed;\n  top: 50%; left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n/* ── Animações com stagger (atraso em sequência) ──────────\n   Cada item da lista entra um pouquinho depois do anterior */\n\n.lista-item {\n  opacity: 0;\n  animation: fadeIn 0.3s ease-out forwards;\n}\n\n.lista-item:nth-child(1) { animation-delay: 0ms; }\n.lista-item:nth-child(2) { animation-delay: 60ms; }\n.lista-item:nth-child(3) { animation-delay: 120ms; }\n.lista-item:nth-child(4) { animation-delay: 180ms; }\n/* Com JS: element.style.animationDelay = index * 60 + \'ms\'; */' },
        { type: 'highlight', content: '⚡ Performance: animações de transform e opacity rodam na GPU — são sempre suaves. Nunca anime width, height, top, left, margin diretamente — isso força recalcular o layout inteiro (reflow), causando jank (travadas). Regra: se precisar mover algo, use transform: translate(). Se precisar mostrar/esconder, use opacity + visibility.' },
        {
          type: 'common_error',
          title: 'Animar propriedades que causam reflow em vez de transform',
          wrong: '/* ❌ Animar top/left causa reflow — perda de 60fps */\n.elemento {\n  position: absolute;\n  top: 0;\n  transition: top 0.3s ease;\n}\n.elemento.ativo {\n  top: 100px; /* força recalcular layout inteiro */\n}',
          wrongLabel: 'Animar top, left, width, margin = reflow = jank em dispositivos lentos.',
          right: '/* ✅ transform: translate roda na GPU — sempre 60fps */\n.elemento {\n  transform: translateY(0);\n  transition: transform 0.3s ease;\n}\n.elemento.ativo {\n  transform: translateY(100px);\n}',
          rightLabel: 'transform e opacity são as únicas propriedades com animação de alta performance.',
          explanation: 'O browser tem dois tipos de operações: reflow (recalcula layout), repaint (redesenha pixels) e composite (compõe layers na GPU). Só composite é rápido. transform e opacity disparam apenas composite.',
        },
      ],
      exercise: {
        title: 'Biblioteca de animações CSS',
        description: 'Crie funções JS que simulam animações CSS: fadeIn(elemento, duracao), slideIn(elemento, direcao), pulse(elemento, vezes). Use console.log para exibir os valores CSS que seriam aplicados a cada frame-chave.',
        solutionHint: 'Cada função retorna um objeto com os keyframes: { from: { opacity: 0, transform: \'translateY(12px)\' }, to: { opacity: 1, transform: \'translateY(0)\' } }',
        starterCode: 'function fadeIn(elemento, duracao = 300) {\n  // Retorne os valores CSS iniciais e finais como objeto\n  const keyframes = {\n    from: { opacity: 0, transform: \'translateY(12px)\' },\n    to:   { opacity: 1, transform: \'translateY(0)\' },\n  };\n  console.log(\'fadeIn em \' + elemento + \' — duração: \' + duracao + \'ms\');\n  console.log(\'Estado inicial: opacity=\' + keyframes.from.opacity);\n  console.log(\'Estado final:   opacity=\' + keyframes.to.opacity);\n  return keyframes;\n}\n\nfunction slideIn(elemento, direcao = \'left\', distancia = 24) {\n  // direcao: left | right | up | down\n  // Calcule o translateX ou translateY inicial baseado na direcao\n  const translateMap = {\n    left:  \'translateX(-\' + distancia + \'px)\',\n    right: \'translateX(\' + distancia + \'px)\',\n    up:    \'translateY(-\' + distancia + \'px)\',\n    down:  \'translateY(\' + distancia + \'px)\',\n  };\n  const keyframes = {\n    from: { opacity: 0, transform: translateMap[direcao] },\n    to:   { opacity: 1, transform: \'translate(0)\' },\n  };\n  console.log(\'slideIn[\' + direcao + \'] em \' + elemento);\n  console.log(\'Transform inicial: \' + keyframes.from.transform);\n  return keyframes;\n}\n\nfunction pulse(elemento, vezes = 3) {\n  // Crie os keyframes do efeito pulse\n  const keyframes = [\n    { offset: 0,   transform: \'scale(1)\',    opacity: 1 },\n    { offset: 0.5, transform: \'scale(1.08)\', opacity: 0.8 },\n    { offset: 1,   transform: \'scale(1)\',    opacity: 1 },\n  ];\n  console.log(\'pulse em \' + elemento + \' — \' + vezes + \'x\');\n  keyframes.forEach((k, i) => console.log(\'Frame \' + i + \': scale=\' + k.transform));\n  return keyframes;\n}\n\n// Testes\nfadeIn(\'.card\', 400);\nslideIn(\'.menu\', \'left\', 32);\npulse(\'.badge\', 2);\nconsole.log(\'Biblioteca pronta!\');\n',
        validate: (output) => output.includes('fadeIn') && output.includes('slideIn') && output.includes('pulse') && output.includes('Biblioteca pronta!'),
        validateMessage: 'Execute as três funções e exiba "Biblioteca pronta!" ao final.',
      },
      quiz: [
        { question: 'Qual propriedade CSS define a duração e curva de uma animação de hover?', options: ['animation', 'transition', 'transform', 'keyframe'], correct: 1, explanation: 'transition define como uma propriedade muda de valor ao longo do tempo. animation + @keyframes é para animações mais complexas com múltiplos estados.' },
        { question: 'Por que animar transform em vez de top/left?', options: ['transform é mais fácil de escrever', 'transform só afeta a camada de compositing na GPU — sem reflow, sem jank', 'top/left não são animáveis', 'Browsers mais antigos não suportam top'], correct: 1, explanation: 'transform e opacity disparam apenas composite (GPU), sem reflow nem repaint. top/left forçam recalcular todo o layout — muito mais pesado.' },
        { question: 'O que significa animation-fill-mode: both?', options: ['Anima nos dois sentidos', 'Mantém o estado do primeiro frame antes de começar e do último frame após terminar', 'Aplica a animação a dois elementos', 'Repete a animação duas vezes'], correct: 1, explanation: 'forwards: mantém estado final. backwards: aplica estado inicial antes de começar. both: os dois ao mesmo tempo — o mais usado.' },
        { question: 'Como criar um efeito de entrada sequencial em uma lista?', options: ['Usar JavaScript obrigatoriamente', 'animation-delay crescente em cada item (:nth-child)', 'animation: sequence', 'transition-delay em cada li'], correct: 1, explanation: ':nth-child(n) seleciona o n-ésimo elemento. Combinando com animation-delay: n*60ms cria o efeito de stagger sem JavaScript.' },
        { question: 'Qual easing é mais natural para elementos que entram na tela?', options: ['linear', 'ease-in (começa devagar)', 'ease-out (termina devagar)', 'cubic-bezier(0,0,1,1)'], correct: 2, explanation: 'ease-out imita objetos físicos que desaceleram ao parar. Para entradas na tela, parece mais natural. ease-in é melhor para saídas.' },
      ],
    },
  }
  ,{
    id: 'mp-phase-4',
    title: '🏗️ Mini-Projeto: Card de Produto E-commerce',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase4,
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

export const phase5 = {
  id: 'phase-5',
  title: 'JavaScript Avançado',
  phase: 5,
  color: '#f5d020',
  icon: '⚡',
  description: 'A cozinha do JavaScript. DOM, ES6+, classes e OOP, async/await, closures, o Event Loop e o this — tudo que faz o JS moderno funcionar.',  checklist: [
    'Usar Promises com .then() e .catch()',
    'Escrever funções async/await com tratamento de erros',
    'Usar fetch() para consumir uma API REST',
    'Manipular o DOM (querySelector, addEventListener, classList)',
    'Explicar o que é o Event Loop e como funciona',
    'Usar localStorage para persistir dados simples',
    'Entender closures e como variáveis "lembram" o escopo externo',
    'Usar desestruturação, spread (...) e rest parameters',
    'Criar classes com constructor, métodos, herança e campos privados',
    'Explicar o Event Loop, call stack, task queue e microtask queue',
  ],
  modules: [
  {
          id: 'mod-5-1',
          title: 'DOM e Eventos',
          duration: '40 min',
          xp: 130,
          content: {
            sections: [
              { type: 'text', content: 'O DOM (Document Object Model) é a representação do HTML como árvore de objetos JavaScript. É como o JS "enxerga" a página — cada tag vira um nó que pode ser lido, criado, modificado ou removido.' },
              { type: 'code', lang: 'javascript', content: '// ── SELEÇÃO DE ELEMENTOS ─────────────────────\nconst btn = document.getElementById("meu-btn");\nconst todos = document.querySelectorAll(".card");  // NodeList\nconst primeiro = document.querySelector(".card");  // primeiro\n\n// ── LEITURA E MODIFICAÇÃO ──────────────────────\nbtn.textContent = "Novo texto";          // texto simples\nbtn.innerHTML = "<strong>Negrito</strong>"; // HTML (cuidado XSS!)\nbtn.setAttribute("disabled", "");\nbtn.removeAttribute("disabled");\nbtn.dataset.userId = "42";               // data-user-id="42"\n\n// Classes\nbtn.classList.add("ativo");\nbtn.classList.remove("inativo");\nbtn.classList.toggle("selecionado");     // add se não tem, remove se tem\nbtn.classList.contains("ativo");         // boolean\n\n// Estilos\nbtn.style.backgroundColor = "#7c6af7";  // camelCase!\nbtn.style.cssText = "color: red; font-size: 16px;";\n\n// ── CRIAR E INSERIR ELEMENTOS ─────────────────\nconst li = document.createElement("li");\nli.textContent = "Novo item";\nli.className = "lista-item";\ndocument.querySelector("ul").appendChild(li);    // ao fim\ndocument.querySelector("ul").prepend(li);         // ao início\nbtn.insertAdjacentHTML("afterend", "<p>Novo</p>"); // próximo irmão' },
              { type: 'code', lang: 'javascript', content: '// ── EVENTOS ──────────────────────────────────\nconst form = document.querySelector("form");\n\n// Adicionar listener\nform.addEventListener("submit", function(event) {\n  event.preventDefault();                 // evita recarregar a página\n  const dados = new FormData(event.target);\n  console.log(dados.get("email"));\n});\n\n// Event delegation — um listener para muitos elementos\ndocument.querySelector(".lista").addEventListener("click", (e) => {\n  if (e.target.matches(".btn-deletar")) {\n    e.target.closest("li").remove();\n  }\n});\n\n// Eventos comuns\ndocument.addEventListener("DOMContentLoaded", () => { /* DOM pronto */ });\nwindow.addEventListener("resize", () => { /* viewport mudou */ });\ninput.addEventListener("input", (e) => console.log(e.target.value));\ninput.addEventListener("keydown", (e) => {\n  if (e.key === "Enter") submeter();\n  if (e.key === "Escape") fechar();\n});\n\n// Remover listener (importante para evitar memory leak)\nconst handler = () => {};\nbtn.addEventListener("click", handler);\nbtn.removeEventListener("click", handler); // precisa da mesma referência' },
              { type: 'highlight', content: '🔒 Nunca use innerHTML com dados do usuário — é uma vulnerabilidade XSS. Use textContent para texto puro ou sanitize o HTML. Exemplo perigoso: element.innerHTML = userInput.' },
            ,
                  {
                    type: 'common_error',
                    title: 'Não tratar erros em Promises (Promise sem .catch)',
                    wrong: `fetch("/api/dados")
  .then(res => res.json())
  .then(data => console.log(data));
// Se der erro: "UnhandledPromiseRejection"
// Silencioso em produção — bug invisível!`,
                    wrongLabel: 'Promise sem .catch() = erros silenciosos em produção.',
                    right: `fetch("/api/dados")
  .then(res => {
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error("Falhou:", err));`,
                    rightLabel: 'Sempre trate erros: .catch() ou try/catch com async/await.',
                    explanation: 'Promises rejeitadas sem handler travam silenciosamente o código. Com async/await, use sempre try/catch. Com .then(), sempre adicione .catch() ao final da cadeia.',
                  }],
            exercise: {
              title: 'Interação com DOM',
              description: 'Simule (com console.log) o que aconteceria em: (1) um listener de click que conta quantas vezes o botão foi clicado; (2) um listener de input que exibe o texto em tempo real; (3) event delegation para deletar um item de lista.',
                            solutionHint: 'document.querySelector(selector) retorna o primeiro elemento. addEventListener("click", fn) adiciona evento. classList.add/remove/toggle para classes.',
starterCode: 'let cliques = 0;\n\n// Simule o listener de click (incrementa e exibe contagem)\nfunction simularClick() {\n  cliques++;\n  console.log(`Botão clicado: ${cliques} vez(es)`);\n}\n\n// Simule o listener de input\nfunction simularInput(texto) {\n  // exiba o texto digitado\n}\n\n// Simule event delegation para deletar\nfunction simularDeletar(nomeItem) {\n  // exiba mensagem de deleção\n}\n\n// Testes\nsimularClick();\nsimularClick();\nsimularClick();\nsimularInput("usuário digitando...");\nsimularDeletar("Item 2");\n',
              solutionHint: 'Foque em simular a lógica dos listeners com console.log',
              validate: (output, code) => output.includes('3') && output.includes('digitando') && output.includes('Item 2'),
              validateMessage: 'Exiba: contagem 3, o texto digitado e o item deletado.'
            },
            quiz: [
              { question: 'Qual a diferença entre textContent e innerHTML?', options: ['São idênticos', 'textContent: texto puro; innerHTML: interpreta HTML', 'innerHTML é mais seguro', 'textContent não funciona em divs'], correct: 1, explanation: 'textContent: lê/escreve apenas texto (seguro). innerHTML: lê/escreve HTML (risco XSS com dados do usuário).' },
              { question: 'O que é event delegation?', options: ['Passar um evento para outro elemento', 'Colocar 1 listener no pai para gerenciar eventos de vários filhos', 'Remover listeners automáticamente', 'Priorizar eventos'], correct: 1, explanation: 'Event delegation usa bubbling: eventos sobem na árvore DOM. Um listener no pai pode detectar cliques em qualquer filho com e.target.' },
              { question: 'Quando o evento DOMContentLoaded é disparado?', options: ['Quando CSS termina de carregar', 'Quando o HTML é parseado (antes de imagens/estilos)', 'Quando a página está 100% carregada', 'Nunca em sites modernos'], correct: 1, explanation: 'DOMContentLoaded: DOM está pronto mas imagens/CSS podem não ter carregado. Ideal para inicializar scripts. window.load = tudo carregado.' },
              { question: 'O que faz classList.toggle()?', options: ['Altera o tipo do elemento', 'Adiciona se não tem, remove se tem', 'Apenas adiciona classe', 'Copia classes'], correct: 1, explanation: 'toggle é como um interruptor: se a classe está presente, remove. Se não está, adiciona. Perfeito para menus e accordions.' },
              { question: 'Por que e.target.closest(".item") é útil?', options: ['Seleciona o elemento mais próximo na árvore acima que match o seletor', 'Seleciona todos os filhos', 'É equivalente a querySelector', 'Seleciona o próximo irmão'], correct: 0, explanation: 'closest() sobe na árvore DOM buscando o ancestral mais próximo que corresponde ao seletor. Útil em event delegation para encontrar o container.' },
            ]
          }
        },
  {
    id: 'mod-5-1b',
    title: 'Classes e Orientação a Objetos em JavaScript',
    duration: '45 min',
    xp: 145,
    content: {
      sections: [
        { type: 'text', content: 'JavaScript é uma linguagem multiparadigma — você pode escrever em estilo funcional, procedural ou orientado a objetos. Classes ES6 são açúcar sintático sobre o sistema de protótipos do JavaScript, mas é o estilo dominante no código moderno: React components, classes de serviço em Node.js, e praticamente toda biblioteca séria usa isso.' },
        { type: 'code', lang: 'javascript', content: '// ── ANATOMIA DE UMA CLASSE ───────────────────────────\nclass ContaBancaria {\n  #saldo;\n  #historico = [];\n  static totalContas = 0;\n\n  constructor(titular, saldoInicial = 0) {\n    this.titular = titular;\n    this.#saldo = saldoInicial;\n    ContaBancaria.totalContas++;\n  }\n\n  get saldo() { return this.#saldo; }\n\n  depositar(valor) {\n    if (valor <= 0) throw new Error(\'Valor deve ser positivo\');\n    this.#saldo += valor;\n    this.#historico.push({ tipo: \'deposito\', valor });\n    return this;\n  }\n\n  sacar(valor) {\n    if (valor > this.#saldo) throw new Error(\'Saldo insuficiente\');\n    this.#saldo -= valor;\n    this.#historico.push({ tipo: \'saque\', valor });\n    return this;\n  }\n\n  extrato() {\n    return this.#historico.map(h => h.tipo + \': R$\' + h.valor.toFixed(2));\n  }\n\n  static resumo() {\n    return \'Total de contas: \' + ContaBancaria.totalContas;\n  }\n}\n\nconst conta = new ContaBancaria(\'Ana\', 1000);\nconta.depositar(500).sacar(200);\nconsole.log(conta.saldo);      // 1300\nconsole.log(conta.extrato());\nconsole.log(ContaBancaria.resumo());' },
        { type: 'code', lang: 'javascript', content: '// ── HERANÇA COM extends ──────────────────────────────\nclass Animal {\n  constructor(nome, som) {\n    this.nome = nome;\n    this.som = som;\n  }\n  falar() { return this.nome + \' faz \' + this.som; }\n  toString() { return \'Animal(\' + this.nome + \')\'; }\n}\n\nclass Cachorro extends Animal {\n  #truques = [];\n  constructor(nome) {\n    super(nome, \'Au au\'); // OBRIGATÓRIO antes de usar this\n    this.especie = \'Canis lupus familiaris\';\n  }\n  falar() { return super.falar() + \'!\'; }\n  aprenderTruque(truque) {\n    this.#truques.push(truque);\n    return this;\n  }\n  get truques() { return [...this.#truques]; }\n}\n\nconst rex = new Cachorro(\'Rex\');\nrex.aprenderTruque(\'sentar\').aprenderTruque(\'dar a pata\');\nconsole.log(rex.falar());             // Rex faz Au au!\nconsole.log(rex.truques);             // [\'sentar\', \'dar a pata\']\nconsole.log(rex instanceof Animal);   // true\nconsole.log(rex instanceof Cachorro); // true' },
        { type: 'highlight', content: '🔑 Diferença crucial: this em classes vs funções normais. Em métodos de classe, this é a instância. Em callbacks e funções regulares, this pode ser undefined (strict mode) ou o objeto global. Arrow functions dentro de métodos preservam o this da classe — são a solução mais comum para esse problema.' },
        { type: 'code', lang: 'javascript', content: '// ── PADRÕES COMUNS COM CLASSES ────────────────────────\n\n// Factory Method — cria instâncias sem expor new\nclass Notificacao {\n  #tipo; #mensagem;\n  constructor(tipo, mensagem) { this.#tipo = tipo; this.#mensagem = mensagem; }\n  get tipo() { return this.#tipo; }\n  get mensagem() { return this.#mensagem; }\n  static info(msg)  { return new Notificacao(\'info\', msg); }\n  static erro(msg)  { return new Notificacao(\'erro\', msg); }\n  static aviso(msg) { return new Notificacao(\'aviso\', msg); }\n}\n\nconst n = Notificacao.erro(\'Falha na conexão\');\nconsole.log(n.tipo, n.mensagem);\n\n// Mixin — compartilhar comportamento sem herança\nconst Serializavel = (Base) => class extends Base {\n  toJSON() {\n    return JSON.stringify(\n      Object.fromEntries(Object.entries(this).filter(([k]) => !k.startsWith(\'_\')))\n    );\n  }\n};\n\nclass Produto { constructor(nome, preco) { this.nome = nome; this.preco = preco; } }\nclass ProdutoSer extends Serializavel(Produto) {}\n\nconst p = new ProdutoSer(\'Notebook\', 3500);\nconsole.log(p.toJSON());' },
        {
          type: 'common_error',
          title: 'Esquecer super() na subclasse ou usar this antes de super()',
          wrong: 'class Gato extends Animal {\n  constructor(nome, cor) {\n    this.cor = cor;         // ❌ ReferenceError\n    super(nome, \'Miau\');   // deve vir primeiro\n  }\n}',
          wrongLabel: 'Usar this antes de super() em subclasses causa ReferenceError.',
          right: 'class Gato extends Animal {\n  constructor(nome, cor) {\n    super(nome, \'Miau\'); // ✅ sempre primeiro\n    this.cor = cor;      // agora this está disponível\n  }\n}',
          rightLabel: 'super() inicializa o objeto herdado. Deve vir antes de qualquer acesso ao this.',
          explanation: 'Em subclasses, o JavaScript não cria o this automaticamente — é super() que cria e retorna o objeto base. Sem super(), this não existe ainda.',
        },
      ],
      exercise: {
        title: 'Implementar um sistema de biblioteca',
        description: 'Crie uma classe Livro com titulo, autor e isbn (privado). Crie uma classe Biblioteca que gerencia uma coleção: adicionar livros (retorne this), buscar por titulo (case-insensitive), listarDisponiveis(), e um método estático totalBibliotecas().',
        solutionHint: 'Livro com #isbn privado e getter. Biblioteca com #acervo = [] e métodos encadeáveis. Lembre: static #totalBibliotecas = 0 e incrementar no constructor.',
        starterCode: 'class Livro {\n  #isbn;\n\n  constructor(titulo, autor, isbn) {\n    this.titulo = titulo;\n    this.autor = autor;\n    this.#isbn = isbn;\n    this.disponivel = true;\n  }\n\n  get isbn() { return this.#isbn; }\n\n  toString() {\n    return this.titulo + \' por \' + this.autor;\n  }\n}\n\nclass Biblioteca {\n  #acervo = [];\n  static #totalBibliotecas = 0;\n\n  constructor(nome) {\n    this.nome = nome;\n    Biblioteca.#totalBibliotecas++;\n  }\n\n  adicionar(livro) {\n    // adicione o livro ao acervo e retorne this\n  }\n\n  buscar(titulo) {\n    // retorne o livro cujo titulo inclui a string (case-insensitive)\n  }\n\n  listarDisponiveis() {\n    // retorne array de livros com disponivel === true\n  }\n\n  static totalBibliotecas() {\n    return Biblioteca.#totalBibliotecas;\n  }\n}\n\n// Testes\nconst bib = new Biblioteca(\'Biblioteca Central\');\nbib\n  .adicionar(new Livro(\'Clean Code\', \'Robert C. Martin\', \'978-01\'))\n  .adicionar(new Livro(\'The Pragmatic Programmer\', \'Andrew Hunt\', \'978-02\'))\n  .adicionar(new Livro(\'JavaScript: The Good Parts\', \'Douglas Crockford\', \'978-03\'));\n\nconsole.log(bib.listarDisponiveis().length); // 3\nconsole.log(bib.buscar(\'clean\').toString());  // Clean Code por Robert C. Martin\nconsole.log(Biblioteca.totalBibliotecas());   // 1\n',
        validate: (output) => output.includes('3') && output.includes('Clean Code') && output.includes('1'),
        validateMessage: 'Exiba: 3 livros disponíveis, Clean Code encontrado na busca, e 1 biblioteca criada.',
      },
      quiz: [
        { question: 'O que é um campo privado em JavaScript (#campo)?', options: ['Uma variável let dentro do constructor', 'Um campo acessível apenas dentro do corpo da classe — SyntaxError se acessado fora', 'Uma propriedade read-only', 'Um campo que não aparece no JSON'], correct: 1, explanation: 'Campos privados (#campo) são reforçados em nível de linguagem. Tentativa de acesso externo é SyntaxError, não undefined.' },
        { question: 'Por que super() precisa vir antes de this em um constructor que estende outra classe?', options: ['É apenas convenção de estilo', 'super() cria o objeto this — sem ele, this não existe na subclasse', 'Para chamar o método do pai', 'Para herdar os campos privados'], correct: 1, explanation: 'Em classes derivadas, o JavaScript não cria o objeto automaticamente. super() delega a criação para a superclasse e retorna o this inicializado.' },
        { question: 'Qual a diferença entre método de instância e método estático?', options: ['Método estático é mais rápido', 'Método de instância usa this da instância; estático pertence à classe, chamado via Classe.metodo()', 'Não há diferença prática', 'Método estático não pode ser herdado'], correct: 1, explanation: 'Estáticos são chamados na classe (Classe.metodo()), não na instância. Úteis para factories, utilitários e contadores que pertencem à classe.' },
        { question: 'O que um getter permite fazer?', options: ['Criar propriedades calculadas acessíveis sem parênteses', 'Tornar propriedades somente-leitura', 'Criar métodos privados', 'Acessar campos estáticos'], correct: 0, explanation: 'get saldo() { return this.#saldo; } permite usar objeto.saldo em vez de objeto.saldo() — parece uma propriedade mas executa lógica por baixo.' },
        { question: 'O que significa return this em um método de classe?', options: ['Retorna a própria classe', 'Retorna a instância atual, permitindo encadeamento de métodos (method chaining)', 'Cria uma cópia do objeto', 'Acessa o prototype'], correct: 1, explanation: 'return this permite encadear: conta.depositar(100).sacar(50).depositar(200). Cada método retorna a instância para o próximo chamar.' },
      ],
    },
  },
  {
          id: 'mod-5-2',
          title: 'ES6+ e JavaScript Moderno',
          duration: '40 min',
          xp: 140,
          content: {
            sections: [
              { type: 'text', content: 'ES6 (2015) revolucionou o JavaScript. Classes, módulos, destructuring, spread, generators — recursos que transformaram a linguagem. Você vai ver tudo isso no código de produção.' },
              { type: 'code', lang: 'javascript', content: '// ── CLASSES ──────────────────────────────────\nclass Animal {\n  #nome;                    // campo privado (ES2022)\n  static contador = 0;      // campo estático\n  \n  constructor(nome, tipo) {\n    this.#nome = nome;\n    this.tipo = tipo;\n    Animal.contador++;\n  }\n  \n  get nome() { return this.#nome; }  // getter\n  set nome(v) { this.#nome = v; }    // setter\n  \n  apresentar() {\n    return `${this.#nome} é um ${this.tipo}`;\n  }\n  \n  static total() {\n    return `${Animal.contador} animais`;\n  }\n}\n\nclass Cachorro extends Animal {\n  constructor(nome) {\n    super(nome, "cachorro");   // chama constructor do pai\n  }\n  \n  latir() { return `${this.nome}: Au!`; }\n}\n\nconst rex = new Cachorro("Rex");\nconsole.log(rex.apresentar());  // "Rex é um cachorro"\nconsole.log(rex.latir());       // "Rex: Au!"\nconsole.log(Animal.total());    // "1 animais"' },
              { type: 'code', lang: 'javascript', content: '// ── MÓDULOS ES6 ──────────────────────────────\n// utils.js — exportações\nexport const PI = 3.14159;\nexport function somar(a, b) { return a + b; }\nexport default class Calculadora { /* ... */ }\n\n// main.js — importações\nimport Calculadora from "./utils.js";          // default\nimport { PI, somar } from "./utils.js";        // named\nimport { somar as sum } from "./utils.js";     // alias\nimport * as Utils from "./utils.js";           // tudo\n\n// ── SYMBOLS E ITERATORS ──────────────────────\nconst id = Symbol("id");           // sempre único\nconst obj = { [id]: 42, nome: "Ana" };\nconsole.log(obj[id]); // 42 — chave privada de fato\n\n// ── MAP E SET ─────────────────────────────────\nconst mapa = new Map();\nmapa.set("chave", "valor");\nmapa.set(objeto, "valor por referência");  // qualquer tipo como chave!\nconsole.log(mapa.get("chave"));\nconsole.log(mapa.size);\n\nconst set = new Set([1, 2, 2, 3, 3, 3]);  // remove duplicatas\nconsole.log([...set]);  // [1, 2, 3]\n\n// Remover duplicatas de array — padrão profissional\nconst deduplicado = [...new Set(arrayComDuplicatas)];' },
              { type: 'highlight', content: '📦 Módulos ES6 são o padrão atual. Cada arquivo é um módulo com seu próprio escopo. Use import/export para compartilhar código entre arquivos. Isso é a base de todo projeto React/Node moderno.' },
            ],
            exercise: {
              title: 'Classe de gerenciamento',
              description: 'Crie uma classe BancoDeDados simples com: campo privado #dados (Map), métodos inserir(id, valor), buscar(id), listar() que retorna todos os valores, e deletar(id). Teste com pelo menos 3 inserções.',
                            solutionHint: 'Defina a classe com constructor para inicializar o estado. Métodos acessam o estado via this. Para lista: this.itens = [] no constructor.',
starterCode: 'class BancoDeDados {\n  #dados = new Map();\n  \n  inserir(id, valor) {\n    // adicione ao Map\n  }\n  \n  buscar(id) {\n    // retorne o valor ou null\n  }\n  \n  listar() {\n    // retorne array de todos os valores\n  }\n  \n  deletar(id) {\n    // remova e retorne true/false\n  }\n}\n\n// Testes\nconst db = new BancoDeDados();\ndb.inserir(1, { nome: "Ana" });\ndb.inserir(2, { nome: "Bruno" });\ndb.inserir(3, { nome: "Carlos" });\n\nconsole.log(db.buscar(2));\nconsole.log(db.listar());\ndb.deletar(1);\nconsole.log(db.listar());\n',
              solutionHint: 'this.#dados.set(id, valor) | this.#dados.get(id) ?? null | [...this.#dados.values()]',
              validate: (output, code) => output.includes('Bruno') && output.includes('Ana') && output.includes('Carlos'),
              validateMessage: 'Exiba os dados dos 3 usuários.'
            },
            quiz: [
              { question: 'O que são campos privados com # em classes?', options: ['Convenção apenas, ainda acessível', 'Campos realmente inacessíveis fora da classe', 'Campos somente leitura', 'Campos estáticos'], correct: 1, explanation: '#campo é encapsulamento real no JS moderno. Acessar fora da classe lança SyntaxError. Diferente da convenção _campo (que era apenas estilística).' },
              { question: 'Qual a vantagem do Map sobre objetos para chave-valor?', options: ['Map é mais rápido sempre', 'Map aceita qualquer tipo como chave e tem .size e iteração nativa', 'Map serializa para JSON', 'Não há vantagem'], correct: 1, explanation: 'Map: qualquer tipo como chave, preserva ordem de inserção, tem .size, .forEach, é iterável. Objeto: chaves são sempre strings/symbols.' },
              { question: 'O que faz new Set(array)?', options: ['Ordena o array', 'Cria coleção com valores únicos (remove duplicatas)', 'Congela o array', 'Cria cópia do array'], correct: 1, explanation: 'Set é uma coleção de valores únicos. new Set([1,2,2,3]) = {1,2,3}. [...new Set(arr)] é o padrão para remover duplicatas.' },
              { question: 'Qual a diferença entre export default e export?', options: ['São idênticos', 'default: um por módulo, importado sem chaves; named: múltiplos, importados com chaves', 'named é mais moderno', 'default não funciona em React'], correct: 1, explanation: 'export default: apenas 1 por arquivo, import sem chaves com qualquer nome. export named: múltiplos, import com chaves e nome exato.' },
              { question: 'O que faz extends em classes?', options: ['Adiciona propriedades ao prototype', 'Cria herança — a subclasse herda métodos da superclasse', 'Copia todos os métodos', 'Cria uma interface'], correct: 1, explanation: 'extends cria herança prototípica. super() chama o constructor do pai. A subclasse herda todos os métodos públicos.' },
            ]
          }
        },
  {
          id: 'mod-5-3',
          title: 'Async, Promises e Fetch',
          duration: '45 min',
          xp: 150,
          content: {
            sections: [
              { type: 'text', content: 'JavaScript é single-thread mas assíncrono. Operações como requisições HTTP, leitura de arquivos e timers não bloqueiam a execução. Promises e async/await são as ferramentas modernas para lidar com isso.' },
              { type: 'code', lang: 'javascript', content: '// ── EVENT LOOP (conceito fundamental) ──────────\n// JS executa em 1 thread. Callbacks assíncronos vão para a\n// fila e executam quando a call stack está vazia.\nconsole.log("1 — síncrono");\nsetTimeout(() => console.log("3 — async"), 0); // vai para a fila\nconsole.log("2 — síncrono");\n// Output: 1, 2, 3 (mesmo com timeout 0!)\n\n// ── PROMISES ──────────────────────────────────\nconst promise = new Promise((resolve, reject) => {\n  const sucesso = true;\n  if (sucesso) resolve("Dados retornados!");\n  else reject(new Error("Algo deu errado"));\n});\n\npromise\n  .then(dados => console.log(dados))\n  .catch(err => console.error(err.message))\n  .finally(() => console.log("Sempre executa"));\n\n// Promise.all — espera TODAS\nconst [user, posts] = await Promise.all([\n  fetch("/api/user").then(r => r.json()),\n  fetch("/api/posts").then(r => r.json()),\n]);\n\n// Promise.allSettled — espera todas, mesmo com erro\nconst resultados = await Promise.allSettled([p1, p2, p3]);' },
              { type: 'code', lang: 'javascript', content: '// ── ASYNC/AWAIT ───────────────────────────────\nasync function buscarUsuario(id) {\n  try {\n    const response = await fetch(`/api/usuarios/${id}`);\n    \n    if (!response.ok) {\n      throw new Error(`HTTP ${response.status}: ${response.statusText}`);\n    }\n    \n    const usuario = await response.json();\n    return usuario;\n    \n  } catch (erro) {\n    if (erro.name === "TypeError") {\n      console.error("Erro de rede — sem conexão?");\n    } else {\n      console.error("Erro ao buscar usuário:", erro.message);\n    }\n    return null;\n  }\n}\n\n// ── FETCH COMPLETO ────────────────────────────\nasync function criarUsuario(dados) {\n  const response = await fetch("/api/usuarios", {\n    method: "POST",\n    headers: {\n      "Content-Type": "application/json",\n      "Authorization": `Bearer ${localStorage.getItem("token")}`,\n    },\n    body: JSON.stringify(dados),\n  });\n  \n  return response.json();\n}' },
              { type: 'highlight', content: '⚡ Erro comum: esquecer o await. Sem await, você recebe a Promise, não o valor. Com await, você precisa estar dentro de uma função async. Use try/catch sempre com async/await.' },
            ],
            exercise: {
              title: 'Simulando requisições assíncronas',
              description: 'Crie uma função buscarProduto(id) que usa setTimeout para simular latência de 500ms e retorna um produto. Use Promises. Depois crie buscarVariosProdutos(ids) que busca todos em paralelo com Promise.all.',
                            solutionHint: 'Use async/await com try/catch. new Promise((resolve, reject) => setTimeout(resolve, ms)) simula delay. reject() simula erros.',
starterCode: '// Simula banco de dados\nconst produtos = {\n  1: { id: 1, nome: "Notebook", preco: 3500 },\n  2: { id: 2, nome: "Mouse", preco: 150 },\n  3: { id: 3, nome: "Teclado", preco: 280 },\n};\n\n// Retorna Promise que resolve após 500ms\nfunction buscarProduto(id) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      const produto = produtos[id];\n      if (produto) resolve(produto);\n      else reject(new Error(`Produto ${id} não encontrado`));\n    }, 100); // 100ms para não demorar nos testes\n  });\n}\n\n// Busca vários em paralelo\nasync function buscarVariosProdutos(ids) {\n  // Use Promise.all aqui\n}\n\n// Teste\nasync function main() {\n  const produto = await buscarProduto(1);\n  console.log(produto.nome);\n  \n  const varios = await buscarVariosProdutos([1, 2, 3]);\n  varios.forEach(p => console.log(p.nome));\n}\n\nmain();\n',
              solutionHint: 'Promise.all(ids.map(id => buscarProduto(id)))',
              validate: (output, code) => output.includes('Notebook') && output.includes('Mouse') && output.includes('Teclado'),
              validateMessage: 'Exiba os 3 produtos: Notebook, Mouse, Teclado.'
            },
            quiz: [
              { question: 'O que é o Event Loop?', options: ['Um loop infinito no código', 'Mecanismo que permite JS assíncrono em single-thread', 'Um tipo de Promise', 'O loop principal do navegador'], correct: 1, explanation: 'Event Loop monitora a call stack e a fila de callbacks. Quando a stack está vazia, move callbacks assíncronos para execução.' },
              { question: 'O que acontece se esquecer o await antes de fetch()?', options: ['Erro de runtime', 'Você recebe a Promise, não o dado', 'Funciona igual', 'O código bloqueia'], correct: 1, explanation: 'Sem await, a variável contém a Promise pendente, não o resultado. Acessar .json() vai dar erro pois Promise não tem esse método.' },
              { question: 'Qual a diferença entre Promise.all e Promise.allSettled?', options: ['São idênticos', 'all rejeita se qualquer Promise falhar; allSettled sempre espera todas', 'allSettled é mais lento', 'all é para APIs, allSettled para arquivos'], correct: 1, explanation: 'Promise.all: falha rápido (se 1 rejeitar, rejeita tudo). allSettled: espera todas e retorna array com status de cada uma.' },
              { question: 'O que response.ok verifica?', options: ['Se o JSON é válido', 'Se o status HTTP é 2xx (200-299)', 'Se a requisição foi feita', 'Se o body não está vazio'], correct: 1, explanation: 'response.ok é true se status está entre 200-299. Fetch não lança erro para status 4xx/5xx — você precisa verificar .ok manualmente.' },
              { question: 'Como enviar dados JSON em um POST com fetch?', options: ['body: dados', 'JSON.stringify(dados) no body + Content-Type: application/json no header', 'body: JSON(dados)', 'Não é possível com fetch'], correct: 1, explanation: 'fetch POST: headers: {"Content-Type": "application/json"}, body: JSON.stringify(dados). O header avisa o servidor que o body é JSON.' },
            ]
          }
        },
  {
      id: 'mod-5-3b',
      title: 'Async Avançado: Armadilhas e Padrões',
      duration: '45 min',
      xp: 160,
      content: {
        sections: [
          {
            type: 'text',
            content:
              'async/await parece código síncrono, mas esconde complexidades. As principais armadilhas são: await sequencial desnecessário (lento), falta de tratamento de erros, e race conditions. Saber quando paralelizar e quando serializar é uma habilidade diferenciada.',
          },
          {
            type: 'code',
            lang: 'javascript',
            content:
              '// ── AWAIT SEQUENCIAL VS PARALELO ─────────────\n// ❌ Lento: espera cada um terminar antes de começar o próximo\nasync function carregarDadosLento(userId) {\n  const usuario = await buscarUsuario(userId);   // 300ms\n  const pedidos = await buscarPedidos(userId);   // 400ms  \n  const notifs  = await buscarNotificacoes(userId); // 200ms\n  // Total: ~900ms (sequencial)\n  return { usuario, pedidos, notifs };\n}\n\n// ✅ Rápido: inicia tudo em paralelo com Promise.all\nasync function carregarDadosRapido(userId) {\n  const [usuario, pedidos, notifs] = await Promise.all([\n    buscarUsuario(userId),      // ┐\n    buscarPedidos(userId),      // ├ todos iniciam ao mesmo tempo\n    buscarNotificacoes(userId), // ┘\n  ]);\n  // Total: ~400ms (o mais lento dos 3)\n  return { usuario, pedidos, notifs };\n}\n\n// ✅ Quando a segunda chamada DEPENDE da primeira: sequencial é correto\nasync function carregarPedidosDoPrimeiroPedido(userId) {\n  const usuario = await buscarUsuario(userId);\n  const pedido = await buscarPedido(usuario.primeiroPedidoId); // depende do usuário\n  return pedido;\n}',
          },
          {
            type: 'code',
            lang: 'javascript',
            content:
              '// ── TRATAMENTO DE ERRO EM PROMISE.ALL ────────\n// Promise.all falha toda a operação se UMA rejeitar\ntry {\n  const [a, b, c] = await Promise.all([p1, p2, p3]);\n  // Se p2 falhar, nem a nem c são retornados\n} catch (e) {\n  console.error("Pelo menos uma falhou:", e);\n}\n\n// Promise.allSettled: resultado de cada um, independente\nconst resultados = await Promise.allSettled([p1, p2, p3]);\nresultados.forEach(r => {\n  if (r.status === "fulfilled") {\n    console.log("Sucesso:", r.value);\n  } else {\n    console.log("Falhou:", r.reason.message);\n  }\n});\n\n// ── RACE CONDITIONS ───────────────────────────\n// Problema: usuário digita rápido, requests chegam fora de ordem\nlet ultimoId = 0;\n\nasync function buscarComAbort(busca) {\n  const meuId = ++ultimoId;\n  \n  const dados = await fetch(`/api/busca?q=${busca}`).then(r => r.json());\n  \n  // Ignora se uma requisição mais nova já foi feita\n  if (meuId !== ultimoId) return;\n  setResultados(dados);\n}\n\n// ✅ Melhor: AbortController cancela a requisição antiga\nlet controller = null;\n\nasync function buscarComCancelamento(busca) {\n  controller?.abort(); // cancela a requisição anterior\n  controller = new AbortController();\n  \n  try {\n    const res = await fetch(`/api/busca?q=${busca}`, {\n      signal: controller.signal,\n    });\n    setResultados(await res.json());\n  } catch (e) {\n    if (e.name === "AbortError") return; // cancelamento esperado\n    throw e;\n  }\n}',
          },
          {
            type: 'code',
            lang: 'javascript',
            content:
              '// ── RETRY COM BACKOFF EXPONENCIAL ────────────\n// Padrão profissional para requisições que podem falhar\nasync function comRetry(fn, tentativas = 3, delayBase = 1000) {\n  for (let i = 0; i < tentativas; i++) {\n    try {\n      return await fn();\n    } catch (erro) {\n      if (i === tentativas - 1) throw erro; // última tentativa: propaga\n      \n      const delay = delayBase * 2 ** i; // 1s, 2s, 4s...\n      console.log(`Tentativa ${i + 1} falhou. Retry em ${delay}ms`);\n      await new Promise(resolve => setTimeout(resolve, delay));\n    }\n  }\n}\n\n// Uso:\nconst dados = await comRetry(\n  () => fetch("/api/dados").then(r => r.json()),\n  3,    // 3 tentativas\n  500   // começa com 500ms\n);\n\n// ── ASYNC ITERATORS (for await...of) ──────────\n// Para streams de dados ou paginação\nasync function* paginar(url) {\n  let pagina = 1;\n  while (true) {\n    const res = await fetch(`${url}?page=${pagina}`);\n    const { dados, temMais } = await res.json();\n    yield dados;\n    if (!temMais) break;\n    pagina++;\n  }\n}\n\nfor await (const pagina of paginar("/api/usuarios")) {\n  console.log("Página recebida:", pagina.length, "itens");\n  processar(pagina);\n}',
          },
          {
            type: 'highlight',
            content:
              '🚦 Regra prática: se duas operações async não dependem uma da outra, rode-as em paralelo com Promise.all. Se uma depende do resultado da outra, aí sim use await sequencial. A maioria dos devs júniors usa await sequencial para tudo — esse simples ajuste pode cortar o tempo de carregamento pela metade.',
          },
        ],
        exercise: {
          title: 'Paralelizar requisições',
          description:
            'Refatore a função carregarPagina(userId) que hoje faz 3 awaits sequenciais. Identifique quais podem rodar em paralelo e use Promise.all. Implemente também comRetry simples com 2 tentativas e 100ms de delay.',
                    solutionHint: 'Promise.all([p1, p2, p3]) aguarda todas em paralelo e falha se qualquer uma rejeitar. Promise.allSettled não falha se uma rejeitar. Use para múltiplas chamadas independentes.',
starterCode:
            '// Simula requisições com latência\nconst delay = (ms) => new Promise(res => setTimeout(res, ms));\n\nasync function buscarPerfil(id) {\n  await delay(200);\n  return { id, nome: "Ana", email: "ana@dev.com" };\n}\nasync function buscarPosts(userId) {\n  await delay(300);\n  return [{ id: 1, titulo: "Post 1" }, { id: 2, titulo: "Post 2" }];\n}\nasync function buscarSeguidores(userId) {\n  await delay(150);\n  return [{ id: 10, nome: "Carlos" }];\n}\n\n// ❌ Versão lenta (sequencial)\nasync function carregarPaginaLenta(userId) {\n  const perfil = await buscarPerfil(userId);\n  const posts = await buscarPosts(userId);\n  const seguidores = await buscarSeguidores(userId);\n  return { perfil, posts, seguidores };\n}\n\n// ✅ Refatore para paralelo\nasync function carregarPaginaRapida(userId) {\n  // Use Promise.all aqui\n}\n\n// Meça a diferença\nasync function main() {\n  const t1 = Date.now();\n  await carregarPaginaLenta(1);\n  console.log("Lenta:", Date.now() - t1, "ms"); // ~650ms\n  \n  const t2 = Date.now();\n  await carregarPaginaRapida(1);\n  console.log("Rápida:", Date.now() - t2, "ms"); // ~300ms\n}\n\nmain();\n',
          solutionHint: 'Promise.all([buscarPerfil(userId), buscarPosts(userId), buscarSeguidores(userId)])',
          validate: (output, code) => {
            const linhas = output.split('\n');
            const lenta = linhas.find(l => l.includes('Lenta:'));
            const rapida = linhas.find(l => l.includes('Rápida:'));
            if (!lenta || !rapida) return false;
            const msLenta = parseInt(lenta.match(/\d+/)?.[0] || '0');
            const msRapida = parseInt(rapida.match(/\d+/)?.[0] || '0');
            return msRapida < msLenta;
          },
          validateMessage: 'A versão rápida deve ser mais veloz que a lenta.',
        },
        quiz: [
          {
            question: 'Quando usar Promise.all em vez de awaits sequenciais?',
            options: [
              'Sempre',
              'Quando as operações não dependem uma da outra e podem rodar simultaneamente',
              'Apenas com 3 ou mais promises',
              'Apenas em Node.js',
            ],
            correct: 1,
            explanation:
              'Promise.all paraleliza operações independentes. Awaits sequenciais são corretos apenas quando a operação seguinte depende do resultado da anterior.',
          },
          {
            question: 'O que é uma race condition em código assíncrono?',
            options: [
              'Quando duas promises competem por velocidade',
              'Quando múltiplas operações concorrentes podem chegar em ordem inesperada, corrompendo o estado',
              'Quando Promise.race é mal utilizada',
              'Loop infinito assíncrono',
            ],
            correct: 1,
            explanation:
              'Race condition: usuário digita "abc", dispara 3 fetches. Se "c" retornar antes de "bc", a UI mostra resultado de "c" e depois sobrescreve com "bc". Solução: cancelar requests anteriores com AbortController.',
          },
          {
            question: 'O que é backoff exponencial?',
            options: [
              'Cancelar requisição após timeout',
              'Aumentar progressivamente o delay entre tentativas: 1s, 2s, 4s, 8s...',
              'Fazer múltiplas requisições simultâneas',
              'Reduzir payload de cada requisição',
            ],
            correct: 1,
            explanation:
              'Backoff exponencial: delay = baseDelay × 2^tentativa. Evita sobrecarregar um servidor que já está com problemas. É o padrão em SDKs de AWS, Google Cloud, etc.',
          },
          {
            question: 'O que faz AbortController?',
            options: [
              'Cancela todos os awaits pendentes',
              'Permite cancelar uma fetch request em andamento passando signal para fetch()',
              'Aborta o Event Loop',
              'Cancela setInterval e setTimeout',
            ],
            correct: 1,
            explanation:
              'AbortController.abort() envia sinal de cancelamento para a fetch. A requisição lança AbortError (ignorável). Essencial para evitar race conditions em buscas.',
          },
          {
            question: 'O que é "for await...of"?',
            options: [
              'Sintaxe alternativa para Promise.all',
              'Loop que itera sobre async iterables — processa cada item conforme chega',
              'Loop com await em cada iteração de array',
              'Equivalente a forEach assíncrono',
            ],
            correct: 1,
            explanation:
              'for await...of consome async generators e streams. Ideal para paginação, processamento de arquivos grandes, ou WebSockets — processa dados conforme chegam sem acumular tudo na memória.',
          },
        ],
      },
  },
  {
    id: 'mod-5-4',
    title: 'Event Loop, Closures e o this em JavaScript',
    duration: '45 min',
    xp: 155,
    content: {
      sections: [
        { type: 'text', content: 'Três conceitos fundamentais cobrados em toda entrevista técnica JS: Closures explicam como callbacks lembram variáveis; o Event Loop explica por que setTimeout(fn, 0) não executa imediatamente; this explica por que código funciona num lugar e quebra em outro. Entendê-los muda como você lê e depura código.' },
        { type: 'code', lang: 'javascript', content: '// ── CLOSURES ─────────────────────────────────────\n// Uma função que captura variáveis do escopo onde foi criada\n\nfunction criarContador(inicio = 0) {\n  let valor = inicio; // variável capturada pela closure\n  return {\n    incrementar() { return ++valor; },\n    decrementar() { return --valor; },\n    resetar()     { valor = inicio; return valor; },\n    get atual()   { return valor; },\n  };\n}\n\nconst c = criarContador(10);\nconsole.log(c.incrementar()); // 11\nconsole.log(c.incrementar()); // 12\nconsole.log(c.atual);         // 12\nc.resetar();\nconsole.log(c.atual);         // 10\n\n// Closure com memoização\nfunction memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) {\n      console.log(\'(cache hit)\', key);\n      return cache.get(key);\n    }\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\nconst fib = memoize(function f(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n});\nconsole.log(fib(10)); // 55' },
        { type: 'code', lang: 'javascript', content: '// ── EVENT LOOP ───────────────────────────────────\n// JS é single-threaded mas usa filas para não bloquear\n\nconsole.log(\'1 - sincrono\');\n\nsetTimeout(() => {\n  console.log(\'3 - macrotask (setTimeout)\');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log(\'2 - microtask (Promise)\');\n});\n\nconsole.log(\'1b - ainda sincrono\');\n// Ordem: 1 -> 1b -> 2 -> 3\n// Microtasks (Promise.then) têm prioridade sobre macrotasks (setTimeout)\n\n// Ordem de prioridade:\n// 1. Call stack (codigo sincrono atual)\n// 2. Microtask queue (Promise.then, queueMicrotask)\n// 3. Macrotask queue (setTimeout, setInterval, I/O)\n\nasync function exemplo() {\n  console.log(\'A\'); // sincrono dentro do async\n  await Promise.resolve();\n  console.log(\'C\'); // retoma apos microtasks\n}\nconsole.log(\'antes\');\nexemplo();\nconsole.log(\'B\'); // sincrono, antes do C\n// Ordem: antes -> A -> B -> C' },
        { type: 'code', lang: 'javascript', content: '// ── this ─────────────────────────────────────────\n// this depende de COMO a funcao e chamada, nao onde e definida\n\nconst obj = {\n  nome: \'DevJourney\',\n  saudar() { return \'Ola de \' + this.nome; },          // this = obj\n  saudarArrow: () => \'this eh: \' + typeof this,        // this = externo\n};\nconsole.log(obj.saudar());       // Ola de DevJourney\nconsole.log(obj.saudarArrow()); // this eh: undefined\n\n// Problema classico: this perdido em callbacks\nclass Timer {\n  constructor() { this.segundos = 0; }\n\n  iniciarErrado() {\n    // funcao normal perde o this\n    setInterval(function() { this.segundos++; }, 1000); // TypeError\n  }\n\n  iniciarCorreto() {\n    // arrow function preserva this lexical\n    setInterval(() => { this.segundos++; }, 1000); // funciona\n  }\n}\n\n// Demonstracao sem setInterval\nconst t = new Timer();\nconst tick = () => { t.segundos++; return t.segundos; };\nconsole.log(tick(), tick(), tick()); // 1 2 3' },
        { type: 'highlight', content: '🎯 Resumo para entrevistas: (1) Closures = funcao que captura variaveis do escopo externo. (2) Event Loop = JS usa filas; microtasks (Promises) têm prioridade sobre macrotasks (setTimeout). (3) this = depende de como a funcao e chamada; arrow functions herdam o this do escopo lexico.' },
        {
          type: 'common_error',
          title: 'var em loops cria closures com valor errado',
          wrong: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Imprime: 3 3 3\n// var e function-scoped: todas as closures compartilham o mesmo i',
          wrongLabel: 'var cria uma unica variavel compartilhada — todas as closures veem o valor final.',
          right: 'for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Imprime: 0 1 2\n// let cria um novo binding por iteracao do loop',
          rightLabel: 'let cria escopo de bloco em cada iteracao — cada closure captura seu proprio i.',
          explanation: 'Este e o exemplo de closure mais classico em entrevistas. A solucao moderna e usar let. A solucao legada era IIFE: (function(i) { setTimeout(...) })(i).',
        },
      ],
      exercise: {
        title: 'Implementar memoize e curry',
        description: 'Implemente: (1) memoize(fn) que cacheia resultados por argumentos usando Map. (2) curry(fn) que transforma f(a,b,c) em f(a)(b)(c) — verifica args.length para saber quando chamar a funcao original.',
        solutionHint: 'memoize: Map com JSON.stringify(args) como chave. curry: se args.length >= fn.length chama fn, senao retorna nova funcao acumulando args.',
        starterCode: 'function memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\nfunction curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn(...args);\n    }\n    return (...mais) => curried(...args, ...mais);\n  };\n}\n\n// Testes memoize\nconst somaLenta = memoize((a, b) => {\n  console.log(\'calculando...\');\n  return a + b;\n});\nconsole.log(somaLenta(2, 3)); // calculando... 5\nconsole.log(somaLenta(2, 3)); // 5 (sem calculando)\nconsole.log(somaLenta(2, 3) === 5); // true\n\n// Testes curry\nconst soma = curry((a, b, c) => a + b + c);\nconsole.log(soma(1)(2)(3)); // 6\nconsole.log(soma(1, 2)(3)); // 6\nconsole.log(soma(1)(2, 3)); // 6\n',
        validate: (output) => output.includes('calculando...') && output.includes('6') && output.includes('true'),
        validateMessage: 'Exiba: calculando... apenas uma vez, resultado 6 para as tres formas de curry, e true.',
      },
      quiz: [
        { question: 'Por que setTimeout(fn, 0) nao executa imediatamente?', options: ['E um bug do JavaScript', 'O callback vai para a macrotask queue e so executa apos a call stack esvaziar e as microtasks rodarem', 'setTimeout tem delay minimo de 4ms', 'Depende do browser'], correct: 1, explanation: 'setTimeout coloca a funcao na macrotask queue. O Event Loop so a processa depois de: (1) a call stack esvaziar e (2) todas as microtasks (Promises) resolverem.' },
        { question: 'O que e uma closure?', options: ['Uma funcao sem retorno', 'Uma funcao que captura variaveis do escopo lexico onde foi criada, mesmo apos esse escopo fechar', 'Uma classe privada', 'Um modulo ES6'], correct: 1, explanation: 'A closure mantem uma referencia ao ambiente onde foi criada. Callbacks e event listeners lembram variaveis da funcao externa por esse mecanismo.' },
        { question: 'Qual tem prioridade no Event Loop: Promise.then ou setTimeout?', options: ['setTimeout (mais antigo)', 'Sao iguais', 'Promise.then (microtask) sempre executa antes de setTimeout (macrotask)', 'Depende da ordem no codigo'], correct: 2, explanation: 'Microtasks (Promise.then) têm prioridade sobre macrotasks (setTimeout). Apos cada macrotask, o event loop drena toda a microtask queue antes de pegar a proxima macrotask.' },
        { question: 'Por que arrow functions nao perdem o this em callbacks?', options: ['Porque nao têm this', 'Porque capturam o this do escopo lexico onde foram definidas, nao do local de chamada', 'Porque usam strict mode automaticamente', 'Porque fazem bind automatico'], correct: 1, explanation: 'Arrow functions nao criam seu proprio this — herdam o this do escopo onde foram escritas. Metodos normais criam um this novo baseado em como sao chamados.' },
        { question: 'O que o currying permite?', options: ['Chamar funcoes assincronas de forma sincrona', 'Transformar funcao de multiplos args em cadeia de funcoes de um arg — permite aplicacao parcial', 'Criar funcoes sem parametros', 'Memoizar resultados automaticamente'], correct: 1, explanation: 'curry(soma)(1)(2)(3) permite criar versoes especializadas: const somarCom10 = soma(10). Muito usado em programacao funcional.' },
      ],
    },
  }

  ,{
    id: 'mp-phase-5',
    title: '🏗️ Mini-Projeto: To-Do List com LocalStorage',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase5,
    content: {
      sections: [
        {
          type: 'text',
          content: 'Construa um gerenciador de tarefas real com persistência no localStorage — arrays, objetos e funções de ordem superior em ação.'
        }
      ]
    }
  }
  ]
};
