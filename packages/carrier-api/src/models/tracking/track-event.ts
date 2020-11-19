import { LatLong } from './lat-long';

export interface TrackEvent {
  event_datetime?: string;
  event_datetime_local?: string;
  event_code?: string;
  description?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  company?: string;
  signer?: string;
  geo?: LatLong;
}
