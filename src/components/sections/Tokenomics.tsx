'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { getTokenomicsData } from '@/lib/constants'
import { Users, Banknote, Code2, Flower2 } from 'lucide-react'
import { Particle } from '../ui/Particle'

// ── Static pie data ── computed once at module level to avoid SSR/client mismatch
const PIE_DATA = [
  { label: 'RETAIL', pct: 81, color: '#C41E3A' },
  { label: 'FUNDING', pct: 6, color: '#E8A0A0' },
  { label: 'DEV', pct: 3, color: '#D4C4B0' },
]

function buildSegments() {
  let cum = 0
  const RADIUS = 42
  const INNER_RADIUS = 30
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

    // Leader line points
    const leaderRadius = seg.label === 'DEV' ? 65 : seg.label === 'FUNDING' ? 38 : 48
    const p1x = parseFloat((50 + RADIUS * Math.cos(midAngle)).toFixed(4))
    const p1y = parseFloat((50 + RADIUS * Math.sin(midAngle)).toFixed(4))
    const p2x = parseFloat((50 + leaderRadius * Math.cos(midAngle)).toFixed(4))
    const p2y = parseFloat((50 + leaderRadius * Math.sin(midAngle)).toFixed(4))

    return { ...seg, d, lx, ly, p1x, p1y, p2x, p2y, midAngle }
  })
}

// Build once — same value on server and client
const SEGMENTS = buildSegments()

// Allocation icons matching the reference
const ALLOCATION_ICONS = [Users, Banknote, Code2]

export default function Tokenomics() {
  const tokenomics = getTokenomicsData()

  return (
    <section id="tokenomics" className="relative bg-cream py-24 px-6 overflow-hidden scroll-mt-24">
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

      {/* Decorative kanji stamp bottom-right */}
      <div className="absolute bottom-8 right-8 pointer-events-none hidden lg:block">
        <span className="text-5xl font-black text-[#C41E3A]/[0.08] font-serif">凪</span>
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
          className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-12"
        >
          {/* Total Supply */}
          <div className="border border-ink p-6 text-center bg-cream/50">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#1A1714] mb-3">
              Total Supply
            </p>
            <p className="text-3xl md:text-4xl font-black text-[#C41E3A] mb-1 tracking-tight">
              1,000,000,000
            </p>
            <p className="text-[10px] text-[#1A1714] tracking-wider">$NAGI Tokens</p>
          </div>

          {/* Decimals */}
          <div className="border border-ink border-l-0 p-6 text-center bg-cream/50">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#1A1714] mb-3">
              Decimals
            </p>
            <p className="text-3xl md:text-4xl font-black text-[#C41E3A] mb-1">
              6
            </p>
            <p className="text-[10px] text-[#1A1714] tracking-wider">Standard Solana</p>
          </div>

          {/* Blockchain */}
          <div className="border border-ink border-l-0 p-6 text-center bg-cream/50">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#1A1714] mb-3">
              Blockchain
            </p>
            <p className="text-3xl md:text-4xl font-black text-[#C41E3A] mb-1">
              SOL
            </p>
            <p className="text-[10px] text-[#1A1714] tracking-wider">Solana Network</p>
          </div>
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
            <div className="p-6 md:p-10 bg-cream/30">
              {/* Title with Blossom */}
              <div className="flex items-center gap-3 mb-10">
                <Flower2 className="text-crimson w-6 h-6" fill="currentColor" fillOpacity={0.2} />
                <h3 className="text-2xl font-black tracking-tight text-[#C41E3A] uppercase">
                  Allocation Breakdown
                </h3>
              </div>

              <div className="space-y-0 divide-y divide-ink/10">
                {tokenomics.allocations.map((allocation, index) => {
                  const Icon = ALLOCATION_ICONS[index]
                  return (
                    <motion.div
                      key={allocation.label}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-5 py-5 first:pt-0 last:pb-0"
                    >
                      {/* Icon circle */}
                      <div className="w-12 h-12 rounded-full border border-crimson/40 flex items-center justify-center flex-shrink-0 bg-transparent">
                        <Icon className="w-6 h-6 text-crimson" />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black tracking-wider text-[#C41E3A] uppercase">
                          {allocation.label}
                        </p>
                        <p className="text-[10px] text-[#1A1714] leading-snug max-w-[220px]">
                          {allocation.description}
                        </p>
                      </div>

                    {/* Percentage */}
                    <span className="text-3xl font-black text-crimson ml-auto flex-shrink-0 tracking-tighter">
                      {allocation.percentage}%
                    </span>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Right: Pie Chart (SVG) */}
            <div className="p-2 md:p-4 relative flex items-center justify-center bg-cream/10 min-h-[550px] md:min-h-[800px] overflow-hidden">
              {/* SVG Pie */}
              <svg viewBox="-25 -25 150 150" className="w-full max-w-[800px] aspect-square drop-shadow-md overflow-visible">
                <defs>
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
                    
                    {/* Leader lines */}
                    <motion.polyline
                      points={`${seg.p1x},${seg.p1y} ${seg.p2x},${seg.p2y} ${seg.p2x + (seg.p2x > 50 ? 10 : -10)},${seg.p2y}`}
                      fill="none"
                      stroke="#1a1a1a"
                      strokeWidth="0.3"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    />
                    
                    {/* External Labels */}
                    <motion.text
                      x={seg.p2x + (seg.p2x > 50 ? 12 : -12)}
                      y={seg.p2y}
                      fill="#C41E3A"
                      textAnchor={seg.p2x > 50 ? "start" : "end"}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                      className="font-black font-sans uppercase"
                    >
                      <tspan x={seg.p2x + (seg.p2x > 50 ? 12 : -12)} dy="-1.5" fontSize="6">
                        {seg.pct}%
                      </tspan>
                      <tspan x={seg.p2x + (seg.p2x > 50 ? 12 : -12)} dy="5.5" fontSize="3" letterSpacing="0.2">
                        {seg.label}
                      </tspan>
                    </motion.text>

                    {/* Inner percentage labels */}
                    <text
                      x={seg.lx}
                      y={seg.ly}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-[#C41E3A]/80 font-black pointer-events-none"
                      fontSize={seg.pct >= 15 ? "5" : "0"}
                    >
                      {seg.pct}%
                    </text>
                  </g>
                ))}

                {/* Center text with double border */}
                <circle cx="50" cy="50" r="14" fill="#F0EDE6" stroke="#1a1a1a" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="12" fill="none" stroke="#C41E3A" strokeWidth="0.1" strokeDasharray="1,1" />
                
                <text x="50" y="47" textAnchor="middle" dominantBaseline="central" className="fill-crimson font-serif font-black" fontSize="10">
                  凪
                </text>
                <text x="50" y="56" textAnchor="middle" dominantBaseline="central" className="fill-crimson font-black tracking-tighter" fontSize="4.5">
                  $NAGI
                </text>
              </svg>
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
              $NAGI is a meme coin on the Solana blockchain. The allocation breakdown reflects
              our commitment to community growth, development, and long-term sustainability.
              This is not financial advice.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
