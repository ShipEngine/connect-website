import { Token } from './token'

/**
 * Removes blank lines from the beginning and end of a code block
 */
export function trimLines(lines: Token[][]): Token[][] {
  let startIndex = 0,
    endIndex = 0

  // Find the first non-empty line
  for (let i = 0; i < lines.length; i++) {
    if (hasText(lines[i])) {
      startIndex = i
      break
    }
  }

  // Find the last non-empty line
  for (let i = lines.length - 1; i >= 0; i--) {
    if (hasText(lines[i])) {
      endIndex = i
      break
    }
  }

  return lines.slice(startIndex, endIndex + 1)
}

/**
 * Determines whether a line contains any text.
 */
function hasText(line: Token[]): boolean {
  return line.length > 1 || (line.length === 1 && !line[0].empty)
}
