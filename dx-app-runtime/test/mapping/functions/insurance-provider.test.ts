import { InsuranceProvider as capi } from '@ipaas/capi';
import { InsuranceProvider as dx } from '@shipengine/connect';
import { mapInsuranceProvider } from '../../../src/mapping/functions';

const correct: any[][] = [
    [undefined, undefined],
    ['garbage', undefined],
    [capi.None, undefined],
    [capi.Carrier, dx.Carrier],
    [capi.External, dx.ThirdParty],
    [capi.ShipEngine, dx.ShipEngine]
];

describe('Insurance Provider', () => {
    describe('Mapping insurance providers maps as expected', () => {
        test.each(correct)('mapInsuranceProvider(%o) maps to %s', (format, expected) => {
            expect(mapInsuranceProvider(format)).toEqual(expected);
        });
    });
})