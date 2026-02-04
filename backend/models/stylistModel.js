import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    serviceName: {
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
        enum: ["Woman", "Man", "Child"],
        required: true
    }
},{timestamps: true})

const StylistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    photo: {
        type: String,
        required: true
    },
    services: [ServiceSchema],
    isActive: {
        type: Boolean,
        default: true
    }
},{timestamps: true})


const Stylist = mongoose.model("StylistSchema", StylistSchema)

export default Stylist