import { motion } from 'framer-motion';
import { useState } from 'react';
import {Users, MessageCircle, Trophy, Brain, 
  BarChart2, Book, Zap, Tag, Gauge
} from 'lucide-react';
import { GameBadge } from './GameBadge';
import { Game } from '../../types/game';
import { RulesPopup } from '../modals/RulesPopup';
import { StatsPopup } from '../modals/StatsPopup';

interface GameHeaderProps {
  game: Game;
}

export function GameHeader({ game }: GameHeaderProps) {
  const [showStats, setShowStats] = useState(false);
  const [showRules, setShowRules] = useState(false);

  // Calculate time remaining
  const timeRemaining = game.mechanics.timeLimit - (Date.now() - new Date(game.startedAt).getTime());
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const timeDisplay = timeRemaining > 0 ? `${hours}h ${minutes}m` : 'Expired';

  return (
    <div className="relative">
      {/* Hero Image with Metadata Overlay */}
      <div className="h-64 w-full relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
          {game.metadata.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative -mt-32 z-20 px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - AI Agent Info */}
            <div className="md:w-1/3">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {game.aiAgent.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {game.aiAgent.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Capabilities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {game.aiAgent.capabilities.map((capability, index) => (
                      <span key={index} className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Game Stats */}
            <div className="md:w-2/3">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {game.title}
                  </h1>
                  <div className="flex gap-2">
                    {game.badges.map((badge, index) => (
                      <GameBadge key={index} {...badge} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRules(true)}
                    className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    <Book className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowStats(true)}
                    className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    <BarChart2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </motion.button>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {game.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatsCard
                  icon={<Trophy className="w-5 h-5 text-green-500" />}
                  label="Pool Amount"
                  value={`$${game.stats.poolAmount.toLocaleString()}`}
                  subValue={`Initial: $${game.economics.initialPool.toLocaleString()}`}
                />
                <StatsCard
                  icon={<Zap className="w-5 h-5 text-yellow-500" />}
                  label="Message Cost"
                  value={`$${game.economics.messagecosts.current.toFixed(2)}`}
                  subValue={`Initial: $${game.economics.messagecosts.initial.toFixed(2)}`}
                />
                <StatsCard
                  icon={<Users className="w-5 h-5 text-blue-500" />}
                  label="Active Players"
                  value={game.stats.players.toLocaleString()}
                  subValue={`Max: ${game.mechanics.maxPlayers}`}
                />
                <StatsCard
                  icon={<MessageCircle className="w-5 h-5 text-purple-500" />}
                  label="Total Attempts"
                  value={game.stats.attempts.toLocaleString()}
                />
                <StatsCard
                  icon={<Gauge className="w-5 h-5 text-red-500" />}
                  label="Complexity"
                  value={`${game.metadata.complexity}/10`}
                />
              </div>

              {/* Additional Game Info */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Rewards Distribution
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatsPopup
        isOpen={showStats}
        onClose={() => setShowStats(false)}
      />

      <RulesPopup
        isOpen={showRules}
        onClose={() => setShowRules(false)}
        game={game}
      />
    </div>
  );
}

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}

function StatsCard({ icon, label, value, subValue }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      </div>
      <div className="space-y-1">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {value}
        </span>
        {subValue && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {subValue}
          </div>
        )}
      </div>
    </motion.div>
  );
}