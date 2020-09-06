export const isProd = process.env.NODE_ENV === "production";
export const isDev = !isProd;

const nonWordCharacterPattern = /\W+/g;
const slugSeparator = "-";

/**
 * Converts the given text to a slug, which can be used in an HTML "id" attribute
 */
export function slugify(text: string): string {
  text = text.toLowerCase().trim();
  text = text.replace(nonWordCharacterPattern, slugSeparator);

  if (text[0] === slugSeparator) {
    text = text.slice(1);
  }

  if (text[text.length - 1] === slugSeparator) {
    text = text.slice(0, -1);
  }

  return text;
}
