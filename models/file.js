import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: { type: String, required: true }, // file name
    original_name: { type: String, required: true }, // original file name
    path: { type: String, required: true }, // path to the file in the server
    type: { type: String, required: true }, // type of the file (image, video, audio, etc)
    image_link: { type: String }, // link to the file in the server
},
{ timestamps: true }
);

const FileModel= mongoose.model("File", schema);
export default FileModel;