import { describe, it, expect } from "vitest";
import { normalizePort, port, errorHandler, server } from "../server.js";
/**
 * Test Suite: normalizePort function
 *
 * @description Tests the port normalization utility function which converts
 * string port values to valid numeric ports or returns false for invalid inputs.
 *
 * @testcases
 * - Valid numeric strings (e.g., "3000", "8080")
 * - Invalid inputs (negative numbers, non-numeric strings)
 * - Edge cases (port 0, boundary values)
 */
describe("normalizePort", () => {
    it("should be defined", () => {
        expect(normalizePort).toBeDefined();
    });
    it("should return a valid port number for numeric strings", () => {
        expect(normalizePort("3000")).toBe(3000);
    });
    it("should return false for negative port numbers", () => {
        expect(normalizePort("-1")).toBe(false);
    });
    it("should return false for non-numeric strings", () => {
        expect(normalizePort("abc")).toBe(false);
    });
    it("should handle port 0 as a valid port", () => {
        expect(normalizePort("0")).toBe(0);
    });
});
/**
 * Test Suite: port variable
 *
 * @description Tests the globally exported port constant which holds
 * the normalized port value used by the server.
 */
describe("port", () => {
    it("should be defined", () => {
        expect(port).toBeDefined();
    });
});
/**
 * Test Suite: errorHandler function
 *
 * @description Tests the error handler that manages server startup errors.
 * Handles specific error codes like EACCES (insufficient privileges) and
 * EADDRINUSE (port already in use).
 *
 * @testcases
 * - Non-listen syscall errors should be thrown
 * - EACCES errors should trigger process exit
 * - EADDRINUSE errors should trigger process exit
 */
describe("errorHandler", () => {
    it("should be defined", () => {
        expect(errorHandler).toBeDefined();
    });
    it("should throw error if syscall is not 'listen'", () => {
        expect(() => errorHandler({ syscall: "other" })).toThrow();
    });
    it("should exit process on EACCES error (insufficient privileges)", () => {
        expect(() => errorHandler({
            syscall: "listen",
            code: "EACCES"
        })).toThrow();
    });
    it("should exit process on EADDRINUSE error (port already in use)", () => {
        expect(() => errorHandler({
            syscall: "listen",
            code: "EADDRINUSE"
        })).toThrow();
    });
});
/**
 * Test Suite: HTTP Server Instance
 *
 * @description Tests the HTTP server instance created with the Express app.
 * Verifies that the server is properly initialized and is a valid Node.js
 * HTTP server instance.
 *
 * @testcases
 * - Server instance exists
 * - Server is an instance of Node.js HTTP Server class
 */
describe("server", () => {
    it("should be defined", () => {
        expect(server).toBeDefined();
    });
    it("should be an HTTP Server instance", () => {
        expect(server.constructor.name).toBe("Server");
    });
});
//# sourceMappingURL=normalizePort.test.js.map