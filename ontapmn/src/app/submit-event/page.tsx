import type { Metadata } from 'next'
import { Navigation, Footer, Container, Section } from '../../components'
import Button from '@mui/material/Button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Submit Your Event',
  description: 'Login to the OnTap MN event portal to submit and manage your bar events.',
  keywords: ['submit event', 'bar events', 'Minnesota events', 'promote events', 'event portal'],
}

export default function SubmitEventPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <Section padding="lg" background="primary">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(/imgs/pexels-katriengrevendonck-2101487.jpg)'}} />
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span>Secure Event Management</span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                Submit Your Event
              </h1>
              <p className="text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
                Login to the OnTap MN event portal using Single Sign-On (SSO) to submit and manage your bar events.
              </p>

              {/* Chips */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className="text-[11px] uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1 rounded-full">Secure Portal</span>
                <span className="text-[11px] uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1 rounded-full">Instant Listing</span>
                <span className="text-[11px] uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1 rounded-full">Easy Management</span>
              </div>
            </div>
          </Container>
        </Section>

        {/* Login Section */}
        <Section padding="lg" background="gray">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center border-2 border-amber-200">
                <div className="bg-gradient-to-br from-amber-400 to-amber-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black mb-4">
                  Login to Event Portal
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Use your secure Single Sign-On (SSO) credentials to access the event management portal.
                </p>
                <Button
                  variant="contained"
                  size="large"
                  href="https://events.ontap-mn.com"
                  sx={{
                    bgcolor: '#f59e0b',
                    '&:hover': { bgcolor: '#d97706' },
                    color: '#fff',
                    fontWeight: 700,
                    px: 6,
                    py: 2,
                    fontSize: '1.125rem'
                  }}
                >
                  Login with SSO
                </Button>
                <p className="text-sm text-gray-500 mt-6">
                  Can&apos;t get access? <Link href="/contact" className="text-amber-600 hover:text-amber-700 font-semibold">Contact us</Link> to get help.
                </p>
              </div>

              {/* Benefits Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-black mb-6 text-center">
                  Why Use the Event Portal?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200">
                    <div className="text-4xl mb-3">📈</div>
                    <h4 className="font-bold text-black mb-2">Manage Events</h4>
                    <p className="text-sm text-gray-600">
                      Easily create, edit, and manage all your events in one place
                    </p>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200">
                    <div className="text-4xl mb-3">🎯</div>
                    <h4 className="font-bold text-black mb-2">Track Performance</h4>
                    <p className="text-sm text-gray-600">
                      See how your events are performing and reach more customers
                    </p>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200">
                    <div className="text-4xl mb-3">🔒</div>
                    <h4 className="font-bold text-black mb-2">Secure Access</h4>
                    <p className="text-sm text-gray-600">
                      SSO authentication keeps your account and events safe
                    </p>
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