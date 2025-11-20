using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System.Text.RegularExpressions;
using System.Linq;
using Microsoft.Data.SqlClient;

namespace on_tap_functions_api
{
    public static class UploadImage
    {
        [FunctionName("UploadImage")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("UploadImage function processing a request.");

            try
            {
                // Read the form data first
                var form = await req.ReadFormAsync();
                
                // Validate form data
                if (form.Files == null || !form.Files.Any())
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "No file uploaded" 
                    });
                }

                var file = form.Files[0];
                var submissionIdStr = form["submissionId"].ToString();
                var imageType = form["imageType"].ToString(); // "banner" or "marketing"

                // Validate inputs
                if (string.IsNullOrEmpty(submissionIdStr) || !Guid.TryParse(submissionIdStr, out Guid submissionId))
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "Valid submissionId is required" 
                    });
                }

                if (imageType != "banner" && imageType != "marketing")
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "Invalid image type. Must be 'banner' or 'marketing'" 
                    });
                }

                // Validate file type
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
                var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
                
                if (!allowedExtensions.Any(ext => ext == fileExtension))
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "Invalid file type. Only JPG, PNG, and WebP are allowed" 
                    });
                }

                // Validate file size (max 5MB)
                if (file.Length > 5 * 1024 * 1024)
                {
                    return new BadRequestObjectResult(new { 
                        success = false, 
                        message = "File too large. Maximum size is 5MB" 
                    });
                }

                // Generate unique filename with submission ID
                var fileName = $"{imageType}{fileExtension}";
                var blobPath = $"submissions/{submissionId}/{fileName}";

                // Upload to Azure Blob Storage
                var connectionString = Environment.GetEnvironmentVariable("BlobStorageConnectionString");
                
                if (string.IsNullOrEmpty(connectionString))
                {
                    log.LogError("BlobStorageConnectionString is not configured");
                    return new ObjectResult(new { 
                        success = false, 
                        message = "Image storage is not properly configured. Please contact support." 
                    }) 
                    { 
                        StatusCode = StatusCodes.Status500InternalServerError 
                    };
                }
                
                var blobServiceClient = new BlobServiceClient(connectionString);
                var containerClient = blobServiceClient.GetBlobContainerClient("event-images");
                
                // Ensure container exists with public blob access
                await containerClient.CreateIfNotExistsAsync(PublicAccessType.Blob);
                
                var blobClient = containerClient.GetBlobClient(blobPath);

                // Set content type
                var blobHttpHeaders = new BlobHttpHeaders
                {
                    ContentType = GetContentType(fileExtension)
                };

                // Upload file
                using (var stream = file.OpenReadStream())
                {
                    await blobClient.UploadAsync(stream, new BlobUploadOptions
                    {
                        HttpHeaders = blobHttpHeaders
                    });
                }

                var imageUrl = blobClient.Uri.ToString();

                // Save image reference to database
                var sqlConnectionString = Environment.GetEnvironmentVariable("SQLConnectionString");
                using (SqlConnection connection = new SqlConnection(sqlConnectionString))
                {
                    await connection.OpenAsync();

                    // Create SubmissionImages table if it doesn't exist
                    string createTableSql = @"
                        IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'SubmissionImages')
                        BEGIN
                            CREATE TABLE SubmissionImages (
                                ImageId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
                                SubmissionId UNIQUEIDENTIFIER NOT NULL,
                                ImageType NVARCHAR(50) NOT NULL,
                                BlobPath NVARCHAR(500) NOT NULL,
                                BlobUrl NVARCHAR(1000) NOT NULL,
                                UploadedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
                                FOREIGN KEY (SubmissionId) REFERENCES Submissions(SubmissionId)
                            )
                        END";

                    using (SqlCommand createCmd = new SqlCommand(createTableSql, connection))
                    {
                        await createCmd.ExecuteNonQueryAsync();
                    }

                    // Check if submission exists
                    string checkSql = "SELECT COUNT(*) FROM Submissions WHERE SubmissionId = @SubmissionId";
                    using (SqlCommand checkCmd = new SqlCommand(checkSql, connection))
                    {
                        checkCmd.Parameters.AddWithValue("@SubmissionId", submissionId);
                        int count = (int)await checkCmd.ExecuteScalarAsync();
                        
                        if (count == 0)
                        {
                            log.LogWarning($"Submission not found: {submissionId}");
                            // Continue anyway - submission might be in process
                        }
                    }

                    // Delete existing image of same type for this submission (replace if re-uploading)
                    string deleteSql = "DELETE FROM SubmissionImages WHERE SubmissionId = @SubmissionId AND ImageType = @ImageType";
                    using (SqlCommand deleteCmd = new SqlCommand(deleteSql, connection))
                    {
                        deleteCmd.Parameters.AddWithValue("@SubmissionId", submissionId);
                        deleteCmd.Parameters.AddWithValue("@ImageType", imageType);
                        await deleteCmd.ExecuteNonQueryAsync();
                    }

                    // Insert new image record
                    string insertSql = @"
                        INSERT INTO SubmissionImages (ImageId, SubmissionId, ImageType, BlobPath, BlobUrl, UploadedAt)
                        VALUES (NEWID(), @SubmissionId, @ImageType, @BlobPath, @BlobUrl, SYSUTCDATETIME())";

                    using (SqlCommand insertCmd = new SqlCommand(insertSql, connection))
                    {
                        insertCmd.Parameters.AddWithValue("@SubmissionId", submissionId);
                        insertCmd.Parameters.AddWithValue("@ImageType", imageType);
                        insertCmd.Parameters.AddWithValue("@BlobPath", blobPath);
                        insertCmd.Parameters.AddWithValue("@BlobUrl", imageUrl);
                        await insertCmd.ExecuteNonQueryAsync();
                    }
                }

                log.LogInformation($"Image uploaded successfully: {imageUrl}");

                return new OkObjectResult(new { 
                    success = true, 
                    imageUrl = imageUrl,
                    fileName = fileName,
                    message = "Image uploaded successfully" 
                });
            }
            catch (Exception ex)
            {
                log.LogError($"Error uploading image: {ex.Message}");
                return new ObjectResult(new { 
                    success = false, 
                    message = "An error occurred while uploading the image. Please try again." 
                }) 
                { 
                    StatusCode = StatusCodes.Status500InternalServerError 
                };
            }
        }

        private static string SanitizeForPath(string input)
        {
            // Remove invalid path characters and spaces
            var sanitized = Regex.Replace(input, @"[^\w\s-]", "");
            sanitized = Regex.Replace(sanitized, @"\s+", "-");
            sanitized = sanitized.Trim('-').ToLowerInvariant();
            
            // Limit length
            if (sanitized.Length > 50)
                sanitized = sanitized.Substring(0, 50);
            
            return sanitized;
        }

        private static string GetContentType(string extension)
        {
            return extension.ToLowerInvariant() switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".webp" => "image/webp",
                _ => "application/octet-stream"
            };
        }
    }
}
