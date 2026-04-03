const express = require("express");
const router = express.Router();
const {
  sendRequest, respondRequest,
  getPendingRequests, getConnectionStatus, getMyConnections
} = require("../controllers/connectionController");
const authentication = require("../middleware/authMiddleware");

router.post("/request/:receiverId",        authentication, sendRequest);
router.put("/respond/:connectionId",       authentication, respondRequest);
router.get("/pending",                     authentication, getPendingRequests);
router.get("/status/:userId",              authentication, getConnectionStatus);
router.get("/my",                          authentication, getMyConnections);
module.exports = router;