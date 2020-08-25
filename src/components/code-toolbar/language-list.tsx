import { Language } from "prism-react-renderer";
import { Option, Select } from "../select/select";
import styles from "./language-list.module.scss";

const languageOrder = ["javascript", "typescript", "json", "yaml"];


export interface LanguageListProps {
  languages?: Language[];
  selectedLanguage?: Language;
  onLanguageChange(language: Language): void;
}


/**
 * A dropdown list of programming languages
 */
export function LanguageList({ languages, selectedLanguage, onLanguageChange }: LanguageListProps) {
 if (!languages || languages.length < 2) {
   return null;
 }

languages.sort(sortLanguages);

 return (
    <Select className={`${styles.languageList} ${styles[selectedLanguage]}`} value={selectedLanguage}
      onChange={e => onLanguageChange(e.target.value as Language)}>
      {
        languages.map((language, key) =>
          <Option key={key} className={`${styles.language} ${styles[language]}`}
            value={language} label={humanizeLanguage(language)} />
        )
      }
    </Select>
 );
}


/**
 * Sorts languages in a specific order
 */
function sortLanguages(a: Language, b: Language): number {
  const aIndex = languageOrder.indexOf(a);
  const bIndex = languageOrder.indexOf(b);

  if (aIndex === bIndex) {
    return 0;
  }
  else if (aIndex === -1) {
    return 1;
  }
  else if (bIndex === -1) {
    return -1;
  }
  else {
    return aIndex - bIndex;
  }
}


/**
 * Returns the user-friendly name of a Language
 */
function humanizeLanguage(language: Language): string {
  switch (language) {
    case "javascript":
      return "JavaScript";

    case "typescript":
      return "TypeScript";

    default:
      return language.toUpperCase();
  }
}
