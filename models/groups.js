import mongoose from "mongoose";

const groupsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    creatorId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    members: {
        type: Array,
        default: []
    },
    cover: {
        type: String,
    },
    avatar: {
        type: String,
    },
    isOpen: {
        type: Boolean,
        require: true,
        default: true
    }
}, {
    timestamps: true
})

export default mongoose.model('groups', groupsSchema)