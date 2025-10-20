import { describe } from "node:test";
import { expect, it } from "vitest";
import { justifyLine, justifyText, splitTextIntoLines, } from "../justify.service.js";
/**
 * @description Test Suite for Justify Service
 * Focuses on text justification functionalities.
 * Uses Vitest for testing.
 * Covers:
 * - Justifying text to specified line lengths
 * - Splitting text into lines based on character limits
 * - Ensuring proper word distribution in justified lines
 */
describe("Justify Service", () => {
    describe("justifyText", () => {
        it("Should justify lines to exactly 80 characters (except last line)", () => {
            const text = "This is an example of text that needs to be justified properly to ensure that each line reaches the specified maximum character limit.";
            const numberOfCharsMax = 80;
            const result = justifyText(text, numberOfCharsMax);
            const resultLines = result.split("\n");
            // All lines except the last one should be exactly 80 characters
            for (let i = 0; i < resultLines.length - 1; i++) {
                expect(resultLines[i].length).toBe(80);
            }
            // Last line can be less than or equal to 80 characters
            const lastLine = resultLines[resultLines.length - 1];
            expect(lastLine.length).toBeLessThanOrEqual(80);
        });
    });
    it("Should justify a single line to exactly 80 characters", () => {
        const line = "This is a single line that needs to be justified.";
        const justifiedLine = justifyLine(line, 80);
        // The justified line should be exactly 80 characters
        expect(justifiedLine.length).toBe(80);
    });
    it("Should return unchanged line if only one word", () => {
        const line = "Supercalifragilisticexpialidocious";
        const justifiedLine = justifyLine(line, 80);
        // Single word cannot be justified, should remain unchanged
        expect(justifiedLine).toBe(line);
    });
    it("Should preserve all words in the justified line", () => {
        const line = "Hello world this is a test";
        const justifiedLine = justifyLine(line, 80);
        // Extract words from both lines
        const originalWords = line.split(/\s+/);
        const justifiedWords = justifiedLine.split(/\s+/);
        // Words should be identical
        expect(justifiedWords).toEqual(originalWords);
    });
});
/**
 * @description Test Suite for splitTextIntoLines function
 * Focuses on splitting text into lines based on character limits.
 * Uses Vitest for testing.
 * covers:
 * - Splitting text into multiple lines
 * - Handling short text without splitting
 * - Preserving all words after splitting
 */
describe("splitTextIntoLines", () => {
    it("Should split text into multiple lines when exceeding character limit", () => {
        const text = "Hello world this is a test that needs to be split into multiple lines";
        const numberOfChars = 20;
        const result = splitTextIntoLines(text, numberOfChars);
        const lines = result.split("\n");
        // Should create multiple lines
        expect(lines.length).toBeGreaterThan(1);
        // Each line should be <= 20 characters
        for (const line of lines) {
            expect(line.length).toBeLessThanOrEqual(numberOfChars);
        }
    });
    it("Should return single line when text is short", () => {
        const text = "Hello world";
        const numberOfChars = 80;
        const result = splitTextIntoLines(text, numberOfChars);
        const lines = result.split("\n");
        // Should be only one line
        expect(lines.length).toBe(1);
        expect(lines[0]).toBe("Hello world");
    });
    it("Should preserve all words after splitting", () => {
        const text = "Hello world this is a test";
        const numberOfChars = 20;
        const result = splitTextIntoLines(text, numberOfChars);
        // Extract all words from original and result
        const originalWords = text.split(/\s+/).filter((w) => w.length > 0);
        const resultWords = result.split(/\s+/).filter((w) => w.length > 0);
        // All words should be preserved
        expect(resultWords).toEqual(originalWords);
    });
});
//# sourceMappingURL=justify.test.js.map