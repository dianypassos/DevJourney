import { useState, useEffect } from 'react';
import { CheckSquare, Square, ChevronDown, ChevronUp, AlertTriangle, Trophy } from 'lucide-react';
import './PhaseChecklist.css';

const STORAGE_KEY = 'devjourney_checklists_v1';

function loadChecklists() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveChecklists(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export default function PhaseChecklist({ phase, nextPhaseTitle }) {
  const [checklists, setChecklists] = useState(loadChecklists);
  const [open, setOpen] = useState(true);

  const phaseKey = phase.id;
  const checked = checklists[phaseKey] || {};
  const items = phase.checklist || [];
  const total = items.length;
  const doneCount = items.filter((_, i) => checked[i]).length;
  const allDone = doneCount === total;

  useEffect(() => { saveChecklists(checklists); }, [checklists]);

  function toggle(idx) {
    setChecklists(prev => {
      const phaseChecks = { ...(prev[phaseKey] || {}) };
      phaseChecks[idx] = !phaseChecks[idx];
      return { ...prev, [phaseKey]: phaseChecks };
    });
  }

  if (!items.length) return null;

  const gapCount = total - doneCount;

  return (
    <div className={'pcl-wrap' + (allDone ? ' pcl-done' : '')}>
      {/* Header */}
      <button className="pcl-header" onClick={() => setOpen(v => !v)}>
        <div className="pcl-header-left">
          <div className="pcl-icon" style={{ '--phase-color': phase.color }}>
            {allDone ? <Trophy size={15} /> : <CheckSquare size={15} />}
          </div>
          <div>
            <div className="pcl-title">
              {allDone
                ? `Fase ${phase.phase} dominada! Pronto para avançar 🎉`
                : `Antes de avançar para ${nextPhaseTitle || 'a próxima fase'}…`}
            </div>
            <div className="pcl-subtitle">
              {allDone
                ? `Você marcou todos os ${total} itens — base sólida!`
                : `${doneCount} de ${total} itens confirmados${gapCount > 0 ? ` · ${gapCount} para revisar` : ''}`}
            </div>
          </div>
        </div>
        <div className="pcl-header-right">
          <div className="pcl-progress-mini">
            <div
              className="pcl-progress-fill"
              style={{ width: `${Math.round((doneCount / total) * 100)}%`, background: phase.color }}
            />
          </div>
          <span className="pcl-pct">{Math.round((doneCount / total) * 100)}%</span>
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {/* Items */}
      {open && (
        <div className="pcl-body">
          {!allDone && (
            <p className="pcl-intro">
              Marque cada item que você consegue fazer com confiança. Itens não marcados são sinais de gaps — revise antes de avançar.
            </p>
          )}

          <div className="pcl-items">
            {items.map((item, idx) => (
              <label key={idx} className={'pcl-item' + (checked[idx] ? ' pcl-item-checked' : '')}>
                <input
                  type="checkbox"
                  checked={!!checked[idx]}
                  onChange={() => toggle(idx)}
                  className="pcl-checkbox"
                />
                <span className="pcl-item-icon">
                  {checked[idx] ? <CheckSquare size={16} /> : <Square size={16} />}
                </span>
                <span className="pcl-item-text">{item}</span>
              </label>
            ))}
          </div>

          {!allDone && gapCount > 0 && (
            <div className="pcl-gap-hint">
              <AlertTriangle size={13} />
              <span>
                {gapCount === 1
                  ? '1 item não marcado — revise esse tópico antes de avançar.'
                  : `${gapCount} itens não marcados — volte aos módulos relevantes e revise.`}
              </span>
            </div>
          )}

          {allDone && (
            <div className="pcl-all-done">
              <Trophy size={14} />
              <span>Base sólida! Você está pronto para a próxima fase.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
