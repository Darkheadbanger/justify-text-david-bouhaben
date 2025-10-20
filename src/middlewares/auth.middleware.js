import { tokens } from "../services/storage.service.js";
/**
 * @description Authentication middleware that verifies Bearer token in Authorization header
 * and attaches token to req.token if valid
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns void
 */
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send("Unauthorized: No token provided");
        return;
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        res.status(401).send("Unauthorized: Invalid token format");
        return;
    }
    const token = parts[1];
    let tokenExists = false;
    for (const [email, storedToken] of tokens) {
        if (storedToken === token) {
            tokenExists = true;
            break;
        }
    }
    if (!tokenExists) {
        res.status(401).send("Unauthorized: Invalid token");
        return;
    }
    req.token = token;
    next();
};
//# sourceMappingURL=auth.middleware.js.map