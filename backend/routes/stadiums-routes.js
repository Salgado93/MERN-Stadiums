const express = require("express");
const stadiumsControllers = require("../controllers/stadiums-controllers");
const router = express.Router();

router.get("/:sid", stadiumsControllers.getStadiumById);
router.get("/user/:uid", stadiumsControllers.getStadiumsByUserId);
router.post("/", stadiumsControllers.createStadium);
router.patch("/:sid", stadiumsControllers.updateStadium);
router.delete("/:sid", stadiumsControllers.deleteStadium);

module.exports = router;
