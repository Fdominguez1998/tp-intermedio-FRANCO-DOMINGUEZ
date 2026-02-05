# TP Intermedio - Backend Veterinaria

## Descripción

Este proyecto es un backend en **Node.js con TypeScript**, usando **Express y MySQL**, que implementa **autenticación JWT** y sigue el patrón **MVC**.
Permite registrar dueños, autenticarlos y gestionar sus mascotas (CRUD), de manera que cada dueño solo pueda acceder a sus propias mascotas.

---

## Tecnologías usadas

- Node.js + TypeScript
- Express
- MySQL (mysql2/promise)
- Bcrypt (hash de contraseñas)
- JSON Web Token (JWT)
- express-validator (validaciones)

---

## Estructura del proyecto

```
src/
 ├─ controllers/
 ├─ services/
 ├─ models/
 ├─ routes/
 ├─ middlewares/
 ├─ database/
 ├─ validators/
 ├─ utils/
 ├─ types/
 └─ index.ts
```

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Fdominguez1998/tp-intermedio-FRANCO-DOMINGUEZ.git
cd tp-intermedio-FRANCO-DOMINGUEZ
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` basado en `.env.example`:

```
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=veterinaria_patitas_felices
JWT_SECRET=clave_super_secreta
```

4. Asegurarse de que la base de datos exista (`veterinaria_patitas_felices`) y tenga las tablas:

- duenos
- mascotas
- veterinarios
- historial_clinico

---

## Ejecución del servidor

```bash
npm run dev
```

El servidor quedará corriendo en `http://localhost:3000`.

---

## Endpoints

### **Autenticación (públicos)**

#### Registro de dueño

**POST** `/api/auth/register`

**Body (JSON):**

```json
{
  "nombre": "Franco",
  "apellido": "Dominguez",
  "email": "franco@test.com",
  "password": "123456",
  "telefono": "123456789",
  "direccion": "Calle Falsa 123"
}
```

**Respuesta:**

```json
{
  "token": "<JWT_TOKEN>"
}
```

---

#### Login de dueño

**POST** `/api/auth/login`

**Body (JSON):**

```json
{
  "email": "franco@test.com",
  "password": "123456"
}
```

**Respuesta:**

```json
{
  "token": "<JWT_TOKEN>"
}
```

---

### **Mascotas (protegidas)**

> Todas las rutas requieren el header `Authorization: Bearer <JWT_TOKEN>`

#### Listar mascotas

**GET** `/api/mascotas`

**Respuesta:**

```json
[
  {
    "id": 1,
    "nombre": "Firulais",
    "especie": "Perro",
    "fecha_nacimiento": "2020-05-01T00:00:00.000Z",
    "id_dueno": 1
  }
]
```

#### Crear mascota

**POST** `/api/mascotas`

**Body (JSON):**

```json
{
  "nombre": "Firulais",
  "especie": "Perro",
  "fecha_nacimiento": "2020-05-01"
}
```

**Respuesta:**

```json
{
  "id": 1
}
```

#### Actualizar mascota

**PATCH** `/api/mascotas/:id`

**Body (JSON):**

```json
{
  "nombre": "Firulais",
  "especie": "Perro",
  "fecha_nacimiento": "2020-06-01"
}
```

**Respuesta:**

```json
{
  "message": "Mascota actualizada"
}
```

#### Eliminar mascota

**DELETE** `/api/mascotas/:id`

**Respuesta:**

```json
{
  "message": "Mascota eliminada"
}
```

---

## Variables de entorno (`.env`)

- `PORT` → puerto del servidor (ej: 3000)
- `DB_HOST` → host de MySQL (ej: localhost)
- `DB_USER` → usuario de MySQL
- `DB_PASSWORD` → contraseña del usuario
- `DB_NAME` → nombre de la base de datos
- `JWT_SECRET` → clave secreta para firmar los JWT

---

## Notas

- Las contraseñas se almacenan **hasheadas** con bcrypt.
- Todas las operaciones sobre mascotas están protegidas: **solo el dueño puede ver/editar sus propias mascotas**.
- Se puede agregar validación adicional usando **express-validator**.
- Middleware de errores centralizado (`error.middleware.ts`) maneja errores de manera uniforme.
