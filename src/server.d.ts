import http from "http";
import type { INormalizePort } from "./types/interfaces/server.interfaces.js";
/**
 * @description Normalize a port into a number, string, or false.
 * Valid port numbers are >= 0. If the input is a named pipe, it returns the string.
 * If the input is invalid (negative number or non-numeric string), it returns false.
 * @param val Val is the port value to normalize into a number, string, or false.
 * @returns The normalized port value or false if invalid.
 */
export declare const normalizePort: INormalizePort;
/**
 * @description The port on which the server will listen.
 * Defaults to 3000 if not specified in environment variables.
 * @type {number | false | undefined}
 */
export declare const port: number | false | undefined;
/**
 * @description Error handler for HTTP server "error" event.
 * Handles specific listen errors with friendly messages.
 * @param error - error object from the server
 * @type {never}
 * @throws Throws the error if it's not a listen-related error.
 */
export declare const errorHandler: (error: NodeJS.ErrnoException) => never;
/**
 * @description Define and create the HTTP server using the Express app.
 * Sets up event listeners for 'error' and 'listening' events.
 * @type {http.Server}
 */
export declare const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
/**
 * @description Attach the error handler to the server's "error" event.
 * This ensures that any errors during server operation are properly managed.
 * @type {void}
 */
export declare const serverErrorHandler: () => void;
/**
 * @description Start the HTTP server and listen on the specified port.
 * Sets up the "listening" event to log when the server is ready.
 * @type {void}
 */
export declare const startServer: () => void;
//# sourceMappingURL=server.d.ts.map