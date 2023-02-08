"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
// We can use RequestHandler from Express to let the TypeScipt know that this function is an handler, without explicitly specifying the type of functional parameters
const TODOS = [];
const createTodo = (req, res, next) => {
    let text = !req.body.text
        ? "Undefined"
        : req.body.text; // It is to explicitly specify the type of 'Text'
    console.log(text);
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Created the ToDo", createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    // Specifying the parameters
    const todoID = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex((todo) => {
        todo.id === todoID;
    });
    if (todoIndex < 0) {
        throw new Error('Could not find the todo!');
    }
    else {
        TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
        res.status(201).json({ message: "Successfully Updated!", updateTodo: TODOS[todoIndex] });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoID = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => {
        todo.id === todoID;
    });
    if (todoIndex < 0) {
        throw new Error('Could not find the todo!');
    }
    else {
        TODOS.splice(todoIndex, 1);
        res.status(201).json({ message: "Successfully Deleted!" });
    }
};
exports.deleteTodo = deleteTodo;
