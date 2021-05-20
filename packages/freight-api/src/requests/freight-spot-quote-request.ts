import { BaseQuoteRequest } from "./base-quote-request";

/**
 * Obtain a spot price quote for a freight shipment. Spot quotes are typically discounted rates based on excess carrier capacity vs contractual rates. The carrier will return the service level they are able to offer as opposed to specifying the desired service level in the request.
 *
 * Note: in terms of user workflow for spot quotes, the expectation is that the quote ID coming back from the carrier is included on the BOL they provide the carrier at the time of pickup, allowing the carrier to match the shipment to the original quote and invoice it correctly. Additionally, as spot quotes can expire, if the quote has expired at the time of pickup a new spot quote should be created to include in the BOL.
 */
export interface FreightSpotQuoteRequest extends BaseQuoteRequest {}
