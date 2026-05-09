export type Rarity = 'Ronin' | 'Samurai' | 'Shogun' | 'Legendary' | 'Mhytic' | 'Divine' | 'Secret'

export const RARITIES: { name: Rarity; weight: number; color: string }[] = [
  { name: 'Ronin', weight: 40, color: '#9E9A94' }, // Gray/Silver
  { name: 'Samurai', weight: 30, color: '#D4AF37' }, // Gold
  { name: 'Shogun', weight: 15, color: '#FFBF00' }, // Amber
  { name: 'Legendary', weight: 8, color: '#FFD700' }, // Yellow/Gold
  { name: 'Mhytic', weight: 4, color: '#C41E3A' }, // Red/Pink (Using misspelled name for asset match)
  { name: 'Divine', weight: 2, color: '#F0EDE6' }, // White/Gold
  { name: 'Secret', weight: 1, color: '#8A2BE2' }, // Purple/Violet
]

export const ELEMENTS = [
  'Wind', 'Flame', 'Moon', 'Storm', 'Shadow', 'Jade', 
  'Thunder', 'Sakura', 'Abyss', 'Dragon', 'Solar', 'Eclipse'
]

export const ROLES = [
  'Bearer', 'Ronin', 'Guardian', 'Warden', 'Orochi Slayer', 
  'Storm Heir', 'Shrine Keeper', 'Moonbound Samurai', 
  'Blade Saint', 'Serpent Bane', 'Divine Ronin'
]

export const TITLE_OBJECTS = [
  'Wind-Cutting Blade', 'Crimson Moon', 'Silent Shrine', 'Divine Steel', 
  'Eastern Storm', 'Orochi Flame', 'Moonlit Fang', 'Sacred Thunder', 
  'Jade Eclipse', 'Shadow Gate', 'Solar Katana', 'Abyssal Temple'
]

export const CLANS = [
  'House of Silent Storms', 'Clan Tsukikage', 'Lineage of the Moonlit Fang', 
  'The Orochi-Bane Bloodline', 'House of Divine Ash', 'Clan Akaryu', 
  'Shrineborn Clan of Kusanagi', 'House of the Jade Flame', 'Clan of the Broken Moon', 
  'The Storm-Sealed Lineage', 'House of Crimson Wind', 'Clan Yoru no Kiba'
]

export const WEAPONS = [
  'Kusanagi no Kage', 'Kusanagi no Arashi', 'Moonbreaker Katana', 
  'The Jade Fang', 'Orochi-Severing Tachi', 'Storm-Cleaving Blade', 
  'Solar Edge', 'Eclipse Wakizashi', 'Thunderbound Naginata', 
  'Abyss Fang', 'Sakura Requiem', 'Dragonfire Tachi'
]

export const PROPHECY_TEMPLATES = [
  "Chosen beneath the moonless sky,\nyou carry the calm before the storm.\nWhen Orochi rises,\nyour blade shall divide shadow from destiny.",
  "The old gods whispered your name in silence.\nWhen the serpent wakes,\nyour steel will answer first.",
  "Born from ash, crowned by thunder,\nyou are the hand that unsheathes fate.",
  "Where others see darkness,\nyou see the path of the blade.\nThe shrine has remembered your name.",
  "The wind does not follow you.\nIt kneels before your blade.",
  "In the hour of crimson moonlight,\nyour clan shall rise from forgotten smoke.",
  "The serpent dreams in the deep.\nYour weapon is the dawn\nthat cuts through its shadow.",
  "No crown commands you.\nNo master owns your fate.\nOnly the blade knows your name."
]

export interface LoreResult {
  name: string
  samuraiTitle: string
  clanName: string
  divineWeapon: string
  element: string
  rarity: Rarity
  prophecy: string
  rarityColor: string
}

export function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function pickWeightedRarity(): { name: Rarity; color: string } {
  const totalWeight = RARITIES.reduce((sum, r) => sum + r.weight, 0)
  let random = Math.random() * totalWeight
  
  for (const rarity of RARITIES) {
    if (random < rarity.weight) {
      return { name: rarity.name, color: rarity.color }
    }
    random -= rarity.weight
  }
  
  return { name: 'Ronin', color: '#9E9A94' }
}

export function generateLore(userName: string): LoreResult {
  const rarityInfo = pickWeightedRarity()
  const role = pickRandom(ROLES)
  const titleObj = pickRandom(TITLE_OBJECTS)
  const element = pickRandom(ELEMENTS)
  
  return {
    name: userName.trim().toUpperCase(),
    samuraiTitle: `${role} of the ${titleObj}`,
    clanName: pickRandom(CLANS),
    divineWeapon: pickRandom(WEAPONS),
    element,
    rarity: rarityInfo.name,
    rarityColor: rarityInfo.color,
    prophecy: pickRandom(PROPHECY_TEMPLATES)
  }
}
