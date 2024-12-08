import { ArrowRight, Trophy, Users, Zap, MessageCircle, Bell, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameBadge } from './GameBadge';
import { useState } from 'react';
import { Game } from '../../types/game';

interface GameCardProps extends Pick<Game, 'title' | 'description' | 'slug' | 'image' | 'status' | 'badges' | 'stats'> {}

export function GameCard({ 
  title, 
  description, 
  slug,
  image,
  status,
  badges,
  stats
}: GameCardProps) {
  const [isPreregistered, setIsPreregistered] = useState(false);

  const handlePreregister = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPreregistered(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-40">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {badges.map((badge, index) => (
            <GameBadge key={index} {...badge} />
          ))}
        </div>
        {status === 'completed' && (
          <div className="absolute top-3 right-3 bg-yellow-500/90 dark:bg-yellow-600/90 p-2 rounded-full shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-0.5">
              <Zap className="w-4 h-4 text-green-500 mr-1" />
              <span className="font-bold text-green-600 dark:text-green-400 text-sm">
                ${stats.poolAmount.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Pool</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-0.5">
              <Users className="w-4 h-4 text-blue-500 mr-1" />
              <span className="font-bold text-gray-900 dark:text-white text-sm">
                {stats.players.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Players</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-0.5">
              <MessageCircle className="w-4 h-4 text-purple-500 mr-1" />
              <span className="font-bold text-gray-900 dark:text-white text-sm">
                {stats.attempts.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Attempts</p>
          </div>
        </div>

        <motion.div className="flex justify-center">
          {status === 'upcoming' ? (
            <button
              onClick={handlePreregister}
              disabled={isPreregistered}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                isPreregistered
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-white hover:from-purple-700 hover:to-blue-700'
              }`}
            >
              {isPreregistered ? (
                <>
                  <Bell className="w-4 h-4" />
                  Pre-registered
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  Pre-register
                </>
              )}
            </button>
          ) : (
            <Link
              to={`/game/${slug}`}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                status === 'completed'
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700 text-white hover:from-yellow-600 hover:to-yellow-700'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white hover:from-blue-700 hover:to-blue-800'
              }`}
            >
              {status === 'completed' ? (
                <>
                  <Eye className="w-4 h-4" />
                  View Details
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  Play Now
                </>
              )}
            </Link>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}