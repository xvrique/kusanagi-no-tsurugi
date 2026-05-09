'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MythologyCard from '@/components/ui/MythologyCard'
import MythologyModal from '@/components/ui/MythologyModal'
import { getMythologyData } from '@/lib/constants'
import { Particle } from '../ui/Particle'

export default function Mythology() {
  const [active, setActive] = useState<string | null>(null)
  const [selectedMyth, setSelectedMyth] = useState<any | null>(null)
  const myths = getMythologyData()

  const playSwordSound = () => {
    const audio = new Audio('/sounds/swordslice.mp3')
    audio.volume = 0.3
    audio.play().catch(() => {
      // Ignore audio play errors (e.g. browser policy)
    })
  }

  const handleCardClick = (myth: any) => {
    playSwordSound()
    if (active === myth.id) {
      setSelectedMyth(myth)
    } else {
      setActive(myth.id)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  }

  return (
    <section id="mythology" className={`min-h-screen bg-cream py-24 pb-48 px-6 relative overflow-hidden ${selectedMyth ? 'z-[100]' : 'z-0'}`}>
      {/* Particles */}
      <Particle src="/images/particles/sword2.png" className="top-[5%] left-[5%] w-32 h-32 -rotate-12" opacity={0.15} delay={1} floatType="subtle" />
      <Particle src="/images/particles/hebi3.png" className="top-[30%] right-[2%] w-48 h-48 rotate-45" opacity={0.1} delay={0.5} floatType="subtle" />
      <Particle src="/images/particles/leaves8.png" className="bottom-[15%] right-[10%] w-24 h-24" opacity={0.4} delay={2} floatType="rotate" />

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-ink/10" />
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-10 -right-20 text-[15vw] font-black text-ink/[0.05] leading-none tracking-tighter uppercase whitespace-nowrap">
          草薙の剣
        </div>
        <div className="absolute -bottom-10 -left-10 text-[15vw] font-black text-ink/[0.05] leading-none tracking-tighter uppercase whitespace-nowrap">
          草薙の剣
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          {/* Top label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-crimson" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-crimson">EXHIBITION</span>
            <div className="h-px flex-1 bg-ink/10" />
          </div>

          {/* Title row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-ink leading-tight md:leading-[0.9] uppercase mb-3">
                MYTHOLOGY
                <br />
                <span className="text-crimson">ARCHIVE</span>
              </h2>
              <p className="text-sm font-serif text-[#C41E3A] tracking-wider">神話の記録 — Records of Myth</p>
            </div>

            <div className="flex items-center gap-6 pb-2">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-ink">
                {myths.length} LEGENDS
              </span>
              <div className="flex gap-1.5">
                {myths.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleCardClick(m)}
                    className={`w-2.5 h-2.5 transition-all duration-300 ${active === m.id ? 'bg-crimson scale-125' : 'bg-ink/20 hover:bg-ink/40'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-20"
        >
          {myths.map((myth, index) => (
            <motion.div key={myth.id} variants={itemVariants}>
              <MythologyCard
                myth={myth}
                isActive={active === myth.id}
                onClick={() => handleCardClick(myth)}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedMyth && (
            <MythologyModal 
              myth={selectedMyth} 
              onClose={() => setSelectedMyth(null)} 
            />
          )}
        </AnimatePresence>



        {/* Bottom decorative line */}
        <div className="mt-20 flex items-center gap-4">
          <div className="h-px flex-1 bg-ink/10" />
          <span className="text-[9px] font-bold tracking-[0.5em] uppercase text-crimson">✢ ✢ ✢</span>
          <div className="h-px flex-1 bg-ink/10" />
        </div>
      </div>
    </section>
  )
}
