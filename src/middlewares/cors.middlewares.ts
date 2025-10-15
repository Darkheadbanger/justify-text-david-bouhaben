import express from "express";
import type { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.json());

/**
 * @description Middleware to handle Cross-Origin Resource Sharing (CORS).
 * This middleware sets the necessary headers to allow requests from any origin,
 * and specifies allowed headers and methods for incoming requests.
 * @type {express.RequestHandler}
 */
app.use((req: Request, response: Response, next: NextFunction): void => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  response.setHeader(
    "Access-Control-Allow-Methods", 
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
