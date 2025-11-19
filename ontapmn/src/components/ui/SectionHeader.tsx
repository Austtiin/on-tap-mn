import { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: ReactNode
  align?: 'left' | 'center'
  size?: 'md' | 'lg'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  size = 'md',
  className = ''
}: SectionHeaderProps) {
  const titleClasses =
    size === 'lg'
      ? 'text-2xl lg:text-3xl font-bold text-accent'
      : 'text-xl lg:text-2xl font-bold text-accent'

  const subtitleClasses =
    size === 'lg'
      ? 'text-base text-gray-600 leading-relaxed'
      : 'text-sm text-gray-600 leading-relaxed'

  const containerAlign = align === 'center' ? 'text-center' : 'text-left'
  const wrapperAlign = align === 'center' ? 'mx-auto' : ''

  return (
    <div className={`${containerAlign} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs tracking-wide ${wrapperAlign} mb-3`}>
          <span className="inline-flex w-1.5 h-1.5 rounded-full bg-amber-500" />
          {eyebrow}
        </div>
      )}
      <h2 className={`${titleClasses} mb-3`}>{title}</h2>
      {subtitle && (
        <div className={`${subtitleClasses} ${align === 'center' ? 'max-w-3xl mx-auto' : ''}`}>{subtitle}</div>
      )}
    </div>
  )
}
