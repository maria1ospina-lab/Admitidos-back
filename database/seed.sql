-- Datos iniciales de demostración para Admitidos UCP.
-- Ejecutar en phpMyAdmin con la base app_admitidos seleccionada.
-- Es repetible: conserva IDs y no duplica programas por código.

START TRANSACTION;

-- Reutiliza los dos registros iniciales que ya existen en este proyecto.
UPDATE facultades
SET name = 'Facultad de Ciencias Básicas e Ingeniería'
WHERE name = 'Ingeniería';

UPDATE facultades
SET name = 'Facultad de Arquitectura y Diseño'
WHERE name = 'Facultad de prueba actualizada';

-- Agrega las otras facultades oficiales de la UCP si aún no existen.
INSERT INTO facultades (name)
SELECT 'Facultad de Ciencias Económicas y Administrativas'
WHERE NOT EXISTS (
  SELECT 1 FROM facultades
  WHERE name = 'Facultad de Ciencias Económicas y Administrativas'
);

INSERT INTO facultades (name)
SELECT 'Facultad de Ciencias Humanas, Sociales y de la Educación'
WHERE NOT EXISTS (
  SELECT 1 FROM facultades
  WHERE name = 'Facultad de Ciencias Humanas, Sociales y de la Educación'
);

-- Completa el nombre oficial del programa que ya insertaste (código IS).
UPDATE programas
SET nombre = 'Ingeniería de Sistemas y Telecomunicaciones',
    nivel = 'Pregrado',
    modalidad = 'Presencial',
    updated_at = NOW()
WHERE codigo = 'IS'
  AND nombre = 'Ingeniería de Sistemas';

-- Facultad de Arquitectura y Diseño
INSERT INTO programas (codigo, facultad_id, nombre, nivel, modalidad, created_at, updated_at)
SELECT 'ARQ', f.id, 'Arquitectura', 'Pregrado', 'Presencial', NOW(), NOW()
FROM facultades f
WHERE f.name = 'Facultad de Arquitectura y Diseño'
  AND NOT EXISTS (SELECT 1 FROM programas p WHERE p.codigo = 'ARQ');

INSERT INTO programas (codigo, facultad_id, nombre, nivel, modalidad, created_at, updated_at)
SELECT 'DAV', f.id, 'Diseño Audiovisual', 'Pregrado', 'Presencial', NOW(), NOW()
FROM facultades f
WHERE f.name = 'Facultad de Arquitectura y Diseño'
  AND NOT EXISTS (SELECT 1 FROM programas p WHERE p.codigo = 'DAV');

INSERT INTO programas (codigo, facultad_id, nombre, nivel, modalidad, created_at, updated_at)
SELECT 'DIN', f.id, 'Diseño Industrial', 'Pregrado', 'Presencial', NOW(), NOW()
FROM facultades f
WHERE f.name = 'Facultad de Arquitectura y Diseño'
  AND NOT EXISTS (SELECT 1 FROM programas p WHERE p.codigo = 'DIN');

INSERT INTO programas (codigo, facultad_id, nombre, nivel, modalidad, created_at, updated_at)
SELECT 'TVS', f.id, 'Técnica Profesional en Video, Disc-jockey y Sonido', 'Pregrado', 'Presencial', NOW(), NOW()
FROM facultades f
WHERE f.name = 'Facultad de Arquitectura y Diseño'
  AND NOT EXISTS (SELECT 1 FROM programas p WHERE p.codigo = 'TVS');

-- Facultad de Ciencias Básicas e Ingeniería
INSERT INTO programas (codigo, facultad_id, nombre, nivel, modalidad, created_at, updated_at)
SELECT 'IIN', f.id, 'Ingeniería Industrial', 'Pregrado', 'Presencial', NOW(), NOW()
FROM facultades f
WHERE f.name = 'Facultad de Ciencias Básicas e Ingeniería'
  AND NOT EXISTS (SELECT 1 FROM programas p WHERE p.codigo = 'IIN');

-- Facultad de Ciencias Económicas y Administrativas
INSERT INTO programas (codigo, facultad_id, nombre, nivel, modalidad, created_at, updated_at)
SELECT 'ADM', f.id, 'Administración de Empresas', 'Pregrado', 'Presencial', NOW(), NOW()
FROM facultades f
WHERE f.name = 'Facultad de Ciencias Económicas y Administrativas'
  AND NOT EXISTS (SELECT 1 FROM programas p WHERE p.codigo = 'ADM');

INSERT INTO programas (codigo, facultad_id, nombre, nivel, modalidad, created_at, updated_at)
SELECT 'MER', f.id, 'Mercadeo', 'Pregrado', 'Presencial', NOW(), NOW()
FROM facultades f
WHERE f.name = 'Facultad de Ciencias Económicas y Administrativas'
  AND NOT EXISTS (SELECT 1 FROM programas p WHERE p.codigo = 'MER');

INSERT INTO programas (codigo, facultad_id, nombre, nivel, modalidad, created_at, updated_at)
SELECT 'NEG', f.id, 'Negocios Internacionales', 'Pregrado', 'Presencial', NOW(), NOW()
FROM facultades f
WHERE f.name = 'Facultad de Ciencias Económicas y Administrativas'
  AND NOT EXISTS (SELECT 1 FROM programas p WHERE p.codigo = 'NEG');

-- Facultad de Ciencias Humanas, Sociales y de la Educación
INSERT INTO programas (codigo, facultad_id, nombre, nivel, modalidad, created_at, updated_at)
SELECT 'CSP', f.id, 'Comunicación Social y Periodismo', 'Pregrado', 'Presencial', NOW(), NOW()
FROM facultades f
WHERE f.name = 'Facultad de Ciencias Humanas, Sociales y de la Educación'
  AND NOT EXISTS (SELECT 1 FROM programas p WHERE p.codigo = 'CSP');

INSERT INTO programas (codigo, facultad_id, nombre, nivel, modalidad, created_at, updated_at)
SELECT 'LER', f.id, 'Licenciatura en Educación Religiosa', 'Pregrado', 'Presencial', NOW(), NOW()
FROM facultades f
WHERE f.name = 'Facultad de Ciencias Humanas, Sociales y de la Educación'
  AND NOT EXISTS (SELECT 1 FROM programas p WHERE p.codigo = 'LER');

INSERT INTO programas (codigo, facultad_id, nombre, nivel, modalidad, created_at, updated_at)
SELECT 'PSI', f.id, 'Psicología', 'Pregrado', 'Presencial', NOW(), NOW()
FROM facultades f
WHERE f.name = 'Facultad de Ciencias Humanas, Sociales y de la Educación'
  AND NOT EXISTS (SELECT 1 FROM programas p WHERE p.codigo = 'PSI');

COMMIT;

-- Verifica el resultado: cada programa debe mostrar su facultad.
SELECT f.name AS facultad, p.codigo, p.nombre, p.nivel, p.modalidad
FROM programas p
JOIN facultades f ON f.id = p.facultad_id
ORDER BY f.name, p.nombre;
