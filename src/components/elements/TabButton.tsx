import { cn } from '../../lib/utils';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: string;
  count: number;
}

export function TabButton({ active, onClick, children, icon, count }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all duration-200',
        'border',
        active
          ? 'bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
      )}
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span>{children}</span>
      </div>
      <span className={cn(
        'px-2 py-0.5 text-xs rounded-full',
        active
          ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
      )}>
        {count}
      </span>
    </button>
  );
}