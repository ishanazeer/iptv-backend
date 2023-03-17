import mongoose from "mongoose";
const Schema = mongoose.Schema;
const schema = Schema({
  first_name: { type: String, required: true, maxlength: 50 },
  last_name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, maxlength: 50 },
  password: { type: String, required: true, maxlength: 100 },
},
{ timestamps: true });
export default mongoose.model("User", schema);
