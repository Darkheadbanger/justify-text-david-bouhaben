import { describe, it, expect, beforeEach } from "vitest";

import { saveToken, getToken } from "../storage.service.js";

describe("Storage Service - Token Management", () => {
  describe("saveToken and getToken", () => {
    it("should save and retrieve a token for a given email", () => {
      const email: string = "test@mail.com";
      const token: string = "token123";

      saveToken(email, token);
      const retrievedTokenFromEmail: string | undefined = getToken(email);

      expect(retrievedTokenFromEmail).toBe(token);
    });

    it("should return undefined for non-existent email", () => {
      const result: string | undefined = getToken(
        "non-existent@mail.com"
      );

      expect(result).toBeUndefined();
    });

    it("should replace existing token when saving with same email", () => {
      const email: string = "replace@mail.com";
      const oldToken: string = "oldToken123";
      const newToken: string = "newToken456";

      saveToken(email, oldToken);
      saveToken(email, newToken);
      const retrievedToken: string | undefined = getToken(email);

      expect(retrievedToken).toBe(newToken);
      expect(retrievedToken).not.toBe(oldToken);
    });
  });
});
