'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { getRoadmapData } from '@/lib/constants'
import { Particle } from '../ui/Particle'

// Leaf SVG for floating decoration
const MomijiLeaf = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12,2L10.5,6.5L6,6L8.5,10L4,12L8.5,14L6,18L10.5,17.5L12,22L13.5,17.5L18,18L15.5,14L20,12L15.5,10L18,6L13.5,6.5L12,2Z" />
  </svg>
)

const PHASE_IMAGES = [
  '/images/roadmap/1.png',
  '/images/roadmap/2.png',
  '/images/roadmap/3.png',
  '/images/roadmap/4.png',
]

const KANJI_STAMPS = [
  { top: '南', bottom: '京' },
  { top: '東', bottom: '海' },
  { top: '清', bottom: '流' },
  { top: '龍', bottom: '虎' },
]

export default function Roadmap() {
  const roadmap = getRoadmapData()

  return (
    <section id="roadmap" className="relative bg-cream py-32 px-6 overflow-hidden min-h-screen">
      {/* Particles */}
      <Particle src="/images/particles/hebi2.png" className="top-[10%] left-[5%] w-64 h-64 -rotate-12" opacity={0.15} delay={1.5} floatType="subtle" />
      <Particle src="/images/particles/leaves1.png" className="top-[30%] right-[10%] w-32 h-32" opacity={0.4} delay={0.5} floatType="rotate" />
      <Particle src="/images/particles/leaves2.png" className="bottom-[15%] left-[10%] w-24 h-24" opacity={0.5} delay={2} floatType="wide" />
      <Particle src="/images/particles/sword4.png" className="bottom-[5%] right-[5%] w-48 h-48 rotate-[15deg]" opacity={0.15} delay={1} floatType="subtle" />

      {/* ── Background Elements ── */}

      {/* Sidebar Label */}
      <div className="absolute left-8 top-32 flex flex-col items-center gap-4 pointer-events-none hidden lg:flex">
        <div className="border border-ink p-2 flex flex-col items-center">
          <span className="text-2xl font-serif font-black leading-tight [writing-mode:vertical-rl]">名城</span>
          <div className="h-px w-full bg-ink/20 my-2" />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase">NAGI</span>
        </div>
        <div className="w-8 h-8 border border-crimson flex items-center justify-center">
          <span className="text-xs text-crimson font-serif">凪</span>
        </div>
      </div>

      {/* Fuji Hero (Top Right) */}
      <div className="absolute top-[5%] md:top-[10%] right-[10%] md:right-[20%] w-[30vw] h-[30vw] rounded-full bg-crimson/5 blur-3xl pointer-events-none" />
      <div className="absolute top-24 md:top-0 right-[-10%] md:right-0 w-[400px] md:w-[500px] h-[320px] md:h-[400px] pointer-events-none opacity-20 md:opacity-80">
        <Image
          src="/images/roadmap/5.png"
          alt="Mount Fuji"
          fill
          className="object-contain object-right-top"
        />
      </div>

      {/* Floating Leaves */}
      <div className="absolute top-1/4 right-10 pointer-events-none">
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MomijiLeaf className="w-6 h-6 text-crimson/30" />
        </motion.div>
      </div>
      <div className="absolute bottom-1/3 left-20 pointer-events-none">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <MomijiLeaf className="w-5 h-5 text-crimson/20" />
        </motion.div>
      </div>
      <div className="absolute top-2/3 right-16 pointer-events-none">
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <MomijiLeaf className="w-4 h-4 text-crimson/25" />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24 flex flex-col items-start"
        >
          <div className="relative">
            <h2 className="text-7xl md:text-9xl font-black tracking-tight md:tracking-tighter text-[#C41E3A] uppercase leading-none">
              ROADMAP
            </h2>
            <div className="mt-2 pl-1">
              <p className="text-[11px] tracking-[0.5em] text-[#1A1714] uppercase font-bold">
                Project milestones and development timeline
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative mx-auto max-w-4xl">

          {/* Vertical Track */}
          <div className="absolute left-[24px] md:left-[28px] top-0 bottom-0 w-[2px] flex flex-col items-center pointer-events-none">
            <div className="h-10 w-full bg-crimson" />
            <div className="flex-1 w-full" style={{
              backgroundImage: 'linear-gradient(to bottom, #991b1b 50%, transparent 50%)',
              backgroundSize: '2px 10px',
              backgroundRepeat: 'repeat-y'
            }} />
            <div className="h-40 w-full bg-ink/10" />
          </div>

          <div className="space-y-12">
            {roadmap.milestones.map((milestone, index) => {
              const isUpcoming = !milestone.completed && index > 1

              return (
                <motion.div
                  key={milestone.phase}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start group"
                >
                  {/* Timeline Node & Connector */}
                  <div className="flex items-center z-20 h-20">
                    <div className="relative flex items-center justify-center w-14 md:w-16">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 bg-parchment z-10 flex items-center justify-center transition-all duration-300 border-ink group-hover:border-crimson">
                        <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full transition-all duration-300 bg-transparent border border-ink/40 group-hover:bg-crimson group-hover:border-crimson" />
                      </div>
                      <div className="absolute -inset-1.5 border border-crimson/0 rounded-full group-hover:border-crimson/20 group-hover:animate-pulse transition-all" />
                    </div>
                    <div className="h-[2px] w-6 md:w-10 bg-ink/10 transition-colors duration-300 group-hover:bg-crimson" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 relative">
                    <div className="relative bg-cream/30 border-2 border-ink/20 transition-all duration-500 overflow-hidden group-hover:border-crimson/40 rounded-sm">
                      {/* Inner border */}
                      <div className="absolute inset-[3px] border border-ink/10 pointer-events-none rounded-sm group-hover:border-crimson/20 transition-colors" />
                      {/* Subtle dot pattern */}
                      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#1a1a1a_0.8px,transparent_0.8px)] [background-size:10px_10px]" />

                      <div className="flex flex-col sm:flex-row">
                        {/* Left: Phase Image */}
                        <div className="w-full sm:w-36 md:w-40 p-5 flex flex-col items-center justify-center relative bg-cream/20">
                          <div className="relative w-24 h-24 md:w-28 md:h-28 mb-3">
                            <Image
                              src={PHASE_IMAGES[index]}
                              alt={milestone.title}
                              fill
                              sizes="120px"
                              className="object-contain drop-shadow-sm"
                            />
                          </div>
                          <span className="text-[9px] font-mono font-bold text-[#1A1714] tracking-[0.3em] uppercase">
                            {milestone.date}
                          </span>
                        </div>

                        {/* Right: Content */}
                        <div className="flex-1 p-5 md:p-6 relative">
                          {/* Phase Label + Upcoming Badge */}
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-black tracking-[0.4em] uppercase text-[#1A1714] group-hover:text-crimson transition-colors">
                              PHASE {index + 1}
                            </span>
                            {isUpcoming && (
                              <span className="text-[8px] font-black tracking-[0.2em] uppercase text-[#1A1714] border border-ink/20 px-2.5 py-1 bg-cream/50">
                                UPCOMING
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-xl md:text-2xl font-black mb-1.5 tracking-tight text-[#C41E3A] group-hover:text-crimson transition-colors">
                            {milestone.title}
                          </h3>

                          {/* Description */}
                          <p className="text-[10px] text-[#1A1714] mb-4 italic leading-relaxed max-w-md">
                            {milestone.description}
                          </p>

                          {/* Bullet Items */}
                          <div className="grid grid-cols-1 gap-y-2">
                            {milestone.items.map((item, i) => (
                              <div key={i} className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-crimson/50 group-hover:bg-crimson flex-shrink-0 transition-colors" />
                                <span className="text-[11px] text-[#1A1714] leading-tight">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Kanji Stamp (Bottom Right) */}
                          <div className="absolute bottom-4 right-4 opacity-25 group-hover:opacity-60 transition-opacity">
                            <div className="border border-[#C41E3A]/60 p-1.5 flex flex-col items-center group-hover:border-crimson transition-colors">
                              <span className="text-[11px] font-serif font-black leading-none mb-0.5 text-[#C41E3A] group-hover:text-crimson">{KANJI_STAMPS[index].top}</span>
                              <div className="h-[1px] w-full my-0.5 bg-[#C41E3A]/20 group-hover:bg-crimson/30" />
                              <span className="text-[11px] font-serif font-black leading-none text-[#C41E3A] group-hover:text-crimson">{KANJI_STAMPS[index].bottom}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Current Phase Footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          <div className="border-2 border-ink/20 bg-cream/30 p-10 md:p-12 relative overflow-hidden rounded-sm">
            {/* Inner border */}
            <div className="absolute inset-[3px] border border-ink/10 pointer-events-none rounded-sm" />
            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#1a1a1a_0.8px,transparent_0.8px)] [background-size:10px_10px]" />

            <div className="flex flex-col items-center text-center relative z-10">
              {/* Nagi Coin Image */}
              <div className="relative mb-6">
                <div className="relative w-24 h-24 flex items-center justify-center drop-shadow-md">
                  <Image
                    src="/images/logo-kusanagi.png"
                    alt="Kusanagi Coin"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <span className="text-[10px] font-black tracking-[0.4em] text-crimson uppercase mb-3 block">
                Current Phase
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-ink mb-4 tracking-tight">
                {roadmap.currentPhase}
              </h3>
              <p className="text-[12px] leading-relaxed text-ink/60 max-w-lg">
                We are actively working on the current phase.
                Follow our social media for updates and announcements.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
