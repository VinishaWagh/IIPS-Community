const express = require("express");
const router = express.Router();
const {createPost, getPosts, deletePosts, updatePosts} = require("../controllers/postController"); 
const authentication = require("../middleware/authMiddleware");

router.post("/", authentication, createPost);
router.get("/", authentication, getPosts);
router.delete("/:id", authentication, deletePosts);
router.put("/:id", authentication, updatePosts);
module.exports = router;