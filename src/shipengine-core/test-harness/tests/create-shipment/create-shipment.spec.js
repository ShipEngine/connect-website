const generateAddress = require("../../utils/address");
const { v4: uuidv4 } = require('uuid');
const loadApp = require("../../utils/load-app");

let tests;

/**
 * Need to load the app to be able to gen
 */
async function initialSetup() {
  let app = await loadApp();
  tests = generateTests(app);
}

initialSetup();

setTimeout(() => {
  describe("The create shipment method", () => {
    const onlyTestNumber = process.env["TEST-NUMBER"];

    for (let i = 0; i < tests.length; i++) {
      let generatedTest = tests[i];
      if (!onlyTestNumber || (onlyTestNumber && i === Number(onlyTestNumber) - 1)) {
        it(generatedTest[2], async () => {
          // TODO: error message is not formatted very well, make it more readable for the end user.
          await expect(app.carrier.createShipment(generatedTest[0], generatedTest[1])).to.not.be.rejected;
        });
      }
    }
  });

  run();
}, 1000);

function generateTests(app) {

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

          let debugString = JSON.stringify(newShipmentPOJO, undefined, 2);

          testCounter = testCounter + 1;
          let message = `Create Shipment (${testCounter}): should return a valid shipment for the following request:
          Delivery Service: ${deliveryService.name}
          Label Format: ${labelFormat}
          Label Size: ${labelSize}
          Delivery Confirmation: ${deliveryConfirmation.name}`;

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