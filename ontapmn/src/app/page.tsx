import { 
  Navigation, 
  Footer, 
  HeroBanner, 
  ServiceCategories, 
  FeaturedEvents 
} from '../components'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroBanner />
        <ServiceCategories />
        <FeaturedEvents />
      </main>
      <Footer />
    </>
  )
}
