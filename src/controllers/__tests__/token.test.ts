import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";
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
      .mockImplementation(() => {});

    const req: Request = {
      body: {
        email: mockEmail,
      },
    } as Request;

    let capturedBody: string | undefined;
    let capturedHeaderName: string | undefined;
    let capturedHeaderValue: string | undefined;

    const res: Response = {
      setHeader: vi.fn((name: string, value: string) => {
        capturedHeaderName = name;
        capturedHeaderValue = value;
        return res;
      }),
      send: vi.fn((body: string) => {
        capturedBody = body;
        return res;
      }),
      status: vi.fn((code: number) => res),
    } as unknown as Response;

    generateTokenController(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "text/plain");
    expect(res.send).toHaveBeenCalled();
    expect(capturedBody).toBeDefined();
    expect(typeof capturedBody).toBe("string");
    expect(capturedBody!.length).toBeGreaterThan(0);
    expect(storageService.getToken).toHaveBeenCalledWith(mockEmail);
    expect(saveTokenSpy).toHaveBeenCalledWith(mockEmail, capturedBody!);
  });

  it("Should return existing token for existing email", () => {
    const mockEmail = "existing@mail.com";
    const existingToken = "existing-token-456";

    vi.spyOn(storageService, "getToken").mockReturnValue(existingToken);

    const saveTokenSpy = vi
      .spyOn(storageService, "saveToken")
      .mockImplementation(() => {});

    const req = {
      body: {
        email: mockEmail,
      },
    } as Request;

    const res = {
      setHeader: vi.fn(() => res),
      send: vi.fn(() => res),
      status: vi.fn(() => res),
    } as unknown as Response;

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
    } as Request;

    const res = {
      status: vi.fn(() => res),
      send: vi.fn(() => res),
    } as unknown as Response;

    generateTokenController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Bad Request: Email is required");
  });

  it("Should return 400 if email format is invalid", () => {
    const req: Request = {
      body: {
        email: "invalid-email",
      },
    } as Request;

    const res = {
      status: vi.fn(() => res),
      send: vi.fn(() => res),
    } as unknown as Response;

    generateTokenController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Bad Request: Invalid email format");
  });
});
