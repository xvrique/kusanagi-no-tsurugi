'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import MarqueeTicker from './MarqueeTicker'
import { Particle } from '../ui/Particle'
import { UNISWAP_LINK } from '@/lib/constants'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <>
      <section id="hero" className="h-screen bg-cream flex items-center justify-center relative overflow-hidden">
        {/* Particles */}
        <Particle src="/images/particles/leaves1.png" className="top-1/4 left-[10%] w-32 h-32" opacity={0.6} delay={0} floatType="rotate" />
        <Particle src="/images/particles/leaves5.png" className="top-[15%] right-[15%] w-24 h-24" opacity={0.4} delay={1} floatType="subtle" />
        <Particle src="/images/particles/leaves2.png" className="bottom-[20%] left-[5%] w-40 h-40" opacity={0.5} delay={2} floatType="wide" />
        <Particle src="/images/particles/leaves6.png" className="bottom-[25%] right-[8%] w-36 h-36" opacity={0.6} delay={0.5} floatType="rotate" />
        <Particle src="/images/particles/sword1.png" className="top-[10%] left-[30%] w-48 h-48 -rotate-45" opacity={0.2} delay={1.5} floatType="subtle" />
        <Particle src="/images/particles/sword2.png" className="bottom-[10%] right-[30%] w-56 h-56 rotate-45" opacity={0.15} delay={2.5} floatType="subtle" />

        {/* Giant Background Title - positioned in upper area as a horizontal band */}
        <div className="absolute left-0 right-0 top-[15%] md:top-[25%] pointer-events-none z-0 select-none flex items-center justify-center overflow-hidden">
          <div
            className="w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-[10vw] px-4 md:px-0"
          >
            <span className="text-[14vw] md:text-[8vw] font-black tracking-[-0.04em] text-ink/80 md:text-ink leading-[0.8] md:leading-[0.85] uppercase" style={{ transform: 'scaleY(1.35)', transformOrigin: 'center' }}>
              KUSANAGI
            </span>
            <span className="text-[14vw] md:text-[8vw] font-black tracking-[-0.04em] text-ink/80 md:text-ink leading-[0.8] md:leading-[0.85] uppercase whitespace-nowrap" style={{ transform: 'scaleY(1.35)', transformOrigin: 'center' }}>
              NO TSURUGI
            </span>
          </div>
        </div>

        {/* Main coin mark */}
        <div className="absolute inset-0 flex items-end justify-center z-10 pointer-events-none">
          <div className="relative w-full flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
              className="relative w-[min(95vw,720px)] h-[85vh] md:h-[95vh] flex items-end justify-center"
            >
              <Image
                src="/closeup.png"
                alt="$NAGI main character"
                width={1600}
                height={1600}
                className="object-contain object-bottom h-full w-full drop-shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* Gradient for text readability on mobile */}
        <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-cream via-cream/80 to-transparent pointer-events-none md:hidden z-10" />

        {/* Foreground Content - bottom left & right info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 z-20 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto px-6 h-full flex items-end pb-10">
            <div className="w-full flex justify-between items-end">

              {/* Left Column */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-6 md:gap-8 pointer-events-auto max-w-full md:max-w-[260px] pb-10 md:pb-0 z-30"
              >
                <div className="space-y-5 text-[10px] font-bold leading-relaxed text-ink uppercase tracking-[0.15em]">
                  <div className="space-y-0.5">
                    <p>GRASS-CUTTING SWORD</p>
                    <p className="opacity-50 font-normal">ONE OF THE THREE IMPERIAL <span className="text-crimson font-bold">草薙の剣</span></p>
                    <p className="opacity-50 font-normal">TREASURES OF JAPAN</p>
                  </div>

                  <div className="space-y-0.5">
                    <p>FORGED FROM YAMATA NO OROCHI,</p>
                    <p className="opacity-50 font-normal">A LEGENDARY BLADE THAT CUTS</p>
                    <p className="opacity-50 font-normal">THE INTO ITSELF. SYMBOL OF</p>
                    <p className="text-crimson font-black">DIVINE POWER.</p>
                  </div>

                  <div className="flex gap-2 items-center opacity-60">
                    <span>剣は</span> <span className="text-crimson">心の</span> <span>延長</span> <span className="text-crimson">心の</span> <span>永遠</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    new Audio('/sounds/swordslice.mp3').play();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-fit px-7 py-2.5 bg-crimson text-black hover:bg-crimson/80 transition-all duration-300"
                >
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase flex items-center gap-2">
                    ▼ DISCOVER ▼
                  </span>
                </button>
              </motion.div>

              {/* Right Column - Visible on desktop, maybe small version for mobile or hidden */}
              <motion.div
                variants={itemVariants}
                className="hidden md:flex flex-col gap-6 items-end text-right pointer-events-auto max-w-[220px]"
              >
                <div className="space-y-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-ink">Kusanagi Blade</p>

                  <div className="space-y-3 text-[10px] text-ink uppercase font-bold tracking-[0.15em] leading-relaxed">
                    <p>
                      CUTS THROUGH ENEMIES<br />
                      <span className="opacity-50 font-normal">WITH DIVINE FAVOR</span>
                    </p>
                    <p>
                      FOUND WITHIN YAMATA<br />
                      <span className="opacity-50 font-normal">NO OROCHI&apos;S BODY.</span>
                    </p>
                  </div>
                </div>

                <a 
                  href={UNISWAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => new Audio('/sounds/swordslice.mp3').play()}
                  className="w-fit px-7 py-2.5 bg-crimson text-black hover:bg-crimson/80 transition-all duration-300"
                >
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase flex items-center justify-center gap-2">
                    ✳ buy $nagi ✳
                  </span>
                </a>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee Ticker */}
      <MarqueeTicker />
    </>
  )
}
