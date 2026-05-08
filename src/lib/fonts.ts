import { Space_Mono } from 'next/font/google'

/**
 * Space Mono font - used for body text, labels, and monospace content
 * Weights: 400 (regular), 700 (bold)
 */
export const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})
