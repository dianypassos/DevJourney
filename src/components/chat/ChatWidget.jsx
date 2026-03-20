import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sparkles, Send, Loader, RotateCcw, X, Minus,
  MessageSquare, ArrowLeft, Plus, Trash2
} from 'lucide-react';
import { ALL_MODULES } from '../../data/roadmap.js';
import { useAstra } from '../../contexts/AstraContext.tsx';
import './ChatWidget.css';

// ── Contexto por página ───────────────────────────────────────────────────────
function buildPageContext(pathname) {
  const lessonMatch = pathname.match(/\/lesson\/([^/]+)/);
  if (lessonMatch) {
    const mod = ALL_MODULES.find(m => m.id === lessonMatch[1]);
    if (mod) {
      const texts = (mod.content?.sections || [])
        .filter(s => s.type === 'text' || s.type === 'highlight')
        .map(s => s.content).join('\n\n').slice(0, 1800);
      return { label: mod.title, phase: mod.phaseTitle, context: texts, suggestions: getSuggestions(mod.title, mod.phaseTitle) };
    }
  }
  if (pathname === '/' || pathname === '')  return { label: 'Dashboard',  phase: null, context: 'O aluno está no dashboard.', suggestions: ['Como funciona o sistema de XP?', 'O que são as conquistas?', 'Por onde devo começar?'] };
  if (pathname === '/roadmap')              return { label: 'Roadmap',    phase: null, context: 'O aluno está vendo o roadmap.', suggestions: ['Qual fase devo fazer primeiro?', 'Quanto tempo leva a trilha completa?', 'Posso pular fases?'] };
  if (pathname === '/projects')             return { label: 'Projetos',   phase: null, context: 'O aluno está vendo projetos.', suggestions: ['Qual projeto fazer primeiro?', 'Como organizar projetos no GitHub?', 'O que colocar no README?'] };
  if (pathname === '/flashcards')           return { label: 'Flashcards', phase: null, context: 'O aluno está revisando flashcards.', suggestions: ['Como estudar flashcards de forma eficiente?', 'Com que frequência revisar?', 'O que mais cai em entrevistas de JavaScript?'] };
  if (pathname === '/career')               return { label: 'Carreira',   phase: null, context: 'O aluno está na seção de carreira.', suggestions: ['Como montar um portfólio do zero?', 'O que colocar no currículo sendo iniciante?', 'Como se preparar para entrevistas técnicas?'] };
  if (pathname === '/setup')                return { label: 'Setup',      phase: null, context: 'O aluno está configurando o ambiente.', suggestions: ['Qual editor de código usar?', 'Preciso de Linux para programar?', 'Como configurar o VS Code?'] };
  if (pathname === '/resources')            return { label: 'Recursos',   phase: null, context: 'O aluno está vendo recursos extras.', suggestions: ['Quais recursos são mais importantes?', 'Devo pagar por algum curso?', 'Como filtrar bons conteúdos na internet?'] };
  return { label: 'DevJourney', phase: null, context: '', suggestions: ['Por onde começar?', 'Como funciona a plataforma?', 'Quanto tempo por dia devo estudar?'] };
}

function getSuggestions(title, phase) {
  const t = (title || '').toLowerCase();
  const p = (phase || '').toLowerCase();
  if (t.includes('variáv') || t.includes('tipos'))      return ['Qual a diferença entre const, let e var?', 'Quando usar null vs undefined?', 'Por que typeof null retorna "object"?'];
  if (t.includes('função') || t.includes('function'))   return ['Diferença entre function declaration e arrow function?', 'O que é escopo de variável?', 'O que significa hoisting?'];
  if (t.includes('array'))                               return ['Quando usar map() vs forEach()?', 'Como o reduce() funciona?', 'Diferença entre slice() e splice()?'];
  if (t.includes('objeto') || t.includes('object'))     return ['Como copiar um objeto sem mutar o original?', 'O que é desestruturação?', 'Como iterar sobre as chaves de um objeto?'];
  if (t.includes('async') || t.includes('promise'))     return ['Diferença entre Promise e async/await?', 'Como tratar erros em funções async?', 'O que é callback hell?'];
  if (t.includes('react') || t.includes('componente'))  return ['Quando usar useState vs useRef?', 'Por que não mutar o estado diretamente?', 'O que são re-renders?'];
  if (t.includes('hook') || t.includes('effect'))       return ['Quando usar useEffect com [] vazio?', 'Como evitar memory leaks no useEffect?', 'O que é stale closure?'];
  if (t.includes('git'))                                return ['Diferença entre merge e rebase?', 'Como desfazer um commit já feito?', 'O que é um pull request?'];
  if (t.includes('css') || t.includes('html'))          return ['Quando usar flexbox vs grid?', 'O que é especificidade no CSS?', 'Como funciona o box model?'];
  if (t.includes('typescript') || t.includes('tipo'))   return ['Diferença entre interface e type?', 'O que são generics?', 'Quando usar unknown vs any?'];
  if (t.includes('node') || t.includes('express'))      return ['O que é middleware no Express?', 'Diferença entre require e import?', 'Como tratar erros em rotas?'];
  if (t.includes('banco') || t.includes('sql'))         return ['Diferença entre SQL e NoSQL?', 'O que é uma foreign key?', 'Quando usar índices no banco?'];
  if (t.includes('docker') || t.includes('container'))  return ['Diferença entre imagem e container?', 'O que é um Dockerfile?', 'Quando usar docker-compose?'];
  if (t.includes('algoritmo') || t.includes('estrutura')) return ['O que é complexidade de tempo?', 'Diferença entre stack e queue?', 'Como funciona o binary search?'];
  if (t.includes('http') || t.includes('rede'))         return ['Diferença entre GET e POST?', 'O que são status codes HTTP?', 'Como funciona o CORS?'];
  if (t.includes('terminal') || t.includes('linux'))    return ['Quais comandos básicos devo saber?', 'O que é PATH?', 'Como navegar entre diretórios?'];
  if (p.includes('lógica'))   return ['O que é uma condicional?', 'Diferença entre while e for?', 'O que é um algoritmo?'];
  if (p.includes('react'))    return ['O que são props?', 'Diferença entre estado e prop?', 'O que é componentização?'];
  if (p.includes('backend'))  return ['O que é uma API REST?', 'O que são verbos HTTP?', 'O que é autenticação JWT?'];
  return ['Pode me dar um exemplo prático?', 'Qual o erro mais comum de iniciantes aqui?', 'Como isso é usado em projetos reais?'];
}

// ── Saudação contextual ───────────────────────────────────────────────────────
function buildGreeting(pageCtx) {
  const base = 'Oi! Sou a **Astra**, sua tutora de IA aqui no DevJourney. 👋';
  if (pageCtx.phase) {
    return base + ' Estou contextualizada com o módulo **' + pageCtx.label + '** (' + pageCtx.phase + ').\n\nNo que posso te ajudar agora?';
  }
  const map = {
    'Dashboard':  base + ' Posso te ajudar a entender a plataforma, o sistema de XP ou tirar qualquer dúvida sobre sua jornada.\n\nNo que posso te ajudar?',
    'Roadmap':    base + ' Posso te explicar qualquer fase, ajudar a escolher por onde começar ou dar uma visão geral da trilha.\n\nNo que posso te ajudar?',
    'Projetos':   base + ' Posso te ajudar a escolher um projeto, estruturar o README ou publicar no GitHub.\n\nNo que posso te ajudar?',
    'Flashcards': base + ' Posso te dar dicas de revisão ou tirar dúvidas sobre qualquer conceito.\n\nNo que posso te ajudar?',
    'Carreira':   base + ' Posso te ajudar com portfólio, currículo, LinkedIn ou preparação para entrevistas.\n\nNo que posso te ajudar?',
    'Setup':      base + ' Posso te guiar na instalação de ferramentas ou tirar dúvidas sobre configurações.\n\nNo que posso te ajudar?',
    'Recursos':   base + ' Posso te ajudar a filtrar os recursos mais importantes pro seu nível atual.\n\nNo que posso te ajudar?',
  };
  return map[pageCtx.label] || (base + ' Pode me perguntar qualquer coisa sobre programação ou sua jornada.\n\nNo que posso te ajudar?');
}

// ── Render negrito ────────────────────────────────────────────────────────────
function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

// ── API — chama /api/chat (proxy server-side, chave nunca exposta no browser) ──
async function callGemini({ pageCtx, history, userMessage, onChunk }) {
  const systemInstruction =
    'Você é Astra, a tutora de IA do DevJourney — plataforma do zero ao pleno. ' +
    'Você é entusiasta, acolhedora e didática — como aquela amiga que já foi júnior, virou pleno, ' +
    'e sabe exatamente onde a dificuldade está.\n' +
    (pageCtx.phase
      ? 'O aluno está estudando: ' + pageCtx.label + ' (' + pageCtx.phase + ').'
      : 'O aluno está na página: ' + pageCtx.label + '.') +
    (pageCtx.context ? '\n\nContexto do que o aluno está vendo:\n' + pageCtx.context : '') +
    '\n\nRegras:\n' +
    '- Responda SEMPRE em português brasileiro\n' +
    '- Seja didática, encorajadora e direta\n' +
    '- Use exemplos de código curtos quando ajudar\n' +
    '- Máximo 4 parágrafos — sem enrolação\n' +
    '- Nunca entregue soluções completas de exercícios, prefira dicas e perguntas socráticas\n' +
    '- Se a dúvida for fora do contexto, responda mesmo assim com naturalidade';

  const messages = [
    { role: 'system', content: systemInstruction },
    ...history
      .filter(m => m.role === 'user' || m.role === 'ai')
      .map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.text })),
    { role: 'user', content: userMessage },
  ];

  // A chave GROQ_API_KEY fica apenas no servidor (vite.config.js proxy / Vercel env)
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    let msg = 'Erro ' + response.status;
    try { const j = await response.json(); if (j.error) msg = j.error.message || msg; } catch {}
    throw new Error(msg);
  }

  const data = await response.json();
  if (data.error) throw new Error(data.error.message || 'Erro na resposta da IA');

  const fullText = data.choices?.[0]?.message?.content || '';
  if (!fullText) throw new Error('Resposta vazia da IA');

  // Streaming simulado palavra a palavra
  const words = fullText.split(' ');
  for (let i = 0; i < words.length; i++) {
    onChunk((i === 0 ? '' : ' ') + words[i]);
    if (i % 8 === 7) await new Promise(r => setTimeout(r, 16));
  }
}


// ── Persistência ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'astra_chats_v2';
function loadChats() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : []; } catch { return []; }
}
function saveChats(chats) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(chats)); } catch {}
}
function relTime(ts) {
  const d = Date.now() - ts;
  if (d < 60000) return 'agora';
  if (d < 3600000) return Math.floor(d / 60000) + 'm';
  if (d < 86400000) return Math.floor(d / 3600000) + 'h';
  return new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}
function newId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

// ── Componente ────────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const location = useLocation();
  const { clearExerciseError, getError, errorTriggerCount } = useAstra();

  // 'closed' | 'chat' | 'history'
  const [panel, setPanel] = useState('closed');
  const [chats, setChats] = useState(loadChats);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const loadingRef = useRef(false);

  const pageCtx = buildPageContext(location.pathname);
  const activeChat = chats.find(c => c.id === activeChatId) ?? null;
  const sortedChats = [...chats].sort((a, b) => b.updatedAt - a.updatedAt);

  useEffect(() => { saveChats(chats); }, [chats]);
  useEffect(() => { if (panel === 'chat') bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeChat?.messages?.length, panel]);
  useEffect(() => { if (panel !== 'closed') setUnread(0); }, [panel]);

  // ── Reset ao trocar de página ─────────────────────────────────────────────
  const prevPathnameRef = useRef(location.pathname);
  useEffect(() => {
    const prev = prevPathnameRef.current;
    const curr = location.pathname;
    prevPathnameRef.current = curr;
    if (prev === curr) return;
    const hadConversation = activeChat?.messages?.some(m => m.role === 'user');
    if (!hadConversation) {
      if (activeChatId) {
        setChats(prev => prev.map(c =>
          c.id === activeChatId ? { ...c, page: buildPageContext(curr).label } : c
        ));
      }
      return;
    }
    const newCtx = buildPageContext(curr);
    const newId  = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const freshChat = {
      id: newId, title: newCtx.label, page: newCtx.label,
      createdAt: Date.now(), updatedAt: Date.now(), messages: [],
    };
    setChats(prev => [freshChat, ...prev]);
    setActiveChatId(newId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // ── Trigger de erro do exercício ──────────────────────────────────────────
  useEffect(() => {
    if (errorTriggerCount === 0) return;
    const err = getError();
    if (!err) return;
    const chatId = newId();
    const errorQuestion = buildErrorQuestion(err);
    const newChat = {
      id: chatId,
      title: 'Erro: ' + err.exerciseTitle,
      page: pageCtx.label,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(chatId);
    setPanel('chat');
    requestAnimationFrame(() => { sendToChat(chatId, errorQuestion, err, []); });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorTriggerCount]);

  function buildErrorQuestion(err) {
    return [
      'Errei no exercício "' + err.exerciseTitle + '".',
      err.errorTitle  ? 'Tipo de erro: ' + err.errorTitle + '.'  : '',
      err.errorDetail ? 'Detalhe: ' + err.errorDetail            : '',
      err.userCode    ? '\nMeu código:\n```js\n' + err.userCode.slice(0, 400) + '\n```' : '',
      '\nPode me ajudar a entender sem me dar a solução direta?',
    ].filter(Boolean).join('\n');
  }

  // ── Envio ─────────────────────────────────────────────────────────────────
  async function sendToChat(chatId, text, errCtx, existingMsgs) {
    const q = text.trim();
    if (!q || loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setInput('');

    const userMsg = { role: 'user', text: q, ts: Date.now() };

    setChats(prev => prev.map(c => {
      if (c.id !== chatId) return c;
      const base = existingMsgs ?? c.messages;
      const msgs = [...base, userMsg, { role: 'ai', text: '', loading: true, ts: Date.now() }];
      const title = base.filter(m => m.role === 'user').length === 0
        ? (q.length > 48 ? q.slice(0, 48) + '…' : q)
        : c.title;
      return { ...c, messages: msgs, title, updatedAt: Date.now() };
    }));

    const historyBase = existingMsgs ?? activeChat?.messages ?? [];
    const history = historyBase
      .filter(m => !m.loading)
      .map(m => ({ role: m.role === 'ai' ? 'model' : 'user', text: m.text }));

    const ctxToUse = errCtx ? {
      ...pageCtx,
      context: (pageCtx.context || '') +
        '\n\nErro no exercício "' + errCtx.exerciseTitle + '":\nTipo: ' + (errCtx.errorTitle || '') +
        '\nDetalhe: ' + (errCtx.errorDetail || '') +
        '\nCódigo:\n' + (errCtx.userCode?.slice(0, 600) || ''),
    } : pageCtx;

    try {
      await callGemini({
        pageCtx: ctxToUse, history, userMessage: q,
        onChunk: chunk => {
          setChats(prev => prev.map(c => {
            if (c.id !== chatId) return c;
            const msgs = [...c.messages];
            const last = msgs[msgs.length - 1];
            if (last?.role === 'ai') msgs[msgs.length - 1] = { ...last, text: last.text + chunk };
            return { ...c, messages: msgs };
          }));
        },
      });
      setChats(prev => prev.map(c => {
        if (c.id !== chatId) return c;
        const msgs = [...c.messages];
        msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], loading: false };
        return { ...c, messages: msgs, updatedAt: Date.now() };
      }));
      if (panel === 'closed') setUnread(n => n + 1);
    } catch (err) {
      setChats(prev => prev.map(c => {
        if (c.id !== chatId) return c;
        const msgs = [...c.messages];
        msgs[msgs.length - 1] = { role: 'ai', text: 'Erro: ' + err.message, loading: false, error: true, ts: Date.now() };
        return { ...c, messages: msgs };
      }));
    } finally {
      loadingRef.current = false;
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleSend(text) {
    if (!activeChatId) return;
    sendToChat(activeChatId, text ?? input, null, null);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  // ── Criar chat — saudação é renderizada dinamicamente, não salva ─────────
  function startChat() {
    const id = newId();
    const newChat = { id, title: pageCtx.label, page: pageCtx.label, createdAt: Date.now(), updatedAt: Date.now(), messages: [] };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(id);
    clearExerciseError();
    setTimeout(() => inputRef.current?.focus(), 100);
    return id;
  }

  // ── Abrir FAB — sempre vai direto pro chat ────────────────────────────────
  function openFab() {
    if (activeChatId && chats.find(c => c.id === activeChatId)) {
      setPanel('chat');
    } else if (sortedChats.length > 0) {
      setActiveChatId(sortedChats[0].id);
      setPanel('chat');
    } else {
      startChat();
      setPanel('chat');
    }
    setTimeout(() => inputRef.current?.focus(), 150);
  }

  function openHistory() { setPanel('history'); }
  function backToChat()  { setPanel('chat'); }
  function closeFab()    { setPanel('closed'); }

  function openChatFromHistory(chatId) {
    setActiveChatId(chatId);
    setPanel('chat');
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function newChat() {
    startChat();
    setPanel('chat');
  }

  function deleteChat(e, chatId) {
    e.stopPropagation();
    setChats(prev => prev.filter(c => c.id !== chatId));
    if (activeChatId === chatId) { setActiveChatId(null); setPanel('closed'); }
  }

  const isOpen = panel !== 'closed';

  // ── Sugestões — mostradas só enquanto só há mensagem de saudação (sem user msg) ──
  const showSuggestions = activeChat
    ? activeChat.messages.filter(m => m.role === 'user').length === 0
    : false;

  return (
    <>
      <div className={'cw-panel' + (isOpen ? ' cw-open' : '')}>

        {/* ══ HISTÓRICO ══ */}
        {panel === 'history' && (
          <>
            <div className="cw-header">
              <div className="cw-header-left">
                <button className="cw-icon-btn cw-back-btn" onClick={backToChat} title="Voltar"><ArrowLeft size={13} /></button>
                <div className="cw-avatar"><Sparkles size={14} /></div>
                <div>
                  <div className="cw-title">Astra</div>
                  <div className="cw-subtitle">Histórico de conversas</div>
                </div>
              </div>
              <div className="cw-header-actions">
                <button className="cw-icon-btn" onClick={newChat} title="Nova conversa"><Plus size={13} /></button>
                <button className="cw-icon-btn" onClick={closeFab} title="Fechar"><Minus size={13} /></button>
              </div>
            </div>

            <div className="cw-chat-list">
              {sortedChats.length === 0 ? (
                <div className="cw-list-empty">
                  <p className="cw-list-empty-title">Nenhuma conversa ainda</p>
                </div>
              ) : sortedChats.map(chat => (
                <button key={chat.id} className={'cw-chat-item' + (chat.id === activeChatId ? ' cw-chat-item-active' : '')} onClick={() => openChatFromHistory(chat.id)}>
                  <div className="cw-chat-item-icon"><MessageSquare size={13} /></div>
                  <div className="cw-chat-item-body">
                    <div className="cw-chat-item-title">{chat.title}</div>
                    <div className="cw-chat-item-meta">
                      <span className="cw-chat-item-page">{chat.page}</span>
                      <span className="cw-chat-item-dot">·</span>
                      <span className="cw-chat-item-time">{relTime(chat.updatedAt)}</span>
                    </div>
                  </div>
                  <button className="cw-chat-item-delete" onClick={e => deleteChat(e, chat.id)} title="Apagar"><Trash2 size={11} /></button>
                </button>
              ))}
            </div>

            <div className="cw-list-footer">
              <button className="cw-new-chat-btn" onClick={newChat}><Plus size={14} /> Nova conversa</button>
            </div>
          </>
        )}

        {/* ══ CHAT ══ */}
        {panel === 'chat' && activeChat && (
          <>
            <div className="cw-header">
              <div className="cw-header-left">
                <div className="cw-avatar"><Sparkles size={14} /></div>
                <div>
                  <div className="cw-title">Astra</div>
                  <div className="cw-subtitle">{pageCtx.phase ? pageCtx.label + ' · ' + pageCtx.phase : pageCtx.label}</div>
                </div>
              </div>
              <div className="cw-header-actions">
                <button className="cw-icon-btn cw-history-btn" onClick={openHistory} title="Histórico">
                  <MessageSquare size={13} />
                  {sortedChats.length > 1 && <span className="cw-history-count">{sortedChats.length}</span>}
                </button>
                <button className="cw-icon-btn" onClick={newChat} title="Nova conversa"><Plus size={13} /></button>
                <button className="cw-icon-btn" onClick={closeFab} title="Fechar"><Minus size={13} /></button>
              </div>
            </div>

            <div className="cw-messages">
              {/* Saudação dinâmica — sempre reflete o tópico atual */}
              {showSuggestions && (
                <div className="cw-msg cw-msg-ai">
                  <div className="cw-msg-av"><Sparkles size={10} /></div>
                  <div className="cw-bubble">
                    <span className="cw-bubble-text">{renderText(buildGreeting(pageCtx))}</span>
                  </div>
                </div>
              )}

              {activeChat.messages.map((msg, i) => (
                <div key={i} className={'cw-msg cw-msg-' + msg.role + (msg.error ? ' cw-msg-error' : '')}>
                  {msg.role === 'ai' && <div className="cw-msg-av"><Sparkles size={10} /></div>}
                  <div className="cw-bubble">
                    <span className="cw-bubble-text">{msg.text ? renderText(msg.text) : (msg.loading ? '' : '…')}</span>
                    {msg.loading && <span className="cw-cursor" />}
                  </div>
                </div>
              ))}

              {/* Sugestões dinâmicas — sempre do tópico atual */}
              {showSuggestions && (
                <div className="cw-inline-suggestions">
                  {pageCtx.suggestions.map((s, i) => (
                    <button key={i} className="cw-sug-pill" onClick={() => handleSend(s)}>{s}</button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            <div className="cw-input-row">
              <textarea
                ref={inputRef}
                className="cw-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Digite sua dúvida..."
                rows={1}
                disabled={loading}
              />
              <button
                className={'cw-send' + (!input.trim() || loading ? ' cw-send-off' : '')}
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
              >
                {loading ? <Loader size={14} className="cw-spinner" /> : <Send size={14} />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── FAB ── */}
      <button className="cw-fab" onClick={() => isOpen ? closeFab() : openFab()} title="Astra — Tutora IA">
        {isOpen ? <X size={22} /> : <Sparkles size={22} />}
        {!isOpen && unread > 0 && <span className="cw-badge">{unread}</span>}
      </button>
    </>
  );
}
