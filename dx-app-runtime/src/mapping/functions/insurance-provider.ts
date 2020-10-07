import { InsuranceProvider as capiInsuranceProvider } from '@ipaas/capi/models';
import { InsuranceProvider } from '@shipengine/connect-sdk';

// TODO: Insurance Provider needs to be added to the DX Spec

export const mapInsuranceProvider =  (
  insuranceProvider: capiInsuranceProvider | null | undefined
): InsuranceProvider | undefined => {
  switch (insuranceProvider) {
    case capiInsuranceProvider.Carrier:
      return InsuranceProvider.Carrier;
    case capiInsuranceProvider.External:
      return InsuranceProvider.ThirdParty;
    case capiInsuranceProvider.ShipEngine:
      return InsuranceProvider.ShipEngine;
    default:
      return undefined;
  }
};
