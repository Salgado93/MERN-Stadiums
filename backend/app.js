const express = require("express");
const bodyParser = require("body-parser");
const stadiumsRoutes = require("./routes/stadiums-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());
app.use("/api/stadiums", stadiumsRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Route not found.", 404);
  throw error;
}); //If no response

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error!" });
});

app.listen(5000);
