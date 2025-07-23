import mongoose from "mongoose";
import User from "./user.js";
const credentialsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: Date.now
    },
    provider: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})

const Credentials=new mongoose.model("credential",credentialsSchema);

export default Credentials;