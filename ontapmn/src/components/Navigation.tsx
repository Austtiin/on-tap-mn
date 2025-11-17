'use client'

import { useState } from 'react'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Container from '@mui/material/Container'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

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
    <AppBar position="sticky" color="inherit" elevation={1}>
      {/* Advertising Banner Space */}
      <Box sx={{ bgcolor: 'secondary.main', textAlign: 'center', py: 1 }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, alignItems: 'center' }}>
            <Typography variant="body2" component="span">
              🍺 Advertise with us!
            </Typography>
            <Link href="/advertise" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                component="span"
                sx={{
                  textDecoration: 'underline',
                  color: 'text.primary',
                  '&:hover': { color: 'primary.dark' },
                }}
              >
                Learn More
              </Typography>
            </Link>
          </Box>
        </Container>
      </Box>

      <Container>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Box
              component="img"
              src="/logos/ontapMNlogo.webp"
              alt="OnTap MN Logo"
              sx={{
                width: { xs: 56, sm: 64 },
                height: { xs: 56, sm: 64 },
                objectFit: 'contain',
              }}
            />
            <Typography
              variant="h6"
              component="span"
              sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.5rem', display: { xs: 'none', sm: 'block' } }}
            >
              OnTap MN
            </Typography>
          </Link>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 3 }}>
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Mobile menu button */}
          <IconButton
            sx={{ display: { lg: 'none' } }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        {/* Mobile Navigation Drawer */}
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          sx={{ display: { lg: 'none' } }}
        >
          <Box sx={{ width: 250, pt: 2 }}>
            <List>
              {navigation.map((item) => (
                <ListItem key={item.name} disablePadding>
                  <Link
                    href={item.href}
                    style={{ textDecoration: 'none', width: '100%' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={item.name}
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: 'text.primary',
                            fontWeight: 500,
                          },
                        }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Container>
    </AppBar>
  )
}