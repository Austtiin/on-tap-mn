'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import { FormInput, FormTextarea, FormSelect } from '../../submit-event/components/FormComponents'

interface ContactFormData {
  name: string
  email: string
  subject: string
  category: string
  message: string
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  category: '',
  message: ''
}

const categories = [
  { value: 'general', label: 'General Question' },
  { value: 'event-submission', label: 'Event Submission Help' },
  { value: 'technical', label: 'Technical Issue' },
  { value: 'partnership', label: 'Partnership/Advertising' },
  { value: 'feedback', label: 'Feedback/Suggestion' },
  { value: 'other', label: 'Other' },
]

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const updateFormData = <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}

    // Required field validation
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.category) newErrors.category = 'Please select a category'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Message length validation
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

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
      console.log('Contact form submitted:', formData)
      
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
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-black mb-4">Message Sent!</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Thank you for getting in touch! We&apos;ve received your message and will 
            respond within 1-2 business days.
          </p>
          <Button 
            onClick={() => setSubmitSuccess(false)}
            variant="contained"
            color="primary"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-black mb-6">
        Send Us a Message
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Your Name"
            required
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            error={errors.name}
            placeholder="John Doe"
          />
          
          <FormInput
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            error={errors.email}
            placeholder="john@example.com"
          />
        </div>

        <FormSelect
          label="Category"
          required
          options={categories}
          value={formData.category}
          onChange={(value) => updateFormData('category', value)}
          error={errors.category}
          placeholder="What is this message about?"
        />

        <FormInput
          label="Subject"
          required
          value={formData.subject}
          onChange={(e) => updateFormData('subject', e.target.value)}
          error={errors.subject}
          placeholder="Brief description of your message"
        />

        <FormTextarea
          label="Message"
          required
          value={formData.message}
          onChange={(e) => updateFormData('message', e.target.value)}
          error={errors.message}
          placeholder="Please provide as much detail as possible..."
          rows={6}
        />

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Before submitting:</p>
              <ul className="space-y-1 text-yellow-700">
                <li>• Check our FAQ section below for common questions</li>
                <li>• For event submissions, use our dedicated{' '}
                  <a href="/submit-event" className="text-primary hover:underline">Submit Event form</a>
                </li>
                <li>• Include relevant details to help us assist you better</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            sx={{ minWidth: 150 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </div>
  )
}