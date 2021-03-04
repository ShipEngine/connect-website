import { LabelFormats } from "@shipengine/connect-carrier-api/lib/models";
import { DocumentFormat } from "@shipengine/connect-sdk";

export const mapLabelFormat = (format?: LabelFormats): DocumentFormat => {
  switch (format) {
    case LabelFormats.Pdf:
      return DocumentFormat.PDF;
    case LabelFormats.Png:
      return DocumentFormat.PNG;
    case LabelFormats.Zpl:
      return DocumentFormat.ZPL;
    default:
      throw new Error(`unknown carrier api label format ${format}`);
  }
};
