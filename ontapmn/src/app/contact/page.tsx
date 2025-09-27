import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation, Footer, Container, Section } from '../../components'
import { ContactForm } from './components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the OnTap MN team. We\'d love to hear your feedback, suggestions, or answer any questions about our platform.',
  keywords: ['contact', 'OnTap MN', 'support', 'feedback', 'questions'],
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <Section padding="lg" background="primary">
          <Container>
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
                Have questions, suggestions, or feedback? We&apos;d love to hear from you!
              </p>
            </div>
          </Container>
        </Section>

        {/* Contact Info & Form Section */}
        <Section padding="lg" background="gray">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div>
                  <h2 className="text-3xl font-bold text-black mb-8">
                    Get In Touch
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-4">
                        Why Contact Us?
                      </h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-primary mr-3 mt-1">•</span>
                          Report issues with event listings or website functionality
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-3 mt-1">•</span>
                          Suggest new features or improvements
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-3 mt-1">•</span>
                          Ask questions about submitting events
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-3 mt-1">•</span>
                          Partnership or advertising inquiries
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-3 mt-1">•</span>
                          General feedback about OnTap MN
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-black mb-4">
                        Response Time
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        We typically respond to messages within 1-2 business days. For urgent 
                        issues related to event listings or website problems, we&apos;ll do our best 
                        to respond the same day.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-black mb-4">
                        Other Ways to Connect
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                          </svg>
                          <a 
                            href="https://github.com/Austtiin" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-dark transition-colors duration-200"
                          >
                            Check out the project on GitHub
                          </a>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <Link 
                            href="/about"
                            className="text-primary hover:text-primary-dark transition-colors duration-200"
                          >
                            Learn more about our mission
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <ContactForm />
                </div>
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
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-black mb-3">
                    How do I submit an event?
                  </h3>
                  <p className="text-gray-800 leading-relaxed">
                    Visit our{' '}
                    <Link href="/submit-event" className="text-primary hover:text-primary-dark">
                      Submit Event page
                    </Link>
                    {' '}and fill out the form with your business and event information. 
                    It&apos;s completely free and takes just a few minutes!
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-black mb-3">
                    Is there a cost to list my events?
                  </h3>
                  <p className="text-gray-800 leading-relaxed">
                    No! OnTap MN is completely free for both event organizers and users. 
                    We believe great bar events should be easy to find and attend.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-black mb-3">
                    How long does it take for my event to be published?
                  </h3>
                  <p className="text-gray-800 leading-relaxed">
                    We review all submissions within 2-3 business days. Once approved, 
                    your event will appear on the site immediately. We&apos;ll email you 
                    with confirmation and any questions.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-black mb-3">
                    Can I update or remove my event listing?
                  </h3>
                  <p className="text-gray-800 leading-relaxed">
                    Yes! Contact us with your event details and the changes you&apos;d like to make. 
                    We&apos;ll update your listing promptly and send you a confirmation.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-black mb-3">
                    What types of events do you accept?
                  </h3>
                  <p className="text-gray-800 leading-relaxed">
                    We focus on bar and tavern events like bingo nights, meat raffles, karaoke, 
                    trivia, live music, and similar community-oriented entertainment. All events 
                    must comply with local laws and our community standards.
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