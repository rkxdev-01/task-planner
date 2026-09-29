function TaskItem({ task, onToggle, onDelete }) {
  return (
    <article className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`status-badge ${task.completed ? 'done' : 'pending'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-meta">
        <span>Category: {task.category}</span>
        <span>Priority: {task.priority}</span>
      </div>

      <div className="task-actions">
        <button type="button" className="secondary-btn" onClick={() => onToggle(task)}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button type="button" className="danger-btn" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
