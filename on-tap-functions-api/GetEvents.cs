using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace on_tap_functions_api
{
    public class GetEvents
    {
        [Function("GetEvents")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequestData req,
            FunctionContext executionContext)
        {
            var logger = executionContext.GetLogger("GetEvents");
            logger.LogInformation("C# HTTP trigger function processed a request.");

            string name = null;
            
            // Try to get name from query string
            var query = System.Web.HttpUtility.ParseQueryString(req.Url.Query);
            name = query["name"];

            // If not in query string, try body
            if (string.IsNullOrEmpty(name))
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                if (!string.IsNullOrEmpty(requestBody))
                {
                    dynamic data = JsonConvert.DeserializeObject(requestBody);
                    name = data?.name;
                }
            }

            string responseMessage = string.IsNullOrEmpty(name)
                ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
                : $"Hello, {name}. This HTTP triggered function executed successfully.";

            var response = req.CreateResponse(HttpStatusCode.OK);
            await response.WriteAsJsonAsync(new { message = responseMessage });
            return response;
        }
    }
}
