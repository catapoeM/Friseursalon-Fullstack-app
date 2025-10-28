import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB verbunden");
    }   catch (error) {
        console.error("Fehler bei MongoDB-Verbindung:", error.message);
        process.exit(1);
    }
};

export default connectDB;