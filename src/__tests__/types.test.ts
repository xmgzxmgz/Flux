/**
 * Unit tests for shared types - category labels and colors.
 */
import { describe, it, expect } from 'vitest'
import {
  TRIP_CATEGORY_LABELS,
  TRIP_CATEGORY_COLORS,
  type TripCategory,
} from '@/shared/types'

const ALL_CATEGORIES: TripCategory[] = ['weekend', 'long-ride', 'touring', 'commute', 'other']

describe('TRIP_CATEGORY_LABELS', () => {
  it('should have labels for all categories', () => {
    for (const cat of ALL_CATEGORIES) {
      expect(TRIP_CATEGORY_LABELS[cat]).toBeDefined()
      expect(typeof TRIP_CATEGORY_LABELS[cat]).toBe('string')
      expect(TRIP_CATEGORY_LABELS[cat].length).toBeGreaterThan(0)
    }
  })

  it('should have exactly 5 category labels', () => {
    expect(Object.keys(TRIP_CATEGORY_LABELS)).toHaveLength(5)
  })
})

describe('TRIP_CATEGORY_COLORS', () => {
  it('should have colors for all categories', () => {
    for (const cat of ALL_CATEGORIES) {
      expect(TRIP_CATEGORY_COLORS[cat]).toBeDefined()
      expect(typeof TRIP_CATEGORY_COLORS[cat]).toBe('string')
      expect(TRIP_CATEGORY_COLORS[cat].length).toBeGreaterThan(0)
    }
  })

  it('should have exactly 5 category colors', () => {
    expect(Object.keys(TRIP_CATEGORY_COLORS)).toHaveLength(5)
  })

  it('should contain tailwind class-like values', () => {
    for (const cat of ALL_CATEGORIES) {
      // Each color string should contain bg- and text- tailwind utilities
      expect(TRIP_CATEGORY_COLORS[cat]).toMatch(/bg-/)
      expect(TRIP_CATEGORY_COLORS[cat]).toMatch(/text-/)
    }
  })
})
