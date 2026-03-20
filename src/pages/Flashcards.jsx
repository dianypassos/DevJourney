import { useState, useMemo, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, BookOpen, AlertCircle, Star } from 'lucide-react';
import { ALL_MODULES, PHASES } from '../data/roadmap.js';
import { CURATED_FLASHCARDS } from '../data/flashcards.js';
import { useStreak } from '../hooks/useStreak.ts';
import './Flashcards.css';

// Build flashcards from quiz questions (existing source)
function buildQuizCards(modules) {
  return modules.flatMap(m =>
    (m.content?.quiz || []).map((q, i) => ({
      id: m.id + '-q' + i,
      question: q.question,
      answer: q.options[q.correct],
      explanation: q.explanation,
      moduleTitle: m.title,
      phaseTitle: m.phaseTitle,
      phaseColor: m.phaseColor,
      source: 'quiz',
    }))
  );
}

// Load wrong questions from localStorage (saved by Quiz component via Lesson)
function loadWrongCards() {
  try {
    const index = JSON.parse(localStorage.getItem('devjourney_wrong_index') || '[]');
    const cards = [];
    for (const moduleId of index) {
      const raw = localStorage.getItem('devjourney_wrong_' + moduleId);
      if (raw) {
        const wrongCards = JSON.parse(raw);
        wrongCards.forEach((c, i) => cards.push({ ...c, id: moduleId + '-w' + i, source: 'wrong' }));
      }
    }
    return cards;
  } catch {
    return [];
  }
}

function clearAllWrong() {
  try {
    const index = JSON.parse(localStorage.getItem('devjourney_wrong_index') || '[]');
    for (const moduleId of index) localStorage.removeItem('devjourney_wrong_' + moduleId);
    localStorage.removeItem('devjourney_wrong_index');
  } catch {}
}

// ── Flip Card Component ───────────────────────────────────────────────────────
function FlipCard({ card, flipped, onClick }) {
  if (!card) return null;
  return (
    <div className={'fc-card ' + (flipped ? 'flipped' : '')} onClick={onClick}>
      <div className="fc-card-inner">
        <div className="fc-card-front">
          <div className="fc-card-tag" style={{
            color: card.phaseColor || 'var(--accent)',
            borderColor: (card.phaseColor || 'var(--accent)') + '40',
            background: (card.phaseColor || 'var(--accent)') + '18',
          }}>
            {card.phaseTitle || 'Revisão'}{card.moduleTitle ? ' · ' + card.moduleTitle : ''}
          </div>
          <div className="fc-question">{card.question}</div>
          <div className="fc-flip-hint">Clique para revelar a resposta</div>
        </div>
        <div className="fc-card-back">
          <div className="fc-card-tag back-tag">Resposta</div>
          <div className="fc-answer">{card.answer}</div>
          {card.explanation && (
            <div className="fc-explanation">
              <div className="fc-explanation-label">Explicação</div>
              <p>{card.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Deck Mode (existing + curated) ───────────────────────────────────────────
function DeckMode({ allCards }) {
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all'); // all | curated | quiz
  const [shuffled, setShuffled] = useState(false);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seenCount, setSeenCount] = useState(0);

  const filteredCards = useMemo(() => {
    let base = selectedPhase === 'all'
      ? allCards
      : allCards.filter(c => c.phaseTitle === selectedPhase);
    if (sourceFilter === 'curated') base = base.filter(c => c.source === 'curated');
    if (sourceFilter === 'quiz') base = base.filter(c => c.source === 'quiz');
    return shuffled ? [...base].sort(() => Math.random() - 0.5) : base;
  }, [selectedPhase, sourceFilter, shuffled, allCards]);

  const card = filteredCards[index] || null;
  const progress = filteredCards.length > 0 ? Math.round(((index + 1) / filteredCards.length) * 100) : 0;

  function next() {
    setFlipped(false);
    setIndex(i => { const ni = Math.min(i + 1, filteredCards.length - 1); if (ni > seenCount) setSeenCount(ni); return ni; });
  }
  function prev() { setFlipped(false); setIndex(i => Math.max(i - 1, 0)); }
  function restart() { setIndex(0); setFlipped(false); setSeenCount(0); }

  const phaseOptions = ['all', ...PHASES.map(p => p.title)];

  return (
    <>
      <div className="fc-controls">
        <div className="fc-phase-filter">
          <select className="fc-select" value={selectedPhase}
            onChange={e => { setSelectedPhase(e.target.value); setIndex(0); setFlipped(false); }}>
            {phaseOptions.map(p => (
              <option key={p} value={p}>{p === 'all' ? 'Todas as fases (' + allCards.length + ')' : p}</option>
            ))}
          </select>
          <select className="fc-select" value={sourceFilter}
            onChange={e => { setSourceFilter(e.target.value); setIndex(0); setFlipped(false); }}>
            <option value="all">Todos os cards</option>
            <option value="curated">Curados ({allCards.filter(c=>c.source==='curated').length})</option>
            <option value="quiz">Quiz ({allCards.filter(c=>c.source==='quiz').length})</option>
          </select>
        </div>
        <div className="fc-actions">
          <button className={'fc-btn ' + (shuffled ? 'active' : '')}
            onClick={() => { setShuffled(s => !s); setIndex(0); setFlipped(false); }}>
            <Shuffle size={14} /> {shuffled ? 'Embaralhado' : 'Embaralhar'}
          </button>
          <button className="fc-btn" onClick={restart}><RotateCcw size={14} /> Reiniciar</button>
        </div>
      </div>

      <div className="fc-progress-row">
        <span className="fc-progress-text">{index + 1} / {filteredCards.length}</span>
        <div className="fc-progress-bar"><div className="fc-progress-fill" style={{ width: progress + '%' }} /></div>
        <span className="fc-progress-pct">{progress}%</span>
      </div>

      {card ? (
        <>
          <FlipCard card={card} flipped={flipped} onClick={() => setFlipped(f => !f)} />
          <div className="fc-nav">
            <button className="fc-nav-btn" onClick={prev} disabled={index === 0}><ChevronLeft size={18} /> Anterior</button>
            <div className="fc-nav-dots">
              {filteredCards.slice(Math.max(0, index - 3), Math.min(filteredCards.length, index + 4)).map((_, i) => {
                const realIdx = Math.max(0, index - 3) + i;
                return <div key={realIdx} className={'fc-dot ' + (realIdx === index ? 'current' : realIdx <= seenCount ? 'seen' : '')}
                  onClick={() => { setIndex(realIdx); setFlipped(false); }} />;
              })}
            </div>
            <button className="fc-nav-btn" onClick={next} disabled={index === filteredCards.length - 1}>Próximo <ChevronRight size={18} /></button>
          </div>
          {index === filteredCards.length - 1 && (
            <div className="fc-complete">
              <BookOpen size={24} />
              <div>
                <div className="fc-complete-title">Você revisou todos os {filteredCards.length} cartões!</div>
                <div className="fc-complete-sub">Clique em Reiniciar para praticar novamente.</div>
              </div>
              <button className="btn btn-primary" onClick={restart}><RotateCcw size={15} /> Reiniciar</button>
            </div>
          )}
        </>
      ) : (
        <div className="fc-empty">Nenhum flashcard encontrado para esta seleção.</div>
      )}
    </>
  );
}

// ── Review Mode (wrong answers) ──────────────────────────────────────────────
function ReviewMode() {
  const [wrongCards, setWrongCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [dismissed, setDismissed] = useState(new Set());

  useEffect(() => {
    setWrongCards(loadWrongCards());
  }, []);

  const activeCards = useMemo(
    () => wrongCards.filter((_, i) => !dismissed.has(i)),
    [wrongCards, dismissed]
  );

  const card = activeCards[index] || null;

  function dismiss() {
    // Mark this card as learned — remove from active
    const original = wrongCards.indexOf(activeCards[index]);
    setDismissed(d => new Set([...d, original]));
    setFlipped(false);
    if (index >= activeCards.length - 1) setIndex(Math.max(0, activeCards.length - 2));
  }

  function next() { setFlipped(false); setIndex(i => Math.min(i + 1, activeCards.length - 1)); }
  function prev() { setFlipped(false); setIndex(i => Math.max(i - 1, 0)); }

  function handleClearAll() {
    if (window.confirm('Limpar todas as questões erradas? Isso não apaga seu progresso de quiz.')) {
      clearAllWrong();
      setWrongCards([]);
      setDismissed(new Set());
    }
  }

  if (wrongCards.length === 0) {
    return (
      <div className="fc-review-empty">
        <div className="fc-review-empty-icon">🎯</div>
        <div className="fc-review-empty-title">Nenhuma questão para revisar</div>
        <div className="fc-review-empty-sub">
          Faça quizzes nos módulos — as questões que você errar aparecem aqui para revisão dirigida.
        </div>
      </div>
    );
  }

  if (activeCards.length === 0) {
    return (
      <div className="fc-review-empty">
        <div className="fc-review-empty-icon">✅</div>
        <div className="fc-review-empty-title">Revisão concluída!</div>
        <div className="fc-review-empty-sub">
          Você marcou todas as {wrongCards.length} questões como aprendidas nesta sessão.
        </div>
        <button className="btn btn-ghost fc-review-clear" onClick={handleClearAll}>
          <RotateCcw size={14} /> Limpar histórico de erros
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="fc-review-header">
        <div className="fc-review-count">
          <AlertCircle size={16} className="fc-review-icon" />
          <span><strong>{activeCards.length}</strong> questão{activeCards.length !== 1 ? 'ões' : ''} para revisar</span>
          {dismissed.size > 0 && <span className="fc-review-dismissed">· {dismissed.size} aprendida{dismissed.size !== 1 ? 's' : ''} nesta sessão</span>}
        </div>
        <button className="fc-btn fc-review-clear-btn" onClick={handleClearAll}>
          <RotateCcw size={13} /> Limpar tudo
        </button>
      </div>

      <div className="fc-progress-row">
        <span className="fc-progress-text">{index + 1} / {activeCards.length}</span>
        <div className="fc-progress-bar">
          <div className="fc-progress-fill fc-progress-review"
            style={{ width: (dismissed.size / wrongCards.length * 100) + '%' }} />
        </div>
        <span className="fc-progress-pct">{Math.round(dismissed.size / wrongCards.length * 100)}%</span>
      </div>

      <FlipCard card={card} flipped={flipped} onClick={() => setFlipped(f => !f)} />

      <div className="fc-review-actions">
        <button className="fc-nav-btn" onClick={prev} disabled={index === 0}><ChevronLeft size={18} /> Anterior</button>
        <button className="fc-btn fc-learned-btn" onClick={dismiss} disabled={!flipped}>
          <Star size={14} /> Já sei!
        </button>
        <button className="fc-nav-btn" onClick={next} disabled={index === activeCards.length - 1}>Próximo <ChevronRight size={18} /></button>
      </div>

      {!flipped && (
        <p className="fc-review-hint">Vire o cartão antes de marcar como aprendido</p>
      )}
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Flashcards() {
  const { registerActivity } = useStreak();
  const [mode, setMode] = useState('deck'); // deck | review

  // Merge curated + quiz cards
  const allCards = useMemo(() => {
    const quizCards = buildQuizCards(ALL_MODULES);
    const curated = CURATED_FLASHCARDS.map(c => ({ ...c, moduleTitle: '', source: 'curated' }));
    return [...curated, ...quizCards];
  }, []);

  const wrongCount = useMemo(() => {
    try {
      const index = JSON.parse(localStorage.getItem('devjourney_wrong_index') || '[]');
      return index.reduce((sum, id) => {
        const raw = localStorage.getItem('devjourney_wrong_' + id);
        return sum + (raw ? JSON.parse(raw).length : 0);
      }, 0);
    } catch { return 0; }
  }, []);

  useEffect(() => {
    if (allCards.length > 0) registerActivity();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flashcards-page page-container">
      <div className="flashcards-header">
        <h1>Flashcards</h1>
        <p className="flashcards-subtitle">
          {allCards.length} cartões disponíveis · Revise conceitos e questões que errou no quiz.
        </p>
      </div>

      {/* Mode tabs */}
      <div className="fc-mode-tabs">
        <button className={'fc-mode-tab ' + (mode === 'deck' ? 'active' : '')} onClick={() => setMode('deck')}>
          <BookOpen size={15} /> Estudar ({allCards.length})
        </button>
        <button className={'fc-mode-tab ' + (mode === 'review' ? 'active' : '')} onClick={() => setMode('review')}>
          <AlertCircle size={15} />
          Revisar Erros
          {wrongCount > 0 && <span className="fc-wrong-badge">{wrongCount}</span>}
        </button>
      </div>

      {mode === 'deck' ? <DeckMode allCards={allCards} /> : <ReviewMode />}
    </div>
  );
}
