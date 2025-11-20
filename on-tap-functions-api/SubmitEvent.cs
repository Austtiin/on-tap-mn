using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Data.SqlClient;
using System.Text.RegularExpressions;
using System.Linq;

namespace on_tap_functions_api
{
    public static class SubmitEvent
    {
        // Sanitize string input - trim, normalize whitespace, prevent script injection
        private static string SanitizeString(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return null;

            // Remove any potential script tags or dangerous content
            input = Regex.Replace(input, @"<script[^>]*>.*?</script>", "", RegexOptions.IgnoreCase | RegexOptions.Singleline);
            input = Regex.Replace(input, @"<.*?>", ""); // Remove HTML tags
            
            // Normalize whitespace
            input = Regex.Replace(input.Trim(), @"\s+", " ");
            
            return input;
        }

        // Validate and sanitize email
        private static string SanitizeEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return null;

            email = email.Trim().ToLowerInvariant();
            
            // Basic email validation
            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            if (!emailRegex.IsMatch(email))
                return null;

            return email;
        }

        // Validate URL format
        private static string SanitizeUrl(string url)
        {
            if (string.IsNullOrWhiteSpace(url))
                return null;

            url = url.Trim();
            
            // Basic URL validation
            if (!Uri.TryCreate(url, UriKind.Absolute, out Uri result) || 
                (result.Scheme != Uri.UriSchemeHttp && result.Scheme != Uri.UriSchemeHttps))
            {
                return null;
            }

            return url;
        }

        [FunctionName("SubmitEvent")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("SubmitEvent function processing a request.");

            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var submission = JsonConvert.DeserializeObject<EventSubmission>(requestBody);

                // Sanitize all input data
                submission.SubmitName = SanitizeString(submission.SubmitName);
                submission.SubmitEmail = SanitizeEmail(submission.SubmitEmail);
                submission.VenueName = SanitizeString(submission.VenueName);
                submission.VenueAddress = SanitizeString(submission.VenueAddress);
                submission.Title = SanitizeString(submission.Title);
                submission.Category = SanitizeString(submission.Category);
                submission.DescriptionShort = SanitizeString(submission.DescriptionShort);
                submission.DescriptionLong = SanitizeString(submission.DescriptionLong);

                // Validate required fields
                if (string.IsNullOrEmpty(submission.SubmitName) || submission.SubmitName.Length < 2)
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "Your name is required and must be at least 2 characters" 
                    });
                }
                
                if (string.IsNullOrEmpty(submission.SubmitEmail))
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "Valid email address is required" 
                    });
                }
                
                if (string.IsNullOrEmpty(submission.VenueName) || submission.VenueName.Length < 2)
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "Venue name must be at least 2 characters" 
                    });
                }
                
                if (string.IsNullOrEmpty(submission.VenueAddress) || submission.VenueAddress.Length < 5)
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "Valid venue address is required" 
                    });
                }
                
                if (string.IsNullOrEmpty(submission.Title) || submission.Title.Length < 3)
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "Event title must be at least 3 characters" 
                    });
                }
                
                if (string.IsNullOrEmpty(submission.Category))
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "Event category is required" 
                    });
                }

                // Validate category against allowed values
                var allowedCategories = new[] { "Bar Bingo", "Meat Raffles", "Karaoke", "Trivia", "Live Music" };
                if (!allowedCategories.Contains(submission.Category))
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "Invalid event category" 
                    });
                }
                
                // Validate start date/time
                if (!submission.StartDateTime.HasValue)
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "Event start date and time is required" 
                    });
                }
                
                if (submission.StartDateTime.Value < DateTimeOffset.UtcNow.AddHours(-1))
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "Event start date must be in the future" 
                    });
                }

                // Validate description lengths
                if (!string.IsNullOrEmpty(submission.DescriptionShort) && submission.DescriptionShort.Length > 500)
                {
                    submission.DescriptionShort = submission.DescriptionShort.Substring(0, 500);
                }

                // Get connection string
                var connectionString = Environment.GetEnvironmentVariable("SQLConnectionString");
                var submissionId = Guid.NewGuid();

                // Insert into Submissions table
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string sql = @"
                        INSERT INTO Submissions (
                            SubmissionId, SubmitName, SubmitEmail, VenueId, VenueName, VenueAddress,
                            Title, Category, DescriptionShort, DescriptionLong, IsRecurring, 
                            RecurrenceJson, StartDateTime, EndDateTime,
                            Status, CreatedAt
                        )
                        VALUES (
                            @SubmissionId, @SubmitName, @SubmitEmail, @VenueId, @VenueName, @VenueAddress,
                            @Title, @Category, @DescriptionShort, @DescriptionLong, @IsRecurring,
                            @RecurrenceJson, @StartDateTime, @EndDateTime,
                            'Pending', SYSUTCDATETIME()
                        )";

                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@SubmissionId", submissionId);
                        command.Parameters.AddWithValue("@SubmitName", (object)submission.SubmitName ?? DBNull.Value);
                        command.Parameters.AddWithValue("@SubmitEmail", submission.SubmitEmail);
                        command.Parameters.AddWithValue("@VenueId", (object)submission.VenueId ?? DBNull.Value);
                        command.Parameters.AddWithValue("@VenueName", submission.VenueName);
                        command.Parameters.AddWithValue("@VenueAddress", submission.VenueAddress);
                        command.Parameters.AddWithValue("@Title", submission.Title);
                        command.Parameters.AddWithValue("@Category", submission.Category);
                        command.Parameters.AddWithValue("@DescriptionShort", (object)submission.DescriptionShort ?? DBNull.Value);
                        command.Parameters.AddWithValue("@DescriptionLong", (object)submission.DescriptionLong ?? DBNull.Value);
                        command.Parameters.AddWithValue("@IsRecurring", submission.IsRecurring);
                        command.Parameters.AddWithValue("@RecurrenceJson", (object)submission.RecurrenceJson ?? DBNull.Value);
                        command.Parameters.AddWithValue("@StartDateTime", (object)submission.StartDateTime ?? DBNull.Value);
                        command.Parameters.AddWithValue("@EndDateTime", (object)submission.EndDateTime ?? DBNull.Value);

                        await command.ExecuteNonQueryAsync();
                    }
                }

                // Queue confirmation email in database
                try
                {
                    using (SqlConnection emailConnection = new SqlConnection(connectionString))
                    {
                        await emailConnection.OpenAsync();

                        string emailSubject = "Event Submission Received - OnTap MN";
                        string emailBodyHtml = $@"
                            <html>
                            <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
                                <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                                    <h2 style='color: #2563eb;'>Thank You for Submitting Your Event!</h2>
                                    <p>Hi {submission.SubmitName ?? "there"},</p>
                                    <p>We've successfully received your event submission for <strong>{submission.Title}</strong>.</p>
                                    
                                    <div style='background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;'>
                                        <h3 style='margin-top: 0;'>Submission Details:</h3>
                                        <p><strong>Event:</strong> {submission.Title}</p>
                                        <p><strong>Category:</strong> {submission.Category}</p>
                                        <p><strong>Venue:</strong> {submission.VenueName}</p>
                                        <p><strong>Location:</strong> {submission.VenueAddress}</p>
                                        <p><strong>Start Time:</strong> {submission.StartDateTime?.ToString("MMMM dd, yyyy 'at' h:mm tt")}</p>
                                        <p><strong>Recurring:</strong> {(submission.IsRecurring ? "Yes" : "No")}</p>
                                    </div>
                                    
                                    <p><strong>What happens next?</strong></p>
                                    <p>Our team will review your submission within 24-48 hours. Once approved, your event will be visible on OnTap MN and you'll receive a confirmation email.</p>
                                    
                                    <p>If you have any questions, please don't hesitate to contact us.</p>
                                    
                                    <p style='margin-top: 30px;'>Best regards,<br/>The OnTap MN Team</p>
                                    
                                    <hr style='border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;'/>
                                    <p style='font-size: 12px; color: #6b7280;'>This is an automated confirmation email. Please do not reply to this message.</p>
                                </div>
                            </body>
                            </html>";

                        string emailSql = @"
                            INSERT INTO EmailQueue (
                                EmailQueueId, ToEmail, Subject, BodyHtml, Status, RetryCount, CreatedAt
                            )
                            VALUES (
                                @EmailQueueId, @ToEmail, @Subject, @BodyHtml, 'Pending', 0, SYSUTCDATETIME()
                            )";

                        using (SqlCommand emailCommand = new SqlCommand(emailSql, emailConnection))
                        {
                            emailCommand.Parameters.AddWithValue("@EmailQueueId", Guid.NewGuid());
                            emailCommand.Parameters.AddWithValue("@ToEmail", submission.SubmitEmail);
                            emailCommand.Parameters.AddWithValue("@Subject", emailSubject);
                            emailCommand.Parameters.AddWithValue("@BodyHtml", emailBodyHtml);

                            await emailCommand.ExecuteNonQueryAsync();
                            log.LogInformation("Confirmation email queued in database successfully");
                        }
                    }
                }
                catch (Exception emailEx)
                {
                    log.LogWarning($"Failed to queue confirmation email: {emailEx.Message}");
                    // Continue anyway - email is not critical for submission
                }

                log.LogInformation($"Event submission created with ID: {submissionId}");

                return new OkObjectResult(new { 
                    success = true, 
                    submissionId = submissionId,
                    message = "Event submitted successfully. You'll receive a confirmation email shortly." 
                });
            }
            catch (Exception ex)
            {
                log.LogError($"Error processing submission: {ex.Message}");
                return new ObjectResult(new { 
                    success = false, 
                    message = "An error occurred while processing your submission. Please try again." 
                }) 
                { 
                    StatusCode = StatusCodes.Status500InternalServerError 
                };
            }
        }
    }

    public class EventSubmission
    {
        public string SubmitName { get; set; }
        public string SubmitEmail { get; set; }
        public Guid? VenueId { get; set; }
        public string VenueName { get; set; }
        public string VenueAddress { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string DescriptionShort { get; set; }
        public string DescriptionLong { get; set; }
        public bool IsRecurring { get; set; }
        public string RecurrenceJson { get; set; }
        public DateTimeOffset? StartDateTime { get; set; }
        public DateTimeOffset? EndDateTime { get; set; }
    }
}
