import { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, ChevronRight, Trophy, RotateCcw } from 'lucide-react';
import './Quiz.css';

// Shuffle array without mutating
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quiz({ questions, onComplete, moduleId }) {
  const MIN_PASS = 80; // 80% to pass

  // Shuffle options once on mount, keeping track of correct answer index
  const shuffledQuestions = useMemo(() => {
    return questions.map(q => {
      const indexed = q.options.map((opt, i) => ({ text: opt, isCorrect: i === q.correct }));
      const shuffled = shuffleArray(indexed);
      const newCorrect = shuffled.findIndex(o => o.isCorrect);
      return {
        ...q,
        options: shuffled.map(o => o.text),
        correct: newCorrect,
      };
    });
  }, [questions]);

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const question = shuffledQuestions[currentQ];
  const isLast = currentQ === shuffledQuestions.length - 1;

  function handleSelect(idx) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setAnswers(prev => [...prev, {
      questionIdx: currentQ,
      selected: idx,
      correct: idx === question.correct
    }]);
  }

  function handleNext() {
    if (isLast) {
      setShowResults(true);
    } else {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  function handleRetry() {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setAnswers([]);
    setShowResults(false);
  }

  if (showResults) {
    const score = answers.filter(a => a.correct).length;
    const percent = Math.round((score / shuffledQuestions.length) * 100);
    const passed = percent >= MIN_PASS;

    return (
      <div className="quiz-results">
        <div className={'results-icon ' + (passed ? 'passed' : 'failed')}>
          {passed ? <Trophy size={40} /> : <RotateCcw size={40} />}
        </div>
        <h2 className="results-title">
          {passed ? '🎉 Parabéns!' : percent >= 60 ? 'Quase lá!' : 'Continue estudando!'}
        </h2>
        <div className="results-score">
          <span className={'score-number ' + (passed ? 'passed' : 'failed')}>{percent}%</span>
          <span className="score-fraction">{score} / {shuffledQuestions.length} corretas</span>
        </div>
        {!passed && (
          <div className="pass-threshold">
            Mínimo para passar: <strong>{MIN_PASS}%</strong>
            {' '}— você precisa de mais {MIN_PASS - percent}%
          </div>
        )}

        <div className="results-answers">
          {shuffledQuestions.map((q, idx) => {
            const ans = answers.find(a => a.questionIdx === idx);
            const isCorrect = ans?.correct;
            return (
              <div key={idx} className={'answer-review ' + (isCorrect ? 'correct' : 'wrong')}>
                <div className="answer-review-icon">
                  {isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                </div>
                <div className="answer-review-content">
                  <div className="answer-question">{q.question}</div>
                  {!isCorrect && (
                    <div className="answer-explanation">
                      <strong>✓ Correta:</strong> {q.options[q.correct]}
                      <br />
                      <span>{q.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="results-actions">
          <button className="btn btn-ghost" onClick={handleRetry}>
            <RotateCcw size={15} /> Tentar Novamente
          </button>
          {passed && (
            <button className="btn btn-green" onClick={() => { const wrong = answers.filter(a => !a.correct).map(a => a.questionIdx); onComplete(score, shuffledQuestions.length, wrong, shuffledQuestions); }}>
              <Trophy size={15} /> Concluir Módulo
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-progress">
        <div className="quiz-progress-text">
          <span>Questão {currentQ + 1} de {shuffledQuestions.length}</span>
          <span>{Math.round((currentQ / shuffledQuestions.length) * 100)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: (currentQ / shuffledQuestions.length * 100) + '%' }} />
        </div>
        <div className="quiz-dots">
          {shuffledQuestions.map((_, i) => {
            const ans = answers.find(a => a.questionIdx === i);
            return (
              <div
                key={i}
                className={'quiz-dot ' + (i === currentQ ? 'current' : ans?.correct ? 'correct' : ans ? 'wrong' : '')}
              />
            );
          })}
        </div>
      </div>

      <div className="quiz-question">
        <div className="question-number">Q{currentQ + 1}</div>
        <h3 className="question-text">{question.question}</h3>
      </div>

      <div className="quiz-options">
        {question.options.map((option, idx) => {
          let cls = 'quiz-option';
          if (answered) {
            if (idx === question.correct) cls += ' correct';
            else if (idx === selected && selected !== question.correct) cls += ' wrong';
            else cls += ' dimmed';
          }
          if (selected === idx && !answered) cls += ' selected';

          return (
            <button
              key={idx}
              className={cls}
              onClick={() => handleSelect(idx)}
              disabled={answered}
            >
              <div className="option-letter">{String.fromCharCode(65 + idx)}</div>
              <span>{option}</span>
              {answered && idx === question.correct && <CheckCircle2 size={16} className="option-icon correct" />}
              {answered && idx === selected && selected !== question.correct && <XCircle size={16} className="option-icon wrong" />}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={'quiz-explanation ' + (selected === question.correct ? 'correct' : 'wrong')}>
          <div className="explanation-icon">
            {selected === question.correct ? '✅' : '❌'}
          </div>
          <div>
            <strong>{selected === question.correct ? 'Correto!' : 'Incorreto.'}</strong>
            <p>{question.explanation}</p>
          </div>
        </div>
      )}

      {answered && (
        <button className="btn btn-primary quiz-next" onClick={handleNext}>
          {isLast ? 'Ver Resultado' : 'Próxima'}
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
