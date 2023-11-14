"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var middleware_1 = require("../middleware");
var db_1 = require("../db");
var authenticateJwt = middleware_1.default.authenticateJwt, SECRET = middleware_1.default.SECRET;
var TodoModel = db_1.default.TodoModel;
var router = express.Router();
router.post('/todos', authenticateJwt, function (req, res) {
    var _a = req.body, title = _a.title, description = _a.description;
    var done = false;
    var userId = req.userId;
    var newTodo = new TodoModel({ title: title, description: description, done: done, userId: userId });
    newTodo.save()
        .then(function (savedTodo) {
        res.status(201).json(savedTodo);
    })
        .catch(function (err) {
        res.status(500).json({ error: 'Failed to create a new todo' });
    });
});
router.get('/todos', authenticateJwt, function (req, res) {
    var userId = req.userId;
    TodoModel.find({ userId: userId })
        .then(function (todos) {
        res.json(todos);
    })
        .catch(function (err) {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});
router.patch('/todos/:todoId/done', authenticateJwt, function (req, res) {
    var todoId = req.params.todoId;
    var userId = req.userId;
    TodoModel.findOneAndUpdate({ _id: todoId, userId: userId }, { done: true }, { new: true })
        .then(function (updatedTodo) {
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo);
    })
        .catch(function (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    });
});
exports.default = router;
