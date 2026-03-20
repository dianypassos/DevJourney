import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Map, Code2, Wrench, Briefcase,
  Trophy, ChevronRight, Zap, Star, CreditCard, Trash2,
  BookMarked, Flame, Bell, BellOff,
} from 'lucide-react';
import { useProgress } from '../../hooks/useProgress.ts';
import { useStreak }   from '../../hooks/useStreak.ts';
import { BADGES }      from '../../data/roadmap.js';
import ReminderModal   from './ReminderModal.jsx';
import './Sidebar.css';

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/roadmap', icon: Map, label: 'Roadmap' },
  { to: '/projects', icon: Code2, label: 'Projetos' },
  { to: '/flashcards', icon: CreditCard, label: 'Flashcards' },
  { to: '/resources', icon: BookMarked, label: 'Recursos' },
  { to: '/setup', icon: Wrench, label: 'Setup' },
  { to: '/career', icon: Briefcase, label: 'Carreira' },
];

// Mini grid: últimas 4 semanas (28 dias) com labels e separação por semana
function StreakGrid({ activeDays }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = String(today.getFullYear()) + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');

  // Construir 28 dias (4 semanas × 7) do mais antigo para o mais recente
  const days = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d);
  }

  // Agrupar em 4 semanas — a primeira semana começa no domingo anterior ao dia mais antigo
  // para que cada coluna corresponda sempre ao mesmo dia da semana
  const DAY_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  // Preencher até 28 células alinhadas por dia da semana
  // Encontrar o domingo anterior ao dia mais antigo
  const oldest = days[0];
  const startOffset = oldest.getDay(); // 0=dom, 1=seg, ...
  const paddedDays = [];
  for (let i = 0; i < startOffset; i++) paddedDays.push(null); // células vazias no início
  days.forEach(d => paddedDays.push(d));
  // Completar até múltiplo de 7
  while (paddedDays.length % 7 !== 0) paddedDays.push(null);
  // Agrupar em semanas
  const weeks = [];
  for (let i = 0; i < paddedDays.length; i += 7) weeks.push(paddedDays.slice(i, i + 7));

  // Tooltip: DD/MM a partir de um objeto Date
  const toTooltip = (d) => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return dd + '/' + mm;
  };

  return (
    <div className="streak-grid-wrap">
      {/* Labels fixas D S T Q Q S S — sempre na mesma posição */}
      <div className="streak-day-labels">
        {DAY_LABELS.map((lbl, i) => (
          <div key={i} className="streak-day-lbl">{lbl}</div>
        ))}
      </div>

      {/* Semanas alinhadas */}
      {weeks.map((week, wi) => (
        <div key={wi} className="streak-week">
          {week.map((d, di) => {
            if (!d) return <div key={di} className="streak-cell empty" />;
            const ds = String(d.getFullYear()) + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
            const isToday   = ds === todayStr;
            const isActive  = activeDays.includes(ds);
            let cls = 'streak-cell';
            if (isActive) cls += ' active';
            if (isToday)  cls += ' today';
            return (
              <div
                key={ds}
                className={cls}
                title={toTooltip(d)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Sidebar() {
  const { progress, overallPercent, levelProgress, resetProgress } = useProgress();
  const {
    streak, reminder, studiedToday, streakAtRisk,
    enableReminder, disableReminder, updateReminderTime,
  } = useStreak();

  const [showReminder, setShowReminder] = useState(false);
  const earnedBadgesData = BADGES.filter(b => progress.badges.includes(b.id));

  const reminderActive = reminder.enabled && reminder.permission === 'granted';
  const pad = n => String(n).padStart(2, '0');

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon"><Zap size={18} /></div>
          <span className="logo-text">DevJourney</span>
        </div>

        {/* User Card */}
        <div className="user-card">
          <div className="user-avatar">🧑‍💻</div>
          <div className="user-info">
            <div className="user-name">Desenvolvedor</div>
            <div className="user-level">
              <Star size={10} />
              <span>Nível {progress.level}</span>
            </div>
          </div>
          <div className="user-xp">{progress.xp} XP</div>
        </div>

        {/* Level Progress */}
        <div className="level-progress">
          <div className="level-progress-header">
            <span>Nível {progress.level}</span>
            <span className="level-progress-pct">{Math.round(levelProgress.percent)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: levelProgress.percent + '%' }} />
          </div>
          <div className="level-progress-xp">
            {levelProgress.current} / {levelProgress.needed} XP
          </div>
        </div>

        {/* ── STREAK CARD ── */}
        <div className={'streak-card' + (streakAtRisk ? ' streak-at-risk' : '') + (studiedToday ? ' streak-studied' : '')}>
          <div className="streak-top">
            <div className="streak-main">
              <Flame size={18} className={'streak-flame' + (studiedToday ? ' lit' : streakAtRisk ? ' risk' : '')} />
              <div className="streak-count">{streak.current}</div>
              <div className="streak-label">
                {streak.current === 1 ? 'dia' : 'dias'}
                {studiedToday && <span className="streak-today-badge">✓ hoje</span>}
              </div>
            </div>
            <div className="streak-best">
              <span className="streak-best-num">🏆 {streak.best}</span>
              <span className="streak-best-label">recorde</span>
            </div>
          </div>

          {/* Grid dos últimos 28 dias */}
          <StreakGrid activeDays={streak.activeDays} />

          {streakAtRisk && !studiedToday && (
            <div className="streak-risk-msg">
              ⚠️ Estude hoje para não perder seu streak!
            </div>
          )}

          {/* Botão de lembrete */}
          <button
            className={'streak-reminder-btn' + (reminderActive ? ' active' : '')}
            onClick={() => setShowReminder(true)}
            title={reminderActive ? `Lembrete às ${pad(reminder.hour)}:${pad(reminder.minute)}` : 'Configurar lembrete'}
          >
            {reminderActive
              ? <><Bell size={11} /> {pad(reminder.hour)}:{pad(reminder.minute)}</>
              : <><BellOff size={11} /> Ativar lembrete</>
            }
          </button>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <div className="nav-label">Menu</div>
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => 'nav-item ' + (isActive ? 'active' : '')}
            >
              <Icon size={17} />
              <span>{label}</span>
              <ChevronRight size={14} className="nav-chevron" />
            </NavLink>
          ))}
        </nav>

        {/* Overall Progress */}
        <div className="overall-progress">
          <div className="overall-header">
            <Trophy size={14} />
            <span>Progresso Geral</span>
            <span className="overall-pct">{overallPercent}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: overallPercent + '%' }} />
          </div>
          <div className="overall-modules">
            {progress.completedModules.length} módulos concluídos
          </div>
        </div>

        {/* Badges preview */}
        {earnedBadgesData.length > 0 && (
          <div className="badges-preview">
            <div className="badges-label">Conquistas recentes</div>
            <div className="badges-row">
              {earnedBadgesData.slice(-5).map(b => (
                <div key={b.id} className="badge-icon" title={b.title}>{b.icon}</div>
              ))}
            </div>
          </div>
        )}

        {/* Reset button */}
        <button
          className="sidebar-reset"
          onClick={() => {
            if (window.confirm('Resetar todo o progresso? Esta ação não pode ser desfeita.')) {
              resetProgress();
            }
          }}
          title="Resetar progresso"
        >
          <Trash2 size={12} />
          <span>Resetar progresso</span>
        </button>
      </div>

      {/* Modal de lembrete */}
      {showReminder && (
        <ReminderModal
          reminder={reminder}
          onEnable={enableReminder}
          onDisable={disableReminder}
          onClose={() => setShowReminder(false)}
        />
      )}
    </aside>
  );
}
