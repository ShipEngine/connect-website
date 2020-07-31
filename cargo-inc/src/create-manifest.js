const apiClient = require('./mock-api/client');

async function createManifest(transaction, manifest) {
  // STEP 1: Validation


  // STEP 2: Create the data that the carrier"s API expects

  const data = {
    operation: "generate_eod",
    session_id: transaction.session.id,
    fromAddress: manifest.shipFrom,
    startDate: manifest.openDateTime,
    endDate: manifest.closeDateTime,
  };

  // STEP 3: Call the carrier"s API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return formatManifestResponse(response.data);
}

/**
 * Formats a shipment in the way ShipEngine expects
 */
async function formatManifestResponse(response) {
  const deliveryTzSplit = response.deliveryDate.split();
  const eventTzSplit = response.trackingEvents[0].date.split();

  return {
    manifests:{
      shipments: [
        {
          trackingNumber: response.data[0].trackingNumber,

        },
        {
          trackingNumber: response.data[1].trackingNumber,
        }
      ]
    }
  }
}

module.exports = createManifest;
