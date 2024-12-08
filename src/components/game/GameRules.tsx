import { motion } from 'framer-motion';

interface GameRulesProps {
  rules: GameRule[];
  objective: string;
  aiAgent: {
    name: string;
    description: string;
  };
}

export function GameRules({ rules, objective, aiAgent }: GameRulesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* AI Agent Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {aiAgent.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {aiAgent.description}
        </p>
      </div>

      {/* Objective Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Objective
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {objective}
        </p>
      </div>

      {/* Rules Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Game Rules
        </h3>
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">
                  {rule.icon}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {rule.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {rule.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}