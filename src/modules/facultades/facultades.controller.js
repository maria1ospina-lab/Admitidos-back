import * as FacultadesService from "./facultades.service.js";

export async function obtenerFacultades(req, res) {
  try {
    const facultades = await FacultadesService.listarFacultades();

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Facultades obtenidas correctamente",
      data: facultades,
    });
  } catch (error) {
    console.error("Error al obtener las facultades:", error);

    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error al obtener las facultades",
    });
  }
}

export async function obtenerFacultadPorId(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "ID de facultad inválido",
    });
  }

  try {
    const facultad = await FacultadesService.obtenerFacultadPorId(id);

    if (!facultad) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Facultad no encontrada",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Facultad obtenida correctamente",
      data: facultad,
    });
  } catch (error) {
    console.error("Error al obtener la facultad:", error);

    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error al obtener la facultad",
    });
  }
}

export async function crearFacultad(req, res) {
  const { name } = req.body ?? {};

  if (typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "El campo 'name' es obligatorio y debe ser texto",
    });
  }

  const nombre = name.trim();

  if (nombre.length < 3 || nombre.length > 150) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "El campo 'name' debe tener entre 3 y 150 caracteres",
    });
  }

  try {
    const facultadId = await FacultadesService.crearFacultad(nombre);

    return res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Facultad creada correctamente",
      data: { id: facultadId, name: nombre },
    });
  } catch (error) {
    console.error("Error al crear la facultad:", error);

    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error al crear la facultad",
    });
  }
}

export async function actualizarFacultad(req, res) {
  const id = Number(req.params.id);
  const { name } = req.body ?? {};

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "ID de facultad inválido",
    });
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "El campo 'name' es obligatorio y debe ser texto",
    });
  }

  const nombre = name.trim();

  if (nombre.length < 3 || nombre.length > 150) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "El campo 'name' debe tener entre 3 y 150 caracteres",
    });
  }

  try {
    const facultadActual = await FacultadesService.obtenerFacultadPorId(id);

    if (!facultadActual) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Facultad no encontrada",
      });
    }

    const facultad = await FacultadesService.actualizarFacultad(id, nombre);

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Facultad actualizada correctamente",
      data: facultad,
    });
  } catch (error) {
    console.error("Error al actualizar la facultad:", error);

    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error al actualizar la facultad",
    });
  }
}

export async function eliminarFacultad(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "ID de facultad inválido",
    });
  }

  try {
    const facultadActual = await FacultadesService.obtenerFacultadPorId(id);

    if (!facultadActual) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Facultad no encontrada",
      });
    }

    const facultad = await FacultadesService.eliminarFacultad(id);

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Facultad eliminada correctamente",
      data: facultad,
    });
  } catch (error) {
    console.error("Error al eliminar la facultad:", error);

    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error al eliminar la facultad",
    });
  }
}