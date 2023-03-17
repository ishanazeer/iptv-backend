import mongoose from "mongoose";
const Schema = mongoose.Schema;
const schema = Schema({
  series_id: { type: mongoose.Schema.Types.ObjectId, ref: "Series" },
  name: { type: String, required: true, maxlength: 50 },
 description: { type: String, required: true, maxlength: 200 },
},
{ timestamps: true });
export default mongoose.model("Season", schema);
