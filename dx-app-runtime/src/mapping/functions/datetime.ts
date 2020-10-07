import { DateTimeZone } from '@shipengine/connect-sdk';

export const mapDateTime = (
  date?: DateTimeZone
): string | undefined => {
  if (!date) {
    return undefined;
  }
  return date.toISOString();
};
