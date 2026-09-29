const mongoose = require('mongoose');
const Task = require('../models/Task');

const VALID_PRIORITIES = ['Low', 'Medium', 'High'];

const createHttpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const validateTaskPayload = (data = {}, requireAllFields = true) => {
  const hasTitle = Object.prototype.hasOwnProperty.call(data, 'title');
  const hasCategory = Object.prototype.hasOwnProperty.call(data, 'category');
  const hasDescription = Object.prototype.hasOwnProperty.call(data, 'description');
  const hasPriority = Object.prototype.hasOwnProperty.call(data, 'priority');

  const title = typeof data.title === 'string' ? data.title.trim() : '';
  const category = typeof data.category === 'string' ? data.category.trim() : '';
  const description = typeof data.description === 'string' ? data.description.trim() : '';
  const priority = typeof data.priority === 'string' ? data.priority.trim() : '';

  if ((requireAllFields || hasTitle) && !title) {
    throw createHttpError(400, 'Title is required.');
  }

  if ((requireAllFields || hasTitle) && title.length > 200) {
    throw createHttpError(400, 'Title must be 200 characters or less.');
  }

  if ((requireAllFields || hasCategory) && category.length === 0) {
    throw createHttpError(400, 'Category is required.');
  }

  if ((requireAllFields || hasDescription) && description.length > 1000) {
    throw createHttpError(400, 'Description must be 1000 characters or less.');
  }

  if ((requireAllFields || hasPriority) && !VALID_PRIORITIES.includes(priority)) {
    throw createHttpError(400, 'Priority must be Low, Medium, or High.');
  }

  const cleaned = {};

  if (hasTitle || requireAllFields) cleaned.title = title;
  if (hasCategory || requireAllFields) cleaned.category = category;
  if (hasDescription || requireAllFields) cleaned.description = description;
  if (hasPriority || requireAllFields) cleaned.priority = priority;

  return cleaned;
};

const validateTaskId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError(400, 'Invalid task ID.');
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const payload = validateTaskPayload(req.body, true);
    const task = await Task.create({
      ...payload,
      completed: false,
    });

    res.status(201).json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(createHttpError(400, error.message));
      return;
    }

    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    validateTaskId(req.params.id);

    const updates = { ...req.body };

    if (
      Object.prototype.hasOwnProperty.call(updates, 'title') ||
      Object.prototype.hasOwnProperty.call(updates, 'category') ||
      Object.prototype.hasOwnProperty.call(updates, 'priority') ||
      Object.prototype.hasOwnProperty.call(updates, 'description')
    ) {
      validateTaskPayload(updates, false);
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      throw createHttpError(404, 'Task not found.');
    }

    res.status(200).json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(createHttpError(400, error.message));
      return;
    }

    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    validateTaskId(req.params.id);

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      throw createHttpError(404, 'Task not found.');
    }

    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
