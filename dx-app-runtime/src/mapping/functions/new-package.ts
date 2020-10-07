
import {
    Package,
    Customs,
    AdvancedShippingOptions,
    CustomsItem as CapiCustomsItem  } from '@ipaas/capi/models';
  import {
    DocumentFormat,
    DocumentSize,
  } from '@shipengine/connect-sdk';
  
  import {
    NewPackagePOJO,
  } from '@shipengine/connect-sdk/lib/internal';
  import { mapWeightGrams, mapCurrency, mapCustomsItem, mapDimensionsCM } from './';

export const mapNewPackage = (
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
            return mapCustomsItem(item);
          }) ?? [],
      },
      packaging: capiPackage.package_code || '',
      dimensions: mapDimensionsCM(capiPackage?.dimension_details?.dimensions_in_centimeters),
      weight: mapWeightGrams(capiPackage.weight_details?.weight_in_grams),
      insuredValue: mapCurrency(capiPackage?.insured_value),
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
  