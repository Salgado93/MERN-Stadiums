const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");

const DUMMY_STADIUMS = [
  {
    id: "s1",
    title: "Santiago Bernabeu",
    description: "Real Madrid Stadium",
    location: { lat: 40.4530428, lng: -3.6905224 },
    address: "Av. de Concha Espina, 1, 28036 Madrid, España",
    creator: "u1",
  },
];

const getStadiumById = (req, res, next) => {
  //console.log("GET Request in Stadiums");
  const stadiumId = req.params.sid; // Tomar valor concreto del url.
  const stadium = DUMMY_STADIUMS.find((s) => {
    return s.id === stadiumId;
  });
  if (!stadium) {
    throw new HttpError("Could not find a stadium for the provided id.", 404);
  }
  res.json({ stadium });
};

const getStadiumByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const stadium = DUMMY_STADIUMS.find((s) => {
    return s.creator === userId;
  });
  if (!stadium) {
    return next(
      new HttpError("Could not find a stadium for the provided user id.", 404)
    );
  }
  res.json({ stadium });
};

const createStadium = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body; //const title = req.body.title;
  const createdStadium = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_STADIUMS.push(createdStadium);
  res.status(201).json({ stadium: createdStadium });
};

exports.getStadiumById = getStadiumById;
exports.getStadiumByUserId = getStadiumByUserId;
exports.createStadium = createStadium;
