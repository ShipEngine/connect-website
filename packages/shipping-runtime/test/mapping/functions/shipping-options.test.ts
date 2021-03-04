import { mapShippingOptions } from '../../../src/mapping/functions';

const expectedResultsDangerousGoodsCategory: any[][] = [
	[null, null],
	['', ''],
	['foo', 'foo'],
];

const expectedResultsBillDutiesToSender: any[][] = [
  [null, null],
  [false, false],
	[true, true],
];

describe('Shipping Options', () => {
	describe('Mapping dangerous goods category', () => {
		test.each(expectedResultsDangerousGoodsCategory)(
			'mapShippingOptions() maps dangerous_goods_category %o to %s',
			(input, expected) => {
        let dxOptions = mapShippingOptions({
          dangerous_goods_category: input
        });

				expect(dxOptions.dangerousGoodsCategory).toEqual(expected);
			},
		);
  });

  describe('Mapping bill duties to sender', () => {
		test.each(expectedResultsBillDutiesToSender)(
			'mapShippingOptions() maps bill_duties_to_sender %o to %s',
			(input, expected) => {
        let dxOptions = mapShippingOptions({
          bill_duties_to_sender: input
        });

				expect(dxOptions.billDutiesToSender).toEqual(expected);
			},
		);
	});
});
