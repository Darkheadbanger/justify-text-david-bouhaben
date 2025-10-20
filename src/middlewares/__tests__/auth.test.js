import { describe, it, expect, beforeEach, vi } from "vitest";
import { authenticate } from "../auth.middleware.js";
import { tokens } from "../../services/storage.service.js";
/**
 * @description Test Suite for Authentication Middleware
 * Tests the Bearer token authentication mechanism.
 * Covers:
 * - Valid token authentication
 * - Missing Authorization header
 * - Invalid token format
 * - Non-existent token
 * - Token attachment to request
 */
describe("Authentication Middleware", () => {
    let mockRequest;
    let mockResponse;
    let mockNext;
    beforeEach(() => {
        // Clear storage before each test
        tokens.clear();
        // Setup mock request
        mockRequest = {
            headers: {},
        };
        // Setup mock response
        mockResponse = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        };
        // Setup mock next function
        mockNext = vi.fn();
    });
    it("Should call next() when token is valid", () => {
        // Arrange: Add a valid token to storage
        const validToken = "valid-token-123";
        tokens.set("test@example.com", validToken);
        mockRequest.headers = {
            authorization: `Bearer ${validToken}`,
        };
        // Act: Call the middleware
        authenticate(mockRequest, mockResponse, mockNext);
        // Assert: next() should be called
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).not.toHaveBeenCalled();
        expect(mockResponse.send).not.toHaveBeenCalled();
    });
    it("Should attach token to request when valid", () => {
        // Arrange: Add a valid token to storage
        const validToken = "valid-token-456";
        tokens.set("user@example.com", validToken);
        mockRequest.headers = {
            authorization: `Bearer ${validToken}`,
        };
        // Act: Call the middleware
        authenticate(mockRequest, mockResponse, mockNext);
        // Assert: Token should be attached to request
        expect(mockRequest.token).toBe(validToken);
    });
    it("Should return 401 when Authorization header is missing", () => {
        // Arrange: No Authorization header
        mockRequest.headers = {};
        // Act: Call the middleware
        authenticate(mockRequest, mockResponse, mockNext);
        // Assert: Should return 401
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.send).toHaveBeenCalledWith("Unauthorized: No token provided");
        expect(mockNext).not.toHaveBeenCalled();
    });
    it("Should return 401 when token format is invalid (no Bearer prefix)", () => {
        // Arrange: Invalid format without Bearer
        mockRequest.headers = {
            authorization: "invalid-token-123",
        };
        // Act: Call the middleware
        authenticate(mockRequest, mockResponse, mockNext);
        // Assert: Should return 401
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.send).toHaveBeenCalledWith("Unauthorized: Invalid token format");
        expect(mockNext).not.toHaveBeenCalled();
    });
    it("Should return 401 when token format has wrong prefix", () => {
        // Arrange: Wrong prefix (not Bearer)
        mockRequest.headers = {
            authorization: "Basic abc123",
        };
        // Act: Call the middleware
        authenticate(mockRequest, mockResponse, mockNext);
        // Assert: Should return 401
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.send).toHaveBeenCalledWith("Unauthorized: Invalid token format");
        expect(mockNext).not.toHaveBeenCalled();
    });
    it("Should return 401 when token does not exist in storage", () => {
        // Arrange: Valid format but token not in storage
        mockRequest.headers = {
            authorization: "Bearer non-existent-token",
        };
        // Act: Call the middleware
        authenticate(mockRequest, mockResponse, mockNext);
        // Assert: Should return 401
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.send).toHaveBeenCalledWith("Unauthorized: Invalid token");
        expect(mockNext).not.toHaveBeenCalled();
    });
    it("Should handle multiple tokens in storage correctly", () => {
        // Arrange: Add multiple tokens to storage
        const token1 = "token-user1";
        const token2 = "token-user2";
        const token3 = "token-user3";
        tokens.set("user1@example.com", token1);
        tokens.set("user2@example.com", token2);
        tokens.set("user3@example.com", token3);
        mockRequest.headers = {
            authorization: `Bearer ${token2}`,
        };
        // Act: Call the middleware
        authenticate(mockRequest, mockResponse, mockNext);
        // Assert: Should find the correct token
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockRequest.token).toBe(token2);
    });
});
//# sourceMappingURL=auth.test.js.map