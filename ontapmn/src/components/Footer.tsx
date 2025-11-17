import Link from 'next/link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'

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
    <Box component="footer" sx={{ bgcolor: 'text.primary', color: 'white' }}>
      <Container>
        <Box sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* Brand Section */}
            <Grid item xs={12} md={6} lg={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
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
              <Box sx={{ display: 'flex', gap: 2 }}>
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
            </Grid>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <Grid item xs={12} sm={4} md={6} lg={3} key={title}>
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
              </Grid>
            ))}
          </Grid>
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