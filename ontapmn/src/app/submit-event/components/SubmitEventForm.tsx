'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import { 
  FormInput, 
  FormTextarea, 
  FormSelect, 
  FormCheckbox, 
  FormFileUpload 
} from './FormComponents'

interface FormData {
  // Business Information
  businessName: string
  businessType: string
  contactFirstName: string
  contactLastName: string
  email: string
  phone: string
  website: string
  
  // Business Address
  streetAddress: string
  city: string
  state: string
  zipCode: string
  
  // Event Information
  eventTitle: string
  eventType: string
  eventDescription: string
  eventFrequency: string
  eventDay: string
  eventTime: string
  eventDuration: string
  eventCost: string
  
  // Additional Information
  specialOffers: string
  additionalInfo: string
  logo: File | null
  
  // Legal Agreements
  termsAccepted: boolean
  privacyAccepted: boolean
  contentRightsAccepted: boolean
  listingExpirationAccepted: boolean
  marketingAccepted: boolean
}

const initialFormData: FormData = {
  businessName: '',
  businessType: '',
  contactFirstName: '',
  contactLastName: '',
  email: '',
  phone: '',
  website: '',
  streetAddress: '',
  city: '',
  state: 'MN',
  zipCode: '',
  eventTitle: '',
  eventType: '',
  eventDescription: '',
  eventFrequency: '',
  eventDay: '',
  eventTime: '',
  eventDuration: '',
  eventCost: '',
  specialOffers: '',
  additionalInfo: '',
  logo: null,
  termsAccepted: false,
  privacyAccepted: false,
  contentRightsAccepted: false,
  listingExpirationAccepted: false,
  marketingAccepted: false,
}

const businessTypes = [
  { value: 'bar', label: 'Bar/Tavern' },
  { value: 'restaurant', label: 'Restaurant with Bar' },
  { value: 'brewery', label: 'Brewery' },
  { value: 'distillery', label: 'Distillery' },
  { value: 'club', label: 'Social Club' },
  { value: 'other', label: 'Other' },
]

const eventTypes = [
  { value: 'bar-bingo', label: 'Bar Bingo' },
  { value: 'meat-raffle', label: 'Meat Raffle' },
  { value: 'karaoke', label: 'Karaoke' },
  { value: 'trivia', label: 'Trivia Night' },
  { value: 'live-music', label: 'Live Music' },
  { value: 'other', label: 'Other Event' },
]

const frequencies = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'special', label: 'Special Event' },
  { value: 'seasonal', label: 'Seasonal' },
]

const days = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
]

export function SubmitEventForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const updateFormData = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    // Required field validation
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required'
    if (!formData.businessType) newErrors.businessType = 'Business type is required'
    if (!formData.contactFirstName.trim()) newErrors.contactFirstName = 'First name is required'
    if (!formData.contactLastName.trim()) newErrors.contactLastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    if (!formData.eventTitle.trim()) newErrors.eventTitle = 'Event title is required'
    if (!formData.eventType) newErrors.eventType = 'Event type is required'
    if (!formData.eventDescription.trim()) newErrors.eventDescription = 'Event description is required'

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    const phoneRegex = /^[\+]?[(]?\d{3}[)]?[-.\s]?\d{3}[-.\s]?\d{4}$/
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    // Legal agreements validation
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must agree to the terms of service'
    if (!formData.privacyAccepted) newErrors.privacyAccepted = 'You must agree to the privacy policy'
    if (!formData.contentRightsAccepted) newErrors.contentRightsAccepted = 'You must agree to content usage rights'
    if (!formData.listingExpirationAccepted) newErrors.listingExpirationAccepted = 'You must agree to the listing expiration policy'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitSuccess(true)
      setFormData(initialFormData)
    } catch (error) {
      console.error('Submission error:', error)
      // Handle error
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-accent mb-4">Thank You!</h2>
        <p className="text-gray-600 mb-6">
          Your event submission has been received. We&apos;ll review it and get back to you within 2-3 business days.
        </p>
        <Button 
          onClick={() => setSubmitSuccess(false)}
          variant="contained"
          color="primary"
        >
          Submit Another Event
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
      {/* Business Information Section */}
      <div>
        <h2 className="text-2xl font-bold text-accent mb-6 flex items-center">
          <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
          Business Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FormInput
              label="Business Name"
              required
              value={formData.businessName}
              onChange={(e) => updateFormData('businessName', e.target.value)}
              error={errors.businessName}
              placeholder="Enter your business name"
            />
          </div>
          
          <FormSelect
            label="Business Type"
            required
            options={businessTypes}
            value={formData.businessType}
            onChange={(value) => updateFormData('businessType', value)}
            error={errors.businessType}
          />
          
          <FormInput
            label="Website"
            type="url"
            value={formData.website}
            onChange={(e) => updateFormData('website', e.target.value)}
            error={errors.website}
            placeholder="https://www.yourwebsite.com"
          />
          
          <FormInput
            label="Contact First Name"
            required
            value={formData.contactFirstName}
            onChange={(e) => updateFormData('contactFirstName', e.target.value)}
            error={errors.contactFirstName}
            placeholder="John"
          />
          
          <FormInput
            label="Contact Last Name"
            required
            value={formData.contactLastName}
            onChange={(e) => updateFormData('contactLastName', e.target.value)}
            error={errors.contactLastName}
            placeholder="Doe"
          />
          
          <FormInput
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            error={errors.email}
            placeholder="john@business.com"
          />
          
          <FormInput
            label="Phone Number"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            error={errors.phone}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      {/* Business Address Section */}
      <div>
        <h2 className="text-2xl font-bold text-accent mb-6 flex items-center">
          <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
          Business Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FormInput
              label="Street Address"
              required
              value={formData.streetAddress}
              onChange={(e) => updateFormData('streetAddress', e.target.value)}
              error={errors.streetAddress}
              placeholder="123 Main Street"
            />
          </div>
          
          <FormInput
            label="City"
            required
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
            error={errors.city}
            placeholder="Minneapolis"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="State"
              required
              value={formData.state}
              onChange={(e) => updateFormData('state', e.target.value)}
              error={errors.state}
              placeholder="MN"
              maxLength={2}
            />
            
            <FormInput
              label="ZIP Code"
              required
              value={formData.zipCode}
              onChange={(e) => updateFormData('zipCode', e.target.value)}
              error={errors.zipCode}
              placeholder="55401"
              maxLength={5}
            />
          </div>
        </div>
      </div>

      {/* Event Information Section */}
      <div>
        <h2 className="text-2xl font-bold text-accent mb-6 flex items-center">
          <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
          Event Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FormInput
              label="Event Title"
              required
              value={formData.eventTitle}
              onChange={(e) => updateFormData('eventTitle', e.target.value)}
              error={errors.eventTitle}
              placeholder="Weekly Meat Raffle Night"
            />
          </div>
          
          <FormSelect
            label="Event Type"
            required
            options={eventTypes}
            value={formData.eventType}
            onChange={(value) => updateFormData('eventType', value)}
            error={errors.eventType}
          />
          
          <FormSelect
            label="Event Frequency"
            options={frequencies}
            value={formData.eventFrequency}
            onChange={(value) => updateFormData('eventFrequency', value)}
            error={errors.eventFrequency}
          />
          
          <FormSelect
            label="Day of Week"
            options={days}
            value={formData.eventDay}
            onChange={(value) => updateFormData('eventDay', value)}
            error={errors.eventDay}
          />
          
          <FormInput
            label="Event Time"
            type="time"
            value={formData.eventTime}
            onChange={(e) => updateFormData('eventTime', e.target.value)}
            error={errors.eventTime}
          />
          
          <FormInput
            label="Duration"
            value={formData.eventDuration}
            onChange={(e) => updateFormData('eventDuration', e.target.value)}
            error={errors.eventDuration}
            placeholder="2 hours"
          />
          
          <FormInput
            label="Event Cost"
            value={formData.eventCost}
            onChange={(e) => updateFormData('eventCost', e.target.value)}
            error={errors.eventCost}
            placeholder="Free, $5 per ticket, etc."
          />
          
          <div className="md:col-span-2">
            <FormTextarea
              label="Event Description"
              required
              value={formData.eventDescription}
              onChange={(e) => updateFormData('eventDescription', e.target.value)}
              error={errors.eventDescription}
              placeholder="Describe your event, what makes it special, prizes, etc."
              rows={4}
            />
          </div>
          
          <div className="md:col-span-2">
            <FormTextarea
              label="Special Offers or Promotions"
              value={formData.specialOffers}
              onChange={(e) => updateFormData('specialOffers', e.target.value)}
              error={errors.specialOffers}
              placeholder="Drink specials, food deals, happy hour prices, etc."
              rows={3}
            />
          </div>
          
          <div className="md:col-span-2">
            <FormTextarea
              label="Additional Information"
              value={formData.additionalInfo}
              onChange={(e) => updateFormData('additionalInfo', e.target.value)}
              error={errors.additionalInfo}
              placeholder="Parking info, accessibility, age restrictions, etc."
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Logo Upload Section */}
      <div>
        <h2 className="text-2xl font-bold text-accent mb-6 flex items-center">
          <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
          Business Logo
        </h2>
        <FormFileUpload
          label="Upload Your Business Logo"
          accept="image/*"
          onChange={(file) => updateFormData('logo', file)}
          currentFile={formData.logo}
          error={errors.logo}
        />
        <p className="text-sm text-gray-500 mt-2">
          Optional but recommended. A good logo helps customers recognize your business.
        </p>
      </div>

      {/* Legal Agreements Section */}
      <div>
        <h2 className="text-2xl font-bold text-accent mb-6 flex items-center">
          <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">5</span>
          Legal Agreements & Permissions
        </h2>
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
          <FormCheckbox
            required
            checked={formData.termsAccepted}
            onChange={(checked) => updateFormData('termsAccepted', checked)}
            error={errors.termsAccepted}
            label={
              <span>
                I agree to the{' '}
                <a href="/terms" className="text-primary hover:underline" target="_blank">
                  Terms of Service
                </a>
                {' '}and understand that OnTap MN reserves the right to review and approve all submissions.
              </span>
            }
          />
          
          <FormCheckbox
            required
            checked={formData.privacyAccepted}
            onChange={(checked) => updateFormData('privacyAccepted', checked)}
            error={errors.privacyAccepted}
            label={
              <span>
                I agree to the{' '}
                <a href="/privacy" className="text-primary hover:underline" target="_blank">
                  Privacy Policy
                </a>
                {' '}and consent to the collection and use of my information as described.
              </span>
            }
          />
          
          <FormCheckbox
            required
            checked={formData.contentRightsAccepted}
            onChange={(checked) => updateFormData('contentRightsAccepted', checked)}
            error={errors.contentRightsAccepted}
            label="I grant OnTap MN the right to use, modify, and display the content I submit (including business name, logo, event details) on the website and in marketing materials. I confirm I have the legal right to grant these permissions."
          />
          
          <FormCheckbox
            required
            checked={formData.listingExpirationAccepted}
            onChange={(checked) => updateFormData('listingExpirationAccepted', checked)}
            error={errors.listingExpirationAccepted}
            label="I understand that my listing may expire if renewal notice emails are not acknowledged. Event information timing may vary and updates may be delayed. OnTap MN is not responsible for outdated or inaccurate information due to non-response to renewal notices."
          />
          
          <FormCheckbox
            checked={formData.marketingAccepted}
            onChange={(checked) => updateFormData('marketingAccepted', checked)}
            error={errors.marketingAccepted}
            label="I would like to receive occasional marketing emails about OnTap MN features and opportunities (optional)."
          />
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Disclaimers:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• OnTap MN reserves the right to reject any submission that doesn&apos;t meet our community standards</li>
            <li>• All information must be accurate and truthful</li>
            <li>• Events must comply with local laws and regulations</li>
            <li>• OnTap MN is not responsible for event cancellations or changes</li>
            <li>• Submission does not guarantee publication or placement</li>
          </ul>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isSubmitting}
          sx={{ minWidth: 200 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Event'}
        </Button>
      </div>
    </form>
  )
}