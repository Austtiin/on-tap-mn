import Link from 'next/link'
import { Card, CardContent, CardHeader, Container, Section, Button } from './ui'

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
    <Section padding="lg">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-4">
            Featured Special Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t miss these upcoming special events happening across Minnesota
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <Card 
              key={event.id} 
              variant="featured" 
              hover={true}
              className="group overflow-hidden"
            >
              {/* Event Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-accent px-3 py-1 rounded-full text-sm font-semibold">
                    {event.category}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-6xl opacity-50">🎉</span>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-primary font-semibold text-sm">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="text-secondary font-bold">
                    {event.price}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-accent group-hover:text-primary transition-colors line-clamp-2">
                  {event.title}
                </h3>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 flex items-center">
                    <span className="mr-2">📍</span>
                    <span className="font-medium">{event.venue}</span>
                    <span className="ml-2 text-sm">{event.location}</span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="mr-2">🕒</span>
                    <span>{event.time}</span>
                  </p>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {event.description}
                </p>
                
                <Button 
                  variant="primary" 
                  size="sm" 
                  fullWidth
                  className="group-hover:bg-primary-dark transition-colors"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* View All Events Button */}
        <div className="text-center mt-12">
          <Link href="/events">
            <Button variant="outline" size="lg">
              View All Special Events
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}