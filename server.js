const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // en la nube el puerto lo asigna la plataforma

app.use(cors()); // permite peticiones desde otra página (P1)
app.use(express.json()); // convierte el cuerpo de la petición a objeto JS

// Datos en memoria (en P3 se pueden pasar a una base de datos)
let productos = [
  { id: 1, nombre:  "Teclado", precio: 350, stock: 10 },
  { id: 2, nombre: "Mouse", precio: 180, stock: 25 }
];
let siguienteId = 3;

app.get("/", (req, res) => {
  res.json({ mensaje: "API de productos funcionando" });
});

// ---------- GET ----------
app.get("/api/productos", (req, res) => {
  res.status(200).json(productos);
});

app.get("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: `No existe el producto ${id}` });
  }
  res.status(200).json(producto);
});

// ---------- Validación ----------
function validar(datos) {
  datos = datos || {};
  const errores = [];
  if (!datos.nombre || typeof datos.nombre !== "string") errores.push("nombre es obligatorio");
  if (typeof datos.precio !== "number" || datos.precio < 0) errores.push("precio debe ser un número positivo");
  if (!Number.isInteger(datos.stock) || datos.stock < 0) errores.push("stock debe ser un entero positivo");
  return errores;
}

// ---------- POST ----------
app.post("/api/productos", (req, res) => {
  const errores = validar(req.body);
  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }
  const { nombre, precio, stock } = req.body;
  const nuevo = { id: siguienteId++, nombre, precio, stock };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

// ---------- PUT ----------
app.put("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = productos.findIndex(p => p.id === id);
  if (indice === -1) return res.status(404).json({ error: `No existe el producto ${id}` });

  const errores = validar(req.body);
  if (errores.length > 0) return res.status(400).json({ errores });

  const { nombre, precio, stock } = req.body;
  productos[indice] = { id, nombre, precio, stock };
  res.status(200).json(productos[indice]);
});

// ---------- DELETE ----------
app.delete("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const existe = productos.some(p => p.id === id);
  if (!existe) return res.status(404).json({ error: `No existe el producto ${id}` });

  productos = productos.filter(p => p.id !== id);
  res.status(204).send();
});

// Ruta no encontrada (siempre al final)
app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
