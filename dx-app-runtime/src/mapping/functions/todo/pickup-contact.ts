import { ContactInfoConfig } from "@shipengine/ipaas"
import { PickupContactDetails } from "../capi/models/pickup-contact-details"

 export default (contact: PickupContactDetails | null | undefined): ContactInfoConfig => {
  return {
    name: `${contact?.first_name} ${contact?.last_name}`.trim(),
    email: contact?.email,
    phoneNumber: contact?.phone_number,
    phoneNumberExtension: contact?.phone_number_extension || undefined
  }
 }
