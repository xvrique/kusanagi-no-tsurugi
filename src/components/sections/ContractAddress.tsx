'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { TOKEN_INFO } from '@/lib/constants'
import { Copy, Check, ShieldCheck, Zap } from 'lucide-react'

export default function ContractAddress() {
  const [copied, setCopied] = useState(false)
  const address = TOKEN_INFO.contractAddress

  const handleCopy = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="bg-cream py-24 px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
      
      {/* Vertical Kanji Label (Right Side) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-none hidden md:flex">
        <span className="text-[10px] font-black tracking-[0.5em] uppercase text-ink/30 [writing-mode:vertical-rl]">CONTRACT</span>
        <div className="h-20 w-px bg-ink/10" />
        <span className="text-xl font-serif text-crimson opacity-40">契約</span>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <ShieldCheck className="text-crimson w-5 h-5" />
              <span className="text-[10px] font-black tracking-[0.4em] text-ink uppercase">Verified Security</span>
              <ShieldCheck className="text-crimson w-5 h-5" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-ink uppercase mb-4">
              Contract <span className="text-crimson">Address</span>
            </h2>
            <p className="text-sm text-ink/60 font-medium tracking-wide max-w-md mx-auto leading-relaxed">
              Ensure you are interacting with the official $NAGI contract on the Base blockchain.
            </p>
          </motion.div>

          {/* Interactive Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full relative group"
          >
            {/* Outer Box with Brutalist Shadow */}
            <div className="relative bg-parchment border-2 border-ink p-1 md:p-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
              <div className="absolute -inset-1 border-2 border-crimson/20 -z-10 translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              <div className="flex flex-col md:flex-row items-stretch md:items-center bg-cream border border-ink/10 overflow-hidden">
                {/* Left: Network Tag */}
                <div className="bg-ink text-cream px-6 py-4 flex items-center justify-center gap-3 border-b md:border-b-0 md:border-r border-ink/20">
                  {/* Base Network Logo SVG */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
                    <circle cx="12" cy="12" r="12" fill="#0052FF"/>
                    <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="white"/>
                  </svg>
                  <span className="text-[11px] font-black tracking-[0.2em] uppercase">BASE</span>
                </div>

                {/* Center: Address String */}
                <div className="flex-1 px-6 py-4 overflow-hidden flex items-center justify-center">
                  <p className="text-xs md:text-sm font-mono font-black text-crimson animate-pulse tracking-[0.3em] uppercase">
                    {address === 'UPCOMING' ? 'UPCOMING' : address}
                  </p>
                </div>

                {/* Right: Copy Button */}
                <button
                  onClick={handleCopy}
                  className="bg-crimson hover:bg-red-700 text-cream px-8 py-4 flex items-center justify-center gap-3 transition-colors relative overflow-hidden group/btn"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" strokeWidth={3} />
                        <span className="text-[11px] font-black tracking-[0.1em] uppercase">COPIED</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        <span className="text-[11px] font-black tracking-[0.1em] uppercase">COPY</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Subtle shine effect */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover/btn:animate-shine" />
                </button>
              </div>
            </div>

            {/* Bottom Status Info */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                <span className="text-[10px] font-bold text-ink/40 uppercase tracking-[0.1em]">Liquidity Burned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                <span className="text-[10px] font-bold text-ink/40 uppercase tracking-[0.1em]">Mint Revoked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                <span className="text-[10px] font-bold text-ink/40 uppercase tracking-[0.1em]">Zero Tax</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
