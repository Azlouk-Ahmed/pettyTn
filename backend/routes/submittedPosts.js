const express = require("express");
const {createPost, getAllSubPosts, delSubPost} = require("../controllers/subPostController")

const postRoute = express.Router();

const requireAuth = require("../middleware/requireAuth")

const requireAdminAuth = require("../middleware/requireAdminAuth");

postRoute.get('/submittedPosts',requireAdminAuth, getAllSubPosts);

postRoute.post('/submit',requireAuth,createPost);

postRoute.delete('/delete/post/:id',requireAdminAuth,delSubPost);

module.exports = postRoute;