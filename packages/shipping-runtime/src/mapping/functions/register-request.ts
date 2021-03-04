import { RegisterRequest } from '@ipaas/capi/requests';

export const mapRegisterRequest = (request: RegisterRequest): object => {
	return {
		...request.registration_info,
	};
};
