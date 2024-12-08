import { Brain, Trophy, LayoutGrid, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { ConnectButton } from './ConnectButton';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
              Lethe
            </span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Games</span>
            </Link>
            <Link 
              to="/leaderboard" 
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Trophy className="w-4 h-4" />
              <span>Leaderboard</span>
            </Link>
            <Link 
              to="/community" 
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Community</span>
            </Link>
            
            <ThemeToggle />
            <ConnectButton />
          </nav>
        </div>
      </div>
    </header>
  );
}