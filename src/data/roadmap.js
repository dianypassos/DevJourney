import { phase1 } from './phases/phase1.js';
import { phase2 } from './phases/phase2.js';
import { phase3 } from './phases/phase3.js';
import { phase4, phase5 } from './phases/phase45.js';
import { phase6  } from './phases/phase6.js';
import { phase7  } from './phases/phase7.js';
import { phase8  } from './phases/phase8.js';
import { phase9  } from './phases/phase9.js';
import { phase10 } from './phases/phase10.js';
import { phase11 } from './phases/phase11.js';
import { phase12 } from './phases/phase12.js';
import { phase13 } from './phases/phase13.js';
import { phase14 } from './phases/phase14.js';
import { phase15 } from './phases/phase15.js';
import { phase16 } from './phases/phase16.js';
import { phase17 } from './phases/phase17.js';
import { phase18 } from './phases/phase18.js';

export const PHASES = [
  phase1,   // Fundamentos da Computação
  phase2,   // Lógica de Programação com JavaScript
  phase3,   // Git e GitHub
  phase4,   // HTML e CSS
  phase5,   // JavaScript Avançado
  phase6,   // React
  phase7,   // TypeScript
  phase8,   // Backend com Node.js
  phase9,   // Fullstack e Deploy
  phase10,  // Engenharia de Software
  phase18,  // Next.js — Fullstack com React
  phase12,  // Algoritmos e Estruturas de Dados
  phase13,  // Banco de Dados com Profundidade
  phase15,  // Redes e HTTP
  phase14,  // Docker e Containers
  phase16,  // Design de Sistemas
  phase17,  // Segurança Web
  phase11,  // Inglês para Devs
];

export const BADGES = [
  { id: 'first-code', title: 'Primeiro Código', icon: '🖥️', description: 'Completou o primeiro módulo', condition: (s) => s.completedModules >= 1 },
  { id: 'terminal-pro', title: 'Terminal Pro', icon: '🖤', description: 'Dominou o terminal', condition: (s) => s.completedModules >= 4 },
  { id: 'logic-master', title: 'Mestre da Lógica', icon: '🧩', description: 'Completou toda a Fase de Lógica', condition: (s) => s.completedPhases?.includes('phase-2') },
  { id: 'git-pro', title: 'Git Pro', icon: '🔧', description: 'Dominou Git e GitHub', condition: (s) => s.completedPhases?.includes('phase-3') },
  { id: 'web-warrior', title: 'Guerreiro Web', icon: '🌐', description: 'Completou HTML e CSS', condition: (s) => s.completedPhases?.includes('phase-4') },
  { id: 'js-ninja', title: 'JS Ninja', icon: '⚡', description: 'Completou JavaScript Avançado', condition: (s) => s.completedPhases?.includes('phase-5') },
  { id: 'react-dev', title: 'React Developer', icon: '⚛️', description: 'Dominou React', condition: (s) => s.completedPhases?.includes('phase-7') },
  { id: 'ts-master', title: 'TypeScript Master', icon: '🔷', description: 'Dominou TypeScript', condition: (s) => s.completedPhases?.includes('phase-8') },
  { id: 'backend-dev', title: 'Backend Developer', icon: '🖧', description: 'Construiu APIs profissionais', condition: (s) => s.completedPhases?.includes('phase-10') },
  { id: 'fullstack', title: 'Fullstack Developer', icon: '🚀', description: 'Integrou frontend e backend', condition: (s) => s.completedPhases?.includes('phase-13') },
  { id: 'senior', title: 'Desenvolvedor Pleno', icon: '🏗️', description: 'Completou toda a jornada!', condition: (s) => s.completedPhases?.includes('phase-14') },
  { id: 'english-dev', title: 'Global Dev', icon: '🌍', description: 'Dominou inglês técnico para devs', condition: (s) => s.completedPhases?.includes('phase-18') },
  { id: 'system-design-master', title: 'System Architect', icon: '🏗️', description: 'Dominou design de sistemas distribuídos', condition: (s) => s.completedPhases?.includes('phase-16') },
  { id: 'algo-master', title: 'Algorithm Master', icon: '🧠', description: 'Dominou algoritmos e estruturas de dados', condition: (s) => s.completedPhases?.includes('phase-6') },
  { id: 'network-master', title: 'Network Expert', icon: '🌐', description: 'Dominou redes e HTTP', condition: (s) => s.completedPhases?.includes('phase-11') },
  { id: 'docker-master', title: 'Container Expert', icon: '🐳', description: 'Dominou Docker e containers', condition: (s) => s.completedPhases?.includes('phase-15') },
  { id: 'db-master', title: 'Database Master', icon: '🗄️', description: 'Dominou banco de dados com profundidade', condition: (s) => s.completedPhases?.includes('phase-12') },
  { id: 'security-master', title: 'Security Engineer', icon: '🔐', description: 'Dominou segurança web e OWASP Top 10', condition: (s) => s.completedPhases?.includes('phase-17') },
  { id: 'nextjs-master', title: 'Next.js Developer', icon: '▲', description: 'Dominou o App Router e fullstack moderno com Next.js', condition: (s) => s.completedPhases?.includes('phase-9') },
];

export const ALL_MODULES = PHASES.flatMap(p =>
  p.modules.map(m => ({ ...m, phaseId: p.id, phaseTitle: p.title, phaseColor: p.color }))
);
