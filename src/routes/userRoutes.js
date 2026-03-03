const express = require("express");
const router = express.Router();

const {getProfile} = require("../controllers/userController");
const authentication = require("../middleware/authMiddleware");

router.get("/profile", authentication, getProfile);
module.exports = router;