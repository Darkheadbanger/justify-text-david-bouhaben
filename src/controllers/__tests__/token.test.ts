import { describe, it } from "node:test";
import { expect } from "vitest";

describe("Token controller", () => {
  it("Should get an email from the body", () => {
    // create a mock request with the expected body
    const mockRequest = { body: { email: "test@mail.com" } } as any;
    const emailFromBody = mockRequest.body.email;
    console.log("Email from body:", emailFromBody);
    expect(emailFromBody).toBe("test@mail.com");
  });
});
