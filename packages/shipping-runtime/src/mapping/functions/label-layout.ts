import { LabelLayouts } from '@shipengine/connect-carrier-api/lib/models';
import { DocumentSize } from '@shipengine/connect-sdk';

export const mapLabelLayout = (size?: LabelLayouts): DocumentSize => {
  switch (size) {
    case LabelLayouts.Letter:
      return DocumentSize.Letter;
    case LabelLayouts.FourBySix:
      return DocumentSize.Inches4x6;
    default:
      throw new Error(`unknown carrier api label layout ${size}`);
  }
};
