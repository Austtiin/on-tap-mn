import Link from 'next/link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
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
    href: '/bar-bingo',
    color: ['#8b1538', '#6b1028']
  },
  {
    title: 'Meat Raffles',
    description: 'Traditional Minnesota meat raffles. Fresh cuts, great prices, and community fun.',
    icon: LocalDiningIcon,
    href: '/meat-raffles',
    color: ['#fbbf24', '#f59e0b']
  },
  {
    title: 'Karaoke',
    description: 'Belt out your favorite tunes at karaoke nights. From classics to current hits.',
    icon: MicIcon,
    href: '/karaoke',
    color: ['#9333ea', '#7e22ce']
  },
  {
    title: 'Trivia',
    description: 'Test your knowledge at local trivia nights. Compete with friends and win prizes.',
    icon: EmojiEventsIcon,
    href: '/trivia',
    color: ['#2563eb', '#1e40af']
  },
  {
    title: 'Live Music',
    description: 'Discover live music performances at venues throughout Minnesota.',
    icon: MusicNoteIcon,
    href: '/live-music',
    color: ['#16a34a', '#15803d']
  }
]

export function ServiceCategories() {
  return (
    <Box component="section" sx={{ py: { xs: 8, lg: 10 }, bgcolor: 'grey.50' }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.875rem', lg: '2rem' },
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
              fontSize: '1.0625rem',
              color: 'text.secondary',
              maxWidth: '672px',
              mx: 'auto',
            }}
          >
            Explore the best bar events and activities happening across Minnesota
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Grid item xs={12} md={6} lg={4} key={service.title}>
                <Link href={service.href} style={{ textDecoration: 'none' }}>
                  <Card
                    sx={{
                      height: '100%',
                      border: 0,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
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
                          transition: 'transform 0.3s ease',
                          '.MuiCard-root:hover &': {
                            transform: 'scale(1.1)',
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
                        }}
                      >
                        {service.description}
                      </Typography>

                      {/* Call to Action */}
                      <Box sx={{ mt: 3 }}>
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
              </Grid>
            )
          })}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            Don&apos;t see what you&apos;re looking for?
          </Typography>
          <Link href="/submit-event" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 3, py: 1.5 }}
            >
              Submit Your Event
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}