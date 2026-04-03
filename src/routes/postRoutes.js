const express = require("express");
const router = express.Router();
const {createPost, getPosts, deletePosts, updatePosts, getTrending, getMyPosts, getSavedPosts, toggleSavePost, searchAll} = require("../controllers/postController"); 
const authentication = require("../middleware/authMiddleware");

router.post("/", authentication, createPost);
router.get("/", authentication, getPosts);
router.delete("/:id", authentication, deletePosts);
router.put("/:id", authentication, updatePosts);
router.get("/trending", authentication, getTrending);
router.get("/my", authentication, getMyPosts);
router.get("/saved", authentication, getSavedPosts);
router.post("/:postId/save", authentication, toggleSavePost);
router.get("/search", authentication, searchAll);
module.exports = router;