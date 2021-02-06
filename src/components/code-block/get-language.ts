import { Language } from "prism-react-renderer";

const languageClassNamePattern = /language-(\w+)/;


/**
 * Determines the programming language based on the CSS class name (e.g. "language-javascript")
 */
export function getLanguage(className: string | undefined): Language | undefined {
  const [, language] = languageClassNamePattern.exec(className || "") || [];
  return language as Language;
}
