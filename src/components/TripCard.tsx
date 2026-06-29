import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Trip } from '@/shared/types';
import { TRIP_CATEGORY_LABELS, TRIP_CATEGORY_COLORS } from '@/shared/types';

interface TripCardProps {
  trip: Trip;
  onDelete?: (id: string) => void;
}

export function TripCard({ trip, onDelete }: TripCardProps) {
  const categoryColor = TRIP_CATEGORY_COLORS[trip.category];
  const categoryLabel = TRIP_CATEGORY_LABELS[trip.category];

  return (
    <div className="card card-padding group transition hover:border-white/20 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-zinc-100">{trip.name}</h3>
            <span className={cn('shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium', categoryColor)}>
              {categoryLabel}
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">{trip.date}</p>
        </div>
        {onDelete && (
          <button
            onClick={(e) => { e.preventDefault(); onDelete(trip.id); }}
            className="shrink-0 rounded-md p-1.5 text-zinc-500 opacity-0 transition hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
            aria-label="删除行程"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
          </button>
        )}
      </div>

      {trip.description && (
        <p className="mt-2 line-clamp-2 text-xs text-zinc-400">{trip.description}</p>
      )}

      <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>
          {trip.waypoints.length} 个途经点
        </span>
        <span>{trip.totalDistance} km</span>
        <span>{trip.duration >= 60 ? `${Math.floor(trip.duration / 60)}h${trip.duration % 60}m` : `${trip.duration}m`}</span>
      </div>

      <Link
        to={`/trips/${trip.id}`}
        className="mt-3 inline-block text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
      >
        查看详情 →
      </Link>
    </div>
  );
}
