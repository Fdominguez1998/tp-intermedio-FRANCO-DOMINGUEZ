import { Request, Response } from "express";
import * as duenoService from "../services/duenos.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function register(req: Request, res: Response) {
  try {
    const { nombre, apellido, email, password, telefono, direccion } = req.body;

    // Verificar si el email ya existe
    const existingUser = await duenoService.obtenerDuenoPorEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Email ya registrado" });

    // Crear usuario
    const userId = await duenoService.crearDueno({
      nombre,
      apellido,
      email,
      password,
      telefono,
      direccion,
    });

    // Generar token
    const token = jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await duenoService.obtenerDuenoPorEmail(email);
    if (!user)
      return res
        .status(400)
        .json({ message: "Email o contraseña incorrectos" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ message: "Email o contraseña incorrectos" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
}
