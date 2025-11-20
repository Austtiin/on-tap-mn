# Environment Variables Setup Guide

This document describes all environment variables required for the On Tap MN application to run properly in development and production environments.

## Azure Functions API (Backend)

Configuration file: `on-tap-functions-api/local.settings.json`

### Required Environment Variables

#### 1. **SQLConnectionString**
- **Purpose**: Connection string for Azure SQL Database where event submissions, email queue, and images are stored
- **Format**: `Server=tcp:<server-name>.database.windows.net,1433;Initial Catalog=<database-name>;Persist Security Info=False;User ID=<username>;Password=<password>;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`
- **Current Value**: Already configured in `local.settings.json`
- **Tables Used**:
  - `Submissions` - Event submission data with Status='Pending' until approved
  - `EmailQueue` - Queued confirmation emails to be sent
  - `SubmissionImages` - Image references with blob paths (auto-created by UploadImage function)

#### 2. **BlobStorageConnectionString**
- **Purpose**: Connection string for Azure Blob Storage where event images are stored
- **Format**: `DefaultEndpointsProtocol=https;AccountName=<storage-account-name>;AccountKey=<account-key>;EndpointSuffix=core.windows.net`
- **Current Value**: Already configured in `local.settings.json` (ontapstroagesa storage account)
- **Container Used**: `event-images` (auto-created by UploadImage function)
- **Folder Structure**: 
  - `submissions/{submissionId}/banner.jpg` - Banner image for submission
  - `submissions/{submissionId}/marketing.png` - Marketing image for submission

#### 3. **AzureWebJobsStorage**
- **Purpose**: Storage account for Azure Functions runtime (triggers, bindings, logs)
- **Development**: `UseDevelopmentStorage=true` (uses local Azurite emulator)
- **Production**: Full Azure Storage connection string

#### 4. **EmailQueueStorage**
- **Purpose**: Storage account for email queue processing
- **Development**: `UseDevelopmentStorage=true` (uses local Azurite emulator)
- **Production**: Full Azure Storage connection string

### Development Setup

For local development with `func start`:

1. **Install Azurite** (Azure Storage Emulator):
   ```powershell
   npm install -g azurite
   ```

2. **Start Azurite before running functions**:
   ```powershell
   azurite --silent --location c:\azurite --debug c:\azurite\debug.log
   ```

3. **Verify local.settings.json** has all required values:
   ```json
   {
     "IsEncrypted": false,
     "Values": {
       "AzureWebJobsStorage": "UseDevelopmentStorage=true",
       "FUNCTIONS_WORKER_RUNTIME": "dotnet",
       "SQLConnectionString": "Server=tcp:server-db-sql.database.windows.net,1433;...",
       "BlobStorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=ontapstroagesa;...",
       "EmailQueueStorage": "UseDevelopmentStorage=true"
     }
   }
   ```

4. **Run the functions**:
   ```powershell
   cd d:\Documents\GitHub\on-tap-mn\on-tap-functions-api
   func start
   ```

### Available Endpoints

When running locally (`func start`), the following endpoints are available at `http://localhost:7071/api/`:

- **POST /SubmitEvent** - Submit event data (JSON)
  - Returns: `{ success: true, submissionId: "guid", message: "..." }`
  
- **POST /UploadImage** - Upload event images (multipart/form-data)
  - Form fields: `file`, `submissionId`, `imageType` (banner or marketing)
  - Returns: `{ success: true, imageUrl: "...", fileName: "...", message: "..." }`
  
- **GET /GetEvents** - Retrieve approved events
  
- **POST /ProcessEmailQueue** - Process pending email queue (queue trigger)

---

## Next.js Frontend (ontapmn)

Configuration file: `ontapmn/.env.local` (create if doesn't exist)

### Required Environment Variables

#### 1. **NEXT_PUBLIC_API_URL**
- **Purpose**: Base URL for Azure Functions API endpoints
- **Development**: `http://localhost:7071/api`
- **Production**: `https://<function-app-name>.azurewebsites.net/api`
- **Note**: Must be prefixed with `NEXT_PUBLIC_` to be accessible in browser

### Development Setup

1. **Create `.env.local` file** in `ontapmn` directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:7071/api
   ```

2. **Start the Next.js dev server**:
   ```powershell
   cd d:\Documents\GitHub\on-tap-mn\ontapmn
   npm run dev
   ```

3. **Access the application** at `http://localhost:3000`

---

## Full Development Workflow

To test the complete application locally with image uploads:

### Step 1: Start Azurite (Storage Emulator)
```powershell
azurite --silent --location c:\azurite --debug c:\azurite\debug.log
```
*Leave this running in a separate terminal*

### Step 2: Start Azure Functions API
```powershell
cd d:\Documents\GitHub\on-tap-mn\on-tap-functions-api
func start
```
*Leave this running - should show endpoints at http://localhost:7071/api/*

### Step 3: Start Next.js Frontend
```powershell
cd d:\Documents\GitHub\on-tap-mn\ontapmn
npm run dev
```
*Leave this running - should show app at http://localhost:3000*

### Step 4: Test Event Submission with Images

1. Navigate to `http://localhost:3000/submit-event`
2. Fill out the event form
3. Upload banner and/or marketing images (JPG/PNG/WebP, max 5MB each)
4. Submit the form
5. Verify:
   - Event appears in `Submissions` table with Status='Pending'
   - Email queued in `EmailQueue` table
   - Images uploaded to blob storage at `event-images/submissions/{submissionId}/`
   - Image records in `SubmissionImages` table

---

## Production Deployment

### Azure Functions Configuration

In Azure Portal → Function App → Configuration → Application Settings:

- `SQLConnectionString` = Production Azure SQL connection string
- `BlobStorageConnectionString` = Production Azure Storage connection string
- `AzureWebJobsStorage` = Production Azure Storage connection string
- `EmailQueueStorage` = Production Azure Storage connection string

### Next.js Configuration

In deployment platform (Vercel, Azure Static Web Apps, etc.):

- `NEXT_PUBLIC_API_URL` = `https://<your-function-app>.azurewebsites.net/api`

---

## Troubleshooting

### "UseDevelopmentStorage=true" not working
- **Solution**: Install and start Azurite emulator
- **Install**: `npm install -g azurite`
- **Run**: `azurite --silent --location c:\azurite`

### Images not uploading
- **Check**: BlobStorageConnectionString in local.settings.json
- **Check**: Azurite is running (for local dev)
- **Check**: Container "event-images" has public blob access
- **Check**: Function logs for upload errors

### Cannot connect to SQL Database
- **Check**: SQLConnectionString is correct
- **Check**: Firewall rules allow your IP address
- **Check**: Database credentials are valid
- **Test**: Use SQL Server Management Studio to verify connection

### Frontend can't reach API
- **Check**: NEXT_PUBLIC_API_URL is set correctly
- **Check**: Azure Functions is running (`func start`)
- **Check**: CORS is configured in Azure Functions (for production)
- **Check**: Browser console for network errors

---

## Security Notes

### Never Commit Secrets
- `local.settings.json` is in `.gitignore` - DO NOT commit to git
- `.env.local` should be in `.gitignore` - DO NOT commit to git
- Use Azure Key Vault or environment variables for production secrets

### Access Levels
- Azure Functions currently use `AuthorizationLevel.Anonymous` for development
- Consider adding authentication for production (Azure AD, API keys, etc.)

### Blob Storage Access
- Container `event-images` uses `PublicAccessType.Blob` - images are publicly accessible via URL
- Consider using SAS tokens or private containers with CDN for production
