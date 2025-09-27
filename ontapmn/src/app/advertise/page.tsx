import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation, Footer, Container, Section } from '../../components'
import { Button } from '../../components/ui'

export const metadata: Metadata = {
  title: 'Advertise with OnTap MN',
  description: 'Learn how OnTap MN helps promote your bar events and creates a win-win scenario for both businesses and customers.',
  keywords: ['advertising', 'OnTap MN', 'bar promotion', 'event marketing', 'Minnesota bars'],
}

export default function AdvertisePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <Section padding="lg" background="primary">
          <Container>
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Advertise with OnTap MN
              </h1>
              <p className="text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
                Partner with us to promote your events and connect with customers who are actively looking for great bar entertainment
              </p>
            </div>
          </Container>
        </Section>

        {/* How It Works Section */}
        <Section padding="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                  How OnTap MN Works
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  OnTap MN is supported by advertising revenue, which allows us to provide free event listings 
                  for all Minnesota bars and venues. This creates a win-win scenario where businesses get 
                  exposure while customers discover amazing local events.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">📢</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Free Event Promotion</h3>
                  <p className="text-gray-700 leading-relaxed">
                    All event listings on OnTap MN are completely free. Bars and venues can submit 
                    their bingo nights, meat raffles, karaoke, and other events at no cost.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
                  <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Targeted Audience</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our visitors are actively searching for bar events and entertainment. 
                    Your advertising reaches people who are ready to attend and spend money.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Win-Win Partnership</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Advertising revenue keeps our platform free for everyone while giving 
                    businesses premium visibility to attract more customers.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Benefits Section */}
        <Section padding="lg" background="gray">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                  Why Advertise with OnTap MN?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  We&apos;re not just another advertising platform. We&apos;re passionate about Minnesota&apos;s 
                  bar culture and committed to helping businesses thrive while serving our community.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4 mt-1">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">Local Focus</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We exclusively serve Minnesota, ensuring your advertising reaches local customers 
                        who can actually visit your establishment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4 mt-1 flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">Engaged Community</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Our users aren&apos;t just browsing – they&apos;re planning their next night out and 
                        looking for specific entertainment options.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4 mt-1 flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">Sustainable Model</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Our advertising-supported model ensures OnTap MN remains free for venues 
                        to list events, creating long-term value for everyone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                  <div className="text-center mb-6">
                    <div className="bg-secondary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">📊</span>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2">Growing Community</h3>
                  </div>
                  <div className="space-y-4 text-center">
                    <div className="border-b border-gray-200 pb-4">
                      <div className="text-3xl font-bold text-primary mb-1">New</div>
                      <div className="text-gray-600">Events Added Daily</div>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <div className="text-3xl font-bold text-primary mb-1">Local</div>
                      <div className="text-gray-600">Minnesota Focus</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">Free</div>
                      <div className="text-gray-600">Event Listings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Advertising Options Section */}
        <Section padding="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                  Advertising Options
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We offer flexible advertising solutions to fit different budgets and goals.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-black mb-2">Banner Advertising</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Premium placement of your business banner across high-traffic pages on OnTap MN.
                    </p>
                  </div>
                  <ul className="space-y-3 text-gray-700 mb-6">
                    <li className="flex items-center">
                      <span className="text-primary mr-2">•</span>
                      Homepage banner placement
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary mr-2">•</span>
                      Category page visibility
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary mr-2">•</span>
                      Mobile-optimized displays
                    </li>
                  </ul>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">$10/week</div>
                    <div className="text-gray-600">1-month minimum commitment</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-primary">
                  <div className="mb-6">
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-3">
                      MOST POPULAR
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2">Sponsored Events</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Feature your events prominently and get priority placement in search results.
                    </p>
                  </div>
                  <ul className="space-y-3 text-gray-700 mb-6">
                    <li className="flex items-center">
                      <span className="text-primary mr-2">•</span>
                      Featured event highlighting
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary mr-2">•</span>
                      Top search result placement
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary mr-2">•</span>
                      Social media promotion
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary mr-2">•</span>
                      Enhanced event details
                    </li>
                  </ul>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">$50 per event</div>
                    <div className="text-gray-600">1-month minimum commitment</div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section padding="lg" background="primary">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Partner with OnTap MN?
              </h2>
              <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                Join our growing network of Minnesota businesses and start reaching customers 
                who are actively looking for great bar entertainment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary"
                  >
                    Get Started Today
                  </Button>
                </Link>
                <Link href="/submit-event">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary"
                  >
                    List Your Events Free
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        {/* FAQ Section */}
        <Section padding="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-black text-center mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-black mb-3">
                    Why is event listing free but advertising costs money?
                  </h3>
                  <p className="text-gray-800 leading-relaxed">
                    Our mission is to make it easy for all Minnesota bars to promote their events, 
                    regardless of budget. Advertising revenue from larger businesses and those seeking 
                    premium visibility helps us keep basic listings free for everyone.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-black mb-3">
                    What kind of businesses advertise on OnTap MN?
                  </h3>
                  <p className="text-gray-800 leading-relaxed">
                    Our advertisers include bars, restaurants, breweries, entertainment companies, 
                    food vendors, and service providers who want to reach the Minnesota bar-going 
                    community. We welcome any business that serves our audience.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-black mb-3">
                    Can I customize my advertising campaign?
                  </h3>
                  <p className="text-gray-800 leading-relaxed">
                    Absolutely! We work with each advertiser to create campaigns that fit their goals, 
                    budget, and target audience. Whether you want to promote specific events, drive 
                    overall foot traffic, or build brand awareness, we can help.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}