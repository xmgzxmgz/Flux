/**
 * Unit tests for useTrips hook logic (pure functions).
 * Tests the localStorage persistence logic without React rendering.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

const STORAGE_KEY = 'flux-trips'

// Extract pure functions from useTrips.ts for unit testing
function loadTrips() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveTrips(trips: unknown[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips))
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
  }
})()

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock })

describe('loadTrips', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('should return empty array when localStorage is empty', () => {
    const trips = loadTrips()
    expect(trips).toEqual([])
  })

  it('should parse stored trips from localStorage', () => {
    const mockTrips = [
      { id: '1', name: 'Mountain Ride', category: 'weekend' },
      { id: '2', name: 'Coastal Tour', category: 'touring' },
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTrips))
    const trips = loadTrips()
    expect(trips).toHaveLength(2)
    expect(trips[0].name).toBe('Mountain Ride')
    expect(trips[1].category).toBe('touring')
  })

  it('should return empty array on invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json{{{')
    const trips = loadTrips()
    expect(trips).toEqual([])
  })
})

describe('saveTrips', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('should save trips to localStorage as JSON', () => {
    const trips = [{ id: '1', name: 'Test Trip' }]
    saveTrips(trips)
    const stored = localStorage.getItem(STORAGE_KEY)
    expect(JSON.parse(stored!)).toEqual(trips)
  })

  it('should overwrite previous data', () => {
    saveTrips([{ id: '1' }])
    saveTrips([{ id: '2' }, { id: '3' }])
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored).toHaveLength(2)
    expect(stored[0].id).toBe('2')
  })

  it('should handle empty array', () => {
    saveTrips([])
    expect(localStorage.getItem(STORAGE_KEY)).toBe('[]')
  })
})

describe('generateId', () => {
  it('should generate a non-empty string', () => {
    const id = generateId()
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
  })

  it('should generate unique ids', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()))
    expect(ids.size).toBe(100)
  })
})
