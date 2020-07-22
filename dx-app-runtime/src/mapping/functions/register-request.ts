import { TransactionPOJO } from '@shipengine/integration-platform-sdk';
import { RegisterRequest } from '@ipaas/capi/requests';

export default (request: RegisterRequest): TransactionPOJO => {
  const transaction: TransactionPOJO = {
    id: request.transaction_id,
    session: {
      ...request.registration_info,
      ...request.metadata,
    },
  };
  return transaction;
};
