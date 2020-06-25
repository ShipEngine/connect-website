import { InsuranceProvider as capiInsuranceProvider } from "@ipaas/capi/models";
import { InsuranceProvider } from "@shipengine/integration-platform-sdk";

export default (
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
