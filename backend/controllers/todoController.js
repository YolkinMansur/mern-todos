const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModel");
const User = require("../models/userModel");

// @desc    Create todo
// @route   POST /api/todos
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const todo = await Todo.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).send(todo);
});

// @desc    Read all todos
// @route   GET /api/todos
// @access  Private
const readTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.status(200).send(todos);
});

// @desc    Update todo
// @route   PUT /api/todo/:id
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  // Проверяем пользователя
  if (!req.user) {
    res.status(401);
    throw new Error("Пользователь не найден");
  }

  // Соответсвует ли залогиненный пользователь пользователю данного todo
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Пользователь не авторизован");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).send(updatedTodo);
});

// @desc    Delete todo
// @route   DELETE /api/todo/:id
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  // Проверяем пользователя
  if (!req.user) {
    res.status(401);
    throw new Error("Пользователь не найден");
  }

  // Соответсвует ли залогиненный пользователь пользователю данного todo
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Пользователь не авторизован");
  }

  await todo.remove();

  res.status(200).send({ id: req.params.id });
});

module.exports = {
  createTodo,
  readTodos,
  updateTodo,
  deleteTodo,
};
