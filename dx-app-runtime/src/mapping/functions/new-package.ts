import {
	Package,
	Customs,
	AdvancedShippingOptions,
	CustomsItem as CapiCustomsItem,
	InsuranceProvider,
	Currency,
	LabelMessages,
	NonDelivery,
	CustomsItem,
} from '@ipaas/capi/models';
import {
	CustomsPOJO,
	DocumentFormat,
	DocumentSize,
	MonetaryValuePOJO,
	NonDeliveryOption,
} from '@shipengine/connect-sdk';

import {
	NewPackagePOJO,
	NewLabelPOJO,
} from '@shipengine/connect-sdk/lib/internal';
import {
	mapWeightGrams,
	mapCurrency,
	mapCustomsItem,
	mapDimensionsCM,
} from './';

export const mapInsuredValue = (
	provider?: InsuranceProvider,
	insuredValue?: Currency,
): MonetaryValuePOJO | undefined => {
	if (!provider || provider !== InsuranceProvider.Carrier) {
		return undefined;
	}
	return mapCurrency(insuredValue);
};

export const mapNewLabelPOJO = (
	format: DocumentFormat,
	size: DocumentSize,
	messages?: LabelMessages,
): NewLabelPOJO => {
	if (
		!messages ||
		(!messages.reference1 && !messages.reference2 && !messages.reference3)
	) {
		return {
			format,
			size,
		};
	}
	return {
		format,
		size,
		referenceFields: [
			messages.reference1,
			messages.reference2,
			messages.reference3,
		].filter((p) => p) as string[],
	};
};

export const mapNonDeliveryOption = (
	option?: NonDelivery,
): NonDeliveryOption | undefined => {
	switch (option) {
		case NonDelivery.ReturnToSender:
			return NonDeliveryOption.Return;
		case NonDelivery.TreatAsAbandoned:
			return NonDeliveryOption.Abandon;
		default:
			return undefined;
	}
};

export const nonEmptyCustomsItemsFilter = (item?: CustomsItem | null) => {
	if (!item) {
		return false;
	}
	return (
		Boolean(item.description) ||
		Boolean(item.harmonized_tariff_code) ||
		Boolean(item.quantity) ||
		Boolean(item.sku) ||
		Boolean(item.sku_description)
	);
};

const customsExist = (customs: Customs): boolean => {
	const filledOutCustomsItems = customs.customs_items.filter(
		nonEmptyCustomsItemsFilter,
	);
	return filledOutCustomsItems.length > 0;
};

export const mapCustomsPOJO = (customs?: Customs): CustomsPOJO | undefined => {
	if (!customs || !customsExist(customs)) {
		return undefined;
	}
	const customsItems = customs.customs_items.filter(
		(p) => p,
	) as CapiCustomsItem[];
	return {
		nonDeliveryOption: mapNonDeliveryOption(customs.non_delivery || undefined),
		contents: customsItems?.map(mapCustomsItem),
	};
};

export const mapNewPackage = (
	capiPackage: Package,
	customs: Customs | undefined,
	advancedOptions: AdvancedShippingOptions | null | undefined,
	documentFormat: DocumentFormat,
	documentSize: DocumentSize,
	insuranceProvider?: InsuranceProvider,
): NewPackagePOJO => {
	const mappedPackage: NewPackagePOJO = {
		customs: mapCustomsPOJO(customs),
		packaging: capiPackage.package_code || '',
		dimensions: mapDimensionsCM(
			capiPackage?.dimension_details?.dimensions_in_centimeters,
		),
		weight: mapWeightGrams(capiPackage.weight_details?.weight_in_grams),
		insuredValue: mapInsuredValue(
			insuranceProvider,
			capiPackage?.insured_value,
		),
		containsAlcohol: advancedOptions?.contains_alcohol || false,
		isNonMachinable: advancedOptions?.nonmachineable || false,
		label: mapNewLabelPOJO(
			documentFormat,
			documentSize,
			capiPackage.label_messages || undefined,
		),
	};
	return mappedPackage;
};
