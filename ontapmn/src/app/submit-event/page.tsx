import type { Metadata } from 'next'
import { Navigation, Footer, Container, Section } from '../../components'
import { SubmitEventForm } from './components/SubmitEventForm'

export const metadata: Metadata = {
  title: 'Submit Your Event',
  description: 'Submit your bar bingo, meat raffle, karaoke, trivia, or live music event to be featured on OnTap MN. Reach more customers across Minnesota.',
  keywords: ['submit event', 'bar events', 'Minnesota events', 'promote events', 'bar marketing'],
}

export default function SubmitEventPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <Section padding="lg" background="primary">
          <Container>
            <div className="text-center text-white relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-white/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>100% Free Event Submissions</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  Submit Your Event
                </h1>
                <p className="text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-8">
                  Get your bar events featured on OnTap MN and reach thousands of potential customers across Minnesota. 
                  It&apos;s free to submit and helps grow the Minnesota bar community.
                </p>
                <div className="flex justify-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm">No Cost</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-sm">Fast Approval</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-sm">Wide Reach</span>
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
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-black mb-4">
                  Why Submit Your Event?
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto">
                  Join hundreds of Minnesota bars already reaching more customers through OnTap MN
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-white rounded-2xl shadow-lg p-8 text-center border-2 border-green-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-20 h-20 rounded-2xl rotate-6 group-hover:rotate-12 flex items-center justify-center mx-auto mb-6 shadow-xl transition-transform duration-300">
                    <span className="text-4xl -rotate-6 group-hover:-rotate-12 transition-transform duration-300">📈</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">Increase Attendance</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Reach thousands of potential customers actively looking for bar events in Minnesota
                  </p>
                  <div className="pt-4 border-t border-green-200">
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">10K+</span>
                    <p className="text-xs text-gray-600 mt-1">Monthly Visitors</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 via-violet-50 to-white rounded-2xl shadow-lg p-8 text-center border-2 border-purple-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-purple-400 to-violet-500 w-20 h-20 rounded-2xl -rotate-6 group-hover:-rotate-12 flex items-center justify-center mx-auto mb-6 shadow-xl transition-transform duration-300">
                    <span className="text-4xl rotate-6 group-hover:rotate-12 transition-transform duration-300">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">Targeted Marketing</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Connect with people actively searching for your specific type of entertainment
                  </p>
                  <div className="pt-4 border-t border-purple-200">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">85%</span>
                    <p className="text-xs text-gray-600 mt-1">Intent to Attend</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-white rounded-2xl shadow-lg p-8 text-center border-2 border-amber-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-amber-400 to-yellow-500 w-20 h-20 rounded-2xl rotate-6 group-hover:rotate-12 flex items-center justify-center mx-auto mb-6 shadow-xl transition-transform duration-300">
                    <span className="text-4xl -rotate-6 group-hover:-rotate-12 transition-transform duration-300">💰</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">Free Exposure</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    No cost to submit your events. Build your customer base without spending a dime
                  </p>
                  <div className="pt-4 border-t border-amber-200">
                    <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">$0</span>
                    <p className="text-xs text-gray-600 mt-1">Always Free</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Form Section */}
        <Section padding="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SubmitEventForm />
            </div>
          </Container>
        </Section>

        {/* Process Section */}
        <Section padding="lg" background="gray">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-black mb-4">
                  How It Works
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto">
                  Simple, fast, and completely free. Get your events listed in three easy steps.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connection Lines for Desktop */}
                <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"></div>
                
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-amber-100 hover:border-amber-300 transition-all duration-300">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                      1
                    </div>
                    <div className="mt-4 text-center">
                      <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-black mb-2">Fill Out Form</h3>
                      <p className="text-gray-600 text-sm">
                        Provide your event details including date, time, location, and description
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-amber-100 hover:border-amber-300 transition-all duration-300">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                      2
                    </div>
                    <div className="mt-4 text-center">
                      <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-black mb-2">We Review</h3>
                      <p className="text-gray-600 text-sm">
                        Our team quickly reviews your submission (usually within 24-48 hours)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-amber-100 hover:border-amber-300 transition-all duration-300">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                      3
                    </div>
                    <div className="mt-4 text-center">
                      <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-black mb-2">Go Live</h3>
                      <p className="text-gray-600 text-sm">
                        Your event appears on OnTap MN and starts attracting interested customers
                      </p>
                    </div>
                  </div>
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