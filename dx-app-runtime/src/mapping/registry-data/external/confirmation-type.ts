export default interface ConfirmationType {
  Name?: string | null;
  Type?: 'None' | 'Delivery' | 'Signature' | 'AdultSignature' | 'DirectSignature';
}
