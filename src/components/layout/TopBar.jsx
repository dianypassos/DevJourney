import { Sun, Moon } from 'lucide-react';
import ModuleSearch from './ModuleSearch.jsx';
import { useTheme } from '../../contexts/ThemeContext.tsx';
import './TopBar.css';

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="top-bar">
      <div className="top-bar-right">
        <ModuleSearch />
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          aria-label="Alternar tema"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </div>
  );
}
