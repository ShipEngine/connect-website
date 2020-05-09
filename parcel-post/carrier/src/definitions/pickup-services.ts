import { PickupServiceDefinition } from "@shipengine/integration-platform-sdk";

const pickupServices: PickupServiceDefinition[] = [
  {
    id: "27483200-72b4-11ea-bc55-0242ac130003",
    name: "Drop Off",
    description: "Drop-off your parcel at any Parcel Post™ kiosk or locker",
  },

  {
    id: "1658e89d-ee1c-4963-a3bc-b31810556e5a",
    name: "Same-Day Pickup",
    description:
      "Schedule a same-day pickup at your business or warehouse. " +
      "Must be requested before noon on the day of pickup.",
  },

  {
    id: "0ba63044-91b9-4952-a7f2-e54a60ddde36",
    name: "Next-Day Pickup",
    description:
      "Schedule a pickup at your business or warehouse on the next business day " +
      "(Monday - Saturday, 9am - 6pm)",
  },

  {
    id: "a41d8fe5-02dd-4171-8498-6ba91f0c326d",
    name: "Flex Pickup",
    description:
      "Not in a rush? Schedule a Flex Pickup™ and we'll pick-up your parcels at " +
      "your business or warehouse within 3 business days at no cost"
  },
];

export default pickupServices;
