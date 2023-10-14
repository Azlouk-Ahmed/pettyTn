
const mongoose = require("mongoose");
const publicPost = require("../models/publicPosts.js");
const User = require("../models/user.js");

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
            status,
            comments : []
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

        const newStatus = post.status === "available" ? "not--available" : "available";

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

const addComment = async (req, res) => {
    const { postID } = req.params; 
    const {comment} = req.body;
    const userID = req.user._id;
    if(!mongoose.Types.ObjectId.isValid(postID)){
        return res.status(400).json({"error" : "invalid id type"});
    }
    const user = await User.findById(userID);
    const post = await publicPost.findById(postID);

    if(!post) {
        return res.status(404).json({"error" : "post not found "});
    }

    post.comments.push({ user : {name : user.name, surname : user.surname , img : user.img , createdAt : user.createdAt } , comment });
        await post.save();
    return res.status(200).json(post)
}

const requestAnimal =async (req, res) => {
    const userID = req.user._id;
    res.status(200).json(userID)
}


module.exports = {getAllPosts, createPublicPost, updatePostStatus, addComment, requestAnimal}