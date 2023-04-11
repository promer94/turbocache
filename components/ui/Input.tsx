import * as React from 'react'

import { cn } from '~/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixItem?: React.ReactNode
  suffixItem?: React.ReactNode
  inputClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputClassName, suffixItem, prefixItem, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 w-full items-center gap-2',
          'rounded-md border border-green-300',
          'bg-transparent',
          'px-3 py-2',
          'text-sm placeholder:text-gray-300',
          'focus-within:outline-none focus-within:ring-2',
          'focus-within:ring-green-300',
          'focus-within:ring-offset-2',
          className
        )}
      >
        {prefixItem}
        <input
          {...props}
          ref={ref}
          className={cn('flex-1 focus-visible:outline-none', inputClassName)}
        />
        {suffixItem}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
