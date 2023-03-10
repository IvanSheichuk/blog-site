import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Стаття",
  },

  text: {
    type: String,
    default: "",
  },

  previewUrl: {
    type: String,
    default: "",
  },

  tags: {
    type: Array,
    default: [],
  },

  videoUrl: {
    type: Array,
    default: [],
  },

  fileUrl: {
    type: Array,
    default: [],
  },

  photoUrl: {
    type: Array,
    default: [],
  },

  viewsCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Post", PostSchema);
