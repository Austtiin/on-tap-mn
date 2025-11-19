import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation, Footer, Container, Section, AdSense } from '../../../components'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PhoneIcon from '@mui/icons-material/Phone'
import LanguageIcon from '@mui/icons-material/Language'
import DirectionsIcon from '@mui/icons-material/Directions'
import ShareIcon from '@mui/icons-material/Share'

// Generate static params for static export
export function generateStaticParams() {
  // Return all event IDs from SAMPLE_EVENTS
  // In production, this should fetch all event IDs from your API/database
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ]
}

// This will be replaced with dynamic data fetching
type PageProps = {
  params: {
    id: string
  }
}

// TODO: Replace with actual data fetching
const getEventData = (id: string) => {
  return {
    id,
    title: "Thursday Night Bar Bingo",
    venue: "River Place",
    location: "Bloomington, MN",
    address: "123 Main Street, Bloomington, MN 55420",
    date: "2025-01-16",
    dateFormatted: "Thursday, January 16, 2025",
    time: "7:00 PM",
    price: "Free to play",
    category: "Bar Bingo",
    description: "Join us for an exciting evening of Bar Bingo! Win great prizes while enjoying drinks and food specials. All ages welcome. No experience necessary - we'll explain the rules before we start. Bring your friends for a fun night out!",
    phone: "(612) 555-0123",
    website: "https://riverplace.example.com",
    image: "/imgs/placeholder-event.jpg",
    features: [
      "Food & Drink Specials",
      "Multiple Prize Rounds",
      "Family Friendly",
      "Free Parking Available"
    ],
    rules: [
      "Must be present to win",
      "One card per person per round",
      "Winners must claim prizes within 5 minutes",
      "Management reserves the right to modify rules"
    ],
    prizes: [
      "$50 Bar Tab",
      "Gift Cards",
      "Bar Merchandise",
      "Grand Prize: $100 Cash"
    ]
  }
}

// TODO: Replace with actual related events API call
const getRelatedEvents = (currentEvent: ReturnType<typeof getEventData>) => {
  // Sample events pool
  const allEvents = [
    {
      id: 2,
      title: "Friday Night Bar Bingo",
      venue: "River Place",
      location: "Bloomington, MN",
      date: "2025-01-17",
      time: "8:00 PM",
      category: "Bar Bingo"
    },
    {
      id: 3,
      title: "Weekly Trivia Night",
      venue: "River Place",
      location: "Bloomington, MN",
      date: "2025-01-18",
      time: "7:30 PM",
      category: "Trivia"
    },
    {
      id: 4,
      title: "Tuesday Bar Bingo Championship",
      venue: "The Local Tavern",
      location: "Minneapolis, MN",
      date: "2025-01-14",
      time: "6:30 PM",
      category: "Bar Bingo"
    },
    {
      id: 5,
      title: "Karaoke Night Extravaganza",
      venue: "The Stage Bar",
      location: "St. Paul, MN",
      date: "2025-01-20",
      time: "9:00 PM",
      category: "Karaoke"
    },
  ]

  // Filter: same venue or same category (excluding current event)
  const related = allEvents.filter(e => 
    e.id.toString() !== currentEvent.id && 
    (e.venue === currentEvent.venue || e.category === currentEvent.category)
  )

  // Prioritize: same venue first, then same category
  const sameVenue = related.filter(e => e.venue === currentEvent.venue)
  const sameCategory = related.filter(e => e.category === currentEvent.category && e.venue !== currentEvent.venue)

  // Return up to 3 events, prioritizing same venue
  return [...sameVenue, ...sameCategory].slice(0, 3)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // TODO: Replace with actual data fetching
  const event = getEventData(params.id)
  
  return {
    title: `${event.title} at ${event.venue}`,
    description: `${event.title} at ${event.venue} in ${event.location}. ${event.dateFormatted} at ${event.time}. ${event.description.substring(0, 150)}...`,
    keywords: [event.category, event.venue, event.location, 'bar events', 'Minnesota'],
  }
}

export default function EventDetailsPage({ params }: PageProps) {
  // TODO: Replace with actual data fetching
  const event = getEventData(params.id)
  const relatedEvents = getRelatedEvents(event)

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Bar Bingo': 'from-red-500 to-red-600',
      'Meat Raffles': 'from-amber-500 to-amber-600',
      'Karaoke': 'from-purple-500 to-purple-600',
      'Trivia': 'from-blue-500 to-blue-600',
      'Live Music': 'from-green-500 to-green-600',
    }
    return colors[category] || 'from-gray-500 to-gray-600'
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <Section padding="lg" background="primary">
          <Container>
            <div className="text-white">
              <Link 
                href="/events" 
                className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
              >
                <ArrowBackIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Events</span>
              </Link>
              
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="mb-4">
                    <Chip 
                      label={event.category}
                      className={`bg-gradient-to-r ${getCategoryColor(event.category)} text-white font-semibold shadow-lg`}
                      sx={{ 
                        fontSize: '0.875rem',
                        height: '32px',
                        '& .MuiChip-label': { px: 2 }
                      }}
                    />
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                    {event.title}
                  </h1>
                  
                  <div className="flex items-center gap-2 text-xl mb-6">
                    <LocationOnIcon className="w-6 h-6 text-amber-400" />
                    <span className="font-semibold">{event.venue}</span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-gray-100">
                    <div className="flex items-center gap-2">
                      <CalendarTodayIcon className="w-5 h-5" />
                      <span>{event.dateFormatted}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AccessTimeIcon className="w-5 h-5" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AttachMoneyIcon className="w-5 h-5" />
                      <span>{event.price}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 lg:min-w-[200px]">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<DirectionsIcon />}
                    sx={{
                      bgcolor: 'secondary.main',
                      color: 'text.primary',
                      '&:hover': { bgcolor: 'secondary.dark' },
                      fontWeight: 600,
                      boxShadow: 3
                    }}
                    href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<ShareIcon />}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': { borderColor: 'white', bgcolor: 'white', color: 'primary.main' }
                    }}
                  >
                    Share Event
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Event Details Section */}
        <Section padding="lg">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Description */}
                  <Card className="shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-black mb-4">About This Event</h2>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* AdSense Ad - Horizontal Banner */}
                  <Card className="shadow-md">
                    <CardContent className="p-4">
                      <AdSense adSlot="7178530322" adFormat="auto" fullWidthResponsive={true} />
                    </CardContent>
                  </Card>

                  {/* Features */}
                  <Card className="shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-black mb-6">Event Features</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {event.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <div className="bg-amber-500 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-gray-800 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Prizes */}
                  <Card className="shadow-lg bg-gradient-to-br from-amber-50 to-white">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                        <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                        Prizes & Rewards
                      </h2>
                      <div className="space-y-3">
                        {event.prizes.map((prize, index) => (
                          <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-amber-100">
                            <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-gray-800 font-semibold text-lg">{prize}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rules */}
                  <Card className="shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-black mb-6">Rules & Guidelines</h2>
                      <ul className="space-y-3">
                        {event.rules.map((rule, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-amber-500 font-bold text-lg mt-0.5">•</span>
                            <span className="text-gray-700 leading-relaxed">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* AdSense Ad - In-Feed Ad */}
                  <Card className="shadow-md">
                    <CardContent className="p-4">
                      <AdSense adSlot="7178530322" adFormat="auto" fullWidthResponsive={true} />
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6 lg:self-start">
                  {/* Venue Information */}
                  <Card className="shadow-lg lg:sticky lg:top-24">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-black mb-6">Venue Information</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <LocationOnIcon className="w-5 h-5 text-amber-500" />
                            Location
                          </h4>
                          <p className="text-gray-700 ml-7">{event.address}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <PhoneIcon className="w-5 h-5 text-amber-500" />
                            Phone
                          </h4>
                          <a 
                            href={`tel:${event.phone.replace(/\D/g, '')}`}
                            className="text-amber-600 hover:text-amber-700 ml-7 underline"
                          >
                            {event.phone}
                          </a>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <LanguageIcon className="w-5 h-5 text-amber-500" />
                            Website
                          </h4>
                          <a 
                            href={event.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-600 hover:text-amber-700 ml-7 underline break-all"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>

                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        className="mt-6"
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': { bgcolor: 'primary.dark' },
                          fontWeight: 600,
                          py: 1.5
                        }}
                        href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on Map
                      </Button>
                    </CardContent>
                  </Card>

                  {/* AdSense Ad - Sidebar Rectangle */}
                  <Card className="shadow-lg">
                    <CardContent className="p-4">
                      <AdSense adSlot="7178530322" adFormat="auto" fullWidthResponsive={true} />
                    </CardContent>
                  </Card>

                  {/* AdSense Ad - Sidebar Vertical */}
                  <Card className="shadow-lg">
                    <CardContent className="p-4">
                      <AdSense adSlot="7178530322" adFormat="auto" fullWidthResponsive={true} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* AdSense Ad - Before Related Events */}
        <Section padding="md">
          <Container>
            <div className="max-w-6xl mx-auto">
              <Card className="shadow-md">
                <CardContent className="p-4">
                  <AdSense adSlot="7178530322" adFormat="auto" fullWidthResponsive={true} />
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Related Events Section */}
        <Section padding="lg" background="gray">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-black mb-8">More Events You Might Like</h2>
              {relatedEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedEvents.map((relatedEvent) => (
                    <Card key={relatedEvent.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        <Chip 
                          label={relatedEvent.category}
                          size="small"
                          className="mb-3"
                          sx={{ bgcolor: 'primary.main', color: 'white' }}
                        />
                        <h3 className="text-lg font-bold text-black mb-2">
                          {relatedEvent.title}
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <LocationOnIcon className="w-4 h-4" />
                            <span>{relatedEvent.venue}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarTodayIcon className="w-4 h-4" />
                            <span>{new Date(relatedEvent.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AccessTimeIcon className="w-4 h-4" />
                            <span>{relatedEvent.time}</span>
                          </div>
                        </div>
                        <Button 
                          variant="outlined" 
                          size="small" 
                          fullWidth
                          component={Link}
                          href={`/events/${relatedEvent.id}`}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="shadow-md">
                  <CardContent className="p-8 text-center">
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                      No similar events found at the moment.
                    </Typography>
                    <Button 
                      variant="contained" 
                      component={Link} 
                      href="/events"
                    >
                      Browse All Events
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
