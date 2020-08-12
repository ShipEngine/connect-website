import { PickupServiceDefinition } from "@shipengine/integration-platform-sdk";

export const dropOff: PickupServiceDefinition = {
  id: "27483200-72b4-11ea-bc55-0242ac130003",
  code: "DROPOFF",
  name: "Drop Off",
  description: "Drop-off your parcel at any Parcel Post™ kiosk or locker",
};

export const sameDayPickup: PickupServiceDefinition = {
  id: "1658e89d-ee1c-4963-a3bc-b31810556e5a",
  code: "SAMEDAY",
  name: "Same-Day Pickup",
  description:
    "Schedule a same-day pickup at your business or warehouse. " +
    "Must be requested before noon on the day of pickup.",
};

export const nextDayPickup: PickupServiceDefinition = {
  id: "0ba63044-91b9-4952-a7f2-e54a60ddde36",
  code: "NEXTDAY",
  name: "Next-Day Pickup",
  description:
    "Schedule a pickup at your business or warehouse on the next business day " +
    "(Monday - Saturday, 9am - 6pm)",
};

export const flexPickup: PickupServiceDefinition = {
  id: "a41d8fe5-02dd-4171-8498-6ba91f0c326d",
  code: "FLEXPIK",
  name: "Flex Pickup",
  description:
    "Not in a rush? Schedule a Flex Pickup™ and we'll pick-up your parcels at " +
    "your business or warehouse within 3 business days at no cost"
};

export default [dropOff, sameDayPickup, nextDayPickup, flexPickup];
