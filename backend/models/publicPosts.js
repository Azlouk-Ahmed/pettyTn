const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const publicPost = new Schema({
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
    },
    status : {
        type : String
    },
    comments : {
        type : []
    }
}, { timestamps: true });

module.exports = mongoose.model("publicPost", publicPost);