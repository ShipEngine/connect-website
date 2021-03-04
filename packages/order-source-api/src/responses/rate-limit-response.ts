import { DetailedError } from "../models";

export interface RateLimitResponse {
  retry_after_seconds?: number;
  retry_after_time?: string;
  throttling_context: any;
}
