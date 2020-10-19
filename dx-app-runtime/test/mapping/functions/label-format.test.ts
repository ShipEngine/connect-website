import { LabelFormat } from '@ipaas/capi';
import { DocumentFormat } from '@shipengine/connect';
import { mapLabelFormat } from '../../../src/mapping/functions';

const correctLabelFormats: any[][] = [
	[LabelFormat.PDF, DocumentFormat.PDF],
	[LabelFormat.PNG, DocumentFormat.PNG],
	[LabelFormat.ZPL, DocumentFormat.ZPL],
];

const errorFormats: any[][] = [
	[undefined, 'unknown carrier api label format undefined'],
	['garbage', 'unknown carrier api label format garbage'],
];

describe('Label Formats', () => {
	describe('Mapping real label formats returns real document formats', () => {
		test.each(correctLabelFormats)(
			'mapLabelFormat(%o) maps to %s',
			(format, expected) => {
				expect(mapLabelFormat(format)).toEqual(expected);
			},
		);
	});
	describe('Mapping bad label formats throws an appropriate error', () => {
		test.each(errorFormats)(
			"mapLabelFormat(%o) throws an error '%s'",
			(format, expected) => {
				expect(() => mapLabelFormat(format)).toThrow(expected);
			},
		);
	});
});
