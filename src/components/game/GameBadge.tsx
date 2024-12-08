import { cn } from "../../lib/utils";

interface GameBadgeProps {
  label: string;
  variant?: 'new' | 'popular' | 'featured';
}

export function GameBadge({ label, variant = 'new' }: GameBadgeProps) {
  return (
    <span
      className={cn(
        'px-2 py-1 rounded-full text-xs font-semibold',
        variant === 'new' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        variant === 'popular' && 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        variant === 'featured' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      )}
    >
      {label}
    </span>
  );
}