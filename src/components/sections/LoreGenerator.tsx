'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sword, Download, Share2, RefreshCw, Loader2, Sparkles } from 'lucide-react'
import html2canvas from 'html2canvas'
import { generateLore, LoreResult, Rarity } from '@/lib/lore-data'
import Image from 'next/image'
import { Particle } from '../ui/Particle'

export default function LoreGenerator() {
  const [name, setName] = useState('')
  const [lore, setLore] = useState<LoreResult | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState('')
  const cardRef = useRef<HTMLDivElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)

  const handleGenerate = () => {
    if (!name.trim()) {
      setError('Please enter your name to awaken your blade.')
      return
    }
    setError('')
    setIsGenerating(true)

    // Dramatic delay
    setTimeout(() => {
      const result = generateLore(name)
      setLore(result)
      setIsGenerating(false)
    }, 1200)
  }

  const handleDownload = async () => {
    if (!exportRef.current || !lore) return
    setIsExporting(true)

    try {
      // Small delay to ensure render
      await new Promise(resolve => setTimeout(resolve, 300))

      const canvas = await html2canvas(exportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#000000',
        logging: false,
      })

      const link = document.createElement('a')
      link.download = `nagi-${lore.name.toLowerCase()}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
    } catch (err) {
      console.error('Download failed:', err)
      setError('Failed to export artifact. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleShareX = () => {
    if (!lore) return
    const text = `I awakened my Kusanagi fate.\n\n${lore.name}, ${lore.samuraiTitle}\nClan: ${lore.clanName}\nWeapon: ${lore.divineWeapon}\nElement: ${lore.element}\nRarity: ${lore.rarity}\n\nAwaken yours:\nhttps://kusanagi-no-tsurugi.vercel.app\n\n$NAGI #Kusanagi #Base`
    const encodedText = encodeURIComponent(text)
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank')
  }

  // Asset Path Helpers (Handling Typos in public folder)
  const getBackgroundPath = (rarity: Rarity) => `/images/lore/background/${rarity}.png`

  const getElementPath = (element: string) => `/images/lore/elements/${element}.png`

  return (
    <section id="lore" className="min-h-screen bg-darkInk py-24 pb-48 px-6 relative overflow-hidden flex flex-col items-center">
      {/* Particles Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large Guardian Snakes */}
        <Particle src="/images/particles/hebi4.png" className="top-0 -left-[10%] w-[50vw] h-[50vw]" opacity={0.07} delay={0} floatType="subtle" />
        <Particle src="/images/particles/hebi1.png" className="bottom-0 -right-[10%] w-[40vw] h-[40vw]" opacity={0.05} delay={1} floatType="wide" />

        {/* Floating Swords */}
        <Particle src="/images/particles/sword2.png" className="top-[20%] right-[10%] w-48 h-48 -rotate-45" opacity={0.1} delay={2} floatType="subtle" />
        <Particle src="/images/particles/sword3.png" className="bottom-[30%] left-[5%] w-56 h-56 rotate-[160deg]" opacity={0.08} delay={4} floatType="rotate" />

        {/* Dense Leaves */}
        <Particle src="/images/particles/leaves1.png" className="top-[5%] right-[20%] w-20 h-20" opacity={0.3} delay={0.5} floatType="rotate" />
        <Particle src="/images/particles/leaves2.png" className="top-[40%] left-[2%] w-24 h-24" opacity={0.4} delay={1.5} floatType="wide" />
        <Particle src="/images/particles/leaves5.png" className="bottom-[15%] left-[20%] w-32 h-32" opacity={0.3} delay={2.5} floatType="subtle" />
        <Particle src="/images/particles/leaves8.png" className="bottom-[5%] right-[15%] w-40 h-40" opacity={0.25} delay={3.5} floatType="rotate" />
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center opacity-[0.03]">
        <span className="text-[40vw] font-black text-gold leading-none tracking-tighter uppercase whitespace-nowrap">
          神聖
        </span>
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gold/10" />

      <div className="max-w-6xl w-full relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-crimson" />
              <Sword className="text-crimson w-5 h-5" />
              <span className="text-[10px] font-black tracking-[0.4em] text-crimson uppercase">Destiny Engine</span>
              <Sword className="text-crimson w-5 h-5" />
              <div className="h-px w-8 bg-crimson" />
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tight md:tracking-tighter text-cream uppercase mb-4">
              Awaken Your <span className="text-crimson drop-shadow-[0_0_15px_rgba(196,30,58,0.5)]">Blade</span>
            </h2>
            <p className="text-sm text-cream/60 font-medium tracking-wide max-w-md mx-auto leading-relaxed">
              Enter your name and reveal the legend written in your shadow. The divine sword does not choose by chance.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!lore ? (
              /* Phase 1: Ritual Input (Centered) */
              <motion.div
                key="ritual-input"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[360px]"
              >
                <div className="relative group">
                  {/* The Ritual Box */}
                  <div className="bg-black/40 backdrop-blur-xl p-6 relative overflow-hidden border-2 border-gold/40 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                    {/* Interior Atmosphere */}
                    <div className="absolute inset-0 opacity-[0.15] pointer-events-none noise-texture mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,150,12,0.1),transparent)]" />

                    {/* Ancient Decorative Lines */}
                    <div className="absolute top-4 inset-x-4 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                    <div className="absolute bottom-4 inset-x-4 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                    <div className="absolute left-4 inset-y-4 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
                    <div className="absolute right-4 inset-y-4 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

                    {/* Ancient Corner Guards */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-gold/60" />
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-gold/60" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-gold/60" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-gold/60" />

                    <div className="relative z-10 space-y-6">
                      <div className="text-center space-y-3">
                        <div className="flex items-center justify-center gap-3">
                          <div className="h-px w-6 bg-gold/30" />
                          <span className="text-[10px] font-black text-gold/80 tracking-[0.6em] uppercase">Inscribe Your Soul</span>
                          <div className="h-px w-6 bg-gold/30" />
                        </div>
                        <p className="text-xs text-cream/40 italic font-medium leading-relaxed">
                          The divine blade echoes the vibration of your true essence.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="NAME..."
                            maxLength={8}
                            className="w-full bg-black/60 border border-gold/20 px-4 py-4 text-cream font-mono text-base focus:outline-none focus:border-gold/60 transition-all placeholder:text-cream/5 tracking-[0.4em] uppercase text-center"
                          />
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gold w-0 group-focus-within:w-full transition-all duration-1000" />
                        </div>
                        {error && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-crimson text-[9px] font-black uppercase tracking-[0.5em] text-center"
                          >
                            {error}
                          </motion.p>
                        )}
                      </div>

                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full relative py-4 bg-[#0D0B09] border border-gold/40 text-gold hover:bg-gold hover:text-black transition-all duration-700 disabled:opacity-50 group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(184,150,12,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
                        <div className="relative z-10 flex items-center justify-center gap-6">
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-6 h-6 animate-spin text-gold" />
                              <span className="text-sm font-black tracking-[0.5em] uppercase">Forging Identity</span>
                            </>
                          ) : (
                            <>
                              <span className="text-sm font-black tracking-[0.5em] uppercase">Awaken Destiny</span>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                  {/* Spiritual Aura */}
                  <div className="absolute -inset-10 bg-gold/5 blur-[120px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-[2s]" />
                </div>
              </motion.div>
            ) : (
              /* Phase 2: The Revelation (Split Layout) */
              <motion.div
                key="ritual-result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-32 w-full max-w-6xl"
              >
                {/* Left: The Divine Card */}
                <div className="relative order-1 lg:order-1">
                  {/* Background Glow for Card */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gold/10 blur-[150px] pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border border-gold/10 rounded-full animate-pulse pointer-events-none" />

                  <motion.div
                    initial={{ scale: 0.7, rotateY: 90, filter: 'brightness(2) blur(10px)' }}
                    animate={{ scale: 1, rotateY: 0, filter: 'brightness(1) blur(0px)' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 120, delay: 0.2 }}
                    className="relative z-20 group"
                  >
                    {/* The Prophecy Card */}
                    <div
                      ref={cardRef}
                      className="w-[320px] h-[580px] md:w-[400px] md:h-[640px] relative rounded-none overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.9)] bg-black"
                    >
                      {/* Luxury Textures */}
                      <div className="absolute inset-0 opacity-[0.04] pointer-events-none noise-texture mix-blend-screen z-[10]" />
                      <div className="absolute inset-0 border-[4px] border-gold/40 z-50 pointer-events-none" />
                      <div className="absolute inset-2 border border-gold/20 z-50 pointer-events-none" />

                      {/* Decorative Gold Corners */}
                      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold/70 z-50" />
                      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold/70 z-50" />
                      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold/70 z-50" />
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold/70 z-50" />

                      {/* Artwork Layer */}
                      <div className="absolute inset-0 z-0">
                        <Image src={getBackgroundPath(lore.rarity)} alt="Background" fill className="object-cover opacity-70" priority />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_100%)] z-[5]" />
                        <div className="absolute inset-0 bg-black/40 z-[4]" />
                      </div>

                      {/* Content Area */}
                      <div className="relative z-40 h-full flex flex-col px-10 py-8">
                        <div className="relative mb-6 mt-2 text-center">
                          <div className="absolute inset-0 bg-[#0D0B09]/95 border-y border-[#B8960C]/40 shadow-2xl" />
                          <div className="relative z-10 py-4">
                            <div className="text-[11px] font-black text-[#B8960C]/60 tracking-[0.5em] uppercase mb-1">Divine Artifact</div>
                            <h3 className="text-4xl font-black tracking-[0.2em] text-[#F0EDE6] uppercase leading-none">{lore.name}</h3>
                            <div className="flex items-center justify-center gap-4 mt-5">
                              <div className="h-px w-10 bg-[#B8960C]/40" />
                              <p className="text-[10px] font-bold text-[#C41E3A] tracking-[0.5em] uppercase">{lore.samuraiTitle}</p>
                              <div className="h-px w-10 bg-[#B8960C]/40" />
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center relative min-h-0">
                          <div className="absolute w-48 h-48 md:w-64 md:h-64 bg-[#B8960C]/10 rounded-full blur-[60px] md:blur-[80px]" />
                          <Image src={getElementPath(lore.element)} alt={lore.element} width={120} height={120} className="object-contain drop-shadow-[0_0_40px_rgba(184,150,12,0.6)] z-10 md:w-[160px] md:h-[160px]" />
                        </div>

                        <div className="relative mt-auto">
                          <div className="absolute inset-0 bg-[#0D0B09]/95 border-t border-[#B8960C]/20 shadow-2xl" />
                          <div className="relative z-10 py-6 px-8 text-center">
                            <div className="flex items-center justify-center gap-4 mb-4">
                              <div className="h-px w-6 bg-[#C41E3A]/60" />
                              <span className="text-[10px] font-black text-[#C41E3A] tracking-[0.6em] uppercase">The Prophecy</span>
                              <div className="h-px w-6 bg-[#C41E3A]/60" />
                            </div>
                            <p className="text-[13px] text-[#F0EDE6]/90 font-medium leading-relaxed italic tracking-widest">"{lore.prophecy}"</p>
                          </div>
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-[#B8960C]/50" />
                        </div>
                      </div>
                    </div>
                    {/* Holo Sweep */}
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.1)_50%,transparent_60%)] bg-[length:200%_100%] animate-shimmer pointer-events-none z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </motion.div>
                </div>

                {/* Right: Meta Info & Actions */}
                <div className="w-full max-w-[420px] space-y-12 order-2 lg:order-2">

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { label: 'Ancient Clan', value: lore.clanName, icon: '家' },
                      { label: 'Divine Tool', value: lore.divineWeapon, icon: '具' },
                      { label: 'Primal Source', value: lore.element, icon: '素' },
                      { label: 'Universal Tier', value: lore.rarity.replace('Mhytic', 'Mythic'), color: lore.rarityColor, icon: '品' }
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="bg-black/40 backdrop-blur-md border border-gold/10 p-6 relative group/stat overflow-hidden"
                      >
                        {/* Background Kanji Icon */}
                        <div className="absolute -right-2 -bottom-4 text-7xl font-black text-gold/[0.03] pointer-events-none group-hover/stat:text-gold/[0.07] transition-all duration-700">
                          {stat.icon}
                        </div>

                        <div className="relative z-10 flex justify-between items-center">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-gold/40 rotate-45" />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold/60">{stat.label}</span>
                            </div>
                            <div className="text-xl font-black uppercase tracking-[0.1em] text-cream drop-shadow-sm" style={{ color: stat.label === 'Universal Tier' ? stat.color : undefined }}>
                              {stat.value}
                            </div>
                          </div>
                          <div className="w-8 h-8 border border-gold/10 flex items-center justify-center rotate-45 group-hover/stat:border-gold/30 transition-colors">
                            <div className="w-2 h-2 bg-gold/20 -rotate-45 group-hover/stat:bg-gold transition-all duration-700" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Operational Controls */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="grid grid-cols-1 gap-4"
                  >
                    <div className="flex gap-4">
                      <button
                        onClick={handleDownload}
                        disabled={isExporting}
                        className="flex-1 group relative py-6 bg-crimson border border-crimson/40 text-cream overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
                        <div className="relative z-10 flex items-center justify-center gap-4">
                          {isExporting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-500" />
                          )}
                          <span className="text-xs font-black tracking-[0.4em] uppercase">
                            {isExporting ? 'Forging Asset...' : 'Export Asset'}
                          </span>
                        </div>
                      </button>
                      <button
                        onClick={handleShareX}
                        className="aspect-square bg-black/40 border border-gold/20 p-6 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-700 group"
                      >
                        <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </motion.div>

                  <button
                    onClick={() => { setLore(null); setName(''); }}
                    className="w-full py-4 text-[10px] font-black text-cream/30 hover:text-crimson tracking-[0.5em] uppercase transition-all flex items-center justify-center gap-4 group"
                  >
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                    Return to the Shrine
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hidden Export Engine - Zero Dependencies Layout */}
      {lore && (
        <div className="fixed -left-[2000px] top-0 pointer-events-none opacity-0">
          <div
            ref={exportRef}
            style={{
              width: '400px',
              height: '640px',
              backgroundColor: '#000000',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Background */}
            <div style={{ position: 'absolute', inset: 0 }}>
              <img
                src={getBackgroundPath(lore.rarity)}
                alt="Background"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, #000000 100%)' }} />
            </div>

            {/* Borders */}
            <div style={{ position: 'absolute', inset: 0, border: '4px solid rgba(184, 150, 12, 0.4)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: '8px', border: '1px solid rgba(184, 150, 12, 0.2)', pointerEvents: 'none' }} />

            {/* Corners */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '48px', height: '48px', borderTop: '2px solid rgba(184, 150, 12, 0.7)', borderLeft: '2px solid rgba(184, 150, 12, 0.7)' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '48px', height: '48px', borderTop: '2px solid rgba(184, 150, 12, 0.7)', borderRight: '2px solid rgba(184, 150, 12, 0.7)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '48px', height: '48px', borderBottom: '2px solid rgba(184, 150, 12, 0.7)', borderLeft: '2px solid rgba(184, 150, 12, 0.7)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '48px', height: '48px', borderBottom: '2px solid rgba(184, 150, 12, 0.7)', borderRight: '2px solid rgba(184, 150, 12, 0.7)' }} />

            {/* Content Area */}
            <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', padding: '32px 40px' }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '24px', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0D0B09', opacity: 0.95, borderTop: '1px solid #B8960C', borderBottom: '1px solid #B8960C' }} />
                <div style={{ position: 'relative', padding: '20px 0' }}>
                  <div style={{ fontSize: '11px', fontWeight: 900, color: 'rgba(184, 150, 12, 0.6)', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '4px' }}>Divine Artifact</div>
                  <h3 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '0.2em', color: '#F0EDE6', textTransform: 'uppercase', margin: 0 }}>{lore.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '20px' }}>
                    <div style={{ height: '1px', width: '40px', backgroundColor: 'rgba(184, 150, 12, 0.4)' }} />
                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#C41E3A', letterSpacing: '0.5em', textTransform: 'uppercase', margin: 0 }}>{lore.samuraiTitle}</p>
                    <div style={{ height: '1px', width: '40px', backgroundColor: 'rgba(184, 150, 12, 0.4)' }} />
                  </div>
                </div>
              </div>

              {/* Element */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', width: '280px', height: '280px', backgroundColor: 'rgba(184, 150, 12, 0.1)', borderRadius: '100%', filter: 'blur(90px)' }} />
                <img
                  src={getElementPath(lore.element)}
                  alt={lore.element}
                  style={{ width: '160px', height: '160px', objectFit: 'contain', position: 'relative', zIndex: 10 }}
                />
              </div>

              {/* Footer */}
              <div style={{ marginTop: 'auto', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0D0B09', opacity: 0.95, borderTop: '1px solid rgba(184, 150, 12, 0.2)' }} />
                <div style={{ position: 'relative', padding: '32px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ height: '1px', width: '24px', backgroundColor: 'rgba(196, 30, 58, 0.6)' }} />
                    <span style={{ fontSize: '10px', fontWeight: 900, color: '#C41E3A', letterSpacing: '0.6em', textTransform: 'uppercase' }}>The Prophecy</span>
                    <div style={{ height: '1px', width: '24px', backgroundColor: 'rgba(196, 30, 58, 0.6)' }} />
                  </div>
                  <p style={{ fontSize: '13px', color: 'rgba(240, 237, 230, 0.9)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.6, letterSpacing: '0.1em', margin: 0 }}>
                    "{lore.prophecy}"
                  </p>
                </div>
                <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', width: '96px', height: '2px', backgroundColor: 'rgba(184, 150, 12, 0.5)' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
