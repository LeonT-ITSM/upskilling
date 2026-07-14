import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationError } from "express-validator";

export const loginValidationRules = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Enter your email address")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("Enter your password"),
];

interface errorSummary {
  text: string;
  href: string;
}

interface fieldErrors {
  [key: string]: { text: string };
}

// Check if validation failed and if so, pass errors back to the screen
export function checkValidation(template: string) {
  return function (req: Request, res: Response, next: NextFunction): void {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const errorList: errorSummary[] = result.array().map((err: ValidationError) => ({
        text: err.msg,
        href: `#${"path" in err ? err.path : ""}`,
      }));

      const fieldErrors: fieldErrors = {};
      result.array().forEach((err: ValidationError) => {
        if ("path" in err && !fieldErrors[err.path]) {
          fieldErrors[err.path] = { text: err.msg };
        }
      });

      res.status(400).render(template, {
        errors: {
          errorSummary: errorList,
          fieldErrors: fieldErrors,
        },
        email: req.body.email,
      });
      return;
    }

    next();
  };
}
