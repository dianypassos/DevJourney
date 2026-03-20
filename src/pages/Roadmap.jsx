import { Link } from 'react-router-dom';
import { CheckCircle2, PlayCircle, Layers, ChevronRight, Zap, Clock } from 'lucide-react';
import { useProgress } from '../hooks/useProgress.ts';
import { PHASES } from '../data/roadmap.js';
import PhaseChecklist from '../components/roadmap/PhaseChecklist.jsx';
import './Roadmap.css';

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

export default function Roadmap() {
  const { getPhaseProgress, isModuleCompleted, isModuleRecommended } = useProgress();

  return (
    <div className="roadmap-page page-container">
      <div className="roadmap-header">
        <h1>Roadmap Completo</h1>
        <p className="roadmap-subtitle">Do zero ao pleno. Siga a trilha e chegue ao mercado de trabalho.</p>
      </div>

      <div className="roadmap-timeline">
        {PHASES.map((phase, phaseIdx) => {
          const phaseProgress = getPhaseProgress(phase.id);
          const isDone = phaseProgress.percent === 100;
          const isStarted = phaseProgress.completed > 0;

          const { timeStr, sessions } = phaseTotalTime(phase);

          return (
            <div key={phase.id} className="timeline-phase">
              {/* Phase connector line */}
              {phaseIdx > 0 && <div className="timeline-connector" style={{ '--color': phase.color }} />}

              {/* Phase Header */}
              <div className={`phase-header-node ${isDone ? 'done' : isStarted ? 'active' : ''}`} style={{ '--color': phase.color }}>
                <div className="phase-node-icon">{phase.icon}</div>
                <div className="phase-node-info">
                  <div className="phase-node-num">Fase {phase.phase}</div>
                  <div className="phase-node-title">{phase.title}</div>
                  <div className="phase-node-time">
                    <Clock size={11} />
                    <span>{timeStr}</span>
                    <span className="phase-node-sessions">· {sessions}</span>
                  </div>
                </div>
                <div className="phase-node-progress">
                  <div className="phase-node-pct">{phaseProgress.percent}%</div>
                  <div className="phase-node-bar">
                    <div className="phase-node-fill" style={{ width: `${phaseProgress.percent}%`, background: phase.color }} />
                  </div>
                </div>
              </div>

              {/* Modules */}
              <div className="phase-modules">
                {phase.modules.map((mod, modIdx) => {
                  const completed = isModuleCompleted(mod.id);
                  const recommended = isModuleRecommended(mod.id);
                  const status = completed ? 'completed' : recommended ? 'unlocked' : 'suggested';

                  if (mod.isMiniProject) {
                    return (
                      <div key={mod.id} className="module-row">
                        <div className="module-connector module-connector-mp" />
                        <div className={`module-node module-node-mp ${status}`}>
                          <div className="module-status-icon mp-icon">
                            {completed ? <CheckCircle2 size={16} /> : <Layers size={16} />}
                          </div>
                          <div className="module-info">
                            <div className="mp-label">Mini-Projeto</div>
                            <div className="module-title">{mod.title.replace('🏗️ Mini-Projeto: ', '')}</div>
                            <div className="module-meta">
                              <span>⏱ {mod.duration}</span>
                              <span><Zap size={11} /> {mod.xp} XP</span>
                            </div>
                          </div>
                          <div className="module-action">
                            <Link
                              to={`/lesson/${mod.id}`}
                              className={`btn btn-sm ${completed ? 'btn-ghost' : 'btn-primary'}`}
                            >
                              {completed ? 'Revisar' : 'Construir'}
                              <ChevronRight size={13} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={mod.id} className="module-row">
                      {modIdx > 0 && <div className="module-connector" />}
                      
                      <div className={`module-node ${status}`}>
                        <div className="module-status-icon">
                          {completed ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}
                        </div>
                        
                        <div className="module-info">
                          <div className="module-title">{mod.title}</div>
                          <div className="module-meta">
                            <span>⏱ {mod.duration}</span>
                            <span>
                              <Zap size={11} /> {mod.xp} XP
                            </span>
                          </div>
                        </div>

                        <div className="module-action">
                          <Link 
                            to={`/lesson/${mod.id}`} 
                            className={`btn btn-sm ${completed ? 'btn-ghost' : recommended ? 'btn-primary' : 'btn-outline'}`}
                          >
                            {completed ? 'Revisar' : 'Iniciar'}
                            <ChevronRight size={13} />
                          </Link>
                          {!completed && !recommended && (
                            <span className="prereq-hint">fora de ordem</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Checklist — shown when phase is 100% complete */}
              {isDone && phase.checklist && (
                <PhaseChecklist
                  phase={phase}
                  nextPhaseTitle={
                    PHASES[phaseIdx + 1] ? PHASES[phaseIdx + 1].title : null
                  }
                />
              )}
            </div>
          );
        })}

        {/* End of Roadmap */}
        <div className="roadmap-end">
          <div className="roadmap-end-icon">🏆</div>
          <div className="roadmap-end-title">Desenvolvedor Pleno</div>
          <div className="roadmap-end-sub">Complete todos os módulos e chegue ao mercado pronto para vagas pleno</div>
        </div>
      </div>
    </div>
  );
}
