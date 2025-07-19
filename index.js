const express = require("express");
const cors = require("cors");
require("dotenv").config();

const usuariosRoutes = require("./routes/usuarios");
const productosRoutes = require("./routes/productos");
const uploadRoutes = require("./routes/uploadRoutes");
const { poolPromise } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas API
app.use("/usuarios", usuariosRoutes);
app.use("/productos", productosRoutes);
app.use("/upload", uploadRoutes); // ✅ Ruta final: /upload

// Comprobación de estado
app.get("/health", async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().query("SELECT 1");
    res.status(200).send("OK");
  } catch (error) {
    console.error("❌ Error en la comprobación de estado:", error);
    res.status(500).send("Fallo en comprobación de estado");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
