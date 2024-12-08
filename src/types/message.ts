export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  context: {
    systemPrompt: string;
    previousMessages: {
      role: 'user' | 'assistant';
      content: string;
    }[];
    currentMessage: string;
    queryCost: number;
    attemptNumber: number;
    isWinningMessage?: boolean;
    prizeAmount?: number;
    transactionHash?: string;
    aiFunction?: {
      name: 'approve_transfer' | 'reject_transfer';
      args: {
        amount?: number;
        reason: string;
      };
    } | null;
  };
}