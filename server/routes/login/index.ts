import { Router, Request, Response } from "express";
import { User } from "../../models/user";
import { AuthRateLimit } from "../../middleware/rate-limit";

const router = Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
    const { email, password } = req.body;

    // Check if email or password fields are empty and if valid email format before running DB query
    const fieldErrors: Record<string, { text: string }> = {};
    if (!email) {
      fieldErrors.email = { text: "Enter your email address" };
    } else if (!EMAIL_REGEX.test(email)) {
      fieldErrors.email = { text: "Enter an email address in the correct format" };
    }
    if (!password) {
      fieldErrors.password = { text: "Enter your password" };
    }

    // If error is found, reload login screen and show errors in errorSummary textbox
    if (Object.keys(fieldErrors).length > 0) {
      res.render("login/index.njk", {
        errors: {
          errorSummary: Object.entries(fieldErrors).map(([field, err]) => ({
            text: err.text,
            href: `#${field}`,
          })),
          fieldErrors,
        },
      });
      return;
    }

    // Check if email/password are correct
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

export default router;
