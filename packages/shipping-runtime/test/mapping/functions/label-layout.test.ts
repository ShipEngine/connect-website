import { LabelLayouts } from '@ipaas/capi/models';
import { DocumentSize } from '@shipengine/connect';
import { mapLabelLayout } from '../../../src/mapping/functions';

const correctLabelFormats: any[][] = [
	[LabelLayouts.Letter, DocumentSize.Letter],
	[LabelLayouts.FourBySix, DocumentSize.Inches4x6],
];

describe('Label Formats', () => {
	describe('Mapping real label formats returns real document formats', () => {
		test.each(correctLabelFormats)(
			'mapLabelLayout(%o) maps to %s',
			(format, expected) => {
				expect(mapLabelLayout(format)).toEqual(expected);
			},
		);
	});
});
