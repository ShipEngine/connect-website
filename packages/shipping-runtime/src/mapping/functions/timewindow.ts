import { PickupWindow } from "@shipengine/connect-carrier-api/lib/models";
import { TimeRangePOJO } from "@shipengine/connect-sdk";
import { mapDateTimeZone } from ".";

export const mapTimeWindow = (window: PickupWindow | null): TimeRangePOJO => {
  return {
    startDateTime: mapDateTimeZone(
      window?.pickup_date,
      window?.start_time,
      window?.time_zone_iana
    ),
    endDateTime: mapDateTimeZone(
      window?.pickup_date,
      window?.end_time,
      window?.time_zone_iana
    ),
  };
};
