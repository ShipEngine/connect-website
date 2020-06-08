"use strict";

const apiClient = require("./mock-api/client");

async function trackShipment(transaction, trackingCriteria) {
  // STEP 1: Validation


  // STEP 2: Create the data that the carrier"s API expects

  const { trackingNumber, returns } = trackingCriteria;

  const data = {
    operation: "location_history",
    trackingNumber,
    isReturn: returns.isReturn
  };

  // STEP 3: Call the carrier"s API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return await formatTrackingResponse(response.data);

}

/**
 * Formats a shipment in the way ShipEngine expects
 */
async function formatTrackingResponse(response) {

  return {
    deliveryDateTime: response.deliveryDate,
    packages: [
      {
        packaging: {
          id: "03318192-3e6c-475f-a496-a4f17c1dbcae",
          description: response.packages[0].description,
          requiresWeight: true,
          requiresDimensions: false
        },
        dimensions: {
          length: response.packages[0].length,
          width: response.packages[0].width,
          height: response.packages[0].height,
          unit: response.packages[0].dimUnit,
        },
        weight: {
          value: response.packages[0].weight,
          unit: response.packages[0].weightUnit,
        }
      }
    ],
    events: [
      {
        name: response.trackingEvents[0].description,
        dateTime: response.deliveryDate,
        status: mapStatusCodes(response.trackingEvents[0].statusCode),
        isError: (response.trackingEvents[0].length == 0 ? false : true),
        code: response.trackingEvents[0].statusCode,
        description: response.trackingEvents[0].description,
        address: {
          company: response.trackingEvents[0].companyName,
          addressLines: [response.trackingEvents[0].addressLine1],
          cityLocality: response.trackingEvents[0].city,
          stateProvince: response.trackingEvents[0].state,
          postalCode: response.trackingEvents[0].zip,
          country: response.trackingEvents[0].country,
          timeZone: response.trackingEvents[0].timeZone,
          isResidential: (response.trackingEvents[0].addressType == "residential" ? true : false),
          coordinates: {
            latitude: response.trackingEvents[0].latitude,
            longitude: response.trackingEvents[0].longitude
          }
        },
        signer: {
          title: response.signedBy.salutation,
          given: response.signedBy.firstName,
          middle: response.signedBy.middleName,
          family: response.signedBy.lastName,
          suffix: response.signedBy.suffix
        },
        notes: [
          response.notes,
        ]
      }
    ]
  }
}

function mapStatusCodes(statusCodes) {

  switch(statusCodes) {
    case "NY":
      return "accepted";
    case "C":
      return "delivered";
    case "IT":
      return "in_transit";
  }
}

module.exports = trackShipment;
