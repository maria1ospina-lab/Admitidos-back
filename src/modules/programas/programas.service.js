import db from '../../config/database.js';

export async function listarProgramas() {
  const [rows] = await db.query(`SELECT 
                                        *
                                         FROM programas
                                        ORDER BY nombre ASC`);
  return rows;
}

export async function obtenerProgramaPorId(id) {
  const [rows] = await db.query(`SELECT 
                                        *
                                         FROM programas
                                        WHERE id = ?`, [id]);
  return rows[0];
}

export async function crearPrograma(nombre) {
  const [result] = await db.query(`INSERT INTO programas (nombre) 
                                   VALUES (?)`, [nombre]);
  return result.insertId;
}

export async function actualizarPrograma(id, nombre) {
  await db.execute(`UPDATE programas SET nombre = ? WHERE id = ?`, [nombre, id]);

  return obtenerProgramaPorId(id);
}

export async function eliminarPrograma(id) {

  const [result] =
  await db.execute(`DELETE FROM programas WHERE id = ?`, [id]);

  return (
      result.affectedRows > 0
  );
}