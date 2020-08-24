import { Language } from "prism-react-renderer";
import { MouseEvent, ReactElement, ReactNode, useState } from "react";
import { getTypeName, Props, toArray } from "../../lib/react-nodes";
import CodeBlock, { CodeBlockProps, getLanguage } from "./code-block";
import CodeToolbar from "./code-toolbar";
import styles from "./code-wrapper.module.scss";

interface CodeWrapperProps {
  children?: ReactNode;
}

/**
 * Wraps multiple code blocks and displays a drop-down language picker to switch between them
 */
export default function CodeWrapper({ children }: CodeWrapperProps) {
  const codeBlocks = getCodeBlocks(children);
  const languages = getLanguages(codeBlocks);

  // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  //
  //        TODO: Store the user's language selection in localStorage
  //
  // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  // eslint-disable-next-line prefer-const
  let [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  if (!languages.includes(selectedLanguage)) {
    selectedLanguage = languages[0];
    setSelectedLanguage(selectedLanguage);
  }

  // Closes the language selector dropdown list when the mouse leaves the code block
  const closeLanguageList = (e: MouseEvent<HTMLDivElement>) =>
    e.currentTarget.querySelector<HTMLSelectElement>(`.select`)?.blur();

  return (
    <div className={styles.codeWrapper} onMouseLeave={closeLanguageList}>
      {
        codeBlocks.map(({ className, ...props }, index) => {
          const language = getLanguage(className);
          className += " " + (language === selectedLanguage ? styles.selectedCodeBlock : styles.codeBlock);
          return <CodeBlock {...props} key={index} className={className} />;
        })
      }
      <CodeToolbar
        languages={languages}
        selectedLanguage={selectedLanguage}
        onLanguageChange={(lang) => setSelectedLanguage(lang)}
        onCopy={() => copyCode(codeBlocks, selectedLanguage)}
      />
    </div>
  );
}


/**
 * Returns the prps of all the code blocks
 */
function getCodeBlocks(children: ReactNode): CodeBlockProps[] {
  const preChildren = toArray(children) as ReactElement<Props>[];
  const codeBlocks: CodeBlockProps[] = [];

  for (const pre of preChildren) {
    if (getTypeName(pre) === "pre") {
      const codeChildren = toArray(pre.props.children) as ReactElement<CodeBlockProps>[];
      if (codeChildren.length === 1 && getTypeName(codeChildren[0]) === "code") {
        codeBlocks.push(codeChildren[0].props);
      }
    }
  }

  return codeBlocks;
}


/**
 * Returns the programming languages of the code blocks
 */
function getLanguages(codeBlocks: CodeBlockProps[]): Language[] {
  return codeBlocks.map(codeBlock => getLanguage(codeBlock.className));
}


/**
 * Copies the current code block to the clipboard
 */
function copyCode(codeBlocks: CodeBlockProps[], selectedLanguage: Language): void {
  // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  //
  //        TODO: Implement copy-to-clipboard
  //
  // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  // eslint-disable-next-line prefer-const
  console.warn("not implemented yet");
}
