const moongoose = require("mongoose");
const Schema = moongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  stadiums: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = moongoose.model("User", userSchema);
