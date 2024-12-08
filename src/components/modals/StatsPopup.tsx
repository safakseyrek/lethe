import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GameStats } from '../game/GameStats';

interface StatsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StatsPopup({ isOpen, onClose }: StatsPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Game Statistics
              </h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <GameStats />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}