const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const USUARIOS = [
  {
    id: "u1",
    name: "Daniel Salgado",
    email: "dsalgado93@outlook.com",
    password: "testers",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: USUARIOS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log(errors);
    return next(new HttpError("Invalid Inputs, check your data.", 422));
  }
  const { name, email, password, stadiums } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Sign up failed.", 500);
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError("User exists already.", 422);
  }
  const createdUser = new User({
    name,
    email,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Estudio_Lamela_SantiagoBernabeu.jpg",
    password,
    stadiums,
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing Up failed.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = USUARIOS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("User or Password are wrong.", 401);
  }
  res.json({ message: "Logged In!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
