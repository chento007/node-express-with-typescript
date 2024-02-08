import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [false, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    photo: {
        type: String,
        required: [true, 'Photo is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


export const Product = mongoose.model("Product", productSchema);
