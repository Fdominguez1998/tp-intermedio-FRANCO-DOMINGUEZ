import pool from "../database/mysql";
import { Dueno } from "../models/dueno.model";
import bcrypt from "bcrypt";

export async function crearDueno(dueno: Dueno): Promise<number> {
  const hashedPassword = await bcrypt.hash(dueno.password, 10);
  const [result] = await pool.query(
    "INSERT INTO duenos (nombre, apellido, email, password, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?)",
    [
      dueno.nombre,
      dueno.apellido,
      dueno.email,
      hashedPassword,
      dueno.telefono,
      dueno.direccion,
    ],
  );
  // @ts-ignore
  return result.insertId; // devuelve el ID del nuevo usuario
}

export async function obtenerDuenoPorEmail(
  email: string,
): Promise<Dueno | null> {
  const [rows] = await pool.query("SELECT * FROM duenos WHERE email = ?", [
    email,
  ]);
  const duenos = rows as Dueno[];
  return duenos.length > 0 ? duenos[0] : null;
}
