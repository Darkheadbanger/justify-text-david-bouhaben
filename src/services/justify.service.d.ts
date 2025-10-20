import type { ISplitTextIntoLines, IAddTextToNewLine, IAddTextToCurrentLine, IJustifyLine, IJustifyText } from "./interfaces/justify.interface.js";
/**
 * Constants
 * @description Default maximum characters per line
 */
export declare const DEFAULT_MAX_CHARS = 80;
/**
 * @description Splits text into lines of a specified maximum length
 * Each line will not exceed the maximum character limit
 * Words are kept intact and not split across lines
 * @type {string}
 */
export declare const splitTextIntoLines: ISplitTextIntoLines;
/**
 * @description Adds text to a new line if it exceeds the character limit
 * Checks if adding the word would exceed the line limit
 * If yes, pushes the current line and starts a new one with the word
 * If no, adds the word to the current line
 * @type {string[]}
 */
export declare const addTextToNewLine: IAddTextToNewLine;
/**
 * @description Adds the current line to the lines array
 * Finalizes the last line being built and adds it to the completed lines
 * Only adds if the current line contains words
 * @type {void}
 */
export declare const addTextToCurrentLine: IAddTextToCurrentLine;
/**
 * @description Justifies the given text to the specified maximum line length
 * Splits text into lines and distributes spaces evenly to reach the character limit
 * Last line is not justified (left-aligned)
 * @type {string}
 */
export declare const justifyText: IJustifyText;
/**
 * @description Justifies a single line to the specified maximum length
 * Distributes spaces evenly between words to reach exactly the character limit
 * Extra spaces are distributed from left to right
 * Single-word lines are returned as-is
 * @type {string}
 */
export declare const justifyLine: IJustifyLine;
//# sourceMappingURL=justify.service.d.ts.map