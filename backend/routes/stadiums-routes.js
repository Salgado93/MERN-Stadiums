const { Router } = require("express");
const { check } = require("express-validator");
const stadiumsControllers = require("../controllers/stadiums-controllers");
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth'); 
const router = Router();

router.get("/:sid", stadiumsControllers.getStadiumById);
router.get("/user/:uid", stadiumsControllers.getStadiumsByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single('image'),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  stadiumsControllers.createStadium
);
router.patch(
  "/:sid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  stadiumsControllers.updateStadium
);
router.delete("/:sid", stadiumsControllers.deleteStadium);

module.exports = router;
