import { Address } from './address';

/**
 * @description This model represents information for who is being billed
 */
export interface BillTo extends Address {
  /** @description The email address of the person being billed */
  email?: string;
}
