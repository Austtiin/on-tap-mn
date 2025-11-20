import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation, Footer, Container, Section } from '../../components'

export const metadata: Metadata = {
  title: 'Terms of Service | OnTap MN',
  description: 'Read the terms and conditions for using OnTap MN. Learn about your rights and responsibilities when using our platform.',
  keywords: ['terms of service', 'terms and conditions', 'OnTap MN', 'user agreement'],
}

export default function TermsPage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Legal Agreement</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Terms of Service
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
                  Welcome to OnTap MN. By accessing or using our website and services, you agree to be bound by 
                  these Terms of Service. Please read them carefully before using our platform.
                </p>
              </div>

              <div className="space-y-8">
                {/* Section 1 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">1</span>
                    Acceptance of Terms
                  </h2>
                  <div className="ml-13 space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      By accessing or using OnTap MN (&quot;Service&quot;), you agree to comply with and be bound by these 
                      Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not 
                      use our Service.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      We reserve the right to modify these terms at any time. Your continued use of the Service 
                      after changes are posted constitutes acceptance of the modified terms.
                    </p>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">2</span>
                    Description of Service
                  </h2>
                  <div className="ml-13 space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      OnTap MN is a platform that connects Minnesota bars and venues with customers by providing 
                      information about bar events including bingo, meat raffles, karaoke, trivia, live music, and 
                      other entertainment activities.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      We provide this Service free of charge to both users and event organizers, supported by 
                      advertising revenue.
                    </p>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">3</span>
                    User Responsibilities
                  </h2>
                  <div className="ml-13 space-y-4">
                    <p className="text-gray-700 leading-relaxed">By using our Service, you agree to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Provide accurate, current, and complete information</li>
                      <li>Maintain the security of your account credentials</li>
                      <li>Comply with all applicable local, state, and federal laws</li>
                      <li>Not use the Service for any unlawful or prohibited purpose</li>
                      <li>Not interfere with or disrupt the Service or servers</li>
                      <li>Not attempt to gain unauthorized access to any part of the Service</li>
                      <li>Not impersonate any person or entity</li>
                      <li>Not post false, misleading, or deceptive content</li>
                    </ul>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">4</span>
                    Event Submissions
                  </h2>
                  <div className="ml-13 space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      When submitting events to OnTap MN, you represent and warrant that:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>You have the authority to submit the event information</li>
                      <li>All information provided is accurate and truthful</li>
                      <li>The event complies with all applicable laws and regulations</li>
                      <li>You have rights to any images or content you submit</li>
                      <li>The event is appropriate for individuals 21 years of age and older</li>
                    </ul>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                      <p className="text-gray-700 text-sm">
                        <strong>Note:</strong> OnTap MN reserves the right to review, edit, or remove any event 
                        submission at our discretion. We do not guarantee publication of submitted events.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">5</span>
                    Intellectual Property Rights
                  </h2>
                  <div className="ml-13 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-2">Our Content</h3>
                      <p className="text-gray-700 leading-relaxed">
                        The Service and its original content, features, and functionality are owned by OnTap MN 
                        and are protected by international copyright, trademark, patent, trade secret, and other 
                        intellectual property laws.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-2">User Content</h3>
                      <p className="text-gray-700 leading-relaxed">
                        By submitting content to OnTap MN (including event information, images, and descriptions), 
                        you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, 
                        adapt, publish, and display such content in connection with operating and promoting the Service.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">6</span>
                    Prohibited Content
                  </h2>
                  <div className="ml-13 space-y-3">
                    <p className="text-gray-700 leading-relaxed">You may not submit or post content that:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Is illegal, harmful, threatening, abusive, or harassing</li>
                      <li>Infringes on intellectual property rights</li>
                      <li>Contains viruses or malicious code</li>
                      <li>Promotes illegal activities or substances</li>
                      <li>Is sexually explicit or obscene</li>
                      <li>Is discriminatory based on race, religion, gender, sexual orientation, or disability</li>
                      <li>Contains false or misleading information</li>
                      <li>Violates the privacy of others</li>
                    </ul>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">7</span>
                    Disclaimer of Warranties
                  </h2>
                  <div className="ml-13 space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER 
                      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR 
                      A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      OnTap MN does not warrant that the Service will be uninterrupted, secure, or error-free. 
                      We do not guarantee the accuracy, completeness, or reliability of any content or event information.
                    </p>
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-4">
                      <p className="text-gray-700 text-sm">
                        <strong>Important:</strong> Event information is provided by third parties. OnTap MN is not 
                        responsible for the accuracy of event details, changes to events, or cancellations. Always 
                        verify event information with the venue directly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 8 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">8</span>
                    Limitation of Liability
                  </h2>
                  <div className="ml-13 space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, ONTAP MN SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                      INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, 
                      WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER 
                      INTANGIBLE LOSSES.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      OnTap MN is not responsible for any issues arising from attendance at events listed on our platform, 
                      including but not limited to personal injury, property damage, or disappointment with event quality.
                    </p>
                  </div>
                </div>

                {/* Section 9 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">9</span>
                    Indemnification
                  </h2>
                  <div className="ml-13">
                    <p className="text-gray-700 leading-relaxed">
                      You agree to indemnify, defend, and hold harmless OnTap MN and its officers, directors, 
                      employees, and agents from any claims, liabilities, damages, losses, and expenses, including 
                      reasonable attorneys&apos; fees, arising out of or in any way connected with your access to or use 
                      of the Service, your violation of these Terms, or your infringement of any intellectual property 
                      or other rights of any person or entity.
                    </p>
                  </div>
                </div>

                {/* Section 10 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">10</span>
                    Age Restriction
                  </h2>
                  <div className="ml-13">
                    <p className="text-gray-700 leading-relaxed">
                      Our Service is intended for individuals 21 years of age or older. By using the Service, 
                      you represent that you are at least 21 years old. We do not knowingly collect information 
                      from or market to individuals under 21.
                    </p>
                  </div>
                </div>

                {/* Section 11 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">11</span>
                    Termination
                  </h2>
                  <div className="ml-13 space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      We reserve the right to terminate or suspend your access to the Service immediately, without 
                      prior notice or liability, for any reason, including without limitation if you breach these Terms.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Upon termination, your right to use the Service will immediately cease. All provisions of these 
                      Terms that by their nature should survive termination shall survive, including ownership provisions, 
                      warranty disclaimers, and limitations of liability.
                    </p>
                  </div>
                </div>

                {/* Section 12 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">12</span>
                    Governing Law
                  </h2>
                  <div className="ml-13">
                    <p className="text-gray-700 leading-relaxed">
                      These Terms shall be governed by and construed in accordance with the laws of the State of 
                      Minnesota, United States, without regard to its conflict of law provisions. Any disputes arising 
                      from these Terms or your use of the Service shall be resolved in the courts of Minnesota.
                    </p>
                  </div>
                </div>

                {/* Section 13 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">13</span>
                    Severability
                  </h2>
                  <div className="ml-13">
                    <p className="text-gray-700 leading-relaxed">
                      If any provision of these Terms is found to be unenforceable or invalid, that provision will be 
                      limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain 
                      in full force and effect.
                    </p>
                  </div>
                </div>

                {/* Section 14 */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-lg">14</span>
                    Entire Agreement
                  </h2>
                  <div className="ml-13">
                    <p className="text-gray-700 leading-relaxed">
                      These Terms, together with our Privacy Policy, constitute the entire agreement between you and 
                      OnTap MN regarding the use of the Service and supersede any prior agreements.
                    </p>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-lg p-8 border-2 border-amber-200">
                  <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                    <svg className="w-8 h-8 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Questions About These Terms?
                  </h2>
                  <div className="ml-11">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Email:</strong> Austin@ontapmn.com</p>
                      <p><strong>Website:</strong>{' '}
                        <Link href="/contact" className="text-amber-600 hover:text-amber-700 underline">
                          Contact Form
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">
                  By using OnTap MN, you acknowledge that you have read and understood these Terms of Service.
                </p>
                <Link 
                  href="/privacy"
                  className="text-amber-600 hover:text-amber-700 font-semibold underline"
                >
                  Read our Privacy Policy
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
