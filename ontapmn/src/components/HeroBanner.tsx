import { Button, Container } from './ui'

export function HeroBanner() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-dark text-white">
      <Container>
        <div className="py-16 lg:py-24">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block">OnTap</span>
              <span className="text-secondary">MN</span>
            </h1>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Find Bar Bingo, Meat Raffles, and More Across Minnesota
            </p>
            
            {/* Description */}
            <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto">
              Discover the best bar events happening near you. From weekly bingo nights to delicious meat raffles, 
              we&apos;ve got your entertainment covered.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg"
                className="min-w-[200px]"
              >
                Find Events Near Me
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="min-w-[200px] border-white text-white hover:bg-white hover:text-primary"
              >
                Browse All Events
              </Button>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Decorative Wave */}
      <div className="relative">
        <svg
          className="absolute bottom-0 w-full h-6 text-white"
          fill="currentColor"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,60 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  )
}