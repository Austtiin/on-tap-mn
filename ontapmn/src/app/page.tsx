import { 
  Navigation, 
  Footer, 
  HeroBanner, 
  ServiceCategories, 
  FeaturedEvents,
  Container,
  Section
} from '../components'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroBanner />
        
        {/* AdSense - Top Banner */}
        <Section padding="sm" background="gray">
          <Container>
            <Card className="shadow-md bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
              <CardContent className="py-6 px-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500 font-semibold mb-3 uppercase tracking-wider">Advertisement</div>
                  <div className="bg-white rounded-lg flex flex-col items-center justify-center border-2 border-gray-200" style={{ minHeight: '90px' }}>
                    <span className="text-gray-400 font-medium mb-1">AdSense Leaderboard</span>
                    <span className="text-gray-400 text-xs">728x90 or Responsive</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Container>
        </Section>

        <ServiceCategories />
        
        {/* AdSense - Mid-Page Banner */}
        <Section padding="sm" background="gray">
          <Container>
            <Card className="shadow-md bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
              <CardContent className="py-6 px-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500 font-semibold mb-3 uppercase tracking-wider">Advertisement</div>
                  <div className="bg-white rounded-lg flex flex-col items-center justify-center border-2 border-gray-200" style={{ minHeight: '250px' }}>
                    <span className="text-gray-400 font-medium mb-1">AdSense Display Ad</span>
                    <span className="text-gray-400 text-xs">300x250 or Responsive</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Container>
        </Section>

        <FeaturedEvents />
        
        {/* AdSense - Bottom Banner */}
        <Section padding="sm" background="gray">
          <Container>
            <Card className="shadow-md bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
              <CardContent className="py-6 px-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500 font-semibold mb-3 uppercase tracking-wider">Advertisement</div>
                  <div className="bg-white rounded-lg flex flex-col items-center justify-center border-2 border-gray-200" style={{ minHeight: '90px' }}>
                    <span className="text-gray-400 font-medium mb-1">AdSense Banner</span>
                    <span className="text-gray-400 text-xs">970x90 or Responsive</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
