import { Transaction } from '@shipengine/connect-sdk';
import { RegisterResponse } from '@ipaas/capi/responses';

export const mapRegisterResponse = (transaction: Transaction): RegisterResponse => {
  const response: RegisterResponse = {
    credentials: {
      username: 'N/A',
      password: 'N/A',
    },
    metadata: {
      ...transaction.session,
    },
  };
  return response;
};
