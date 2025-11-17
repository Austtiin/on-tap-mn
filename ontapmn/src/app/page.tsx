import { 
  Navigation, 
  Footer, 
  HeroBanner, 
  ServiceCategories, 
  FeaturedEvents,
  WhyChooseUs
} from '../components'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroBanner />
        <ServiceCategories />
        <WhyChooseUs />
        <FeaturedEvents />
      </main>
      <Footer />
    </>
  )
}
