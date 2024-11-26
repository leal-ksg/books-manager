import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
    description: {
        type: String,
        required: true,
      },
    pageCount: {
        type: Number,
        required: true,
      },
    excerpt: {
        type: String,
        required: false,
      },
    publishDate: {
        type: Date,
        required: true,
      },
});

export default mongoose.model("Book", BookSchema);
