import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

export async function attachCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (req.session.userID) {
    res.locals.currentUser = await User.findById(req.session.userID);
  }
  next();
}
