import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import protectedRoutes from "./routes/protectedRoutes.js";
import authRoutes from "./routes/authRoutes.js";
// import './config/passport.js'; // Descomente quando configurar o login Google

dotenv.config();

const app = express(); // ✅ Declarar antes de usar

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Sessão deve vir antes do passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "minha_chave_secreta",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Coloque true se usar HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Conexão MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro MongoDB:", err));

// Rotas
app.get("/", (req, res) => {
  res.send("API de Agendamento funcionando");
});

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
