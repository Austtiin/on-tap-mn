import Link from 'next/link'
import { Container } from './ui'

const footerLinks = {
  'Event Categories': [
    { name: 'Bar Bingo', href: '/bar-bingo' },
    { name: 'Meat Raffles', href: '/meat-raffles' },
    { name: 'Karaoke', href: '/karaoke' },
    { name: 'Trivia', href: '/trivia' },
    { name: 'Live Music', href: '/live-music' },
  ],
  'Company': [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Advertise', href: '/advertise' },
    { name: 'Submit Event', href: '/submit-event' },
  ],
  'Legal': [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ]
}

export function Footer() {
  return (
    <footer className="bg-accent text-white">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary text-white px-3 py-2 rounded-lg font-bold text-lg">
                  OnTap
                </div>
                <span className="text-white font-semibold text-lg">MN</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Find Bar Bingo, Meat Raffles, and More Across Minnesota
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.004 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.316-1.296C4.343 14.928 3.9 13.814 3.9 12.6c0-1.215.443-2.329 1.233-3.093.868-.806 2.019-1.296 3.316-1.296s2.448.49 3.316 1.296c.79.764 1.233 1.878 1.233 3.093 0 1.214-.443 2.328-1.233 3.092-.868.806-2.019 1.296-3.316 1.296zm7.718-1.296c-.868.806-2.019 1.296-3.316 1.296s-2.448-.49-3.316-1.296c-.79-.764-1.233-1.878-1.233-3.092 0-1.215.443-2.329 1.233-3.093.868-.806 2.019-1.296 3.316-1.296s2.448.49 3.316 1.296c.79.764 1.233 1.878 1.233 3.093 0 1.214-.443 2.328-1.233 3.092z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-secondary font-semibold mb-4">{title}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-600 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} OnTap MN. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0 text-center sm:text-right">
              <p className="text-gray-300 text-sm">
                Made with ❤️ in Minnesota
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Designed and built by{' '}
                <a 
                  href="https://github.com/Austtiin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-secondary-light transition-colors duration-200"
                >
                  AS
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}