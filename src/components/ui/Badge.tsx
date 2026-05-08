'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-none font-mono font-bold text-xs uppercase tracking-wider',
  {
    variants: {
      variant: {
        default: 'bg-crimson text-[#1A1714] border border-crimson',
        secondary: 'bg-parchment text-[#C41E3A] border border-[#C41E3A]',
        outline: 'bg-transparent text-crimson border-2 border-crimson',
        dark: 'bg-darkInk text-[#C41E3A] border border-[#C41E3A]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), 'px-2 py-1', className)}
      {...props}
    />
  )
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
