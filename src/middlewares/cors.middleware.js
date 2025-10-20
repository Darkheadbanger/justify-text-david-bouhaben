import express from "express";
const app = express();
app.use(express.json());
/**
 * @description CORS middleware that sets necessary headers to allow requests from any origin
 * and specifies allowed headers and methods for incoming requests
 * @param req - Express request object
 * @param response - Express response object
 * @param next - Express next function
 * @returns void
 */
app.use((req, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
//# sourceMappingURL=cors.middleware.js.map