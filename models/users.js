import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
    },
    images: {
        type: Array,
        default: []
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    friends: {
        type: Array,
        default: []
    },
    phone: String,
    birthday: Date,
    activateLink: String,
    resetLing: String

}, {
    timestamps: true
})

export default mongoose.model('users', usersSchema)