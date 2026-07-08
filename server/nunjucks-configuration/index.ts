import nunjucks from "nunjucks";
import type { Express } from "express";

export function configureNunjucks(app: Express) {
  const env = nunjucks.configure(["templates", "node_modules/govuk-frontend/dist"], {
    autoescape: true,
    express: app,
    noCache: true,
    watch: true,
  });
  env.addGlobal("CONTACT_EMAIL", process.env.CONTACT_EMAIL);
  return env;
}
