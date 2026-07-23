import express from "express";
import loginRoutes from "./login";
import defaultRoute from "./default";
import testRoutes from "./test";

const router = express.Router();

router.use("/", loginRoutes);
router.use("/", defaultRoute);

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "test") {
  router.use("/test", testRoutes);
}

export default router;
