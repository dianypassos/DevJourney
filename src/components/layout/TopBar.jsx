import { Sun, Moon, Menu } from 'lucide-react';
import ModuleSearch from './ModuleSearch.jsx';
import { useTheme }   from '../../contexts/ThemeContext.tsx';
import { useSidebar } from '../../contexts/SidebarContext.tsx';
import './TopBar.css';

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { openSidebar } = useSidebar();

  return (
    <div className="top-bar">
      <button className="hamburger-btn" onClick={openSidebar} aria-label="Abrir menu">
        <Menu size={20} />
      </button>
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
