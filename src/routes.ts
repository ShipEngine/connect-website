const routes = {
  appsInfoPath(): string {
    return '/';
  },
  cancelPickupsMethodPath(): string {
    return '/cancel-pickups';
  },
  cancelShipmentsMethodPath(): string {
    return '/cancel-shipments';
  },
  connectMethodPath(): string {
    return '/connect';
  },
  createManifestMethodPath(): string {
    return '/create-manifest';
  },
  createShipmentMethodPath(): string {
    return '/create-shipment';
  },
  rateShipmentMethodPath(): string {
    return '/rate-shipment';
  },
  schedulePickupMethodPath(): string {
    return '/schedule-pickup';
  },
  trackShipmentMethodPath(): string {
    return '/track-shipment';
  },
};

export default routes;
