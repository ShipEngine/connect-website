import { LabelLayouts } from '@shipengine/connect-carrier-api/lib/models';
import { DocumentSize } from '@shipengine/connect-sdk';
import { mapDocumentSize } from '../../../src/mapping/functions';

const correctLabelFormats: any[][] = [
	[DocumentSize.Inches4x6, LabelLayouts.FourBySix],
	[DocumentSize.Inches4x8, LabelLayouts.Letter],
	[DocumentSize.Letter, LabelLayouts.Letter],
];

const errorFormats: any[][] = [
	[undefined, 'undefined is not a supported document size.'],
	['garbage', 'garbage is not a supported document size.'],
	[DocumentSize.A4, 'A4 is not a supported document size.'],
	[DocumentSize.A6, 'A6 is not a supported document size.'],
];

describe('Label Formats', () => {
	describe('Mapping real label formats returns real document formats', () => {
		test.each(correctLabelFormats)(
			'mapDocumentSize(%o) maps to %s',
			(format, expected) => {
				expect(mapDocumentSize(format)).toEqual(expected);
			},
		);
	});
	describe('Mapping bad label formats throws an appropriate error', () => {
		test.each(errorFormats)(
			"mapDocumentSize(%o) throws an error '%s'",
			(format, expected) => {
				expect(() => mapDocumentSize(format)).toThrow(expected);
			},
		);
	});
});
