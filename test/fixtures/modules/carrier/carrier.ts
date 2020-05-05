import { CarrierConfig } from "@shipengine/integration-platform-sdk";

const carrierConfig: CarrierConfig = {
  id: "57fb5964-17c5-4fbc-867b-18ff7858133f",
  name: "Test Carrier",
  description: "Test Carrier Description",
  websiteURL: "https://my-test-site.com",
  logo: {
    colorSVG: "./logo.svg",
    blackAndWhiteSVG: "./logo.svg"
  },

  deliveryServices: ["../delivery-services/ground-service.ts"],
  pickupServices: "../../configs/pickup-services/pickup-services.json",
};

// tslint:disable-next-line: no-default-export
export default carrierConfig;
