import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
  subtitle?: string;
}

export function StatsCard({ label, value, icon, color = 'from-indigo-500/20 to-indigo-500/5', subtitle }: StatsCardProps) {
  return (
    <div className={cn('card card-padding group transition hover:border-white/20 hover:-translate-y-0.5')}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">{label}</p>
          <p className="mt-2 text-2xl font-bold text-zinc-100">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-zinc-500">{subtitle}</p>}
        </div>
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-lg', color)}>
          {icon}
        </div>
      </div>
    </div>
  );
}
