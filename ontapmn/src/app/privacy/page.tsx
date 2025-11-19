import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation, Footer, Container, Section } from '../../components'

export const metadata: Metadata = {
  title: 'Privacy Policy | OnTap MN',
  description: 'Learn how OnTap MN collects, uses, and protects your personal information. Read our privacy policy for complete details.',
  keywords: ['privacy policy', 'data protection', 'OnTap MN', 'user privacy'],
}

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <Section padding="lg" background="primary">
          <Container>
            <div className="text-center text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-white/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Your Privacy Matters</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-100 max-w-3xl mx-auto">
                Last Updated: November 18, 2025
              </p>
            </div>
          </Container>
        </Section>

        {/* Content Section */}
        <Section padding="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
                <p className="text-gray-700 leading-relaxed">
                  At OnTap MN, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </div>

              <div className="space-y-8">
                {/* Section 1 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">1</span>
                    Information We Collect
                  </h2>
                  <div className="ml-13 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-2">Personal Information</h3>
                      <p className="text-gray-700 leading-relaxed mb-2">
                        When you submit an event, contact us, or sign up for our services, we may collect:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li>Name and business name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Business address and location</li>
                        <li>Event details and descriptions</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-2">Automatically Collected Information</h3>
                      <p className="text-gray-700 leading-relaxed mb-2">
                        When you visit our website, we automatically collect:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li>IP address and browser type</li>
                        <li>Device information</li>
                        <li>Pages visited and time spent on pages</li>
                        <li>Referring website addresses</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">2</span>
                    How We Use Your Information
                  </h2>
                  <div className="ml-13 space-y-3">
                    <p className="text-gray-700 leading-relaxed">We use the information we collect to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Process and publish event submissions</li>
                      <li>Respond to your inquiries and provide customer support</li>
                      <li>Send you updates about your events or account</li>
                      <li>Improve our website and services</li>
                      <li>Analyze usage patterns and optimize user experience</li>
                      <li>Prevent fraud and ensure website security</li>
                      <li>Comply with legal obligations</li>
                      <li>Send marketing communications (with your consent)</li>
                    </ul>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">3</span>
                    Cookies and Tracking Technologies
                  </h2>
                  <div className="ml-13 space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      We use cookies and similar tracking technologies to enhance your experience on our website. 
                      Cookies are small data files stored on your device that help us:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Remember your preferences and settings</li>
                      <li>Understand how you use our website</li>
                      <li>Improve website performance and functionality</li>
                      <li>Provide personalized content and advertising</li>
                    </ul>
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-4">
                      <p className="text-gray-700 text-sm">
                        <strong>Google Analytics:</strong> We use Google Analytics to analyze website traffic and user behavior. 
                        Google Analytics uses cookies to collect information in an anonymous form. You can opt-out of Google 
                        Analytics by using our cookie consent banner or installing the{' '}
                        <a 
                          href="https://tools.google.com/dlpage/gaoptout" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-700 underline"
                        >
                          Google Analytics Opt-out Browser Add-on
                        </a>.
                      </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      You can control cookie preferences through our consent banner or your browser settings. 
                      Note that disabling cookies may limit some website functionality.
                    </p>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">4</span>
                    Information Sharing and Disclosure
                  </h2>
                  <div className="ml-13 space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li><strong>Event Listings:</strong> Information submitted for event listings will be publicly displayed on our website</li>
                      <li><strong>Service Providers:</strong> We may share information with trusted service providers who assist in operating our website</li>
                      <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
                      <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger, acquisition, or sale of assets</li>
                    </ul>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">5</span>
                    Data Security
                  </h2>
                  <div className="ml-13 space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      We implement appropriate technical and organizational security measures to protect your information 
                      against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                      over the internet is 100% secure, and we cannot guarantee absolute security.
                    </p>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">6</span>
                    Your Rights and Choices
                  </h2>
                  <div className="ml-13 space-y-3">
                    <p className="text-gray-700 leading-relaxed">You have the right to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Access, update, or delete your personal information</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Disable cookies through your browser or our consent banner</li>
                      <li>Request a copy of your data</li>
                      <li>Withdraw consent for data processing</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      To exercise these rights, please contact us at the email provided below.
                    </p>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">7</span>
                    Children&apos;s Privacy
                  </h2>
                  <div className="ml-13">
                    <p className="text-gray-700 leading-relaxed">
                      Our services are not intended for children under the age of 21. We do not knowingly collect 
                      personal information from individuals under 21. If you believe we have collected information 
                      from a child under 21, please contact us immediately.
                    </p>
                  </div>
                </div>

                {/* Section 8 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">8</span>
                    Changes to This Privacy Policy
                  </h2>
                  <div className="ml-13">
                    <p className="text-gray-700 leading-relaxed">
                      We may update this Privacy Policy from time to time. We will notify you of any changes by 
                      posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. 
                      Your continued use of our services after any changes constitutes acceptance of the updated policy.
                    </p>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-lg p-8 border-2 border-amber-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <svg className="w-8 h-8 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Us
                  </h2>
                  <div className="ml-11">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Email:</strong> austin@ontapmn.com</p>
                      <p><strong>Website:</strong>{' '}
                        <Link href="/contact" className="text-amber-600 hover:text-amber-700 underline">
                          Contact Form
                        </Link>
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
