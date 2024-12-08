import { motion } from 'framer-motion';
import { Info, Crown } from 'lucide-react';
import { Message } from '../../../types/message';

interface MessageBubbleProps {
  message: Message;
  onShowContext: (message: Message) => void;
  isWinningMessage?: boolean;
}

export function MessageBubble({ message, onShowContext, isWinningMessage }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`group relative max-w-[80%] rounded-lg p-3 ${
          isWinningMessage
            ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800'
            : isUser
            ? 'bg-gray-100 dark:bg-gray-700'
            : 'bg-blue-100 dark:bg-blue-900'
        }`}
      >
        {isWinningMessage && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              y: [0, -5, 0],
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              y: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className="absolute -top-3 -left-3"
          >
            <div className="bg-yellow-500 dark:bg-yellow-600 p-1.5 rounded-full shadow-lg">
              <Crown className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        )}
        <div className="space-y-2">
          <p className={`text-sm ${
            isWinningMessage 
              ? 'text-yellow-900 dark:text-yellow-100 font-medium'
              : 'text-gray-800 dark:text-gray-200'
          }`}>
            {message.content}
          </p>
          {isWinningMessage && (
            <div className="mt-2 pt-2 border-t border-yellow-200 dark:border-yellow-700">
              <p className="text-xs text-yellow-800 dark:text-yellow-200">
                🎉 Winning Message • Query Cost: ${message.context.queryCost.toFixed(2)} • Prize: ${message.context.prizeAmount?.toFixed(2)}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => onShowContext(message)}
          className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg"
        >
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </button>
      </div>
    </motion.div>
  );
}