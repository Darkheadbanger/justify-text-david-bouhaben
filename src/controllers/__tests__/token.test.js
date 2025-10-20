import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateTokenController } from "../token.controller.js";
import * as storageService from "../../services/storage.service.js";
// Mock du module storage
vi.mock("../../services/storage.service.js");
describe("Token Controller", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it("Should generate a token for a valid email", () => {
        const mockEmail = "test@mail.com";
        vi.spyOn(storageService, "getToken").mockReturnValue(undefined);
        const saveTokenSpy = vi
            .spyOn(storageService, "saveToken")
            .mockImplementation(() => { });
        const req = {
            body: {
                email: mockEmail,
            },
        };
        let capturedBody;
        let capturedHeaderName;
        let capturedHeaderValue;
        const res = {
            setHeader: vi.fn((name, value) => {
                capturedHeaderName = name;
                capturedHeaderValue = value;
                return res;
            }),
            send: vi.fn((body) => {
                capturedBody = body;
                return res;
            }),
            status: vi.fn((code) => res),
        };
        generateTokenController(req, res);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "text/plain");
        expect(res.send).toHaveBeenCalled();
        expect(capturedBody).toBeDefined();
        expect(typeof capturedBody).toBe("string");
        expect(capturedBody.length).toBeGreaterThan(0);
        expect(storageService.getToken).toHaveBeenCalledWith(mockEmail);
        expect(saveTokenSpy).toHaveBeenCalledWith(mockEmail, capturedBody);
    });
    it("Should return existing token for existing email", () => {
        const mockEmail = "existing@mail.com";
        const existingToken = "existing-token-456";
        vi.spyOn(storageService, "getToken").mockReturnValue(existingToken);
        const saveTokenSpy = vi
            .spyOn(storageService, "saveToken")
            .mockImplementation(() => { });
        const req = {
            body: {
                email: mockEmail,
            },
        };
        const res = {
            setHeader: vi.fn(() => res),
            send: vi.fn(() => res),
            status: vi.fn(() => res),
        };
        // Act
        generateTokenController(req, res);
        // Assert
        expect(storageService.getToken).toHaveBeenCalledWith(mockEmail);
        expect(saveTokenSpy).not.toHaveBeenCalled(); // Ne doit PAS être appelé
        expect(res.send).toHaveBeenCalledWith(existingToken);
    });
    it("Should return 400 if email is missing", () => {
        const req = {
            body: {},
        };
        const res = {
            status: vi.fn(() => res),
            send: vi.fn(() => res),
        };
        generateTokenController(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("Bad Request: Email is required");
    });
    it("Should return 400 if email format is invalid", () => {
        const req = {
            body: {
                email: "invalid-email",
            },
        };
        const res = {
            status: vi.fn(() => res),
            send: vi.fn(() => res),
        };
        generateTokenController(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("Bad Request: Invalid email format");
    });
});
//# sourceMappingURL=token.test.js.map