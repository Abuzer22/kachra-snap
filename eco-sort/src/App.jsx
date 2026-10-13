import { useState } from 'react';
import { PreferencesProvider } from './context/PreferencesContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Scan from './pages/Scan';
import History from './pages/History';
import Analytics from './pages/Analytics';
import Guide from './pages/Guide';

function AppContent() {
  const [page, setPage] = useState('dashboard');
  const pages = {
    dashboard: <Dashboard onNavigate={setPage} />,
    scan: <Scan />,
    history: <History />,
    analytics: <Analytics />,
    guide: <Guide />,
  };

  return (
    <div className="min-h-full">
      <Header active={page} onNavigate={setPage} />
      {pages[page] || pages.dashboard}
    </div>
  );
}

export default function App() {
  return (
    <PreferencesProvider>
      <AppContent />
    </PreferencesProvider>
  );
}