/** @description This represents the error response for when the 3rd party api's are rate limiting us */
export interface RateLimitResponse {
  /** @description The number of seconds one should wait before making this request again */
  retry_after_seconds?: number;
  /** @description The (ISO 8601) datetime (UTC) of when the next request can be made @example "2021-03-31T18:21:14.858Z" */
  retry_after_time?: string;
  /** @description Information returned by the 3rd party systems that might be useful in logs */
  throttling_context: any;
}
