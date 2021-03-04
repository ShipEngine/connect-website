import { LabelFormats } from '@shipengine/connect-carrier-api/lib/models';
import { DocumentFormat } from '@shipengine/connect-sdk';
import { mapLabelFormat } from '../../../src/mapping/functions';

const correctLabelFormats: any[][] = [
	[LabelFormats.Pdf, DocumentFormat.PDF],
	[LabelFormats.Png, DocumentFormat.PNG],
	[LabelFormats.Zpl, DocumentFormat.ZPL],
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
