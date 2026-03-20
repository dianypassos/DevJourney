import { useState } from 'react';
import { ExternalLink, Star, CheckSquare, Square, Github, Link2 } from 'lucide-react';
import { PROJECTS } from '../data/projects.js';
import './Projects.css';

const LEVELS = ['todos', 'iniciante', 'intermediario', 'avancado'];
const LEVEL_LABELS = { todos: 'Todos', iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado' };
const LEVEL_COLORS = { iniciante: 'var(--green)', intermediario: 'var(--orange)', avancado: 'var(--red)' };

function useProjectStorage(projectId) {
  const key = 'devjourney_proj_' + projectId;

  function load() {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : { checkedFeatures: [], githubUrl: '', deployUrl: '' };
    } catch { return { checkedFeatures: [], githubUrl: '', deployUrl: '' }; }
  }

  function save(data) {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
  }

  return { load, save };
}

export default function Projects() {
  const [filter, setFilter] = useState('todos');

  const filtered = filter === 'todos' ? PROJECTS : PROJECTS.filter(p => p.level === filter);

  // Count started projects
  const startedCount = PROJECTS.filter(p => {
    try {
      const d = JSON.parse(localStorage.getItem('devjourney_proj_' + p.id) || '{}');
      return d.checkedFeatures?.length > 0 || d.githubUrl;
    } catch { return false; }
  }).length;

  return (
    <div className="projects-page page-container">
      <div className="projects-header">
        <h1>Projetos para Portfólio</h1>
        <p className="projects-subtitle">
          Construa projetos reais para demonstrar suas habilidades. Marque features concluídas e salve links do GitHub e deploy.
        </p>
        {startedCount > 0 && (
          <div className="projects-started-badge">{startedCount} projeto{startedCount > 1 ? 's' : ''} em andamento</div>
        )}
      </div>

      <div className="projects-stats">
        {['iniciante', 'intermediario', 'avancado'].map(level => (
          <div key={level} className="project-stat-card card" style={{ '--lvl-color': LEVEL_COLORS[level] }}>
            <div className="pstat-num">{PROJECTS.filter(p => p.level === level).length}</div>
            <div className="pstat-label">{LEVEL_LABELS[level]}</div>
          </div>
        ))}
      </div>

      <div className="filter-tabs">
        {LEVELS.map(level => (
          <button
            key={level}
            className={'filter-tab ' + (filter === level ? 'active' : '')}
            onClick={() => setFilter(level)}
          >
            {LEVEL_LABELS[level]}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const { load, save } = useProjectStorage(project.id);
  const [data, setData] = useState(load);
  const levelColor = LEVEL_COLORS[project.level] || 'var(--accent)';

  function toggleFeature(featureIdx) {
    const newChecked = data.checkedFeatures.includes(featureIdx)
      ? data.checkedFeatures.filter(i => i !== featureIdx)
      : [...data.checkedFeatures, featureIdx];
    const newData = { ...data, checkedFeatures: newChecked };
    setData(newData);
    save(newData);
  }

  function updateUrl(field, val) {
    const newData = { ...data, [field]: val };
    setData(newData);
    save(newData);
  }

  const completedCount = data.checkedFeatures.length;
  const totalFeatures = project.features?.length || 0;
  const progressPct = totalFeatures > 0 ? Math.round((completedCount / totalFeatures) * 100) : 0;
  const isComplete = progressPct === 100 && !!data.githubUrl;

  return (
    <div className={'project-card card ' + (isComplete ? 'proj-complete' : '')} style={{ '--proj-color': levelColor }}>
      <div className="project-card-top">
        <div className="project-icon">{project.icon}</div>
        <div className="project-level-badge" style={{ color: levelColor, background: levelColor + '15' }}>
          {LEVEL_LABELS[project.level]}
        </div>
        {isComplete && <div className="proj-done-tag">✓ Concluído</div>}
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>

      {/* Progress bar when features exist */}
      {totalFeatures > 0 && (
        <div className="proj-progress">
          <div className="proj-progress-text">
            <span>{completedCount}/{totalFeatures} features</span>
            <span>{progressPct}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: progressPct + '%', background: levelColor }} />
          </div>
        </div>
      )}

      <div className="project-meta">
        <span>⏱ {project.estimatedTime}</span>
        <div className="project-difficulty">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={12}
              fill={i < project.difficulty ? levelColor : 'transparent'}
              color={i < project.difficulty ? levelColor : 'var(--text-3)'}
            />
          ))}
        </div>
      </div>

      <div className="project-tech-row">
        {project.tech.map(t => <span key={t} className="tech-chip">{t}</span>)}
      </div>

      <button className="project-expand-btn" onClick={() => setExpanded(!expanded)}>
        {expanded ? '▲ Menos detalhes' : '▼ Ver detalhes e checklist'}
      </button>

      {expanded && (
        <div className="project-details">
          <div className="detail-section">
            <div className="detail-label">🎯 Objetivo</div>
            <p className="detail-text">{project.objective}</p>
          </div>

          {project.features?.length > 0 && (
            <div className="detail-section">
              <div className="detail-label">✅ Checklist de Features</div>
              <ul className="feature-checklist">
                {project.features.map((f, i) => (
                  <li
                    key={i}
                    className={'feature-item ' + (data.checkedFeatures.includes(i) ? 'checked' : '')}
                    onClick={() => toggleFeature(i)}
                  >
                    {data.checkedFeatures.includes(i)
                      ? <CheckSquare size={14} style={{ color: levelColor }} />
                      : <Square size={14} />}
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.deployTip && (
            <div className="detail-section">
              <div className="detail-label">🚀 Como fazer Deploy</div>
              <p className="detail-text detail-tip">{project.deployTip}</p>
            </div>
          )}

          {project.portfolioTip && (
            <div className="detail-section">
              <div className="detail-label">💡 Valor para o Portfólio</div>
              <p className="detail-text detail-highlight">{project.portfolioTip}</p>
            </div>
          )}

          <div className="detail-section">
            <div className="detail-label">🔗 Links do Projeto</div>
            <div className="proj-links-inputs">
              <div className="proj-link-row">
                <Github size={14} />
                <input
                  type="url"
                  className="proj-link-input"
                  placeholder="https://github.com/seu-usuario/projeto"
                  value={data.githubUrl}
                  onChange={e => updateUrl('githubUrl', e.target.value)}
                />
                {data.githubUrl && (
                  <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-link-open">
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
              <div className="proj-link-row">
                <Link2 size={14} />
                <input
                  type="url"
                  className="proj-link-input"
                  placeholder="https://meu-projeto.vercel.app"
                  value={data.deployUrl}
                  onChange={e => updateUrl('deployUrl', e.target.value)}
                />
                {data.deployUrl && (
                  <a href={data.deployUrl} target="_blank" rel="noopener noreferrer" className="proj-link-open">
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
