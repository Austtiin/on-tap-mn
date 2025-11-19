import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Link from 'next/link'

export function HeroBanner() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        color: 'white',
        overflow: 'hidden',
        '&::before': {
          content: '\"\"',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          background: 'radial-gradient(circle at top right, rgba(251, 191, 36, 0.15), transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 2,
        },
        '@keyframes pulse': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 },
        },
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/imgs/hero.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />
      
      {/* Red Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(139, 21, 56, 0.85) 0%, rgba(107, 16, 40, 0.75) 100%)',
          zIndex: 1,
        }}
      />

      {/* Decorative Circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          border: '2px solid rgba(251, 191, 36, 0.2)',
          zIndex: 1,
          animation: 'float-slow 8s ease-in-out infinite',
          '@keyframes float-slow': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          border: '2px solid rgba(251, 191, 36, 0.15)',
          zIndex: 1,
          animation: 'float-slow 6s ease-in-out infinite 1s',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '10%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          bgcolor: 'rgba(251, 191, 36, 0.1)',
          zIndex: 1,
          animation: 'pulse-size 3s ease-in-out infinite',
          '@keyframes pulse-size': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.2)' },
          },
        }}
      />

      {/* Content */}
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ py: { xs: 8, md: 10, lg: 12 } }}>
          <Box sx={{ textAlign: 'center' }}>
            {/* Logo (smaller to prioritize copy) */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box
                component="img"
                src="/logos/ontapMNlogo.webp"
                alt="OnTap MN Logo"
                sx={{ width: { xs: 120, md: 160, lg: 200 }, height: { xs: 120, md: 160, lg: 180 }, objectFit: 'contain' }}
              />
            </Box>

            {/* Main Heading: concise value prop */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: '2.25rem', lg: '2.5rem' },
                fontWeight: 800,
                mb: 1.5,
                lineHeight: 1.15,
              }}
            >
              Find Minnesota Bar Events Fast
            </Typography>

            {/* Sub-Headline */}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem', lg: '1.25rem' },
                color: 'rgba(255, 255, 255, 0.95)',
                mb: 2.5,
                maxWidth: '896px',
                mx: 'auto',
                lineHeight: 1.5,
              }}
            >
              See tonight’s bar bingo, meat raffles, karaoke, trivia, and live music - near you.
            </Typography>

            {/* Supporting line (optional) */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.95rem', md: '1rem' },
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 3,
                maxWidth: '672px',
                mx: 'auto',
              }}
            >
              Free and simple. Built for Minnesota’s neighborhood spots.
            </Typography>

            {/* CTA Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Link href="/events" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ 
                    minWidth: 200,
                    bgcolor: '#8b1538',
                    '&:hover': { bgcolor: '#6b1028' },
                    color: '#fff',
                    fontWeight: 700,
                    animation: 'pulse-shadow 2s ease-in-out infinite',
                    '@keyframes pulse-shadow': {
                      '0%, 100%': { boxShadow: '0 0 0 0 rgba(139, 21, 56, 0.35)' },
                      '50%': { boxShadow: '0 0 20px 10px rgba(139, 21, 56, 0)' },
                    },
                  }}
                >
                  Find Events Near Me
                </Button>
              </Link>
              <Link href="/apply" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    minWidth: 200,
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'white',
                      color: '#8b1538',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Submit Your Event
                </Button>
              </Link>
            </Stack>
          </Box>

          {/* Bouncing Scroll Indicator */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 4,
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 20%, 50%, 80%, 100%': {
                  transform: 'translateY(0)',
                },
                '40%': {
                  transform: 'translateY(-10px)',
                },
                '60%': {
                  transform: 'translateY(-5px)',
                },
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 0.5,
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Scroll to explore
            </Typography>
            <Box
              component="svg"
              sx={{ width: 24, height: 24, color: 'white', opacity: 0.8 }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Decorative Wave */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          component="svg"
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 24,
            color: 'white',
          }}
          fill="currentColor"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,60 1200,60 L1200,120 L0,120 Z" />
        </Box>
      </Box>
    </Box>
  )
}