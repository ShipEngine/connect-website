import {
  PersonName,
  PersonNamePOJO,
} from '@shipengine/integration-platform-sdk';

const dxPersonNameToString = (personName: PersonName): string => {
  return `${personName.title} ${personName.given} ${personName.middle} ${personName.family} ${personName.suffix}`;
};

const dxPersonNamePojoToString = (personName: PersonNamePOJO): string => {
  return dxPersonNameToString(<PersonName>personName);
};

export { dxPersonNameToString, dxPersonNamePojoToString };
