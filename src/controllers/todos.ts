import { RequestHandler } from "express";
import { Todo } from "../models/todo";

// We can use RequestHandler from Express to let the TypeScipt know that this function is an handler, without explicitly specifying the type of functional parameters

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  let text: string = !req.body.text
    ? "Undefined"
    : (req.body as { text: string }).text; // It is to explicitly specify the type of 'Text'
  console.log(text);
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);

  res.status(201).json({ message: "Created the ToDo", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export  const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  // Specifying the parameters
  const todoID = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => {
    todo.id === todoID;
  });

  if (todoIndex < 0) {
    throw new Error('Could not find the todo!');
  } else {
    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText)
    res.status(201).json({message: "Successfully Updated!", updateTodo: TODOS[todoIndex]});
  }
};

export const deleteTodo : RequestHandler<{id: string}> = (req, res, next) => {
    const todoID = req.params.id;

    const todoIndex = TODOS.findIndex((todo) => {
        todo.id === todoID;
    });
    
    if (todoIndex < 0) {
        throw new Error('Could not find the todo!');
      } else {
        TODOS.splice(todoIndex, 1);
        res.status(201).json({message: "Successfully Deleted!"});
    }
}

