export interface ISplitTextIntoLines {
  (text: string, numberOfChars?: number | undefined): string;
}

export interface IAddTextToNewLine {
  (
    numberOfChars: number | undefined,
    currentLineWords: string[],
    lines: string[],
    word: string | undefined
  ): string[];
}

export interface IAddTextToCurrentLine {
  (lines: string[], currentLineWords: string[]): void;
}