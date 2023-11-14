"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var mongoose_1 = require("mongoose");
var cors = require("cors");
var port = 3000;
var auth_1 = require("./routes/auth");
var todo_1 = require("./routes/todo");
app.use(cors());
app.use(express.json());
app.use("/auth", auth_1.default);
app.use("/todo", todo_1.default);
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
mongoose_1.default.connect('mongodb+srv://mantissa6789:Mantis2510@cluster0.9ramotn.mongodb.net/todos', { dbName: "todos" });
