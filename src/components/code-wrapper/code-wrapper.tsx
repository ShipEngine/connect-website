import { Language } from 'prism-react-renderer'
import React, { MouseEvent, ReactElement, ReactNode, useContext } from 'react'
import { getTypeName, Props, toArray } from '../../lib/react-nodes'
import { CodeBlock, CodeBlockProps } from '../code-block/code-block'
import { getLanguage } from '../code-block/get-language'
import { CodeToolbar } from '../code-toolbar/code-toolbar'
import { UserSettingsContext } from '../user-settings/user-settings-context'
import styles from './code-wrapper.module.scss'

interface CodeWrapperProps {
  children?: ReactNode
}

/**
 * Wraps multiple code blocks and displays a drop-down language picker to switch between them
 */
export function CodeWrapper({ children }: CodeWrapperProps) {
  const codeBlocks = getCodeBlocks(children)
  const languages = getLanguages(codeBlocks)

  // eslint-disable-next-line prefer-const
  const userSettings = useContext(UserSettingsContext)
  let selectedLanguage = userSettings.preferredLanguage
  if (!selectedLanguage || !languages.includes(selectedLanguage)) {
    selectedLanguage = languages[0]
  }

  // Closes the language selector dropdown list when the mouse leaves the code block
  const closeLanguageList = (e: MouseEvent<HTMLDivElement>) =>
    e.currentTarget.querySelector<HTMLSelectElement>(`.select`)?.blur()

  return (
    <div className={styles.codeWrapper} onMouseLeave={closeLanguageList}>
      {codeBlocks.map(({ className, ...props }, index) => {
        const language = getLanguage(className)
        className += ' ' + (language === selectedLanguage ? styles.selectedCodeBlock : styles.codeBlock)
        return <CodeBlock {...props} key={index} className={className} />
      })}
      <CodeToolbar
        languages={languages}
        selectedLanguage={selectedLanguage}
        onLanguageChange={(preferredLanguage) => userSettings.update({ preferredLanguage })}
        getCode={() => findCodeBlock(codeBlocks, selectedLanguage).children}
      />
    </div>
  )
}

/**
 * Returns the prps of all the code blocks
 */
function getCodeBlocks(children: ReactNode): CodeBlockProps[] {
  const preChildren = toArray(children) as ReactElement<Props>[]
  const codeBlocks: CodeBlockProps[] = []

  for (const pre of preChildren) {
    if (getTypeName(pre) === 'pre') {
      const codeChildren = toArray(pre.props.children) as ReactElement<CodeBlockProps>[]
      if (codeChildren.length === 1 && getTypeName(codeChildren[0]) === 'code') {
        codeBlocks.push(codeChildren[0].props)
      }
    }
  }

  return codeBlocks
}

/**
 * Returns the programming languages of the code blocks
 */
function getLanguages(codeBlocks: CodeBlockProps[]): Language[] {
  return codeBlocks.map((codeBlock) => getLanguage(codeBlock.className)).filter(Boolean) as Language[]
}

/**
 * Returns the code block for the selected language
 */
function findCodeBlock(codeBlocks: CodeBlockProps[], selectedLanguage: Language | undefined): CodeBlockProps {
  if (selectedLanguage) {
    for (const codeBlock of codeBlocks) {
      if (codeBlock.className && codeBlock.className.includes(`language-${selectedLanguage}`)) {
        return codeBlock
      }
    }
  }

  return {}
}
