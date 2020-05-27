import { LabelLayout } from "../capi/models/label-layout";
import { LabelSize } from "@shipengine/ipaas";

export default (size: LabelLayout): LabelSize => {
  switch(size)
  {
    case LabelLayout.Letter:
      return LabelSize.Inches4x8;
    case LabelLayout.The4X6:
      return LabelSize.Inches4x6;
  }
}
