import { createNamespace } from 'continuation-local-storage';
import { v4 as uuid } from 'uuid';

export const namespace = createNamespace('transaction_storage');

export function setTransactionId(id?: string | undefined): string {
	return namespace.set('transaction_id', id ?? uuid());
}

export function getTransactionId(): string {
	return namespace.get('transaction_id') ?? 'no-txid';
}
