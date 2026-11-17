# API de Productos (P2)

API REST hecha con Node.js y Express que permite administrar productos (CRUD).
Responde en JSON y usa los códigos de estado HTTP correctos. Los datos se guardan en memoria.

**Alumno:** Felix Yamir Diaz Aldama 
 (trabajo individual)
**Materia:** Programación Web · Grupo 4X7B

## Instalación

```bash
npm install
npm start
```

El servidor queda en `http://localhost:3000`.
(Modo desarrollo con reinicio automático: `npm run dev`)

## Rutas

| Método | Ruta | Acción | Respuesta correcta | Posibles errores |
|--------|------|--------|--------------------|------------------|
| GET | /api/productos | Listar todos | 200 + arreglo | — |
| GET | /api/productos/:id | Ver uno | 200 + objeto | 404 |
| POST | /api/productos | Crear | 201 + objeto creado | 400 |
| PUT | /api/productos/:id | Actualizar | 200 + objeto actualizado | 400, 404 |
| DELETE | /api/productos/:id | Eliminar | 204 sin contenido | 404 |

## Modelo de producto

```json
{ "id": 1, "nombre": "Teclado", "precio": 350, "stock": 10 }
```

- `nombre`: texto obligatorio
- `precio`: número mayor o igual a 0
- `stock`: entero mayor o igual a 0

## Ejemplo

**Petición**

```
POST /api/productos
Content-Type: application/json

{ "nombre": "Monitor", "precio": 2500, "stock": 5 }
```

**Respuesta (201 Created)**

```json
{ "id": 3, "nombre": "Monitor", "precio": 2500, "stock": 5 }
```

**Ejemplo de error (400 Bad Request)**

```json
{ "errores": ["nombre es obligatorio", "precio debe ser un número positivo", "stock debe ser un entero positivo"] }
```

## Pruebas

En el repositorio está la colección de Postman `P2_Productos.postman_collection.json` con las 8 peticiones de prueba.
