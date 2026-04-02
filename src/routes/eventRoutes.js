const express = require("express");
const router = express.Router();
const { getUpcomingEvents, createEvent, deleteEvent } = require("../controllers/eventController");
const authentication = require("../middleware/authMiddleware");
const isFaculty = require("../middleware/isFaculty");

router.get("/upcoming", authentication, getUpcomingEvents);
router.post("/", authentication, isFaculty, createEvent);
router.delete("/:id", authentication, isFaculty, deleteEvent);
module.exports = router;