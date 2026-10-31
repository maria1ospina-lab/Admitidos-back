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
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
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
    const programaId = await programasService.crearPrograma(nombre);

    return res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Programa creado correctamente",
      data: { id: programaId, name: nombre },
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
  const id = Number(req.params.id);
  const { name } = req.body ?? {};

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "ID de programa inválido",
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
    const programaActual = await programasService.obtenerProgramaPorId(id);

    if (!programaActual) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Programa no encontrado",
      });
    }

    const programa = await programasService.actualizarPrograma(id, nombre);

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
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
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

    const programa = await programasService.eliminarPrograma(id);

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Programa eliminado correctamente",
      data: programa,
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