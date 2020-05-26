export interface PickupWindow {
  /**
   * The end of the window when the pickup could be made relative to the time_zone_iana.
   * Formatted per https://tools.ietf.org/html/rfc3339
   */
  end_time?: null | string;
  /**
   * The local date the pickup will occur. Formatted per https://tools.ietf.org/html/rfc3339
   */
  pickup_date: string;
  /**
   * The time relative to the time_zone_iana that the carrier says that the pickup could
   * occur. Formatted per https://tools.ietf.org/html/rfc3339
   */
  start_time?: null | string;
  /**
   * The local time zone represented in IANA. See https://www.iana.org/time-zones
   */
  time_zone_iana: string;
}
