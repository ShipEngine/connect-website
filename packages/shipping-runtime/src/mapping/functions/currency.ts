import { Currency } from '@ipaas/capi/models';
import { MonetaryValuePOJO } from '@shipengine/connect';

export const mapCurrency = (
	money?: Currency,
): MonetaryValuePOJO | undefined => {
	if (!money || isNaN(Number(money.amount)) || Number(money.amount) === 0) {
		return undefined;
	}
	return {
		currency: money.currency || '',
		value: Number(money.amount),
	};
};
