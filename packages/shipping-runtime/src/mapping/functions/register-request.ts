import { RegisterRequest } from '@shipengine/connect-carrier-api/lib/requests';

export const mapRegisterRequest = (request: RegisterRequest): object => {
  return {
    ...request.registration_info,
  };
};
