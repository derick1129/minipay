import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    }
});

export const AccountModel = mongoose.model("Account", accountSchema);