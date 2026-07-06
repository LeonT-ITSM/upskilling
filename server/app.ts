import express from "express";
import nunjucks from "nunjucks";
import morgan from "morgan";
import path from "path";
import defaultRouter from "./routes/default";

const app = express();

nunjucks.configure(["templates", "node_modules/govuk-frontend/dist"], {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true,
});

app.set("view engine", "njk");

app.use(
  "/assets",
  express.static(path.join(__dirname, "../node_modules/govuk-frontend/dist/govuk/assets")),
  express.static(path.join(__dirname, "../public"))
);

app.use(morgan("tiny"));
app.use("/", defaultRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
