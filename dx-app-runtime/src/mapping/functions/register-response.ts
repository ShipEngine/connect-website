import { TransactionPOJO } from '@shipengine/integration-platform-sdk';
import { RegisterResponse } from '@ipaas/capi/responses';

export default (transaction: TransactionPOJO): RegisterResponse => {
  const response: RegisterResponse = {
    credentials: {
      username: 'N/A',
      password: 'N/A'
    },
    metadata: {
      ...transaction.session
    }
  };
  return response;
};
