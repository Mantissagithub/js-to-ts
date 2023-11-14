
import mongoose, { Document, Schema } from "mongoose";

interface User {
    username: string;
    password: string;
}

interface Todo {
    title: string;
    description: string;
    done: boolean;
    userId: string;
}

const userSchema : Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const todoSchema : Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    done: { type: Boolean, default: false },
    userId: { type: String, required: true },
});

const UserModel = mongoose.model<User>("User", userSchema);
const TodoModel = mongoose.model<Todo>("Todo", todoSchema);

export default {UserModel , TodoModel};
