'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: 'About', href: '#about' },
    { label: 'Mythology', href: '#mythology' },
    { label: 'Tokenomics', href: '#tokenomics' },
    { label: 'Roadmap', href: '#roadmap' },
  ]

  const socialLinks = [
    { label: 'Twitter', href: process.env.NEXT_PUBLIC_TWITTER_LINK || '#', icon: '𝕏' },
    { label: 'Discord', href: process.env.NEXT_PUBLIC_DISCORD_LINK || '#', icon: '◆' },
    { label: 'Telegram', href: process.env.NEXT_PUBLIC_TELEGRAM_LINK || '#', icon: '✈' },
  ]

  return (
    <footer className="bg-cream text-ink py-16 border-t-2 border-crimson/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-crimson rounded-full flex items-center justify-center">
                <span className="text-ink text-xs font-bold">⊙</span>
              </div>
              <span className="text-sm font-bold tracking-wider">$NAGI</span>
            </div>
            <p className="text-xs text-ink leading-relaxed">
              A legendary sword minted as a Solana meme coin. Inspired by Japanese mythology.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-crimson">Navigation</h3>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-ink hover:text-crimson transition-colors duration-200 uppercase tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-crimson">Community</h3>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-ink hover:text-crimson transition-colors duration-200 uppercase tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-crimson">Legal</h3>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="text-xs text-ink hover:text-crimson transition-colors duration-200 uppercase tracking-wide"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-xs text-ink hover:text-crimson transition-colors duration-200 uppercase tracking-wide"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-ink hover:text-crimson transition-colors duration-200 uppercase tracking-wide"
              >
                Disclaimer
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-ink/10 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink tracking-wide">
            © {currentYear} Kusanagi no Tsurugi. All rights reserved.
          </p>
          <p className="text-xs text-crimson tracking-wide">
            $NAGI is a meme coin. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
