import { useState } from 'react';
import { ChevronRight, ChevronLeft, Layers, X, Play, Copy, Check } from 'lucide-react';
import './StepByStepCode.css';

// ── Parser: divide o código em grupos lógicos ────────────────────────────────
function parseIntoSteps(code) {
  const rawLines = code.split('\n');
  const steps = [];
  let current = null;

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();

    // Linha em branco entre grupos — finaliza o grupo atual se tiver código
    if (trimmed === '') {
      if (current && current.codeLines.length > 0) {
        steps.push(current);
        current = null;
      }
      continue;
    }

    // Linha que é APENAS comentário (sem código antes) → cabeçalho de grupo
    if (trimmed.startsWith('//') && !trimmed.includes(';') && !trimmed.match(/^\s*\/\/ →/)) {
      // Se havia grupo em andamento com código, fecha-o
      if (current && current.codeLines.length > 0) {
        steps.push(current);
      }
      // Novo grupo com título
      const title = trimmed.replace(/^\/\/\s*/, '').replace(/^─+\s*/, '').replace(/\s*─+$/, '').trim();
      current = { title, codeLines: [], explanations: [] };
      continue;
    }

    // Linha de código (possivelmente com inline comment)
    if (!current) {
      current = { title: '', codeLines: [], explanations: [] };
    }

    // Separa código do inline comment
    const inlineCommentMatch = line.match(/^(.*?)\s{2,}(\/\/.+)$/);
    if (inlineCommentMatch && !trimmed.startsWith('//')) {
      current.codeLines.push(inlineCommentMatch[1]);
      current.explanations.push(inlineCommentMatch[2].replace(/^\/\/\s*/, ''));
    } else if (trimmed.startsWith('// →') || trimmed.startsWith('// -')) {
      // Linha de resultado/output — faz parte do código visualmente
      current.codeLines.push(line);
    } else {
      current.codeLines.push(line);
    }
  }

  // Fecha último grupo
  if (current && current.codeLines.length > 0) {
    steps.push(current);
  }

  // Se tem poucos grupos (≤2) ou código pequeno, agrupa diferente
  if (steps.length <= 1 || rawLines.filter(l => l.trim()).length < 8) {
    return null; // Código curto — não vale usar o modo passo a passo
  }

  return steps;
}

// ── Executa JS seguro ─────────────────────────────────────────────────────────
function runJS(code) {
  const logs = [];
  const fakeConsole = {
    log:  (...a) => logs.push(a.map(x => typeof x === 'object' ? JSON.stringify(x, null, 2) : String(x)).join(' ')),
    error:(...a) => logs.push('❌ ' + a.join(' ')),
    warn: (...a) => logs.push('⚠️ ' + a.join(' ')),
  };
  try {
    // eslint-disable-next-line no-new-func
    new Function('console', code)(fakeConsole);
    return logs.length ? logs.join('\n') : '// sem output';
  } catch (e) {
    return `❌ ${e.name}: ${e.message}`;
  }
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function StepByStepCode({ code, lang = 'javascript' }) {
  const [mode, setMode]       = useState('full');   // 'full' | 'steps'
  const [stepIdx, setStepIdx] = useState(0);
  const [output, setOutput]   = useState('');
  const [copied, setCopied]   = useState(false);

  const steps = parseIntoSteps(code);
  const canStep = !!steps && steps.length >= 2;

  const lines = code.split('\n');
  const totalLines = lines.filter(l => l.trim()).length;

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleRun() {
    setOutput(runJS(code));
  }

  // ── MODO FULL (padrão) ────────────────────────────────────────────────────
  if (mode === 'full') {
    return (
      <div className="sbs-editor">
        <div className="sbs-header">
          <div className="sbs-dots">
            <span className="sbs-dot red" />
            <span className="sbs-dot yellow" />
            <span className="sbs-dot green" />
          </div>
          <span className="sbs-lang">{lang}</span>
          <div className="sbs-actions">
            {canStep && (
              <button
                className="sbs-btn sbs-step-btn"
                onClick={() => { setMode('steps'); setStepIdx(0); setOutput(''); }}
                title="Ver por partes"
              >
                <Layers size={12} />
                <span>Ver por partes</span>
              </button>
            )}
            <button className="sbs-btn" onClick={handleCopy} title="Copiar">
              {copied ? <Check size={13} /> : <Copy size={13} />}
            </button>
            {lang === 'javascript' && (
              <button className="sbs-btn sbs-run-btn" onClick={handleRun}>
                <Play size={13} /> <span>Executar</span>
              </button>
            )}
          </div>
        </div>

        <div className="sbs-body">
          <div className="sbs-line-nums">
            {lines.map((_, i) => <div key={i} className="sbs-line-num">{i + 1}</div>)}
          </div>
          <pre className="sbs-pre"><code>{code}</code></pre>
        </div>

        {output && (
          <div className="sbs-output">
            <span className="sbs-output-label">Output</span>
            <pre>{output}</pre>
          </div>
        )}
      </div>
    );
  }

  // ── MODO PASSO A PASSO ────────────────────────────────────────────────────
  const step = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;
  const isFirst = stepIdx === 0;

  // Código acumulado até o passo atual (para contexto)
  const accumulatedCode = steps
    .slice(0, stepIdx + 1)
    .flatMap(s => s.codeLines)
    .join('\n');

  // Linha de início no código original para numeração
  const linesBefore = steps
    .slice(0, stepIdx)
    .flatMap(s => s.codeLines).length;

  return (
    <div className="sbs-editor sbs-step-mode">
      {/* Header */}
      <div className="sbs-header">
        <div className="sbs-dots">
          <span className="sbs-dot red" />
          <span className="sbs-dot yellow" />
          <span className="sbs-dot green" />
        </div>
        <span className="sbs-lang">{lang}</span>
        <div className="sbs-step-progress">
          {steps.map((_, i) => (
            <button
              key={i}
              className={'sbs-progress-dot' + (i === stepIdx ? ' active' : '') + (i < stepIdx ? ' done' : '')}
              onClick={() => setStepIdx(i)}
              title={steps[i].title || `Parte ${i + 1}`}
            />
          ))}
        </div>
        <div className="sbs-actions">
          <button
            className="sbs-btn sbs-exit-btn"
            onClick={() => { setMode('full'); setOutput(''); }}
            title="Ver código completo"
          >
            <X size={12} /> <span>Ver completo</span>
          </button>
        </div>
      </div>

      {/* Step indicator */}
      <div className="sbs-step-indicator">
        <span className="sbs-step-num">Parte {stepIdx + 1} de {steps.length}</span>
        {step.title && <span className="sbs-step-title">{step.title}</span>}
      </div>

      {/* Code do passo atual — highlighted */}
      <div className="sbs-body">
        <div className="sbs-line-nums">
          {step.codeLines.map((_, i) => (
            <div key={i} className="sbs-line-num sbs-line-num-active">{linesBefore + i + 1}</div>
          ))}
        </div>
        <pre className="sbs-pre sbs-pre-active">
          <code>{step.codeLines.join('\n')}</code>
        </pre>
      </div>

      {/* Explicações inline extraídas */}
      {step.explanations.length > 0 && (
        <div className="sbs-explanations">
          {step.explanations.map((exp, i) => (
            <div key={i} className="sbs-explanation">
              <span className="sbs-explanation-arrow">→</span>
              <span>{exp}</span>
            </div>
          ))}
        </div>
      )}

      {/* Output do passo acumulado */}
      {output && (
        <div className="sbs-output">
          <span className="sbs-output-label">Output acumulado</span>
          <pre>{output}</pre>
        </div>
      )}

      {/* Navegação */}
      <div className="sbs-nav">
        <button
          className="sbs-nav-btn"
          onClick={() => { setStepIdx(s => s - 1); setOutput(''); }}
          disabled={isFirst}
        >
          <ChevronLeft size={14} /> Anterior
        </button>

        {lang === 'javascript' && (
          <button
            className="sbs-nav-btn sbs-nav-run"
            onClick={() => setOutput(runJS(accumulatedCode))}
            title="Executar código até aqui"
          >
            <Play size={13} /> Testar até aqui
          </button>
        )}

        {isLast ? (
          <button
            className="sbs-nav-btn sbs-nav-finish"
            onClick={() => setMode('full')}
          >
            Ver completo <X size={13} />
          </button>
        ) : (
          <button
            className="sbs-nav-btn sbs-nav-next"
            onClick={() => { setStepIdx(s => s + 1); setOutput(''); }}
          >
            Próximo <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
