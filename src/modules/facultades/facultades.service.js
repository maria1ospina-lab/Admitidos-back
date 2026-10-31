import db from '../../config/database.js';

export async function listarFacultades() {
  const [rows] = await db.query(`SELECT 
                                        id,
                                        name,
                                        created_at AS createdAt,
                                        updated_at AS updatedAt
                                         FROM facultades
                                        ORDER BY name ASC`);
  return rows;
}

export async function obtenerFacultadPorId(id) {
  const [rows] = await db.query(`SELECT 
                                        id,
                                        name,
                                        created_at AS createdAt,
                                        updated_at AS updatedAt
                                         FROM facultades
                                        WHERE id = ?`, [id]);
  return rows[0];
}

export async function crearFacultad(nombre) {
  const [result] = await db.query(`INSERT INTO facultades (name) 
                                   VALUES (?)`, [nombre]);
  return result.insertId;
}

export async function actualizarFacultad(id, nombre) {
  await db.execute(`UPDATE facultades SET name = ? WHERE id = ?`, [nombre, id]);

  return obtenerFacultadPorId(id);
}

export async function eliminarFacultad(id) {

  const [result] =
  await db.execute(`DELETE FROM facultades WHERE id = ?`, [id]);

  return (
      result.affectedRows > 0
  );
}