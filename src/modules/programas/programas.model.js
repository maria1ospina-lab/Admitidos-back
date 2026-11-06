import mongoose from "mongoose";


const programaSchema = new mongoose.Schema({
nombre: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 150
  },

facultad: {
  type:mongoose.Schema.Types.ObjectId,
  ref: "Facultad",
  required: true 

},

codigo: {
  type: String,
  required: true,
  trim: true,
  minlength: 2,
  maxlength: 20
}



},
  {
    timestamps: true,
    versionKey: false

  }
);  

export default mongoose.model("Programa", programaSchema, "programas");
