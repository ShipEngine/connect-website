import { DocumentSize } from '@shipengine/connect-sdk';

import { LabelLayout } from '@ipaas/capi/models';

export const mapDocumentSize = (format: DocumentSize): LabelLayout => {
  switch (format) {
    case DocumentSize.Inches4x6:
      return LabelLayout.The4X6;
    case DocumentSize.Inches4x8:
    case DocumentSize.Letter:
      return LabelLayout.Letter;
    default:
      throw new Error(`${format} is not a supported document size.`);
  }
};
