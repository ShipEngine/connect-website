import {
  DocumentFormat
} from "@shipengine/integration-platform-sdk";

import {
  LabelFormat
} from "@ipaas/capi/models"

export const mapDxToCapiDocumentFormat = (format: DocumentFormat): LabelFormat => {
  switch(format) {
    case DocumentFormat.PDF:
      return LabelFormat.PDF;
    case DocumentFormat.PNG:
      return LabelFormat.PNG;
    case DocumentFormat.ZPL:
      return LabelFormat.PNG;
    default:
      throw new Error(`${format} is not a supported label format.`)
  }
}

export const mapCapiToDxDocumentFormat = (format: LabelFormat): DocumentFormat => {
  switch(format) {
    case LabelFormat.PDF:
      return DocumentFormat.PDF;
    case LabelFormat.PNG:
      return DocumentFormat.PNG;
    case LabelFormat.ZPL:
      return DocumentFormat.ZPL;
  }
}
