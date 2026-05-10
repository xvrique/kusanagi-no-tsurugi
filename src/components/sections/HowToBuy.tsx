'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { getHowToBuySteps } from '@/lib/constants'
import { ShieldAlert, Info, ArrowRight, CheckCircle, Lock, AlertTriangle, ExternalLink } from 'lucide-react'
import { Particle } from '../ui/Particle'

const STEP_IMAGES = [
  '/images/howtobuy/1.png?v=2',
  '/images/howtobuy/2-b.png?v=2',
  '/images/howtobuy/3.png?v=2',
  '/images/howtobuy/4-b.png?v=2',
  '/images/howtobuy/5.png?v=2',
  '/images/howtobuy/6.png?v=2',
]

export default function HowToBuy() {
  const steps = getHowToBuySteps()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="how-to-buy" className="relative min-h-screen bg-cream py-20 px-6 overflow-hidden">
      {/* Particles */}
      <Particle src="/images/particles/hebi1.png" className="top-[10%] left-[2%] w-48 h-48 rotate-[15deg]" opacity={0.15} delay={1} floatType="subtle" />
      <Particle src="/images/particles/leaves5.png" className="top-[40%] right-[5%] w-24 h-24" opacity={0.4} delay={0.5} floatType="rotate" />
      <Particle src="/images/particles/leaves6.png" className="bottom-[10%] left-[10%] w-32 h-32" opacity={0.3} delay={2.5} floatType="wide" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-crimson text-lg">✦</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#C41E3A]">
              HOW TO BUY
            </h2>
            <span className="text-crimson text-lg">✦</span>
          </div>
          <p className="text-xs font-mono tracking-[0.3em] text-[#1A1714] uppercase">
            Step-by-step guide to purchase <span className="text-crimson font-bold">$NAGI</span> tokens
          </p>
        </motion.div>

        {/* Steps Grid — 3 cols x 2 rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="group border border-ink/15 bg-cream/40 p-6 relative overflow-hidden hover:border-crimson/40 transition-all duration-500"
            >
              {/* Subtle dotted bg */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#1a1a1a_0.8px,transparent_0.8px)] [background-size:10px_10px]" />

              {/* Step Number + Title */}
              <div className="flex items-center gap-3 mb-5 relative z-10">
                <div className="w-9 h-9 bg-crimson text-[#1A1714] flex items-center justify-center font-black text-sm rounded-md flex-shrink-0">
                  {step.number}
                </div>
                <h3 className="text-sm font-black tracking-tight text-[#C41E3A] uppercase leading-tight">
                  {step.title}
                </h3>
              </div>

              {/* Step Image */}
              <div className="relative w-full h-32 mb-5 flex items-center justify-center">
                <Image
                  src={STEP_IMAGES[index]}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain drop-shadow-sm"
                  unoptimized
                />
              </div>

              {/* Description */}
              <p className="text-[11px] text-[#1A1714] mb-5 leading-relaxed relative z-10">
                {step.description}
              </p>

              {/* Action Link */}
              {step.action && (
                <div className="relative z-10">
                  {step.link ? (
                    <a
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-crimson hover:text-crimson/70 transition-colors group/link"
                    >
                      {step.action}
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-crimson">
                      {step.action}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Security Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="border border-ink/15 bg-cream/40 p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Icon + Title */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-crimson" />
              </div>
              <h3 className="text-sm font-black tracking-wider uppercase text-[#C41E3A]">
                Security Reminder
              </h3>
            </div>

            {/* Items in a row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#1A1714] mt-0.5 flex-shrink-0" />
                <span className="text-[10px] text-[#1A1714] leading-tight">Always verify the contract address before trading</span>
              </div>
              <div className="flex items-start gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[#1A1714] mt-0.5 flex-shrink-0" />
                <span className="text-[10px] text-[#1A1714] leading-tight">Use official DEX links only</span>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-[#1A1714] mt-0.5 flex-shrink-0" />
                <span className="text-[10px] text-[#1A1714] leading-tight">Never share your private key or seed phrase</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-[#1A1714] mt-0.5 flex-shrink-0" />
                <span className="text-[10px] text-[#1A1714] leading-tight">Be aware of scams and fake tokens</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border border-ink/15 bg-cream/40 p-6 md:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1A1714]/5 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-[#1A1714]" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-wider uppercase text-[#C41E3A] mb-2">
                Disclaimer
              </h3>
              <p className="text-[11px] text-[#1A1714] leading-relaxed max-w-2xl">
                $NAGI is a coin and is not financial advice. Cryptocurrency trading carries risk. Only invest what you can afford to lose. Do your own research (DYOR) before making any investment decisions. The team is not responsible for any losses incurred.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
