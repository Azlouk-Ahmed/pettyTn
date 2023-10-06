
const publicPost = require("../models/publicPosts.js");
const User = require("../models/user.js");
const { param } = require("../routes/submittedPosts.js");

const getAllPosts = async (req, res) => {
    try {
        const posts = await publicPost.find({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({"error": error});
    }
}

const createPublicPost = async (req, res) => {
    const {user_id,
        title,
        description,
        animalImg,
        contactMail,
        nb,
        status} = req.body;
    try {
        const user = await User.findById(user_id);
        const newPost = await publicPost.create({
            user : user,
            title,
            description,        
            animalImg,
            contactMail,
            nb,
            status
        });
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json({"error": error});
    }
}

const updatePostStatus = async (req, res) => {
    const { postID } = req.params;
    try {
        const post = await publicPost.findById(postID);

        if (!post) {
            return res.status(404).json({ "message": "Post not found" });
        }

        const newStatus = post.status === "available" ? "not available" : "available";

        const updatedPost = await publicPost.findByIdAndUpdate(
            postID,
            { $set: { status: newStatus } },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ "error": error });
    }
}


module.exports = {getAllPosts, createPublicPost, updatePostStatus}