import { LabelLayout } from '@ipaas/capi/models';
import { DocumentSize } from '@shipengine/connect-sdk';

export const mapLabelLayout = (size: LabelLayout): DocumentSize => {
  switch (size) {
    case LabelLayout.Letter:
      return DocumentSize.Letter;
    case LabelLayout.The4X6:
      return DocumentSize.Inches4x6;
  }
};
