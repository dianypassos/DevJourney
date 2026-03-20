import { useState, useRef, useEffect } from 'react';
import { Play, CheckCircle2, ChevronRight, ChevronLeft, Lightbulb, RotateCcw, Eye, Code2, Trophy, Lock } from 'lucide-react';
import './MiniProject.css';

// ── Executor seguro com preview HTML ─────────────────────────────────────────
function buildPreview(html, css, js) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 20px; background: #fff; color: #1a1a2e; }
  ${css}
</style>
</head>
<body>
${html}
<script>
try { ${js} } catch(e) { document.body.innerHTML += '<pre style="color:red;margin-top:12px;font-size:12px">Erro: '+e.message+'</pre>'; }
</script>
</body>
</html>`;
}

// ── Diagnóstico de erro simples ───────────────────────────────────────────────
function diagnose(err) {
  const msg = err?.message || '';
  if (/unexpected token/i.test(msg) || /unexpected end/i.test(msg)) return '📝 Erro de sintaxe — verifique parênteses, chaves e colchetes.';
  if (/is not defined/i.test(msg)) return '🔍 Variável ou função não encontrada — verifique o nome.';
  if (/is not a function/i.test(msg)) return '⚠️ Isso não é uma função — verifique o método chamado.';
  return '❌ ' + msg;
}

// ── Componente de etapa ───────────────────────────────────────────────────────
function Step({ step, stepIndex, isUnlocked, isCompleted, onComplete }) {
  const [code, setCode] = useState(step.starterCode || '');
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState(null); // null | { ok, msg }
  const [previewMode, setPreviewMode] = useState('preview'); // 'code' | 'preview'
  const [previewKey, setPreviewKey] = useState(0);
  const [previewSrc, setPreviewSrc] = useState('');
  const textareaRef = useRef(null);

  // Auto-sync preview for HTML/CSS steps
  useEffect(() => {
    if (!isUnlocked) return;
    const timer = setTimeout(() => {
      const src = buildPreview(
        step.type === 'html' ? code : (step.baseHtml || ''),
        step.type === 'css'  ? code : (step.baseCss  || ''),
        step.type === 'js'   ? code : (step.baseJs   || '')
      );
      setPreviewSrc(src);
    }, 600);
    return () => clearTimeout(timer);
  }, [code, isUnlocked]);

  function handleTab(e) {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const ta = e.target;
    const s = ta.selectionStart, end = ta.selectionEnd;
    const next = code.substring(0, s) + '  ' + code.substring(end);
    setCode(next);
    setTimeout(() => { ta.selectionStart = ta.selectionEnd = s + 2; }, 0);
  }

  function runValidation() {
    setResult(null);
    try {
      if (step.validate) {
        const ok = step.validate(code);
        if (ok) {
          setResult({ ok: true, msg: step.successMsg || 'Etapa concluída! 🎉' });
          setPreviewKey(k => k + 1);
          setTimeout(() => onComplete(), 800);
        } else {
          setResult({ ok: false, msg: step.errorMsg || 'Verifique o código e tente novamente.' });
        }
      } else {
        // No validate: mark complete after running
        setResult({ ok: true, msg: step.successMsg || 'Etapa concluída! 🎉' });
        setTimeout(() => onComplete(), 800);
      }
    } catch (err) {
      setResult({ ok: false, msg: diagnose(err) });
    }
  }

  function reset() {
    setCode(step.starterCode || '');
    setResult(null);
    setShowHint(false);
  }

  const lines = code.split('\n');
  const langLabel = step.type || 'javascript';

  if (!isUnlocked) {
    return (
      <div className="mp-step mp-step-locked">
        <div className="mp-step-lock-icon"><Lock size={16} /></div>
        <div className="mp-step-lock-text">Complete a etapa anterior para desbloquear</div>
      </div>
    );
  }

  return (
    <div className={'mp-step' + (isCompleted ? ' mp-step-done' : '')}>
      {isCompleted && (
        <div className="mp-step-done-banner">
          <CheckCircle2 size={13} /> Etapa concluída!
        </div>
      )}

      <div className="mp-step-desc">{step.description}</div>

      {step.context && (
        <div className="mp-step-context">{step.context}</div>
      )}

      <div className="mp-editor-panel">
        <div className="mp-editor-toolbar">
          <span className="mp-lang-badge">{langLabel}</span>
          <div className="mp-editor-actions">
            <button className="mp-tool-btn" onClick={reset} title="Resetar"><RotateCcw size={12} /></button>
            <button className={'mp-tool-btn' + (showHint ? ' active' : '')} onClick={() => setShowHint(v => !v)}>
              <Lightbulb size={12} /> Dica
            </button>
          </div>
          <div className="mp-view-toggle">
            <button className={'mp-view-btn' + (previewMode === 'code' ? ' active' : '')} onClick={() => setPreviewMode('code')}>
              <Code2 size={11} /> Código
            </button>
            <button className={'mp-view-btn' + (previewMode === 'preview' ? ' active' : '')} onClick={() => setPreviewMode('preview')}>
              <Eye size={11} /> Preview
            </button>
          </div>
        </div>

        {showHint && (
          <div className="mp-hint">
            <Lightbulb size={13} /> {step.hint}
          </div>
        )}

        {previewMode === 'code' && (
          <div className="mp-code-area">
            <div className="mp-line-nums" aria-hidden>
              {lines.map((_, i) => <span key={i}>{i + 1}</span>)}
            </div>
            <textarea
              ref={textareaRef}
              className="mp-textarea"
              value={code}
              onChange={e => { setCode(e.target.value); setResult(null); }}
              onKeyDown={handleTab}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        )}

        {previewMode === 'preview' && (
          <div className="mp-preview-area">
            <iframe
              key={previewKey}
              className="mp-iframe"
              srcDoc={previewSrc}
              title="preview"
              sandbox="allow-scripts"
            />
          </div>
        )}

        <div className="mp-editor-footer">
          <button className="btn btn-primary mp-run-btn" onClick={runValidation} disabled={isCompleted}>
            <Play size={13} /> {isCompleted ? 'Concluído' : 'Verificar'}
          </button>
        </div>
      </div>

      {result && (
        <div className={'mp-result' + (result.ok ? ' mp-result-ok' : ' mp-result-fail')}>
          {result.ok ? <CheckCircle2 size={14} /> : '✗'}
          <span>{result.msg}</span>
        </div>
      )}
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function MiniProject({ project, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [finished, setFinished] = useState(false);
  const [activePreview, setActivePreview] = useState(''); // combined final preview

  const totalSteps = project.steps.length;
  const allDone = completedSteps.size >= totalSteps;

  // Build final combined preview when all steps done
  useEffect(() => {
    if (!allDone) return;
    const src = buildPreview(
      project.finalHtml || '',
      project.finalCss  || '',
      project.finalJs   || ''
    );
    setActivePreview(src);
  }, [allDone]);

  function markStepComplete(idx) {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
    if (idx + 1 < totalSteps) {
      setTimeout(() => setCurrentStep(idx + 1), 300);
    } else {
      setFinished(true);
    }
  }

  if (finished && allDone) {
    return (
      <div className="mp-container">
        <div className="mp-finished">
          <div className="mp-trophy"><Trophy size={40} /></div>
          <h2 className="mp-finished-title">Mini-projeto concluído! 🎉</h2>
          <p className="mp-finished-sub">Você construiu <strong>{project.title}</strong> do zero. Isso já é portfólio!</p>

          <div className="mp-final-preview">
            <div className="mp-final-preview-label">Resultado final:</div>
            <iframe
              className="mp-iframe mp-iframe-final"
              srcDoc={activePreview}
              title="resultado final"
              sandbox="allow-scripts"
            />
          </div>

          <button className="btn btn-primary mp-complete-btn" onClick={onComplete}>
            Continuar <ChevronRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mp-container">
      {/* Header */}
      <div className="mp-header">
        <div className="mp-badge">Mini-Projeto</div>
        <h2 className="mp-title">{project.title}</h2>
        <p className="mp-description">{project.description}</p>

        {/* Barra de progresso das etapas */}
        <div className="mp-steps-nav">
          {project.steps.map((s, i) => (
            <button
              key={i}
              className={
                'mp-step-dot' +
                (completedSteps.has(i) ? ' done' : '') +
                (i === currentStep ? ' active' : '') +
                (!completedSteps.has(i - 1) && i > 0 && !completedSteps.has(i) ? ' locked' : '')
              }
              onClick={() => {
                if (i === 0 || completedSteps.has(i - 1) || completedSteps.has(i)) setCurrentStep(i);
              }}
              title={'Etapa ' + (i + 1) + ': ' + s.title}
            >
              {completedSteps.has(i) ? <CheckCircle2 size={12} /> : <span>{i + 1}</span>}
            </button>
          ))}
          <div className="mp-steps-label">
            Etapa {currentStep + 1} de {totalSteps}: <strong>{project.steps[currentStep]?.title}</strong>
          </div>
        </div>
      </div>

      {/* Etapa atual */}
      <Step
        key={currentStep}
        step={project.steps[currentStep]}
        stepIndex={currentStep}
        isUnlocked={currentStep === 0 || completedSteps.has(currentStep - 1) || completedSteps.has(currentStep)}
        isCompleted={completedSteps.has(currentStep)}
        onComplete={() => markStepComplete(currentStep)}
      />

      {/* Navegação entre etapas */}
      <div className="mp-nav-row">
        <button
          className="btn btn-ghost btn-sm"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(s => s - 1)}
        >
          <ChevronLeft size={14} /> Anterior
        </button>
        <button
          className="btn btn-ghost btn-sm"
          disabled={currentStep >= totalSteps - 1 || (!completedSteps.has(currentStep) && !completedSteps.has(currentStep - 1))}
          onClick={() => setCurrentStep(s => s + 1)}
        >
          Próxima <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
