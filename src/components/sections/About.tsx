'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { Particle } from '../ui/Particle'

export default function About() {
  const [charaIndex, setCharaIndex] = useState(1)

  const charaVariants = [
    { id: 1, name: 'White', color: '#FFFFFF', image: '/images/chara/1.png' },
    { id: 2, name: 'Red', color: '#C41E3A', image: '/images/chara/2.png' },
    { id: 3, name: 'Blue', color: '#1E3A8A', image: '/images/chara/3.png' },
    { id: 4, name: 'Gold', color: '#B8960C', image: '/images/chara/4.png' },
    { id: 5, name: 'Black', color: '#1A1714', image: '/images/chara/5.png' },
    { id: 6, name: 'Green', color: '#064E3B', image: '/images/chara/6.png' },
  ]

  return (
    <section id="about" className="min-h-screen bg-cream py-32 px-6 overflow-hidden relative">
      {/* Particles */}
      <Particle src="/images/particles/hebi1.png" className="top-[5%] right-[5%] w-48 h-48" opacity={0.15} delay={1} floatType="subtle" />
      <Particle src="/images/particles/leaves3.png" className="top-[40%] left-[2%] w-24 h-24" opacity={0.4} delay={0.5} floatType="rotate" />
      <Particle src="/images/particles/leaves4.png" className="bottom-[10%] left-[40%] w-32 h-32" opacity={0.3} delay={2.5} floatType="wide" />
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter text-ink mb-6">
            ABOUT $NAGI
          </h2>
          <p className="text-xl text-ink tracking-[0.2em] font-medium uppercase">
            A legendary sword minted as a Solana meme coin
          </p>
        </motion.div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column - Character Profile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-4 relative group"
          >
            {/* Color Palette Selector */}
            <div className="flex justify-center gap-3 mb-6 relative z-20">
              {charaVariants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setCharaIndex(v.id)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${charaIndex === v.id ? 'border-crimson scale-125 shadow-lg' : 'border-ink/10 hover:scale-110'
                    }`}
                  style={{ backgroundColor: v.color }}
                  title={v.name}
                />
              ))}
            </div>

            <div className="relative aspect-[3/4] bg-parchment p-4 flex flex-col items-center justify-start overflow-hidden">
              {/* Character Name */}
              <div className="relative z-10 mt-8 mb-4">
                <p className="text-xs font-black tracking-[0.4em] text-[#1A1714] uppercase">Shirou Kusanagi</p>
              </div>

              {/* Character Image */}
              <div className="absolute inset-0 flex items-center justify-center p-8 pt-16">
                <div className="relative w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={charaIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={`/images/chara/${charaIndex}.png`}
                        alt={`Shirou Kusanagi ${charaVariants[charaIndex - 1].name}`}
                        fill
                        className="object-contain scale-95 translate-y-8"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center Column - Core Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-12 px-4 lg:px-8 pt-8"
          >
            {/* Main Logo Image */}
            <div className="relative w-20 h-20 self-center lg:self-start flex-shrink-0">
              <Image
                src="/images/main-logo.png"
                alt="$NAGI Logo"
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-black tracking-tighter text-ink mb-2">
                  KUSANAGI NO TSURUGI
                </h3>
                <p className="text-sm text-crimson font-black tracking-[0.2em] uppercase">
                  $NAGI
                </p>
              </div>

              <p className="text-base leading-relaxed text-[#1A1714] font-medium max-w-md">
                One of the three Imperial Treasures of Japan. A legendary sword that cuts the wind itself. Now minted as $NAGI on Solana.
              </p>

              <div className="space-y-6 pt-4">
                {[
                  { label: 'Blockchain', value: 'Solana' },
                  { label: 'Type', value: 'Meme Coin' },
                  { label: 'Inspired By', value: 'Japanese Mythology' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="text-crimson text-xl leading-none mt-0.5">✦</span>
                    <div>
                      <p className="text-[10px] font-black tracking-[0.2em] uppercase text-ink/50 mb-1">{item.label}</p>
                      <p className="text-sm font-bold text-ink tracking-wide">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Legacy Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-4 relative min-h-[600px] flex items-center justify-center lg:justify-start"
          >
            {/* Blade Image */}
            <div className="absolute left-[-20px] lg:left-[-40px] top-0 bottom-0 w-1/2 pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src="/images/kusanagi-sword.png"
                  alt="Kusanagi Blade"
                  fill
                  className="object-contain scale-150 -rotate-90"
                />
              </div>
            </div>

            {/* Legacy Info Panel */}
            <div className="flex flex-col items-start gap-6 relative z-10 pl-32 lg:pl-40">
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight text-ink uppercase">Legacy</h3>
                <p className="text-[13px] leading-relaxed text-ink font-medium">
                  A symbol of precision,<br />myth, and force.<br />
                  The spirit behind $NAGI<br />is drawn from sacred<br />steel, wind, and legend.
                </p>
              </div>

              <div className="w-full h-px bg-ink/10 my-2"></div>

              <div className="flex items-center gap-3">
                <span className="text-[9px] font-black tracking-[0.2em] text-ink uppercase">Wind</span>
                <span className="text-[9px] text-crimson">✦</span>
                <span className="text-[9px] font-black tracking-[0.2em] text-ink uppercase">Steel</span>
                <span className="text-[9px] text-crimson">✦</span>
                <span className="text-[9px] font-black tracking-[0.2em] text-ink uppercase">Legend</span>
              </div>

              {/* Japanese Legend Stamp */}
              <div className="mt-8 w-16 h-16 border-2 border-crimson rounded-full flex items-center justify-center group/stamp hover:rotate-12 transition-transform duration-500">
                <span className="text-xs font-black text-crimson leading-none flex flex-col items-center">
                  <span>傳</span>
                  <span>説</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
