/** @description Denotes the action that should be taken when a shipment is not deliverable */
export enum CustomsNonDelivery {
  ReturnToSender = 'return_to_sender',
  TreatAsAbandoned = 'treat_as_abandoned',
}
