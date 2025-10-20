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
        let validToken;
        beforeEach(async () => {
            // Générer un token valide avant chaque test
            const response = await request(app)
                .post("/api/token")
                .send({ email: "justify-test@example.com" });
            validToken = response.text;
        });
        it("Should justify text with valid token", async () => {
            const text = "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n'avais pas le temps de me dire: Je m'endors.";
            const response = await request(app)
                .post("/api/justify")
                .set("Authorization", `Bearer ${validToken}`)
                .set("Content-Type", "text/plain")
                .send(text)
                .expect("Content-Type", /text\/plain/)
                .expect(200);
            expect(response.text).toBeDefined();
            expect(response.text.length).toBeGreaterThan(0);
            // Vérifier que le texte a été justifié (au moins une ligne de 80 chars)
            const lines = response.text.split("\n");
            expect(lines.length).toBeGreaterThan(1); // Plusieurs lignes
            // Au moins la première ligne doit faire 80 caractères
            if (lines.length > 1) {
                expect(lines[0].length).toBe(80);
            }
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
            // D'abord, utiliser 1000 mots pour initialiser le compteur
            const initialText = Array(1000).fill("word").join(" ");
            await request(app)
                .post("/api/justify")
                .set("Authorization", `Bearer ${validToken}`)
                .set("Content-Type", "text/plain")
                .send(initialText)
                .expect(200);
            // Maintenant, essayer d'utiliser 79,500 mots supplémentaires (total = 80,500)
            const moreWords = Array(79500).fill("word").join(" ");
            const response = await request(app)
                .post("/api/justify")
                .set("Authorization", `Bearer ${validToken}`)
                .set("Content-Type", "text/plain")
                .send(moreWords);
            // Devrait être refusé car 1000 + 79,500 = 80,500 > 80,000
            expect(response.status).toBe(402);
            expect(response.text).toBe("Payment Required");
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
//# sourceMappingURL=app.test.js.map