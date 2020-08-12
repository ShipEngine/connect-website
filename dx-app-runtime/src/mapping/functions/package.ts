import {
  Package,
  Customs,
  AdvancedShippingOptions,
  CustomsItem as CapiCustomsItem,
  ShippedPackage,
} from '@ipaas/capi/models';
import {
  DocumentFormat,
  DocumentSize,
  LengthUnit,
  WeightUnit,
  RatePackage,
} from '@shipengine/integration-platform-sdk';

import {
  PackageRateCriteriaPOJO,
  PickupPackagePOJO,
  NewPackagePOJO,
} from '@shipengine/integration-platform-sdk/lib/internal';
import { capiToDxCustomsItem } from './customs-item';

export const capiToDxPackage = (
  capiPackage: Package,
  customs: Customs | null | undefined,
  advancedOptions: AdvancedShippingOptions | null | undefined,
  documentFormat: DocumentFormat,
  documentSize: DocumentSize
): NewPackagePOJO | RatePackage => {
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
      id: capiPackage.package_code || '',
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
      value: capiPackage?.insured_value?.amount || 0,
      currency: capiPackage?.insured_value?.currency || 'USD',
    },
    containsAlcohol: advancedOptions?.contains_alcohol || false,
    isNonMachinable: advancedOptions?.nonmachineable || false,
    label: {
      format: documentFormat,
      size: documentSize,
      referenceFields: [
        capiPackage.label_messages?.reference1 || '',
        capiPackage.label_messages?.reference2 || '',
        capiPackage.label_messages?.reference3 || '',
      ],
    },
  };
  return mappedPackage;
};

export const capiToDxNewPackagePOJO = (
  capiPackage: Package,
  customs: Customs | null | undefined,
  advancedOptions: AdvancedShippingOptions | null | undefined,
  documentFormat: DocumentFormat,
  documentSize: DocumentSize
): NewPackagePOJO => {
  const nonNullCustomsItems = <CapiCustomsItem[] | undefined>(
    customs?.customs_items.filter((item) => item !== null && item !== undefined)
  );
  const mappedPackage: NewPackagePOJO = {
    customs: {
      contents:
        nonNullCustomsItems?.map((item: CapiCustomsItem) => {
          return capiToDxCustomsItem(item);
        }) ?? [],
    },
    packaging: {
      id: capiPackage.package_code || '',
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
      value: !Number.isNaN(capiPackage?.insured_value?.amount) ? Number(capiPackage?.insured_value?.amount) : 0,
      currency: capiPackage?.insured_value?.currency || 'USD',
    },
    containsAlcohol: advancedOptions?.contains_alcohol || false,
    isNonMachinable: advancedOptions?.nonmachineable || false,
    label: {
      format: documentFormat,
      size: documentSize,
      referenceFields: [
        capiPackage.label_messages?.reference1 || '',
        capiPackage.label_messages?.reference2 || '',
        capiPackage.label_messages?.reference3 || '',
      ],
    },
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
  return {
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
      value: !Number.isNaN(capiPackage?.insured_value?.amount) ? Number(capiPackage?.insured_value?.amount) : 0,
      currency: capiPackage?.insured_value?.currency || 'USD',
    },
    containsAlcohol: advancedOptions?.contains_alcohol || false,
    isNonMachinable: advancedOptions?.nonmachineable || false,
  };
};

export const capiToPickupPackagePOJO = (
  shippedPackage: ShippedPackage
): PickupPackagePOJO => {
  const pickupPackage: PickupPackagePOJO = {
    trackingNumber: shippedPackage.tracking_number || '',
    packaging: {
      id: shippedPackage.package_code || '',
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
      trackingNumber: shippedPackage.tracking_number || ''
    },
  };

  return pickupPackage;
};
