import {DateTimeZonePOJO} from "@shipengine/integration-platform-sdk";

const toCapiDateTimeString = (date: DateTimeZonePOJO | Date | string | undefined): string | undefined => {
  if (!date) {
    return date;
  }
  if (typeof (date) === "string") {
    return date;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new Date(date.toISOString()).toISOString();
}

export {toCapiDateTimeString};
