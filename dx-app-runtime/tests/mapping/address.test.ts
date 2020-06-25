import { mapAddressToAddressWithContactInfoPOJO } from "../../src/mapping/functions/address";
import { AddressResidentialIndicator } from "@ipaas/capi/models";

describe("address mapping", () => {
  it("returns an empty DX address with null CAPI", () => {
    const dxAddress = mapAddressToAddressWithContactInfoPOJO(null);
    expect(dxAddress).not.toBeUndefined();
    expect(dxAddress.name).not.toBeUndefined();
    expect(dxAddress.addressLines.length).toBe(0);
  });

  it("converts Address Residential Indicator to the correct boolean", () => {
    const capiAddress = {
      address_lines: undefined,
      city_locality: undefined,
      company_name: undefined,
      country_code: "",
      email: undefined,
      first_name: undefined,
      is_eu: undefined,
      last_name: undefined,
      name: undefined,
      phone_number: undefined,
      postal_code: "",
      state_province: undefined,
      address_residential_indicator: AddressResidentialIndicator.Residential,
    };

    let dxAddress = mapAddressToAddressWithContactInfoPOJO(capiAddress);
    expect(dxAddress.isResidential).toBe(true);

    dxAddress = mapAddressToAddressWithContactInfoPOJO(capiAddress);
    capiAddress.address_residential_indicator = AddressResidentialIndicator.Yes;
    expect(dxAddress.isResidential).toBe(true);

    capiAddress.address_residential_indicator =
      AddressResidentialIndicator.Commercial;
    dxAddress = mapAddressToAddressWithContactInfoPOJO(capiAddress);
    expect(dxAddress.isResidential).toBe(false);

    capiAddress.address_residential_indicator = AddressResidentialIndicator.No;
    dxAddress = mapAddressToAddressWithContactInfoPOJO(capiAddress);
    expect(dxAddress.isResidential).toBe(false);

    capiAddress.address_residential_indicator =
      AddressResidentialIndicator.Unknown;
    dxAddress = mapAddressToAddressWithContactInfoPOJO(capiAddress);
    expect(dxAddress.isResidential).toBe(false);
  });
});
