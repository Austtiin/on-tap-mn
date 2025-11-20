# Quick Start Guide - Testing with Images

## Prerequisites
- Node.js and npm installed
- .NET 8.0 SDK installed
- Azure Functions Core Tools installed (`npm install -g azure-functions-core-tools@4`)
- Azurite storage emulator installed (`npm install -g azurite`)

## 1. Start Azurite Storage Emulator

Open a PowerShell terminal and run:
```powershell
azurite --silent --location c:\azurite --debug c:\azurite\debug.log
```

**Keep this terminal open** - Azurite must run while testing.

## 2. Start Azure Functions API

Open a second PowerShell terminal:
```powershell
cd d:\Documents\GitHub\on-tap-mn\on-tap-functions-api
func start
```

You should see output like:
```
Functions:
        GetEvents: [GET] http://localhost:7071/api/GetEvents
        ProcessEmailQueue: queueTrigger
        SubmitEvent: [POST] http://localhost:7071/api/SubmitEvent
        UploadImage: [POST] http://localhost:7071/api/UploadImage
```

**Keep this terminal open** - API must run while testing.

## 3. Start Next.js Frontend

Open a third PowerShell terminal:
```powershell
cd d:\Documents\GitHub\on-tap-mn\ontapmn
npm run dev
```

You should see:
```
- Local:        http://localhost:3000
```

## 4. Test Event Submission with Images

1. Open browser to `http://localhost:3000/submit-event`

2. Fill out the form with test data:
   - **Your Name**: Test User
   - **Email**: test@example.com
   - **Venue Name**: Test Bar & Grill
   - **Address**: 123 Main St, Minneapolis, MN 55401
   - **Event Title**: Live Music Fridays
   - **Category**: Select any category
   - **Event Date**: Select a future date
   - **Start Time**: 19:00 (7:00 PM)

3. **Upload Images** (optional):
   - Click "Choose Banner Image" - upload a JPG, PNG, or WebP (max 5MB)
   - Click "Choose Marketing Image" - upload a second image

4. Click **"Submit Event"**

5. You should see a success dialog: ✅ **"Event submitted successfully!"**

## 5. Verify Submission

### Check Function Logs
In the Azure Functions terminal, you should see:
```
[TIMESTAMP] Executing 'SubmitEvent' ...
[TIMESTAMP] Event submission received from: test@example.com
[TIMESTAMP] Submission inserted with ID: {guid}
[TIMESTAMP] Email queued for: test@example.com
[TIMESTAMP] Executed 'SubmitEvent' (Succeeded)
```

If images were uploaded:
```
[TIMESTAMP] Executing 'UploadImage' ...
[TIMESTAMP] Image uploaded successfully: https://...
[TIMESTAMP] Executed 'UploadImage' (Succeeded)
```

### Check Database (SQL Server Management Studio or Azure Portal)

**Submissions Table**:
```sql
SELECT TOP 1 * FROM Submissions ORDER BY SubmittedAt DESC
```
Should show your submission with Status='Pending'

**EmailQueue Table**:
```sql
SELECT TOP 1 * FROM EmailQueue ORDER BY QueuedAt DESC
```
Should show queued confirmation email

**SubmissionImages Table** (if images uploaded):
```sql
SELECT * FROM SubmissionImages WHERE SubmissionId = '<your-submission-id>'
```
Should show image records with BlobUrl and BlobPath

### Check Blob Storage (Azure Portal or Storage Explorer)

Container: `event-images`
Path: `submissions/{submissionId}/`
Files: `banner.jpg` and/or `marketing.png`

## Common Issues

### Issue: "Network error: Unable to reach the server"
**Solution**: Make sure Azure Functions is running (`func start`) and showing `http://localhost:7071/api/`

### Issue: "UseDevelopmentStorage=true error"
**Solution**: Make sure Azurite is running (`azurite --silent --location c:\azurite`)

### Issue: Images upload but "Image uploaded successfully" never appears
**Solution**: Check Azure Functions terminal for errors. Verify BlobStorageConnectionString in local.settings.json

### Issue: Form validation errors
**Solution**: Make sure all required fields are filled:
- Name (min 2 characters)
- Valid email
- Venue name and full address
- Event title (min 3 characters)
- Category selected
- Date (if one-time event) OR days checked (if recurring)
- Start time

### Issue: CORS errors in browser
**Solution**: For development, both API and frontend run on localhost - no CORS needed. For production, configure CORS in Azure Functions.

## Testing Different Scenarios

### One-Time Event
1. Leave "This is a recurring event" unchecked
2. Select a single event date
3. Select start time
4. Submit

### Recurring Event
1. Check "This is a recurring event"
2. Check multiple days (e.g., Monday, Wednesday, Friday)
3. Select start time
4. Leave recurrence pattern as "Weekly"
5. Submit

### Event with Images
1. Fill form as normal
2. Upload banner image (1200x400 recommended)
3. Upload marketing image (600x600 recommended)
4. Submit
5. Check function logs for "Image uploaded successfully" messages

### Event without Images
1. Fill form as normal
2. Don't upload any images
3. Submit
4. Should succeed without image upload calls

## Stopping Development Servers

When done testing:
1. Press `Ctrl+C` in the Next.js terminal to stop frontend
2. Press `Ctrl+C` in the Azure Functions terminal to stop API
3. Press `Ctrl+C` in the Azurite terminal to stop storage emulator

## Next Steps

After verifying local development works:
- Deploy Azure Functions to Azure (see ENVIRONMENT_SETUP.md for production config)
- Deploy Next.js to Vercel or Azure Static Web Apps
- Update NEXT_PUBLIC_API_URL to production function app URL
- Test full production flow
