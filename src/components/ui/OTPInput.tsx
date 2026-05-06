import React, { useRef } from 'react'
import { cn } from '../../lib/utils'

interface OTPInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  className?: string
}

export function OTPInput({
  value,
  onChange,
  length = 6,
  className,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, char: string) => {
    if (!/^\d*$/.test(char)) return

    const newValue = value.split('')
    newValue[index] = char
    const result = newValue.join('').slice(0, length)
    onChange(result)

    // Move focus to next input
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '')
    onChange(pasted.slice(0, length))
  }

  return (
    <div className={cn('flex gap-2', className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            'h-12 w-12 rounded-md border border-gray-700 bg-secondary text-center text-xl font-semibold text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
            className
          )}
        />
      ))}
    </div>
  )
}
