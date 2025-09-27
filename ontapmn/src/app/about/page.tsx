import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation, Footer, Container, Section } from '../../components'

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
        <Section padding="lg" background="primary">
          <Container>
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                About OnTap MN
              </h1>
              <p className="text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
                Connecting Minnesota communities through the best bar events and entertainment
              </p>
            </div>
          </Container>
        </Section>

        {/* Mission Section */}
        <Section padding="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  OnTap MN was created to help Minnesotans discover the incredible bar culture 
                  and community events happening right in their backyard. From weekly bingo nights 
                  to meat raffles, karaoke competitions to trivia challenges, we believe these events 
                  are the heart of Minnesota&apos;s social fabric.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-accent mb-4">Discover</h3>
                  <p className="text-gray-600">
                    Find amazing bar events happening near you, from classic bingo nights to unique local traditions.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-bold text-accent mb-4">Connect</h3>
                  <p className="text-gray-600">
                    Bring communities together by making it easy to find and attend local bar events.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💪</span>
                  </div>
                  <h3 className="text-xl font-bold text-accent mb-4">Support</h3>
                  <p className="text-gray-600">
                    Help local businesses grow by connecting them with customers looking for great entertainment.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Founder Section */}
        <Section padding="lg" background="gray">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="lg:flex">
                  <div className="lg:w-1/3 bg-gradient-to-br from-primary-light to-primary p-8 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">👨‍💻</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white">AS</h3>
                      <p className="text-gray-50">Founder & Developer</p>
                    </div>
                  </div>
                  <div className="lg:w-2/3 p-8">
                    <h3 className="text-2xl font-bold text-black mb-4">Meet the Creator</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
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
        <Section padding="lg">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-6">
                Why Is OnTap MN Free?
              </h2>
              <div className="text-lg text-gray-600 space-y-4 leading-relaxed">
                <p>
                  OnTap MN is completely free for both businesses and users because I believe 
                  great bar events should be easy to find and attend. Local bars are community 
                  gathering places that bring people together, and I want to support that.
                </p>
                <p>
                  By providing free event listings, I hope to help more people discover the 
                  incredible entertainment happening at Minnesota bars while supporting local 
                  businesses in building their customer base.
                </p>
                <p className="font-medium text-primary">
                  It&apos;s my way of giving back to the Minnesota bar community that has given me 
                  so many great nights and lasting memories.
                </p>
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