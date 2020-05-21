'use strict';

const axios = require('axios');
const generateLabel = require('./generate-label');
const quoteRates = require('./quote-rates');
const cancelShipment = require('./cancel-shipments');
const trackShipment = require('./track-shipment')


// Read config values from environment variables
const API_URL = process.env.API_URL || 'https://httpbin.org/anything';
const API_TIMEOUT = Number.parseInt(process.env.API_TIMEOUT || '5000');
const API_KEY = process.env.API_KEY || '';


// Create an API client, configured via environment variables
const apiClient = axios.create({
  method: 'post',
  url: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'API-Key': API_KEY
  },
  transformResponse(data) {
    data = JSON.parse(data);

    // HttpBin echoes back the request data
    let request = {
      method: data.method,
      url: data.url,
      headers: data.headers,
      origin: data.origin,
      ...data.json
    };

    switch (request.operation) {
      case 'generate_label':
        return generateLabel(request);

      case 'quote_rates':
        return quoteRates(request);

      case 'cancel_shipments':
        return cancelShipment(request);

      case 'track_shipment':
        return trackShipment(request);
    }
  }
});

module.exports = apiClient;
