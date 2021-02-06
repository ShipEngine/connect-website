import routes from '../../routes';

describe('routes', () => {
  it('returns the AppInfoScreen path', () => {
    expect(routes.appsInfoPath()).toEqual('/');
  });

  it('returns the CancelPickupsMethodScreen path', () => {
    expect(routes.cancelPickupsMethodPath()).toEqual('/cancel-pickups');
  });

  it('returns the CancelShipmenstMethodScreen path', () => {
    expect(routes.cancelShipmentsMethodPath()).toEqual('/cancel-shipments');
  });

  it('returns the ConnectMethodScreen path', () => {
    expect(routes.connectMethodPath()).toEqual('/connect');
  });

  it('returns the CreateManifestMethodScreen path', () => {
    expect(routes.createManifestMethodPath()).toEqual('/create-manifest');
  });

  it('returns the CreateShipmentMethodScreen path', () => {
    expect(routes.createShipmentMethodPath()).toEqual('/create-shipment');
  });

  it('returns the RateShipmentMethodScreen path', () => {
    expect(routes.rateShipmentMethodPath()).toEqual('/rate-shipment');
  });

  it('returns the SchedulePickupMethodScreen path', () => {
    expect(routes.schedulePickupMethodPath()).toEqual('/schedule-pickup');
  });

  it('returns the TrackShipmentMethodScreen path', () => {
    expect(routes.trackShipmentMethodPath()).toEqual('/track-shipment');
  });
});
