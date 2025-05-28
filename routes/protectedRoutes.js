import express from "express";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Exemplo de rota protegida
router.get("/dashboard", authenticateJWT, (req, res) => {
  res.json({
    message: "Bem-vindo ao dashboard!",
    userId: req.user.id,
  });
});

export default router;
