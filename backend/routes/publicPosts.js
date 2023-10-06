const express = require("express");

const {getAllPosts, createPublicPost, updatePostStatus} = require("../controllers/publicPostsController");
const requireAdminAuth = require("../middleware/requireAdminAuth");

const publicPostsRouter = express.Router();

publicPostsRouter.get("/posts",getAllPosts);

publicPostsRouter.post("/posts",createPublicPost);

publicPostsRouter.put("/updatestatus/:postID",requireAdminAuth,updatePostStatus);

module.exports = publicPostsRouter;

