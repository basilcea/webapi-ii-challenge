const express = require("express");
const router = express.Router();
const postModels = require("./models");

// router.post("/", postModels.createPost);
// router.post("./id/comments",postModels.createComment);
router.get("/", postModels.getAllPosts);
// router.get("/:id", postModels.getPost);
// router.get("/:id/comments", postModels.getPostComments);
// router.put("/:id", postModels.editPost);
// router.delete("/:id", postModels.deletePost);

module.exports = router;
