import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import { cn } from '@/lib/utils';
import { TRIP_CATEGORY_LABELS, TRIP_CATEGORY_COLORS } from '@/shared/types';

export function TripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getTrip, deleteTrip } = useTrips();
  const navigate = useNavigate();
  const trip = getTrip(id ?? '');

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-4xl">🤷</div>
        <h2 className="mt-4 text-lg font-semibold">行程不存在</h2>
        <p className="mt-1 text-sm text-zinc-400">该行程可能已被删除</p>
        <Link to="/trips" className="btn-primary mt-4">返回行程列表</Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('确定删除这条行程记录吗？此操作不可撤销。')) {
      deleteTrip(trip.id);
      navigate('/trips');
    }
  };

  const categoryColor = TRIP_CATEGORY_COLORS[trip.category];
  const categoryLabel = TRIP_CATEGORY_LABELS[trip.category];

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} 分钟`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h} 小时 ${m} 分钟` : `${h} 小时`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/trips" className="text-zinc-400 transition hover:text-zinc-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{trip.name}</h1>
              <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-medium', categoryColor)}>
                {categoryLabel}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-zinc-500">{trip.date}</p>
          </div>
        </div>
        <button onClick={handleDelete} className="btn-danger">
          删除行程
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card card-padding text-center">
          <p className="text-xs uppercase tracking-wider text-zinc-400">总距离</p>
          <p className="mt-1 text-2xl font-bold">{trip.totalDistance}<span className="ml-1 text-sm font-normal text-zinc-400">km</span></p>
        </div>
        <div className="card card-padding text-center">
          <p className="text-xs uppercase tracking-wider text-zinc-400">总时长</p>
          <p className="mt-1 text-2xl font-bold">{formatDuration(trip.duration)}</p>
        </div>
        <div className="card card-padding text-center">
          <p className="text-xs uppercase tracking-wider text-zinc-400">途经点</p>
          <p className="mt-1 text-2xl font-bold">{trip.waypoints.length}<span className="ml-1 text-sm font-normal text-zinc-400">个</span></p>
        </div>
      </div>

      {trip.description && (
        <div className="card card-padding">
          <h2 className="text-sm font-semibold">行程描述</h2>
          <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{trip.description}</p>
        </div>
      )}

      <div className="card card-padding">
        <h2 className="text-sm font-semibold">路线地图</h2>
        <div className="mt-3 aspect-[16/9] w-full rounded-lg border border-border bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-emerald-500/10 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl">🗺</div>
            <p className="mt-2 text-xs text-zinc-500">地图预览区域</p>
          </div>
        </div>
      </div>

      {trip.waypoints.length > 0 && (
        <div className="card card-padding">
          <h2 className="text-sm font-semibold">途经点列表</h2>
          <div className="mt-3 space-y-2">
            {trip.waypoints.map((wp, i) => (
              <div key={wp.id} className="flex items-center gap-3 rounded-lg border border-border bg-black/15 p-3 transition hover:bg-black/25">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] font-bold text-indigo-300">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-zinc-100">{wp.name}</div>
                  <div className="text-[11px] text-zinc-500">
                    {wp.lat.toFixed(4)}, {wp.lng.toFixed(4)}
                  </div>
                </div>
                {wp.note && <span className="text-xs text-zinc-500">{wp.note}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card card-padding">
        <h2 className="text-sm font-semibold">照片</h2>
        <div className="mt-3 rounded-lg border border-dashed border-border bg-black/10 p-8 text-center">
          <div className="text-2xl">📸</div>
          <p className="mt-2 text-xs text-zinc-500">照片功能即将推出</p>
        </div>
      </div>

      <div className="text-xs text-zinc-600">
        创建于 {new Date(trip.createdAt).toLocaleString('zh-CN')}
        {trip.updatedAt !== trip.createdAt && ` · 更新于 ${new Date(trip.updatedAt).toLocaleString('zh-CN')}`}
      </div>
    </div>
  );
}
