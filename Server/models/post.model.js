const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        message: {
            type: String,
            trim: true,
            maxlength: 500
        },
        picture: {
            type:String,
        },
        video: {
            type: String,
        },
        interesting: {
            type: [String],
            required: true,
        },
        constructive: {
            type: [String],
            required: true,
        },
        funny: {
            type: [String],
            required: true,
        },
        unpertinent: {
            type: [String],
            required: true,
        },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number,
                }
            ],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const PostModel = mongoose.model('post',PostSchema)
module.exports = PostModel