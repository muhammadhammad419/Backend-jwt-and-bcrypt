const mongoose = require("mongoose");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true , "userName is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true , "Email is required"],
        unique: true,
        match: [/^\S@\S.\S+S/ , "pass a vaild email address"],
    },
    avatar: {
        type: String,
        required: [true],
    },
    watchTime: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "VideoModel",
        required: [true, "watchTime is required"],
    }],
    discription: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    refreshToken: {

    }
}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await brcypt.genSalt(10);
        this.password = await brcypt.hash(this.password, salt);
    } catch (error) {
        return next(error);
        }
    });

    userSchema.methods.comparePassword = async function(password) {
        return await brcypt.compare(password, this.password);
    };

    userSchema.methods.genrateAccessToken = async function() {
       return jwt.sign(
            {
                userid: this._id,
                userName: this.userName,
                email: this.email,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRE || "1d",
            }
        )
    }
    userSchema.methods.genrateRefreshToken = async function() {
       return jwt.sign(
            {
                userid: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,

            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRE || "30d",
            }
        )
    }

export const User = mongoose.model("User" , userSchema);