import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation, Footer, Container, Section, SectionHeader } from '../../components'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about OnTap MN and our mission to connect Minnesota bar-goers with the best local events.',
  keywords: ['about', 'OnTap MN', 'Minnesota bars', 'local events', 'bar community'],
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <Section padding="lg" background="dark" edges="bottom">
          <Container>
            <div className="relative text-center text-white">
              {/* Decorative overlays */}
              <div className="pointer-events-none absolute inset-0 opacity-30">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[120px] h-[120px] rounded-full bg-gradient-to-br from-amber-400/40 to-amber-600/30 blur-2xl" />
                <div className="absolute top-6 right-10 w-16 h-16 rounded-full border border-amber-300/30" />
                <div className="absolute bottom-8 left-12 w-10 h-10 rounded-full border border-amber-200/30" />
                <div className="absolute bottom-10 right-1/4 w-24 h-24 rounded-full bg-white/5" />
              </div>

              {/* Small badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-xs tracking-wide mb-4 backdrop-blur-sm">
                <span className="inline-flex w-2 h-2 rounded-full bg-amber-300" />
                Minnesota • Community-Built
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                About OnTap MN
              </h1>
              <p className="text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
                Connecting Minnesota communities through the best bar events and entertainment
              </p>

              {/* Chips */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className="text-[11px] uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1 rounded-full">Local First</span>
                <span className="text-[11px] uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1 rounded-full">Free Listings</span>
                <span className="text-[11px] uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1 rounded-full">Community Driven</span>
              </div>
            </div>
          </Container>
        </Section>

        {/* Mission Section */}
        <Section padding="lg" background="cream" edges="both">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SectionHeader
                title="Our Mission"
                subtitle={(
                  <p>
                    OnTap MN was created to help Minnesotans discover the incredible bar culture and community
                    events happening right in their backyard. From weekly bingo nights to meat raffles, karaoke,
                    and trivia, these events are the heart of Minnesota&apos;s social fabric.
                  </p>
                )}
                size="lg"
                align="center"
                className="mb-10"
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-md p-6 text-center border border-amber-100 hover:shadow-lg transition-all duration-300">
                  <div className="bg-gradient-to-br from-amber-400 to-amber-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-bold text-accent mb-3">Discover</h3>
                  <p className="text-gray-600 text-sm">
                    Find amazing bar events happening near you, from classic bingo nights to unique local traditions.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl shadow-md p-6 text-center border border-yellow-100 hover:shadow-lg transition-all duration-300">
                  <div className="bg-slate-800 text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-lg font-bold text-accent mb-3">Connect</h3>
                  <p className="text-gray-600 text-sm">
                    Bring communities together by making it easy to find and attend local bar events.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-md p-6 text-center border border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-400 to-green-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-2xl">💪</span>
                  </div>
                  <h3 className="text-lg font-bold text-accent mb-3">Support</h3>
                  <p className="text-gray-600 text-sm">
                    Help local businesses grow by connecting them with customers looking for great entertainment.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Differentiators Section */}
        <Section padding="lg" background="paper" edges="bottom">
          <Container>
            <div className="max-w-6xl mx-auto">
              <SectionHeader
                title="What Makes Us Different"
                subtitle="We built OnTap MN for Minnesotans who love their neighborhood spots. These core principles guide everything we do."
                size="lg"
                className="mb-8"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="absolute -top-3 -left-3 bg-gradient-to-br from-amber-400 to-amber-500 text-white w-10 h-10 rounded-lg flex items-center justify-center shadow-md">🍺</div>
                  <h3 className="text-lg font-semibold text-black mb-2">Local • Not Corporate</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">We focus on the neighborhood bars, VFWs, lodges, and taverns that make Minnesota special.</p>
                </div>
                <div className="relative bg-gradient-to-br from-white to-amber-50 rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="absolute -top-3 -left-3 bg-gradient-to-br from-amber-400 to-amber-500 text-white w-10 h-10 rounded-lg flex items-center justify-center shadow-md">✅</div>
                  <h3 className="text-lg font-semibold text-black mb-2">Simple & Fast</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">No clutter. No paywalls. Just quick access to what’s on tap tonight and this week, across Minnesota.</p>
                </div>
                <div className="relative bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="absolute -top-3 -left-3 bg-gradient-to-br from-amber-400 to-amber-500 text-white w-10 h-10 rounded-lg flex items-center justify-center shadow-md">🧭</div>
                  <h3 className="text-lg font-semibold text-black mb-2">Built For Locals</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">Designed around how Minnesotans actually plan nights with friends: bingo, raffles, karaoke, trivia, and more.</p>
                </div>
                <div className="relative bg-gradient-to-br from-white to-amber-50 rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="absolute -top-3 -left-3 bg-gradient-to-br from-amber-400 to-amber-500 text-white w-10 h-10 rounded-lg flex items-center justify-center shadow-md">💛</div>
                  <h3 className="text-lg font-semibold text-black mb-2">Free Forever</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">Listings stay free because supporting our bar community matters more than ads or subscriptions.</p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Founder Section */}
        <Section padding="lg" background="gray">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* subtle pattern */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(251,191,36,0.06),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(251,191,36,0.06),transparent_60%)]" />
                <div className="lg:flex">
                  <div className="relative lg:w-1/3 bg-gradient-to-br from-primary-light to-primary p-8 flex items-center justify-center">
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border-2 border-white/30" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full border border-white/30" />
                    <div className="text-center text-white">
                      <div className="relative w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-white/25" />
                        <span className="relative text-4xl">👨‍💻</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white">AS</h3>
                      <p className="text-gray-50">Founder & Developer</p>
                    </div>
                  </div>
                  <div className="lg:w-2/3 p-8 relative">
                    <h3 className="text-2xl font-bold text-black mb-3">Meet the Creator</h3>
                    <div className="mb-4 rounded-lg border border-amber-100 bg-amber-50/40 p-4 text-amber-900 text-sm leading-relaxed">
                      <div className="flex items-start">
                        <span className="mr-2 text-amber-600 text-lg">“</span>
                        <p className="flex-1">OnTap MN is dedicated to Minnesota’s bar culture—simple, helpful, and built for locals. If it helps just one more person find a great night out, it’s worth it.</p>
                      </div>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">
                      <p>
                        Hi there! I&apos;m a local Minnesota bar enthusiast and developer who created OnTap MN 
                        out of a genuine love for our state&apos;s amazing bar culture. As someone who enjoys 
                        bar bingo, meat raffles, and all the unique events that make Minnesota bars special, 
                        I noticed how difficult it could be to find out what&apos;s happening and when.
                      </p>
                      <p>
                        Whether you&apos;re new to the area, visiting from out of town, or just looking to 
                        try something different, finding great bar events shouldn&apos;t be a challenge. 
                        That&apos;s why I built OnTap MN as a completely free resource for both event-goers 
                        and local businesses.
                      </p>
                      <p>
                        My goal is simple: make it easier for Minnesotans to discover the incredible 
                        entertainment happening at bars across our state, while helping local businesses 
                        connect with customers who are actively looking for fun things to do.
                      </p>
                      <div className="pt-4">
                        <a 
                          href="https://github.com/Austtiin" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary-dark transition-colors duration-200"
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                          </svg>
                          Check out the code on GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Why Free Section */}
        <Section padding="lg" background="cream" edges="bottom">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-2xl p-8 shadow-sm">
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Free Forever</div>
                <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-4 text-center">Why Is OnTap MN Free?</h2>
                <div className="text-base text-gray-700 space-y-4 leading-relaxed max-w-3xl mx-auto">
                  <p>
                    OnTap MN is completely free for both businesses and users because we believe 
                    great bar events should be easy to find and attend. Local bars are community 
                    gathering places that bring people together, and we want to support that.
                  </p>
                  <p>
                    By providing free event listings, we help more people discover the 
                    incredible entertainment happening at Minnesota bars while supporting local 
                    businesses in building their customer base.
                  </p>
                  <p className="font-medium text-primary">
                    It&apos;s our way of giving back to the Minnesota bar community that has given so many of us 
                    great nights and lasting memories.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* For Locals / For Bars */}
        <Section padding="lg" background="gray">
          <Container>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-white w-10 h-10 rounded-lg flex items-center justify-center mr-3">🍻</div>
                  <h3 className="text-lg font-semibold text-black">For Locals</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">Quickly browse what’s on tap across Minnesota—bingo, raffles, karaoke, trivia, live music, and more.</p>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li className="flex items-start"><span className="text-amber-500 mr-2 mt-0.5">✓</span> Save time with a clean, fast UI</li>
                  <li className="flex items-start"><span className="text-amber-500 mr-2 mt-0.5">✓</span> Find nearby events any night of the week</li>
                  <li className="flex items-start"><span className="text-amber-500 mr-2 mt-0.5">✓</span> Discover new neighborhood spots</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-white w-10 h-10 rounded-lg flex items-center justify-center mr-3">🏷️</div>
                  <h3 className="text-lg font-semibold text-black">For Bars</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">List events for free and get more people through the door—no hoops, no spam, no upsells.</p>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li className="flex items-start"><span className="text-amber-500 mr-2 mt-0.5">✓</span> Free, fast event submissions</li>
                  <li className="flex items-start"><span className="text-amber-500 mr-2 mt-0.5">✓</span> Priority for community venues</li>
                  <li className="flex items-start"><span className="text-amber-500 mr-2 mt-0.5">✓</span> Optional sponsorships when you’re ready</li>
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section padding="lg" background="primary">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Join the OnTap MN Community
              </h2>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                Whether you&apos;re a bar owner looking to promote your events or someone searching 
                for your next great night out, OnTap MN is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/submit-event"
                  className="bg-secondary hover:bg-secondary-dark text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200 text-center"
                >
                  Submit Your Event
                </Link>
                <Link 
                  href="/"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 rounded-lg transition-colors duration-200 text-center"
                >
                  Find Events Near You
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}