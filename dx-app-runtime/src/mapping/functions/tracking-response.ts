import {
  ShipmentStatus,
  Transaction,
} from '@shipengine/integration-platform-sdk';

import {
  EventElement,
  StandardizedStatusCodes,
  TrackingInfo as CapiTrackingInfo,
  TrackResponse,
} from '@ipaas/capi/responses';

import { TrackingEvent, TrackingInfo } from '@shipengine/integration-platform-sdk/lib/internal';
import { dxPersonNameToString } from './person-name';


const mapStatusCode = (
  shipmentStatus: ShipmentStatus
): StandardizedStatusCodes => {
  switch (shipmentStatus) {
    case ShipmentStatus.Accepted:
      return StandardizedStatusCodes.AC;
    case ShipmentStatus.InTransit:
      return StandardizedStatusCodes.It;
    case ShipmentStatus.DeliveryAttempted:
      return StandardizedStatusCodes.At;
    case ShipmentStatus.Delivered:
      return StandardizedStatusCodes.De;
    case ShipmentStatus.Exception:
      return StandardizedStatusCodes.Ex;
  }
};

const mapTrackEvent = (event: TrackingEvent): EventElement => {
  return {
    city: event.address?.cityLocality,
    company: event.address?.company,
    country: event.address?.country,
    description: event.description,
    event_code: event.code,
    event_datetime: event.dateTime.toISOString(),
    postal_code: event.address?.postalCode,
    state: event.address?.stateProvince,
    signer: event.signer ? dxPersonNameToString(event.signer) : undefined,
    geo: undefined, // TODO: DX does not have geo for CAPI tracking event
  };
};

export const mapTrackingResponse = (
  trackingInfo: TrackingInfo,
  transaction: Transaction
): TrackResponse => {
  const totalWeight = trackingInfo.packages
    .map((p) => p.weight?.value ?? 0)
    .reduce((total, current) => {
      return total + current;
    }, 0);

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
    carrierEnum: 0, //deprecated
    carrier_name: '', //not used according to Justin
    carrier_status_code: mapStatusCode(trackingInfo.latestEvent.status),
    carrier_status_description: trackingInfo.latestEvent.description,
    dimensions: undefined, //TODO: DX tracking -> CAPI response: should dimensions be the first package?
    error_description: errorEvent.description,
    estimated_delivery_datetime: undefined, // TODO: DX TrackingInfo doesn't seem to have estimated delivery
    events: trackingInfo.events.map(mapTrackEvent),
    last_event: mapTrackEvent(trackingInfo.latestEvent),
    package_count: trackingInfo.packages?.length ?? 0,
    packaging: undefined, //TODO: dont know what capi-tracking-info.packaging string means
    service: undefined, // TODO DX TrackingInfo does not define service
    shipped_datetime: trackingInfo.shipDateTime?.toISOString(),
    shipping_problem: trackingInfo.hasError,
    shipping_problem_code: errorEvent.problemCode,
    shipping_problem_description: errorEvent.problemDescription,
    standardized_status_code: mapStatusCode(
      trackingInfo.status
    ),
    tracking_number: trackingInfo.trackingNumber,
    weight: totalWeight, //TODO: converting DX tracking -> CAPI, should CAPI weight be a sum or the first package?
  };

  return {
    tracking_info: capiInfo,
    metadata: {
      ...transaction.session,
    },
  };
};
