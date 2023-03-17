import mongoose from "mongoose";
const Schema = mongoose.Schema;
const schema = Schema({
  name: { type: String, required: true, maxlength: 50 },
  season_id: { type: mongoose.Schema.Types.ObjectId, ref: "Season" },
 description: { type: String, required: true, maxlength: 200 },
image_id: { type: mongoose.Schema.Types.ObjectId, ref:"File"},
},
{ timestamps: true }
);
export default mongoose.model("Episode", schema);
