import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[DevJourney] Erro não capturado:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
        background: 'var(--bg-0, #0a0a0f)',
        color: 'var(--text-0, #f0f0ff)',
        fontFamily: 'var(--font-sans, system-ui)',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Algo deu errado
        </h2>
        <p style={{ color: 'var(--text-2, #888)', fontSize: '0.9rem', maxWidth: 400, marginBottom: '1.5rem' }}>
          Ocorreu um erro inesperado na plataforma. Seus dados de progresso estão seguros no localStorage.
        </p>
        <details style={{ marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--text-2, #888)', maxWidth: 500 }}>
          <summary style={{ cursor: 'pointer' }}>Detalhes do erro</summary>
          <pre style={{ marginTop: '0.5rem', textAlign: 'left', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {this.state.error?.message}
          </pre>
        </details>
        <button
          onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/'; }}
          style={{
            padding: '0.6rem 1.4rem',
            background: 'var(--accent, #7c3aed)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          Voltar para o início
        </button>
      </div>
    );
  }
}
