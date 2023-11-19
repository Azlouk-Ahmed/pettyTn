const mongoose = require("mongoose");
const AN__REQ = require("../models/animalRequests")
const publicPost = require("../models/publicPosts.js");
const User = require("../models/user.js");

const requestList = async (req, res) => {
    try {
        const requests = await AN__REQ.find({}).sort({ createdAt: -1 });
        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({"error" : error});
    }
}

const generateReq = async (req, res) => {
    const userID = req.user._id;
    const {postID} = req.params;
    if(!mongoose.Types.ObjectId.isValid(postID)){
        return res.status(400).json({"error" : "invalid id type"});
    }
    const user = await User.findById(userID);
    const post = await publicPost.findById(postID);

    if(!post) {
        return res.status(404).json({"error" : "post not found "});
    }
    const newReq = await AN__REQ.create({
        user: user,
        post : post,
    });
    return res.status(200).json(newReq);
    
    
}

const delReq = async (req, res) => {
    const {postID} = req.params;
    if(!mongoose.Types.ObjectId.isValid(postID)){
        return res.status(400).json({"error" : "invalid id type"});
    }
    const post = await AN__REQ.findByIdAndDelete(postID);
    if (!post) {
        return res.status(404).json({"error" : "post not found"});
    }
    return res.status(200).json(post);

}

module.exports = {requestList, generateReq, delReq};