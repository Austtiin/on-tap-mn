'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import { 
  FormInput, 
  FormTextarea, 
  FormSelect, 
  FormCheckbox
} from './FormComponents'

interface EventFormData {
  submitName: string
  submitEmail: string
  venueName: string
  venueStreet: string
  venueCity: string
  venueState: string
  venueZip: string
  title: string
  category: string
  descriptionShort: string
  descriptionLong: string
  isRecurring: boolean
  recurrencePattern: string
  eventDays: string[]
  eventTime: string
  eventDate: string
  endTime: string
  bannerImage: File | null
  marketingImage: File | null
}

interface FormErrors {
  submitName?: string
  submitEmail?: string
  venueName?: string
  venueStreet?: string
  venueCity?: string
  venueState?: string
  venueZip?: string
  title?: string
  category?: string
  eventTime?: string
  eventDate?: string
  eventDays?: string
  bannerImage?: string
  marketingImage?: string
}

interface TouchedFields {
  [key: string]: boolean
}

const initialFormData: EventFormData = {
  submitName: '',
  submitEmail: '',
  venueName: '',
  venueStreet: '',
  venueCity: '',
  venueState: 'Minnesota',
  venueZip: '',
  title: '',
  category: '',
  descriptionShort: '',
  descriptionLong: '',
  isRecurring: false,
  recurrencePattern: 'weekly',
  eventDays: [],
  eventTime: '',
  eventDate: '',
  endTime: '',
  bannerImage: null,
  marketingImage: null,
}

const categories = [
  { value: 'Bar Bingo', label: 'Bar Bingo' },
  { value: 'Meat Raffles', label: 'Meat Raffles' },
  { value: 'Karaoke', label: 'Karaoke' },
  { value: 'Trivia', label: 'Trivia' },
  { value: 'Live Music', label: 'Live Music' },
]

const recurrencePatterns = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Every Other Week' },
  { value: 'monthly', label: 'Monthly' },
]

const daysOfWeek = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
]

const usStates = [
  { value: 'Minnesota', label: 'Minnesota' },
  { value: 'Wisconsin', label: 'Wisconsin' },
  { value: 'Iowa', label: 'Iowa' },
  { value: 'North Dakota', label: 'North Dakota' },
  { value: 'South Dakota', label: 'South Dakota' },
]

export function EventSubmissionForm() {
  const [formData, setFormData] = useState<EventFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({})
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const validateField = (name: string, value: string | string[]): string | undefined => {
    switch (name) {
      case 'submitName':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          return 'Your name must be at least 2 characters'
        }
        break
      case 'submitEmail':
        if (!value || typeof value !== 'string' || value.trim() === '') {
          return 'Email address is required'
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address'
        }
        break
      case 'venueName':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          return 'Venue name is required'
        }
        break
      case 'venueStreet':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Street address is required'
        }
        break
      case 'venueCity':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'City is required'
        }
        break
      case 'venueZip':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'ZIP code is required'
        }
        if (typeof value === 'string' && !/^\d{5}(-\d{4})?$/.test(value.trim())) {
          return 'Please enter a valid ZIP code'
        }
        break
      case 'title':
        if (!value || (typeof value === 'string' && value.trim().length < 3)) {
          return 'Event title must be at least 3 characters'
        }
        break
      case 'category':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Please select an event category'
        }
        break
      case 'eventTime':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Event time is required'
        }
        break
      case 'eventDate':
        if (!formData.isRecurring && (!value || (typeof value === 'string' && value.trim() === ''))) {
          return 'Event date is required'
        }
        break
      case 'eventDays':
        if (formData.isRecurring && Array.isArray(value) && value.length === 0) {
          return 'Please select at least one day'
        }
        break
    }
    return undefined
  }

  const handleInputChange = (name: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (touchedFields[name]) {
      const error = validateField(name, value as string | string[])
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (name: string) => {
    setTouchedFields(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name as keyof EventFormData] as string | string[])
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const toggleDay = (day: string) => {
    const newDays = formData.eventDays.includes(day)
      ? formData.eventDays.filter(d => d !== day)
      : [...formData.eventDays, day]
    handleInputChange('eventDays', newDays)
    setTouchedFields(prev => ({ ...prev, eventDays: true }))
  }

  const handleImageChange = (name: 'bannerImage' | 'marketingImage', file: File | null) => {
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, [name]: 'Please upload a valid image file (JPG, PNG, or WebP)' }))
        return
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [name]: 'Image must be less than 5MB' }))
        return
      }
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
    setFormData(prev => ({ ...prev, [name]: file }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    const requiredFields: (keyof FormErrors)[] = [
      'submitName',
      'submitEmail',
      'venueName',
      'venueStreet',
      'venueCity',
      'venueZip',
      'title',
      'category',
      'eventTime',
    ]

    if (!formData.isRecurring) {
      requiredFields.push('eventDate')
    } else {
      requiredFields.push('eventDays')
    }

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof EventFormData] as string | string[])
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    
    const allTouched: TouchedFields = {}
    requiredFields.forEach(field => {
      allTouched[field] = true
    })
    setTouchedFields(allTouched)

    return isValid
  }

  const isFormValid = (): boolean => {
    const baseValid = (
      formData.submitName.trim().length >= 2 &&
      formData.submitEmail.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.submitEmail) &&
      formData.venueName.trim() !== '' &&
      formData.venueStreet.trim() !== '' &&
      formData.venueCity.trim() !== '' &&
      formData.venueZip.trim() !== '' &&
      formData.title.trim() !== '' &&
      formData.category.trim() !== '' &&
      formData.eventTime.trim() !== ''
    )

    if (formData.isRecurring) {
      return baseValid && formData.eventDays.length > 0
    } else {
      return baseValid && formData.eventDate.trim() !== ''
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Don't scroll or set error, just let field validation show
      const firstErrorElement = document.querySelector('[data-error="true"]')
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    // Clear any previous errors
    setError(null)
    setShowConfirmDialog(true)
  }

  const handleConfirmSubmit = async () => {
    setShowConfirmDialog(false)
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Combine address parts
      const fullAddress = `${formData.venueStreet}, ${formData.venueCity}, ${formData.venueState} ${formData.venueZip}`

      // Combine date and time for startDateTime
      let startDateTime: string | null = null
      if (formData.isRecurring) {
        // For recurring, use first selected day of next week with the time
        const today = new Date()
        const firstDay = formData.eventDays[0]
        const dayIndex = daysOfWeek.findIndex(d => d.value === firstDay)
        const daysUntilEvent = (dayIndex + 1 - today.getDay() + 7) % 7 || 7
        const eventDate = new Date(today)
        eventDate.setDate(today.getDate() + daysUntilEvent)
        const [hours, minutes] = formData.eventTime.split(':')
        eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
        startDateTime = eventDate.toISOString()
      } else {
        const [hours, minutes] = formData.eventTime.split(':')
        const eventDateTime = new Date(formData.eventDate)
        eventDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
        startDateTime = eventDateTime.toISOString()
      }

      // Combine recurrence pattern and days
      let recurrenceJson: string | null = null
      if (formData.isRecurring) {
        recurrenceJson = JSON.stringify({
          pattern: formData.recurrencePattern,
          days: formData.eventDays,
          time: formData.eventTime
        })
      }

      const submission = {
        submitName: formData.submitName,
        submitEmail: formData.submitEmail,
        venueId: null,
        venueName: formData.venueName,
        venueAddress: fullAddress,
        title: formData.title,
        category: formData.category,
        descriptionShort: formData.descriptionShort || null,
        descriptionLong: formData.descriptionLong || null,
        isRecurring: formData.isRecurring,
        recurrenceJson: recurrenceJson,
        startDateTime: startDateTime,
        endDateTime: formData.endTime && !formData.isRecurring ? 
          (() => {
            const [hours, minutes] = formData.endTime.split(':')
            const endDateTime = new Date(formData.eventDate)
            endDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
            return endDateTime.toISOString()
          })() : null,
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api'
      
      const response = await fetch(`${apiUrl}/SubmitEvent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      })

      if (!response.ok) {
        let errorMessage = 'Failed to submit event. Please try again.'
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          // If response is not JSON, use status text
          errorMessage = `Server error (${response.status}): ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()
      
      // If submission was successful, upload images if provided
      if (result.success && result.submissionId) {
        const submissionId = result.submissionId
        
        // Upload banner image if provided
        if (formData.bannerImage) {
          try {
            const bannerFormData = new FormData()
            bannerFormData.append('file', formData.bannerImage)
            bannerFormData.append('submissionId', submissionId)
            bannerFormData.append('imageType', 'banner')
            
            const bannerResponse = await fetch(`${apiUrl}/UploadImage`, {
              method: 'POST',
              body: bannerFormData,
            })
            
            if (!bannerResponse.ok) {
              console.error('Banner image upload failed, but submission succeeded')
            }
          } catch (imgErr) {
            console.error('Banner image upload error:', imgErr)
          }
        }
        
        // Upload marketing image if provided
        if (formData.marketingImage) {
          try {
            const marketingFormData = new FormData()
            marketingFormData.append('file', formData.marketingImage)
            marketingFormData.append('submissionId', submissionId)
            marketingFormData.append('imageType', 'marketing')
            
            const marketingResponse = await fetch(`${apiUrl}/UploadImage`, {
              method: 'POST',
              body: marketingFormData,
            })
            
            if (!marketingResponse.ok) {
              console.error('Marketing image upload failed, but submission succeeded')
            }
          } catch (imgErr) {
            console.error('Marketing image upload error:', imgErr)
          }
        }
      }
      
      // Show success dialog
      setSuccess(true)
      setFormData(initialFormData)
      setErrors({})
      setTouchedFields({})
      
    } catch (err) {
      let errorMessage = 'Failed to submit event. Please try again.'
      
      if (err instanceof TypeError && err.message.includes('fetch')) {
        errorMessage = 'Network error: Unable to reach the server. Please check your internet connection and try again.'
      } else if (err instanceof Error) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      console.error('Submission error:', err)
      
      // Show error in dialog instead of scrolling
      setShowConfirmDialog(false)
    } finally {
      setLoading(false)
    }
  }

  const InfoTooltip = ({ text }: { text: string }) => (
    <Tooltip title={text} arrow placement="top">
      <IconButton size="small" sx={{ ml: 0.5, p: 0.25 }}>
        <InfoOutlinedIcon sx={{ fontSize: 18, color: 'action.active' }} />
      </IconButton>
    </Tooltip>
  )

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900, mx: 'auto' }}>
      {/* Important Notice */}
      <Alert severity="warning" sx={{ mb: 4 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          📋 When to Submit Separately
        </Typography>
        <Typography variant="body2">
          <strong>DIFFERENT times = Submit separately!</strong>
          <br />
          • Karaoke Monday 4 PM + Karaoke Friday 6 PM = <strong>2 separate submissions</strong>
          <br />
          • Trivia Wednesday 7 PM + Different trivia Thursday 8 PM = <strong>2 separate submissions</strong>
          <br />
          <br />
          <strong>SAME time, multiple days = 1 submission!</strong>
          <br />
          • Trivia every Monday, Wednesday, Friday at 7 PM = <strong>1 submission</strong> (check all 3 days)
        </Typography>
      </Alert>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Event submitted successfully! You&apos;ll receive a confirmation email shortly.
        </Alert>
      )}

      {/* Contact Information */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
          Your Contact Information
          <InfoTooltip text="We'll send confirmation and approval updates to this email" />
        </Typography>
        <FormInput
          label="Your Name"
          name="submitName"
          value={formData.submitName}
          onChange={(value) => handleInputChange('submitName', value)}
          onBlur={() => handleBlur('submitName')}
          error={touchedFields.submitName ? errors.submitName : undefined}
          placeholder="John Doe"
          required
        />
        <FormInput
          label="Email Address"
          name="submitEmail"
          type="email"
          value={formData.submitEmail}
          onChange={(value) => handleInputChange('submitEmail', value)}
          onBlur={() => handleBlur('submitEmail')}
          error={touchedFields.submitEmail ? errors.submitEmail : undefined}
          placeholder="john@example.com"
          required
          helperText={!errors.submitEmail ? "We'll send confirmation and updates here" : undefined}
        />
      </Box>

      {/* Venue Information */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
          Venue Information
          <InfoTooltip text="Where the event takes place" />
        </Typography>
        <FormInput
          label="Venue Name"
          name="venueName"
          value={formData.venueName}
          onChange={(value) => handleInputChange('venueName', value)}
          onBlur={() => handleBlur('venueName')}
          error={touchedFields.venueName ? errors.venueName : undefined}
          placeholder="O'Malley's Pub"
          required
        />
        <FormInput
          label="Street Address"
          name="venueStreet"
          value={formData.venueStreet}
          onChange={(value) => handleInputChange('venueStreet', value)}
          onBlur={() => handleBlur('venueStreet')}
          error={touchedFields.venueStreet ? errors.venueStreet : undefined}
          placeholder="123 Main Street"
          required
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' }, gap: 2 }}>
          <FormInput
            label="City"
            name="venueCity"
            value={formData.venueCity}
            onChange={(value) => handleInputChange('venueCity', value)}
            onBlur={() => handleBlur('venueCity')}
            error={touchedFields.venueCity ? errors.venueCity : undefined}
            placeholder="Minneapolis"
            required
          />
          <FormSelect
            label="State"
            name="venueState"
            value={formData.venueState}
            onChange={(value) => handleInputChange('venueState', value)}
            options={usStates}
            required
          />
          <FormInput
            label="ZIP Code"
            name="venueZip"
            value={formData.venueZip}
            onChange={(value) => handleInputChange('venueZip', value)}
            onBlur={() => handleBlur('venueZip')}
            error={touchedFields.venueZip ? errors.venueZip : undefined}
            placeholder="55401"
            required
          />
        </Box>
      </Box>

      {/* Event Details */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Event Details
        </Typography>
        <FormInput
          label="Event Title"
          name="title"
          value={formData.title}
          onChange={(value) => handleInputChange('title', value)}
          onBlur={() => handleBlur('title')}
          error={touchedFields.title ? errors.title : undefined}
          placeholder="e.g., Wednesday Night Trivia, Happy Hour Karaoke, Weekend Meat Raffle"
          required
        />
        <FormSelect
          label="Event Category"
          name="category"
          value={formData.category}
          onChange={(value) => {
            handleInputChange('category', value)
            setTouchedFields(prev => ({ ...prev, category: true }))
            if (value) {
              setErrors(prev => ({ ...prev, category: undefined }))
            }
          }}
          error={touchedFields.category ? errors.category : undefined}
          options={categories}
          required
        />
        <FormTextarea
          label="Short Description (Optional)"
          name="descriptionShort"
          value={formData.descriptionShort}
          onChange={(value) => handleInputChange('descriptionShort', value.substring(0, 500))}
          rows={3}
          placeholder="Brief description that will appear in event listings..."
          helperText={`${formData.descriptionShort.length}/500 characters - Quick summary for browsing`}
        />
        <FormTextarea
          label="Full Description (Optional)"
          name="descriptionLong"
          value={formData.descriptionLong}
          onChange={(value) => handleInputChange('descriptionLong', value)}
          rows={6}
          placeholder="Detailed information: prizes, rules, host details, special notes, etc..."
        />
      </Box>

      {/* Event Images */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
          Event Images (Optional)
          <InfoTooltip text="Add eye-catching images to make your event stand out" />
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            📸 Images help attract more attendees! Upload high-quality photos (JPG, PNG, or WebP, max 5MB each).
          </Typography>
        </Alert>

        {/* Banner Image */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Banner Image
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Large promotional image (recommended: 1200x630px)
          </Typography>
          <Button
            variant="outlined"
            component="label"
            sx={{ mb: 1 }}
          >
            Choose Banner Image
            <input
              type="file"
              hidden
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0] || null
                handleImageChange('bannerImage', file)
              }}
            />
          </Button>
          {formData.bannerImage && (
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="success.main">
                ✓ {formData.bannerImage.name}
              </Typography>
              <Button
                size="small"
                onClick={() => handleImageChange('bannerImage', null)}
              >
                Remove
              </Button>
            </Box>
          )}
          {errors.bannerImage && (
            <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
              {errors.bannerImage}
            </Typography>
          )}
        </Box>

        {/* Marketing Image */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Marketing Image
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Square promotional image (recommended: 800x800px)
          </Typography>
          <Button
            variant="outlined"
            component="label"
            sx={{ mb: 1 }}
          >
            Choose Marketing Image
            <input
              type="file"
              hidden
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0] || null
                handleImageChange('marketingImage', file)
              }}
            />
          </Button>
          {formData.marketingImage && (
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="success.main">
                ✓ {formData.marketingImage.name}
              </Typography>
              <Button
                size="small"
                onClick={() => handleImageChange('marketingImage', null)}
              >
                Remove
              </Button>
            </Box>
          )}
          {errors.marketingImage && (
            <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
              {errors.marketingImage}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Schedule Information */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          When Does This Event Happen?
        </Typography>
        
        <FormCheckbox
          label="This event repeats regularly"
          checked={formData.isRecurring}
          onChange={(checked) => {
            handleInputChange('isRecurring', checked)
            if (!checked) {
              handleInputChange('eventDays', [])
            }
          }}
        />
        
        {formData.isRecurring ? (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>
              ✨ Select all days this event happens at the SAME time
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Example: Trivia every Mon, Wed, Fri at 7 PM → Check all 3 days + enter 7:00 PM
            </Typography>
            
            <FormControl component="fieldset" error={Boolean(touchedFields.eventDays && errors.eventDays)} sx={{ mb: 2, width: '100%' }}>
              <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
                Which days? *
              </FormLabel>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 0.5 }}>
                {daysOfWeek.map((day) => (
                  <FormControlLabel
                    key={day.value}
                    control={
                      <Checkbox
                        checked={formData.eventDays.includes(day.value)}
                        onChange={() => toggleDay(day.value)}
                      />
                    }
                    label={day.label}
                  />
                ))}
              </Box>
              {touchedFields.eventDays && errors.eventDays && (
                <FormHelperText>{errors.eventDays}</FormHelperText>
              )}
            </FormControl>

            <FormSelect
              label="How Often?"
              name="recurrencePattern"
              value={formData.recurrencePattern}
              onChange={(value) => handleInputChange('recurrencePattern', value)}
              options={recurrencePatterns}
              required
            />

            <FormInput
              label="What Time?"
              name="eventTime"
              type="time"
              value={formData.eventTime}
              onChange={(value) => handleInputChange('eventTime', value)}
              onBlur={() => handleBlur('eventTime')}
              error={touchedFields.eventTime ? errors.eventTime : undefined}
              placeholder="19:00"
              required
              helperText="Select the time this event starts"
            />
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                For one-time or occasional events (1-2 times per year)
              </Typography>
            </Alert>
            
            <FormInput
              label="Event Date"
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={(value) => handleInputChange('eventDate', value)}
              onBlur={() => handleBlur('eventDate')}
              error={touchedFields.eventDate ? errors.eventDate : undefined}
              required
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <FormInput
                label="Start Time"
                name="eventTime"
                type="time"
                value={formData.eventTime}
                onChange={(value) => handleInputChange('eventTime', value)}
                onBlur={() => handleBlur('eventTime')}
                error={touchedFields.eventTime ? errors.eventTime : undefined}
                required
              />
              <FormInput
                label="End Time (Optional)"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={(value) => handleInputChange('endTime', value)}
                helperText="When does it end?"
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* Submit Button */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading || !isFormValid()}
          sx={{
            minWidth: 250,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 700,
            opacity: !isFormValid() ? 0.6 : 1,
            cursor: !isFormValid() ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Review & Submit'}
        </Button>
        {!isFormValid() && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Please fill in all required fields
          </Typography>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog 
        open={showConfirmDialog} 
        onClose={() => setShowConfirmDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
          Confirm Event Submission
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please review your event details:
          </Typography>
          
          <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Name:</strong> {formData.submitName}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {formData.submitEmail}
            </Typography>
          </Box>

          <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Venue
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Name:</strong> {formData.venueName}
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> {formData.venueStreet}, {formData.venueCity}, {formData.venueState} {formData.venueZip}
            </Typography>
          </Box>

          <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Event
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Title:</strong> {formData.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Category:</strong> {formData.category}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Time:</strong> {formData.eventTime}
            </Typography>
            {formData.isRecurring ? (
              <>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Days:</strong> {formData.eventDays.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ')}
                </Typography>
                <Typography variant="body2">
                  <strong>Frequency:</strong> {recurrencePatterns.find(p => p.value === formData.recurrencePattern)?.label}
                </Typography>
              </>
            ) : (
              <Typography variant="body2">
                <strong>Date:</strong> {new Date(formData.eventDate).toLocaleDateString()}
              </Typography>
            )}
          </Box>

          <Alert severity="info" sx={{ mt: 2 }}>
            You&apos;ll receive a confirmation email at <strong>{formData.submitEmail}</strong> once submitted.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setShowConfirmDialog(false)}
            variant="outlined"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmSubmit}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
          >
            {loading ? 'Submitting...' : 'Confirm & Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog 
        open={Boolean(error)} 
        onClose={() => setError(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Box 
              sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                bgcolor: 'error.main', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <Typography variant="h2" sx={{ color: 'white' }}>✕</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'error.main' }}>
              Submission Failed
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {error}
            </Typography>
          </Box>

          <Alert severity="info" sx={{ textAlign: 'left' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              What to do next:
            </Typography>
            <Typography variant="body2">
              • Check your information and try submitting again
              <br />
              • Make sure you have a stable internet connection
              <br />
              • If the problem persists, please contact support
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center' }}>
          <Button 
            onClick={() => setError(null)}
            variant="contained"
            size="large"
            sx={{ minWidth: 200 }}
          >
            Try Again
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Confirmation Dialog */}
      <Dialog 
        open={success} 
        onClose={() => setSuccess(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Box 
              sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                bgcolor: 'success.main', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <Typography variant="h2" sx={{ color: 'white' }}>✓</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Event Submitted Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Thank you for submitting your event. We&apos;ve received your submission and it&apos;s now pending review.
            </Typography>
          </Box>

          <Alert severity="info" sx={{ textAlign: 'left', mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              📧 Check Your Email
            </Typography>
            <Typography variant="body2">
              A confirmation email has been sent to <strong>{formData.submitEmail || 'your email address'}</strong>. 
              Please check your inbox (and spam folder) to confirm this listing.
            </Typography>
          </Alert>

          <Alert severity="success" sx={{ textAlign: 'left' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              What&apos;s Next?
            </Typography>
            <Typography variant="body2">
              • Our team will review your submission within 24-48 hours
              <br />
              • You&apos;ll receive an email once your event is approved
              <br />
              • Your event will then appear on our website for everyone to see!
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center' }}>
          <Button 
            onClick={() => setSuccess(false)}
            variant="contained"
            size="large"
            sx={{ minWidth: 200 }}
          >
            Got It!
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
