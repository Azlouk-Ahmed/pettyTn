const mongoose = require("mongoose");
const Post = require("../models/submittedPosts");
const User = require("../models/user");
const getAllSubPosts = async (req, res) => {
  try {
    
      const posts = await Post.find().sort({ createdAt : -1});
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({"error" : error});
    }
}

const createPost = async (req, res) => {
    const { description, title, animalImg, contactMail, nb } = req.body;
    const user_id = req.user._id;
  
    let emptyFields = [];
  
    if (!title) {
      emptyFields.push('title');
    }
    if (!description) {
      emptyFields.push('description');
    }
    if (!animalImg) {
      emptyFields.push('description');
    }
    if (!contactMail) {
      emptyFields.push('description');
    }
    if (!nb) {
      emptyFields.push('description');
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }
  
    try {
      const user = await User.findById(user_id);
      const newPost = await Post.create({ description, title, animalImg, contactMail, nb , user : user });
      res.status(200).json(newPost);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const delSubPost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such Post'})
    }
  const postToDel = await Post.findOneAndDelete({_id: id})

  if(!postToDel) {
    return res.status(400).json({error: 'No such Post'})
  }

  res.status(200).json(postToDel)
  }

  module.exports = {createPost, getAllSubPosts ,delSubPost};