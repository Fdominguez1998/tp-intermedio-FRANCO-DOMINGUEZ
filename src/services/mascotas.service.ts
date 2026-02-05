import pool from "../database/mysql";
import { AuthRequest } from "../middlewares/auth.middleware";

export interface Mascota {
  id?: number;
  nombre: string;
  especie: string;
  fecha_nacimiento?: string;
  id_dueno: number;
}

export async function listarMascotas(id_dueno: number): Promise<Mascota[]> {
  const [rows] = await pool.query("SELECT * FROM mascotas WHERE id_dueno = ?", [
    id_dueno,
  ]);
  return rows as Mascota[];
}

export async function crearMascota(mascota: Mascota): Promise<number> {
  const [result] = await pool.query(
    "INSERT INTO mascotas (nombre, especie, fecha_nacimiento, id_dueno) VALUES (?, ?, ?, ?)",
    [
      mascota.nombre,
      mascota.especie,
      mascota.fecha_nacimiento,
      mascota.id_dueno,
    ],
  );
  // @ts-ignore
  return result.insertId;
}

export async function actualizarMascota(
  id: number,
  id_dueno: number,
  datos: Partial<Mascota>,
) {
  const [result] = await pool.query(
    "UPDATE mascotas SET nombre = ?, especie = ?, fecha_nacimiento = ? WHERE id = ? AND id_dueno = ?",
    [datos.nombre, datos.especie, datos.fecha_nacimiento, id, id_dueno],
  );
  // @ts-ignore
  return result.affectedRows;
}

export async function eliminarMascota(id: number, id_dueno: number) {
  const [result] = await pool.query(
    "DELETE FROM mascotas WHERE id = ? AND id_dueno = ?",
    [id, id_dueno],
  );
  // @ts-ignore
  return result.affectedRows;
}
