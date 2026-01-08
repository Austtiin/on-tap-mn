import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation, Footer, Container, Section } from '../../components'
import Button from '@mui/material/Button'

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
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(/imgs/pexels-mart-production-7271399.jpg)'}} />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-800/80 to-slate-900/85" />
          </div>
          <Container>
            <div className="text-center text-white relative z-10">
              {/* Decorative overlays */}
              <div className="pointer-events-none absolute inset-0 opacity-30">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[120px] h-[120px] rounded-full bg-gradient-to-br from-amber-400/40 to-amber-600/30 blur-2xl" />
                <div className="absolute top-6 right-10 w-16 h-16 rounded-full border border-amber-300/30" />
                <div className="absolute bottom-8 left-12 w-10 h-10 rounded-full border border-amber-200/30" />
                <div className="absolute bottom-10 right-1/4 w-24 h-24 rounded-full bg-white/5" />
              </div>

              {/* Small badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-xs tracking-wide mb-4 backdrop-blur-sm">
                <span className="mr-2">🚀</span>
                Grow Your Event with OnTap MN
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                Advertise with OnTap MN
              </h1>
              <p className="text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
                Partner with us to promote your events and connect with customers who are actively looking for great bar entertainment
              </p>

              {/* Chips */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className="text-[11px] uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1 rounded-full">Targeted Audience</span>
                <span className="text-[11px] uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1 rounded-full">Free Exposure</span>
                <span className="text-[11px] uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1 rounded-full">Proven Results</span>
              </div>
            </div>
          </Container>
        </Section>

        {/* How It Works Section */}
        <Section padding="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4">
                  How OnTap MN Works
                </h2>
                <p className="text-base text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  OnTap MN is supported by advertising revenue, which allows us to provide free event listings 
                  for all Minnesota bars and venues. This creates a win-win scenario where businesses get 
                  exposure while customers discover amazing local events.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <div className="bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-lg p-8 text-center border border-amber-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-amber-400 to-amber-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">📢</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Free Event Promotion</h3>
                  <p className="text-gray-700 leading-relaxed">
                    All event listings on OnTap MN are completely free. Bars and venues can submit 
                    their bingo nights, meat raffles, karaoke, and other events at no cost.
                  </p>
                  <div className="mt-6 pt-6 border-t border-amber-200">
                    <span className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">$0</span>
                    <p className="text-sm text-gray-600 mt-1">Per Event Listing</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-yellow-50/50 rounded-2xl shadow-lg p-8 text-center border border-yellow-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Targeted Audience</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our visitors are actively searching for bar events and entertainment. 
                    Your advertising reaches people who are ready to attend and spend money.
                  </p>
                  <div className="mt-6 pt-6 border-t border-yellow-200">
                    <span className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">85%</span>
                    <p className="text-sm text-gray-600 mt-1">Intent to Visit</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-2xl shadow-lg p-8 text-center border border-orange-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-orange-400 to-orange-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Win-Win Partnership</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Advertising revenue keeps our platform free for everyone while giving 
                    businesses premium visibility to attract more customers.
                  </p>
                  <div className="mt-6 pt-6 border-t border-orange-200">
                    <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">100%</span>
                    <p className="text-sm text-gray-600 mt-1">Mutual Benefit</p>
                  </div>
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
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4 mt-1 flex-shrink-0">
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

                <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-8 border-2 border-amber-200">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-amber-400 to-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <span className="text-3xl">📊</span>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">Growing Community</h3>
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
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4">
                  Advertising Options
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  We offer flexible advertising solutions to fit different budgets and goals.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                {/* Banner-only Advertisement */}
                <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-md p-6 md:p-8 border border-amber-100 hover:shadow-xl transition-all duration-300">
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shadow-md">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Banner-only Advertisement</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Top-of-page banner placement across high-traffic pages. No featured pin included.
                    </p>
                  </div>
                  <ul className="space-y-2 text-gray-700 mb-6">
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2 mt-0.5" aria-hidden="true">✓</span>
                      <span className="text-sm">Homepage banner placement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2 mt-0.5" aria-hidden="true">✓</span>
                      <span className="text-sm">High-visibility pages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2 mt-0.5" aria-hidden="true">✓</span>
                      <span className="text-sm">Mobile-optimized displays</span>
                    </li>
                  </ul>
                  <div className="text-center pt-4 border-t border-amber-100">
                    <div className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-2">$50</div>
                    <div className="text-gray-600 text-sm">4-week commitment</div>
                  </div>
                </div>

                {/* Featured Event Advertisement */}
                <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-md p-6 md:p-8 border border-amber-100 hover:shadow-xl transition-all duration-300">
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shadow-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Featured Event Advertisement</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Includes a banner plus a pinned Featured Event on the Events page.
                    </p>
                  </div>
                  <ul className="space-y-2 text-gray-700 mb-6">
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2 mt-0.5" aria-hidden="true">✓</span>
                      <span className="text-sm">Pinned Featured Event on Events page</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2 mt-0.5" aria-hidden="true">✓</span>
                      <span className="text-sm">Banner placement included</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2 mt-0.5" aria-hidden="true">✓</span>
                      <span className="text-sm">Priority visibility across event listings</span>
                    </li>
                  </ul>
                  <div className="text-center pt-4 border-t border-amber-100">
                    <div className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-2">$75</div>
                    <div className="text-gray-600 text-sm">4-week commitment</div>
                  </div>
                </div>

                {/* Premium Event Boost */}
                <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-amber-400 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-3 shadow-md">
                        MOST POPULAR
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shadow-lg">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 8h10M7 12h10M7 16h10" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Premium Event Boost</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        Everything in Featured plus dedicated Google Ads pushes for your event and brand.
                      </p>
                    </div>
                    <ul className="space-y-2 text-gray-700 mb-6">
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2 mt-0.5" aria-hidden="true">✓</span>
                        <span className="text-sm">Banner across high-traffic pages</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2 mt-0.5" aria-hidden="true">✓</span>
                        <span className="text-sm">Pinned Featured Event</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2 mt-0.5" aria-hidden="true">✓</span>
                        <span className="text-sm">Dedicated Google Ads pushes</span>
                      </li>
                    </ul>
                    <div className="text-center pt-4 border-t border-amber-200">
                      <div className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-2">$150</div>
                      <div className="text-gray-600 text-sm">4-week commitment</div>
                    </div>
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
                    size="large"
                    variant="outlined"
                    sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'white', color: 'primary.main' } }}
                  >
                    Get Started Today
                  </Button>
                </Link>
                <Link href="/submit-event">
                  <Button 
                    size="large"
                    variant="outlined"
                    sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'white', color: 'primary.main' } }}
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