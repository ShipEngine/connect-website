import {
  Package,
  Customs,
  AdvancedShippingOptions,
  CustomsItem as CapiCustomsItem,
  ShippedPackage,
} from "@ipaas/capi/models";
import { capiToDxCurrencyCode } from "./currency";
import {
  DocumentFormat,
  DocumentSize,
  LengthUnit,
  NewPackagePOJO,
  WeightUnit,
  RatePackagePOJO,
  PackageRateCriteriaPOJO,
  PickupPackagePOJO,
} from "@shipengine/integration-platform-sdk";
import { capiToDxCustomsItem } from "./customs-item";

export const capiToDxPackage = (
  capiPackage: Package,
  customs: Customs | null | undefined,
  advancedOptions: AdvancedShippingOptions | null | undefined
): NewPackagePOJO | RatePackagePOJO => {
  const nonNullCustomsItems = <CapiCustomsItem[] | undefined>(
    customs?.customs_items.filter((item) => item !== null && item !== undefined)
  );

  const mappedPackage = {
    customs: {
      contents:
        nonNullCustomsItems?.map((item: CapiCustomsItem) => {
          return capiToDxCustomsItem(item);
        }) ?? [],
    },
    packaging: {
      id: capiPackage.package_code ?? "unknown", // TODO: capi does not have package id
      name: capiPackage.package_code ?? "unknown", // TODO: capi does not have package name
    },

    dimensions: {
      length:
        capiPackage.dimension_details?.dimensions_in_centimeters?.length || 0,
      width:
        capiPackage.dimension_details?.dimensions_in_centimeters?.width || 0,
      height:
        capiPackage.dimension_details?.dimensions_in_centimeters?.height || 0,
      unit: LengthUnit.Centimeters,
    },
    weight: {
      value: capiPackage.weight_details?.weight_in_grams || 0,
      unit: WeightUnit.Grams,
    },
    insuredValue: {
      value: capiPackage.insured_value.amount || 0,
      currency: capiToDxCurrencyCode(capiPackage.insured_value.currency),
    },
    containsAlcohol: advancedOptions?.contains_alcohol || false,
    isNonMachinable: advancedOptions?.nonmachineable || false,
    label: {
      format: DocumentFormat.HTML, // TODO: capi label messages have no format
      size: DocumentSize.Inches4x6, // TODO: capi label messages have no size
      referenceFields: [
        capiPackage.label_messages?.reference1 || "",
        capiPackage.label_messages?.reference2 || "",
        capiPackage.label_messages?.reference3 || "",
      ],
    },
    contents: /*customs?.customs_items.map(mapCustomsToItemToPackageItem) ||*/ [], //TODO: how do contents differ from customs items
  };
  return mappedPackage;
};

export const capiToDxNewPackagePOJO = (
  capiPackage: Package,
  customs: Customs | null | undefined,
  advancedOptions: AdvancedShippingOptions | null | undefined
): NewPackagePOJO => {
  const nonNullCustomsItems = <CapiCustomsItem[] | undefined>(
    customs?.customs_items.filter((item) => item !== null && item !== undefined)
  );
  const mappedPackage = {
    customs: {
      contents:
        nonNullCustomsItems?.map((item: CapiCustomsItem) => {
          return capiToDxCustomsItem(item);
        }) ?? [],
    },
    packaging: {
      id: capiPackage.package_code ?? "unknown", // TODO: capi does not have package id
      name: capiPackage.package_code ?? "unknown", // TODO: capi does not have package name
    },

    dimensions: {
      length:
        capiPackage.dimension_details?.dimensions_in_centimeters?.length || 0,
      width:
        capiPackage.dimension_details?.dimensions_in_centimeters?.width || 0,
      height:
        capiPackage.dimension_details?.dimensions_in_centimeters?.height || 0,
      unit: LengthUnit.Centimeters,
    },
    weight: {
      value: capiPackage.weight_details?.weight_in_grams || 0,
      unit: WeightUnit.Grams,
    },
    insuredValue: {
      value: capiPackage.insured_value.amount || 0,
      currency: capiToDxCurrencyCode(capiPackage.insured_value.currency),
    },
    containsAlcohol: advancedOptions?.contains_alcohol || false,
    isNonMachinable: advancedOptions?.nonmachineable || false,
    label: {
      format: DocumentFormat.HTML, // TODO: capi label messages have no format
      size: DocumentSize.Inches4x6, // TODO: capi label messages have no size
      referenceFields: [
        capiPackage.label_messages?.reference1 || "",
        capiPackage.label_messages?.reference2 || "",
        capiPackage.label_messages?.reference3 || "",
      ],
    },
    contents: /*customs?.customs_items.map(mapCustomsToItemToPackageItem) ||*/ [], //TODO: how do contents differ from customs items
  };
  return mappedPackage;
};

export const capiToDxPackageRateCriteria = (
  capiPackage: Package,
  customs: Customs | null | undefined,
  advancedOptions: AdvancedShippingOptions | null | undefined
): PackageRateCriteriaPOJO => {
  const nonNullCustomsItems = <CapiCustomsItem[] | undefined>(
    customs?.customs_items.filter((item) => item !== null && item !== undefined)
  );

  const mappedPackage = {
    dimensions: {
      length:
        capiPackage.dimension_details?.dimensions_in_centimeters?.length || 0,
      width:
        capiPackage.dimension_details?.dimensions_in_centimeters?.width || 0,
      height:
        capiPackage.dimension_details?.dimensions_in_centimeters?.height || 0,
      unit: LengthUnit.Centimeters,
    },
    weight: {
      value: capiPackage.weight_details?.weight_in_grams || 0,
      unit: WeightUnit.Grams,
    },
    insuredValue: {
      value: capiPackage.insured_value.amount || 0,
      currency: capiToDxCurrencyCode(capiPackage.insured_value.currency),
    },
    containsAlcohol: advancedOptions?.contains_alcohol || false,
    isNonMachinable: advancedOptions?.nonmachineable || false,
    //contents: /*customs?.customs_items.map(mapCustomsToItemToPackageItem) ||*/ [] //TODO: how do contents differ from customs items
  };
  return mappedPackage;
};

export const capiToPickupPackagePOJO = (
  shippedPackage: ShippedPackage
): PickupPackagePOJO => {
  const pickupPackage: PickupPackagePOJO = {
    trackingNumber: shippedPackage.tracking_number || "",
    packaging: {
      id: shippedPackage.package_code || "",
    },
    weight: {
      value: shippedPackage.weight || 0,
      unit: WeightUnit.Grams,
    },
    dimensions: {
      width: shippedPackage.dimensions?.width || 0,
      height: shippedPackage.dimensions?.height || 0,
      length: shippedPackage.dimensions?.length || 0,
      unit: LengthUnit.Centimeters,
    },
    identifiers: {
      trackingNumber: shippedPackage.tracking_number
        ? shippedPackage.tracking_number
        : undefined,
    },
  };

  return pickupPackage;
};
