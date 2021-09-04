import { Language } from 'prism-react-renderer'
import styles from './code-toolbar.module.scss'
import { CopyButton } from './copy-button'
import { LanguageList } from './language-list'

export interface CodeToolbarProps {
  languages: Language[]
  selectedLanguage: Language
  onLanguageChange(language: Language): void
  getCode(): string | undefined
}

/**
 * A toolbar that allows users to copy code to their clipboard, and select different programming languages
 */
export function CodeToolbar({ languages, selectedLanguage, onLanguageChange, getCode }: CodeToolbarProps) {
  return (
    <form className={`invisible ${styles.codeToolbar}`}>
      <CopyButton getCode={getCode} />
      <LanguageList languages={languages} selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} />
    </form>
  )
}
