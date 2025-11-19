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
            <div className="text-center text-white relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-white/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>We&apos;re Here to Help</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  Contact Us
                </h1>
                <p className="text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
                  Have questions, suggestions, or feedback? We&apos;d love to hear from you!
                </p>
              </div>
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
                  <div className="relative mb-8">
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full blur-xl opacity-50"></div>
                    <h2 className="text-3xl font-bold text-black relative">
                      Get In Touch
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-white rounded-2xl shadow-lg p-6 border-2 border-yellow-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                        <span className="bg-gradient-to-br from-yellow-400 to-amber-500 text-white rounded-xl w-10 h-10 flex items-center justify-center mr-3 shadow-md">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        Why Contact Us?
                      </h3>
                      <ul className="space-y-3 text-gray-700 text-sm">
                        <li className="flex items-start group">
                          <span className="text-yellow-600 mr-3 mt-0.5 text-lg group-hover:scale-125 transition-transform" aria-hidden="true">•</span>
                          <span>Report issues with event listings or website functionality</span>
                        </li>
                        <li className="flex items-start group">
                          <span className="text-yellow-600 mr-3 mt-0.5 text-lg group-hover:scale-125 transition-transform" aria-hidden="true">•</span>
                          <span>Suggest new features or improvements</span>
                        </li>
                        <li className="flex items-start group">
                          <span className="text-yellow-600 mr-3 mt-0.5 text-lg group-hover:scale-125 transition-transform" aria-hidden="true">•</span>
                          <span>Ask questions about submitting events</span>
                        </li>
                        <li className="flex items-start group">
                          <span className="text-yellow-600 mr-3 mt-0.5 text-lg group-hover:scale-125 transition-transform" aria-hidden="true">•</span>
                          <span>Partnership or advertising inquiries</span>
                        </li>
                        <li className="flex items-start group">
                          <span className="text-yellow-600 mr-3 mt-0.5 text-lg group-hover:scale-125 transition-transform" aria-hidden="true">•</span>
                          <span>General feedback about OnTap MN</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-6 border-2 border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                        <span className="bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-xl w-10 h-10 flex items-center justify-center mr-3 shadow-md">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        Response Time
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        We typically respond to messages within <span className="font-bold text-blue-600">1-2 business days</span>. For urgent 
                        issues related to event listings or website problems, we&apos;ll do our best 
                        to respond the same day.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg p-6 border-2 border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <h3 className="text-xl font-semibold text-black mb-5 flex items-center">
                        <span className="bg-gradient-to-br from-purple-400 to-purple-500 text-white rounded-xl w-10 h-10 flex items-center justify-center mr-3 shadow-md">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </span>
                        Other Ways to Connect
                      </h3>
                      <div className="space-y-4">
                        <a 
                          href="https://github.com/Austtiin" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors duration-200 group border border-purple-100"
                        >
                          <div className="bg-gray-900 rounded-lg w-10 h-10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900">GitHub</div>
                            <div className="text-xs text-gray-600">Check out the project</div>
                          </div>
                          <svg className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                        <Link 
                          href="/about"
                          className="flex items-center p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors duration-200 group border border-purple-100"
                        >
                          <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg w-10 h-10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900">About Us</div>
                            <div className="text-xs text-gray-600">Learn about our mission</div>
                          </div>
                          <svg className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
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
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-md p-6 border border-amber-100 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-black mb-3 flex items-start">
                    <span className="text-amber-500 mr-3 text-xl flex-shrink-0">Q:</span>
                    <span>How do I submit an event?</span>
                  </h3>
                  <p className="text-gray-800 leading-relaxed text-sm ml-9">
                    Visit our{' '}
                    <Link href="/apply" className="text-primary hover:text-primary-dark font-medium underline">
                      Apply to List Events page
                    </Link>
                    {' '}and fill out the form with your business and event information. 
                    It&apos;s completely free and takes just a few minutes!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-md p-6 border border-amber-100 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-black mb-3 flex items-start">
                    <span className="text-amber-500 mr-3 text-xl flex-shrink-0">Q:</span>
                    <span>Is there a cost to list my events?</span>
                  </h3>
                  <p className="text-gray-800 leading-relaxed text-sm ml-9">
                    No! OnTap MN is completely free for both event organizers and users. 
                    We believe great bar events should be easy to find and attend.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-md p-6 border border-amber-100 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-black mb-3 flex items-start">
                    <span className="text-amber-500 mr-3 text-xl flex-shrink-0">Q:</span>
                    <span>How long does it take for my event to be published?</span>
                  </h3>
                  <p className="text-gray-800 leading-relaxed text-sm ml-9">
                    We review all submissions within 2-3 business days. Once approved, 
                    your event will appear on the site immediately. We&apos;ll email you 
                    with confirmation and any questions.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-md p-6 border border-amber-100 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-black mb-3 flex items-start">
                    <span className="text-amber-500 mr-3 text-xl flex-shrink-0">Q:</span>
                    <span>Can I update or remove my event listing?</span>
                  </h3>
                  <p className="text-gray-800 leading-relaxed text-sm ml-9">
                    Yes! Contact us with your event details and the changes you&apos;d like to make. 
                    We&apos;ll update your listing promptly and send you a confirmation.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-md p-6 border border-amber-100 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-black mb-3 flex items-start">
                    <span className="text-amber-500 mr-3 text-xl flex-shrink-0">Q:</span>
                    <span>What types of events do you accept?</span>
                  </h3>
                  <p className="text-gray-800 leading-relaxed text-sm ml-9">
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