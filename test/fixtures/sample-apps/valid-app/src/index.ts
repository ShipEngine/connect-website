import { CarrierDefinition } from "@shipengine/integration-platform-sdk";

const parcelPost: CarrierDefinition = {
  id: "29291ae9-99f6-4a74-baa1-84058c3e28d2",
  name: "Parcel Post",
  description: "Parcel Post provides low-cost multi-carrier delivery services within the U.S. and to major international destinations",
  websiteURL: "https://parcel-post.net",
  logo: "../logo.svg",

  pickupServices: import("./definitions/pickup-services"),

  deliveryServices: [
    import("./definitions/delivery-services/same-day"),
    import("./definitions/delivery-services/domestic-economy"),
    import("./definitions/delivery-services/domestic-standard"),
    import("./definitions/delivery-services/international-economy"),
    import("./definitions/delivery-services/international-priority"),
  ],

  createLabel: import("./methods/create-label"),
  getRates: import("./methods/get-rates"),
  schedulePickup: import("./methods/schedule-pickup"),
  cancelPickup: import("./methods/cancel-pickup"),
};

export default parcelPost;
