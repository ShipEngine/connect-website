import { CancellationStatus, Transaction } from '@shipengine/connect';
import {
	mapVoidLabelsResponse,
	mapVoidResponse,
} from '../../../src/mapping/functions';

const expectedVoidResponseOutcomes: any[][] = [
	[{}, { errors: ['Error'], message: undefined, void_request_id: undefined }],
	[
		{ cancellationID: 'voidId', status: CancellationStatus.Success },
		{ errors: undefined, message: undefined, void_request_id: 'voidId' },
	],
	[
		{
			cancellationID: 'voidId',
			status: CancellationStatus.Success,
			description: 'message',
		},
		{ errors: undefined, message: 'message', void_request_id: 'voidId' },
	],
	[
		{
			cancellationID: 'voidId',
			status: CancellationStatus.Error,
			description: undefined,
		},
		{ errors: ['Error'], message: undefined, void_request_id: 'voidId' },
	],
	[
		{
			cancellationID: 'voidId',
			status: CancellationStatus.Skipped,
			description: 'custom error',
		},
		{
			errors: ['custom error'],
			message: 'custom error',
			void_request_id: 'voidId',
		},
	],
	[
		{
			cancellationID: 'voidId',
			status: CancellationStatus.Throttled,
			description: 'custom error',
		},
		{
			errors: ['custom error'],
			message: 'custom error',
			void_request_id: 'voidId',
		},
	],
	[
		{
			cancellationID: 'voidId',
			status: CancellationStatus.Timeout,
			description: 'custom error',
		},
		{
			errors: ['custom error'],
			message: 'custom error',
			void_request_id: 'voidId',
		},
	],
];

describe('Void Labels', () => {
	describe('when mapping a void response', () => {
		test.each(expectedVoidResponseOutcomes)(
			'mapVoidResponse(%s) maps to %s',
			(response, expected) => {
				expect(mapVoidResponse(response)).toEqual(expected);
			},
		);
	});

	describe('when a session is provided', () => {
		it('it is mapped to metadata', () =>
			expect(
				mapVoidLabelsResponse([], {
					id: 'test',
					session: { value: 1 },
				} as Transaction),
			).toEqual({ metadata: { value: 1 }, void_responses: [] }));
	});
});
