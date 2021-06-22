import { DocumentSize } from '@shipengine/connect-sdk';

import { LabelLayouts } from '@shipengine/connect-carrier-api/lib/models';

export const mapDocumentSize = (format: DocumentSize): LabelLayouts => {
  switch (format) {
    case DocumentSize.Inches4x6:
      return LabelLayouts.FourBySix;
    case DocumentSize.Inches4x8:
    case DocumentSize.Letter:
      return LabelLayouts.Letter;
    default:
      throw new Error(`${format} is not a supported document size.`);
  }
};
