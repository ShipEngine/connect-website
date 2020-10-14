import { mapPickupPackage } from '../../../src/mapping/functions/';

const minimumInfo = {
    tracking_number: 'TrackingNumber',
    package_code: 'PCKG'
}

const defaultPickupPackage = {
    "packaging": "",
}

describe('Pickup Package', () => {
    describe('when given just a tracking number and package code', () => {
        const result = mapPickupPackage(minimumInfo);
        it('it maps trackingNumber properly', () => expect(result.trackingNumber).toEqual(minimumInfo.tracking_number));
        it('it maps packageCode properly', () => expect(result.packaging).toEqual(minimumInfo.package_code));
    });
    describe('when given nothing', () => {
        const result = mapPickupPackage({});
        it('it returns a default PickupPackage object', () => expect(result).toEqual(defaultPickupPackage));
    });
});