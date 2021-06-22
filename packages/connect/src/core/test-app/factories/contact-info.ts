import { ContactInfoPOJO } from '@shipengine/connect-sdk';

export function buildContactInfo(countryCode: string): ContactInfoPOJO {
  const contactInfoMap: Record<string, ContactInfoPOJO> = {
    'US-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '123-456-7890',
    },
    'US-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '987-654-3210',
    },
    'CA-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+14162145577',
    },
    'CA-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+14162145577',
    },
    'MX-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+528002880888',
    },
    'MX-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+528002880888',
    },
    'GB-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+442072408591',
    },
    'GB-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+442076231745',
    },
    'PT-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+351218479050',
    },
    'PT-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+351210529168',
    },
    'ES-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+34912758111',
    },
    'ES-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+34910502945',
    },
    'FR-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+33142681120',
    },
    'FR-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+33142250432',
    },
    'NL-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+31205300800',
    },
    'NL-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+31204124863',
    },
    'BE-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+3222181789',
    },
    'BE-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+3225371860',
    },
    'DE-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+493020632997',
    },
    'DE-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+493029387610',
    },
    'IT-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+390637354183',
    },
    'IT-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+390694429974',
    },
    'DK-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+4529396709',
    },
    'DK-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+4523708373',
    },
    'CH-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+41434214254',
    },
    'CH-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+41432330711',
    },
    'AT-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+4313366332520',
    },
    'AT-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+43512574347',
    },
    'NO-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+4745862427',
    },
    'NO-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+4746742557',
    },
    'SE-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+46722353087',
    },
    'SE-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+46765219262',
    },
    'FI-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+358207301227',
    },
    'FI-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+358207301224',
    },
    'PL-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+48713861915',
    },
    'PL-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+48713861617',
    },
    'CZ-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+420235013545',
    },
    'CZ-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+420235013543',
    },
    'LU-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+35226512156',
    },
    'LU-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+352261517562',
    },
    'AU-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+61292680184',
    },
    'AU-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+611800787289',
    },
    'NZ-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+6444724861',
    },
    'NZ-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+6433662090',
    },
    'BR-from': {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+551135951473',
    },
    'BR-to': {
      name: 'Jane Doe',
      email: 'Jane.doe@gmail.com',
      phoneNumber: '+558007778252',
    },
  };

  return contactInfoMap[countryCode];
}
