import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

const features = [
  {
    icon: LocationOnIcon,
    title: 'Find Events Near You',
    description: 'Search by city, venue, or event type to discover what\'s happening in your neighborhood.',
    color: '#8b1538',
  },
  {
    icon: CalendarMonthIcon,
    title: 'Weekly Updates',
    description: 'Stay in the loop with the latest events added every week across Minnesota.',
    color: '#fbbf24',
  },
  {
    icon: NotificationsActiveIcon,
    title: 'Never Miss Out',
    description: 'Get notified about new events and special occasions at your favorite spots.',
    color: '#9333ea',
  },
  {
    icon: LocalOfferIcon,
    title: 'Exclusive Deals',
    description: 'Access special promotions and discounts from participating venues.',
    color: '#16a34a',
  },
]

export function WhyChooseUs() {
  return (
    <Box component="section" sx={{ py: { xs: 8, lg: 10 }, bgcolor: 'background.default' }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.125rem', lg: '2.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 2,
            }}
          >
            Why Choose OnTap MN?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Your go-to source for discovering the best bar events across Minnesota
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4,
                      borderColor: feature.color,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}30)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    <IconComponent sx={{ fontSize: 40, color: feature.color }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 2,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}
