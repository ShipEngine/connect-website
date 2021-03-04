export enum NoteType {
  BackOrderMessage = "BackOrderMessage",
  ConditionNote = "ConditionNote",
  GiftMessage = "GiftMessage",
  InternalNotes = "InternalNotes",
  InStockMessage = "InStockMessage",
  MPN = "MPN",
  NotesFromBuyer = "NotesFromBuyer",
  NotesToBuyer = "NotesToBuyer",
  Other = "Other",
  OutOfStockMessage = "OutOfStockMessage",
  Reason = "Reason",
  SpecialInstructions = "SpecialInstructions",
  WarningLabel = "WarningLabel",
  FeedbackMessage = "FeedbackMessage",
}

export interface Note {
  type: NoteType;
  text: string;
}
