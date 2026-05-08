import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 * Combines clsx for conditional classes with twMerge to handle Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a Solana token address for display with truncation
 * @param address - Full Solana address (44 characters)
 * @param displayLength - Number of characters to show (default: 8)
 * @returns Formatted address like "XXXX...XXXX"
 *
 * @example
 * formatTokenAddress('HzwqSEsf8kqWxW4949pVM5gT3svWmwazcsXH3MsFHwtJ')
 * // Returns: "Hzwq...HwtJ"
 */
export function formatTokenAddress(address: string, displayLength: number = 8): string {
  if (!address || address.length < displayLength) {
    return address
  }

  const half = displayLength / 2
  return `${address.slice(0, half)}...${address.slice(-half)}`
}

/**
 * Check if a string contains Japanese characters
 * Detects hiragana, katakana, and kanji characters
 * @param text - Text to check
 * @returns True if text contains Japanese characters
 *
 * @example
 * containsJapanese('こんにちは')  // Returns: true
 * containsJapanese('Hello')       // Returns: false
 * containsJapanese('こんにちは Hello') // Returns: true
 */
export function containsJapanese(text: string): boolean {
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g
  return japaneseRegex.test(text)
}

/**
 * Determine if user has scrolled past a specific element
 * @param elementId - ID of the element to check
 * @returns True if window.scrollY > element.offsetTop
 *
 * @example
 * isScrolledPast('about-section')  // Returns: true if scrolled past
 */
export function isScrolledPast(elementId: string): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  const element = document.getElementById(elementId)
  if (!element) return false

  return window.scrollY > element.offsetTop
}

/**
 * Debounce a function to limit how often it's called
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 *
 * @example
 * const debouncedScroll = debounce(() => console.log('scrolled'), 300)
 * window.addEventListener('scroll', debouncedScroll)
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

/**
 * Throttle a function to limit how often it's called
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 *
 * @example
 * const throttledScroll = throttle(() => console.log('scrolled'), 300)
 * window.addEventListener('scroll', throttledScroll)
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Validate Solana address format
 * Solana addresses are 44 characters long and use base58 encoding
 * @param address - Address to validate
 * @returns True if address appears to be valid Solana address
 *
 * @example
 * isValidSolanaAddress('HzwqSEsf8kqWxW4949pVM5gT3svWmwazcsXH3MsFHwtJ')  // Returns: true
 * isValidSolanaAddress('invalid')  // Returns: false
 */
export function isValidSolanaAddress(address: string): boolean {
  if (!address || address.length !== 44) {
    return false
  }

  // Base58 alphabet used by Solana
  const base58Alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  const base58Regex = new RegExp(`^[${base58Alphabet}]+$`)

  return base58Regex.test(address)
}

/**
 * Get the appropriate font family based on text content
 * Returns 'serif' for Japanese text, 'mono' for English
 * @param text - Text to analyze
 * @returns Font family class name
 *
 * @example
 * getFontFamily('こんにちは')  // Returns: 'font-serif'
 * getFontFamily('Hello')       // Returns: 'font-mono'
 */
export function getFontFamily(text: string): string {
  return containsJapanese(text) ? 'font-serif' : 'font-mono'
}

/**
 * Clamp a number between min and max values
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 *
 * @example
 * clamp(5, 0, 10)   // Returns: 5
 * clamp(-5, 0, 10)  // Returns: 0
 * clamp(15, 0, 10)  // Returns: 10
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Map a value from one range to another
 * @param value - Value to map
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns Mapped value
 *
 * @example
 * mapRange(5, 0, 10, 0, 100)  // Returns: 50
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}
