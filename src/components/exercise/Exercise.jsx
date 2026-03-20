import { useState, useRef, useEffect } from 'react';
import { Play, Lightbulb, ChevronRight, RotateCcw, CheckCircle2, Info, Sparkles } from 'lucide-react';
import { useAstra } from '../../contexts/AstraContext.tsx';
import './Exercise.css';

// ── Levenshtein para detecção de typo ────────────────────────────────────────
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function findClosestWord(target, code) {
  const words = [...new Set((code.match(/[a-zA-Z_$][a-zA-Z0-9_$]*/g) || []))];
  const t = target.toLowerCase();
  let best = null, bestDist = Infinity;
  for (const w of words) {
    if (w === target) continue;
    const dist = levenshtein(t, w.toLowerCase());
    const threshold = Math.max(1, Math.floor(target.length / 3));
    if (dist <= threshold && dist < bestDist) { bestDist = dist; best = w; }
  }
  return best;
}

// ── Diagnóstico de erros de runtime ──────────────────────────────────────────
function diagnoseError(err, code) {
  const msg = err.message || '';
  const name = err.name || '';

  if (name === 'SyntaxError') {
    if (/unexpected token/i.test(msg) || /unexpected end/i.test(msg)) {
      return { type: 'syntax', title: 'Erro de sintaxe', detail: 'O JavaScript não conseguiu ler seu código. Verifique se todos os parênteses (), chaves {} e colchetes [] estão fechados corretamente.', tip: 'Dica: conte os pares de abertura e fechamento — cada ( precisa de um ), cada { de um }.', raw: msg };
    }
    if (/missing ; before statement/i.test(msg)) {
      return { type: 'syntax', title: 'Erro de sintaxe — declaração inesperada', detail: 'O JavaScript encontrou algo que não esperava. Verifique se não há dois operadores seguidos ou uma linha incompleta.', raw: msg };
    }
    return { type: 'syntax', title: 'Erro de sintaxe', detail: 'Seu código tem um problema de escrita que impede a execução. Releia a linha indicada com cuidado.', raw: msg };
  }

  if (name === 'ReferenceError') {
    const varMatch = msg.match(/(\w+) is not defined/);
    const varName = varMatch ? varMatch[1] : null;
    if (varName) {
      const closest = findClosestWord(varName, code);
      if (closest) {
        return { type: 'reference', title: 'Erro de digitação: "' + varName + '"', detail: 'Você escreveu "' + varName + '", mas provavelmente quis dizer "' + closest + '". JavaScript diferencia maiúsculas de minúsculas e não perdoa letras trocadas.', tip: 'Dica: corrija "' + varName + '" para "' + closest + '" no seu código.', raw: msg };
      }
      return { type: 'reference', title: 'Variável não declarada: "' + varName + '"', detail: '"' + varName + '" está sendo usada, mas nunca foi declarada com const, let ou function. Declare-a antes de usar.', tip: 'Dica: declare variáveis com "const nome = valor" antes de usá-las.', raw: msg };
    }
    return { type: 'reference', title: 'Variável ou função não encontrada', detail: 'Você tentou usar algo que não existe ou ainda não foi declarado neste escopo.', raw: msg };
  }

  if (name === 'TypeError') {
    if (/is not a function/i.test(msg)) {
      const fnMatch = msg.match(/([\w.]+) is not a function/);
      const fn = fnMatch ? fnMatch[1] : 'o valor';
      return { type: 'type', title: '"' + fn + '" não é uma função', detail: 'Você tentou chamar ' + fn + '(), mas esse valor não é uma função. Verifique se o nome está correto e se está chamando o método certo para este tipo de dado.', tip: 'Dica: arrays usam .map(), .filter(), .reduce(). Strings usam .toUpperCase(), .split(), .trim().', raw: msg };
    }
    if (/cannot read propert/i.test(msg) || /cannot read properties of/i.test(msg)) {
      const propMatch = msg.match(/properties of (null|undefined)/i);
      const nullVal = propMatch ? propMatch[1] : 'null ou undefined';
      return { type: 'type', title: 'Tentou acessar propriedade de ' + nullVal, detail: 'Você tentou usar "." em um valor que é ' + nullVal + '. Isso acontece quando uma variável não foi inicializada ou quando um array/objeto está vazio e você acessa um índice inexistente.', tip: 'Dica: verifique se a variável foi declarada e inicializada antes de acessar suas propriedades.', raw: msg };
    }
    if (/assignment to constant/i.test(msg)) {
      return { type: 'type', title: 'Tentativa de reatribuir uma constante', detail: 'Você declarou a variável com const e tentou mudar o seu valor. Use let quando o valor vai mudar ao longo do código.', tip: 'Regra: const = valor fixo. let = valor que pode mudar.', raw: msg };
    }
    return { type: 'type', title: 'Erro de tipo', detail: 'Você tentou fazer uma operação em um valor do tipo errado (ex: chamar um método de array em uma string, ou vice-versa).', raw: msg };
  }

  if (name === 'RangeError') {
    if (/maximum call stack/i.test(msg)) {
      return { type: 'range', title: 'Loop infinito ou recursão sem fim', detail: 'Seu código ficou chamando a si mesmo (ou um loop nunca terminou), esgotando a memória disponível.', tip: 'Dica: verifique a condição de parada do seu loop (while, for) ou da função recursiva.', raw: msg };
    }
    return { type: 'range', title: 'Valor fora do intervalo permitido', detail: 'Você usou um número que está fora do que o JavaScript aceita para esta operação.', raw: msg };
  }

  return { type: 'unknown', title: 'Erro na execução', detail: 'Ocorreu um erro ao executar seu código. Leia a mensagem original abaixo para identificar o problema.', raw: msg };
}

const ERROR_ICONS = { syntax: '📝', reference: '🔍', type: '⚠️', range: '🔁', unknown: '❌' };

// ── Componente ────────────────────────────────────────────────────────────────
export default function Exercise({ exercise, onComplete }) {
  const [code, setCode] = useState(exercise.starterCode || '');
  const [output, setOutput] = useState(null);
  const [passed, setPassed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState(null);
  const [runtimeError, setRuntimeError] = useState(null);
  const textareaRef = useRef(null);
  const { triggerOpenWithError } = useAstra();
  const lastErrorDataRef = useRef(null);

  function handleKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.target;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + 2; }, 0);
    }
  }

  function runCode() {
    setError(null);
    setRuntimeError(null);
    setOutput(null);
    const logs = [];
    const fakeConsole = {
      log: (...args) => logs.push(args.map(a => {
        if (typeof a === 'object' && a !== null) { try { return JSON.stringify(a); } catch { return String(a); } }
        return String(a);
      }).join(' ')),
      error: (...args) => logs.push('❌ ' + args.join(' ')),
      warn:  (...args) => logs.push('⚠️ ' + args.join(' ')),
    };
    try {
      // eslint-disable-next-line no-new-func
      new Function('console', code)(fakeConsole);
      const outputStr = logs.join('\n');
      setOutput(outputStr);
      if (exercise.validate) {
        const ok = exercise.validate(outputStr, code);
        setPassed(ok);
        if (!ok) {
          setError(exercise.validateMessage || 'Verifique o output esperado.');
          lastErrorDataRef.current = {
            exerciseTitle: exercise.title,
            exerciseDescription: exercise.description,
            errorTitle: 'Output incorreto',
            errorDetail: exercise.validateMessage || 'O resultado do código não corresponde ao esperado.',
            userCode: code,
          };
        }
      } else {
        setPassed(true);
      }
    } catch (err) {
      const diagnosed = diagnoseError(err, code);
      setRuntimeError(diagnosed);
      setOutput(logs.join('\n'));
      lastErrorDataRef.current = {
        exerciseTitle: exercise.title,
        exerciseDescription: exercise.description,
        errorTitle: diagnosed.title,
        errorDetail: diagnosed.detail,
        userCode: code,
      };
    }
  }

  function reset() {
    setCode(exercise.starterCode || '');
    setOutput(null);
    setPassed(false);
    setError(null);
    setRuntimeError(null);
    setShowHint(false);
  }

  const lines = code.split('\n');
  const hasFailure = (error && !passed) || runtimeError;

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <div className="exercise-badge">Exercício</div>
        <h3 className="exercise-title">{exercise.title}</h3>
        <p className="exercise-desc">{exercise.description}</p>
      </div>

      <div className="exercise-editor">
        <div className="editor-toolbar">
          <span className="editor-lang">javascript</span>
          <div className="editor-actions">
            <button className="editor-btn" onClick={reset} title="Resetar código"><RotateCcw size={13} /></button>
            <button className="editor-btn hint-btn" onClick={() => setShowHint(!showHint)} title="Dica">
              <Lightbulb size={13} /> {showHint ? 'Esconder dica' : 'Dica'}
            </button>
          </div>
        </div>

        {showHint && (
          <div className="exercise-hint">
            <Lightbulb size={14} />
            <span>{exercise.solutionHint}</span>
          </div>
        )}

        <div className="code-area">
          <div className="line-numbers" aria-hidden="true">
            {lines.map((_, i) => <span key={i}>{i + 1}</span>)}
          </div>
          <textarea
            ref={textareaRef}
            className="code-textarea"
            value={code}
            onChange={e => { setCode(e.target.value); setPassed(false); setOutput(null); setError(null); setRuntimeError(null); }}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>

        <div className="editor-footer">
          <button className="btn btn-primary btn-run" onClick={runCode}>
            <Play size={14} /> Executar
          </button>
        </div>
      </div>

      {(output !== null || error || runtimeError) && (
        <div className={'exercise-output ' + (passed ? 'output-pass' : hasFailure ? 'output-fail' : '')}>
          <div className="output-header">
            <span>Output</span>
            {passed && <span className="output-pass-tag"><CheckCircle2 size={12} /> Correto!</span>}
            {hasFailure && <span className="output-fail-tag">✗ Verifique</span>}
          </div>
          {output && <pre className="output-pre">{output}</pre>}

          {error && !passed && (
            <div className="output-validation-error">
              <Info size={14} className="output-error-icon" />
              <div>
                <div className="output-error-title">Output incorreto</div>
                <div className="output-error-detail">{error}</div>
              </div>
            </div>
          )}
          {error && !passed && (
            <button className="astra-error-btn" onClick={() => triggerOpenWithError(lastErrorDataRef.current)}>
              <Sparkles size={12} /> Perguntar à Astra sobre este erro
            </button>
          )}

          {runtimeError && (
            <div className={'output-runtime-error error-type-' + runtimeError.type}>
              <div className="output-runtime-header">
                <span className="output-runtime-icon">{ERROR_ICONS[runtimeError.type]}</span>
                <span className="output-runtime-title">{runtimeError.title}</span>
              </div>
              <p className="output-runtime-detail">{runtimeError.detail}</p>
              {runtimeError.tip && (
                <p className="output-runtime-tip"><Lightbulb size={12} /> {runtimeError.tip}</p>
              )}
              <details className="output-runtime-raw">
                <summary>Mensagem original do JavaScript</summary>
                <code>{runtimeError.raw}</code>
              </details>
              <button className="astra-error-btn" onClick={() => triggerOpenWithError(lastErrorDataRef.current)}>
                <Sparkles size={12} /> Perguntar à Astra sobre este erro
              </button>
            </div>
          )}
        </div>
      )}

      {passed && (
        <div className="exercise-success">
          <div className="success-content">
            <CheckCircle2 size={20} />
            <div>
              <div className="success-title">Exercício concluído! 🎉</div>
              <div className="success-sub">Agora faça o quiz para concluir o módulo.</div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={onComplete}>
            Ir para o Quiz <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
