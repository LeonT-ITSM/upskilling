import express from "express";
import loginRoutes from "./login";
import defaultRoute from "./default";

const router = express.Router();

router.use("/", loginRoutes);
router.use("/", defaultRoute);

export default router;
