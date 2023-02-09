import mongoose from "mongoose";

const RFSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  downloadLink: {
    type: String,
    required: true,
  },

  parseLink: {
    type: String,
    required: true,
  },
});

export default mongoose.model("regulatory_frameworks", RFSchema)