import { useState } from 'react';
import { X, Bell, BellOff, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import './ReminderModal.css';

export default function ReminderModal({ reminder, onEnable, onDisable, onClose }) {
  const [hour,   setHour]   = useState(reminder.hour);
  const [minute, setMinute] = useState(reminder.minute);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'granted' | 'denied'

  const pad = n => String(n).padStart(2, '0');

  async function handleEnable() {
    setStatus('loading');
    const permission = await onEnable(hour, minute);
    setStatus(permission === 'granted' ? 'granted' : 'denied');
    if (permission === 'granted') setTimeout(onClose, 1800);
  }

  function handleDisable() {
    onDisable();
    onClose();
  }

  const timeLabel = `${pad(hour)}:${pad(minute)}`;
  const isEnabled = reminder.enabled && reminder.permission === 'granted';

  return (
    <div className="rm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="rm-modal">
        {/* Header */}
        <div className="rm-header">
          <div className="rm-header-left">
            <div className="rm-icon"><Bell size={16} /></div>
            <div>
              <div className="rm-title">Lembrete de Estudo</div>
              <div className="rm-sub">Receba uma notificação diária para manter o streak</div>
            </div>
          </div>
          <button className="rm-close" onClick={onClose}><X size={16} /></button>
        </div>

        {/* Status atual */}
        {isEnabled && (
          <div className="rm-current">
            <CheckCircle2 size={14} />
            <span>Lembrete ativo às <strong>{timeLabel}</strong> todos os dias</span>
          </div>
        )}

        {reminder.permission === 'denied' && (
          <div className="rm-denied">
            <AlertTriangle size={14} />
            <span>Notificações bloqueadas. Habilite nas configurações do navegador.</span>
          </div>
        )}

        {/* Time picker */}
        <div className="rm-body">
          <label className="rm-label">Horário do lembrete</label>
          <div className="rm-time-row">
            <div className="rm-time-field">
              <label>Hora</label>
              <select value={hour} onChange={e => setHour(Number(e.target.value))}>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>{pad(i)}</option>
                ))}
              </select>
            </div>
            <div className="rm-time-sep">:</div>
            <div className="rm-time-field">
              <label>Minuto</label>
              <select value={minute} onChange={e => setMinute(Number(e.target.value))}>
                {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(m => (
                  <option key={m} value={m}>{pad(m)}</option>
                ))}
              </select>
            </div>
            <div className="rm-time-preview">
              <Clock size={13} />
              {pad(hour)}:{pad(minute)}
            </div>
          </div>

          <p className="rm-hint">
            {isEnabled
              ? 'Você pode mudar o horário a qualquer momento.'
              : 'O navegador pedirá permissão para enviar notificações.'}
          </p>
        </div>

        {/* Feedback pós-ação */}
        {status === 'granted' && (
          <div className="rm-feedback rm-feedback-ok">
            <CheckCircle2 size={14} /> Lembrete ativado! Você receberá um aviso às {timeLabel}.
          </div>
        )}
        {status === 'denied' && (
          <div className="rm-feedback rm-feedback-err">
            <AlertTriangle size={14} /> Permissão negada. Habilite notificações no navegador.
          </div>
        )}

        {/* Ações */}
        <div className="rm-actions">
          {isEnabled ? (
            <>
              <button className="btn btn-primary" onClick={handleEnable} disabled={status === 'loading'}>
                <Clock size={13} /> Atualizar horário
              </button>
              <button className="btn btn-ghost rm-disable-btn" onClick={handleDisable}>
                <BellOff size={13} /> Desativar lembrete
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-primary"
                onClick={handleEnable}
                disabled={status === 'loading' || reminder.permission === 'denied'}
              >
                {status === 'loading' ? 'Aguardando permissão…' : <><Bell size={13} /> Ativar lembrete</>}
              </button>
              <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
