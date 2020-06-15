import { ContactInfoPOJO } from '@shipengine/integration-platform-sdk';
import { PickupContactDetails } from '@ipaas/capi/models';

export default (
  contact: PickupContactDetails | null | undefined
): ContactInfoPOJO => {
  return {
    name: `${contact?.first_name} ${contact?.last_name}`.trim(),
    email: contact?.email,
    phoneNumber: contact?.phone_number,
    phoneNumberExtension: contact?.phone_number_extension || undefined
  };
};
