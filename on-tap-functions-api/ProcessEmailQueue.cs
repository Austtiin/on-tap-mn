using System;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace on_tap_functions_api
{
    public class ProcessEmailQueue
    {
        [Function("ProcessEmailQueue")]
        public async Task Run(
            [QueueTrigger("email-notifications", Connection = "EmailQueueStorage")] string queueMessage,
            FunctionContext executionContext)
        {
            var logger = executionContext.GetLogger("ProcessEmailQueue");
            logger.LogInformation($"Processing email queue message: {queueMessage}");

            try
            {
                var emailData = JsonConvert.DeserializeObject<EmailMessage>(queueMessage);

                // TODO: Integrate with SendGrid, Azure Communication Services, or another email provider
                // For now, just log the email details
                logger.LogInformation($"Email to: {emailData.To}");
                logger.LogInformation($"Subject: {emailData.Subject}");
                logger.LogInformation($"Body: {emailData.Body}");

                // Simulate sending email
                await Task.Delay(100);

                logger.LogInformation($"Email sent successfully for submission: {emailData.SubmissionId}");
            }
            catch (Exception ex)
            {
                logger.LogError($"Error processing email: {ex.Message}");
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
