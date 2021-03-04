import { ContactInfoPOJO } from "@shipengine/connect-sdk";
import { PickupContactDetails } from "@shipengine/connect-carrier-api/lib/models";

export const mapPickupContact = (
  contact: PickupContactDetails | null | undefined
): ContactInfoPOJO => {
  return {
    name: `${contact?.first_name || ""} ${contact?.last_name || ""}`.trim(),
    email: contact?.email || "",
    phoneNumber: `${contact?.phone_number || ""} ${
      contact?.phone_number_extension || ""
    }`.trim(),
  };
};
