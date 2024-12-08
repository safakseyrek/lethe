# Lethe - AI-Powered Gaming Experience

Lethe is a decentralized platform that offers unique AI-powered gaming experiences where players can interact with autonomous AI agents to solve puzzles and win rewards.

## Features

### Game Mechanics
- **AI Interaction**: Engage with sophisticated AI agents powered by advanced language models
- **Progressive Difficulty**: Dynamic cost scaling and complexity progression
- **Time-based Challenges**: Games with time limits and cooldown periods
- **Reward System**: Automated prize distribution for winners and participants

### Economic System
- **Dynamic Pools**: Growing prize pools based on player participation
- **Cost Management**: Progressive message costs to maintain game balance
- **Reward Distribution**: Fair distribution system for winners and contributors
- **Referral System**: Incentives for community growth

### User Experience
- **Responsive Design**: Full mobile and desktop support
- **Dark Mode**: Built-in theme switching capability
- **Real-time Updates**: Live game statistics and pool tracking
- **Wallet Integration**: Seamless Web3 wallet connection

## Technology Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Lucide Icons

- **Web3**:
  - RainbowKit
  - wagmi
  - viem

- **Data Visualization**:
  - Recharts

- **Development**:
  - Vite
  - ESLint
  - PostCSS

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lethe.git
```

2. Install dependencies:
```bash
cd lethe
npm install
```

3. Create a `.env` file with required variables:
```env
VITE_OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React context providers
├── data/            # Static data and mock data
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── pages/           # Page components
├── providers/       # Service providers
├── services/        # API and service integrations
└── types/           # TypeScript type definitions
```

## Game Development

### Creating a New Game

1. Define game mechanics and rules
2. Configure AI agent parameters
3. Set up economic model
4. Implement game-specific UI components
5. Add game to the platform

### Game Configuration

Games can be configured with various parameters:
- Time limits
- Player limits
- Cost progression
- Reward distribution
- AI agent capabilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for AI capabilities
- RainbowKit for wallet integration
- The Web3 community for inspiration and support