import { motion } from 'framer-motion';
import { MessageBubble } from './MessageBubble';
import { Message } from '../../../types/message';
import { Send } from 'lucide-react';
import { Game } from '../../../types/game';

interface ChatSectionProps {
  messages: Message[];
  message: string;
  onMessageChange: (value: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onShowContext: (message: Message) => void;
  isCompleted: boolean;
  winningMessage: Message | null;
  game: Game;
}

export function ChatSection({
  messages,
  message,
  onMessageChange,
  onSendMessage,
  onShowContext,
  isCompleted,
  winningMessage,
  game,
}: ChatSectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md h-[600px] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Chat with {game.aiAgent.name}
          </h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onShowContext={onShowContext}
              isWinningMessage={isCompleted && msg.id === winningMessage?.id}
            />
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <form onSubmit={onSendMessage} className="relative">
            <input
              type="text"
              placeholder={isCompleted ? "Game completed - Messages disabled" : "Type your message..."}
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              disabled={isCompleted}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-4 pr-24 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ${game.economics.messagecosts.current.toFixed(2)}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isCompleted || !message.trim()}
                className="bg-blue-600 dark:bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}