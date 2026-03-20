// ── Mini-projetos guiados por fase ───────────────────────────────────────────
// Cada mini-projeto tem etapas progressivas com preview ao vivo.
// O aluno completa lacunas — o resultado é algo utilizável, não só console.log.

// ── FASE 1 — Fundamentos: Calculadora de IMC ─────────────────────────────────
export const miniProjectPhase1 = {
  id: 'mp-phase-1',
  title: 'Calculadora de IMC',
  description: 'Construa uma calculadora de IMC (Índice de Massa Corporal) funcional com HTML, CSS e JavaScript puro. Ao fim, você terá uma ferramenta real que calcula e classifica o IMC de qualquer pessoa.',
  steps: [
    {
      title: 'Estrutura HTML',
      type: 'html',
      description: 'Primeiro o esqueleto: crie o formulário com os campos de peso e altura, e uma área para mostrar o resultado.',
      context: 'Complete as lacunas marcadas com ___ para criar os elementos corretos.',
      hint: 'Use <input type="number"> para os campos numéricos. O botão deve ser <button type="button"> para não submeter o form.',
      starterCode: `<div class="card">
  <h1>Calculadora de IMC</h1>

  <div class="field">
    <label for="peso">Peso (kg)</label>
    <___ type="number" id="peso" placeholder="Ex: 70" min="1" max="300">
  </div>

  <div class="field">
    <label for="altura">Altura (m)</label>
    <___ type="number" id="altura" placeholder="Ex: 1.75" min="0.5" max="2.5" step="0.01">
  </div>

  <___ type="button" id="btn-calcular">Calcular IMC</___ >

  <div id="resultado" class="resultado hidden">
    <span id="valor-imc"></span>
    <span id="classificacao"></span>
  </div>
</div>`,
      baseHtml: `<div class="card"><h1>Calculadora de IMC</h1><div class="field"><label>Peso</label><input type="number" placeholder="Ex: 70"></div><div class="field"><label>Altura</label><input type="number" placeholder="Ex: 1.75" step="0.01"></div><button type="button">Calcular IMC</button><div class="resultado" style="margin-top:12px;color:#16a34a;font-weight:600">Resultado aparecerá aqui</div></div>`,
      baseCss: `.card{max-width:340px;margin:0 auto;padding:28px;border-radius:16px;background:#f8fafc;box-shadow:0 4px 24px rgba(0,0,0,.08)}.card h1{font-size:20px;font-weight:800;margin-bottom:20px;color:#1e293b}.field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}label{font-size:13px;font-weight:600;color:#475569}input{padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;transition:.2s}input:focus{border-color:#6366f1}button{width:100%;padding:12px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;margin-top:4px}button:hover{background:#4f46e5}.resultado{margin-top:14px;padding:14px;border-radius:10px;background:#f0fdf4;border:1px solid #bbf7d0;display:flex;flex-direction:column;gap:4px}.hidden{display:none!important}`,
      baseJs: '',
      validate: (code) => {
        return code.includes('<input') &&
          code.includes('type="number"') &&
          code.includes('id="peso"') &&
          code.includes('id="altura"') &&
          (code.includes('<button') || code.includes('<btn'));
      },
      errorMsg: 'Certifique-se de ter dois <input type="number"> com id="peso" e id="altura", e um <button>.',
      successMsg: '✅ Estrutura criada! Agora vamos estilizar.',
    },
    {
      title: 'Estilos CSS',
      type: 'css',
      description: 'Estilize a calculadora para parecer profissional. Complete os estilos do card e do resultado.',
      hint: 'Use border-radius para arredondar, box-shadow para profundidade. A classe .hidden deve ter display: none.',
      starterCode: `.card {
  max-width: 340px;
  margin: 0 auto;
  padding: 28px;
  border-radius: ___;
  background: #f8fafc;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}

.card h1 {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 20px;
  color: #1e293b;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

label {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
}

input {
  padding: 10px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: 0.2s;
}

input:focus {
  border-color: ___;
}

button {
  width: 100%;
  padding: 12px;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 4px;
}

button:hover {
  background: ___;
}

.resultado {
  margin-top: 14px;
  padding: 14px;
  border-radius: 10px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hidden {
  display: ___;
}`,
      baseHtml: `<div class="card"><h1>Calculadora de IMC</h1><div class="field"><label for="peso">Peso (kg)</label><input type="number" id="peso" placeholder="Ex: 70"></div><div class="field"><label for="altura">Altura (m)</label><input type="number" id="altura" placeholder="Ex: 1.75" step="0.01"></div><button type="button" id="btn-calcular">Calcular IMC</button><div id="resultado" class="resultado hidden"><span id="valor-imc" style="font-size:22px;font-weight:800;color:#1e293b"></span><span id="classificacao" style="font-size:13px;color:#475569"></span></div></div>`,
      baseCss: '',
      baseJs: '',
      validate: (code) => code.includes('border-radius') && code.includes('display') && code.includes('none'),
      errorMsg: 'Preencha as lacunas: border-radius para o .card, uma cor para input:focus, cor de hover para o botão, e display: none para .hidden.',
      successMsg: '✅ Estilos prontos! Agora a lógica JavaScript.',
    },
    {
      title: 'Lógica JavaScript',
      type: 'js',
      description: 'Implemente o cálculo do IMC e a classificação. A fórmula é: IMC = peso / (altura × altura).',
      hint: 'Use parseFloat() para converter os valores dos inputs. O IMC é peso ÷ altura². Classifique: <18.5 = Abaixo do peso, <25 = Normal, <30 = Sobrepeso, ≥30 = Obesidade.',
      starterCode: `const btnCalcular = document.getElementById('btn-calcular');
const resultado = document.getElementById('resultado');
const valorImc = document.getElementById('valor-imc');
const classificacao = document.getElementById('classificacao');

btnCalcular.addEventListener('click', function() {
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);

  // Validação: verifique se os valores são válidos
  if (___ || ___ || peso <= 0 || altura <= 0) {
    alert('Por favor, insira peso e altura válidos!');
    return;
  }

  // Cálculo do IMC
  const imc = ___;

  // Classificação
  let classe = '';
  if (imc < 18.5) {
    classe = '🔵 Abaixo do peso';
  } else if (___) {
    classe = '🟢 Peso normal';
  } else if (___) {
    classe = '🟡 Sobrepeso';
  } else {
    classe = '🔴 Obesidade';
  }

  // Exibir resultado
  valorImc.textContent = 'IMC: ' + ___;
  classificacao.textContent = classe;
  resultado.classList.remove('___');
});`,
      baseHtml: `<div class="card"><h1>Calculadora de IMC</h1><div class="field"><label for="peso">Peso (kg)</label><input type="number" id="peso" placeholder="Ex: 70"></div><div class="field"><label for="altura">Altura (m)</label><input type="number" id="altura" placeholder="Ex: 1.75" step="0.01"></div><button type="button" id="btn-calcular">Calcular IMC</button><div id="resultado" class="resultado hidden"><span id="valor-imc" style="font-size:22px;font-weight:800;color:#1e293b"></span><span id="classificacao" style="font-size:13px;color:#475569;margin-top:4px"></span></div></div>`,
      baseCss: `.card{max-width:340px;margin:0 auto;padding:28px;border-radius:16px;background:#f8fafc;box-shadow:0 4px 24px rgba(0,0,0,.08)}.card h1{font-size:20px;font-weight:800;margin-bottom:20px;color:#1e293b}.field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}label{font-size:13px;font-weight:600;color:#475569}input{padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none}input:focus{border-color:#6366f1}button{width:100%;padding:12px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;margin-top:4px}button:hover{background:#4f46e5}.resultado{margin-top:14px;padding:14px;border-radius:10px;background:#f0fdf4;border:1px solid #bbf7d0;display:flex;flex-direction:column;gap:4px}.hidden{display:none!important}`,
      baseJs: '',
      validate: (code) => {
        return code.includes('peso / (altura') &&
          code.includes('toFixed') &&
          code.includes('classList.remove') &&
          code.includes('hidden');
      },
      errorMsg: 'Certifique-se de calcular o IMC com peso/(altura*altura), usar toFixed(1) para arredondar, e remover a classe "hidden" para mostrar o resultado.',
      successMsg: '✅ Calculadora funcionando! Etapa final: polimento.',
    },
    {
      title: 'Polimento final',
      type: 'js',
      description: 'Adicione um toque final: mude a cor do resultado de acordo com a classificação do IMC.',
      hint: 'Use resultado.style.background e resultado.style.borderColor para mudar as cores. Verde para normal, amarelo para sobrepeso, vermelho para obesidade.',
      starterCode: `const btnCalcular = document.getElementById('btn-calcular');
const resultado = document.getElementById('resultado');
const valorImc = document.getElementById('valor-imc');
const classificacao = document.getElementById('classificacao');

// Mapa de classificações com cores
const classificacoes = [
  { limite: 18.5, texto: '🔵 Abaixo do peso', bg: '#eff6ff', borda: '#bfdbfe' },
  { limite: 25,   texto: '🟢 Peso normal',    bg: '#f0fdf4', borda: '#bbf7d0' },
  { limite: 30,   texto: '🟡 Sobrepeso',      bg: '#fefce8', borda: '#fde68a' },
  { limite: Infinity, texto: '🔴 Obesidade',  bg: '#fff1f2', borda: '#fecdd3' },
];

btnCalcular.addEventListener('click', function() {
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    alert('Insira valores válidos!');
    return;
  }

  const imc = peso / (altura * altura);

  // Encontre a classificação correta usando .find()
  const info = classificacoes.find(c => ___);

  valorImc.textContent = 'IMC: ' + imc.toFixed(1);
  classificacao.textContent = info.texto;

  // Aplique as cores dinamicamente
  resultado.style.background = ___;
  resultado.style.borderColor = ___;
  resultado.classList.remove('hidden');
});`,
      baseHtml: `<div class="card"><h1>Calculadora de IMC</h1><div class="field"><label for="peso">Peso (kg)</label><input type="number" id="peso" placeholder="Ex: 70"></div><div class="field"><label for="altura">Altura (m)</label><input type="number" id="altura" placeholder="Ex: 1.75" step="0.01"></div><button type="button" id="btn-calcular">Calcular IMC</button><div id="resultado" class="resultado hidden"><span id="valor-imc" style="font-size:22px;font-weight:800;color:#1e293b"></span><span id="classificacao" style="font-size:13px;color:#475569;margin-top:4px"></span></div></div>`,
      baseCss: `.card{max-width:340px;margin:0 auto;padding:28px;border-radius:16px;background:#f8fafc;box-shadow:0 4px 24px rgba(0,0,0,.08)}.card h1{font-size:20px;font-weight:800;margin-bottom:20px;color:#1e293b}.field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}label{font-size:13px;font-weight:600;color:#475569}input{padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none}input:focus{border-color:#6366f1}button{width:100%;padding:12px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;margin-top:4px}button:hover{background:#4f46e5}.resultado{margin-top:14px;padding:14px;border-radius:10px;display:flex;flex-direction:column;gap:4px;border:1px solid}.hidden{display:none!important}`,
      baseJs: '',
      validate: (code) => code.includes('.find(') && code.includes('info.bg') || code.includes('info.borda') || (code.includes('.find(') && code.includes('style.background')),
      errorMsg: 'Use .find() para buscar a classificação, e aplique info.bg e info.borda no style do resultado.',
      successMsg: '🎉 Calculadora de IMC concluída com estilo dinâmico!',
    },
  ],
  finalHtml: `<div class="card"><h1>Calculadora de IMC</h1><div class="field"><label for="peso">Peso (kg)</label><input type="number" id="peso" value="70"></div><div class="field"><label for="altura">Altura (m)</label><input type="number" id="altura" value="1.75" step="0.01"></div><button type="button" id="btn-calcular">Calcular IMC</button><div id="resultado" class="resultado hidden"><span id="valor-imc" style="font-size:22px;font-weight:800;color:#1e293b"></span><span id="classificacao" style="font-size:13px;color:#475569;margin-top:4px"></span></div></div>`,
  finalCss: `.card{max-width:340px;margin:0 auto;padding:28px;border-radius:16px;background:#f8fafc;box-shadow:0 4px 24px rgba(0,0,0,.08)}.card h1{font-size:20px;font-weight:800;margin-bottom:20px;color:#1e293b}.field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}label{font-size:13px;font-weight:600;color:#475569}input{padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none}input:focus{border-color:#6366f1}button{width:100%;padding:12px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;margin-top:4px}button:hover{background:#4f46e5}.resultado{margin-top:14px;padding:14px;border-radius:10px;display:flex;flex-direction:column;gap:4px;border:1px solid}.hidden{display:none!important}`,
  finalJs: `const classificacoes=[{limite:18.5,texto:'🔵 Abaixo do peso',bg:'#eff6ff',borda:'#bfdbfe'},{limite:25,texto:'🟢 Peso normal',bg:'#f0fdf4',borda:'#bbf7d0'},{limite:30,texto:'🟡 Sobrepeso',bg:'#fefce8',borda:'#fde68a'},{limite:Infinity,texto:'🔴 Obesidade',bg:'#fff1f2',borda:'#fecdd3'}];document.getElementById('btn-calcular').addEventListener('click',function(){const p=parseFloat(document.getElementById('peso').value),a=parseFloat(document.getElementById('altura').value);if(isNaN(p)||isNaN(a)||p<=0||a<=0){alert('Insira valores válidos!');return;}const imc=p/(a*a),info=classificacoes.find(c=>imc<c.limite),r=document.getElementById('resultado');document.getElementById('valor-imc').textContent='IMC: '+imc.toFixed(1);document.getElementById('classificacao').textContent=info.texto;r.style.background=info.bg;r.style.borderColor=info.borda;r.classList.remove('hidden');});`,
};

// ── FASE 2 — Lógica JS: Validador de Formulário ───────────────────────────────
export const miniProjectPhase2 = {
  id: 'mp-phase-2',
  title: 'Validador de Formulário de Cadastro',
  description: 'Construa um formulário de cadastro com validação em tempo real usando JavaScript puro. Ao fim, terá um componente reutilizável que verifica nome, email, senha e confirmação.',
  steps: [
    {
      title: 'HTML do formulário',
      type: 'html',
      description: 'Monte o formulário com 4 campos: nome completo, email, senha e confirmação de senha. Cada campo precisa de uma div.field com label, input e um span.error para mensagens.',
      hint: 'O campo de senha usa type="password". Cada .field deve ter um <span class="error"></span> para mostrar erros abaixo do input.',
      starterCode: `<div class="card">
  <h1>Criar conta</h1>

  <div class="field">
    <label for="nome">Nome completo</label>
    <input type="___" id="nome" placeholder="Seu nome">
    <span class="error" id="erro-nome"></span>
  </div>

  <div class="field">
    <label for="email">E-mail</label>
    <input type="___" id="email" placeholder="seu@email.com">
    <span class="error" id="erro-email"></span>
  </div>

  <div class="field">
    <label for="senha">Senha</label>
    <input type="___" id="senha" placeholder="Mínimo 8 caracteres">
    <span class="error" id="erro-senha"></span>
  </div>

  <div class="field">
    <label for="confirma">Confirmar senha</label>
    <input type="___" id="confirma" placeholder="Repita a senha">
    <span class="error" id="erro-confirma"></span>
  </div>

  <button id="btn-cadastrar">Criar conta</button>
  <div id="sucesso" class="sucesso hidden">✅ Cadastro realizado com sucesso!</div>
</div>`,
      baseHtml: `<div class="card"><h1>Criar conta</h1><div class="field"><label>Nome</label><input type="text" placeholder="Seu nome"><span class="error"></span></div><div class="field"><label>Email</label><input type="email" placeholder="seu@email.com"><span class="error"></span></div><div class="field"><label>Senha</label><input type="password" placeholder="Mínimo 8 caracteres"><span class="error"></span></div><div class="field"><label>Confirmar senha</label><input type="password" placeholder="Repita a senha"><span class="error"></span></div><button>Criar conta</button></div>`,
      baseCss: `*{box-sizing:border-box}.card{max-width:360px;margin:0 auto;padding:28px;border-radius:16px;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.1)}h1{font-size:20px;font-weight:800;margin-bottom:20px;color:#1e293b}.field{display:flex;flex-direction:column;gap:5px;margin-bottom:14px}label{font-size:13px;font-weight:600;color:#475569}input{padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;transition:.2s}input:focus{border-color:#6366f1}input.valido{border-color:#22c55e}input.invalido{border-color:#ef4444}.error{font-size:11.5px;color:#ef4444;min-height:16px}button{width:100%;padding:12px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;margin-top:4px}.sucesso{margin-top:14px;padding:12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;color:#16a34a;font-size:13px;font-weight:600;text-align:center}.hidden{display:none}`,
      baseJs: '',
      validate: (code) => {
        return code.includes('type="text"') && code.includes('type="email"') &&
          (code.match(/type="password"/g) || []).length >= 2 &&
          code.includes('id="nome"') && code.includes('id="email"');
      },
      errorMsg: 'Complete os tipos: text para nome, email para email, e password para os dois campos de senha.',
      successMsg: '✅ HTML completo! Agora os estilos de validação.',
    },
    {
      title: 'Feedback visual de validação',
      type: 'js',
      description: 'Adicione validação em tempo real: cada campo muda de cor conforme o usuário digita — verde se válido, vermelho se inválido.',
      hint: 'Use o evento "input" em cada campo. Adicione as classes "valido" ou "invalido" no input. Para email, use .includes("@") e .includes(".").',
      starterCode: `// Função auxiliar: marca campo como válido ou inválido
function setValidade(inputEl, erroEl, valido, mensagem) {
  if (valido) {
    inputEl.className = '___';
    erroEl.textContent = '';
  } else {
    inputEl.className = '___';
    erroEl.textContent = mensagem;
  }
  return valido;
}

// Validação do nome: mínimo 3 caracteres e deve conter espaço
const nomeInput = document.getElementById('nome');
nomeInput.addEventListener('input', () => {
  const val = nomeInput.value.trim();
  setValidade(
    nomeInput, document.getElementById('erro-nome'),
    val.length >= 3 && ___,
    'Digite nome e sobrenome (mínimo 3 caracteres)'
  );
});

// Validação do email: deve ter @ e ponto
const emailInput = document.getElementById('email');
emailInput.addEventListener('input', () => {
  const val = emailInput.value.trim();
  setValidade(
    emailInput, document.getElementById('erro-email'),
    val.includes('___') && val.includes('.') && val.length > 5,
    'E-mail inválido'
  );
});

// Validação da senha: mínimo 8 caracteres
const senhaInput = document.getElementById('senha');
senhaInput.addEventListener('input', () => {
  const val = senhaInput.value;
  setValidade(
    senhaInput, document.getElementById('erro-senha'),
    val.length >= ___,
    'A senha deve ter no mínimo 8 caracteres'
  );
});

// Validação de confirmação: deve ser igual à senha
const confirmaInput = document.getElementById('confirma');
confirmaInput.addEventListener('input', () => {
  setValidade(
    confirmaInput, document.getElementById('erro-confirma'),
    confirmaInput.value === ___,
    'As senhas não coincidem'
  );
});`,
      baseHtml: `<div class="card"><h1>Criar conta</h1><div class="field"><label for="nome">Nome completo</label><input type="text" id="nome" placeholder="Seu nome"><span class="error" id="erro-nome"></span></div><div class="field"><label for="email">E-mail</label><input type="email" id="email" placeholder="seu@email.com"><span class="error" id="erro-email"></span></div><div class="field"><label for="senha">Senha</label><input type="password" id="senha" placeholder="Mínimo 8 caracteres"><span class="error" id="erro-senha"></span></div><div class="field"><label for="confirma">Confirmar senha</label><input type="password" id="confirma" placeholder="Repita a senha"><span class="error" id="erro-confirma"></span></div><button id="btn-cadastrar">Criar conta</button><div id="sucesso" class="sucesso hidden">✅ Cadastro realizado com sucesso!</div></div>`,
      baseCss: `*{box-sizing:border-box}.card{max-width:360px;margin:0 auto;padding:28px;border-radius:16px;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.1)}h1{font-size:20px;font-weight:800;margin-bottom:20px;color:#1e293b}.field{display:flex;flex-direction:column;gap:5px;margin-bottom:14px}label{font-size:13px;font-weight:600;color:#475569}input{padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;transition:.2s}input:focus{border-color:#6366f1}input.valido{border-color:#22c55e!important}input.invalido{border-color:#ef4444!important}.error{font-size:11.5px;color:#ef4444;min-height:16px}button{width:100%;padding:12px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;margin-top:4px}.sucesso{margin-top:14px;padding:12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;color:#16a34a;font-size:13px;font-weight:600;text-align:center}.hidden{display:none}`,
      baseJs: '',
      validate: (code) => {
        return code.includes('valido') && code.includes('invalido') &&
          code.includes('addEventListener') && code.includes("'input'") &&
          code.includes('.length >=');
      },
      errorMsg: 'Use as classes "valido" e "invalido", e adicione eventos "input" em cada campo com as condições corretas.',
      successMsg: '✅ Validação em tempo real funcionando!',
    },
    {
      title: 'Submit com verificação final',
      type: 'js',
      description: 'Adicione a lógica do botão: só permite o cadastro se todos os campos forem válidos, senão destaca os campos problemáticos.',
      hint: 'Cheque se cada input tem a classe "valido" antes de submeter. Use classList.contains("valido") para verificar.',
      starterCode: `// Cole aqui a validação em tempo real da etapa anterior...
function setValidade(inputEl, erroEl, valido, mensagem) {
  inputEl.className = valido ? 'valido' : 'invalido';
  erroEl.textContent = valido ? '' : mensagem;
  return valido;
}

const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const confirmaInput = document.getElementById('confirma');

nomeInput.addEventListener('input', () => setValidade(nomeInput, document.getElementById('erro-nome'), nomeInput.value.trim().length >= 3 && nomeInput.value.includes(' '), 'Digite nome e sobrenome'));
emailInput.addEventListener('input', () => setValidade(emailInput, document.getElementById('erro-email'), emailInput.value.includes('@') && emailInput.value.includes('.'), 'E-mail inválido'));
senhaInput.addEventListener('input', () => setValidade(senhaInput, document.getElementById('erro-senha'), senhaInput.value.length >= 8, 'Mínimo 8 caracteres'));
confirmaInput.addEventListener('input', () => setValidade(confirmaInput, document.getElementById('erro-confirma'), confirmaInput.value === senhaInput.value, 'Senhas não coincidem'));

// Lógica do botão de submit
document.getElementById('btn-cadastrar').addEventListener('click', () => {
  // Dispara a validação de todos os campos ao clicar
  nomeInput.dispatchEvent(new Event('input'));
  emailInput.dispatchEvent(new Event('input'));
  senhaInput.dispatchEvent(new Event('input'));
  confirmaInput.dispatchEvent(new Event('input'));

  // Verifique se TODOS têm a classe 'valido'
  const todosValidos = [nomeInput, emailInput, senhaInput, confirmaInput]
    .every(input => input.classList.___('valido'));

  if (___) {
    document.getElementById('sucesso').classList.remove('hidden');
    document.querySelector('button').textContent = '✅ Conta criada!';
    document.querySelector('button').style.background = '#16a34a';
  }
});`,
      baseHtml: `<div class="card"><h1>Criar conta</h1><div class="field"><label for="nome">Nome completo</label><input type="text" id="nome" placeholder="Seu nome"><span class="error" id="erro-nome"></span></div><div class="field"><label for="email">E-mail</label><input type="email" id="email" placeholder="seu@email.com"><span class="error" id="erro-email"></span></div><div class="field"><label for="senha">Senha</label><input type="password" id="senha" placeholder="Mínimo 8 caracteres"><span class="error" id="erro-senha"></span></div><div class="field"><label for="confirma">Confirmar senha</label><input type="password" id="confirma" placeholder="Repita a senha"><span class="error" id="erro-confirma"></span></div><button id="btn-cadastrar">Criar conta</button><div id="sucesso" class="sucesso hidden">✅ Cadastro realizado com sucesso!</div></div>`,
      baseCss: `*{box-sizing:border-box}.card{max-width:360px;margin:0 auto;padding:28px;border-radius:16px;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.1)}h1{font-size:20px;font-weight:800;margin-bottom:20px;color:#1e293b}.field{display:flex;flex-direction:column;gap:5px;margin-bottom:14px}label{font-size:13px;font-weight:600;color:#475569}input{padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;transition:.2s}input.valido{border-color:#22c55e!important;background:#f0fdf4}input.invalido{border-color:#ef4444!important;background:#fff1f2}.error{font-size:11.5px;color:#ef4444;min-height:16px}button{width:100%;padding:12px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;margin-top:4px;transition:.2s}.sucesso{margin-top:14px;padding:12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;color:#16a34a;font-size:13px;font-weight:600;text-align:center}.hidden{display:none}`,
      baseJs: '',
      validate: (code) => code.includes('.every(') && code.includes('contains') && code.includes('todosValidos'),
      errorMsg: 'Use .every() com classList.contains("valido") para checar todos os campos, e mostre o sucesso se todosValidos for true.',
      successMsg: '🎉 Formulário de cadastro completo e funcional!',
    },
  ],
  finalHtml: `<div class="card"><h1>Criar conta</h1><div class="field"><label for="nome">Nome completo</label><input type="text" id="nome" placeholder="Seu nome"><span class="error" id="erro-nome"></span></div><div class="field"><label for="email">E-mail</label><input type="email" id="email" placeholder="seu@email.com"><span class="error" id="erro-email"></span></div><div class="field"><label for="senha">Senha</label><input type="password" id="senha" placeholder="Mínimo 8 caracteres"><span class="error" id="erro-senha"></span></div><div class="field"><label for="confirma">Confirmar senha</label><input type="password" id="confirma" placeholder="Repita a senha"><span class="error" id="erro-confirma"></span></div><button id="btn-cadastrar">Criar conta</button><div id="sucesso" class="sucesso hidden">✅ Cadastro realizado com sucesso!</div></div>`,
  finalCss: `*{box-sizing:border-box}.card{max-width:360px;margin:0 auto;padding:28px;border-radius:16px;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.1)}h1{font-size:20px;font-weight:800;margin-bottom:20px;color:#1e293b}.field{display:flex;flex-direction:column;gap:5px;margin-bottom:14px}label{font-size:13px;font-weight:600;color:#475569}input{padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;transition:.2s}input.valido{border-color:#22c55e!important;background:#f0fdf4}input.invalido{border-color:#ef4444!important;background:#fff1f2}.error{font-size:11.5px;color:#ef4444;min-height:16px}button{width:100%;padding:12px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;margin-top:4px;transition:.2s}.sucesso{margin-top:14px;padding:12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;color:#16a34a;font-size:13px;font-weight:600;text-align:center}.hidden{display:none}`,
  finalJs: `function setValidade(i,e,v,m){i.className=v?'valido':'invalido';e.textContent=v?'':m;return v;}const n=document.getElementById('nome'),em=document.getElementById('email'),s=document.getElementById('senha'),c=document.getElementById('confirma');n.addEventListener('input',()=>setValidade(n,document.getElementById('erro-nome'),n.value.trim().length>=3&&n.value.includes(' '),'Digite nome e sobrenome'));em.addEventListener('input',()=>setValidade(em,document.getElementById('erro-email'),em.value.includes('@')&&em.value.includes('.'),'E-mail inválido'));s.addEventListener('input',()=>setValidade(s,document.getElementById('erro-senha'),s.value.length>=8,'Mínimo 8 caracteres'));c.addEventListener('input',()=>setValidade(c,document.getElementById('erro-confirma'),c.value===s.value,'Senhas não coincidem'));document.getElementById('btn-cadastrar').addEventListener('click',()=>{[n,em,s,c].forEach(i=>i.dispatchEvent(new Event('input')));if([n,em,s,c].every(i=>i.classList.contains('valido'))){document.getElementById('sucesso').classList.remove('hidden');document.querySelector('button').textContent='✅ Conta criada!';document.querySelector('button').style.background='#16a34a';}});`,
};

// ── FASE 3 — Git: Simulador de Git Commands ───────────────────────────────────
export const miniProjectPhase3 = {
  id: 'mp-phase-3',
  title: 'Simulador Visual de Git',
  description: 'Construa um simulador visual de comandos Git que mostra o estado do repositório em tempo real: área de trabalho, staging e commits.',
  steps: [
    {
      title: 'Interface e estado inicial',
      type: 'html',
      description: 'Monte a interface com três colunas: "Working Directory", "Staging Area" e "Commits". Adicione um input de comando e um botão Executar.',
      hint: 'Use divs com classes para cada área. O log de saída deve ser uma div com id="log".',
      starterCode: `<div class="git-sim">
  <h2>🔧 Git Simulator</h2>

  <div class="areas">
    <div class="area" id="area-work">
      <div class="area-title">📁 Working Directory</div>
      <div class="area-files" id="files-work"></div>
    </div>

    <div class="area" id="area-stage">
      <div class="area-title">📋 Staging Area</div>
      <div class="area-files" id="___"></div>
    </div>

    <div class="area" id="area-commits">
      <div class="area-title">✅ Commits</div>
      <div class="area-files" id="___"></div>
    </div>
  </div>

  <div class="cmd-row">
    <span class="prompt">$</span>
    <input type="text" id="cmd-input" placeholder="git add . | git commit -m 'msg' | git status">
    <button id="btn-exec">Executar</button>
  </div>

  <div id="log" class="log"></div>
</div>`,
      baseHtml: `<div class="git-sim"><h2>🔧 Git Simulator</h2><div class="areas"><div class="area"><div class="area-title">📁 Working Directory</div><div class="area-files"><div class="file">index.html</div><div class="file">style.css</div></div></div><div class="area"><div class="area-title">📋 Staging Area</div><div class="area-files"></div></div><div class="area"><div class="area-title">✅ Commits</div><div class="area-files"></div></div></div><div class="cmd-row"><span class="prompt">$</span><input type="text" placeholder="git add . | git commit -m 'msg'"><button>Executar</button></div><div class="log"><div class="log-line success">Simulador iniciado. Tente: git status</div></div></div>`,
      baseCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#0d1117;color:#c9d1d9;font-family:'Segoe UI',monospace;padding:20px}.git-sim{max-width:700px;margin:0 auto}h2{font-size:18px;margin-bottom:16px;color:#58a6ff}.areas{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px}.area{background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px;min-height:120px}.area-title{font-size:11px;font-weight:700;color:#8b949e;text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px}.file{font-size:12px;padding:4px 8px;background:#21262d;border-radius:4px;margin-bottom:4px;color:#7ee787;font-family:monospace}.cmd-row{display:flex;align-items:center;gap:8px;background:#161b22;border:1px solid #30363d;border-radius:8px;padding:10px 14px;margin-bottom:12px}.prompt{color:#7ee787;font-family:monospace;font-weight:700}input{flex:1;background:transparent;border:none;color:#c9d1d9;font-family:monospace;font-size:13px;outline:none}button{padding:6px 14px;background:#238636;color:#fff;border:none;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer}.log{background:#0d1117;border:1px solid #21262d;border-radius:8px;padding:12px;min-height:60px;max-height:140px;overflow-y:auto}.log-line{font-size:12px;font-family:monospace;padding:2px 0;line-height:1.6}.success{color:#7ee787}.error{color:#f85149}.info{color:#58a6ff}`,
      baseJs: '',
      validate: (code) => code.includes('id="files-stage"') || code.includes("id='files-stage'") || (code.includes('stage') && code.includes('commits') && code.includes('id="')),
      errorMsg: 'Preencha os ids: files-stage para a staging area e files-commits para os commits.',
      successMsg: '✅ Interface montada!',
    },
    {
      title: 'Lógica dos comandos Git',
      type: 'js',
      description: 'Implemente os comandos git add, git commit e git status usando arrays para representar cada área.',
      hint: 'Mantenha três arrays: workingFiles, stagingFiles, commits. Cada comando manipula esses arrays e re-renderiza a UI.',
      starterCode: `// Estado do repositório
let workingFiles = ['index.html', 'style.css', 'app.js'];
let stagingFiles = [];
let commits = [];

// Renderiza as três áreas
function render() {
  document.getElementById('files-work').innerHTML =
    workingFiles.map(f => '<div class="file">📄 '+f+'</div>').join('') || '<span style="color:#8b949e;font-size:12px">vazio</span>';

  document.getElementById('files-stage').innerHTML =
    stagingFiles.map(f => '<div class="file" style="color:#e3b341">📄 '+f+'</div>').join('') || '<span style="color:#8b949e;font-size:12px">vazio</span>';

  document.getElementById('files-commits').innerHTML =
    commits.map(c => '<div class="file" style="color:#7ee787">✅ '+c+'</div>').join('') || '<span style="color:#8b949e;font-size:12px">nenhum commit</span>';
}

function log(msg, tipo) {
  const div = document.getElementById('log');
  div.innerHTML += '<div class="log-line '+tipo+'">$ '+msg+'</div>';
  div.scrollTop = div.scrollHeight;
}

// Processa o comando digitado
function executar(cmd) {
  cmd = cmd.trim();

  if (cmd === 'git status') {
    log('Arquivos modificados: ' + (workingFiles.length ? workingFiles.join(', ') : 'nenhum'), 'info');
    log('Staged: ' + (stagingFiles.length ? stagingFiles.join(', ') : 'nenhum'), 'info');
    return;
  }

  if (cmd === 'git add .') {
    if (workingFiles.length === 0) { log('Nada para adicionar.', 'error'); return; }
    // Mova todos workingFiles para stagingFiles
    stagingFiles = [...stagingFiles, ___];
    workingFiles = ___;
    log('git add . → '+stagingFiles.length+' arquivo(s) em stage', 'success');
    render();
    return;
  }

  const commitMatch = cmd.match(/^git commit -m ["'](.+)["']$/);
  if (commitMatch) {
    if (stagingFiles.length === 0) { log('Nada em staging!', 'error'); return; }
    const msg = commitMatch[1];
    // Crie um commit com a mensagem e os arquivos
    commits.push('[' + commits.length + '] ' + msg + ' (' + stagingFiles.join(', ') + ')');
    stagingFiles = ___;
    log('Commit criado: "' + msg + '"', 'success');
    render();
    return;
  }

  if (cmd.startsWith('touch ')) {
    const file = cmd.slice(6).trim();
    workingFiles.push(file);
    log('Arquivo criado: ' + file, 'success');
    render();
    return;
  }

  log('Comando não reconhecido: ' + cmd, 'error');
}

// Inicializar
render();
log('Repositório iniciado. Tente: git status', 'info');

document.getElementById('btn-exec').addEventListener('click', () => {
  const input = document.getElementById('cmd-input');
  executar(input.value);
  input.value = '';
  input.focus();
});
document.getElementById('cmd-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    executar(e.target.value);
    e.target.value = '';
  }
});`,
      baseHtml: `<div class="git-sim"><h2>🔧 Git Simulator</h2><div class="areas"><div class="area" id="area-work"><div class="area-title">📁 Working Directory</div><div class="area-files" id="files-work"></div></div><div class="area" id="area-stage"><div class="area-title">📋 Staging Area</div><div class="area-files" id="files-stage"></div></div><div class="area" id="area-commits"><div class="area-title">✅ Commits</div><div class="area-files" id="files-commits"></div></div></div><div class="cmd-row"><span class="prompt">$</span><input type="text" id="cmd-input" placeholder="git add . | git commit -m 'msg' | git status | touch arquivo.js"><button id="btn-exec">Executar</button></div><div id="log" class="log"></div></div>`,
      baseCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#0d1117;color:#c9d1d9;font-family:'Segoe UI',monospace;padding:20px}.git-sim{max-width:700px;margin:0 auto}h2{font-size:18px;margin-bottom:16px;color:#58a6ff}.areas{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px}.area{background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px;min-height:120px}.area-title{font-size:11px;font-weight:700;color:#8b949e;text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px}.file{font-size:12px;padding:4px 8px;background:#21262d;border-radius:4px;margin-bottom:4px;font-family:monospace}.cmd-row{display:flex;align-items:center;gap:8px;background:#161b22;border:1px solid #30363d;border-radius:8px;padding:10px 14px;margin-bottom:12px}.prompt{color:#7ee787;font-family:monospace;font-weight:700}input{flex:1;background:transparent;border:none;color:#c9d1d9;font-family:monospace;font-size:13px;outline:none}button{padding:6px 14px;background:#238636;color:#fff;border:none;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer}.log{background:#0d1117;border:1px solid #21262d;border-radius:8px;padding:12px;min-height:60px;max-height:140px;overflow-y:auto}.log-line{font-size:12px;font-family:monospace;padding:2px 0;line-height:1.6}.success{color:#7ee787}.error{color:#f85149}.info{color:#58a6ff}`,
      baseJs: '',
      validate: (code) => code.includes('stagingFiles = [...stagingFiles') && code.includes('workingFiles = []') || (code.includes('workingFiles') && code.includes('stagingFiles') && code.includes('commits.push') && code.includes('render()')),
      errorMsg: 'Complete: stagingFiles recebe os arquivos de working, workingFiles vira [] após o add, e stagingFiles vira [] após o commit.',
      successMsg: '🎉 Simulador Git funcionando! Digite git status, git add . e git commit -m "msg".',
    },
  ],
  finalHtml: `<div class="git-sim"><h2>🔧 Git Simulator</h2><div class="areas"><div class="area"><div class="area-title">📁 Working Directory</div><div class="area-files" id="files-work"></div></div><div class="area"><div class="area-title">📋 Staging Area</div><div class="area-files" id="files-stage"></div></div><div class="area"><div class="area-title">✅ Commits</div><div class="area-files" id="files-commits"></div></div></div><div class="cmd-row"><span class="prompt">$</span><input type="text" id="cmd-input" placeholder="git add . | git commit -m 'msg' | git status | touch file.js"><button id="btn-exec">Executar</button></div><div id="log" class="log"></div></div>`,
  finalCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#0d1117;color:#c9d1d9;font-family:'Segoe UI',monospace;padding:20px}.git-sim{max-width:700px;margin:0 auto}h2{font-size:18px;margin-bottom:16px;color:#58a6ff}.areas{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px}.area{background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px;min-height:120px}.area-title{font-size:11px;font-weight:700;color:#8b949e;text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px}.file{font-size:12px;padding:4px 8px;background:#21262d;border-radius:4px;margin-bottom:4px;font-family:monospace}.cmd-row{display:flex;align-items:center;gap:8px;background:#161b22;border:1px solid #30363d;border-radius:8px;padding:10px 14px;margin-bottom:12px}.prompt{color:#7ee787;font-family:monospace;font-weight:700}input{flex:1;background:transparent;border:none;color:#c9d1d9;font-family:monospace;font-size:13px;outline:none}button{padding:6px 14px;background:#238636;color:#fff;border:none;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer}.log{background:#0d1117;border:1px solid #21262d;border-radius:8px;padding:12px;min-height:60px;max-height:140px;overflow-y:auto}.log-line{font-size:12px;font-family:monospace;padding:2px 0;line-height:1.6}.success{color:#7ee787}.error{color:#f85149}.info{color:#58a6ff}`,
  finalJs: `let w=['index.html','style.css','app.js'],s=[],c=[];function render(){document.getElementById('files-work').innerHTML=w.map(f=>'<div class="file" style="color:#c9d1d9">📄 '+f+'</div>').join('')||'<span style="color:#8b949e;font-size:12px">vazio</span>';document.getElementById('files-stage').innerHTML=s.map(f=>'<div class="file" style="color:#e3b341">📄 '+f+'</div>').join('')||'<span style="color:#8b949e;font-size:12px">vazio</span>';document.getElementById('files-commits').innerHTML=c.map(x=>'<div class="file" style="color:#7ee787">✅ '+x+'</div>').join('')||'<span style="color:#8b949e;font-size:12px">nenhum</span>';}function log(m,t){const d=document.getElementById('log');d.innerHTML+='<div class="log-line '+t+'">$ '+m+'</div>';d.scrollTop=d.scrollHeight;}function exec(cmd){cmd=cmd.trim();if(cmd==='git status'){log('Modificados: '+(w.length?w.join(', '):'nenhum'),'info');log('Staged: '+(s.length?s.join(', '):'nenhum'),'info');return;}if(cmd==='git add .'){if(!w.length){log('Nada para adicionar.','error');return;}s=[...s,...w];w=[];log('Staged: '+s.length+' arquivo(s)','success');render();return;}const m=cmd.match(/^git commit -m ["'](.+)["']$/);if(m){if(!s.length){log('Nada em staging!','error');return;}c.push('['+c.length+'] '+m[1]+' ('+s.join(', ')+')');s=[];log('Commit: "'+m[1]+'"','success');render();return;}if(cmd.startsWith('touch ')){const f=cmd.slice(6).trim();w.push(f);log('Criado: '+f,'success');render();return;}log('Comando não reconhecido: '+cmd,'error');}render();log('Repositório iniciado. Tente: git status','info');document.getElementById('btn-exec').addEventListener('click',()=>{const i=document.getElementById('cmd-input');exec(i.value);i.value='';i.focus();});document.getElementById('cmd-input').addEventListener('keydown',e=>{if(e.key==='Enter'){exec(e.target.value);e.target.value='';}});`,
};

// ── FASE 4 — HTML/CSS: Card de Produto E-commerce ────────────────────────────
export const miniProjectPhase4 = {
  id: 'mp-phase-4',
  title: 'Card de Produto para E-commerce',
  description: 'Construa um card de produto reutilizável com HTML e CSS puro: imagem, badge de desconto, avaliação em estrelas, botão de compra e animações de hover.',
  steps: [
    {
      title: 'Estrutura HTML do card',
      type: 'html',
      description: 'Monte a estrutura do card: imagem do produto, badge de desconto, informações (nome, avaliação, preço antigo e novo) e botão de comprar.',
      hint: 'Use uma div.card como container. A avaliação em estrelas pode ser feita com ★ (★) e ☆ (☆).',
      starterCode: `<div class="card">
  <div class="card-img-wrapper">
    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" alt="Relógio">
    <span class="badge">-30%</span>
  </div>

  <div class="card-body">
    <p class="categoria">___</p>
    <h3 class="nome">Relógio Minimalista Pro</h3>

    <div class="avaliacao">
      <span class="estrelas">★★★★☆</span>
      <span class="num-avaliacoes">(___)</span>
    </div>

    <div class="precos">
      <span class="preco-antigo">R$ ___</span>
      <span class="preco-novo">R$ 349,00</span>
    </div>

    <button class="btn-comprar">
      🛒 Adicionar ao carrinho
    </button>
  </div>
</div>`,
      baseHtml: `<div class="card"><div class="card-img-wrapper"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" alt="Relógio"><span class="badge">-30%</span></div><div class="card-body"><p class="categoria">ACESSÓRIOS</p><h3 class="nome">Relógio Minimalista Pro</h3><div class="avaliacao"><span class="estrelas">★★★★☆</span><span class="num-avaliacoes">(128)</span></div><div class="precos"><span class="preco-antigo">R$ 499,00</span><span class="preco-novo">R$ 349,00</span></div><button class="btn-comprar">🛒 Adicionar ao carrinho</button></div></div>`,
      baseCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px}.card{background:#fff;border-radius:16px;overflow:hidden;width:260px;box-shadow:0 4px 24px rgba(0,0,0,.08)}.card-img-wrapper{position:relative}.card-img-wrapper img{width:100%;height:220px;object-fit:cover;display:block}.badge{position:absolute;top:12px;left:12px;background:#ef4444;color:#fff;font-size:11px;font-weight:800;padding:4px 10px;border-radius:99px}.card-body{padding:16px}.categoria{font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}.nome{font-size:15px;font-weight:700;color:#1e293b;margin-bottom:8px}.avaliacao{display:flex;align-items:center;gap:6px;margin-bottom:10px}.estrelas{color:#f59e0b;font-size:14px}.num-avaliacoes{font-size:12px;color:#94a3b8}.precos{display:flex;align-items:center;gap:10px;margin-bottom:14px}.preco-antigo{font-size:13px;color:#94a3b8;text-decoration:line-through}.preco-novo{font-size:20px;font-weight:800;color:#6366f1}.btn-comprar{width:100%;padding:11px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer}`,
      baseJs: '',
      validate: (code) => code.includes('categoria') && code.includes('preco-antigo') && code.includes('btn-comprar') && code.includes('R$'),
      errorMsg: 'Preencha: a categoria do produto, a quantidade de avaliações, o preço original (antes do desconto) e o nome da classe do botão.',
      successMsg: '✅ Estrutura do card montada!',
    },
    {
      title: 'Animações e interatividade',
      type: 'css',
      description: 'Adicione animações de hover: o card sobe levemente, a imagem faz zoom, e o botão muda de cor. Tudo com CSS puro.',
      hint: 'Use transform: translateY(-4px) no hover do card, e transform: scale(1.05) na imagem. Lembre do overflow: hidden no card para a imagem não vazar.',
      starterCode: `/* Transições suaves em tudo */
.card {
  transition: ___ 0.3s ease;
}

/* Card sobe no hover */
.card:hover {
  transform: ___;
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

/* Imagem faz zoom no hover */
.card-img-wrapper img {
  transition: transform 0.4s ease;
}

.card:hover .card-img-wrapper img {
  transform: ___;
}

/* Botão muda de cor no hover */
.btn-comprar {
  transition: background 0.2s, transform 0.15s;
}

.btn-comprar:hover {
  background: ___;
  transform: translateY(-1px);
}

.btn-comprar:active {
  transform: translateY(0);
}`,
      baseHtml: `<div class="card"><div class="card-img-wrapper"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" alt="Relógio"><span class="badge">-30%</span></div><div class="card-body"><p class="categoria">ACESSÓRIOS</p><h3 class="nome">Relógio Minimalista Pro</h3><div class="avaliacao"><span class="estrelas">★★★★☆</span><span class="num-avaliacoes">(128)</span></div><div class="precos"><span class="preco-antigo">R$ 499,00</span><span class="preco-novo">R$ 349,00</span></div><button class="btn-comprar">🛒 Adicionar ao carrinho</button></div></div>`,
      baseCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px}.card{background:#fff;border-radius:16px;overflow:hidden;width:260px;box-shadow:0 4px 24px rgba(0,0,0,.08)}.card-img-wrapper{position:relative;overflow:hidden}.card-img-wrapper img{width:100%;height:220px;object-fit:cover;display:block}.badge{position:absolute;top:12px;left:12px;background:#ef4444;color:#fff;font-size:11px;font-weight:800;padding:4px 10px;border-radius:99px}.card-body{padding:16px}.categoria{font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}.nome{font-size:15px;font-weight:700;color:#1e293b;margin-bottom:8px}.avaliacao{display:flex;align-items:center;gap:6px;margin-bottom:10px}.estrelas{color:#f59e0b;font-size:14px}.num-avaliacoes{font-size:12px;color:#94a3b8}.precos{display:flex;align-items:center;gap:10px;margin-bottom:14px}.preco-antigo{font-size:13px;color:#94a3b8;text-decoration:line-through}.preco-novo{font-size:20px;font-weight:800;color:#6366f1}.btn-comprar{width:100%;padding:11px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer}`,
      baseJs: '',
      validate: (code) => code.includes('translateY') && code.includes('scale') && code.includes(':hover') && code.includes('transition'),
      errorMsg: 'Complete: transition no .card, translateY(-4px) no hover do card, scale(1.05) na imagem, e uma cor mais escura no hover do botão.',
      successMsg: '✅ Animações prontas! Agora a interatividade com JS.',
    },
    {
      title: 'Interatividade com JavaScript',
      type: 'js',
      description: 'Adicione: (1) contador de quantidade antes de adicionar, (2) feedback visual ao clicar no botão, (3) toggle de favorito com ❤️.',
      hint: 'Crie um botão de favorito com position: absolute no canto do card. Ao clicar no botão de comprar, mostre um feedback temporário mudando o texto.',
      starterCode: `const btnComprar = document.querySelector('.btn-comprar');
const card = document.querySelector('.card');

// 1. Adicionar botão de favorito ao card
const btnFav = document.createElement('button');
btnFav.className = 'btn-fav';
btnFav.textContent = '♡';
btnFav.title = 'Favoritar';
document.querySelector('.card-img-wrapper').appendChild(btnFav);

let favoritado = false;
btnFav.addEventListener('click', () => {
  favoritado = ___;
  btnFav.textContent = favoritado ? '❤️' : '♡';
  btnFav.style.color = favoritado ? '#ef4444' : '#fff';
});

// 2. Feedback ao adicionar ao carrinho
btnComprar.addEventListener('click', () => {
  btnComprar.textContent = '✅ Adicionado!';
  btnComprar.style.background = '___';
  btnComprar.disabled = true;

  setTimeout(() => {
    btnComprar.textContent = '🛒 Adicionar ao carrinho';
    btnComprar.style.background = '___';
    btnComprar.disabled = false;
  }, 2000);
});`,
      baseHtml: `<div class="card"><div class="card-img-wrapper"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" alt="Relógio"><span class="badge">-30%</span></div><div class="card-body"><p class="categoria">ACESSÓRIOS</p><h3 class="nome">Relógio Minimalista Pro</h3><div class="avaliacao"><span class="estrelas">★★★★☆</span><span class="num-avaliacoes">(128)</span></div><div class="precos"><span class="preco-antigo">R$ 499,00</span><span class="preco-novo">R$ 349,00</span></div><button class="btn-comprar">🛒 Adicionar ao carrinho</button></div></div>`,
      baseCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px}.card{background:#fff;border-radius:16px;overflow:hidden;width:260px;box-shadow:0 4px 24px rgba(0,0,0,.08);transition:transform 0.3s ease}.card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.15)}.card-img-wrapper{position:relative;overflow:hidden}.card-img-wrapper img{width:100%;height:220px;object-fit:cover;display:block;transition:transform 0.4s}.card:hover .card-img-wrapper img{transform:scale(1.05)}.badge{position:absolute;top:12px;left:12px;background:#ef4444;color:#fff;font-size:11px;font-weight:800;padding:4px 10px;border-radius:99px}.btn-fav{position:absolute;top:10px;right:10px;background:rgba(0,0,0,.35);border:none;border-radius:50%;width:32px;height:32px;font-size:16px;cursor:pointer;color:#fff;display:flex;align-items:center;justify-content:center;transition:.2s}.btn-fav:hover{background:rgba(0,0,0,.55)}.card-body{padding:16px}.categoria{font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}.nome{font-size:15px;font-weight:700;color:#1e293b;margin-bottom:8px}.avaliacao{display:flex;align-items:center;gap:6px;margin-bottom:10px}.estrelas{color:#f59e0b;font-size:14px}.num-avaliacoes{font-size:12px;color:#94a3b8}.precos{display:flex;align-items:center;gap:10px;margin-bottom:14px}.preco-antigo{font-size:13px;color:#94a3b8;text-decoration:line-through}.preco-novo{font-size:20px;font-weight:800;color:#6366f1}.btn-comprar{width:100%;padding:11px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;transition:background 0.2s}.btn-comprar:hover{background:#4f46e5}`,
      baseJs: '',
      validate: (code) => code.includes('favoritado') && code.includes('!favoritado') || code.includes('= !') || (code.includes('favoritado') && code.includes('setTimeout')),
      errorMsg: 'Complete: favoritado = !favoritado para o toggle, uma cor verde (#22c55e) para o feedback de sucesso, e a cor original (#6366f1) para o reset.',
      successMsg: '🎉 Card de produto completo com interatividade!',
    },
  ],
  finalHtml: `<div class="card"><div class="card-img-wrapper"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" alt="Relógio"><span class="badge">-30%</span></div><div class="card-body"><p class="categoria">ACESSÓRIOS</p><h3 class="nome">Relógio Minimalista Pro</h3><div class="avaliacao"><span class="estrelas">★★★★☆</span><span class="num-avaliacoes">(128)</span></div><div class="precos"><span class="preco-antigo">R$ 499,00</span><span class="preco-novo">R$ 349,00</span></div><button class="btn-comprar">🛒 Adicionar ao carrinho</button></div></div>`,
  finalCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px}.card{background:#fff;border-radius:16px;overflow:hidden;width:260px;box-shadow:0 4px 24px rgba(0,0,0,.08);transition:transform 0.3s ease}.card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.15)}.card-img-wrapper{position:relative;overflow:hidden}.card-img-wrapper img{width:100%;height:220px;object-fit:cover;display:block;transition:transform 0.4s}.card:hover .card-img-wrapper img{transform:scale(1.05)}.badge{position:absolute;top:12px;left:12px;background:#ef4444;color:#fff;font-size:11px;font-weight:800;padding:4px 10px;border-radius:99px}.btn-fav{position:absolute;top:10px;right:10px;background:rgba(0,0,0,.35);border:none;border-radius:50%;width:32px;height:32px;font-size:16px;cursor:pointer;color:#fff;display:flex;align-items:center;justify-content:center;transition:.2s}.card-body{padding:16px}.categoria{font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}.nome{font-size:15px;font-weight:700;color:#1e293b;margin-bottom:8px}.avaliacao{display:flex;align-items:center;gap:6px;margin-bottom:10px}.estrelas{color:#f59e0b;font-size:14px}.num-avaliacoes{font-size:12px;color:#94a3b8}.precos{display:flex;align-items:center;gap:10px;margin-bottom:14px}.preco-antigo{font-size:13px;color:#94a3b8;text-decoration:line-through}.preco-novo{font-size:20px;font-weight:800;color:#6366f1}.btn-comprar{width:100%;padding:11px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;transition:background 0.2s}.btn-comprar:hover{background:#4f46e5}`,
  finalJs: `const b=document.querySelector('.btn-comprar'),f=document.createElement('button');f.className='btn-fav';f.textContent='♡';document.querySelector('.card-img-wrapper').appendChild(f);let fav=false;f.addEventListener('click',()=>{fav=!fav;f.textContent=fav?'❤️':'♡';f.style.color=fav?'#ef4444':'#fff';});b.addEventListener('click',()=>{b.textContent='✅ Adicionado!';b.style.background='#22c55e';b.disabled=true;setTimeout(()=>{b.textContent='🛒 Adicionar ao carrinho';b.style.background='#6366f1';b.disabled=false;},2000);});`,
};

// ── FASE 5 — JS Avançado: To-Do List com LocalStorage ────────────────────────
export const miniProjectPhase5 = {
  id: 'mp-phase-5',
  title: 'To-Do List com LocalStorage',
  description: 'Construa um gerenciador de tarefas completo que salva os dados no navegador. O usuário pode adicionar, concluir, filtrar e excluir tarefas — e tudo persiste após fechar a aba.',
  steps: [
    {
      title: 'Estrutura e renderização',
      type: 'js',
      description: 'Implemente o carregamento do localStorage e a função render() que desenha as tarefas na tela.',
      hint: 'Use JSON.parse(localStorage.getItem("todos")) para carregar. Filtre com .filter() antes de renderizar.',
      starterCode: `// Estado global
let todos = JSON.parse(localStorage.getItem('todos') || '___');
let filtro = 'todas'; // 'todas' | 'ativas' | 'concluidas'

function salvar() {
  localStorage.setItem('todos', JSON.stringify(___));
}

function render() {
  const lista = document.getElementById('lista');
  const filtradas = todos.filter(t => {
    if (filtro === 'ativas')    return ___;
    if (filtro === 'concluidas') return ___;
    return true;
  });

  lista.innerHTML = filtradas.length === 0
    ? '<p class="vazio">Nenhuma tarefa aqui!</p>'
    : filtradas.map(t => \`
        <div class="todo \${t.feita ? 'feita' : ''}">
          <input type="checkbox" \${t.feita ? 'checked' : ''} onchange="toggle('\${t.id}')">
          <span>\${t.texto}</span>
          <button onclick="remover('\${t.id}')">✕</button>
        </div>
      \`).join('');

  document.getElementById('contador').textContent =
    todos.filter(t => !t.feita).length + ' tarefa(s) restante(s)';
}

render();`,
      baseHtml: `<div class="app"><h1>✅ To-Do</h1><div class="input-row"><input type="text" id="nova" placeholder="Nova tarefa..."><button onclick="adicionar()">Adicionar</button></div><div class="filtros"><button onclick="setFiltro('todas')" class="ativo">Todas</button><button onclick="setFiltro('ativas')">Ativas</button><button onclick="setFiltro('concluidas')">Concluídas</button></div><div id="lista"></div><div id="contador" class="contador"></div></div>`,
      baseCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;font-family:'Segoe UI',sans-serif;padding:24px}.app{max-width:420px;margin:0 auto;background:#fff;border-radius:16px;padding:24px;box-shadow:0 4px 24px rgba(0,0,0,.08)}h1{font-size:22px;font-weight:800;margin-bottom:18px;color:#1e293b}.input-row{display:flex;gap:8px;margin-bottom:14px}input[type=text]{flex:1;padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none}input[type=text]:focus{border-color:#6366f1}button{padding:10px 16px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer}.filtros{display:flex;gap:6px;margin-bottom:14px}.filtros button{background:#f1f5f9;color:#64748b;font-size:12px;padding:6px 12px}.filtros button.ativo{background:#6366f1;color:#fff}.todo{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:6px;transition:.2s}.todo.feita{opacity:.5}.todo.feita span{text-decoration:line-through}.todo input[type=checkbox]{accent-color:#6366f1;width:16px;height:16px;cursor:pointer}.todo span{flex:1;font-size:14px;color:#334155}.todo button{background:none;border:none;color:#94a3b8;font-size:14px;cursor:pointer;padding:2px 6px;border-radius:4px}.todo button:hover{color:#ef4444;background:#fff1f2}.vazio{text-align:center;color:#94a3b8;font-size:13px;padding:20px}.contador{font-size:12px;color:#94a3b8;margin-top:10px;text-align:right}`,
      baseJs: '',
      validate: (code) => code.includes("'[]'") && code.includes('todos') && code.includes('!t.feita') && code.includes('t.feita') && code.includes('render()'),
      errorMsg: 'Complete: use "[]" como fallback do JSON.parse, passe `todos` para salvar(), e filtre com !t.feita para ativas e t.feita para concluídas.',
      successMsg: '✅ Renderização funcionando!',
    },
    {
      title: 'Adicionar, concluir e remover',
      type: 'js',
      description: 'Implemente as funções adicionar(), toggle() e remover() que manipulam o array e persistem no localStorage.',
      hint: 'Use Date.now().toString() como id único. toggle() alterna t.feita com !t.feita. remover() filtra pelo id.',
      starterCode: `let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let filtro = 'todas';
function salvar() { localStorage.setItem('todos', JSON.stringify(todos)); }

function adicionar() {
  const input = document.getElementById('nova');
  const texto = input.value.___;
  if (!texto) return;
  todos.___ ({
    id: ___,
    texto,
    feita: false,
    criadaEm: new Date().toLocaleDateString('pt-BR')
  });
  salvar();
  input.value = '';
  render();
}

function toggle(id) {
  todos = todos.map(t => t.id === id ? { ...t, feita: ___ } : t);
  salvar();
  render();
}

function remover(id) {
  todos = todos.___(t => t.id !== id);
  salvar();
  render();
}

function setFiltro(f) {
  filtro = f;
  document.querySelectorAll('.filtros button').forEach(b => b.classList.remove('ativo'));
  event.target.classList.add('ativo');
  render();
}

function render() {
  const filtradas = todos.filter(t => filtro === 'ativas' ? !t.feita : filtro === 'concluidas' ? t.feita : true);
  document.getElementById('lista').innerHTML = filtradas.length === 0
    ? '<p class="vazio">Nenhuma tarefa aqui!</p>'
    : filtradas.map(t => \`<div class="todo \${t.feita?'feita':''}"><input type="checkbox" \${t.feita?'checked':''} onchange="toggle('\${t.id}')"><span>\${t.texto}</span><button onclick="remover('\${t.id}')">✕</button></div>\`).join('');
  document.getElementById('contador').textContent = todos.filter(t=>!t.feita).length + ' tarefa(s) restante(s)';
}

document.getElementById('nova').addEventListener('keydown', e => { if(e.key==='Enter') adicionar(); });
render();`,
      baseHtml: `<div class="app"><h1>✅ To-Do</h1><div class="input-row"><input type="text" id="nova" placeholder="Nova tarefa..."><button onclick="adicionar()">Adicionar</button></div><div class="filtros"><button onclick="setFiltro('todas')" class="ativo">Todas</button><button onclick="setFiltro('ativas')">Ativas</button><button onclick="setFiltro('concluidas')">Concluídas</button></div><div id="lista"></div><div id="contador" class="contador"></div></div>`,
      baseCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;font-family:'Segoe UI',sans-serif;padding:24px}.app{max-width:420px;margin:0 auto;background:#fff;border-radius:16px;padding:24px;box-shadow:0 4px 24px rgba(0,0,0,.08)}h1{font-size:22px;font-weight:800;margin-bottom:18px;color:#1e293b}.input-row{display:flex;gap:8px;margin-bottom:14px}input[type=text]{flex:1;padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none}input[type=text]:focus{border-color:#6366f1}button{padding:10px 16px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer}.filtros{display:flex;gap:6px;margin-bottom:14px}.filtros button{background:#f1f5f9;color:#64748b;font-size:12px;padding:6px 12px}.filtros button.ativo{background:#6366f1;color:#fff}.todo{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:6px}.todo.feita{opacity:.5}.todo.feita span{text-decoration:line-through}.todo input[type=checkbox]{accent-color:#6366f1;width:16px;height:16px;cursor:pointer}.todo span{flex:1;font-size:14px;color:#334155}.todo button{background:none;border:none;color:#94a3b8;font-size:14px;cursor:pointer;padding:2px 6px;border-radius:4px}.todo button:hover{color:#ef4444}.vazio{text-align:center;color:#94a3b8;font-size:13px;padding:20px}.contador{font-size:12px;color:#94a3b8;margin-top:10px;text-align:right}`,
      baseJs: '',
      validate: (code) => code.includes('.push(') && code.includes('Date.now()') && code.includes('!t.feita') && code.includes('.filter(') && code.includes('salvar()'),
      errorMsg: 'Use .trim() no texto, .push() para adicionar, Date.now().toString() como id, !t.feita para toggle e .filter() para remover.',
      successMsg: '🎉 To-Do List completa com persistência no localStorage!',
    },
  ],
  finalHtml: `<div class="app"><h1>✅ To-Do</h1><div class="input-row"><input type="text" id="nova" placeholder="Nova tarefa..."><button onclick="adicionar()">Adicionar</button></div><div class="filtros"><button onclick="setFiltro('todas')" class="ativo">Todas</button><button onclick="setFiltro('ativas')">Ativas</button><button onclick="setFiltro('concluidas')">Concluídas</button></div><div id="lista"></div><div id="contador" class="contador"></div></div>`,
  finalCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;font-family:'Segoe UI',sans-serif;padding:24px}.app{max-width:420px;margin:0 auto;background:#fff;border-radius:16px;padding:24px;box-shadow:0 4px 24px rgba(0,0,0,.08)}h1{font-size:22px;font-weight:800;margin-bottom:18px;color:#1e293b}.input-row{display:flex;gap:8px;margin-bottom:14px}input[type=text]{flex:1;padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none}input[type=text]:focus{border-color:#6366f1}button{padding:10px 16px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer}.filtros{display:flex;gap:6px;margin-bottom:14px}.filtros button{background:#f1f5f9;color:#64748b;font-size:12px;padding:6px 12px}.filtros button.ativo{background:#6366f1;color:#fff}.todo{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:6px}.todo.feita{opacity:.5}.todo.feita span{text-decoration:line-through}.todo input[type=checkbox]{accent-color:#6366f1;width:16px;height:16px;cursor:pointer}.todo span{flex:1;font-size:14px;color:#334155}.todo button{background:none;border:none;color:#94a3b8;font-size:14px;cursor:pointer;padding:2px 6px}.todo button:hover{color:#ef4444}.vazio{text-align:center;color:#94a3b8;font-size:13px;padding:20px}.contador{font-size:12px;color:#94a3b8;margin-top:10px;text-align:right}`,
  finalJs: "let todos=JSON.parse(localStorage.getItem('todos')||'[]'),filtro='todas';function salvar(){localStorage.setItem('todos',JSON.stringify(todos));}function adicionar(){const i=document.getElementById('nova');const t=i.value.trim();if(!t)return;todos.push({id:Date.now().toString(),texto:t,feita:false});salvar();i.value='';render();}function toggle(id){todos=todos.map(t=>t.id===id?{...t,feita:!t.feita}:t);salvar();render();}function remover(id){todos=todos.filter(t=>t.id!==id);salvar();render();}function setFiltro(f){filtro=f;document.querySelectorAll('.filtros button').forEach(b=>b.classList.remove('ativo'));event.target.classList.add('ativo');render();}function render(){const f=todos.filter(t=>filtro==='ativas'?!t.feita:filtro==='concluidas'?t.feita:true);const html=f.map(function(t){return '<div class=\"todo '+(t.feita?'feita':'')+'\">'+'<input type=\"checkbox\"'+(t.feita?' checked':'')+' onchange=\"toggle(\\''+t.id+'\\')\"><span>'+t.texto+'</span><button onclick=\"remover(\\''+t.id+'\\')\">&#10005;</button></div>';});document.getElementById('lista').innerHTML=f.length===0?'<p class=\"vazio\">Nenhuma tarefa!</p>':html.join('');document.getElementById('contador').textContent=todos.filter(t=>!t.feita).length+' tarefa(s) restante(s)';}document.getElementById('nova').addEventListener('keydown',function(e){if(e.key==='Enter')adicionar();});render();",
};

// ── FASE 6 — React: Contador com useReducer ───────────────────────────────────
export const miniProjectPhase6 = {
  id: 'mp-phase-6',
  title: 'App de Finanças Pessoais com React',
  description: 'Construa um app de controle de gastos com React: adicione receitas e despesas, veja o saldo atualizado em tempo real e filtre por tipo.',
  steps: [
    {
      title: 'Componente de entrada',
      type: 'js',
      description: 'Crie o componente Form que gerencia seu próprio estado com useState para descrição, valor e tipo.',
      hint: 'Use useState para cada campo. O select deve ter opções "receita" e "despesa". Chame onAdd com o objeto da transação ao submeter.',
      starterCode: `import { ___ } from 'react';

function Form({ onAdd }) {
  const [descricao, setDescricao] = ___('' );
  const [valor, setValor]         = ___('' );
  const [tipo, setTipo]           = ___('receita');

  function handleSubmit(e) {
    e.preventDefault();
    if (!descricao.trim() || !valor || Number(valor) <= 0) return;
    onAdd({
      id: Date.now(),
      descricao: descricao.trim(),
      valor: Number(valor),
      tipo,
    });
    setDescricao('');
    setValor('');
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input value={descricao} onChange={e => setDescricao(___)} placeholder="Descrição" />
      <input type="number" value={valor} onChange={e => setValor(___)} placeholder="Valor" min="0" step="0.01" />
      <select value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="receita">+ Receita</option>
        <option value="despesa">- Despesa</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
}`,
      baseHtml: '', baseCss: '', baseJs: '',
      validate: (code) => code.includes('useState') && code.includes('onAdd(') && code.includes('e.target.value') && code.includes('handleSubmit'),
      errorMsg: 'Importe useState do react, use useState para cada campo, e chame setDescricao(e.target.value) no onChange.',
      successMsg: '✅ Formulário com estado local pronto!',
    },
    {
      title: 'Lista e saldo em tempo real',
      type: 'js',
      description: 'Implemente o App principal com useReducer para gerenciar as transações. Calcule o saldo total e exiba cada item.',
      hint: 'Use useReducer com as ações ADD e REMOVE. O saldo é a soma: receitas - despesas. Use .reduce() para calcular.',
      starterCode: `import { useReducer } from 'react';

const inicial = { transacoes: [] };

function reducer(state, action) {
  switch (action.type) {
    case '___':
      return { ...state, transacoes: [...state.transacoes, action.payload] };
    case '___':
      return { ...state, transacoes: state.transacoes.filter(t => t.id !== action.id) };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, inicial);

  const saldo = state.transacoes.reduce((acc, t) => {
    return t.tipo === 'receita' ? acc + ___ : acc - ___;
  }, 0);

  function adicionar(transacao) {
    dispatch({ type: 'ADD', payload: transacao });
  }

  function remover(id) {
    dispatch({ type: 'REMOVE', id });
  }

  return (
    <div className="app">
      <h1>💰 Finanças</h1>
      <div className={\`saldo \${saldo >= 0 ? 'positivo' : 'negativo'}\`}>
        Saldo: R$ {saldo.toFixed(2).replace('.', ',')}
      </div>
      <Form onAdd={adicionar} />
      <div className="lista">
        {state.transacoes.map(t => (
          <div key={t.id} className={\`item \${t.tipo}\`}>
            <span>{t.descricao}</span>
            <span className="valor">{t.tipo === 'receita' ? '+' : '-'} R$ {t.valor.toFixed(2)}</span>
            <button onClick={() => remover(t.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      baseHtml: '', baseCss: '', baseJs: '',
      validate: (code) => code.includes("case 'ADD'") && code.includes("case 'REMOVE'") && code.includes('t.valor') && code.includes('.reduce('),
      errorMsg: "Complete os cases 'ADD' e 'REMOVE' no reducer, e use t.valor no .reduce() para calcular o saldo.",
      successMsg: '🎉 App de finanças com useReducer funcionando!',
    },
  ],
  finalHtml: `<div id="root"></div>`,
  finalCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#f0fdf4;font-family:'Segoe UI',sans-serif;padding:24px}.app{max-width:420px;margin:0 auto}h1{font-size:22px;font-weight:800;margin-bottom:16px;color:#14532d}.saldo{font-size:24px;font-weight:800;text-align:center;padding:16px;border-radius:12px;margin-bottom:16px}.saldo.positivo{background:#dcfce7;color:#16a34a}.saldo.negativo{background:#fee2e2;color:#dc2626}.form{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}.form input,.form select{padding:10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none}.form button{padding:10px;background:#16a34a;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer}.item{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:8px;margin-bottom:6px;background:#fff;border:1px solid #e2e8f0}.item span:first-child{flex:1;font-size:14px}.valor{font-weight:700}.item.receita .valor{color:#16a34a}.item.despesa .valor{color:#dc2626}.item button{background:none;border:none;color:#94a3b8;cursor:pointer}`,
  finalJs: '',
};

// ── FASE 7 — TypeScript: Type-safe Todo ──────────────────────────────────────
export const miniProjectPhase7 = {
  id: 'mp-phase-7',
  title: 'API de Tarefas com TypeScript',
  description: 'Construa um módulo de gerenciamento de tarefas com TypeScript: interfaces, generics, type guards e funções tipadas. O resultado é um módulo reutilizável e type-safe.',
  steps: [
    {
      title: 'Interfaces e tipos',
      type: 'js',
      description: 'Defina as interfaces e tipos para o sistema de tarefas: Task, Priority, Status e o tipo de filtro.',
      hint: 'Use type para union types (string literals) e interface para objetos. Campos opcionais usam ? após o nome.',
      starterCode: `// Tipos literais — só esses valores são aceitos
type Priority = '___ ' | 'media' | 'baixa';
type Status   = 'pendente' | '___' | 'cancelada';

// Interface da tarefa — define a forma do objeto
interface Task {
  id:          number;
  titulo:      string;
  prioridade:  ___;
  status:      Status;
  criadaEm:   Date;
  concluidaEm?: ___; // opcional — só existe quando concluída
  tags:        string[];
}

// Interface para criar tarefa (sem campos gerados automaticamente)
interface CriarTask {
  titulo:     string;
  prioridade: Priority;
  tags?:      string[];
}

// Tipo de resultado genérico — reutilizável em qualquer função
interface Resultado<___> {
  sucesso: boolean;
  dados?:  T;
  erro?:   string;
}`,
      baseHtml: '', baseCss: '', baseJs: '',
      validate: (code) => (code.includes("'alta'") || code.includes('"alta"')) && code.includes('interface Task') && code.includes('interface Resultado') && code.includes('<') && code.includes('>'),
      errorMsg: "Complete: Priority com 'alta', Status com 'concluida', Date para concluidaEm?, e T como parâmetro genérico do Resultado.",
      successMsg: '✅ Tipos e interfaces definidos!',
    },
    {
      title: 'Funções tipadas e type guards',
      type: 'js',
      description: 'Implemente as funções CRUD com tipagem completa e um type guard para verificar prioridade.',
      hint: 'Type guards retornam `valor is Tipo`. Use includes() para checar se o valor está na lista de valores válidos.',
      starterCode: `// Type guard — verifica em tempo de execução se é uma Priority válida
function isPriority(valor: string): valor is Priority {
  return (['alta', 'media', 'baixa'] as string[]).___(valor);
}

// Banco em memória tipado
const tarefas: Task[] = [];
let proximoId = 1;

// Criar tarefa com validação
function criarTask(dados: CriarTask): Resultado<Task> {
  if (!dados.titulo.trim()) {
    return { sucesso: ___, erro: 'Título obrigatório' };
  }

  const task: Task = {
    id:         proximoId++,
    titulo:     dados.titulo.trim(),
    prioridade: dados.prioridade,
    status:     '___',
    criadaEm:  new Date(),
    tags:       dados.tags ?? [],
  };

  tarefas.push(task);
  return { sucesso: true, dados: ___ };
}

// Concluir tarefa
function concluirTask(id: number): Resultado<Task> {
  const task = tarefas.find(t => t.id === id);
  if (!task) return { sucesso: false, erro: \`Task \${id} não encontrada\` };

  task.status      = 'concluida';
  task.concluidaEm = ___;
  return { sucesso: true, dados: task };
}

// Filtrar por status
function filtrarPorStatus(status: Status): Task[] {
  return tarefas.filter(t => t.status === ___);
}

// Testar
const r1 = criarTask({ titulo: 'Estudar TypeScript', prioridade: 'alta', tags: ['estudo'] });
const r2 = criarTask({ titulo: 'Fazer exercícios',   prioridade: 'media' });
console.log('Criadas:', r1.sucesso, r2.sucesso);
concluirTask(1);
console.log('Pendentes:', filtrarPorStatus('pendente').length);
console.log('Concluídas:', filtrarPorStatus('concluida').length);`,
      baseHtml: '', baseCss: '', baseJs: '',
      validate: (code) => code.includes('.includes(') && code.includes('sucesso: false') && code.includes('new Date()') && code.includes('filtrarPorStatus'),
      errorMsg: 'Use .includes(valor) no type guard, false para erro de validação, "pendente" como status inicial, new Date() para concluidaEm, e task como dados retornados.',
      successMsg: '🎉 Módulo TypeScript type-safe completo!',
    },
  ],
  finalHtml: `<div id="root"><pre id="output" style="font-family:monospace;font-size:13px;background:#0d1117;color:#7ee787;padding:20px;border-radius:8px;line-height:1.8"></pre></div>`,
  finalCss: `body{background:#0d1117;padding:20px}`,
  finalJs: `const out=document.getElementById('output');function log(...a){out.textContent+=a.join(' ')+'\\n';}const tarefas=[];let pid=1;function criar(d){if(!d.titulo.trim())return{sucesso:false,erro:'Título obrigatório'};const t={id:pid++,titulo:d.titulo.trim(),prioridade:d.prioridade,status:'pendente',criadaEm:new Date(),tags:d.tags||[]};tarefas.push(t);return{sucesso:true,dados:t};}function concluir(id){const t=tarefas.find(t=>t.id===id);if(!t)return{sucesso:false,erro:'Não encontrada'};t.status='concluida';t.concluidaEm=new Date();return{sucesso:true,dados:t};}const r1=criar({titulo:'Estudar TypeScript',prioridade:'alta',tags:['estudo']});const r2=criar({titulo:'Fazer exercícios',prioridade:'media'});log('✅ Criadas:',r1.sucesso,r2.sucesso);concluir(1);log('📋 Pendentes:',tarefas.filter(t=>t.status==='pendente').length);log('✔️ Concluídas:',tarefas.filter(t=>t.status==='concluida').length);log('🏷️ Tags da task 1:',r1.dados.tags.join(', '));`,
};

// ── FASE 8 — Node/Express: API REST de Contatos ───────────────────────────────
export const miniProjectPhase8 = {
  id: 'mp-phase-9',
  title: 'Simulador de API REST',
  description: 'Simule uma API REST de contatos no navegador: implemente os endpoints GET, POST, PUT e DELETE com validação, status codes corretos e respostas JSON.',
  steps: [
    {
      title: 'Banco em memória e GET',
      type: 'js',
      description: 'Crie o banco de dados em memória e implemente o roteador que processa GET /contatos e GET /contatos/:id.',
      hint: 'Um "roteador" no browser é uma função que recebe {method, path, body} e retorna {status, data}. Use .find() para buscar por id.',
      starterCode: `// Banco de dados em memória (simula o que seria um banco real)
let contatos = [
  { id: 1, nome: 'Ana Silva',   email: 'ana@exemplo.com',   tel: '11999990001' },
  { id: 2, nome: 'Bruno Costa', email: 'bruno@exemplo.com', tel: '11999990002' },
];
let proximoId = 3;

// Roteador: processa requisições simuladas
function api(method, path, body = null) {
  const partes = path.split('/').filter(Boolean); // ['contatos'] ou ['contatos','1']
  const recurso = partes[0];
  const id = partes[1] ? ___(partes[1]) : null; // converte para número

  if (recurso !== 'contatos') {
    return { status: 404, data: { erro: 'Rota não encontrada' } };
  }

  // GET /contatos — lista todos
  if (method === 'GET' && !id) {
    return { status: ___, data: contatos };
  }

  // GET /contatos/:id — busca um
  if (method === 'GET' && id) {
    const contato = contatos.find(c => c.id === ___);
    if (!contato) return { status: 404, data: { erro: 'Contato não encontrado' } };
    return { status: 200, data: contato };
  }

  return { status: 405, data: { erro: 'Método não permitido' } };
}

// Testa o roteador
log(api('GET', '/contatos'));
log(api('GET', '/contatos/1'));
log(api('GET', '/contatos/99'));`,
      baseHtml: `<div style="font-family:monospace;background:#0d1117;color:#c9d1d9;padding:20px;min-height:100vh"><h2 style="color:#58a6ff;margin-bottom:16px">🔌 API REST Simulator</h2><div id="output"></div></div>`,
      baseCss: `.req{margin-bottom:12px;padding:12px;border-radius:8px;background:#161b22;border:1px solid #30363d}.method{font-weight:700;margin-right:8px}.GET{color:#3fb950}.POST{color:#58a6ff}.PUT{color:#d29922}.DELETE{color:#f85149}.status{float:right;font-size:12px;padding:2px 8px;border-radius:4px;background:#21262d}.s200,.s201{color:#3fb950}.s404{color:#f85149}.body{margin-top:8px;font-size:12px;color:#8b949e;white-space:pre-wrap}`,
      baseJs: '',
      validate: (code) => code.includes('parseInt(') && code.includes('status: 200') && code.includes('.find(') && code.includes("method === 'GET'"),
      errorMsg: "Use parseInt() para converter o id, 200 como status de sucesso, e .find(c => c.id === id) para buscar.",
      successMsg: '✅ GET funcionando! Agora POST, PUT e DELETE.',
    },
    {
      title: 'POST, PUT e DELETE',
      type: 'js',
      description: 'Adicione os métodos de escrita: POST cria, PUT atualiza, DELETE remove. Cada um com status code correto e validação.',
      hint: 'POST retorna 201 (Created). PUT e DELETE retornam 200. Se não encontrar o recurso, retorna 404. Valide campos obrigatórios no POST.',
      starterCode: `let contatos=[{id:1,nome:'Ana Silva',email:'ana@exemplo.com',tel:'11999990001'},{id:2,nome:'Bruno Costa',email:'bruno@exemplo.com',tel:'11999990002'}];
let proximoId=3;

function api(method, path, body=null) {
  const partes=path.split('/').filter(Boolean);
  const id=partes[1]?parseInt(partes[1]):null;
  if(partes[0]!=='contatos') return {status:404,data:{erro:'Rota não encontrada'}};

  if(method==='GET'&&!id) return {status:200,data:contatos};
  if(method==='GET'&&id) {
    const c=contatos.find(c=>c.id===id);
    return c?{status:200,data:c}:{status:404,data:{erro:'Não encontrado'}};
  }

  // POST /contatos — cria novo contato
  if(method==='POST') {
    if(!body?.nome||!body?.email) {
      return { status: ___, data: { erro: 'nome e email são obrigatórios' } };
    }
    const novo = { id: proximoId++, ...body };
    contatos.push(novo);
    return { status: ___, data: novo }; // 201 Created
  }

  // PUT /contatos/:id — atualiza
  if(method==='PUT'&&id) {
    const idx=contatos.findIndex(c=>c.id===id);
    if(idx===-1) return {status:404,data:{erro:'Não encontrado'}};
    contatos[idx] = { ...contatos[idx], ___ }; // merge com os dados novos
    return {status:200,data:contatos[idx]};
  }

  // DELETE /contatos/:id — remove
  if(method==='DELETE'&&id) {
    const antes=contatos.length;
    contatos=contatos.filter(c=>c.id!==___);
    if(contatos.length===antes) return {status:404,data:{erro:'Não encontrado'}};
    return {status:200,data:{mensagem:'Contato removido'}};
  }

  return {status:405,data:{erro:'Método não permitido'}};
}

// Testa todos os métodos
log(api('POST','/contatos',{nome:'Carlos',email:'carlos@ex.com',tel:'11900000003'}));
log(api('PUT', '/contatos/1',{nome:'Ana Santos'}));
log(api('DELETE','/contatos/2'));
log(api('GET','/contatos'));`,
      baseHtml: `<div style="font-family:monospace;background:#0d1117;color:#c9d1d9;padding:20px;min-height:100vh"><h2 style="color:#58a6ff;margin-bottom:16px">🔌 API REST Simulator</h2><div id="output"></div></div>`,
      baseCss: `.req{margin-bottom:12px;padding:12px;border-radius:8px;background:#161b22;border:1px solid #30363d}.method{font-weight:700;margin-right:8px}.GET{color:#3fb950}.POST{color:#58a6ff}.PUT{color:#d29922}.DELETE{color:#f85149}.status{float:right;font-size:12px;padding:2px 8px;border-radius:4px;background:#21262d}.s200,.s201{color:#3fb950}.s400,.s404{color:#f85149}.body{margin-top:8px;font-size:12px;color:#8b949e;white-space:pre-wrap}`,
      baseJs: `function log(result){const d=document.getElementById('output');const div=document.createElement('div');div.className='req';div.innerHTML='<span class="status s'+result.status+'">'+result.status+'</span><pre class="body">'+JSON.stringify(result.data,null,2)+'</pre>';d.appendChild(div);}`,
      validate: (code) => code.includes('status: 400') && code.includes('status: 201') && code.includes('...body') && code.includes('!== id'),
      errorMsg: 'Use 400 para validação, 201 para criação, ...body no merge do PUT, e id no filter do DELETE.',
      successMsg: '🎉 API REST completa com todos os verbos HTTP!',
    },
  ],
  finalHtml: `<div style="font-family:monospace;background:#0d1117;color:#c9d1d9;padding:20px;min-height:100vh"><h2 style="color:#58a6ff;margin-bottom:16px">🔌 API REST Simulator</h2><div id="output"></div></div>`,
  finalCss: `.req{margin-bottom:12px;padding:12px;border-radius:8px;background:#161b22;border:1px solid #30363d}.method{font-weight:700;margin-right:8px}.status{float:right;font-size:12px;padding:2px 8px;border-radius:4px;background:#21262d}.s200,.s201{color:#3fb950}.s400,.s404{color:#f85149}.body{margin-top:8px;font-size:12px;color:#8b949e;white-space:pre-wrap}`,
  finalJs: `function log(r){const d=document.getElementById('output'),div=document.createElement('div');div.className='req';div.innerHTML='<span class="status s'+r.status+'">'+r.status+'</span><pre class="body">'+JSON.stringify(r.data,null,2)+'</pre>';d.appendChild(div);}let c=[{id:1,nome:'Ana',email:'ana@ex.com'},{id:2,nome:'Bruno',email:'bruno@ex.com'}],pid=3;function api(m,p,b=null){const pts=p.split('/').filter(Boolean),id=pts[1]?parseInt(pts[1]):null;if(pts[0]!=='contatos')return{status:404,data:{erro:'Rota não encontrada'}};if(m==='GET'&&!id)return{status:200,data:c};if(m==='GET'&&id){const x=c.find(x=>x.id===id);return x?{status:200,data:x}:{status:404,data:{erro:'Não encontrado'}};}if(m==='POST'){if(!b?.nome||!b?.email)return{status:400,data:{erro:'nome e email obrigatórios'}};const n={id:pid++,...b};c.push(n);return{status:201,data:n};}if(m==='PUT'&&id){const i=c.findIndex(x=>x.id===id);if(i===-1)return{status:404,data:{erro:'Não encontrado'}};c[i]={...c[i],...b};return{status:200,data:c[i]};}if(m==='DELETE'&&id){const a=c.length;c=c.filter(x=>x.id!==id);return c.length===a?{status:404,data:{erro:'Não encontrado'}}:{status:200,data:{mensagem:'Removido'}};}return{status:405,data:{erro:'Método não permitido'}};}log(api('POST','/contatos',{nome:'Carlos',email:'carlos@ex.com'}));log(api('PUT','/contatos/1',{nome:'Ana Santos'}));log(api('DELETE','/contatos/2'));log(api('GET','/contatos'));`,
};

// ── FASE 12 — Algoritmos: Visualizador de Sorting ────────────────────────────
export const miniProjectPhase12 = {
  id: 'mp-phase-17',
  title: 'Visualizador de Algoritmos de Ordenação',
  description: 'Construa um visualizador animado de algoritmos de ordenação. Veja o Bubble Sort e o Selection Sort funcionando em tempo real com barras coloridas.',
  steps: [
    {
      title: 'Canvas de barras',
      type: 'js',
      description: 'Crie a função que gera um array aleatório e renderiza as barras proporcionalmente.',
      hint: 'Use Math.random() * 90 + 10 para valores entre 10 e 100. Cada barra é uma div com height em % e width calculado.',
      starterCode: `let arr = [];
let animando = false;

function gerarArray(n = 30) {
  arr = Array.from({ length: ___ }, () => Math.floor(Math.random() * 90 + 10));
  renderizar(arr, [], []);
}

function renderizar(array, comparando = [], ordenados = []) {
  const container = document.getElementById('barras');
  const maxVal = Math.max(___);
  container.innerHTML = array.map((val, i) => {
    const cor = ordenados.includes(i) ? '#22d97e'
              : comparando.includes(i) ? '#f5a623'
              : '#6366f1';
    const altura = (val / maxVal * 100).toFixed(1);
    return \`<div class="barra" style="height:\${altura}%;background:\${cor};width:\${100/array.length - 0.5}%"></div>\`;
  }).join('');
}

gerarArray();`,
      baseHtml: `<div class="vis"><h2>Visualizador de Sorting</h2><div class="controles"><button onclick="gerarArray()">🔀 Novo array</button><button onclick="bubbleSort()">Bubble Sort</button><button onclick="selectionSort()">Selection Sort</button></div><div id="barras" class="barras"></div><div id="info" class="info"></div></div>`,
      baseCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#0a0a0f;color:#f0f0ff;font-family:'Segoe UI',sans-serif;padding:20px}.vis{max-width:700px;margin:0 auto}h2{font-size:18px;font-weight:800;margin-bottom:16px;color:#7c6af7}.controles{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}button{padding:8px 16px;background:#1a1a26;border:1px solid #2a2a3e;color:#f0f0ff;border-radius:8px;font-size:13px;cursor:pointer;transition:.2s}button:hover{border-color:#7c6af7;color:#7c6af7}.barras{display:flex;align-items:flex-end;height:220px;gap:1px;background:#0f0f17;border-radius:12px;padding:12px;border:1px solid #1a1a26}.barra{border-radius:3px 3px 0 0;transition:height .05s}.info{margin-top:12px;font-size:13px;color:#a8a8c0;min-height:20px}`,
      baseJs: '',
      validate: (code) => code.includes('Array.from') && code.includes('Math.random()') && code.includes('Math.max(') && code.includes('renderizar('),
      errorMsg: 'Use n como tamanho do Array.from, Math.max(...array) para o valor máximo, e chame renderizar() ao final.',
      successMsg: '✅ Array gerado e visualizado!',
    },
    {
      title: 'Bubble Sort animado',
      type: 'js',
      description: 'Implemente o Bubble Sort com animação: cada comparação acende as barras em laranja, e barras ordenadas ficam verdes.',
      hint: 'Use async/await com sleep() para animar. Troque elementos com desestruturação: [arr[j], arr[j+1]] = [arr[j+1], arr[j]].',
      starterCode: `let arr=[];let animando=false;
function gerarArray(n=30){arr=Array.from({length:n},()=>Math.floor(Math.random()*90+10));renderizar(arr,[],[]);}
function renderizar(array,comparando=[],ordenados=[]){const c=document.getElementById('barras'),m=Math.max(...array);c.innerHTML=array.map((v,i)=>{const cor=ordenados.includes(i)?'#22d97e':comparando.includes(i)?'#f5a623':'#6366f1';return\`<div class="barra" style="height:\${(v/m*100).toFixed(1)}%;background:\${cor};width:\${100/array.length-0.5}%"></div>\`;}).join('');}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function bubbleSort() {
  if (animando) return;
  animando = true;
  const a = [...arr];
  const n = a.length;
  const ordenados = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      renderizar(a, [j, j + 1], ordenados);
      await sleep(___); // velocidade da animação em ms

      if (a[j] > a[j + 1]) {
        // Troca os elementos
        [a[___], a[___]] = [a[j + 1], a[j]];
      }
    }
    ordenados.push(n - 1 - i);
    renderizar(a, [], ordenados);
  }
  ordenados.push(0);
  renderizar(a, [], ordenados);
  document.getElementById('info').textContent = 'Bubble Sort concluído! Complexidade: O(n²)';
  arr = a;
  animando = false;
}

async function selectionSort() {
  if (animando) return;
  animando = true;
  const a = [...arr];
  const n = a.length;
  const ordenados = [];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      renderizar(a, [minIdx, j], ordenados);
      await sleep(30);
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }
    ordenados.push(i);
    renderizar(a, [], ordenados);
  }
  ordenados.push(n - 1);
  renderizar(a, [], ordenados);
  document.getElementById('info').textContent = 'Selection Sort concluído! Complexidade: O(n²)';
  arr = a;
  animando = false;
}

gerarArray();`,
      baseHtml: `<div class="vis"><h2>Visualizador de Sorting</h2><div class="controles"><button onclick="gerarArray()">🔀 Novo array</button><button onclick="bubbleSort()">Bubble Sort</button><button onclick="selectionSort()">Selection Sort</button></div><div id="barras" class="barras"></div><div id="info" class="info"></div></div>`,
      baseCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#0a0a0f;color:#f0f0ff;font-family:'Segoe UI',sans-serif;padding:20px}.vis{max-width:700px;margin:0 auto}h2{font-size:18px;font-weight:800;margin-bottom:16px;color:#7c6af7}.controles{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}button{padding:8px 16px;background:#1a1a26;border:1px solid #2a2a3e;color:#f0f0ff;border-radius:8px;font-size:13px;cursor:pointer;transition:.2s}button:hover{border-color:#7c6af7;color:#7c6af7}.barras{display:flex;align-items:flex-end;height:220px;gap:1px;background:#0f0f17;border-radius:12px;padding:12px;border:1px solid #1a1a26}.barra{border-radius:3px 3px 0 0;transition:height .05s}.info{margin-top:12px;font-size:13px;color:#a8a8c0;min-height:20px}`,
      baseJs: '',
      validate: (code) => code.includes('await sleep(') && code.includes('[a[j], a[j+1]]') || (code.includes('await sleep') && code.includes('[a[') && code.includes('] = [a[')),
      errorMsg: 'Use await sleep(30) para a animação e [a[j], a[j+1]] = [a[j+1], a[j]] para a troca.',
      successMsg: '🎉 Visualizador de sorting animado funcionando!',
    },
  ],
  finalHtml: `<div class="vis"><h2>Visualizador de Sorting</h2><div class="controles"><button onclick="gerarArray()">🔀 Novo array</button><button onclick="bubbleSort()">Bubble Sort</button><button onclick="selectionSort()">Selection Sort</button></div><div id="barras" class="barras"></div><div id="info" class="info"></div></div>`,
  finalCss: `*{box-sizing:border-box;margin:0;padding:0}body{background:#0a0a0f;color:#f0f0ff;font-family:'Segoe UI',sans-serif;padding:20px}.vis{max-width:700px;margin:0 auto}h2{font-size:18px;font-weight:800;margin-bottom:16px;color:#7c6af7}.controles{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}button{padding:8px 16px;background:#1a1a26;border:1px solid #2a2a3e;color:#f0f0ff;border-radius:8px;font-size:13px;cursor:pointer;transition:.2s}button:hover{border-color:#7c6af7;color:#7c6af7}.barras{display:flex;align-items:flex-end;height:220px;gap:1px;background:#0f0f17;border-radius:12px;padding:12px;border:1px solid #1a1a26}.barra{border-radius:3px 3px 0 0}.info{margin-top:12px;font-size:13px;color:#a8a8c0;min-height:20px}`,
  finalJs: `let arr=[],animando=false;const sleep=ms=>new Promise(r=>setTimeout(r,ms));function gerarArray(n=30){arr=Array.from({length:n},()=>Math.floor(Math.random()*90+10));renderizar(arr,[],[]);}function renderizar(a,c=[],o=[]){const el=document.getElementById('barras'),m=Math.max(...a);el.innerHTML=a.map((v,i)=>{const cor=o.includes(i)?'#22d97e':c.includes(i)?'#f5a623':'#6366f1';return'<div class="barra" style="height:'+(v/m*100).toFixed(1)+'%;background:'+cor+';width:'+(100/a.length-0.5)+'%"></div>';}).join('');}async function bubbleSort(){if(animando)return;animando=true;const a=[...arr],n=a.length,o=[];for(let i=0;i<n-1;i++){for(let j=0;j<n-i-1;j++){renderizar(a,[j,j+1],o);await sleep(30);if(a[j]>a[j+1])[a[j],a[j+1]]=[a[j+1],a[j]];}o.push(n-1-i);renderizar(a,[],o);}o.push(0);renderizar(a,[],o);document.getElementById('info').textContent='Bubble Sort! O(n²)';arr=a;animando=false;}async function selectionSort(){if(animando)return;animando=true;const a=[...arr],n=a.length,o=[];for(let i=0;i<n-1;i++){let m=i;for(let j=i+1;j<n;j++){renderizar(a,[m,j],o);await sleep(30);if(a[j]<a[m])m=j;}if(m!==i)[a[i],a[m]]=[a[m],a[i]];o.push(i);renderizar(a,[],o);}o.push(n-1);renderizar(a,[],o);document.getElementById('info').textContent='Selection Sort! O(n²)';arr=a;animando=false;}gerarArray();`,
};

// ── Mini Projeto: Fase 13 (Banco de Dados) ───────────────────────────────────
export const miniProjectPhase13 = {
  id: 'mp-phase-12',
  title: 'ORM de Tarefas com Queries Avançadas',
  description: 'Construa um mini ORM (simulado em JS) para um sistema de tarefas com categorias. Pratique JOIN, GROUP BY, transações e índices — os conceitos que todo dev sênior precisa dominar.',
  steps: [
    {
      title: 'Schema e dados iniciais',
      type: 'js',
      description: 'Crie as tabelas (objetos JS) para users, tasks e categories, e popule com dados de exemplo para usar nas queries.',
      hint: 'Pense em um banco relacional: tasks tem userId e categoryId como chaves estrangeiras. Use arrays de objetos para simular as tabelas.',
      starterCode: `// Simule um banco de dados relacional com objetos JS
const db = {
  users: [
    { id: 1, name: 'Ana Silva',  email: 'ana@dev.com' },
    { id: 2, name: 'Bruno Costa', email: 'bruno@dev.com' },
  ],
  categories: [
    { id: 1, name: 'Trabalho' },
    { id: 2, name: 'Pessoal' },
    { id: 3, name: 'Estudos' },
  ],
  tasks: [
    { id: 1, title: 'Revisar PR',        userId: 1, categoryId: 1, done: false, priority: 'high' },
    { id: 2, title: 'Academia',          userId: 1, categoryId: 2, done: true,  priority: 'medium' },
    { id: 3, title: 'Estudar Next.js',   userId: 2, categoryId: 3, done: false, priority: 'high' },
    { id: 4, title: 'Reunião semanal',   userId: 2, categoryId: 1, done: false, priority: 'low' },
    { id: 5, title: 'Ler livro',         userId: 1, categoryId: 2, done: false, priority: 'low' },
  ],
};

// Implemente findTasksWithUser(userId) que retorna as tasks do usuário
// com o nome do usuário e o nome da categoria (JOIN simulado)
function findTasksWithUser(userId) {
  // Faça o "JOIN" manualmente: para cada task do userId,
  // busque o user e a category correspondentes
}

const result = findTasksWithUser(1);
console.log(JSON.stringify(result, null, 2));`,
      validate: (code, output) => {
        const o = output;
        return o.includes('Ana Silva') && o.includes('Trabalho') && o.includes('title');
      },
      solution: `function findTasksWithUser(userId) {
  return db.tasks
    .filter(t => t.userId === userId)
    .map(t => ({
      ...t,
      userName: db.users.find(u => u.id === t.userId)?.name,
      categoryName: db.categories.find(c => c.id === t.categoryId)?.name,
    }));
}`,
    },
    {
      title: 'Agregações e GROUP BY',
      type: 'js',
      description: 'Implemente queries de agregação: contar tarefas por categoria, calcular taxa de conclusão por usuário.',
      hint: 'Use reduce() para agrupar — é o equivalente JS de GROUP BY. Acumule contagens em um objeto { categoryId: count }.',
      starterCode: `const db = {
  users: [{ id: 1, name: 'Ana' }, { id: 2, name: 'Bruno' }],
  categories: [{ id: 1, name: 'Trabalho' }, { id: 2, name: 'Pessoal' }, { id: 3, name: 'Estudos' }],
  tasks: [
    { id: 1, userId: 1, categoryId: 1, done: false },
    { id: 2, userId: 1, categoryId: 2, done: true  },
    { id: 3, userId: 2, categoryId: 3, done: false },
    { id: 4, userId: 2, categoryId: 1, done: false },
    { id: 5, userId: 1, categoryId: 2, done: false },
  ],
};

// 1. tasksPorCategoria(): { categoryName, total, concluidas }[]
// 2. taxaConclusaoPorUsuario(): { userName, total, concluidas, percentual }[]
function tasksPorCategoria() {
  // Use reduce para agrupar por categoryId, depois mapeie os nomes
}

function taxaConclusaoPorUsuario() {
  // Agrupe por userId, calcule percentual = (concluidas/total * 100).toFixed(0) + '%'
}

console.log('Por categoria:', tasksPorCategoria());
console.log('Por usuário:', taxaConclusaoPorUsuario());`,
      validate: (code, output) => {
        return output.includes('Trabalho') && output.includes('percentual') && output.includes('Ana');
      },
      solution: `function tasksPorCategoria() {
  const grouped = db.tasks.reduce((acc, t) => {
    if (!acc[t.categoryId]) acc[t.categoryId] = { total: 0, concluidas: 0 };
    acc[t.categoryId].total++;
    if (t.done) acc[t.categoryId].concluidas++;
    return acc;
  }, {});
  return Object.entries(grouped).map(([catId, stats]) => ({
    categoryName: db.categories.find(c => c.id === +catId)?.name,
    ...stats,
  }));
}`,
    },
    {
      title: 'Transação simulada',
      type: 'js',
      description: 'Implemente uma transação que transfira tarefas de um usuário para outro — se qualquer etapa falhar, nada é salvo (atomicidade).',
      hint: 'Antes de modificar os dados reais, trabalhe em uma cópia. Só substitua os dados originais se tudo der certo. Isso simula o ROLLBACK de uma transação.',
      starterCode: `let tasks = [
  { id: 1, userId: 1, title: 'Revisar PR',      done: false },
  { id: 2, userId: 1, title: 'Deploy produção', done: false },
  { id: 3, userId: 2, title: 'Testes',          done: true  },
];

// Implemente transferirTarefas(fromUserId, toUserId, taskIds)
// Deve:
// 1. Verificar que todas as taskIds existem e pertencem ao fromUserId
// 2. Se qualquer task não existir ou não pertencer: ROLLBACK (retorne { ok: false, error })
// 3. Se tudo ok: transferir e retornar { ok: true, transferidas: N }
function transferirTarefas(fromUserId, toUserId, taskIds) {
  // Trabalhe em uma cópia para garantir atomicidade
  const copia = tasks.map(t => ({ ...t }));
  // valide e transfira na cópia, só depois atualize tasks
}

console.log(transferirTarefas(1, 2, [1, 2])); // deve funcionar
console.log(transferirTarefas(1, 2, [1, 99])); // task 99 não existe → rollback
console.log('Tasks userId=2:', tasks.filter(t => t.userId === 2).map(t => t.title));`,
      validate: (code, output) => {
        const o = output;
        return o.includes('ok: true') || o.includes('"ok":true') &&
               (o.includes('ok: false') || o.includes('"ok":false')) &&
               o.includes('Deploy produção');
      },
      solution: `function transferirTarefas(fromUserId, toUserId, taskIds) {
  const copia = tasks.map(t => ({ ...t }));
  for (const id of taskIds) {
    const task = copia.find(t => t.id === id);
    if (!task) return { ok: false, error: 'Task ' + id + ' não encontrada' };
    if (task.userId !== fromUserId) return { ok: false, error: 'Task ' + id + ' não pertence ao usuário' };
    task.userId = toUserId;
  }
  tasks = copia;
  return { ok: true, transferidas: taskIds.length };
}`,
    },
  ],
};

// ── Mini Projeto: Fase 15 (Docker) ───────────────────────────────────────────
export const miniProjectPhase15 = {
  id: 'mp-phase-10',
  title: 'Orquestrador de Containers Simulado',
  description: 'Simule um orquestrador de containers: gerencie o ciclo de vida de serviços, implemente health checks, restart policy e escalonamento — os conceitos por trás do Docker Compose.',
  steps: [
    {
      title: 'Gerenciador de containers',
      type: 'js',
      description: 'Crie um ContainerManager que registra serviços, controla start/stop e rastreia o estado de cada container.',
      hint: 'Cada container tem: id, name, status (running/stopped/error), startedAt, restarts. O manager é o Docker daemon simplificado.',
      starterCode: `class ContainerManager {
  constructor() {
    this.containers = new Map();
    this.nextId = 1;
  }

  // registrar(name, config): adiciona serviço com status 'stopped'
  // config = { image, ports, env, restart: 'always'|'on-failure'|'no' }
  registrar(name, config) {
  }

  // iniciar(name): muda status para 'running', registra startedAt
  iniciar(name) {
  }

  // parar(name): muda status para 'stopped'
  parar(name) {
  }

  // status(): retorna array com estado de todos os containers
  status() {
  }
}

const manager = new ContainerManager();
manager.registrar('api',      { image: 'node:18', ports: ['3000:3000'], restart: 'always' });
manager.registrar('postgres', { image: 'postgres:15', ports: ['5432:5432'], restart: 'always' });
manager.registrar('redis',    { image: 'redis:7', ports: ['6379:6379'], restart: 'on-failure' });

manager.iniciar('api');
manager.iniciar('postgres');

console.log(manager.status());`,
      validate: (code, output) => {
        return output.includes('running') && output.includes('stopped') && output.includes('api');
      },
      solution: `class ContainerManager {
  constructor() { this.containers = new Map(); this.nextId = 1; }
  registrar(name, config) {
    this.containers.set(name, { id: this.nextId++, name, ...config, status: 'stopped', startedAt: null, restarts: 0 });
  }
  iniciar(name) {
    const c = this.containers.get(name);
    if (c) { c.status = 'running'; c.startedAt = new Date().toISOString(); }
  }
  parar(name) {
    const c = this.containers.get(name);
    if (c) c.status = 'stopped';
  }
  status() { return [...this.containers.values()]; }
}`,
    },
    {
      title: 'Health check e restart policy',
      type: 'js',
      description: 'Adicione health checks periódicos e restart automático baseado na política configurada.',
      hint: 'Health check retorna ok ou fail. Se fail: restart: "always" reinicia sempre, restart: "on-failure" reinicia até 3 vezes, restart: "no" não reinicia.',
      starterCode: `class ContainerManager {
  constructor() {
    this.containers = new Map();
  }

  registrar(name, config) {
    this.containers.set(name, { name, ...config, status: 'running', restarts: 0, healthy: true });
  }

  // healthCheck(name, isHealthy): recebe resultado do health check
  // Se não saudável: aplica restart policy
  // restart: 'always' → reinicia (incrementa restarts)
  // restart: 'on-failure' → reinicia até MAX_RESTARTS (3)
  // restart: 'no' → muda status para 'error', não reinicia
  healthCheck(name, isHealthy) {
    const MAX_RESTARTS = 3;
    const container = this.containers.get(name);
    if (!container) return;
    // implemente a lógica
  }

  relatorio() {
    return [...this.containers.values()].map(c =>
      c.name + ': ' + c.status + ' (restarts: ' + c.restarts + ', healthy: ' + c.healthy + ')'
    );
  }
}

const m = new ContainerManager();
m.registrar('api',    { restart: 'always' });
m.registrar('worker', { restart: 'on-failure' });
m.registrar('cron',   { restart: 'no' });

m.healthCheck('api', false);
m.healthCheck('api', false);
m.healthCheck('worker', false);
m.healthCheck('worker', false);
m.healthCheck('worker', false);
m.healthCheck('worker', false); // 4ª falha: deve ficar em error (max 3)
m.healthCheck('cron', false);   // restart: no → error imediatamente

console.log(m.relatorio());`,
      validate: (code, output) => {
        return output.includes('restarts: 2') || output.includes('restarts: 3') &&
               output.includes('error');
      },
      solution: `healthCheck(name, isHealthy) {
  const MAX_RESTARTS = 3;
  const c = this.containers.get(name);
  if (!c) return;
  c.healthy = isHealthy;
  if (isHealthy) { c.status = 'running'; return; }
  if (c.restart === 'always') { c.restarts++; c.status = 'running'; }
  else if (c.restart === 'on-failure') {
    if (c.restarts < MAX_RESTARTS) { c.restarts++; c.status = 'running'; }
    else c.status = 'error';
  } else { c.status = 'error'; }
}`,
    },
  ],
};

// ── Mini Projeto: Fase 16 (System Design) ────────────────────────────────────
export const miniProjectPhase16 = {
  id: 'mp-phase-16',
  title: 'Rate Limiter e Circuit Breaker',
  description: 'Implemente dois padrões essenciais de system design: um Rate Limiter com algoritmo Token Bucket e um Circuit Breaker — componentes que tornam sistemas distribuídos resilientes.',
  steps: [
    {
      title: 'Rate Limiter com Token Bucket',
      type: 'js',
      description: 'Implemente um Rate Limiter usando o algoritmo Token Bucket: cada "bucket" tem capacidade máxima e repõe tokens ao longo do tempo.',
      hint: 'Token Bucket: começa cheio (ex: 10 tokens). Cada request consome 1 token. Tokens se repõem a uma taxa (ex: 2/segundo). Se bucket vazio: request negada.',
      starterCode: `class TokenBucket {
  // capacity: max de tokens
  // refillRate: tokens por segundo
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity; // começa cheio
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }

  // refill(): calcula quantos tokens repor baseado no tempo passado
  refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000; // em segundos
    // tokens += elapsed * refillRate (mas nunca passar de capacity)
  }

  // consume(tokens = 1): retorna true se aprovado, false se negado
  consume(tokens = 1) {
    this.refill();
    // se tem tokens suficientes: subtrai e retorna true
    // caso contrário: retorna false
  }
}

class RateLimiter {
  constructor() {
    this.buckets = new Map(); // key → TokenBucket
  }
  // checar(key, capacity, refillRate): verifica se a key pode fazer request
  checar(key, capacity = 5, refillRate = 1) {
    if (!this.buckets.has(key)) {
      this.buckets.set(key, new TokenBucket(capacity, refillRate));
    }
    return this.buckets.get(key).consume();
  }
}

const limiter = new RateLimiter();

// Simula 8 requests seguidas do mesmo IP
let aprovadas = 0, negadas = 0;
for (let i = 0; i < 8; i++) {
  const ok = limiter.checar('192.168.1.1', 5, 1);
  if (ok) aprovadas++; else negadas++;
}
console.log('Aprovadas:', aprovadas, '| Negadas:', negadas);
// Esperado: 5 aprovadas, 3 negadas (bucket tem capacidade 5)`,
      validate: (code, output) => {
        return output.includes('Aprovadas: 5') && output.includes('Negadas: 3');
      },
      solution: `refill() {
  const now = Date.now();
  const elapsed = (now - this.lastRefill) / 1000;
  this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
  this.lastRefill = now;
}
consume(tokens = 1) {
  this.refill();
  if (this.tokens >= tokens) { this.tokens -= tokens; return true; }
  return false;
}`,
    },
    {
      title: 'Circuit Breaker',
      type: 'js',
      description: 'Implemente um Circuit Breaker com os 3 estados: CLOSED (normal), OPEN (bloqueado), HALF_OPEN (testando recuperação).',
      hint: 'CLOSED → falhas acumulam → OPEN (após N falhas). OPEN → requisições bloqueadas → após timeout → HALF_OPEN. HALF_OPEN → 1 request de teste → sucesso: CLOSED, falha: OPEN.',
      starterCode: `class CircuitBreaker {
  constructor(failureThreshold = 3, timeout = 5000) {
    this.state = 'CLOSED'; // CLOSED | OPEN | HALF_OPEN
    this.failures = 0;
    this.failureThreshold = failureThreshold;
    this.timeout = timeout;
    this.nextAttempt = null;
  }

  // execute(fn): executa a função protegida pelo circuit breaker
  // Se OPEN e timeout não passou: lança erro 'Circuit breaker OPEN'
  // Se OPEN e timeout passou: muda para HALF_OPEN e tenta
  // Se sucesso: reset (CLOSED, failures=0)
  // Se falha: incrementa failures, se >= threshold: muda para OPEN
  async execute(fn) {
  }

  getState() { return this.state + ' (failures: ' + this.failures + ')'; }
}

// Simula um serviço instável
let callCount = 0;
async function servicoInstavel() {
  callCount++;
  if (callCount <= 4) throw new Error('Serviço fora do ar');
  return 'ok';
}

async function testar() {
  const cb = new CircuitBreaker(3, 100); // 3 falhas, 100ms timeout
  for (let i = 0; i < 6; i++) {
    try {
      const result = await cb.execute(servicoInstavel);
      console.log('Sucesso:', result, '|', cb.getState());
    } catch (e) {
      console.log('Erro:', e.message, '|', cb.getState());
    }
    await new Promise(r => setTimeout(r, 50));
  }
}
testar();`,
      validate: (code, output) => {
        return output.includes('OPEN') && (output.includes('CLOSED') || output.includes('HALF_OPEN'));
      },
      solution: `async execute(fn) {
  if (this.state === 'OPEN') {
    if (Date.now() < this.nextAttempt) throw new Error('Circuit breaker OPEN');
    this.state = 'HALF_OPEN';
  }
  try {
    const result = await fn();
    this.failures = 0; this.state = 'CLOSED';
    return result;
  } catch (e) {
    this.failures++;
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN'; this.nextAttempt = Date.now() + this.timeout;
    }
    throw e;
  }
}`,
    },
  ],
};

// ── Mini Projeto: Fase 17 (Segurança Web) ────────────────────────────────────
export const miniProjectPhase17 = {
  id: 'mp-phase-11',
  title: 'Scanner de Vulnerabilidades de API',
  description: 'Construa um scanner que testa automaticamente uma API em busca de vulnerabilidades comuns: endpoints sem autenticação, rate limiting ausente, inputs não sanitizados e headers de segurança faltando.',
  steps: [
    {
      title: 'Testador de autenticação',
      type: 'js',
      description: 'Implemente testarAutenticacao(endpoints) que tenta acessar cada endpoint sem token e verifica se retorna 401.',
      hint: 'Endpoints que retornam 200 sem token são vulneráveis (IDOR ou falta de auth). Endpoints que retornam 401 ou 403 estão corretos.',
      starterCode: `// Simula uma API com alguns endpoints protegidos e outros não
function mockAPI(endpoint, token) {
  const protegidos = ['/api/admin', '/api/users/me', '/api/orders'];
  const publicos   = ['/api/products', '/api/categories', '/health'];
  const semAuth    = ['/api/users', '/api/invoices']; // deveriam ser privados!

  if (publicos.includes(endpoint)) return { status: 200, data: 'public ok' };
  if (semAuth.includes(endpoint))  return { status: 200, data: 'VULNERÁVEL - sem auth!' };
  if (!token) return { status: 401, error: 'Unauthorized' };
  return { status: 200, data: 'ok' };
}

// Implemente testarAutenticacao(endpoints)
// Para cada endpoint, tente sem token
// Classifique: VULNERÁVEL (200 sem token) ou PROTEGIDO (401/403)
// Retorne { vulneraveis: [], protegidos: [], resumo: '...' }
function testarAutenticacao(endpoints) {
}

const endpointsTestar = [
  '/api/admin', '/api/users', '/api/users/me',
  '/api/orders', '/api/invoices', '/api/products',
];

const resultado = testarAutenticacao(endpointsTestar);
console.log('Vulneráveis:', resultado.vulneraveis);
console.log('Protegidos:', resultado.protegidos);
console.log(resultado.resumo);`,
      validate: (code, output) => {
        return output.includes('users') && output.includes('invoices') &&
               (output.toLowerCase().includes('vulneráv') || output.toLowerCase().includes('vulnerav'));
      },
      solution: `function testarAutenticacao(endpoints) {
  const vulneraveis = [], protegidos = [];
  for (const ep of endpoints) {
    const resp = mockAPI(ep, null);
    if (resp.status === 200) vulneraveis.push(ep);
    else protegidos.push(ep);
  }
  return { vulneraveis, protegidos, resumo: vulneraveis.length + ' vulneráveis de ' + endpoints.length + ' testados' };
}`,
    },
    {
      title: 'Verificador de headers de segurança',
      type: 'js',
      description: 'Implemente verificarHeaders(headers) que analisa os headers HTTP de uma resposta e lista os headers de segurança ausentes ou mal configurados.',
      hint: 'Headers obrigatórios: Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security, Referrer-Policy.',
      starterCode: `// Headers esperados e suas configurações corretas
const HEADERS_ESPERADOS = {
  'content-security-policy':    { obrigatorio: true,  valorMinimo: "default-src 'self'" },
  'x-content-type-options':     { obrigatorio: true,  valorEsperado: 'nosniff' },
  'x-frame-options':            { obrigatorio: true,  valoresValidos: ['DENY', 'SAMEORIGIN'] },
  'strict-transport-security':  { obrigatorio: true,  deveConter: 'max-age=' },
  'referrer-policy':            { obrigatorio: false, valoresValidos: ['no-referrer', 'strict-origin'] },
};

// Implemente verificarHeaders(headers)
// headers = objeto com os headers da resposta (keys em lowercase)
// Retorne: { score: 0-100, ausentes: [], malConfigurados: [], ok: [] }
function verificarHeaders(headers) {
}

// Teste com dois cenários
const headersInseguros = {
  'content-type': 'application/json',
  'server': 'Express',
};

const headersSegurosParcial = {
  'content-type': 'application/json',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'strict-transport-security': 'max-age=31536000',
  'content-security-policy': "default-src 'self'",
};

const r1 = verificarHeaders(headersInseguros);
const r2 = verificarHeaders(headersSegurosParcial);
console.log('Inseguros - Score:', r1.score, '| Ausentes:', r1.ausentes.length);
console.log('Parciais  - Score:', r2.score, '| OK:', r2.ok.length);`,
      validate: (code, output) => {
        return output.includes('Score:') && output.includes('Ausentes:') &&
               parseInt((output.match(/Score:\s*(\d+)/) || ['','0'])[1]) < 50;
      },
      solution: `function verificarHeaders(headers) {
  const ausentes = [], malConfigurados = [], ok = [];
  for (const [nome, regras] of Object.entries(HEADERS_ESPERADOS)) {
    if (!headers[nome]) { if (regras.obrigatorio) ausentes.push(nome); continue; }
    const val = headers[nome];
    if (regras.valorEsperado && val !== regras.valorEsperado) { malConfigurados.push(nome); continue; }
    if (regras.valoresValidos && !regras.valoresValidos.includes(val)) { malConfigurados.push(nome); continue; }
    if (regras.deveConter && !val.includes(regras.deveConter)) { malConfigurados.push(nome); continue; }
    ok.push(nome);
  }
  const total = Object.keys(HEADERS_ESPERADOS).length;
  return { score: Math.round((ok.length / total) * 100), ausentes, malConfigurados, ok };
}`,
    },
  ],
};

// ── Mini Projeto: Fase 18 (Next.js) ──────────────────────────────────────────
export const miniProjectPhase18 = {
  id: 'mp-phase-8',
  title: 'Blog com App Router e Server Components',
  description: 'Simule a arquitetura de um blog Next.js moderno: Server Components buscando dados, Server Actions para comentários, sistema de cache com revalidação e middleware de autenticação.',
  steps: [
    {
      title: 'Server Components e Data Fetching',
      type: 'js',
      description: 'Simule como um Server Component busca dados diretamente — sem useEffect, sem loading state manual, com cache inteligente.',
      hint: 'No Next.js real, cada fetch decide sua estratégia de cache. Aqui simularemos com um objeto de cache que expira baseado em revalidate.',
      starterCode: `// Simula o cache do Next.js
const nextCache = new Map();

function fetchComCache(url, opts = {}) {
  const revalidate = opts.next?.revalidate;
  const noStore = opts.cache === 'no-store';
  const cacheKey = url;

  if (!noStore && nextCache.has(cacheKey)) {
    const { data, timestamp } = nextCache.get(cacheKey);
    const age = (Date.now() - timestamp) / 1000;
    if (!revalidate || age < revalidate) {
      return { data, fromCache: true };
    }
  }

  // Simula busca de dados
  const mockData = {
    '/api/posts':        [{ id: 1, title: 'Next.js 14 chegou', views: 1200 }, { id: 2, title: 'Server Actions na prática', views: 800 }],
    '/api/posts/1':      { id: 1, title: 'Next.js 14 chegou', content: 'Conteúdo do post...', author: 'Ana' },
    '/api/posts/1/stats':{ views: 1200, likes: 45, shares: 12 },
  };

  const data = mockData[url] || null;
  nextCache.set(cacheKey, { data, timestamp: Date.now() });
  return { data, fromCache: false };
}

// Simule um Server Component de página de post
// Deve buscar: o post (revalidate: 60s) e stats (no-store - sempre fresh)
function PostPage(postId) {
  const postUrl  = '/api/posts/' + postId;
  const statsUrl = '/api/posts/' + postId + '/stats';

  // busque post com revalidate: 60
  // busque stats sem cache (no-store)
  // retorne { post, stats, postFromCache, statsFromCache }
}

const result1 = PostPage(1);
const result2 = PostPage(1); // segunda chamada
console.log('Post do cache na 2a chamada:', result2.postFromCache);
console.log('Stats do cache:', result2.statsFromCache, '(deve ser false)');
console.log('Post:', result1.post?.title);`,
      validate: (code, output) => {
        return output.includes('true') && output.includes('false') && output.includes('Next.js');
      },
      solution: `function PostPage(postId) {
  const postRes  = fetchComCache('/api/posts/' + postId, { next: { revalidate: 60 } });
  const statsRes = fetchComCache('/api/posts/' + postId + '/stats', { cache: 'no-store' });
  return { post: postRes.data, stats: statsRes.data, postFromCache: postRes.fromCache, statsFromCache: statsRes.fromCache };
}`,
    },
    {
      title: 'Server Action para comentários',
      type: 'js',
      description: 'Implemente uma Server Action adicionarComentario que valida o input, verifica autenticação e revalida o cache do post.',
      hint: 'Server Actions no Next.js real têm acesso à sessão do servidor. Aqui simulamos com um objeto session. Após salvar, revalidatePath invalida o cache.',
      starterCode: `// Estado do servidor (simulado)
const comentarios = [
  { id: 1, postId: 1, autor: 'Bruno', texto: 'Ótimo post!', criadoEm: '2024-01-01' },
];
const cacheInvalidado = new Set();
let nextComId = 2;

// Sessão simulada (no Next.js viria de getServerSession())
const session = { user: { id: 42, name: 'Ana Silva', role: 'user' } };

// Implemente adicionarComentario(formData)
// formData.get('postId'), formData.get('texto')
// Validações:
//   1. Usuário deve estar autenticado (session.user existe)
//   2. texto deve ter entre 5 e 500 caracteres
//   3. postId deve ser um número válido
// Se válido: adicione o comentário e invalide o cache (cacheInvalidado.add('/posts/' + postId))
// Retorne: { sucesso: true, comentario } ou { sucesso: false, erro: '...' }
function adicionarComentario(formData) {
}

// Testes
const fd = (postId, texto) => ({ get: k => k === 'postId' ? postId : texto });

console.log(adicionarComentario(fd(1, 'Excelente explicação sobre Server Actions!')));
console.log(adicionarComentario(fd(1, 'Ok'))); // muito curto
console.log('Cache invalidado:', [...cacheInvalidado]);
console.log('Total comentários:', comentarios.length);`,
      validate: (code, output) => {
        const o = output;
        return o.includes('sucesso: true') || o.includes('"sucesso":true') &&
               (o.includes('sucesso: false') || o.includes('"sucesso":false')) &&
               o.includes('Cache invalidado:') &&
               o.includes('Total comentários: 2');
      },
      solution: `function adicionarComentario(formData) {
  if (!session?.user) return { sucesso: false, erro: 'Não autenticado' };
  const postId = parseInt(formData.get('postId'));
  const texto = formData.get('texto');
  if (!postId || isNaN(postId)) return { sucesso: false, erro: 'postId inválido' };
  if (!texto || texto.length < 5) return { sucesso: false, erro: 'Texto muito curto (mínimo 5 chars)' };
  if (texto.length > 500) return { sucesso: false, erro: 'Texto muito longo' };
  const comentario = { id: nextComId++, postId, autor: session.user.name, texto, criadoEm: new Date().toISOString().slice(0,10) };
  comentarios.push(comentario);
  cacheInvalidado.add('/posts/' + postId);
  return { sucesso: true, comentario };
}`,
    },
  ],
};

// ── Mini Projeto: Fase 10 (Redes e HTTP) ─────────────────────────────────────
export const miniProjectPhase10 = {
  id: 'mp-phase-14',
  title: 'Analisador de Requisições HTTP',
  description: 'Construa um analisador que inspeciona requisições e respostas HTTP: detecta problemas de performance, headers mal configurados e status codes incorretos — habilidades essenciais para debug em produção.',
  steps: [
    {
      title: 'Parser de requisição HTTP',
      type: 'js',
      description: 'Implemente parseRequisicao(rawRequest) que extrai método, path, headers e body de uma requisição HTTP raw.',
      hint: 'Uma requisição HTTP tem: linha inicial (MÉTODO PATH HTTP/1.1), headers (chave: valor), linha em branco, body. Use split para separar as partes.',
      starterCode: `// Exemplos de requisições HTTP raw
const requisicoes = [
  \`POST /api/login HTTP/1.1
Host: api.exemplo.com
Content-Type: application/json
Authorization: Bearer eyJhbGc...
Content-Length: 45

{"email":"ana@dev.com","password":"senha123"}\`,

  \`GET /api/users?page=2&limit=10 HTTP/1.1
Host: api.exemplo.com
Accept: application/json
Cache-Control: no-cache\`,
];

// Implemente parseRequisicao(rawRequest)
// Retorne: { metodo, path, queryParams, headers, body, bodyParsed }
// queryParams: objeto com os parâmetros da query string
// bodyParsed: tente fazer JSON.parse do body (ou null se não for JSON)
function parseRequisicao(rawRequest) {
}

requisicoes.forEach((req, i) => {
  const parsed = parseRequisicao(req);
  console.log('--- Requisição', i + 1, '---');
  console.log('Método:', parsed.metodo);
  console.log('Path:', parsed.path);
  console.log('Query:', JSON.stringify(parsed.queryParams));
  console.log('Content-Type:', parsed.headers['content-type']);
  console.log('Body:', parsed.bodyParsed ? JSON.stringify(parsed.bodyParsed) : 'sem body');
});`,
      validate: (code, output) => {
        return output.includes('POST') && output.includes('GET') &&
               output.includes('/api/login') && (output.includes('page') || output.includes('limit'));
      },
      solution: `function parseRequisicao(rawRequest) {
  const [headerSection, ...bodyParts] = rawRequest.split('\\n\\n');
  const [firstLine, ...headerLines] = headerSection.split('\\n');
  const [metodo, rawPath] = firstLine.trim().split(' ');
  const [path, queryString] = rawPath.split('?');
  const queryParams = {};
  if (queryString) queryString.split('&').forEach(p => { const [k,v] = p.split('='); queryParams[k] = v; });
  const headers = {};
  headerLines.forEach(l => { const [k,...v] = l.split(': '); if (k) headers[k.toLowerCase()] = v.join(': ').trim(); });
  const body = bodyParts.join('\\n\\n').trim() || null;
  let bodyParsed = null;
  try { bodyParsed = body ? JSON.parse(body) : null; } catch {}
  return { metodo, path, queryParams, headers, body, bodyParsed };
}`,
    },
    {
      title: 'Diagnóstico de performance HTTP',
      type: 'js',
      description: 'Analise métricas de timing de uma requisição HTTP e identifique gargalos: DNS lento, TLS demorado, TTFB alto.',
      hint: 'Cada fase tem um threshold: DNS > 100ms é lento, TCP > 150ms é alto, TLS > 200ms é alto, TTFB > 500ms é crítico. Some tudo para o tempo total.',
      starterCode: `// Métricas de timing (em ms) de diferentes requisições
const medicoes = [
  { url: 'api.startup.com',   dns: 5,   tcp: 20,  tls: 80,  ttfb: 120, download: 30  },
  { url: 'api.lento.com',     dns: 250, tcp: 80,  tls: 120, ttfb: 800, download: 50  },
  { url: 'api.semcdn.com',    dns: 15,  tcp: 200, tls: 300, ttfb: 600, download: 200 },
];

const THRESHOLDS = {
  dns:      { bom: 50,  aceitavel: 100  },
  tcp:      { bom: 50,  aceitavel: 150  },
  tls:      { bom: 100, aceitavel: 200  },
  ttfb:     { bom: 200, aceitavel: 500  },
  download: { bom: 100, aceitavel: 300  },
};

// Implemente diagnosticar(medicao)
// Para cada fase: classifique como 'bom', 'aceitavel' ou 'critico'
// Identifique o gargalo principal (fase mais critica ou mais lenta)
// Sugira uma otimização baseada no gargalo
// Retorne: { total, fases: { dns, tcp, ... }, gargalo, sugestao }
function diagnosticar(medicao) {
}

medicoes.forEach(m => {
  const diag = diagnosticar(m);
  console.log(m.url + ':');
  console.log('  Total:', diag.total + 'ms');
  console.log('  Gargalo:', diag.gargalo);
  console.log('  Sugestão:', diag.sugestao);
});`,
      validate: (code, output) => {
        return output.includes('Total:') && output.includes('Gargalo:') && output.includes('Sugestão:') &&
               output.includes('api.lento.com') && output.includes('api.semcdn.com');
      },
      solution: `function diagnosticar(medicao) {
  const { url, ...fases } = medicao;
  const classificar = (fase, val) => val <= THRESHOLDS[fase].bom ? 'bom' : val <= THRESHOLDS[fase].aceitavel ? 'aceitavel' : 'critico';
  const sugestoes = { dns: 'Use um CDN para reduzir latência DNS', tcp: 'Servidor está distante — use CDN ou região mais próxima', tls: 'Atualize para TLS 1.3 e habilite OCSP Stapling', ttfb: 'Otimize queries do banco ou adicione cache no servidor', download: 'Comprima respostas com gzip/brotli' };
  const classificadas = Object.fromEntries(Object.entries(fases).map(([k,v]) => [k, { valor: v, status: classificar(k, v) }]));
  const gargalo = Object.entries(classificadas).sort((a,b) => b[1].valor - a[1].valor)[0][0];
  return { total: Object.values(fases).reduce((a,b) => a+b, 0), fases: classificadas, gargalo, sugestao: sugestoes[gargalo] };
}`,
    },
  ],
};

export const miniProjectPhase9 = {
  id: 'mp-phase-13',
  title: 'Deploy Fullstack: App com CI/CD Automatizado',
  description: 'Configure um pipeline completo: app React + API Node.js, dockerizado, com GitHub Actions fazendo build, testes e deploy automático ao fazer push.',
  steps: [
    {
      title: 'Estrutura do monorepo',
      type: 'js',
      description: 'Organize o projeto com frontend/ e backend/ separados. Crie um package.json raiz com scripts para rodar ambos.',
      hint: 'Use "workspaces" no package.json raiz. O script "dev" deve rodar frontend e backend em paralelo com concurrently.',
      starterCode: `// package.json raiz
{
  "name": "fullstack-app",
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "build": "// implemente: build frontend e backend",
    "test": "// implemente: rodar testes de ambos"
  }
}`,
      validate: (code) => code.includes('concurrently') && code.includes('dev:frontend') && code.includes('dev:backend'),
      validateMessage: 'Use concurrently para rodar frontend e backend em paralelo.',
    },
    {
      title: 'Dockerfile multi-stage',
      type: 'js',
      description: 'Crie um Dockerfile para o backend com multi-stage build: stage de build (instala deps e compila) e stage de produção (apenas o necessário).',
      hint: 'FROM node:18-alpine AS builder → instala deps e builda. FROM node:18-alpine → copia apenas /dist e node_modules de produção.',
      starterCode: `# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
# Copie package.json e instale TODAS as deps
# Execute o build (tsc ou vite build)

FROM node:18-alpine
WORKDIR /app
# Copie apenas o necessário do builder
# Instale apenas deps de produção
# Exponha a porta e defina o CMD`,
      validate: (code) => code.includes('AS builder') && code.includes('FROM node') && (code.match(/FROM/g) || []).length >= 2,
      validateMessage: 'Use multi-stage build com pelo menos 2 FROM. Stage de builder e stage final de produção.',
    },
    {
      title: 'GitHub Actions workflow',
      type: 'js',
      description: 'Crie o arquivo .github/workflows/deploy.yml que: roda testes, faz build da imagem Docker, e faz deploy na Vercel (frontend) ao fazer push na main.',
      hint: 'Jobs sequenciais: test → build → deploy. Use secrets do GitHub para credenciais. Cache de node_modules entre jobs.',
      starterCode: `# .github/workflows/deploy.yml
name: CI/CD Pipeline
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      # checkout, setup-node, install, test
  
  build:
    needs: test  # só roda se test passar
    # build docker image e push para registry
  
  deploy:
    needs: build
    # deploy frontend na Vercel
    # deploy backend no Railway/Render`,
      validate: (code) => code.includes('needs:') && code.includes('on:') && code.includes('push:'),
      validateMessage: 'O workflow deve ter jobs sequenciais com needs:, trigger on push, e pelo menos 3 jobs.',
    },
  ],
};

export const miniProjectPhase14 = {
  id: 'mp-phase-15',
  title: 'Ambiente de Desenvolvimento Dockerizado',
  description: 'Containerize uma aplicação Node.js com banco de dados PostgreSQL e Redis usando Docker Compose. Zero instalação local além do Docker.',
  steps: [
    {
      title: 'docker-compose.yml completo',
      type: 'js',
      description: 'Crie um docker-compose.yml com 3 serviços: app (Node.js), db (PostgreSQL) e cache (Redis). Configure volumes, variáveis de ambiente e rede interna.',
      hint: 'Services: app, postgres, redis. A app depende do postgres e redis (depends_on). Use variáveis ${POSTGRES_PASSWORD} do .env. Volume para persistir dados do postgres.',
      starterCode: `# docker-compose.yml
version: '3.9'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: # complete com a URL do postgres interno
      REDIS_URL: # complete com a URL do redis interno
    depends_on:
      # declare dependências
    
  postgres:
    image: postgres:15-alpine
    # configure: POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD
    # volumes: para persistir dados
    
  redis:
    image: redis:7-alpine
    # configure porta e volume`,
      validate: (code) => code.includes('postgres') && code.includes('redis') && code.includes('depends_on') && code.includes('volumes:'),
      validateMessage: 'docker-compose deve ter 3 serviços (app, postgres, redis), depends_on e volumes para persistência.',
    },
    {
      title: 'Health checks e restart policies',
      type: 'js',
      description: 'Adicione health checks para postgres e redis, e configure restart: unless-stopped para todos os serviços. A app só deve iniciar quando o DB estiver pronto.',
      hint: 'healthcheck: test, interval, timeout, retries. depends_on com condition: service_healthy. restart: unless-stopped.',
      starterCode: `# Adicione ao docker-compose.yml:
services:
  postgres:
    # ... configuração anterior ...
    healthcheck:
      test: # comando para verificar se postgres está pronto
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped
  
  app:
    depends_on:
      postgres:
        condition: # qual condição esperar?`,
      validate: (code) => code.includes('healthcheck') && code.includes('condition:') && code.includes('restart:'),
      validateMessage: 'Configure healthcheck no postgres e depends_on com condition: service_healthy na app.',
    },
    {
      title: 'Script de inicialização',
      type: 'js',
      description: 'Crie um script entrypoint.sh que: espera o banco estar pronto, roda as migrations e inicia a aplicação. Use wait-for-it ou lógica de retry.',
      hint: 'Loop até conseguir conectar no postgres. Depois rode as migrations (prisma migrate deploy ou knex migrate:latest). Por fim inicie o servidor.',
      starterCode: `#!/bin/sh
# entrypoint.sh

echo "Aguardando banco de dados..."

# Implemente: loop até postgres aceitar conexões
# Use: pg_isready -h $DB_HOST -p $DB_PORT ou netcat

echo "Banco pronto! Rodando migrations..."
# Execute as migrations

echo "Iniciando aplicação..."
exec node dist/server.js`,
      validate: (code) => (code.includes('while') || code.includes('until') || code.includes('retry')) && code.includes('migration'),
      validateMessage: 'entrypoint.sh deve ter loop de espera pelo banco e execução de migrations antes de iniciar.',
    },
  ],
};

export const miniProjectPhase11 = {
  id: 'mp-phase-18',
  title: 'Documentação Técnica em Inglês',
  description: 'Escreva a documentação completa de uma API REST em inglês: README, endpoint docs com exemplos, guia de contribuição e changelog. O padrão usado em projetos open source reais.',
  steps: [
    {
      title: 'README profissional',
      type: 'js',
      description: 'Escreva um README.md em inglês com: badges, descrição curta, quick start, features, tech stack e links. Use markdown adequadamente.',
      hint: 'Seções obrigatórias: título + badges, description, installation, usage, API reference, contributing, license. Seja conciso no início, detalhado depois.',
      starterCode: `# Task Manager API

<!-- Badges: build status, coverage, npm version -->

## Overview
<!-- One paragraph describing what this project does and who it\'s for -->

## Quick Start
\`\`\`bash
# Clone and install
git clone ...
npm install

# Set up environment
cp .env.example .env

# Run
npm run dev
\`\`\`

## Features
<!-- List key features -->

## Tech Stack
<!-- List main technologies with links -->

## API Reference
<!-- Brief overview, link to full docs -->

## Contributing
<!-- How to contribute -->

## License
MIT`,
      validate: (code) => code.includes('Quick Start') && code.includes('Features') && code.includes('License') && code.includes('npm'),
      validateMessage: 'README deve ter Quick Start, Features, e License. Use inglês técnico correto.',
    },
    {
      title: 'Documentar endpoints em inglês',
      type: 'js',
      description: 'Documente 3 endpoints da API no padrão usado em projetos reais: método, URL, descrição, parâmetros, request body, responses com status codes e exemplos.',
      hint: 'Cada endpoint: ### METHOD /path, Description, Parameters table, Request body (JSON), Response 200/400/404/500 com exemplos. Use markdown tables.',
      starterCode: `## Endpoints

### POST /api/auth/login
Authenticates a user and returns a JWT token.

**Request Body**
| Field    | Type   | Required | Description        |
|----------|--------|----------|--------------------|
| email    | string | yes      | User email address |
| password | string | yes      | User password      |

**Response 200 OK**
\`\`\`json
{
  "token": "eyJhbG...",
  "user": { "id": 1, "email": "user@example.com" }
}
\`\`\`

**Response 401 Unauthorized**
\`\`\`json
{ "error": "Invalid credentials" }
\`\`\`

---

### GET /api/users/:id
<!-- Document this endpoint -->

### PATCH /api/users/:id
<!-- Document this endpoint -->`,
      validate: (code) => code.includes('Response 200') && (code.match(/###/g) || []).length >= 3 && code.includes('| Field'),
      validateMessage: 'Documente 3 endpoints com tabela de parâmetros e pelo menos 2 responses cada.',
    },
    {
      title: 'Commit messages e CHANGELOG',
      type: 'js',
      description: 'Escreva 5 commit messages no padrão Conventional Commits em inglês, e crie um CHANGELOG.md com o formato Keep a Changelog para uma versão 1.0.0.',
      hint: 'Conventional Commits: feat:, fix:, docs:, refactor:, test:. CHANGELOG: [Unreleased], [1.0.0] com Added/Changed/Fixed/Removed.',
      starterCode: `## Conventional Commits Examples

# Escreva 5 commits seguindo o padrão:
# type(scope): description
# Types: feat, fix, docs, style, refactor, test, chore

# 1. feat(auth): ...
# 2. fix(...): ...
# 3. ...

---

## CHANGELOG.md

# Changelog
All notable changes to this project will be documented here.

## [Unreleased]

## [1.0.0] - 2024-01-15
### Added
<!-- List new features -->

### Changed  
<!-- List changes in existing functionality -->

### Fixed
<!-- List bug fixes -->`,
      validate: (code) => code.includes('feat(') && code.includes('fix(') && code.includes('### Added') && code.includes('CHANGELOG'),
      validateMessage: 'Escreva 5 commits Conventional Commits em inglês e crie CHANGELOG com seções Added/Changed/Fixed.',
    },
  ],
};
