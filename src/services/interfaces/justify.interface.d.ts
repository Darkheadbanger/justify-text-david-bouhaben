/**
 * @description Interface for splitting text into lines
 * Each line will have a maximum number of characters
 * @param text - The input text to split
 * @param numberOfChars - Maximum characters per line (default: 80)
 * @returns The text split into lines separated by newline characters
 */
export interface ISplitTextIntoLines {
    (text: string, numberOfChars?: number | undefined): string;
}
/**
 * @description Interface for adding text to a new line
 * Checks if the word fits on the current line or needs a new line
 * @param numberOfChars - Maximum characters per line
 * @param currentLineWords - Array of words in the current line
 * @param lines - Array of completed lines
 * @param word - The word to add
 * @returns Updated array of current line words
 */
export interface IAddTextToNewLine {
    (numberOfChars: number | undefined, currentLineWords: string[], lines: string[], word: string | undefined): string[];
}
/**
 * @description Interface for adding the current line to the lines array
 * Finalizes the current line being built
 * @param lines - Array of completed lines
 * @param currentLineWords - Array of words in the current line
 */
export interface IAddTextToCurrentLine {
    (lines: string[], currentLineWords: string[]): void;
}
export interface IJustifyText {
    (text: string, numberOfCharsMax?: number): string;
}
export interface IJustifyLine {
    (line: string, numberOfCharsMax?: number): string;
}
//# sourceMappingURL=justify.interface.d.ts.map