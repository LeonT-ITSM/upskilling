import express from "express";
import loginRoutes from "./login";
import defaultRoute from "./default";
import testRoutes from "./test";

const router = express.Router();

router.use("/", loginRoutes);
router.use("/", defaultRoute);
router.use("/", testRoutes);

export default router;
