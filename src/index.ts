import express, { Request, Response } from "express";
import path from "path";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import { authenticate, authorize } from "./middlewares/auth.middleware";
import { pool } from "./database/mysql";

// Creamos la instancia principal de la aplicación Express
const app = express();

// Definimos el puerto donde va a escuchar el servidor
const PORT = process.env.PORT || 3000;

//middleware para interpretar jsons
app.use(express.json());

//middleware para servir archivos estaticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/auth", authRoutes);

// Ruta protegida (requiere autenticación)
app.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "Acceso permitido",
    user: req.user,
  });
});

// Ruta de administrador (requiere autenticación y rol admin)
app.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({
    message: "Acceso de administrador permitido",
    user: req.user,
  });
});

// ... resto de la configuración

app.get("/api/saludo", (req: Request, res: Response) => {
  res.json({ saludo: "Hola desde Node.js + Express + TypeScript" });
});




(async () => {
  try {
    const [rows] = await pool.query("SHOW TABLES");
    console.log("Conectado a MySQL. Tablas:", rows);
  } catch (error) {
    console.error("Error de conexión a MySQL:", error);
  }
})();


// Iniciamos el servidor HTTP
// Si todo está correcto, veremos el mensaje en consola
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
