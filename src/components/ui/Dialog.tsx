import React, { createContext, useContext, useState } from 'react'
import { cn } from '../../lib/utils'
import { X } from 'lucide-react'

interface DialogContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen

  const setOpen = (newOpen: boolean) => {
    setInternalOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </div>
  )
}

export { Dialog, DialogOverlay, DialogContent }

interface DialogTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

export function DialogTrigger({ children }: DialogTriggerProps) {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('DialogTrigger must be used within Dialog')
  }

  return (
    <div onClick={() => context.setOpen(true)}>
      {children}
    </div>
  )
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

export function DialogContent({ children, className }: DialogContentProps) {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('DialogContent must be used within Dialog')
  }

  if (!context.open) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/80"
        onClick={() => context.setOpen(false)}
      />
      <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border border-gray-700 bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <button
          onClick={() => context.setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <div className={className}>{children}</div>
      </div>
    </>
  )
}

interface DialogHeaderProps {
  className?: string
  children: React.ReactNode
}

export function DialogHeader({ className, children }: DialogHeaderProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}>
      {children}
    </div>
  )
}

interface DialogTitleProps {
  className?: string
  children: React.ReactNode
}

export function DialogTitle({ className, children }: DialogTitleProps) {
  return (
    <h2
      className={cn(
        'text-lg font-semibold leading-none tracking-tight text-foreground',
        className
      )}
    >
      {children}
    </h2>
  )
}

interface DialogDescriptionProps {
  className?: string
  children: React.ReactNode
}

export function DialogDescription({ className, children }: DialogDescriptionProps) {
  return (
    <p className={cn('text-sm text-muted', className)}>
      {children}
    </p>
  )
}

interface DialogFooterProps {
  className?: string
  children: React.ReactNode
}

export function DialogFooter({ className, children }: DialogFooterProps) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}
    >
      {children}
    </div>
  )
}
