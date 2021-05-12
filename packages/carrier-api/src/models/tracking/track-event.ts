import { LatLong } from "./lat-long";

/** @description Basic structure for tracking events */
export interface TrackEvent {
  event_datetime?: string;
  event_datetime_local?: string;
  event_code?: string;
  description?: string;
  city?: string;
  /** @description State or province */
  state?: string;
  /** @description Zip or postal code */
  postal_code?: string;
  country?: string;
  company?: string;
  signer?: string;
  /** @description Geographical location */
  geo?: LatLong;
}
