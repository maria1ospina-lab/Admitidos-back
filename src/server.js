import express from "express";

const app = express();

const PORT = 3000;


app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    success: true,
    message: "API functioning correctly",
    version: "1.0.0"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});