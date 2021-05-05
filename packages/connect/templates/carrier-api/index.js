const { CarrierApp } = require('@shipengine/connect-carrier-api');
const {
  Register,
  GetRates,
  CreateLabel,
  VoidLabels,
  CreateManifest,
  SchedulePickup,
  CancelPickup,
  Track
} = require('./methods');
const { Metadata } = require('./definitions');

module.exports = new CarrierApp({
  Metadata,
  Register,
  GetRates,
  CreateLabel,
  VoidLabels,
  CreateManifest,
  SchedulePickup,
  CancelPickup,
  Track
})
