import express from "express";
import nunjucks from "nunjucks";
import dotenv from "dotenv";
import { connectDB } from "./db";
import morgan from "morgan";
import path from "path";
import bcrypt from "bcrypt";
export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 12);
export const verifyPassword = (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash);
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

nunjucks.configure(["templates", "node_modules/govuk-frontend/dist"], {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true,
});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log("running on port: ${PORT}"));
  })
  .catch((err) => {
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

app.use(morgan("tiny"));
app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
