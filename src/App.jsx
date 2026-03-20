import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Roadmap from './pages/Roadmap.jsx';
import Lesson from './pages/Lesson.jsx';
import Projects from './pages/Projects.jsx';
import Setup from './pages/Setup.jsx';
import Career from './pages/Career.jsx';
import Flashcards from './pages/Flashcards.jsx';
import Resources from './pages/Resources.jsx';
import NotFound from './pages/NotFound.jsx';
import ChatWidget from './components/chat/ChatWidget.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { AstraProvider } from './contexts/AstraContext.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import TopBar from './components/layout/TopBar.jsx';

export default function App() {
  return (
    <ErrorBoundary>
    <ThemeProvider>
    <AstraProvider>
    <BrowserRouter>
      <div className="noise-overlay" />
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <TopBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/lesson/:moduleId" element={<Lesson />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/career" element={<Career />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <ChatWidget />
    </BrowserRouter>
    </AstraProvider>
    </ThemeProvider>
    </ErrorBoundary>
  );
}
