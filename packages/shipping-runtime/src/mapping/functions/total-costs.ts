import { Currency } from '@shipengine/connect-carrier-api/lib/models';
import { Charge } from '@shipengine/connect-sdk';

export const getTotalCosts = (
	charges: readonly Charge[] | undefined,
): Currency | undefined => {
	if (!charges || charges.length < 1) {
		return undefined;
	}
	const totalCost = charges
		.map((p) => p.amount)
		.reduce((prev, current) => {
			return {
				currency: current.currency,
				value: prev.value + current.value,
			};
		});
	return {
		amount: totalCost.value.toString(),
		currency: totalCost.currency,
	};
};
