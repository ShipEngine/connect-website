import { CancellationReason } from "./cancellation-reason";

/** @description Basic structure for a cancellation */
export interface CancellationDetails {
  reason: CancellationReason;
  /** @description Additional properties about cancellation */
  cancellation_options?: { [key: string]: string };
  /** @description Any additional info about why the customer is cancelling the pickup */
  remarks?: string;
}
