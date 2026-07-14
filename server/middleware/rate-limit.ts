import { Express } from "express";
import { rateLimit } from "express-rate-limit";

// global rate limit
export const configureGlobalRateLimit = (app: Express): void => {
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 100,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      ipv6Subnet: 56,
      message: "You have hit the rate limit threshold. Please wait 15 minutes and try again.",
    })
  );
};

// Separate stricter limit for authentication requests
export const AuthRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: "You have hit the rate limit threshold. Please wait 15 minutes and try again.",
});
