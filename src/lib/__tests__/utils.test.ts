import {
  formatTokenAddress,
  containsJapanese,
  isValidSolanaAddress,
  getFontFamily,
  clamp,
  mapRange,
} from '../utils'

describe('formatTokenAddress', () => {
  it('should format a valid Solana address with truncation', () => {
    const address = 'HzwqSEsf8kqWxW4949pVM5gT3svWmwazcsXH3MsFHwtJ'
    const result = formatTokenAddress(address)
    expect(result).toBe('Hzwq...HwtJ')
  })

  it('should handle custom display length', () => {
    const address = 'HzwqSEsf8kqWxW4949pVM5gT3svWmwazcsXH3MsFHwtJ'
    const result = formatTokenAddress(address, 12)
    expect(result).toBe('HzwqSEsf...MsFHwtJ')
  })

  it('should return original address if shorter than display length', () => {
    const address = 'short'
    const result = formatTokenAddress(address, 8)
    expect(result).toBe('short')
  })

  it('should handle empty string', () => {
    const result = formatTokenAddress('')
    expect(result).toBe('')
  })
})

describe('containsJapanese', () => {
  it('should detect hiragana characters', () => {
    expect(containsJapanese('こんにちは')).toBe(true)
  })

  it('should detect katakana characters', () => {
    expect(containsJapanese('カタカナ')).toBe(true)
  })

  it('should detect kanji characters', () => {
    expect(containsJapanese('日本')).toBe(true)
  })

  it('should return false for English text', () => {
    expect(containsJapanese('Hello')).toBe(false)
  })

  it('should return true for mixed Japanese and English', () => {
    expect(containsJapanese('こんにちは Hello')).toBe(true)
  })

  it('should return false for numbers and symbols', () => {
    expect(containsJapanese('123!@#')).toBe(false)
  })
})

describe('isValidSolanaAddress', () => {
  it('should validate a correct Solana address', () => {
    const address = 'HzwqSEsf8kqWxW4949pVM5gT3svWmwazcsXH3MsFHwtJ'
    expect(isValidSolanaAddress(address)).toBe(true)
  })

  it('should reject address with wrong length', () => {
    expect(isValidSolanaAddress('short')).toBe(false)
  })

  it('should reject address with invalid characters', () => {
    expect(isValidSolanaAddress('HzwqSEsf8kqWxW4949pVM5gT3svWmwazcsXH3MsFHwtJ0')).toBe(false)
  })

  it('should reject empty string', () => {
    expect(isValidSolanaAddress('')).toBe(false)
  })

  it('should reject null or undefined', () => {
    expect(isValidSolanaAddress('' as string)).toBe(false)
  })
})

describe('getFontFamily', () => {
  it('should return serif for Japanese text', () => {
    expect(getFontFamily('こんにちは')).toBe('font-serif')
  })

  it('should return mono for English text', () => {
    expect(getFontFamily('Hello')).toBe('font-mono')
  })

  it('should return serif for mixed text with Japanese', () => {
    expect(getFontFamily('こんにちは Hello')).toBe('font-serif')
  })
})

describe('clamp', () => {
  it('should return value if within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  it('should return min if value is below range', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  it('should return max if value is above range', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('should handle negative ranges', () => {
    expect(clamp(-5, -10, 0)).toBe(-5)
  })
})

describe('mapRange', () => {
  it('should map value from one range to another', () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50)
  })

  it('should map 0 correctly', () => {
    expect(mapRange(0, 0, 10, 0, 100)).toBe(0)
  })

  it('should map max value correctly', () => {
    expect(mapRange(10, 0, 10, 0, 100)).toBe(100)
  })

  it('should handle negative ranges', () => {
    expect(mapRange(0, -10, 10, 0, 100)).toBe(50)
  })
})
