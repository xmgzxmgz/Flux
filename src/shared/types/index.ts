export interface Waypoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  note?: string;
  order: number;
}

export interface Trip {
  id: string;
  name: string;
  date: string;
  description: string;
  category: TripCategory;
  waypoints: Waypoint[];
  totalDistance: number; // km
  duration: number; // minutes
  createdAt: string;
  updatedAt: string;
}

export type TripCategory = 'weekend' | 'long-ride' | 'touring' | 'commute' | 'other';

export const TRIP_CATEGORY_LABELS: Record<TripCategory, string> = {
  'weekend': '周末骑行',
  'long-ride': '长途骑行',
  'touring': '摩旅',
  'commute': '通勤',
  'other': '其他',
};

export const TRIP_CATEGORY_COLORS: Record<TripCategory, string> = {
  'weekend': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'long-ride': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'touring': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'commute': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'other': 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
};
