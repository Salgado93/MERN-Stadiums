const { Router } = require("express");
const { check } = require("express-validator");
const stadiumsControllers = require("../controllers/stadiums-controllers");
const router = Router();

router.get("/:sid", stadiumsControllers.getStadiumById);
router.get("/user/:uid", stadiumsControllers.getStadiumsByUserId);
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  stadiumsControllers.createStadium
);
router.patch("/:sid", stadiumsControllers.updateStadium);
router.delete("/:sid", stadiumsControllers.deleteStadium);

module.exports = router;
