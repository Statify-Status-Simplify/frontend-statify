import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/25',
        destructive: 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/25',
        outline: 'border border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-100',
        secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700',
        ghost: 'hover:bg-zinc-800/50 text-zinc-300 hover:text-white',
        link: 'text-indigo-400 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-6 py-3',
        sm: 'h-9 rounded-lg px-4',
        lg: 'h-14 rounded-2xl px-10 text-base',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
