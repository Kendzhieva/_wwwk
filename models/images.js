import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    creatorId: {
        type: String,
        required: true,
        unique: false
    },
    likes: {
        type: Array,
        default: []
    },
}, {
    timestamps: true
})

export default mongoose.model('images', imagesSchema)