import { Router, Request, Response } from "express";
import { User } from "../../models/user";
import { AuthRateLimit } from "../../middleware/rate-limit";
import { checkValidation, loginValidationRules } from "../../middleware/login-validation";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login/index.njk");
});

interface LoginBody {
  email: string;
  password: string;
}

router.post(
  "/login",
  AuthRateLimit,
  loginValidationRules,
  checkValidation,
  async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
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
    req.session.userID = user.id;
    res.redirect("/");
  }
);

router.get("/signup", (req, res) => {
  res.render("login/signup.njk");
});

router.post(
  "/signup",
  AuthRateLimit,
  async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
    const { email, password } = req.body;
  }
);

export default router;
