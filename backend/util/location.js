const axios = require("axios");
const API_KEY = "AIzaSyD65MH52lzHYZJ2d_oXygC5OOyzHZK_vgM";
const HttpError = require("../models/http-error");

async function getCoordenates(address) {
  /*return { NO API KEY
    lat: 40.4530428,
    lng: -3.6905224,
  };*/
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );
  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not found location for that address.",
      422
    );
    throw error;
  }
  const coordinates = data.results[0].geometry.location;
  return coordinates;
}

module.exports = getCoordenates;
