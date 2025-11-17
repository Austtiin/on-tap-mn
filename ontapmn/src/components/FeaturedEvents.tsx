import Link from 'next/link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
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
    <Box component="section" sx={{ py: { xs: 8, lg: 10 } }}>
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
            Featured Special Events
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
            Don&apos;t miss these upcoming special events happening across Minnesota
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {featuredEvents.map((event) => (
            <Grid item xs={12} lg={4} key={event.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: 2,
                  borderColor: 'secondary.main',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
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

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
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
            </Grid>
          ))}
        </Grid>

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