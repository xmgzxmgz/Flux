import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center')}>
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 text-sm font-semibold text-zinc-200">{title}</h3>
      <p className="mt-1 max-w-xs text-xs text-zinc-500">{description}</p>
      {action && (
        <button onClick={action.onClick} className="btn-primary mt-4">
          {action.label}
        </button>
      )}
    </div>
  );
}
