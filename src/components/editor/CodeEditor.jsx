import { useState, useRef, useEffect } from 'react';
import { Play, Copy, Check, RotateCcw } from 'lucide-react';
import './CodeEditor.css';

export default function CodeEditor({ initialCode = '', lang = 'javascript' }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  function handleKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
      }, 0);
    }
  }

  function runCode() {
    if (lang !== 'javascript') {
      setOutput(`// Execute no terminal:\n// ${lang === 'bash' ? 'sh script.sh' : `${lang} script.${lang}`}`);
      return;
    }
    setRunning(true);
    setOutput('');
    
    const logs = [];
    const fakeConsole = {
      log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
      error: (...args) => logs.push('❌ ' + args.join(' ')),
      warn: (...args) => logs.push('⚠️ ' + args.join(' ')),
      info: (...args) => logs.push(args.join(' ')),
    };

    try {
      // eslint-disable-next-line no-new-func
      new Function('console', code)(fakeConsole);
      setOutput(logs.length > 0 ? logs.join('\n') : '// Executado sem output');
    } catch (err) {
      setOutput(`❌ ${err.name}: ${err.message}`);
    } finally {
      setRunning(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setCode(initialCode);
    setOutput('');
  }

  return (
    <div className="code-editor">
      <div className="editor-header">
        <div className="editor-dots">
          <div className="dot red" />
          <div className="dot yellow" />
          <div className="dot green" />
        </div>
        <div className="editor-lang">{lang}</div>
        <div className="editor-actions">
          <button className="editor-btn" onClick={handleReset} title="Resetar">
            <RotateCcw size={13} />
          </button>
          <button className="editor-btn" onClick={handleCopy} title="Copiar">
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
          {lang === 'javascript' && (
            <button className="editor-btn run" onClick={runCode} disabled={running}>
              <Play size={13} />
              <span>Executar</span>
            </button>
          )}
        </div>
      </div>

      <div className="editor-body">
        <div className="line-numbers">
          {code.split('\n').map((_, i) => (
            <div key={i} className="line-num">{i + 1}</div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="editor-textarea"
          value={code}
          onChange={e => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          placeholder="// Digite seu código aqui..."
        />
      </div>

      {output && (
        <div className="editor-output">
          <div className="output-header">
            <span>Output</span>
          </div>
          <pre className="output-content">{output}</pre>
        </div>
      )}
    </div>
  );
}
