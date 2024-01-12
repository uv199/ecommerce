import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const todoSchema = mongoose.Schema(
  {
    todo: String,
    userId: ObjectId,
    img: String,
  },
  { timestamps: true }
);

export default mongoose.model("todo", todoSchema);
