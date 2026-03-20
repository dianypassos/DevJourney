import { Link } from 'react-router-dom';
import {
  Trophy, BookOpen, Star, ChevronRight,
  CheckCircle2, Lock, PlayCircle, Zap, ArrowRight, StickyNote, Map, Clock, Flame
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress.ts';
import { useStreak } from '../hooks/useStreak.ts';
import { PHASES, BADGES, ALL_MODULES } from '../data/roadmap.js';
import './Dashboard.css';

function parseDuration(str) {
  const match = str && str.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function phaseTotalTime(phase) {
  const total = phase.modules.reduce((acc, m) => acc + parseDuration(m.duration), 0);
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  const timeStr = hours > 0
    ? (mins > 0 ? `~${hours}h ${mins}min` : `~${hours}h`)
    : `~${total}min`;
  const sessionsMin = Math.max(1, Math.floor(total / 60));
  const sessionsMax = sessionsMin + 1;
  return { timeStr, sessions: `${sessionsMin}–${sessionsMax} sessões` };
}

// Fases essenciais para o mercado, na ordem recomendada
const RECOMMENDED_PATH = [
  { phase: 1,  label: 'Fundamentos',  pos: 1  },
  { phase: 2,  label: 'Lógica JS',    pos: 2  },
  { phase: 3,  label: 'Git',          pos: 3  },
  { phase: 4,  label: 'HTML & CSS',   pos: 4  },
  { phase: 5,  label: 'JS Avançado',  pos: 5  },
  { phase: 6,  label: 'Algoritmos',   pos: 6  },
  { phase: 7,  label: 'React',        pos: 7  },
  { phase: 8,  label: 'TypeScript',   pos: 8  },
  { phase: 9,  label: 'Next.js',      pos: 9  },
  { phase: 10, label: 'Backend',      pos: 10 },
];
const BONUS_PHASES = [11, 12, 13, 14, 15, 16, 17, 18];

function RecommendedPathBanner({ completedModules, getPhaseProgress }) {
  // Só exibe enquanto o aluno está nas fases iniciais (menos de 40% concluído)
  const totalModules = ALL_MODULES.length;
  const pct = Math.round((completedModules.length / totalModules) * 100);
  if (pct >= 40) return null;

  // Descobre próxima fase recomendada ainda não concluída
  const nextRecommended = RECOMMENDED_PATH.find(({ phase }) => {
    const p = getPhaseProgress('phase-' + phase);
    return p.percent < 100;
  });

  return (
    <div className="dash-recommended-banner">
      <div className="dash-recommended-header">
        <Map size={16} className="dash-recommended-icon" />
        <span className="dash-recommended-title">Trilha recomendada para o mercado</span>
        {nextRecommended && (
          <span className="dash-recommended-next">
            Próxima: <strong>Fase {nextRecommended.pos} — {nextRecommended.label}</strong>
          </span>
        )}
      </div>
      <div className="dash-recommended-steps">
        {RECOMMENDED_PATH.map(({ phase, label, pos }, i) => {
          const p = getPhaseProgress('phase-' + phase);
          const done = p.percent === 100;
          const active = !done && RECOMMENDED_PATH.slice(0, i).every(r => getPhaseProgress('phase-' + r.phase).percent === 100);
          return (
            <div key={phase} className={'dash-rec-step' + (done ? ' done' : active ? ' active' : '')}>
              <div className="dash-rec-dot">
                {done ? <CheckCircle2 size={13} /> : <span>{pos}</span>}
              </div>
              <span className="dash-rec-label">{label}</span>
              {i < RECOMMENDED_PATH.length - 1 && <div className={'dash-rec-line' + (done ? ' done' : '')} />}
            </div>
          );
        })}
      </div>
      <p className="dash-recommended-note">
        Fases <strong>11–18</strong> são bônus — aprofundam sua formação, mas não bloqueiam sua entrada no mercado.
      </p>
    </div>
  );
}

export default function Dashboard() {
  const {
    progress, getPhaseProgress, isModuleCompleted,
    isModuleUnlocked, overallPercent, levelProgress
  } = useProgress();

  const { streak } = useStreak();
  const earnedBadges = BADGES.filter(b => progress.badges.includes(b.id));

  // Find next module to work on
  const nextModule = ALL_MODULES.find(m => !isModuleCompleted(m.id));
  const lastCompletedModule = progress.completedModules.length > 0
    ? ALL_MODULES.find(m => m.id === progress.completedModules[progress.completedModules.length - 1])
    : null;

  // Count modules with notes
  const modulesWithNotes = ALL_MODULES.filter(m => {
    try { return !!localStorage.getItem('devjourney_note_' + m.id); } catch { return false; }
  }).length;

  // Calculate days since started
  const daysSince = progress.startedAt
    ? Math.floor((Date.now() - new Date(progress.startedAt)) / 86400000)
    : 0;

  return (
    <div className="dashboard page-container">
      {/* Hero */}
      <div className="dash-hero">
        <div className="dash-hero-text">
          <div className="dash-greeting">
            {progress.completedModules.length === 0 ? '👋 Bem-vindo ao DevJourney' : '👋 Bem-vindo de volta'}
          </div>
          <h1 className="dash-title">
            Sua jornada{' '}
            <span className="accent">
              {progress.completedModules.length === 0 ? 'começa agora' : 'continua'}
            </span>
          </h1>
          <p className="dash-subtitle">
            {progress.completedModules.length === 0
              ? 'Do zero ao pleno. Siga a trilha recomendada abaixo.'
              : `${progress.completedModules.length} de ${ALL_MODULES.length} módulos completos${daysSince > 0 ? ` — ${daysSince} dias de prática` : ''}.`}
          </p>
        </div>
        <div className="dash-hero-stats">
          <StatCard icon={<Zap size={18} />} value={progress.xp} label="XP Total" color="var(--accent)" />
          <StatCard icon={<Star size={18} />} value={'Nv. ' + progress.level} label="Nível Atual" color="var(--orange)" />
          <StatCard icon={<Trophy size={18} />} value={progress.badges.length} label="Conquistas" color="var(--green)" />
          <StatCard icon={<Flame size={18} />} value={streak.current} label="Streak (dias)" color="var(--orange)" />
          <StatCard icon={<BookOpen size={18} />} value={overallPercent + '%'} label="Concluído" color="var(--cyan)" />
        </div>
      </div>

      {/* Continue where you left off — MOST IMPORTANT CARD */}
      {nextModule && (
        <div className="dash-continue-card">
          <div className="continue-indicator" />
          <div className="continue-body">
            <div className="continue-label">
              {lastCompletedModule ? '▶ Continue de onde parou' : '🚀 Comece sua jornada'}
            </div>
            <div className="continue-title">{nextModule.title}</div>
            <div className="continue-meta">
              <span style={{ color: nextModule.phaseColor }}>{nextModule.phaseTitle}</span>
              <span>·</span>
              <span>{nextModule.duration}</span>
              <span>·</span>
              <span>{nextModule.xp} XP</span>
              {nextModule.content?.exercise && (
                <><span>·</span><span className="has-exercise-tag">💻 Exercício incluso</span></>
              )}
            </div>
          </div>
          <Link to={'/lesson/' + nextModule.id} className="btn btn-primary btn-continue">
            Ir para aula <ArrowRight size={16} />
          </Link>
        </div>
      )}

      <RecommendedPathBanner
        completedModules={progress.completedModules}
        getPhaseProgress={getPhaseProgress}
      />

      {overallPercent === 100 && (        <div className="dash-complete-banner">
          🏆 Parabéns! Você completou toda a jornada! Do zero ao pleno — está pronto para o mercado.
        </div>
      )}

      {/* Level Progress */}
      <div className="dash-level-section card">
        <div className="dash-level-header">
          <div className="dash-level-info">
            <span className="level-badge">Nível {progress.level}</span>
            <span className="level-xp">{levelProgress.current} / {levelProgress.needed} XP para o próximo nível</span>
          </div>
          <span className="level-pct">{Math.round(levelProgress.percent)}%</span>
        </div>
        <div className="progress-bar" style={{ height: 8, marginTop: 10 }}>
          <div className="progress-fill accent-fill" style={{ width: levelProgress.percent + '%' }} />
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="dash-progress-section card">
        <div className="dash-progress-header">
          <div>
            <div className="dash-progress-title">Progresso Geral da Jornada</div>
            <div className="dash-progress-sub">{progress.completedModules.length} / {ALL_MODULES.length} módulos · {PHASES.length} fases</div>
          </div>
          <div className="dash-progress-pct accent-text">{overallPercent}%</div>
        </div>
        <div className="progress-bar" style={{ height: 10, marginTop: 12 }}>
          <div className="progress-fill" style={{ width: overallPercent + '%' }} />
        </div>
        <div className="dash-progress-phases">
          {PHASES.map(phase => {
            const p = getPhaseProgress(phase.id);
            return (
              <div key={phase.id} className="dash-phase-chip" title={phase.title + ': ' + p.percent + '%'}>
                <span>{phase.icon}</span>
                <span className="dash-phase-chip-label">{phase.title.replace('HTML e CSS', 'HTML/CSS')}</span>
                <div className="chip-bar">
                  <div className="chip-fill" style={{ width: p.percent + '%', background: phase.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phases Grid */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h2>Trilha de Aprendizado</h2>
          <Link to="/roadmap" className="btn btn-ghost btn-sm">
            Ver Roadmap <ChevronRight size={14} />
          </Link>
        </div>

        <div className="dash-phases-grid">
          {PHASES.map(phase => {
            const p = getPhaseProgress(phase.id);
            const isDone = p.completed === p.total;
            const { timeStr, sessions } = phaseTotalTime(phase);

            return (
              <div key={phase.id} className={'dash-phase-card card ' + (isDone ? 'done' : '')} style={{ '--phase-color': phase.color }}>
                <div className="phase-card-header">
                  <div className="phase-number">Fase {phase.phase}</div>
                  <div className="phase-icon">{phase.icon}</div>
                </div>
                <h3 className="phase-title">{phase.title}</h3>
                <p className="phase-desc">{phase.description}</p>

                <div className="phase-time-estimate">
                  <Clock size={11} />
                  <span>{timeStr}</span>
                  <span className="phase-time-sessions">· {sessions}</span>
                </div>

                <div className="phase-progress">
                  <div className="phase-progress-text">
                    <span>{p.completed}/{p.total} módulos</span>
                    <span className="phase-pct">{p.percent}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: p.percent + '%', background: phase.color }} />
                  </div>
                </div>

                <div className="phase-modules-preview">
                  {phase.modules.slice(0, 4).map(mod => {
                    const completed = isModuleCompleted(mod.id);
                    const unlocked = isModuleUnlocked(mod.id);
                    const hasNote = (() => { try { return !!localStorage.getItem('devjourney_note_' + mod.id); } catch { return false; } })();
                    return (
                      <Link
                        key={mod.id}
                        to={unlocked ? '/lesson/' + mod.id : '#'}
                        className={'mod-chip ' + (completed ? 'completed' : unlocked ? 'unlocked' : 'locked')}
                        onClick={e => !unlocked && e.preventDefault()}
                        title={mod.title + (hasNote ? ' (tem anotação)' : '')}
                      >
                        {completed ? <CheckCircle2 size={11} /> : unlocked ? <PlayCircle size={11} /> : <Lock size={11} />}
                        <span>{mod.title}</span>
                        {hasNote && <StickyNote size={9} className="chip-note-icon" />}
                      </Link>
                    );
                  })}
                  {phase.modules.length > 4 && (
                    <div className="mod-chip-more">+{phase.modules.length - 4} módulos</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h2>Conquistas</h2>
          <span className="text-sm text-muted">{earnedBadges.length} / {BADGES.length} desbloqueadas</span>
        </div>
        <div className="badges-grid">
          {BADGES.map(badge => {
            const earned = progress.badges.includes(badge.id);
            return (
              <div key={badge.id} className={'badge-card card ' + (earned ? 'earned' : 'locked')}>
                <div className="badge-emoji">{badge.icon}</div>
                <div className="badge-info">
                  <div className="badge-name">{badge.title}</div>
                  <div className="badge-desc">{badge.description}</div>
                </div>
                {earned && <CheckCircle2 size={16} className="badge-check" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Notes Summary */}
      {modulesWithNotes > 0 && (
        <div className="dash-notes-summary card">
          <StickyNote size={18} className="notes-summary-icon" />
          <div>
            <div className="notes-summary-title">Você tem anotações em {modulesWithNotes} módulo{modulesWithNotes > 1 ? 's' : ''}</div>
            <div className="notes-summary-sub">Revise suas anotações abrindo cada módulo → aba Notas</div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, value, label, color }) {
  return (
    <div className="stat-card card">
      <div className="stat-icon" style={{ color, background: color + '18' }}>{icon}</div>
      <div className="stat-value" style={{ color }}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
