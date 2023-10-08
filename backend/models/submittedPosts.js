const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const submittedPost = new Schema({
    user: {
        type : Object,
        required : true,
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    animalImg : {
        type : String,
        required : true
    },
    contactMail : {
        type : String,
    },
    nb : {
        type : String
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", submittedPost);