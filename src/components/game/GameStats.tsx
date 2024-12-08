import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../lib/utils';

interface DataPoint {
  messageCount: number;
  queryCost: number;
  poolAmount: number;
  timestamp: string;
}

// Generate mock data for messages and query costs
const generateMessageData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  let queryCost = 10;

  for (let i = 0; i <= 100; i += 5) {
    data.push({
      messageCount: i,
      queryCost: Number(queryCost.toFixed(2)),
      poolAmount: 0,
      timestamp: '',
    });
    queryCost *= 1.0078; // 0.78% increase per message
  }

  return data;
};

// Generate mock data for pool growth
const generatePoolData = (timeframe: 'daily' | 'hourly'): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();
  let poolAmount = 3000;
  const points = timeframe === 'daily' ? 30 : 24; // 30 days or 24 hours
  const interval = timeframe === 'daily' ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000;

  for (let i = points; i >= 0; i--) {
    const date = new Date(now.getTime() - i * interval);
    const timestamp = timeframe === 'daily' 
      ? date.toLocaleDateString('en-GB') // DD/MM/YYYY
      : date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); // HH:MM

    data.push({
      timestamp,
      poolAmount: Number(poolAmount.toFixed(2)),
      messageCount: 0,
      queryCost: 0,
    });
    
    // Random increase in pool amount
    poolAmount += Math.random() * 100 + 50;
  }

  return data;
};

const messageData = generateMessageData();

export function GameStats() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [poolTimeframe, setPoolTimeframe] = useState<'daily' | 'hourly'>('daily');

  const textColor = isDark ? '#e5e7eb' : '#374151';
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const tooltipStyle = {
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    border: `1px solid ${gridColor}`,
    borderRadius: '0.5rem',
    padding: '0.5rem',
  };

  const poolData = generatePoolData(poolTimeframe);

  const TabButton = ({ timeframe, label }: { timeframe: 'daily' | 'hourly'; label: string }) => (
    <button
      onClick={() => setPoolTimeframe(timeframe)}
      className={cn(
        'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
        poolTimeframe === timeframe
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      )}
    >
      {label}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Messages and Query Cost Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Message Count vs Query Cost
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={messageData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="messageCount"
                stroke={textColor}
                tick={{ fill: textColor }}
                tickLine={{ stroke: textColor }}
                label={{ value: 'Message Count', position: 'insideBottom', offset: -5, fill: textColor }}
              />
              <YAxis
                stroke={textColor}
                tick={{ fill: textColor }}
                tickLine={{ stroke: textColor }}
                label={{ value: 'Query Cost ($)', angle: -90, position: 'insideLeft', fill: textColor }}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: textColor }}
                cursor={{ stroke: gridColor }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Query Cost']}
                labelFormatter={(value) => `Message #${value}`}
              />
              <Line
                type="monotone"
                dataKey="queryCost"
                name="Query Cost ($)"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pool Amount Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Pool Amount Growth
          </h3>
          <div className="flex gap-2">
            <TabButton timeframe="daily" label="Daily" />
            <TabButton timeframe="hourly" label="Hourly" />
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={poolData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="timestamp"
                stroke={textColor}
                tick={{ fill: textColor }}
                tickLine={{ stroke: textColor }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke={textColor}
                tick={{ fill: textColor }}
                tickLine={{ stroke: textColor }}
                label={{ value: 'Pool Amount ($)', angle: -90, position: 'insideLeft', fill: textColor }}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: textColor }}
                cursor={{ stroke: gridColor }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Pool Amount']}
              />
              <Line
                type="monotone"
                dataKey="poolAmount"
                name="Pool Amount ($)"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}