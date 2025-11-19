import Link from 'next/link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import CasinoIcon from '@mui/icons-material/Casino'
import LocalDiningIcon from '@mui/icons-material/LocalDining'
import MicIcon from '@mui/icons-material/Mic'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const services = [
  {
    title: 'Bar Bingo',
    description: 'Weekly bingo nights at bars across Minnesota. Win prizes, have fun, and meet new people!',
    icon: CasinoIcon,
    href: '/events?cats=Bar+Bingo',
    color: ['#8b1538', '#6b1028']
  },
  {
    title: 'Meat Raffles',
    description: 'Traditional Minnesota meat raffles. Fresh cuts, great prices, and community fun.',
    icon: LocalDiningIcon,
    href: '/events?cats=Meat+Raffles',
    color: ['#fbbf24', '#f59e0b']
  },
  {
    title: 'Karaoke',
    description: 'Belt out your favorite tunes at karaoke nights. From classics to current hits.',
    icon: MicIcon,
    href: '/events?cats=Karaoke',
    color: ['#9333ea', '#7e22ce']
  },
  {
    title: 'Trivia',
    description: 'Test your knowledge at local trivia nights. Compete with friends and win prizes.',
    icon: EmojiEventsIcon,
    href: '/events?cats=Trivia',
    color: ['#2563eb', '#1e40af']
  },
  {
    title: 'Live Music',
    description: 'Discover live music performances at venues throughout Minnesota.',
    icon: MusicNoteIcon,
    href: '/events?cats=Live+Music',
    color: ['#16a34a', '#15803d']
  }
]

export function ServiceCategories() {
  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, lg: 10 }, 
        background: 'linear-gradient(180deg, #fffbeb 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(251, 191, 36, 0.01) 80px, rgba(251, 191, 36, 0.01) 160px)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Top/Bottom fades to blend with page background */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 24, zIndex: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(0,0,0,0))' }} />
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 24, zIndex: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.06), rgba(0,0,0,0))' }} />
      {/* Decorative Dots Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '200px',
          height: '200px',
          backgroundImage: 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '8%',
          width: '150px',
          height: '150px',
          backgroundImage: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', lg: '1.875rem' },
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 2,
            }}
          >
            What&apos;s On Tap?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1rem',
              color: 'text.secondary',
              maxWidth: '672px',
              mx: 'auto',
            }}
          >
            Explore the best bar events and activities happening across Minnesota
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(5, 1fr)',
            },
            gap: 3,
            justifyItems: 'center',
          }}
        >
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Box
                key={service.title}
                sx={{
                  width: '100%',
                  maxWidth: 300,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Link href={service.href} style={{ textDecoration: 'none', width: '100%', maxWidth: 300 }}>
                  <Card
                    sx={{
                      height: '100%',
                      border: 0,
                      transition: 'all 0.3s ease',
                      animation: 'float 6s ease-in-out infinite',
                      animationDelay: `${Math.random() * 2}s`,
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: 8,
                        animation: 'none',
                      },
                      '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-6px)' },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', minHeight: 280 }}>
                      {/* Icon with gradient background */}
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          background: `linear-gradient(to bottom right, ${service.color[0]}, ${service.color[1]})`,
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                          mx: 'auto',
                          position: 'relative',
                          transition: 'transform 0.3s ease',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: '-4px',
                            background: `linear-gradient(to bottom right, ${service.color[0]}, ${service.color[1]})`,
                            borderRadius: 4,
                            opacity: 0,
                            filter: 'blur(8px)',
                            transition: 'opacity 0.3s ease',
                            zIndex: -1,
                          },
                          '.MuiCard-root:hover &': {
                            transform: 'scale(1.1)',
                            '&::before': {
                              opacity: 0.5,
                            },
                          },
                        }}
                      >
                        <IconComponent sx={{ fontSize: 32, color: 'white' }} />
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          color: 'text.primary',
                          mb: 1.5,
                          transition: 'color 0.3s ease',
                          '.MuiCard-root:hover &': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        {service.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.7,
                          mb: 2,
                          flexGrow: 1,
                        }}
                      >
                        {service.description}
                      </Typography>

                      {/* Call to Action */}
                      <Box sx={{ mt: 'auto' }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: 'primary.main',
                            fontWeight: 600,
                            transition: 'gap 0.3s ease',
                            '.MuiCard-root:hover &': {
                              gap: 1,
                              color: 'primary.dark',
                            },
                          }}
                        >
                          <Typography variant="body2" component="span">
                            Explore Events
                          </Typography>
                          <ArrowForwardIcon sx={{ fontSize: 18 }} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Box>
            )
          })}
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            Want to get your events featured on OnTap MN?
          </Typography>
          <Link href="/apply" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 3, py: 1.5 }}
            >
              Apply to List Your Events
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}