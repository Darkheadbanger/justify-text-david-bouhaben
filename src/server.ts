import http from "http";
import app from "./app.js";
import type { INormalizePort } from "./types/interfaces/server.interfaces.js";
import type { AddressInfo } from "net";

/**
 * @description Normalize a port into a number, string, or false.
 * Valid port numbers are >= 0. If the input is a named pipe, it returns the string.
 * If the input is invalid (negative number or non-numeric string), it returns false.
 * @param val Val is the port value to normalize into a number, string, or false.
 * @returns The normalized port value or false if invalid.
 */
export const normalizePort: INormalizePort = (val: string) => {
  if (typeof val === "string") {
    const port: number = parseInt(val, 10);
    if (!isNaN(port) && port >= 0) {
      return port;
    }
    return false;
  }
};

/**
 * @description The port on which the server will listen.
 * Defaults to 3000 if not specified in environment variables.
 * @type {number | false | undefined}
 */
export const port: number | false | undefined = normalizePort(
  process.env.PORT || "3000"
);
app.set("port", port);

/**
 * @description Error handler for HTTP server "error" event.
 * Handles specific listen errors with friendly messages.
 * @param error - error object from the server
 * @type {never}
 * @throws Throws the error if it's not a listen-related error.
 */
export const errorHandler: (error: NodeJS.ErrnoException) => never = (
  error: NodeJS.ErrnoException
) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address: string | AddressInfo | null = server.address();
  const bind: string =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * @description Define and create the HTTP server using the Express app.
 * Sets up event listeners for 'error' and 'listening' events.
 * @type {http.Server}
 */
export const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(app);

/**
 * @description Attach the error handler to the server's "error" event.
 * This ensures that any errors during server operation are properly managed.
 * @type {void}
 */
export const serverErrorHandler = (): void => {
  server.on("error", errorHandler);
};

/**
 * @description Start the HTTP server and listen on the specified port.
 * Sets up the "listening" event to log when the server is ready.
 * @type {void}
 */
export const startServer = (): void => {
  serverErrorHandler();
  server.on("listening", () => {
    const address: string | AddressInfo | null = server.address();
    const bind: string =
      typeof address === "string" ? "pipe " + address : "port: " + port;
    console.log("Listening on " + bind);
  });

  server.listen(port);
};

// Start server only if not in test environment
if (process.env.NODE_ENV !== "test") {
  startServer();
}
