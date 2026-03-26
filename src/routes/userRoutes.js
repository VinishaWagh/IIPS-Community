const express = require("express");
const router = express.Router();

const {getProfile, getSuggestions} = require("../controllers/userController");
const authentication = require("../middleware/authMiddleware");

router.get("/profile", authentication, getProfile);
router.get("/suggestions", authentication, getSuggestions);
module.exports = router;