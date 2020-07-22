import { DocumentSize } from '@shipengine/integration-platform-sdk';

import { LabelLayout } from '@ipaas/capi/models';

export const mapDxToCapiDocumentSize = (format: DocumentSize): LabelLayout => {
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

export const mapCapiToDxDocumentSize = (format: LabelLayout): DocumentSize => {
  switch (format) {
    case LabelLayout.The4X6:
      return DocumentSize.Inches4x6;
    case LabelLayout.Letter:
      return DocumentSize.Letter;
  }
};
