import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, X, AlertTriangle, Info } from 'lucide-react';
import { Game } from '../../../types/game';

interface SendMessageConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  game: Game;
  balance: string;
  isLoading: boolean;
}

export function SendMessageConfirmation({
  isOpen,
  onClose,
  onConfirm,
  game,
  balance,
  isLoading
}: SendMessageConfirmationProps) {
  const cost = game.economics.messagecosts.current;
  const hasInsufficientFunds = parseFloat(balance) < cost;

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
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-blue-500" />
                Confirm Transaction
              </h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    You are about to send a message that will cost:
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${cost.toFixed(2)} <span className="text-sm text-gray-500">ETH</span>
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Your balance:</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {balance} ETH
                  </p>
                </div>

                {/* Game Stats */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Game Statistics
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Pool Amount:</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${game.stats.poolAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {hasInsufficientFunds && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800 dark:text-red-300">
                        Insufficient funds
                      </p>
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                        You need at least {cost.toFixed(2)} ETH to send this message.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={hasInsufficientFunds || isLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Confirming...' : 'Confirm'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}