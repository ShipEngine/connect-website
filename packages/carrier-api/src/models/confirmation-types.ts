/** @description Types of delivery confirmation */
export enum ConfirmationTypes {
  /** @description No confirmation is requested. */
  None = "None",
  /** @description Delivery confirmation is requested. */
  Delivery = "Delivery",
  /** @description A signature is required. This signature may be a neighbor, building manager, or the recipient can authorize the release of the package (without being present). */
  Signature = "Signature",
  /** @description A signature of an adult is required. */
  AdultSignature = "AdultSignature",
  /** @description Only supported by FedEx. The signature of somebody at the address is required. */
  DirectSignature = "DirectSignature",
}
