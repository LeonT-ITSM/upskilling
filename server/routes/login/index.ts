import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import { AuthRateLimit } from "../../middleware/rate-limit";
import {
  checkValidation,
  loginValidationRules,
  signupValidationRules,
} from "../../middleware/login-validation";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login/index.njk");
});

interface LoginBody {
  email: string;
  password: string;
}

// Check data validation as middleware. If validation passes then check if username/password are correct and proceed, else redirect.
router.post(
  "/login",
  AuthRateLimit,
  loginValidationRules,
  checkValidation("login/index.njk"),
  async (req: Request<unknown, unknown, LoginBody>, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await user.comparePassword(password))) {
      res.render("login/index.njk", {
        errors: {
          errorSummary: [{ text: "Incorrect email or password", href: "#email" }],
        },
      });
      return;
    }
    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.userID = user.id;
      res.redirect("/");
    });
  }
);

router.get("/signup", (req, res) => {
  res.render("login/signup.njk");
});

router.post(
  "/signup",
  AuthRateLimit,
  signupValidationRules,
  checkValidation("login/signup.njk"),
  async (req: Request<unknown, unknown, LoginBody>, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const userCheck = await User.findOne({ email: email.toLowerCase() });

    if (userCheck) {
      res.render("login/signup.njk", {
        errors: {
          errorSummary: [{ text: "That email address is already registered", href: "#email" }],
        },
      });
      return;
    }

    const user = await User.create({ email, password });
    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.userID = user.id;
      res.redirect("/");
    });
  }
);

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("app-session");
    res.redirect("/login");
  });
});

export default router;
