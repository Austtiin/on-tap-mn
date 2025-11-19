import { ReactNode } from 'react'
import MuiContainer from '@mui/material/Container'
import Box from '@mui/material/Box'

interface ContainerProps {
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false
  className?: string
}

export function Container({ 
  children, 
  maxWidth = 'xl',
  className = ''
}: ContainerProps) {
  return (
    <MuiContainer 
      maxWidth={maxWidth} 
      className={className}
      sx={{ px: { xs: 2, sm: 4, lg: 8 } }}
    >
      {children}
    </MuiContainer>
  )
}

interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'default' | 'gray' | 'primary' | 'secondary' | 'dark' | 'cream' | 'paper'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  edges?: 'none' | 'top' | 'bottom' | 'both'
}

export function Section({ 
  children, 
  className = '',
  background = 'default',
  padding = 'md',
  edges = 'none'
}: SectionProps) {
  const backgroundMap = {
    default: '#ffffff',
    gray: '#f9fafb',
    primary: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
    secondary: '#fcd34d',
    dark: 'linear-gradient(180deg, #0b0f16 0%, #111827 100%)',
    cream: 'linear-gradient(180deg, #fffbeb 0%, #ffffff 100%)',
    paper: 'linear-gradient(180deg, #fff7ed 0%, #ffffff 100%)'
  }
  
  const paddingMap = {
    sm: { xs: 4, md: 6 },
    md: { xs: 6, md: 8 },
    lg: { xs: 8, md: 10, lg: 12 },
    xl: { xs: 10, md: 12, lg: 16 }
  }
  
  const topFade = edges === 'top' || edges === 'both'
  const bottomFade = edges === 'bottom' || edges === 'both'

  return (
    <Box
      component="section"
      className={className}
      sx={{
        position: 'relative',
        background: backgroundMap[background],
        py: paddingMap[padding],
        color: background === 'primary' || background === 'dark' ? 'white' : 'inherit',
        '&::before': topFade ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 24,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(0,0,0,0))',
          pointerEvents: 'none'
        } : undefined,
        '&::after': bottomFade ? {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 24,
          background: 'linear-gradient(to top, rgba(0,0,0,0.06), rgba(0,0,0,0))',
          pointerEvents: 'none'
        } : undefined,
      }}
    >
      {children}
    </Box>
  )
}
