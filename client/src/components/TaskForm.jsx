import { useState } from 'react';

const initialForm = {
  title: '',
  description: '',
  category: '',
  priority: 'Medium',
};

const validateTaskInput = (taskData) => {
  const title = (taskData.title || '').trim();
  const description = (taskData.description || '').trim();
  const category = (taskData.category || '').trim();
  const priority = (taskData.priority || '').trim();

  if (!title) {
    throw new Error('Title is required.');
  }

  if (title.length > 200) {
    throw new Error('Title must be 200 characters or less.');
  }

  if (category.length === 0) {
    throw new Error('Category is required.');
  }

  if (description.length > 1000) {
    throw new Error('Description must be 1000 characters or less.');
  }

  if (!['Low', 'Medium', 'High'].includes(priority)) {
    throw new Error('Priority must be Low, Medium, or High.');
  }

  return {
    title,
    description,
    category,
    priority,
  };
};

function TaskForm({ onAddTask, isSubmitting }) {
  const [formData, setFormData] = useState(initialForm);
  const [formError, setFormError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) {
      setFormError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const cleanTask = validateTaskInput(formData);
      setFormError('');
      await onAddTask(cleanTask);
      setFormData(initialForm);
    } catch (error) {
      setFormError(error.message || 'Please check your task details.');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="field-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          maxLength={200}
          required
        />
      </div>

      <div className="field-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Optional details"
          maxLength={1000}
          rows="3"
        />
      </div>

      <div className="field-grid">
        <div className="field-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            placeholder="College, Programming, Personal..."
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {formError && <p className="error-message">{formError}</p>}

      <button type="submit" className="primary-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
