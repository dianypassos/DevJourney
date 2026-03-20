import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
import {
  ArrowLeft, BookOpen, HelpCircle, CheckCircle2,
  Zap, Clock, Code2, StickyNote, ChevronLeft, ChevronRight, Layers,
  XCircle, CheckCircle, Download,
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress.ts';
import { useStreak }   from '../hooks/useStreak.ts';
import { ALL_MODULES } from '../data/roadmap.js';
import Quiz from '../components/quiz/Quiz.jsx';
import CodeEditor from '../components/editor/CodeEditor.jsx';
import StepByStepCode from '../components/editor/StepByStepCode.jsx';
import Exercise from '../components/exercise/Exercise.jsx';
import MiniProject from '../components/miniproject/MiniProject.jsx';
import './Lesson.css';

export default function Lesson() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { completeModule, saveQuizResult, isModuleCompleted, isModuleRecommended, progress, completeExercise, isExerciseCompleted } = useProgress();
  const { registerActivity } = useStreak();

  const [activeTab, setActiveTab] = useState('learn');
  const [justCompleted, setJustCompleted] = useState(false);
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [exerciseDone, setExerciseDone] = useState(false);

  const currentModule = ALL_MODULES.find(m => m.id === moduleId);
  const moduleIndex = ALL_MODULES.findIndex(m => m.id === moduleId);
  const prevModule = moduleIndex > 0 ? ALL_MODULES[moduleIndex - 1] : null;
  const nextModule = moduleIndex < ALL_MODULES.length - 1 ? ALL_MODULES[moduleIndex + 1] : null;

  useEffect(() => {
    if (moduleId) {
      const saved = localStorage.getItem('devjourney_note_' + moduleId);
      if (saved) setNote(saved);
      else setNote('');
    }
    setActiveTab(currentModule?.isMiniProject ? 'miniproject' : 'learn');
    setJustCompleted(false);
    setExerciseDone(isExerciseCompleted ? isExerciseCompleted(moduleId) : false);
  }, [moduleId]);

  function saveNote() {
    localStorage.setItem('devjourney_note_' + moduleId, note);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  }

  function exportAllNotes() {
    const allNotes = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('devjourney_note_')) {
        const modId = key.replace('devjourney_note_', '');
        const mod = ALL_MODULES.find(m => m.id === modId);
        const text = localStorage.getItem(key);
        if (text && text.trim()) {
          allNotes.push(`## ${mod ? mod.title : modId}\n\n${text}\n`);
        }
      }
    }
    if (allNotes.length === 0) {
      alert('Nenhuma anotação encontrada para exportar.');
      return;
    }
    const content = `# Minhas Anotações — DevJourney\nExportado em: ${new Date().toLocaleString('pt-BR')}\n\n---\n\n${allNotes.join('\n---\n\n')}`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devjourney-notas-${new Date().toISOString().slice(0,10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!currentModule) {
    return (
      <div className="lesson-page page-container">
        <div className="lesson-not-found">
          <div className="lesson-404">404</div>
          <p>Módulo não encontrado</p>
          <Link to="/roadmap" className="btn btn-ghost">← Voltar ao Roadmap</Link>
        </div>
      </div>
    );
  }

  const alreadyCompleted = isModuleCompleted(moduleId);
  const inSequence = isModuleRecommended(moduleId);
  const quizHistory = progress.completedQuizzes?.[moduleId];
  const hasExercise = !!currentModule.content.exercise;
  const isMiniProject = !!currentModule.isMiniProject;

  const TABS = [
    !isMiniProject && { id: 'learn',    icon: BookOpen,   label: 'Aula' },
    isMiniProject  && { id: 'miniproject', icon: Layers, label: 'Mini-Projeto' },
    !isMiniProject && hasExercise && { id: 'exercise', icon: Code2, label: 'Exercício', done: exerciseDone },
    !isMiniProject && { id: 'quiz', icon: HelpCircle, label: 'Quiz' },
    !isMiniProject && { id: 'notes',    icon: StickyNote, label: 'Notas' },
  ].filter(Boolean);

  function handleQuizComplete(score, total, wrongIndices = [], questions = []) {
    saveQuizResult(moduleId, score, total);
    completeModule(moduleId);
    registerActivity();
    setJustCompleted(true);
    // Persist wrong questions for review mode
    if (wrongIndices.length > 0) {
      const wrongCards = wrongIndices.map(i => ({
        question: questions[i].question,
        answer: questions[i].options[questions[i].correct],
        explanation: questions[i].explanation,
        moduleId,
        moduleTitle: currentModule.title,
        phaseTitle: currentModule.phaseTitle,
        phaseColor: currentModule.phaseColor,
      }));
      const key = 'devjourney_wrong_' + moduleId;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      // Merge: keep existing wrong that aren't in new set, add new wrong
      const merged = [...wrongCards];
      localStorage.setItem(key, JSON.stringify(merged));
      // Also update global wrong index
      const allWrongKey = 'devjourney_wrong_index';
      const allWrong = JSON.parse(localStorage.getItem(allWrongKey) || '[]');
      const filtered = allWrong.filter(id => id !== moduleId);
      if (wrongCards.length > 0) filtered.push(moduleId);
      localStorage.setItem(allWrongKey, JSON.stringify(filtered));
    } else {
      // Cleared all wrong — remove from index
      localStorage.removeItem('devjourney_wrong_' + moduleId);
      const allWrongKey = 'devjourney_wrong_index';
      const allWrong = JSON.parse(localStorage.getItem(allWrongKey) || '[]');
      localStorage.setItem(allWrongKey, JSON.stringify(allWrong.filter(id => id !== moduleId)));
    }
  }

  function handleExerciseComplete() {
    if (completeExercise) completeExercise(moduleId);
    setExerciseDone(true);
    setActiveTab('quiz');
  }

  return (
    <div className="lesson-page">
      <div className="lesson-header">
        <div className="lesson-nav-row">
          <Link to="/roadmap" className="btn btn-ghost btn-sm lesson-back">
            <ArrowLeft size={14} /> Roadmap
          </Link>
          <div className="lesson-module-nav">
            {prevModule && (
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/lesson/' + prevModule.id)}>
                <ChevronLeft size={14} /> Anterior
              </button>
            )}
            {nextModule && (
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/lesson/' + nextModule.id)}>
                Próximo <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="lesson-meta">
          <div className="lesson-phase-tag" style={{ background: currentModule.phaseColor + '20', color: currentModule.phaseColor, borderColor: currentModule.phaseColor + '40' }}>
            {currentModule.phaseTitle}
          </div>
          <div className="lesson-stats">
            <span><Clock size={12} /> {currentModule.duration}</span>
            <span><Zap size={12} /> {currentModule.xp} XP</span>
            {alreadyCompleted && <span className="completed-tag"><CheckCircle2 size={12} /> Concluído</span>}
          </div>
        </div>

        {!inSequence && !alreadyCompleted && (
          <div className="prereq-banner">
            <span className="prereq-banner-icon">💡</span>
            <span>Você ainda não concluiu os módulos anteriores — tudo bem, pode estudar em qualquer ordem.</span>
          </div>
        )}

        <h1 className="lesson-title">{isMiniProject ? currentModule.title.replace("🏗️ Mini-Projeto: ", "") : currentModule.title}</h1>

        <div className="lesson-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={'lesson-tab ' + (activeTab === tab.id ? 'active' : '')}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={15} />
              {tab.label}
              {tab.id === 'quiz' && alreadyCompleted && <CheckCircle2 size={12} className="tab-check" />}
              {tab.id === 'exercise' && tab.done && <CheckCircle2 size={12} className="tab-check" />}
            </button>
          ))}
        </div>
      </div>

      <div className="lesson-content">
        {activeTab === 'learn' && (
          <div className="lesson-sections">
            {currentModule.content.sections.map((section, idx) => (
              <LessonSection key={idx} section={section} />
            ))}
            <div className="lesson-cta">
              <div className="cta-content">
                <div className="cta-icon">{isMiniProject ? '🏗️' : hasExercise ? '💻' : '🎯'}</div>
                <div>
                  <div className="cta-title">{hasExercise ? 'Hora de praticar!' : 'Teste seu conhecimento'}</div>
                  <div className="cta-sub">
                    {hasExercise
                      ? 'Resolva o exercício de código e depois faça o quiz para concluir.'
                      : 'Responda o quiz com 80%+ para concluir o módulo e ganhar ' + currentModule.xp + ' XP.'}
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => setActiveTab(isMiniProject ? 'miniproject' : hasExercise ? 'exercise' : 'quiz')}>
                {isMiniProject ? <><Layers size={15} /> Mini-Projeto</> : hasExercise ? <><Code2 size={15} /> Exercício</> : <><HelpCircle size={15} /> Quiz</>}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'exercise' && hasExercise && (
          <div className="lesson-exercise-wrapper">
            <Exercise exercise={currentModule.content.exercise} onComplete={handleExerciseComplete} />
          </div>
        )}

        {activeTab === 'miniproject' && isMiniProject && (
          <div className="lesson-exercise-wrapper">
            {(justCompleted || alreadyCompleted) ? (
              <div className="already-completed">
                <div className="completed-icon">🏗️</div>
                <h3>Mini-Projeto Concluído!</h3>
                <p>Excelente! Você construiu algo real. Isso já pode entrar no seu portfólio!</p>
                <div className="completed-actions">
                  {nextModule ? (
                    <button className="btn btn-primary" onClick={() => navigate('/lesson/' + nextModule.id)}>
                      Próximo <ChevronRight size={15} />
                    </button>
                  ) : (
                    <Link to="/" className="btn btn-primary">🏆 Ver Dashboard</Link>
                  )}
                  <button className="btn btn-ghost" onClick={() => setJustCompleted(false)}>
                    Refazer Mini-Projeto
                  </button>
                </div>
              </div>
            ) : (
              <MiniProject project={currentModule.miniProject} onComplete={() => { completeModule(moduleId); registerActivity(); setJustCompleted(true); }} />
            )}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="lesson-quiz-wrapper">
            {(justCompleted || alreadyCompleted) ? (
              <div className="already-completed">
                <div className="completed-icon">✅</div>
                <h3>Módulo Concluído!</h3>
                <p>Você completou este módulo. Continue sua jornada!</p>
                {quizHistory && (
                  <div className="quiz-history">
                    Melhor resultado:{' '}
                    <strong>{Math.round((quizHistory.score / quizHistory.total) * 100)}%</strong>
                    <span> ({quizHistory.score}/{quizHistory.total} questões)</span>
                    {quizHistory.attempts > 1 && (
                      <span className="quiz-attempts"> · {quizHistory.attempts} tentativas</span>
                    )}
                  </div>
                )}
                <div className="completed-actions">
                  {nextModule ? (
                    <button className="btn btn-primary" onClick={() => navigate('/lesson/' + nextModule.id)}>
                      Próximo Módulo <ChevronRight size={15} />
                    </button>
                  ) : (
                    <Link to="/" className="btn btn-primary">🏆 Ver Dashboard</Link>
                  )}
                  <button className="btn btn-ghost" onClick={() => { setJustCompleted(false); setActiveTab('learn'); }}>
                    Revisar Aula
                  </button>
                </div>
              </div>
            ) : (
              <Quiz questions={currentModule.content.quiz || []} moduleId={moduleId} onComplete={handleQuizComplete} />
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="lesson-notes">
            <div className="notes-header">
              <h3>📝 Suas Anotações — {currentModule.title}</h3>
              <p>Registre conceitos, insights e dúvidas. Salvo localmente no seu navegador.</p>
            </div>
            <textarea
              className="notes-textarea"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder={'Anote aqui o que aprendeu sobre "' + currentModule.title + '"...\n\nSugestões:\n• Conceitos-chave que precisa fixar\n• Exemplos que fizeram sentido\n• Dúvidas para pesquisar\n• Links úteis\n• Resumo com suas próprias palavras'}
              rows={16}
            />
            <div className="notes-actions">
              <button className="btn btn-primary" onClick={saveNote}>
                {noteSaved ? '✓ Salvo!' : 'Salvar Anotação'}
              </button>
              {note && (
                <button className="btn btn-ghost" onClick={() => { setNote(''); localStorage.removeItem('devjourney_note_' + moduleId); }}>
                  Limpar
                </button>
              )}
              <button className="btn btn-ghost notes-export-btn" onClick={exportAllNotes} title="Exportar todas as anotações como Markdown">
                <Download size={13} /> Exportar todas
              </button>
              <span className="notes-chars">{note.length} caracteres</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HighlightedCode({ code, lang = 'javascript' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute('data-highlighted');
      hljs.highlightElement(ref.current);
    }
  }, [code]);
  return (
    <pre className="ce-code">
      <code ref={ref} className={'language-' + lang}>{code}</code>
    </pre>
  );
}

function LessonSection({ section }) {
  if (section.type === 'text') return <p className="lesson-text">{section.content}</p>;
  if (section.type === 'highlight') return <div className="lesson-highlight">{section.content}</div>;
  if (section.type === 'list') return (
    <ul className="lesson-list">
      {section.items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
  if (section.type === 'code') {
    const isPreview = section.preview === true;
    return (
      <div className={isPreview ? 'lesson-code-preview-wrapper' : undefined}>
        {isPreview && (
          <div className="lesson-preview-badge">
            <span className="lesson-preview-icon">👁️</span>
            <div>
              <strong>Prévia de conteúdo avançado</strong>
              <span> — Você aprenderá isso na {section.previewPhase || 'uma fase futura'}. Ignore a sintaxe por agora e foque no conceito ilustrado.</span>
            </div>
          </div>
        )}
        <StepByStepCode code={section.content} lang={section.lang || 'javascript'} />
      </div>
    );
  }
  if (section.type === 'common_error') {
    return (
      <div className="common-error-block">
        <div className="ce-header">
          <span className="ce-badge">⚠️ Erro comum</span>
          <span className="ce-title">{section.title}</span>
        </div>
        <div className="ce-panels">
          <div className="ce-panel ce-panel-wrong">
            <div className="ce-panel-header">
              <XCircle size={13} /> <span>Errado</span>
            </div>
            <HighlightedCode code={section.wrong} lang={section.lang || 'javascript'} />
            <p className="ce-explanation ce-wrong-msg">{section.wrongLabel}</p>
          </div>
          <div className="ce-panel ce-panel-right">
            <div className="ce-panel-header">
              <CheckCircle size={13} /> <span>Correto</span>
            </div>
            <HighlightedCode code={section.right} lang={section.lang || 'javascript'} />
            <p className="ce-explanation ce-right-msg">{section.rightLabel}</p>
          </div>
        </div>
        {section.explanation && (
          <div className="ce-footer">{section.explanation}</div>
        )}
      </div>
    );
  }
  return null;
}
