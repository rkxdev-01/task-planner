import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return <p className="empty-state">No tasks match this filter.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TaskList;
