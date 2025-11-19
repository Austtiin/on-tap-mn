'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const eventTypes = [
  'Bar Bingo',
  'Meat Raffles',
  'Karaoke',
  'Trivia',
  'Live Music',
  'Other'
]

export function ApplicationForm() {
  const [formData, setFormData] = useState({
    venueName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'MN',
    zipCode: '',
    website: '',
    selectedEvents: [] as string[],
    otherEventType: '',
    additionalInfo: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEventTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      selectedEvents: checked
        ? [...prev.selectedEvents, value]
        : prev.selectedEvents.filter((e) => e !== value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    // Simulate API call
    try {
      // In production, replace this with your actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Here you would send the data to your backend
      console.log('Form submitted:', formData)

      setSubmitSuccess(true)
      // Reset form
      setFormData({
        venueName: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: 'MN',
        zipCode: '',
        website: '',
        selectedEvents: [],
        otherEventType: '',
        additionalInfo: '',
      })
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 8 },
          textAlign: 'center',
          border: 2,
          borderColor: 'success.main',
          bgcolor: 'success.light',
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 80, color: 'success.main', mb: 3 }}
        />
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', color: 'success.dark', mb: 2 }}
        >
          Application Received!
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: 4, maxWidth: '600px', mx: 'auto' }}
        >
          Thank you for your interest in partnering with OnTap MN! We&apos;ve received your application 
          and will be in touch within 2-3 business days to discuss getting your events listed.
        </Typography>
        <Button
          variant="contained"
          onClick={() => setSubmitSuccess(false)}
          sx={{ minWidth: 200 }}
        >
          Submit Another Application
        </Button>
      </Paper>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 4, md: 6 },
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}
      >
        Application Form
      </Typography>
      <Typography
      variant="body2"
      sx={{ color: 'text.secondary', mb: 4 }}
    >
      Fill out the form below and we&apos;ll contact you to discuss your events and how we can help promote them.
    </Typography>      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        {/* Venue Information */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3, mt: 2 }}
        >
          Venue Information
        </Typography>

        <TextField
          fullWidth
          required
          label="Venue/Business Name"
          name="venueName"
          value={formData.venueName}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
          <TextField
            required
            label="Contact Name"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
          />
          <TextField
            required
            type="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
          <TextField
            required
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 555-5555"
          />
          <TextField
            label="Website (Optional)"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
          />
        </Box>

        <TextField
          fullWidth
          required
          label="Street Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' }, gap: 3, mb: 4 }}>
          <TextField
            required
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <TextField
            required
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            disabled
          />
          <TextField
            required
            label="ZIP Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </Box>

        {/* Event Types */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2, mt: 4 }}
        >
          Event Types
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 3 }}
        >
          Select all event types you currently host or plan to host:
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormGroup>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
              {eventTypes.map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      value={type}
                      checked={formData.selectedEvents.includes(type)}
                      onChange={handleEventTypeChange}
                    />
                  }
                  label={type}
                />
              ))}
            </Box>
          </FormGroup>
        </FormControl>

        {formData.selectedEvents.includes('Other') && (
          <TextField
            fullWidth
            label="Please specify other event types"
            name="otherEventType"
            value={formData.otherEventType}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
        )}

        {/* Additional Information */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2, mt: 4 }}
        >
          Additional Information
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Tell us about your venue and events (Optional)"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Share any details about your venue, typical event schedule, special features, or what makes your events unique..."
          sx={{ mb: 4 }}
        />

        {/* Submit Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting || formData.selectedEvents.length === 0}
            sx={{
              minWidth: 250,
              py: 1.5,
              fontSize: '1.125rem',
            }}
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
          <Typography
            variant="caption"
            sx={{ display: 'block', color: 'text.secondary', mt: 2 }}
          >
            We&apos;ll review your application and contact you within 2-3 business days
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
