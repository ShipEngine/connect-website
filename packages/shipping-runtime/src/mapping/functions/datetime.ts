import { DateTimeZone } from "@shipengine/connect-sdk";

export const mapDateTime = (date?: DateTimeZone): string | undefined => {
  if (!date) {
    return undefined;
  }
  const dt = date.toDate();
  const utcDate = new Date(
    Date.UTC(
      dt.getUTCFullYear(),
      dt.getUTCMonth(),
      dt.getUTCDate(),
      dt.getUTCHours(),
      dt.getUTCMinutes(),
      dt.getUTCSeconds()
    )
  );
  return utcDate.toISOString();
};
