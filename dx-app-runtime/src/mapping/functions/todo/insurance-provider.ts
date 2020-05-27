import { InsuranceProvider as capiInsuranceProvider } from '../capi/models/insurance-provider';
import { InsuranceProvider } from '@shipengine/ipaas';

export default (insuranceProvider: capiInsuranceProvider | null | undefined): InsuranceProvider | undefined => {
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
