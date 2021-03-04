import { PickupWindow } from '@ipaas/capi/models';
import { TimeRangePOJO } from '@shipengine/connect';
import { mapDateTimeZone } from '.';

export const mapTimeWindow = (window: PickupWindow | null): TimeRangePOJO => {
	return {
		startDateTime: mapDateTimeZone(
			window?.pickup_date,
			window?.start_time,
			window?.time_zone_iana,
		),
		endDateTime: mapDateTimeZone(
			window?.pickup_date,
			window?.end_time,
			window?.time_zone_iana,
		),
	};
};
