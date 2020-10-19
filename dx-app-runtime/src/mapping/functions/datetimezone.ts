import { PickupWindow } from '@ipaas/capi';
import { DateTimeZonePOJO, TimeRangePOJO } from '@shipengine/connect';

export const mapDateTimeZone = (
	date?: string | null,
	time?: string | null,
	timeZone?: string | null,
): DateTimeZonePOJO | undefined => {
	if (!date || !time || !timeZone) {
		return undefined;
	}
	const [dateString] = new Date(date).toISOString().split('T');
	const [, timeString] = new Date(time).toISOString().split('T');
	return {
		value: `${dateString}T${timeString.slice(0, -5)}`,
		timeZone: timeZone,
	};
};
