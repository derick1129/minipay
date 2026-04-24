import mongoose, { Schema } from "mongoose";

interface IUser {
    username: string,
    firstName: string,
    lastName: string,
    password: string
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstName: {
        type: String,
        required: true,
        minLength: 3
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3
    }
})

export const UserModel = mongoose.model<IUser>("User", userSchema);

