const authController = require("../controller/authController");
const { Router } = require("express");

const router = Router();

router.get("/", authController.showData);
router.post("/signup", authController.signup);

module.exports = router;
