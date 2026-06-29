import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips, type TripFormData } from '@/hooks/useTrips';
import { cn } from '@/lib/utils';
import type { TripCategory } from '@/shared/types';
import { TRIP_CATEGORY_LABELS } from '@/shared/types';

const ALL_CATEGORIES: TripCategory[] = ['weekend', 'long-ride', 'touring', 'commute', 'other'];

interface WaypointInput {
  name: string;
  lat: string;
  lng: string;
  note: string;
}

interface FormErrors {
  name?: string;
  date?: string;
  totalDistance?: string;
  duration?: string;
  waypoints?: string;
}

export function TripPlannerPage() {
  const navigate = useNavigate();
  const { addTrip } = useTrips();

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TripCategory>('weekend');
  const [totalDistance, setTotalDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [waypoints, setWaypoints] = useState<WaypointInput[]>([
    { name: '', lat: '', lng: '', note: '' },
  ]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addWaypoint = () => {
    setWaypoints(prev => [...prev, { name: '', lat: '', lng: '', note: '' }]);
  };

  const removeWaypoint = (index: number) => {
    setWaypoints(prev => prev.filter((_, i) => i !== index));
  };

  const updateWaypoint = (index: number, field: keyof WaypointInput, value: string) => {
    setWaypoints(prev => prev.map((wp, i) => i === index ? { ...wp, [field]: value } : wp));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) newErrors.name = '请输入行程名称';
    if (!date) newErrors.date = '请选择日期';

    const dist = parseFloat(totalDistance);
    if (!totalDistance || isNaN(dist) || dist <= 0) {
      newErrors.totalDistance = '请输入有效的距离（正数）';
    }

    const dur = parseInt(duration, 10);
    if (!duration || isNaN(dur) || dur <= 0) {
      newErrors.duration = '请输入有效的时长（正整数分钟）';
    }

    const validWaypoints = waypoints.filter(wp => wp.name.trim());
    if (validWaypoints.length === 0) {
      newErrors.waypoints = '至少添加一个途经点';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const data: TripFormData = {
        name: name.trim(),
        date,
        description: description.trim(),
        category,
        waypoints: waypoints
          .filter(wp => wp.name.trim())
          .map((wp, i) => ({
            name: wp.name.trim(),
            lat: parseFloat(wp.lat) || 0,
            lng: parseFloat(wp.lng) || 0,
            note: wp.note.trim() || undefined,
            order: i,
          })),
        totalDistance: parseFloat(totalDistance),
        duration: parseInt(duration, 10),
      };

      const trip = addTrip(data);
      navigate(`/trips/${trip.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">规划新行程</h1>
        <p className="mt-1 text-sm text-zinc-400">记录你的骑行路线和途经点</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card card-padding space-y-4">
          <h2 className="text-sm font-semibold">基本信息</h2>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">行程名称 *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="例：周末环太湖骑行"
              className={cn('input-field', errors.name && 'border-red-500/50')}
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-300">日期 *</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className={cn('input-field', errors.date && 'border-red-500/50')}
              />
              {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-300">类别</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as TripCategory)}
                className="input-field"
              >
                {ALL_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{TRIP_CATEGORY_LABELS[cat]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-300">总距离 (km) *</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={totalDistance}
                onChange={e => setTotalDistance(e.target.value)}
                placeholder="例：120"
                className={cn('input-field', errors.totalDistance && 'border-red-500/50')}
              />
              {errors.totalDistance && <p className="mt-1 text-xs text-red-400">{errors.totalDistance}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-300">时长 (分钟) *</label>
              <input
                type="number"
                min="1"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="例：180"
                className={cn('input-field', errors.duration && 'border-red-500/50')}
              />
              {errors.duration && <p className="mt-1 text-xs text-red-400">{errors.duration}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">描述</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="行程简要描述..."
              rows={3}
              className="input-field resize-none"
            />
          </div>
        </div>

        <div className="card card-padding space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">途经点</h2>
            <button type="button" onClick={addWaypoint} className="btn-secondary text-xs">
              + 添加途经点
            </button>
          </div>
          {errors.waypoints && <p className="text-xs text-red-400">{errors.waypoints}</p>}

          <div className="space-y-3">
            {waypoints.map((wp, i) => (
              <div key={i} className="rounded-lg border border-border bg-black/15 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-300">途经点 {i + 1}</span>
                  {waypoints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWaypoint(i)}
                      className="text-xs text-red-400 hover:text-red-300 transition"
                    >
                      移除
                    </button>
                  )}
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <input
                    type="text"
                    value={wp.name}
                    onChange={e => updateWaypoint(i, 'name', e.target.value)}
                    placeholder="名称"
                    className="input-field sm:col-span-1"
                  />
                  <input
                    type="number"
                    step="any"
                    value={wp.lat}
                    onChange={e => updateWaypoint(i, 'lat', e.target.value)}
                    placeholder="纬度"
                    className="input-field"
                  />
                  <input
                    type="number"
                    step="any"
                    value={wp.lng}
                    onChange={e => updateWaypoint(i, 'lng', e.target.value)}
                    placeholder="经度"
                    className="input-field"
                  />
                </div>
                <input
                  type="text"
                  value={wp.note}
                  onChange={e => updateWaypoint(i, 'note', e.target.value)}
                  placeholder="备注（可选）"
                  className="input-field text-xs"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="card card-padding">
          <h2 className="text-sm font-semibold">地图预览</h2>
          <div className="mt-3 aspect-[16/9] w-full rounded-lg border border-border bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-emerald-500/10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl">🗺</div>
              <p className="mt-2 text-xs text-zinc-500">地图集成即将推出</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
            取消
          </button>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? '保存中...' : '保存行程'}
          </button>
        </div>
      </form>
    </div>
  );
}
