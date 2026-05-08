'use client'

import { useState, useEffect, useCallback } from 'react'
import { debounce } from './utils'

/**
 * Custom hook for managing navbar scroll state
 * Tracks whether the user has scrolled past a threshold (default: 20px)
 *
 * @param threshold - Scroll position threshold in pixels (default: 20)
 * @returns Tuple of [scrolled boolean, cleanup function]
 *
 * @example
 * const [scrolled, cleanup] = useScrollState()
 * // Use scrolled state to conditionally apply styles
 * // cleanup is called automatically on unmount
 */
export function useScrollState(threshold: number = 20): [boolean, () => void] {
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return

    const isScrolled = window.scrollY > threshold
    setScrolled(isScrolled)
  }, [threshold])

  useEffect(() => {
    // Add scroll event listener with debounce for performance
    const debouncedScroll = debounce(handleScroll, 10)
    window.addEventListener('scroll', debouncedScroll, { passive: true })

    // Cleanup function
    const cleanup = () => {
      window.removeEventListener('scroll', debouncedScroll)
    }

    return cleanup
  }, [handleScroll])

  const reset = useCallback(() => {
    setScrolled(false)
  }, [])

  return [scrolled, reset]
}

/**
 * Custom hook for tracking scroll position
 * Returns the current vertical scroll position in pixels
 *
 * @returns Current scroll Y position
 *
 * @example
 * const scrollY = useScrollPosition()
 * // Use scrollY to trigger animations or change styles based on scroll
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = debounce(() => {
      setScrollY(window.scrollY)
    }, 10)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollY
}

/**
 * Custom hook for detecting if an element is in viewport
 * Useful for triggering animations when elements become visible
 *
 * @param ref - React ref to the element to observe
 * @param options - IntersectionObserver options
 * @returns Boolean indicating if element is in viewport
 *
 * @example
 * const ref = useRef(null)
 * const isVisible = useInView(ref)
 * // Use isVisible to trigger animations
 */
export function useInView(
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
): boolean {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, options)

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isInView
}

/**
 * Custom hook for managing window size
 * Returns current window dimensions
 *
 * @returns Object with width and height properties
 *
 * @example
 * const { width, height } = useWindowSize()
 * // Use to conditionally render based on screen size
 */
export function useWindowSize(): { width: number; height: number } {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, 150)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

/**
 * Custom hook for managing media query state
 * Returns boolean indicating if media query matches
 *
 * @param query - Media query string (e.g., '(max-width: 768px)')
 * @returns Boolean indicating if media query matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 640px)')
 * // Use to conditionally render mobile-specific components
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)

    // Create listener
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Add listener (use addEventListener for better browser support)
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

/**
 * Custom hook for managing local storage
 * Syncs state with localStorage
 *
 * @param key - Storage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns Tuple of [value, setValue]
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'dark')
 * // Value is automatically synced to localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(value))
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key]
  )

  return [storedValue, setValue]
}
