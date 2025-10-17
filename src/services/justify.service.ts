import type {
  ISplitTextIntoLines,
  IAddTextToNewLine,
  IAddTextToCurrentLine,
} from "./interfaces/justify.interface.js";

export const splitTextIntoLines: ISplitTextIntoLines = (
  text: string,
  numberOfChars: number = 80
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
  numberOfChars: number = 80,
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
      return [word]; // ✅ Retourner le nouveau tableau
    }
  } else {
    if (word !== undefined) {
      currentLineWords.push(word);
    }
  }

  return currentLineWords; // ✅ Retourner le tableau actuel
};

export const addTextToCurrentLine: IAddTextToCurrentLine = (
  lines: string[],
  currentLineWords: string[]
) => {
  if (currentLineWords.length > 0) {
    lines.push(currentLineWords.join(" "));
  }
};

export const justifyText = () => {};
