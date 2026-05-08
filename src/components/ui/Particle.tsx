'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ParticleProps {
  src: string
  className: string
  delay?: number
  duration?: number
  floatType?: 'subtle' | 'wide' | 'rotate'
  opacity?: number
}

export function Particle({ 
  src, 
  className, 
  delay = 0, 
  duration = 8, 
  floatType = 'subtle',
  opacity = 0.4
}: ParticleProps) {
  let animate = {}
  
  if (floatType === 'subtle') {
    animate = { y: [0, -15, 0], x: [0, 10, 0] }
  } else if (floatType === 'wide') {
    animate = { y: [0, -30, 0], x: [0, 20, 0] }
  } else if (floatType === 'rotate') {
    animate = { y: [0, -20, 0], rotate: [-5, 5, -5] }
  }

  return (
    <div className={`absolute pointer-events-none z-0 ${className}`} style={{ opacity }}>
      <motion.div
        animate={animate}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
        className="relative w-full h-full"
      >
        <Image 
          src={src} 
          alt="" 
          fill 
          unoptimized={true}
          className="object-contain drop-shadow-lg" 
          sizes="(max-width: 768px) 150px, 300px" 
        />
      </motion.div>
    </div>
  )
}
