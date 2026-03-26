const express = require("express");
const router = express.Router();
const {getUpcomingEvents} = require("../controllers/eventController");
const protect = require("../middleware/authMiddleware");

router.get("/upcoming", protect, getUpcomingEvents);
module.exports = router;