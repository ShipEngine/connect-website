const { before } = require("mocha");
const { expect } = require("chai");
// const { NewShipment, Transaction } = require("@shipengine/integration-platform-sdk")
const generateAddress = require("../../utils/address");
const appLoader = require("@shipengine/integration-platform-loader");
const { v4: uuidv4 } = require('uuid');

let newShipmentResult;
let newShipmentPOJO;
let app;
describe("The create shipment method", async () => {

  before(async () => {
    app = await appLoader.loadApp(process.cwd());

    newShipmentPOJO = {
      deliveryServiceID: "",
      shipFrom: generateAddress("US"),
      shipTo: generateAddress("US"),
      // returnTo: undefined,
      shipDateTime: new Date(),
      // insuranceProvider: undefined,
      // returns?: "",
      // billing: undefined,
      packages: []
    };

  });

  describe("test describe", async () => {
    before(async () => {

      for (let deliveryService of app.carrier.deliveryServices) {
        newShipmentPOJO.deliveryServiceID = deliveryService.id;

        const packagePOJO = {
          packagingID: deliveryService.packaging[0].id,
          label: {
            size: "4x6",
            format: "pdf"
          },
          weight: {
            value: 1.0,
            unit: "g"
          }
        };

        newShipmentPOJO.packages.push(packagePOJO);

        for(let deliveryConfirmation of deliveryService.deliveryConfirmations) {
        
          packagePOJO.deliveryConfirmationID = deliveryConfirmation.id;

          let transactionPOJO = {
            id: uuidv4(),
            isRetry: false,
            useSandbox: false,
            session: {
              id: uuidv4()
            }
          };

          newShipmentResult = await app.carrier.createShipment(transactionPOJO, newShipmentPOJO);
          console.log(newShipmentResult);
          //   for (let originCountry of deliveryService.originCountries) {
          //     for (let destinationCountry of deliveryService.destinationCountries) {
          //       for (let labelFormat of deliveryService.labelFormats) {
          //         for (let labelSize of deliveryService.labelSizes) {
          //         }A
          //       }
          //       for (let package of deliveryService.packaging) {
          //       }
          //     }
          //   }
        }
      }
    });

    it("should handle a ship date that is a date time pojo", () => {
      expect(true).to.equal(true);
    });

  })

  it("should handle a ship date that is a date time pojo");

  it("should handle a ship date that is a date time object");

  it("should handle a ship date that is a date time string");


});
