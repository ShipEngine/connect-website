import {
	mapShippedShipments,
	mapShippedShipment,
  mapPickupShipments,
	mapPickupShipment,
} from '../../../src/mapping/functions';

describe('Shipped Shipments', () => {
	describe('when the shipments is undefined', () => {
		it('it returns an empty array', () =>
			expect(mapShippedShipments(undefined)).toEqual([]));
	});

	describe('when the shipments are defined it returns an appropriately sized array', () => {
		it('it returns an empty array', () =>
			expect(mapShippedShipments([{}, {}, { packages: [] }]).length).toEqual(3));
	});
});

describe('Shipped Shipment', () => {
	it('when a tracking number is present it maps correctly', () =>
		expect(
			mapShippedShipment({ tracking_number: 'number' }).trackingNumber,
		).toEqual('number'));
	it('when a tracking number is not present it maps to undefined', () =>
		expect(mapShippedShipment({}).trackingNumber).toEqual(undefined));
	it('when a service code is present it maps correctly', () =>
		expect(mapShippedShipment({ service_code: 'code' }).deliveryService).toEqual(
			'code',
		));
	it('when a service code is not present it maps to an empty string', () =>
		expect(mapShippedShipment({}).deliveryService).toEqual(''));
	it('when packages are undefined it maps to an empty array', () =>
		expect(mapShippedShipment({}).packages).toEqual([]));
});

describe('Pickup Shipments', () => {
	describe('when the shipments is undefined', () => {
		it('it returns an empty array', () =>
			expect(mapPickupShipments(undefined)).toEqual([]));
	});

	describe('when the shipments are defined it returns an appropriately sized array', () => {
		it('it returns an empty array', () =>
			expect(mapPickupShipments([{}, {}, { packages: [] }]).length).toEqual(3));
	});
});

describe('Pickup Shipment', () => {
	it('when a tracking number is present it maps correctly', () =>
		expect(
			mapPickupShipment({ tracking_number: 'number' }).trackingNumber,
		).toEqual('number'));
	it('when a tracking number is not present it maps to undefined', () =>
		expect(mapPickupShipment({}).trackingNumber).toEqual(undefined));
	it('when a service code is present it maps correctly', () =>
		expect(mapPickupShipment({ service_code: 'code' }).deliveryService).toEqual(
			'code',
		));
	it('when a service code is not present it maps to an empty string', () =>
		expect(mapPickupShipment({}).deliveryService).toEqual(''));
	it('when packages are undefined it maps to an empty array', () =>
		expect(mapPickupShipment({}).packages).toEqual([]));
});
