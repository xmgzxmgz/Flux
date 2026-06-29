import { useState, useEffect, useCallback } from 'react';
import type { Trip, Waypoint } from '@/shared/types';

const STORAGE_KEY = 'flux-trips';

function loadTrips(): Trip[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTrips(trips: Trip[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export interface TripFormData {
  name: string;
  date: string;
  description: string;
  category: Trip['category'];
  waypoints: Omit<Waypoint, 'id'>[];
  totalDistance: number;
  duration: number;
}

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>(loadTrips);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveTrips(trips);
    }
  }, [trips, isLoaded]);

  const addTrip = useCallback((data: TripFormData): Trip => {
    const now = new Date().toISOString();
    const trip: Trip = {
      id: generateId(),
      name: data.name,
      date: data.date,
      description: data.description,
      category: data.category,
      waypoints: data.waypoints.map((wp, i) => ({
        ...wp,
        id: generateId() + i,
      })),
      totalDistance: data.totalDistance,
      duration: data.duration,
      createdAt: now,
      updatedAt: now,
    };
    setTrips(prev => [trip, ...prev]);
    return trip;
  }, []);

  const updateTrip = useCallback((id: string, data: Partial<TripFormData>): void => {
    setTrips(prev =>
      prev.map(trip =>
        trip.id === id
          ? {
              ...trip,
              ...data,
              waypoints: data.waypoints
                ? data.waypoints.map((wp, i) => ({ ...wp, id: generateId() + i }))
                : trip.waypoints,
              updatedAt: new Date().toISOString(),
            }
          : trip
      )
    );
  }, []);

  const deleteTrip = useCallback((id: string): void => {
    setTrips(prev => prev.filter(trip => trip.id !== id));
  }, []);

  const getTrip = useCallback((id: string): Trip | undefined => {
    return trips.find(trip => trip.id === id);
  }, [trips]);

  const clearAll = useCallback((): void => {
    setTrips([]);
  }, []);

  const exportData = useCallback((): string => {
    return JSON.stringify(trips, null, 2);
  }, [trips]);

  const importData = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json) as Trip[];
      if (!Array.isArray(parsed)) return false;
      setTrips(parsed);
      return true;
    } catch {
      return false;
    }
  }, []);

  const getStats = useCallback(() => {
    const totalTrips = trips.length;
    const totalDistance = trips.reduce((sum, t) => sum + t.totalDistance, 0);
    const totalDuration = trips.reduce((sum, t) => sum + t.duration, 0);
    const totalWaypoints = trips.reduce((sum, t) => sum + t.waypoints.length, 0);
    return { totalTrips, totalDistance, totalDuration, totalWaypoints };
  }, [trips]);

  return {
    trips,
    addTrip,
    updateTrip,
    deleteTrip,
    getTrip,
    clearAll,
    exportData,
    importData,
    getStats,
  };
}
