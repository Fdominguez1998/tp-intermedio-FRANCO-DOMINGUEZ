import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";

/**
 * =========================
 * Entidad de dominio
 * =========================
 * Representa UN usuario dentro del sistema.
 * Esto es lo que usan services, auth, controllers, etc.
 */
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: string[];
}

/**
 * =========================
 * Fila que devuelve MySQL
 * =========================
 * Representa UNA fila del resultado SQL.
 * No es el dominio.
 */
interface UserRow extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string | null;
}

/**
 * =========================
 * Buscar usuario por email o username
 * =========================
 * Devuelve un User normalizado (con roles[])
 */
export const findUser = async (
  email: string = "",
  username: string = "",
): Promise<User | null> => {
  const [rows] = await pool.query<UserRow[]>(
    `
    SELECT 
      u.id,
      u.username,
      u.email,
      u.password,
      r.name AS role
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    WHERE u.email = ? OR u.username = ?
    `,
    [email, username],
  );

  if (rows.length === 0) return null;

  const user: User = {
    id: rows[0].id,
    username: rows[0].username,
    email: rows[0].email,
    password: rows[0].password,
    roles: rows
      .map((row) => row.role)
      .filter((role): role is string => role !== null),
  };

  return user;
};

/**
 * =========================
 * Crear usuario
 * =========================
 * Solo inserta en users.
 * La asignación de roles se hace aparte.
 */
export const createUser = async (
  user: Omit<User, "id" | "roles">,
): Promise<number> => {
  const [result] = await pool.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [user.username, user.email, user.password],
  );

  return (result as any).insertId;
};
