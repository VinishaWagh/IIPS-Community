const express = require("express");
const router = express.Router();
const { getLatest, createAnnouncement, deleteAnnouncement, getAllAnnouncements } = require("../controllers/announcementController");
const authentication = require("../middleware/authMiddleware");
const isFaculty = require("../middleware/isFaculty");

router.get("/latest", authentication, getLatest);
router.get("/", authentication, isFaculty, getAllAnnouncements);
router.post("/", authentication, isFaculty, createAnnouncement);
router.delete("/:id", authentication, isFaculty, deleteAnnouncement);
module.exports = router;