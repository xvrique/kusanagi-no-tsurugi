/**
 * Kusanagi no Tsurugi ($NAGI) Constants
 * Centralized data for mythology, tokenomics, and roadmap
 */

// ============================================================================
// MYTHOLOGY DATA
// ============================================================================

export interface Myth {
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

export const MYTHOLOGY_DATA: Myth[] = [
  {
    id: 'M1',
    kanji: '武',
    name: 'YAMATO TAKERU',
    nameJp: '日本武尊',
    tag: '(HERO PRINCE)',
    description:
      'Son of Emperor Keikō, the legendary warrior who received Kusanagi from his aunt Yamato-hime and used it to defeat enemies by cutting the grass. A symbol of courage and divine favor.',
    imagePath: '/images/yamato-takeru.png',
    dark: false,
    featured: false,
  },
  {
    id: 'M2',
    kanji: '蛇',
    name: 'YAMATA NO OROCHI',
    nameJp: '八岐大蛇',
    tag: '(EIGHT-HEADED SERPENT)',
    description:
      'Yamata no Orochi (八岐大蛇) — a fearsome serpent deity of Japanese mythology. Eight heads, eight tails. Kusanagi was found within its body by the storm god Susanoo. The blade emerged from the serpent\'s tail, destined for greatness.',
    imagePath: '/images/yamata-no-orochi.png',
    dark: false,
    featured: true,
  },
  {
    id: 'M3',
    kanji: '剣',
    name: 'KUSANAGI NO TSURUGI',
    nameJp: '草薙の剣',
    tag: '(GRASS-CUTTING SWORD)',
    description:
      'One of the three Imperial Treasures of Japan. A legendary sword that cuts the wind itself. Forged from the body of Yamata no Orochi, it represents divine power and eternal legacy. Now minted as $NAGI on Solana.',
    imagePath: '/images/kusanagi-sword.png',
    dark: false,
    featured: true,
  },
]

// ============================================================================
// TOKENOMICS DATA
// ============================================================================

export interface AllocationItem {
  label: string
  percentage: number
  amount: string
  color: string
  description: string
}

export interface TokenomicsData {
  totalSupply: string
  circulatingSupply: string
  decimals: number
  allocations: AllocationItem[]
}

export const TOKENOMICS: TokenomicsData = {
  totalSupply: '1,000,000,000',
  circulatingSupply: '500,000,000',
  decimals: 6,
  allocations: [
    {
      label: 'Retail',
      percentage: 81,
      amount: '810,000,000',
      color: 'bg-crimson',
      description: 'Public allocation and retail traders',
    },
    {
      label: 'Funding',
      percentage: 6,
      amount: '60,000,000',
      color: 'bg-amber-600',
      description: 'Reserved for project funding',
    },
    {
      label: 'Dev',
      percentage: 3,
      amount: '30,000,000',
      color: 'bg-slate-700',
      description: 'Reserved for development and operations',
    },
  ],
}

// ============================================================================
// ROADMAP DATA
// ============================================================================

export interface Milestone {
  phase: string
  title: string
  description: string
  items: string[]
  completed: boolean
  date?: string
}

export interface RoadmapData {
  milestones: Milestone[]
  currentPhase: string
}

export const ROADMAP: RoadmapData = {
  currentPhase: 'Phase 2',
  milestones: [
    {
      phase: 'Phase 1',
      title: 'Genesis Launch',
      description: 'Initial token launch and community building',
      date: 'Q1 2026',
      completed: true,
      items: [
        'Token contract deployment on Solana',
        'Website launch with mythology exhibition',
        'Community X Setup',
        'Initial liquidity pool creation',
        'Social media presence establishment',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Community Growth',
      description: 'Expand community and establish partnerships',
      date: 'Q2 2026',
      completed: false,
      items: [
        'DEX listings (Raydium, Jupiter)',
        'Community governance token launch',
        'Strategic partnerships with other projects',
        'Marketing campaign expansion',
        'Community events and contests',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Ecosystem Development',
      description: 'Build utility and ecosystem around $NAGI',
      date: 'Q3 2026',
      completed: false,
      items: [
        'NFT collection launch',
        'Staking mechanism implementation',
        'DAO governance structure',
        'Cross-chain bridge development',
        'Mobile app launch',
      ],
    },
    {
      phase: 'Phase 4',
      title: 'Global Expansion',
      description: 'Scale to global markets and establish legacy',
      date: 'Q4 2026',
      completed: false,
      items: [
        'International exchange listings',
        'Institutional partnerships',
        'Metaverse integration',
        'Educational content series',
        'Long-term sustainability initiatives',
      ],
    },
  ],
}

// ============================================================================
// TOKEN INFO
// ============================================================================

export interface TokenInfo {
  name: string
  symbol: string
  contractAddress: string
  decimals: number
  totalSupply: string
  circulatingSupply: string
  description: string
  website: string
  twitter: string
  discord: string
  telegram: string
}

export const TOKEN_INFO: TokenInfo = {
  name: 'Kusanagi no Tsurugi',
  symbol: '$NAGI',
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'HzwqSEsf8kqWxW4949pVM5gT3svWmwazcsXH3MsFHwtJ',
  decimals: 6,
  totalSupply: '1,000,000,000',
  circulatingSupply: '500,000,000',
  description: 'A legendary sword minted as a Solana meme coin. Inspired by Japanese mythology.',
  website: 'https://kusanagi-nagi.com',
  twitter: process.env.NEXT_PUBLIC_TWITTER_LINK || 'https://twitter.com/kusanagi_nagi',
  discord: process.env.NEXT_PUBLIC_DISCORD_LINK || 'https://discord.gg/kusanagi',
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_LINK || 'https://t.me/kusanagi_nagi',
}

// ============================================================================
// HOW TO BUY STEPS
// ============================================================================

export interface Step {
  number: number
  title: string
  description: string
  action?: string
  link?: string
}

export const HOW_TO_BUY_STEPS: Step[] = [
  {
    number: 1,
    title: 'Set Up a Solana Wallet',
    description: 'Download and install a Solana-compatible wallet like Phantom, Solflare, or Magic Eden.',
    action: 'Download Wallet',
    link: 'https://phantom.app',
  },
  {
    number: 2,
    title: 'Fund Your Wallet',
    description: 'Transfer SOL tokens to your wallet from an exchange or another wallet.',
    action: 'Get SOL',
    link: 'https://www.coinbase.com',
  },
  {
    number: 3,
    title: 'Visit a DEX',
    description: 'Go to Raydium or Jupiter and connect your wallet.',
    action: 'Open Raydium',
    link: process.env.NEXT_PUBLIC_RAYDIUM_LINK || 'https://raydium.io',
  },
  {
    number: 4,
    title: 'Swap SOL for $NAGI',
    description: 'Enter the amount of SOL you want to swap for $NAGI tokens.',
    action: 'Swap Now',
    link: process.env.NEXT_PUBLIC_RAYDIUM_LINK || 'https://raydium.io',
  },
  {
    number: 5,
    title: 'Confirm Transaction',
    description: 'Review the transaction details and confirm in your wallet.',
    action: 'Confirm',
  },
  {
    number: 6,
    title: 'Receive $NAGI',
    description: 'Your $NAGI tokens will appear in your wallet. Welcome to the legend!',
    action: 'View in Wallet',
  },
]

// ============================================================================
// MARQUEE TICKER ITEMS
// ============================================================================

export const MARQUEE_ITEMS = [
  '草薙の剣',
  '✦',
  'KUSANAGI NO TSURUGI',
  '✦',
  '八岐大蛇',
  '✦',
  'YAMATA NO OROCHI',
  '✦',
  '日本武尊',
  '✦',
  'YAMATO TAKERU',
  '✦',
]

// ============================================================================
// FOOTER LINKS
// ============================================================================

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export const FOOTER_LINKS: FooterLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Mythology', href: '#mythology' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'How to Buy', href: '#how-to-buy' },
  { label: 'Twitter', href: process.env.NEXT_PUBLIC_TWITTER_LINK || '#', external: true },
  { label: 'Discord', href: process.env.NEXT_PUBLIC_DISCORD_LINK || '#', external: true },
  { label: 'Telegram', href: process.env.NEXT_PUBLIC_TELEGRAM_LINK || '#', external: true },
]

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format a Solana token address for display with truncation
 * @param address - Full Solana address (44 characters)
 * @param displayLength - Number of characters to show (default: 8)
 * @returns Formatted address like "XXXX...XXXX"
 */
export function formatTokenAddress(address: string, displayLength: number = 8): string {
  if (address.length < displayLength) {
    return address
  }

  const half = displayLength / 2
  return `${address.slice(0, half)}...${address.slice(-half)}`
}

/**
 * Check if a string contains Japanese characters
 * @param text - Text to check
 * @returns True if text contains Japanese characters
 */
export function containsJapanese(text: string): boolean {
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g
  return japaneseRegex.test(text)
}

/**
 * Get mythology data by ID
 * @param id - Mythology ID (M1, M2, M3)
 * @returns Myth object or undefined
 */
export function getMythologyById(id: string): Myth | undefined {
  return MYTHOLOGY_DATA.find((myth) => myth.id === id)
}

/**
 * Get all completed milestones
 * @returns Array of completed milestones
 */
export function getCompletedMilestones(): Milestone[] {
  return ROADMAP.milestones.filter((milestone) => milestone.completed)
}

/**
 * Get current and upcoming milestones
 * @returns Array of current and upcoming milestones
 */
export function getUpcomingMilestones(): Milestone[] {
  return ROADMAP.milestones.filter((milestone) => !milestone.completed)
}

/**
 * Get mythology data
 * @returns Array of mythology data
 */
export function getMythologyData(): Myth[] {
  return MYTHOLOGY_DATA
}

/**
 * Get tokenomics data
 * @returns Tokenomics data object
 */
export function getTokenomicsData(): TokenomicsData {
  return TOKENOMICS
}

/**
 * Get roadmap data
 * @returns Roadmap data object
 */
export function getRoadmapData(): RoadmapData {
  return ROADMAP
}

/**
 * Get how to buy steps
 * @returns Array of steps
 */
export function getHowToBuySteps(): Step[] {
  return HOW_TO_BUY_STEPS
}
