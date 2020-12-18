import { ShipmentStatus, Transaction } from '@shipengine/connect-sdk';
import {
	TrackEvent,
	StandardizedStatusCodes,
	TrackingInfo as CapiTrackingInfo
} from '@ipaas/capi/models'
import {
	TrackingResponse,
} from '@ipaas/capi/responses';

import {
	TrackingEvent,
	TrackingInfo,
} from '@shipengine/connect-sdk/lib/internal';

export const mapTrackingStatus = (
	shipmentStatus: ShipmentStatus,
): StandardizedStatusCodes => {
	switch (shipmentStatus) {
		case ShipmentStatus.Accepted:
			return StandardizedStatusCodes.Accepted;
		case ShipmentStatus.InTransit:
			return StandardizedStatusCodes.InTransit;
		case ShipmentStatus.DeliveryAttempted:
			return StandardizedStatusCodes.DeliveryAttempt;
		case ShipmentStatus.Delivered:
			return StandardizedStatusCodes.Delivered;
		case ShipmentStatus.Exception:
			return StandardizedStatusCodes.Exception;
		case ShipmentStatus.Unknown:
			return StandardizedStatusCodes.Unknown;
		case ShipmentStatus.NotYetInSystem:
			return StandardizedStatusCodes.NotYetInSystem;
		default:
			return StandardizedStatusCodes.Unknown;
	}
};

export const mapTrackEvent = (event: TrackingEvent): TrackEvent => {
	return {
		city: event.address?.cityLocality,
		company: event.address?.company,
		country: event.address?.country,
		description: event.description,
		event_code: event.code,
		event_datetime: event.dateTime.toISOString(),
		postal_code: event.address?.postalCode,
		state: event.address?.stateProvince,
		signer: event.signer ? event.signer.given : undefined,
	};
};

export const mapTrackingResponse = (
	trackingInfo: TrackingInfo,
	transaction: Transaction,
): TrackingResponse => {
	const errorEvent = {
		description: '',
		problemCode: '',
		problemDescription: '',
	};

	if (trackingInfo.hasError) {
		const error = trackingInfo.events.find((event) => {
			event.isError;
		});
		if (error) {
			errorEvent.description = error.description;
			errorEvent.problemDescription = error.description;
			errorEvent.problemCode = error.code;
		}
	}

	const capiInfo: CapiTrackingInfo = {
		actual_delivery_datetime: trackingInfo.deliveryDateTime?.toISOString(),
		carrier_status_code: trackingInfo.latestEvent.code,
		carrier_status_description: trackingInfo.latestEvent.description,
		error_description: errorEvent.description,
		events: trackingInfo.events.map(mapTrackEvent),
		last_event: mapTrackEvent(trackingInfo.latestEvent),
		package_count: trackingInfo.packages?.length ?? 0,
		shipped_datetime: trackingInfo.shipDateTime?.toISOString(),
		shipping_problem: trackingInfo.hasError,
		shipping_problem_code: errorEvent.problemCode,
		shipping_problem_description: errorEvent.problemDescription,
		standardized_status_code: mapTrackingStatus(trackingInfo.status),
		tracking_number: trackingInfo.trackingNumber,
	};

	return {
		tracking_info: capiInfo,
		metadata: {
			...transaction.session,
		},
	};
};
