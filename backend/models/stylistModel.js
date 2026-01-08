import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    clientType: {
        type: String,
        enum: ["woman", "man", "child"],
        required: true
    }
})

const StylistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    services: [ServiceSchema],
    isActive: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model("Stylist", StylistSchema);