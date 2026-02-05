import express, { Application } from "express";
import dotenv from "dotenv";
import pool from "./database/mysql";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";
import mascotasRoutes from "./routes/mascotas.routes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test de conexión a la DB al iniciar
(async () => {
  try {
    await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ Conexión a la base de datos OK");
  } catch (error) {
    console.error("❌ Error de conexión a la base de datos:", error);
  }
})();

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/mascotas", mascotasRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
