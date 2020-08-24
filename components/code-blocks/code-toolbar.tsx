import { Language } from "prism-react-renderer";
import { Option, Select } from "../select";
import styles from "./code-toolbar.module.scss";

const languageOrder = ["javascript", "typescript", "json", "yaml"];

export interface CodeToolbarProps {
  languages?: Language[];
  selectedLanguage?: Language;
  onLanguageChange(language: Language): void;
  onCopy(): void;
}

/**
 * A toolbar that allows users to copy code to their clipboard, and select different programming languages
 */
export default function CodeToolbar({ languages, selectedLanguage, onLanguageChange, onCopy }: CodeToolbarProps) {
  languages.sort(sortLanguages);

  return (
    <form className={`invisible ${styles.codeToolbar}`}>
      <button className="button-small" onClick={(e) => { e.preventDefault(); onCopy() }}>
        Copy
      </button>
      {
        languages && languages.length > 1 &&
        <Select className={`${styles.languageList} ${styles[selectedLanguage]}`} value={selectedLanguage}
          onChange={e => onLanguageChange(e.target.value as Language)}>
          {
            languages.map((language, key) =>
              <Option key={key} className={`${styles.language} ${styles[language]}`}
                value={language} label={humanizeLanguage(language)} />
            )
          }
        </Select>
      }
    </form>
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
