const axios = require("axios");

// Create an API client, configured via environment variables
module.exports = axios.create({
  method: "post",
  url: process.env.API_URL,
  timeout: Number.parseInt(process.env.API_TIMEOUT),
  headers: {
    "API-Key": process.env.API_KEY
  },
  transformResponse: [
    parseRequestData,
    mockConnectResponse,
  ]
});

/**
 * Parses the request data that was sent to the API
 */
function parseRequestData(data) {
  data = JSON.parse(data);
  return {
    origin: data.origin,
    method: data.method,
    url: data.url,
    headers: data.headers,
    ...data.json,
  };
}

/**
 * This function mimics the response that would come from the carrier API
 */
function mockConnectResponse(request) {
  if (request.operation !== "acquire_session") return request;

  let { account_id, account_password } = request;

  return {
    id: Buffer.from(`${account_id}${account_password}${Math.random()}`).toString("base64"),
    ip: request.origin,
    created: new Date().toISOString(),
    language: request.headers["Accept-Language"] || "en-US",
  };
}
