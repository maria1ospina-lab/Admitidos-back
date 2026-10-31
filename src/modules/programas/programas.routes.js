import { Router } from "express";
import {
  obtenerProgramas,
  obtenerProgramaPorId,
  crearPrograma,
  actualizarPrograma,
  eliminarPrograma,
} from "./programas.controller.js";

const router = Router();

router.get("/show/", obtenerProgramas);
router.get("/info/:id", obtenerProgramaPorId);
router.post("/store", crearPrograma);
router.put("/update/:id", actualizarPrograma);
router.delete("/delete/:id", eliminarPrograma);

export default router;