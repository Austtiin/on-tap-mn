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
  background?: 'default' | 'gray' | 'primary' | 'secondary'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Section({ 
  children, 
  className = '',
  background = 'default',
  padding = 'md'
}: SectionProps) {
  const backgroundMap = {
    default: '#ffffff',
    gray: '#f9fafb',
    primary: 'linear-gradient(to bottom right, #8b1538, #6b1028)',
    secondary: '#fbbf24'
  }
  
  const paddingMap = {
    sm: { xs: 4, md: 6 },
    md: { xs: 6, md: 8 },
    lg: { xs: 8, md: 10, lg: 12 },
    xl: { xs: 10, md: 12, lg: 16 }
  }
  
  return (
    <Box
      component="section"
      className={className}
      sx={{
        background: backgroundMap[background],
        py: paddingMap[padding],
        color: background === 'primary' ? 'white' : 'inherit'
      }}
    >
      {children}
    </Box>
  )
}
