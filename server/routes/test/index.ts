import { Router } from "express";
import { HttpError } from "../../types/http-error";

const router = Router();

// test unknown errors via global error handler
router.get("/test-error", () => {
  throw new Error("This is a deliberate test error.");
});

// test known errors via global error handler
router.get("/test-error-known", () => {
  throw new HttpError(400, "Test error", "This is a deliberate test error.");
});

export default router;
