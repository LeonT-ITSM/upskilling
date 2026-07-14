import { csrfSync } from "csrf-sync";

export const { csrfSynchronisedProtection, generateToken, invalidCsrfTokenError } = csrfSync({
  getTokenFromRequest: (req) => req.body._csrf,
});
