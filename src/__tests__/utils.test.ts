/**
 * Unit tests for utils.ts
 */
import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn (className merge utility)', () => {
  it('should merge single class', () => {
    expect(cn('text-red-500')).toBe('text-red-500')
  })

  it('should merge multiple classes', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toContain('text-red-500')
    expect(result).toContain('bg-blue-500')
  })

  it('should handle conditional classes', () => {
    const result = cn('base', false && 'hidden', 'visible')
    expect(result).toContain('base')
    expect(result).toContain('visible')
    expect(result).not.toContain('hidden')
  })

  it('should handle undefined and null gracefully', () => {
    const result = cn('base', undefined, null, 'end')
    expect(result).toContain('base')
    expect(result).toContain('end')
  })

  it('should merge conflicting tailwind classes (last wins)', () => {
    const result = cn('p-2', 'p-4')
    // tailwind-merge should resolve to p-4
    expect(result).toBe('p-4')
  })

  it('should handle empty input', () => {
    expect(cn('')).toBe('')
  })
})
