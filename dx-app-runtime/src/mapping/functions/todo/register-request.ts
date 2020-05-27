import { TransactionConfig } from '@shipengine/ipaas';
import { RegisterRequest } from '../capi/register-request';

export default (request: RegisterRequest): TransactionConfig => {
  const transaction: TransactionConfig = {
    id: request.transaction_id,
    session: {
      ...request.registration_info,
      ...request.metadata,
    },
  };
  return transaction;
};
