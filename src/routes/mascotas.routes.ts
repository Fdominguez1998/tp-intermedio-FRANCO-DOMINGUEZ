import { Router } from "express";
import {
  listar,
  crear,
  actualizar,
  eliminar,
} from "../controllers/mascotas.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware); // todas las rutas protegidas

router.get("/", listar);
router.post("/", crear);
router.patch("/:id", actualizar);
router.delete("/:id", eliminar);

export default router;
