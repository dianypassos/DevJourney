import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { TOOLS } from '../data/tools.js';
import './Setup.css';

export default function Setup() {
  const [openTool, setOpenTool] = useState(null);

  return (
    <div className="setup-page page-container">
      <div className="setup-header">
        <h1>Setup do Computador</h1>
        <p className="setup-subtitle">
          Todas as ferramentas que você precisa instalar para começar a desenvolver.
        </p>
      </div>

      <div className="setup-banner card">
        <div className="banner-icon">🚀</div>
        <div>
          <div className="banner-title">Configure seu ambiente antes de começar</div>
          <div className="banner-sub">
            Um bom ambiente de desenvolvimento é essencial. Comece pelo VS Code, depois Git e Node.js.
          </div>
        </div>
      </div>

      <div className="tools-list">
        {TOOLS.map((tool, idx) => (
          <div key={tool.id} className={`tool-item card ${openTool === tool.id ? 'open' : ''}`} style={{ '--tool-color': tool.color }}>
            <button className="tool-header" onClick={() => setOpenTool(openTool === tool.id ? null : tool.id)}>
              <div className="tool-icon-wrap" style={{ background: `${tool.color}18`, border: `1px solid ${tool.color}30` }}>
                <span className="tool-emoji">{tool.icon}</span>
              </div>
              <div className="tool-info">
                <div className="tool-name-row">
                  <span className="tool-name">{tool.name}</span>
                  <span className="tool-category">{tool.category}</span>
                </div>
                <div className="tool-tagline">{tool.tagline}</div>
              </div>
              <div className="tool-chevron">
                {openTool === tool.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            </button>

            {openTool === tool.id && (
              <div className="tool-details">
                <div className="divider" />
                
                <p className="tool-description">{tool.description}</p>

                <div className="tool-sections">
                  <div className="tool-section">
                    <div className="tool-section-title">✨ O que faz</div>
                    <ul className="tool-features">
                      {tool.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="tool-section">
                    <div className="tool-section-title">📥 Como instalar</div>
                    <ol className="install-steps">
                      {tool.install.map((step, i) => (
                        <li key={i}>
                          <span className="step-num">{i + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {tool.extensions && (
                    <div className="tool-section">
                      <div className="tool-section-title">🔌 Extensões recomendadas</div>
                      <div className="extensions-row">
                        {tool.extensions.map(ext => (
                          <span key={ext} className="ext-chip">{ext}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {tool.tip && (
                  <div className="tool-tip">
                    <span className="tool-tip-icon">💡</span>
                    <span>{tool.tip}</span>
                  </div>
                )}

                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost tool-link">
                  Acessar site oficial <ExternalLink size={13} />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
