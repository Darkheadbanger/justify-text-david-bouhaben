/**
 * @description Extracts all words from a text
 * Words are separated by whitespace (spaces, tabs, newlines)
 * Empty strings are ignored
 * @type {string[]}
 */
export const countWords = (text: string): string[] => {
  const words: string[] = text
    .split(/\s+/)
    .filter((word: string) => word.length > 0);
  return words;
};
