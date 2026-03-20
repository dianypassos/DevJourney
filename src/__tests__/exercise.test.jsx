import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Exercise from '../components/exercise/Exercise.jsx';

// Mock do AstraContext
vi.mock('../contexts/AstraContext.jsx', () => ({
  useAstra: () => ({
    triggerOpenWithError: vi.fn(),
    getError: vi.fn(),
    clearExerciseError: vi.fn(),
    reportExerciseError: vi.fn(),
    errorTriggerCount: 0,
  }),
}));

const exercicioSimples = {
  title: 'Soma de dois números',
  description: 'Imprima a soma de 2 e 3.',
  starterCode: '// Escreva seu código aqui\nconsole.log(2 + 3);\n',
  solutionHint: 'Use console.log(2 + 3)',
  validate: (output) => output.trim() === '5',
  validateMessage: 'O output deve ser 5.',
};

const exercicioFalho = {
  title: 'Exercício que falha',
  description: 'Este exercício sempre falha.',
  starterCode: 'console.log("errado");\n',
  solutionHint: 'Dica aqui',
  validate: (output) => output.trim() === '5',
  validateMessage: 'O output deve ser 5.',
};

describe('Exercise component', () => {
  it('renderiza título e descrição', () => {
    render(<Exercise exercise={exercicioSimples} onComplete={() => {}} />);
    expect(screen.getByText('Soma de dois números')).toBeDefined();
    expect(screen.getByText('Imprima a soma de 2 e 3.')).toBeDefined();
  });

  it('mostra o código inicial no textarea', () => {
    render(<Exercise exercise={exercicioSimples} onComplete={() => {}} />);
    const textarea = screen.getByRole('textbox') || document.querySelector('textarea');
    expect(document.querySelector('textarea').value).toContain('console.log(2 + 3)');
  });

  it('botão Executar existe', () => {
    render(<Exercise exercise={exercicioSimples} onComplete={() => {}} />);
    expect(screen.getByText('Executar')).toBeDefined();
  });

  it('executa código e exibe output correto', async () => {
    const onComplete = vi.fn();
    render(<Exercise exercise={exercicioSimples} onComplete={onComplete} />);
    fireEvent.click(screen.getByText('Executar'));
    // Output "5" deve aparecer
    await new Promise(r => setTimeout(r, 50));
    expect(document.querySelector('.output-pre')?.textContent).toContain('5');
  });

  it('mostra sucesso e chama onComplete quando output é correto', async () => {
    const onComplete = vi.fn();
    render(<Exercise exercise={exercicioSimples} onComplete={onComplete} />);
    fireEvent.click(screen.getByText('Executar'));
    await new Promise(r => setTimeout(r, 50));
    const successTitle = screen.queryByText('Exercício concluído! 🎉');
    expect(successTitle).toBeDefined();
  });

  it('mostra erro quando output não corresponde ao esperado', async () => {
    render(<Exercise exercise={exercicioFalho} onComplete={() => {}} />);
    fireEvent.click(screen.getByText('Executar'));
    await new Promise(r => setTimeout(r, 50));
    expect(document.querySelector('.output-fail-tag')).toBeDefined();
  });

  it('botão Dica mostra o solutionHint', () => {
    render(<Exercise exercise={exercicioSimples} onComplete={() => {}} />);
    fireEvent.click(screen.getByText('Dica'));
    expect(screen.getByText('Use console.log(2 + 3)')).toBeDefined();
  });

  it('reset restaura o código inicial', () => {
    render(<Exercise exercise={exercicioSimples} onComplete={() => {}} />);
    const textarea = document.querySelector('textarea');
    fireEvent.change(textarea, { target: { value: 'codigo modificado' } });
    fireEvent.click(document.querySelector('.editor-btn')); // RotateCcw button
    expect(textarea.value).toContain('console.log(2 + 3)');
  });

  it('erro de runtime é diagnosticado e exibido', async () => {
    const exercicioComErro = {
      ...exercicioSimples,
      starterCode: 'variavelInexistente.metodo();\n',
    };
    render(<Exercise exercise={exercicioComErro} onComplete={() => {}} />);
    fireEvent.click(screen.getByText('Executar'));
    await new Promise(r => setTimeout(r, 50));
    // Deve mostrar algum erro diagnosticado
    expect(document.querySelector('.output-runtime-error')).toBeDefined();
  });
});

// ── Testes de integridade dos dados do roadmap ──────────────────────────────
describe('roadmap data integrity', () => {
  it('todos os módulos têm id, title, duration e xp', async () => {
    const { ALL_MODULES } = await import('../data/roadmap.js');
    for (const mod of ALL_MODULES) {
      expect(mod.id, `Módulo sem id`).toBeTruthy();
      expect(mod.title, `Módulo ${mod.id} sem title`).toBeTruthy();
      expect(mod.duration, `Módulo ${mod.id} sem duration`).toBeTruthy();
      expect(mod.xp, `Módulo ${mod.id} sem xp`).toBeGreaterThan(0);
    }
  });

  it('todos os IDs de módulos são únicos', async () => {
    const { ALL_MODULES } = await import('../data/roadmap.js');
    const ids = ALL_MODULES.map(m => m.id);
    const unique = new Set(ids);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates, `IDs duplicados: ${duplicates.join(', ')}`).toHaveLength(0);
  });

  it('todos os IDs de fases são únicos', async () => {
    const { PHASES } = await import('../data/roadmap.js');
    const ids = PHASES.map(p => p.id);
    const unique = new Set(ids);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates, `Phase IDs duplicados: ${duplicates.join(', ')}`).toHaveLength(0);
  });

  it('cada fase tem id, title, phase, color, icon e modules', async () => {
    const { PHASES } = await import('../data/roadmap.js');
    for (const phase of PHASES) {
      expect(phase.id, 'Fase sem id').toBeTruthy();
      expect(phase.title, `Fase ${phase.id} sem title`).toBeTruthy();
      expect(phase.phase, `Fase ${phase.id} sem number`).toBeGreaterThan(0);
      expect(phase.color, `Fase ${phase.id} sem color`).toBeTruthy();
      expect(phase.modules, `Fase ${phase.id} sem modules`).toBeInstanceOf(Array);
      expect(phase.modules.length, `Fase ${phase.id} tem 0 módulos`).toBeGreaterThan(0);
    }
  });

  it('nenhum módulo está em mais de uma fase', async () => {
    const { PHASES } = await import('../data/roadmap.js');
    const seen = new Map();
    for (const phase of PHASES) {
      for (const mod of phase.modules) {
        if (seen.has(mod.id)) {
          expect.fail(`Módulo ${mod.id} aparece em ${seen.get(mod.id)} e ${phase.id}`);
        }
        seen.set(mod.id, phase.id);
      }
    }
  });

  it('todos os módulos têm quiz com pelo menos 3 questões ou são mini-projetos', async () => {
    const { ALL_MODULES } = await import('../data/roadmap.js');
    for (const mod of ALL_MODULES) {
      if (mod.isMiniProject) continue;
      const quiz = mod.content?.quiz;
      expect(quiz, `Módulo ${mod.id} sem quiz`).toBeDefined();
      expect(quiz.length, `Módulo ${mod.id} tem menos de 3 questões (${quiz?.length})`).toBeGreaterThanOrEqual(3);
    }
  });
});
