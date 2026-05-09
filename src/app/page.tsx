'use client'

import Hero from '@/components/sections/Hero'
import Mythology from '@/components/sections/Mythology'
import LoreGenerator from '@/components/sections/LoreGenerator'
import About from '@/components/sections/About'
import ContractAddress from '@/components/sections/ContractAddress'
import Tokenomics from '@/components/sections/Tokenomics'
import Roadmap from '@/components/sections/Roadmap'
import HowToBuy from '@/components/sections/HowToBuy'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="w-full">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="particle">剣</div>
        <div className="particle">刀</div>
        <div className="particle">武</div>
        <div className="particle">神</div>
        <div className="particle">龍</div>
        <div className="particle">鬼</div>
        <div className="particle">火</div>
        <div className="particle">風</div>
        <div className="particle">水</div>
        <div className="particle">土</div>
      </div>
      <div className="relative z-10">
        <Hero />
        <Mythology />
        <LoreGenerator />
        <About />
        <ContractAddress />
        <Tokenomics />
        <Roadmap />
        <HowToBuy />
        <Footer />
      </div>
    </div>
  )
}
