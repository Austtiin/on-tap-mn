import type { Metadata } from 'next'
import { Navigation, Footer } from '../../components'
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
      <main className="min-h-screen bg-gray-50">
        <div className="container-padding py-12">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-accent mb-4">
                Submit Your Event
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get your bar events featured on OnTap MN and reach thousands of potential customers across Minnesota. 
                It&apos;s free to submit and helps grow the Minnesota bar community.
              </p>
            </div>

            {/* Benefits Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-accent mb-6 text-center">
                Why Submit Your Event?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="font-semibold text-accent mb-2">Increase Attendance</h3>
                  <p className="text-gray-600 text-sm">Reach thousands of potential customers looking for bar events</p>
                </div>
                <div className="text-center">
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold text-accent mb-2">Targeted Marketing</h3>
                  <p className="text-gray-600 text-sm">Connect with people actively searching for your type of event</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="font-semibold text-accent mb-2">Free Exposure</h3>
                  <p className="text-gray-600 text-sm">No cost to submit your events and build your customer base</p>
                </div>
              </div>
            </div>

            {/* Form Component */}
            <SubmitEventForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}