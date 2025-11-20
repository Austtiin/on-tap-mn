'use client'

import { useMemo, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Pagination from '@mui/material/Pagination'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CasinoIcon from '@mui/icons-material/Casino'
import LocalDiningIcon from '@mui/icons-material/LocalDining'
import MicIcon from '@mui/icons-material/Mic'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Navigation, Footer, AdSense } from '../../components'

type Category = 'Bar Bingo' | 'Meat Raffles' | 'Karaoke' | 'Trivia' | 'Live Music'

const CATEGORY_DEFS: Array<{ key: Category; icon: React.ElementType; color: string }> = [
  { key: 'Bar Bingo', icon: CasinoIcon, color: '#8b1538' },
  { key: 'Meat Raffles', icon: LocalDiningIcon, color: '#fbbf24' },
  { key: 'Karaoke', icon: MicIcon, color: '#9333ea' },
  { key: 'Trivia', icon: EmojiEventsIcon, color: '#2563eb' },
  { key: 'Live Music', icon: MusicNoteIcon, color: '#16a34a' },
]

type TimeKey = 'morning' | 'midday' | 'evening' | 'latenight'
const TIME_RANGES: Record<TimeKey, { label: string; start: number; end: number }> = {
  morning: { label: '9am – 11am', start: 9 * 60, end: 11 * 60 },
  midday: { label: '12pm – 3pm', start: 12 * 60, end: 15 * 60 },
  evening: { label: '6pm – 9pm', start: 18 * 60, end: 21 * 60 },
  latenight: { label: '10pm – 12am', start: 22 * 60, end: 24 * 60 },
}

type DayKey = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'
const DAYS: Array<{ key: DayKey; label: string; dow: number }> = [
  { key: 'sun', label: 'Sun', dow: 0 },
  { key: 'mon', label: 'Mon', dow: 1 },
  { key: 'tue', label: 'Tue', dow: 2 },
  { key: 'wed', label: 'Wed', dow: 3 },
  { key: 'thu', label: 'Thu', dow: 4 },
  { key: 'fri', label: 'Fri', dow: 5 },
  { key: 'sat', label: 'Sat', dow: 6 },
]

type EventItem = {
  id: number
  title: string
  venue: string
  location: string
  date: string // ISO date
  time: string // e.g. '6:00 PM'
  price: string
  category: Category
  image?: string // Optional event image
}

const SAMPLE_EVENTS: EventItem[] = [
  {
    id: 1,
    title: "New Year's Eve Meat Raffle Extravaganza",
    venue: 'The Local Tavern',
    location: 'Minneapolis, MN',
    date: '2025-12-31',
    time: '6:00 PM',
    price: '$5 per ticket',
    category: 'Meat Raffles',
  },
  {
    id: 2,
    title: 'Weekly Trivia Championship Finals',
    venue: "Murphy's Pub",
    location: 'St. Paul, MN',
    date: '2025-01-15',
    time: '7:30 PM',
    price: 'Free to play',
    category: 'Trivia',
  },
  {
    id: 3,
    title: 'Karaoke Battle Royale',
    venue: 'The Stage Bar',
    location: 'Duluth, MN',
    date: '2025-01-20',
    time: '10:30 PM',
    price: '$10 entry',
    category: 'Karaoke',
  },
  {
    id: 4,
    title: 'Thursday Night Bar Bingo',
    venue: 'River Place',
    location: 'Rochester, MN',
    date: '2025-01-09',
    time: '12:30 PM',
    price: 'Free card with drink',
    category: 'Bar Bingo',
  },
  {
    id: 5,
    title: 'Live Music: The Northstars',
    venue: 'Skyline Lounge',
    location: 'Bloomington, MN',
    date: '2025-01-17',
    time: '9:00 PM',
    price: '$15 cover',
    category: 'Live Music',
  },
]

function parseTimeToMinutes(t: string): number | null {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!m) return null
  let hh = parseInt(m[1], 10)
  const mm = parseInt(m[2], 10)
  const period = m[3].toUpperCase()
  if (period === 'AM') {
    if (hh === 12) hh = 0
  } else {
    if (hh !== 12) hh += 12
  }
  return hh * 60 + mm
}

export default function EventsPage() {
  const [cats, setCats] = useState<Category[]>([])
  const [days, setDays] = useState<DayKey[]>([])
  const [times, setTimes] = useState<TimeKey[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Load filters from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const catsParam = params.get('cats')
    const daysParam = params.get('days')
    const timesParam = params.get('times')

    if (catsParam) {
      const categoryValues = catsParam.split(',').filter((c) => 
        CATEGORY_DEFS.some((def) => def.key === c)
      ) as Category[]
      setCats(categoryValues)
    }
    if (daysParam) {
      const dayValues = daysParam.split(',').filter((d) => 
        DAYS.some((day) => day.key === d)
      ) as DayKey[]
      setDays(dayValues)
    }
    if (timesParam) {
      const timeValues = timesParam.split(',').filter((t) => 
        t in TIME_RANGES
      ) as TimeKey[]
      setTimes(timeValues)
    }
  }, [])

  // Sync selected filters to the URL for shareability
  const syncToQuery = useCallback(() => {
    const params = new URLSearchParams()
    if (cats.length) params.set('cats', cats.join(','))
    if (days.length) params.set('days', days.join(','))
    if (times.length) params.set('times', times.join(','))
    const url = params.toString() ? `/events?${params.toString()}` : '/events'
    window.history.replaceState(null, '', url)
  }, [cats, days, times])

  useEffect(() => {
    syncToQuery()
  }, [syncToQuery])

  const filtered = useMemo(() => {
    return SAMPLE_EVENTS.filter((e) => {
      // Category
      if (cats.length && !cats.includes(e.category)) return false
      // Day of week
      if (days.length) {
        const dow = new Date(e.date).getDay()
        const allowed = DAYS.filter((d) => days.includes(d.key)).map((d) => d.dow)
        if (!allowed.includes(dow)) return false
      }
      // Time range
      if (times.length) {
        const minutes = parseTimeToMinutes(e.time)
        if (minutes == null) return false
        const anyMatch = times.some((tk) => {
          const r = TIME_RANGES[tk]
          return minutes >= r.start && minutes < r.end
        })
        if (!anyMatch) return false
      }
      return true
    })
  }, [cats, days, times])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filtered.slice(startIndex, startIndex + itemsPerPage)
  }, [filtered, currentPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [cats, days, times])

  const clearAll = () => {
    setCats([])
    setDays([])
    setTimes([])
  }

  const toggleCat = (key: Category) => {
    setCats((prev) => (prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]))
  }
  const toggleDay = (key: DayKey) => {
    setDays((prev) => (prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]))
  }
  const toggleTime = (key: TimeKey) => {
    setTimes((prev) => (prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]))
  }

  return (
    <>
      <Navigation />
      <Box
        component="main"
        sx={{
          position: 'relative',
          background: 'linear-gradient(180deg, #fffbeb 0%, #ffffff 50%, #fffbeb 100%)',
          minHeight: '100vh',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '500px',
            background: 'radial-gradient(ellipse at top right, rgba(251, 191, 36, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        {/* Decorative Diagonal Lines */}
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            left: '5%',
            width: '200px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(139, 21, 56, 0.1), transparent)',
            transform: 'rotate(-45deg)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '150px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.15), transparent)',
            transform: 'rotate(45deg)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: '20%',
            width: '100px',
            height: '100px',
            border: '2px dashed rgba(139, 21, 56, 0.06)',
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: 'spin 30s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />

        <Box component="section" sx={{ py: { xs: 6, lg: 8 } }}>
          <Container>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '1.5rem', md: '1.75rem' }, 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                Explore Events
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720, mx: 'auto' }}>
                Filter by category, day, and time to find exactly what you want.
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 3 }}>
              {/* Mobile Filters Button */}
              <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', mb: 2 }}>
                <Button variant="contained" onClick={() => setFiltersOpen(true)}>
                  Filters{[...cats, ...days, ...times].length ? ` (${[...cats, ...days, ...times].length})` : ''}
                </Button>
                <Button variant="text" onClick={clearAll}>Reset</Button>
              </Box>
              {/* Sidebar */}
              <Box sx={{ width: { md: 240 }, flexShrink: 0, mb: { xs: 3, md: 0 }, display: { xs: 'none', md: 'block' } }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    position: 'sticky',
                    top: 24,
                    backdropFilter: 'blur(8px)',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.85), rgba(255,255,255,0.6))',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    border: '1px solid',
                    borderColor: 'grey.200',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Filters
                  </Typography>
                  <Accordion disableGutters sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}> 
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>Categories</Typography>
                      <Box sx={{ ml: 'auto' }}>
                        <Chip size="small" label={cats.length} color={cats.length ? 'primary' : 'default'} />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0.5 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                        {CATEGORY_DEFS.map(({ key, icon: Icon, color }) => {
                          const selected = cats.includes(key)
                          return (
                            <Chip
                              key={key}
                              size="small"
                              icon={<Icon sx={{ color: selected ? 'inherit' : color }} />}
                              label={key}
                              color={selected ? 'primary' : undefined}
                              variant={selected ? 'filled' : 'outlined'}
                              onClick={() => toggleCat(key)}
                              sx={{ fontWeight: 600 }}
                            />
                          )
                        })}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion disableGutters sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}> 
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>Days</Typography>
                      <Box sx={{ ml: 'auto' }}>
                        <Chip size="small" label={days.length} color={days.length ? 'primary' : 'default'} />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0.5 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                        {DAYS.map(({ key, label }) => {
                          const selected = days.includes(key)
                          return (
                            <Chip
                              key={key}
                              size="small"
                              label={label}
                              color={selected ? 'primary' : undefined}
                              variant={selected ? 'filled' : 'outlined'}
                              onClick={() => toggleDay(key)}
                              sx={{ minWidth: 44, justifyContent: 'center', fontWeight: 600 }}
                            />
                          )
                        })}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion disableGutters sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}> 
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>Time</Typography>
                      <Box sx={{ ml: 'auto' }}>
                        <Chip size="small" label={times.length} color={times.length ? 'primary' : 'default'} />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0.5 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                        {(Object.keys(TIME_RANGES) as TimeKey[]).map((k) => {
                          const selected = times.includes(k)
                          return (
                            <Chip
                              key={k}
                              size="small"
                              label={TIME_RANGES[k].label}
                              color={selected ? 'primary' : undefined}
                              variant={selected ? 'filled' : 'outlined'}
                              onClick={() => toggleTime(k)}
                              sx={{ fontWeight: 600 }}
                            />
                          )
                        })}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                    <Button variant="text" size="small" onClick={clearAll}>Reset</Button>
                    <Link href="/submit-event" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" size="small">Apply</Button>
                    </Link>
                  </Box>
                </Paper>
              </Box>
              {/* Results */}
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mr: 1 }}>
                    {filtered.length} event{filtered.length === 1 ? '' : 's'}
                  </Typography>
                  {[...cats, ...days, ...times].length > 0 && (
                    <>
                      {cats.map((c) => (
                        <Chip key={c} size="small" label={c} onDelete={() => toggleCat(c)} color="primary" />
                      ))}
                      {days.map((d) => (
                        <Chip key={d} size="small" label={d.toUpperCase()} onDelete={() => toggleDay(d)} color="secondary" />
                      ))}
                      {times.map((t) => (
                        <Chip key={t} size="small" label={TIME_RANGES[t].label} onDelete={() => toggleTime(t)} />
                      ))}
                      <Button variant="text" size="small" onClick={clearAll}>Clear all</Button>
                    </>
                  )}
                </Box>

                {/* AdSense - Top Banner Before Events */}
                <Card sx={{ mb: 3, boxShadow: 2, borderRadius: 3 }}>
                  <CardContent sx={{ py: 2 }}>
                    <AdSense adSlot="7178530322" adFormat="auto" fullWidthResponsive={true} />
                  </CardContent>
                </Card>

                {filtered.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                      No events at the moment
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                      Be the first to share an event with the community!
                    </Typography>
                    <Button 
                      variant="contained" 
                      size="large"
                      component={Link} 
                      href="/submit-event"
                      sx={{ fontWeight: 600 }}
                    >
                      Post Your Event for Free
                    </Button>
                  </Box>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                        gap: 3,
                      }}
                    >
                      {paginatedEvents.map((event) => (
                          <Card
                            key={event.id}
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              borderRadius: 3,
                              overflow: 'hidden',
                              position: 'relative',
                              '&::before': {
                                content: '\"\"',
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '50%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                transition: 'left 0.6s ease',
                                pointerEvents: 'none',
                              },
                              '&:hover': { 
                                boxShadow: 6, 
                                transform: 'translateY(-4px)',
                                '&::before': {
                                  left: '150%',
                                },
                              },
                              transition: 'all 0.25s ease',
                              border: '1px solid',
                              borderColor: 'grey.200'
                            }}
                          >
                            {event.image && (
                              <Box
                                component="img"
                                src={event.image}
                                alt={event.title}
                                sx={{
                                  width: '100%',
                                  height: 200,
                                  objectFit: 'cover',
                                }}
                              />
                            )}
                            <Box
                              sx={{
                                height: 6,
                                background: CATEGORY_DEFS.find(c => c.key === event.category)?.color || 'primary.main'
                              }}
                            />
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                              <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700 }}>
                                {new Date(event.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                                {event.title}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                                <LocationOnIcon sx={{ fontSize: 18 }} />
                                <Typography variant="body2" component="span" sx={{ fontWeight: 500 }}>
                                  {event.venue}
                                </Typography>
                                <Typography variant="caption" component="span">{event.location}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                                <AccessTimeIcon sx={{ fontSize: 18 }} />
                                <Typography variant="body2" component="span">
                                  {event.time}
                                </Typography>
                              </Box>
                              <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Chip
                                  label={event.category}
                                  size="small"
                                  sx={{ bgcolor: 'secondary.main', color: 'text.primary', fontWeight: 600 }}
                                />
                                <Button size="small" variant="outlined" component={Link} href={`/events/${event.id}`}>
                                  View details
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                      ))}
                    </Box>

                    {/* Pagination - Show if more than 20 events */}
                    {filtered.length > itemsPerPage && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination 
                          count={totalPages} 
                          page={currentPage} 
                          onChange={(_, page) => setCurrentPage(page)}
                          color="primary"
                          size="large"
                          showFirstButton
                          showLastButton
                        />
                      </Box>
                    )}
                  </>
                )}

                {/* AdSense - After Events List */}
                {filtered.length > 0 && (
                  <Card sx={{ mt: 3, boxShadow: 2, borderRadius: 3 }}>
                    <CardContent sx={{ py: 2 }}>
                      <AdSense adSlot="7178530322" adFormat="auto" fullWidthResponsive={true} />
                    </CardContent>
                  </Card>
                )}
              </Box>
            </Box>
            
          </Container>
        </Box>
      </Box>
      {/* Mobile Filters Drawer */}
      <Box component="aside" sx={{ display: { md: 'none' } }}>
        <Paper
          elevation={0}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '85vw',
            maxWidth: 360,
            transform: `translateX(${filtersOpen ? '0' : '-100%'})`,
            transition: 'transform 250ms ease',
            zIndex: (t) => t.zIndex.drawer,
            borderRight: '1px solid',
            borderColor: 'grey.200',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.92))',
          }}
          role="dialog"
          aria-label="Filters"
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Filters</Typography>
            <Button variant="text" onClick={() => setFiltersOpen(false)}>Close</Button>
          </Box>
          <Box sx={{ p: 2, pt: 0 }}>
            {/* Reuse the same controls */}
            <Accordion disableGutters sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}> 
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Categories</Typography>
                <Box sx={{ ml: 'auto' }}>
                  <Chip size="small" label={cats.length} color={cats.length ? 'primary' : 'default'} />
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0.5 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {CATEGORY_DEFS.map(({ key, icon: Icon, color }) => {
                    const selected = cats.includes(key)
                    return (
                      <Chip
                        key={key}
                        size="small"
                        icon={<Icon sx={{ color: selected ? 'inherit' : color }} />}
                        label={key}
                        color={selected ? 'primary' : undefined}
                        variant={selected ? 'filled' : 'outlined'}
                        onClick={() => toggleCat(key)}
                        sx={{ fontWeight: 600 }}
                      />
                    )
                  })}
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}> 
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Days</Typography>
                <Box sx={{ ml: 'auto' }}>
                  <Chip size="small" label={days.length} color={days.length ? 'primary' : 'default'} />
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0.5 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {DAYS.map(({ key, label }) => {
                    const selected = days.includes(key)
                    return (
                      <Chip
                        key={key}
                        size="small"
                        label={label}
                        color={selected ? 'primary' : undefined}
                        variant={selected ? 'filled' : 'outlined'}
                        onClick={() => toggleDay(key)}
                        sx={{ minWidth: 44, justifyContent: 'center', fontWeight: 600 }}
                      />
                    )
                  })}
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}> 
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Time</Typography>
                <Box sx={{ ml: 'auto' }}>
                  <Chip size="small" label={times.length} color={times.length ? 'primary' : 'default'} />
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0.5 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {(Object.keys(TIME_RANGES) as TimeKey[]).map((k) => {
                    const selected = times.includes(k)
                    return (
                      <Chip
                        key={k}
                        size="small"
                        label={TIME_RANGES[k].label}
                        color={selected ? 'primary' : undefined}
                        variant={selected ? 'filled' : 'outlined'}
                        onClick={() => toggleTime(k)}
                        sx={{ fontWeight: 600 }}
                      />
                    )
                  })}
                </Box>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', mt: 1 }}>
              <Button variant="text" size="small" onClick={clearAll}>Reset</Button>
              <Button variant="contained" size="small" onClick={() => setFiltersOpen(false)}>Done</Button>
            </Box>
          </Box>
        </Paper>
        {/* Backdrop */}
        <Box
          onClick={() => setFiltersOpen(false)}
          sx={{
            display: filtersOpen ? 'block' : 'none',
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.25)',
            zIndex: (t) => t.zIndex.drawer - 1,
          }}
        />
      </Box>
      <Footer />
    </>
  )
}
