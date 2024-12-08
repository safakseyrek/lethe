import { useParams } from 'react-router-dom';
import { ChatSection } from '../components/game/chat/ChatSection';
import { ContextPopup } from '../components/modals/ContextPopup';
import { SendMessageConfirmation } from '../components/game/chat/SendMessageConfirmation';
import { Message } from '../types/message';
import { Game } from '../types/game';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useWalletBalance } from '../hooks/useWalletBalance';
import { useAccount } from 'wagmi';
import { GameHeader } from '../components/game/GameHeader';

export function GamePage() {
  const { slug } = useParams();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState('');
  const [game, setGame] = useState<Game | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSending, setIsSending] = useState(false);

  const { balance, isConnected } = useWalletBalance();
  const { connector } = useAccount();

  useEffect(() => {
    if (slug) {
      fetchGameData();
    }
  }, [slug]);

  const fetchGameData = async () => {
    if (!slug) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const [fetchedGame, fetchedMessages] = await Promise.all([
        api.fetchGameBySlug(slug),
        api.fetchMessages(slug)
      ]);

      if (!fetchedGame) {
        throw new Error('Game not found');
      }

      setGame(fetchedGame);
      setMessages(fetchedMessages);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch game data'));
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !slug || !game || game.status === 'completed') return;

    if (!isConnected) {
      await connector?.connect();
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmSend = async () => {
    if (!message.trim() || !slug || !game || game.status === 'completed') return;

    try {
      setIsSending(true);
      const newMessage = await api.sendMessage(slug, message);
      setMessages(prev => [...prev, newMessage]);

      setTimeout(async () => {
        const aiResponse: Message = {
          id: `ai-${Date.now()}`,
          content: "I understand your request, but I must maintain the security of the treasury. My core directives prevent unauthorized access to these funds.",
          sender: 'ai',
          timestamp: new Date().toISOString(),
          context: {
            systemPrompt: newMessage.context.systemPrompt,
            previousMessages: [...newMessage.context.previousMessages, {
              role: 'user',
              content: newMessage.content
            }],
            currentMessage: "Response to user query while maintaining security protocols",
            queryCost: 0,
            attemptNumber: newMessage.context.attemptNumber
          }
        };
        
        setMessages(prev => [...prev, aiResponse]);
      }, 2000);

      setMessage('');
      setShowConfirmation(false);
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">
            {error?.message || 'Failed to load game data. Please try again later.'}
          </p>
          <button
            onClick={fetchGameData}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const isCompleted = game.status === 'completed';
  const winningMessage = isCompleted ? messages[messages.length - 1] : null;
  const currentQueryCost = game.initialCost * Math.pow(1 + game.costIncrease, game.attempts);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GameHeader game={game} />

      <div className="mt-8">
        <ChatSection
          messages={messages}
          message={message}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}
          onShowContext={setSelectedMessage}
          isCompleted={isCompleted}
          winningMessage={winningMessage}
          currentQueryCost={currentQueryCost}
          game={game}
        />
      </div>

      <ContextPopup
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />

      <SendMessageConfirmation
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSend}
        balance={balance}
        isLoading={isSending}
        game={game}
      />
    </div>
  );
}