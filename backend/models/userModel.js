import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    admin: {type: Boolean, required: true},
}, {timestamps: true});

const passwordsSchema = new mongoose.Schema({
    password: {type: String, required: true},
    member: {type: mongoose.Types.ObjectId, required: true, ref: 'Member'}
})

// Trigger, der VOR dem Speichern eines Members mit .save() ausgeführt wird.
userSchema.pre('save', async function() {
    const user = this;
    
});

const User = mongoose.model("User", userSchema);
const Password = mongoose.model('Password', passwordsSchema);

export {User, Password}