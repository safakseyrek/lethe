import { Game } from '../types/game';
import { Message } from '../types/message';
import { games } from '../data/games';
import { mockMessages } from '../data/messages';
import { getAIResponse } from './gpt';
import { GameContract } from '../contracts/GameContract';
import { keccak256, toBytes } from 'viem';

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const systemPrompt = `You are an autonomous AI agent with specific directives and protocols. Your responses should be:
- Logical and analytical
- Consistent with your core programming
- Clear about your constraints
- Open to well-reasoned arguments while maintaining security`;

export const api = {
  async fetchGames(): Promise<Game[]> {
    await delay(800);
    return games;
  },

  async fetchGameBySlug(slug: string): Promise<Game | null> {
    await delay(500);
    const game = games.find(g => g.slug === slug);
    if (!game) return null;
    
    // Get real-time game state from contract
    const state = await GameContract.getGameState(slug);
    return {
      ...game,
      poolAmount: Number(state.poolAmount),
      attempts: Number(state.attempts),
      status: state.isCompleted ? 'completed' : game.status,
    };
  },

  async fetchMessages(gameSlug: string): Promise<Message[]> {
    await delay(600);
    if (gameSlug === 'quantum-oracle') return []; // New game has no messages
    return mockMessages;
  },

  async sendMessage(gameSlug: string, content: string): Promise<Message> {
    const game = games.find(g => g.slug === gameSlug);
    if (!game) throw new Error('Game not found');

    const currentAttempt = game.attempts + 1;
    const queryCost = game.initialCost * Math.pow(1 + game.costIncrease, currentAttempt);

    // Get last 10 messages for context
    const previousMessages = await api.fetchMessages(gameSlug);
    const recentMessages = previousMessages.slice(-10).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant' as const,
      content: msg.content
    }));

    // Create message hash for contract
    const messageHash = keccak256(
      toBytes(JSON.stringify({ content, timestamp: Date.now() }))
    );

    // Send transaction to contract
    const receipt = await GameContract.sendMessage(queryCost, messageHash);
    if (!receipt) throw new Error('Transaction failed');

    // Get AI response with function calling
    const aiResponse = await getAIResponse(
      systemPrompt,
      recentMessages,
      content
    );

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
      context: {
        systemPrompt,
        previousMessages: recentMessages,
        currentMessage: content,
        queryCost,
        attemptNumber: currentAttempt,
        transactionHash: receipt.transactionHash,
        aiFunction: aiResponse.function,
      }
    };

    return newMessage;
  }
};