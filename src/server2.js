import app from "./app.js";
import { connectDB } from "./config/database.js";

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "localhost";

async function startServer() {
  try {
    await connectDB();
    console.log("Base de datos conectada correctamente");

    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
  }
}

startServer();