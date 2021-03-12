import { Transaction } from '@shipengine/connect-sdk';
import { RegisterResponse } from '@ipaas/capi/responses';

interface BasicAuth {
  userId?: string;
  password?: string;
}

const getCredentials = (auth?: BasicAuth) => {
  if(!auth) {
    return {
      username: 'N/A',
      password: 'N/A',
    }
  } else {
    return {
      username: auth.userId || 'N/A',
      password: auth.password || 'N/A'
    }
  }
}

export const mapRegisterResponse = (transaction: Transaction): RegisterResponse => {
  const session = transaction.session as any;
  const { _basicAuth } = session;
  const credentials = getCredentials(_basicAuth);
  
  delete session._basicAuth;

  const response: RegisterResponse = {
    credentials,
    metadata: {
      ...session,
    },
  };
  return response;
};
