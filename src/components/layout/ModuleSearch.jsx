import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen } from 'lucide-react';
import { ALL_MODULES } from '../../data/roadmap.js';
import './ModuleSearch.css';

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function searchModules(query) {
  if (!query.trim()) return [];
  const q = normalize(query);
  const results = [];
  for (const mod of ALL_MODULES) {
    const title = normalize(mod.title);
    const phase = normalize(mod.phaseTitle || '');
    if (title.includes(q) || phase.includes(q)) {
      // score: title starts with query > title includes > phase includes
      const score = title.startsWith(q) ? 2 : title.includes(q) ? 1 : 0;
      results.push({ mod, score });
    }
  }
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(r => r.mod);
}

export default function ModuleSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = searchModules(query);

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => { setSelected(0); }, [query]);

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(s => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(s => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && results[selected]) {
      go(results[selected].id);
    }
  }

  function go(id) {
    navigate('/lesson/' + id);
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        className="module-search-trigger"
        onClick={() => setOpen(true)}
        title="Buscar módulo (Ctrl+K)"
      >
        <Search size={14} />
        <span>Buscar módulo…</span>
        <kbd>⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="module-search-overlay" onClick={() => setOpen(false)}>
      <div className="module-search-modal" onClick={e => e.stopPropagation()}>
        <div className="module-search-input-row">
          <Search size={16} className="module-search-icon" />
          <input
            ref={inputRef}
            className="module-search-input"
            placeholder="Buscar módulo ou fase…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="module-search-close" onClick={() => setOpen(false)}>
            <X size={15} />
          </button>
        </div>

        {query.trim() === '' && (
          <div className="module-search-hint">
            Digite para buscar entre {ALL_MODULES.length} módulos
          </div>
        )}

        {results.length > 0 && (
          <ul className="module-search-results">
            {results.map((mod, i) => (
              <li
                key={mod.id}
                className={'module-search-item' + (i === selected ? ' selected' : '')}
                onMouseEnter={() => setSelected(i)}
                onClick={() => go(mod.id)}
              >
                <div
                  className="module-search-dot"
                  style={{ background: mod.phaseColor }}
                />
                <div className="module-search-info">
                  <span className="module-search-title">{mod.title}</span>
                  <span className="module-search-phase">{mod.phaseTitle}</span>
                </div>
                <BookOpen size={13} className="module-search-arrow" />
              </li>
            ))}
          </ul>
        )}

        {query.trim() !== '' && results.length === 0 && (
          <div className="module-search-empty">
            Nenhum módulo encontrado para "{query}"
          </div>
        )}
      </div>
    </div>
  );
}
