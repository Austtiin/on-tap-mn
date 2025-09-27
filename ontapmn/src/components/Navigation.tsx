'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from './ui'

const navigation = [
  { name: 'Bar Bingo', href: '/bar-bingo' },
  { name: 'Meat Raffles', href: '/meat-raffles' },
  { name: 'Karaoke', href: '/karaoke' },
  { name: 'Trivia', href: '/trivia' },
  { name: 'Live Music', href: '/live-music' },
  { name: 'About', href: '/about' },
  { name: 'Advertise', href: '/advertise' },
  { name: 'Contact', href: '/contact' },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Advertising Banner Space */}
      <div className="bg-secondary text-center py-2 text-sm text-accent">
        <Container>
          <div className="flex justify-center space-x-4">
            <span>🍺 Advertise with us!</span>
            <Link href="/advertise" className="underline hover:text-accent-dark">
              Learn More
            </Link>
          </div>
        </Container>
      </div>
      
      <Container>
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-white px-3 py-2 rounded-lg font-bold text-lg">
              OnTap
            </div>
            <span className="text-primary font-semibold text-lg hidden sm:block">MN</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-accent hover:text-primary font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-accent hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-accent hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </nav>
  )
}