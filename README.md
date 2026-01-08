# Kanban Backend

Este es el backend para la aplicación Kanban, desarrollado con **NestJS**, **TypeORM** y **PostgreSQL**.

## 🛠 Tecnologías

- [NestJS](https://nestjs.com/) - Framework de Node.js para construir aplicaciones del lado del servidor eficientes y escalables.
- [TypeORM](https://typeorm.io/) - ORM para TypeScript y JavaScript.
- [PostgreSQL](https://www.postgresql.org/) - Sistema de gestión de bases de datos relacional.
- [Docker](https://www.docker.com/) - Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) (Versión LTS recomendada)
- [Docker](https://www.docker.com/products/docker-desktop) y Docker Compose
- [Yarn](https://yarnpkg.com/) (Gestor de paquetes)

## 🚀 Instalación

1.  Clona este repositorio.
2.  Instala las dependencias del proyecto:

```bash
yarn install
```

## ⚙️ Configuración

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en el archivo de ejemplo `.env.example`:

```bash
cp .env.example .env
```

Asegúrate de que las variables de entorno coincidan con tu configuración local o la de Docker. El archivo de ejemplo ya viene configurado para funcionar con el contenedor de Docker provisto.

### 2. Base de Datos (Docker)

El proyecto incluye un archivo `docker-compose.yml` para levantar fácilmente una instancia de PostgreSQL.

Para iniciar la base de datos, ejecuta:

```bash
docker-compose up -d
```

Esto levantará un contenedor con PostgreSQL accesible en el puerto `5432`.
Las credenciales por defecto (definidas en `docker-compose.yml` y `.env.example`) son:

- **Host:** `localhost`
- **Puerto:** `5432`
- **Base de datos:** `kanban_db`
- **Usuario:** `kanban_user`
- **Contraseña:** `kanban_pass`

## ▶️ Ejecución

Una vez que la base de datos esté corriendo y las dependencias instaladas, puedes iniciar la aplicación.

```bash
# Modo desarrollo (watch mode)
yarn start:dev

# Modo producción
yarn start:prod
```

La aplicación estará disponible generalmente en `http://localhost:3000` (o el puerto definido en `.env`).

## 🧪 Tests

Para ejecutar las pruebas unitarias y de integración:

```bash
# Tests unitarios
yarn test

# Tests E2E (End-to-End)
yarn test:e2e

# Cobertura de tests
yarn test:cov
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio importante.

## � Endpoints

La aplicación expone una API REST bajo el recurso `/tasks`.

### `GET /tasks`

Obtiene la lista completa de todas las tareas.

**Respuesta Exitosa (200 OK):**

```json
[
  {
    "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    "title": "Configurar base de datos",
    "description": "Crear contenedor de Docker para Postgres",
    "state": "DONE",
    "createdAt": "2023-10-25T10:00:00.000Z",
    "updatedAt": "2023-10-25T12:00:00.000Z"
  }
]
```

### `GET /tasks/:id`

Obtiene una tarea específica por su ID (UUID).

**Ejemplo:** `GET /tasks/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`

### `POST /tasks`

Crea una nueva tarea.

**Cuerpo de la Petición (JSON):**

```json
{
  "title": "Implementar autenticación",
  "description": "Añadir Login y Registro con JWT",
  "state": "TODO"
}
```

- `title` (Requerido): Título de la tarea.
- `description` (Opcional): Descripción detallada.
- `state` (Opcional): Estado inicial. Valores permitidos: `TODO`, `PENDING`, `IN_PROGRESS`, `DONE`. Valor por defecto: `TODO`.

### `PATCH /tasks/:id`

Actualiza una tarea existente. Puedes enviar solo los campos que deseas modificar.

**Cuerpo de la Petición (JSON):**

```json
{
  "state": "IN_PROGRESS"
}
```

### `DELETE /tasks/:id`

Elimina una tarea por su ID.

**Respuesta Exitosa (200 OK):**

```json
{
  "status": "success"
}
```
