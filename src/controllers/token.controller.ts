import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { saveToken, getToken } from "../services/storage.service.js";

/**
 * @description Generates or retrieves a token for a given email
 * If the email already exists, returns the existing token
 * If not, generates a new UUID token and saves it
 * @type {void}
 */
export const generateTokenController = (req: Request, res: Response): void => {
  // 1. Récupérer l'email du body
  const { email } = req.body;

  // 2. Valider l'email
  if (!email || typeof email !== "string") {
    res.status(400).send("Bad Request: Email is required");
    return;
  }

  // Validation simple du format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).send("Bad Request: Invalid email format");
    return;
  }

  // 3. Vérifier si l'email existe déjà
  let token = getToken(email);

  // 4. Si non, générer un nouveau token
  if (!token) {
    token = randomUUID();
    saveToken(email, token);
  }

  // 5. Retourner le token en text/plain
  res.setHeader("Content-Type", "text/plain");
  res.send(token);
};
