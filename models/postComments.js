import mongoose from "mongoose";

const postCommentsSchema = new mongoose.Schema({
    creatorId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: []
    },
}, {
    timestamps: true
})

export default mongoose.model('postComments', postCommentsSchema)