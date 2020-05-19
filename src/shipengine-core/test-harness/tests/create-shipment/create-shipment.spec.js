const generateAddress = require("../../utils/address");
const { v4: uuidv4 } = require('uuid');
const loadApp = require("../../utils/load-app");
const generateCarrierTests = require("../../utils/generate-tests");

let tests;

/**
 * Need to load the app to be able to gen
 */
async function initialSetup() {
  let app = await loadApp();
  tests = generateTestData(app);
}

initialSetup();

setTimeout(() => {
  describe("The create shipment method", () => {
    generateCarrierTests(tests, "createShipment");
  });

  run();
}, 1000);

function generateTestData(app) {

  let generatedTests = [];

  let newShipmentPOJO = {
    shipFrom: generateAddress("US"),
    shipTo: generateAddress("US"),
    // returnTo: undefined,
    shipDateTime: new Date(),
    // insuranceProvider: undefined,
    // returns?: "",
    // billing: undefined,
    packages: []
  };

  let testCounter = 0;
  for (let deliveryService of app.carrier.deliveryServices) {
    newShipmentPOJO.deliveryService = { id: deliveryService.id };

    // TODO: randomize weight values
    // TODO: Add support for calling from different countries
    // TODO: Test different date time 
    for (let labelFormat of deliveryService.labelFormats) {

      for (let labelSize of deliveryService.labelSizes) {

        for (let deliveryConfirmation of deliveryService.deliveryConfirmations) {

          let transactionPOJO = {
            id: uuidv4(),
            isRetry: false,
            useSandbox: false,
            session: {
              id: uuidv4()
            }
          };

          const packagePOJO = {
            deliveryConfirmation: { id: deliveryConfirmation.id },
            packaging: { id: deliveryService.packaging[0].id },
            label: {
              size: labelSize,
              format: labelFormat
            },
            weight: {
              value: 1.0,
              unit: "g"
            }
          };

          newShipmentPOJO.packages = [];
          newShipmentPOJO.packages.push(packagePOJO);

          let debugString;
          if (process.env["TEST_DEBUG"]) {
            debugString = JSON.stringify(newShipmentPOJO, undefined, 2);
          }

          testCounter = testCounter + 1;
          let message = 
          `Create Shipment (${testCounter}): should return a valid shipment for the following request:
          
          Delivery Service: ${deliveryService.name}
          Label Format: ${labelFormat}
          Label Size: ${labelSize}
          Delivery Confirmation: ${deliveryConfirmation.name}
          ${debugString ? debugString : ""}`;

          generatedTests.push([transactionPOJO, newShipmentPOJO, message]);
          //   for (let originCountry of deliveryService.originCountries) {
          //     for (let destinationCountry of deliveryService.destinationCountries) {
          //       for (let package of deliveryService.packaging) {
          //       }
          //     }
          //   }
        }

      }
    }

  }

  return generatedTests;
}