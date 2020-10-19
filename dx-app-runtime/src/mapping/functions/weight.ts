import { WeightPOJO, WeightUnit } from '@shipengine/connect';

export const mapWeightGrams = (
	weight?: number | string | null,
): WeightPOJO | undefined => {
	if (!weight || isNaN(Number(weight)) || Number(weight) === 0) {
		return undefined;
	}
	return {
		unit: WeightUnit.Grams,
		value: Number(weight),
	};
};
