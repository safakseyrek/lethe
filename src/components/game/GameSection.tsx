import { GameCard } from './GameCard';
import { Game } from '../types/game';

interface GameSectionProps {
  title: string;
  description: string;
  games: Game[];
  icon: string;
}

export function GameSection({ title, description, games, icon }: GameSectionProps) {
  if (games.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          {icon} {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard key={game.slug} {...game} />
        ))}
      </div>
    </section>
  );
}