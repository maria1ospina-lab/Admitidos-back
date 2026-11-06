import mongoose from "mongoose";
import * as programasService from "./programas.service.js";

export async function obtenerProgramas(req, res) {
  try {
    const programas = await programasService.listarProgramas();

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Programas obtenidos correctamente",
      data: programas,
    });
  } catch (error) {
    console.error("Error al obtener los programas:", error);

    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error al obtener los programas",
    });
  }
}

export async function obtenerProgramaPorId(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "ID de programa inválido",
    });
  }

  try {
    const programa = await programasService.obtenerProgramaPorId(id);

    if (!programa) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Programa no encontrado",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Programa obtenido correctamente",
      data: programa,
    });
  } catch (error) {
    console.error("Error al obtener el programa:", error);

    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error al obtener el programa",
    });
  }
}

export async function crearPrograma(req, res) {
  const { name, codigo, facultad } = req.body ?? {};

  if (
    typeof name !== "string" || name.trim().length < 3 || name.trim().length > 150
  ) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "El campo 'name' debe tener entre 3 y 150 caracteres",
    });
  }

  if (
    typeof codigo !== "string" || codigo.trim().length < 2 || codigo.trim().length > 20
  ) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "El campo 'codigo' debe tener entre 2 y 20 caracteres",
    });
  }

  if (!mongoose.isValidObjectId(facultad)) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "El campo 'facultad' debe contener un ID válido",
    });
  }

  try {
    const programa = await programasService.crearPrograma({
      nombre: name.trim(),
      codigo: codigo.trim(),
      facultad,
    });

    return res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Programa creado correctamente",
      data: programa,
    });
  } catch (error) {
    console.error("Error al crear el programa:", error);

    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error al crear el programa",
    });
  }
}

export async function actualizarPrograma(req, res) {
  const { id } = req.params;
  const { name, codigo, facultad } = req.body ?? {};

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "ID de programa inválido",
    });
  }

  if (
    typeof name !== "string" || name.trim().length < 3 || name.trim().length > 150
  ) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "El campo 'name' debe tener entre 3 y 150 caracteres",
    });
  }

  if (
    typeof codigo !== "string" || codigo.trim().length < 2 || codigo.trim().length > 20
  ) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "El campo 'codigo' debe tener entre 2 y 20 caracteres",
    });
  }

  if (!mongoose.isValidObjectId(facultad)) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "El campo 'facultad' debe contener un ID válido",
    });
  }

  try {
    const programaActual = await programasService.obtenerProgramaPorId(id);

    if (!programaActual) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Programa no encontrado",
      });
    }

    const programa = await programasService.actualizarPrograma(id, {
      nombre: name.trim(),
      codigo: codigo.trim(),
      facultad,
    });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Programa actualizado correctamente",
      data: programa,
    });
  } catch (error) {
    console.error("Error al actualizar el programa:", error);

    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error al actualizar el programa",
    });
  }
}

export async function eliminarPrograma(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "ID de programa inválido",
    });
  }

  try {
    const programaActual = await programasService.obtenerProgramaPorId(id);

    if (!programaActual) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Programa no encontrado",
      });
    }

    await programasService.eliminarPrograma(id);

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Programa eliminado correctamente",
      data: programaActual,
    });
  } catch (error) {
    console.error("Error al eliminar el programa:", error);

    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error al eliminar el programa",
    });
  }
}