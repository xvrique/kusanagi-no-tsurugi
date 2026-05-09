'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'backdrop-blur-md border-b border-ink/10 bg-transparent'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="relative w-10 h-10">
            <Image 
              src="/images/main-logo.png" 
              alt="NAGI Logo" 
              fill 
              className="object-contain" 
              unoptimized 
            />
          </div>
          <span className="text-lg font-bold tracking-wider text-ink">$NAGI</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-ink hover:text-crimson transition-colors duration-200 uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href={process.env.NEXT_PUBLIC_RAYDIUM_LINK || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 md:px-4 md:py-2 bg-crimson text-black text-xs md:text-sm font-bold tracking-wider hover:bg-crimson/90 transition-colors duration-200 uppercase whitespace-nowrap flex-shrink-0"
        >
          ✳ buy $nagi ✳
        </a>
      </div>
    </motion.nav>
  )
}
