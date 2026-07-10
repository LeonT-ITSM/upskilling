import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { configureNunjucks } from "./nunjucks-configuration";
import { configureSession } from "./middleware/session";
import { configureGlobalRateLimit } from "./middleware/rate-limit";
import { attachCurrentUser } from "./middleware/current-user";
import { connectDB } from "./db";
import morgan from "morgan";
import path from "path";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`running on port: ${PORT}`));
  })
  .catch((err: unknown) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "njk");

app.use(
  "/assets",
  express.static(path.join(__dirname, "../node_modules/govuk-frontend/dist/govuk/assets")),
  express.static(path.join(__dirname, "../public"))
);

configureNunjucks(app); // Nunjucks configuration
configureSession(app); // express-session configuration
app.use(attachCurrentUser); // Attaches user data to requests if signed in
configureGlobalRateLimit(app); // Global rate limiter configuration
app.use(morgan("tiny"));
app.use("/", routes);
