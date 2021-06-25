import { AsyncLocalStorage } from 'async_hooks';
import { v4 as uuid } from 'uuid';

interface RequestSession {
  transaction_id?: string;
  tenant_id?: string;
}

export const session = new AsyncLocalStorage<RequestSession>();

export const setTransactionId = (id?: string | undefined) => {
  const store = session.getStore();

  if (store) {
    store.transaction_id = id ?? uuid();
  }
};

export const getTransactionId = (): string | undefined => {
  return session.getStore()?.transaction_id;
};

export const setTenantId = (id?: string | undefined) => {
  const store = session.getStore();

  if (store) {
    store.tenant_id = id ?? 'no-tid';
  }
};

export const getTenantId = (): string | undefined => {
  return session.getStore()?.tenant_id ?? 'no-tid';
};
