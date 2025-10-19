import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { tokens, userWordCounters } from "../services/storage.service.js";

describe("App Integration Tests", () => {
  // Nettoyer le storage avant chaque test
  beforeEach(() => {
    tokens.clear();
    userWordCounters.clear();
  });

  describe("POST /api/token", () => {
    it("Should generate a new token for a valid email", async () => {
      const response = await request(app)
        .post("/api/token")
        .send({ email: "test@example.com" })
        .expect("Content-Type", /text\/plain/)
        .expect(200);

      expect(response.text).toBeDefined();
      expect(typeof response.text).toBe("string");
      expect(response.text.length).toBeGreaterThan(0);
    });

    it("Should return the same token for the same email", async () => {
      // Premier appel
      const response1 = await request(app)
        .post("/api/token")
        .send({ email: "same@example.com" })
        .expect(200);

      const firstToken = response1.text;

      // Deuxième appel avec le même email
      const response2 = await request(app)
        .post("/api/token")
        .send({ email: "same@example.com" })
        .expect(200);

      const secondToken = response2.text;

      // Les tokens doivent être identiques
      expect(secondToken).toBe(firstToken);
    });

    it("Should return 400 if email is missing", async () => {
      await request(app)
        .post("/api/token")
        .send({})
        .expect(400)
        .expect("Bad Request: Email is required");
    });

    it("Should return 400 if email format is invalid", async () => {
      await request(app)
        .post("/api/token")
        .send({ email: "invalid-email" })
        .expect(400)
        .expect("Bad Request: Invalid email format");
    });

    it("Should return 400 if email is not a string", async () => {
      await request(app)
        .post("/api/token")
        .send({ email: 12345 })
        .expect(400)
        .expect("Bad Request: Email is required");
    });
  });

  describe("POST /api/justify", () => {
    let validToken: string;

    beforeEach(async () => {
      // Générer un token valide avant chaque test
      const response = await request(app)
        .post("/api/token")
        .send({ email: "justify-test@example.com" });

      validToken = response.text;
    });

    it("Should justify text with valid token", async () => {
      const text = "This is a simple test text that needs to be justified properly.";

      const response = await request(app)
        .post("/api/justify")
        .set("Authorization", `Bearer ${validToken}`)
        .set("Content-Type", "text/plain")
        .send(text)
        .expect("Content-Type", /text\/plain/)
        .expect(200);

      expect(response.text).toBeDefined();
      expect(response.text.length).toBeGreaterThan(0);
      expect(response.text).not.toBe(text); // Le texte doit être modifié
    });

    it("Should return 401 if no token provided", async () => {
      const text = "Some text to justify";

      await request(app)
        .post("/api/justify")
        .set("Content-Type", "text/plain")
        .send(text)
        .expect(401);
    });

    it("Should return 401 if token format is invalid", async () => {
      const text = "Some text to justify";

      await request(app)
        .post("/api/justify")
        .set("Authorization", "InvalidFormat")
        .set("Content-Type", "text/plain")
        .send(text)
        .expect(401);
    });

    it("Should return 401 if token is invalid", async () => {
      const text = "Some text to justify";

      await request(app)
        .post("/api/justify")
        .set("Authorization", "Bearer invalid-token-123")
        .set("Content-Type", "text/plain")
        .send(text)
        .expect(401);
    });

    it("Should return 400 if text is empty", async () => {
      await request(app)
        .post("/api/justify")
        .set("Authorization", `Bearer ${validToken}`)
        .set("Content-Type", "text/plain")
        .send("")
        .expect(400);
    });

    it("Should track word usage correctly", async () => {
      const text = "Hello world this is a test"; // 6 mots

      // Premier appel
      await request(app)
        .post("/api/justify")
        .set("Authorization", `Bearer ${validToken}`)
        .set("Content-Type", "text/plain")
        .send(text)
        .expect(200);

      // Vérifier que l'usage a été enregistré
      const userData = userWordCounters.get(validToken);
      expect(userData).toBeDefined();
      expect(userData?.wordCount).toBe(6);
    });

    it("Should return 402 when word limit is exceeded", async () => {
      // Créer un texte avec beaucoup de mots (> 80,000)
      const words = Array(80001).fill("word").join(" ");

      await request(app)
        .post("/api/justify")
        .set("Authorization", `Bearer ${validToken}`)
        .set("Content-Type", "text/plain")
        .send(words)
        .expect(402)
        .expect("Payment Required");
    });

    it("Should allow multiple requests within the limit", async () => {
      const text = "Hello world"; // 2 mots

      // Premier appel
      await request(app)
        .post("/api/justify")
        .set("Authorization", `Bearer ${validToken}`)
        .set("Content-Type", "text/plain")
        .send(text)
        .expect(200);

      // Deuxième appel
      await request(app)
        .post("/api/justify")
        .set("Authorization", `Bearer ${validToken}`)
        .set("Content-Type", "text/plain")
        .send(text)
        .expect(200);

      // Vérifier le total
      const userData = userWordCounters.get(validToken);
      expect(userData?.wordCount).toBe(4); // 2 + 2
    });
  });

  describe("GET /unknown", () => {
    it("Should return 404 for unknown routes", async () => {
      await request(app).get("/unknown").expect(404);
    });
  });

  describe("Middleware configuration", () => {
    it("Should parse JSON body correctly", async () => {
      const response = await request(app)
        .post("/api/token")
        .send({ email: "json-test@example.com" })
        .expect(200);

      expect(response.text).toBeDefined();
    });

    it("Should parse text/plain body correctly", async () => {
      // Générer un token d'abord
      const tokenResponse = await request(app)
        .post("/api/token")
        .send({ email: "text-test@example.com" });

      const token = tokenResponse.text;

      // Envoyer du texte brut
      await request(app)
        .post("/api/justify")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "text/plain")
        .send("Plain text content")
        .expect(200);
    });
  });
});