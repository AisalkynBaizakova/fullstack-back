const router = require("express").Router();

const { auth } = require("../middlewares/auth-middleware.js");
const checkPermission = require("../middlewares/check-permission.js");
const checkRole = require("../middlewares/check-role.js");
const { Rating } = require("../models/index.js");
const RatingController = require("./../controllers/rating-controller");

router.post("/create", auth, RatingController.create);
router.get("/:id", RatingController.getAll);
router.patch(
  "/:id",
  auth,
  checkRole("ADMIN", "USER"),
  checkPermission(Rating),
  RatingController.update
);
router.delete(
  "/:id",
  auth,
  checkRole("ADMIN", "USER"),
  checkPermission(Rating),
  RatingController.deleteOne
);
router.get("/get/:id", RatingController.getOne);

module.exports = router;
