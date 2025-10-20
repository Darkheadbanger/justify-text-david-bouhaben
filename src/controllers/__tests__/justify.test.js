import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { tokens, userWordCounters } from "../../services/storage.service.js";
/**
 * @description Test Suite for Justify Controller
 * Focuses on the /api/justify endpoint.
 * Uses Vitest and Supertest for integration testing.
 * Covers:
 * - Justifying text via the API
 * - Authentication using tokens
 * - Word usage tracking and limits
 */
describe("Justify Controller", () => {
    let validToken;
    beforeEach(async () => {
        // Clear storage before each test
        tokens.clear();
        userWordCounters.clear();
        // Generate a valid token
        const tokenResponse = await request(app)
            .post("/api/token")
            .send({ email: "justify-test@example.com" });
        validToken = tokenResponse.text;
    });
    it("Should justify text correctly", async () => {
        const text = "For a long time, I went to bed early. Sometimes, my candle barely out, my eyes would close so quickly that I did not have time to say to myself: I am falling asleep.";
        const response = await request(app)
            .post("/api/justify")
            .set("Authorization", `Bearer ${validToken}`)
            .set("Content-Type", "text/plain")
            .send(text)
            .expect(200);
        expect(response.text).toBeDefined();
        expect(response.text.length).toBeGreaterThan(0);
        // Verify that text has been justified
        const lines = response.text.split("\n");
        expect(lines.length).toBeGreaterThan(1);
        // First line should be exactly 80 characters
        if (lines.length > 1) {
            expect(lines[0].length).toBe(80);
        }
    });
    it("Should return 401 without token", async () => {
        const text = "Some text to justify";
        await request(app)
            .post("/api/justify")
            .set("Content-Type", "text/plain")
            .send(text)
            .expect(401);
    });
    it("Should return 400 for empty text", async () => {
        await request(app)
            .post("/api/justify")
            .set("Authorization", `Bearer ${validToken}`)
            .set("Content-Type", "text/plain")
            .send("")
            .expect(400);
    });
    it("Should track word usage", async () => {
        const text = "Hello world this is a test"; // 6 words
        await request(app)
            .post("/api/justify")
            .set("Authorization", `Bearer ${validToken}`)
            .set("Content-Type", "text/plain")
            .send(text)
            .expect(200);
        // Verify usage
        const userData = userWordCounters.get(validToken);
        expect(userData).toBeDefined();
        expect(userData?.wordCount).toBe(6);
    });
    it("Should return 402 when exceeding word limit", async () => {
        // First call with 1000 words
        const initialText = Array(1000).fill("word").join(" ");
        await request(app)
            .post("/api/justify")
            .set("Authorization", `Bearer ${validToken}`)
            .set("Content-Type", "text/plain")
            .send(initialText)
            .expect(200);
        // Second call with 79,500 words (total = 80,500)
        const moreText = Array(79500).fill("word").join(" ");
        await request(app)
            .post("/api/justify")
            .set("Authorization", `Bearer ${validToken}`)
            .set("Content-Type", "text/plain")
            .send(moreText)
            .expect(402);
    });
});
//# sourceMappingURL=justify.test.js.map