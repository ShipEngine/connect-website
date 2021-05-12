/** @description Basic structure for shipping options */
export interface AdvancedOptions {
  /** @description Whether the shipment contains alcohol */
  contains_alcohol?: boolean;
  /** @description Whether the shipment does not require postage */
  no_postage?: boolean;
  /** @description Whether the shipment can be processed by machine */
  nonmachineable?: boolean;
  /** @description Whether the shipment duties should be billed to the sender */
  bill_duties_to_sender?: boolean;
  /** @description Whether Saturday delivery is permissible  */
  saturday_delivery?: boolean;
  /** @description Any other custom shipping options */
  [key: string]: any;
}
