import { describe } from "node:test";
import { expect, it } from "vitest";
import { countWords } from "../word-counter.service.js";

describe("Word Counter Service", () => {
  it("Should extract all words from a given text", () => {
    const text: string = "This is some simple hello world text.";
    const actualWords = countWords(text);
    const expectedWords: string[] = text
      .split(/\s+/)
      .filter((word: string) => word.length > 0);

    expect(actualWords).toEqual(expectedWords);
    expect(actualWords.length).toBe(7);
  });

  it("Should return empty array for empty string", () => {
    const text: string = "";
    const actualWords = countWords(text);
    const expectedWords: string[] = [];

    expect(actualWords).toEqual(expectedWords);
    expect(actualWords.length).toBe(0);
  });

  it("Should handle multiple spaces correctly", () => {
    const text: string = "Hello    world    this";
    const actualWords = countWords(text);
    const expectedWords: string[] = ["Hello", "world", "this"];

    expect(actualWords).toEqual(expectedWords);
    expect(actualWords.length).toBe(3);
  });

  it("Should handle newlines and tabs", () => {
    const text: string = "Hello\nworld\tthis";
    const actualWords = countWords(text);
    const expectedWords: string[] = ["Hello", "world", "this"];

    expect(actualWords).toEqual(expectedWords);
    expect(actualWords.length).toBe(3);
  });
});
