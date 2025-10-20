import { randomUUID } from "crypto";
import { saveToken, getToken } from "../services/storage.service.js";
/**
 * @description Generates or retrieves a token for a given email.
 * If the email already exists, returns the existing token.
 * If not, generates a new UUID token and saves it.
 * @param req - Express request object containing email in body
 * @param res - Express response object
 * @returns void
 */
export const generateTokenController = (req, res) => {
    const { email } = req.body;
    if (!email || typeof email !== "string") {
        res.status(400).send("Bad Request: Email is required");
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).send("Bad Request: Invalid email format");
        return;
    }
    let token = getToken(email);
    if (!token) {
        token = randomUUID();
        saveToken(email, token);
    }
    res.setHeader("Content-Type", "text/plain");
    res.send(token);
};
//# sourceMappingURL=token.controller.js.map