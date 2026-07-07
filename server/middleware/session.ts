import { express } from "express";
import session from "express-session";

export const configureSession = (app: Express): void => {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("Missing SESSION_SECRET");

  app.use(
    session({
      name: "app-session",
      secret,
      resave: false,
      saveUninitialized: false,
      store: myStore, // TO DO
      cookie: {
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      },
    })
  );
};
