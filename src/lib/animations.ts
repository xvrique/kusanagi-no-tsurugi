/**
 * Framer Motion animation variants for the Kusanagi website
 * Provides reusable animation configurations for entrance, hover, and scroll effects
 */

import { Variants } from 'framer-motion'

// ============================================================================
// ENTRANCE ANIMATIONS
// ============================================================================

/**
 * Fade in animation
 * Simple opacity transition from 0 to 1
 */
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

/**
 * Slide in from top animation
 * Combines vertical movement with fade
 */
export const slideInFromTopVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

/**
 * Slide in from bottom animation
 * Combines vertical movement with fade
 */
export const slideInFromBottomVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

/**
 * Slide in from left animation
 * Combines horizontal movement with fade
 */
export const slideInFromLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

/**
 * Slide in from right animation
 * Combines horizontal movement with fade
 */
export const slideInFromRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

/**
 * Scale in animation
 * Combines scale transformation with fade
 */
export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

/**
 * Staggered container for animating children sequentially
 * Use with staggerItemVariants for child animations
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/**
 * Staggered item animation
 * Use inside staggerContainerVariants for sequential child animations
 */
export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// ============================================================================
// HOVER EFFECTS
// ============================================================================

/**
 * Scale up on hover
 * Subtle scale increase for interactive elements
 */
export const hoverScaleVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

/**
 * Scale up more on hover
 * More pronounced scale increase for buttons
 */
export const hoverScaleLargeVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

/**
 * Lift effect on hover
 * Combines scale with upward movement
 */
export const hoverLiftVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
  },
  hover: {
    y: -8,
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

/**
 * Color shift on hover
 * Used for text and icon color changes
 */
export const hoverColorVariants: Variants = {
  rest: {
    color: 'currentColor',
  },
  hover: {
    color: '#C41E3A', // crimson
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

/**
 * Underline animation on hover
 * Expands underline from left to right
 */
export const hoverUnderlineVariants: Variants = {
  rest: {
    scaleX: 0,
    transformOrigin: 'left',
  },
  hover: {
    scaleX: 1,
    transformOrigin: 'left',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

// ============================================================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================================================

/**
 * Floating animation
 * Continuous up and down movement
 */
export const floatingVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

/**
 * Pulse animation
 * Continuous scale pulsing
 */
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

/**
 * Rotate animation
 * Continuous rotation
 */
export const rotateVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 8,
      ease: 'linear',
      repeat: Infinity,
    },
  },
}

/**
 * Shimmer animation
 * Horizontal light sweep effect
 */
export const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 3,
      ease: 'linear',
      repeat: Infinity,
    },
  },
}

// ============================================================================
// COMPLEX ANIMATIONS
// ============================================================================

/**
 * Title animation with character reveal
 * Staggered character appearance
 */
export const titleRevealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

/**
 * Character animation for title reveal
 */
export const characterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

/**
 * Expand animation for description panels
 * Used for mythology card descriptions
 */
export const expandVariants: Variants = {
  collapsed: {
    opacity: 0,
    height: 0,
    overflow: 'hidden',
  },
  expanded: {
    opacity: 1,
    height: 'auto',
    overflow: 'visible',
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

/**
 * Modal backdrop animation
 * Fade in with blur effect
 */
export const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(8px)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

/**
 * Page transition animation
 * Fade and slight scale for page changes
 */
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// ============================================================================
// ANIMATION PRESETS
// ============================================================================

/**
 * Preset for navbar entrance animation
 */
export const navbarEntrancePreset = {
  initial: 'hidden',
  animate: 'visible',
  variants: slideInFromTopVariants,
}

/**
 * Preset for hero section entrance animation
 */
export const heroEntrancePreset = {
  initial: 'hidden',
  animate: 'visible',
  variants: staggerContainerVariants,
}

/**
 * Preset for section entrance animation
 */
export const sectionEntrancePreset = {
  initial: 'hidden',
  animate: 'visible',
  variants: fadeInVariants,
}

/**
 * Preset for card hover animation
 */
export const cardHoverPreset = {
  initial: 'rest',
  whileHover: 'hover',
  variants: hoverLiftVariants,
}

/**
 * Preset for button hover animation
 */
export const buttonHoverPreset = {
  initial: 'rest',
  whileHover: 'hover',
  variants: hoverScaleVariants,
}

/**
 * Preset for floating animation
 */
export const floatingPreset = {
  animate: 'animate',
  variants: floatingVariants,
}

/**
 * Preset for pulsing animation
 */
export const pulsingPreset = {
  animate: 'animate',
  variants: pulseVariants,
}
