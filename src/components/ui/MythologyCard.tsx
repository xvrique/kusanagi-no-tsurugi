'use client'

import Image from 'next/image'
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

interface MythologyCardProps {
  myth: Myth
  isActive: boolean
  onClick: () => void
  index: number
}

export default function MythologyCard({ myth, isActive, onClick, index }: MythologyCardProps) {
  const isDark = myth.dark || false

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`cursor-pointer transition-all duration-500 relative overflow-hidden group min-h-[520px] flex flex-col ${
        isDark
          ? 'bg-ink text-crimson'
          : 'bg-cream text-ink'
      } ${
        isActive
          ? 'border-2 border-crimson shadow-[0_0_40px_rgba(196,30,58,0.15)] z-20 scale-[1.02]'
          : 'border border-ink/20 hover:border-crimson/40 shadow-sm hover:shadow-xl'
      }`}
      whileHover={!isActive ? { y: -8 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Archive Label Accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none z-30`}>
        <div className={`absolute top-0 right-0 w-[140%] h-8 translate-x-[30%] translate-y-[40%] rotate-45 flex items-center justify-center text-[8px] font-black tracking-[0.2em] uppercase ${
          isActive ? 'bg-crimson text-cream' : 'bg-ink text-cream opacity-20 group-hover:opacity-100'
        } transition-all duration-300`}>
          {isActive ? 'OPENED' : 'ARCHIVE'}
        </div>
      </div>

      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${isActive ? 'bg-crimson' : isDark ? 'bg-cream/20' : 'bg-ink/10'} transition-colors duration-300`} />

      {/* Image Section */}
      <div className="relative overflow-hidden aspect-[4/3] p-4 bg-ink/[0.02]">
        {/* Animated Background Pulse for Active */}
        {isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-crimson"
          />
        )}

        {myth.imagePath ? (
          <Image
            src={myth.imagePath}
            alt={myth.name}
            fill
            className="object-contain transition-transform duration-1000 group-hover:scale-110 sepia-filter"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-ink' : 'bg-parchment'}`}>
            <span className="text-8xl opacity-20">{myth.kanji}</span>
          </div>
        )}

        {/* Index badge */}
        <div className={`absolute top-4 left-4 px-2.5 py-1 text-[9px] font-black tracking-[0.3em] uppercase ${
          isDark ? 'bg-cream/10 text-[#C41E3A] backdrop-blur-sm' : 'bg-ink/5 text-[#C41E3A] backdrop-blur-sm'
        }`}>
          #{myth.id} — {String(index + 1).padStart(2, '0')}
        </div>

        {/* Lore Fragments Indicator */}
        <div className="absolute bottom-4 left-4 flex gap-1 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-crimson shadow-[0_0_5px_rgba(196,30,58,0.8)]" />
          <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-crimson/50' : 'bg-ink/10'}`} />
          <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-crimson/20' : 'bg-ink/10'}`} />
          <span className="text-[7px] font-bold text-ink/30 ml-2 tracking-widest uppercase">FRAGMENTS</span>
        </div>

        {/* Kanji overlay */}
        <div className={`absolute bottom-2 right-4 text-6xl font-black transition-all duration-500 ${
          isActive ? 'text-crimson/10 scale-110' : 'text-crimson/5'
        }`}>
          {myth.kanji}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        {/* Japanese name */}
        <p className={`text-[10px] tracking-[0.5em] uppercase mb-1 font-serif font-black ${
          isActive ? 'text-crimson' : 'text-ink/30'
        } transition-colors`}>
          {myth.nameJp}
        </p>

        {/* Name */}
        <h3 className="text-2xl font-black tracking-tighter uppercase mb-1 text-ink">
          {myth.name}
        </h3>

        {/* Tag */}
        <p className="text-[10px] font-bold tracking-[0.2em] text-crimson uppercase mb-6">
          ({myth.tag})
        </p>

        {/* Description - expanded when active */}
        <motion.div
          initial={false}
          animate={{
            height: isActive ? 'auto' : '3.5rem',
            opacity: isActive ? 1 : 0.4
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="text-xs leading-relaxed text-ink/70 font-medium italic">
            {myth.description}
          </p>
        </motion.div>

        {/* Action Button */}
        <div className="mt-auto pt-8 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[9px] font-black tracking-[0.3em] uppercase transition-colors duration-300">
            <span className={isActive ? 'text-crimson' : 'text-ink/40 group-hover:text-ink'}>
              {isActive ? '► SCROLL TO EXPLORE' : '► UNLOCK LORE'}
            </span>
            <div className={`flex-1 h-px ${isActive ? 'bg-crimson/30' : 'bg-ink/10'}`} />
          </div>
          
          <button className={`w-full py-3 border-2 text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 ${
            isActive ? 'bg-crimson border-crimson text-cream shadow-lg' : 'bg-transparent border-ink/10 text-ink/40 group-hover:border-ink group-hover:text-ink'
          }`}>
            {isActive ? 'READ SACRED SCROLL' : 'OPEN ARCHIVE'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
