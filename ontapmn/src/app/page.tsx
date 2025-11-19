import { 
  Navigation, 
  Footer, 
  HeroBanner, 
  ServiceCategories, 
  FeaturedEvents,
  Container,
  Section,
  AdSense
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
            <Card className="shadow-md">
              <CardContent className="py-4 px-4">
                <AdSense adSlot="7178530322" adFormat="auto" fullWidthResponsive={true} />
              </CardContent>
            </Card>
          </Container>
        </Section>

        <ServiceCategories />

        <FeaturedEvents />
        
        {/* AdSense - Bottom Banner */}
        <Section padding="sm" background="gray">
          <Container>
            <Card className="shadow-md">
              <CardContent className="py-4 px-4">
                <AdSense adSlot="7178530322" adFormat="auto" fullWidthResponsive={true} />
              </CardContent>
            </Card>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
