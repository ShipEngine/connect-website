import { LabelLayout } from '@ipaas/capi';
import { DocumentSize } from '@shipengine/connect';
import { mapLabelLayout } from '../../../src/mapping/functions';

const correctLabelFormats: any[][] = [
    [LabelLayout.Letter, DocumentSize.Letter],
    [LabelLayout.The4X6, DocumentSize.Inches4x6],
];

describe('Label Formats', () => {
    describe('Mapping real label formats returns real document formats', () => {
        test.each(correctLabelFormats)('mapLabelLayout(%o) maps to %s', (format, expected) => {
            expect(mapLabelLayout(format)).toEqual(expected);
        });
    });
})