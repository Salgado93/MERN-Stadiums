const express = require("express");
const stadiumsControllers = require("../controllers/stadiums-controllers");
const router = express.Router();

router.get("/:sid", stadiumsControllers.getStadiumById);
router.get("/user/:uid", stadiumsControllers.getStadiumByUserId);

module.exports = router;