import app from "./app.js";
import db from "./config/database.js";

const PORT = Number(process.env.PORT);
const HOST = process.env.HOST;
const APP_NAME = process.env.APP_NAME;

async function startServer() {
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT} (${APP_NAME})`);
  });

  try {
    await db.execute("SELECT 1");
    console.log("Base de datos conectada correctamente.");
  } catch (error) {
    console.error("Frontend disponible; no se pudo conectar a la base de datos:", error.message);
  }
}

startServer();
