# Kanban Backend

Este es el backend para la aplicación Kanban, una API RESTful robusta y escalable desarrollada con **NestJS**. Proporciona gestión de tareas y manejo de imágenes utilizando servicios modernos en la nube.

Desplegado en 
```
https://kanban-backend-3opu.onrender.com/documentation
```

## 🛠 Tecnologías Principales

- **[NestJS](https://nestjs.com/)**: Framework progresivo de Node.js (TypeScript).
- **[TypeORM](https://typeorm.io/)**: ORM para la gestión de la base de datos.
- **[PostgreSQL](https://www.postgresql.org/)**: Base de datos relacional.
- **[Supabase](https://supabase.com/)**: Utilizado para el almacenamiento de archivos (Storage).
- **[Swagger](https://swagger.io/)**: Documentación automática de la API.
- **[Passport](http://www.passportjs.org/)** + **JWT**: Autenticación segura.
- **[Docker](https://www.docker.com/)**: Contenerización de la base de datos.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (Versión LTS recomendada)
- [Yarn](https://yarnpkg.com/) (Gestor de paquetes)
- [Docker](https://www.docker.com/products/docker-desktop) y Docker Compose (para la base de datos local)

## 🚀 Instalación

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/IvanParada/kanban_backend.git
    cd kanban-backend
    ```

2.  **Instalar dependencias:**

    ```bash
    yarn install
    ```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto copiando el ejemplo proporcionado:

```bash
cp .env.example .env
```

Abre el archivo `.env` y configura las variables según tu entorno:

```env
PORT=3000

# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kanban_db
DB_USERNAME=kanban_user
DB_PASSWORD=kanban_pass

# Autenticación
JWT_SECRET=tu_secreto_super_seguro

# Supabase (Storage)
SUPABASE_URL=tu_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key
SUPABASE_BUCKET=nombre_de_tu_bucket
```

### Base de Datos (Docker)

Levanta una instancia local de PostgreSQL utilizando Docker Compose:

```bash
docker-compose up -d
```

Esto iniciará PostgreSQL en el puerto `5432` con las credenciales definidas en `docker-compose.yaml` y `.env`.

## ▶️ Ejecución

### Modo Desarrollo

```bash
yarn start:dev
```

### Modo Producción

```bash
yarn build
yarn start:prod
```

## 📚 Documentación de la API (Swagger)

La documentación completa e interactiva de los endpoints está disponible a través de Swagger UI.

Una vez que la aplicación esté corriendo (por defecto en el puerto 3000), visita:

👉 **[http://localhost:3000/documentation](http://localhost:3000/documentation)**

En esta interfaz podrás:

- Explorar todos los endpoints disponibles (`/tasks`, `/auth`, `/task-images`, etc.).
- Ver los esquemas de datos (DTOs).
- Probar las peticiones directamente desde el navegador (incluyendo autenticación Bearer).
