const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const stadiumSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  location: {
    lat: { type: Number, require: true },
    lng: { type: Number, require: true },
  },
  creator: { type: String, required: true },
});

module.exports = moongoose.model("Stadium", stadiumSchema);
