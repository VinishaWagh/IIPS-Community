const express = require("express");
const router = express.Router();
const { toggleLikes } = require("../controllers/likeController");
const authentication = require("../middleware/authMiddleware");

router.post("/posts/:postId/likes", authentication, toggleLikes);
module.exports = router;