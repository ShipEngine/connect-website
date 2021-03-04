import { NotePOJO, NoteType } from "@shipengine/connect-sdk";

export const mapLocationNotes = (
  locationNotes: string | undefined | null
): NotePOJO[] | undefined => {
  if (!locationNotes) {
    return undefined;
  }
  return [
    {
      text: locationNotes,
      type: NoteType.Internal,
    },
  ];
};
