import { miniProjectPhase3 } from '../miniprojects.js';
export const phase3 = {
  id: 'phase-3',
  title: 'Git e GitHub',
  phase: 3,
  color: '#f97316',
  icon: '🌿',
  description: 'Controle de versão é obrigatório no mercado. Git registra todo o histórico do código; GitHub permite colaborar. Você vai usar isso em todo projeto.',
  checklist: [
    'Inicializar um repositório e fazer o primeiro commit',
    'Usar git add, git commit e git push corretamente',
    'Criar e alternar entre branches',
    'Abrir um Pull Request no GitHub',
    'Resolver um conflito de merge simples',
    'Escrever mensagens de commit descritivas (Conventional Commits)',
    'Explicar a diferença entre git merge e git rebase',
  ],
  modules: [
    {
      id: 'mod-3-1',
      title: 'Git: Fundamentos e Fluxo Diário',
      duration: '45 min',
      xp: 120,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Git é um sistema de controle de versão distribuído. Ele registra cada mudança no código — quem mudou, o quê, quando e por quê. Sem Git, você trabalharia com pastas "projeto-final", "projeto-final-v2", "projeto-final-ESSE". Com Git, toda essa história é rastreada automaticamente e você pode voltar a qualquer ponto com um comando.'
          },
          {
            type: 'highlight',
            content: '🌿 Os 3 estados do Git: Working Directory (arquivos que você edita) → Staging Area (arquivos prontos para o commit) → Repository (histórico permanente). O ciclo é: editar → git add → git commit. O staging existe para que você escolha exatamente o que vai em cada commit.'
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── CONFIGURAÇÃO INICIAL (uma vez só) ─────────────────\ngit config --global user.name "Seu Nome"\ngit config --global user.email "seu@email.com"\ngit config --global core.editor "code --wait"  # VS Code como editor padrão\ngit config --list  # ver todas as configurações\n\n# ── INICIANDO UM PROJETO ───────────────────────────────\ngit init                    # inicia repositório Git na pasta atual\ngit clone URL               # clonar repositório existente do GitHub\n\n# ── O CICLO DIÁRIO ────────────────────────────────────\ngit status                  # estado atual: o que mudou, o que está staged\ngit diff                    # ver exatamente o que mudou (unstaged)\ngit diff --staged           # ver o que está no staging, prestes a ser commitado\n\ngit add arquivo.js          # adicionar arquivo específico ao staging\ngit add src/                # adicionar pasta inteira\ngit add .                   # adicionar tudo (cuidado: use .gitignore primeiro)\ngit add -p                  # modo interativo: escolher partes do arquivo\n\ngit commit -m "feat: adicionar autenticação com JWT"\ngit commit --amend          # corrigir o último commit (mensagem ou arquivos)\n\n# ── VER O HISTÓRICO ────────────────────────────────────\ngit log                     # histórico completo\ngit log --oneline           # uma linha por commit — muito mais legível\ngit log --oneline --graph   # com diagrama de branches\ngit log --author="Ana"      # commits de uma pessoa específica\ngit show abc1234            # detalhes de um commit específico'
          },
          {
            type: 'text',
            content: 'Mensagens de commit são documentação. Uma boa mensagem explica O QUÊ mudou e POR QUÊ — não o como (o código já mostra o como). O padrão Conventional Commits é amplamente usado na indústria: feat: (nova funcionalidade), fix: (correção de bug), docs: (documentação), refactor: (refatoração sem mudança de comportamento), test: (testes), chore: (configuração, build).'
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── MENSAGENS DE COMMIT — padrão profissional ─────────\n\n# ❌ Mensagens ruins (o que você vai ver em repos de iniciante):\ngit commit -m "fix"\ngit commit -m "arrumei"\ngit commit -m "wip"\ngit commit -m "asjdhasbd"\n\n# ✅ Mensagens boas (Conventional Commits):\ngit commit -m "feat: adicionar página de login com validação"\ngit commit -m "fix: corrigir cálculo de desconto quando carrinho está vazio"\ngit commit -m "refactor: extrair lógica de validação para hook useValidation"\ngit commit -m "docs: atualizar README com instruções de deploy"\ngit commit -m "test: adicionar testes unitários para AuthService"\n\n# ── DESFAZENDO COISAS ──────────────────────────────────\ngit restore arquivo.js          # desfaz mudanças não commitadas em um arquivo\ngit restore .                   # desfaz TUDO que não foi commitado (cuidado!)\ngit restore --staged arquivo.js # remove do staging (mantém as mudanças)\n\ngit revert abc1234              # cria commit que desfaz o commit especificado\n                                # seguro: não apaga história\ngit reset --soft HEAD~1         # desfaz último commit mas mantém mudanças no staging\ngit reset --mixed HEAD~1        # desfaz commit e staging (mudanças ficam no working dir)\ngit reset --hard HEAD~1         # APAGA o commit e as mudanças — irreversível!\n\n# git stash — guardar mudanças temporariamente\ngit stash                       # "empilha" mudanças atuais\ngit stash pop                   # aplica as mudanças empilhadas e remove da pilha\ngit stash list                  # ver o que está guardado\n# Quando usar: você estava no meio de algo e precisa trocar de branch urgente'
          },
          {
            type: 'highlight',
            content: '⚠️ NUNCA force-push em branches compartilhadas (git push --force). Reescreve a história para todos da equipe. Em repositório pessoal ou branch privada: ok. Em main/develop: desastre. Use git revert para desfazer commits em branches públicas.'
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── .gitignore — o que NÃO versionar ─────────────────\n# Crie .gitignore na raiz do projeto ANTES do primeiro commit\n\n# Exemplo de .gitignore para projeto Node.js:\nnode_modules/\n.env\n.env.local\n.env.*.local\ndist/\nbuild/\n.DS_Store\n*.log\ncoverage/\n.vscode/settings.json\n\n# Verificar se um arquivo está sendo ignorado:\ngit check-ignore -v node_modules/  # mostra qual regra ignora\n\n# Remover arquivo que já foi commitado por engano:\ngit rm --cached .env               # remove do tracking mas mantém o arquivo local\ngit commit -m "chore: remover .env do repositório"'
          }
        ],
        exercise: {
          title: 'Simulando o fluxo Git',
          description: 'Complete a função que simula comandos Git. Dado o estado atual do repositório, retorne a sequência correta de comandos para cada cenário.',
                    solutionHint: 'init cria o repositório vazio. add move arquivos para staging. commit salva um snapshot. push envia para o remoto.',
starterCode: `function sequenciaGit(cenario) {
  if (cenario === 'commit inicial') {
    return ['git init', 'git add .', 'git commit -m "feat: commit inicial"'];
  }
  if (cenario === 'guardar mudanças temporariamente') {
    return [______]; // array com 1 comando
  }
  if (cenario === 'desfazer ultimo commit mantendo mudanças') {
    return [______]; // array com 1 comando
  }
  if (cenario === 'ver histórico resumido') {
    return [______]; // array com 1 comando
  }
  return [];
}

// Testes
const casos = [
  'guardar mudanças temporariamente',
  'desfazer ultimo commit mantendo mudanças',
  'ver histórico resumido'
];

for (const caso of casos) {
  const cmds = sequenciaGit(caso);
  console.log(caso + ": " + cmds.join(", "));
}`,
          solutionHint: "git stash | git reset --soft HEAD~1 | git log --oneline",
          validate: (output, code) => {
            return output.includes('git stash') &&
              output.includes('git reset --soft HEAD~1') &&
              output.includes('git log --oneline');
          },
          validateMessage: 'Os comandos devem incluir: git stash, git reset --soft HEAD~1, git log --oneline.'
        },
        quiz: [
          { question: 'O que é a Staging Area no Git?', options: ['O servidor remoto', 'Uma área onde você prepara exatamente o que vai no próximo commit', 'O histórico de commits', 'Uma branch especial'], correct: 1, explanation: 'Staging (ou index) é uma área intermediária entre o working directory e o repositório. Permite criar commits precisos, escolhendo exatamente quais mudanças incluir.' },
          { question: 'Qual a diferença entre git revert e git reset --hard?', options: ['São idênticos', 'revert cria novo commit que desfaz; reset --hard apaga história (perigoso)', 'reset é mais moderno', 'revert só funciona com arquivos'], correct: 1, explanation: 'revert: cria commit de desfazimento — seguro, preserva história. reset --hard: apaga commits e mudanças — perigoso em branches compartilhadas.' },
          { question: 'Para que serve o git stash?', options: ['Deletar commits', 'Guardar mudanças temporariamente para trocar de contexto', 'Sincronizar com GitHub', 'Criar uma branch nova'], correct: 1, explanation: 'stash empilha suas mudanças não commitadas. Útil quando você precisa trocar de branch urgente mas não quer fazer commit de código incompleto.' },
          { question: 'Por que o arquivo .env deve estar no .gitignore?', options: ['Por ser muito grande', 'Contém senhas e chaves secretas — commitá-lo expõe segredos publicamente', 'Git não suporta esse formato', 'Por convenção apenas'], correct: 1, explanation: 'Se .env for para o GitHub (mesmo repo privado), qualquer pessoa com acesso vê suas senhas. Segredos expostos podem ser usados maliciosamente e são difíceis de revogar.' },
          { question: 'O que é o padrão Conventional Commits?', options: ['Commitar todo dia', 'Convenção de mensagens: feat:, fix:, docs:, etc. — facilita changelog automático', 'Commits pequenos e frequentes', 'Commits com aprovação da equipe'], correct: 1, explanation: 'Conventional Commits padroniza mensagens para que ferramentas possam: gerar changelog automaticamente, determinar versão semântica (semver), filtrar histórico por tipo.' },
        ]
      }
    },
    {
      id: 'mod-3-2',
      title: 'Branches, Merge e Resolução de Conflitos',
      duration: '45 min',
      xp: 130,
      content: {
        sections: [
          {
            type: 'text',
            content: 'Branches (ramificações) permitem que você e sua equipe trabalhem em funcionalidades diferentes ao mesmo tempo sem interferir uns nos outros. Cada feature, bugfix ou experimento vive na sua própria branch. Quando pronto, você mescla (merge) de volta para a branch principal. Esse é o fluxo de trabalho em 100% das empresas que usam Git.'
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── BRANCHES — CRIAR E NAVEGAR ────────────────────────\ngit branch                        # listar branches locais\ngit branch -a                     # listar todas (locais e remotas)\n\ngit checkout -b feature/login     # criar E entrar na branch (forma antiga)\ngit switch -c feature/login       # criar E entrar (forma moderna — use esta)\ngit switch main                   # voltar para main\n\ngit branch -d feature/login       # deletar branch (seguro — só deleta se já mergeou)\ngit branch -D feature/login       # forçar deleção (perigoso — perde commits não mergeados)\n\n# ── MERGE — JUNTAR BRANCHES ───────────────────────────\ngit switch main                   # vá para a branch destino\ngit merge feature/login           # traz as mudanças de feature/login para main\n\n# Tipos de merge:\n# Fast-forward: sem divergência — Git apenas move o ponteiro da branch\n# 3-way merge: branches divergiram — Git cria commit de merge\ngit merge --no-ff feature/login   # força commit de merge mesmo em fast-forward\n                                  # --no-ff preserva o histórico da branch na linha do tempo\n\n# ── REBASE — ALTERNATIVA AO MERGE ─────────────────────\n# Rebase "replanta" seus commits sobre outra branch\n# Resultado: histórico linear (sem bifurcações), mais limpo\ngit switch feature/login\ngit rebase main                   # replanta feature/login sobre a versão atual do main\n\n# Quando usar cada um:\n# merge: para integrar branches de feature na main (preserva contexto)\n# rebase: para atualizar sua branch com novidades do main (mantém histórico limpo)'
          },
          {
            type: 'text',
            content: 'Conflitos de merge acontecem quando duas branches modificaram a mesma linha do mesmo arquivo. Git não sabe qual versão manter — ele marca o conflito e espera que você decida. Resolver conflitos com calma é uma habilidade essencial. A maioria dos conflitos é simples de resolver quando você entende o que cada lado modificou.'
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── RESOLVENDO CONFLITOS ──────────────────────────────\n# Quando ocorre um conflito, Git marca o arquivo assim:\n\n# <<<<<<< HEAD (sua branch atual)\n# const titulo = "Meu App";\n# =======\n# const titulo = "Minha Aplicação";\n# >>>>>>> feature/renomear-titulo\n\n# Para resolver:\n# 1. Abra o arquivo conflitado no editor\n# 2. Escolha qual versão manter (ou combine as duas)\n# 3. Remova as marcações <<<<<<<, =======, >>>>>>>\n# 4. git add arquivo-resolvido.js\n# 5. git commit (Git sugere mensagem de merge)\n\n# VS Code tem interface visual para conflitos:\n# Mostra "Accept Current", "Accept Incoming", "Accept Both"\n\n# Ver quais arquivos têm conflito:\ngit status  # arquivos com "both modified" têm conflito\n\n# Abortar o merge se as coisas ficaram ruins:\ngit merge --abort  # volta ao estado antes do merge\n\n# ── GIT LOG — ENTENDENDO O HISTÓRICO VISUAL ───────────\ngit log --oneline --graph --all\n# Exemplo de saída:\n# * 3f2a1b9 (HEAD -> main, origin/main) fix: corrigir validação\n# *   a1b2c3d Merge branch "feature/pagamento"\n# |\\  \n# | * 7d8e9f0 feat: adicionar checkout com Pix\n# | * 2c3d4e5 feat: integrar gateway de pagamento\n# |/  \n# * 1a2b3c4 feat: adicionar carrinho de compras'
          },
          {
            type: 'highlight',
            content: '🔀 Git Flow — o workflow mais usado em empresas: main (produção — nunca commite direto), develop (integração), feature/* (funcionalidades), hotfix/* (bugs urgentes em produção), release/* (preparação de versão). Alternativa mais simples: GitHub Flow — só main + feature branches, merge via Pull Request.'
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── WORKFLOW TÍPICO DE UMA FEATURE ───────────────────\n\n# 1. Sempre comece do main atualizado\ngit switch main\ngit pull origin main\n\n# 2. Crie uma branch com nome descritivo\ngit switch -c feature/autenticacao-google\n\n# 3. Trabalhe: commits pequenos e descritivos\ngit add src/auth/google.js\ngit commit -m "feat: adicionar configuração OAuth Google"\ngit add src/routes/auth.js\ngit commit -m "feat: criar rotas de callback OAuth"\ngit add tests/auth.test.js\ngit commit -m "test: adicionar testes para fluxo OAuth"\n\n# 4. Mantenha sua branch atualizada com o main\ngit fetch origin\ngit rebase origin/main  # ou: git merge origin/main\n\n# 5. Envie para o GitHub e abra Pull Request\ngit push origin feature/autenticacao-google\n# → GitHub: New Pull Request\n\n# 6. Após aprovação e merge, limpe\ngit switch main\ngit pull origin main\ngit branch -d feature/autenticacao-google'
          }
        ,
                  {
                    type: 'common_error',
                    title: 'Dar git push diretamente na branch main',
                    wrong: `# Fluxo errado:
git checkout main
git add .
git commit -m "nova feature"
git push origin main  # Pusha direto na main!`,
                    wrongLabel: 'Push direto na main = sem revisão, sem histórico organizado, conflitos.',
                    right: `# Fluxo correto com branches:
git checkout -b feature/login  # Nova branch
git add .
git commit -m "feat: adiciona tela de login"
git push origin feature/login
# Abre Pull Request → revisão → merge`,
                    rightLabel: 'Branches isolam trabalho. PR permite revisão antes de entrar na main.',
                    explanation: 'A main deve ser sempre estável e deployável. Desenvolva em branches separadas (feature/, fix/, chore/), abra um Pull Request para revisão, e só então faça merge na main.',
                  }],
        exercise: {
          title: 'Diagnóstico de cenários Git',
          description: 'Implemente a função diagnosticarSituacao que recebe uma descrição de situação e retorna o comando Git mais adequado para aquela situação.',
                    solutionHint: 'merge une branches criando um commit de merge. rebase reaplica commits em cima de outra branch. reset --hard descarta mudanças permanentemente.',
starterCode: `function diagnosticarSituacao(situacao) {
  const solucoes = {
    "preciso criar branch para nova feature login": ______,
    "terminei a feature, preciso juntar com main": ______,
    "dois devs editaram o mesmo arquivo, git parou": ______,
    "preciso atualizar minha branch com novidades do main": ______,
    "enviar branch para github pela primeira vez": ______,
  };
  return solucoes[situacao] || "situação desconhecida";
}

const situacoes = Object.keys({
  "preciso criar branch para nova feature login": "",
  "terminei a feature, preciso juntar com main": "",
  "dois devs editaram o mesmo arquivo, git parou": "",
  "preciso atualizar minha branch com novidades do main": "",
  "enviar branch para github pela primeira vez": "",
});

for (const s of situacoes) {
  console.log(s.substring(0, 30) + "... →", diagnosticarSituacao(s));
}`,
          solutionHint: "git switch -c feature/login | git merge feature/login | git merge --abort (ou resolver o conflito) | git rebase main | git push -u origin feature/login",
          validate: (output, code) => {
            return output.includes('switch -c') &&
              output.includes('merge') &&
              output.includes('rebase') &&
              output.includes('push');
          },
          validateMessage: 'Os comandos devem incluir: switch -c, merge, rebase e push.'
        },
        quiz: [
          { question: 'Por que usar branches em vez de commitar direto na main?', options: ['Branches são obrigatórias no Git', 'Isola trabalho em progresso — main sempre fica estável e deployável', 'Branches são mais rápidas', 'É só uma convenção opcional'], correct: 1, explanation: 'main/master é a branch de produção — deve estar sempre funcional. Features isoladas em branches permitem: revisão de código, testes, rollback fácil, múltiplos devs sem conflito.' },
          { question: 'O que acontece durante um conflito de merge?', options: ['Git escolhe automaticamente a versão mais nova', 'Git marca os arquivos conflitados e para — você decide o que manter', 'O merge é cancelado permanentemente', 'Git pede para um dos commits ser apagado'], correct: 1, explanation: 'Git não arbitra: quando duas branches modificaram as mesmas linhas, ele marca o conflito com <<<<<<, ======= e >>>>>> e aguarda você resolver manualmente.' },
          { question: 'Qual a diferença entre merge e rebase?', options: ['São idênticos no resultado', 'merge preserva a história de bifurcação; rebase cria histórico linear', 'rebase é mais seguro', 'merge é somente para conflitos'], correct: 1, explanation: 'merge: cria commit de merge, preserva que as branches existiram. rebase: "replanta" commits — histórico fica linear como se nunca houvesse branch. Nunca faça rebase de branches públicas compartilhadas.' },
          { question: 'Para que serve git stash?', options: ['Deletar commits temporariamente', 'Guardar mudanças não commitadas para trocar de contexto', 'Criar backup do repositório', 'Sincronizar com remoto'], correct: 1, explanation: 'stash empilha suas mudanças (working dir + staging) sem commitá-las. Você pode trocar de branch, resolver algo urgente, e depois git stash pop para recuperar.' },
          { question: 'O que é fast-forward merge?', options: ['Um merge muito rápido', 'Quando a branch alvo não divergiu — Git apenas move o ponteiro, sem commit de merge', 'Um merge com conflito resolvido automaticamente', 'Merge de hotfix'], correct: 1, explanation: 'Fast-forward: a branch de origem tem commits que a destino não tem, mas não houve commits novos na destino. Git simplesmente avança o ponteiro — sem commit de merge.' },
        ]
      }
    },
    {
      id: 'mod-3-3',
      title: 'GitHub: Pull Requests e Colaboração',
      duration: '40 min',
      xp: 130,
      content: {
        sections: [
          {
            type: 'text',
            content: 'GitHub é onde a colaboração acontece. Pull Requests (PRs) são o coração do fluxo de trabalho em equipe: você propõe mudanças, a equipe revisa, discute e aprova antes de mergear. Code review via PR captura bugs, distribui conhecimento e mantém padrões de qualidade — é onde muito do aprendizado acontece em times profissionais.'
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── CONECTANDO AO GITHUB ──────────────────────────────\n\n# 1. Configure SSH (recomendado — não pede senha toda vez)\n# Gerar chave SSH:\nssh-keygen -t ed25519 -C "seu@email.com"\n# Copie a chave pública:\ncat ~/.ssh/id_ed25519.pub\n# Cole em: GitHub → Settings → SSH and GPG keys → New SSH key\n\n# Verificar conexão:\nssh -T git@github.com  # deve dizer "Hi seunome! You have authenticated"\n\n# 2. Ou use HTTPS com Personal Access Token\n# GitHub → Settings → Developer Settings → Personal Access Tokens\n# Use o token como senha ao fazer push\n\n# ── REMOTES — REPOSITÓRIOS REMOTOS ────────────────────\ngit remote -v                          # ver remotes configurados\ngit remote add origin git@github.com:usuario/repo.git  # adicionar remote\ngit remote rename origin upstream      # renomear (útil em forks)\n\n# ── SINCRONIZANDO ─────────────────────────────────────\ngit fetch origin          # baixa novidades sem aplicar no working dir\ngit pull origin main      # fetch + merge (ou fetch + rebase com --rebase)\ngit push origin main      # enviar commits locais para GitHub\ngit push -u origin feature/minha-feature  # -u: configura upstream, facilita próximos pushes'
          },
          {
            type: 'text',
            content: 'Um Pull Request de qualidade tem: título claro no padrão Conventional Commits, descrição explicando o que mudou e por quê, screenshots se mudou UI, link para a issue relacionada, lista de como testar. A descrição é documentação — alguém vai ler daqui a 6 meses tentando entender por que essa mudança foi feita.'
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── WORKFLOW COMPLETO COM PR ──────────────────────────\n\n# 1. Fork e clone (para projetos de terceiros)\ngit clone git@github.com:SEUNOME/projeto.git\ngit remote add upstream git@github.com:ORIGINAL/projeto.git\n\n# 2. Mantenha seu fork sincronizado\ngit fetch upstream\ngit merge upstream/main\ngit push origin main\n\n# 3. Feature branch\ngit switch -c fix/bug-calculo-desconto\n# ... faça commits ...\ngit push -u origin fix/bug-calculo-desconto\n\n# 4. Pull Request — no GitHub:\n# - Título: "fix: corrigir cálculo de desconto quando valor é zero"\n# - Descrição:\n#   ## Problema\n#   O cálculo de desconto retornava NaN quando o valor era 0.\n#   \n#   ## Solução\n#   Adicionei verificação no início da função para retornar 0 diretamente.\n#   \n#   ## Como testar\n#   1. Adicione produto ao carrinho\n#   2. Aplique cupom DESCONTO100 (100%)\n#   3. Verifique que total é R$ 0,00 (antes era NaN)\n#   \n#   Fixes #42\n\n# ── APÓS MERGE DO PR ──────────────────────────────────\ngit switch main\ngit pull origin main           # atualiza main local com o merge\ngit branch -d fix/bug-calculo-desconto  # deleta branch local\ngit push origin --delete fix/bug-calculo-desconto  # deleta no remote\n\n# ── FAZENDO CODE REVIEW ───────────────────────────────\n# No GitHub, ao revisar um PR:\n# - Comente nas linhas específicas (não no PR todo)\n# - Seja específico: "Essa função pode ser simplificada para X por causa de Y"\n# - Diferencie bloqueador de sugestão: "bloqueador: isso vai causar X" vs "sugestão: talvez..."\n# - Aprove com "LGTM" (Looks Good To Me) quando estiver pronto'
          },
          {
            type: 'highlight',
            content: '👥 Etiqueta de code review: critique o código, nunca a pessoa. "Esta função poderia..." em vez de "você fez errado...". Seja específico e explique o raciocínio. Responda todos os comentários. Em dúvida, abra uma conversa — resolver dúvida em PR é mais eficiente que descobrir o problema em produção.'
          },
          {
            type: 'code',
            lang: 'bash',
            content: '# ── ISSUES E PROJETOS ────────────────────────────────\n# Issues são tarefas, bugs ou discussões — use para tudo!\n\n# Referenciar issue num commit:\ngit commit -m "fix: corrigir login com Google (#42)"\n# GitHub automaticamente vincula o commit à issue #42\n\n# Fechar issue automaticamente via PR:\n# Na descrição do PR: "Fixes #42" ou "Closes #42"\n# Quando o PR for mergeado, a issue fecha automaticamente\n\n# ── GITHUB ACTIONS — CI/CD BÁSICO ────────────────────\n# .github/workflows/ci.yml — roda testes a cada Push/PR\n# name: CI\n# on: [push, pull_request]\n# jobs:\n#   test:\n#     runs-on: ubuntu-latest\n#     steps:\n#       - uses: actions/checkout@v4\n#       - uses: actions/setup-node@v4\n#         with: { node-version: 20 }\n#       - run: npm ci\n#       - run: npm test\n#       - run: npm run build\n\n# ── GITIGNORE.IO ─────────────────────────────────────\n# Gere .gitignore automático em: gitignore.io\n# Ex: Node, macOS, Windows, VSCode, JetBrains'
          }
        ],
        exercise: {
          title: 'Construindo comandos de workflow remoto',
          description: 'Complete a função que retorna a sequência de comandos para cada etapa de um workflow Git com GitHub.',
                    solutionHint: 'git push origin nome-da-branch. Para PR: push seguido de criar PR na interface. git pull = fetch + merge.',
starterCode: `function workflowComando(etapa) {
  const fluxo = {
    "clonar repositório": ["git clone git@github.com:empresa/projeto.git"],
    "adicionar remote origin": [______],
    "enviar branch nova para github": [______],
    "baixar mudanças do main sem aplicar": [______],
    "atualizar main local após merge do PR": [______],
  };
  return fluxo[etapa] || [];
}

const etapas = [
  "adicionar remote origin",
  "enviar branch nova para github",
  "baixar mudanças do main sem aplicar",
  "atualizar main local após merge do PR"
];

for (const etapa of etapas) {
  console.log(etapa + ":");
  console.log(" →", workflowComando(etapa).join(" && "));
}`,
          solutionHint: "git remote add origin URL | git push -u origin feature/nome | git fetch origin | git pull origin main",
          validate: (output, code) => {
            return output.includes('remote add') &&
              output.includes('push') &&
              output.includes('fetch') &&
              output.includes('pull');
          },
          validateMessage: 'Os comandos devem incluir: remote add, push, fetch e pull.'
        },
        quiz: [
          { question: 'O que é um Pull Request?', options: ['Puxar código do remoto', 'Proposta de merge de uma branch para outra, com revisão', 'Um tipo especial de commit', 'Uma forma de fazer fork'], correct: 1, explanation: 'Pull Request (PR) ou Merge Request (GitLab) é uma proposta para integrar mudanças. Permite code review, discussão, aprovação e integração controlada antes de ir para produção.' },
          { question: 'Qual a diferença entre git fetch e git pull?', options: ['São idênticos', 'fetch baixa sem aplicar; pull = fetch + merge automático', 'pull é mais seguro', 'fetch só funciona com SSH'], correct: 1, explanation: 'git fetch: traz novidades do remote para refs remotas locais, sem tocar no working dir. git pull: fetch + merge/rebase. Use fetch + manual merge quando quer controle total.' },
          { question: 'Por que usar SSH em vez de HTTPS para o GitHub?', options: ['SSH é mais rápido', 'SSH não pede senha a cada push — autenticação automática via chave', 'HTTPS não funciona com GitHub', 'SSH é mais seguro para repos públicos'], correct: 1, explanation: 'SSH usa par de chaves: você registra a pública no GitHub, a privada fica na sua máquina. Autenticação automática. Com HTTPS, você precisa de Personal Access Token a cada push.' },
          { question: 'Como fechar uma issue automaticamente via PR?', options: ['Adicionar "issue: #42" na branch', 'Incluir "Fixes #42" ou "Closes #42" na descrição do PR', 'Fazer git close #42', 'Apagar a issue manualmente após merge'], correct: 1, explanation: 'GitHub reconhece palavras-chave na descrição do PR: Fixes, Closes, Resolves seguido de #número. Quando o PR é mergeado na branch padrão, a issue fecha automaticamente.' },
          { question: 'O que é um fork no GitHub?', options: ['Uma cópia de um commit', 'Uma cópia do repositório na sua conta — permite contribuir sem ter acesso ao original', 'Uma branch especial', 'Um alias para um repositório'], correct: 1, explanation: 'Fork: cópia do repo na sua conta. Você tem acesso total à sua cópia. Contribuições: fork → clone → branch → PR para o original. Padrão para open source.' },
        ]
      }
    },  ,{
    id: 'mod-3-4',
    title: 'Git Workflow em Time: Trunk-based, PRs e Boas Práticas',
    duration: '40 min',
    xp: 135,
    content: {
      sections: [
        { type: 'text', content: 'Saber Git individualmente e saber Git em time são habilidades diferentes. No primeiro emprego, você vai descobrir que o repositório tem regras, o histórico importa, e um PR mal descrito é código que demora semanas para ser revisado. Trunk-based development, PRs que passam no code review e commits que contam a história do projeto — isso é o que separa dev que entrega de dev que cria trabalho para os outros.' },
        { type: 'code', lang: 'bash', content: '# ── TRUNK-BASED DEVELOPMENT ──────────────────────────\n# A estratégia usada por Google, Meta, Nubank, iFood\n# Regra: branches vivem no máximo 1-2 dias. Commits pequenos e frequentes.\n\n# Fluxo diário:\ngit checkout main\ngit pull origin main                    # sempre sincronize primeiro\ngit checkout -b feat/adicionar-paginacao # branch descritiva\n\n# Trabalhe — commits pequenos e frequentes\ngit add src/hooks/usePagination.js\ngit commit -m \'feat(pagination): add usePagination hook\'\ngit add src/components/Pagination.jsx\ngit commit -m \'feat(pagination): add Pagination component\'\ngit add src/pages/Produtos.jsx\ngit commit -m \'feat(pagination): integrate pagination in Produtos page\'\n\n# Antes de abrir o PR: rebase para histórico limpo\ngit fetch origin\ngit rebase origin/main                 # reaplica seus commits em cima do main\n# Se houver conflitos: resolva, git add, git rebase --continue\n\n# Abra o PR — branch tem no máximo 200 linhas mudadas\ngit push origin feat/adicionar-paginacao\n\n# ── GITFLOW (alternativa, equipes maiores) ─────────────\n# main: produção\n# develop: integração\n# feature/x: funcionalidades\n# release/1.2: preparação de versão\n# hotfix/x: correções urgentes em produção' },
        { type: 'code', lang: 'markdown', content: '# ── PR DESCRIPTION QUE PASSA NO CODE REVIEW ──────────\n\n## O que mudou\nAdicionei paginação cursor-based na listagem de produtos.\nAntes: todos os produtos eram retornados de uma vez (~10s).\nDepois: 20 por página, com cursor para a próxima página (<200ms).\n\n## Por que dessa forma\nEscolhi cursor-based em vez de offset porque:\n- Offset tem problema com inserções simultâneas (itens pulados/duplicados)\n- Cursor é O(log n) com índice; offset é O(n)\n\n## Como testar\n1. `npm run dev`\n2. Acesse /produtos\n3. Role até o final — próxima página carrega automaticamente\n4. Teste com rede lenta (DevTools > Network > Slow 3G)\n\n## Checklist\n- [x] Testes unitários adicionados (usePagination.test.ts)\n- [x] Teste de integração (GET /api/produtos?cursor=xxx)\n- [x] Sem regressões (npm test passou)\n- [x] Documentação atualizada (README.md)\n\n## Screenshots\n[imagem antes] → [imagem depois]' },
        { type: 'code', lang: 'bash', content: '# ── CONVENTIONAL COMMITS (padrão de mercado) ──────────\n# Formato: tipo(escopo): descrição\n# Tipos: feat, fix, docs, style, refactor, test, chore, perf\n\n# ✅ Commits que contam a história:\ngit commit -m \'feat(auth): add Google OAuth login\'\ngit commit -m \'fix(cart): prevent duplicate items on rapid click\'\ngit commit -m \'perf(images): lazy load below-fold images\'\ngit commit -m \'test(payment): add edge case for expired card\'\ngit commit -m \'chore(deps): update vitest to 1.6.0\'\n\n# ❌ Commits que não dizem nada:\ngit commit -m \'fix bug\'\ngit commit -m \'changes\'\ngit commit -m \'wip\'\ngit commit -m \'update\'\n\n# ── GIT BISECT: encontrar o commit que quebrou algo ────\ngit bisect start\ngit bisect bad                    # commit atual está quebrado\ngit bisect good v1.2.0            # este estava ok\n# Git escolhe commit no meio automaticamente\n# Teste se está quebrado:\ngit bisect good  # ou: git bisect bad\n# Repita até encontrar o commit exato\ngit bisect reset  # volta ao HEAD\n\n# ── SQUASH: limpar histórico antes do merge ────────────\ngit rebase -i HEAD~4  # combinar últimos 4 commits\n# No editor: s (squash) nos commits que quer combinar\n# pick abc feat: add pagination hook\n# s   def feat: fix hook edge case\n# s   ghi feat: add tests\n# s   jkl feat: update docs' },
        { type: 'highlight', content: '🔑 Regra de ouro do PR em time profissional: PR pequeno = revisão rápida = feedback rápido = feature entregue rápido. PR grande (>400 linhas) = revisor procrastina = fica aberto uma semana = conflitos com main = retrabalho. Se sua tarefa vai gerar >400 linhas, quebre em PRs menores e sequenciais.' },
        {
          type: 'common_error',
          title: 'Commitar tudo junto num único commit ao final do dia',
          wrong: '# Trabalhou o dia inteiro e...\\ngit add .\\ngit commit -m \'implementar dashboard\'\\n# 1 commit com 847 linhas em 23 arquivos\\n# Impossivel de reverter parte',
          wrongLabel: 'Mega-commits sao impossiveis de revisar, reverter parcialmente e debugar com git bisect.',
          right: '# Commits atomicos ao longo do dia:\\ngit commit -m \'feat(dashboard): add StatCard\'\\ngit commit -m \'feat(dashboard): add chart\'\\ngit commit -m \'test(dashboard): add unit tests\'\\n# Cada commit revertivel independentemente',
          rightLabel: 'Commits atomicos: cada um faz uma coisa e pode ser revertido sem afetar o resto.',
          explanation: 'git bisect bisecta o historico. Commits atomicos = encontra o bug em log2(n) testes. Mega-commits = impossivel reverter so aquela mudanca.',        },
      ],
      exercise: {
        title: 'Formatar mensagens de commit e analisar PRs',
        description: 'Implemente: (1) parseCommit(msg) que valida e parseia uma mensagem conventional commit, retornando {valid, tipo, escopo, descricao, breaking}. (2) avaliarPR(linhas, commits, temTestes, temDescricao) que retorna uma nota de 0-10 e lista de melhorias.',
        solutionHint: 'parseCommit: regex /^(feat|fix|docs|style|refactor|test|chore|perf)(\\(\\w+\\))?(!)?:\\s(.+)$/. avaliarPR: desconte por PR grande (>300 linhas), sem testes, sem descrição, poucos commits.',
        starterCode: 'function parseCommit(msg) {\n  const regex = /^(feat|fix|docs|style|refactor|test|chore|perf)(\\([\\w-]+\\))?(!)?: (.+)$/;\n  const match = msg.match(regex);\n  if (!match) return { valid: false, erro: \'Formato invalido. Use: tipo(escopo): descricao\' };\n  return {\n    valid: true,\n    tipo: match[1],\n    escopo: match[2] ? match[2].slice(1, -1) : null,\n    breaking: !!match[3],\n    descricao: match[4],\n  };\n}\n\nfunction avaliarPR({ linhas, commits, temTestes, temDescricao, temScreenshot }) {\n  let nota = 10;\n  const melhorias = [];\n\n  if (linhas > 400) { nota -= 3; melhorias.push(\'PR muito grande (>400 linhas) — quebre em PRs menores\'); }\n  else if (linhas > 200) { nota -= 1; melhorias.push(\'PR grande (>200 linhas) — considere dividir\'); }\n\n  if (!temTestes) { nota -= 2; melhorias.push(\'Adicione testes para as mudancas\'); }\n  if (!temDescricao) { nota -= 2; melhorias.push(\'Descreva: o que mudou, por que, como testar\'); }\n  if (commits < 2 && linhas > 100) { nota -= 1; melhorias.push(\'Use commits atomicos — um por mudanca logica\'); }\n  if (!temScreenshot && linhas > 50) melhorias.push(\'Screenshot ou video ajuda o revisor a entender o resultado visual\');\n\n  return { nota: Math.max(0, nota), melhorias };\n}\n\n// Testes parseCommit\nconsole.log(parseCommit(\'feat(auth): add Google OAuth login\'));       // valid, feat, auth\nconsole.log(parseCommit(\'fix!: corrigir calculo de desconto\'));         // valid, breaking\nconsole.log(parseCommit(\'update coisa\'));                               // invalid\n\n// Testes avaliarPR\nconst pr1 = avaliarPR({ linhas: 600, commits: 1, temTestes: false, temDescricao: false });\nconsole.log(\'PR ruim — nota:\', pr1.nota, \'melhorias:\', pr1.melhorias.length);\n\nconst pr2 = avaliarPR({ linhas: 80, commits: 3, temTestes: true, temDescricao: true, temScreenshot: true });\nconsole.log(\'PR bom — nota:\', pr2.nota, \'melhorias:\', pr2.melhorias.length);\n',
        validate: (output) => output.includes('valid') && output.includes('breaking') && output.includes('invalid') && output.includes('PR ruim') && output.includes('PR bom'),
        validateMessage: 'Exiba: commit válido com breaking, commit inválido, nota do PR ruim e do PR bom.',
      },
      quiz: [
        { question: 'O que é trunk-based development?', options: ['Desenvolver só na branch main', 'Estratégia de branches curtas (máx 1-2 dias) que se integram frequentemente ao tronco principal', 'Desenvolver sem branches', 'Uma ferramenta de Git'], correct: 1, explanation: 'Trunk-based: branches vivem pouco (horas a dias), commits pequenos e frequentes. Resultado: menos conflitos, integração contínua real, feedback mais rápido. Alternativa ao Gitflow com branches longas.' },
        { question: 'Por que PR pequeno é melhor que PR grande?', options: ['Menor PR tem menos bugs', 'PR pequeno é revisado rapidamente, tem contexto claro e gera feedback útil. PR grande é adiado, revisado superficialmente.', 'PR pequeno passa mais rápido nos testes', 'Não faz diferença'], correct: 1, explanation: 'Psicologia de code review: revisor com PR de 50 linhas foca e comenta. PR de 800 linhas: "LGTM" após 10 minutos. PRs pequenos = mais qualidade real de revisão = menos bugs em produção.' },
        { question: 'O que é git bisect?', options: ['Dividir o repositório em dois', 'Busca binária no histórico de commits para encontrar o commit que introduziu um bug', 'Mesclar duas branches', 'Comparar duas versões'], correct: 1, explanation: 'git bisect start, git bisect bad (atual), git bisect good (versão boa). Git vai para o commit no meio. Você testa. Repete. Em log2(n) testes encontra o commit exato. Para 100 commits: 7 testes.' },
        { question: 'Para que serve o git rebase antes de abrir um PR?', options: ['Para criar uma nova branch', 'Para reaplica seus commits em cima do main atualizado — historico linear, sem merge commit', 'Para juntar todos os commits em um', 'Para reverter mudancas'], correct: 1, explanation: 'git rebase origin/main move seus commits para cima dos commits mais recentes do main. Resultado: historico linear, sem commits de merge desnecessários, e conflitos resolvidos antes da revisão.' },
        { question: 'O que sao Conventional Commits?', options: ['Commits com mensagens longas', 'Padrao de formato: tipo(escopo): descricao — permite gerar changelog automatico e entender o historico', 'Commits aprovados pelo tech lead', 'Commits na branch main'], correct: 1, explanation: 'feat, fix, docs, refactor, test, chore, perf — tipos com significado. Ferramentas como semantic-release usam conventional commits para versionar automaticamente e gerar changelog. Padrao adotado por Angular, Vue, React.' },
      ],
    },
  }

,{
    id: 'mp-phase-3',
    title: '🏗️ Mini-Projeto: Simulador Visual de Git',
    duration: '60 min',
    xp: 200,
    isMiniProject: true,
    miniProject: miniProjectPhase3,
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
