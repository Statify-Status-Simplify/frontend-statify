import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 uppercase',
  {
    variants: {
      variant: {
        default:
          'border border-transparent bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20',
        secondary:
          'border border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
        destructive:
          'border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20',
        outline: 'border border-zinc-700 text-zinc-300',
        success: 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
        warning: 'border border-amber-500/20 bg-amber-500/10 text-amber-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
