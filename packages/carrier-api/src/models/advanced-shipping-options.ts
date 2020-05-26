export interface AdvancedShippingOptions {
  /**
   * Describes whether or not customs duties should be billed to the sender.
   */
  bill_duties_to_sender?: boolean | null;
  /**
   * Describes whether or not the shipment contains alcohol.
   */
  contains_alcohol?: boolean | null;
  /**
   * Describes whether no postage is necessary
   */
  no_postage?: boolean | null;
  /**
   * Describes whether or not the shipment is non automatically sortable with machines.
   */
  nonmachineable?: boolean | null;
  /**
   * Describes whether or not the shipment is requested to be delivered on a saturday.
   */
  saturday_delivery?: boolean | null;
}
