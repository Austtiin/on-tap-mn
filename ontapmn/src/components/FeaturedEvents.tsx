import Link from 'next/link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const featuredEvents = [
  {
    id: 1,
    title: 'New Year\'s Eve Meat Raffle Extravaganza',
    venue: 'The Local Tavern',
    location: 'Minneapolis, MN',
    date: '2025-12-31',
    time: '6:00 PM',
    price: '$5 per ticket',
    description: 'Ring in the New Year with our biggest meat raffle of the year! Premium cuts, amazing prizes, and live music.',
    image: '/api/placeholder/400/250',
    category: 'Meat Raffle',
    featured: true
  },
  {
    id: 2,
    title: 'Weekly Trivia Championship Finals',
    venue: 'Murphy\'s Pub',
    location: 'St. Paul, MN',
    date: '2025-01-15',
    time: '7:30 PM',
    price: 'Free to play',
    description: 'The final showdown of our winter trivia league. Cash prizes for top 3 teams!',
    image: '/api/placeholder/400/250',
    category: 'Trivia',
    featured: true
  },
  {
    id: 3,
    title: 'Karaoke Battle Royale',
    venue: 'The Stage Bar',
    location: 'Duluth, MN',
    date: '2025-01-20',
    time: '8:00 PM',
    price: '$10 entry',
    description: 'Show off your vocal skills in our monthly karaoke competition. Winner takes home $200!',
    image: '/api/placeholder/400/250',
    category: 'Karaoke',
    featured: true
  }
]

export function FeaturedEvents() {
  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, lg: 10 },
        position: 'relative',
        background: 'linear-gradient(180deg, #fef3e0 0%, #fffbeb 50%, #ffffff 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(251, 191, 36, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(251, 191, 36, 0.08) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Top fade to blend from previous section */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 24, zIndex: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(0,0,0,0))' }} />
      {/* Decorative Squares */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          width: '80px',
          height: '80px',
          border: '3px solid rgba(139, 21, 56, 0.08)',
          transform: 'rotate(45deg)',
          pointerEvents: 'none',
          animation: 'rotate-slow 20s linear infinite',
          '@keyframes rotate-slow': {
            '0%': { transform: 'rotate(45deg)' },
            '100%': { transform: 'rotate(405deg)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '60px',
          height: '60px',
          border: '3px solid rgba(251, 191, 36, 0.15)',
          transform: 'rotate(25deg)',
          pointerEvents: 'none',
          animation: 'rotate-reverse 15s linear infinite',
          '@keyframes rotate-reverse': {
            '0%': { transform: 'rotate(25deg)' },
            '100%': { transform: 'rotate(-335deg)' },
          },
        }}
      />

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', lg: '1.875rem' },
              fontWeight: 'bold',
              color: '#7c2d12',
              mb: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            Featured Special Events
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1rem',
              color: '#78350f',
              maxWidth: '672px',
              mx: 'auto',
            }}
          >
            Don&apos;t miss these upcoming special events happening across Minnesota
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 4,
            justifyItems: 'center',
          }}
        >
          {featuredEvents.map((event) => (
              <Card
                key={event.id}
                sx={{
                  height: '100%',
                  width: '100%',
                  maxWidth: 380,
                  display: 'flex',
                  flexDirection: 'column',
                  border: 2,
                  borderColor: 'secondary.main',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.5s ease',
                    pointerEvents: 'none',
                    zIndex: 1,
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                    borderColor: 'primary.main',
                    '&::before': {
                      left: '100%',
                    },
                  },
                }}
              >
                {/* Event Image Placeholder */}
                <Box
                  sx={{
                    height: 192,
                    background: 'linear-gradient(to bottom right, #8b1538, #6b1028)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'rgba(0, 0, 0, 0.2)',
                    }}
                  />
                  <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                    <Chip
                      label={event.category}
                      sx={{
                        bgcolor: 'secondary.main',
                        color: 'text.primary',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ fontSize: '3.75rem', opacity: 0.5 }}>
                      🎉
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1.5 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 600,
                      }}
                    >
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'secondary.dark',
                        fontWeight: 700,
                      }}
                    >
                      {event.price}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {event.title}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                      <LocationOnIcon sx={{ fontSize: 18, mr: 1 }} />
                      <Typography variant="body2" component="span" sx={{ fontWeight: 500 }}>
                        {event.venue}
                      </Typography>
                      <Typography variant="caption" component="span" sx={{ ml: 1 }}>
                        {event.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                      <AccessTimeIcon sx={{ fontSize: 18, mr: 1 }} />
                      <Typography variant="body2">{event.time}</Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      lineHeight: 1.7,
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {event.description}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="small"
                    sx={{ mt: 'auto' }}
                  >
                    View Details
                  </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* View All Events Button */}
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Link href="/events" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="primary" size="large">
              View All Special Events
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}