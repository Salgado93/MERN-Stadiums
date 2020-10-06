const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const stadiumSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  location: {
    lat: { type: Number, require: true },
    lng: { type: Number, require: true },
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Stadium", stadiumSchema);
