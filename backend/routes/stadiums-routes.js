const express = require("express");

const router = express.Router();

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

router.get("/:sid", (req, res, next) => {
  //console.log("GET Request in Stadiums");
  const stadiumId = req.params.sid; // Tomar valor concreto en el url.
  const stadium = DUMMY_STADIUMS.find((s) => {
    return s.id === stadiumId;
  });
  if (!stadium) {
    const error = new Error("Could not find a stadium for the provided id.");
    error.code = 404;
    throw error;
  }
  res.json({ stadium });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const stadium = DUMMY_STADIUMS.find((s) => {
    return s.creator === userId;
  });
  if (!stadium) {
    const error = new Error(
      "Could not find a stadium for the provided user id."
    );
    error.code = 404;
    return next(error);
  }
  res.json({ stadium });
});

module.exports = router;
