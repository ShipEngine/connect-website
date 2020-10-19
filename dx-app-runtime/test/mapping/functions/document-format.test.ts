import { LabelFormat } from '@ipaas/capi';
import { DocumentFormat } from '@shipengine/connect';
import { mapDocumentFormat } from '../../../src/mapping/functions';

const correctLabelFormats: any[][] = [
	[DocumentFormat.PDF, LabelFormat.PDF],
	[DocumentFormat.PNG, LabelFormat.PNG],
	[DocumentFormat.ZPL, LabelFormat.ZPL],
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
