import type {
  ISplitTextIntoLines,
  IAddTextToNewLine,
  IAddTextToCurrentLine,
} from "./interfaces/justify.interface.js";

const DEFAULT_MAX_CHARS = 80;

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

export const addTextToCurrentLine: IAddTextToCurrentLine = (
  lines: string[],
  currentLineWords: string[]
) => {
  if (currentLineWords.length > 0) {
    lines.push(currentLineWords.join(" "));
  }
};

export const justifyText = (text: string, numberOfCharsMax: number = DEFAULT_MAX_CHARS) => {
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

const justifyLine = (line: string, numberOfCharsMax: number = DEFAULT_MAX_CHARS) => {
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
