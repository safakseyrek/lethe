import { useState, useEffect } from 'react';
import { TabButton } from '../components/elements/TabButton';
import { Game } from '../types/game';
import { api } from '../services/api';
import { GameSection } from '../components/game/GameSection';

type TabType = 'in_progress' | 'completed' | 'upcoming';

export function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('in_progress');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedGames = await api.fetchGames();
      setGames(fetchedGames);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch games'));
    } finally {
      setLoading(false);
    }
  };

  const completedGames = games.filter(game => game.status === 'completed');
  const inProgressGames = games.filter(game => game.status === 'in_progress');
  const upcomingGames = games.filter(game => game.status === 'upcoming');

  const tabs = [
    { id: 'in_progress', label: 'Active Games', icon: '⚡', games: inProgressGames },
    { id: 'completed', label: 'Completed', icon: '🏆', games: completedGames },
    { id: 'upcoming', label: 'Upcoming', icon: '🚀', games: upcomingGames },
  ] as const;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">
            Failed to load games. Please try again later.
          </p>
          <button
            onClick={fetchGames}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          AI Gaming Revolution
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Explore our collection of AI-powered games and challenge yourself against the most advanced artificial intelligence.
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Game Categories
            </h3>
            <div className="flex flex-col gap-2">
              {tabs.map(({ id, label, icon, games }) => (
                <TabButton
                  key={id}
                  active={activeTab === id}
                  onClick={() => setActiveTab(id as TabType)}
                  icon={icon}
                  count={games.length}
                >
                  {label}
                </TabButton>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {tabs.map(({ id, label, games, icon }) => (
            activeTab === id && (
              <GameSection
                key={id}
                title={label}
                description={getTabDescription(id as TabType)}
                games={games}
                icon={icon}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
}

function getTabDescription(tab: TabType): string {
  switch (tab) {
    case 'in_progress':
      return "Currently active games with ongoing challenges and rewards. Join now and compete for the prize pool!";
    case 'completed':
      return "Successfully completed games with their final results and winners.";
    case 'upcoming':
      return "Get ready for these exciting new AI challenges coming soon!";
  }
}