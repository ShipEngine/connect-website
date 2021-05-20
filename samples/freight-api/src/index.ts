import { FreightApp } from '@shipengine/connect-freight-api';
import {
  ConnectFreightCarrier,
  FreightQuote,
  FreightShipmentDocuments,
  FreightSpotQuote,
  ProvisionFreightProviderAccount,
  ScheduleFreightPickup,
  TrackFreightShipment
} from './methods';
import { Metadata } from './definitions';

export default new FreightApp({
  Metadata,
  ConnectFreightCarrier,
  FreightQuote,
  FreightShipmentDocuments,
  FreightSpotQuote,
  ProvisionFreightProviderAccount,
  ScheduleFreightPickup,
  TrackFreightShipment
})
