"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});
var todoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    done: { type: Boolean, default: false },
    userId: { type: String, required: true },
});
var UserModel = mongoose_1.default.model("User", userSchema);
var TodoModel = mongoose_1.default.model("Todo", todoSchema);
exports.default = { UserModel: UserModel, TodoModel: TodoModel };
