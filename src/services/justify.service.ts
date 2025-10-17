import type {
  ISplitTextIntoLines,
  IAddTextToNewLine,
  IAddTextToCurrentLine,
} from "./interfaces/justify.interface.js";

/**
 * Constants
 * @description Default maximum characters per line
 */
const DEFAULT_MAX_CHARS = 80;

/**
 * @description Splits text into lines of a specified maximum length
 * Each line will not exceed the maximum character limit
 * Words are kept intact and not split across lines
 * @type {string}
 */
export const splitTextIntoLines: ISplitTextIntoLines = (
  text: string,
  numberOfChars: number = DEFAULT_MAX_CHARS
): string => {
  const words: string[] = text
    .split(/\s+/)
    .filter((word: string) => word.length > 0);

  const lines: string[] = [];
  let currentLineWords: string[] = [];

  for (let i = 0; i < words.length; i++) {
    let word: string | undefined = words[i];
    currentLineWords = addTextToNewLine(
      numberOfChars,
      currentLineWords,
      lines,
      word
    );
  }
  addTextToCurrentLine(lines, currentLineWords);

  return lines.join("\n");
};

/**
 * @description Adds text to a new line if it exceeds the character limit
 * Checks if adding the word would exceed the line limit
 * If yes, pushes the current line and starts a new one with the word
 * If no, adds the word to the current line
 * @type {string[]}
 */
export const addTextToNewLine: IAddTextToNewLine = (
  numberOfChars: number = DEFAULT_MAX_CHARS,
  currentLineWords: string[],
  lines: string[],
  word: string | undefined
): string[] => {
  const currentWordsLength: number = currentLineWords.join(" ").length;
  const spaceNeeded: 0 | 1 = currentLineWords.length > 0 ? 1 : 0;
  let newLength: number =
    currentWordsLength + spaceNeeded + (word !== undefined ? word.length : 0);

  if (newLength > numberOfChars && currentWordsLength > 0) {
    lines.push(currentLineWords.join(" "));
    if (word !== undefined) {
      return [word]; // ✅ Return new array
    }
  } else {
    if (word !== undefined) {
      currentLineWords.push(word);
    }
  }

  return currentLineWords; // ✅ Return current array
};

/**
 * @description Adds the current line to the lines array
 * Finalizes the last line being built and adds it to the completed lines
 * Only adds if the current line contains words
 * @type {void}
 */
export const addTextToCurrentLine: IAddTextToCurrentLine = (
  lines: string[],
  currentLineWords: string[]
) => {
  if (currentLineWords.length > 0) {
    lines.push(currentLineWords.join(" "));
  }
};

/**
 * @description Justifies the given text to the specified maximum line length
 * Splits text into lines and distributes spaces evenly to reach the character limit
 * Last line is not justified (left-aligned)
 * @type {string}
 */
export const justifyText = (
  text: string,
  numberOfCharsMax: number = DEFAULT_MAX_CHARS
) => {
  const lines: string = splitTextIntoLines(text, numberOfCharsMax);
  const linesArray: string[] = lines.split("\n");

  const justifiedLines = [];
  for (let i = 0; i < linesArray.length; i++) {
    if (i === linesArray.length - 1) {
      // Last line: do not justify
      justifiedLines.push(linesArray[i]);
    } else {
      const justifiedLine = justifyLine(linesArray[i]!, numberOfCharsMax);
      justifiedLines.push(justifiedLine);
    }
  }
  return justifiedLines.join("\n");
};

/**
 * @description Justifies a single line to the specified maximum length
 * Distributes spaces evenly between words to reach exactly the character limit
 * Extra spaces are distributed from left to right
 * Single-word lines are returned as-is
 * @type {string}
 */
const justifyLine = (
  line: string,
  numberOfCharsMax: number = DEFAULT_MAX_CHARS
) => {
  const words = line.split(" ");
  if (words.length === 1) return line;

  const lengthOfWords = words.join("").length;
  const totalSpaces = numberOfCharsMax - lengthOfWords;
  const numberOfGaps = words.length - 1;

  const spacePerGap = Math.floor(totalSpaces / numberOfGaps);
  const extraSpaces = totalSpaces % numberOfGaps;

  let result: string = "";
  for (let i = 0; i < words.length; i++) {
    result += words[i];
    if (i < words.length - 1) {
      const spaces = spacePerGap + (i < extraSpaces ? 1 : 0);
      result += " ".repeat(spaces);
    }
  }
  return result;
};
