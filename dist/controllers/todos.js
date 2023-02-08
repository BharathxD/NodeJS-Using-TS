"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = void 0;
const todo_1 = require("../models/todo");
// We can use RequestHandler from Express to let the TypeScipt know that this function is an handler, without explicitly specifying the type of functional parameters
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text; // It is explicitly specify the type of 'Text'
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(200).json({ message: 'Created the ToDo', createdTodo: newTodo });
};
exports.createTodo = createTodo;
