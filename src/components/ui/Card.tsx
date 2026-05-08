'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean
  dark?: boolean
  scanlines?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, bordered = true, dark = false, scanlines = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-none transition-all duration-200',
        bordered && 'border-2 border-[#C41E3A]',
        dark && 'bg-ink text-crimson',
        !dark && 'bg-cream text-ink',
        scanlines && 'relative overflow-hidden',
        className
      )}
      {...props}
    >
      {scanlines && (
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.5) 2px, rgba(0, 0, 0, 0.5) 4px)',
          }}
        />
      )}
      {props.children}
    </div>
  )
)

Card.displayName = 'Card'

export { Card }
