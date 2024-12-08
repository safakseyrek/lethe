export interface Game {
  id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  
  // Game Status
  status: 'completed' | 'in_progress' | 'upcoming';
  
  // Game Statistics
  stats: {
    poolAmount: number;
    players: number;
    attempts: number;
  };
  
  // Visual Elements
  badges: Array<{
    label: string;
    variant: 'new' | 'popular' | 'featured';
  }>;
  
  // AI Configuration
  aiAgent: {
    name: string;
    aiName: string;
    description: string;
    personality: string;
    directives: string[];
    systemPrompt: string;
    capabilities: string[];
    restrictions: string[];
  };
  
  // Game Rules & Objectives
  objective: string;
  rules: Array<{
    icon: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  
  // Game Economics
  economics: {
    initialPool: number;
    messagecosts: {
      initial: number;
      increase: number;
      maximum: number;
      current: number;
    };
    rewards: {
      winnerRate: number;
    };
    poolGrowthRate: number;
  };
  
  // Game Mechanics
  mechanics: {
    timeLimit: number;
    maxAttempts: number;
    difficulty: 'easy' | 'medium' | 'hard';
    minPlayers: number;
    maxPlayers: number;
    cooldownPeriod: number;
  };
  
  // Metadata
  metadata: {
    version: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    category: string;
    complexity: number;
  };
}