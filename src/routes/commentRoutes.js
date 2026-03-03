const express = require("express");
const { createComment, getComments, deleteComments } = require("../controllers/commentController");
const router = express.Router();
const authentication = require("../middleware/authMiddleware");

router.post("/posts/:postId/comments", authentication, createComment);
router.get("/posts/:postId/comments", authentication, getComments);
router.delete("/comments/:id",authentication, deleteComments)
module.exports = router;