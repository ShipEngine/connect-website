import { Address } from '@ipaas/capi';
import { CreateLabelRequest } from '@ipaas/capi/requests';
import { AddressWithContactInfoPOJO } from '@shipengine/connect';
import { NewShipmentPOJO } from '@shipengine/connect-sdk/lib/internal';
import {
	mapConfirmation,
	mapLabelLayout,
	mapLabelFormat,
	mapNewPackage,
	mapAddressWithContact,
} from './';
import { mapCustomsItem } from './customs-item';
import { mapCustomsPOJO } from './new-package';

export const getReturnToAddress = (
	isReturn?: boolean,
	from?: Address | null,
	display?: Address | null,
): AddressWithContactInfoPOJO | undefined => {
	if (!isReturn || (!from && !display)) {
		return undefined;
	}
	return display ? mapAddressWithContact(display) : mapAddressWithContact(from);
};

export const mapCreateLabelRequest = (
	request: CreateLabelRequest,
): NewShipmentPOJO => {
	const mappedRequest = {
		deliveryService: request.service_code || '',
		deliveryConfirmation: mapConfirmation(request.confirmation),
		shipFrom: mapAddressWithContact(request.ship_from),
		shipTo: mapAddressWithContact(request.ship_to),
		returnTo: getReturnToAddress(
			request.is_return_label,
			request.ship_from,
			request.ship_from_display,
		),
		shipDateTime: new Date(request.ship_datetime),
		returns: {
			isReturn: request.is_return_label,
			rmaNumber: undefined, // TODO: This is added in 1.13
		},
		packages: request.packages.map((pckg) =>
			mapNewPackage(
				pckg,
				request.advanced_options,
				mapLabelFormat(request.label_format),
				mapLabelLayout(request.label_layout),
				request.insurance_provider || undefined,
			),
		),
	};
	
	if (mappedRequest.packages.length) {
		// We only want to map the customs to the first package in the array until shipstation can support package level customs
		mappedRequest.packages[0].customs = mapCustomsPOJO(request.customs || undefined);
		mappedRequest.packages[0].contents = [{
			salesOrder: {
				id: request.reference || ''
			}
		}];
	}

	return mappedRequest;
};
