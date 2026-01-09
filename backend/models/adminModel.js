import mongoose, { mongo } from "mongoose";

const AdminSchema = new mongoose.Schema(
    {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
    }
);

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

const Admin = mongoose.model("Admin", AdminSchema);
const Stylist = mongoose.model("StylistSchema", StylistSchema)

export {Admin, Stylist}