import * as sdk from '@shipengine/connect-sdk';
import * as api from '@shipengine/connect-order-source-api';

export function mapTransaction(transaction_id: string, auth: api.Auth): sdk.Transaction {
  // This gets parsed out and attached directly to the session
  const context =
    typeof auth.connection_context === 'string'
      ? JSON.parse(auth.connection_context)
      : auth.connection_context;

  // This prevents us from duplicating the whole context, and lets us camelCase
  const authWithoutContext = {
    username: auth.username,
    password: auth.password,
    accessToken: auth.access_token,
    apiKey: auth.api_key,
  };

  return {
    id: transaction_id,
    language: 'TODO',
    session: {
      ...context,
      auth: authWithoutContext,
    },
  };
}
