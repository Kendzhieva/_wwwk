import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    chatId: {
        type: String,
        required: true,
    },
    edited: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
})

export default mongoose.model('message', messageSchema)