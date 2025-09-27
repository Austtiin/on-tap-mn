import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  className?: string
  padding?: boolean
}

export function Container({ 
  children, 
  maxWidth = 'xl',
  className = '',
  padding = true 
}: ContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full'
  }
  
  const paddingClass = padding ? 'container-padding' : ''
  
  return (
    <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClass} ${className}`}>
      {children}
    </div>
  )
}

interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'default' | 'gray' | 'primary' | 'secondary'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Section({ 
  children, 
  className = '',
  background = 'default',
  padding = 'md'
}: SectionProps) {
  const backgroundClasses = {
    default: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-accent'
  }
  
  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16', 
    xl: 'py-20'
  }
  
  return (
    <section className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </section>
  )
}