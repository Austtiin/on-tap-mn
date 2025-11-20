# Image Upload Implementation Summary

## What Was Implemented

### ✅ Frontend Changes (EventSubmissionForm.tsx)

**Image Upload UI**:
- Added banner image upload field with file selector
- Added marketing image upload field with file selector
- Shows selected file name with remove button
- File validation: JPG/PNG/WebP only, max 5MB per image
- Visual feedback when image is selected

**Submission Flow**:
1. User submits form → API creates submission with text data → returns `submissionId`
2. If banner image exists → Upload to `/UploadImage` with `submissionId` and `imageType=banner`
3. If marketing image exists → Upload to `/UploadImage` with `submissionId` and `imageType=marketing`
4. Show success dialog after all uploads complete (or if no images)
5. Image upload failures logged to console but don't block submission success

### ✅ Backend Changes (UploadImage.cs)

**Updated to use SubmissionId** instead of venueName for organization:
- Accepts: `file`, `submissionId`, `imageType` (banner or marketing)
- Validates: file type, file size, submission ID format, image type
- Uploads to: `event-images/submissions/{submissionId}/banner.jpg`
- Creates: `SubmissionImages` table if doesn't exist
- Stores: ImageId, SubmissionId, ImageType, BlobPath, BlobUrl, UploadedAt
- Replaces: Existing image of same type for same submission (allows re-upload)

**Blob Storage Structure**:
```
event-images/                    (container - auto-created with public blob access)
  ├── submissions/
      ├── {submissionId-1}/
      │   ├── banner.jpg
      │   └── marketing.png
      ├── {submissionId-2}/
      │   ├── banner.webp
      │   └── marketing.jpg
      └── ...
```

**Database Structure** (SubmissionImages table - auto-created):
```sql
CREATE TABLE SubmissionImages (
    ImageId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SubmissionId UNIQUEIDENTIFIER NOT NULL,
    ImageType NVARCHAR(50) NOT NULL,           -- 'banner' or 'marketing'
    BlobPath NVARCHAR(500) NOT NULL,           -- 'submissions/{id}/banner.jpg'
    BlobUrl NVARCHAR(1000) NOT NULL,           -- Full blob URL
    UploadedAt DATETIMEOFFSET NOT NULL,
    FOREIGN KEY (SubmissionId) REFERENCES Submissions(SubmissionId)
)
```

### ✅ Documentation Created

1. **ENVIRONMENT_SETUP.md**: Comprehensive guide covering:
   - All required environment variables (backend and frontend)
   - Azure SQL Database configuration
   - Azure Blob Storage configuration
   - Local development with Azurite
   - Production deployment configuration
   - Security best practices
   - Troubleshooting guide

2. **QUICK_START.md**: Step-by-step testing guide:
   - Prerequisites installation
   - Starting Azurite, Functions, and Next.js
   - Testing event submission with images
   - Verification steps (logs, database, blob storage)
   - Common issues and solutions
   - Different testing scenarios

## How It Works

### Complete Flow (Text + Images)

```
User fills form and uploads images
         ↓
Clicks "Submit Event"
         ↓
POST /SubmitEvent (JSON with text data)
         ↓
API creates Submission record → returns submissionId
         ↓
Frontend receives submissionId
         ↓
[If bannerImage exists]
  POST /UploadImage (multipart/form-data)
    - file: File object
    - submissionId: guid
    - imageType: "banner"
         ↓
  API uploads to event-images/submissions/{id}/banner.jpg
  API creates SubmissionImages record
         ↓
[If marketingImage exists]
  POST /UploadImage (multipart/form-data)
    - file: File object
    - submissionId: guid
    - imageType: "marketing"
         ↓
  API uploads to event-images/submissions/{id}/marketing.jpg
  API creates SubmissionImages record
         ↓
Success dialog shown to user
```

### Database State After Submission

**Submissions Table**:
```
SubmissionId: {guid}
SubmitName: "Test User"
SubmitEmail: "test@example.com"
VenueName: "Test Bar & Grill"
Status: "Pending"
...
```

**SubmissionImages Table**:
```
ImageId: {guid}
SubmissionId: {guid from Submissions}
ImageType: "banner"
BlobPath: "submissions/{id}/banner.jpg"
BlobUrl: "https://ontapstroagesa.blob.core.windows.net/event-images/submissions/{id}/banner.jpg"
UploadedAt: 2024-01-15T10:30:00Z

ImageId: {guid}
SubmissionId: {guid from Submissions}
ImageType: "marketing"
BlobPath: "submissions/{id}/marketing.png"
BlobUrl: "https://ontapstroagesa.blob.core.windows.net/event-images/submissions/{id}/marketing.png"
UploadedAt: 2024-01-15T10:30:01Z
```

**EmailQueue Table**:
```
QueueId: {guid}
RecipientEmail: "test@example.com"
Subject: "Event Submission Confirmation"
HtmlBody: "Thank you for submitting Live Music Fridays..."
Status: "Pending"
QueuedAt: 2024-01-15T10:30:00Z
```

## Testing Checklist

### Before Testing
- [ ] Azurite running (`azurite --silent --location c:\azurite`)
- [ ] Azure Functions running (`func start` in on-tap-functions-api/)
- [ ] Next.js running (`npm run dev` in ontapmn/)
- [ ] local.settings.json has correct SQLConnectionString and BlobStorageConnectionString

### Test Scenarios

#### ✅ Submit Event with Both Images
- [ ] Form validates correctly
- [ ] Submission succeeds and returns submissionId
- [ ] Banner image uploads to blob storage
- [ ] Marketing image uploads to blob storage
- [ ] 2 records in SubmissionImages table
- [ ] Success dialog appears
- [ ] Form resets after success

#### ✅ Submit Event with Only Banner Image
- [ ] Submission succeeds
- [ ] Only banner image uploads
- [ ] 1 record in SubmissionImages table (ImageType='banner')

#### ✅ Submit Event with Only Marketing Image
- [ ] Submission succeeds
- [ ] Only marketing image uploads
- [ ] 1 record in SubmissionImages table (ImageType='marketing')

#### ✅ Submit Event with No Images
- [ ] Submission succeeds
- [ ] No image uploads attempted
- [ ] 0 records in SubmissionImages table
- [ ] Success dialog still appears

#### ✅ Image Validation
- [ ] Uploading .txt file shows error "Please upload a valid image file"
- [ ] Uploading 10MB image shows error "Image must be less than 5MB"
- [ ] Valid JPG/PNG/WebP under 5MB accepted

#### ✅ Error Handling
- [ ] Network error (API not running) shows error dialog
- [ ] Invalid submission data shows field validation errors
- [ ] Image upload failure logged but doesn't prevent success dialog

## Files Modified

1. **ontapmn/src/app/submit-event/components/EventSubmissionForm.tsx**
   - Added image upload handling after successful submission
   - Changed from JSON submission to two-step: JSON first, then multipart for images

2. **on-tap-functions-api/UploadImage.cs**
   - Changed from venueName to submissionId for folder organization
   - Added SubmissionImages database table creation and tracking
   - Changed container from "imgs" to "event-images"
   - Changed path structure to "submissions/{id}/" instead of "Submissions/{venueName}/"

## Files Created

1. **ENVIRONMENT_SETUP.md** - Complete environment configuration guide
2. **QUICK_START.md** - Step-by-step testing guide
3. **IMAGE_UPLOAD_IMPLEMENTATION.md** - This file

## Environment Variables Required

### Backend (local.settings.json)
```json
{
  "Values": {
    "SQLConnectionString": "Server=tcp:server-db-sql.database.windows.net,1433;...",
    "BlobStorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=ontapstroagesa;...",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "EmailQueueStorage": "UseDevelopmentStorage=true"
  }
}
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:7071/api
```

## Next Steps for Production

1. **Deploy Azure Functions** to Azure
   - Update Application Settings with production connection strings
   - Configure CORS to allow frontend domain
   - Verify Function App has proper authentication (if needed)

2. **Deploy Next.js** to hosting platform (Vercel, Azure Static Web Apps, etc.)
   - Set NEXT_PUBLIC_API_URL to production Function App URL
   - Verify environment variable is set correctly

3. **Test Production Flow**
   - Submit test event with images
   - Verify images appear in production blob storage
   - Verify SubmissionImages records in production database
   - Check email queue processing

4. **Optional Enhancements**
   - Add image preview before upload
   - Add image cropping/resizing on frontend
   - Add progress indicators during upload
   - Add retry logic for failed uploads
   - Move images to different container after approval
   - Generate thumbnails for faster loading

## Security Considerations

- ⚠️ Functions use `AuthorizationLevel.Anonymous` - consider authentication for production
- ⚠️ Container uses `PublicAccessType.Blob` - images publicly accessible via URL
- ✅ File type validation prevents non-image uploads
- ✅ File size validation prevents excessive storage usage
- ✅ Submissions tracked in database with timestamps
- ✅ local.settings.json in .gitignore (not committed to git)

## Success Metrics

After implementation, you can:
- ✅ Submit events with banner and marketing images
- ✅ Images stored in organized folder structure by submission ID
- ✅ Images tracked in database with blob URLs
- ✅ Images accessible via public blob URLs
- ✅ Multiple images per submission supported
- ✅ Image uploads don't block text submission
- ✅ Failed image uploads don't prevent submission success
- ✅ Full documentation for setup and testing
