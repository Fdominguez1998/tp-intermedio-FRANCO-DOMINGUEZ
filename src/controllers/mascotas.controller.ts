import { Request, Response } from "express";
import * as mascotasService from "../services/mascotas.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export async function listar(req: AuthRequest, res: Response) {
  try {
    const mascotas = await mascotasService.listarMascotas(req.userId!);
    res.json(mascotas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar mascotas" });
  }
}

export async function crear(req: AuthRequest, res: Response) {
  try {
    const { nombre, especie, fecha_nacimiento } = req.body;
    const id = await mascotasService.crearMascota({
      nombre,
      especie,
      fecha_nacimiento,
      id_dueno: req.userId!,
    });
    res.status(201).json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear mascota" });
  }
}

export async function actualizar(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { nombre, especie, fecha_nacimiento } = req.body;
    const affectedRows = await mascotasService.actualizarMascota(
      Number(id),
      req.userId!,
      { nombre, especie, fecha_nacimiento },
    );

    if (affectedRows === 0)
      return res.status(404).json({ message: "Mascota no encontrada" });
    res.json({ message: "Mascota actualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar mascota" });
  }
}

export async function eliminar(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const affectedRows = await mascotasService.eliminarMascota(
      Number(id),
      req.userId!,
    );
    if (affectedRows === 0)
      return res.status(404).json({ message: "Mascota no encontrada" });
    res.json({ message: "Mascota eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar mascota" });
  }
}
