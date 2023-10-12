const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    surname : {
        type : String,
        required : true
    },
    img : {
        type : String,
    },
    country : {
        type : String,
    },
    location : {
        type : String,
    },
    codePostal : {
        type : String,
    },
    role : {
        type: String
    }
}, { timestamps: true });


userSchema.statics.signUp = async function(email, password, codePostal, location, country, img, name, surname , role) {
    console.log(email, password, codePostal, location, country, role, img, name, surname);
    if (!email || !password) {
        throw Error("email or password connot be empty")
    }
    else if (!validator.isEmail(email)){
        throw Error("cannot accept invalid Emails")
    }
    const exist = await this.findOne({email});
    if(exist) {
        throw Error("this email is already signed up , try to login")
    }
    if(!role) {
        role = "user"
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash, codePostal, location, country, img, name, surname, role})
    return user;
}

userSchema.statics.logIn = async function(email, password) {
    const user = await this.findOne({email});
    if(!user) {
        throw Error("email not found ! ")
    }
    if(!email || !password) {
        throw Error("email or password cannot be empty !")
    }
    if(!validator.isEmail(email)){
        throw Error("cannot accept unvalid emails")
    }
    if(user.role === "admin") {
        return user;
    }
    const match = await bcrypt.compare(password, user.password);
    
    if(!match){
        throw Error("incorrect password")
    }

    return user;
}

module.exports = mongoose.model("User", userSchema);