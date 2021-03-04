import { DocumentFormat } from "@shipengine/connect-sdk";

import { LabelFormats } from "@shipengine/connect-carrier-api/lib/models";

export const mapDocumentFormat = (format: DocumentFormat): LabelFormats => {
  switch (format) {
    case DocumentFormat.PDF:
      return LabelFormats.Pdf;
    case DocumentFormat.ZPL:
      return LabelFormats.Zpl;
    case DocumentFormat.PNG:
      return LabelFormats.Png;
  }
};
