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
  eventTime: string
  eventDate: string
  endDateTime: string
}

interface FormErrors {
  submitName?: string
  submitEmail?: string
  venueName?: string
  venueAddress?: string
  title?: string
  category?: string
  startDateTime?: string
}

interface TouchedFields {
  submitName?: boolean
  submitEmail?: boolean
  venueName?: boolean
  venueAddress?: boolean
  title?: boolean
  category?: boolean
  startDateTime?: boolean
}

const initialFormData: EventFormData = {
  submitName: '',
  submitEmail: '',
  venueName: '',
  venueAddress: '',
  title: '',
  category: '',
  descriptionShort: '',
  descriptionLong: '',
  isRecurring: false,
  recurrencePattern: 'weekly',
  startDateTime: '',
  endDateTime: '',
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
  { value: 'biweekly', label: 'Bi-Weekly' },
  { value: 'monthly', label: 'Monthly' },
]

export function EventSubmissionForm() {
  const [formData, setFormData] = useState<EventFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({})
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const validateField = (name: string, value: string | boolean): string | undefined => {
    switch (name) {
      case 'submitName':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Your name is required'
        }
        break
      case 'submitEmail':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Email address is required'
        }
        if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address'
        }
        break
      case 'venueName':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Venue name is required'
        }
        break
      case 'venueAddress':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Venue address is required'
        }
        break
      case 'title':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Event title is required'
        }
        break
      case 'category':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Please select an event category'
        }
        break
      case 'startDateTime':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Event start date and time is required'
        }
        break
    }
    return undefined
  }

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (touchedFields[name as keyof TouchedFields]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (name: string) => {
    setTouchedFields(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name as keyof EventFormData])
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    // Validate all required fields
    const requiredFields: (keyof FormErrors)[] = [
      'submitName',
      'submitEmail',
      'venueName',
      'venueAddress',
      'title',
      'category',
      'startDateTime'
    ]

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof EventFormData])
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    
    // Mark all fields as touched
    const allTouched: TouchedFields = {}
    requiredFields.forEach(field => {
      allTouched[field] = true
    })
    setTouchedFields(allTouched)

    return isValid
  }

  const isFormValid = (): boolean => {
    return (
      formData.submitName.trim() !== '' &&
      formData.submitEmail.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.submitEmail) &&
      formData.venueName.trim() !== '' &&
      formData.venueAddress.trim() !== '' &&
      formData.title.trim() !== '' &&
      formData.category.trim() !== '' &&
      formData.startDateTime.trim() !== ''
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before showing confirmation
    if (!validateForm()) {
      setError('Please fill in all required fields correctly')
      // Scroll to first error
      const firstErrorElement = document.querySelector('[data-error="true"]')
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    // Show confirmation dialog
    setShowConfirmDialog(true)
  }

  const handleConfirmSubmit = async () => {
    setShowConfirmDialog(false)
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Prepare submission data
      const submission = {
        submitName: formData.submitName || null,
        submitEmail: formData.submitEmail,
        venueId: null,
        venueName: formData.venueName,
        venueAddress: formData.venueAddress,
        title: formData.title,
        category: formData.category,
        descriptionShort: formData.descriptionShort || null,
        descriptionLong: formData.descriptionLong || null,
        isRecurring: formData.isRecurring,
        recurrenceJson: formData.isRecurring ? JSON.stringify({ pattern: formData.recurrencePattern }) : null,
        startDateTime: formData.startDateTime ? new Date(formData.startDateTime).toISOString() : null,
        endDateTime: formData.endDateTime ? new Date(formData.endDateTime).toISOString() : null,
      }

      // TODO: Update this URL to your actual Azure Function URL
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7071/api/SubmitEvent'
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      })

      if (!response.ok) {
        throw new Error('Failed to submit event')
      }

      const result = await response.json()
      setSuccess(true)
      setFormData(initialFormData)
      setErrors({})
      setTouchedFields({})
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError('Failed to submit event. Please try again.')
      console.error('Submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto' }}>
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Event submitted successfully! You&apos;ll receive a confirmation email shortly.
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Contact Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Contact Information
        </Typography>
        <FormInput
          label="Your Name"
          name="submitName"
          value={formData.submitName}
          onChange={(value) => handleInputChange('submitName', value)}
          onBlur={() => handleBlur('submitName')}
          error={touchedFields.submitName ? errors.submitName : undefined}
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
          required
          helperText={!errors.submitEmail ? "We'll send confirmation and updates to this email" : undefined}
        />
      </Box>

      {/* Venue Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Venue Information
        </Typography>
        <FormInput
          label="Venue Name"
          name="venueName"
          value={formData.venueName}
          onChange={(value) => handleInputChange('venueName', value)}
          onBlur={() => handleBlur('venueName')}
          error={touchedFields.venueName ? errors.venueName : undefined}
          required
        />
        <FormInput
          label="Venue Address"
          name="venueAddress"
          value={formData.venueAddress}
          onChange={(value) => handleInputChange('venueAddress', value)}
          onBlur={() => handleBlur('venueAddress')}
          error={touchedFields.venueAddress ? errors.venueAddress : undefined}
          required
          helperText={!errors.venueAddress ? "Full address including city, state, and ZIP code" : undefined}
        />
      </Box>

      {/* Event Details */}
      <Box sx={{ mb: 4 }}>
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
          required
        />
        <FormSelect
          label="Event Category"
          name="category"
          value={formData.category}
          onChange={(value) => {
            handleInputChange('category', value)
            handleBlur('category')
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
          helperText={`${formData.descriptionShort.length}/500 characters`}
        />
        <FormTextarea
          label="Full Description (Optional)"
          name="descriptionLong"
          value={formData.descriptionLong}
          onChange={(value) => handleInputChange('descriptionLong', value)}
          rows={6}
        />
      </Box>

      {/* Schedule Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Schedule
        </Typography>
        <FormCheckbox
          label="This is a recurring event"
          checked={formData.isRecurring}
          onChange={(checked) => {
            handleInputChange('isRecurring', checked)
            // Clear end date when switching to recurring
            if (checked) {
              handleInputChange('endDateTime', '')
            }
          }}
        />
        
        {formData.isRecurring && (
          <>
            <Box sx={{ ml: 4, mb: 2 }}>
              <FormSelect
                label="Recurrence Pattern"
                name="recurrencePattern"
                value={formData.recurrencePattern}
                onChange={(value) => handleInputChange('recurrencePattern', value)}
                options={recurrencePatterns}
                required
              />
            </Box>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>How recurring events work:</strong> Choose when your event starts (date & time), then select how often it repeats. 
                For example, if your trivia night is every Wednesday at 7 PM, set the start date to any Wednesday at 7:00 PM, 
                and select "Weekly" as the pattern. We&apos;ll automatically create all future occurrences at that same time.
                <br /><br />
                Your event will remain active until you choose to stop it. We&apos;ll send you periodic reminder emails to renew or let it expire naturally.
              </Typography>
            </Alert>
          </>
        )}

        <FormInput
          label={formData.isRecurring ? "Event Start Date & Time" : "Event Date & Time"}
          name="startDateTime"
          type="datetime-local"
          value={formData.startDateTime}
          onChange={(value) => handleInputChange('startDateTime', value)}
          onBlur={() => handleBlur('startDateTime')}
          error={touchedFields.startDateTime ? errors.startDateTime : undefined}
          required
          helperText={!errors.startDateTime ? 
            formData.isRecurring 
              ? "Select the date and time for this event (e.g., first Wednesday at 7:00 PM). We'll repeat it based on your pattern."
              : "Select the date and time when this event starts"
            : undefined}
        />
        
        {!formData.isRecurring && (
          <>
            <FormInput
              label="Event End Date & Time (Optional)"
              name="endDateTime"
              type="datetime-local"
              value={formData.endDateTime}
              onChange={(value) => handleInputChange('endDateTime', value)}
              helperText="Only needed for one-time or limited occurrence events"
            />
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>For one-time events:</strong> The start date & time is when your event begins. 
                The end date & time is optional - only provide it if you want to specify exactly when the event concludes. 
                For events happening more than once or twice a year, consider using the recurring option instead.
              </Typography>
            </Alert>
          </>
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
            minWidth: 200,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 700,
            opacity: !isFormValid() ? 0.6 : 1,
            cursor: !isFormValid() ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Event'}
        </Button>
        {!isFormValid() && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Please fill in all required fields to submit
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
            Please review your event details before submitting:
          </Typography>
          
          <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Contact Information
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
              Venue Information
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Venue:</strong> {formData.venueName}
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> {formData.venueAddress}
            </Typography>
          </Box>

          <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Event Details
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Title:</strong> {formData.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Category:</strong> {formData.category}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Start:</strong> {new Date(formData.startDateTime).toLocaleString()}
            </Typography>
            {formData.isRecurring ? (
              <Typography variant="body2">
                <strong>Recurring:</strong> {recurrencePatterns.find(p => p.value === formData.recurrencePattern)?.label}
              </Typography>
            ) : formData.endDateTime ? (
              <Typography variant="body2">
                <strong>End:</strong> {new Date(formData.endDateTime).toLocaleString()}
              </Typography>
            ) : null}
          </Box>

          <Alert severity="info" sx={{ mt: 2 }}>
            You&apos;ll receive a confirmation email at <strong>{formData.submitEmail}</strong> once your event is reviewed.
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
    </Box>
  )
}
