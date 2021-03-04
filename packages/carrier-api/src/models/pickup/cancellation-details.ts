import { CancellationReason } from "./cancellation-reason";

export interface CancellationDetails {
  reason: CancellationReason;
  cancellation_options?: { [key: string]: string };
  remarks?: string;
}
