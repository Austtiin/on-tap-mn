import { forwardRef } from 'react'

// Form Input Component
interface FormInputProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  type?: string
  error?: string
  required?: boolean
  helperText?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, value, onChange, onBlur, type = 'text', error, required, helperText, placeholder, disabled, className = '' }, ref) => {
    return (
      <div className="space-y-1 mb-4" data-error={!!error}>
        <label className="block text-sm font-medium text-black">
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>
        <input
          ref={ref}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-black placeholder-gray-500 ${
            error ? 'border-red-500 focus:ring-red-500' : ''
          } ${className}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {!error && helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

// Form Textarea Component
interface FormTextareaProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  required?: boolean
  helperText?: string
  placeholder?: string
  disabled?: boolean
  rows?: number
  className?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, name, value, onChange, onBlur, error, required, helperText, placeholder, disabled, rows = 4, className = '' }, ref) => {
    return (
      <div className="space-y-1 mb-4" data-error={!!error}>
        <label className="block text-sm font-medium text-black">
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-y text-black placeholder-gray-500 ${
            error ? 'border-red-500 focus:ring-red-500' : ''
          } ${className}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {!error && helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'

// Form Select Component
interface FormSelectProps {
  label: string
  name: string
  error?: string
  required?: boolean
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function FormSelect({ 
  label, 
  name,
  error, 
  required, 
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option...' 
}: FormSelectProps) {
  return (
    <div className="space-y-1 mb-4" data-error={!!error}>
      <label className="block text-sm font-medium text-black">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-black ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        }`}
      >
        <option value="" className="text-gray-500">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-black">
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

// Form Checkbox Component
interface FormCheckboxProps {
  label: string | React.ReactNode
  error?: string
  required?: boolean
  checked: boolean
  onChange: (checked: boolean) => void
}

export function FormCheckbox({ label, error, required, checked, onChange }: FormCheckboxProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label className="text-sm text-black leading-5">
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

// Form File Upload Component
interface FormFileUploadProps {
  label: string
  error?: string
  required?: boolean
  accept?: string
  onChange: (file: File | null) => void
  currentFile?: File | null
}

export function FormFileUpload({ 
  label, 
  error, 
  required, 
  accept = 'image/*', 
  onChange,
  currentFile 
}: FormFileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange(file)
  }

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-black">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="space-y-2">
            <div className="text-gray-400">
              <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-sm text-black">
              {currentFile ? (
                <span className="text-primary font-medium">{currentFile.name}</span>
              ) : (
                <>
                  <span className="text-primary font-medium">Click to upload</span> or drag and drop
                </>
              )}
            </div>
            <p className="text-xs text-gray-600">PNG, JPG, GIF up to 2MB</p>
          </div>
        </label>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}