import Link from 'next/link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'

const footerLinks = {
  'Event Categories': [
    { name: 'Bar Bingo', href: '/events?cats=Bar+Bingo' },
    { name: 'Meat Raffles', href: '/events?cats=Meat+Raffles' },
    { name: 'Karaoke', href: '/events?cats=Karaoke' },
    { name: 'Trivia', href: '/events?cats=Trivia' },
    { name: 'Live Music', href: '/events?cats=Live+Music' },
  ],
  'Company': [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Advertise', href: '/advertise' },
    { name: 'Submit Your Event', href: '/submit-event' },
  ],
  'Legal': [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ]
}

export function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'text.primary', 
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-10%',
          width: '50%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.02) 0%, transparent 70%)',
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' },
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '30%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(251, 191, 36, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 191, 36, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' },
        },
      }}
    >
      <Container>
        <Box sx={{ py: 6 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 4, textAlign: { xs: 'center', md: 'left' } }}>
            {/* Brand Section */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Box
                  component="img"
                  src="/logos/ontapMNlogo.webp"
                  alt="OnTap MN Logo"
                  sx={{
                    width: 56,
                    height: 56,
                    objectFit: 'contain',
                  }}
                />
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ color: 'white', fontWeight: 700, fontSize: '1.5rem' }}
                >
                  OnTap MN
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: 'grey.300', mb: 2 }}
              >
                Find Bar Bingo, Meat Raffles, and More Across Minnesota
              </Typography>

              {/* Social Media Icons */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <IconButton
                  component="a"
                  href="#"
                  sx={{
                    color: 'grey.300',
                    '&:hover': { color: 'secondary.main' },
                  }}
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href="#"
                  sx={{
                    color: 'grey.300',
                    '&:hover': { color: 'secondary.main' },
                  }}
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href="#"
                  sx={{
                    color: 'grey.300',
                    '&:hover': { color: 'secondary.main' },
                  }}
                  aria-label="Twitter"
                >
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Footer Links */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <Box key={title}>
            <Typography
              variant="h6"
              sx={{
                color: 'secondary.main',
                fontWeight: 600,
                fontSize: '1rem',
                mb: 2,
              }}
            >
              {title}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {links.map((link) => (
                <Box component="li" key={link.name} sx={{ mb: 1 }}>
                  <MuiLink
                    component={Link}
                    href={link.href}
                    sx={{
                      color: 'grey.300',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': { color: 'white' },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.name}
                  </MuiLink>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
        </Box>
      </Box>

      {/* Bottom Border */}
        <Box
          sx={{
            borderTop: 1,
            borderColor: 'grey.600',
            py: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: 'grey.300' }}>
              © {new Date().getFullYear()} OnTap MN. All rights reserved.
            </Typography>
            <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                Made with ❤️ in Minnesota
              </Typography>
              <Typography variant="caption" sx={{ color: 'grey.400' }}>
                Designed and built by{' '}
                <MuiLink
                  href="https://github.com/Austtiin"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'secondary.main',
                    textDecoration: 'none',
                    '&:hover': { color: 'secondary.light' },
                    transition: 'color 0.2s ease',
                  }}
                >
                  AS
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}