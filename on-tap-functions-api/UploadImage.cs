using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System.Text.RegularExpressions;
using System.Linq;
using System.Collections.Generic;

namespace on_tap_functions_api
{
    public class UploadImage
    {
        [Function("UploadImage")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequestData req,
            FunctionContext executionContext)
        {
            var logger = executionContext.GetLogger("UploadImage");
            logger.LogInformation("UploadImage function processing a request.");

            try
            {
                // Parse multipart form data
                var formData = await ParseMultipartFormAsync(req);
                
                // Validate form data
                if (!formData.Files.Any())
                {
                    var badResponse1 = req.CreateResponse(HttpStatusCode.BadRequest);
                    await badResponse1.WriteAsJsonAsync(new { 
                        success = false, 
                        message = "No file uploaded" 
                    });
                    return badResponse1;
                }

                var file = formData.Files.First();
                var submissionIdStr = formData.Fields.ContainsKey("submissionId") ? formData.Fields["submissionId"] : null;
                var imageType = formData.Fields.ContainsKey("imageType") ? formData.Fields["imageType"] : null;

                // Validate inputs
                if (string.IsNullOrEmpty(submissionIdStr) || !Guid.TryParse(submissionIdStr, out Guid submissionId))
                {
                    var badResponse2 = req.CreateResponse(HttpStatusCode.BadRequest);
                    await badResponse2.WriteAsJsonAsync(new { 
                        success = false, 
                        message = "Valid submissionId is required" 
                    });
                    return badResponse2;
                }

                if (imageType != "banner" && imageType != "marketing")
                {
                    var badResponse3 = req.CreateResponse(HttpStatusCode.BadRequest);
                    await badResponse3.WriteAsJsonAsync(new { 
                        success = false, 
                        message = "Invalid image type. Must be 'banner' or 'marketing'" 
                    });
                    return badResponse3;
                }

                // Validate file type
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
                var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
                
                if (!allowedExtensions.Any(ext => ext == fileExtension))
                {
                    var badResponse4 = req.CreateResponse(HttpStatusCode.BadRequest);
                    await badResponse4.WriteAsJsonAsync(new { 
                        success = false, 
                        message = "Invalid file type. Only JPG, PNG, and WebP are allowed" 
                    });
                    return badResponse4;
                }

                // Validate file size (max 5MB)
                if (file.Content.Length > 5 * 1024 * 1024)
                {
                    var badResponse5 = req.CreateResponse(HttpStatusCode.BadRequest);
                    await badResponse5.WriteAsJsonAsync(new { 
                        success = false, 
                        message = "File too large. Maximum size is 5MB" 
                    });
                    return badResponse5;
                }

                // Generate unique filename with submission ID
                var fileName = $"{imageType}{fileExtension}";
                var blobPath = $"submissions/{submissionId}/{fileName}";

                // Upload to Azure Blob Storage
                var connectionString = Environment.GetEnvironmentVariable("BlobStorageConnectionString");
                
                if (string.IsNullOrEmpty(connectionString))
                {
                    logger.LogError("BlobStorageConnectionString is not configured");
                    var errorResponse1 = req.CreateResponse(HttpStatusCode.InternalServerError);
                    await errorResponse1.WriteAsJsonAsync(new { 
                        success = false, 
                        message = "Image storage is not properly configured. Please contact support." 
                    });
                    return errorResponse1;
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
                file.Content.Position = 0;
                await blobClient.UploadAsync(file.Content, new BlobUploadOptions
                {
                    HttpHeaders = blobHttpHeaders
                });

                var imageUrl = blobClient.Uri.ToString();

                logger.LogInformation($"Image uploaded successfully: {imageUrl}");

                var response = req.CreateResponse(HttpStatusCode.OK);
                await response.WriteAsJsonAsync(new { 
                    success = true, 
                    imageUrl = imageUrl,
                    fileName = fileName,
                    message = "Image uploaded successfully" 
                });
                return response;
            }
            catch (Exception ex)
            {
                logger.LogError($"Error uploading image: {ex.Message}");
                var errorResponse = req.CreateResponse(HttpStatusCode.InternalServerError);
                await errorResponse.WriteAsJsonAsync(new { 
                    success = false, 
                    message = "An error occurred while uploading the image. Please try again." 
                });
                return errorResponse;
            }
        }

        private static async Task<MultipartFormData> ParseMultipartFormAsync(HttpRequestData req)
        {
            var formData = new MultipartFormData();
            var contentType = req.Headers.GetValues("Content-Type").FirstOrDefault();
            
            if (string.IsNullOrEmpty(contentType) || !contentType.Contains("multipart/form-data"))
            {
                return formData;
            }

            var boundary = contentType.Split(';')
                .Select(x => x.Trim())
                .FirstOrDefault(x => x.StartsWith("boundary="))
                ?.Substring("boundary=".Length)
                .Trim('"');

            if (string.IsNullOrEmpty(boundary))
            {
                return formData;
            }

            using var reader = new StreamReader(req.Body);
            var content = await reader.ReadToEndAsync();
            var parts = content.Split(new[] { $"--{boundary}" }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var part in parts)
            {
                if (part.Trim() == "--" || string.IsNullOrWhiteSpace(part))
                    continue;

                var sections = part.Split(new[] { "\r\n\r\n" }, 2, StringSplitOptions.None);
                if (sections.Length < 2)
                    continue;

                var headers = sections[0];
                var body = sections[1].TrimEnd('\r', '\n', '-');

                var contentDisposition = headers.Split('\n')
                    .FirstOrDefault(h => h.Trim().StartsWith("Content-Disposition:", StringComparison.OrdinalIgnoreCase));

                if (contentDisposition == null)
                    continue;

                var nameMatch = Regex.Match(contentDisposition, @"name=""([^""]+)""");
                var filenameMatch = Regex.Match(contentDisposition, @"filename=""([^""]+)""");

                if (!nameMatch.Success)
                    continue;

                var fieldName = nameMatch.Groups[1].Value;

                if (filenameMatch.Success)
                {
                    // This is a file
                    var fileName = filenameMatch.Groups[1].Value;
                    var fileContent = System.Text.Encoding.Latin1.GetBytes(body);
                    formData.Files.Add(new UploadedFile
                    {
                        FieldName = fieldName,
                        FileName = fileName,
                        Content = new MemoryStream(fileContent)
                    });
                }
                else
                {
                    // This is a regular field
                    formData.Fields[fieldName] = body.Trim();
                }
            }

            return formData;
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

    public class MultipartFormData
    {
        public Dictionary<string, string> Fields { get; set; } = new Dictionary<string, string>();
        public List<UploadedFile> Files { get; set; } = new List<UploadedFile>();
    }

    public class UploadedFile
    {
        public string FieldName { get; set; }
        public string FileName { get; set; }
        public Stream Content { get; set; }
    }
}
