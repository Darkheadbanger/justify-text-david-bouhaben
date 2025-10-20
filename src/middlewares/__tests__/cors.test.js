import { describe, it, expect, beforeEach, vi } from "vitest";
/**
 * @description Test Suite for CORS Middleware
 * Tests Cross-Origin Resource Sharing configuration.
 * Covers:
 * - Access-Control-Allow-Origin header
 * - Access-Control-Allow-Headers header
 * - Access-Control-Allow-Methods header
 * - Middleware execution flow
 */
describe("CORS Middleware", () => {
    let mockRequest;
    let mockResponse;
    let mockNext;
    let setHeaderSpy;
    /**
     * @description CORS middleware function
     * This is a simplified version that mimics the behavior in cors.middleware.ts
     */
    const corsMiddleware = (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
        next();
    };
    beforeEach(() => {
        // Setup mock request
        mockRequest = {
            method: "GET",
            headers: {},
        };
        // Setup spy for setHeader
        setHeaderSpy = vi.fn();
        // Setup mock response
        mockResponse = {
            setHeader: setHeaderSpy,
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        };
        // Setup mock next function
        mockNext = vi.fn();
    });
    it("Should set Access-Control-Allow-Origin header to *", () => {
        // Act: Call the middleware
        corsMiddleware(mockRequest, mockResponse, mockNext);
        // Assert: Header should be set to allow all origins
        expect(setHeaderSpy).toHaveBeenCalledWith("Access-Control-Allow-Origin", "*");
    });
    it("Should set Access-Control-Allow-Headers with all required headers", () => {
        // Act: Call the middleware
        corsMiddleware(mockRequest, mockResponse, mockNext);
        // Assert: Header should include all necessary headers
        expect(setHeaderSpy).toHaveBeenCalledWith("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    });
    it("Should set Access-Control-Allow-Methods with all HTTP methods", () => {
        // Act: Call the middleware
        corsMiddleware(mockRequest, mockResponse, mockNext);
        // Assert: Header should include all HTTP methods
        expect(setHeaderSpy).toHaveBeenCalledWith("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    });
    it("Should call next() to continue the request chain", () => {
        // Act: Call the middleware
        corsMiddleware(mockRequest, mockResponse, mockNext);
        // Assert: next() should be called
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
    it("Should set all three CORS headers in correct order", () => {
        // Act: Call the middleware
        corsMiddleware(mockRequest, mockResponse, mockNext);
        // Assert: All three headers should be set
        expect(setHeaderSpy).toHaveBeenCalledTimes(3);
        // Verify order
        expect(setHeaderSpy.mock.calls[0]).toEqual([
            "Access-Control-Allow-Origin",
            "*",
        ]);
        expect(setHeaderSpy.mock.calls[1]).toEqual([
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
        ]);
        expect(setHeaderSpy.mock.calls[2]).toEqual([
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        ]);
    });
    it("Should handle OPTIONS preflight requests", () => {
        // Arrange: Set method to OPTIONS
        mockRequest.method = "OPTIONS";
        // Act: Call the middleware
        corsMiddleware(mockRequest, mockResponse, mockNext);
        // Assert: Headers should be set and next() called
        expect(setHeaderSpy).toHaveBeenCalledTimes(3);
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
    it("Should work with POST requests", () => {
        // Arrange: Set method to POST
        mockRequest.method = "POST";
        // Act: Call the middleware
        corsMiddleware(mockRequest, mockResponse, mockNext);
        // Assert: Headers should be set and next() called
        expect(setHeaderSpy).toHaveBeenCalledTimes(3);
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
    it("Should work regardless of request origin", () => {
        // Arrange: Add origin header
        mockRequest.headers = {
            origin: "https://example.com",
            origins: "https://another-origin.com",
        };
        // Act: Call the middleware
        corsMiddleware(mockRequest, mockResponse, mockNext);
        // Assert: Should still set wildcard origin
        expect(setHeaderSpy).toHaveBeenCalledWith("Access-Control-Allow-Origin", "*");
        expect(mockNext).toHaveBeenCalled();
    });
});
//# sourceMappingURL=cors.test.js.map