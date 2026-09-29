import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import TaskList from '../components/TaskList';
import { createTask, deleteTask, getTasks, updateTask } from '../services/taskService';

const FILTERS = {
  All: () => true,
  Pending: (task) => !task.completed,
  Completed: (task) => task.completed,
};

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Could not load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter(FILTERS[filter]);
  }, [tasks, filter]);

  const handleAddTask = async (taskData) => {
    try {
      setIsSubmitting(true);
      setError('');
      const newTask = await createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setError(err.message || 'The task could not be added.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTask = async (task) => {
    try {
      setError('');
      const updatedTask = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) =>
        prev.map((item) => (item._id === task._id ? updatedTask : item))
      );
    } catch (err) {
      setError(err.message || 'Unable to update this task.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setError('');
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      setError(err.message || 'Unable to delete this task.');
    }
  };

  return (
    <>
      <Navbar />

      <main className="page-shell">
        <section className="panel">
          <TaskForm onAddTask={handleAddTask} isSubmitting={isSubmitting} />
        </section>

        <section className="panel">
          <div className="toolbar">
            <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
            <span className="task-count">{tasks.length} tasks</span>
          </div>
        </section>

        <section className="panel">
          {error && <p className="error-message">{error}</p>}

          {loading ? (
            <p className="status-message">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="empty-state">
              {tasks.length === 0
                ? 'No tasks yet. Add your first task above.'
                : 'No tasks match this filter.'}
            </p>
          ) : (
            <TaskList tasks={filteredTasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
          )}
        </section>
      </main>
    </>
  );
}

export default Home;
