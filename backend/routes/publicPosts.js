const express = require("express");

const {getAllPosts, createPublicPost, updatePostStatus, addComment} = require("../controllers/publicPostsController");
const requireAdminAuth = require("../middleware/requireAdminAuth");
const requireAuth = require("../middleware/requireAuth");

const publicPostsRouter = express.Router();

publicPostsRouter.get("/posts",getAllPosts);

publicPostsRouter.post("/posts",createPublicPost);

publicPostsRouter.put("/updatestatus/:postID",requireAdminAuth,updatePostStatus);

publicPostsRouter.put("/comment/:postID",requireAuth,addComment);

module.exports = publicPostsRouter;

