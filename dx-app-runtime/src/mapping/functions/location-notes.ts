import { NotePOJO, NoteType } from '@shipengine/connect';

export const mapLocationNotes = (
	locationNotes: string | undefined | null,
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
