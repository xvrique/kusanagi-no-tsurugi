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
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none asanoha-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-crimson/[0.02] to-transparent pointer-events-none" />
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
            A legendary sword minted as a Base coin
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
            <div className="relative aspect-[3/4] bg-parchment p-8 flex flex-col items-center justify-start overflow-hidden border-2 border-ink/5 shadow-2xl">
              {/* Card Atmosphere */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-texture mix-blend-overlay" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(196,30,58,0.03),transparent_70%)]" />

              {/* Decorative Corners */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-crimson/30" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-crimson/30" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-crimson/30" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-crimson/30" />

              {/* Background Kanji Detail */}
              <div className="absolute -right-4 top-1/4 text-8xl font-black text-ink/[0.02] font-serif select-none pointer-events-none rotate-12">
                神剣
              </div>
              <div className="absolute -left-4 bottom-1/4 text-8xl font-black text-ink/[0.02] font-serif select-none pointer-events-none -rotate-12">
                伝説
              </div>

              {/* Color Palette Selector */}
              <div className="relative z-30 mt-4 mb-8 flex justify-center gap-5">
                {charaVariants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setCharaIndex(v.id)}
                    className={`w-4 h-4 rotate-45 border-2 transition-all duration-500 ${charaIndex === v.id
                      ? 'border-crimson scale-150 rotate-[225deg] shadow-[0_0_15px_rgba(196,30,58,0.4)]'
                      : 'border-ink/10 hover:scale-125 hover:rotate-[135deg] hover:border-crimson/50'
                      }`}
                    style={{ backgroundColor: v.color }}
                    title={v.name}
                  />
                ))}
              </div>

              {/* Character Image Container */}
              <div className="relative w-full h-full z-20 flex items-center justify-center">
                {/* Dynamic Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute w-[80%] h-[80%] rounded-full blur-[60px] pointer-events-none"
                  style={{ backgroundColor: charaVariants.find(v => v.id === charaIndex)?.color }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={charaIndex}
                    initial={{ opacity: 0, scale: 0.9, filter: 'brightness(1.5) blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'brightness(1) blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'brightness(0.5) blur(5px)' }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative w-full h-[120%] -translate-y-8">
                      <Image
                        src={`/images/chara/${charaIndex}.png`}
                        alt={`Kusanagi Warrior ${charaVariants[charaIndex - 1].name}`}
                        fill
                        className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                        priority
                        unoptimized
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Center Column - Core Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-10 px-4 lg:px-8 pt-8"
          >

            <div className="space-y-8">
              <div className="relative">
                <h3 className="text-3xl md:text-3xl font-black tracking-tighter text-ink mb-2 font-serif">
                  KUSANAGI NO TSURUGI
                </h3>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-crimson font-black tracking-[0.3em] uppercase">
                    $NAGI
                  </p>
                  <div className="h-px flex-grow bg-gradient-to-r from-crimson/50 to-transparent" />
                </div>
              </div>

              <p className="text-base leading-relaxed text-ink/80 font-medium max-w-md italic">
                "One of the three Imperial Treasures of Japan. A legendary sword that cuts the wind itself. Now awakened as $NAGI on the Base network."
              </p>

              <div className="space-y-4 pt-4">
                {[
                  { label: 'Blockchain', value: 'Base', icon: '鎖' },
                  { label: 'Type', value: 'Coin', icon: '幣' },
                  { label: 'Inspired By', value: 'Japanese Mythology', icon: '神' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-5 p-4 bg-ink/[0.02] border-l-2 border-crimson/20 hover:bg-crimson/[0.03] hover:border-crimson transition-all duration-300"
                  >
                    <span className="text-crimson font-serif text-xl font-bold opacity-60">{item.icon}</span>
                    <div>
                      <p className="text-[9px] font-black tracking-[0.2em] uppercase text-ink/40 mb-0.5">{item.label}</p>
                      <p className="text-sm font-bold text-ink tracking-wide">{item.value}</p>
                    </div>
                  </motion.div>
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
            {/* Blade Image with Shimmer - Adjusted for mobile */}
            <div className="absolute left-[-40px] lg:left-[-60px] top-0 bottom-0 w-1/3 md:w-1/2 pointer-events-none group opacity-20 md:opacity-100">
              <div className="relative w-full h-full">
                {/* Shimmer Effect */}
                <motion.div
                  animate={{
                    top: ['-20%', '120%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-x-0 h-20 bg-white/40 blur-2xl z-10 rotate-[20deg] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                />

                <Image
                  src="/images/kusanagi-sword.png"
                  alt="Kusanagi Blade"
                  fill
                  className="object-contain scale-150 -rotate-90 drop-shadow-[20px_0_30px_rgba(0,0,0,0.1)] transition-transform duration-700 group-hover:scale-[1.55]"
                />
              </div>
            </div>

            {/* Legacy Info Panel */}
            <div className="flex flex-col items-start gap-8 relative z-10 pl-6 md:pl-32">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 bg-crimson text-white text-[10px] font-black tracking-[0.3em] uppercase whitespace-nowrap">
                  Legendary Heritage
                </div>
                <h3 className="text-3xl font-black tracking-tight text-ink uppercase font-serif">Legacy</h3>
                <p className="text-sm leading-relaxed text-ink/70 font-medium border-l-2 border-crimson/10 pl-6 py-2">
                  A symbol of precision, myth, and force. The spirit behind $NAGI is drawn from sacred steel, wind, and ancient legend.
                </p>
              </div>

              <div className="flex items-center gap-4 py-2 border-y border-ink/5 w-full">
                <span className="text-[10px] font-black tracking-[0.2em] text-ink/40 uppercase">Wind</span>
                <span className="text-crimson/30">✦</span>
                <span className="text-[10px] font-black tracking-[0.2em] text-ink/40 uppercase">Steel</span>
                <span className="text-crimson/30">✦</span>
                <span className="text-[10px] font-black tracking-[0.2em] text-ink/40 uppercase">Legend</span>
              </div>

              {/* Japanese Legend Stamp with Animation */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 12 }}
                className="mt-8 w-20 h-20 border-4 border-crimson/20 rounded-full flex items-center justify-center relative group/stamp cursor-pointer"
              >
                <div className="absolute inset-1 border border-crimson/40 rounded-full border-dashed" />
                <span className="text-lg font-black text-crimson leading-none flex flex-col items-center drop-shadow-sm">
                  <span>傳</span>
                  <span>説</span>
                </span>
                {/* Ink bleed effect on hover */}
                <div className="absolute inset-0 bg-crimson/5 rounded-full scale-0 group-hover/stamp:scale-100 transition-transform duration-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
