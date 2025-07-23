const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String,
        required: true,
        unique: true,
    },
    thumbnail: {
        type: String,
        required: true,
        unique: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    discription: {
        type: String,
        required: true,
        unique: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        required: true,
        unique: true,
    },
    published: {
        type: Boolean,
        required: true,
    },
}, {timestamps: true});

videoSchema.plugin(aggregatePaginate)

export const VideoModel = mongoose.model("VideoModel", videoSchema);