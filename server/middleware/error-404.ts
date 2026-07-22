import { Request, Response, NextFunction } from "express";

export function error404Handler(req: Request, res: Response, next: NextFunction): void {
  res.status(404).render("errors/index.njk", {
    status: 404,
    title: "Page not found",
    message: [
      "If you typed the web address, check it is correct.",
      "If you pasted the web address, check you copied the entire address.",
    ],
  });
}
