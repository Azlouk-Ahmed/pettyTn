const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const animalRequests = new Schema({
    user: {
        type : Object,
        required : true,
    },
    post : {
        type : Object,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("AN__REQ", animalRequests);