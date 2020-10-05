const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const getCoordinates = require("../util/location");
const Stadium = require("../models/stadium");
const stadium = require("../models/stadium");

let DUMMY_STADIUMS = [
  {
    id: "s1",
    title: "Santiago Bernabeu",
    description: "Real Madrid Stadium",
    location: { lat: 40.4530428, lng: -3.6905224 },
    address: "Av. de Concha Espina, 1, 28036 Madrid, España",
    creator: "u1",
  },
];

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
  let stadiums;
  try {
    stadiums = await Stadium.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Listing stadiums failed.", 500);
    return next(error);
  }
  if (!stadiums || stadiums.length === 0) {
    return next(
      // new HttpError("Could not find stadiums for the provided user id.", 404) NO ASYNC
      next(
        new HttpError("Could not find stadiums for the provided user id.", 404)
      )
    );
  }
  res.json({
    stadiums: stadiums.map((stadium) => stadium.toObject({ getters: true })),
  });
};

const createStadium = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid Inputs, check your data.", 422));
  }
  //const { title, description, coordinates, address, creator } = req.body; //const title = req.body.title;
  const { title, description, address, creator } = req.body;
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
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Estudio_Lamela_SantiagoBernabeu.jpg",
    creator,
  });
  //DUMMY_STADIUMS.push(createdStadium);
  try {
    await createdStadium.save();
  } catch (err) {
    const error = new HttpError("Creating Stadium failed.", 500);
    return next(error);
  }
  res.status(201).json({ stadium: createdStadium });
};

const updateStadium = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log(errors);
    throw new HttpError("Invalid Inputs, check your data.", 422);
  }
  const { title, description } = req.body;
  const stadiumId = req.params.sid;
  const updateStadium = { ...DUMMY_STADIUMS.find((s) => s.id === stadiumId) };
  const stadiumIndex = DUMMY_STADIUMS.findIndex((s) => s.id === stadiumId);
  updateStadium.title = title;
  updateStadium.description = description;
  DUMMY_STADIUMS[stadiumIndex] = updateStadium;
  res.status(200).json({ stadium: updateStadium });
};

const deleteStadium = (req, res, next) => {
  const stadiumId = req.params.sid;
  if (!DUMMY_STADIUMS.find((s) => s.id === stadiumId)) {
    throw new HttpError("Could not find a stadium for the provided id.", 404);
  }
  DUMMY_STADIUMS = DUMMY_STADIUMS.filter((s) => s.id !== stadiumId);
  res.status(200).json({ message: "Stadium Deleted!" });
};

exports.getStadiumById = getStadiumById;
exports.getStadiumsByUserId = getStadiumsByUserId;
exports.createStadium = createStadium;
exports.updateStadium = updateStadium;
exports.deleteStadium = deleteStadium;
