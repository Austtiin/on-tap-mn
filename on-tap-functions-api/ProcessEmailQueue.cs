using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace on_tap_functions_api
{
    public static class ProcessEmailQueue
    {
        [FunctionName("ProcessEmailQueue")]
        public static async Task Run(
            [QueueTrigger("email-notifications", Connection = "EmailQueueStorage")] string queueMessage,
            ILogger log)
        {
            log.LogInformation($"Processing email queue message: {queueMessage}");

            try
            {
                var emailData = JsonConvert.DeserializeObject<EmailMessage>(queueMessage);

                // TODO: Integrate with SendGrid, Azure Communication Services, or another email provider
                // For now, just log the email details
                log.LogInformation($"Email to: {emailData.To}");
                log.LogInformation($"Subject: {emailData.Subject}");
                log.LogInformation($"Body: {emailData.Body}");

                // Simulate sending email
                await Task.Delay(100);

                log.LogInformation($"Email sent successfully for submission: {emailData.SubmissionId}");
            }
            catch (Exception ex)
            {
                log.LogError($"Error processing email: {ex.Message}");
                throw; // Re-throw to allow Azure Functions to handle retry logic
            }
        }
    }

    public class EmailMessage
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public Guid SubmissionId { get; set; }
    }
}
