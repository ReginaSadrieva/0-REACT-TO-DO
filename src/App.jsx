import { useState } from 'react';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './index.css';

function App() {
  // All tasks stored here — parent component state
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: 'Completed task',
      completed: true,
      createdAt: new Date(Date.now() - 17 * 1000),
    },
    {
      id: 2,
      description: 'Editing task',
      completed: false,
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: 3,
      description: 'Active task',
      completed: false,
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
    },
  ]);

  const [filter, setFilter] = useState('all');

  // Tracks which task is currently being edited (id or null)
  const [editingId, setEditingId] = useState(null);

  // Add new task
  const addTask = (description) => {
    if (!description.trim()) return;
    const newTask = {
      id: Date.now(),
      description: description.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  // Toggle completed/active
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    // If we're deleting the task being edited, exit edit mode
    if (editingId === id) setEditingId(null);
  };

  // Start editing a task
  const startEditing = (id) => {
    setEditingId(id);
  };

  // Save edited description when pressing Enter
  const saveTask = (id, newDescription) => {
    if (!newDescription.trim()) {
      deleteTask(id); // optional: remove if empty
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? { ...task, description: newDescription.trim() }
            : task
        )
      );
    }
    setEditingId(null); // exit edit mode
  };

  // Cancel editing (e.g. press Escape)
  const cancelEditing = () => {
    setEditingId(null);
  };

  // Clear completed tasks
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
    setEditingId(null);
  };

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>

      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          editingId={editingId}
          onEdit={startEditing}
          onSave={saveTask}
          onCancel={cancelEditing}
        />
      </section>

      {tasks.length > 0 && (
        <Footer
          activeCount={activeCount}
          hasCompleted={tasks.some((t) => t.completed)}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />
      )}
    </section>
  );
}

export default App;
