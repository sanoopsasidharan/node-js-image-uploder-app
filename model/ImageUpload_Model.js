const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uploadSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },

  imgUrl: {
    type: String,
    required: true,
  },
});

const Uploads = mongoose.model("images", uploadSchema);
module.exports = Uploads;
