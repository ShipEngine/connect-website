export const isProd = process.env.NODE_ENV === "production";
export const isDev = !isProd;

const nonWordCharacterPattern = /\W+/g;

/**
 * Converts the given text to a slug, which can be used in an HTML "id" attribute
 */
export function slugify(text: string): string {
  text = text.toLowerCase().trim();
  text = text.replace(nonWordCharacterPattern, "-");
  return text;
}
