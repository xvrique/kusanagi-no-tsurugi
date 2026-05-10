'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { getTokenomicsData } from '@/lib/constants'
import { Users, Banknote, Code2, Flower2, Droplets } from 'lucide-react'
import { Particle } from '../ui/Particle'

// ── Static pie data ── computed once at module level to avoid SSR/client mismatch
const PIE_DATA = [
  { label: 'RETAIL', pct: 81, color: '#C41E3A' },
  { label: 'LIQUIDITY', pct: 10, color: '#1A1A1A' },
  { label: 'FUNDING', pct: 6, color: '#E8A0A0' },
  { label: 'DEV', pct: 3, color: '#D4C4B0' },
]

function buildSegments() {
  let cum = 0
  const RADIUS = 65
  const INNER_RADIUS = 48
  const LEADER_RADIUS = 48

  const TOTAL = PIE_DATA.reduce((sum, seg) => sum + seg.pct, 0)

  return PIE_DATA.map((seg) => {
    const startAngle = (cum / TOTAL) * 360
    const endAngle = ((cum + seg.pct) / TOTAL) * 360
    cum += seg.pct

    const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180
    const x1 = parseFloat((50 + RADIUS * Math.cos(toRad(startAngle))).toFixed(4))
    const y1 = parseFloat((50 + RADIUS * Math.sin(toRad(startAngle))).toFixed(4))
    const x2 = parseFloat((50 + RADIUS * Math.cos(toRad(endAngle))).toFixed(4))
    const y2 = parseFloat((50 + RADIUS * Math.sin(toRad(endAngle))).toFixed(4))
    const largeArc = seg.pct > 50 ? 1 : 0
    const d = `M 50 50 L ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2} Z`

    const midAngle = toRad((startAngle + endAngle) / 2)
    const lx = parseFloat((50 + INNER_RADIUS * Math.cos(midAngle)).toFixed(4))
    const ly = parseFloat((50 + INNER_RADIUS * Math.sin(midAngle)).toFixed(4))

    // Leader line points - further spread out for majestic scale
    const leaderRadius = seg.label === 'DEV' ? 95 : seg.label === 'FUNDING' ? 75 : seg.label === 'LIQUIDITY' ? 85 : 68
    const p1x = parseFloat((50 + RADIUS * Math.cos(midAngle)).toFixed(4))
    const p1y = parseFloat((50 + RADIUS * Math.sin(midAngle)).toFixed(4))
    const p2x = parseFloat((50 + leaderRadius * Math.cos(midAngle)).toFixed(4))
    const p2y = parseFloat((50 + leaderRadius * Math.sin(midAngle)).toFixed(4))

    return { ...seg, d, lx, ly, p1x, p1y, p2x, p2y, midAngle, leaderRadius }
  })
}

// Build once — same value on server and client
const SEGMENTS = buildSegments()

// Allocation icons matching the reference
const ALLOCATION_ICONS = [Users, Banknote, Code2, Droplets]

export default function Tokenomics() {
  const tokenomics = getTokenomicsData()

  return (
    <section id="tokenomics" className="relative bg-cream py-16 px-6 overflow-hidden scroll-mt-24">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none asanoha-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-crimson/[0.01] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(196,30,58,0.02),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(196,30,58,0.02),transparent_50%)]" />
      {/* Particles */}
      <Particle src="/images/particles/sword3.png" className="top-[5%] right-[2%] w-56 h-56 rotate-[30deg]" opacity={0.15} delay={1.5} floatType="subtle" />
      <Particle src="/images/particles/leaves7.png" className="top-[50%] right-[10%] w-32 h-32" opacity={0.4} delay={0} floatType="rotate" />
      <Particle src="/images/particles/leaves8.png" className="bottom-[10%] left-[5%] w-24 h-24" opacity={0.5} delay={2} floatType="wide" />

      {/* Decorative sword on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none hidden lg:block">
        <div className="relative w-full h-full">
          <Image
            src="/images/kusanagi-sword.png"
            alt="Kusanagi Blade"
            fill
            className="object-contain opacity-30 -rotate-90 scale-[2] -translate-x-4"
          />
        </div>
      </div>

      {/* Decorative $NAGI badge top-left */}
      <div className="absolute top-8 left-8 w-14 h-14 border-2 border-crimson/30 rounded-full flex items-center justify-center pointer-events-none hidden lg:flex">
        <span className="text-[8px] font-black tracking-wider text-crimson">$NAGI</span>
      </div>

      {/* Decorative kanji stamps */}
      <div className="absolute top-[20%] left-[5%] pointer-events-none opacity-5 hidden xl:block">
        <span className="text-[12rem] font-black text-ink font-serif rotate-12">資金</span>
      </div>
      <div className="absolute bottom-[10%] right-[5%] pointer-events-none opacity-5 hidden xl:block">
        <span className="text-[12rem] font-black text-ink font-serif -rotate-12">配分</span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-8xl font-black tracking-tight md:tracking-tighter text-[#C41E3A] mb-4 uppercase">
            TOKENOMICS
          </h2>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-ink/20" />
            <span className="text-crimson text-sm">✦</span>
            <div className="h-px w-8 bg-ink/20" />
          </div>
          <p className="text-sm tracking-[0.2em] text-[#1A1714] uppercase">
            Token distribution and allocation breakdown
          </p>
        </motion.div>

        {/* ── Key Metrics Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {[
            { label: 'Total Supply', value: '1,000,000,000', sub: '$NAGI Tokens', icon: '総' },
            { label: 'Decimals', value: '18', sub: 'Standard Base', icon: '位' },
            { label: 'Blockchain', value: 'BASE', sub: 'Optimistic L2', icon: '鎖' }
          ].map((metric, i) => (
            <div key={i} className="relative group overflow-hidden">
              <div className="absolute inset-0 bg-parchment/50 border border-ink/10 transition-colors group-hover:bg-parchment group-hover:border-crimson/30 duration-500" />
              <div className="absolute top-0 right-0 p-2 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <span className="text-5xl font-serif font-black">{metric.icon}</span>
              </div>
              <div className="relative p-8 text-center">
                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-ink/40 mb-4">{metric.label}</p>
                <p className="text-4xl font-black text-crimson mb-2 tracking-tight drop-shadow-sm">{metric.value}</p>
                <div className="flex justify-center items-center gap-2">
                  <div className="w-1 h-1 bg-crimson/30 rounded-full" />
                  <p className="text-[10px] text-ink/60 font-bold tracking-widest uppercase">{metric.sub}</p>
                  <div className="w-1 h-1 bg-crimson/30 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Allocation Breakdown ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="border border-ink bg-cream/30 mb-12 overflow-hidden"
        >
          {/* Two column: List + Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-ink">

            {/* Left: Allocation List */}
            <div className="p-8 md:p-10 bg-cream/30 flex flex-col justify-center">
              {/* Title with Blossom */}
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 border border-crimson/20 rounded-full flex items-center justify-center bg-parchment/50">
                  <Flower2 className="text-crimson w-6 h-6" fill="currentColor" fillOpacity={0.2} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-black tracking-tight text-ink uppercase font-serif">
                    Allocation <span className="text-crimson">Breakdown</span>
                  </h3>
                  <div className="h-0.5 w-1/2 bg-gradient-to-r from-crimson/40 to-transparent" />
                </div>
              </div>

              <div className="space-y-6">
                {tokenomics.allocations.map((allocation, index) => {
                  const Icon = ALLOCATION_ICONS[index]
                  return (
                    <motion.div
                      key={allocation.label}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 py-6 px-4 sm:px-6 hover:bg-parchment/50 border-b border-ink/5 last:border-0 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        {/* Icon circle */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-ink/10 flex items-center justify-center flex-shrink-0 bg-cream group-hover:border-crimson/40 transition-colors">
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-ink/30 group-hover:text-crimson transition-colors" />
                        </div>

                        {/* Mobile Percentage */}
                        <div className="sm:hidden ml-auto text-right">
                          <span className="block text-3xl font-black text-crimson tracking-tighter">
                            {allocation.percentage}%
                          </span>
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black tracking-[0.2em] text-ink/40 uppercase mb-1">
                          {allocation.label}
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-ink leading-tight">
                          {allocation.description}
                        </p>
                      </div>

                      {/* Desktop Percentage */}
                      <div className="hidden sm:block text-right">
                        <span className="block text-4xl font-black text-crimson tracking-tighter">
                          {allocation.percentage}%
                        </span>
                        <span className="text-[9px] font-black tracking-widest uppercase text-ink/20">Verified</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Added: Security & Compliance Panel to fill space */}
              <div className="mt-12 p-6 bg-ink/[0.02] border border-ink/5 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-5">
                  <span className="text-4xl font-serif font-black">安</span>
                </div>
                <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-crimson mb-4">Security & Compliance</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Liquidity', val: 'LOCKED', color: 'text-ink' },
                    { label: 'Contract', val: 'VERIFIED', color: 'text-ink' },
                    { label: 'Buy Tax', val: '0%', color: 'text-crimson' },
                    { label: 'Sell Tax', val: '0%', color: 'text-crimson' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[8px] font-black tracking-widest text-ink/30 uppercase">{item.label}</span>
                      <span className={`text-xs font-black ${item.color}`}>{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Pie Chart (SVG) */}
            <div className="p-4 md:p-6 relative flex items-center justify-center bg-cream/20 min-h-[400px] md:min-h-[550px] overflow-hidden">
              {/* Technical Callouts in Corners - Ritualistic Redesign */}
              <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col items-start gap-0.5 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-crimson rotate-45" />
                  <span className="text-[6px] md:text-[7px] font-black tracking-[0.3em] text-ink/30 uppercase">Sacred Archive / 聖なるアーカイブ</span>
                </div>
                <span className="text-[8px] md:text-[10px] font-black text-ink/70 uppercase font-mono bg-ink/5 px-2 py-0.5 border-l border-crimson">Kusanagi No Tsurugi</span>
              </div>

              {/* Added: Watermark behind chart */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
                <span className="text-[25rem] font-black font-serif select-none">神</span>
              </div>

              {/* Ritualistic corner accents */}
              <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-crimson/5">
                <div className="absolute top-1 left-1 w-full h-full border-t border-l border-ink/5" />
              </div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-crimson/5">
                <div className="absolute bottom-1 right-1 w-full h-full border-b border-r border-ink/5" />
              </div>

              {/* SVG Pie - Responsive Viewbox */}
              <svg viewBox="-90 -90 280 280" className="w-full max-w-[1100px] aspect-square overflow-visible drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                <defs>
                  {/* Circular Text Path - Moved further out for majestic scale */}
                  <path id="textCircle" d="M 50, 50 m -105, 0 a 105,105 0 1,1 210,0 a 105,105 0 1,1 -210,0" />

                  {/* Seigaiha Pattern */}
                  <pattern id="wavePattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale(0.5)">
                    <path d="M0 10c2.5 0 2.5-5 5-5s2.5 5 5 5 2.5-5 5-5 2.5 5 5 5" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-[#C41E3A]/10" />
                    <path d="M0 15c2.5 0 2.5-5 5-5s2.5 5 5 5 2.5-5 5-5 2.5 5 5 5" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-[#C41E3A]/10" />
                  </pattern>
                </defs>

                {SEGMENTS.map((seg, i) => (
                  <g key={i}>
                    <motion.path
                      d={seg.d}
                      fill={seg.color}
                      stroke="rgba(0,0,0,0.4)"
                      strokeWidth="0.3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      style={{ transformOrigin: '50% 50%' }}
                    />
                    {/* Pattern Overlay */}
                    <path
                      d={seg.d}
                      fill="url(#wavePattern)"
                      className="pointer-events-none opacity-40"
                    />

                    {/* Leader lines with varied horizontal lengths to prevent overlap */}
                    <motion.polyline
                      points={`${seg.p1x},${seg.p1y} ${seg.p2x},${seg.p2y} ${seg.p2x + (seg.p2x > 50 ? (seg.label === 'DEV' ? 25 : seg.label === 'FUNDING' ? 18 : 12) : (seg.label === 'DEV' ? -25 : seg.label === 'FUNDING' ? -18 : -12))},${seg.p2y}`}
                      fill="none"
                      stroke="#C41E3A"
                      strokeWidth="0.5"
                      strokeOpacity="0.4"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                    <motion.circle
                      cx={seg.p1x}
                      cy={seg.p1y}
                      r="0.8"
                      fill="#C41E3A"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    />

                    {/* External Labels with staggered positions */}
                    <motion.text
                      x={seg.p2x + (seg.p2x > 50 ? (seg.label === 'DEV' ? 28 : seg.label === 'FUNDING' ? 21 : 15) : (seg.label === 'DEV' ? -28 : seg.label === 'FUNDING' ? -21 : -15))}
                      y={seg.p2y}
                      fill="#1a1a1a"
                      textAnchor={seg.p2x > 50 ? "start" : "end"}
                      initial={{ opacity: 0, x: seg.p2x > 50 ? -10 : 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="font-black font-serif uppercase"
                    >
                      <tspan x={seg.p2x + (seg.p2x > 50 ? 28 : -28)} dy="-2" fontSize="7" fill="#C41E3A">
                        {seg.pct}%
                      </tspan>
                      <tspan x={seg.p2x + (seg.p2x > 50 ? 28 : -28)} dy="7" fontSize="4" letterSpacing="0.3" fillOpacity="0.5" className="font-sans font-black">
                        {seg.label}
                      </tspan>
                    </motion.text>
                  </g>
                ))}

                {/* Center text with double ritual border */}
                <circle cx="50" cy="50" r="28" fill="#F0EDE6" stroke="#1a1a1a" strokeWidth="0.5" />
                <motion.circle
                  cx="50" cy="50" r="25"
                  fill="none"
                  stroke="#C41E3A"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '50% 50%' }}
                />

                <text x="50" y="46" textAnchor="middle" dominantBaseline="central" className="fill-crimson font-serif font-black" fontSize="20">
                  凪
                </text>
                <text x="50" y="60" textAnchor="middle" dominantBaseline="central" className="fill-ink/40 font-mono font-black" fontSize="5" letterSpacing="0.2">
                  $NAGI
                </text>

                {/* Rotating Circular Text */}
                <motion.text
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '50px 50px' }}
                  className="fill-ink/[0.08] text-[4px] font-black tracking-[0.6em] uppercase"
                >
                  <textPath href="#textCircle" startOffset="0%">
                    KUSANAGI NO TSURUGI • SACRED ARTIFACT • BASE NETWORK • GENESIS MINT • $NAGI •
                  </textPath>
                </motion.text>
              </svg>

              {/* Sacred Functions (Utility) Section - Ritualistic Redesign */}
              <div className="absolute bottom-16 left-0 right-0 px-12 hidden md:block">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'CONSENSUS', desc: 'Shape the fate', kanji: '統' },
                    { label: 'GUARDIAN', desc: 'Bind your soul', kanji: '守' },
                    { label: 'ARTIFACTS', desc: 'Reveal relics', kanji: '入' },
                    { label: 'ASCENSION', desc: 'Fuel the fire', kanji: '進' }
                  ].map((item, i) => (
                    <div key={i} className="relative flex flex-col items-center group">
                      {/* Ritual Seal Container */}
                      <div className="relative w-10 h-10 mb-2 flex items-center justify-center">
                        <div className="absolute inset-0 border border-crimson/10 rotate-45 group-hover:border-crimson/40 transition-colors" />
                        <div className="absolute inset-1 border border-crimson/5 group-hover:border-crimson/20 transition-colors" />
                        <span className="text-xs font-black text-crimson/30 group-hover:text-crimson transition-colors font-serif">{item.kanji}</span>
                      </div>
                      <p className="text-[8px] font-black tracking-[0.2em] text-ink uppercase mb-0.5">{item.label}</p>
                      <p className="text-[6px] font-bold text-ink/30 uppercase tracking-tighter">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Token Information Footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border border-ink bg-cream/50 p-6 md:p-8 flex flex-col md:flex-row items-start gap-8 relative overflow-hidden"
        >
          {/* Decorative line inside */}
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-ink/10 hidden md:block" />

          {/* Stamp Icon */}
          <div className="w-16 h-16 border-2 border-crimson rounded-full flex items-center justify-center flex-shrink-0 bg-cream relative z-10">
            <span className="text-xs font-black text-crimson leading-none flex flex-col items-center">
              <span>傳</span>
              <span>説</span>
            </span>
          </div>

          {/* Text */}
          <div className="flex-1 relative z-10">
            <h4 className="text-sm font-black tracking-[0.2em] uppercase text-[#C41E3A] mb-2 flex items-center gap-2">
              <span className="w-1 h-1 bg-crimson rounded-full" />
              Token Information
            </h4>
            <p className="text-[11px] leading-relaxed text-[#1A1714] max-w-2xl">
              $NAGI is a coin on the Base blockchain. The allocation breakdown reflects
              our commitment to community growth, development, and long-term sustainability.
              This is not financial advice.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
