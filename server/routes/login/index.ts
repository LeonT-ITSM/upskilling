import { Router } from "express";
import { User } from "../../models/user";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login/index.njk");
});

router.post("/login", async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user || !(await user.comparePassword(password))) {
    res.render("login/index.njk", {
      errors: {
        errorSummary: [{ text: "Incorrect email or password", href: "#email" }],
        fieldErrors: {
          email: { text: "Incorrect email or password" },
        },
      },
    });
    return;
  }
  req.session.userID = user.id;
  res.redirect("/");
});

export default router;
