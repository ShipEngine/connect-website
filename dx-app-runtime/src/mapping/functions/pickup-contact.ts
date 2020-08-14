import { ContactInfoPOJO } from '@shipengine/connect-sdk';
import { PickupContactDetails } from '@ipaas/capi/models';

export default (
  contact: PickupContactDetails | null | undefined
): ContactInfoPOJO => {
  return {
    name: `${contact?.first_name} ${contact?.last_name}`.trim(),
    email: contact?.email,
    phoneNumber: contact?.phone_number,
  };
};
