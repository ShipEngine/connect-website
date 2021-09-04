import { slugify } from '../../lib/utils'
import styles from './table-of-contents.module.scss'

interface TableOfContentsProps {
  headings: Array<Heading>
}

export interface Heading {
  level: number
  text: string
}

/**
 * Links to the major sections on the page
 */
export function TableOfContents({ headings }: TableOfContentsProps) {
  return (
    <nav id="table-of-contents" className={styles.toc}>
      {headings.map((heading, index) => {
        // For the H1 heading, just scroll to the top of the page
        const slug = heading.level === 1 ? '' : slugify(heading.text)

        return (
          <a key={index} href={`#${slug}`}>
            {heading.text}
          </a>
        )
      })}
    </nav>
  )
}
