# Component Library Reference

Quick reference guide for using the Kusanagi UI component library and utilities.

## UI Components

### Button

Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui/Button'

// Primary button (default)
<Button>Click me</Button>

// Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Disabled state
<Button disabled>Disabled</Button>

// With onClick handler
<Button onClick={() => console.log('clicked')}>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `disabled`: boolean
- All standard HTML button attributes

---

### Card

Flexible card component for content containers.

```tsx
import { Card } from '@/components/ui/Card'

// Basic card
<Card>Card content</Card>

// With border (default)
<Card bordered={true}>Bordered card</Card>

// Dark theme
<Card dark={true}>Dark card</Card>

// With scanlines effect
<Card scanlines={true}>Scanlines card</Card>

// Combined
<Card dark={true} scanlines={true} bordered={true}>
  Dark card with scanlines
</Card>

// Custom styling
<Card className="p-6 rounded-lg">
  Custom styled card
</Card>
```

**Props:**
- `bordered`: boolean (default: true)
- `dark`: boolean (default: false)
- `scanlines`: boolean (default: false)
- All standard HTML div attributes

---

### Badge

Tag and label component for highlighting content.

```tsx
import { Badge } from '@/components/ui/Badge'

// Default variant (crimson)
<Badge>Default</Badge>

// Different variants
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="dark">Dark</Badge>

// Custom styling
<Badge className="ml-2">Custom badge</Badge>
```

**Props:**
- `variant`: 'default' | 'secondary' | 'outline' | 'dark' (default: 'default')
- All standard HTML span attributes

---

### Container

Section wrapping component with responsive max-width.

```tsx
import { Container } from '@/components/ui/Container'

// Default size (lg)
<Container>
  <h1>Section content</h1>
</Container>

// Different sizes
<Container size="sm">Small container</Container>
<Container size="md">Medium container</Container>
<Container size="lg">Large container</Container>
<Container size="xl">Extra large container</Container>
<Container size="full">Full width</Container>

// With custom styling
<Container className="py-16">
  <h1>Responsive section</h1>
</Container>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full' (default: 'lg')
- All standard HTML div attributes

---

## Utility Functions

### formatTokenAddress()

Format Solana token address with truncation.

```tsx
import { formatTokenAddress } from '@/lib/utils'

const address = 'HzwqSEsf8kqWxW4949pVM5gT3svWmwazcsXH3MsFHwtJ'
const formatted = formatTokenAddress(address)
// Returns: "Hzwq...HwtJ"

// Custom display length
const custom = formatTokenAddress(address, 12)
// Returns: "HzwqSEsf...MsFHwtJ"
```

---

### containsJapanese()

Detect if text contains Japanese characters.

```tsx
import { containsJapanese } from '@/lib/utils'

containsJapanese('こんにちは')        // true
containsJapanese('Hello')             // false
containsJapanese('こんにちは Hello')  // true
```

---

### isValidSolanaAddress()

Validate Solana address format.

```tsx
import { isValidSolanaAddress } from '@/lib/utils'

isValidSolanaAddress('HzwqSEsf8kqWxW4949pVM5gT3svWmwazcsXH3MsFHwtJ')  // true
isValidSolanaAddress('invalid')                                        // false
```

---

### getFontFamily()

Get appropriate font family based on text content.

```tsx
import { getFontFamily } from '@/lib/utils'

getFontFamily('こんにちは')  // 'font-serif'
getFontFamily('Hello')       // 'font-mono'
```

---

### isScrolledPast()

Check if user has scrolled past an element.

```tsx
import { isScrolledPast } from '@/lib/utils'

const isPast = isScrolledPast('about-section')
// Returns: true if scrolled past element with id="about-section"
```

---

### debounce()

Debounce a function to limit call frequency.

```tsx
import { debounce } from '@/lib/utils'

const handleScroll = debounce(() => {
  console.log('scrolled')
}, 300)

window.addEventListener('scroll', handleScroll)
```

---

### throttle()

Throttle a function to limit call frequency.

```tsx
import { throttle } from '@/lib/utils'

const handleResize = throttle(() => {
  console.log('resized')
}, 300)

window.addEventListener('resize', handleResize)
```

---

### clamp()

Clamp a number between min and max values.

```tsx
import { clamp } from '@/lib/utils'

clamp(5, 0, 10)   // 5
clamp(-5, 0, 10)  // 0
clamp(15, 0, 10)  // 10
```

---

### mapRange()

Map a value from one range to another.

```tsx
import { mapRange } from '@/lib/utils'

mapRange(5, 0, 10, 0, 100)  // 50
mapRange(0, -10, 10, 0, 100) // 50
```

---

## Custom Hooks

### useScrollState()

Track if user has scrolled past threshold.

```tsx
'use client'
import { useScrollState } from '@/lib/hooks'

export default function Navbar() {
  const [scrolled, reset] = useScrollState(20)

  return (
    <nav className={scrolled ? 'bg-cream' : 'bg-parchment'}>
      {/* Navbar content */}
    </nav>
  )
}
```

**Returns:** `[scrolled: boolean, reset: () => void]`

---

### useScrollPosition()

Get current scroll position.

```tsx
'use client'
import { useScrollPosition } from '@/lib/hooks'

export default function ScrollIndicator() {
  const scrollY = useScrollPosition()

  return <div>Scrolled {scrollY}px</div>
}
```

**Returns:** `number` (current scroll Y position)

---

### useInView()

Detect if element is in viewport.

```tsx
'use client'
import { useRef } from 'react'
import { useInView } from '@/lib/hooks'
import { motion } from 'framer-motion'

export default function Section() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <motion.div
      ref={ref}
      animate={isInView ? 'visible' : 'hidden'}
    >
      Content
    </motion.div>
  )
}
```

**Returns:** `boolean` (is element in viewport)

---

### useWindowSize()

Track window dimensions.

```tsx
'use client'
import { useWindowSize } from '@/lib/hooks'

export default function ResponsiveComponent() {
  const { width, height } = useWindowSize()

  return (
    <div>
      Window size: {width}x{height}
    </div>
  )
}
```

**Returns:** `{ width: number; height: number }`

---

### useMediaQuery()

Check if media query matches.

```tsx
'use client'
import { useMediaQuery } from '@/lib/hooks'

export default function ResponsiveLayout() {
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <div>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  )
}
```

**Returns:** `boolean` (does media query match)

---

### useLocalStorage()

Sync state with localStorage.

```tsx
'use client'
import { useLocalStorage } from '@/lib/hooks'

export default function ThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark')

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Current theme: {theme}
    </button>
  )
}
```

**Returns:** `[value: T, setValue: (value: T) => void]`

---

## Animation Variants

### Entrance Animations

```tsx
import { motion } from 'framer-motion'
import {
  fadeInVariants,
  slideInFromTopVariants,
  slideInFromBottomVariants,
  slideInFromLeftVariants,
  slideInFromRightVariants,
  scaleInVariants,
} from '@/lib/animations'

// Fade in
<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInVariants}
>
  Content
</motion.div>

// Slide from top
<motion.div
  initial="hidden"
  animate="visible"
  variants={slideInFromTopVariants}
>
  Content
</motion.div>
```

---

### Hover Effects

```tsx
import { motion } from 'framer-motion'
import {
  hoverScaleVariants,
  hoverLiftVariants,
  hoverColorVariants,
} from '@/lib/animations'

// Scale on hover
<motion.button
  initial="rest"
  whileHover="hover"
  variants={hoverScaleVariants}
>
  Hover me
</motion.button>

// Lift on hover
<motion.div
  initial="rest"
  whileHover="hover"
  variants={hoverLiftVariants}
>
  Card
</motion.div>
```

---

### Continuous Animations

```tsx
import { motion } from 'framer-motion'
import {
  floatingVariants,
  pulseVariants,
  rotateVariants,
} from '@/lib/animations'

// Floating animation
<motion.div
  animate="animate"
  variants={floatingVariants}
>
  Floating content
</motion.div>

// Pulsing animation
<motion.div
  animate="animate"
  variants={pulseVariants}
>
  Pulsing content
</motion.div>
```

---

### Staggered Animations

```tsx
import { motion } from 'framer-motion'
import {
  staggerContainerVariants,
  staggerItemVariants,
} from '@/lib/animations'

<motion.div
  initial="hidden"
  animate="visible"
  variants={staggerContainerVariants}
>
  <motion.div variants={staggerItemVariants}>Item 1</motion.div>
  <motion.div variants={staggerItemVariants}>Item 2</motion.div>
  <motion.div variants={staggerItemVariants}>Item 3</motion.div>
</motion.div>
```

---

## Responsive Design

### Breakpoints

```
xs:  320px   (Extra small phones)
sm:  640px   (Small phones)
md:  768px   (Tablets)
lg:  1024px  (Small laptops)
xl:  1280px  (Desktops)
2xl: 1536px  (Large desktops)
```

### Responsive Classes

```tsx
// Responsive text size
<h1 className="text-2xl md:text-4xl lg:text-6xl">
  Responsive heading
</h1>

// Responsive padding
<div className="p-4 md:p-8 lg:p-16">
  Responsive padding
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Responsive display
<div className="hidden md:block">
  Only visible on tablet and up
</div>
```

---

## Color Palette

```
cream:    #F0EDE6  (Primary background)
ink:      #1A1714  (Primary text)
crimson:  #C41E3A  (Accent color)
parchment: #E8E3D9 (Secondary background)
darkInk:  #0D0B09  (Dark background)
ashGray:  #9E9A94  (Secondary text)
bloodRed: #8B0000  (Dark accent)
gold:     #B8960C  (Highlight)
```

---

## Typography

```
Font families:
- font-mono:  Space Mono (body text, labels)
- font-serif: Noto Serif JP (Japanese text)

Letter spacing:
- tracking-tight:  -0.02em
- tracking-normal: 0em
- tracking-wide:   0.05em
- tracking-wider:  0.1em
```

---

## Common Patterns

### Responsive Container

```tsx
import { Container } from '@/components/ui/Container'

<Container size="lg" className="py-8 md:py-16 lg:py-24">
  <h1 className="text-2xl md:text-4xl lg:text-6xl">
    Section Title
  </h1>
  <p className="text-sm md:text-base lg:text-lg">
    Section content
  </p>
</Container>
```

### Card with Hover Effect

```tsx
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { hoverLiftVariants } from '@/lib/animations'

<motion.div
  initial="rest"
  whileHover="hover"
  variants={hoverLiftVariants}
>
  <Card>
    Card content
  </Card>
</motion.div>
```

### Animated Section

```tsx
import { motion } from 'framer-motion'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations'

<motion.section
  initial="hidden"
  animate="visible"
  variants={staggerContainerVariants}
>
  <motion.h2 variants={staggerItemVariants}>Title</motion.h2>
  <motion.p variants={staggerItemVariants}>Content</motion.p>
</motion.section>
```

---

## Best Practices

1. **Always use `'use client'`** when using hooks in components
2. **Use Container** for section wrapping to maintain consistent max-width
3. **Use Button** for all interactive elements instead of plain `<button>`
4. **Use Card** for content containers to maintain consistent styling
5. **Use Badge** for tags and labels
6. **Debounce scroll/resize** events for performance
7. **Use responsive classes** instead of media queries in CSS
8. **Test on mobile** - use `useMediaQuery` or device emulation
9. **Prefer Framer Motion variants** over inline animations
10. **Use TypeScript** for type safety with components

---

## Troubleshooting

### Components not rendering
- Ensure you're using `'use client'` directive in client components
- Check that imports are correct: `@/components/ui/ComponentName`

### Animations not working
- Verify Framer Motion is installed: `npm install framer-motion`
- Ensure you're using `motion.div` or `motion.button` from Framer Motion
- Check that variants are properly defined

### Responsive design not working
- Use mobile-first approach (smallest to largest)
- Test with actual device or browser dev tools
- Use `useMediaQuery` hook for JavaScript-based responsive logic

### Scroll hooks not working
- Ensure component has `'use client'` directive
- Check that window object is available (not SSR)
- Verify event listeners are being attached

---

## Additional Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/)
