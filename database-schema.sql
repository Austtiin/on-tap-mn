-- OnTap MN Database Schema
-- Created: November 19, 2025
-- Purpose: Reference schema for event submission and management system

-- ============================================================================
-- DATABASE FLOW OVERVIEW
-- ============================================================================
/*
1. USER SUBMISSION:
   - User fills form on /submit-event page (Next.js frontend)
   - Form validates: SubmitName, SubmitEmail, VenueName, VenueAddress, Title, Category, StartDateTime (REQUIRED)
   - Descriptions are optional
   - Frontend calls Azure Function: SubmitEvent
   - Data inserted into SUBMISSIONS table with Status='Pending'
   - Confirmation email queued in EMAILQUEUE table

2. ADMIN REVIEW (TODO):
   - Admin views pending submissions
   - Reviews submission details
   - Approves or Rejects

3. ON APPROVAL (TODO):
   - Check if VENUES entry exists (by name/address)
   - Create new VENUES entry if needed
   - Create EVENTS record (Status='Active') with SubmissionId reference
   - Generate EVENTOCCURRENCES based on recurrence pattern
   - Update SUBMISSIONS.Status to 'Approved', set ReviewedAt
   - Send approval email via EMAILQUEUE

4. DISPLAY TO PUBLIC (TODO):
   - GetEvents API queries EVENTS table (Status='Active')
   - Joins with VENUES and EVENTOCCURRENCES
   - Returns only approved, active events to frontend
   - Events page displays results

5. RENEWAL/EXPIRATION (TODO):
   - Periodic job checks EVENTS.ExpiredAt
   - Generates RENEWTOKENS and sends renewal emails
   - User clicks renewal link, extends ExpiredAt
   - Expired events move to Status='Archived', set ArchivedAt
*/

-- ============================================================================
-- TABLES
-- ============================================================================

-- ============================================================================
-- 1. SUBMISSIONS TABLE
-- ============================================================================
-- Purpose: Stores ALL user-submitted events before approval
-- Status Flow: Pending -> Approved/Rejected
-- This is the landing table for form submissions from SubmitEvent API
-- ============================================================================
CREATE TABLE [dbo].[Submissions] (
    [SubmissionId]     UNIQUEIDENTIFIER   DEFAULT (newid()) NOT NULL,
    [SubmitName]       NVARCHAR (150)     NULL,              -- FORM REQUIRED (but DB nullable for flexibility)
    [SubmitEmail]      NVARCHAR (200)     NOT NULL,          -- FORM REQUIRED - for confirmation emails
    [VenueId]          UNIQUEIDENTIFIER   NULL,              -- OPTIONAL - links to existing Venues (populated if venue already exists)
    [VenueName]        NVARCHAR (200)     NOT NULL,          -- FORM REQUIRED
    [VenueAddress]     NVARCHAR (300)     NOT NULL,          -- FORM REQUIRED - full address with city, state, ZIP
    [Title]            NVARCHAR (200)     NOT NULL,          -- FORM REQUIRED - event title
    [Category]         NVARCHAR (50)      NOT NULL,          -- FORM REQUIRED - must be one of: Bar Bingo, Meat Raffles, Karaoke, Trivia, Live Music
    [DescriptionShort] NVARCHAR (500)     NULL,              -- FORM OPTIONAL - max 500 chars
    [DescriptionLong]  NVARCHAR (MAX)     NULL,              -- FORM OPTIONAL - unlimited
    [IsRecurring]      BIT                NOT NULL,          -- FORM REQUIRED - true if recurring event
    [RecurrenceJson]   NVARCHAR (MAX)     NULL,              -- REQUIRED if IsRecurring=true - JSON: {"pattern": "weekly"}
    [StartDateTime]    DATETIMEOFFSET (7) NULL,              -- FORM REQUIRED - first/only event start time
    [EndDateTime]      DATETIMEOFFSET (7) NULL,              -- FORM OPTIONAL - only for non-recurring events
    [Status]           NVARCHAR (50)      DEFAULT ('Pending') NOT NULL,  -- Pending, Approved, Rejected
    [CreatedAt]        DATETIMEOFFSET (7) DEFAULT (sysutcdatetime()) NOT NULL,
    [ReviewedAt]       DATETIMEOFFSET (7) NULL,              -- Set when admin approves/rejects
    [ReviewedBy]       NVARCHAR (150)     NULL,              -- Admin who reviewed (future use)
    PRIMARY KEY CLUSTERED ([SubmissionId] ASC)
);

-- ============================================================================
-- 2. VENUES TABLE
-- ============================================================================
-- Purpose: Stores unique venue information
-- Created: When submission approved and venue doesn't already exist
-- Used: Link events to physical locations, prevent duplicates
-- ============================================================================
CREATE TABLE [dbo].[Venues] (
    [VenueId]      UNIQUEIDENTIFIER   DEFAULT (newid()) NOT NULL,
    [VenueName]    NVARCHAR (200)     NOT NULL,
    [AddressLine1] NVARCHAR (200)     NOT NULL,
    [City]         NVARCHAR (100)     NOT NULL,
    [State]        NVARCHAR (50)      NOT NULL,
    [Zip]          NVARCHAR (20)      NOT NULL,
    [Latitude]     FLOAT (53)         NULL,              -- For map display (future)
    [Longitude]    FLOAT (53)         NULL,              -- For map display (future)
    [CreatedAt]    DATETIMEOFFSET (7) DEFAULT (sysutcdatetime()) NOT NULL,
    PRIMARY KEY CLUSTERED ([VenueId] ASC)
);

-- ============================================================================
-- 3. EVENTS TABLE
-- ============================================================================
-- Purpose: Stores APPROVED events that are visible to the public
-- Status Flow: Active -> Archived
-- Created: When admin approves a submission from SUBMISSIONS table
-- This is what GetEvents API queries for frontend display
-- ============================================================================
CREATE TABLE [dbo].[Events] (
    [EventId]          UNIQUEIDENTIFIER   DEFAULT (newid()) NOT NULL,
    [SubmissionId]     UNIQUEIDENTIFIER   NULL,              -- Links back to original submission
    [VenueId]          UNIQUEIDENTIFIER   NOT NULL,          -- REQUIRED - links to VENUES table
    [Title]            NVARCHAR (200)     NOT NULL,
    [Category]         NVARCHAR (50)      NOT NULL,
    [DescriptionShort] NVARCHAR (500)     NULL,
    [DescriptionLong]  NVARCHAR (MAX)     NULL,
    [IsRecurring]      BIT                NOT NULL,
    [RecurrenceJson]   NVARCHAR (MAX)     NULL,              -- Stores recurrence pattern
    [Status]           NVARCHAR (50)      DEFAULT ('Active') NOT NULL,  -- Active, Archived
    [CreatedAt]        DATETIMEOFFSET (7) DEFAULT (sysutcdatetime()) NOT NULL,  -- When approved
    [ApprovedAt]       DATETIMEOFFSET (7) NULL,              -- Timestamp of approval
    [ExpiredAt]        DATETIMEOFFSET (7) NULL,              -- When event listing expires (renewable)
    [ArchivedAt]       DATETIMEOFFSET (7) NULL,              -- When moved to archived status
    PRIMARY KEY CLUSTERED ([EventId] ASC),
    CONSTRAINT [FK_Events_Submissions] FOREIGN KEY ([SubmissionId]) REFERENCES [dbo].[Submissions] ([SubmissionId]),
    CONSTRAINT [FK_Events_Venues] FOREIGN KEY ([VenueId]) REFERENCES [dbo].[Venues] ([VenueId])
);

-- ============================================================================
-- 4. EVENTOCCURRENCES TABLE
-- ============================================================================
-- Purpose: Stores specific date/time instances of events
-- Created: When event approved, generate occurrences based on recurrence pattern
-- Used: Display "Next occurrence: Monday 7pm" on frontend
-- ============================================================================
CREATE TABLE [dbo].[EventOccurrences] (
    [OccurrenceId]    UNIQUEIDENTIFIER   DEFAULT (newid()) NOT NULL,
    [EventId]         UNIQUEIDENTIFIER   NOT NULL,
    [OccurrenceStart] DATETIMEOFFSET (7) NOT NULL,          -- Specific start time
    [OccurrenceEnd]   DATETIMEOFFSET (7) NULL,              -- Specific end time
    [Status]          NVARCHAR (50)      DEFAULT ('Scheduled') NOT NULL,  -- Scheduled, Cancelled, Completed
    [CreatedAt]       DATETIMEOFFSET (7) DEFAULT (sysutcdatetime()) NOT NULL,
    PRIMARY KEY CLUSTERED ([OccurrenceId] ASC),
    CONSTRAINT [FK_EventOccurrences_To_Events] FOREIGN KEY ([EventId]) REFERENCES [dbo].[Events] ([EventId])
);

-- ============================================================================
-- 5. EVENTIMAGES TABLE
-- ============================================================================
-- Purpose: Stores image references for events (stored in Azure Blob Storage)
-- Created: After event approved, when images uploaded via UploadImage function
-- Used: Display event photos on frontend
-- ============================================================================
CREATE TABLE [dbo].[EventImages] (
    [ImageId]   UNIQUEIDENTIFIER   DEFAULT (newid()) NOT NULL,
    [EventId]   UNIQUEIDENTIFIER   NOT NULL,
    [BlobPath]  NVARCHAR (500)     NOT NULL,              -- Path in Azure Blob Storage
    [CreatedAt] DATETIMEOFFSET (7) DEFAULT (sysutcdatetime()) NOT NULL,
    PRIMARY KEY CLUSTERED ([ImageId] ASC),
    CONSTRAINT [FK_EventImages_Events] FOREIGN KEY ([EventId]) REFERENCES [dbo].[Events] ([EventId])
);

-- ============================================================================
-- 6. EMAILQUEUE TABLE
-- ============================================================================
-- Purpose: Queue for all outgoing emails (confirmation, approval, renewal, etc.)
-- Processed: By ProcessEmailQueue Azure Function (timer trigger)
-- Status Flow: Pending -> Sent/Failed
-- ============================================================================
CREATE TABLE [dbo].[EmailQueue] (
    [EmailQueueId] UNIQUEIDENTIFIER   DEFAULT (newid()) NOT NULL,
    [ToEmail]      NVARCHAR (200)     NOT NULL,
    [Subject]      NVARCHAR (300)     NOT NULL,
    [BodyText]     NVARCHAR (MAX)     NULL,              -- Plain text version
    [BodyHtml]     NVARCHAR (MAX)     NULL,              -- HTML version (preferred)
    [Status]       NVARCHAR (50)      DEFAULT ('Pending') NOT NULL,  -- Pending, Sent, Failed
    [RetryCount]   INT                DEFAULT ((0)) NOT NULL,  -- Track retry attempts
    [CreatedAt]    DATETIMEOFFSET (7) DEFAULT (sysutcdatetime()) NOT NULL,
    [SentAt]       DATETIMEOFFSET (7) NULL,              -- When successfully sent
    PRIMARY KEY CLUSTERED ([EmailQueueId] ASC)
);

-- ============================================================================
-- 7. RENEWTOKENS TABLE
-- ============================================================================
-- Purpose: Stores secure tokens for event renewal links
-- Created: When renewal email sent to event submitters
-- Used: Validate renewal requests and extend event expiration
-- ============================================================================
CREATE TABLE [dbo].[RenewTokens] (
    [TokenId]     UNIQUEIDENTIFIER   DEFAULT (newid()) NOT NULL,
    [EventId]     UNIQUEIDENTIFIER   NOT NULL,
    [SubmitEmail] NVARCHAR (200)     NOT NULL,          -- Email of original submitter
    [TokenValue]  NVARCHAR (200)     NOT NULL,          -- Unique token (GUID or hash)
    [ExpiresAt]   DATETIMEOFFSET (7) NOT NULL,          -- Token expiration (typically 30 days)
    [UsedAt]      DATETIMEOFFSET (7) NULL,              -- When token was used (one-time use)
    PRIMARY KEY CLUSTERED ([TokenId] ASC),
    CONSTRAINT [FK_RenewTokens_Events] FOREIGN KEY ([EventId]) REFERENCES [dbo].[Events] ([EventId])
);

-- ============================================================================
-- FORM FIELD TO DATABASE MAPPING
-- ============================================================================
/*
SUBMIT EVENT FORM FIELDS -> SUBMISSIONS TABLE:

REQUIRED FIELDS (validated in frontend + backend):
├─ submitName        -> SubmitName       [Frontend: required, Backend: TODO - add validation]
├─ submitEmail       -> SubmitEmail      [Frontend: required + email format, Backend: validated]
├─ venueName         -> VenueName        [Frontend: required, Backend: validated (min 2 chars)]
├─ venueAddress      -> VenueAddress     [Frontend: required, Backend: validated (min 5 chars)]
├─ title             -> Title            [Frontend: required, Backend: validated (min 3 chars)]
├─ category          -> Category         [Frontend: required + dropdown, Backend: validated against allowed list]
└─ startDateTime     -> StartDateTime    [Frontend: required, Backend: not validated - TODO]

OPTIONAL FIELDS:
├─ descriptionShort  -> DescriptionShort [Max 500 chars, enforced in frontend and backend]
├─ descriptionLong   -> DescriptionLong  [Unlimited, optional]
└─ endDateTime       -> EndDateTime      [Only shown for non-recurring events]

CONDITIONAL FIELDS:
├─ isRecurring       -> IsRecurring      [Boolean checkbox]
└─ recurrencePattern -> RecurrenceJson   [Required if isRecurring=true, stored as JSON]

AUTO-POPULATED:
├─ venueId           -> VenueId          [NULL on submission, populated during approval if venue exists]
├─ submissionId      -> SubmissionId     [Generated GUID]
├─ status            -> Status           [Default: 'Pending']
└─ createdAt         -> CreatedAt        [Current UTC timestamp]
*/

-- ============================================================================
-- VALID VALUES REFERENCE
-- ============================================================================
/*
CATEGORIES (enforced in form dropdown and API validation):
- Bar Bingo
- Meat Raffles
- Karaoke
- Trivia
- Live Music

RECURRENCE PATTERNS (stored in RecurrenceJson as {"pattern": "value"}):
- daily
- weekly
- biweekly
- monthly

SUBMISSION STATUSES:
- Pending   : Initial state, awaiting admin review
- Approved  : Admin approved, event created in Events table
- Rejected  : Admin rejected, not listed

EVENT STATUSES:
- Active    : Event is live and visible to public
- Archived  : Event expired or manually archived

EMAIL STATUSES:
- Pending   : Email queued, not yet sent
- Sent      : Email successfully sent
- Failed    : Email failed to send (check RetryCount)

OCCURRENCE STATUSES:
- Scheduled : Upcoming occurrence
- Completed : Past occurrence
- Cancelled : Cancelled by organizer
*/

-- ============================================================================
-- CURRENT IMPLEMENTATION STATUS
-- ============================================================================
/*
✅ WORKING:
- Submit event form with validation (frontend)
- SubmitEvent Azure Function
- Insert into Submissions table
- Email queue notification (partial - using Azure Queue Storage)
- Basic input sanitization and validation

⚠️ ISSUES FOUND:
1. SubmitEvent.cs references BannerImage and MarketingImage fields
   - These columns don't exist in Submissions table
   - Should use EventImages table after approval instead
   - FIX: Remove from INSERT statement and EventSubmission class

2. SubmitName validation missing in API
   - Form now requires it, but API doesn't validate
   - FIX: Add validation in SubmitEvent.cs

3. StartDateTime validation missing
   - Required in form but not validated in API
   - Should check it's not null and not in the past
   - FIX: Add validation in SubmitEvent.cs

4. Email queueing uses Azure Queue Storage
   - Should use EmailQueue database table instead
   - FIX: Update SubmitEvent.cs to INSERT into EmailQueue table

❌ NOT IMPLEMENTED (TODO):
- Admin approval/rejection workflow
- Event creation on approval (Submissions -> Events)
- Venue duplicate detection and creation
- EventOccurrences generation
- GetEvents API (currently returns "Hello" placeholder)
- ProcessEmailQueue function (sends emails from EmailQueue table)
- Renewal token system
- Event expiration and archival
- Image upload functionality (UploadImage function exists but not integrated)
*/

-- ============================================================================
-- DATA FLOW EXAMPLE
-- ============================================================================
/*
EXAMPLE: User submits "Weekly Trivia Night at O'Malley's Pub"

STEP 1 - USER SUBMISSION:
Frontend Form:
  submitName: "John Doe"
  submitEmail: "john@example.com"
  venueName: "O'Malley's Pub"
  venueAddress: "123 Main St, Minneapolis, MN 55401"
  title: "Wednesday Trivia Night"
  category: "Trivia"
  descriptionShort: "Join us every Wednesday for trivia!"
  isRecurring: true
  recurrencePattern: "weekly"
  startDateTime: "2025-11-20T19:00:00"

SubmitEvent API:
  -> Validates all fields
  -> Sanitizes input
  -> Generates SubmissionId: {guid-1}
  -> INSERT INTO Submissions (Status='Pending')
  -> INSERT INTO EmailQueue (confirmation email)
  -> Returns: {success: true, submissionId: {guid-1}}

Database State:
  Submissions: 1 row (Status='Pending')
  EmailQueue: 1 row (Status='Pending')

STEP 2 - ADMIN REVIEW (TODO):
Admin dashboard:
  -> Views pending submission {guid-1}
  -> Reviews details
  -> Clicks "Approve"

ApproveSubmission API (TODO):
  -> Check if venue exists: O'Malley's Pub, 123 Main St
  -> Not found? INSERT INTO Venues
    - VenueId: {guid-2}
    - VenueName: "O'Malley's Pub"
    - AddressLine1: "123 Main St"
    - City: "Minneapolis", State: "MN", Zip: "55401"
  
  -> INSERT INTO Events
    - EventId: {guid-3}
    - SubmissionId: {guid-1}
    - VenueId: {guid-2}
    - Title: "Wednesday Trivia Night"
    - Status: 'Active'
    - IsRecurring: true
    - RecurrenceJson: '{"pattern":"weekly"}'
  
  -> Generate EventOccurrences (next 3 months of Wednesdays):
    - OccurrenceId: {guid-4}, OccurrenceStart: 2025-11-20 19:00
    - OccurrenceId: {guid-5}, OccurrenceStart: 2025-11-27 19:00
    - OccurrenceId: {guid-6}, OccurrenceStart: 2025-12-04 19:00
    - ... (generate ~12 occurrences)
  
  -> UPDATE Submissions SET Status='Approved', ReviewedAt=NOW()
  -> INSERT INTO EmailQueue (approval email to john@example.com)

Database State:
  Submissions: 1 row (Status='Approved')
  Venues: 1 row
  Events: 1 row (Status='Active')
  EventOccurrences: 12 rows
  EmailQueue: 2 rows (confirmation + approval)

STEP 3 - PUBLIC DISPLAY (TODO):
GetEvents API:
  -> Query: SELECT * FROM Events WHERE Status='Active' AND Category='Trivia'
  -> JOIN Venues ON Events.VenueId = Venues.VenueId
  -> JOIN EventOccurrences ON Events.EventId = EventOccurrences.EventId
  -> WHERE EventOccurrences.OccurrenceStart > NOW()
  -> ORDER BY EventOccurrences.OccurrenceStart
  -> Returns JSON array with event + venue + next occurrence

Frontend /events page:
  -> Displays: "Wednesday Trivia Night at O'Malley's Pub"
  -> Shows: "Next event: Wednesday, Nov 20 at 7:00 PM"
  -> Address: "123 Main St, Minneapolis, MN 55401"
*/




