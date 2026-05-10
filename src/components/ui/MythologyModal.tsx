'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Sword, BookOpen, ScrollText } from 'lucide-react'

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

interface MythologyModalProps {
  myth: Myth | null
  onClose: () => void
}

export default function MythologyModal({ myth, onClose }: MythologyModalProps) {
  if (!myth) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-ink/90 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-cream overflow-hidden border-2 border-crimson/30 shadow-[0_0_50px_rgba(196,30,58,0.2)] flex flex-col md:flex-row h-full max-h-[85vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-30 p-2 bg-ink text-cream hover:bg-crimson transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: Visuals */}
          <div className="w-full h-72 md:h-full md:w-1/2 relative bg-ink overflow-hidden border-b md:border-b-0 md:border-r border-crimson/20 flex-shrink-0">
            {/* Background Kanji */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <span className="text-[40vw] md:text-[20vw] font-black text-crimson font-serif">
                {myth.kanji}
              </span>
            </div>

            {/* Main Image */}
            <div className="relative w-full h-full p-8 md:p-12 flex items-center justify-center">
              {myth.imagePath ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={myth.imagePath}
                    alt={myth.name}
                    fill
                    className="object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                  />
                </motion.div>
              ) : (
                <span className="text-[15vw] font-black text-cream opacity-20">{myth.kanji}</span>
              )}
            </div>

            {/* Side Label */}
            <div className="absolute bottom-12 left-12 flex flex-col gap-2">
              <span className="text-[10px] font-black tracking-[0.5em] text-crimson uppercase">FRAGMENT COLLECTED</span>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-3 h-3 border ${i === 1 ? 'bg-crimson border-crimson' : 'border-crimson/30'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Information */}
          <div className="w-full md:w-1/2 overflow-y-auto custom-scrollbar bg-parchment/30">
            <div className="p-8 md:p-12 space-y-10">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sword className="w-4 h-4 text-crimson" />
                  <span className="text-[10px] font-black tracking-[0.4em] text-ink/50 uppercase">SACRED SCROLL #{myth.id}</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-ink leading-tight uppercase">
                  {myth.name}
                </h3>
                <p className="text-lg text-crimson font-serif font-black tracking-wider uppercase">
                  {myth.nameJp} — {myth.tag}
                </p>
              </div>

              {/* Lore Description */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-ink/10 pb-4">
                  <BookOpen className="w-4 h-4 text-ink/60" />
                  <h4 className="text-[11px] font-black tracking-[0.3em] uppercase text-ink/80">The Legend</h4>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-ink/80 font-medium whitespace-pre-wrap">
                  {myth.description}
                  {"\n\n"}
                  The legacy of {myth.name} is etched into the very fabric of Japanese mythology. As part of the divine treasures, its influence extends beyond mere storytelling, representing the unbreakable spirit and the sharp edge of destiny.
                </p>
              </div>

              {/* Timeline Story */}
              <div className="space-y-8 pb-10">
                <div className="flex items-center gap-3 border-b border-ink/10 pb-4">
                  <ScrollText className="w-4 h-4 text-ink/60" />
                  <h4 className="text-[11px] font-black tracking-[0.3em] uppercase text-ink/80">Chronicle Timeline</h4>
                </div>
                <div className="relative pl-8 border-l border-ink/10 space-y-10">
                  <div className="relative">
                    <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-crimson border-4 border-parchment" />
                    <p className="text-[10px] font-black text-crimson tracking-[0.2em] uppercase mb-1">Birth of Legend</p>
                    <p className="text-xs text-ink/70 font-medium">Forged in the tail of the great serpent Yamata no Orochi during the age of gods.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-crimson/30 border-4 border-parchment" />
                    <p className="text-[10px] font-black text-ink tracking-[0.2em] uppercase mb-1">Imperial Ascension</p>
                    <p className="text-xs text-ink/70 font-medium">Recognized as one of the Three Imperial Treasures of Japan, symbolizing divine authority.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-crimson/10 border-4 border-parchment" />
                    <p className="text-[10px] font-black text-ink tracking-[0.2em] uppercase mb-1">Eternal Spirit</p>
                    <p className="text-xs text-ink/70 font-medium">Preserved within the Atsuta Shrine, the blade's spirit now manifests in the digital age.</p>
                  </div>
                </div>
              </div>

              {/* Lore Fragment Box */}
              <div className="bg-ink p-6 md:p-8 flex items-center justify-between group cursor-pointer hover:bg-crimson transition-colors duration-500">
                <div>
                  <p className="text-[10px] font-black text-cream/40 uppercase tracking-[0.3em] mb-1">HIDDEN KNOWLEDGE</p>
                  <p className="text-sm font-black text-cream uppercase tracking-tighter">COLLECT LORE FRAGMENT</p>
                </div>
                <div className="w-10 h-10 border border-cream/20 flex items-center justify-center group-hover:border-cream/100 transition-colors">
                  <span className="text-cream text-lg font-serif">✦</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
  )
}
