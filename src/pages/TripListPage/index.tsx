import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import { TripCard } from '@/components/TripCard';
import { EmptyState } from '@/components/EmptyState';
import { cn } from '@/lib/utils';
import type { TripCategory } from '@/shared/types';
import { TRIP_CATEGORY_LABELS } from '@/shared/types';

const ALL_CATEGORIES: TripCategory[] = ['weekend', 'long-ride', 'touring', 'commute', 'other'];

export function TripListPage() {
  const { trips, deleteTrip } = useTrips();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TripCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'distance'>('date');

  const filteredTrips = useMemo(() => {
    let result = trips;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(t => t.category === selectedCategory);
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      return b.totalDistance - a.totalDistance;
    });

    return result;
  }, [trips, search, selectedCategory, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">行程列表</h1>
          <p className="mt-1 text-sm text-zinc-400">共 {trips.length} 条行程记录</p>
        </div>
        <button onClick={() => navigate('/planner')} className="btn-primary">
          + 新建行程
        </button>
      </div>

      <div className="card card-padding">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="搜索行程名称或描述..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field sm:max-w-xs"
          />
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'date' | 'distance')}
              className="input-field w-auto text-xs"
            >
              <option value="date">按日期排序</option>
              <option value="distance">按距离排序</option>
            </select>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition',
              selectedCategory === 'all'
                ? 'border-indigo-500/50 bg-indigo-500/20 text-indigo-300'
                : 'border-border bg-white/5 text-zinc-400 hover:bg-white/10'
            )}
          >
            全部
          </button>
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? 'all' : cat)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition',
                selectedCategory === cat
                  ? 'border-indigo-500/50 bg-indigo-500/20 text-indigo-300'
                  : 'border-border bg-white/5 text-zinc-400 hover:bg-white/10'
              )}
            >
              {TRIP_CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {filteredTrips.length === 0 ? (
        <EmptyState
          icon="🔍"
          title={search || selectedCategory !== 'all' ? "没有找到匹配的行程" : "还没有行程记录"}
          description={search || selectedCategory !== 'all' ? "试试调整搜索条件或筛选类别" : "创建你的第一条骑行路线吧"}
          action={!search && selectedCategory === 'all' ? { label: "规划新行程", onClick: () => navigate('/planner') } : undefined}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTrips.map(trip => (
            <TripCard key={trip.id} trip={trip} onDelete={deleteTrip} />
          ))}
        </div>
      )}
    </div>
  );
}
