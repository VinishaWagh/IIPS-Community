const express = require("express");
const router = express.Router();
const { getNotifications, markAllRead } = require("../controllers/notificationController");
const authentication = require("../middleware/authMiddleware");

router.get("/", authentication, getNotifications);
router.put("/read-all", authentication, markAllRead);
module.exports = router;