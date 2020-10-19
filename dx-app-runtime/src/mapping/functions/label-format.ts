import { LabelFormat } from '@ipaas/capi/models';
import { DocumentFormat } from '@shipengine/connect-sdk';

export const mapLabelFormat = (format: LabelFormat): DocumentFormat => {
	switch (format) {
		case LabelFormat.PDF:
			return DocumentFormat.PDF;
		case LabelFormat.PNG:
			return DocumentFormat.PNG;
		case LabelFormat.ZPL:
			return DocumentFormat.ZPL;
		default:
			throw new Error(`unknown carrier api label format ${format}`);
	}
};
