const express = require("express");
const router = express.Router();
const {createPost, getPosts, deletePosts, updatePosts, getTrending, getMyPosts, getSavedPosts, toggleSavePost, searchAll} = require("../controllers/postController"); 
const authentication = require("../middleware/authMiddleware");
const upload = require("../config/multer");

router.post("/", authentication, upload.array("files", 10), createPost);
router.get("/", authentication, getPosts);
router.delete("/:id", authentication, deletePosts);
router.put("/:id", authentication, updatePosts);
router.get("/trending", authentication, getTrending);
router.get("/my", authentication, getMyPosts);
router.get("/saved", authentication, getSavedPosts);
router.post("/:postId/save", authentication, toggleSavePost);
router.get("/search", authentication, searchAll);
module.exports = router;