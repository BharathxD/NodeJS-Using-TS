import { RequestHandler } from "express";
import { Todo } from "../models/todo";

// We can use RequestHandler from Express to let the TypeScipt know that this function is an handler, without explicitly specifying the type of functional parameters

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text: string = (req.body as { text: string }).text; // It is explicitly specify the type of 'Text'
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);
  
  res.status(200).json({message: 'Created the ToDo', createdTodo: newTodo})
};
