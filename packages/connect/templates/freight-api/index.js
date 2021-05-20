const { FreightApp } = require("@shipengine/connect-freight-api");
const {
  ConnectFreightCarrier,
  FreightQuote,
  FreightShipmentDocuments,
  FreightSpotQuote,
  ProvisionFreightProviderAccount,
  ScheduleFreightPickup,
  TrackFreightShipment
} = require("./methods");
const { Metadata } = require("./definitions");

module.exports = new FreightApp({
  Metadata,
  ConnectFreightCarrier,
  FreightQuote,
  FreightShipmentDocuments,
  FreightSpotQuote,
  ProvisionFreightProviderAccount,
  ScheduleFreightPickup,
  TrackFreightShipment
})
