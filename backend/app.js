const express = require("express");
const bodyParser = require("body-parser");
const stadiumsRoutes = require("./routes/stadiums-routes");

const app = express();

app.use(stadiumsRoutes);

app.listen(5000);
