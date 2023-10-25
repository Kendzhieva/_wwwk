import mongoose from "mongoose";

const requestGroupSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending"
    },

}, {
    timestamps: true
})

export default mongoose.model('requestGroup', requestGroupSchema)