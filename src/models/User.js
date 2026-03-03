import mongoose from "mongoose";

const userShema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false  // Not required for OAuth users
    },
    provider: {
        type: String,
        default: "credentials" // "credentials" or "google"
    },
    providerId: {
        type: String,
        default: null
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        default: null
    },
    verificationTokenExpiry: {
        type: Date,
        default: null
    },
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpiry: {
        type: Date,
        default: null
    }
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userShema)

export default User