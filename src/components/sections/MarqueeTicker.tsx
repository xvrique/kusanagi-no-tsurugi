'use client'

import { containsJapanese } from '@/lib/utils'

export default function MarqueeTicker() {
  const items = [
    '草薙の剣',
    'KUSANAGI NO TSURUGI',
    '八岐大蛇',
    'YAMATA NO OROCHI',
    '日本武尊',
    'YAMATO TAKERU',
    '$NAGI',
    'SOLANA MEME COIN',
  ]

  // Duplicate items for seamless loop
  const displayItems = [...items, ...items]

  return (
    <div className="w-full border-t border-b border-ink/20 bg-cream overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .marquee-content {
          animation: marquee 20s linear infinite;
        }
        
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-content flex items-center gap-8 py-4 px-6 whitespace-nowrap">
        {displayItems.map((item, index) => (
          <div key={index} className="flex items-center gap-8">
            <span
              className={`text-sm tracking-wider font-bold ${
                containsJapanese(item)
                  ? 'font-serif text-jp text-[#C41E3A]'
                  : 'font-mono text-[#C41E3A]'
              }`}
            >
              {item}
            </span>
            <span className="text-crimson text-lg">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
