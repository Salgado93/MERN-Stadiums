const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

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

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log(errors);
    throw new HttpError("Invalid Inputs, check your data.", 422);
  }
  const { name, email, password } = req.body;
  const userExists = USUARIOS.find((u) => u.email === email);
  if (userExists) {
    throw new HttpError("User already exists.", 422);
  }
  const createdUser = {
    id: uuidv4(),
    name,
    email, //email:email
    password,
  };
  USUARIOS.push(createdUser);
  res.status(201).json({ user: createdUser });
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
