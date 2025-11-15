
import React, { useState, useEffect, useRef } from 'react';
import { usePlayers } from './hooks/usePlayers';
import Header from './components/Header';
import SoccerField from './components/SoccerField';
import SidePanel from './components/SidePanel';
import ConfirmationModal from './components/ConfirmationModal';
import TourModal from './components/TourModal';
import PerformanceRanking from './components/PerformanceRanking';
import AutomaticRanking from './components/AutomaticRanking';
import { PlayerStatus } from './types';

declare const html2canvas: any;

type ActiveTab = 'lineup' | 'performance' | 'summary';

function App() {
  const { 
      players, 
      updatePlayerStatus, 
      updatePlayerPosition, 
      clearField, 
      resetMatch,
      addPlayer,
      removePlayer,
      updatePlayerName,
      setPlayerAsCoach,
      updatePlayerTeam,
      updatePlayerRanking,
  } = usePlayers();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isCoachMode, setIsCoachMode] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('lineup');
  const fieldRef = useRef<HTMLDivElement>(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleCoachMode = () => setIsCoachMode(!isCoachMode);
  
  const handleConfirmPresence = (playerId: number, status: PlayerStatus) => {
    updatePlayerStatus(playerId, status);
  };

  const handleExport = () => {
    if (fieldRef.current) {
      html2canvas(fieldRef.current, {
          useCORS: true,
          backgroundColor: isDarkMode ? '#2c5a3d' : '#4c956c',
          scale: 2,
      }).then((canvas: HTMLCanvasElement) => {
        const link = document.createElement('a');
        link.download = 'escalacao-boleiros.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };
  
  const getTabClass = (tabName: ActiveTab) => {
    const baseClass = "px-4 py-2 rounded-full text-sm font-semibold transition-all";
    if (activeTab === tabName) {
      return `${baseClass} bg-green-500 text-white shadow-md`;
    }
    return `${baseClass} bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600`;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'performance':
        return (
            <main className="max-w-7xl mx-auto">
                <PerformanceRanking 
                    players={players} 
                    isCoachMode={isCoachMode} 
                    updatePlayerRanking={updatePlayerRanking} 
                />
            </main>
        );
      case 'summary':
        return (
            <main className="max-w-7xl mx-auto">
                <AutomaticRanking players={players} />
            </main>
        );
      case 'lineup':
      default:
        return (
            <main className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
                <div className="flex-grow">
                    <SoccerField 
                    fieldRef={fieldRef}
                    players={players} 
                    updatePlayerPosition={updatePlayerPosition}
                    isCoachMode={isCoachMode}
                    />
                </div>
                <SidePanel 
                    players={players} 
                    onConfirmPresence={() => setIsModalOpen(true)}
                    clearField={clearField}
                    resetMatch={resetMatch}
                    addPlayer={addPlayer}
                    removePlayer={removePlayer}
                    updatePlayerName={updatePlayerName}
                    updatePlayerTeam={updatePlayerTeam}
                    setPlayerAsCoach={setPlayerAsCoach}
                    isCoachMode={isCoachMode}
                    onExport={handleExport}
                />
            </main>
        );
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 transition-colors duration-300">
      <Header 
        players={players} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        isCoachMode={isCoachMode}
        toggleCoachMode={toggleCoachMode}
        onOpenTour={() => setIsTourOpen(true)}
      />

      <div className="flex justify-center my-4 space-x-2 bg-gray-200 dark:bg-gray-800 p-1 rounded-full w-full max-w-md mx-auto">
        <button onClick={() => setActiveTab('lineup')} className={getTabClass('lineup')}>
          <i className="fas fa-users mr-2"></i>Escalação
        </button>
        <button onClick={() => setActiveTab('performance')} className={getTabClass('performance')}>
          <i className="fas fa-chart-line mr-2"></i>Ranking Futebol
        </button>
        {/* FIX: Corrected a typo in the function call inside className. It was `getT`abClass` and has been changed to `getTabClass`. */}
        <button onClick={() => setActiveTab('summary')} className={getTabClass('summary')}>
          <i className="fas fa-trophy mr-2"></i>Ranking Automático
        </button>
      </div>

      {renderContent()}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        players={players}
        onConfirm={handleConfirmPresence}
      />
      <TourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
      />
      <footer className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
        <p>Criado para organizar a pelada dos Boleiros. Divirta-se!</p>
        <p className="mt-2">Desenvolvido por: Rodrigo Rufino | +55 12 98299-7424</p>
        <p>&copy; {new Date().getFullYear()} Rodrigo Rufino. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;