# 🚀 Guía Completa de la API: Tareas e Imágenes

Esta guía cubre el ciclo de vida completo: desde crear una tarea hasta subir sus imágenes y consultarla.

## 1. Crear Tarea (Create Task)

El primer paso es crear la tarea para obtener su `id`.

**ENDPOINT**: `POST /api/tasks`
**Headers**: `Authorization: Bearer <TOKEN_JWT>`

### Request Body (JSON)

```json
{
  "title": "Reparar servidor",
  "description": "El servidor de producción tiene latencia alta",
  "state": "TODO"
}
```

_Campos opcionales:_ `description`, `state` (Valores permitidos: `TODO`, `PENDING`, `IN_PROGRESS`, `DONE`).

### Response (201 Created)

```json
{
  "title": "Reparar servidor",
  "description": "El servidor de producción tiene latencia alta",
  "state": "TODO",
  "user": {
    "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    "email": "ivan@example.com"
  },
  "id": "e4f2b1a0-1234-4567-890a-bcdef1234567",
  "createdAt": "2026-01-18T23:55:00.000Z",
  "updatedAt": "2026-01-18T23:55:00.000Z"
}
```

📌 **Guarda el `id` de la respuesta** (ej: `e4f2b1a0...`), lo necesitarás para subir imágenes.

---

## 2. Solicitar URL de Subida (Presign)

Pide permiso para subir archivos a esa tarea.

**ENDPOINT**: `POST /api/task-images/presign`
**Headers**: `Authorization: Bearer <TOKEN_JWT>`

### Request Body (JSON)

```json
{
  "taskId": "e4f2b1a0-1234-4567-890a-bcdef1234567",
  "files": [{ "filename": "captura_error.png", "mimeType": "image/png" }]
}
```

### Response (201 Created)

Recibes una URL "firmada" para subir el archivo directo a Supabase.

```json
[
  {
    "signedUrl": "https://xyz.supabase.co/storage/v1/object/upload/sign/users/...?token=...",
    "path": "users/a0ee.../tasks/e4f2.../uuid-captura_error.png",
    "token": "...",
    "originalName": "captura_error.png"
  }
]
```

---

## 3. Subir Archivo (Frontend -> Supabase)

El Frontend hace un **PUT** directo a la `signedUrl` recibida en el paso anterior.

- **URL**: La `signedUrl` larga.
- **Body**: El archivo binario (Blob/File).
- **Header**: `Content-Type: image/png`

_(Este paso no retorna JSON, retorna 200 OK si subió bien)._

---

## 4. Confirmar Subida (Confirm)

Despues de subir, avisa al backend para guardar la imagen en la base de datos.

**ENDPOINT**: `POST /api/task-images/confirm`
**Headers**: `Authorization: Bearer <TOKEN_JWT>`

### Request Body (JSON)

```json
{
  "taskId": "e4f2b1a0-1234-4567-890a-bcdef1234567",
  "userId": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  "images": [
    {
      "key": "users/a0ee.../tasks/e4f2.../uuid-captura_error.png",
      "url": "https://xyz.supabase.co/storage/v1/object/public/bucket/...",
      "mimeType": "image/png",
      "size": 10240,
      "originalName": "captura_error.png"
    }
  ]
}
```

### Response (201 Created)

```json
[
  {
    "key": "users/a0ee.../tasks/e4f2.../uuid-captura_error.png",
    "url": "https://xyz.supabase.co/storage/v1/object/public/bucket/...",
    "mimeType": "image/png",
    "size": 1024,
    "originalName": "captura_error.png",
    "id": "imagen-uuid-123",
    "created_at": "..."
  }
]
```

---

## 5. Obtener Tarea Completa (Get Task)

Consulta la tarea y verás las imágenes vinculadas.

**ENDPOINT**: `GET /api/tasks/e4f2b1a0-1234-4567-890a-bcdef1234567`
**Headers**: `Authorization: Bearer <TOKEN_JWT>`

### Response (200 OK)

```json
{
  "id": "e4f2b1a0-1234-4567-890a-bcdef1234567",
  "title": "Reparar servidor",
  "description": "El servidor de producción tiene latencia alta",
  "state": "TODO",
  "createdAt": "2026-01-18T23:55:00.000Z",
  "user": {
    "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    "email": "ivan@example.com"
  },
  "images": [
    {
      "id": "imagen-uuid-123",
      "url": "https://xyz.supabase.co/storage/v1/object/public/bucket/...",
      "key": "users/a0ee.../tasks/e4f2.../uuid-captura_error.png",
      "mimeType": "image/png",
      "originalName": "captura_error.png"
    }
  ]
}
```

SignedUrl tiene expiración, por lo tanto, se debe ejecutar el endpoint de refreshSignedUrl para obtener una nueva url.

**ENDPOINT**: `GET /api/task-images/:imageId/signed-url`
