import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <div className="notfound-code">404</div>
        <h1 className="notfound-title">Página não encontrada</h1>
        <p className="notfound-sub">
          Essa URL não existe na plataforma. Verifique o endereço ou volte ao início.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">← Ir para o Dashboard</Link>
          <Link to="/roadmap" className="btn btn-ghost">Ver Roadmap</Link>
        </div>
      </div>
    </div>
  );
}
