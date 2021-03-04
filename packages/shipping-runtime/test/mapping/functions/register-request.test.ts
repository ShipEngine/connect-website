import { mapRegisterRequest } from '../../../src/mapping/functions';

describe('Register Request', () => {
	const regInfo = {
		item: '1234',
		value: '23425d',
	};
	const mappedRequest = mapRegisterRequest({
		transaction_id: '',
		registration_info: regInfo,
	});
	it('it must properly map the registration_info to the request', () =>
		expect(mappedRequest).toEqual(regInfo));
});
