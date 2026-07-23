import { Request, Response, NextFunction } from "express";
import { HttpError } from "../types/http-error";

export function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err);

  if (err instanceof HttpError) {
    res.status(err.statusCode).render("errors/index.njk", {
      statusCode: err.statusCode,
      title: err.title,
      message: [err.message],
    });
  } else {
    res.status(500).render("errors/index.njk", {
      statusCode: 500,
      title: "Sorry, there is a problem with the service",
      message: ["An unexpected error occurred. Please try again later."],
    });
  }
}
