import { ContactInfoPOJO } from '@shipengine/integration-platform-sdk';

export function buildContactInfo(countryCode: string): ContactInfoPOJO {
  const contactInfoMap: Record<string, ContactInfoPOJO> = {
    "US-from": {
      name: "John Doe",
      email: "john.doe@gmail.com",
      phoneNumber: "123-456-7890",
    },
    "US-to": {
      name: "Jane Doe",
      email: "Jane.doe@gmail.com",
      phoneNumber: "987-654-3210",
    },
    "CA-from": {
      name: "John Doe",
      email: "john.doe@gmail.com",
      phoneNumber: "123-456-7890",
    },
    "CA-to": {
      name: "Jane Doe",
      email: "Jane.doe@gmail.com",
      phoneNumber: "987-654-3210",
    },
    "MX-from": {
      name: "John Doe",
      email: "john.doe@gmail.com",
      phoneNumber: "123-456-7890",
    },
    "MX-to": {
      name: "Jane Doe",
      email: "Jane.doe@gmail.com",
      phoneNumber: "987-654-3210",
    }
  }

  return contactInfoMap[countryCode];

}
