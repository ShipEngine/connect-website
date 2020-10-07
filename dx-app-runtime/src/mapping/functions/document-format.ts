import { DocumentFormat } from '@shipengine/connect-sdk';

import { LabelFormat } from '@ipaas/capi/models';

export const mapDocumentFormat = (
  format: DocumentFormat
): LabelFormat => {
  switch (format) {
    case DocumentFormat.PDF:
      return LabelFormat.PDF;
    case DocumentFormat.ZPL:
      return LabelFormat.ZPL;
    case DocumentFormat.PNG:
      return LabelFormat.PNG;
  }
};
