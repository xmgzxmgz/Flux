import { Link, useNavigate } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import { StatsCard } from '@/components/StatsCard';
import { TripCard } from '@/components/TripCard';
import { EmptyState } from '@/components/EmptyState';

export function DashboardPage() {
  const { trips, deleteTrip, getStats } = useTrips();
  const navigate = useNavigate();
  const stats = getStats();
  const recentTrips = trips.slice(0, 4);

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h${m}m` : `${h}h`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">仪表盘</h1>
          <p className="mt-1 text-sm text-zinc-400">你的骑行数据一览</p>
        </div>
        <Link to="/planner" className="btn-primary">
          + 新建行程
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="总行程"
          value={stats.totalTrips}
          icon="🏍"
          color="from-indigo-500/20 to-indigo-500/5"
        />
        <StatsCard
          label="总里程"
          value={`${stats.totalDistance.toLocaleString()} km`}
          icon="📏"
          color="from-emerald-500/20 to-emerald-500/5"
        />
        <StatsCard
          label="总时长"
          value={formatDuration(stats.totalDuration)}
          icon="⏱"
          color="from-amber-500/20 to-amber-500/5"
        />
        <StatsCard
          label="途经点"
          value={stats.totalWaypoints}
          icon="📍"
          color="from-purple-500/20 to-purple-500/5"
        />
      </div>

      <div className="card card-padding">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">最近行程</h2>
          {trips.length > 4 && (
            <Link to="/trips" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition">
              查看全部 →
            </Link>
          )}
        </div>

        {recentTrips.length === 0 ? (
          <EmptyState
            icon="🏍"
            title="还没有行程记录"
            description="创建你的第一条骑行路线，开始记录旅程吧"
            action={{ label: "规划第一趟行程", onClick: () => navigate('/planner') }}
          />
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {recentTrips.map(trip => (
              <TripCard key={trip.id} trip={trip} onDelete={deleteTrip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
