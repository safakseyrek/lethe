import { useGameStore } from '../store/gameStore';

export function useGame(slug: string) {
  const game = useGameStore((state) => 
    state.games.find((g) => g.slug === slug)
  );
  
  const sendMessage = useGameStore((state) => state.sendMessage);
  const updateGame = useGameStore((state) => state.updateGame);

  const currentQueryCost = game 
    ? 10 * Math.pow(1.0078, game.attempts)
    : 10;

  return {
    game,
    currentQueryCost,
    sendMessage: (content: string) => sendMessage(slug, content),
    updateGame: (updates: Partial<typeof game>) => updateGame(slug, updates),
  };
}