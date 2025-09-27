import Link from 'next/link'
import { Card, CardContent, Container, Section } from './ui'

const services = [
  {
    title: 'Bar Bingo',
    description: 'Weekly bingo nights at bars across Minnesota. Win prizes, have fun, and meet new people!',
    icon: '🎱', // Bingo ball
    href: '/bar-bingo',
    color: 'from-primary to-primary-dark'
  },
  {
    title: 'Meat Raffles',
    description: 'Traditional Minnesota meat raffles. Fresh cuts, great prices, and community fun.',
    icon: '🥩', // Meat
    href: '/meat-raffles',
    color: 'from-secondary to-secondary-dark'
  },
  {
    title: 'Karaoke',
    description: 'Belt out your favorite tunes at karaoke nights. From classics to current hits.',
    icon: '🎤', // Microphone
    href: '/karaoke',
    color: 'from-purple-600 to-purple-800'
  },
  {
    title: 'Trivia',
    description: 'Test your knowledge at local trivia nights. Compete with friends and win prizes.',
    icon: '🧠', // Brain
    href: '/trivia',
    color: 'from-blue-600 to-blue-800'
  },
  {
    title: 'Live Music',
    description: 'Discover live music performances at venues throughout Minnesota.',
    icon: '🎸', // Guitar
    href: '/live-music',
    color: 'from-green-600 to-green-800'
  }
]

export function ServiceCategories() {
  return (
    <Section padding="lg" className="bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-4">
            What&apos;s On Tap?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the best bar events and activities happening across Minnesota
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.href}>
              <Card 
                hover={true}
                className="h-full group transition-all duration-300 hover:shadow-xl border-0"
              >
                <CardContent className="p-6">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-accent mb-3 text-center group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-center leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Call to Action */}
                  <div className="mt-6 text-center">
                    <span className="text-primary font-semibold group-hover:text-primary-dark transition-colors">
                      Explore Events →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Don&apos;t see what you&apos;re looking for?
          </p>
          <Link 
            href="/submit-event"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium"
          >
            Submit Your Event
          </Link>
        </div>
      </Container>
    </Section>
  )
}