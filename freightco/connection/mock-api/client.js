"use strict";

const axios = require("axios");
const authenticate = require("./authenticate");


// Read config values from environment variables
const API_URL = process.env.API_URL || "https://httpbin.org/anything";
const API_TIMEOUT = Number.parseInt(process.env.API_TIMEOUT || "5000");
const API_KEY = process.env.API_KEY || "";


// Create an API client, configured via environment variables
const apiClient = axios.create({
  method: "post",
  url: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "API-Key": API_KEY
  },
  transformResponse(data) {
    data = JSON.parse(data);

    switch (data.json.operation) {
      case "authenticate":
        return authenticate(data.json);
    }
  }
});

module.exports = apiClient;
