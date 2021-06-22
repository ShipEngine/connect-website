/**
 * @description The standardized type associated with a note
 */
export enum NoteType {
  BackOrderMessage = 'BackOrderMessage',
  ConditionNote = 'ConditionNote',
  GiftMessage = 'GiftMessage',
  InternalNotes = 'InternalNotes',
  InStockMessage = 'InStockMessage',
  MPN = 'MPN',
  NotesFromBuyer = 'NotesFromBuyer',
  NotesToBuyer = 'NotesToBuyer',
  Other = 'Other',
  OutOfStockMessage = 'OutOfStockMessage',
  Reason = 'Reason',
  SpecialInstructions = 'SpecialInstructions',
  WarningLabel = 'WarningLabel',
  FeedbackMessage = 'FeedbackMessage',
}

/**
 * @description This represents a note to the buyer, seller, or recipient
 */
export interface Note {
  /** @description The type of note being sent */
  type: NoteType;
  /** @description The contents of the note */
  text: string;
}
