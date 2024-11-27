import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  idBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Image", ImageSchema);
