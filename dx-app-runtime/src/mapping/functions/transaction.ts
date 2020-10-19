import {
	CancelPickupRequest,
	SchedulePickupRequest,
	TrackRequest,
	VoidLabelsRequest,
	GetRatesRequest,
	RegisterRequest,
	CreateLabelRequest,
} from '@ipaas/capi/requests';
import { Transaction } from '@shipengine/connect-sdk';

export const mapTransaction = (
	request:
		| RegisterRequest
		| GetRatesRequest
		| CreateLabelRequest
		| VoidLabelsRequest
		| TrackRequest
		| SchedulePickupRequest
		| CancelPickupRequest,
): Transaction => {
	return {
		id: request.transaction_id || '',
		session: {
			...request.metadata,
		},
	};
};
