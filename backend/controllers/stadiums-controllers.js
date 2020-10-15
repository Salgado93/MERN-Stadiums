const fs = require ('fs');
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const getCoordinates = require("../util/location");
const Stadium = require("../models/stadium");
const User = require("../models/user");

const getStadiumById = async (req, res, next) => {
  //console.log("GET Request in Stadiums");
  const stadiumId = req.params.sid; // Tomar valor concreto del url.
  let stadium;
  try {
    stadium = await Stadium.findById(stadiumId);
  } catch (err) {
    const error = new HttpError("Could not find stadium.", 500);
    return next(error);
  }
  if (!stadium) {
    const error = HttpError(
      "Could not find a stadium for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ stadium: stadium.toObject({ getters: true }) });
};

const getStadiumsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  //let stadiums;
  let userWithStadiums;
  try {
    userWithStadiums = await User.findById(userId).populate('stadiums'); 
  } catch (err) {
    const error = new HttpError("Fetching stadiums failed.", 500);
    return next(error);
  }
  if (!userWithStadiums || userWithStadiums.stadiums.length === 0) {
    return next(
      // new HttpError("Could not find stadiums for the provided user id.", 404) NO ASYNC
      next(
        new HttpError("Could not find stadiums for the provided user id.", 404)
      )
    );
  }
  res.json({
    stadiums: userWithStadiums.stadiums.map(stadium => stadium.toObject({ getters: true })),
  });
};

const createStadium = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid Inputs, check your data.", 422));
  }
  //const { title, description, coordinates, address, creator } = req.body; //const title = req.body.title;
  const { title, description, address } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordinates(address);
  } catch (error) {
    return next(error);
  }

  const createdStadium = new Stadium({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator: req.userData.userId,
  });
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("Creating stadium failed.", 500);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("Could not find use for provided id", 404);
    return next(error);
  }
  console.log(user);
  //DUMMY_STADIUMS.push(createdStadium);
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdStadium.save({ session: sess });
    user.stadiums.push(createdStadium);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating Stadium failed.", 500);
    return next(error);
  }
  res.status(201).json({ stadium: createdStadium });
};

const updateStadium = async (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    //console.log(errors);
    return next(new HttpError("Invalid Inputs, check your data.", 422));
  }
  const { title, description } = req.body;
  const stadiumId = req.params.sid;
  let stadium;
  try {
    stadium = await Stadium.findById(stadiumId);
  } catch (err) {
    const error = new HttpError("Could not update stadium.", 500);
    return next(error);
  }

  if (stadium.creator.toString() !== req.userData.userId) {
    const error = new HttpError("You are not allowed to edit this stadium", 401);
    return next(error);
  }

  stadium.title = title;
  stadium.description = description;
  
  try {
    await stadium.save();
  } catch (err) {
    const error = new HttpError("Could not update stadium.", 500);
    return next(error);
  }
  res.status(200).json({ stadium: stadium.toObject({ getters: true }) });
};

const deleteStadium = async (req, res, next) => {
  const stadiumId = req.params.sid;
  let stadium;

  try {
    stadium = await Stadium.findById(stadiumId).populate("creator"); // Refer to a doc stored in another collection.
  } catch (err) {
    const error = new HttpError("Something went wrong, could not delete stadium.", 500);
    return next(error);
  }

  if (!stadium) {
    const error = new HttpError("Could not find stadium for provided id.", 404);
    return next(error);
  }

  if (stadium.creator.id !== req.userData.userId) {
    const error = new HttpError(
      'You are not allowed to delete this stadium.',
      401
    );
    return next(error);
  }

  const imagePath = stadium.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await stadium.remove({ session: sess });
    stadium.creator.stadiums.pull(stadium);
    await stadium.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Could not delete stadium.", 500);
    return next(error);
  }
  fs.unlink(imagePath, err => {
    console.log(err);
  });
  res.status(200).json({ message: "Stadium Deleted!" });
};

exports.getStadiumById = getStadiumById;
exports.getStadiumsByUserId = getStadiumsByUserId;
exports.createStadium = createStadium;
exports.updateStadium = updateStadium;
exports.deleteStadium = deleteStadium;
