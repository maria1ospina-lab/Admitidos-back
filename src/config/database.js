import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI)

  const db = mongoose.connection.db;
  const programasCollectionExists = await db
    .listCollections({ name: "programas" }, { nameOnly: true })
    .hasNext();

  if (!programasCollectionExists) {
    await db.createCollection("programas");
    console.log('Colección "programas" creada correctamente');
  }

}  
