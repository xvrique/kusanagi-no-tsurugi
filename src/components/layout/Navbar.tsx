'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'about', href: '#about' },
    { label: 'mythology', href: '#mythology' },
    { label: 'tokenomics', href: '#tokenomics' },
    { label: 'roadmap', href: '#roadmap' },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'backdrop-blur-md border-b border-ink/10 bg-cream/80'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity z-[110]">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image 
                src="/images/logo-kusanagi.png" 
                alt="NAGI Logo" 
                fill 
                className="object-contain" 
                unoptimized 
              />
            </div>
            <span className="text-base md:text-lg font-black tracking-widest text-ink uppercase italic">$NAGI</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] font-black tracking-[0.3em] text-ink/60 hover:text-crimson transition-all duration-300 uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden z-[110] p-2 text-ink hover:text-crimson transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] md:hidden bg-cream/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={toggleMobileMenu}
                    className="text-4xl font-black tracking-tighter text-ink hover:text-crimson transition-all uppercase font-serif"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Decorative element for mobile menu */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none opacity-5">
              <span className="text-9xl font-serif font-black">草薙</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
