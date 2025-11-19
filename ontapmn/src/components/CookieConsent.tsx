'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Small delay for smooth animation
      setTimeout(() => {
        setShowBanner(true)
        setTimeout(() => setIsVisible(true), 100)
      }, 1000)
    } else if (consent === 'accepted') {
      // Load Google Analytics if previously accepted
      loadGoogleAnalytics()
    }
  }, [])

  const loadGoogleAnalytics = () => {
    // Load Google Analytics script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-E2289NM2WH'
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-E2289NM2WH', {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
      });
    `
    document.head.appendChild(script2)
  }

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    loadGoogleAnalytics()
    closeBanner()
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    closeBanner()
  }

  const closeBanner = () => {
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  if (!showBanner) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t-4 border-amber-500 shadow-2xl">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Content */}
            <div className="flex items-start gap-4 flex-1">
              <div className="hidden sm:flex bg-amber-500 rounded-xl p-3 shadow-lg flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 sm:hidden text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  We Value Your Privacy
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  We use cookies and analytics tools like Google Analytics to improve your experience, 
                  understand how you use our site, and show you relevant content. These technologies help 
                  us make OnTap MN better for everyone.
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <Link 
                    href="/privacy" 
                    className="text-amber-400 hover:text-amber-300 underline transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    href="/terms" 
                    className="text-amber-400 hover:text-amber-300 underline transition-colors"
                  >
                    Terms of Service
                  </Link>
                  <a 
                    href="https://tools.google.com/dlpage/gaoptout" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 underline transition-colors"
                  >
                    Opt-out of Google Analytics
                  </a>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500 shadow-md hover:shadow-lg"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional close button */}
      <button
        onClick={handleDecline}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        aria-label="Close"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
