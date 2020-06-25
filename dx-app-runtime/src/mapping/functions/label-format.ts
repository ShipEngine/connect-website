import {
  LabelFormat,
  LabelFormat as capiLabelFormat,
} from "@ipaas/capi/models";
import { DocumentFormat } from "@shipengine/integration-platform-sdk";

export const capiToDxLabelFormat = (
  format: capiLabelFormat
): DocumentFormat => {
  switch (format) {
    case capiLabelFormat.PDF:
      return DocumentFormat.PDF;
    case capiLabelFormat.PNG:
      return DocumentFormat.PNG;
    case capiLabelFormat.ZPL:
      return DocumentFormat.ZPL;
    default:
      throw new Error(
        `unknown carrier api label format ${format} defaulting to PDF`
      );
  }
};

export const dxToCapiLabelFormat = (
  format: DocumentFormat
): capiLabelFormat => {
  switch (format) {
    case DocumentFormat.PDF:
      return LabelFormat.PDF;
    case DocumentFormat.HTML:
      throw new Error("html is not supported by CAPI");
      break;
    case DocumentFormat.ZPL:
      return capiLabelFormat.ZPL;
      break;
    case DocumentFormat.PNG:
      return capiLabelFormat.PNG;
      break;
  }
};
