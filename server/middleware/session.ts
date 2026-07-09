import { Express } from "express";
import session from "express-session";
import { MongoStore } from "connect-mongo";

export const configureSession = (app: Express): void => {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("Missing SESSION_SECRET");

  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  app.use(
    session({
      name: "app-session",
      secret: secret,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
      }),
      cookie: {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      },
    })
  );
};
