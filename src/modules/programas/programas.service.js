import Programa from "./programas.model.js";

export async function listarProgramas() {
  return await Programa.find().populate("facultad").sort({ nombre: 1 });
}

export async function obtenerProgramaPorId(id) {
  return await Programa.findById(id).populate("facultad");
}

export async function crearPrograma(datos) {
  return await Programa.create(datos);
}

export async function actualizarPrograma(id, datos) {
  return await Programa.findByIdAndUpdate(id, datos, {
    returnDocument: "after", //Devuelve programas ya actualizado 
    runValidators: true,
   });
}

export async function eliminarPrograma(id) {
  const eliminada = await Programa.findByIdAndDelete(id);
  return eliminada !== null;
}

