# 🗡️ KUSANAGI NO TSURUGI ($NAGI) — Agentic AI Build Prompt
## Next.js Meme Coin Website — Full Project Blueprint

---

## 🎯 CONTEXT & OBJECTIVE

Build a **production-ready Next.js website** for a Solana meme coin called **Kusanagi no Tsurugi ($NAGI)**. This is a mythological-themed meme coin based on the legendary Japanese sword "Kusanagi-no-Tsurugi" (草薙の剣) — one of the three Imperial Treasures of Japan.

The visual identity draws from **Japanese mythology meets retro-futurism**: cream/bone paper textures, brutal editorial typography mixing Japanese kanji with Latin characters, blood-red accents, bordered card panels with scan lines, and a dark punk-academic aesthetic — similar to a high-end Japanese mythology museum exhibition website fused with underground cyberpunk zine culture.

---

## 🏗️ PROJECT SETUP

### Initialize Project
```bash
npx create-next-app@latest nagi-coin --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd nagi-coin
```

### Install Dependencies
```bash
# Animation
npm install framer-motion

# Fonts (Google Fonts via next/font)
# Noto Serif JP, Space Mono, Sawarabi Mincho

# Solana wallet & token display
npm install @solana/web3.js

# Utilities
npm install clsx tailwind-merge

# 3D / particle effects
npm install three @react-three/fiber @react-three/drei

# Icons
npm install lucide-react
```

### Tailwind Config — tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F0EDE6',
        parchment: '#E8E3D9',
        ink: '#1A1714',
        crimson: '#C41E3A',
        bloodRed: '#8B0000',
        gold: '#B8960C',
        ashGray: '#9E9A94',
        darkInk: '#0D0B09',
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        serif: ['Noto Serif JP', 'serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'flicker': 'flicker 4s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.3' },
        },
        scanline: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 🎨 DESIGN SYSTEM

### Global CSS — src/app/globals.css
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Noto+Serif+JP:wght@300;400;700;900&family=Sawarabi+Mincho&display=swap');

:root {
  --cream: #F0EDE6;
  --parchment: #E8E3D9;
  --ink: #1A1714;
  --crimson: #C41E3A;
  --blood: #8B0000;
  --gold: #B8960C;
  --ash: #9E9A94;
  --dark: #0D0B09;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background-color: var(--cream);
  color: var(--ink);
  font-family: 'Space Mono', monospace;
  overflow-x: hidden;
}

/* Japanese paper texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  opacity: 0.5;
}

/* Scanline effect */
.scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.015) 2px,
    rgba(0,0,0,0.015) 4px
  );
  pointer-events: none;
}

/* Japanese border panel */
.panel-border {
  border: 1px solid var(--ink);
  position: relative;
}

.panel-border::before {
  content: '';
  position: absolute;
  inset: 3px;
  border: 0.5px solid rgba(26,23,20,0.3);
  pointer-events: none;
}

/* Red accent tag */
.tag-red {
  color: var(--crimson);
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.05em;
}

/* Kanji vertical text */
.kanji-vertical {
  writing-mode: vertical-rl;
  font-family: 'Noto Serif JP', serif;
  font-weight: 700;
  letter-spacing: 0.2em;
}

/* Selection */
::selection {
  background: var(--crimson);
  color: var(--cream);
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--parchment); }
::-webkit-scrollbar-thumb { background: var(--ink); }
```

---

## 📁 FILE STRUCTURE

```
src/
├── app/
│   ├── layout.tsx          ← Root layout with Navbar
│   ├── page.tsx            ← Home page (hero + all sections)
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      ← Sticky navigation
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx        ← Full-viewport hero section
│   │   ├── About.tsx       ← About $NAGI & sword mythology
│   │   ├── Tokenomics.tsx  ← Token distribution
│   │   ├── Mythology.tsx   ← Exhibition-style mythology cards
│   │   ├── Roadmap.tsx     ← Roadmap timeline
│   │   └── HowToBuy.tsx    ← How to buy section
│   ├── ui/
│   │   ├── MarqueeTicker.tsx   ← Scrolling text ticker
│   │   ├── MythologyCard.tsx   ← Exhibition card component
│   │   ├── PanelBorder.tsx     ← Reusable bordered panel
│   │   ├── SwordDivider.tsx    ← Decorative sword divider
│   │   └── CounterBadge.tsx    ← Numbered indicator (①②③)
│   └── effects/
│       ├── ParticleField.tsx   ← Background particle system
│       └── GlitchText.tsx      ← Glitch text animation
├── lib/
│   ├── constants.ts        ← Token info, links, addresses
│   └── utils.ts
└── public/
    ├── images/
    │   ├── sword-hero.png      ← Kusanagi sword artwork
    │   ├── sword-detail.png
    │   └── japanese-bg.png     ← Bamboo/paper texture
    └── fonts/                  ← Any custom fonts
```

---

## 🧩 COMPONENT SPECIFICATIONS

---

### 1. Navbar — `components/layout/Navbar.tsx`

**Design:** Fixed top bar. Cream background with subtle bottom border. Logo left (Japanese sun/wave icon + $NAGI text). Center nav links in Space Mono. Right CTA button with decorative asterisk (✳) symbols flanking text.

```tsx
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-sm border-b border-ink/20' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        {/* SVG: Japanese rising sun / wave symbol */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Concentric arc lines like Japanese rising sun */}
          <circle cx="16" cy="22" r="10" stroke="#1A1714" strokeWidth="1.5" fill="none"/>
          <path d="M6 22 Q16 10 26 22" stroke="#1A1714" strokeWidth="1.5" fill="none"/>
          <path d="M8 22 Q16 13 24 22" stroke="#1A1714" strokeWidth="1" fill="none"/>
          <circle cx="16" cy="22" r="3" fill="#C41E3A"/>
        </svg>
        <span className="font-mono font-bold text-sm tracking-widest">草薙の剣</span>
      </div>

      {/* Center Links */}
      <div className="flex items-center gap-8">
        {['about', 'mythology', 'tokenomics', 'roadmap'].map((link) => (
          <Link
            key={link}
            href={`#${link}`}
            className="font-mono text-xs tracking-widest text-ink/70 hover:text-ink transition-colors hover:text-crimson"
          >
            {link}
          </Link>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="https://raydium.io" // replace with actual DEX link
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 border border-ink px-5 py-2 font-mono text-xs tracking-widest hover:bg-ink hover:text-cream transition-all duration-200 group"
      >
        <span className="text-crimson group-hover:text-cream transition-colors">✳</span>
        buy $nagi
        <span className="text-crimson group-hover:text-cream transition-colors">✳</span>
      </a>
    </motion.nav>
  )
}
```

---

### 2. Hero Section — `components/sections/Hero.tsx`

**Design:** Full viewport. Large brutalist title "KUSANAGI NO TSURUGI" spanning full width. Left panel: token description with Japanese kanji (草薙の剣) label, contract address, mythology text. Center: dramatic sword illustration or 3D rotating sword. Right: secondary decorative element. Bottom: scrolling Japanese text ticker. Numbered indicators (1, 2, 3) on right edge.

**Key elements:**
- Giant display text with mixed fonts and red circle replacing a letter's dot (like the "O" in HISTORY replaced by ⊙)
- Left text block with label `(草薙の剣)` in brackets
- Body text: mythology description of Kusanagi sword
- Tag marquee at bottom: `草薙の剣 / ✦ / $NAGI / ✦ / KUSANAGI / ✦ / ソラナ / ✦` repeating
- "discover" button (dark pill with arrow icons on both sides)
- Small text bottom-right: "FORGED IN MYTH. MINTED ON SOLANA."
- Numbered circle pills (①②③) for slide indicators

```tsx
'use client'
import { motion } from 'framer-motion'
import MarqueeTicker from '@/components/ui/MarqueeTicker'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-cream pt-20">
      {/* Background bamboo texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'url(/images/japanese-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Main layout */}
      <div className="relative flex-1 flex flex-col px-8 md:px-12 lg:px-16">
        
        {/* Giant Title */}
        <motion.div
          className="relative mt-8 mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* 
            TYPOGRAPHY: Use a heavy condensed display font.
            The title "KUSANAGI NO TSURUGI" should span nearly full width.
            Mix in a red ⊙ for the "O" in TSURUGI.
            Add a thin horizontal line beneath.
          */}
          <h1
            className="font-mono font-bold uppercase leading-none tracking-tighter"
            style={{ fontSize: 'clamp(40px, 8vw, 100px)' }}
          >
            KUSANAGI NO TSU
            <span className="relative inline-block">
              <span className="text-crimson">⊙</span>
            </span>
            RUGI
          </h1>
          {/* Japanese subtitle below title */}
          <div className="flex items-center gap-4 mt-2">
            <span className="font-serif text-sm text-ash tracking-widest">草薙の剣</span>
            <div className="h-px flex-1 bg-ink/20" />
            <span className="font-mono text-xs text-ash">$NAGI</span>
          </div>
        </motion.div>

        {/* Three-column content area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-0 relative">
          
          {/* LEFT COLUMN: Description */}
          <motion.div
            className="flex flex-col justify-center pr-8 py-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {/* Artifact label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-ink/50 uppercase tracking-[0.3em]">
                KUSANAGI — IN MYTHOLOGY
              </span>
              <span className="font-serif text-xs text-ash">（草薙）</span>
            </div>

            {/* Description grid — brutalist layout with varied columns */}
            <div className="font-mono text-xs leading-relaxed text-ink/80 mb-6">
              <div className="grid grid-cols-3 gap-x-2 gap-y-1">
                <span className="text-crimson col-span-3">THE SACRED SWORD OF</span>
                <span className="col-span-3">JAPANESE LEGEND /</span>
                <span>WIELDED</span>
                <span>BY</span>
                <span>YAMATO</span>
                <span className="text-crimson">TAKERU</span>
                <span>/</span>
                <span>PRINCE</span>
                <span className="col-span-3">OF THE ANCIENT REALM.</span>
                <span className="text-crimson col-span-3">FOUND WITHIN A SERPENT.</span>
              </div>
            </div>

            {/* Contract address */}
            <div className="panel-border p-3 mb-6 bg-ink/5">
              <p className="font-mono text-[9px] text-ash mb-1 uppercase tracking-widest">Contract Address</p>
              <p className="font-mono text-[10px] text-ink break-all">
                {/* Replace with actual contract address */}
                NAGiXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              </p>
            </div>

            {/* Discover button */}
            <motion.a
              href="#about"
              className="inline-flex items-center gap-3 bg-ink text-cream px-6 py-3 font-mono text-xs tracking-widest w-fit hover:bg-crimson transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>⟨</span>
              discover
              <span>⟩</span>
            </motion.a>
          </motion.div>

          {/* CENTER COLUMN: Sword artwork */}
          <motion.div
            className="relative flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            {/* 
              SWORD IMAGE: Display the Kusanagi sword artwork here.
              Use a dramatic composite — sword emerging from storm clouds.
              Apply CSS: object-fit: cover, slight grayscale with red tint on hover.
            */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/images/sword-hero.png"
                alt="Kusanagi no Tsurugi"
                className="w-full h-full object-contain mix-blend-multiply opacity-90 animate-float"
                style={{ maxHeight: '70vh', filter: 'contrast(1.1)' }}
              />
              {/* Glow / halo effect beneath sword */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 rounded-full blur-2xl opacity-20"
                style={{ background: 'radial-gradient(ellipse, #C41E3A, transparent)' }}
              />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Secondary art + decorative */}
          <motion.div
            className="flex flex-col justify-between pl-8 py-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {/* Secondary sword/artifact image */}
            <div className="panel-border p-2 mb-4">
              <img
                src="/images/sword-detail.png"
                alt="Sword detail"
                className="w-full object-cover"
                style={{ height: '180px', filter: 'sepia(30%) contrast(1.1)' }}
              />
            </div>

            {/* Numbered indicators */}
            <div className="flex flex-col gap-2 items-end mb-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`w-7 h-7 rounded-full border flex items-center justify-center font-mono text-xs cursor-pointer transition-all ${
                    n === 1
                      ? 'bg-crimson border-crimson text-cream'
                      : 'border-ink/30 text-ink/50 hover:border-crimson hover:text-crimson'
                  }`}
                >
                  {n}
                </div>
              ))}
            </div>

            {/* Bottom-right mythology quote */}
            <div>
              <p className="font-mono text-[10px] text-ink/70 text-right leading-relaxed">
                THEY{' '}
                <span className="text-crimson">FEAR</span>
                {' '}THIS BLADE.{' '}
                <br />
                SOME LEGENDS SAY IT{' '}
                <span className="text-crimson">CUTS</span>
                {' '}THE WIND.
              </p>
              {/* Compass/target icon */}
              <div className="flex justify-end mt-2">
                <div className="w-8 h-8 rounded-full border border-ink/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-ink/30" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom marquee ticker */}
        <MarqueeTicker />
      </div>
    </section>
  )
}
```

---

### 3. MarqueeTicker — `components/ui/MarqueeTicker.tsx`

**Design:** Horizontal scrolling ticker like the Japanese text scroller in the reference images. Contains alternating Japanese/English text with symbols.

```tsx
export default function MarqueeTicker() {
  const items = [
    '草薙の剣', '✦', '$NAGI', '✦', 'KUSANAGI', '✦', 'ソラナ',
    '✦', 'SACRED SWORD', '✦', '神話', '✦', 'SOLANA', '✦',
    '伝説の剣', '✦', 'BUY $NAGI', '✦', '（ショット）', '✦',
  ]

  return (
    <div className="relative border-t border-b border-ink/20 py-2 overflow-hidden bg-ink/3 my-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`font-mono text-xs mx-4 tracking-widest ${
              item === '✦' ? 'text-crimson' : 'text-ink/60'
            } ${item.match(/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/) ? 'font-serif' : ''}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
```

---

### 4. Mythology Exhibition Section — `components/sections/Mythology.tsx`

**Design:** Reference Image 2 style. Three-column exhibition card layout. Each card has:
- Top: Japanese character label in brackets e.g. `（目）`
- Counter label: `0 / M1 ►`
- Main artwork (the legend's visual)
- Bottom: Name + red tag for translation
- Middle card (active/featured): Dark background (near-black), lighter content, `[CLOSE]` button, expanded text description

This section showcases 3 Kusanagi-related legends/aspects of Japanese mythology:

**Card 1 — YAMATO TAKERU（武）**
- Hero prince who wielded Kusanagi
- Image: illustration of a warrior

**Card 2 — OROCHI SERPENT（蛇）** ← Featured/Active card (dark)
- The 8-headed serpent from which Kusanagi was retrieved
- White circle symbol on dark background

**Card 3 — KUSANAGI BLADE（剣）**
- The blade itself, the sacred treasure
- Image: ornate sword detail

```tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MythologyCard from '@/components/ui/MythologyCard'

const MYTHS = [
  {
    id: 'M1',
    kanji: '武',
    name: 'YAMATO TAKERU',
    nameJp: '日本武尊',
    tag: '(HERO PRINCE)',
    description: 'Son of Emperor Keikō, the legendary warrior who received Kusanagi from his aunt Yamato-hime and used it to defeat enemies by cutting the grass.',
    imagePath: '/images/yamato-takeru.png',
    dark: false,
  },
  {
    id: 'M2',
    kanji: '蛇',
    name: 'YAMATA NO OROCHI',
    nameJp: '八岐大蛇',
    tag: '(EIGHT-HEADED SERPENT)',
    description: 'Yamata no Orochi (八岐大蛇) — a fearsome serpent deity of Japanese mythology. Eight heads, eight tails. Kusanagi was found within its body by the storm god Susanoo.',
    imagePath: null, // Use SVG circle symbol like reference
    dark: true, // Dark card
    featured: true,
  },
  {
    id: 'M3',
    kanji: '剣',
    name: 'KUSANAGI NO TSURUGI',
    nameJp: '草薙の剣',
    tag: '(GRASS-CUTTING SWORD)',
    description: 'One of the three Imperial Treasures of Japan. A legendary sword that cuts the wind itself. Now minted as $NAGI on Solana.',
    imagePath: '/images/kusanagi-sword.png',
    dark: false,
  },
]

export default function Mythology() {
  const [active, setActive] = useState('M2')

  return (
    <section id="mythology" className="relative py-24 px-8 bg-parchment overflow-hidden">
      {/* Section header */}
      <div className="flex items-baseline justify-between mb-12">
        <div>
          <span className="font-mono text-[10px] text-ash uppercase tracking-[0.4em]">
            — EXHIBITION —
          </span>
          <h2 className="font-mono text-3xl font-bold uppercase mt-1">
            MYTHOLOGY ARCHIVE
          </h2>
        </div>
        <span className="font-serif text-xl text-ash">神話の記録</span>
      </div>

      {/* Three cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MYTHS.map((myth) => (
          <MythologyCard
            key={myth.id}
            myth={myth}
            isActive={active === myth.id}
            onClick={() => setActive(myth.id)}
          />
        ))}
      </div>
    </section>
  )
}
```

---

### 5. MythologyCard — `components/ui/MythologyCard.tsx`

```tsx
'use client'
import { motion } from 'framer-motion'

interface Myth {
  id: string
  kanji: string
  name: string
  nameJp: string
  tag: string
  description: string
  imagePath: string | null
  dark?: boolean
  featured?: boolean
}

export default function MythologyCard({
  myth,
  isActive,
  onClick,
}: {
  myth: Myth
  isActive: boolean
  onClick: () => void
}) {
  const { dark } = myth

  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer overflow-hidden transition-all duration-300 ${
        dark
          ? 'bg-darkInk text-cream'
          : 'bg-cream text-ink border border-ink/20'
      }`}
      style={{ minHeight: '520px' }}
      whileHover={{ scale: 1.01 }}
      layout
    >
      {/* Scanlines on dark card */}
      {dark && <div className="scanlines absolute inset-0 pointer-events-none z-10" />}

      {/* Top header */}
      <div
        className={`flex items-center justify-between p-4 border-b ${
          dark ? 'border-cream/10' : 'border-ink/10'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={`font-mono text-xs ${dark ? 'text-cream/50' : 'text-ash'}`}>
            0 / {myth.id} ►
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-serif text-lg font-bold ${dark ? 'text-cream/20' : 'text-ink/20'}`}>
            （{myth.kanji}）
          </span>
          {isActive && dark && (
            <span className="font-mono text-[9px] text-cream/40 border border-cream/20 px-2 py-0.5">
              [FEATURED]
            </span>
          )}
        </div>
      </div>

      {/* Image area */}
      <div className="relative flex items-center justify-center" style={{ height: '280px' }}>
        {myth.imagePath ? (
          <img
            src={myth.imagePath}
            alt={myth.name}
            className="w-full h-full object-contain p-4"
            style={{
              filter: dark
                ? 'brightness(0.8) contrast(1.2)'
                : 'sepia(20%) contrast(1.1)',
            }}
          />
        ) : (
          /* Symbolic circle for the serpent — like reference image */
          <div className="relative w-48 h-48">
            <div className={`absolute inset-0 rounded-full border-2 ${dark ? 'border-cream/20' : 'border-ink/20'}`} />
            <div className={`absolute inset-4 rounded-full border ${dark ? 'border-cream/10' : 'border-ink/10'}`} />
            {/* Abstract serpent symbol */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-8 w-auto h-auto"
              fill="none"
            >
              <ellipse
                cx="50" cy="50" rx="30" ry="42"
                stroke={dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
                strokeWidth="2"
              />
              <line
                x1="30" y1="10" x2="70" y2="90"
                stroke={dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                strokeWidth="1.5"
              />
              <line
                x1="70" y1="10" x2="30" y2="90"
                stroke={dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                strokeWidth="1.5"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Bottom: Name + description */}
      <div className="p-4">
        <div className="flex items-baseline gap-2 mb-2">
          <h3 className="font-mono text-sm font-bold uppercase tracking-wider">
            {myth.name}
          </h3>
          <span className="font-mono text-[10px] text-crimson">{myth.tag}</span>
        </div>

        {/* Show description only when active */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p className={`font-mono text-xs leading-relaxed ${dark ? 'text-cream/60' : 'text-ink/60'}`}>
              <span className="text-crimson">{myth.name}</span>{' '}
              <span className={`font-serif text-xs ${dark ? 'text-cream/40' : 'text-ash'}`}>
                {myth.nameJp}
              </span>{' '}
              {myth.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Decorative border corner marks */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l ${dark ? 'border-crimson' : 'border-crimson'}`} />
      <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r ${dark ? 'border-crimson' : 'border-crimson'}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l ${dark ? 'border-crimson' : 'border-crimson'}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r ${dark ? 'border-crimson' : 'border-crimson'}`} />
    </motion.div>
  )
}
```

---

### 6. About Section — `components/sections/About.tsx`

**Design:** Reference Image 3 style. Three-column layout:
- **LEFT**: Large artwork panel (bordered) — dramatic sword/mythology illustration
- **CENTER**: Name display `KUSANAGI NO TSURUGI ($NAGI)` with Japanese subtitle. Below: scrolling name ticker in the middle (alternating names). Bottom: decorative retro-wave sun circle.
- **RIGHT**: Vertical kanji column text. Bottom: red kabuki/demon mask icon.

```tsx
'use client'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="relative py-0 bg-cream overflow-hidden">
      {/* Section label */}
      <div className="px-8 pt-16 pb-4">
        <span className="font-mono text-[10px] text-ash uppercase tracking-[0.4em]">
          — ABOUT THE LEGEND —
        </span>
      </div>

      {/* Three-column layout like reference image 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] min-h-[600px] border-t border-ink/10">

        {/* LEFT: Artwork */}
        <div className="relative border-r border-ink/10 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/kusanagi-art.png"
              alt="Kusanagi mythology artwork"
              className="w-full h-full object-cover"
              style={{ filter: 'sepia(15%) contrast(1.05)' }}
            />
            {/* Red stamp overlay */}
            <div className="absolute bottom-8 left-8">
              <div
                className="w-24 h-24 rounded-full border-4 border-crimson/60 flex items-center justify-center"
                style={{ transform: 'rotate(-15deg)' }}
              >
                <span className="font-serif text-crimson/60 text-xs text-center leading-tight">
                  草薙<br/>の剣
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER: Token info */}
        <div className="flex flex-col justify-between p-10 border-r border-ink/10">
          
          {/* Token name */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-mono font-bold text-2xl uppercase">
                KUSANAGI NO TSURUGI-B
                <span className="text-crimson">⊙</span>
                ⊙
              </h2>
            </div>
            <div className="font-serif text-sm text-ash mb-6">（草薙の剣）</div>

            {/* Name ticker */}
            <div className="border border-ink/10 overflow-hidden mb-6">
              <div className="flex items-center gap-3 py-2 px-4 border-b border-ink/10 text-[10px] font-mono text-ash">
                <span>♦</span>
                <span>►</span>
                <span className="text-crimson">（ショット）</span>
                <span>◄◄</span>
                <span>♦</span>
              </div>
              {/* Scrolling alternate names */}
              <div className="overflow-hidden">
                <div className="flex animate-marquee py-2 whitespace-nowrap">
                  {[
                    'KUSANAGI NO TSURUGI', '⊛', 'AMA NO MURAKUMO', '⊛',
                    '$NAGI', '⊛', '(ALSO KNOWN AS)', '⊛', 'GRASS-CUTTER', '⊛',
                    'KUSANAGI NO TSURUGI', '⊛', 'AMA NO MURAKUMO', '⊛',
                  ].map((t, i) => (
                    <span
                      key={i}
                      className={`mx-4 font-mono text-xs ${
                        t === '⊛' ? 'text-crimson' : 'text-ink/70'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* About text */}
            <p className="font-mono text-xs leading-relaxed text-ink/70 mb-8">
              <span className="text-crimson font-bold">KUSANAGI NO TSURUGI</span>{' '}
              <span className="font-serif text-ash text-xs">（草薙の剣）</span>{' '}
              is one of three Imperial Treasures of Japan. Originally called{' '}
              <span className="text-crimson">Ama-no-Murakumo-no-Tsurugi</span>{' '}
              (Sword of the Gathering Clouds of Heaven), it was found by storm god Susanoo
              inside the 8-headed serpent Yamata no Orochi. Now immortalized as{' '}
              <span className="text-crimson">$NAGI</span>{' '}
              on the Solana blockchain.
            </p>
          </div>

          {/* Retro wave sun */}
          <div className="flex justify-center">
            <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
              {/* Horizontal lines filling bottom of circle */}
              {[0, 6, 12, 18, 24, 30, 36, 42].map((y, i) => (
                <line
                  key={i}
                  x1={10 + i * 2}
                  y1={30 + y / 3}
                  x2={70 - i * 2}
                  y2={30 + y / 3}
                  stroke="#1A1714"
                  strokeWidth={0.5 + i * 0.1}
                  opacity={1 - i * 0.1}
                />
              ))}
              <semicircle />
              {/* Arc top */}
              <path
                d="M10 30 A30 30 0 0 1 70 30"
                stroke="#1A1714"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* RIGHT: Vertical kanji column */}
        <div className="flex flex-col justify-between items-center p-6 bg-ink text-cream">
          {/* Vertical Japanese text */}
          <div className="kanji-vertical font-serif text-sm leading-loose text-cream/70 flex-1">
            大きな神話の中の草薙の剣は伝説として残る
          </div>

          {/* Decorative mask/icon at bottom */}
          <div className="mt-6">
            {/* Abstract red demon/kabuki mask — SVG */}
            <svg width="60" height="70" viewBox="0 0 60 70" fill="none">
              {/* Stylized mask shape */}
              <path
                d="M30 5 C15 5 5 18 5 32 C5 48 15 60 30 65 C45 60 55 48 55 32 C55 18 45 5 30 5Z"
                fill="#8B0000"
                opacity="0.8"
              />
              {/* Eyes */}
              <ellipse cx="20" cy="28" rx="5" ry="6" fill="#F0EDE6" />
              <ellipse cx="40" cy="28" rx="5" ry="6" fill="#F0EDE6" />
              <ellipse cx="20" cy="29" rx="2.5" ry="3" fill="#1A1714" />
              <ellipse cx="40" cy="29" rx="2.5" ry="3" fill="#1A1714" />
              {/* Mouth line */}
              <path d="M18 45 Q30 52 42 45" stroke="#F0EDE6" strokeWidth="1.5" fill="none" />
              {/* Kanji on side */}
              <text x="3" y="50" fontSize="7" fill="rgba(240,237,230,0.3)" fontFamily="serif">
                剣
              </text>
              <text x="50" y="50" fontSize="7" fill="rgba(240,237,230,0.3)" fontFamily="serif">
                史
              </text>
            </svg>
          </div>
        </div>

      </div>
    </section>
  )
}
```

---

### 7. Tokenomics — `components/sections/Tokenomics.tsx`

**Design:** Japanese scroll/document aesthetic. Grid of stats with bordered panels. Include:
- Total supply: 1,000,000,000 $NAGI
- LP Burned: 100%
- Mint Revoked: ✓
- Tax: 0/0

Layout: 2x2 grid of stat panels, each with top label, large number, and Japanese translation.

```tsx
'use client'
import { motion } from 'framer-motion'

const STATS = [
  { label: 'TOTAL SUPPLY', value: '1,000,000,000', unit: '$NAGI', kanji: '総供給量', color: false },
  { label: 'LIQUIDITY BURNED', value: '100%', unit: 'BURNED', kanji: '流動性焼却', color: true },
  { label: 'MINT AUTHORITY', value: 'REVOKED', unit: '⊘', kanji: '鋳造権限', color: true },
  { label: 'BUY / SELL TAX', value: '0 / 0', unit: 'NO TAX', kanji: '税金なし', color: false },
]

const DISTRIBUTION = [
  { label: 'Public Sale', percent: 80, kanji: '公開販売' },
  { label: 'Liquidity Pool', percent: 15, kanji: '流動性' },
  { label: 'Marketing', percent: 5, kanji: 'マーケティング' },
]

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-24 px-8 bg-parchment">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="font-mono text-[10px] text-ash uppercase tracking-[0.4em]">
              — TOKEN DATA —
            </span>
            <h2 className="font-mono text-3xl font-bold uppercase mt-1">TOKENOMICS</h2>
          </div>
          <span className="font-serif text-xl text-ash">トークノミクス</span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="panel-border p-5 bg-cream relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-[9px] text-ash uppercase tracking-widest mb-3">
                {stat.label}
              </p>
              <p className={`font-mono font-bold text-2xl mb-1 ${stat.color ? 'text-crimson' : 'text-ink'}`}>
                {stat.value}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-ash">{stat.unit}</span>
                <span className="font-serif text-[10px] text-ash">{stat.kanji}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Distribution bars */}
        <div className="panel-border p-6 bg-cream">
          <h3 className="font-mono text-sm font-bold uppercase mb-6 flex items-center gap-3">
            Token Distribution
            <span className="font-serif text-ash text-xs font-normal">配分</span>
          </h3>
          <div className="space-y-4">
            {DISTRIBUTION.map((item, i) => (
              <div key={item.label}>
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-xs text-ink/70">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-xs text-ash">{item.kanji}</span>
                    <span className="font-mono text-xs font-bold">{item.percent}%</span>
                  </div>
                </div>
                <div className="h-2 bg-ink/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-ink"
                    style={{ width: '0%' }}
                    whileInView={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  >
                    {/* Crimson accent at end */}
                    <div className="w-1 h-full bg-crimson ml-auto" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

### 8. Roadmap — `components/sections/Roadmap.tsx`

**Design:** Vertical timeline with bordered phase cards. Each phase has a Japanese phase label, status indicator, and objectives.

```
Phase 1 — 第一段階 — FORGING THE BLADE
Phase 2 — 第二段階 — THE STORM GOD'S GIFT  
Phase 3 — 第三段階 — CUTTING THE HEAVENS
Phase 4 — 第四段階 — IMPERIAL TREASURE
```

Each card: numbered in left column, phase name + kanji + items checklist on right.

---

### 9. How To Buy — `components/sections/HowToBuy.tsx`

**Design:** Three-step numbered cards with bordered panels:
1. **Create a Wallet** — Download Phantom or Solflare
2. **Buy SOL** — Purchase SOL from any exchange
3. **Swap for $NAGI** — Go to Raydium/Jupiter, paste contract address, swap

Each step: large number `01` `02` `03` in red, step title, brief description, icon.

---

### 10. Footer — `components/layout/Footer.tsx`

**Design:** Dark background (near-black). Left: logo + tagline in Japanese. Center: nav links. Right: social links (Twitter/X, Telegram, Dexscreener). Very bottom: "草薙の剣 $NAGI © 2024" copyright.

---

## 📄 ROOT LAYOUT — `src/app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { Space_Mono, Noto_Serif_JP } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Kusanagi no Tsurugi — $NAGI | Solana Meme Coin',
  description: 'The legendary sword of Japanese mythology, now forged on Solana. $NAGI — Kusanagi no Tsurugi. 草薙の剣。',
  keywords: ['NAGI', 'Kusanagi', 'Solana', 'meme coin', 'Japanese mythology'],
  openGraph: {
    title: 'Kusanagi no Tsurugi — $NAGI',
    description: 'Forged in myth. Minted on Solana.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${notoSerifJP.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

## 📄 HOME PAGE — `src/app/page.tsx`

```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Mythology from '@/components/sections/Mythology'
import Tokenomics from '@/components/sections/Tokenomics'
import Roadmap from '@/components/sections/Roadmap'
import HowToBuy from '@/components/sections/HowToBuy'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Mythology />
      <Tokenomics />
      <Roadmap />
      <HowToBuy />
    </>
  )
}
```

---

## 📋 CONSTANTS — `src/lib/constants.ts`

```typescript
export const TOKEN = {
  name: 'Kusanagi no Tsurugi',
  symbol: '$NAGI',
  nameJP: '草薙の剣',
  contractAddress: 'REPLACE_WITH_ACTUAL_SOLANA_CONTRACT_ADDRESS',
  totalSupply: '1,000,000,000',
  network: 'Solana',
  decimals: 6,
}

export const LINKS = {
  twitter: 'https://twitter.com/NAGIcoin',
  telegram: 'https://t.me/NAGIcoin',
  dexscreener: 'https://dexscreener.com/solana/REPLACE',
  raydium: 'https://raydium.io/swap/?inputMint=sol&outputMint=REPLACE',
  jupiter: 'https://jup.ag/swap/SOL-REPLACE',
  birdeye: 'https://birdeye.so/token/REPLACE',
}

export const ROADMAP = [
  {
    phase: 1,
    title: 'FORGING THE BLADE',
    kanji: '第一段階',
    items: [
      'Token Launch on Solana',
      'Website Launch',
      'Social Media Setup',
      'Community Building',
      'CoinGecko & CMC Listing',
    ],
    status: 'active',
  },
  {
    phase: 2,
    title: "THE STORM GOD'S GIFT",
    kanji: '第二段階',
    items: [
      '1,000+ Holders',
      'DEX Trending',
      'KOL Partnerships',
      'Meme Campaign Launch',
      'NFT Collection Teaser',
    ],
    status: 'upcoming',
  },
  {
    phase: 3,
    title: 'CUTTING THE HEAVENS',
    kanji: '第三段階',
    items: [
      '10,000+ Holders',
      'CEX Listings',
      '$NAGI NFT Collection',
      'Merch Store',
      'Community DAO Vote',
    ],
    status: 'upcoming',
  },
  {
    phase: 4,
    title: 'IMPERIAL TREASURE',
    kanji: '第四段階',
    items: [
      'Top 50 Solana Token',
      'Major CEX Listing',
      '$NAGI Ecosystem Expansion',
      'Cross-chain Bridge',
      'Legend Status Achieved',
    ],
    status: 'upcoming',
  },
]
```

---

## 🖼️ IMAGE ASSETS NEEDED

Generate or source the following images and place in `/public/images/`:

| File | Description | Style |
|------|-------------|-------|
| `sword-hero.png` | Main Kusanagi sword — dramatic, floating against misty background | Dark atmospheric, Japanese art meets photorealism |
| `sword-detail.png` | Close-up detail of sword hilt/blade | High contrast, textured |
| `kusanagi-art.png` | About section — mythology painting style | Japanese woodblock/anime hybrid, dark palette |
| `yamato-takeru.png` | Warrior prince illustration | Japanese mythology warrior aesthetic |
| `kusanagi-sword.png` | Full sword illustration for card | Clean illustration on dark/light bg |
| `japanese-bg.png` | Bamboo/washi paper texture | Subtle, cream tones |
| `og-image.jpg` | OpenGraph share image | 1200×630px |

**Prompt for AI image generation (Midjourney/DALL-E):**
> "Kusanagi no Tsurugi legendary Japanese sword, floating in storm clouds with lightning, divine light emanating from blade, traditional Japanese mythology art meets modern dark fantasy, dramatic lighting, crimson and gold accents on dark atmospheric background, ultra detailed, 8k"

---

## 🚀 DEPLOYMENT

### Vercel (Recommended)
```bash
npm run build
npx vercel --prod
```

### Environment Variables
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_SOLANA_CONTRACT_ADDRESS
NEXT_PUBLIC_NETWORK=mainnet-beta
```

---

## ✅ FINAL CHECKLIST FOR AGENT

Build in this order:
1. [ ] Initialize Next.js project with TypeScript + Tailwind
2. [ ] Install all dependencies
3. [ ] Set up `tailwind.config.ts` with custom colors + animations
4. [ ] Set up `globals.css` with texture, scanlines, and base styles
5. [ ] Build `constants.ts` with token data
6. [ ] Build `Navbar.tsx`
7. [ ] Build `MarqueeTicker.tsx`
8. [ ] Build `Hero.tsx` (reference Image 1)
9. [ ] Build `About.tsx` (reference Image 3)
10. [ ] Build `MythologyCard.tsx` + `Mythology.tsx` (reference Image 2)
11. [ ] Build `Tokenomics.tsx`
12. [ ] Build `Roadmap.tsx`
13. [ ] Build `HowToBuy.tsx`
14. [ ] Build `Footer.tsx`
15. [ ] Wire up `layout.tsx` and `page.tsx`
16. [ ] Test responsive layout (mobile + desktop)
17. [ ] Replace placeholder contract address and social links
18. [ ] Add image assets to `/public/images/`
19. [ ] Run `npm run build` — fix any TypeScript errors
20. [ ] Deploy to Vercel

---

## 🎨 AESTHETIC RULES — ENFORCE THROUGHOUT

- **Typography**: Space Mono for ALL UI text. Noto Serif JP for ALL Japanese characters. Never use Inter or system fonts.
- **Color**: Only cream (#F0EDE6), ink (#1A1714), crimson (#C41E3A), ash (#9E9A94). No gradients.
- **Borders**: Always 1px solid ink/20 for panels. Double border effect with inner inset for premium feel.
- **Spacing**: Generous. Sections need breathing room (py-24 minimum).
- **Animations**: Subtle. Marquee tickers, float on sword, fade-in on scroll. No flashy effects.
- **Japanese text**: Mix kanji with English naturally. Every English heading should have a Japanese subtitle.
- **Red accents**: Use crimson ONLY for: key words, tags, active states, special symbols. Never overuse.
- **Texture**: Subtle paper/noise texture via CSS on body — gives aged document feel.

---

*草薙の剣 — Forged in myth. Minted on Solana. $NAGI*
