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
      className={`cursor-pointer transition-all duration-500 relative overflow-hidden group min-h-[480px] flex flex-col ${
        isDark
          ? 'bg-ink text-crimson'
          : 'bg-cream text-ink'
      } ${
        isActive
          ? 'border-2 border-ink shadow-2xl z-20 scale-[1.02]'
          : 'border border-ink/20 hover:border-ink/40'
      }`}
      whileHover={!isActive ? { y: -4 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${isActive ? 'bg-ink' : isDark ? 'bg-cream/20' : 'bg-ink/10'} transition-colors duration-300`} />

      {/* Image Section */}
      <div className="relative overflow-hidden aspect-[4/3] p-4 bg-ink/[0.02]">
        {myth.imagePath ? (
          <Image
            src={myth.imagePath}
            alt={myth.name}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-105"
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

        {/* Kanji overlay */}
        <div className={`absolute bottom-4 right-4 text-5xl font-black ${
          isDark ? 'text-[#C41E3A]/10' : 'text-[#C41E3A]/10'
        }`}>
          {myth.kanji}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Japanese name */}
        <p className={`text-[9px] tracking-[0.4em] uppercase mb-1 font-serif ${
          isDark ? 'text-[#C41E3A]/40' : 'text-[#C41E3A]/40'
        }`}>
          {myth.nameJp}
        </p>

        {/* Name */}
        <h3 className="text-xl font-black tracking-tight uppercase mb-1 text-[#1A1714]">
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
            height: isActive ? 'auto' : '2.5rem',
            opacity: isActive ? 1 : 0.6
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="text-[11px] leading-relaxed text-[#1A1714] font-medium">
            {myth.description}
          </p>
        </motion.div>

        {/* Read indicator */}
        <div className="mt-auto pt-8 flex items-center gap-2 text-[9px] font-black tracking-[0.2em] uppercase transition-colors duration-300 text-[#1A1714]">
          <span className={isActive ? 'text-crimson' : 'text-[#1A1714]'}>
            {isActive ? '▼ COLLAPSE' : '► READ MORE'}
          </span>
          <div className={`flex-1 h-px ${isActive ? 'bg-crimson/30' : 'bg-ink/10'}`} />
        </div>
      </div>
    </motion.div>
  )
}
