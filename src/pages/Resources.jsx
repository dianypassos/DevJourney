import { useState } from 'react';
import { ChevronDown, ExternalLink, BookOpen, BookMarked } from 'lucide-react';
import { PHASES } from '../data/roadmap.js';
import { RESOURCES, RESOURCE_TYPE_LABELS, RESOURCE_TYPE_ICONS } from '../data/resources.js';
import './Resources.css';

const TYPE_COLORS = {
  doc:       { border: '#60a5fa', bg: 'rgba(96,165,250,0.08)'  },
  course:    { border: '#a78bfa', bg: 'rgba(167,139,250,0.08)' },
  video:     { border: '#f87171', bg: 'rgba(248,113,113,0.08)' },
  practice:  { border: '#34d399', bg: 'rgba(52,211,153,0.08)'  },
  tool:      { border: '#fbbf24', bg: 'rgba(251,191,36,0.08)'  },
  community: { border: '#f97316', bg: 'rgba(249,115,22,0.08)'  },
};

export default function Resources() {
  // Start with first phase open
  const [openPhase, setOpenPhase] = useState('phase-1');

  const phasesWithResources = PHASES.filter(p => RESOURCES[p.id]?.length > 0);

  return (
    <div className="resources-page page-container">
      <div className="resources-page-header">
        <div className="resources-page-icon">📚</div>
        <div>
          <h1 className="resources-page-title">Onde Estudar</h1>
          <p className="resources-page-sub">
            Documentação oficial, cursos e ferramentas de prática — organizados por fase do roadmap.
          </p>
        </div>
      </div>

      <div className="resources-legend">
        {Object.entries(RESOURCE_TYPE_LABELS).map(([type, label]) => (
          <span key={type} className="legend-item" style={{ borderColor: TYPE_COLORS[type].border }}>
            {RESOURCE_TYPE_ICONS[type]} {label}
          </span>
        ))}
      </div>

      <div className="resources-accordion">
        {phasesWithResources.map(phase => {
          const isOpen = openPhase === phase.id;
          const phaseResources = RESOURCES[phase.id] || [];

          return (
            <div key={phase.id} className={'resources-phase ' + (isOpen ? 'open' : '')}>

              {/* Phase header — clickable */}
              <button
                className="resources-phase-header"
                onClick={() => setOpenPhase(isOpen ? null : phase.id)}
                style={{ '--phase-color': phase.color }}
              >
                <span className="phase-header-icon">{phase.icon}</span>
                <span className="phase-header-name">{phase.title}</span>
                <span className="phase-header-count">{phaseResources.length} recursos</span>
                <ChevronDown size={15} className="phase-header-chevron" />
              </button>

              {/* Phase body */}
              {isOpen && (
                <div className="resources-phase-body">
                  {/* Module index for this phase */}
                  <div className="phase-modules-index">
                    {phase.modules.map(mod => (
                      <span key={mod.id} className="phase-mod-pill">
                        <BookOpen size={10} />
                        {mod.title}
                      </span>
                    ))}
                  </div>

                  {/* Resources grid */}
                  <div className="resources-cards-grid">
                    {phaseResources.map((r, i) => {
                      const colors = TYPE_COLORS[r.type] || TYPE_COLORS.doc;
                      return (
                        <a
                          key={i}
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="res-card"
                          style={{ '--card-border': colors.border, '--card-bg': colors.bg }}
                        >
                          <div className="res-card-top">
                            <span className="res-type-badge">
                              {RESOURCE_TYPE_ICONS[r.type]} {RESOURCE_TYPE_LABELS[r.type]}
                            </span>
                            <div className="res-tags">
                              {r.free && <span className="res-tag res-tag-free">Gratuito</span>}
                              {r.ptBR && <span className="res-tag res-tag-ptbr">🇧🇷 PT-BR</span>}
                            </div>
                          </div>
                          <div className="res-title">
                            {r.title}
                            <ExternalLink size={12} className="res-ext-icon" />
                          </div>
                          <div className="res-desc">{r.desc}</div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
