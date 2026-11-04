import express from "express";
import facultadesRoutes from "./modules/facultades/facultades.routes.js";
import programasRoutes from "./modules/programas/programas.routes.js";
import { fileURLToPath } from "node:url";
const app = express();  

const publicDirectory = fileURLToPath(new URL("../public", import.meta.url));

app.use(express.json());
app.use(express.static(publicDirectory));

app.use("/api/facultades", facultadesRoutes);
app.use("/api/programas", programasRoutes);

app.get("/api/health", (req, res) => {
  
  res.json({
    status: "ok",
    success: true,
    message: "API functioning correctly",
    version: "1.0.0",
  });

});

export default app;
