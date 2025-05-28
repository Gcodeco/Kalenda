import express from "express";
import { register, login } from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Aqui você pode criar um JWT e redirecionar para o frontend
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.redirect(`http://localhost:3000/login-success?token=${token}`);
  }
);

router.post("/register", register);
router.post("/login", login);

export default router;
