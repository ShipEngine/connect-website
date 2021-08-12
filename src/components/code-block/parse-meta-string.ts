const metastringAttributePattern = /(\w+)=(?:"([^"]+)"|(\w+))/g

/**
 * The parsed metastring
 */
export interface Meta {
  highlight: number[]
  lineNumbers?: boolean
}

/**
 * Parse any extra properties on the MDX code fence.
 *
 * @example
 * ```
 * ```javascript highlight="1-5, 22, 28" lineNumbers=false
 * ```
 */
export function parseMetaString(metastring: string | undefined): Meta {
  const meta: Meta = {
    highlight: [],
    lineNumbers: undefined,
  }
  let match: RegExpExecArray | null

  while ((match = metastringAttributePattern.exec(metastring || '')) !== null) {
    const propName = match[1]
    const value = match[2] || match[3]

    switch (propName) {
      case 'lineNumbers':
        meta.lineNumbers = value === 'true'
        break

      case 'highlight':
        meta.highlight = parseLineNumbers(value)
        break
    }
  }

  return meta
}

/**
 * Parses a list of line numbers
 *
 * @example
 * "1-5, 22, 28"  ==> [1, 2, 3, 4, 5, 22, 28]
 */
function parseLineNumbers(numbers: string): number[] {
  const ranges = numbers.split(',').map(trim).filter(Boolean)
  const lineNumbers: number[] = []

  for (const range of ranges) {
    if (range.includes('-')) {
      // This is a range, like "1-5" or "1 - 5"
      const [start, stop] = range.split('-').map(trim)
      const startNumber = parseInt(start)
      const stopNumber = parseInt(stop)

      for (let i = startNumber; i < stopNumber; i++) {
        lineNumbers.push(i)
      }
    } else {
      // This is a single line number
      lineNumbers.push(parseInt(range))
    }
  }

  return lineNumbers
}

function trim(str: string): string {
  return str.trim()
}
