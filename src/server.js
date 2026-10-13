import express from "express";

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

const facultades = [
  { id: 1, name: "Facultad de Ciencias Empresariales" },
  { id: 2, name: "Facultad de Ciencias de la Salud" },
  { id: 3, name: "Facultad de Derecho y Ciencias Políticas" },
  { id: 4, name: "Facultad de Educación" },
];

const programas = [
  { id: 1, codigo: "is", facultadId: 1, name: "Ingeniería de Sistemas", nivel: "Pregrado" },
  { id: 2, codigo: "cc", facultadId: 1, name: "Contabilidad y Finanzas", nivel: "Pregrado" },
  { id: 3, codigo: "en", facultadId: 2, name: "Enfermería", nivel: "Pregrado" },
  { id: 4, codigo: "md", facultadId: 2, name: "Medicina", nivel: "Pregrado" },
];

let nextProgramaId = 5;

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    success: true,
    message: "API functioning correctly",
    version: "1.0.0",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    success: true,
    message: "API functioning correctly",
    version: "1.0.0",
  });
});

app.get("/facultades", (req, res) => {
  res.json({ data: facultades, statuscode: 200 });
});

app.get("/programas", (req, res) => {
  res.json({ data: programas, statuscode: 200 });
});

app.post("/programas/store", (req, res) => {
  const { codigo, facultadId, name, nivel } = req.body;

  if (!codigo || !facultadId || !name || !nivel) {
    return res.status(422).json({
      statuscode: 422,
      success: false,
      message: "codigo, facultadId, name y nivel son obligatorios.",
    });
  }

  const facultad = facultades.find((item) => item.id === Number(facultadId));

  if (!facultad) {
    return res.status(404).json({
      statuscode: 404,
      success: false,
      message: `La facultad con id ${facultadId} no existe.`,
    });
  }

  const nuevoPrograma = {
    id: nextProgramaId++,
    codigo,
    facultadId: Number(facultadId),
    name,
    nivel,
    Createby: "system",
    CreateAt: new Date().toISOString(),
  };

  programas.push(nuevoPrograma);

  res.status(201).json({
    statuscode: 201,
    success: true,
    data: nuevoPrograma,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});