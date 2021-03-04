import { Currency } from '@shipengine/connect-carrier-api/lib/models';
import { MonetaryValuePOJO } from '@shipengine/connect-sdk';

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
