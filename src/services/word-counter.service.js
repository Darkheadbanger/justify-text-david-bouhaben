/**
 * @description Extracts all words from a text
 * Words are separated by whitespace (spaces, tabs, newlines)
 * Empty strings are ignored
 * @type {string[]}
 */
export const countWords = (text) => {
    const words = text
        .split(/\s+/)
        .filter((word) => word.length > 0);
    return words;
};
//# sourceMappingURL=word-counter.service.js.map