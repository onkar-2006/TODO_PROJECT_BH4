const Todo = require('../models/Todo');
const express =require("express")

exports.createTodo = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const todo = await Todo.create({
      title,
      description,
      dueDate,
      user: req.user.id 
    });

    res.status(201).json({ success: true, todo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getMyTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      count: todos.length, 
      todos 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.toggleTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: "Task not found" });
    
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    res.status(200).json({ success: true, todo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Task not found" });

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to delete this" });
    }

    await todo.deleteOne();
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

