import { Router } from "express";
import {
  crearFacultad,
  obtenerFacultadPorId,
  obtenerFacultades,
  actualizarFacultad,
  eliminarFacultad,
} from "./facultades.controller.js";

const router = Router();

router.get("/show/", obtenerFacultades);
router.get("/info/:id", obtenerFacultadPorId);
router.post("/store", crearFacultad);
router.put("/update/:id", actualizarFacultad);
router.delete("/delete/:id", eliminarFacultad);

export default router;