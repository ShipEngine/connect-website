import { createNamespace, getNamespace } from "continuation-local-storage";
import { v4 as uuid } from "uuid";

export const SESSION_ID = "request_session";

const TRANSACTION_ID = "transaction_ID";

createNamespace(SESSION_ID);

export const setTransactionId = (id?: string | undefined): string | undefined => {
  const session = getNamespace(SESSION_ID);
  return session?.set(TRANSACTION_ID, id ?? uuid());
};

export const getTransactionId = (): string | undefined => {
  const session = getNamespace(SESSION_ID);
  return session?.get(TRANSACTION_ID);
};
