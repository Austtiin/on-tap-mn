'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type ConsentPreferences = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Load GA with denied consent by default (for measurement)
      loadGoogleAnalyticsWithoutConsent()
      
      // Small delay for smooth animation
      setTimeout(() => {
        setShowBanner(true)
        setTimeout(() => setIsVisible(true), 100)
      }, 1000)
    } else if (consent === 'accepted') {
      // Load with full consent
      loadGoogleAnalytics()
    } else if (consent === 'custom') {
      // Load services based on stored preferences
      const storedPrefs = localStorage.getItem('cookie-preferences')
      if (storedPrefs) {
        const prefs = JSON.parse(storedPrefs)
        if (prefs.analytics || prefs.marketing) {
          loadGoogleAnalytics()
          // Update consent signals based on preferences
          setTimeout(() => updateConsentMode(prefs), 500)
        } else {
          loadGoogleAnalyticsWithoutConsent()
        }
      }
    } else {
      // Declined - load with denied consent for measurement
      loadGoogleAnalyticsWithoutConsent()
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
      
      // Set consent mode defaults before initialization
      gtag('consent', 'default', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'personalization_storage': 'granted',
        'functionality_storage': 'granted',
        'security_storage': 'granted'
      });
      
      gtag('config', 'G-E2289NM2WH', {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
      });
    `
    document.head.appendChild(script2)
  }

  const loadGoogleAnalyticsWithoutConsent = () => {
    // Load GA with denied consent signals
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-E2289NM2WH'
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      
      // Set consent mode defaults - denied for optional cookies
      gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'personalization_storage': 'denied',
        'functionality_storage': 'granted',
        'security_storage': 'granted'
      });
      
      gtag('config', 'G-E2289NM2WH', {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
      });
    `
    document.head.appendChild(script2)
  }

  const updateConsentMode = (prefs: ConsentPreferences) => {
    // Update consent after page load if gtag is available
    if (typeof window !== 'undefined') {
      const win = window as Window & { gtag?: (...args: unknown[]) => void }
      if (win.gtag) {
        win.gtag('consent', 'update', {
          'analytics_storage': prefs.analytics ? 'granted' : 'denied',
          'ad_storage': prefs.marketing ? 'granted' : 'denied',
          'ad_user_data': prefs.marketing ? 'granted' : 'denied',
          'ad_personalization': prefs.marketing ? 'granted' : 'denied',
          'personalization_storage': prefs.marketing ? 'granted' : 'denied',
        })
      }
    }
  }

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true }
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-preferences', JSON.stringify(allAccepted))
    
    // Update consent mode to granted
    updateConsentMode(allAccepted)
    
    closeBanner()
  }

  const handleDeclineAll = () => {
    const allDeclined = { necessary: true, analytics: false, marketing: false }
    localStorage.setItem('cookie-consent', 'declined')
    localStorage.setItem('cookie-preferences', JSON.stringify(allDeclined))
    
    // Update consent mode to denied
    updateConsentMode(allDeclined)
    
    closeBanner()
  }

  const handleSaveCustom = () => {
    localStorage.setItem('cookie-consent', 'custom')
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences))
    
    // Update consent mode based on preferences
    updateConsentMode(preferences)
    
    closeBanner()
  }

  const closeBanner = () => {
    setIsVisible(false)
    setTimeout(() => {
      setShowBanner(false)
      setShowCustomize(false)
    }, 300)
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
          {!showCustomize ? (
            // Main Banner
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
                  onClick={handleDeclineAll}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500 shadow-md hover:shadow-lg"
                >
                  Decline All
                </button>
                <button
                  onClick={() => setShowCustomize(true)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-all duration-200 border border-gray-500 hover:border-gray-400 shadow-md hover:shadow-lg"
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            // Customize Panel
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-xl">Customize Cookie Preferences</h3>
                <button
                  onClick={() => setShowCustomize(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Back"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-white font-semibold">Necessary Cookies</h4>
                        <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded">Always Active</span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Essential for the website to function properly. These cannot be disabled.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-6 bg-amber-500 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">Analytics Cookies</h4>
                      <p className="text-gray-400 text-sm mb-2">
                        Help us understand how visitors interact with our website using Google Analytics.
                      </p>
                      <p className="text-gray-500 text-xs">
                        Services: Google Analytics
                      </p>
                    </div>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                      className="flex-shrink-0"
                      aria-label="Toggle Analytics Cookies"
                    >
                      <div className={`w-12 h-6 rounded-full relative transition-colors ${
                        preferences.analytics ? 'bg-amber-500' : 'bg-gray-600'
                      }`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.analytics ? 'right-1' : 'left-1'
                        }`}></div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">Marketing Cookies</h4>
                      <p className="text-gray-400 text-sm mb-2">
                        Used to display relevant advertisements and track ad performance.
                      </p>
                      <p className="text-gray-500 text-xs">
                        Services: Google AdSense
                      </p>
                    </div>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                      className="flex-shrink-0"
                      aria-label="Toggle Marketing Cookies"
                    >
                      <div className={`w-12 h-6 rounded-full relative transition-colors ${
                        preferences.marketing ? 'bg-amber-500' : 'bg-gray-600'
                      }`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.marketing ? 'right-1' : 'left-1'
                        }`}></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={handleDeclineAll}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500"
                >
                  Decline All
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Close button */}
      {!showCustomize && (
        <button
          onClick={handleDeclineAll}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
