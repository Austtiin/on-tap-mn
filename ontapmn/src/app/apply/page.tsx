import type { Metadata } from 'next'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { Navigation, Footer } from '../../components'
import { ApplicationForm } from './components/ApplicationForm'

export const metadata: Metadata = {
  title: 'Apply to List Your Events - OnTap MN',
  description: 'Apply to feature your bar bingo, meat raffle, karaoke, trivia, or live music events on OnTap MN. Reach more customers across Minnesota.',
  keywords: ['apply', 'bar events', 'Minnesota events', 'promote events', 'bar marketing'],
}

export default function ApplyPage() {
  return (
    <>
      <Navigation />
      <Box 
        component="main" 
        sx={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(180deg, #fffbeb 0%, #ffffff 50%, #fffbeb 100%)',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '400px',
            background: 'radial-gradient(ellipse at top, rgba(251, 191, 36, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        {/* Decorative Wave Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.03) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            width: '120px',
            height: '120px',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.06), rgba(251, 191, 36, 0.02))',
            animation: 'morph 8s ease-in-out infinite',
            pointerEvents: 'none',
            '@keyframes morph': {
              '0%, 100%': {
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              },
              '50%': {
                borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
              },
            },
          }}
        />

        <Container maxWidth="lg">
          {/* Page Header */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 3,
              }}
            >
              Get Your Events Featured
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              Apply to list your bar events on OnTap MN and reach thousands of potential customers across Minnesota. 
              We feature Bar Bingo, Meat Raffles, Karaoke, Trivia, Live Music, and more!
            </Typography>
          </Box>

          {/* Benefits Section */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.875rem', md: '2rem' },
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 6,
                textAlign: 'center',
              }}
            >
              Why Partner With OnTap MN?
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    textAlign: 'center',
                    border: 1,
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    animation: 'fadeInUp 0.6s ease-out',
                    animationDelay: '0s',
                    animationFillMode: 'both',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4,
                      borderColor: 'primary.main',
                    },
                    '@keyframes fadeInUp': {
                      '0%': { opacity: 0, transform: 'translateY(20px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      background: 'linear-gradient(135deg, #8b1538 0%, #6b1028 100%)',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: '-8px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #8b1538 0%, #6b1028 100%)',
                        opacity: 0.2,
                        animation: 'ripple 2s ease-out infinite',
                      },
                      '@keyframes ripple': {
                        '0%': { transform: 'scale(0.8)', opacity: 0.5 },
                        '100%': { transform: 'scale(1.5)', opacity: 0 },
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: '2rem' }}>📈</Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'text.primary', 
                      mb: 2,
                      fontSize: '1.125rem',
                    }}
                  >
                    Increase Attendance
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Reach thousands of potential customers actively looking for bar events in Minnesota
                  </Typography>
                </Paper>

              <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    textAlign: 'center',
                    border: 1,
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4,
                      borderColor: 'secondary.main',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    }}
                  >
                    <Typography sx={{ fontSize: '2rem' }}>🎯</Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'text.primary', 
                      mb: 2,
                      fontSize: '1.125rem',
                    }}
                  >
                    Targeted Marketing
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Connect with people specifically searching for your type of event
                  </Typography>
                </Paper>

              <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    textAlign: 'center',
                    border: 1,
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4,
                      borderColor: 'success.main',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    }}
                  >
                    <Typography sx={{ fontSize: '2rem' }}>💼</Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'text.primary', 
                      mb: 2,
                      fontSize: '1.125rem',
                    }}
                  >
                    Grow Your Event
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Build your customer base and establish your venue as a go-to destination
                  </Typography>
                </Paper>
            </Box>
          </Box>

          {/* Application Form */}
          <ApplicationForm />
        </Container>
      </Box>
      <Footer />
    </>
  )
}
