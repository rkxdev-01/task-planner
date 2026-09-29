const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: ['Low', 'Medium', 'High'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
