import mongoose from "mongoose";
const Schema = mongoose.Schema;
const schema = Schema({
  name: { type: String, required: true, maxlength: 50 },
  genre_id: { type: mongoose.Schema.Types.ObjectId, ref: "Genre" },
 description: { type: String, required: true, maxlength: 200 },
 trailor: { type: String, required: true, maxlength: 200 },
},
{ timestamps: true });
export default mongoose.model("Series", schema);
