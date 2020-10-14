import { PickupContactDetails } from '@ipaas/capi';
import { mapPickupContact } from '../../../src/mapping/functions/';

const minimalContact: PickupContactDetails = {
    email: 'test@test.com',
    first_name: 'justin',
    phone_number: '(555)555-5555'
};

const minimalResult = {"email": "test@test.com", "name": "justin", "phoneNumber": "(555)555-5555"};

const fullContact: PickupContactDetails = {
    email: 'test@test.com',
    first_name: 'justin',
    phone_number: '(555)555-5555',
    last_name: 'robertson',
    phone_number_extension: '5555'
}

const fullResult = {"email": "test@test.com", "name": "justin robertson", "phoneNumber": "(555)555-5555 5555"};

const defaultResult = {email: '', name: '', phoneNumber: ''};

const expectedResults: any[][] = [
    [undefined, defaultResult],
    [{}, defaultResult],
    [minimalContact, minimalResult],
    [fullContact, fullResult],
]
describe('Pickup Contact', () => {
    describe('Mapping Pickup Contact', () => {
        test.each(expectedResults)('mapPickupContact(%o) maps to %o', (contact, expected) => {
            expect(mapPickupContact(contact)).toEqual(expected);
        });
    });
})