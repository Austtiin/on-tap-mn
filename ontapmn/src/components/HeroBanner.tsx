import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export function HeroBanner() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        color: 'white',
        overflow: 'hidden',
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
          background: 'linear-gradient(to bottom right, rgba(139, 21, 56, 0.85), rgba(107, 16, 40, 0.90))',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ py: { xs: 8, md: 10, lg: 12 } }}>
          <Box sx={{ textAlign: 'center' }}>
            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <Box
                component="img"
                src="/logos/ontapMNlogo.webp"
                alt="OnTap MN Logo"
                sx={{
                  width: { xs: 140, md: 200, lg: 220 },
                  height: { xs: 140, md: 200, lg: 220 },
                  objectFit: 'contain',
                }}
              />
            </Box>

            {/* Main Heading */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: '2.25rem', lg: '2.5rem' },
                fontWeight: 'bold',
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              OnTap MN
            </Typography>

            {/* Tagline */}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem', lg: '1.375rem' },
                color: 'rgba(255, 255, 255, 0.95)',
                mb: 3,
                maxWidth: '896px',
                mx: 'auto',
                lineHeight: 1.5,
              }}
            >
              Find Bar Bingo, Meat Raffles, and More Across Minnesota
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.95rem', md: '1rem', lg: '1.0625rem' },
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                maxWidth: '672px',
                mx: 'auto',
              }}
            >
              Discover the best bar events happening near you. From weekly bingo nights to delicious meat raffles,
              we&apos;ve got your entertainment covered.
            </Typography>

            {/* CTA Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Button
                component={require('next/link').default}
                href="/events"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ minWidth: 200 }}
              >
                Find Events Near Me
              </Button>
              <Button
                component={require('next/link').default}
                href="/events"
                variant="outlined"
                size="large"
                sx={{
                  minWidth: 200,
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'white',
                    color: 'primary.main',
                  },
                }}
              >
                Browse All Events
              </Button>
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