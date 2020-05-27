import { TransactionConfig } from '@shipengine/ipaas';
import { RegisterResponse } from '../capi/register-response';

export default (transaction: TransactionConfig): RegisterResponse => {
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
