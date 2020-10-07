import { LabelLayout } from '@ipaas/capi';
import { DocumentSize } from '@shipengine/connect';
import { mapDocumentSize } from '../../../src/mapping/functions';

const correctLabelFormats: any[][] = [
    [DocumentSize.Inches4x6, LabelLayout.The4X6],
    [DocumentSize.Inches4x8, LabelLayout.Letter],
    [DocumentSize.Letter, LabelLayout.Letter],
];

const errorFormats: any[][] = [
    [undefined, 'undefined is not a supported document size.'],
    ['garbage', 'garbage is not a supported document size.'],
    [DocumentSize.A4, 'A4 is not a supported document size.'],
    [DocumentSize.A6, 'A6 is not a supported document size.'],
]

describe('Label Formats', () => {
    describe('Mapping real label formats returns real document formats', () => {
        test.each(correctLabelFormats)('mapDocumentSize(%o) maps to %s', (format, expected) => {
            expect(mapDocumentSize(format)).toEqual(expected);
        });
    });
    describe('Mapping bad label formats throws an appropriate error', () => {
        test.each(errorFormats)('mapDocumentSize(%o) throws an error \'%s\'', (format, expected) => {
            expect(() => mapDocumentSize(format)).toThrow(expected);
        });
    });
})