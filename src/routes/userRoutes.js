const express = require("express");
const router = express.Router();

const {getProfile, getSuggestions, updateProfile, updatePassword, getAlumni} = require("../controllers/userController");
const authentication = require("../middleware/authMiddleware");

router.get("/profile", authentication, getProfile);
router.get("/suggestions", authentication, getSuggestions);
router.put("/profile", authentication, updateProfile);
router.put("/password", authentication, updatePassword);
router.get("/alumni", authentication, getAlumni);
module.exports = router;