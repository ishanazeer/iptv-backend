import mongoose from "mongoose";
const Schema = mongoose.Schema;
const schema = Schema({
  name: { type: String, required: true, maxlength: 50 },
},
{ timestamps: true }
);
export default mongoose.model("Genre", schema);
