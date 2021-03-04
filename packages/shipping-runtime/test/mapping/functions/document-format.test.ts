import { LabelFormats } from '@shipengine/connect-carrier-api/lib/models';
import { DocumentFormat } from '@shipengine/connect-sdk';
import { mapDocumentFormat } from '../../../src/mapping/functions';

const correctLabelFormats: any[][] = [
	[DocumentFormat.PDF, LabelFormats.Pdf],
	[DocumentFormat.PNG, LabelFormats.Png],
	[DocumentFormat.ZPL, LabelFormats.Zpl],
];

describe('Document Formats', () => {
	describe('Mapping real document formats returns real label formats', () => {
		test.each(correctLabelFormats)(
			'mapDocumentFormat(%o) maps to %s',
			(format, expected) => {
				expect(mapDocumentFormat(format)).toEqual(expected);
			},
		);
	});
});
