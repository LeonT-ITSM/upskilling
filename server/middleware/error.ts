import { Request, Response, NextFunction } from "express";

export function error404Handler(req: Request, res: Response, next: NextFunction): void {
  res.render("errors/index.njk", {
    title: "Page not found",
    message: `We can't find the page "${req.path}"`,
  });
}
