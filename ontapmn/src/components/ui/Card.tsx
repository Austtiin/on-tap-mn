import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'featured' | 'event'
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({ 
  children, 
  variant = 'default',
  className = '',
  hover = false,
  onClick 
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden'
  
  const variantClasses = {
    default: 'border border-gray-200',
    featured: 'border-2 border-secondary shadow-lg',
    event: 'border border-accent-light'
  }
  
  const hoverClasses = hover ? 'transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer' : ''
  const clickableClass = onClick ? 'cursor-pointer' : ''
  
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-4 py-3 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`px-4 py-3 ${className}`}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-4 py-3 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  )
}